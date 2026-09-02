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



### ADR-0034 — [Logout clears session only, not in-memory data]

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