export interface NatureRunRegistration {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  bus: string | null;
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
  natureRun: NatureRun;
}

export type NatureRunRegistrationGender = "male" | "female" | "unidentified";
export type NatureRunRegistrationDistance = "fiveK" | "tenK" | "long";
export type TShirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface NatureRun {
  basePrice: number;
  memberDiscount: number;
  tShirtPrice: number | null;
  registrationStartDate: string;
  registrationEndDate: string;
  date: string;
}
