import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
  NatureRun,
} from "@/types";
import { axiosInstanceNetlifyFunctions } from "./axios";

export function sendRegistrationEmails(
  natureRunRegistration: WithRequired<Registration, "gender" | "category">
) {
  return axiosInstanceNetlifyFunctions.post(
    "/send-registration-emails",
    natureRunRegistration
  );
}

export async function handleNatureRunPayment(body: {
  natureRunRegistration: WithRequired<
    NatureRunRegistration,
    "gender" | "distance"
  >;
  natureRun: NatureRun;
}) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-payment", body);
  window.location.assign(checkoutUrl);
}

export async function handleNatureRunRegistration(body: {
  natureRunRegistrationId: number;
}) {
  return axiosInstanceNetlifyFunctions.post(
    "/handle-nature-run-registration",
    body
  );
}
