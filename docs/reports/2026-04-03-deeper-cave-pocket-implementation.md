# 2026-04-03 Deeper Cave Pocket Implementation

Implemented `ECO-20260403-main-215` against packet `090` version `3`, the new deeper-cave handoff, the lane-3 brief, and the current forest cave geometry.

## What Changed

I kept the pass inside one compact lower-cave geometry move in `src/content/biomes/forest.ts`:

- added `root-hollow-under-basin-rest` as one small rock shelf inside the existing under-basin band at `x 358 / y 218 / w 20`
- shifted the existing `root-hollow-pocket-lungwort` up onto that rest at `x 366 / y 210`

This keeps the cave family structure intact:

- `stone-basin` remains the readable deeper chamber
- `root-hollow-under-basin-pocket` still does the hidden-lower-pocket job
- `root-hollow-cave-trunk` remains the only tall recovery spine
- `filtered-return` remains the brighter exit side

The new gain is simply that the lower pocket now has a standable tucked rest instead of reading only as a clever floor drop.

## Tests Updated

In `src/test/forest-biome.test.ts` I:

- added the new `root-hollow-under-basin-rest` authored platform expectation
- tightened the cave geometry assertions so the new rest is checked inside the under-basin band
- updated the authored niche-species expectation so the shifted lower `tree-lungwort` matches the new rest

In `src/test/runtime-smoke.test.ts` I:

- strengthened the live cave route proof so it now settles onto the new under-basin rest before recovering through the brighter return side

## Verification

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "root-hollow|under-basin|stone-basin|cave-mouth|branch-nursery|giant-tree climb|crown-rest"`
- `npm run build`
- required shared browser smoke via `output/main-215-client/`
- targeted Playwright proof via `output/main-215-browser/under-basin-rest-check.mjs`

Fresh browser artifacts:

- `output/main-215-browser/under-basin-rest.png`
- `output/main-215-browser/under-basin-rest-state.json`
- `output/main-215-browser/recovery-trunk.png`
- `output/main-215-browser/recovery-trunk-state.json`
- `output/main-215-browser/errors.json`

The targeted browser proof now shows the player settling on the new lower rest at `x 361 / y 204` in `stone-basin`, then recovering into `filtered-return` with `nearbyClimbable.id === "root-hollow-cave-trunk"` and zero console errors.
