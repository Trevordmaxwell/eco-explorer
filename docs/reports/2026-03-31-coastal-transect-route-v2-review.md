# 2026-03-31 Coastal Transect Route V2 Review

Review for `ECO-20260331-critic-101`.

## Result

No blocking issue found.

The new coastal transect pass does what lane 4 needed:

- `scrub-edge-pattern` now feels like a purposeful coast-to-forest outing instead of another unordered three-clue checklist
- the runtime still reuses the existing `routeV2Progress.evidenceSlots` seam
- the station shell stays compact and notebook-first
- the edge-pattern family now has a better rhythm, with the broader transect first and the tighter `forest-cool-edge` follow-on second

## What Checked Cleanly

- stage gating only allows the first missing transect leg to advance
- hand-lens hints stay focused on the next valid stage clue
- older in-progress scrub saves still read coherently through first-missing-stage guidance instead of needing a new migration pass
- route-board copy now teaches the same staged transect shape the runtime enforces
- the active route replay seam still reads cleanly after the copy change

## Verification Reviewed

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows one route replay note when re-entering the active route biome during a live replay window"`
- `npm run build`

## Follow-On

Promote `ECO-20260331-scout-91`.

The next best lane-4 gain is still the tiny support-slot and notebook-return follow-on from packet `043`.
