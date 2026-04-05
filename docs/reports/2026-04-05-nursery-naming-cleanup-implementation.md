# 2026-04-05 Nursery Naming Cleanup Implementation

Implemented `ECO-20260405-main-274` in lane 2.

## What Landed

- Updated the two clearly stale nursery unlock summaries in [nursery.ts](/Users/trevormaxwell/Desktop/game/src/engine/nursery.ts):
  - `sand-verbena-bed` now points at `Open To Shelter` instead of the retired `Coastal Shelter` label
  - `mountain-avens-bed` now points at `Stone Shelter` instead of the retired `Treeline Shelter` label
- Added focused ready-bed assertions in [field-station-nursery-page.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-station-nursery-page.test.ts) so the live helper keeps surfacing those updated unlock summaries for the exact under-supplied nursery states.

## Scope Kept Tight

- Left the `Short Season` / `Thaw Window` dual-title contract untouched.
- Did not retune any `rewardTitle` or `rewardSummary` strings.
- Did not reopen the nursery renderer, station shell, or route-board copy.

## Verification

- `npm test -- --run src/test/nursery.test.ts src/test/field-station-nursery-page.test.ts`
- `npm run build`

## Outcome

The nursery's remaining obvious retired labels are now aligned with the current live route-facing names, while the one deliberate dual-title exception remains isolated for a later naming decision if the team still wants it.
