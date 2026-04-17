# Next-Chapter Shell And Expedition Render Split Implementation

## Queue Ref

- `ECO-20260416-main-307`

## What Landed

Lane 1 opened the filed-season expedition shell into one real next-chapter card without widening the station:

- once `Season Threads` is filed, the expedition tab now pivots from the old logged `ROOT HOLLOW` recap card into a single `HIGH PASS` chapter card
- that card reuses the existing expedition layout instead of adding a new station page, planner row, or second card
- the inline expedition-page branch moved out of [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) into the new helper [field-station-expedition-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-expedition-page.ts)

## Files

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
  - filed-season expedition state now resolves to a real `HIGH PASS / NEXT` card instead of the old `NEXT FIELD SEASON` footer teaser
- [field-station-expedition-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-expedition-page.ts)
  - owns expedition-card drawing and optional footer-strip drawing
- [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts)
  - now delegates the expedition page body to the new helper and keeps only station shell framing plus page switching
- [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts)
  - updated the filed-season expedition expectation to the new `HIGH PASS` card
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)
  - updated the filed-season station runtime proof to assert the expedition tab now shows the chapter card directly

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition|next field season|field station"`
- `npm run build`

Both passed in the shared tree during this lane-1 pass.
