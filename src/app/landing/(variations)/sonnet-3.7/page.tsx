'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock PostHog tracking
    console.log('Mock PostHog: Sign up tracked', { email });
    setSubmitted(true);
    setEmail('');
    
    // Reset submission state after showing success message
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const handleFundingInterest = () => {
    // Mock funding interest tracking
    console.log('Mock PostHog: Funding interest clicked');
    alert('Thanks for your interest! We\'ll be in touch about funding opportunities.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-orange-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-red-600">RecipeWreck</div>
          <div>
            <button 
              onClick={handleFundingInterest}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Support Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Image 
            src="/mock-recipe-disaster.jpg" 
            alt="Recipe Disaster" 
            width={300} 
            height={300}
            className="mx-auto rounded-full border-8 border-white shadow-xl"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-red-600"
        >
          Wreck Your Health,<br />One Meal at a Time
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto"
        >
          The absurdist AI-powered app that generates the most disgusting, unhealthy, 
          and insane recipes you've ever seen. Perfect for content creators, food enthusiasts, 
          and anyone with a twisted sense of humor.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto mb-8"
        >
          {submitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              Thanks for joining the culinary chaos! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                Join the Mayhem
              </button>
            </form>
          )}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500"
        >
          Join 10,000+ culinary anarchists already creating viral content
        </motion.p>
      </section>

      {/* Featured Recipe Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Today's Culinary Abomination</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="/mock-recipe-card.jpg"
                  alt="Recipe Disaster"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="h-full w-full"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Trending
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold mb-2 text-red-600">Chocolate Pickle Sundae with Hot Sauce Sprinkles</h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="ml-2 text-gray-600">Rated "Absolutely Horrifying"</span>
                </div>
                <p className="text-gray-700 mb-6">
                  This unholy creation combines sweet chocolate ice cream with briny pickles, 
                  topped with a generous drizzle of hot sauce. Your taste buds will never forgive you.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">😱 10.2k Reactions</span>
                  <span>🔥 Shared 5.4k times</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Wreck Your Recipes?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg text-center"
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-6">🎭</div>
              <h3 className="text-xl font-bold mb-4">Go Viral</h3>
              <p className="text-gray-600">
                Create shareable content that's guaranteed to make your followers laugh, 
                cringe, and hit that share button.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg text-center"
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Chaos</h3>
              <p className="text-gray-600">
                Our sophisticated AI generates uniquely absurd recipes and images that 
                no human would ever conceive.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg text-center"
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-6">🌐</div>
              <h3 className="text-xl font-bold mb-4">Join the Community</h3>
              <p className="text-gray-600">
                Connect with fellow culinary anarchists, share your creations, and 
                compete for the most outrageous recipe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 p-6 rounded-xl relative">
              <div className="absolute -top-4 -left-4 bg-red-600 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">
                "
              </div>
              <p className="italic mb-4 pt-4">
                "RecipeWreck helped me gain 10k followers overnight with just one cursed recipe post! 
                My 'Peanut Butter and Sardine Brownies' went viral in hours."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold">@FoodInfluencer</p>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl relative">
              <div className="absolute -top-4 -left-4 bg-red-600 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">
                "
              </div>
              <p className="italic mb-4 pt-4">
                "I use RecipeWreck for all my dinner parties now. Nothing breaks the ice like serving 
                guests a 'Chocolate Covered Garlic Bread Sundae' and watching their reactions!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-bold">@PartyHost</p>
                  <p className="text-sm text-gray-600">Home Cook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How RecipeWreck Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 text-center mb-6 md:mb-0">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">Generate Your Recipe</h3>
                <p className="text-gray-600">
                  Enter a few ingredients or a theme, and our AI will create the most absurd recipe possible.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 text-center mb-6 md:mb-0">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">Get AI-Generated Images</h3>
                <p className="text-gray-600">
                  Our AI creates horrifyingly realistic images of your culinary abomination.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-center mb-6 md:mb-0">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">Share and Go Viral</h3>
                <p className="text-gray-600">
                  Share your creation on social media and watch the reactions pour in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Create Culinary Chaos?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of content creators, food enthusiasts, and humor lovers 
            who are already wrecking recipes and going viral.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={handleSignUp}
              className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Join the Waitlist
            </button>
            <button
              onClick={handleFundingInterest}
              className="px-8 py-4 bg-red-800 text-white rounded-lg font-bold hover:bg-red-900 transition-colors"
            >
              Support Development
            </button>
          </div>
          
          <p className="text-sm opacity-75">
            Early access coming soon. Be the first to create culinary nightmares!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-red-500 mb-2">RecipeWreck</div>
              <p className="text-gray-400">Wreck your health, one meal at a time</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} RecipeWreck. All rights reserved. No actual recipes were harmed in the making of this app.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
