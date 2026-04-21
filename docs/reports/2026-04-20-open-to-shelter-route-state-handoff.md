# Open To Shelter Route State Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-433`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-4`

## Finding

Packet `156` asks lane 4 to handle repeated route/support/filing confusion without opening a new quest shell. Lane 1 already refreshed the stale `runtime-smoke` navigation proof, including the `Open To Shelter` ready-to-file map assertion that now expects no `routeReplayLabel`. Lane 4 should not retouch that runtime-smoke path. The useful lane-4 follow-up is to protect the same rule at the smaller route-state seam.

The repeated pattern is now concrete: active outings may surface route-marker and world-map replay labels, but once a Route v2 note is ready to file, active outing pressure should drop away so the player follows the station filing task. `Shore Shelter` and High Pass now have explicit `field-requests` guards for that split. `Open To Shelter` is the front-half route that triggered the packet `156` stale replay expectation, so it should get the same behavior-neutral guard.

## Main Scope

Recommended file:

- `src/test/field-requests.test.ts`

Recommended implementation:

- Add a focused behavior-neutral test near the existing route-marker/replay state coverage.
- Seed `coastal-shelter-shift` active with prior prerequisites complete, `route-marker` purchased, and `route-marker` selected; assert the Coastal Scrub route marker and `Today: Open To Shelter` world-map label can appear while active.
- Seed the same route as `ready-to-synthesize` with `open-bloom`, `pine-cover`, and `edge-log` evidence; assert the ready summary remains `Return to the field station and file the Open To Shelter note.` and the journal task remains `Ready To File`.
- In the ready-to-file state, assert `activeOuting`, `routeMarkerLocationId`, and `routeReplayLabel` are `null`.
- File the note and assert completion advances into the next coastal follow-up route (`coastal-edge-moisture`), without changing route definitions or runtime behavior.

## Non-Goals

- Do not edit `src/test/runtime-smoke.test.ts`; lane 1 already refreshed that proof for packet `156`.
- Do not change runtime behavior, route definitions, station pages, world-map rendering, guided-season copy, save schema, science content, geometry, support UI, or quest shell structure.
- Do not touch the lane-2 High Pass rime-footing exact-copy mismatch.

## Suggested Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Open To Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
npm run validate:agents
node -e "JSON.parse(require('fs').readFileSync('.agents/packets/156-external-playtest-feedback-batch-two.json','utf8')); console.log('packet 156 ok')"
git diff --check
```
