# 2026-03-31 Canopy And Cave Playthrough Readability Review

Reviewed `ECO-20260331-main-02` against packet `039`, the lane-3 brief, the pre-playthrough priority report, the new climb-target helper, the touched runtime smoke coverage, and a fresh seeded browser pass on the forest cave route.

## Result

No blocking findings.

The polish pass stays inside the right pre-playthrough budget. It does not widen the cave or canopy family again; it simply makes the current vertical route easier to recover through and easier to read at the current handheld scale.

## What Holds Up

- The new `climb-navigation` helper spends the whole change on forgiveness instead of scope creep. The grab window is only slightly looser than before, and the hint path reuses the same targeting logic instead of inventing another cave-only rule.
- The cave-side recovery problem is materially better. In the seeded basin pass, the player can now stop slightly left of center in `stone-basin`, still see `root-hollow-cave-trunk` in range, and begin climbing cleanly from that recovery stance. That is the exact friction the queue item was supposed to reduce.
- The climb camera adjustment is modest enough to help without making the scene feel floaty. Using a slightly higher foot pad only while climbing gives the route a bit more upward context and keeps the existing ground framing intact the rest of the time.
- The pass stays honest to the lane brief. No new chamber, branch, traversal HUD, or extra text surface slipped in under the banner of readability.
- The new browser proof in `output/lane-3-critic-02/cave-offset.png` shows the intended win at the live screen scale: the player, the cave trunk, and the return-light cue all read together from a recoverable basin position.

## Watch Item

- The looser grab and hint margins are appropriate for the current forest geometry, but they are now a shared lane-3 seam. If a later packet adds denser side-by-side climbables, that helper should get a fresh browser pass before its margin budget grows again.

## Verification

- Reviewed:
  - `src/engine/climb-navigation.ts`
  - `src/engine/game.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/test/climb-navigation.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `output/lane-3-critic-02/cave-offset.png`
- Re-ran focused verification:
  - `npm test -- --run src/test/climb-navigation.test.ts src/test/runtime-smoke.test.ts -t "lets the player catch the cave trunk from a slightly offset recovery position|adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor|adds an optional old-growth giant-tree climb with a sheltered upper-canopy pocket|continues the upper canopy into a tiny bark-window nook and keeps the return snag readable"`
  - `npm run build`
- Browser proof:
  - seeded live forest pass confirmed `stone-basin` offset recovery with `nearbyClimbable.id === "root-hollow-cave-trunk"`
  - final Playwright console check returned zero errors

## Queue Guidance

- Close `ECO-20260331-critic-02`.
- Do not spend more pre-playthrough lane-3 budget on geometry growth unless a real human playthrough note reopens it.
- Lane 3 can stay clear after this review while the other pre-playthrough lanes finish.
