import { StrapiEntry } from "./strapi";

export interface NatureRunRegistrationRaw {
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
  distance: number | null;
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
  natureRun: number;
}

export type NatureRunRegistrationGender = "male" | "female" | "unidentified";
type NatureRunRegistrationDistance = StrapiEntry<{
  label: string;
  basePrice: number;
}>;
export type TShirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type NatureRun = StrapiEntry<{
  title: string;
  memberDiscount: number;
  tShirtPrice: number | null;
  registrationStartDate: string;
  registrationEndDate: string;
  date: string;
  isPK: boolean;
  emailSubject: string;
  emailContent: string;
  distances: {
    data: NatureRunRegistrationDistance[];
  };
}>;
