export interface NatureRunRegistration {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  bus: string;
  zipCode: string;
  city: string;
  gender: NatureRunRegistrationGender | null;
  birthYear: number | null;
  emergencyPhoneNumber: string;
  distance: NatureRunRegistrationDistance | null;
  comment: string;
  withTShirt: boolean;
  tShirtSize?: TShirtSize;
  isMember: boolean;
  agreeToPrivacyTerms: boolean;
}

export type NatureRunRegistrationGender = "male" | "female" | "unidentified";
export type NatureRunRegistrationDistance = "5K" | "10K" | "Long";
export type TShirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
