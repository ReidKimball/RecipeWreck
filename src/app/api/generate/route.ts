import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/genai";

export const runtime = "edge"; // Faster cold starts

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const genai = new GoogleGenerativeAI(apiKey);

    // Text generation
    const textModel = process.env.GENAI_TEXT_MODEL || "text-bison-002";
    const textRes = await genai
      .getGenerativeModel({ model: textModel })
      .generateContent({ prompt: `Create an absurd, unhealthy recipe with title, ingredients and steps: ${prompt}` });

    // Very naive parsing; in production use better parsing or structured prompts
    const raw = textRes.response.text();
    const [titleLine, ...rest] = raw.split("\n").filter(Boolean);
    const title = titleLine.replace(/^#*/g, "");
    const ingredients: string[] = [];
    const steps: string[] = [];
    let isIngredients = true;
    for (const line of rest) {
      if (/^\d/.test(line)) {
        isIngredients = false;
      }
      if (isIngredients) {
        ingredients.push(line.replace(/^[-*]\s*/, ""));
      } else {
        steps.push(line.replace(/^\d+\.\s*/, ""));
      }
    }

    // Image generation
    const imageModel = process.env.GENAI_IMAGE_MODEL || "imagen-3";
    const imgRes = await genai
      .getGenerativeModel({ model: imageModel })
      .generateImage({ prompt: `Food photography of ${title}` });

    const imageBase64 = imgRes.response.images?.[0]?.base64 ?? "";

    return NextResponse.json({ title, ingredients, steps, imageBase64 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
