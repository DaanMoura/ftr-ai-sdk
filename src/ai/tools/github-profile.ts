import { github } from "@/lib/octokit";
import { tool } from "ai";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const githubProfile = tool({
  description:
    "This tool is used to search profile data from Github or access api URL for other user informations such as organizations, repositories, followers, following, stars, etc...",
  parameters: z.object({
    username: z.string().describe("Github username"),
  }),
  execute: async ({ username }) => {
    await setTimeout(2000);
    const response = await github.users.getByUsername({ username });
    return response.data;
  },
});
