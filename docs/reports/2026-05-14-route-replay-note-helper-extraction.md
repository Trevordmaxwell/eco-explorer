# Route Replay-Note Helper Extraction

Date: 2026-05-14
Role: main-agent
Lane: lane-1
Queue: `ECO-20260514-main-06`
Packet: `.agents/packets/192-director-playability-sprint.json`

## Summary

Extracted route replay-note resolution out of `src/engine/field-season-board.ts` into `src/engine/field-season-replay-notes.ts`.

The field-season board still assembles route boards, applies notebook-ready state, and owns station-facing board state. The new helper owns route replay-note selection and active-beat decoration, including the existing dawn/weather/process/nursery variants for Coastal Shelter Line, Treeline Shelter Line, and Edge Pattern Line.

## Source To Shore Boundary

Filed Source to Shore remains terminal:

- `source-to-shore-beta` returns no replay note from the helper.
- Filed `Dune Catch` stays complete with `targetBiomeId: null`, `activeBeatId: null`, and `replayNote: null`.
- No route id, evidence slot, fourth beat, route marker target, save field, station page, content, world-map behavior, or geometry changed.

## Files Changed

- `src/engine/field-season-replay-notes.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "replay|Source to Shore|Dune Catch|route-marker|filed"`
- `npm run build`

## Handoff

Promote `ECO-20260514-main-07`. It should proof filed Source to Shore revisit memories through existing quiet memory seams and avoid reopening active routes, route markers, a fourth beat, save state, planner UI, or new route types.
