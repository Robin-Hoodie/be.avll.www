import type { HandlerEvent } from "@netlify/functions";
import {
  checkBodyField,
  parseError as parseError,
  ParseError,
} from "./utils/utils";
import type { NatureRun } from "./types";
import {
  getNatureRunRegistrationWithNatureRun,
  markNatureRunRegistrationAsPaid,
  sendNatureRunRegistrationEmail,
} from "./utils/nature-run";

interface EventBody {
  natureRunRegistrationId: number;
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
  checkBodyField(bodyParsed, "natureRunRegistrationId");
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
    const { natureRunRegistrationId } = parseRequestBody(event.body);
    const { natureRunRegistration, natureRun } =
      await getNatureRunRegistrationWithNatureRun(natureRunRegistrationId);
    // Avoid users refreshing getting multiple emails
    if (!natureRunRegistration.isPaid) {
      await Promise.allSettled([
        markNatureRunRegistrationAsPaid(natureRunRegistrationId),
        sendNatureRunRegistrationEmail(natureRunRegistration, natureRun),
      ]);
    }
    return {
      statusCode: 200,
    };
  } catch (error) {
    return parseError(error);
  }
}
