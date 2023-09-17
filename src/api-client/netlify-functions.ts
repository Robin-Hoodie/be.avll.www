import type {
  Registration,
  WithRequired,
  NatureRunRegistration,
  NatureRun,
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

export async function handleNatureRunPayment(body: {
  registration: WithRequired<NatureRunRegistration, "gender" | "distance">;
  natureRun: NatureRun;
}) {
  const { checkoutUrl } = await axiosInstanceNetlifyFunctions.post<
    { checkoutUrl: string },
    { checkoutUrl: string }
  >("/handle-nature-run-payment", body);
  window.location.assign(checkoutUrl);
}
