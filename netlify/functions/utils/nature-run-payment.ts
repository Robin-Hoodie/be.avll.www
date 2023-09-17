import createMollieClient, { Locale } from "@mollie/api-client";
import { defineEnvVariable } from "./env";
import type { NatureRun, NatureRunRegistration } from "../types";

const MOLLIE_API_KEY = defineEnvVariable("MOLLIE_API_KEY");
// Predefined Netlify env variable
const URL = defineEnvVariable("URL");

const mollieClient = createMollieClient({
  apiKey: MOLLIE_API_KEY,
});

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
