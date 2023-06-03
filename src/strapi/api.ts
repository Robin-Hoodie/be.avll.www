import axios, { AxiosResponse } from "axios";
import { BASE_URL_STRAPI } from "@/env";
import {
  StrapiImage,
  Person,
  StrapiCollectionResponse,
  Article,
  StrapiSingleResponse,
  Sponsor,
  UpcomingEvent,
} from "@/types";

function responseInterceptorStrapi(response: AxiosResponse) {
  return response.data;
}

function isImageAttribute(value: unknown): value is StrapiImage {
  return typeof value === "object" && value !== null && "data" in value;
}

function isRichContentAttribute(value: unknown): value is string {
  return typeof value === "string" && value.includes("\n");
}

function processAttributes(attributes: Record<string, unknown>) {
  return Object.entries(attributes).reduce(
    (processedAttributesAcc, [key, value]) => {
      if (isImageAttribute(value)) {
        if (value.data) {
          const { url, ...imageAttributes } = value.data.attributes;
          return {
            ...processedAttributesAcc,
            [key]: {
              ...imageAttributes,
              url: `${BASE_URL_STRAPI}${url}`,
            },
          };
        }
        return processedAttributesAcc;
      }
      if (isRichContentAttribute(value)) {
        return {
          ...processedAttributesAcc,
          [key]: value.replace(/\n/g, "&nbsp; \n"),
        };
      }

      return {
        ...processedAttributesAcc,
        [key]: value,
      };
    },
    {}
  );
}

const axiosInstanceStrapi = axios.create({
  baseURL: `${BASE_URL_STRAPI}/api`,
  transformResponse: (response: string) => {
    const { data } = JSON.parse(response) as
      | StrapiCollectionResponse
      | StrapiSingleResponse;
    if (Array.isArray(data)) {
      return data.map((element) => {
        const { id, attributes } = element;
        const processedAttributes = processAttributes(attributes);
        return {
          id,
          ...processedAttributes,
        };
      });
    }
    const { id, attributes } = data;
    const processedAttributes = processAttributes(attributes);
    return {
      id,
      ...processedAttributes,
    };
  },
});
axiosInstanceStrapi.interceptors.response.use(responseInterceptorStrapi);

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
    `/sponsors?populate[0]=picture`
  );
}

export function getUpcomingEvents() {
  return axiosInstanceStrapi.get<UpcomingEvent[], UpcomingEvent[]>(
    `/upcoming-events?sort=date`
  );
}
