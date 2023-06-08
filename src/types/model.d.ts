import { File } from "./strapi";

interface StrapiModel {
  id: number;
  // Fields are in ISO-8601 format
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface Person extends StrapiModel {
  title: string;
  name: string;
  mobilePhone: string | null;
  landlinePhone: string | null;
  email: string | null;
  portraitPhoto: File | null;
  addressStreet: string | null;
  addressZip: string | null;
  addressPlace: string | null;
}

export interface Article extends StrapiModel {
  title: string;
  content: string;
  location: string | null;
  coverPhoto: File | null;
}

export interface Sponsor extends StrapiModel {
  link: string;
  picture: File;
}

export interface UpcomingEvent extends StrapiModel {
  linkText: string;
  link: string;
  title: string;
  date: string;
  location: String;
  registrationFinalDate: string | null;
  registrationByClub: boolean;
}

export interface Contest extends StrapiModel {
  title: string;
  date: string;
  registrationLink: string | null;
  scheduleLink: string | null;
  websiteLink: string | null;
}

export interface Result extends StrapiModel {
  title: string;
  date: string;
  link: string;
}

export interface FooterLink extends StrapiModel {
  description: string;
  link: string | null;
  file: File | null;
  icon: string | null;
}

export interface RegistrationPage extends StrapiModel {
  introText: string;
  privacyStatement: string;
  registrationSubmittedMessage: string;
  registrationSubmittedCloseButtonText: string;
}

export interface Training extends StrapiModel {
  day:
    | "Maandag"
    | "Dinsdag"
    | "Woensdag"
    | "Donderdag"
    | "Vrijdag"
    | "Zaterdag"
    | "Zondag";
  startTime: string;
  endTime: string;
  place: string;
  type: "youth" | "fromCadet" | "gTeam" | "joggers";
  comment: string | null;
}

export type Category =
  | "Benjamins"
  | "Pupillen"
  | "Miniemen"
  | "Kadetten"
  | "Scholieren"
  | "Juniors"
  | "Seniors"
  | "Masters";

export interface Registration {
  event: string;
  name: string;
  email: string;
  gender: "male" | "female";
  birthYear: string;
  category: Category;
  valNumber: string;
  discipline: string;
  bestPerformance: string;
  comment: string;
}

export interface RegistrationInitial
  extends Omit<Registration, "gender" | "category"> {
  gender: null;
  category: null;
}
