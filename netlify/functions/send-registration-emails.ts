import type { HandlerEvent } from "@netlify/functions";
import sendGridMail from "@sendgrid/mail";
import { defineEnvVariable } from "./utils/env";
import { ParseError, parseError, checkBodyField } from "./utils/utils";

sendGridMail.setApiKey(defineEnvVariable("SENDGRID_API_KEY"));
const REGISTRATION_MAIL_REPLY_TO_LIST = defineEnvVariable(
  "REGISTRATION_MAIL_REPLY_TO_LIST",
  true
);
const REGISTRATION_MAIL_BCC_LIST = defineEnvVariable(
  "REGISTRATION_MAIL_BCC_LIST",
  true
);

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
  return bodyParsed;
}

function parseGender(gender: "male" | "female") {
  return gender === "male" ? "Man" : "Vrouw";
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
      Geslacht: ${parseGender(registration.gender)}<br/>
      Geboortejaar: ${registration.birthYear}<br/>
      Categorie: ${registration.category}<br/>
      VAL nummer: ${registration.valNumber}<br/>
      Discipline: ${registration.discipline}<br/>
      Beste prestatie: ${registration.bestPerformance}<br/>
      ${registration.comment ? `Opmerking ${registration.comment}` : ""}
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
        {
          name: REGISTRATION_MAIL_BCC_LIST[0],
          email: REGISTRATION_MAIL_BCC_LIST[1],
        },
        {
          name: REGISTRATION_MAIL_BCC_LIST[2],
          email: REGISTRATION_MAIL_BCC_LIST[3],
        },
      ],
      from: "info@avll.be",
      replyToList: [
        {
          name: REGISTRATION_MAIL_REPLY_TO_LIST[0],
          email: REGISTRATION_MAIL_REPLY_TO_LIST[1],
        },
        {
          name: REGISTRATION_MAIL_REPLY_TO_LIST[2],
          email: REGISTRATION_MAIL_REPLY_TO_LIST[3],
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
    console.error(
      "Something went wrong when sending a registration email",
      error
    );
    return parseError(error);
  }
}
