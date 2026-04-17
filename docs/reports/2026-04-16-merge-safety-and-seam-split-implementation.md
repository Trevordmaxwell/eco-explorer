# Merge-Safety And Seam-Split Implementation

## Queue Ref

- `ECO-20260416-main-299`

## What Landed

The Sprint 1 lane-1 pass stayed deliberately small:

- [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts) now exposes `resolveInspectTargetProjection(...)`, which keeps the support-biased inspect-target selection, the derived hint state, and the debug-facing `nearestInspectableEntityId` projection together in one seam
- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) now consumes that projection instead of keeping a separate `getFieldRequestHint(...)` wrapper around controller state
- [README.md](/Users/trevormaxwell/Desktop/game/README.md) now names the minimum fresh-machine verification floor after `npm install`: build, test, and agent validation

## Why This Helps

- The controller now owns the full inspect-hint projection seam instead of leaving the last route-feel wrapper logic in `game.ts`.
- Render and debug text both read from the same result object, so future support-readable work is less likely to drift.
- The clean-machine note is practical and review-friendly without pretending this repo has broader CI or release automation than it does.

## Test Coverage

Focused coverage now includes one direct controller test for the new combined projection seam in [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts), while the existing runtime-smoke slices still protect the `Held Sand` and `Thaw Window` support-biased behavior.
