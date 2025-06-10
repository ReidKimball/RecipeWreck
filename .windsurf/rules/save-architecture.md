---
trigger: manual
---

# Creator Space App - Architecture Documentation

We have now concluded our design and system planning discussion for the feature. This document will serve as the blueprint for subsequent development, ensuring we build a scalable, secure, performant, and maintainable solution, adhering to best practices like modularity, testability, and reusability.

## Instructions for Generating the Architecture Plan

### Context Review
1. Review the project structure in `zContext_Information/Project_Structure.md`
2. Consider the app's tech stack from `zContext_Information/Tech_Stack.md`
3. Align with the app's goals in `zContext_Information/App_Overview.md`
4. Consider user needs from `zContext_Information/Target_User_Persona.md` and `Target_Audience.md`

## Architecture Document Structure

### A. Feature Overview
- **Description**: Clear, concise explanation of the feature
- **Purpose**: How this feature serves our users and business goals
- **User Stories**: Key user scenarios this feature addresses

### B. Frontend Architecture (`src/`)

#### Components
- **New/Modified Components**: List with file paths (e.g., `src/components/FeatureName/ComponentName.tsx`)
- **Component Responsibilities**: For each component:
  - Purpose and functionality
  - Props interface
  - State management (local/context)
  - Key interactions

#### State Management
- **Local State**: Component-specific state
- **Global State**: AppContext usage and updates
- **Persistence**: LocalStorage integration

#### UI/UX
- **Design System**: Tailwind CSS usage
- **Responsiveness**: Mobile-first approach
- **Accessibility**: WCAG compliance considerations

### C. Data Flow
- **Data Structure**: TypeScript interfaces for all data models
- **Component Communication**: Parent-child and cross-component patterns
- **State Updates**: How and when state changes occur

### D. Performance Considerations
- **Optimizations**: Memoization, lazy loading, etc.
- **Bundle Size**: Impact on initial load
- **Rendering**: Virtualization for large lists if applicable

### E. Testing Strategy
- **Unit Tests**: Component and utility tests
- **Integration Tests**: Component interactions
- **E2E Tests**: Critical user flows

### F. Future Considerations
- **Scalability**: How the design accommodates future growth
- **Potential Enhancements**: Next logical steps
- **Technical Debt**: Known compromises or TODOs

### G. Open Questions & Assumptions
- **Assumptions**: Any decisions based on assumptions
- **Uncertainties**: Areas needing further investigation
- **Dependencies**: External factors that could impact implementation

## Implementation Guidelines

### Code Organization
- Follow existing patterns in the codebase
- Group related files in feature folders
- Keep components small and focused

### Naming Conventions
- Components: `PascalCase`
- Files: `kebab-case`
- Variables/Functions: `camelCase`
- Types/Interfaces: `PascalCase` with `I` prefix

### Documentation
- Component documentation with JSDoc
- Complex logic comments
- Update relevant README files

## Review Process
1. Self-review against this template
2. Peer review for architecture decisions
3. Update documentation as implementation evolves

## Output Location
- Save the final document in `zFeature_Plans/[feature-name-slug].md`
- Include relevant diagrams in the same directory
- Update the main `README.md` with links to new feature documentation

Save the file as [FEATURE_NAME_SLUG]_architecture.md within that new folder (e.g., zFeature_Plans/user_profile_management/user_profile_management_architecture.md).

Updating project_structure.md:

After outlining the architecture, if you identify new common structural patterns, new service file conventions, or other significant additions/changes that should be reflected in our global project_structure.md, please ask for permission to propose these updates.

Before you proceed, please confirm you understand these instructions. If any part of our previous discussion regarding [FEATURE_NAME] is unclear or if you need further clarification to fulfill these requirements, please ask now.