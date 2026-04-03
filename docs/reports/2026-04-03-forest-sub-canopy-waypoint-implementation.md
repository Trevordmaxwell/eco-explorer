# 2026-04-03 Forest Sub-Canopy Waypoint Implementation

Completed `ECO-20260402-main-194` against packet `080`, the lane-3 brief, and the narrowed handoff in `docs/reports/2026-04-03-forest-sub-canopy-waypoint-handoff.md`.

## What Landed

The forest vertical family now has two tiny habitat-first waypoint additions without changing its route skeleton:

1. a cave-mouth shelf in `filtered-return`
2. a tucked canopy crook around `old-growth-inner-rest-light`

Both additions stay inside the live forest footprint, reuse the current roster, and avoid new climbables or new branch height.

## Content Changes

### Cave-mouth waypoint

In `src/content/biomes/forest.ts`:

- added `filtered-return-mouth-sill` as a small rock shelf inside the brighter mouth band
- added `filtered-return-mouth-moss` so the shelf reads as a damp transition instead of just path geometry

This gives the `stone-basin-return-light` side a short pause point where the darker basin, the brighter mouth, and the damp wall life can all read together.

### Canopy waypoint

In `src/content/biomes/forest.ts`:

- added `canopy-inner-rest-crook` as a tiny upper-canopy rest surface near the existing inner-rest cue
- added `canopy-inner-rest-beard` so the nook reads more like tucked branch habitat than climb infrastructure

This keeps the upper old-growth band recoverable while making the cue area feel like a remembered stop instead of only a traversal seam.

## Test Coverage

Updated `src/test/forest-biome.test.ts` to assert:

- the new cave shelf stays inside the cue-anchored cave-mouth band
- the new canopy crook stays inside the upper old-growth cue band
- the new authored carriers use the existing forest roster and shadow behavior

Updated `src/test/runtime-smoke.test.ts` to prove:

- the player can settle on the cave-mouth shelf and still flow cleanly into the exit carry
- the player can reach the canopy crook from the existing crown-return path and still rejoin the inner return seam

## Verification

Ran:

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one cave-mouth sill and one tucked canopy crook around the live waypoint cues|adds a tiny cave-mouth observation sill and keeps the exit carry clean|adds a tucked canopy crook around the inner-rest cue and keeps the return seam readable|adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor|turns the old-growth top route into a crown-rest destination loop and keeps the inner return seam catchable"`
- `npm run build`

Artifacts:

- browser cave proof: `output/main-194-browser/cave-mouth-waypoint.png`
- cave browser state: `output/main-194-browser/cave-mouth-waypoint-state.json`
- deterministic canopy state capture from the same routed movement proof used in `runtime-smoke`: `output/main-194-browser/canopy-crook-waypoint-state.json`
- browser error buffer: `output/main-194-browser/errors.json`

## Notes For Critic

- The cave shelf lands as a later settle point in the filtered-return flow rather than a disconnected platform; that keeps the route calm and readable at handheld scale.
- The canopy crook is intentionally tiny and relies on the existing `old-growth-inner-rest-light` plus nearby lichen/moss/beard cluster instead of adding another snag or climb helper.
- No lower trunk-foot, deepest basin, world width, or zone-boundary geometry changed.
