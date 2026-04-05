# 2026-04-04 Beach Opening Lee-Space Implementation

Implemented `ECO-20260404-main-268` against packet `110`, the lane-3 brief, and the handoff in `docs/reports/2026-04-04-beach-opening-lee-space-handoff.md`.

## What Landed

`src/content/biomes/beach.ts` now gives the left opener one compact start-side lee shoulder before the existing dune crest:

1. `dune-shoulder-entry-lip`
2. `dune-shoulder-rest`

The new shoulder sits in the approved `dune-edge -> dry-sand` band and stays well left of the current `dune-crest-*` family. It uses the existing `rock-platform` language so the opener still reads as held sand and low dune relief instead of a second driftwood clue or a new branch.

The same pass adds one small authored carrier trio to that shoulder:

- `dune-shoulder-grass`
- `dune-shoulder-pea`
- `dune-shoulder-verbena`

That gives the first beach chapter a clearer sheltered start-side place without touching the route-backed middle `lee-pocket` driftwood clue or the far-right tidepool family.

## Guardrails Kept

- kept the inland corridor door and map-return behavior unchanged
- left the current `dune-crest-*`, `lee-pocket-*`, and `tidepool-approach-*` families intact
- added no new climbables, vertical cues, route logic, journal logic, or notebook surfaces
- avoided `driftwood-log` on the opener so the live `Shore Shelter` middle clue stays unique
- kept the new beat compact inside the current camera band and left-to-right beach sequence

## Test Coverage

Updated `src/test/beach-biome.test.ts` to lock the new shoulder into the authored beach platform family order and to assert the new start-side carriers are present before the current crest and later tidepool approach.

Updated `src/test/runtime-smoke.test.ts` with one focused opener proof that:

- reaches the new shoulder band before the crest
- confirms the corridor target is no longer the active nearby travel target there
- confirms the player can keep moving cleanly into the existing dry-sand / crest flow afterward

## Browser Proof

The required live proof is in `output/main-268-client/`, and the cleaner seeded browser artifact is in `output/main-268-browser/`:

- `beach-opening-shoulder.png`
- `state.json`
- `errors.json`

The proof keeps the opener readable: the player is clear of corridor travel range, the new shoulder carriers are visible near the left start, and the later crest still reads as the next rise instead of being replaced.

## Verification

- `npm test -- --run src/test/beach-biome.test.ts src/test/runtime-smoke.test.ts -t "adds an opening dune shoulder, dune crest, and sheltered tidepool approach without disturbing the lee pocket|anchors authored beach clues at the opening shoulder, dune crest, and tidepool approach|lets the player reach the new opening dune shoulder before the crest|lets the player climb the new dune crest without colliding with the inland beach door|lets the player follow the new beach lee pocket and reach its shelter carriers|lets the player follow the new tidepool approach and recover back into the shoreline flow"`
- `npm run build`
- required web-game client smoke in `output/main-268-client/`
- seeded browser proof in `output/main-268-browser/`
