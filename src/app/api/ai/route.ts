import { OpenRouterModel } from "@/app/llm/openrouter";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText, tool } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(requst: NextRequest) {
  const result = await generateText({
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
    prompt: "List some repositories names from user daanmoura on Github",
    maxSteps: 5,

    onStepFinish: ({ toolResults }) => {
      console.log({ toolResults });
    },
  });

  return NextResponse.json({ message: result.text });
}
