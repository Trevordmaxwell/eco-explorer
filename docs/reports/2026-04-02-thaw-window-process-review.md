# 2026-04-02 Thaw-Window Process Review

Review for `ECO-20260402-critic-141`.

## Result

No blocking issue.

## What Reads Well

- The new `Thaw Window` pass spends its budget on the right seam: the route board already knew this outing wanted to feel process-backed, and now the active request, season wrap, and enter-biome notice agree with that same cue instead of splitting between generic and replay-only language.
- The implementation keeps the stable lane-4 contract intact. `tundra-short-season` still files as `Short Season`, the saved slot ids do not move, and the clue-backed note path stays canonical once the route is ready to file.
- The copy remains compact and readable for the handheld surface. `Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.` is short enough to fit the tiny strip while still naming the lived clue family.
- The focused tests cover the real regression risk: process activation, filed-note stability, route-board replay alignment, and the runtime path where the player re-enters tundra during the active `thaw-fringe` window.

## Non-Blocking Watch Item

If future process-backed routes keep spreading, keep one shared wording source or helper per live variant family instead of letting the board, wrap, replay notice, and active request drift into near-duplicates. This pass is clean because those surfaces now read like one story; that alignment should stay the ceiling rather than becoming four slightly different process summaries.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to tundra and can hand the outing guide to route marker|shows the thaw-window route replay note when re-entering tundra during the active process window|shows one route replay note when re-entering the active route biome during a live replay window"`
