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
  FileLink,
  RegistrationContest,
  TrainingPage,
  MultimediaLink,
  NatureRun,
} from "@/types";
import qs from "qs";
import { axiosInstanceContent } from "./axios";
import dayjs from "dayjs";

const STRAPI_DATE_FORMAT = "YYYY-MM-DD";

export async function getPeople(): Promise<Person[]> {
  const query = qs.stringify({
    populate: ["profilePhoto", "roles"],
  });
  return axiosInstanceContent.get<Person[], Person[]>(`/people?${query}`);
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

export function getGTeamPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/g-team-page"
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
  const sixMonthsAgo = dayjs()
    .startOf("day")
    .subtract(6, "month")
    .format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    populate: ["coverPhoto", "links"],
    filters: {
      createdAt: {
        $gte: sixMonthsAgo,
      },
    },
    sort: "date:desc",
  });

  return axiosInstanceContent.get<BlogArticle[], BlogArticle[]>(
    `/blog-articles?${query}`
  );
}

export async function getBlogArticle(id: string) {
  const query = qs.stringify({
    populate: ["coverPhoto", "links"],
  });
  return axiosInstanceContent.get<BlogArticle, BlogArticle>(
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
  const now = dayjs().startOf("day").format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    sort: "date",
    filters: {
      date: {
        $gte: now,
      },
    },
  });
  return axiosInstanceContent.get<UpcomingContest[], UpcomingContest[]>(
    `/upcoming-contests?${query}`
  );
}

export function getRegistrationContests() {
  const now = dayjs().startOf("day").format(STRAPI_DATE_FORMAT);
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
  const oneWeekAgo = dayjs()
    .startOf("day")
    .subtract(1, "week")
    .format(STRAPI_DATE_FORMAT);
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

export function getContestRegistrationInstructionsPage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/contest-registration-instructions-page"
  );
}

export function getPerformanceFeePage() {
  return axiosInstanceContent.get<TitleWithContent, TitleWithContent>(
    "/performance-fee-page"
  );
}

export async function getFileLinks(
  types: Array<FileLink["attributes"]["type"]>
) {
  const query = qs.stringify({
    populate: "file",
    filters: {
      type: {
        $in: types,
      },
    },
  });
  return axiosInstanceContent.get<FileLink[], FileLink[]>(
    `/file-links?${query}`
  );
}

export async function getNatureRun() {
  const now = dayjs().startOf("day").format(STRAPI_DATE_FORMAT);
  const query = qs.stringify({
    populate: ["title", "basePrice", "tShirtPrice", "memberDiscount", "isPK"],
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
      Array<NatureRun>,
      Array<NatureRun>
    >(`/nature-runs?${query}`);
    return natureRun;
  } catch (error) {
    // in case there is no nature run
    return null;
  }
}
