import {
  Person,
  TitleWithContent,
  BlogArticle,
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
  TrainingPage,
  BlogArticleLink,
  MultimediaLink,
  NatureRun,
} from "@/types";
import qs from "qs";
import { axiosInstanceContent } from "./axios";
import dayjs from "dayjs";

const STRAPI_DATE_FORMAT = "YYYY-MM-DD";

interface PersonRaw extends Omit<Person, "roles"> {
  roles: {
    data: Array<StrapiEntry<{ name: string }>>;
  };
}

interface BlogArticleRaw extends Omit<BlogArticle, "links"> {
  links: {
    data: Array<StrapiEntry<BlogArticleLink>>;
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

export function getContactPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/contact-page"
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

export function getRecreationalClothingPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/recreational-clothing-page"
  );
}

export function getCompetitionClothingPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/competition-clothing-page"
  );
}

export function getMultimediaLinks() {
  const query = qs.stringify({
    sort: "createdAt:desc",
  });
  return axiosInstanceContent.get<MultimediaLink[], MultimediaLink[]>(
    `/multimedia-links?${query}`
  );
}

export async function getBlogArticles() {
  const threeMonthsAgo = dayjs()
    .subtract(3, "month")
    .format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    populate: ["coverPhoto", "links"],
    filters: {
      createdAt: {
        $gte: threeMonthsAgo,
      },
    },
    sort: "createdAt:desc",
  });

  const blogArticlesRaw = await axiosInstanceContent.get<
    BlogArticleRaw[],
    BlogArticleRaw[]
  >(`/blog-articles?${query}`);
  return blogArticlesRaw.map((blogArticleRaw) => ({
    ...blogArticleRaw,
    links: blogArticleRaw.links
      ? blogArticleRaw.links.data.map((linkRaw) => linkRaw.attributes)
      : null,
  }));
}

export async function getBlogArticle(id: number | string) {
  const query = qs.stringify({
    populate: ["coverPhoto", "links"],
  });
  const blogArticleRaw = await axiosInstanceContent.get<
    BlogArticleRaw,
    BlogArticleRaw
  >(`/blog-articles/${id}?${query}`);
  return {
    ...blogArticleRaw,
    links: blogArticleRaw.links
      ? blogArticleRaw.links.data.map((linkRaw) => linkRaw.attributes)
      : null,
  };
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
  const now = dayjs().format(STRAPI_DATE_FORMAT);
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
  const oneWeekAgo = dayjs().subtract(1, "week").format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    filters: {
      date: {
        $gte: oneWeekAgo,
      },
    },
    sort: "date",
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

export function getTrainingPage() {
  return axiosInstanceContent.get<TrainingPage, TrainingPage>("/training-page");
}

export function getYouthWorkPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/youth-work-page"
  );
}

export function getPerformanceFeePage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/performance-fee-page"
  );
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

export async function getNatureRun() {
  const now = dayjs().format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    filters: {
      registrationStartDate: {
        $lte: now,
      },
      registrationEndDate: {
        $gte: now,
      },
    },
  });
  try {
    const [natureRun] = await axiosInstanceContent.get<
      NatureRun[],
      NatureRun[]
    >(`/nature-runs?${query}`);
    return natureRun;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
