import { tool } from "ai";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const httpFetch = tool({
  description: "This tool is used to fetch the requested API URL",
  parameters: z.object({
    url: z.string().describe("API URL"),
  }),
  execute: async ({ url }) => {
    await setTimeout(2000);
    const response = await fetch(url);
    const data = await response.text();

    return data;
  },
});
