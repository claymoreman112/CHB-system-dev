# Technical Decisions

Keep important technical decisions here.

## Decision template

### ADR-001 — [Session Based Identity via session Storage]

**Date:**
September 2, 2026

**Status:** Accepted 

### Context
Each role must have their own corresponding dashboard that contains what they can see based on their permission

### Decision
If administrator logins, will automatically direct to admin dashboard. Same as manager and cashier, they will have their own dashboards that have their own level of actions

### Alternatives considered

### Why

### Consequences

### Related files / requirements


### ADR-002 — [Seperate HTML file per role dashboard]

**Date:**
September 2, 2026

**Status:** Accepted 

### Context
`admin.html` / `manager.html` / `cashier.html` instead of one `index.html` with conditional rendering.
### Decision
Implemented Phase 3b: admin.html/manager.html/cashier.html, each declaring `data-role` for authguard.js to enforce.

### Alternatives considered

### Why
Cleaner code management

### Consequences

### Related files / requirements



### ADR-003 — [Login blocks fully; no anonymous/guest access]

**Date:**
September 2, 2026

**Status:** Accepted 

### Context
Unfamilliar credentials will be not be able to access the system fully


### Decision

### Alternatives considered

### Why
Security

### Consequences

### Related files / requirements



### ADR-004 — [Logout clears session only, not in-memory data]

**Date:**
September 2, 2026

**Status:** Accepted 

### Context
Logging out should not clear in memory data such as order list and order history based upon the user

### Decision

### Alternatives considered

### Why

### Consequences

### Related files / requirements


### ADR-005 — [Retirement of `index.html` / `script.js`]

**Date:**
September 8, 2026

**Status:** Accepted

### Context
ADR-002 established `admin.html` / `manager.html` / `cashier.html` as separate per-role dashboards, replacing the single `index.html` prototype. Once product browsing/editing, cart, checkout, and order history were fully reimplemented across the three dashboards, `index.html` and `script.js` had no remaining execution path.

### Decision
`index.html` and `script.js` were deleted in Phase 4, after confirming no HTML file, script, or doc still referenced them. Re-checked during this Phase 5 pass across all 18 files available in this session — no references remain.

### Alternatives considered
Keep them as a fallback/reference. Rejected — dead code with no execution path invites confusion about which file is "the real app."

### Why
Keeps `login.html` the unambiguous single entry point.

### Consequences
- `login.html` is now the sole entry point.
- `package.json`'s `"main": "script.js"` became stale as a direct result — corrected in this same session.
- The `workerName` field `script.js` used for order attribution is no longer written by any active code — only pre-existing `localStorage` records may still carry it (BUG-001; Roadmap's outstanding legacy-data item).

### Related files / requirements
`index.html` (deleted), `script.js` (deleted), ADR-002, `Known Bugs.md` BUG-001, `package.json`