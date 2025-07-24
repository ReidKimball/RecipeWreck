/**
 * @file src/app/components/RecipeCard.tsx
 * @description Defines a reusable client component for displaying generated recipe details, including title, image, ingredients, instructions, and a shareable link.
 * @requires next/image For optimized image rendering.
 * @requires uuid For generating unique IDs for shareable links.
 * @requires react-hot-toast For displaying notifications (e.g., link copied).
 * @requires ./PromptInput For the PromptResult type definition.
 * @author Cascade
 * @date 2025-06-12
 */

"use client";

import Image from "next/image"; // Next.js component for optimizing images.
import { PromptResult } from "./PromptInput"; // Type definition for the structure of a generated recipe.
import { v4 as uuidv4 } from "uuid"; // Function to generate version 4 UUIDs.
import toast from "react-hot-toast"; // Library for showing toast notifications.

/**
 * @typedef {object} Props
 * @description Props for the RecipeCard component.
 * @property {PromptResult} recipe - The generated recipe data to display.
 */
interface Props {
  recipe: PromptResult;
}

/**
 * @component RecipeCard
 * @description A client component that displays a generated recipe's details, including its title, an AI-generated image,
 * ingredients, and instructions. It also provides a button to copy a shareable link to the recipe.
 * @componentType Client
 * @param {Props} props - The props for the component.
 * @param {PromptResult} props.recipe - The recipe object containing details to be displayed.
 * @returns {JSX.Element} The JSX representation of the recipe card.
 * @example
 * const recipeData = {
 *   title: "Spicy Chocolate Chicken",
 *   ingredients: ["Chicken", "Chocolate", "Chili Powder"],
 *   instructions: ["Melt chocolate.", "Coat chicken.", "Sprinkle with chili."],
 *   imageBase64: "some-base64-string"
 * };
 * <RecipeCard recipe={recipeData} />
 */
export default function RecipeCard({ recipe }: Props) {
    /**
   * @function handleCopy
   * @description Handles the click event for the copy link button.
   * It generates a unique link using the current window origin and a UUID, copies it to the clipboard,
   * and displays a success toast notification.
   */
  const handleCopy = () => {
    const link = `${window.location.origin}/#${uuidv4()}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <article className="w-full max-w-xl border rounded-lg shadow-md p-4 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-2 text-center">{recipe.title}</h2>
      {recipe.imageBase64 && (
        <div className="relative w-full h-72 mb-4 overflow-hidden rounded-md"> {/* Added fixed height (h-72), overflow-hidden, and rounded-md */}
          <Image
            src={`data:image/png;base64,${recipe.imageBase64}`}
            alt={recipe.title}
            width={1024} // Actual intrinsic width of the source image
            height={1024} // Actual intrinsic height of the source image
            className="w-full h-full" // Image fills the container
            style={{ objectFit: "cover" }} // Cover the area, cropping if necessary
            priority
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
      {/* <button
        onClick={handleCopy}
        className="w-full py-2 bg-purple-600 text-white rounded-md"
      >
        Copy link
      </button> */}
    </article>
  );
}
