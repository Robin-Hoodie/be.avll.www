import type { HandlerEvent, HandlerContext } from "@netlify/functions";

export async function handler(event: HandlerEvent, context: HandlerContext) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello, world",
    }),
  };
}
