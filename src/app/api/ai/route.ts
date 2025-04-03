import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openrouter, OpenRouterModel } from "@/app/llm/openrouter";
import { z } from "zod";

export async function GET(requst: NextRequest) {
  const result = await generateObject({
    // model: openrouter(OpenRouterModel.GeminiPro25Experimental),
    model: openrouter.chat(OpenRouterModel.GeminiPro25Experimental),
    schema: z.object({
      en: z.string().describe("Tradução para inglês"),
      pt: z.string().describe("Tradução para português"),
      fr: z.string().describe("Tradução para francês"),
      es: z.string().describe("Tradução para espanhol"),
    }),
    prompt: 'Traduza "Hello World" para diferente idiomas',
    system:
      "Você é uma AI especializada em tradução. Sempre retorne da maneira mais sucinta possível.",
  });

  return NextResponse.json(result.object);
}
