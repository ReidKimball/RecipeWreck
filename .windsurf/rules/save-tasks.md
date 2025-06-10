---
trigger: manual
---

Using the provided architecture markdown document (e.g., one recently created or specified by the user), your task is to generate a granular, step-by-step implementation plan.

This plan will be passed to an engineering LLM, which will be instructed to complete one task at a time. Therefore, it is critical that each task adheres to the following principles:

Atomic: Represents the smallest logical unit of work.

Independently Testable (or Verifiable): Has a clear, simple success criterion or observable outcome that can be checked after completion. This might be a UI change, a console log, a successful API call with mock data, or a unit test passing.

Focused (Single Concern): Addresses only one specific aspect of the implementation.

Clear and Unambiguous: Provides precise instructions on what to do.

Instructions for Generating the Task List:

Reference Architecture:

Base this task list exclusively on the content of the provided architecture document. The path to this document will typically be in a format like `zFeature_Plans/your-feature-name/your-feature-name_architecture.md`.

Ensure the tasks directly implement the components, services, endpoints, and data flows defined in the architecture.

Development Flow Adherence:

Structure the tasks to follow a development flow suitable for a React/TypeScript frontend application using Tailwind CSS and `localStorage` for persistence:

1.  **Data Model & State Management Setup**: Tasks for defining/updating TypeScript interfaces (e.g., in `src/types/index.ts`), modifying global state context (e.g., `src/context/AppContext.tsx`) including state structure and reducer actions, and implementing or updating `localStorage` persistence logic (e.g., in `src/lib/storage.ts`).
2.  **Core Component Structure (Placeholder UI)**: Tasks for creating new React component files (e.g., `*.tsx` in `src/components/` or `src/pages/`) with basic functional component structure and initial placeholder content. Basic layout can be started with Tailwind CSS.
3.  **Component Logic & State Integration**: Tasks for implementing component-level logic, including local state management (`useState`, `useReducer`), handling props, and connecting to the global `AppContext` for data fetching and action dispatching.
4.  **Routing & Navigation**: Tasks for setting up or updating React Router routes in `src/App.tsx` or other routing configuration files, and implementing navigation links/buttons in components.
5.  **UI Implementation & Styling**: Tasks for building out the UI as per the architecture, using Tailwind CSS classes for styling, ensuring responsiveness, and adhering to accessibility best practices.
6.  **Functionality Implementation**: Tasks for implementing specific features detailed in the architecture, such as CRUD operations interacting with `AppContext` and `localStorage`, form handling, event handling, and any other client-side business logic.
7.  **Testing (Unit/Integration)**: Tasks for writing unit tests (e.g., using Vitest/Jest and React Testing Library) for components, context reducers, and utility functions. Integration tests should cover key user flows and interactions between components and state.

Task Definition Format (for each task):

Task ID: A sequential identifier (e.g., TASK-FE-001, TASK-BE-001).

Title: A very short, descriptive title for the task.

Description: A clear, concise statement of what needs to be done.

File(s) to Create/Modify: List the primary file path(s) involved (e.g., `src/components/FeatureName/MyComponent.tsx`, `src/pages/MyPage.tsx`, `src/context/AppContext.tsx`).

Key Instructions/Details: Specific instructions, e.g., "Use useState for local state," "Return mock data: { success: true }," "Implement a GET endpoint."

Acceptance Criteria: How to verify the task is complete (e.g., "Component renders placeholder text 'X' on the page," "Console logs 'Data fetched successfully'," "Endpoint returns a 200 OK status with mock data when called via Postman/curl").

Dependencies (Optional): List Task IDs of any prerequisite tasks if not obvious from the sequence.

Example of Granularity and Format (for Creator Space App):

Task ID: TASK-FE-001

Title: Create ProjectCard component file

Description: Create the basic file structure for the `ProjectCard` React component.

File(s) to Create/Modify: `src/components/Project/ProjectCard.tsx`

Key Instructions/Details:

- Create a new `.tsx` file.
- Define a basic functional component named `ProjectCard`.
- The component should accept a `project` prop of type `Project` (ensure `Project` type is defined or imported from `src/types/index.ts`).
- The component should return a simple `div` containing placeholder text like "Project Card Placeholder".

Acceptance Criteria: The file `src/components/Project/ProjectCard.tsx` exists. If imported and rendered with a mock `project` prop, it displays "Project Card Placeholder".

Scope:

Focus only on the tasks required to implement the features, components, and logic described in the provided architecture document. Do not include unrelated changes.

Formatting and Output:

Format the entire task list in Markdown.

Use headings for logical sections (e.g., "Frontend UI Setup," "Backend API for Meal Logging") if it helps organize the tasks.

Save the output in the same directory as the source architecture document.

Name the task list file by taking the base name of the architecture document and appending `_tasks` to it. For example, if the architecture document is `projects-and-role-cards_architecture.md`, the tasks file should be named `projects-and-role-cards_tasks.md`.

Before you proceed, please confirm you understand these instructions. Let me know if any part of the architecture document or these task generation instructions is unclear.