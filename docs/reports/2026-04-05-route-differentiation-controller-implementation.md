# Route Differentiation Controller Implementation

## Queue Ref

- `ECO-20260405-main-280`

## What Changed

Extracted a small helper seam in [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts) so [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) no longer owns the route-differentiation wrapper cluster directly.

The new helper now owns:

- route-state projection from `resolveFieldRequestState(...)`
- hand-lens notebook-fit gating
- outing-support notice copy

`game.ts` now asks that helper for:

- journal and active field-request reads
- route-marker and replay-label values
- hand-lens notebook-fit decisions during inspect targeting
- support notice text when cycling outing support

## Scope Kept Small

- no route logic moved out of `field-requests.ts`
- no station-shell or board-layout changes
- no new planner, HUD, or support slot
- the review-drop note stayed one short `README.md` sentence

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts src/test/field-requests.test.ts`
- `npm test -- --run src/test/field-request-controller.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "opens the world map on the outing target when route marker is already selected|buys route marker after the movement pair and lets the support row activate it on the world map|switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npm run build`
