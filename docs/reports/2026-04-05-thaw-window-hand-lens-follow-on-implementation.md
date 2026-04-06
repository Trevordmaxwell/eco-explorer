# Thaw-Window Hand-Lens Follow-On Implementation

Implemented `ECO-20260405-main-291` for lane 4.

## What Changed

- Added one tiny preference seam for `hand-lens` in [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts), [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts), and [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts).
- When the active route has a live process-only alternate entry for the current next slot, `hand-lens` now prefers that in-range alternate over ordinary notebook-fit entries.
- The preference stays tightly scoped:
  - current active route only
  - current next evidence slot only
  - current active process window only
  - no new HUD, planner, or notebook branch

## Why This Fix Was Needed

`main-289` made `woolly-lousewort` count for `Thaw Window`, but the live support difference was still too weak because keyboard `hand-lens` play was not actually pulling the player toward that alternate carrier. This pass makes the difference player-felt instead of only route-permissive.

## Verification

- Added focused controller coverage in [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts) proving `woolly-lousewort` is the preferred hand-lens entry during active `thaw-fringe`, while non-`hand-lens` supports do not inherit that preference.
- Updated [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) so the live thaw-skirt shelf now proves:
  - `hand-lens` inspects `woolly-lousewort`
  - the comparison non-`hand-lens` support does not auto-snap to it
- Re-ran the focused route-fit tests in [field-requests.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts) and the full build.
