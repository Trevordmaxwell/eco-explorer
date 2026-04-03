# 2026-04-03 Coastal Family Follow-On Review

Reviewed `ECO-20260403-critic-176` against packet `085`, the lane-3 brief, `docs/reports/2026-04-03-coastal-family-follow-on-implementation.md`, the new coastal proofs in `src/test/coastal-scrub-biome.test.ts` and `src/test/runtime-smoke.test.ts`, plus the shared client artifacts in `output/main-203-client-smoke/` and the seeded browser proof in `output/main-203-browser/`.

## Findings

### 1. Blocking: the new left-hand gather currently reads as a map-return hotspot instead of sheltered scrub

`src/content/biomes/coastal-scrub.ts:156-224` places the new `windbreak-gather-log` / `windbreak-gather-lift` handoff directly under the existing `coastal-scrub` `mapReturnPost` at `src/content/world-map.ts:117-132`. In the seeded proof at `output/main-203-browser/coastal-gather.png` and `output/main-203-browser/state.json`, the intended gather state is reached at `x: 206`, `y: 104`, but `nearbyTravelTarget` is already `{ kind: "map-return", label: "COAST MAP" }`.

That means the strongest new family beat is reading as travel UI first and habitat gather second. The post and label take over the exact band that was meant to turn the scrub into:

1. thicket gather
2. windbreak shelter
3. optional bluff rise

Instead, the live proof currently reads more like:

1. thicket gather
2. `COAST MAP`
3. optional bluff rise

This should be fixed before lane 3 moves on to the next rest-or-recovery follow-on.

## What Still Works

- The new left-side platforms do make the `coastal-scrub` rise feel more continuous than before; the family no longer starts abruptly at `windbreak-bluff-lee-step`.
- The bluff shoulder and low-route recovery still look calm and recoverable in the focused runtime proofs.
- The authored `nootka-rose` and `dune-lupine` carriers help the added beat read as sheltered coast habitat rather than a naked platform stack.

## Recommendation

Do one narrow follow-up inside the current world-map and travel-anchor systems:

- move the `coastal-scrub` `mapReturnPost` out of the new gather band
- keep the map-return post reachable from the same left-half interior approach
- preserve the current gather, bluff, and swale geometry

The fix should not reopen corridor runtime, beach geometry, or new waypoint content. It only needs to separate the travel anchor from the new family beat and add a proof that the gather state now clears `nearbyTravelTarget`.

## Outcome

This review is **not clean yet**. Do not promote `ECO-20260403-scout-166` until a small coastal map-post spacing fix lands and reviews cleanly.
