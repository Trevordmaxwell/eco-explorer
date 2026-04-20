# First-Session Onboarding Copy Review

Created: 2026-04-20

Queue item: `ECO-20260420-critic-335`

## Review Result

No blocker found.

The lane-2 implementation improves the first-session wording without changing menu defaults, route progression, station state, save schema, world-map behavior, tutorial UI, geometry, or science facts. The pass stays within the packet `132` copy budget and makes the early loop easier to read: `J` opens the notebook, `M` opens map/station choices, and `Enter` chooses or files.

## Checks

- The title hint now names `M` directly while the title control rows still teach `J`, `M`, and `Enter`.
- The menu copy now pairs world-map travel with field-station filing/support and keeps `J` tied to the notebook.
- The fresh-save `NOTEBOOK TASK` uses physical clue language instead of asking a new player to understand `log` before the route loop is learned.
- The `Shore Shelter` summary and station-board beat avoid token-like hyphenated clue wording in player-facing copy.
- The first ready-to-file cue explicitly points through `M -> Field station -> Enter`.
- Route evidence slot ids, progression behavior, field-station behavior, and save shape stayed unchanged.

## Verification

- `npx vitest run src/test/overlay-copy.test.ts src/test/guided-field-season.test.ts src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "first-session|guided field season|Shore Shelter|first field season"`
- `npm run build`
- `git diff --check`

## Notes

- Cleaned one indentation-only drift in `src/engine/guided-field-season.ts` during review; no behavior changed.
- The broader worktree includes concurrent lane changes outside this lane, so this review is scoped to the lane-2 packet `132` copy pass.

## Follow-Up

Promote `ECO-20260420-scout-339` for packet `133`; no extra lane-2 follow-up is needed inside packet `132`.
