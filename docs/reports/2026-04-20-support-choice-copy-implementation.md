# Support Choice Copy Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-351`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Lane: `lane-2`

## What Changed

- Shortened the four `getOutingSupportNoticeText(...)` messages:
  - `hand-lens`: `Tags notebook-fit clues.`
  - `note-tabs`: `Keeps notebook aim visible.`
  - `place-tab`: `Keeps one place question.`
  - `route-marker`: `Marks next map stop.`
- Updated the existing controller test to lock exact notice copy and require every notice to stay at five words or fewer.

## Scope Kept Tight

- No support selection order, save normalization, route-marker map behavior, hand-lens retargeting, note-tabs/place-tab route behavior, inspect-bubble `LENS CLUE`, or `NOTEBOOK J` chip behavior changed.
- No station layout, route-board layout, world-map/corridor behavior, save schema, renderer geometry, route definitions, new support UI, inventory row, tutorial panel, or loadout model changed.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Outcome

Support toggles now give kids one short cue per choice, making the choice easier to understand without moving any route/support behavior out of lane 4.
