import {
  Person,
  Article,
  Sponsor,
  UpcomingEvent,
  Contest,
  Result,
  FooterLink,
  RegistrationPage,
  Training,
  StrapiEntry,
  Role,
} from "@/types";
import { axiosInstanceContent } from "./axios";

interface PersonRaw extends Omit<Person, "roles"> {
  roles: {
    data: Array<StrapiEntry<{ name: string }>>;
  };
}

export async function getPeople(): Promise<Person[]> {
  const peopleRaw = await axiosInstanceContent.get<PersonRaw[], PersonRaw[]>(
    "/people?populate[0]=profilePhoto&populate[1]=roles"
  );
  return peopleRaw.map((person) => ({
    ...person,
    roles: person.roles.data.map((role) => role.attributes.name as Role),
  }));
}

export function getWelcomeArticle() {
  return axiosInstanceContent.get<Article, Article>("/welcome-article");
}

export function getBlogArticles() {
  return axiosInstanceContent.get<Article[], Article[]>(
    "/blog-articles?populate[0]=coverPhoto"
  );
}

export function getBlogArticle(id: number | string) {
  return axiosInstanceContent.get<Article, Article>(
    `/blog-articles/${id}?populate[0]=coverPhoto`
  );
}

export function getSponsors() {
  return axiosInstanceContent.get<Sponsor[], Sponsor[]>(
    "/sponsors?populate[0]=picture"
  );
}

export function getUpcomingEvents() {
  return axiosInstanceContent.get<UpcomingEvent[], UpcomingEvent[]>(
    "/upcoming-events?sort=date"
  );
}

export function getContests() {
  return axiosInstanceContent.get<Contest[], Contest[]>("/contests?sort=date");
}

export function getResults() {
  return axiosInstanceContent.get<Result[], Result[]>("/results?sort=date");
}

export function getFooterLinks() {
  return axiosInstanceContent.get<FooterLink[], FooterLink[]>(
    "/footer-links?populate[0]=file"
  );
}

export function getRegistrationPage() {
  return axiosInstanceContent.get<RegistrationPage, RegistrationPage>(
    "/registration-page"
  );
}

export function getTrainings() {
  return axiosInstanceContent.get<Training[], Training[]>("/trainings");
}
