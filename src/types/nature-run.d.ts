import { StrapiEntry } from "./strapi";

export interface NatureRunRegistration {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  bus: string | null;
  zipCode: string;
  place: string;
  gender: NatureRunRegistrationGender | null;
  birthYear: number | null;
  emergencyPhoneNumber: string;
  distance: NatureRunRegistrationDistance | null;
  comment: string;
  withTShirt: boolean;
  tShirtSize: TShirtSize | null;
  isMember: boolean;
  agreeToPrivacyTerms: boolean;
  isPaid: boolean;
  runsWithPK: boolean;
  clubName: string | null;
  bibNumber: string | null;
  mollieId: string | null;
}

export type NatureRunRegistrationGender = "male" | "female" | "unidentified";
export type NatureRunRegistrationDistance = "fiveK" | "tenK" | "long";
export type TShirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type NatureRun = StrapiEntry<{
  title: string;
  basePrice: number;
  memberDiscount: number;
  tShirtPrice: number | null;
  registrationStartDate: string;
  registrationEndDate: string;
  date: string;
  isPK: boolean;
  emailSubject: string;
  emailContent: string;
}>;
