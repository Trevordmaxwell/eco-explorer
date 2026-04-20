# 2026-04-20 Lane 1 Save Snapshot Handoff

Completed `ECO-20260420-scout-330` for packet `131`.

## Finding

The runtime already has enough deterministic save and debug seams for a narrow snapshot pass. The main gap is not another playthrough system; it is a source-tracked set of named save states that reviewers can paste into `localStorage` and use alongside `render_game_to_text()`.

Useful existing seams:

- `src/engine/save.ts` owns `createNewSaveState()`, `normalizeSaveState()`, `persistSave()`, and the current localStorage key.
- `src/engine/high-pass-chapter-state.ts` resolves `dormant`, `active`, `ready-to-file`, and `filed` High Pass phases from saved state.
- `src/engine/field-season-board.ts` and `src/engine/guided-field-season.ts` already prove the station-return, season-close, and High Pass station states in focused tests.
- `src/test/runtime-smoke.test.ts` already contains the High Pass completion recipe and evidence-slot ids used by live proof.

## Main Scope

Add debug-only snapshot helpers and documentation, not telemetry or a player-facing UI.

Recommended files:

- `src/engine/debug-save-snapshots.ts`
- `src/engine/save.ts`
- `src/engine/game.ts`
- `src/test/save-snapshots.test.ts`
- `docs/save-snapshot-states.md`

Recommended shape:

- Export the existing storage key from `save.ts` so docs/tests do not duplicate `eco-explorer-save-v1`.
- Add named snapshot builders that return plain `SaveState` JSON plus a serialized localStorage value.
- Optionally expose one debug-only window helper near `render_game_to_text()`, such as `get_debug_save_snapshots()`, with no UI and no network calls.
- Document how to run `localStorage.setItem(<key>, <value>)` and reload for each named state.

## Snapshot Set

- `first-session`: fresh save, beach start, starter guidance intact.
- `station-return`: forest-study completion state that points back to the field station for `Trail Stride`.
- `season-close-return`: `forest-expedition-upper-run` and `forest-season-threads` complete with `seasonCloseReturnPending: true`.
- `high-pass-active`: season-close cleared, High Pass active, no `treeline-high-pass` completion.
- `high-pass-ready-to-file`: `treeline-high-pass` ready with slots `stone-lift`, `lee-watch`, `rime-mark`, `talus-hold`.
- `high-pass-filed`: `treeline-high-pass` complete, `routeV2Progress` cleared, filed station/map/journal/request state settled.

## Verification For Main

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run validate:agents`
- `git diff --check`

If main touches `game.ts` for a debug-only window helper, also run the smallest relevant runtime-smoke check that proves the helper is exposed and returns valid JSON.

## Non-Goals

- Do not add telemetry, analytics, network calls, a player-facing snapshot menu, or a debug dashboard.
- Do not add a save-schema migration or change persisted field meanings.
- Do not change route behavior, station layout, route copy, biome geometry, science content, or support behavior.
- Do not build packet `133`'s full deterministic route-state matrix.
