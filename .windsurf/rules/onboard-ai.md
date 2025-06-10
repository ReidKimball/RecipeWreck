---
trigger: manual
---

# LLM Onboarding Protocol

**Objective**: Process a list of specified files, confirm each with a uniquely formatted message on a new line, generate a summary report of the assimilated content, and then provide a final status update.

**Instructions:**

**Phase 1: Initialization**
1.  When you begin your reply, your very first line must be *exactly*:
    `Initiating onboarding sequence...`

**Phase 2: File Processing and Confirmation**
You will be presented with a list of items, each referring to a "file." For each file entry provided below:
2.  Identify the filename (e.g., `App_Overview.md`) from the `Refer to the file:` line associated with the current item.
3.  Transform this filename:
    a.  Remove its file extension (e.g., `.md`, `.txt`, etc.).
    b.  Replace all underscore characters (`_`) with a single space.
4.  **Crucially, you must print the confirmation for THIS file on a new, separate, and dedicated line *immediately after processing it* and *before moving to the next file*.**
    The format for this confirmation line is *exactly*:
    `✅ [Transformed Filename]`

    *Example 1:* After processing an item referring to `App_Overview.md`, you will print:
    `✅ App Overview`
    (This line MUST be on its own new line.)

    *Example 2:* If you then process an item referring to `Project_Structure.md`, your output *at that point* would look like this (note the two separate lines for the two confirmations):
    `✅ App Overview`
    `✅ Project Structure`
    (Each checkmark confirmation MUST be on its own new line.)

    Continue this process for *every* file specified. Each checkmark line must appear on its own new line.

Phase 3: Assimilation Report
5. After you have processed all the specified files and printed all their corresponding checkmark confirmations (as per instruction #4), but before printing the final status lines of Phase 4, you must generate and print an "Assimilation Report." This report should be on new lines, separate from the checkmark confirmations.
6. Begin the Assimilation Report with an introductory sentence. For example:
I've reviewed all the context files. Here's a summary of what I've learned:
7. Structure the main body of the report with sections corresponding to each file processed.
a. For each file, use a Markdown H3 heading (e.g., ### App Overview) derived from its transformed filename.
b. Under each heading, provide a concise summary of the key information, concepts, and details extracted from that file. Use bullet points or brief paragraphs for clarity.
c. If a file's content includes a directory structure (e.g., for a file named "Project Structure"), represent this structure accurately within a Markdown code block under its respective heading.
8. Include a specific section in your report, for example titled ### Role and Current Collaboration Mode, that synthesizes your understanding of your role and the current collaboration mode based on the content of files like "AI Role" and "Collaboration Mode".
9. Conclude the Assimilation Report with a few (e.g., 2-4) numbered or bulleted questions or suggestions for potential next steps, phrased to invite user direction. For example:
Would you like me to:
1. [Suggestion 1]?
2. [Suggestion 2]?

Phase 4: Final Status
10. After, and only after, you have completed Phase 2 (printing all checkmark confirmations) AND Phase 3 (printing the entire Assimilation Report), your entire remaining output must be exactly the following two lines. These two lines must also be on new and separate lines from each other, and from the preceding report and checkmark lines:

      
`Collaboration Mode: [name of the mode that is enabled]`
`Status: AI onboarding complete. Ready to begin.`

**There should be no other text after these two lines.**

---

All files are located in the projects zContext_Information folder at the root level.
Refer to each file to gain an understanding of what we are building, why, and how to build it with me:

# APP OVERVIEW
App_Overview.md

# PROJECT STRUCTURE
Project_Structure.md

# YOUR ROLE
AI_Role.md

# COLLABORATION MODE
Collaboration_Mode.md

# MY TECH STACK
Tech_Stack.md

# MY TARGET AUDIENCE
Target_Audience.md

# TARGET USER PERSONA
Target_User_Persona.md

# APP FEATURES
App_Features.md