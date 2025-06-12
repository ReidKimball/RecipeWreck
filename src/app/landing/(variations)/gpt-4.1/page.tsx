'use client';
import React from 'react';

// Mockup CTA handler
const handleMockSignup = () => {
  alert('Mock sign-up! (PostHog integration placeholder)');
};

const handleMockFunding = () => {
  alert('Mock funding! (Early supporter placeholder)');
};

export default function LandingPage() {
  return (
    <main style={{
      fontFamily: 'Inter, sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
      minHeight: '100vh',
      padding: '0',
      margin: '0',
      color: '#18181b',
    }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem 1.5rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          RecipeWreck
        </h1>
        <p style={{ fontSize: '1.35rem', fontWeight: 400, marginBottom: '0.5rem', color: '#6366f1' }}>
          Wreck your health, one meal at a time
        </p>
        <p style={{ fontSize: '1.1rem', color: '#52525b', marginBottom: '2rem' }}>
          The world’s first absurdist AI-powered app for generating the most disgusting, unhealthy, and insane recipes. Laugh, share, and revel in culinary chaos.
        </p>
        <button
          style={{
            background: 'linear-gradient(90deg, #6366f1 60%, #a5b4fc 100%)',
            color: '#fff',
            padding: '0.9rem 2.2rem',
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.18)',
            marginBottom: '1.2rem',
          }}
          onClick={handleMockSignup}
        >
          Sign up for early access
        </button>
        <br />
        <button
          style={{
            background: '#fbbf24',
            color: '#18181b',
            padding: '0.7rem 1.8rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 6px rgba(251,191,36,0.15)',
          }}
          onClick={handleMockFunding}
        >
          Become an early supporter
        </button>
      </section>

      {/* Value Prop Section */}
      <section style={{
        maxWidth: 820,
        margin: '0 auto',
        padding: '2rem 1.5rem 1rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 18px rgba(99,102,241,0.08)',
          padding: '2rem',
        }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            AI-Generated Culinary Abominations
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#52525b' }}>
            Let our AI chef concoct the most outrageous, unhealthy, and hilarious recipes you’ve ever seen. Share your favorites and challenge your friends to stomach them.
          </p>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 18px rgba(99,102,241,0.08)',
          padding: '2rem',
        }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Social Sharing & Community
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#52525b' }}>
            Join a community of meme creators, foodies, and humor lovers. Share your recipe disasters, collect the worst of the worst, and go viral with your culinary crimes.
          </p>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 18px rgba(99,102,241,0.08)',
          padding: '2rem',
        }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Save, Rate, & Collect
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#52525b' }}>
            Save your favorite abominations, rate the most revolting, and build your own collection of culinary catastrophes.
          </p>
        </div>
      </section>

      {/* Mockup Recipe Card Section */}
      <section style={{
        maxWidth: 850,
        margin: '2.5rem auto 0 auto',
        padding: '2rem 1.5rem 1rem 1.5rem',
      }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>
          Sample Recipe Abomination
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
        }}>
          {/* Mockup Recipe Card */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(99,102,241,0.10)',
            padding: '1.5rem',
            maxWidth: 350,
            textAlign: 'left',
          }}>
            <div style={{
              width: '100%',
              height: 180,
              background: 'linear-gradient(90deg, #fbbf24 60%, #f87171 100%)',
              borderRadius: 12,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '1px',
            }}>
              [AI-Generated Image]
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Deep-Fried Mayonnaise Pizza
            </h3>
            <p style={{ fontSize: '0.98rem', color: '#52525b', marginBottom: '0.6rem' }}>
              Ingredients: Mayonnaise, pizza dough, gummy bears, bacon bits, nacho cheese, energy drink glaze
            </p>
            <p style={{ fontSize: '0.95rem', color: '#a21caf', marginBottom: '0.8rem', fontWeight: 600 }}>
              Health Warning: May cause existential dread
            </p>
            <button style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.98rem',
            }}>
              Share this disaster
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Mockup) */}
      <section style={{
        maxWidth: 820,
        margin: '2.5rem auto 0 auto',
        padding: '2rem 1.5rem 3rem 1.5rem',
      }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>
          What Our Users Are Saying
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* Mockup Testimonials */}
          <div style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 1px 8px rgba(99,102,241,0.06)',
            padding: '1.2rem',
            maxWidth: 270,
            fontSize: '0.98rem',
            color: '#52525b',
          }}>
            "After trying the AI’s recipes, my doctor blocked my number. 10/10."
            <div style={{ color: '#a21caf', fontWeight: 700, marginTop: '0.7rem' }}>@darkhumorchef</div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 1px 8px rgba(99,102,241,0.06)',
            padding: '1.2rem',
            maxWidth: 270,
            fontSize: '0.98rem',
            color: '#52525b',
          }}>
            "My friends dared me to cook one. Now I’m banned from three kitchens."
            <div style={{ color: '#a21caf', fontWeight: 700, marginTop: '0.7rem' }}>@culinaryoutlaw</div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 1px 8px rgba(99,102,241,0.06)',
            padding: '1.2rem',
            maxWidth: 270,
            fontSize: '0.98rem',
            color: '#52525b',
          }}>
            "The only app that made my nutritionist cry."
            <div style={{ color: '#a21caf', fontWeight: 700, marginTop: '0.7rem' }}>@absurdfoodie</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        color: '#a3a3a3',
        fontSize: '0.95rem',
        padding: '2rem 0 1rem 0',
      }}>
        &copy; {new Date().getFullYear()} RecipeWreck. Absurdist AI for culinary chaos.
      </footer>
    </main>
  );
}
