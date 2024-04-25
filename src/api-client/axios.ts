import axios, { AxiosResponse } from "axios";
import { BASE_URL_CONTENT } from "@/env";
import { StrapiEntry, StrapiFile, WithRequired } from "@/types";

function isFileAttribute(
  value: unknown
): value is WithRequired<StrapiFile, "data"> {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    value.data !== null &&
    !Array.isArray(value.data)
  );
}

function isRichContentAttribute(value: unknown): value is string {
  return typeof value === "string" && value.includes("\n");
}

function fixRichContentNewLines(strapiEntry: StrapiEntry) {
  return {
    id: strapiEntry.id,
    attributes: Object.entries(strapiEntry.attributes).reduce(
      (attributesAcc, [key, value]) => {
        // Prefix URL with BASE_URL_CONTENT
        if (isFileAttribute(value)) {
          return {
            ...attributesAcc,
            [key]: {
              data: {
                ...value.data,
                attributes: {
                  ...value.data.attributes,
                  url: `${BASE_URL_CONTENT}${value.data.attributes.url}`,
                },
              },
            },
          };
        }

        // Fix newlines
        if (isRichContentAttribute(value)) {
          return {
            ...attributesAcc,
            [key]: value.replace(/\n/g, "&nbsp; \n"),
          };
        }

        return {
          ...attributesAcc,
          [key]: value,
        };
      },
      {}
    ),
  };
}

function responseTransformerStrapi(response: string) {
  const { data } = JSON.parse(response) as
    | { data: StrapiEntry }
    | { data: StrapiEntry[] };
  if (Array.isArray(data)) {
    return data.map(fixRichContentNewLines);
  }
  return fixRichContentNewLines(data);
}

function extractData(response: AxiosResponse) {
  return response.data;
}

export const axiosInstanceContent = axios.create({
  baseURL: `${BASE_URL_CONTENT}/api`,
  transformResponse: responseTransformerStrapi,
});
axiosInstanceContent.interceptors.response.use(extractData);

export const axiosInstanceNetlifyFunctions = axios.create({
  baseURL: "/api",
});
axiosInstanceNetlifyFunctions.interceptors.response.use(extractData);
