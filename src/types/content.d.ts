import { StrapiEntry, StrapiFile } from "./strapi";

type RoleName =
  | "management"
  | "partyManagement"
  | "confidant"
  | "trainerYouth"
  | "trainerFromCadet"
  | "trainerGTeam"
  | "trainerJoggers";

export type TrainerRoleName = Extract<
  RoleName,
  "trainerYouth" | "trainerFromCadet" | "trainerGTeam" | "trainerJoggers"
>;

export type Role = StrapiEntry<{
  name: RoleName;
}>;

export type Person = StrapiEntry<{
  name: string;
  phoneMobile: string | null;
  phoneLandLine: string | null;
  email: string | null;
  profilePhoto: StrapiFile;
  addressStreet: string | null;
  addressZip: string | null;
  addressPlace: string | null;
  roles: { data: Role[] };
  titleAsManagement: string | null;
  titleAsPartyManagement: string | null;
  titleAsConfidant: string | null;
  titleAsTrainerYouth: string | null;
  titleAsTrainerFromCadet: string | null;
  titleAsTrainerGTeam: string | null;
  titleAsTrainerJoggers: string | null;
  isProminentForManagement: boolean;
  isProminentForPartyManagement: boolean;
  isProminentForConfidant: boolean;
  isProminentForTrainerYouth: boolean;
  isProminentForTrainerFromCadet: boolean;
  isProminentForTrainerGTeam: boolean;
  isProminentForTrainerJoggers: boolean;
}>;

export type BlogArticle = StrapiEntry<{
  title: string;
  content: string;
  location: string | null;
  coverPhoto: StrapiFile;
  date: string;
  links: { data: BlogArticleLink[] | null };
}>;

export type BlogArticleLink = StrapiEntry<{
  text: string;
  link: string;
}>;

export type TitleWithContent = StrapiEntry<{
  title: string;
  content: string;
}>;

export type Sponsor = StrapiEntry<{
  link: string;
  picture: StrapiFile;
  name: string;
  addressStreet: string | null;
  addressZip: string | null;
  addressPlace: string | null;
}>;

export type UpcomingContest = StrapiEntry<{
  title: string;
  date: string;
  location: string;
  dateFinalRegistration: string | null;
  registrationByClub: boolean;
  primaryLink: string;
  primaryLinkText: string;
  secondaryLink: string | null;
  secondaryLinkText: string | null;
}>;

export type MultimediaLink = StrapiEntry<{
  description: string;
  link: string;
}>;

export type RegistrationContest = StrapiEntry<{
  title: string;
  dateStart: string;
  dateEnd: string | null;
  location: string;
  dateFinalRegistration: string;
  infoLink: string | null;
}>;

export type Contest = StrapiEntry<{
  title: string;
  date: string;
  registrationLink: string | null;
  scheduleLink: string | null;
  websiteLink: string | null;
}>;

export type Result = StrapiEntry<{
  title: string;
  date: string;
  link: string | null;
}>;

export type FileLink = StrapiEntry<{
  description: string;
  file: StrapiFile;
  type:
    | "youthPlan"
    | "visionAndOperation"
    | "privacyStatement"
    | "record"
    | "calendar";
  sortPriority?: number;
}>;

export type RegistrationPage = StrapiEntry<{
  introText: string;
  privacyStatement: string;
  registrationSubmittedMessage: string;
  registrationSubmittedCloseButtonText: string;
}>;

export type TrainingPage = StrapiEntry<{
  title: string;
  introYouth: string;
  introFromCadet: string;
  introGTeam: string;
  introJoggers: string;
}>;

export type Training = StrapiEntry<{
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
}>;

export type RegistrationCategory =
  | "Benjamins"
  | "Pupillen"
  | "Miniemen"
  | "Kadetten"
  | "Scholieren"
  | "Juniors"
  | "Seniors"
  | "Masters";

export type Registration = StrapiEntry<{
  event: string;
  name: string;
  email: string;
  gender: RegistrationGender | null;
  birthYear: number | null;
  category: RegistrationCategory | null;
  valNumber: string;
  discipline: string;
  bestPerformance: string;
  comment: string;
}>;

export type RegistrationGender = "male" | "female";
