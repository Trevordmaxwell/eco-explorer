# Route Feedback Batch One Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-429`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-4`

## Finding

Packet `155` is a feedback-stabilization pass, not a feature-growth pass. Lane 1 already fixed the adjacent first-session menu-focus issue, so lane 4 should avoid retouching `game.ts` or broad runtime smoke expectations. The lane-4 seam most exposed to that feedback is the first route's own ready-to-file contract: once `Shore Shelter` reaches notebook-ready, the route loop must give an explicit station filing cue while suppressing route-marker and world-map replay pressure until the note is filed.

Existing coverage already proves the ordered `Shore Shelter` transect and the ready copy inside `resolveActiveFieldRequest(...)`. Existing High Pass coverage proves ready-to-file suppression for the late alpha endpoint. What is still worth making explicit for feedback batch one is the first-session version of the same route-state contract: fresh opener active state shows `Today: Shore Shelter`, but ready-to-file `Shore Shelter` keeps only the notebook filing task and clears active outing, route marker, and replay label.

## Main Scope

Recommended file:

- `src/test/field-requests.test.ts`

Recommended implementation:

- Add a focused behavior-neutral test next to the existing route-marker / replay state coverage.
- Seed a fresh beach `Shore Shelter` active state with `route-marker` selected and assert the world-map-facing route label can appear while the outing is active.
- Seed the same request as `ready-to-synthesize` and assert the player-facing summary remains `Use M -> Field station, then Enter to file the Shore Shelter note.`
- In the ready-to-file state, assert `activeOuting`, `routeMarkerLocationId`, and `routeReplayLabel` are all `null` while `journalFieldRequest` still exposes the `Ready To File` task.
- File the note and assert the next route moves to `forest-hidden-hollow`, without changing route definitions or station behavior.

## Non-Goals

- Do not change first-session menu focus; lane 1 already handled that in packet `155`.
- Do not edit `src/engine/game.ts`, station pages, world-map rendering, guided-season copy, save schema, route definitions, science content, or geometry.
- Do not use `src/test/runtime-smoke.test.ts` unless a real regression is found; that file is already noisy and shared across lanes.
- Do not add a tutorial panel, route HUD, new support option, or replay framework.

## Suggested Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Shore Shelter|route-marker|replay"
npm run validate:agents
node -e "JSON.parse(require('fs').readFileSync('.agents/packets/155-external-playtest-feedback-batch-one.json','utf8')); console.log('packet 155 ok')"
git diff --check
```

If the focused test name differs after implementation, run the exact focused `field-requests` slice that covers the new `Shore Shelter` route-state guard.
