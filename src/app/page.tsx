/**
 * @file src/app/page.tsx
 * @description The main page of the RecipeWreck application. It allows users to input prompts for recipe generation and displays the generated recipe.
 * @requires react For component state management (useState).
 * @requires ./components/PromptInput For the recipe prompt input component.
 * @requires ./components/RecipeCard For displaying the generated recipe.
 * @requires react-hot-toast For displaying notifications.
 * @author Cascade
 * @date 2025-06-12
 */

"use client";

import { useState } from "react"; // React hook for managing component state.
import PromptInput, { PromptResult } from "./components/PromptInput"; // Component for user input and AI prompt submission. PromptResult is the type for the recipe data.
import RecipeCard from "./components/RecipeCard"; // Component for displaying the generated recipe details.
import { Toaster } from "react-hot-toast"; // Component for displaying toast notifications.

/**
 * @component Home
 * @description The main page component for the RecipeWreck application. It renders the prompt input field
 * and the recipe card once a recipe is generated. It manages the state of the current recipe.
 * @componentType Client
 * @returns {JSX.Element} The JSX for the home page.
 */
export default function Home() {
    const [recipe, setRecipe] = useState<PromptResult | null>(null); // State to hold the generated recipe data. It's null initially.

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-8 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-3xl font-bold mt-4">RecipeWreck</h1>
      <PromptInput onResult={setRecipe} />
      {recipe && <RecipeCard recipe={recipe} />}
      <Toaster position="top-right" />
    </div>
  );
}
