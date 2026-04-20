# Station Homecoming Route Notice Implementation

Queue: `ECO-20260420-main-345`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `main-agent`
Lane: `lane-4`

## Summary

Implemented the lane-4 route-notice/homecoming handoff for packet `134` by consuming lane 1's reviewed station-owned `arrivalMode: "homecoming"` seam and keeping route notices from competing with station support copy.

The pass adds one small notice-priority seam: earned homecoming station opens clear stale non-filed notices, while filed-route notices stay canonical and cannot be replaced by support-selection copy during the same station interaction.

## Runtime Shape

- `src/engine/field-notices.ts` now exposes `shouldClearFieldNoticeForHomecoming(...)` and `shouldReplaceFieldNotice(...)`.
- `src/engine/game.ts` clears stale non-filed notices when `openFieldStation()` begins an earned homecoming open.
- `showFieldNotice(...)` now refuses to replace a current `filed-route` notice with a non-filed support/default notice while the station overlay is open.
- Support selection remains persisted; only the competing toast replacement is suppressed.

## Guardrails Kept

- No station layout, station shell visual, homecoming copy, route definition, save schema, geometry, broad onboarding copy, or science content changes were made for this lane-4 pass.
- The implementation consumes lane 1's homecoming seam instead of adding route-owned station state.
- Lane 2's reviewed homecoming copy contract was left untouched.

## Verification

- `npm test -- --run src/test/field-notices.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "clears stale station guidance notices"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Notes For Critic

- The stale-homecoming smoke uses the existing `TASK RECORDED` Forest Survey notice because that is the live stale non-filed notice path available after the reviewed lane-1 seam.
- The High Pass smoke proves a filed `treeline-high-pass` notice remains the canonical filed-route notice even after changing outing support in the station.
- A broader runtime-smoke name filter was attempted first and exposed unrelated existing drift in older world-map focus/copy assertions, so the final verification uses the exact focused slices above.
