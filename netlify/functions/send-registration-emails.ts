import type { HandlerEvent } from "@netlify/functions";
import sendGridMail, { ResponseError } from "@sendgrid/mail";
import { defineEnvVariable } from "./env";

sendGridMail.setApiKey(defineEnvVariable("SENDGRID_API_KEY"));
const registrationMailReplyToList = defineEnvVariable(
  "REGISTRATION_MAIL_REPLY_TO_LIST",
  true
);
const registrationMailBccList = defineEnvVariable(
  "REGISTRATION_MAIL_BCC_LIST",
  true
);

class ParseError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface ResponseErrorFixed extends Omit<ResponseError, "response"> {
  response: {
    headers: ResponseError["response"]["headers"];
    body: {
      errors: Array<{ message: string; field: string; help: string | null }>;
    };
  };
}

function isResponseError(error: unknown): error is ResponseErrorFixed {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "number" &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "body" in error.response &&
    typeof error.response.body === "object" &&
    error.response.body !== null &&
    "errors" in error.response.body &&
    Array.isArray(error.response.body.errors)
  );
}

function checkBodyField(
  body: Record<string, unknown>,
  field: keyof typeof body
) {
  if (!(field in body)) {
    throw new ParseError(400, `Field ${field} is required`);
  }
}

function parseRequestBody(body: string | null) {
  if (!body) {
    throw new ParseError(400, "Body is required");
  }
  const bodyParsed = JSON.parse(body);
  if (typeof bodyParsed !== "object" || bodyParsed === null) {
    throw new ParseError(400, "Body is required to be an object");
  }
  checkBodyField(bodyParsed, "event");
  checkBodyField(bodyParsed, "name");
  checkBodyField(bodyParsed, "email");
  checkBodyField(bodyParsed, "gender");
  checkBodyField(bodyParsed, "birthYear");
  checkBodyField(bodyParsed, "category");
  checkBodyField(bodyParsed, "valNumber");
  checkBodyField(bodyParsed, "discipline");
  checkBodyField(bodyParsed, "bestPerformance");
  checkBodyField(bodyParsed, "comment");
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
    const registration = parseRequestBody(event.body);
    const htmlMessage = `
      Uw aanvraag tot wedstrijd wordt verwerkt. <br/><br/>

      Kampioenschap of meeting: ${registration.event}<br/>
      Naam: ${registration.name}<br/>
      E-mail: ${registration.email}<br/>
      Geslacht: ${registration.birthYear}<br/>
      Categorie: ${registration.category}<br/>
      VAL nummer: ${registration.valNumber}<br/>
      Discipline: ${registration.discipline}<br/>
      Beste prestatie: ${registration.bestPerformance}<br/>
      Opmerking: ${registration.comment}
    `;
    const textMessage = htmlMessage.replace(/<br\/>/g, "\n");
    await sendGridMail.send({
      to: [
        {
          name: registration.name,
          email: registration.email,
        },
      ],
      bcc: [
        { name: registrationMailBccList[0], email: registrationMailBccList[1] },
        { name: registrationMailBccList[2], email: registrationMailBccList[3] },
      ],
      from: "info@avll.be",
      replyToList: [
        {
          name: registrationMailReplyToList[0],
          email: registrationMailReplyToList[1],
        },
        {
          name: registrationMailReplyToList[2],
          email: registrationMailReplyToList[3],
        },
      ],
      subject: `Bevestiging inschrijving ${registration.event}`,
      text: textMessage,
      html: htmlMessage,
    });
    return {
      statusCode: 200,
      body: "Email has been sent out successfully",
    };
  } catch (error) {
    if (isResponseError(error)) {
      return {
        statusCode: error.code,
        body: JSON.stringify(error.response.body.errors),
      };
    }
    if (error instanceof ParseError) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
