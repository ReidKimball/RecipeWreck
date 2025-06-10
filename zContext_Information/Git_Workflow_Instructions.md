# Git Commit and Push Workflow Instructions

This document outlines the standard workflow for committing and pushing changes to the repository using Git commands in Windows PowerShell (pwsh) or bash.

## Basic Workflow

### 1. Check File Status
Before making any commits, check which files have been modified:
```pwsh (or bash)
git status
```

### 2. Review Changes
To see the specific changes made to a file before committing:
```pwsh (or bash)
git diff <file_path>
```
Example:
```pwsh (or bash)
git diff zContext_Information/Tech_Stack.md
```

### 3. Stage Changes
Stage the files you want to commit:
```pwsh (or bash)
git add <file_path>
```
For multiple files:
```pwsh (or bash)
git add <file1> <file2> <file3>
```

### 4. Create a Commit
Create a commit with a descriptive message following conventional commit format. In PowerShell, use single quotes for multi-line messages:
```pwsh
git commit -m "type(scope): brief description of changes`n`n- Detailed description of changes`n- Any additional context or notes`n`nCloses (or Fixes) #issue-number (if applicable)"
```

Or in bash:
```bash
git commit -m "type(scope): brief description of changes

- Detailed description of changes
- Any additional context or notes

Closes (or Fixes) #issue-number (if applicable)"
```

Example (PowerShell):
```pwsh
git commit -m "docs(tech-stack): update documentation`n`n- Update document title for clarity`n- Add detailed technology descriptions`n- Fix formatting issues"
```

### 5. Push Changes
Push your committed changes to the remote repository:
```pwsh (or bash)
git push
```

## Best Practices

1. **Commit Messages**:
   - Use conventional commit types (feat, fix, docs, style, refactor, test, chore)
   - Keep the first line under 50 characters
   - Use the body to explain what and why, not how
   - Reference GitHub issues when applicable

2. **Frequent Commits**:
   - Make small, focused commits
   - Each commit should represent a single logical change
   - Don't mix unrelated changes in the same commit

3. **Before Pushing**:
   - Pull the latest changes from the remote
   - Resolve any merge conflicts
   - Run tests if applicable

## Common Commands Reference

- View commit history:
  ```pwsh (or bash)
  git log --oneline
  ```

- Undo last commit (before push):
  ```pwsh (or bash)
  git reset --soft HEAD~1
  ```

- View remote repository information:
  ```pwsh (or bash)
  git remote -v
  ```

- Pull latest changes from remote:
  ```pwsh (or bash)
  git pull
  ```

## Example Complete Workflow (PowerShell)

```pwsh
# Check status
git status

# See changes
git diff path/to/file.js

# Stage changes
git add path/to/file.js

# Commit (PowerShell multi-line syntax)
git commit -m "fix(api): resolve authentication issue`n`n- Fix JWT token validation`n- Add error handling for expired tokens`n`nCloses #42"

# Push to remote
git push
```

## Example Complete Workflow (bash)

```bash
# Check status
git status

# See changes
git diff path/to/file.js

# Stage changes
git add path/to/file.js

# Commit (bash multi-line syntax)
git commit -m "fix(api): resolve authentication issue

- Fix JWT token validation
- Add error handling for expired tokens

Closes #42"

# Push to remote
git push
```