# Development Workflow

## Standard loop

1. Understand
2. Plan
3. Implement
4. Test
5. Review
6. Refactor
7. Document
8. Commit

## Git workflow

After verified changes:

```bash
git status
git add .
git commit -m "type: short description"
git push
```

Useful commit types:
- `feat:` new functionality
- `fix:` bug fix
- `refactor:` code restructuring
- `style:` visual/styling changes
- `docs:` documentation
- `chore:` maintenance

## Claude workflow

Ask Claude to:
- inspect before modifying
- explain an approach before a large change
- implement incrementally
- help test
- review the result
- update documentation when a decision changes

## Obsidian workflow

Use Obsidian for project knowledge, planning, requirements, decisions, and notes.

Remember: editing a Markdown file in Obsidian changes the local file. GitHub will only receive that change after Git commits/pushes (or an Obsidian Git integration performs those operations).
