import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
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

export async function handleNatureRunRegistration(body: {
  natureRunRegistrationRaw: WithRequired<
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
