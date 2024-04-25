import queryString from "node:querystring";
import type { HandlerEvent } from "@netlify/functions";
import { parseError, ParseError } from "./utils/utils";
import {
  getNatureRunRegistration,
  getPayment,
  markNatureRunRegistrationAsPaid,
  sendNatureRunRegistrationEmail,
} from "./utils/nature-run";
import type { Payment } from "@mollie/api-client";

// Don't do thorough check
function getPaymentId(body: string | null): string {
  if (!body) {
    throw new ParseError(400, "Body is required");
  }
  const bodyParsed = queryString.parse(body);
  if (typeof bodyParsed.id !== "string") {
    throw new ParseError(
      400,
      "Param 'id' is required and should be of type 'string'"
    );
  }
  return bodyParsed.id;
}

function checkPaymentStatus(payment: Payment) {
  if (payment.status !== "paid") {
    return `Payment with id ${payment.id} status is ${payment.status}`;
  }
  return null;
}

function checkPaymentMetadata(payment: Payment) {
  if (
    typeof payment.metadata !== "object" ||
    payment.metadata === null ||
    typeof payment.metadata.natureRunRegistrationId !== "number"
  ) {
    return `Payment with id ${payment.id} has no "natureRunRegistrationId" in its metadata`;
  }
  return null;
}

export async function handler(event: HandlerEvent) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "'POST' is the only accepted HTTP method for this endpoint",
    };
  }

  try {
    const paymentId = getPaymentId(event.body);
    const payment = await getPayment(paymentId);
    const errorMessage =
      checkPaymentStatus(payment) || checkPaymentMetadata(payment);
    if (errorMessage) {
      console.warn(errorMessage);
      return {
        statusCode: 400,
        body: errorMessage,
      };
    }
    const natureRunRegistrationId = payment.metadata
      .natureRunRegistrationId as number;
    const natureRunRegistration = await getNatureRunRegistration(
      natureRunRegistrationId
    );
    // Avoid users refreshing getting multiple emails
    if (!natureRunRegistration.attributes.isPaid) {
      await Promise.allSettled([
        markNatureRunRegistrationAsPaid(natureRunRegistrationId),
        sendNatureRunRegistrationEmail(natureRunRegistration),
      ]);
    }
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(
      "Something went wrong when processing a successful payment for the nature run",
      error
    );
    return parseError(error);
  }
}
