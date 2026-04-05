# 2026-04-04 Coastal Bluff Pocket Support Implementation

Implemented `ECO-20260404-main-265` in lane 2.

## What Landed

- Added one new `song-sparrow` close-look card in `src/engine/close-look.ts`.
- Used the scout-approved compact payload shape:
  - callouts: `streaked chest`, `small beak`
  - sentence: `This sparrow stays close to scrub so it can sing and slip back into cover fast.`
  - sprite scale: `6`
- Extended focused close-look coverage in `src/test/close-look.test.ts` so `song-sparrow` stays on the allowlist and returns the expected compact payload.

## Scope Kept Tight

- Did not add a new ecosystem-note id, a new comparison seam, or another sketchbook line.
- Did not touch `src/content/biomes/coastal-scrub.ts`, route-board copy, station copy, map behavior, or larger journal layout.
- Left the already-supported `pacific-wax-myrtle`, `coyote-brush`, `dune-lupine`, and `deer-mouse` surfaces untouched.

## Verification

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "opens a close-look card from a supported inspect bubble and closes back to play"`
- `npm run build`
- Web-game client smoke in `output/lane-2-main-265-client/`
- Seeded browser proof in `output/lane-2-main-265-browser/`:
  - `song-sparrow-close-look.png`
  - `song-sparrow-close-look-state.json`
  - `console-errors.json` stayed empty

## Outcome

The new Coastal Scrub bluff-pocket support stays as small as intended: `song-sparrow` now gives the pocket family one visual zoom of its own without reopening denser note or comparison surfaces.
