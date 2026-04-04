# 2026-04-04 Stronger Home-Place Transformation Review

Reviewed `ECO-20260404-critic-253` against packet `103`.

## Result

No blocker.

The new pass makes the station feel more changed without turning it into a denser UI surface.

## What Landed Well

- The payoff stays on the already-approved lower-shell seam, so the routes page and nursery read as the same home place instead of as separate decoration systems.
- Filed-route progress now changes the station before the player reads the cards, which is exactly the visible-payoff direction this packet asked for.
- The mature teaching-bed card did not pick up another sentence, footer, or route clue echo, so the handheld text budget stayed protected.
- The change remains structurally calm: one pure helper grew slightly, the render change stayed local to [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts), and save or progression behavior did not move.

## Watch Item

The lower sill is now carrying nursery growth, route-earned threshold accents, and the arrival settle. That is still working, but it is the clear punctuation ceiling for this home-place seam. Future follow-ons should reuse this same sill family or shift into a different scoped seam rather than adding another independent station decoration lane.

## Verification

- rechecked the helper and render change in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts)
- rechecked the focused expectations in [overlay-copy.test.ts](/Users/trevormaxwell/Desktop/game/src/test/overlay-copy.test.ts)
- inspected [station-threshold-routes.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-253-browser/station-threshold-routes.png)
- inspected [station-threshold-nursery.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-253-browser/station-threshold-nursery.png)
- confirmed [console-errors.txt](/Users/trevormaxwell/Desktop/game/output/lane-1-main-253-browser/console-errors.txt) only contains the existing `not granted` permission noise
