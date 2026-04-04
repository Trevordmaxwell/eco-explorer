# 2026-04-03 Forest Vertical Destination Implementation

Implemented `ECO-20260403-main-214` in lane 3 against the scout handoff in `docs/reports/2026-04-03-forest-vertical-destination-handoff.md` and packet `090` version `2`.

## What Changed

- Added one compact upper `old-growth-branch-nursery` shelf inside the existing `old-growth-pocket` canopy band in `src/content/biomes/forest.ts`.
- Tuned that shelf to read as a real destination instead of a skinny connector by widening and tucking it inward:
  - `x: 712`
  - `y: 34`
  - `w: 30`
- Kept the pass inside the existing old-growth family:
  - no new vertical cue
  - no bridge, hinge, trunk-foot, or bark-shelf rewrite
  - no new species pack
- Reused the existing `Forests Above` support language:
  - the new shelf now sits close to the authored `western-hemlock-seedling`
  - the existing `canopy-moss-bed` and `old-mans-beard` anchors still read as part of the same small branch nursery

## Test Updates

Updated `src/test/forest-biome.test.ts` to lock the new authored shelf and support set:

- the old-growth platform order now includes `old-growth-branch-nursery` in the upper family after `old-growth-inner-loop-step`
- the new shelf is asserted inside the handoff target band
- the authored bark-life list now includes the new high `western-hemlock-seedling`

Updated `src/test/runtime-smoke.test.ts` with one focused proof:

- start from the old-growth upper route
- enter the new nursery shelf at `x 726-737`, `y 24-26`
- confirm the intended canopy support set is nearby
- walk back out and re-catch `old-growth-inner-bark-snag`

## Verification

Passed:

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "old-growth|branch-nursery|canopy crook|giant-tree climb|crown-rest"`
- `npm run build`

Additional check:

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts`

That broader forest/runtime slice still hit two pre-existing non-lane-3 failures in the field-station route-board area:

- `src/test/runtime-smoke.test.ts:3148`
- `src/test/runtime-smoke.test.ts:3378`

Those failures are outside the forest vertical destination scope and were left unchanged.

## Browser Proof

Generated fresh live artifacts in `output/main-214-browser/`:

- `nursery-pocket.png`
- `nursery-pocket-state.json`
- `return-snag.png`
- `return-snag-state.json`
- `errors.json`

The live proof used a temporary local forest start-position override only for capture so the browser could open directly into the upper old-growth route. That override was reverted before the final `npm run build`, so the shipped runtime still starts forest at its normal trailhead position.
