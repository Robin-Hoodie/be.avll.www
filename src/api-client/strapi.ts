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
} from "@/types";
import { axiosInstanceStrapi } from "./axios";

export function getManagementMembers() {
  return axiosInstanceStrapi.get<Person[], Person[]>(
    "/management-members?populate[0]=portraitPhoto"
  );
}

export function getWelcomeArticle() {
  return axiosInstanceStrapi.get<Article, Article>("/welcome-article");
}

export function getBlogArticles() {
  return axiosInstanceStrapi.get<Article[], Article[]>(
    "/blog-articles?populate[0]=coverPhoto"
  );
}

export function getBlogArticle(id: number | string) {
  return axiosInstanceStrapi.get<Article, Article>(
    `/blog-articles/${id}?populate[0]=coverPhoto`
  );
}

export function getSponsors() {
  return axiosInstanceStrapi.get<Sponsor[], Sponsor[]>(
    "/sponsors?populate[0]=picture"
  );
}

export function getUpcomingEvents() {
  return axiosInstanceStrapi.get<UpcomingEvent[], UpcomingEvent[]>(
    "/upcoming-events?sort=date"
  );
}

export function getContests() {
  return axiosInstanceStrapi.get<Contest[], Contest[]>("/contests?sort=date");
}

export function getResults() {
  return axiosInstanceStrapi.get<Result[], Result[]>("/results?sort=date");
}

export function getFooterLinks() {
  return axiosInstanceStrapi.get<FooterLink[], FooterLink[]>(
    "/footer-links?populate[0]=file"
  );
}

export function getRegistrationPage() {
  return axiosInstanceStrapi.get<RegistrationPage, RegistrationPage>(
    "/registration-page"
  );
}

export function getTrainings() {
  return axiosInstanceStrapi.get<Training[], Training[]>("/trainings");
}
