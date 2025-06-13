"use client";

import React from 'react';
import TestimonialCard, { TestimonialCardProps } from './TestimonialCard';

const mockTestimonials: TestimonialCardProps[] = [
  {
    quote: "After trying the AI’s recipes, my doctor blocked my number. 10/10.",
    author: "@darkhumorchef"
  },
  {
    quote: "My friends dared me to cook one. Now I’m banned from three kitchens.",
    author: "@culinaryoutlaw"
  },
  {
    quote: "The only app that made my nutritionist cry.",
    author: "@absurdfoodie"
  },
  {
    quote: "I showed my therapist the 'Existential Dread Soufflé'. Now I have two therapists.",
    author: "@mentallyunstablechef"
  },
  {
    quote: "My smoke alarm now sings opera. Thanks, RecipeWreck!",
    author: "@pyro_gourmet"
  },
  {
    quote: "Used this for a first date. Pretty sure I'm getting a restraining order for dessert.",
    author: "@foreveralonefoodie"
  }
];

/**
 * TestimonialsSection component
 *
 * Displays a section with a heading and a list of user testimonials.
 * Uses the TestimonialCard component to render each testimonial.
 *
 * @returns {JSX.Element} The rendered testimonials section.
 */
const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-850">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400">What Our Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
