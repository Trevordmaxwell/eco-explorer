# Runtime Smoke Navigation Proof Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-430`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-1`

## Finding

Packet `156` asks lane 1 to resolve repeated systems/navigation observations. The repeated lane-1 pattern is not another runtime behavior gap; it is proof drift in `src/test/runtime-smoke.test.ts`.

The current dirty tree repeatedly reports broad runtime-smoke failures around older world-map expectations. Several tests still assume the old current-location fallback, but lane 1 has already moved to the guided active-target rule: route-marker support wins first, then guided/active outing focus can move the map to the next authored target. One ready-to-file route smoke also still expects a replay footer even though recent lane-1 route-marker work intentionally suppresses active outing / replay labels once a route is ready to synthesize.

There is also one unrelated High Pass rime-footing exact-copy mismatch in the full runtime-smoke file. That belongs to lane 2/content-copy ownership and should not be rolled into this lane-1 proof pass.

## Main Scope

Recommended file:
- `src/test/runtime-smoke.test.ts`

Recommended implementation:
- Update only stale lane-1 runtime-smoke expectations around world-map focus and replay label behavior.
- Where a test wants to open the world map from a fresh/current-biome starter state after packet `155`, explicitly select `world-map` instead of relying on the menu default now being `field-guide`.
- Align old current-location focus assertions to the current guided active-target rule where the seeded save already has a live next outing target.
- Update the ready-to-file `Open To Shelter` map assertion to expect no `routeReplayLabel`, matching the ready-to-synthesize active-outing suppression already used by other route-marker tests.
- Leave the High Pass rime-footing copy mismatch untouched for lane 2.

## Non-Goals

- Do not change runtime behavior in `src/engine/game.ts` or route/controller helpers.
- Do not change guided-season copy, route definitions, station layout, save schema, map UI, support behavior, geometry, science content, or review-drop tooling.
- Do not use this pass to make the entire broad runtime-smoke file green by changing lane-2 copy expectations.

## Baseline

The current broad runtime-smoke file fails on repeated lane-1 stale map/replay expectations plus one unrelated High Pass rime-footing exact-copy mismatch:
`npm test -- --run src/test/runtime-smoke.test.ts`

## Acceptance For Main

- The lane-1-owned stale world-map focus / ready-to-file replay expectations in `src/test/runtime-smoke.test.ts` are refreshed without runtime behavior changes.
- Focused slices for the touched tests pass.
- `npm run build`, `npm run validate:agents`, and `git diff --check` pass.
- If the broad runtime-smoke file is attempted and still fails only on the High Pass rime-footing copy mismatch, document that lane-2 ownership clearly instead of widening this item.
