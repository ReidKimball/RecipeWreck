"use client";

import { useState } from 'react';
import Head from 'next/head'; // For older Next.js versions, or use Metadata API for App Router

// Mockup Recipe Data - Replace with actual pre-generated recipe images and details
const mockRecipes = [
  {
    id: 1,
    title: "The Cardiac Arrest Casserole",
    imageSrc: "/placeholder-recipe-1.jpg", // Replace with actual path to a pre-generated image
    description: "Layers of fried butter, bacon, and pure regret. Serves 1 (brave soul)."
  },
  {
    id: 2,
    title: "Deep-Fried Mayonnaise Balls",
    imageSrc: "/placeholder-recipe-2.jpg", // Replace with actual path
    description: "Exactly what it sounds like. Comes with a side of existential dread."
  },
  {
    id: 3,
    title: "Sugar-Coated Spam Surprise",
    imageSrc: "/placeholder-recipe-3.jpg", // Replace with actual path
    description: "The surprise is how quickly your pancreas gives up."
  }
];

export default function LandingPage_o3() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate PostHog event for waitlist signup attempt
    // console.log('PostHog: Waitlist signup attempt', waitlistEmail);
    if (waitlistEmail && waitlistEmail.includes('@')) { // Basic validation
      setWaitlistSubmitted(true);
      // TODO: Integrate PostHog event for successful waitlist signup
      // console.log('PostHog: Waitlist signup success', waitlistEmail);
    } else {
      alert('Please enter a valid email, you culinary daredevil!');
    }
  };

  const handlePreorderClick = () => {
    // TODO: Integrate PostHog event for pre-order click
    // console.log('PostHog: Pre-order button clicked');
    alert('Pre-order system coming soon! Your $50 will be eagerly (and absurdly) awaited.');
  };

  return (
    <>
      {/* For Next.js App Router, prefer using the Metadata API in layout.tsx or page.tsx directly */}
      <Head>
        <title>RecipeWreck - Dangerously Delicious AI Recipes</title>
        <meta name="description" content="AI-generated recipes so unhealthy, they're a health hazard. Sign up for early access!" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans">
        {/* Header/Nav - Minimal for now */}
        <header className="w-full py-6 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-purple-400">RecipeWreck</h1>
            <button 
              onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 text-center bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              RecipeWreck: Where AI Crafts Your Culinary <span className="text-purple-400">Chaos</span>.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Indulge in outrageously unhealthy recipes so absurd, your doctor will write a strongly worded letter. (We're not liable, probably.)
            </p>
            <button 
              onClick={() => document.getElementById('preorder-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg text-xl font-bold transition-colors shadow-xl"
            >
              Fund the Absurdity (Pre-Order!)
            </button>
          </div>
        </section>

        {/* What is RecipeWreck? Section */}
        <section className="w-full py-16 md:py-24 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4 text-purple-300">Dare to Dine Dangerously?</h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              RecipeWreck uses cutting-edge (and slightly unhinged) AI to generate recipes that laugh in the face of sensible eating. Perfect for your next cheat day, or if you've simply embraced the void.
            </p>
          </div>
        </section>

        {/* Recipe Showcase Section */}
        <section className="w-full py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">A Glimpse Into the Abyss</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
                  <img src={recipe.imageSrc} alt={recipe.title} className="w-full h-56 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-2xl font-semibold mb-3 text-purple-400">{recipe.title}</h4>
                    <p className="text-gray-400 flex-grow">{recipe.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Waitlist Section */}
        <section id="waitlist-section" className="w-full py-16 md:py-24 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4 text-purple-300">Be the First to Wreck Your Diet.</h3>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Sign up for exclusive launch updates, and maybe a coupon for a defibrillator. (Coupon not guaranteed. Consult your sense of humor.)
            </p>
            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="your.email@example.com (if you dare)"
                  required
                  className="flex-grow px-6 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <p className="text-xl text-green-400 font-semibold">
                Thanks! Your arteries quiver with anticipation. We'll be in touch (if the AI doesn't achieve sentience first).
              </p>
            )}
            <p className="mt-4 text-sm text-gray-500">{`// TODO: Integrate PostHog event for waitlist signup`}</p>
          </div>
        </section>

        {/* Call to Action - Pre-order Section */}
        <section id="preorder-section" className="w-full py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4 text-yellow-400">Fund the Absurdity: <s>$75/mo</s> $50 Lifetime Access!</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Help us build this beautiful monstrosity. For a <strong className='text-yellow-300'>one-time $50</strong>, get lifetime access to culinary chaos. <br />
              <span className="text-md text-gray-400">Disclaimer: 'Lifetime' is relative, especially with these recipes. App is <strong className='text-red-400'>NOT ready yet</strong>. This is a pre-order to fund development. No refunds if you meet your maker before launch (or if the app never launches, lol, jk... mostly).</span>
            </p>
            <button
              onClick={handlePreorderClick}
              className="px-12 py-5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg text-2xl font-bold transition-colors shadow-2xl transform hover:scale-105"
            >
              Pre-Order Your Culinary Demise ($50)
            </button>
            <p className="mt-4 text-sm text-gray-500">{`// TODO: Integrate PostHog event for pre-order click & Stripe Checkout`}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} RecipeWreck. Consult a physician before use. Or don't, we're a website, not your mom. All recipes generated for satirical purposes only. Please don't actually eat this stuff daily. Or do. Free will, baby.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {`// TODO: Add actual links if needed (Privacy, Terms)`}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
