import type { HandlerEvent, HandlerContext } from "@netlify/functions";

export function handler(
  event: HandlerEvent,
  context: HandlerContext
) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello, world",
    }),
  };
}
