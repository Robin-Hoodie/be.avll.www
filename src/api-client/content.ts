import {
  Person,
  TitleWithContent,
  Article,
  Sponsor,
  UpcomingContest,
  Contest,
  Result,
  RegistrationPage,
  Training,
  StrapiEntry,
  Role,
  FileLink,
  RegistrationContest,
} from "@/types";
import qs from "qs";
import { axiosInstanceContent } from "./axios";
import dayjs from "dayjs";

interface PersonRaw extends Omit<Person, "roles"> {
  roles: {
    data: Array<StrapiEntry<{ name: string }>>;
  };
}

export async function getPeople(): Promise<Person[]> {
  const query = qs.stringify({
    populate: ["profilePhoto", "roles"],
  });
  const peopleRaw = await axiosInstanceContent.get<PersonRaw[], PersonRaw[]>(
    `/people?${query}`
  );
  return peopleRaw.map((person) => ({
    ...person,
    roles: person.roles.data.map((role) => role.attributes.name as Role),
  }));
}

export function getWelcomePage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/welcome-page"
  );
}

export function getConfidantPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/confidant-page"
  );
}

export function getBecomingAMemberPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/becoming-a-member-page"
  );
}

export function getSportingAccidentPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/sporting-accident-page"
  );
}

export function getBlogArticles() {
  const threeMonthsAgo = dayjs().subtract(3, "month").format("YYYY-MM-DD");
  const query = qs.stringify({
    populate: "coverPhoto",
    filters: {
      createdAt: {
        $gte: threeMonthsAgo,
      },
      sort: "createdAt:desc",
    },
  });
  return axiosInstanceContent.get<Article[], Article[]>(
    `/blog-articles?${query}`
  );
}

export function getBlogArticle(id: number | string) {
  const query = qs.stringify({
    populate: "coverPhoto",
  });
  return axiosInstanceContent.get<Article, Article>(
    `/blog-articles/${id}?${query}`
  );
}

export function getSponsors() {
  const query = qs.stringify({
    populate: "picture",
  });
  return axiosInstanceContent.get<Sponsor[], Sponsor[]>(`/sponsors?${query}`);
}

export function getUpcomingContests() {
  const query = qs.stringify({
    sort: "date",
  });
  return axiosInstanceContent.get<UpcomingContest[], UpcomingContest[]>(
    `/upcoming-contests?${query}`
  );
}

export function getRegistrationContests() {
  const now = dayjs().format("YYYY-MM-DD");
  const query = qs.stringify({
    sort: "dateStart",
    filters: {
      dateStart: {
        $gte: now,
      },
    },
  });
  return axiosInstanceContent.get<RegistrationContest[], RegistrationContest[]>(
    `/registration-contests?${query}`
  );
}

export function getContests() {
  const oneWeekAgo = dayjs().subtract(1, "week").format("YYYY-MM-DD");
  const query = qs.stringify({
    filters: {
      date: {
        $gte: oneWeekAgo,
      },
      sort: "date",
    },
  });
  return axiosInstanceContent.get<Contest[], Contest[]>(`/contests?${query}`);
}

export function getResults() {
  const query = qs.stringify({
    sort: "date",
  });
  return axiosInstanceContent.get<Result[], Result[]>(`/results?${query}`);
}

export function getRegistrationPage() {
  return axiosInstanceContent.get<RegistrationPage, RegistrationPage>(
    "/registration-page"
  );
}

export function getTrainings() {
  return axiosInstanceContent.get<Training[], Training[]>("/trainings");
}

export async function getFileLinks(types: Array<FileLink["type"]>) {
  const query = qs.stringify({
    populate: "file",
    filters: {
      type: {
        $in: types,
      },
    },
  });
  return await axiosInstanceContent.get<FileLink[], FileLink[]>(
    `/file-links?${query}`
  );
}
