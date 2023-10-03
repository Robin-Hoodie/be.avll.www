import { ResponseError } from "@sendgrid/mail";
import "dayjs/locale/nl";
import dayjs from "dayjs";

dayjs.locale("nl");

export function parseError(error: unknown) {
  if (isResponseError(error)) {
    return {
      statusCode: error.code,
      body: JSON.stringify(error.response.body.errors),
    };
  }
  if (error instanceof ParseError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify(error),
  };
}

export function checkBodyField(
  body: Record<string, unknown>,
  field: keyof typeof body
) {
  if (!(field in body)) {
    throw new ParseError(400, `Field ${field} is required`);
  }
}

interface ResponseErrorFixed extends Omit<ResponseError, "response"> {
  response: {
    headers: ResponseError["response"]["headers"];
    body: {
      errors: Array<{ message: string; field: string; help: string | null }>;
    };
  };
}

function isResponseError(error: unknown): error is ResponseErrorFixed {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "number" &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "body" in error.response &&
    typeof error.response.body === "object" &&
    error.response.body !== null &&
    "errors" in error.response.body &&
    Array.isArray(error.response.body.errors)
  );
}

export function formatDateFull(date: string | number | Date) {
  return dayjs(date).format("D MMM YYYY");
}

export class ParseError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
