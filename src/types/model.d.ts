import { Image } from "./strapi";

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
  mobilePhone?: string;
  landlinePhone?: string;
  email?: string;
  portraitPhoto?: Image;
  addressStreet?: string;
  addressZip?: string;
  addressPlace?: string;
}

export interface Article extends StrapiModel {
  title: string;
  content: string;
  location?: string;
  coverPhoto?: Image;
}

export interface Sponsor extends StrapiModel {
  link: string;
  picture: Image;
}

export interface UpcomingEvent extends StrapiModel {
  linkText: string;
  link: string;
  title: string;
  date: string;
  location: String;
  registrationFinalDate?: string;
  registrationByClub: boolean;
}

export interface Contest extends StrapiModel {
  title: string;
  date: string;
  registrationLink?: string;
  scheduleLink?: string;
  websiteLink?: string;
}

export interface Result extends StrapiModel {
  title: string;
  date: string;
  link: string;
}
