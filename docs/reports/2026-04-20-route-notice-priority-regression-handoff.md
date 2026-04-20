# Route Notice Priority Regression Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-409`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-4`

## Finding

Lane 1 already extracted guided field-season notice policy into `src/engine/field-notices.ts`, and the focused runtime smoke still passes. Lane 4 does not need another `game.ts` extraction here.

The remaining lane-4 value is a small route-loop regression test that ties the extracted guided-notice seam to the existing route filing/support priority seam:

- `canShowGuidedFieldSeasonNotice(...)` should not allow guided `FIELD STATION` / `SEASON THREADS` notices to replace route-critical `notebook-ready` or `filed-route` notices.
- `shouldReplaceFieldNotice(...)` should still block station support/default toasts from replacing `notebook-ready` or `filed-route` while the station overlay is open.
- `shouldReplaceFieldNotice(...)` should still allow `filed-route` to replace `notebook-ready` when the route is filed.

Existing tests cover these pieces separately. The main follow-up should add one focused matrix-style regression so future controller extraction work cannot accidentally loosen the route-critical priority rule while touching notice helpers.

## Recommended Main Scope

- Add one focused test in `src/test/field-notices.test.ts` that treats `notebook-ready` and `filed-route` as route-critical notices across both extracted helper seams.
- Cover guided notice blocking via `canShowGuidedFieldSeasonNotice(...)` for at least one guided next title.
- Cover station default/support blocking and filed-over-ready replacement via `shouldReplaceFieldNotice(...)`.
- Keep this test-only unless the new test reveals an actual helper bug.

## Non-Goals

- No `game.ts`, controller extraction, runtime behavior, notice copy, notice durations, route definitions, support behavior, save schema, station layout/state, overlay rendering, authored science/content, biome geometry, or new framework changes.
- Do not add a broad runtime-smoke scenario unless the focused helper regression exposes behavior drift.

## Suggested Verification

- `npm test -- --run src/test/field-notices.test.ts -t "route-critical|guided|station support|filed-route"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Baseline

- Passed: `npm test -- --run src/test/field-notices.test.ts src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone|station support|guided notices|filed-route"`
