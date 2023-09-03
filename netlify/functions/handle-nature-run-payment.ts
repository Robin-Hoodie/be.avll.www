import type { HandlerEvent } from "@netlify/functions";
import sendGridMail from "@sendgrid/mail";
import { defineEnvVariable } from "./env";
import { checkBodyField, parseEmailError, ParseError } from "./utils";
import { createPayment } from "./nature-run-payment";

// sendGridMail.setApiKey(defineEnvVariable("SENDGRID_API_KEY"));

// const registrationMailReplyToList = defineEnvVariable(
//   "REGISTRATION_MAIL_NATURE_RUN_REPLY_TO",
//   true
// );
// const registrationMailBccList = defineEnvVariable(
//   "REGISTRATION_MAIL_NATURE_RUN_BCC_LIST",
//   true
// );

function parseRequestBody(body: string | null) {
  if (!body) {
    throw new ParseError(400, "Body is required");
  }
  const bodyParsed = JSON.parse(body);
  if (typeof bodyParsed !== "object" || bodyParsed === null) {
    throw new ParseError(400, "Body is required to be an object");
  }
  checkBodyField(bodyParsed, "firstName");
  checkBodyField(bodyParsed, "lastName");
  checkBodyField(bodyParsed, "email");
  checkBodyField(bodyParsed, "street");
  checkBodyField(bodyParsed, "zipCode");
  checkBodyField(bodyParsed, "city");
  checkBodyField(bodyParsed, "gender");
  checkBodyField(bodyParsed, "birthYear");
  checkBodyField(bodyParsed, "emergencyPhoneNumber");
  checkBodyField(bodyParsed, "distance");
  checkBodyField(bodyParsed, "withTShirt");
  checkBodyField(bodyParsed, "isMember");
  checkBodyField(bodyParsed, "agreeToPrivacyTerms");
  return bodyParsed;
}

function parseRegistrationDistance(body: any) {
  if (body.distance === "5K") {
    return "5KM";
  }
  if (body.distance === "10K") {
    return "10KM";
  }
  return "lange afstand";
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
    const checkoutUrl = await createPayment(registration);
    // const htmlMessage = `
    //   <h1>PowerPlus Natuurlopen van Lier</h1>
    //   <p>
    //   Bedankt voor uw deelname aan de POWERPLUS Natuurlopen van Lier.
    //   Uw inschrijving voor <strong>${parseRegistrationDistance(
    //     registration
    //   )}</strong>
    //   </p>
    //   <p>
    //   Uw nummer kan op de dag van de wedstrijd afgehaald worden op het inschrijfbureau in de foyer van CC De Mol,
    //   <strong>Aarschotsesteenweg 4, 2500 Lier.</strong> (Aan de ingang van de atletiekpiste).
    //   </p>
    //   <p>
    //     We adviseren u ook om op de website www.natuurlopenvanlier.be de praktische ABC te lezen, zo bent u van alles op de hoogte.
    //   </p>
    //   <p>
    //   Sportieve groeten en succes bij de Natuurlopen van Lier.
    //   Het organisatiecomité van AV Lyra-Lierse vzw.
    //   </p>
    // `;
    // const textMessage = htmlMessage.replace(/<\/?\w+>/g, "");
    // await sendGridMail.send({
    //   to: [
    //     {
    //       name: registration.name,
    //       email: registration.email,
    //     },
    //   ],
    //   bcc: [
    //     { name: registrationMailBccList[0], email: registrationMailBccList[1] },
    //     { name: registrationMailBccList[2], email: registrationMailBccList[3] },
    //   ],
    //   from: "info@avll.be",
    //   replyToList: [
    //     {
    //       name: registrationMailReplyToList[0],
    //       email: registrationMailReplyToList[1],
    //     },
    //     {
    //       name: registrationMailReplyToList[2],
    //       email: registrationMailReplyToList[3],
    //     },
    //   ],
    //   subject: `Bevestiging inschrijving ${registration.event}`,
    //   text: textMessage,
    //   html: htmlMessage,
    // });
    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl,
      }),
    };
  } catch (error) {
    return parseEmailError(error);
  }
}
