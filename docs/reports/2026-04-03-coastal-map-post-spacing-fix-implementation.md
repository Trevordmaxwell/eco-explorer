# 2026-04-03 Coastal Map-Post Spacing Fix Implementation

Completed `ECO-20260403-main-209` against packet `088`, the lane-3 brief, and the blocker in `docs/reports/2026-04-03-coastal-family-follow-on-review.md`.

## What Landed

The `coastal-scrub` map-return post now sits left of the new gather band instead of inside it.

This fix stayed entirely inside the authored world-map anchor and the focused travel proofs:

1. moved the `coastal-scrub` `mapReturnPost`
2. added a geometry guard for gather clearance
3. added a runtime proof that the gather clears travel UI while the post remains reachable

## Content Changes

In `src/content/world-map.ts`:

- moved the `coastal-scrub` `mapReturnPost` from `x: 228` to `x: 172`

That keeps the post in the same left-half interior approach, but clears it out of the `windbreak-gather-log` / `windbreak-gather-lift` band.

No `coastal-scrub` platforms, entities, corridor anchors, or travel runtime rules changed.

## Test Coverage

Updated `src/test/world-map.test.ts` to assert:

- the `coastal-scrub` map-return post sits clear of `windbreak-gather-log`

Updated `src/test/runtime-smoke.test.ts` to assert:

- the intended gather state no longer reports an in-range `nearbyTravelTarget`
- the shifted post is still reachable from the left-half `coastal-scrub` interior and still returns the player to the same anchor after a map round-trip

## Verification

Ran:

- `npm test -- --run src/test/world-map.test.ts src/test/runtime-smoke.test.ts -t "builds the coastal-scrub family from the normal entry into the bluff and back to the low route|uses an authored map-return post to open the map and return to the same interior anchor|keeps the coastal-scrub map-return post reachable before the new gather band|keeps the beach map-return post clear of the dune-crest reward family|keeps the coastal-scrub map-return post clear of the new gather family"`
- `npm run build`

Artifacts:

- required shared client smoke: `output/main-209-client/`
- seeded browser proof: `output/main-209-browser/coastal-gather-clear.png`
- browser state capture: `output/main-209-browser/state.json`
- browser error buffer: `output/main-209-browser/errors.json`

## Notes For Critic

- The live proof still shows the map post in the background, but the gather state now clears the in-range travel label and `nearbyTravelTarget`, which is the main readability threshold the blocker called out.
- The fix deliberately avoided changing `coastal-scrub` geometry so the new gather, bluff shoulder, and low-route recovery remain the same family the earlier implementation proved out.
