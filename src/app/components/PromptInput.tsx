/**
 * @file src/app/components/PromptInput.tsx
 * @description Defines a client component that allows users to input prompts for AI recipe generation and handles the API request.
 * @requires react For component state management (useState).
 * @requires react-hot-toast For displaying notifications.
 * @author Cascade
 * @date 2025-06-12
 */

"use client";

import { useState } from "react"; // React hook for managing component-level state.
import toast from "react-hot-toast"; // Library for displaying toast notifications.

/**
 * @typedef {object} PromptResult
 * @description Represents the structure of a successfully generated recipe from the AI.
 * This type is used by both PromptInput (for receiving data) and RecipeCard (for displaying data).
 * @property {string} title - The title of the generated recipe.
 * @property {string[]} ingredients - An array of strings, each representing an ingredient.
 * @property {string[]} steps - An array of strings, each representing a step in the recipe instructions.
 * @property {string} imageBase64 - A base64 encoded string representing the AI-generated image for the recipe.
 */
export interface PromptResult {
  title: string;
  ingredients: string[];
  steps: string[];
  imageBase64: string;
}

/**
 * @typedef {object} Props
 * @description Props for the PromptInput component.
 * @property {(recipe: PromptResult) => void} onResult - Callback function invoked when a recipe is successfully generated, passing the recipe data.
 */
interface Props {
  onResult: (recipe: PromptResult) => void;
}

/**
 * @component PromptInput
 * @description A client component that provides a form with a text input for users to submit recipe generation prompts.
 * It handles the submission, communicates with the `/api/generate` endpoint, manages loading states, and calls the `onResult` prop with the generated recipe data.
 * @componentType Client
 * @param {Props} props - The props for the component.
 * @param {function(PromptResult): void} props.onResult - Callback function to be invoked with the generated recipe data.
 * @returns {JSX.Element} The JSX for the prompt input form.
 * @example
 * const handleRecipeGenerated = (recipe) => {
 *   console.log("New recipe:", recipe);
 * };
 * <PromptInput onResult={handleRecipeGenerated} />
 */
export default function PromptInput({ onResult }: Props) {
    const [prompt, setPrompt] = useState(""); // State for the current value of the text input.
    const [loading, setLoading] = useState(false); // State to indicate if a recipe generation request is in progress.

    /**
   * @async
   * @function handleSubmit
   * @description Handles the form submission event. It prevents the default form submission, sends the user's prompt
   * to the `/api/generate` endpoint, and then calls the `onResult` callback with the AI-generated recipe.
   * Manages loading state and displays error toasts if the API call fails.
   * @param {React.FormEvent} e - The form submission event object.
   * @throws Will catch errors from the fetch request or if the response is not ok, displaying a toast notification.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: PromptResult = await res.json();
      onResult(data);
    } catch (err: any) {
      console.error(err);
      toast.error("Recipe generation failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-4 text-white"
    >
      <input
        type="text"
        placeholder="e.g., Deep-fried chocolate salad"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Generating…" : "Generate"}
      </button>
    </form>
  );
}
