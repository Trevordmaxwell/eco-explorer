# 2026-04-03 Exposure-Threshold Support Implementation

Implemented `ECO-20260403-main-221` in lane 2.

## What Shipped

- Added one new close-look card for `talus-cushion-pocket` in `src/engine/close-look.ts`.
- Added one new `sketchbookNote` for `frost-heave-hummock` in `src/content/biomes/tundra.ts`.
- Extended focused test coverage in `src/test/close-look.test.ts` and `src/test/sketchbook.test.ts`.

## Scope Kept Tight

- Kept the pass inside the two approved notebook-facing seams only.
- Did not add new ecosystem-note ids, comparison allowlist entries, route-board copy, station logic, or world-map behavior.
- Left the shared alpine carriers alone so the branch identity gain stays local to one treeline threshold landmark and one tundra ground-process landmark.

## Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `node "$HOME/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js" --url http://127.0.0.1:5173 --actions-json '{"steps":[{"buttons":["space"],"frames":2},{"buttons":[],"frames":12},{"buttons":["right"],"frames":18},{"buttons":[],"frames":6}]}' --iterations 1 --pause-ms 200 --screenshot-dir output/lane-2-main-221-client`
- Seeded browser proof in `output/lane-2-main-221-browser/`:
  - `treeline-talus-close-look.png`
  - `treeline-talus-close-look-state.json`
  - `tundra-frost-heave-hummock-sketchbook.png`
  - `tundra-frost-heave-hummock-sketchbook-state.json`
  - normalized `console-errors.json` stayed empty
  - raw scenario buffers remain in `console-errors-treeline.json` and `console-errors-tundra.json`

## Outcome

The high-country branch now keeps one more remembered treeline shelter detail and one more remembered tundra freeze-thaw ground cue without reopening the already-busy shared alpine comparison seam.
