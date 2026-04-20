# 2026-04-20 Lane 1 Save Snapshots Implementation

Completed `ECO-20260420-main-330` for packet `131`.

## Summary

Added source-tracked, debug-only save snapshots for the alpha playthrough checkpoints without changing route behavior, station layout, save schema, telemetry, or player-facing UI.

Implemented files:

- `src/engine/debug-save-snapshots.ts`
- `src/engine/save.ts`
- `src/engine/game.ts`
- `src/test/save-snapshots.test.ts`
- `docs/save-snapshot-states.md`

## Snapshot Set

- `first-session`
- `station-return`
- `season-close-return`
- `high-pass-active`
- `high-pass-ready-to-file`
- `high-pass-filed`

Each snapshot includes:

- plain `SaveState` JSON
- `localStorageKey` from `SAVE_STORAGE_KEY`
- serialized `localStorageValue`
- a console-ready paste command

The runtime now exposes `window.get_debug_save_snapshots()` beside `render_game_to_text()` so reviewers can inspect the current snapshot payload directly in the browser console.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run build`
- web-game client smoke in `output/lane-1-main-330-browser/`
- in-browser Playwright check that `window.get_debug_save_snapshots()` returns all six ids and parseable save payloads

The browser smoke recorded no console errors.
