# Close-Look Route Support Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-393`
Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
Lane: `lane-4`

## Scout Verdict

Implementation-ready as a small route-context proof. Lane 2 already added close-look cards for the two selected carriers, and lane 4 should not add a new support mode, route requirement, station surface, or route framework for packet `146`.

The best lane-4 main pass is test-only unless a focused proof reveals an existing bug: prove the selected close-look carriers remain optional route context after the normal inspect already claims the route evidence.

## Findings

- `shore-pine` is already the `pine-cover` evidence carrier for `coastal-shelter-shift` / `Open To Shelter`.
- `root-curtain` is already the `root-held` evidence carrier for `forest-expedition-upper-run` / `Root Hollow`.
- Inspecting either carrier should keep doing the route work immediately through the existing `inspect` trigger.
- Opening the close-look card from the resulting bubble should be an optional second action, not a second route requirement.
- Existing close-look unit coverage proves the cards exist, but current route smoke coverage does not yet assert that those selected cards stay optional inside the route loop.

## Recommended Main Scope

- Add focused regression coverage in `src/test/runtime-smoke.test.ts` by extending the existing `Open To Shelter` and `Root Hollow` route smoke flows.
- After inspecting `shore-pine`, assert the bubble has `closeLookAvailable: true`, route progress already contains `{ slotId: 'pine-cover', entryId: 'shore-pine' }`, opening/closing close-look shows the `shore-pine` payload, and route progress remains unchanged.
- After inspecting `root-curtain`, assert the bubble has `closeLookAvailable: true`, route progress already contains `{ slotId: 'root-held', entryId: 'root-curtain' }`, opening/closing close-look shows the `root-curtain` payload, and route progress remains unchanged.
- Keep implementation behavior-neutral unless the proof exposes a real bug.

## Guardrails

- Do not add route gates that require opening close-look or sketchbook.
- Do not add new station pages, support ids, route frameworks, save fields, world-map cues, geometry, or broad copy rewrites.
- Do not edit lane-2 selected-carrier copy or close-look seeds except to fix a proven regression.
- Avoid creating new long runtime flows if the two existing route smoke tests can be extended in place.

## Suggested Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`
- `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Scout Verification

- `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`
