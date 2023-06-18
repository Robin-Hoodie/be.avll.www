import { axiosInstanceNetlifyFunctions } from "./axios";

export function sendRegistrationEmails() {
  return axiosInstanceNetlifyFunctions.get("/send-registration-emails");
}
