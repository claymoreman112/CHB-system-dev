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
