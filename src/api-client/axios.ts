import axios, { AxiosResponse } from "axios";
import { BASE_URL_CONTENT } from "@/env";
import {
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiFile,
} from "@/types";

function isFileAttribute(value: unknown): value is StrapiFile {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "attributes" in value.data &&
    typeof value.data.attributes === "object" &&
    value.data.attributes !== null &&
    "url" in value.data.attributes
  );
}

function isRichContentAttribute(value: unknown): value is string {
  return typeof value === "string" && value.includes("\n");
}

function processAttributes(attributes: Record<string, unknown>) {
  return Object.entries(attributes).reduce(
    (processedAttributesAcc, [key, value]) => {
      if (isFileAttribute(value)) {
        if (value.data === null) {
          return {
            ...processedAttributesAcc,
            [key]: null,
          };
        }
        const { url, ...imageAttributes } = value.data.attributes;
        return {
          ...processedAttributesAcc,
          [key]: {
            ...imageAttributes,
            url: `${BASE_URL_CONTENT}${url}`,
          },
        };
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

function responseTransformerStrapi(response: string) {
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
}

function responseInterceptor(response: AxiosResponse) {
  return response.data;
}

export const axiosInstanceContent = axios.create({
  baseURL: `${BASE_URL_CONTENT}/api`,
  transformResponse: responseTransformerStrapi,
});
axiosInstanceContent.interceptors.response.use(responseInterceptor);

export const axiosInstanceNetlifyFunctions = axios.create({
  baseURL: "/.netlify/functions",
});
axiosInstanceNetlifyFunctions.interceptors.response.use(responseInterceptor);
