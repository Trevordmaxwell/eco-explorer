# 2026-04-02 Regional Bridge Implementation

## Scope

Complete `ECO-20260402-main-170` by adding one shared regional-bridge line to the filed-season `High Pass` routes card and the derived journal outing card.

## What Changed

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) now derives one shared regional-bridge line, `Treeline Pass carries the season toward High Pass.`
- That shared line now drives:
  - the filed-season `HIGH PASS` launch-card summary on `SEASON -> ROUTES`
  - the derived journal outing-card summary from `resolveSeasonOutingLocator()`
- The stronger directional seams stay unchanged:
  - routes subtitle: `High Pass starts at Treeline Pass.`
  - archive strip: `Root Hollow now leads to High Pass.`
  - atlas note: `Next: take the High Pass from Treeline Pass.`
  - expedition footer: `High Pass waits beyond Root Hollow.`
  - map cues: `Today: High Pass` plus `FROM FOREST TRAIL`

## Result

The filed season now feels a little more like one carried-forward regional journey and a little less like a routes card plus a separate procedural journal reminder. The routes page and journal card now speak in the same calmer place-led voice, while the map and expedition seams keep their existing stronger roles.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "filed-season|season capstone|route-locator:treeline|High Pass"`
- `npm run build`
- fresh browser proof in [journal-bridge.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-170-browser/journal-bridge.png) and [routes-bridge.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-170-browser/routes-bridge.png)
- console check in [console-messages.txt](/Users/trevormaxwell/Desktop/game/output/lane-1-main-170-browser/console-messages.txt)

## Notes

The new line wraps cleanly in the current handheld routes shell and journal card without forcing another row or pushing against the atlas seam.
