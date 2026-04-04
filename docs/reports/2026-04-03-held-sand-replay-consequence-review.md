# 2026-04-03 Held Sand Replay-Consequence Review

Review report for `ECO-20260403-critic-248`.

## Result

No blocking issues found.

## What Holds Up

- `Held Sand` now behaves like a true replay consequence instead of a board-only flavor note: the active request, enter-biome notice, board summary, and `TODAY` wrap all align on the same compact line.
- The pass stays shell-safe. It does not add a new route type, support row, replay tracker, or filing surface, and it keeps notebook-ready plus filed states canonically `Scrub Pattern`.
- The ecology fit is good enough to feel meaningful. `sand-capture` overlaps the first two live `Scrub Pattern` legs directly, so the replay window now changes how the route is read without pretending the route became a different outing system.

## Watch Item

- If a later coastal replay pass wants to promote `Haze Edge` or `Pioneer Clue` beyond the board, add an explicit single-variant selection seam instead of stacking multiple simultaneous request-side variants onto `scrub-edge-pattern`.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|Bright Survey|Wrack Shelter|Thaw Window"`

## Next Step

- Promote `ECO-20260403-scout-249` to `READY`.
