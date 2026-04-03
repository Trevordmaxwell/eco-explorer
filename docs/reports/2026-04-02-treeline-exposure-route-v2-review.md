# 2026-04-02 Treeline Exposure Route V2 Review

Review for `ECO-20260402-critic-117` covering `ECO-20260402-main-144`.

## Result

No blocking issue.

## What Reads Well

- `treeline-low-fell` now behaves like a real ordered outing instead of a loose alpine checklist: `mountain-avens` no longer fits first, and the route holds the player to `last-tree-shape -> low-wood -> fell-bloom`.
- The board copy, filed-note wording, and later `HIGH PASS` launch-card detail now all tell the same exposure story, so the route still reads truthfully after it is already logged.
- The implementation stays inside the current lane-4 seams: no new route type, no support-row drift, and no extra station shell was added.

## Non-Blocking Watch Item

Future ordered-route retrofits should keep legacy partial saves in mind.

`treeline-low-fell` is still safe today because the live progress label stays neutral as `N/3 clues`, but lane 4 now has a second ordered `assemble-evidence` route after `ROOT HOLLOW`. If later ordered conversions add more stage-specific partial-progress copy, they should also add scrub-style first-missing-stage guidance or save normalization so old unordered in-progress saves do not drift into misleading stage language.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows a route-logged stop cue in the field station once the live route is complete"`
- `npm run build`
