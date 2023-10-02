import type { HandlerEvent } from "@netlify/functions";
import { checkBodyField, parseError, ParseError } from "./utils/utils";
import { createPayment } from "./utils/nature-run";
import type { NatureRun, NatureRunRegistration } from "./types";

interface EventBody {
  registration: NatureRunRegistration;
  natureRun: NatureRun;
}

// Don't do thorough check
function parseRequestBody(body: string | null): EventBody {
  if (!body) {
    throw new ParseError(400, "Body is required");
  }
  const bodyParsed = JSON.parse(body);
  if (typeof bodyParsed !== "object" || bodyParsed === null) {
    throw new ParseError(400, "Body is required to be an object");
  }
  checkBodyField(bodyParsed, "registration");
  checkBodyField(bodyParsed, "natureRun");
  return bodyParsed;
}

export async function handler(event: HandlerEvent) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "'POST' is the only accepted HTTP method for this endpoint",
    };
  }
  try {
    const { registration, natureRun } = parseRequestBody(event.body);
    const checkoutUrl = await createPayment(registration, natureRun);
    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl,
      }),
    };
  } catch (error) {
    return parseError(error);
  }
}
