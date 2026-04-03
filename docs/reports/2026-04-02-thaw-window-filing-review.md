# 2026-04-02 Thaw-Window Filing Review

Review for `ECO-20260402-critic-142`.

## Result

No blocking lane-4 issue found.

## What Holds Up

- The filed-route identity stays stable where it matters: `Short Season` remains the saved route title, and the canonical clue-backed sentence still comes from `resolveRouteV2FiledNoteText()`.
- The richer page feel now lives in one display seam instead of forking into preview-only or notice-only wording. `note-tabs` preview and the one-press filed notice both reuse the same `resolveRouteV2FiledDisplayText()` path.
- The first authored prefix stays compact. `Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra's short thaw window.` lands exactly at 96 characters, which fits the current compact strip budget without asking for another layout seam.
- The extra timing guard in `game.ts` is the right kind of polish: it keeps a fresh filed notice from being overwritten by a generic guided prompt, but it does not add another panel, another queue, or another state model.

## Watch Item

- If more process-backed routes earn display-only stamps, keep using the shared preview/notice seam and hold them to the same compact envelope instead of introducing route-specific subtitle rows or longer alternate filed copy.

## Verification Rechecked

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|uses the gathered clue names when note tabs previews and files a ready evidence route|keeps Short Season as the title while note tabs files a thaw-window page stamp|turns the forest expedition slot into a single notebook-led chapter|shows the thaw-window route replay note when re-entering tundra during the active process window"`
