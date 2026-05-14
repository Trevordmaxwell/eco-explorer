# Source to Shore Route-Flow Consolidation Handoff

Date: 2026-04-28  
Role: scout-agent  
Lane: lane-4  
Queue: ECO-20260428-scout-451  
Packet: .agents/packets/170-source-to-shore-route-flow-consolidation.json

## Read

Source to Shore already has the right behavioral spine, but it is spread across route definitions, a Source to Shore state helper, the older field-season board shape, the outing locator, support/controller state, and debug snapshots. The next implementation should consolidate how those existing states are consumed after lane 1 lands the dedicated station container. It should not add a fourth beat or a new route framework.

## Current State Map

- Route definitions live in `src/engine/field-requests.ts`.
  - `source-to-shore-source-shelter`: ordered `rime-source -> lee-watch -> talus-hold`, with the live `Rime Source` process variant during `frost-rime`.
  - `source-to-shore-forest-release`: ordered `seep-hold -> root-filter -> cool-release`, with the live `Cool Release` process variant during `moisture-hold`.
  - `source-to-shore-dune-catch`: ordered `dune-catch -> swale-hold -> cool-edge`; this is the third and final live beat.
- Source to Shore surface state lives in `src/engine/source-to-shore-state.ts`.
  - Active states provide `BETA`, a target biome, station-board summary, atlas note, archive text, launch-card copy, and world-map label.
  - Ready-to-file states provide `NOTE`, no route-board target, filing copy, and `File: ...` world-map labels.
  - Final filed state is only after `source-to-shore-dune-catch`; it returns no active outing and closes as `SOURCE TO SHORE`.
- Station surfaces consume that helper in `src/engine/field-season-board.ts`, then flow through `src/engine/field-station-state.ts`, `src/engine/field-season-wrap.ts`, and `src/engine/field-station-routes-page.ts`.
- Map, journal, and route-marker behavior flow through `src/engine/field-season-outing-locator.ts`, `src/engine/field-request-state.ts`, `src/engine/field-request-controller.ts`, `src/engine/game.ts`, and `src/engine/world-map-render.ts`.
- Debug coverage is anchored by `src/engine/debug-save-snapshots.ts` and `src/test/save-snapshots.test.ts` for active, ready, downstream, and final filed snapshots.

## Implementation Contract

Wait for `ECO-20260428-critic-450` to approve the station container before implementing `ECO-20260428-main-451`. The consolidation should then:

- Keep `src/engine/source-to-shore-state.ts` as the single Source to Shore display-state resolver.
- Make the three-beat matrix explicit enough that station, atlas, map, journal, support, and debug snapshot code read the same active/ready/filed truth.
- Preserve route ids, evidence ids, slot order, process-variant titles, support behavior, and the current save schema.
- Preserve `Dune Catch` as the route title/id while using `Coastal Catch` only as final filed memory language.
- Keep ready-to-file states map-calm: no route-marker target, no active world-map focus, and a station-side filing prompt.
- Keep final filed Source to Shore calm: no active outing, no hidden fourth beat, no planner or dashboard implication.

Good first refactor target: turn the branchy `resolveSourceToShoreState(...)` implementation into a compact ordered table plus tiny phase resolver inside the same module, or an equivalent local helper, while keeping exported fields stable. Do not extract route definitions yet; packet `171` owns that after this behavior is reviewed.

## Test Contract

Focused tests for main/critic should cover:

- `src/test/field-requests.test.ts`: all three Source to Shore routes, ordered slots, process variants, hand-lens notebook-fit behavior, and `fileReadyRouteV2FieldRequest(...)` transitions.
- `src/test/field-request-controller.test.ts`: active route-marker support targets and hand-lens/note-tabs projection for Source to Shore states.
- `src/test/field-season-board.test.ts`: active, ready-to-file, downstream, live-variant, final filed, atlas, archive, and copy-budget states.
- `src/test/save-snapshots.test.ts`: boot every Source to Shore debug snapshot, especially the currently under-asserted ready-to-file snapshots, through station, journal, map, route-marker, and final filed closure.
- `npm run build` after runtime edits.

If layout changes are required to consume the new lane-1 container, keep them to the Source to Shore container host and do not reopen station-shell structure.
