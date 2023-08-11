import { File } from "./strapi";

interface StrapiModel {
  id: number;
  // Fields are in ISO-8601 format
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export type Role =
  | "management"
  | "partyManagement"
  | "confidant"
  | "trainerYouth"
  | "trainerFromCadet"
  | "trainerGTeam"
  | "trainerJoggers";

export type TrainerRole = Extract<
  Role,
  "trainerYouth" | "trainerFromCadet" | "trainerGTeam" | "trainerJoggers"
>;

export interface Person extends StrapiModel {
  name: string;
  phoneMobile: string | null;
  phoneLandLine: string | null;
  email: string | null;
  profilePhoto: File | null;
  addressStreet: string | null;
  addressZip: string | null;
  addressPlace: string | null;
  roles: Role[];
  isProminent: boolean;
  titleAsManagement: string | null;
  titleAsPartyManagement: string | null;
  titleAsConfidant: string | null;
  titleAsTrainerYouth: string | null;
  titleAsTrainerFromCadet: string | null;
  titleAsTrainerGTeam: string | null;
  titleAsTrainerJoggers: string | null;
}

export interface Article extends StrapiModel {
  title: string;
  content: string;
  location: string | null;
  coverPhoto: File | null;
}

export interface TitleWithContent extends StrapiModel {
  title: string;
  content: string;
}

export interface Sponsor extends StrapiModel {
  link: string;
  picture: File;
}

export interface UpcomingContest extends StrapiModel {
  title: string;
  link: string;
  linkText: string;
  date: string;
  location: string;
  dateFinalRegistration: string | null;
  registrationByClub: boolean;
}

export interface RegistrationContest extends StrapiModel {
  title: string;
  dateStart: string;
  dateEnd: string | null;
  location: string;
  dateFinalRegistration: string;
  infoLink: string | null;
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

export interface FileLink extends StrapiModel {
  description: string;
  file: File;
  type:
    | "philosophy"
    | "youthPlan"
    | "houseRules"
    | "vision"
    | "privacyStatement"
    | "clubRecord";
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

export type RegistrationCategory =
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
  gender: RegistrationGender | null;
  birthYear: string;
  category: RegistrationCategory | null;
  valNumber: string;
  discipline: string;
  bestPerformance: string;
  comment: string;
}

export type RegistrationGender = "male" | "female";
