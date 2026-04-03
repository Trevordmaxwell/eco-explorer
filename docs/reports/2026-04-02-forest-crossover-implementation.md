# 2026-04-02 Forest Crossover Implementation

Implemented `ECO-20260402-main-174` against packet `066`, the lane-3 brief, and the forest crossover handoff.

## What Changed

- Added one compact `old-wood-hinge-rest` platform in `src/content/biomes/forest.ts` at the bridge-to-old-growth overlap so the middle read becomes `high run -> old-wood crossing -> hinge bay -> giant-tree pocket` instead of one quick pass-through.
- Reused one existing forest carrier by adding `old-wood-hinge-lungwort` beside the new shelf, keeping the crossover more place-shaped without opening a new cue layer or widening the roster.
- Extended the focused forest proofs in `src/test/forest-biome.test.ts` and `src/test/runtime-smoke.test.ts` so the authored crossover family now includes the hinge bay and the runtime carry explicitly passes through the old-growth overlap before the trunk handoff.

## Result

The forest top and bottom families now share a stronger middle place. The bridge no longer reads like a brief connector on the way to a different destination; it now lands into a small old-wood hinge before the giant-tree pocket takes over.

## Verification

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one optional old-wood hinge bay between creek-bend and the old-growth pocket|turns the cave-return high run into one carry from log-run through the bridge, hinge bay, and giant tree"`
- `npm run build`
- Shared web-game client pass in `output/main-174-client/`
- Fresh forest browser proof in `output/main-174-browser/hinge-bay.png` with matching `state.json` and empty `errors.json`
