# Station Homecoming Route Notice Review

Queue: `ECO-20260420-critic-345`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `critic-agent`
Lane: `lane-4`

## Verdict

No blocker.

The lane-4 implementation stays inside the packet `134` notice/replay contract. It consumes lane 1's reviewed station-owned `arrivalMode: "homecoming"` seam, keeps lane 2 homecoming copy untouched, and avoids station layout, shell visuals, route definitions, save schema, geometry, broad onboarding copy, and science-content drift.

## Confirmed

- Earned homecoming opens clear stale non-filed notices through a small pure helper instead of adding route-owned station state.
- Filed-route notices are deliberately preserved and cannot be replaced by non-filed support-selection copy while the station overlay is open.
- Support selection still persists; only the competing support toast replacement is suppressed during the same station interaction.
- The High Pass runtime proof still clears active request, route marker, replay label, and journal field-request state after filing `treeline-high-pass`.
- The implementation report names the unrelated broad runtime-smoke drift and relies on exact focused slices for this lane's acceptance.

## Verification

- `npm test -- --run src/test/field-notices.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "clears stale station guidance notices"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Residual Risk

The helper intentionally preserves current filed-route notices during homecoming opens. That matches this packet's canonical filed-note requirement, but if a later route replay pass creates a truly stale filed-route notice after a separate station return, lane 4 should add a narrow age/source check instead of clearing all filed-route notices.
