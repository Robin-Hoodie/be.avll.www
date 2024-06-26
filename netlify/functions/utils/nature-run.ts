import axios from "axios";
import sendGridMail from "@sendgrid/mail";
import createMollieClient, { Locale } from "@mollie/api-client";
import { defineEnvVariable } from "./env";
import { formatDateFull, parseError } from "./utils";
import type { NatureRunRegistration, NatureRunRegistrationRaw } from "../types";
import {
  parseNatureRunEmailContent,
  parseNatureRunEmailSubject,
} from "./nature-run-email-template-parser";

const BASE_URL_CONTENT = defineEnvVariable("VITE_BASE_URL_CONTENT");
const SENDGRID_API_KEY = defineEnvVariable("SENDGRID_API_KEY");
const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
const NATURE_RUN_API_KEY = defineEnvVariable("NATURE_RUN_API_KEY");
const REGISTRATION_MAIL_NATURE_RUN_REPLY_TO = defineEnvVariable(
  "REGISTRATION_MAIL_NATURE_RUN_REPLY_TO",
  true
);
// NGROK_URL is only defined in local dev mode
const SITE_URL = process.env.NGROK_URL || defineEnvVariable("URL");

const natureRunAuthHeader = {
  Authorization: `Bearer ${NATURE_RUN_API_KEY}`,
};

sendGridMail.setApiKey(SENDGRID_API_KEY);

const axiosInstance = axios.create({
  baseURL: `${BASE_URL_CONTENT}/api`,
});
axiosInstance.interceptors.response.use((response) => response.data.data);

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

export async function getNatureRunRegistration(id: number) {
  return axiosInstance.get<NatureRunRegistration, NatureRunRegistration>(
    `/nature-run-registrations/${id}?populate=*`,
    {
      headers: natureRunAuthHeader,
    }
  );
}

export async function createNatureRunRegistration(
  natureRunRegistrationRaw: NatureRunRegistrationRaw
) {
  return axiosInstance.post<NatureRunRegistration, NatureRunRegistration>(
    "/nature-run-registrations?populate=*",
    {
      data: {
        ...natureRunRegistrationRaw,
      },
    },
    {
      headers: natureRunAuthHeader,
    }
  );
}

export async function addMollieIdToNatureRunRegistration(
  natureRunRegistrationId: number,
  mollieId: string
) {
  return axiosInstance.put(
    `/nature-run-registrations/${natureRunRegistrationId}`,
    {
      data: {
        mollieId,
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

export async function sendNatureRunRegistrationEmail(
  natureRunRegistration: NatureRunRegistration
) {
  try {
    const emailSubject = parseNatureRunEmailSubject(natureRunRegistration);
    const emailHtml = parseNatureRunEmailContent(natureRunRegistration);
    const emailText = emailHtml.replace(/<\/?\w+>/g, "");
    await sendGridMail.send({
      to: [
        {
          name: `${natureRunRegistration.attributes.firstName} ${natureRunRegistration.attributes.lastName}`,
          email: natureRunRegistration.attributes.email,
        },
      ],
      from: "natuurlopen@avll.be",
      replyToList: [
        {
          name: REGISTRATION_MAIL_NATURE_RUN_REPLY_TO[0],
          email: REGISTRATION_MAIL_NATURE_RUN_REPLY_TO[1],
        },
      ],
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });
    return {
      statusCode: 200,
    };
  } catch (error) {
    return parseError(error);
  }
}

async function getPrice(natureRunRegistration: NatureRunRegistration) {
  const priceReduction = natureRunRegistration.attributes.isMember
    ? -natureRunRegistration.attributes.natureRun.data.attributes.memberDiscount
    : 0;
  const priceIncrease = natureRunRegistration.attributes.withTShirt
    ? natureRunRegistration.attributes.natureRun.data.attributes.tShirtPrice ??
      0
    : 0;
  return Math.max(
    natureRunRegistration.attributes.distance.data.attributes.basePrice +
      priceIncrease +
      priceReduction,
    0
  );
}

export async function createPayment(
  natureRunRegistration: NatureRunRegistration
) {
  const price = await getPrice(natureRunRegistration);
  const successRedirectUrl = `${SITE_URL}/natuurlopen/succes`;
  if (price > 0) {
    // await is necessary - payments.create does in fact return a promise - typing is wrong
    const paymentResponse = await mollieClient.payments.create({
      amount: {
        value: price.toFixed(2),
        currency: "EUR",
      },
      description: `Betaling voor natuurloop op ${formatDateFull(
        natureRunRegistration.attributes.natureRun.data.attributes.date
      )}`,
      redirectUrl: successRedirectUrl,
      // @ts-expect-error
      cancelUrl: `${SITE_URL}/natuurlopen/nope`,
      webhookUrl: `${SITE_URL}/api/handle-nature-run-payment`,
      metadata: {
        natureRunRegistrationId: natureRunRegistration.id,
      },
      locale: Locale.nl_BE,
    });
    return {
      // @ts-expect-error See https://github.com/mollie/mollie-api-node/issues/332
      redirectUrl: paymentResponse.getCheckoutUrl(),
      // @ts-expect-error ID is defined on paymentResponse, but doesn't seem to be added to types
      mollieId: paymentResponse.id,
    };
  }
  return {
    redirectUrl: successRedirectUrl,
    mollieId: null,
  };
}

export function getPayment(paymentId: string) {
  return mollieClient.payments.get(paymentId);
}
