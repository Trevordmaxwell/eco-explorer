# Runtime Smoke Navigation Proof Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-430`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-1`

## Review Result

No blocker found.

The implementation is correctly test-only and keeps lane 1's current guided world-map focus rule intact. It updates stale runtime-smoke assertions so the tests now distinguish fresh starter menu defaults, current-biome guided targets, explicit world-map selection, ready-to-synthesize replay-label suppression, and focused route replay footer behavior.

During review, an isolated proof rerun exposed two additional stale exact filed-route copy expectations for the existing shortened Shore Shelter / Open To Shelter runtime text. Those were refreshed in `src/test/runtime-smoke.test.ts` only. The High Pass rime-footing copy mismatch remains intentionally untouched for lane 2/content-copy ownership.

## Checks

- No runtime code, route/controller helpers, save schema, station layout, map UI, support behavior, geometry, science content, or tooling changed for this review.
- Fresh/current-biome starter menus still prove `field-guide` as the default, with world-map tests selecting `world-map` explicitly.
- Later Forest Trail map-focus fixtures now use coherent starter progress so the guided target matches the current biome when the test is about same-biome map anchoring.
- `Open To Shelter` ready-to-file map state now expects `routeReplayLabel: null`, matching active-outing suppression.
- The replay-footer proof starts from the current guided Coastal Scrub focus and moves to Forest Trail before expecting `Today: Moist Edge`.

## Verification

Passed:
```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter"
npm test -- --run src/test/runtime-smoke.test.ts -t "Shore Shelter|Wrack Shelter|Open To Shelter|covers title|surfaces surveyed|routes page|world-map field station|live replay note|same-biome anchor|current origin"
npm run build
```

Attempted:
```bash
npm test -- --run src/test/runtime-smoke.test.ts
```

The full runtime-smoke file now fails only on the known lane-2 High Pass rime-footing exact-copy expectation.

## Follow-Up

Packet `156` lane 1 is clear. No lane-1 follow-up is needed from this review.
