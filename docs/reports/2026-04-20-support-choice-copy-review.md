# Support Choice Copy Review

Created: 2026-04-20

## Queue Item

- Reviewed: `ECO-20260420-critic-351`
- Implementation: `ECO-20260420-main-351`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Lane: `lane-2`

## Verdict

No blocker.

The support-choice copy pass stayed inside the lane-2 contract. It changed only the existing `getOutingSupportNoticeText(...)` helper and its focused controller test, while leaving support behavior, route targeting, save behavior, station layout, world-map behavior, renderer geometry, route definitions, and new UI surfaces untouched.

## Checks

- `hand-lens`: `Tags notebook-fit clues.`
- `note-tabs`: `Keeps notebook aim visible.`
- `place-tab`: `Keeps one place question.`
- `route-marker`: `Marks next map stop.`

Each cue is five words or fewer and has exact-copy coverage plus a word-budget assertion in `src/test/field-request-controller.test.ts`.

## Handoff

- Promoted `ECO-20260420-scout-355` for packet `137`.
- No follow-up is needed for packet `136` lane 2 unless later support-behavior work changes where these notices appear.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
