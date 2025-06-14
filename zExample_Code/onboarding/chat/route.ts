/**
 * @file src/app/api/onboarding/chat/route.ts
 * @description API Route Handler for the AI Role onboarding chat.
 * This route handles POST requests from the frontend, processes user messages and conversation history.
 * It interacts with the Google Generative AI API (Gemini) to:
 * 1. Generate a conversational AI response.
 * 2. Generate an AI Role JSON object based on the conversation.
 * 3. Persist the AI Role to a MongoDB database.
 *
 * @requires next/server (NextResponse)
 * @requires @google/genai (GoogleGenAI)
 * @requires zod For schema validation
 * @requires @/lib/mongodb Database connection utility
 * @requires @/models/AiRole AI Role Mongoose model
 *
 * @see {@link https://ai.google.dev/ Google AI for Developers}
 * @see {@link ../../onboarding/page.tsx} The frontend component that consumes this API
 *
 * @environment
 * - GOOGLE_AI_API_KEY: Required. API key for Google's Generative AI service
 * - GOOGLE_AI_MODEL: Optional. Model name (defaults to 'gemini-1.5-flash-latest')
 * - NODE_ENV: Optional. Set to 'development' for debug logging
 *
 * @author Cascade
 * @date 2025-06-08
 * @version 1.0.0
 */
import { NextResponse } from 'next/server';

/**
 * Sanitizes input strings by removing potentially dangerous characters and limiting length.
 * @param {string} text - The input text to sanitize
 * @param {number} [maxLength=2000] - Maximum allowed length of the output string
 * @returns {string} Sanitized string with HTML/script tags removed and length limited
 * @private
 */
const sanitizeInput = (text: string, maxLength: number = 2000): string => {
  if (typeof text !== 'string') return '';
  // Remove characters that might be used for HTML/script injection
  // and limit length. A more robust sanitizer might be needed for production.
  const sanitized = text.replace(/[<>]/g, ''); 
  return sanitized.substring(0, maxLength);
};
import { GoogleGenAI } from '@google/genai';
import dbConnect from '@/lib/mongodb';
import AiRole, { IAiRole } from '@/models/AiRole';
import { z } from 'zod';

/**
 * Base interface for AI Role data structure as received from the LLM.
 * This represents the minimum required fields that must be provided by the LLM.
 * @interface AiRoleBaseFromLlm
 * @property {string} title - The title of the AI Role
 * @property {string} description - A brief description of the AI Role
 * @property {string} systemPromptText - The system prompt that defines the AI's behavior
 * @property {string} category - Category the AI Role belongs to
 * @property {string[]} tags - Array of tags for categorization
 */
interface AiRoleBaseFromLlm {
  title: string;
  description: string;
  systemPromptText: string;
  category: string;
  tags: string[];
}

/**
 * Extended interface for the AI Role data structure sent to the client.
 * Includes additional metadata fields added by the server.
 * @interface ClientAiRole
 * @extends AiRoleBaseFromLlm
 * @property {string} id - Unique identifier (temporary or from database)
 * @property {number} version - Version number of the AI Role
 * @property {string} createdAt - ISO timestamp of when the role was created
 * @property {string} createdBy - Identifier of who created the role
 */
interface ClientAiRole extends AiRoleBaseFromLlm {
  id: string; // Can be temp ID from LLM or final from DB
  version: number;
  createdAt: string; // ISO string format
  createdBy: string;
}

/**
 * Base interface for AI Role data structure used in LLM parsing.
 * This is maintained for backward compatibility with existing code.
 * @interface AiRoleBase
 * @property {string} title - The title of the AI Role
 * @property {string} description - A brief description of the AI Role
 * @property {string} systemPromptText - The system prompt that defines the AI's behavior
 * @property {string} category - Category the AI Role belongs to
 * @property {string[]} tags - Array of tags for categorization
 */
interface AiRoleBase {
  title: string;
  description: string;
  systemPromptText: string;
  category: string;
  tags: string[];
}

// Helper function to create a consistent mock/error AiRole object
const mockFallbackAiRole = (errorMessage: string, userInput?: string): ClientAiRole => {
  const title = userInput ? `Error: AI Role for "${userInput.substring(0,50)}"` : 'Error: AI Role Generation Failed';
  return {
    id: String(Date.now() + Math.random()), // Temporary ID
    title: title,
    description: `Failed to generate AI Role. ${errorMessage}`,
    systemPromptText: 'Error: Could not generate system prompt.',
    category: 'Error',
    tags: ['error', 'fallback'],
    version: 1,
    createdAt: new Date().toISOString(), // ISO string for JSON
    createdBy: 'api_error_handler',
  };
};

/**
 * Handles POST requests to the /api/onboarding/chat endpoint.
 * 
 * This function processes the user's message and conversation history to:
 * 1. Generate a conversational response using Google's Generative AI
 * 2. Create a structured AI Role definition based on the conversation
 * 3. Validate and sanitize all inputs and outputs
 * 4. Persist the generated AI Role to MongoDB
 * 5. Return both the conversational response and the AI Role data
 *
 * @async
 * @function POST
 * @param {Request} request - The incoming HTTP Request object
 * @param {Object} request.body - The request body containing:
 *   @param {string} request.body.message - The user's latest message (max 2000 chars)
 *   @param {Array<Object>} [request.body.conversationHistory=[]] - Previous messages in the conversation
 *   @param {string} request.body.conversationHistory[].role - Either 'user' or 'model'
 *   @param {Array<Object>} request.body.conversationHistory[].parts - Message parts
 *   @param {string} request.body.conversationHistory[].parts[].text - The message text
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object with:
 *   - 200: Success response containing:
 *     @property {string} aiResponseText - The conversational response from the AI
 *     @property {ClientAiRole} aiRoleJson - The generated AI Role data
 *   - 400: Bad Request for invalid input
 *   - 500: Internal Server Error with error details in development mode
 *
 * @throws {Error} Logs detailed error information to the console for debugging
 *
 * @example
 * // Frontend fetch call:
 * const response = await fetch('/api/onboarding/chat', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     message: 'I want an AI that helps me write poems.',
 *     conversationHistory: [
 *       { role: 'user', parts: [{text: 'Hi there!'}] },
 *       { role: 'model', parts: [{text: 'Hello! How can I help you create an AI Role today?'}]}
 *     ],
 *   }),
 * });
 * const data = await response.json();
 * console.log('Conversational Response:', data.aiResponseText);
 * console.log('Generated AI Role:', data.aiRoleJson);
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/route-handlers Next.js Route Handlers}
 * @see {@link https://ai.google.dev/api/rest/ Google AI REST API Reference}
 * @see ../../onboarding/page.tsx The frontend component that consumes this API
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message: rawMessage, conversationHistory: rawConversationHistory = [] } = body;

    // Validate message
    if (typeof rawMessage !== 'string' || rawMessage.trim() === '') {
      return NextResponse.json({ message: 'Validation Error: Message is required and must be a string.' }, { status: 400 });
    }
    if (rawMessage.length > 2000) { // Max length for a single message
      return NextResponse.json({ message: 'Validation Error: Message exceeds maximum length of 2000 characters.' }, { status: 400 });
    }
    const message = sanitizeInput(rawMessage);

    // Validate conversationHistory structure and sanitize its contents
    if (!Array.isArray(rawConversationHistory)) {
      return NextResponse.json({ message: 'Validation Error: conversationHistory must be an array.' }, { status: 400 });
    }

    const conversationHistory: { role: string; parts: { text: string }[] }[] = [];
    for (const turn of rawConversationHistory) {
      if (typeof turn !== 'object' || turn === null || 
          typeof turn.role !== 'string' || !['user', 'model'].includes(turn.role) ||
          !Array.isArray(turn.parts) || turn.parts.length === 0 ||
          typeof turn.parts[0] !== 'object' || turn.parts[0] === null ||
          typeof turn.parts[0].text !== 'string') {
        return NextResponse.json({ message: 'Validation Error: Invalid structure for an item in conversationHistory.' }, { status: 400 });
      }
      if (turn.parts[0].text.length > 2000) { // Max length for a history message part
        return NextResponse.json({ message: 'Validation Error: A message in conversation history exceeds maximum length of 2000 characters.' }, { status: 400 });
      }
      conversationHistory.push({
        role: turn.role,
        parts: [{ text: sanitizeInput(turn.parts[0].text) }]
      });
    }
    // Limit overall history length (e.g., last 10 turns) to prevent excessively large prompts
    if (conversationHistory.length > 20) { // Max 20 turns (10 user, 10 model)
        conversationHistory.splice(0, conversationHistory.length - 20);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Received message:', message);
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Received conversation history:', conversationHistory);
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY is not set.');
      return NextResponse.json(
        {
          message: 'Configuration Error: The AI service is not available due to a missing API key. Please contact support.',
          aiResponseText: "I'm unable to process your request at this moment. The AI capabilities are not properly configured.",
          aiRoleJson: mockFallbackAiRole('Configuration Error', 'AI system not configured - API key missing.'),
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelName = process.env.GOOGLE_AI_MODEL || 'gemini-1.5-flash-latest';
    const generationConfig = { responseMimeType: 'text/plain' };

    // Now 'conversationHistory' is validated and sanitized, and 'message' is sanitized.
    const formattedHistory = conversationHistory
      .map(turn => `${turn.role === 'user' ? 'User' : 'AI'}: ${turn.parts[0].text}`)
      .join('\n');

    const systemInstruction = `You are an expert AI assistant helping a user design a new custom AI Role. 
Your goal is to have a natural conversation with the user to understand their needs for the new AI Role, 
and then generate a JSON object defining this AI Role.

Follow these instructions carefully:
1. First, provide a concise, helpful, and conversational response to the user's latest message. This 
response should directly address the user's query or statement.
2. After your conversational response, on a new line, provide the AI Role JSON. 
3. The JSON object MUST start with the marker "---JSON_START---" on a new line and end with the marker 
"---JSON_END---" on a new line. Do not include any other text before "---JSON_START---" or after 
"---JSON_END---" on those specific lines.
4. The JSON object should define the AI Role based on the ENTIRE conversation. Synthesize information 
from the history and the latest message.
5. The JSON object must have the following fields (ensure all string values are properly escaped for JSON):
   - "title": A concise and descriptive title for the AI Role (e.g., "Recipe Generator Assistant", 
   "Code Debugging Helper").
   - "description": A brief explanation of what the AI Role does and its key capabilities (1-3 sentences).
   - "systemPromptText": The core system prompt that will guide the AI Role's behavior. This should be 
   detailed and actionable. Start with 'You are an AI...' or similar instructive phrasing. Ensure any 
   special characters or newlines within this text are properly escaped for JSON.
   - "category": A relevant category for the AI Role (e.g., "Productivity", "Creative", "Education", 
   "Development", "Entertainment", "Health & Wellness"). If unsure or very specific, use "Custom".
   - "tags": An array of 2-5 relevant string tags in lowercase (e.g., ["cooking", "recipes", "food"], 
   ["python", "debugging"]).

Example of your ENTIRE output format (conversational response first, then JSON block):
Hello! I can help you create an AI that suggests movies. Based on your request for a family-friendly movie 
recommender, here's a starting point for your AI Role:
---JSON_START---
{
  "title": "Family Movie Recommender",
  "description": "An AI assistant that suggests family-friendly movies based on genres, themes, or user preferences.",
  "systemPromptText": "You are an AI assistant specialized in recommending family-friendly movies. When 
  a user asks for a suggestion, ask for their preferred genres, age appropriateness, or any specific themes 
  they are interested in. Provide 2-3 movie suggestions with brief summaries and why they fit the criteria. 
  Always prioritize movies suitable for all ages unless specified otherwise.",
  "category": "Entertainment",
  "tags": ["movies", "family-friendly", "recommendations", "entertainment"]
}
---JSON_END---

Now, consider the conversation history and the user's latest message.

Conversation History:
${formattedHistory}

User's latest message: ${message}

Provide your conversational response and then the AI Role JSON block:
`;

    const requestContents = [{ role: 'user', parts: [{ text: systemInstruction }] }];

    let fullLlmResponse = '';
    try {
      const streamResult = await ai.models.generateContentStream({
        model: modelName,
        contents: requestContents,
        config: generationConfig,
      });
      for await (const chunk of streamResult) {
        if (chunk && typeof chunk.text === 'string') {
          fullLlmResponse += chunk.text;
        }
      }
    } catch (llmError: any) {
      console.error('Error calling Google Generative AI or processing stream:', llmError);
      // Return error response if LLM call itself fails
      return NextResponse.json({ 
        aiResponseText: `Error communicating with AI model: ${llmError.message || 'Unknown error'}`,
        aiRoleJson: mockFallbackAiRole(`LLM call failed: ${llmError.message || 'Unknown error'}`, message)
      }, { status: 500 });
    }

    let conversationalText = '';
    let finalAiRoleJson: ClientAiRole;

    const jsonStartMarker = "---JSON_START---";
    const jsonEndMarker = "---JSON_END---";

    const jsonStartIndex = fullLlmResponse.indexOf(jsonStartMarker);
    const jsonEndIndex = fullLlmResponse.indexOf(jsonEndMarker, jsonStartIndex + jsonStartMarker.length);

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      conversationalText = fullLlmResponse.substring(0, jsonStartIndex).trim();
      const aiRoleJsonString = fullLlmResponse.substring(jsonStartIndex + jsonStartMarker.length, jsonEndIndex).trim();
      try {
        const parsedAiRoleBase: AiRoleBaseFromLlm = JSON.parse(aiRoleJsonString);
        // Basic validation of required fields from LLM
        if (parsedAiRoleBase.title && parsedAiRoleBase.description && parsedAiRoleBase.systemPromptText && parsedAiRoleBase.category && Array.isArray(parsedAiRoleBase.tags)) {
          finalAiRoleJson = {
            id: String(Date.now() + Math.random()), // Temporary unique ID
            title: parsedAiRoleBase.title,
            description: parsedAiRoleBase.description,
            systemPromptText: parsedAiRoleBase.systemPromptText,
            category: parsedAiRoleBase.category || "Custom",
            tags: Array.isArray(parsedAiRoleBase.tags) ? parsedAiRoleBase.tags.map(tag => String(tag).toLowerCase()) : [],
            version: 1,
            createdAt: new Date().toISOString(), // ISO string for JSON
            createdBy: "llm_onboarding_session",
          };
        } else {
          console.warn('LLM generated JSON is missing required fields:', parsedAiRoleBase);
          conversationalText = conversationalText || `AI response received, but AI Role JSON was incomplete. Raw LLM output (first 500 chars): ${fullLlmResponse.substring(0, 500)}...`;
          finalAiRoleJson = mockFallbackAiRole('Generated JSON missing required fields.', message);
        }
      } catch (parseError: any) {
        console.error('Error parsing JSON from LLM:', parseError);
        conversationalText = conversationalText || `AI response received, but AI Role JSON was malformed. Raw LLM output (first 500 chars): ${fullLlmResponse.substring(0, 500)}...`;
        finalAiRoleJson = mockFallbackAiRole(`Failed to parse JSON: ${parseError.message}`, message);
      }
    } else {
      console.warn("JSON markers not found in LLM response. Treating full response as conversational.", "\nFull response (first 500 chars):---", fullLlmResponse.substring(0,500), "---");
      conversationalText = fullLlmResponse.trim(); // Assume entire response is conversational if no markers
      finalAiRoleJson = mockFallbackAiRole('JSON markers not found in LLM response.', message);
    }

    // Ensure conversationalText has a fallback if it ended up empty but fullLlmResponse was not.
    if (!conversationalText && fullLlmResponse && !finalAiRoleJson.title.startsWith('Error:')) {
        conversationalText = "Received a response from the AI, but had trouble separating the conversational part.";
    }
    // Define Zod schema for AI Role data (pre-DB) - defined outside the if block for clarity
    // This schema validates the data structure that the LLM is expected to produce for the role.
    const AiRoleZodSchema = z.object({
      title: z.string().min(1, 'Title is required').max(100, 'Title cannot be more than 100 characters'),
      description: z.string().min(1, 'Description is required').max(500, 'Description cannot be more than 500 characters'),
      systemPromptText: z.string().min(1, 'System prompt text is required').max(10000, 'System prompt is too long'),
      category: z.enum([
        'Productivity',
        'Creative',
        'Education',
        'Development',
        'Entertainment',
        'Health & Wellness',
        'Custom'
      ]).default('Custom'),
      tags: z.array(z.string().trim().toLowerCase()).optional().default([]),
      // Fields that are usually added by our backend logic, not expected from LLM directly in this form:
      // id: z.string().optional(), // Will be generated by MongoDB or passed if mock
      // version: z.number().min(1).default(1), // Backend controlled
      // createdAt: z.string().datetime().optional(), // Backend controlled (Mongoose timestamp)
      // createdBy: z.string().min(1).default('llm_onboarding_session'), // Backend controlled
    });

    // Save to MongoDB if finalAiRoleJson was successfully created (not a fallback error object for JSON generation itself)
    if (finalAiRoleJson && finalAiRoleJson.category !== 'Error') {
      // Data to be validated by Zod is what LLM provides (title, desc, systemPrompt, category, tags)
      // We will use the spread from finalAiRoleJson which has these fields plus backend-added ones.
      // For Zod, we are primarily interested in the core LLM-generated fields.
      const dataFromLlmForZod = {
        title: finalAiRoleJson.title,
        description: finalAiRoleJson.description,
        systemPromptText: finalAiRoleJson.systemPromptText,
        category: finalAiRoleJson.category,
        tags: finalAiRoleJson.tags,
      };

      const validationResult = AiRoleZodSchema.safeParse(dataFromLlmForZod);

      if (!validationResult.success) {
        console.warn('Zod validation failed for AI Role data from LLM:', validationResult.error.flatten());
        // Potentially alter finalAiRoleJson or add a warning if Zod validation fails critically
        // For now, we log the warning. Mongoose validation will still apply.
        finalAiRoleJson.title = `Warning: Invalid LLM Data - ${finalAiRoleJson.title}`;
        // Or, you could decide to not save if Zod fails:
        // throw new Error('Zod validation failed for LLM data.'); 
      } else {
        console.log('Zod validation successful for AI Role data from LLM.');
        // If you want to use the strictly validated/transformed data from Zod:
        // finalAiRoleJson.title = validationResult.data.title; // etc. for other fields
      }

      // Prepare the object for database insertion using all fields in finalAiRoleJson
      // (which includes backend-added fields like version, createdBy, and eventually id from DB)
      const { id: clientProvidedId, ...aiRoleDataForDb } = finalAiRoleJson as ClientAiRole;

      try {
        await dbConnect(); // Ensure DB connection
        const savedAiRole = await AiRole.create(aiRoleDataForDb); // Mongoose will use its schema here
        finalAiRoleJson.id = savedAiRole.id; // Update with the actual DB ID
        // The `savedAiRole` object from Mongoose will have `createdAt` and `updatedAt` timestamps.
        // If `finalAiRoleJson` needs to reflect these exact DB values, update them here.
        // The `ClientAiRole` type expects `createdAt` as a string.
        if (savedAiRole.createdAt) {
          finalAiRoleJson.createdAt = savedAiRole.createdAt.toISOString();
        }
        // `createdBy` is already part of `aiRoleDataForDb` and thus `finalAiRoleJson`.
        // `version` is also part of `finalAiRoleJson`.
        console.log('AI Role saved to MongoDB:', savedAiRole.id);
      } catch (dbError: any) {
        console.error('Error saving AI Role to MongoDB:', dbError);
        // Do not throw or return error here; proceed to return the generated JSON to the user
        // The core AI functionality succeeded, only persistence failed.
        // The original finalAiRoleJson (before attempting save) will be returned.
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Final Conversational Text:', conversationalText);
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Final AI Role JSON to be returned:', JSON.stringify(finalAiRoleJson, null, 2));
    }

    return NextResponse.json({ aiResponseText: conversationalText, aiRoleJson: finalAiRoleJson });

  } catch (error: any) {
    console.error('Error in onboarding chat API:', error);
    return NextResponse.json(
      { 
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'An unexpected error occurred. Please try again later.' 
      }, 
      { status: 500 }
    );
  }
}
