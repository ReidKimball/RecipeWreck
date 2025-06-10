# RecipeWreck - App Overview

## What is RecipeWreck?
RecipeWreck is an absurdist AI-powered application that generates the most disgusting, unhealthy, and insane recipes. The app combines humor with AI to create outrageous culinary abominations that users can share and enjoy for entertainment.

**Tagline**: "Wreck your health, one meal at a time"

## Core Concept
- **AI-Generated Recipes**: Uses AI to generate absurd and unhealthy recipes
- **Recipe Cards**: Displays generated recipes in an appealing card format
- **User-Generated Content**: Allows users to create and share their own recipe abominations
- **Social Sharing**: Share outrageous recipes with friends and social media
- **Cloud Storage**: Securely stores user-generated recipes in the cloud

## Key Features
- **AI Recipe Generation**: Generate unique, absurd recipes with AI
- **User Accounts**: Secure authentication for saving and managing recipes
- **Recipe Cards**: Beautifully displayed recipe cards with images and details
- **Social Features**: Share recipes and view others' creations
- **Responsive Design**: Works across all devices
- **Type Safety**: Built with TypeScript for reliability

## Technology Stack
- **Frontend**: Next.js with React and TypeScript
- **Styling**: Modern CSS with responsive design
- **Backend**: Next.js API Routes with Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Secure user authentication system using Firebase
- **AI Integration**: Advanced AI for recipe generation
- **Image Generation**: AI-powered recipe image creation
- **Payments**: Stripe integration for premium features
- **Deployment**: Deployed on Google Cloud Run

## Data Model
- **User Profiles**: Store user information and saved recipes
- **Recipe Schema**: 
  - Recipe title and description
  - Ingredients and instructions
  - AI-generated images
  - Nutritional information
  - Associated health warnings
  - User ratings and comments
  - Creation and modification timestamps

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (configure AI and database access)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser
