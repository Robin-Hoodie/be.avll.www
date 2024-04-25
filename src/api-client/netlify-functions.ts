import type {
  Registration,
  WithRequired,
  NatureRunRegistrationRaw,
  NatureRun,
} from "@/types";
import { axiosInstanceNetlifyFunctions } from "./axios";

export function sendRegistrationEmails(
  registration: WithRequired<
    Registration["attributes"],
    "birthYear" | "gender" | "category"
  >
) {
  return axiosInstanceNetlifyFunctions.post(
    "/send-registration-emails",
    registration
  );
}

export async function handleNatureRunRegistration(
  body: WithRequired<
    NatureRunRegistrationRaw,
    "gender" | "distance" | "birthYear"
  >
) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-registration", body);
  return checkoutUrl;
}
