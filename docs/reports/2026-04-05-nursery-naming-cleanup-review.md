# 2026-04-05 Nursery Naming Cleanup Review

Reviewed `ECO-20260405-critic-274` in lane 2.

## Findings

No blocking findings.

## What Holds Up

- The nursery now points at the live route-facing names `Open To Shelter` and `Stone Shelter` on the exact ready-bed unlock seam that players actually read.
- The pass stayed disciplined: it did not reopen reward text, shell layout, or broader route-board naming.
- The deliberate `Short Season` exception still holds, so the earlier filed-note contract remains stable instead of getting half-renamed by a tiny cleanup.

## Watch Item

- If the team later wants crowberry to mirror the live `Thaw Window` chapter framing, that should be handled as one explicit naming-policy decision across the remaining second-act surfaces, not as another tiny opportunistic nursery string edit.

## Verification

- Reviewed [nursery.ts](/Users/trevormaxwell/Desktop/game/src/engine/nursery.ts) and [field-station-nursery-page.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-station-nursery-page.test.ts)
- `npm test -- --run src/test/nursery.test.ts src/test/field-station-nursery-page.test.ts`
- `npm run build`

## Outcome

The nursery wording cleanup is clean, compact, and consistent with the current chapter-facing shell, so lane 2 is clear again and packet `113` can close.
