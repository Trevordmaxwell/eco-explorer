# Source to Shore Route-Flow Consolidation Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-4
Queue: ECO-20260428-main-451
Packet: `.agents/packets/170-source-to-shore-route-flow-consolidation.json`

## Summary

Consolidated Source to Shore route-flow behavior around one explicit three-beat state matrix while keeping existing Route v2 ids, evidence ids, save shape, support behavior, and filed closure stable.

- Added `SOURCE_TO_SHORE_BEAT_FLOW` and beat-surface resolution in `src/engine/source-to-shore-state.ts`.
- Kept Source Shelter, Forest Release, and Dune Catch as the only live beats.
- Kept `Dune Catch` as the route title/id, with `coastal catch` only in final filed memory copy.
- Updated the dedicated station board to consume the Source to Shore beat surface state rather than duplicating active/ready/filed status logic.
- Added route/controller/snapshot coverage for active route-marker behavior and ready-to-file calm states.

## Guardrails

- No fourth Source to Shore beat.
- No save-schema change.
- No planner, route framework, dashboard, inventory, or support-system expansion.
- Route ids, evidence ids, ordered slots, process variants, support notices, and filed states stayed stable.

## Verification

Passed:

```bash
npm test -- --run src/test/field-requests.test.ts src/test/field-request-controller.test.ts -t 'Source to Shore|Cool Release|Rime Source|route-marker|hand-lens|note-tabs'
npm test -- --run src/test/field-season-board.test.ts -t 'Source to Shore|copy budget|station atlas and active outing copy'
npm test -- --run src/test/save-snapshots.test.ts -t 'source-to-shore|debug save snapshots|boots'
npm run build
npm test -- --run src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts
```

## Handoff

`ECO-20260428-critic-451` should review the three-beat flow for station, atlas, journal, map, support, ready-to-file, and final filed closure behavior. If clean, promote route catalog extraction for packet `171`.
