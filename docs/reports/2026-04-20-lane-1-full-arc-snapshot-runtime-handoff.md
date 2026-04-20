# Lane 1 Full-Arc Snapshot Runtime Handoff

Queue: `ECO-20260420-scout-338`
Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
Role: `scout-agent`
Lane: `lane-1`

## Finding

Lane 1 already has the right seed surface for packet `133`: `src/engine/debug-save-snapshots.ts` exposes six plain-save snapshots, and `src/test/save-snapshots.test.ts` already proves they round-trip through save normalization and resolver state. What is still missing is a compact runtime proof that those snapshots can boot the actual game coordinator and expose stable station/map/journal state through `render_game_to_text()` without browser traversal or brittle timing.

Useful existing pieces:

- `src/engine/debug-save-snapshots.ts` has `first-session`, `station-return`, `season-close-return`, `high-pass-active`, `high-pass-ready-to-file`, and `high-pass-filed`
- `src/test/test-helpers.ts` already exports fake DOM helpers, `readState`, `tapKey`, and `advanceUntil`
- lane 2 owns content/filed-note matrix assertions, lane 3 owns screenshot manifest checkpoints, and lane 4 owns Route v2 route-state progression

Current known blocker:

- `npm run build` is failing outside lane 1 in `src/test/field-requests.test.ts` while another lane's route matrix is in flight. Do not repair that from lane 1 unless lane-1 edits directly cause a new failure.

## Main-338 Target

Add a test-only runtime surface matrix for the six debug save snapshots, preferably inside `src/test/save-snapshots.test.ts`. Keep it focused on coordinator surfaces that lane 1 owns or needs to keep stable: starter state, map-to-station flow, season-close handoff, High Pass active handoff, ready-to-file station state, filed state, and journal no-active-request state.

Recommended implementation:

- add small local helpers in `src/test/save-snapshots.test.ts` such as `bootSnapshot(id)`, `openWorldMap(...)`, `openFieldStation(...)`, and `openJournal(...)` using existing `test-helpers`
- use `buildDebugSaveSnapshot()` or `buildDebugSaveSnapshots()` instead of constructing duplicate saves
- avoid adding new runtime hooks, new save snapshots, browser automation, or player-facing UI unless an assertion reveals a real lane-1 seam

Recommended assertions:

- `first-session`: after `Enter`, guided stage is `starter`, active request is `beach-shore-shelter`, and the route board targets `beach`
- `station-return`: `M` -> `Enter` opens the world map, then `M` defaults to `field-station`; station state shows `RETURN TO STATION` and the `station-return` beat active
- `season-close-return`: opening the station from the map clears `seasonCloseReturnPending` and exposes the routes-page `NEXT FIELD SEASON` / `High Pass starts at Treeline Pass.` shell
- `high-pass-active`: journal/card state exposes `treeline-high-pass`, world-map focus points at `treeline`, and route-board target is `treeline`
- `high-pass-ready-to-file`: station route board exposes `notebookReady.requestId: "treeline-high-pass"` and no map/route traversal is required
- `high-pass-filed`: station and journal state show no active outing/request, with the filed High Pass route board settled

Non-goals:

- no route-state progression matrix duplication
- no filed-note/copy-budget matrix duplication
- no screenshot manifest or browser proof work
- no save schema or migration change
- no player-facing copy, station redesign, tutorial UI, telemetry, geometry, or content additions

Verification:

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run validate:agents`
- `git diff --check`
- attempt `npm run build` only to record whether the current `field-requests.test.ts` blocker remains
