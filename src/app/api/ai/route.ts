import { OpenRouterModel } from "@/ai/openrouter";
import { tools } from "@/ai/tools";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { NextRequest } from "next/server";

const MAX_STEPS = 5;

const SYSTEM_PROMPT = `
  Always answer in markdown without the quotes on the begining and end of the response.
`;

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter(OpenRouterModel.GeminiPro25Experimental),
    tools,
    messages,
    maxSteps: MAX_STEPS,
    system: SYSTEM_PROMPT,
  });

  return result.toDataStreamResponse();
}
