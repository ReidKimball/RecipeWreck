// src/app/funding-success/page.tsx
import Head from 'next/head';

export default function FundingSuccessPage() {
  return (
    <>
      <Head>
        <title>RecipeWreck - Funding Confirmed! Prepare for Impact.</title>
        <meta name="description" content="Your generous (and slightly unhinged) contribution to RecipeWreck has been confirmed!" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-green-400 mb-8">
            Success! You're Officially a Culinary Daredevil!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Thank you for your payment, you glorious culinary heathen. Your $50 has been bravely sacrificed to the altar of RecipeWreck.
            We're not sure whether to congratulate you or offer our condolences. Probably both.
          </p>
          <p className="text-lg text-gray-400 mb-4">
            You'll get an email (to the address you dared to provide to Stripe) when the app is finally ready for you to wreck your health, one gloriously ill-advised meal at a time.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Until then, try not to think too hard about what you've just done. Or do. We're not your conscience.
          </p>
          <div className="mb-10">
            <img 
              src="/images/RecipeWreck_Kitchen_Chaos_01.jpg" // Replace with a suitably chaotic/funny image
              alt="A visual representation of culinary chaos" 
              className="mx-auto rounded-lg shadow-xl w-full max-w-md h-auto object-cover"
              // Consider a funny placeholder, like a picture of a burnt kitchen or a confused chef
            />
            <p className="text-xs text-gray-500 mt-2">
              (Actual footage of our development process. Or your future kitchen. Who can say?)
            </p>
          </div>
          <p className="text-md text-gray-500 mb-6">
            In the meantime, feel free to ponder the existential implications of AI-generated recipes that might just be sentient... and slightly malevolent.
          </p>
          <a
            href="/" // Link back to the main landing page
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg"
          >
            Return to the Scene of the (Future) Crime
          </a>
          <p className="mt-12 text-sm text-gray-600">
            RecipeWreck: Endangering taste buds since... well, soon.
          </p>
        </div>
      </div>
    </>
  );
}
