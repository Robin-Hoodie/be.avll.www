import type {
  Registration,
  WithRequired,
  NatureRunRegistrationRaw,
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
  const { redirectUrl } = await axiosInstanceNetlifyFunctions.post<
    { redirectUrl: string },
    { redirectUrl: string }
  >("/handle-nature-run-registration", body);
  return redirectUrl;
}
