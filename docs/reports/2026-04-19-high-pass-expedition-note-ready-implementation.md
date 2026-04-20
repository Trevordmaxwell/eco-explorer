# 2026-04-19 High Pass Expedition Note-Ready Implementation

Completed `ECO-20260419-main-325` for lane 1.

## Change

The High Pass `NOTE READY / FILE` expedition card now keeps the player at the field station and shows the station-filing notice.

`activateExpeditionCard()` now lets explicit `expedition.noticeText` win before the older logged-expedition world-map redirect. This preserves the active High Pass launch behavior, while preventing the ready-to-file card from reopening Treeline Pass after the player has already gathered the High Pass clues.

## Files Changed

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

## Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "surfaces the season capstone"`
- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition|season capstone|High Pass filed"`
- `npm run build`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173 --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":8},{"buttons":["right"],"frames":8},{"buttons":["space"],"frames":3},{"buttons":[],"frames":8}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/high-pass-note-ready-main-325`

Inspected `output/web-game/high-pass-note-ready-main-325/shot-1.png`; no `errors-*.json` file was produced.

## Handoff

`ECO-20260419-critic-325` is ready to review. The review should confirm the note-ready High Pass expedition card no longer leaves the station and that the existing active and filed High Pass activation behaviors remain intact.
