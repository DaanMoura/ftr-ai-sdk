import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  apiKey: `${process.env.OPENROUTER_API_KEY}`,
});

export enum OpenRouterModel {
  MistralSmall = "mistralai/mistral-small-3.1-24b-instruct:free",
  GeminiPro25Experimental = "google/gemini-2.5-pro-exp-03-25:free",
}
