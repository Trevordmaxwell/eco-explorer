# Route Feedback Batch One Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-429`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-4`

## Summary

Added a behavior-neutral `Shore Shelter` route-state guard to `src/test/field-requests.test.ts`. The new coverage proves the first Route v2 outing can show the active world-map cue while route-marker support is selected, but once the note is ready to file the route loop keeps the explicit station filing task and clears active outing, route-marker, and replay pressure.

## Details

- Active fresh `Shore Shelter` with `route-marker` selected exposes the active outing, `Today: Shore Shelter`, and the beach route marker.
- Ready-to-file `Shore Shelter` keeps `Use M -> Field station, then Enter to file the Shore Shelter note.` plus a `Ready To File` journal task.
- Ready-to-file `Shore Shelter` now has explicit regression coverage that `activeOuting`, `routeMarkerLocationId`, and `routeReplayLabel` are `null`.
- Filing the ready note still completes `beach-shore-shelter` and advances to `forest-hidden-hollow`.
- No runtime behavior, route definitions, station pages, world-map rendering, guided-season copy, save schema, science content, geometry, or runtime-smoke expectations changed.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Shore Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
```
