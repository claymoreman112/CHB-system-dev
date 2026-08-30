# Architecture

## Current architecture

The application is currently a browser-based prototype using HTML, CSS/Tailwind, and JavaScript.

The architecture should remain simple while the requirements are still being discovered.

## Current priorities

- Separate UI concerns from business logic where practical.
- Avoid duplicate role/permission logic.
- Keep authentication clearly separated from presentation.
- Preserve working POS behavior during refactors.

## Future architecture questions

These should be answered when the project actually needs them:

- When should a backend be introduced?
- Which database should be used?
- How should authentication be implemented securely?
- How should authorization be enforced server-side?
- What data model should represent inventory and production?
- What audit logs are required?
- How should deployment be handled?

## Prototype vs production

Mock login in JavaScript is acceptable for a demo.

It is not production authentication.

Production authentication and authorization must be enforced in appropriate backend/server-side systems.
