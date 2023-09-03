import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
} from "@/types";
import { axiosInstanceNetlifyFunctions } from "./axios";

export function sendRegistrationEmails(
  registration: WithRequired<Registration, "gender" | "category">
) {
  return axiosInstanceNetlifyFunctions.post(
    "/send-registration-emails",
    registration
  );
}

export async function handleNatureRunRegistration(
  registration: WithRequired<NatureRunRegistration, "gender" | "distance">
) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-payment", registration);
  window.location.assign(checkoutUrl);
}
