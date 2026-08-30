# CHB System — AI Development Instructions

## Project

CHB System is an internal business management system evolving from an existing browser-based POS prototype.

## Current milestone

Demo 2:
- Polish the existing POS UI
- Add a login interface
- Add mock users
- Add basic roles
- Add role-aware navigation/interface
- Preserve existing working POS functionality

## Working rules

1. Inspect the existing code before modifying it.
2. Prefer incremental changes over unnecessary rewrites.
3. Do not introduce frameworks, libraries, databases, APIs, or architecture without a concrete reason.
4. Do not modify unrelated files.
5. Clearly distinguish prototype/demo implementations from production-ready implementations.
6. Never commit secrets, credentials, API keys, or private tokens.
7. Test changes before considering them complete.
8. Keep documentation consistent with important technical decisions.

## Learning rules

The developer is actively learning software development.

Teach concepts rather than only producing code. For significant changes:
- explain the problem
- explain the approach
- implement the change
- explain the important parts
- give verification/testing steps

Do not hide complexity behind unexplained generated code.

## Repository structure

- `docs/` contains project knowledge and documentation.
- The application source code lives alongside the documentation.
- `docs/01 - Project/` contains project context and roadmap.
- `docs/02 - Requirements/` contains business requirements, roles, and rules.
- `docs/03 - Architecture/` contains architecture and technical decisions.
- `docs/04 - Development/` contains current work, bugs, and technical debt.
- `docs/05 - Meetings/` contains meeting/demo notes.
- `docs/06 - Reference/` contains useful technical references.

## Source of truth

Use the actual repository code and documentation as the source of truth.

When a requirement is uncertain, mark it as an open question rather than inventing an answer.
