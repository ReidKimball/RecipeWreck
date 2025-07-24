# RecipeWreck

**Tagline**: "Wreck your health, one meal at a time"

RecipeWreck is an absurdist AI-powered application that generates the most disgusting, unhealthy, and insane recipes imaginable. It combines humor with cutting-edge AI to create outrageous culinary abominations that users can share for entertainment.

## How It Works

At its core, RecipeWreck uses generative AI to bring its hilariously awful creations to life. The process is simple:

1.  A user provides a prompt or an idea for a recipe.
2.  Our backend, powered by the **Google Gemini API**, processes the prompt to generate a completely unique and absurd recipe, including a title, ingredients, and step-by-step instructions.
3.  Simultaneously, an AI image generation model creates a custom, high-resolution image to visually represent the culinary disaster.
4.  The final result is presented on a beautifully designed recipe card, ready for the user to save, share, and horrify their friends with.

## Technology Stack

RecipeWreck is built with a modern, robust, and scalable technology stack to ensure a high-quality user experience and reliable performance.

*   **Framework:** [Next.js](https://nextjs.org/) (v15+ with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/) (v19)
*   **Styling:** A combination of [Tailwind CSS](https://tailwindcss.com/) (v4) for utility-first styling and [Material UI (MUI)](https://mui.com/) for a comprehensive component library.
*   **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini and Imagen models) for recipe text and image generation.
*   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for flexible and scalable data storage.
*   **Schema Validation:** [Zod](https://zod.dev/) for ensuring type-safe data handling between the client and server.
*   **Deployment:** Google Cloud Run

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install Dependencies:**
    Navigate to your project's root directory in the terminal and run:
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env.local` file in the root directory by copying the `.env.example` file. You will need to add your own API keys for Google GenAI and your MongoDB connection string.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Open the Application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
