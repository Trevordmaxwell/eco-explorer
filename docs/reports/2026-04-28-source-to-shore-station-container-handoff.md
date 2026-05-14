# Source to Shore Station Container Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Packet: `.agents/packets/169-source-to-shore-station-container.json`

## Finding

Source to Shore has enough state to stand on its own, but the current station board still presents it through the completed first-season `edge-pattern-line` container:

- `src/engine/field-season-board.ts` keeps `routeId: 'edge-pattern-line'` and `routeTitle: 'EDGE LINE LOGGED'` after the edge route is complete.
- When `resolveSourceToShoreState(save)` exists, that completed board swaps in Source to Shore summary, next direction, target biome, and a `launchCard`.
- `src/engine/field-station-routes-page.ts` renders that `launchCard` instead of the board beats, so the new beta chapter reads like a card squeezed inside the old completed route shell.

That is the right next implementation target. The surface-triage gate is clean, and this can be fixed without adding a fourth beat, a save migration, or a new planner page.

## Implementation Contract

Keep the change centered on `FieldSeasonBoardState` and the existing `ROUTES` page:

- Add a dedicated Source to Shore board identity, preferably `routeId: 'source-to-shore-beta'`, with `routeTitle: 'SOURCE TO SHORE'` and `branchLabel: 'Treeline -> Forest -> Coastal Scrub'`.
- Extend the board beat ids with exactly three Source to Shore beat ids: `source-shelter`, `forest-release`, and `dune-catch`.
- Add a small resolver in `src/engine/field-season-board.ts`, such as `resolveSourceToShoreFieldSeasonBoardState(save, sourceToShoreState)`, and route to it when `resolveSourceToShoreState(save)` exists.
- Return `launchCard: null` for the Source to Shore route board so the existing routes-page beat rows show the three beta beats instead of hiding them behind a launch-card summary.
- Keep active, ready-to-file, and filed states driven by `resolveSourceToShoreState(save)` and existing Route v2 progress. Do not add a new Source to Shore save object.
- Extend `getRouteBeatIdForRequest` for the three Source to Shore request ids so ready-to-file states can mark the matching beat as `ready` and keep notebook-ready debug/preview behavior.
- Update `drawFieldStationRoutesPage` only as needed for the new board identity, especially if `complete: true` should show `FILED` instead of the generic `LOGGED` progress label on the Source to Shore board.

Suggested board state:

- Active `Source Shelter`, `Forest Release`, or `Dune Catch`: progress `BETA`, current beat `active`, earlier beats `done`, later beats `upcoming`, target biome from `sourceToShoreState.routeBoardTargetBiomeId`.
- Ready-to-file: progress `NOTE`, current beat `ready`, earlier beats `done`, target biome `null`, next direction from `sourceToShoreState.routeBoardNextDirection`.
- Filed: progress `FILED`, all three beats `done`, target biome `null`, no active outing locator, summary and next direction from the filed Source to Shore state.

## Guardrails

- Do not add a fourth Source to Shore beat.
- Do not add a planner, dashboard, new station tab, loadout, inventory, economy, direct API mode, or save-schema change.
- Preserve first-season identity: pre-Source states after `EDGE PATTERN LINE` still use the existing completed edge board, and `FIELD ATLAS` should continue listing `EDGE PATTERN LINE logged`.
- Preserve Source to Shore route behavior, world-map labels, journal request behavior, atlas notes, support choice behavior, expedition-page card behavior, filed memory notices, and debug snapshots unless a test expectation only changes because the route board now has its own id.

## Proof Expectations

Focused runtime proof should cover:

- `field-season-board.test.ts`: active Source Shelter, active Forest Release, active Dune Catch, at least one ready-to-file state, and filed Source to Shore now report `routeId: 'source-to-shore-beta'`, `routeTitle: 'SOURCE TO SHORE'`, `launchCard: null`, and exactly three Source to Shore beats.
- `runtime-smoke.test.ts`: post-High-Pass station state no longer exposes Source to Shore as an `edge-pattern-line` launch card, while journal, map, atlas, and active request behavior still agree.
- `npm run build`.
- Native `256x160` browser proof for one active Source to Shore station board and one ready or filed Source to Shore station board, with captured browser errors empty.

The implementation can be small. The key review question is whether Source to Shore now feels like a compact beta chapter board rather than a second chapter tucked into `EDGE LINE LOGGED`.
