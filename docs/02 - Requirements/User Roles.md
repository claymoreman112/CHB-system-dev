# User Roles

## Current demo roles

| Role    | Purpose                        | Permissions                                                                                                                                                      |
| ------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin   | Full system access in the demo | Modify/add/remove user accounts, modify/add/remove products at any given time, monitor/modify all sales history, monitor all user acitivities, +TBD              |
| Manager | Management/operational access  | modify/add/remove products only when admin allows, monitor all sales history, monitor user acitivities, +TBD                                                     |
| Cashier | Sales/POS access               | process purchases, log personal history, provide sales report using the system, delete a order log ONLY if given permission by admin(for logging mistakes), +TBD |
|         |                                |                                                                                                                                                                  |

These roles are placeholders for the demo. Confirm real roles and permissions with the business.

## Role design questions

- Which actions can each role perform?
- Which pages should each role see?
- Which actions require approval?
- Which records should be read-only?
- Who can create/edit/deactivate users?
- Do permissions need to be finer-grained than roles?


## Current demo roles

| Role    | Purpose                        | Implemented in this demo                                                                                                   | Not yet implemented |
| ------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Admin   | Full system access in the demo | Add/edit/delete products at any time; view all order history; delete any order.                                            | Manage user accounts (create/edit/remove) — no UI exists; monitor user activity — no activity/audit log exists. |
| Manager | Management/operational access  | View all order history, read-only; add/edit/delete products **only if** the account's `canEditProducts` flag is `true` (see Business Rules RULE-001; no current account has it set). | An in-app, admin-toggleable version of that flag — today it's static, set only in `mock-users.js`. |
| Cashier | Sales/POS access               | Process purchases via cart + checkout; view own order history and personal sales summary, read-only.                       | Requesting/receiving permission to delete a mistaken order — Cashier has no delete capability under any condition (see Business Rules RULE-002). |
