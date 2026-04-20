# Route Notice Priority Regression Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-409`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-4`

## Verdict

Clean. The implementation adds the intended route-critical notice-priority guard without changing runtime behavior.

## Findings

- The new `keeps route-critical notices ahead of guided and station support defaults` regression ties `notebook-ready` and `filed-route` to both helper seams: guided notice replacement and station support/default replacement.
- Guided `FIELD STATION` / `SEASON THREADS` notices remain unable to replace route-critical notices through `canShowGuidedFieldSeasonNotice(...)`.
- Station support/default toasts remain unable to replace `notebook-ready` or `filed-route` while the field-station overlay is open, while `filed-route` can still replace `notebook-ready` when a route is filed.
- Scope stayed test-only for runtime behavior: no `game.ts`, controller extraction, runtime behavior, notice copy/duration, route definitions, support behavior, save schema, station layout/state, overlay rendering, authored science/content, biome geometry, new framework, or broad runtime-smoke changes.

## Decision

- Packet `150` lane 4 is clear.
- Promote `ECO-20260420-scout-413` so lane 4 can continue into packet `151`.

## Verification

- Passed: `npm test -- --run src/test/field-notices.test.ts -t "route-critical|guided|station support|filed-route"`
- Passed: `npm run build`
- Passed: `npm run validate:agents` with the known work-queue-size warning
- Passed: `git diff --check`
