# 2026-04-03 Beach Spatial Extension Implementation

Implemented `ECO-20260402-main-192` against packet `078`, the lane-3 brief, and the scout handoff in `docs/reports/2026-04-03-beach-spatial-extension-handoff.md`.

## What Landed

`src/content/biomes/beach.ts` now adds two small authored platform families that widen the beach's movement read without changing the traversal runtime:

1. `dune-crest-entry-step`
2. `dune-crest-mid-step`
3. `dune-crest-view`
4. `tidepool-approach-drift`
5. `tidepool-approach-sill`
6. `tidepool-overlook`

The dune family sits just to the right of the inland corridor side and gives the early beach one gentle sandy rise before the existing lee-pocket. The far-right family turns the tidepool seam into one driftwood-shaped approach and overlook instead of a quicker flattening run into the shoreline edge.

The pass also reuses the current beach ecology instead of widening content scope. `sand-verbena` now anchors the dune crest, while `bull-kelp-wrack`, `pacific-sand-crab`, and `sand-dollar-test` give the tidepool approach one calmer wrack-and-shallows read.

## Guardrails Kept

- stayed inside the current beach world size, world height, and camera band
- kept the inland corridor door and the existing lee-pocket family in place
- used only authored platforms and authored entities in the existing runtime
- added no new cue type, door logic, or traversal mechanic
- kept both new spaces recoverable at the current readability ceiling

## Test And Proof Coverage

Updated `src/test/beach-biome.test.ts` to lock the authored dune-crest and tidepool-approach families into the intended left-to-right and height order while confirming the lee-pocket remains intact between them.

Updated `src/test/runtime-smoke.test.ts` with two focused proofs that:

- reach the dune crest from the normal beach start, confirm the player stays clear of the inland corridor door, and recover back into the dry-sand or lee-pocket flow
- reach the new tidepool approach from a far-right start, confirm the authored wrack-and-tidepool clues stay in range, and recover cleanly back toward the tide line

## Watch Item For Review

The seeded dune-crest proof keeps the inland corridor door itself out of range, but the broader beach `map-return` travel target still falls within range from that crest state. That does not currently block movement or force a travel prompt, but it is the one interaction-radius detail worth rechecking in the follow-up review.

## Verification

- `npm test -- --run src/test/beach-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a dune crest and sheltered tidepool approach without disturbing the lee pocket|anchors authored beach clues at the dune crest and tidepool approach|lets the player climb the new dune crest without colliding with the inland beach door|lets the player follow the new tidepool approach and recover back into the shoreline flow"`
- `npm run build`
- required web-game client smoke pass in `output/main-192-client-smoke/`
- seeded browser proof in `output/main-192-browser/`

The seeded browser proof captured the intended three-part beach read with no console errors:

- `dune-crest.png`
- `lee-pocket.png`
- `tidepool-approach.png`
- `tidepool-return.png`
