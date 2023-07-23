import type { HandlerEvent } from "@netlify/functions";
import sendGridMail from "@sendgrid/mail";
import { defineEnvVariable } from "./env";
import { ParseError, parseEmailError, checkBodyField } from "./utils";

sendGridMail.setApiKey(defineEnvVariable("SENDGRID_API_KEY"));
const registrationMailReplyToList = defineEnvVariable(
  "REGISTRATION_MAIL_REPLY_TO_LIST",
  true
);
const registrationMailBccList = defineEnvVariable(
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
    return parseEmailError(error);
  }
}
