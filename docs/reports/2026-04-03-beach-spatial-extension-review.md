# 2026-04-03 Beach Spatial Extension Review

Reviewed `ECO-20260402-critic-165` against packet `078`, the lane-3 brief, `docs/reports/2026-04-03-beach-spatial-extension-implementation.md`, the new beach proofs in `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts`, plus the seeded browser artifacts in `output/main-192-browser/` and a fresh shared-client pass in `output/critic-165-client/`.

## Findings

### 1. Blocking: the dune crest currently reads as a map-return pad instead of a view beat

`src/content/biomes/beach.ts:187-209` places the new `dune-crest-*` family directly inside the interaction radius of the beach `mapReturnPost` at `src/content/world-map.ts:98-113`. In the seeded proof at `output/main-192-browser/dune-crest.png` and `dune-crest.json`, the player reaches the intended crest state at `x: 268`, `y: 103`, but `nearbyTravelTarget` is already `map-return` with label `COAST MAP`.

That makes the new front-half reward read like a travel post, not a scenic sandy rise. The centered travel label steals the crest's strongest visual moment and weakens the intended sequence of:

1. dune rise
2. lee-pocket shelter
3. tidepool approach

This should be fixed before lane 3 treats the beach pass as clean.

## What Still Works

- The lee-pocket remains readable as the middle sheltered beat and did not collapse under the added front-half or far-right geometry.
- The new tidepool approach reads cozy and recoverable, with the wrack and tidepool carriers helping it feel like a destination instead of just the strip ending.

## Recommendation

Do one narrow follow-up inside the current beach and travel systems:

- separate the dune crest reward state from the beach `map-return` interaction radius
- keep the inland corridor door as the first obvious left-side travel anchor
- preserve the current lee-pocket and far-right tidepool approach geometry

Possible fixes include shifting the crest family slightly right, shifting the beach `mapReturnPost` left, or tightening the beach map-return reach in a way that does not harm the existing map-return proof.

## Outcome

This review is **not clean yet**. Do not promote `ECO-20260402-scout-155` until a small crest-spacing fix lands and reviews cleanly.
