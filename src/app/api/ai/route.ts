import { OpenRouterModel } from "@/app/llm/openrouter";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamText, tool } from "ai";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter(OpenRouterModel.GeminiPro25Experimental),
    tools: {
      profileAndUrls: tool({
        description:
          "This tool is used to search profile data from Github or access api URL for other user informations such as organizations, repositories, followers, following, stars, etc...",
        parameters: z.object({
          username: z.string().describe("Github username"),
        }),
        execute: async ({ username }) => {
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );
          const data = await response.json();

          return JSON.stringify(data);
        },
      }),

      fetchApiUrls: tool({
        description: "This tool is used to fetch the requested API URL",
        parameters: z.object({
          url: z.string().describe("API URL"),
        }),
        execute: async ({ url }) => {
          const response = await fetch(url);
          const data = await response.text();

          return data;
        },
      }),
    },
    messages,
    maxSteps: 5,
    system: `
      Always answer in markdown without the quotes on the begining and end of the response.
    `,
    onStepFinish: ({ toolResults }) => {
      console.log({ toolResults });
    },
  });

  return result.toDataStreamResponse();
}
