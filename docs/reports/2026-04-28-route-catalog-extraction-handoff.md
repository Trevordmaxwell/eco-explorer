# Route Catalog Extraction Handoff

Date: 2026-04-28  
Role: scout-agent  
Lane: lane-4  
Queue: ECO-20260428-scout-452  
Packet: .agents/packets/171-route-catalog-extraction.json

## Read

`src/engine/field-requests.ts` is the pressure point. It is 1,646 lines and currently mixes:

- authored route/request data in `FIELD_REQUEST_DEFINITIONS`
- route/request TypeScript shape definitions
- unlock and prerequisite resolution
- active request selection
- Route v2 evidence-slot progression
- process/world-state alternates
- filed-note text synthesis
- notebook filing mutation

That makes route authoring risky because adding or tuning an outing touches the same file as runtime logic. The extraction should make the authoring surface clearer without changing behavior.

## Preferred Boundary

Create a new engine-side catalog module:

- `src/engine/field-request-catalog.ts`

Move only these authoring/data pieces into it:

- `FieldRequestTrigger`
- `RouteV2NoteDefinition`
- `RouteV2ProcessFocus`
- `FieldRequestWorldStateFocus`
- `EvidenceSlotDefinition`
- `TransectStageDefinition`
- the field-request definition interfaces/types
- `FIELD_REQUEST_DEFINITIONS`

Keep these runtime pieces in `src/engine/field-requests.ts`:

- active request resolution
- `hasResolvedFieldRequest(...)`
- evidence slot ordering and matching
- process/world-state active-focus resolution
- `getHandLensNotebookFit(...)`
- `prefersHandLensActiveRouteEntry(...)`
- filed text synthesis
- `advanceActiveFieldRequest(...)`
- `fileReadyRouteV2FieldRequest(...)`

Then import the catalog into `field-requests.ts` and re-export `FIELD_REQUEST_DEFINITIONS` plus the public `FieldRequestDefinition` type from `field-requests.ts` so current imports stay stable. Do not replace `.find(...)` lookups with a map in this pass; the current first-match behavior should remain unchanged.

## Why This Boundary

- The full request array should move together because it includes compatibility requests, surveys, Route v2 outings, High Pass, and Source to Shore in one unlock order. Splitting only Route v2 data would force a merge layer and create more behavior risk.
- Keep the catalog under `src/engine/` for now. These definitions are gameplay-route definitions, not pure biome content, and they depend on engine route semantics such as `completionTriggers`, `routeV2Note`, `processFocus`, and `worldStateFocus`.
- Do not move Source to Shore display state in this packet. Packet `170` owns behavior consolidation first; packet `171` should only make authoring data easier to find after that behavior is stable.

## Implementation Contract

Wait for `ECO-20260428-critic-451` to approve the route-flow consolidation before implementing `ECO-20260428-main-452`. The extraction should then:

- Be a move/re-export refactor, not a semantic rewrite.
- Preserve all route ids, evidence ids, `slotOrder` arrays, `unlockAfter` chains, route titles, note text, process/world-state alternates, and completion triggers.
- Keep the exported `FIELD_REQUEST_DEFINITIONS` available from `src/engine/field-requests.ts` for existing tests and callers.
- Update `docs/architecture.md` and `docs/content-authoring.md` only to point authors to the new catalog boundary.
- Avoid adding route constants, generated indexes, new route types, save fields, planner UI, or support mechanics in this pass.

## Parity Tests

Run these after runtime edits:

- `npm test -- --run src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts -t "Source to Shore|High Pass|route-marker|debug save snapshots|copy budget"`
- `npm run build`

If the import move touches more callers than expected, add `src/test/save.test.ts` to confirm saved `routeV2Progress` normalization remains independent of the catalog.
