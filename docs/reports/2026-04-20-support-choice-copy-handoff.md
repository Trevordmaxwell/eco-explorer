# Support Choice Copy Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-351`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Lane: `lane-2`

## Recommendation

Keep lane 2's packet `136` pass to the support-toggle notice copy only.

The station row labels are already compact enough:

- `HAND LENS`
- `NOTE TABS`
- `PLACE TAB`
- `ROUTE MARKER`

The weak spot is `getOutingSupportNoticeText(...)` in `src/engine/field-request-controller.ts`, where the toggle notices are full explanatory sentences. Shorten those four notices to five words or fewer so kids can understand the support choice while staying in motion.

## Proposed Copy

- `hand-lens`: `Tags notebook-fit clues.`
- `note-tabs`: `Keeps notebook aim visible.`
- `place-tab`: `Keeps one place question.`
- `route-marker`: `Marks next map stop.`

## Main-Agent Scope

Recommended implementation for `ECO-20260420-main-351`:

- Update only `getOutingSupportNoticeText(...)` in `src/engine/field-request-controller.ts`.
- Update the existing `returns the support notice copy from one helper seam` test in `src/test/field-request-controller.test.ts`.
- Add a small word-count assertion in that same test that every support notice is five words or fewer.
- Add `docs/reports/2026-04-20-support-choice-copy-implementation.md`.

## Non-Goals

- Do not change support selection order, save normalization, route-marker world-map behavior, hand-lens retargeting, note-tabs/place-tab route text behavior, inspect-bubble `LENS CLUE`, or the `NOTEBOOK J` chip.
- Do not edit station layout, route-board layout, world-map/corridor behavior, save schema, renderer geometry, or route definitions.
- Do not add a new support UI, inventory row, tutorial panel, or loadout model.

## Shared-File Note

`src/engine/field-request-controller.ts` is normally lane 4's route/support behavior seam. This lane-2 pass should touch only the pure copy helper and the exact-copy test around it. Any behavior change belongs to lane 4.

## Verification Target

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
