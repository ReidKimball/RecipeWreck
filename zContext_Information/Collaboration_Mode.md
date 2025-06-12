# COLLABORATION MODE

## Mode Name: Prompt Engineering
Enabled: false
Mode Description: 
- Do not write any code, we are in brainstorming, designing, and prompt engineering mode.
- You will be given a prompt to improve. Using your vast knowledge of AI and machine learning, improve the prompt to make it more effective to ensure success of this project.
- Save the prompt as a markdown file in the zInstructions_and_Context folder.

## Mode Name: Prototyping Features
Enabled: false
Mode Description: 
- You can write code, but prefer to talk about it first. We are in brainstorming, designing, and prototyping mode.
- You will be given a feature to implement in a very rough, lightweight way without introducing any new dependencies or complex logic.
- Use placeholder data to implement the feature.
- Use very minimal UI with easy to read text (no emojis, simple icons, no colors, no images) and simple layout.
- The goal is to get a working prototype of the feature as quickly as possible to discover what works and doesn't work.

## Mode Name: Update GitHub Project
Enabled: true
Mode Description: 
- Create a GitHub issue that describes the feature at a high level in one to two paragraphs.
- Create a GitHub document that details the architecture plan for the feature. Save it to `/docs/feature_name/architecture_for_feature_name.md`.
  - Use kebab-case for the feature name in the path (e.g., `llm-mongodb-integration`)
  - The architecture document should be placed in its own directory under `/docs/`
- In the GitHub issue, add a section called "Architecture" with a link to the document using this format:
  ```markdown

  ### Architecture
  See the detailed architecture document: [Architecture Plan: Feature Name](https://github.com/ReidKimball/RecipeWreck/blob/master/docs/feature-name/architecture_for_feature_name.md)
  ```
  - Always use the full GitHub URL (not relative paths) for reliability
  - Ensure the branch name in the URL matches your current branch (typically `main` or `master`)
  - The link text should clearly describe the document (e.g., "Architecture Plan: Feature Name")
- Breakdown the architecture document into smaller tasks and save them as individual issues in the GitHub project.
- Use labels to categorize the issues (e.g., "enhancement", "bug", "documentation").
- Use the following workflow labels:
  - "Backlog" - For issues that are not ready to be worked on
  - "Ready" - For issues that are ready to be worked on
  - "In Progress" - For issues currently being worked on
  - "Done" - For completed issues
- Update the GitHub issue with a new section called "Task List" with links to all created sub-issues.
- After creating the architecture document and all related issues, verify that all links work correctly when viewing the issue on GitHub.

## Mode Name: Architecture and Design
Enabled: false
Mode Description: 
- Do not write any code, we are in brainstorming, designing, and architecting mode.
- At the beginning of each new conversation you must read the project_structure.md file in the zInstructions_and_Context folder.
- Acknowledge that you have read the project_structure.md file after doing so.
- When you feel appropriate, ask the user for permission to update the project_structure.md file with new information as the project develops. You'll want to store information about the project structure, file locations, and any other relevant information in the project_structure.md file that you want to know about in the future.
- At the end of discussing the feature, I'll ask you to create a GitHub issue that describes the feature at a high level in one to two paragraphs.

## Mode Name: Development
Enabled: true
Mode Description: 
- Do write code, we are in development mode.
- At the beginning of each new conversation you must read the project_structure.md file at the root of the project.
- Acknowledge that you have read the project_structure.md file after doing so.
- When you feel appropriate, ask the user for permission to update the project_structure.md file with new information as the project develops. You'll want to store information about the project structure, file locations, and any other relevant information in the project_structure.md file that you want to know about in the future.
- Write the absolute minimum code required
- No sweeping changes
- No unrelated edits - focus on just the task you're on
- Make code precise, modular, testable
- Don’t break existing functionality
- If I need to do anything (e.g. Firebase/Google Cloud config), tell me clearly
- Acknowledge you have read this by printing "Coding Rules Read"
- If following a tasks list only implement the next task in the list, then stop and wait for permission to continue.
- After completing a task:
  - Update the corresponding GitHub issue:
    - Set the status label to "Done".
    - Add a comment summarizing the work completed and linking to any relevant commits or Pull Requests.
  - Notify the USER to review and accept the work.
  - Wait for USER approval before starting the next task.

## Mode Name: Testing
Enabled: false
Mode Description: 
- Do write code, we are in testing mode.
- At the beginning of each new conversation you must read the project_structure.md file at the root of the project.
- Acknowledge that you have read the project_structure.md file after doing so.
- When you feel appropriate, ask the user for permission to update the project_structure.md file with new information as the project develops. You'll want to store information about the project structure, file locations, and any other relevant information in the project_structure.md file that you want to know about in the future.