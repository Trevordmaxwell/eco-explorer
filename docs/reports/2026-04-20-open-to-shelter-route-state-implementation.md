# Open To Shelter Route State Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-433`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-4`

## Summary

Added a behavior-neutral `Open To Shelter` route-state guard beside the existing `Shore Shelter` marker/replay test. The new proof covers the route-marker split that triggered packet `156`: an active outing may show `Today: Open To Shelter` and the Coastal Scrub map marker when `route-marker` support is selected, but the ready-to-file state clears active outing, marker, and replay pressure so the player follows the station filing task.

## Coverage

- Active `coastal-shelter-shift` with `route-marker` selected exposes the Coastal Scrub route marker and `Today: Open To Shelter` world-map label.
- Ready-to-file `coastal-shelter-shift` keeps `Return to the field station and file the Open To Shelter note.` plus `Ready To File` journal state.
- Ready-to-file `coastal-shelter-shift` clears `activeOuting`, `routeMarkerLocationId`, and `routeReplayLabel`.
- Filing the note still advances the route chain to `coastal-edge-moisture`.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Open To Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
```
