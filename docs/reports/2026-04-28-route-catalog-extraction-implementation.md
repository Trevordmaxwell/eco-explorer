# Route Catalog Extraction Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-4
Queue: ECO-20260428-main-452
Packet: `.agents/packets/171-route-catalog-extraction.json`

## Summary

Extracted authored route/request definitions into a dedicated catalog module without changing route behavior.

- Added `src/engine/field-request-catalog.ts` for request definition shape types and the ordered `FIELD_REQUEST_DEFINITIONS` catalog.
- Kept active request selection, Route v2 evidence progression, support behavior, filed-note synthesis, and notebook filing in `src/engine/field-requests.ts`.
- Re-exported `FIELD_REQUEST_DEFINITIONS` and `FieldRequestDefinition` from `field-requests.ts` so existing callers and tests stay stable.
- Updated architecture and content-authoring docs to point route authors at the catalog boundary.

## Preservation Notes

- No route ids, evidence ids, slot order, unlock chains, route titles, note text, process/world-state focus, or completion triggers changed.
- No generated index, map lookup, route framework, planner UI, save field, route type, or support mechanic was added.
- Source to Shore display-state logic stayed in `source-to-shore-state.ts`.

## Verification

Passed:

```bash
npm test -- --run src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/content-quality.test.ts
npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts -t 'Source to Shore|High Pass|route-marker|debug save snapshots|copy budget'
npm run build
npm test -- --run src/test/save.test.ts
```

## Handoff

`ECO-20260428-critic-452` should review the extraction for behavior parity, import clarity, and whether the new catalog boundary is easier for future route authoring.
