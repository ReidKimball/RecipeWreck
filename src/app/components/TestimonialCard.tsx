"use client";

import React from 'react';

/**
 * @typedef {object} TestimonialCardProps
 * @property {string} quote - The testimonial quote.
 * @property {string} author - The author's handle or name.
 * @property {string} [className] - Optional additional CSS classes for styling.
 */
export interface TestimonialCardProps {
  quote: string;
  author: string;
  className?: string;
}

/**
 * TestimonialCard component
 *
 * Displays a single user testimonial with a quote and author.
 *
 * @param {TestimonialCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered testimonial card.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, className }) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${className || ''}`}>
      <p className="text-lg italic text-gray-300 mb-4">"{quote}"</p>
      <p className="text-right font-semibold text-purple-400">- {author}</p>
    </div>
  );
};

export default TestimonialCard;
