# 2026-04-04 Field Season Wrap Split Implementation

Implemented `ECO-20260404-main-255` against packet `104`.

## What Changed

Kept route-state and progression logic in `src/engine/field-season-board.ts`, but moved the pure station-strip composition family into its own helper seam.

- Added `src/engine/field-season-wrap.ts` with:
  - `resolveFieldSeasonWrapState(...)`
  - `resolveFieldStationSubtitle(...)`
  - the support-aware `TODAY`, note-tabs replay/chapter-close, and stop-point helper family that feeds those two exports
- Removed that wrap/subtitle cluster from `src/engine/field-season-board.ts`
- Updated `src/engine/field-station-state.ts` to import the wrap resolver directly from the new module
- Updated `src/test/field-season-board.test.ts` to point its direct wrap/subtitle assertions at the new seam

## Why This Shape

This shrinks the board file without pretending to reorganize route progression.

- route-state builders, replay-note generation, notebook-ready mutation, atlas, archive, expedition, and next-season locator logic all stay in `field-season-board.ts`
- the moved code is still pure composition driven by existing inputs
- the new seam is explicit enough that future lane-1 work can touch station-strip copy without reopening the larger route-state file first

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "field station|seasonWrap|note-tabs|place tab|Route Marker"`
- `npm run build`
- shared web-game client smoke in `output/lane-1-main-255-client/`
- Playwright page load plus console recheck at `http://127.0.0.1:4177` with 0 errors
