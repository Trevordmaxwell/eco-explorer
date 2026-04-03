# 2026-04-03 Coastal Shore-Pine Rest Implementation

Implemented `ECO-20260403-main-204` against packet `085`, the lane-3 brief, and the scout handoff in `docs/reports/2026-04-03-coastal-shore-pine-rest-handoff.md`.

## What Landed

`src/content/biomes/coastal-scrub.ts` now adds one tiny right-half rest seam after the `windbreak-swale` release:

1. `shore-pine-rest-log`
2. `shore-pine-rest-mat`
3. `shore-pine-rest-sparrow`

The existing left-side gather, bluff, and swale family stays untouched. The new piece sits inside `shore-pine-stand`, so the route now reads more like:

1. gather into scrub
2. swale shelter
3. optional bluff
4. quieter pine pocket
5. release toward forest shade

## Guardrails Kept

- stayed entirely inside `coastal-scrub`
- reused the current platform and authored-entity systems only
- added no climbable, vertical cue, corridor change, or map-anchor change
- kept the new seam low and recoverable instead of turning it into another traversal proof
- stayed well clear of both the repaired left map-post band and the far-right forest corridor door

## Test And Proof Coverage

Updated `src/test/coastal-scrub-biome.test.ts` to lock the new rest seam into the intended `shore-pine-stand` band and keep the authored support restricted to the existing pine-underlayer roster.

Updated `src/test/runtime-smoke.test.ts` with one focused pass that:

- enters `coastal-scrub` from the normal start
- carries through the current swale family
- settles into the new pine rest seam with nearby `kinnikinnick` / `song-sparrow` / `shore-pine`
- continues onward without colliding with the forest corridor door

## Verification

- `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one low shore-pine rest seam after the swale release|adds one quiet shore-pine rest after the swale family and keeps the forestward release open|builds the coastal-scrub family from the normal entry into the bluff and back to the low route|turns the coastal-scrub swale into one optional bluff shoulder and keeps the low route recoverable"`
- `npm run build`
- required shared web-game client smoke in `output/main-204-client/`
- seeded browser proof in `output/main-204-browser/`

The targeted browser proof shows the player settled in `Shore Pine Stand` at `x: 430`, `y: 97` with the new pine-pocket rest visible and no recorded console errors.

Repo-wide `npm test -- --run` still reports one unrelated existing failure in `src/test/journal-list.test.ts` (`PLANT 3/4` vs `PLANT 3/6`). This implementation does not touch the journal-list codepath, so lane 3 should treat that as a separate pre-existing test issue rather than a blocker on this coastal runtime pass.
