# Nursery Route-Support Hint Review

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-critic-349`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Lane: `lane-4`

## Verdict

No blocker.

The implementation keeps packet `135` lane 4 focused on route-support hint selection. The new resolver keys off `routeId` plus `activeBeatId`, preserves the existing `edge-pattern-line` active-beat behavior, and limits the salmonberry capstone fallback to the no-active-beat post-route window.

## Review Notes

- Coastal switching is covered: `forest-study` resolves to sand verbena, while `coastal-comparison` resolves to dune lupine.
- Treeline support is covered: mountain avens does not appear during the initial `treeline-shelter` beat and appears on `tundra-short-season` once claimed.
- No-substitution is covered: if the active beat wants dune lupine but only sand verbena is claimed, the route-support hint is hidden instead of borrowing the earlier support.
- The nursery page priority guard still passes, so mature teaching-bed memory remains ahead of route-support hints.
- The shared `src/engine/nursery.ts` diff still contains the earlier lane-2 salmonberry memory-line change from this packet; the lane-4 implementation itself did not add new authored plant copy or science content.

## Verification

- `npm test -- --run src/test/nursery.test.ts`
- `npm test -- --run src/test/field-station-nursery-page.test.ts`
- `npm run build`
- `npm run validate:agents` (passes with the known queue-size warning)
- `git diff --check`

## Follow-Up

No lane-4 follow-up is required for packet `135`. Promoted `ECO-20260420-scout-353` to begin packet `136` lane-4 support-choice differentiation prep.
