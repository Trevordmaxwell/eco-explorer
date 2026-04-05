# 2026-04-04 Treeline Signature Destination Implementation

Implemented `ECO-20260404-main-267` in lane 3.

## What Changed

- Added one compact `krummholz-belt` family in `src/content/biomes/treeline.ts`:
  - `last-tree-approach-stone`
  - `last-tree-shelter-rest`
- Shifted the local `krummholz-bunchberry` anchor into that new shelter band and added one deterministic `last-tree-spruce` landmark there.
- Left the existing `lee-pocket-entry-stone -> rime-rest -> fell-return -> lee-rest` family untouched, so the older higher perch still reads as the second half of the route.

## Why This Shape

Treeline already had a good right-half alpine pocket, but its strongest place-memory still lived too far into the rock-and-fell side of the biome. The new stop moves that feeling earlier, into the actual tree-breakdown band, so the route now reads:

1. thin canopy behind you
2. one bent last-tree shelter
3. existing lee-pocket continuation ahead

That makes the biome feel more like the last sheltered threshold before open fell, not just a calmer tundra prelude.

## Files Changed

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact last-tree shelter before the lee-pocket family|keeps the treeline lee pocket as the higher half of the same route family|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket|turns the treeline lee pocket into a compact crest-and-notch loop"`
- `npm run build`
- shared web-game client smoke in `output/main-267-client/`
- seeded browser proof in `output/main-267-browser/`

## Browser Proof

The seeded browser proof lands the player in `krummholz-belt` at `x = 224`, `y = 101`, with the new authored `bunchberry` and `krummholz-spruce` both in range and the older lee-pocket continuation still ahead. Console errors stayed empty in `output/main-267-browser/errors.json`.
