"use client";

import Image from "next/image";
import { PromptResult } from "./PromptInput";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface Props {
  recipe: PromptResult;
}

export default function RecipeCard({ recipe }: Props) {
  const handleCopy = () => {
    const link = `${window.location.origin}/#${uuidv4()}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <article className="w-full max-w-xl border rounded-lg shadow-md p-4 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-2 text-center">{recipe.title}</h2>
      {recipe.imageBase64 && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={`data:image/png;base64,${recipe.imageBase64}`}
            alt={recipe.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <section className="mb-4">
        <h3 className="font-semibold mb-1">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </section>
      <section className="mb-4">
        <h3 className="font-semibold mb-1">Instructions</h3>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
      <button
        onClick={handleCopy}
        className="w-full py-2 bg-purple-600 text-white rounded-md"
      >
        Copy link
      </button>
    </article>
  );
}
