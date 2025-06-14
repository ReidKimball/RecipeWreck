/**
 * @file src/app/layout.tsx
 * @description Defines the root layout for the RecipeWreck application. This component sets up global styles, fonts, and the basic HTML structure.
 * @requires next/font/google For loading custom fonts (Geist Sans and Geist Mono).
 * @requires ./globals.css For global application styles.
 * @requires ./ThemeRegistry For Material UI theme integration.
 * @author Cascade
 * @date 2025-06-12
 */

import type { Metadata } from "next"; // Type definition for Next.js page metadata.
import { Geist, Geist_Mono } from "next/font/google"; // Functions for loading Geist Sans and Geist Mono fonts.
import "./globals.css"; // Imports global styles for the application.
import ThemeRegistry from './ThemeRegistry'; // Component for Material UI theme setup and registration.

/**
 * @constant geistSans
 * @description Configuration for the Geist Sans font.
 * It's loaded with Latin subsets and assigned to the CSS variable `--font-geist-sans`.
 * @type {object}
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * @constant geistMono
 * @description Configuration for the Geist Mono font.
 * It's loaded with Latin subsets and assigned to the CSS variable `--font-geist-mono`.
 * @type {object}
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * @constant metadata
 * @description Default metadata for the application. This can be overridden by individual pages.
 * @type {Metadata}
 * @property {string} title - The default title for pages.
 * @property {string} description - The default description for pages.
 */
export const metadata: Metadata = {
  title: "RecipeWreck - Wreck your health, one meal at a time",
  description: "AI-generated recipes so unhealthy, they're a health hazard. Sign up for early access!",
};

/**
 * @component RootLayout
 * @description The root layout component for the Next.js application. It wraps all pages and provides a consistent structure, including HTML, body, and theme setup.
 * This component is a Server Component by default in the Next.js App Router.
 * @componentType Server
 * @param {object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout (typically the current page).
 * @returns {JSX.Element} The JSX structure for the root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
        {/* {children} */}
      </body>
    </html>
  );
}
