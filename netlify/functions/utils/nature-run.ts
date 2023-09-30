import axios from "axios";
import sendGridMail from "@sendgrid/mail";
import createMollieClient, { Locale } from "@mollie/api-client";
import { defineEnvVariable } from "./env";
import { formatDateFull, parseError } from "./utils";
import type { NatureRun, NatureRunRegistration } from "../types";

// Predefined Netlify env variable
const URL = defineEnvVariable("URL");
const BASE_URL_CONTENT = defineEnvVariable("VITE_BASE_URL_CONTENT");
const SENDGRID_API_KEY = defineEnvVariable("SENDGRID_API_KEY");
const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
const NATURE_RUN_API_KEY = defineEnvVariable("NATURE_RUN_API_KEY");

sendGridMail.setApiKey(SENDGRID_API_KEY);

const registrationMailReplyTo = defineEnvVariable(
  "REGISTRATION_MAIL_NATURE_RUN_REPLY_TO",
  true
);

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

export function createNatureRunRegistration(
  natureRunRegistration: NatureRunRegistration
) {
  return axios.post(
    `${BASE_URL_CONTENT}/api/nature-run-registration`,
    natureRunRegistration,
    {
      headers: {
        Authorization: `Bearer ${NATURE_RUN_API_KEY}`,
      },
    }
  );
}

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
    return parseError(error);
  }
}

async function getPrice(
  natureRunRegistration: NatureRunRegistration,
  natureRun: NatureRun
) {
  const priceReduction = natureRunRegistration.isMember
    ? -natureRun.memberDiscount
    : 0;
  const priceIncrease =
    typeof natureRun.withTShirt === "number" && natureRunRegistration.withTShirt
      ? natureRun.tShirtPrice ?? 0
      : 0;
  return natureRun.basePrice + priceIncrease + priceReduction;
}

export async function createPayment(
  natureRunRegistration: NatureRunRegistration,
  natureRun: NatureRun
) {
  const price = await getPrice(natureRunRegistration, natureRun);
  const paymentResponse = await mollieClient.payments.create({
    amount: {
      value: price.toFixed(2),
      currency: "EUR",
    },
    description: `Betaling voor natuurloop op ${natureRun.date}`,
    redirectUrl: `${URL}/natuurlopen/succes`,
    locale: Locale.nl_BE,
  });
  return paymentResponse.getCheckoutUrl();
}
