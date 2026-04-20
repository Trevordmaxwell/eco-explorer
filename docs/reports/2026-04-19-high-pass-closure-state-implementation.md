# 2026-04-19 High Pass Closure State Implementation

Completed `ECO-20260419-main-320` for lane 1.

## Change

High Pass now has an explicit chapter phase model in `resolveHighPassChapterState(...)`:

- `dormant` after Season Threads while the calm station-return beat is still pending
- `active` once the post-season High Pass outing can open
- `ready-to-file` while `treeline-high-pass` is ready to file at the station
- `filed` once `treeline-high-pass` is completed

The filed phase now wins over mixed save data, turns off active outing behavior, and gives station/map surfaces filed copy instead of `NEXT` copy. After High Pass is filed, the route board has no target biome, the world map no longer shows `Today: High Pass`, the journal no longer synthesizes `route-locator:treeline`, and the expedition card reads `FILED`.

## Files Changed

- `src/engine/high-pass-chapter-state.ts`
- `src/engine/field-season-board.ts`
- `src/engine/field-season-wrap.ts`
- `src/test/field-season-board.test.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Boundaries Kept

- No new season, biome, planner row, dashboard, or station shell.
- No High Pass geography or traversal change.
- No new journal/archive panel; existing station, atlas, route board, expedition, journal, and world-map seams now read the filed state.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "surfaces the season capstone"`
- `npm run build`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173 --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":8},{"buttons":["right"],"frames":8},{"buttons":["space"],"frames":3},{"buttons":[],"frames":8}]}' --iterations 3 --pause-ms 250 --screenshot-dir output/web-game/high-pass-closure-main-320`

Browser artifact:

- `output/web-game/high-pass-closure-main-320/shot-2.png`
- `output/web-game/high-pass-closure-main-320/state-2.json`

No `errors-*.json` was produced by the browser client.

## Handoff

`ECO-20260419-critic-320` is ready to review. The highest-value checks are the post-filed station route card, expedition card, world-map replay label, route marker, and journal field-request state.
