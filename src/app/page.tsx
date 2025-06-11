"use client";

import { useState } from "react";
import PromptInput, { PromptResult } from "./components/PromptInput";
import RecipeCard from "./components/RecipeCard";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [recipe, setRecipe] = useState<PromptResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-8 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-3xl font-bold mt-4">RecipeWreck</h1>
      <PromptInput onResult={setRecipe} />
      {recipe && <RecipeCard recipe={recipe} />}
      <Toaster position="top-right" />
    </div>
  );
}
