# 2026-04-02 Board Calm Implementation

## Scope

Complete `ECO-20260402-main-155` by calming the filed-season `HIGH PASS / NEXT` board without changing the subtitle, archive strip, atlas note, expedition page, or map cues.

## What Changed

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) now treats launch-card detail as optional and stops authoring the extra `High Pass` detail line for the filed-season routes shell.
- [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) now renders launch-card detail only when it exists, so the routes card keeps its shape without spending a second forced line.
- [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts) and [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now assert the calmer one-line `High Pass` card while keeping the subtitle, archive strip, atlas note, expedition footer, and world-map cues unchanged.

## Result

The filed routes shell now reads:

- subtitle for chapter location
- archive strip for season continuity
- one summary line on the `HIGH PASS / NEXT` card
- atlas row for the actionable next-step sentence

That keeps the shell confident without adding a planner feel or another recap seam.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "points the season wrap back to the station once the capstone is logged|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`
- shared web-game client run in [output/lane-1-main-155-client](/Users/trevormaxwell/Desktop/game/output/lane-1-main-155-client)
- seeded browser proof in [routes-shell-calm.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-155-browser/routes-shell-calm.png)
- browser console check in [console-errors.txt](/Users/trevormaxwell/Desktop/game/output/lane-1-main-155-browser/console-errors.txt) with 0 errors
