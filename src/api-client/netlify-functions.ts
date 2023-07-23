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

export function handleNatureRunRegistration(
  registration: WithRequired<NatureRunRegistration, "gender" | "distance">
) {
  return axiosInstanceNetlifyFunctions.post(
    "/handle-nature-run-registration",
    registration
  );
}
