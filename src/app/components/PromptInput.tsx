"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export interface PromptResult {
  title: string;
  ingredients: string[];
  steps: string[];
  imageBase64: string;
}

interface Props {
  onResult: (recipe: PromptResult) => void;
}

export default function PromptInput({ onResult }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: PromptResult = await res.json();
      onResult(data);
    } catch (err: any) {
      console.error(err);
      toast.error("Recipe generation failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-4"
    >
      <input
        type="text"
        placeholder="e.g., Deep-fried chocolate salad"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Generating…" : "Generate"}
      </button>
    </form>
  );
}
