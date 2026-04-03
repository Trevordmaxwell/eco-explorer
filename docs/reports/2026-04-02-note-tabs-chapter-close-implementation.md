# 2026-04-02 Note-Tabs Chapter-Close Implementation

Implementation report for `ECO-20260402-main-177`.

## Scope

Add one compact note-tabs-only chapter-close line for the completed `edge-pattern-line` routes page without changing the generic stop cue, the atlas seam, or any later Root Hollow or season-close states.

## What Landed

- `src/engine/field-season-board.ts` now gives `note-tabs` one route-specific complete-state wrap for `edge-pattern-line` when the route is logged and the board is still in the pre-expedition `Edge line logged.` state.
- That wrap uses `EDGE LINE LOGGED` plus the shorter authored line `Low Fell closes the edge line. Root Hollow waits below.` so the return reads like a tiny notebook page close instead of another generic pause strip.
- `hand-lens`, `place-tab`, and the default logged-route path still keep the calmer shared `ROUTE LOGGED` cue, and the later Root Hollow note-ready state still uses the existing generic stop text.
- Focused board and runtime coverage now protect both sides of the change: the new note-tabs-only close and the unchanged later Root Hollow-ready seam.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "uses a note-tabs chapter-close line once the edge line is logged|uses a calmer stop cue once Root Hollow is ready to file|uses the four-leg Low Fell note when note tabs previews and files the edge-line close|shows a route-logged stop cue in the field station once the live route is complete"`
- `npm run build`

## Handoff Note

`critic-150` should confirm that the new notebook close feels more satisfying without stealing the generic stop cue from the other supports or leaking into the later Root Hollow and season-close states.
