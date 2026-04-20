# Route Notice Priority Regression Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-409`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-4`

## Changes

- Added one focused `field-notices` regression that treats `notebook-ready` and `filed-route` as route-critical notices across both `canShowGuidedFieldSeasonNotice(...)` and `shouldReplaceFieldNotice(...)`.
- Confirmed guided `FIELD STATION` / `SEASON THREADS` notices cannot replace route-critical route filing notices through the extracted guided-notice helper.
- Confirmed station support/default toasts still cannot replace `notebook-ready` or `filed-route` while the field-station overlay is open.
- Confirmed a `filed-route` notice can still replace `notebook-ready` when the route is filed.

## Scope Notes

- Test-only for runtime behavior.
- No `game.ts`, controller extraction, runtime behavior, notice copy, notice duration, route definition, support behavior, save schema, station layout/state, overlay rendering, authored science/content, biome geometry, new framework, or broad runtime-smoke changes.

## Verification

- Passed: `npm test -- --run src/test/field-notices.test.ts -t "route-critical|guided|station support|filed-route"`
- Passed: `npm run build`
- Passed: `npm run validate:agents` with the known work-queue-size warning
- Passed: `git diff --check`
