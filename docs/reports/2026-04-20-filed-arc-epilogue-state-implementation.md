# Filed Arc Epilogue State Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-354`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-1`

## Summary

Added a compact filed High Pass copy resolver so the completed arc now has explicit buckets for filed location, completed-arc language, optional revisit language, filed expedition subtitle, and the composed expedition notice. The filed High Pass state now uses that resolver for all existing filed routes-page, atlas, archive, launch-card, expedition-card, and notice strings.

`resolveFieldStationSubtitle(...)` also reuses the same default filed-arc helper for the High Pass archive special case, so the expedition subtitle no longer lives as a second unrelated literal.

## Changed Files

- `src/engine/high-pass-chapter-state.ts`
- `src/engine/field-season-wrap.ts`
- `src/test/field-season-board.test.ts`
- `src/test/save-snapshots.test.ts`

## Guardrails

- No player-facing filed High Pass copy changed.
- No save schema, route definitions, support behavior, station page/UI, geometry, season-three promise, new route task, or science copy changed.
- Filed High Pass still suppresses active outing, active field request, route marker, route replay label, and journal field request.
- Lane-2 homecoming epilogue copy remains `High Pass filed. Revisit how stone, shelter, and talus connect.`

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "files High Pass|High Pass filed|filed High Pass"`
- `npm test -- --run src/test/field-station-homecoming-copy.test.ts`
- `npm run build`
- `git diff --check`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173/ --actions-json '{"steps":[{"buttons":["enter"],"frames":6},{"buttons":[],"frames":12}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/filed-arc-epilogue-state-main-354`
- Direct filed debug-snapshot browser state capture under `output/web-game/filed-arc-epilogue-state-main-354-filed/`

## Validation Note

`npm run validate:agents` passes with the existing work-queue-size warning. Packet `137` also parses cleanly on its own.
