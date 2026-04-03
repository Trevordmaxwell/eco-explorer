# 2026-04-02 Next Expedition Follow-On Implementation

## Scope

Complete `ECO-20260402-main-171` by replacing the generic pre-filed logged-expedition teaser with one quieter place-led hint.

## What Changed

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) now reuses the future target location inside `resolveNextSeasonSetupTeaser()`.
- The pre-filed logged `ROOT HOLLOW` footer keeps:
  - `label: 'NEXT EXPEDITION'`
- Its teaser text now reads:
  - `Treeline Pass waits beyond Root Hollow.`
- The later season-filed branch stays unchanged:
  - `label: 'NEXT FIELD SEASON'`
  - `text: 'High Pass waits beyond Root Hollow.'`

## Result

The logged expedition page now feels less like placeholder UI and more like a quiet future chapter seam. The footer hints at the next region without competing with the live `Season Threads` work or the later `High Pass` outing shell.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition"`
- `npm run build`
- shared client smoke in `output/lane-1-main-171-client/`
- seeded browser proof in [expedition-teaser.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-171-browser/expedition-teaser.png)
- browser console recheck: only repeated `not granted` permission noise, no new app errors
