# 2026-04-03 Front-Half Comparison Implementation

Implemented `ECO-20260403-main-201` in lane 2.

## What Landed

- Expanded the journal comparison allowlist in `src/engine/journal-comparison.ts` with exactly two new front-half entries:
  - `beach-pea`
  - `beach-strawberry`
- Added focused resolver coverage in `src/test/journal-comparison.test.ts` for both new beach-to-scrub pairs.
- Added one runtime smoke regression in `src/test/runtime-smoke.test.ts` proving `beach-pea` opens the same comparison pane with the expected note-backed cards.

## Comparison Set Added

- `beach-pea`
  - beach: `Low Runner Band`
  - coastal scrub: `Runner Hold`
- `beach-strawberry`
  - beach: `Lee Pocket Hold`
  - coastal scrub: `Swale Shelter`

## Why This Shape

- The pass stayed inside the scout-approved second wave and did not widen the comparison allowlist beyond the two stable front-half entries.
- Both additions are built from already-authored ecosystem notes, so the journal still teaches habitat contrast through note-backed cards instead of repeating fact text or inventing a new surface.
- `dune-lupine` stayed deferred because its scrub-side note path can shift with local discovery state, which would make the comparison less stable than the two landed entries.

## Verification

- `npm test -- --run src/test/journal-comparison.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "comparison"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260403-main-201`.
- Promote `ECO-20260403-critic-174` to `READY`.
