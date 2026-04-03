# 2026-04-03 Beach Spatial Extension Handoff

Prepared `ECO-20260402-scout-154` against packet `078`, the lane-3 brief, the beach biome in `src/content/biomes/beach.ts`, the current beach movement proof in `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts`, plus the just-landed coastal-scrub bluff review.

## Current Read

Beach now has a stronger content band through `dune-edge -> dry-sand -> lee-pocket`, but the movement shape is still concentrated in one place.

Right now the biome has:

1. one short generated `dune-step` family near the inland side
2. one authored `lee-pocket` drift span
3. generated `tidepool-ledge` pieces on the far right

That makes the beach feel like:

- flat approach
- one sheltered dip
- then a quick return to flatter shoreline

The next gain should not be another cave-like shelter. The beach wants two tiny spatial contrasts:

- one broad dune-top look across the front half
- one calmer, driftwood-shaped approach into the tidepool side

## Best Next Pass For `main-192`

Keep the world width, corridor door, and current lee-pocket intact.

Use `main-192` on two authored micro-families:

1. one gentle dune-crest viewpoint placed to the right of the inland corridor door
2. one sheltered tidepool approach that gives the far-right beach a more intentional destination

## Recommended Geometry

### 1. Dune crest viewpoint

Place this around the late `dune-edge -> early dry-sand` band, roughly `x 176-272`.

Suggested platform family:

1. `dune-crest-entry-step`
   - around `x 184-202`
   - around `y 102-104`
2. `dune-crest-mid-step`
   - around `x 214-236`
   - around `y 96-98`
3. `dune-crest-view`
   - around `x 246-274`
   - around `y 92-95`

Read to preserve:

- this should feel like a low sandy rise, not a bluff or cliff
- the player should still be able to drop or step back down cleanly into `dry-sand`
- keep it far enough right that the inland corridor door remains the first obvious left-side travel anchor

### 2. Tidepool approach

Place this around the `tide-line -> tidepool` seam, roughly `x 456-548`.

Suggested family:

1. `tidepool-approach-drift`
   - around `x 464-488`
   - around `y 110-112`
2. `tidepool-approach-sill`
   - around `x 500-528`
   - around `y 103-106`
3. optional `tidepool-overlook`
   - around `x 536-560`
   - around `y 98-101`

Read to preserve:

- this should feel driftwood-shaped and tucked, not like a rocky staircase
- the player should be able to recover back to the tide line with no trap geometry
- let the existing random `tidepool-ledge` rules stay supporting texture, not the proof itself

## Ecology Read To Preserve

Use only current beach entries and let place do the teaching:

- the dune crest should feel more open and wind-touched
- the tidepool approach should feel a little calmer because driftwood and wrack collect there
- keep the new authored life focused on entries that already belong on this beach:
  - `beach-grass`
  - `sand-verbena`
  - `dune-lupine`
  - `driftwood-log`
  - `bull-kelp-wrack`
  - `pacific-sand-crab`
  - `sand-dollar-test`

Best authored-entity additions for `main-192`:

- one dune-top flower or grass clump near the view platform
- one driftwood or wrack-side carrier near the tidepool approach
- optional one tidepool clue such as `sand-dollar-test` near the overlook side

## Guardrails

- do not move or reframe the inland beach corridor door
- do not widen the biome or change `worldHeight`
- do not add climbables, cue markers, or a new traversal mechanic
- do not turn the tidepool side into a cave-like shelter
- keep both new areas screen-local and recoverable at the current `256x160` readability ceiling

## Test Guidance

`main-192` should stay focused:

- extend `src/test/beach-biome.test.ts` so the authored beach platform family now includes:
  - the dune-crest rise in gentle height order
  - the tidepool approach in low sheltered order
- add one focused runtime proof that reaches the dune crest from the starting side without colliding with the corridor-door logic
- add one focused runtime proof that follows the new tidepool approach and returns safely to the tide-line flow

Best proof questions:

- does the beach now have one readable high look and one readable sheltered far-right approach?
- do both additions stay playful and forgiving instead of turning the beach into obstacle work?

## Browser Guidance

Success should look like:

- the beach reads as three movement moments instead of one:
  - dune rise
  - lee-pocket shelter
  - tidepool approach
- the inland travel anchor still reads first on the left
- the tidepool side looks like a place to wander into, not just the end of the strip

## Queue Guidance

- Close `ECO-20260402-scout-154` as done.
- Promote `ECO-20260402-main-192` to `READY`.
- Keep `ECO-20260402-critic-165` blocked until the implementation lands.
