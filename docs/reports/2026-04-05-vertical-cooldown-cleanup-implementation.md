# 2026-04-05 Vertical Cooldown Cleanup Implementation

Implemented `ECO-20260405-main-275` in lane 3.

## What Changed

- Softened the treeline return seam in `src/content/biomes/treeline.ts` by widening `lee-pocket-fell-return` toward the incoming brow side instead of adding another platform.
- Extended `src/test/treeline-biome.test.ts` so the authored `lee-pocket` family now locks the widened `lee-pocket-fell-return` geometry against the existing `lee-pocket-crest-brow` and `lee-pocket-lee-rest`.
- Kept `src/test/runtime-smoke.test.ts` on the same compact treeline loop path so the live `last-tree shelter -> lee-pocket loop -> fell rejoin` route still passes after the geometry easing.

## Why This Shape

The cooldown packet asked for protection, not more place growth.

`Treeline Pass` already had the right benchmark family:

1. last-tree shelter
2. folded lee pocket
3. crest brow
4. sheltered return
5. open fell

The smallest high-value fix was to make the first return catch a little more forgiving without adding a new landing, cue, or branch. Widening the existing `lee-pocket-fell-return` does that while keeping the silhouette and chapter order intact.

## Files Changed

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Verification

Passed:

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`

Blocked by unrelated non-lane-3 work already present in the shared tree:

- `npm run build`
  - fails in `src/engine/nursery.ts` because `shouldShowNurseryBedRewardSummary` and `showRewardSummaryOnBed` are referenced by other-lane nursery changes outside this treeline pass
- fresh live browser proof
  - the same nursery runtime error breaks `render_game_to_text()` during stepped browser verification, so I did not treat that failure as part of lane 3's geometry change

## Queue Recommendation

- Close `ECO-20260405-main-275` as done.
- Promote `ECO-20260405-critic-275` to `READY`.
