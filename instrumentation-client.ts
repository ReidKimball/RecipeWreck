import posthog from "posthog-js"

// Initialize PostHog client
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  capture_pageview: 'history_change',   // capture SPA pageviews on history change
  capture_pageleave: true,              // enable pageleave (page unload) capture
  capture_exceptions: true,             // enable Error Tracking
  debug: process.env.NODE_ENV === "development",
});
