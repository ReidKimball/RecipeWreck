'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LandingPage = () => {
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock PostHog tracking
    console.log('Mock PostHog: Sign up clicked');
  };

  const handleFundingInterest = () => {
    // Mock funding interest tracking
    console.log('Mock PostHog: Funding interest clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-purple-900"
        >
          Cook Up Chaos!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-700"
        >
          The AI-powered recipe generator that turns your kitchen into a laboratory of culinary madness
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSignUp} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Join the Mayhem
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Value Props Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-semibold mb-2">Generate Absurdity</h3>
              <p className="text-gray-600">AI-powered recipe chaos at your fingertips</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Go Viral</h3>
              <p className="text-gray-600">Create shareable content that breaks the internet</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤪</div>
              <h3 className="text-xl font-semibold mb-2">Join the Fun</h3>
              <p className="text-gray-600">Connect with fellow culinary anarchists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Recipe Card */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Today's Featured Disaster</h3>
              <h4 className="text-xl text-purple-600 mb-4">Chocolate-Covered Pickle Sundae with Hot Sauce Sprinkles</h4>
              <p className="text-gray-600 mb-4">A masterpiece of mayhem that combines sweet, sour, and spicy in ways nature never intended</p>
              <div className="flex justify-center">
                <Image
                  src="/mock-recipe.jpg"
                  alt="Mock Recipe"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Chaos Creators Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="italic mb-4">"RecipeWreck helped me gain 10k followers overnight with just one cursed recipe!"</p>
              <p className="font-semibold">- Food Content Creator</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="italic mb-4">"My dinner parties will never be the same. Thanks for the nightmares!"</p>
              <p className="font-semibold">- Adventurous Home Cook</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Support the Culinary Chaos?</h2>
          <p className="text-xl mb-8">Help us bring more cursed recipes to the world!</p>
          <button
            onClick={handleFundingInterest}
            className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
          >
            Back This Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
