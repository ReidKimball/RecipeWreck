# RecipeWreck App - Project Structure

This document provides an overview of the project structure for the RecipeWreck App, a Next.js application with a focus on server-side rendering and API routes.

## Root Directory

```
RecipeWreck/
├── .next/                  # Next.js build output
├── node_modules/           # Project dependencies
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── app/               # App Router directory
│   │   ├── api/           # API routes
│   │   ├── components/     # Shared React components
│   │   ├── lib/           # Utility functions and configurations
│   │   └── styles/        # Global styles
│   ├── models/            # Database models (Mongoose schemas)
│   └── types/             # TypeScript type definitions
├── .env                   # Environment variables
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project configuration and dependencies
├── package-lock.json     # Lock file for dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Source Code (`/src`)

### App Directory (`/src/app`)
- `layout.tsx` - Root layout component
- `page.tsx` - Home page component
- `api/` - API route handlers
  - `recipes/` - Recipe-related API endpoints
  - `chat/` - Chat-related API endpoints
  - `prompts/` - System prompt API endpoints

### Components (`/src/app/components`)
- `chat/`
  - `ChatMessage.tsx` - Component for displaying chat messages
  - `ChatInput.tsx` - Chat input component
- `recipe/`
  - `RecipeForm.tsx` - Form for creating/editing recipes
  - `RecipeCard.tsx` - Card component for recipe information
- `prompts/`
  - `SystemPromptForm.tsx` - Form for managing system prompts
  - `PromptSelector.tsx` - Component for selecting prompts
- `ui/` - Reusable UI components using Material-UI
  - `Button.tsx`
  - `Card.tsx`
  - `Dialog.tsx`
  - `Input.tsx`

### Models (`/src/models`)
- `User.ts` - User model/schema
- `Recipe.ts` - Recipe model/schema
- `ChatSession.ts` - Chat session model/schema
- `Prompt.ts` - System prompt model/schema

### Lib (`/src/lib`)
- `db.ts` - Database connection and utilities
- `api/` - API client utilities
  - `client.ts` - API client configuration
  - `endpoints.ts` - API endpoint definitions
- `auth.ts` - Authentication utilities
- `utils.ts` - General utility functions

### Types (`/src/types`)
- `index.ts` - Main type exports
- `recipe.ts` - Recipe-related types
- `chat.ts` - Chat-related types
- `prompt.ts` - Prompt-related types

## Configuration
- **Next.js 15**: React framework with server-side rendering
- **TypeScript**: Type-safe JavaScript
- **MongoDB/Mongoose**: Database and ODM
- **Material-UI (MUI)**: React component library
- **Tailwind CSS**: Utility-first CSS framework
- **Firebase**: Authentication and backend services
- **Stripe**: Payment processing
- **Zod**: Schema validation

## Data Flow
1. Pages fetch data on the server using Next.js data fetching methods
2. API routes handle server-side operations and database interactions
3. Client-side state is managed with React hooks and context
4. MongoDB is used for persistent data storage
5. Firebase handles authentication and real-time features

## Key Features
- Server-side rendering for better SEO and performance
- API routes for backend functionality
- MongoDB integration for data persistence
- Firebase authentication
- Stripe payment processing
- Responsive design with Material-UI and Tailwind CSS
- Type-safe codebase with TypeScript

## Development
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Lint code: `npm run lint`

## Dependencies
- Next.js 15
- React 19
- TypeScript
- MongoDB & Mongoose
- Firebase
- Material-UI (MUI)
- Tailwind CSS
- Stripe
- Zod
- Day.js
