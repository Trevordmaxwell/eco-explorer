# 2026-04-05 Vertical Cooldown Cleanup Review

Reviewed `ECO-20260405-critic-275` against packet `114`, the lane-3 brief, the critic brief, the cleanup handoff, the implementation report, the treeline geometry/test changes, and the focused verification that still runs in the current shared tree.

## Result

No blocking lane-3 issue found.

The cleanup stayed inside the cooldown brief:

- it protects an existing treeline return seam instead of opening another landmark family
- it keeps the change geometry-only, with no new cue, carrier, or route branch
- it spends the whole budget on recoverability in the exact `lee-pocket-crest-brow -> lee-pocket-fell-return -> lee-pocket-lee-rest` family named by the scout handoff

That is the right move for this wave. The current treeline family already has enough place memory. Making the first catch under the brow a little more forgiving is higher value than another shelf, another accent, or more height.

## What Holds Up

- The implementation stayed minimal. `src/content/biomes/treeline.ts` only widens `lee-pocket-fell-return`; it does not add a new platform id or reopen the denser `last-tree shelter` band.
- The geometry lock is better now. `src/test/treeline-biome.test.ts` explicitly pins the widened `fell-return` against the existing `crest-brow` and `lee-rest`, so a later vertical pass is less likely to silently shrink the recovery seam again.
- The live route still passes through the same compact family. The focused `runtime-smoke` slice still proves the `last-tree shelter -> lee-pocket loop -> fell rejoin` path without needing a new traversal helper or cue layer.

## Watch Item

One non-blocking watch item remains for the next lane-3 wave:

- rerun the real stepped browser proof for this treeline seam once the unrelated nursery runtime/build error is cleared from the shared tree

That is not a blocker for this review because the current failure is outside lane 3, and the treeline-focused tests still pass. It does matter before another vertical follow-on stacks more pressure on the same return family.

## Verification Rechecked

- reviewed `src/content/biomes/treeline.ts`
- reviewed `src/test/treeline-biome.test.ts`
- reviewed `src/test/runtime-smoke.test.ts`
- reran `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`
- rechecked the implementation note about the unrelated shared-tree `npm run build` failure in `src/engine/nursery.ts`

## Queue Recommendation

- Close `ECO-20260405-critic-275` as done.
- Promote `ECO-20260405-scout-276` to `READY`.
