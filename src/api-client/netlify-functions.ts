import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
  NatureRun,
} from "@/types";
import { axiosInstanceNetlifyFunctions } from "./axios";

interface RegistrationWithNatureRun {
  registration: WithRequired<NatureRunRegistration, "gender" | "distance">;
  natureRun: NatureRun;
}

export function sendRegistrationEmails(
  registration: WithRequired<Registration, "gender" | "category">
) {
  return axiosInstanceNetlifyFunctions.post(
    "/send-registration-emails",
    registration
  );
}

export async function handleNatureRunPayment(body: RegistrationWithNatureRun) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-payment", body);
  window.location.assign(checkoutUrl);
}

export async function handleNatureRunRegistration(
  body: RegistrationWithNatureRun
) {
  return axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-registration", body);
}
