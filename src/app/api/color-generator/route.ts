import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openrouter, OpenRouterModel } from "@/app/llm/openrouter";
import { z } from "zod";

export async function GET(requst: NextRequest) {
  const result = await generateObject({
    model: openrouter.chat(OpenRouterModel.GeminiPro25Experimental),
    schema: z.object({
      baseColor: z.string().describe("Base color"),
      accentColor: z.string().describe("Accent color"),
      backgroundColor: z.string().describe("Background color"),
      textColor: z.string().describe("Text color"),
      pallete: z.array(z.string()).describe("Color pallete"),
    }),
    prompt:
      "Create a color pallete based on an orange color that provoke hungry. This will be used on a food delivery app.",
    system:
      "You are an AI especialized in color pallete generation. Based on the user prompt, generate a color pallete that best express the user's request. Use 7 colors on the color pallete array,if user doesn't especifies. Colors must be in hex format (e.g. #FF0000).",
  });

  return NextResponse.json(result.object);
}
