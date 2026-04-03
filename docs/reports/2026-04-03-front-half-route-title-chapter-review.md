# 2026-04-03 Front-Half Route-Title Chapter Review

Review for `ECO-20260403-critic-178`.

## Scope

- `docs/reports/2026-04-03-front-half-route-title-chapter-implementation.md`
- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Finding

### 1. Front-half board summary stalls on `Hidden Hollow` after the active forest beat advances

Blocking issue.

`resolveCoastalFieldSeasonBoardState()` only advances the front-half summary and next-direction from the beach opener to the inland phase based on whether the grouped forest beat is fully done. That means once `forest-hidden-hollow` is complete, `getForestStudyBeat()` correctly switches the active beat title to `Moisture Holders`, and after `forest-moisture-holders` it switches again to `Forest Survey`, but the supporting copy can still read `Shore Shelter logged. Hidden Hollow carries shelter inland.` and `Next: travel inland to Forest Trail and find Hidden Hollow.` on the same card.

Relevant lines:

- `src/engine/field-season-board.ts:310-340`
- `src/engine/field-season-board.ts:859-862`

Why it matters:

- The route-title spread is supposed to strengthen place memory, but this leaves the board naming two different steps at once.
- Kids following the active title could get contradicted by the summary and direction line directly underneath it.
- The current tests only assert the title progression after `forest-hidden-hollow`; they do not assert the summary or direction at that state, so the mismatch slips through.

Recommended fix:

- Split the front-half summary and next-direction progression so they advance with `Hidden Hollow`, `Moisture Holders`, and `Forest Survey` instead of staying frozen on the first inland line until the whole grouped forest beat is done.
- Extend `field-season-board.test.ts` to assert the supporting copy after `forest-hidden-hollow` and after `forest-moisture-holders`.

## Outcome

- Keep `ECO-20260403-scout-168` blocked.
- Queue a narrow repair pass before the filing-depth follow-on continues.
