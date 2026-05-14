# Route-Local Replay Variants Implementation

Date: 2026-04-28
Owner: lane-4 main-agent
Queue item: `ECO-20260428-main-485`
Packet: `.agents/packets/179-lane-4-route-feel-runway.json`

## Summary

Implemented one active-only Source to Shore replay variant for the third beat. Active `Dune Catch` now reframes as `Held Dune` when Coastal Scrub's existing `sand-capture` process window is live.

## Runtime Shape

- `src/engine/field-request-catalog.ts` adds `processFocus` to `source-to-shore-dune-catch` using the existing `sand-capture` process moment.
- `src/engine/source-to-shore-state.ts` mirrors that active title and copy on Source to Shore station, atlas, active outing, and world-map surfaces.
- Ready-to-file and filed states stay canonical as `Dune Catch`.

## Guardrails Held

- No new replay system, planner, save schema, station shell, route framework, content pack, geometry, support behavior, route id, evidence id, slot-order change, filed-title change, or fourth Source to Shore beat.
- `SOURCE_TO_SHORE_BEAT_FLOW` remains the same three-beat route.

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "route variants|Dune Catch|Source to Shore"`
- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch|Held Dune"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "Source to Shore|Dune Catch|route-marker|support notice"`
- `npm run build`

## Handoff

Review should check that `Held Dune` stays active-only, that ready/filed Dune Catch identity remains canonical, and that the implementation did not drift into a broader replay framework.
