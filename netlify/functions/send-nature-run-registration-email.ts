import sendGridMail from "@sendgrid/mail";
import { defineEnvVariable } from "./utils/env";
import { formatDateFull, parseEmailError } from "./utils/utils";
import type { NatureRun, NatureRunRegistration } from "./types";

sendGridMail.setApiKey(defineEnvVariable("SENDGRID_API_KEY"));

const registrationMailReplyTo = defineEnvVariable(
  "REGISTRATION_MAIL_NATURE_RUN_REPLY_TO",
  true
);

function parseRegistrationDistance(registration: NatureRunRegistration) {
  if (registration.distance === "fiveK") {
    return "5KM";
  }
  if (registration.distance === "tenK") {
    return "10KM";
  }
  return "lange afstand";
}

export async function sendNatureRunRegistrationEmail(
  registration: NatureRunRegistration,
  natureRun: NatureRun
) {
  const distanceParsed = parseRegistrationDistance(registration);
  try {
    const htmlMessage = `
      <h1>PowerPlus Natuurlopen van Lier</h1>
      <p>
      Bedankt voor uw deelname aan de POWERPLUS Natuurlopen van Lier.
      Uw inschrijving voor <strong>${distanceParsed}</strong>
      </p>
      <p>
      Uw nummer kan op de dag van de wedstrijd afgehaald worden op het inschrijfbureau in de foyer van CC De Mol,
      <strong>Aarschotsesteenweg 4, 2500 Lier.</strong> (Aan de ingang van de atletiekpiste).
      </p>
      <p>
        We adviseren u ook om op de website www.natuurlopenvanlier.be de praktische ABC te lezen, zo bent u van alles op de hoogte.
      </p>
      <p>
      Sportieve groeten en succes bij de Natuurlopen van Lier.
      Het organisatiecomité van AV Lyra-Lierse vzw.
      </p>
    `;
    const textMessage = htmlMessage.replace(/<\/?\w+>/g, "");
    await sendGridMail.send({
      to: [
        {
          name: `${registration.firstName} ${registration.lastName}`,
          email: registration.email,
        },
      ],
      from: "info@avll.be",
      replyToList: [
        {
          name: registrationMailReplyTo[0],
          email: registrationMailReplyTo[1],
        },
      ],
      subject: `Bevestiging inschrijving ${distanceParsed} op ${formatDateFull(
        natureRun.date
      )}`,
      text: textMessage,
      html: htmlMessage,
    });
    return {
      statusCode: 200,
    };
  } catch (error) {
    return parseEmailError(error);
  }
}
