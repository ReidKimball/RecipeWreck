/**
 * @file src/app/components/StaticRecipeCard.tsx
 * @description Defines a reusable client component for displaying static recipe details, intended for use in landing pages or marketing materials.
 * @requires next/image For optimized image rendering.
 * @author Cascade
 * @date 2025-06-12
 */

"use client";

import Image from "next/image";

/**
 * @typedef {object} StaticRecipeCardProps
 * @description Props for the StaticRecipeCard component.
 * @property {string} title - The title of the recipe.
 * @property {string} imageSrc - The source URL or path for the recipe image.
 * @property {string} imageAlt - The alt text for the recipe image.
 * @property {string} ingredientsText - A block of text detailing the ingredients (e.g., separated by newlines or as a single paragraph).
 * @property {string} instructionsText - A block of text detailing the instructions (e.g., separated by newlines or as a single paragraph).
 * @property {string} [className] - Optional additional CSS classes for custom styling.
 */
interface StaticRecipeCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  ingredientsText: string;
  instructionsText: string;
  className?: string;
}

/**
 * @component StaticRecipeCard
 * @description A client component that displays static recipe details, including title, image, ingredients, and instructions.
 * Ideal for showcasing example recipes on landing pages or in promotional content.
 * @componentType Client
 * @param {StaticRecipeCardProps} props - The props for the component.
 * @returns {JSX.Element} The JSX representation of the static recipe card.
 * @example
 * <StaticRecipeCard
 *   title="Deep Fried Butter Sticks"
 *   imageSrc="/images/mock-fried-butter.jpg"
 *   imageAlt="A horrifying pile of deep fried butter sticks"
 *   ingredientsText="- 1lb Butter\n- 2 cups Flour\n- 1 gallon Oil for frying"
 *   instructionsText="1. Cut butter into sticks.\n2. Coat in flour.\n3. Deep fry until golden brown and artery-clogging."
 * />
 */
export default function StaticRecipeCard({ 
  title, 
  imageSrc, 
  imageAlt, 
  ingredientsText, 
  instructionsText, 
  className 
}: StaticRecipeCardProps): JSX.Element {
  // Helper to render text with line breaks
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div
      className={`bg-gray-800 text-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${className || ''}`}
    >
      {imageSrc && (
        <div className="relative w-full h-56">
          <Image
            src={imageSrc}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-red-400 font-display tracking-tight break-words">
          {title}
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-orange-400">Ingredients:</h3>
          <div className="text-gray-300 space-y-1 whitespace-pre-line">
            {renderTextWithLineBreaks(ingredientsText)}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">Instructions:</h3>
          <div className="text-gray-300 space-y-2 whitespace-pre-line">
            {renderTextWithLineBreaks(instructionsText)}
          </div>
        </div>
      </div>
    </div>
  );
}
