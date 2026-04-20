# 2026-04-19 High Pass Expedition Chrome Implementation

Completed `ECO-20260419-main-324` for lane 1.

## Change

The filed High Pass expedition card no longer inherits start-facing chrome.

This pass kept the existing one-card expedition page and added two tiny display hooks to the expedition state:

- `detailLabel`, so normal expedition cards can keep `STARTS` while filed High Pass can show `FILED`
- `noticeText`, so filed High Pass activation can use explicit filed copy instead of the generic `Start:` notice template

Filed High Pass now renders as `FILED / Treeline Pass`, and activating the filed card shows:

`High Pass filed from Treeline Pass. Current field arc filed. Revisit when you want a quiet pass.`

## Files Changed

- `src/engine/high-pass-chapter-state.ts`
- `src/engine/field-season-board.ts`
- `src/engine/field-station-expedition-page.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition|season capstone|High Pass filed"`
- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "surfaces the season capstone"`
- `npm run build`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173 --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":8},{"buttons":["right"],"frames":8},{"buttons":["space"],"frames":3},{"buttons":[],"frames":8}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/high-pass-expedition-chrome-main-324`

No `errors-*.json` was produced by the browser client.

## Handoff

`ECO-20260419-critic-324` is ready to review. The review should check that the filed card display and filed activation notice no longer contain start-facing language.
