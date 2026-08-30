# CHB System

A project workspace for the CHB internal business management system, currently evolving from a browser-based POS prototype.

## Workspace

This repository is designed to work as:
- a software project
- an Obsidian vault
- a Git repository
- Claude project context

## Important locations

- `docs/` — project knowledge
- `CLAUDE.md` — AI coding conventions
- `.gitignore` — files that should not be committed

## Current milestone

Demo 2:
1. UI/visual polish
2. Login interface
3. Mock users
4. Basic roles
5. Role-aware interface
6. Preserve existing POS behavior

## Git workflow

Obsidian changes are local file changes. They are **not automatically uploaded to GitHub** just because the folder is a Git repository.

Typical workflow:

```bash
git status
git add .
git commit -m "docs: update project knowledge"
git push
```

An Obsidian Git plugin can automate/prompt for these Git operations if configured.

## Obsidian

Open this repository root as an Obsidian vault.

Do not commit Obsidian's machine-specific workspace files; `.gitignore` already excludes them.
