# 2026-04-02 Thaw-Window Process Implementation

Implementation note for `ECO-20260402-main-168`.

## Summary

`tundra-short-season` now becomes `Thaw Window` during the live peak `thaw-fringe` window, so the active tundra outing finally matches the existing replay cue instead of leaving the process reading only on the route board.

The canonical filing path stays stable:

- the request id is still `tundra-short-season`
- notebook-ready state still points to `Short Season`
- the filed note still resolves through the same clue-backed `Short Season` text

## What Changed

- In `src/engine/field-requests.ts`, `tundra-short-season` now has `processFocus` for `thaw-fringe`, with the active outing title `Thaw Window`.
- In `src/engine/field-season-board.ts`, the tundra replay note text now matches that same route-facing copy so the active beat, season wrap, and enter-biome replay notice tell one shared story.
- In `src/test/field-requests.test.ts`, focused regressions now cover the live `Thaw Window` active outing plus the stable clue-backed filed-note fallback once the route is ready to file.
- In `src/test/field-season-board.test.ts`, the active inland replay-note branch is now locked with an explicit `Thaw Window` expectation.
- In `src/test/runtime-smoke.test.ts`, the end-to-end tundra replay case now proves the route board, active request, and enter-biome replay notice all line up on the same `Thaw Window` wording.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to tundra and can hand the outing guide to route marker|shows the thaw-window route replay note when re-entering tundra during the active process window|shows one route replay note when re-entering the active route biome during a live replay window"`
- `npm run build`
