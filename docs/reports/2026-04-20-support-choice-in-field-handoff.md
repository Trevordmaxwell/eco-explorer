# Support Choice In-Field Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-353`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Lane: `lane-4`

## Scout Finding

Packet `136` already has strong lane-1 and lane-2 support-choice groundwork:

- Lane 1 centralized station-facing support labels in `src/engine/outing-support.ts`.
- Lane 2 tightened support-toggle notice copy in `getOutingSupportNoticeText(...)`.
- Hand lens already has real in-field behavior through `resolveInspectTargetSelection(...)`: it can prefer notebook-fit or active-clue inspectables and mark the `NOTEBOOK J` chip as `support-biased`.

The remaining lane-4 gap is that `note-tabs` and `place-tab` are mostly felt on the station `TODAY` wrap, not during the outing itself. The safest next step is to reuse the existing top-right `FieldRequestHintState` / `NOTEBOOK J` chip as the in-field support feedback seam, rather than adding a new HUD, loadout row, route framework, or inspect retargeting rule.

## Recommended Main Target

Add one small support-aware hint helper in `src/engine/field-request-controller.ts` that can alter the existing in-field notebook chip for non-hand-lens supports while leaving target selection untouched.

Recommended behavior:

- Preserve current hand-lens behavior exactly: it remains the only support that changes nearest-inspect target selection or inspect-bubble `LENS CLUE` copy.
- Let `note-tabs` make the existing chip more notebook-progress-facing during active Route v2 outings, preferably by showing the active request `progressLabel` in the chip title and using the existing `support-biased` variant.
- Let `place-tab` make the existing chip place-question-facing during active Route v2 outings, preferably with a short title such as `PLACE QUESTION` and the existing `support-biased` variant.
- Keep `route-marker` map/travel-facing for this pass; prove it does not gain inspect retargeting or notebook-chip behavior by accident.

This should make at least three support choices feel distinct in play without new UI:

- `hand-lens`: clue targeting plus stronger inspect-bubble cue
- `note-tabs`: in-field progress/notebook chip
- `place-tab`: in-field place-question chip

## Recommended Files

- `src/engine/field-request-controller.ts`
- `src/engine/field-request-state.ts` only if the `FieldRequestHintState` type needs a tiny extension
- `src/test/field-request-controller.test.ts`
- `src/test/runtime-smoke.test.ts` only for one representative debug-state smoke if unit coverage is not enough
- `docs/reports/2026-04-20-support-choice-in-field-implementation.md`

Avoid editing:

- station page layout or support row layout
- support toggle order or save schema
- route definitions, route filing, route-marker map behavior, world geometry, authored science/copy, nursery behavior, or new UI surfaces

## Acceptance For Main

- `hand-lens` controller tests still prove notebook-fit retargeting and `LENS CLUE` behavior while non-hand-lens supports do not retarget inspectables.
- `note-tabs` gets a focused in-field chip regression on an active Route v2 request, using existing active-request progress state instead of new route copy.
- `place-tab` gets a focused in-field chip regression on an active Route v2 request, using a compact place-question cue instead of new long prompt copy.
- `route-marker` stays map/travel-facing and does not acquire hand-lens-style inspect behavior.
- no station layout, support order, save schema, route definitions, route filing behavior, world geometry, authored science/copy, nursery behavior, new HUD, inventory, or loadout model changes.

## Verification For Main

- `npm test -- --run src/test/field-request-controller.test.ts`
- focused `runtime-smoke` slice only if `render_game_to_text()` chip state is changed beyond controller-level unit coverage
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Baseline Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/field-season-board.test.ts -t "support|note-tabs|place-tab|hand lens|route marker"`
