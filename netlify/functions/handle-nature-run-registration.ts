import type { HandlerEvent } from "@netlify/functions";
import { parseError, ParseError } from "./utils/utils";
import {
  addMollieIdToNatureRunRegistration,
  createNatureRunRegistration,
  createPayment,
  getValidCouponCode,
  markCouponCodeAsUsed,
  sendNatureRunRegistrationEmail,
} from "./utils/nature-run";
import type { NatureRunRegistrationRaw } from "./types";

// Don't do thorough check
function parseRequestBody(body: string | null): NatureRunRegistrationRaw {
  if (!body) {
    throw new ParseError(400, "Body is required");
  }
  const bodyParsed = JSON.parse(body);
  if (typeof bodyParsed !== "object" || bodyParsed === null) {
    throw new ParseError(400, "Body is required to be an object");
  }
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
    const { couponCode, ...natureRunRegistrationRaw } = parseRequestBody(
      event.body
    );
    // Validate before creating the registration, so an invalid code doesn't leave a registration behind
    const validCouponCode = await getValidCouponCode(
      couponCode,
      natureRunRegistrationRaw.natureRun
    );
    const natureRunRegistration = await createNatureRunRegistration({
      ...natureRunRegistrationRaw,
      // Never trust these values from the client
      isPaid: false,
      mollieId: null,
      couponCode: validCouponCode?.attributes.code ?? null,
    });
    if (validCouponCode) {
      await markCouponCodeAsUsed(validCouponCode.id);
    }
    const { redirectUrl, mollieId } = await createPayment(
      natureRunRegistration
    );
    if (mollieId) {
      await addMollieIdToNatureRunRegistration(
        natureRunRegistration.id,
        mollieId
      );
    } else {
      await sendNatureRunRegistrationEmail(natureRunRegistration);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        redirectUrl,
      }),
    };
  } catch (error) {
    console.error(
      "Something went wrong when processing a registration the nature run",
      error
    );
    return parseError(error);
  }
}
