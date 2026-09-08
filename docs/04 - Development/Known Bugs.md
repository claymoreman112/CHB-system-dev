	# Known Bugs

## Bug template

### BUG-001 — [workerName/processedBy inconsistency]

**Status:** Resolved

**Severity:** Low 

**Steps to reproduce:**
Load order history containing a legacy record saved by the retired `script.js` prototype, which wrote the operator to `workerName` instead of `processedBy`.

**Expected:**
Order history row shows the operator who processed the order.

**Actual:**
Row rendered the literal string "undefined", because `renderOrderHistory()` only ever read `order.processedBy`.

**Likely cause:**
Schema drift between the retired `script.js` prototype (`workerName`) and the current role-based dashboards (`processedBy`); `dashboard-common.js` was never updated to read the old field.

**Fix:**
`renderOrderHistory()` now builds an `operatorDisplay` value via `order.processedBy || order.workerName || "Unknown"` before rendering.

**Verified on:**
Phase 5 regression pass (code review), September 8, 2026. Recommend a quick manual click-through to confirm visually.
