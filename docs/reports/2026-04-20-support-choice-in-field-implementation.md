# Support Choice In-Field Differentiation Implementation

Date: 2026-04-20
Queue item: `ECO-20260420-main-353`
Lane: `lane-4`
Owner: `main-agent`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`

## Summary

Reused the existing in-field `NOTEBOOK J` hint chip as the tiny support-specific cue seam for active Route v2 outings. Hand lens still owns inspect retargeting, active-clue preference, and `LENS CLUE` inspect-bubble copy. `note-tabs` now turns the chip toward current route progress, while `place-tab` uses the compact `Place Question` chip cue. `route-marker` remains map/travel-facing and keeps the default route-title chip.

## Files Touched

- `src/engine/field-request-controller.ts`
- `src/test/field-request-controller.test.ts`
- `src/test/runtime-smoke.test.ts`

## Behavior

- Added the resolved `selectedSupportId` to `FieldRequestControllerState` so hint rendering can branch without adding a new support model, save field, loadout, HUD, route definition, or station surface.
- Preserved the existing hand-lens retarget-first path: when hand lens retargets or prefers an active clue, the chip remains support-biased and route-title-facing.
- For active Route v2 outings with `note-tabs`, the in-field chip now displays the active request progress label such as `0/3 clues`, `1/3 clues`, or `2/3 stages`.
- For active Route v2 outings with `place-tab`, the in-field chip now displays `Place Question` with the existing support-biased styling.
- Left `route-marker` on the default chip behavior and proved it does not gain notebook-fit context, inspect retargeting, or support-biased chip behavior.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "keeps non-hand-lens supports"`
- `npm run build`

`npm run validate:agents` and `git diff --check` are still required after the packet and queue updates for this item.
