"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head'; // For older Next.js versions, or use Metadata API for App Router
import TestimonialsSection from '@/app/components/TestimonialsSection'; // Added import

// Mockup Recipe Data - Replace with actual pre-generated recipe images and details
// Helper function to generate stars
const StarRating = ({ rating }: { rating: number }) => (
  <div className="text-yellow-400 text-lg">
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </div>
);

const mockRecipes = [
  {
    id: 1,
    title: "The Cardiac Carnival Burrito",
    imageSrc: "/images/The_Cardiac_Carnival_Burrito.jpg", // Replace with actual path to a pre-generated image
    description: "This deep-fried funnel cake burrito is less a dessert and more a one-way ticket to the hospital.",
    rating: 5,
    ratingDescription: "Rated 'Absolutely Horrifying'",
    reactions: "10.2k",
    shares: "5.4k",
    ingredientsText: `1 extra-large, freshly made funnel cake (at least 12 inches in diameter, cooked pliable, not crispy – this is your "tortilla," a greasy canvas for the masterpiece of poor decisions to come)\n
                      1 gallon peanut oil (for frying and re-frying, because once is never enough when you're actively trying to clog every artery)\n
                      1 full slice of New York-style cheesecake, frozen solid (the dense, icy core of this caloric black hole)\n
                      3 scoops of chocolate fudge brownie ice cream (to ensure immediate brain freeze and a diabetic coma chaser)\n
                      1 cup of bacon bits, candied in maple syrup (because savory and sweet should always engage in a fight to the death on your palate)\n
                      1/2 cup Ghirardelli caramel sauce (a touch of "luxury" before the inevitable food coma)\n
                      1/2 cup Hershey's chocolate shell sauce (the delicious, quick-hardening cement holding this monstrosity together)\n
                      1 full-size Snickers bar, roughly chopped (because what's one more candy bar when you've already abandoned all hope?)\n
                      1 sleeve of Oreos, crushed (for that delightful, gritty texture that says "I've given up on my teeth")\n
                      1 can of extra-creamy whipped cream (from a can, naturally, for that authentic taste of aerosol and regret)\n
                      A stick of butter (the unsung hero, greasing the wheels of this entire digestive disaster)`,
  },
  {
    id: 2,
    title: "Deep-Fried Mayonnaise Mayhem",
    imageSrc: "/images/Deep-Fried_Mayonnaise_Mayhem.jpg", // Replace with actual path
    description: "Exactly what it sounds like. Comes with a side of existential dread.",
    rating: 5,
    ratingDescription: "Rated 'A Cry for Help'",
    reactions: "12.1k",
    shares: "6.8k",
    ingredientsText: `1 cup full-fat mayonnaise (the richer, the better, ideally a whole-egg variety)\n
                      1 cup crushed butter crackers (like Ritz, for that extra buttery crunch)\n
                      1/2 cup finely shredded sharp cheddar cheese (because why stop at mayo?)\n
                      1/4 cup crumbled bacon bits (the real kind, not the soy stuff)\n
                      1/2 cup all-purpose flour\n
                      2 large eggs, beaten\n            
                      4 cups vegetable oil (or lard, if you're truly committed) for deep frying\n
                      Optional: A sprinkle of powdered sugar for "balance" (don't ask, just do it)`,
  },
  {
    id: 3,
    title: "Sugar-Coated Spam Surprise",
    imageSrc: "/images/The_Glazed_Porkocalypse.jpg", // Replace with actual path
    description: "The surprise is how quickly your pancreas gives up.",
    rating: 4,
    ratingDescription: "Rated 'Diabetically Daring'",
    reactions: "8.7k",
    shares: "3.2k",
    ingredientsText: `1 can (12 oz) Spam, preferably the \"Less Sodium\" kind (we need some illusion of health, right?)\n
                      1 cup granulated white sugar\n
                      1/2 cup brown sugar, packed\n
                      1/4 cup corn syrup (for that extra sticky, sugary sheen)\n
                      1/2 stick (4 oz) unsalted butter, melted\n
                      1/4 cup heavy whipping cream\n
                      1 teaspoon vanilla extract (to make it taste less like pure sugar and more like... dessert Spam?)\n
                      1/2 cup mini marshmallows (for textural contrast and another sugar hit)\n
                      A generous handful of sprinkles (because why not?)`
  }
];

export default function LandingPage_o3() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('');

  const buttonTextOptions = [
    "Join the Mayhem",
    "Embrace the Indigestion",
    "I Have No Regrets (Yet)",
    "Sign Me Up for Questionable Choices",
    "What's the Worst That Could Happen?",
    "Unleash the Culinary Chaos",
    "Click Here for a Bad Time (The Good Kind)"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * buttonTextOptions.length);
    setSubmitButtonText(buttonTextOptions[randomIndex]);
  }, []); // Empty dependency array ensures this runs only on mount

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
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors"
            >
              Join the Mayhem
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
                    <h4 className="text-2xl font-semibold mb-2 text-purple-400">{recipe.title}</h4>
                    
                    <div className="flex items-center mb-4 gap-2">
                      <StarRating rating={recipe.rating} />
                      <p className="text-gray-400 text-sm">{recipe.ratingDescription}</p>
                    </div>

                    <p className="text-gray-400 mb-4">{recipe.description}</p>
                    
                    {recipe.ingredientsText && (
                      <div className="text-sm text-gray-400 whitespace-pre-line mb-4">
                        <h5 className="text-lg font-semibold mb-2 text-purple-300">Ingredients:</h5>
                        {recipe.ingredientsText}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-700 flex items-center text-gray-400 text-sm gap-x-4 gap-y-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span>😱</span>
                        <span>{recipe.reactions} Reactions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🔥</span>
                        <span>Shared {recipe.shares} times</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* Call to Action - Waitlist Section */}
        <section id="waitlist-section" className="w-full py-16 md:py-24 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            {/* was be the first to wreck your diet */}
            <h3 className="text-4xl font-bold mb-4 text-purple-300">Get on the List: Our 'First Users' Are Already Questioning Their Life Choices.</h3>
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
                  {submitButtonText}
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
