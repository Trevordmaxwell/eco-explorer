# 2026-04-19 High Pass Expedition Chrome Review

Reviewed `ECO-20260419-main-324` for lane 1.

## Result

The filed High Pass expedition-card chrome is fixed.

- The filed `HIGH PASS` expedition card now uses `FILED` instead of the generic `STARTS` row label.
- Activating the filed card now shows filed-state copy and no longer emits the generic `Start:` notice.
- Root Hollow locked, ready, active, note-ready, and logged states keep their existing expedition cue shape.

## Finding

One adjacent note-ready path still needs a narrow follow-up before the end-to-end High Pass proof should unblock.

When High Pass is ready to file, the expedition state now has `NOTE READY`, `FILE`, and an explicit `noticeText` telling the player to file from the station. However, `activateExpeditionCard()` still runs the older logged-expedition map redirect before it checks `expedition.noticeText`. That means pressing `Enter` on the note-ready High Pass expedition card can reopen the world map toward Treeline Pass instead of showing the station filing notice.

This is not the filed-card regression from `main-324`, but it sits on the same one-card expedition activation seam and would make the ready-to-file state feel start-facing again.

## Recommendation

Queue one small lane-1 follow-up:

- Let explicit expedition `noticeText` win before the logged-expedition world-map redirect.
- Add a runtime smoke assertion for the High Pass `NOTE READY / FILE` expedition card so pressing `Enter` shows the station filing notice and does not leave the field station.
- Keep active High Pass and logged Root Hollow behavior unchanged.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition|season capstone|High Pass filed"`
