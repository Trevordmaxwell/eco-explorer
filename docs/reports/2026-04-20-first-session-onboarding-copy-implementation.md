# First-Session Onboarding Copy Implementation

Created: 2026-04-20

Queue item: `ECO-20260420-main-335`

## Summary

Tightened the first-session copy so the title, menu, starter notice, first `Shore Shelter` route, and ready-to-file cue read as one compact loop: `J` opens the notebook, `M` opens map/station travel choices, and `Enter` chooses or files.

## Changes

- `src/engine/overlay-render.ts` now names `M` directly in the title hint and uses menu copy that pairs world-map travel with field-station filing/support.
- `src/engine/guided-field-season.ts` now makes the fresh-save `FIRST FIELD SEASON` line teach `J` and `M`, while the `NOTEBOOK TASK` line uses physical clue language before log/file language.
- `src/engine/field-requests.ts` keeps `beach-shore-shelter` behavior unchanged but replaces token-like first-route wording with kid-readable clue language and a ready-to-file line that points through `M -> Field station -> Enter`.
- `src/engine/field-season-board.ts` aligns the first `Shore Shelter` board detail with the revised clue wording.
- Exact-copy tests were updated for the changed title/menu/guided-season/field-request/runtime expectations.

## Verification

- `npx vitest run src/test/overlay-copy.test.ts src/test/guided-field-season.test.ts src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "first-session|guided field season|Shore Shelter|first field season"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

`npm run validate:agents` passed with the existing queue-size warning only.

## Non-Goals Preserved

- No menu selection default, action availability, route progression, station state, save schema, world-map behavior, tutorial panel, overlay, geometry, or science fact changes.

## Handoff

Promote `ECO-20260420-critic-335` to review the copy budget, handheld readability, and lane-boundary discipline.
