"use client";

import Image from "next/image";
import { useState } from "react";

/*
  Landing Page for RecipeWreck
  ---------------------------------
  • Hero section communicates core value prop & absurdist angle.
  • Gallery shows 3 pre-generated recipe cards (stored in /public/landing/*).
  • Waitlist signup posts to a mock endpoint (to be wired to PostHog later).
  • Pre-order button links to a placeholder Stripe Checkout URL.
  • Lightweight inline PostHog snippet is included but gated by env var so it
    won’t error in local dev if the ID isn’t set.
  ---------------------------------
*/

const PRE_ORDER_URL = "https://buy.stripe.com/test_preorder_link"; // TODO: replace with real link
const IMAGES = [
  "/landing/recipe1.png",
  "/landing/recipe2.png",
  "/landing/recipe3.png",
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoining(true);
    // TODO: send to PostHog or a serverless endpoint
    await new Promise((r) => setTimeout(r, 800));
    setJoined(true);
    setJoining(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans">
      {/* PostHog script (mock) */}
      {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            (function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")),(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r),p.async=1,p.src="https://cdn.posthog.com/posthog.js",n=e;for(var d=["capture","identify","alias","people.set","people.set_once","people.increment","people.append","people.union","people.track_charge","people.clear_charges","people.delete_user"],l=0;l<d.length;l++)g(n,d[l]);e._i.push([i,s,a])},e.__SV=1)})(document,window.posthog||[]);
            posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', { api_host: 'https://app.posthog.com' });
          `,
          }}
        />
      )}

      <header className="py-16 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          RecipeWreck
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
          AI-generated, outrageously unhealthy recipes guaranteed to shock your
          arteries—and your friends.
        </p>
        <p className="mt-2 text-lg text-purple-400 font-semibold">
          Pre-order lifetime access for <span className="line-through">$75</span>{" "}
          <span className="text-white">$50</span>
        </p>
        <a
          href={PRE_ORDER_URL}
          onClick={() => window.posthog?.capture("preorder_click")}
          className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-bold transition-colors"
        >
          Get in Early
        </a>
      </header>

      {/* Gallery */}
      <section className="px-4 max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
        {IMAGES.map((src, idx) => (
          <div key={src} className="bg-[#111] rounded-lg shadow-lg p-4">
            <Image
              src={src}
              alt={`Recipe card ${idx + 1}`}
              width={600}
              height={338}
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </section>

      {/* Waitlist */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Heart-Stopping Waitlist</h2>
        {joined ? (
          <p className="text-green-400">Thanks! We’ll clog your inbox soon.</p>
        ) : (
          <form
            onSubmit={handleJoin}
            className="max-w-sm mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md text-black"
            />
            <button
              type="submit"
              disabled={joining}
              className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-md font-semibold disabled:opacity-60"
            >
              {joining ? "Joining…" : "Sign Up"}
            </button>
          </form>
        )}
      </section>

      <footer className="py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RecipeWreck. Eat irresponsibly.
      </footer>
    </div>
  );
}
