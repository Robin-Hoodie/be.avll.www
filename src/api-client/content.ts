import {
  Person,
  Article,
  Sponsor,
  UpcomingContest,
  Contest,
  Result,
  RegistrationPage,
  Training,
  StrapiEntry,
  Role,
  ClubRecord,
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

export function getWelcomeArticle() {
  return axiosInstanceContent.get<Article, Article>("/welcome-article");
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
      dateFinalRegistration: {
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

export function getClubRecords() {
  const query = qs.stringify({
    populate: "file",
  });
  return axiosInstanceContent.get<ClubRecord[], ClubRecord[]>(
    `/club-records?${query}`
  );
}

export async function getFileLinks(
  types: Array<
    | "philosophy"
    | "youthPlan"
    | "statutes"
    | "missionStatement"
    | "privacyStatement"
  >
) {
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
