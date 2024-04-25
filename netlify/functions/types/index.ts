// Duplicate from client code

export interface StrapiEntry<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  id: number;
  attributes: T;
}

export type NatureRunRegistrationRaw = Omit<
  NatureRunRegistration["attributes"],
  "distance" | "natureRun"
> & {
  distance: number;
  natureRun: number;
};

export type NatureRunRegistration = StrapiEntry<{
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
  distance: { data: NatureRunRegistrationDistance };
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
  natureRun: { data: NatureRun };
}>;

export type NatureRunRegistrationDistance = StrapiEntry<{
  label: "fiveK" | "tenK" | "long";
  basePrice: number;
}>;

export type NatureRunRegistrationGender = "male" | "female" | "unidentified";
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
