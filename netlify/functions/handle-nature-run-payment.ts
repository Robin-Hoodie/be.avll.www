import type { HandlerEvent } from "@netlify/functions";
import { checkBodyField, parseError, ParseError } from "./utils/utils";
import {
  getNatureRunRegistrationWithNatureRun,
  getPayment,
  markNatureRunRegistrationAsPaid,
  sendNatureRunRegistrationEmail,
} from "./utils/nature-run";
import type { Payment } from "@mollie/api-client";

interface EventBody {
  id: string;
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
  checkBodyField(bodyParsed, "id");
  return bodyParsed;
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
    const { id: paymentId } = parseRequestBody(event.body);
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
    console.log("Going to mark");

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
    console.error(
      "Something went wrong when processing a successful payment for the nature run",
      error
    );
    return parseError(error);
  }
}
