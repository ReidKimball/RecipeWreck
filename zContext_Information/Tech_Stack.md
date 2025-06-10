# RecipeWreck App - Technology Stack for App

This document outlines the complete technology stack used in the RecipeWreck App, including all dependencies and their versions as specified in `package.json`.

## Core Technologies

### Frontend Framework
- **Next.js** `15.3.3` - React framework for server-rendered applications
- **React** `^19.0.0` - JavaScript library for building user interfaces
- **React DOM** `^19.0.0` - React's DOM rendering package

### Language & Type Checking
- **TypeScript** `^5` - Type-safe JavaScript superset

### Styling
- **Material-UI (MUI)** `^7.1.1` - React component library for faster and easier web development
- **Emotion** `^11.14.0` - CSS-in-JS library for styling React components
- **Tailwind CSS** `^4.1.8` - Utility-first CSS framework
- **PostCSS** `^8.5.4` - Tool for transforming CSS with JavaScript
- **Autoprefixer** `^10.4.21` - PostCSS plugin to parse CSS and add vendor prefixes

### Backend & Database
- **MongoDB** `^6.17.0` - NoSQL database
- **Mongoose** `^8.15.1` - MongoDB object modeling for Node.js
- **Firebase** `^11.9.0` - Backend-as-a-Service (BaaS)

### Authentication & Payments
- **Stripe** `^18.2.1` - Payment processing

### Utilities
- **Zod** `^3.25.56` - TypeScript-first schema validation
- **Day.js** `^1.11.13` - Lightweight date library
- **Google GenAI** `^1.4.0` - Google's Generative AI client library

## Development Dependencies

### Linting & Code Quality
- **ESLint** `^9` - Pluggable JavaScript linter
- **@eslint/eslintrc** `^3` - ESLint configuration
- **eslint-config-next** `15.3.3` - ESLint configuration for Next.js

### TypeScript Support
- **@types/node** `^20` - TypeScript definitions for Node.js
- **@types/react** `^19` - TypeScript definitions for React
- **@types/react-dom** `^19` - TypeScript definitions for React DOM

## Development Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Node.js
- **Type**: CommonJS (default)
- **Package Manager**: npm (as indicated by package-lock.json)

## Build Process
1. **Development**: `npm run dev`
   - Starts Next.js development server with Turbopack
   - Includes hot module replacement and fast refresh

2. **Production Build**: `npm run build`
   - Creates an optimized production build
   - Includes server-side rendering and static generation
   - Optimizes assets and bundles

3. **Production Start**: `npm start`
   - Starts the production server

4. **Linting**: `npm run lint`
   - Runs ESLint with Next.js configuration
   - Enforces code quality rules

## Browser Support
The application is built with modern web standards and is designed to work on:
- Latest versions of Chrome, Firefox, Safari, and Edge
- Mobile browsers with similar capabilities

## Development Environment
- **Node.js**: Requires Node.js 18+ (as indicated by Next.js 15 requirements)
- **Package Manager**: npm (comes with Node.js)
- **Database**: MongoDB (local or cloud instance)
