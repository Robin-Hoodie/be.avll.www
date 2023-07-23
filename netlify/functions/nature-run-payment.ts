import createMollieClient from "@mollie/api-client";
import { defineEnvVariable } from "./env";

const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
// Predefined Netlify env variable
const URL = defineEnvVariable("URL");

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

function getPrice(natureRunRegistration: any) {
  const basePrice = 7;
  return Object.entries(natureRunRegistration).reduce(
    (priceCurrent, [prop, value]) => {
      if (prop === "isMember" && value === true) {
        return priceCurrent - 2;
      }
      if (prop === "withTShirt" && value === true) {
        return priceCurrent + 17;
      }
      return priceCurrent;
    },
    basePrice
  );
}

export async function createPayment(natureRunRegistration: any) {
  const price = getPrice(natureRunRegistration);
  await mollieClient.payments.create({
    amount: {
      value: price.toString(),
      currency: "EUR",
    },
    // TODO: add date of natuurloop
    description: "Betaling voor natuurloop",
    redirectUrl: `${URL}/natuurlopen/succes`,
  });
}
