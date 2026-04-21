# Open To Shelter Route State Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-433`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-4`

## Verdict

No blocker. The implementation is test-only and directly covers the packet `156` lane-4 contract: active `Open To Shelter` can still surface `route-marker` / world-map replay cues, while ready-to-file `Open To Shelter` suppresses active outing, marker, and replay pressure so the station filing task stays canonical.

## Review Notes

- The new guard lives in `src/test/field-requests.test.ts` beside the existing `Shore Shelter` marker/replay split, which keeps the proof at the route-state seam instead of retouching runtime smoke.
- The ready-to-file assertions cover the exact player-facing filing summary, `Ready To File` journal state, null `activeOuting`, null `routeMarkerLocationId`, and null `routeReplayLabel`.
- Filing still advances to `coastal-edge-moisture`, so the route chain is protected without changing route definitions, save schema, station pages, world-map rendering, guided copy, support UI, science content, geometry, or runtime behavior.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Open To Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
npm run validate:agents
node -e "JSON.parse(require('fs').readFileSync('.agents/packets/156-external-playtest-feedback-batch-two.json','utf8')); console.log('packet 156 ok')"
git diff --check
```

`npm run validate:agents` still reports only the known queue-size warning.
