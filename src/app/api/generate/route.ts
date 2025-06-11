import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// ---------- helpers ----------
const BodySchema = z.object({
  prompt: z.string().min(1).max(500),
});

/**
 * Quick-and-dirty parser for the LLM output following the prompt template.
 * Expects the text block to contain "Title:", "Ingredients:", and "Steps:" sections.
 */
const parseRecipe = (raw: string) => {
  let title = "Untitled Wreck";
  const ingredients: string[] = [];
  const steps: string[] = [];

  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  let mode: "none" | "ingredients" | "steps" = "none";

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.startsWith("title:")) {
      title = line.slice(6).trim();
      mode = "none";
      continue;
    }
    if (lower.startsWith("ingredients")) {
      mode = "ingredients";
      continue;
    }
    if (lower.startsWith("steps")) {
      mode = "steps";
      continue;
    }

    if (mode === "ingredients") {
      ingredients.push(line.replace(/^[-*]\s*/, ""));
    } else if (mode === "steps") {
      steps.push(line.replace(/^\d+\.\s*/, ""));
    }
  }

  return { title, ingredients, steps };
};

// ---------- route handler ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = BodySchema.parse(body);

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const textModelName = process.env.GENAI_TEXT_MODEL || "gemini-1.5-flash-latest";
    const textGenerationConfig = { responseMimeType: "text/plain" };

    const textPrompt = `Generate an OUTRAGEOUSLY unhealthy recipe in the following format:\n\nTitle: <creative title>\n\nIngredients:\n- <ingredient 1>\n- <ingredient 2>\n\nSteps:\n1. <step 1>\n2. <step 2>\n\nPrompt subject: ${prompt}`;
    console.log("Text prompt:", textPrompt);
    const requestContents = [{ role: 'user', parts: [{ text: textPrompt }] }];

    // Using ai.models.generateContent directly, similar to onboarding/chat/route.ts pattern
    const textRes = await ai.models.generateContent({
      model: textModelName,
      contents: requestContents,
      // generationConfig removed as per lint error df9772b8-09a9-4077-a1ef-224d63ac415e
    });
    
    // Accessing text as a property, or via candidates as a fallback
    console.log('Text API Response:', JSON.stringify(textRes, null, 2)); // Log textRes
    const rawText = textRes.text ?? textRes.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const { title, ingredients, steps } = parseRecipe(rawText);

    // Image generation
    const imageModelName = process.env.GENAI_IMAGE_MODEL || "imagen-3.0-generate-002"; // Changed from imagen-3 due to 404 error on v1beta
    const imageGenerationConfig = { responseMimeType: "image/png" }; // Assuming similar config structure

    // Using ai.models.generateImages (plural) and removing generationConfig
    const imgRes = await ai.models.generateImages({
      model: imageModelName, 
      prompt: `High resolution food photography of ${title}`,
      // generationConfig removed, assuming similar parameter structure to generateContent
    });
    const imageBase64 = imgRes.generatedImages?.[0]?.image?.imageBytes ?? ""; // Based on official SDK example for Imagen 3

    const jsonData = { title, ingredients, steps, imageBase64 };
    console.log('Final JSON Data to be sent (image data omitted for brevity):', JSON.stringify({ ...jsonData, imageBase64: jsonData.imageBase64 ? '[IMAGE_DATA_PRESENT]' : '[NO_IMAGE_DATA]' }, null, 2));
    return NextResponse.json(jsonData);
  } catch (err: any) {
    console.error("/api/generate error", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
