# High Pass Route V2 Implementation

Implemented `ECO-20260416-main-310`.

## What Landed

Lane 4 now gives the filed-season `HIGH PASS` shell a real Route v2 outing instead of a placeholder direction line.

- [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts)
  - adds the new post-season `treeline-high-pass` request
  - uses ordered `stone-lift -> lee-watch -> rime-mark -> talus-hold` evidence through `frost-heave-boulder`, `hoary-marmot`, `moss-campion`, and `talus-cushion-pocket`
  - reuses the live treeline `frost-rime` process moment as the route-local `Rimed Pass` replay variant by letting `reindeer-lichen` satisfy `rime-mark`
  - keeps the route dormant while `save.seasonCloseReturnPending` is still true, so the calm return-to-station beat remains intact
- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
  - replaces the old filed-season placeholder next-direction copy with the live High Pass clue path
- [field-requests.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts)
  - covers the season-close activation guard, full High Pass route progression, and the `Rimed Pass` alternate clue path
- [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts)
  - adds one ordinary hand-lens retarget proof for the final `talus-hold` slot
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)
  - proves the calm season-close beat still shows the locator first, then the live High Pass request takes over afterward
  - proves hand lens can prefer `talus-cushion-pocket` on the crowded open-fell pocket while non-hand-lens supports do not

## Why This Shape Holds

- It keeps `High Pass` inside the existing Route v2 model instead of adding a new planner or chapter shell.
- It spends the current chapter assets that already landed this sprint: the `Stone Shelter` basin, the treeline carriers, and the open-fell talus pocket.
- It respects lane 1's season-close pacing by delaying route activation until the player has reopened the station once.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-request-controller.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket as the High Pass talus-hold clue on the live open-fell pocket|keeps non-hand-lens supports on the nearer open-fell inspectable in the same High Pass pocket setup|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npx vitest run src/test/field-season-board.test.ts -t "points the season wrap back to the station once the capstone is logged"`
- `npm run build`
