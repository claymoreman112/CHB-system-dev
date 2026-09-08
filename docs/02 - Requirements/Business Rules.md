# Business Rules

Record rules that describe how the business operates.

## Confirmed rules

### RULE-001 — [Product edit rights are granted per account]

**Rule:**
Whether a Manager account can add, edit, or delete products is controlled by a single `canEditProducts` flag on that account. The flag is static per account (set in `mock-users.js` for the demo) and covers add/edit/delete together — an account can't be given edit rights without delete rights.

**Applies to:**
Manager role. Admin always has full product rights; Cashier never has product edit rights.

**Source:**
Confirmed from existing implementation (`manager.js`: `canEdit = !!session.canEditProducts`).

**Notes / exceptions:**

### RULE-002 — [Only admin can delete order history entries]

**Rule:**
Deleting a completed order is only available on the Admin dashboard. Manager and Cashier dashboards render order history read-only.

**Applies to:**
All roles — Admin can delete, Manager and Cashier cannot, unconditionally.

**Source:**
Confirmed from implementation (`renderOrderHistory(..., { showDelete: true })` in `admin.js` vs. `{ showDelete: false }` in `manager.js`/`cashier.js`)..

**Notes / exceptions:**

