# Treeline Crest Implementation

## Summary

`main-158` keeps the live lee-pocket family intact and spends the whole geometry budget on one tiny forward crest brow plus one small alpine reward.

## Changes

- Added `lee-pocket-crest-brow` to `src/content/biomes/treeline.ts` as a short granite platform just beyond the prior top band.
- Added `lee-pocket-crest-avens` as one authored `mountain-avens` carrier on that new brow so the crest reads like a destination, not just a collision change.
- Updated `src/test/treeline-biome.test.ts` to lock the new platform order and the crest reward carrier.
- Updated `src/test/runtime-smoke.test.ts` so the treeline proof now checks the same folded notch route plus the new crest destination.

## Result

The treeline top now reads as:

- upper shelf
- crest step
- rime rest
- rime cap
- tiny crest brow
- fell return

That keeps the old notch recovery pocket and one-camera-band readability, but gives the route one clearer high point before the drop into the fell.

## Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- shared client pass in `output/main-158-client/`
- real-start browser proof in `output/main-158-browser/`

## Browser Artifacts

- `output/main-158-browser/approach.png`
- `output/main-158-browser/approach-state.json`
- `output/main-158-browser/crest-approach.png`
- `output/main-158-browser/crest-approach-state.json`
- `output/main-158-browser/errors.json`

The real-start browser proof keeps the new brow and its `mountain-avens` reward visible inside the same compact camera frame, with no captured console errors.
