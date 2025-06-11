# RecipeWreck – Core Feature Prototype Spec

## One-Sentence Spec
Given a short text prompt, RecipeWreck generates an *outrageously unhealthy* recipe **and** an AI-generated image, then displays them instantly as a shareable recipe card.

## Acceptance Criteria
1. **Prompt → Result < 10 s** – After submitting the prompt, the full recipe card (image + text) appears within ten seconds on a typical broadband connection.
2. **Complete Card** – Card shows recipe title, 1 cover image, ingredients list, and numbered instructions.
3. **Copy Link** – Clicking “Copy link” copies a permalink to clipboard (stubbed with `/#mock-id` for prototype).
4. **Responsive** – Card and prompt UI render correctly on 375 px (mobile) and 1440 px (desktop) widths.
5. **Graceful Errors** – If GenAI request fails or exceeds 10 s, show toast “Recipe generation failed, please try again.”

## MVP Scope
| Layer | Details |
|-------|---------|
| UI | • PromptInput component (`<form>` + submit)<br>• RecipeCard component (props: title, imageSrc, ingredients[], steps[])<br>• Home page renders PromptInput + conditional RecipeCard.<br>• Loading spinner + toast (react-hot-toast). |
| API | • `POST /api/generate`.<br>Request: `{ prompt: string }`.<br>Server-side calls Google GenAI SDK:<br>• Text: `genai.generateContent({model: GENAI_TEXT_MODEL, prompt})`.<br>• Image: `genai.generateImage({model: GENAI_IMAGE_MODEL, prompt})`.<br>Returns JSON `{ title, ingredients[], steps[], imageBase64 }`. |
| Data Store | None (keep in memory on client). |
| Share Link | For prototype, generate `uuid` client-side and append to URL hash; clipboard copy only. |

## Models / Env Vars
```
GOOGLE_GENAI_API_KEY=xxx
GENAI_TEXT_MODEL=text-bison-002
GENAI_IMAGE_MODEL=imagen-3
```

## Timebox
Target: ≤ 4 hrs dev to demo.
