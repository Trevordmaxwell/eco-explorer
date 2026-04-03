# 2026-04-03 Beach Route V2 Implementation

Implementation report for `ECO-20260403-main-195`.

## Scope

Turn the opening front-half route into one dedicated beach Route v2 outing, `Shore Shelter`, using the existing `dune-edge -> lee-pocket -> tide-line` walk and the live notebook-return seam without adding a new station shell or support row.

## What Landed

- `src/engine/field-requests.ts` now opens the full route ladder with `beach-shore-shelter`, a `transect-evidence` outing that logs `dune-grass`, then `lee-cover`, then `wrack-line` from `Sunny Beach`.
- `forest-hidden-hollow` now unlocks after that beach outing instead of leading the whole Route v2 stack directly.
- The Route v2 runtime now treats a persisted later active note as resolving any newly inserted earlier prerequisite, so older in-progress saves keep their current note instead of snapping back to the new beach opener.
- `src/engine/field-season-board.ts` now points the first coastal-shelter beat at the beach first: the opening beat title/details, summary, next-direction copy, notebook-ready beat mapping, and dawn replay note all line up with `Shore Shelter` before the inland hollow leg begins.

## Test Coverage

Updated:

- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/content-quality.test.ts`

The new coverage locks:

- beach-first active route selection and travel-facing labels
- ordered `dune-edge -> lee-pocket -> tide-line` stage gating
- older in-progress Route v2 save continuity after the new opener was inserted
- the live start-to-station beach filing loop
- first-beat season-board copy and support-wrap behavior

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Shore Shelter|Hidden Hollow notebook-ready|files a notebook-ready route from the routes page with one Enter press"`
- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npm run build`
- `npm run validate:agents`

## Handoff Note

`critic-168` should confirm that the beach opener now feels like a calm mini-adventure at handheld scale, that the season-board beat still reads coherently as one beach-to-forest chapter, and that the compatibility rule for older in-progress Route v2 saves does not create misleading route ordering.
