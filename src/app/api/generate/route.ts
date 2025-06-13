/**
 * @file src/app/api/generate/route.ts
 * @description API Route Handler for generating recipes using Google GenAI. It processes user prompts to create recipe text and an accompanying image.
 * @requires next/server For NextRequest and NextResponse objects to handle API requests and responses.
 * @requires @google/genai For interacting with Google's Generative AI models (text and image).
 * @requires zod For validating the request body schema.
 * @author Cascade
 * @date 2025-06-12
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js types for API route handling.
import { GoogleGenAI } from "@google/genai"; // Google Generative AI SDK.
import { z } from "zod"; // Library for schema validation.

// ---------- helpers ----------
/**
 * @constant BodySchema
 * @description Zod schema for validating the request body for the recipe generation endpoint.
 * Requires a 'prompt' field which must be a string between 1 and 500 characters.
 * @type {z.ZodObject<{ prompt: z.ZodString }>}
 */
const BodySchema = z.object({
  prompt: z.string().min(1).max(500),
});

/**
 * @function parseRecipe
 * @description Parses the raw text output from the language model to extract the recipe's title, ingredients, and steps.
 * It handles variations in formatting, such as Markdown, and organizes the content into a structured object.
 * Expects the text block to contain "Title:", "Ingredients:", and "Steps:" sections.
 * @param {string} raw - The raw string output from the language model.
 * @returns {{ title: string, ingredients: string[], steps: string[] }} An object containing the parsed recipe details.
 */
const parseRecipe = (raw: string) => {
  let title = "Untitled Wreck";
  const ingredients: string[] = [];
  const steps: string[] = [];

  // Split the response into lines, keep non-empty ones
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  let mode: "none" | "ingredients" | "steps" = "none";

  // Iterate through each line, stripping common Markdown decorations first so
  // that headings like "**Title:**" are recognised the same as "Title:"
  for (const line of lines) {
    const clean = line.replace(/[*_`]/g, "").trim();
    const lower = clean.toLowerCase();
    if (lower.startsWith("title:")) {
      title = clean.slice(6).trim();
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
      ingredients.push(clean.replace(/^[-*]\s*/, ""));
    } else if (mode === "steps") {
      steps.push(clean.replace(/^\d+\.\s*/, ""));
    }
  }

  return { title, ingredients, steps };
};

// ---------- route handler ----------
/**
 * @async
 * @function POST
 * @description API route handler for POST requests to `/api/generate`. It takes a user prompt from the request body,
 * uses Google GenAI to generate recipe text and an image, parses the recipe text, and returns the structured recipe data.
 * @route POST /api/generate
 * @param {NextRequest} req - The incoming Next.js request object. Expected to have a JSON body matching `BodySchema` (i.e., { prompt: string }).
 * @returns {Promise<NextResponse>} A promise resolving to a NextResponse object.
 *   - On success (200): Returns JSON data `{ title, ingredients, steps, imageBase64 }`.
 *   - On validation error (implicitly 400 via Zod, caught as 500): Returns JSON `{ error: "Generation failed" }`.
 *   - On missing API key (500): Returns JSON `{ error: "Missing API key" }`.
 *   - On other server errors (500): Returns JSON `{ error: "Generation failed" }`.
 * @throws Catches errors from Zod validation, GenAI API calls, or internal processing, logs them, and returns a 500 status with an error message.
 */
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
    // We could set responseMimeType here but will inline below. Removed unused var to avoid lint.

    const textPrompt = `Generate an OUTRAGEOUSLY unhealthy recipe in the following format:\n\nTitle: <creative title>\n\nIngredients:\n- <ingredient 1>\n- <ingredient 2>\n\nSteps:\n1. <step 1>\n2. <step 2>\n\nPrompt subject: ${prompt}`;
    console.log("Text prompt:", textPrompt);
    const requestContents = [{ role: 'user', parts: [{ text: textPrompt }] }];

    // Disable thinking by setting thinkingBudget: 0 (allowed for 2.5 Flash)
    const textRes = await ai.models.generateContent({
      model: textModelName,
      contents: requestContents,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    
    // Accessing text as a property, or via candidates as a fallback
    console.log('Text API Response:', JSON.stringify(textRes, null, 2)); // Log textRes
    const rawText = textRes.text ?? textRes.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const { title, ingredients, steps } = parseRecipe(rawText);

    // Image generation
    const imageModelName = process.env.GENAI_IMAGE_MODEL || "imagen-3.0-generate-002"; // Changed from imagen-3 due to 404 error on v1beta
    // Request a 16×9 aspect ratio so the generated image fits our card (see docs for Imagen 3)
    const imageGenerationConfig = {
      responseMimeType: "image/png",
      generationConfig: {
        aspectRatio: "16:9",
      },
    }; // cast as any until SDK types include aspectRatio

    const imgRes = await ai.models.generateImages({
      model: imageModelName,
      prompt: `High resolution food photography of ${title}${ingredients.length ? ` featuring ${ingredients.slice(0, 5).join(', ')}` : ''}`,
      ...imageGenerationConfig,
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
