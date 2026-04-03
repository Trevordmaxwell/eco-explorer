# 2026-04-02 Treeline Shelter Route V2 Review

Review for `ECO-20260402-critic-125` covering `ECO-20260402-main-152`.

## Result

No blocking issue.

## What Reads Well

- `treeline-stone-shelter` now feels like a real mini-chapter instead of another three-clue inland checklist. Starting on `bent-cover` and finishing on `lee-life` gives the route a clearer place-reading arc.
- The implementation stayed inside the intended lane-4 seam. It reused ordered `assemble-evidence`, the existing notebook-ready filing step, and the current inland board instead of introducing another route type or station shell.
- The board, active request, and clue-backed filed note now all teach the same sheltered order, so the player-facing language stays truthful from departure through return.
- The lighter compatibility choice is appropriate here. Older partial saves still recover through first-missing-slot guidance, and the route keeps generic `x/3 clues` progress labels, so there is no misleading stage-specific save state to normalize.

## Non-Blocking Watch Item

Future ordered `assemble-evidence` routes should keep using this lighter pattern only while the generic clue-count label remains truthful.

`treeline-stone-shelter` is safe because its order is mostly taught through the board and hand-lens fit copy, not through a stage-specific progress label or zone-return string. If a later ordered route wants more explicit stage-by-stage UI, that route may need stronger zone guidance or a save-normalization pass instead of assuming this same lightweight compatibility path still holds.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker"`
- `npx vitest run src/test/content-quality.test.ts`
- `npm run build`
