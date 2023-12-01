import axios from "axios";
import sendGridMail from "@sendgrid/mail";
import createMollieClient, { Locale } from "@mollie/api-client";
import { defineEnvVariable } from "./env";
import { formatDateFull, parseError } from "./utils";
import type { NatureRun, NatureRunRegistration, WithId } from "../types";

// Predefined Netlify env variable
const URL = defineEnvVariable("URL");
const BASE_URL_CONTENT = defineEnvVariable("VITE_BASE_URL_CONTENT");
const SENDGRID_API_KEY = defineEnvVariable("SENDGRID_API_KEY");
const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
const NATURE_RUN_API_KEY = defineEnvVariable("NATURE_RUN_API_KEY");
const REGISTRATION_MAIL_NATURE_RUN_REPLY_TO = defineEnvVariable(
  "REGISTRATION_MAIL_NATURE_RUN_REPLY_TO",
  true
);
const REGISTRATION_MAIL_NATURE_RUN_BCC_LIST = defineEnvVariable(
  "REGISTRATION_MAIL_NATURE_RUN_BCC_LIST",
  true
);

const natureRunAuthHeader = {
  Authorization: `Bearer ${NATURE_RUN_API_KEY}`,
};

sendGridMail.setApiKey(SENDGRID_API_KEY);

const axiosInstance = axios.create({
  baseURL: `${BASE_URL_CONTENT}/api`,
  transformResponse(response: string) {
    const parsedResponse = JSON.parse(response);
    if (!parsedResponse.data) {
      return response;
    }
    const { data } = parsedResponse;
    if (Array.isArray(data)) {
      return data.map((element) => {
        const { id, attributes } = element;
        return {
          id,
          ...attributes,
        };
      });
    }
    const { id, attributes } = data;
    return {
      id,
      ...attributes,
    };
  },
});
axiosInstance.interceptors.response.use((response) => response.data);

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

export async function getNatureRunRegistrationWithNatureRun(id: number) {
  const natureRunRegistration = await axiosInstance.get<
    WithId<
      NatureRunRegistration & {
        natureRun: { data: { id: number; attributes: Omit<NatureRun, "id"> } };
      }
    >,
    WithId<
      NatureRunRegistration & {
        natureRun: { data: { id: number; attributes: Omit<NatureRun, "id"> } };
      }
    >
  >(`/nature-run-registrations/${id}?populate=natureRun`, {
    headers: natureRunAuthHeader,
  });
  return {
    natureRunRegistration,
    natureRun: {
      ...natureRunRegistration.natureRun.data.attributes,
      id: natureRunRegistration.natureRun.data.id,
    },
  };
}

export async function createNatureRunRegistration(
  natureRunRegistration: NatureRunRegistration,
  natureRun: NatureRun
) {
  return axiosInstance.post<
    WithId<NatureRunRegistration>,
    WithId<NatureRunRegistration>
  >(
    "/nature-run-registrations",
    {
      data: {
        ...natureRunRegistration,
        natureRun: natureRun.id,
      },
    },
    {
      headers: natureRunAuthHeader,
    }
  );
}

export function markNatureRunRegistrationAsPaid(id: number) {
  return axiosInstance.put(
    `/nature-run-registrations/${id}`,
    {
      data: {
        isPaid: true,
      },
    },
    {
      headers: natureRunAuthHeader,
    }
  );
}

function parseNatureRunRegistrationDistance(
  natureRunRegistration: NatureRunRegistration
) {
  if (natureRunRegistration.distance === "fiveK") {
    return "5KM";
  }
  if (natureRunRegistration.distance === "tenK") {
    return "10KM";
  }
  return "lange afstand";
}

export async function sendNatureRunRegistrationEmail(
  natureRunRegistration: NatureRunRegistration,
  natureRun: NatureRun
) {
  const distanceParsed = parseNatureRunRegistrationDistance(
    natureRunRegistration
  );
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
          name: `${natureRunRegistration.firstName} ${natureRunRegistration.lastName}`,
          email: natureRunRegistration.email,
        },
      ],
      bcc: [
        {
          name: REGISTRATION_MAIL_NATURE_RUN_BCC_LIST[0],
          email: REGISTRATION_MAIL_NATURE_RUN_BCC_LIST[1],
        },
      ],
      from: "natuurlopen@avll.be",
      replyToList: [
        {
          name: REGISTRATION_MAIL_NATURE_RUN_REPLY_TO[0],
          email: REGISTRATION_MAIL_NATURE_RUN_REPLY_TO[1],
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
  const priceIncrease = natureRunRegistration.withTShirt
    ? natureRun.tShirtPrice ?? 0
    : 0;
  return natureRun.basePrice + priceIncrease + priceReduction;
}

export async function createPayment(
  natureRunRegistrationWithid: WithId<NatureRunRegistration>,
  natureRun: NatureRun
) {
  const price = await getPrice(natureRunRegistrationWithid, natureRun);
  const paymentResponse = await mollieClient.payments.create({
    amount: {
      value: price.toFixed(2),
      currency: "EUR",
    },
    description: `Betaling voor natuurloop op ${formatDateFull(
      natureRun.date
    )}`,
    redirectUrl: `${URL}/natuurlopen/${natureRunRegistrationWithid.id}/success`,
    // @ts-expect-error
    cancelUrl: `${URL}/natuurlopen/${natureRunRegistrationWithid.id}/failed`,
    locale: Locale.nl_BE,
  });
  // @ts-expect-error See https://github.com/mollie/mollie-api-node/issues/332
  return paymentResponse.getCheckoutUrl();
}
