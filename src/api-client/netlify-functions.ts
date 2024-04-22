import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
  NatureRun,
} from "@/types";
import { axiosInstanceNetlifyFunctions } from "./axios";
import { IS_PRODUCTION } from "@/env";

export function sendRegistrationEmails(
  natureRunRegistration: WithRequired<Registration, "gender" | "category">
) {
  return axiosInstanceNetlifyFunctions.post(
    "/send-registration-emails",
    natureRunRegistration
  );
}

export async function handleNatureRunRegistration(body: {
  natureRunRegistration: WithRequired<
    NatureRunRegistration,
    "gender" | "distance"
  >;
  natureRun: NatureRun;
}) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-registration", body);
  return checkoutUrl;
}
