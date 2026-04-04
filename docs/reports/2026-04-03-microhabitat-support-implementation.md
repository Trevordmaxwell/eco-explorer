# 2026-04-03 Microhabitat Support Implementation

Implemented `ECO-20260403-main-237` in lane 2.

## What Shipped

- Added `reindeer-lichen` to the note-backed journal comparison allowlist in `src/engine/journal-comparison.ts`.
- Added focused comparison coverage in `src/test/journal-comparison.test.ts`.
- Added a targeted runtime journal smoke for the treeline-to-tundra `reindeer-lichen` comparison in `src/test/runtime-smoke.test.ts`.

## Scope Kept Tight

- Kept the pass inside the existing same-pane comparison seam.
- Did not add a new ecosystem note id, a new sketchbook line, or a new close-look card.
- Left coastal-scrub shelter copy untouched because the scout pass found the cleaner gap in the shared high-country bridge.

## Verification

- `npm test -- --run src/test/journal-comparison.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "reindeer-lichen comparison"`
- `npm run build`
- Required web-game client smoke in `output/lane-2-main-237-client/`
- Seeded browser proof in `output/lane-2-main-237-browser/`:
  - `reindeer-lichen-comparison.png`
  - `reindeer-lichen-comparison-state.json`
  - `console-errors.json` stayed empty

## Outcome

The shared `reindeer-lichen` entry now teaches a clearer treeline-to-tundra exposure contrast through the journal’s existing comparison cards, giving the recent high-country signature pockets a stronger ecological bridge without widening lane-2 scope.
