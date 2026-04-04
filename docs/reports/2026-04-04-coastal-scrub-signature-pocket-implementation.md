# 2026-04-04 Coastal Scrub Signature Pocket Implementation

Completed `ECO-20260404-main-258` in lane 3 against packet `106`, the upper-bluff lookout handoff, the lane-3 brief, and the main-agent role guide.

## What Shipped

`Coastal Scrub` now has one compact upper-bluff lookout nook that turns the existing bluff rise into a remembered destination instead of only a pass-through high route.

Implementation stayed inside the approved lane-3 scope:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

### Geometry

The bluff family now adds one authored rest just after the existing crest:

- `windbreak-bluff-lookout-rest`

It sits above the upper swale log but below the current crest, so the biome now reads:

1. gather into scrub
2. brief bluff rise
3. one tiny upper lookout
4. held swale pocket below
5. quieter shore-pine release

The pass does not reopen the left map-return band, the middle swale pocket, the shore-pine rest band, or the forest corridor edge.

### Local Carriers

The new nook uses only the approved bluff-side carriers:

- `pacific-wax-myrtle`
- `song-sparrow`

That gives the lookout one woody anchor and one tiny lived-in perch without turning it into another larger branch or adding new species, climbables, or route-layer surfaces.

## Why This Landed Better

The first `Coastal Scrub` pocket pass made the swale memorable, but the bluff still read mostly like the way over it. This follow-on keeps the swale as the sheltered low route while letting the crest resolve into one small lee-held place above it.

That makes the family feel like:

- rise into wind
- settle briefly in the bluff nook
- drop into the swale hold
- release into the pines

instead of simply stepping from high route to low route.

## Verification

Ran the focused lane-3 slice:

- `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a lowered windbreak swale with an optional bluff lookout above the low route|turns the coastal-scrub bluff into one optional lookout and keeps the low route recoverable|builds the coastal-scrub family from the normal entry into the bluff lookout and back to the low route|adds one quiet shore-pine rest after the swale family and keeps the forestward release open|adds a tucked middle swale pocket and still releases cleanly into the pine rest"`
- `npm run build`

Ran the required shared game-client smoke:

- `output/main-258-client/`

Captured targeted seeded browser proof from a direct `coastal-scrub` start:

- `output/main-258-browser/coastal-scrub-lookout.png`
- `output/main-258-browser/state.json`
- `output/main-258-browser/errors.json`

The final proof frame shows the player settled on the new upper nook with the myrtle and sparrow visible, the lower swale pocket still legible below, and no browser console errors.
