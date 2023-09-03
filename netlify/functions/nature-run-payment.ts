import createMollieClient, { Locale } from "@mollie/api-client";
import axios from "axios";
import { defineEnvVariable } from "./env";

const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
// Predefined Netlify env variable
const URL = defineEnvVariable("URL");

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

async function getPrice(natureRunRegistration: any) {
  const {
    data: {
      data: {
        attributes: { basePrice, memberDiscount, tShirtPrice },
      },
    },
  } = await axios.get<{
    data: {
      attributes: {
        basePrice: number;
        memberDiscount: number;
        tShirtPrice: number;
      };
    };
  }>("https://content.avll.be/api/nature-run-pricing");
  return Object.entries(natureRunRegistration).reduce(
    (priceCurrent, [prop, value]) => {
      if (prop === "isMember" && value === true) {
        return priceCurrent - memberDiscount;
      }
      if (prop === "withTShirt" && value === true) {
        return priceCurrent + tShirtPrice;
      }
      return priceCurrent;
    },
    basePrice
  );
}

export async function createPayment(natureRunRegistration: any) {
  const price = await getPrice(natureRunRegistration);
  const paymentResponse = await mollieClient.payments.create({
    amount: {
      value: price.toFixed(2),
      currency: "EUR",
    },
    // TODO: add date of natuurloop
    description: "Betaling voor natuurloop",
    redirectUrl: `${URL}/natuurlopen/succes`,
    locale: Locale.nl_BE,
  });
  return paymentResponse.getCheckoutUrl();
}
