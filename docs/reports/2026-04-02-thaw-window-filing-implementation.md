# 2026-04-02 Thaw-Window Filing Implementation

Implementation note for `ECO-20260402-main-169`.

## Scope

Keep the canonical `Short Season` filed note stable, but make the ready-to-file return feel more like the same little field page the player just earned.

## What Landed

- Added a shared display-only filing helper in `src/engine/field-requests.ts` so Route v2 returns can deepen the preview and filed-notice text without rewriting the saved filed sentence.
- Authored the first display prefix on `tundra-short-season`, so the canonical filed note stays `Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra's short thaw window.` while the display seam reads `Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra's short thaw window.`
- Wired `src/engine/field-season-board.ts` to reuse that shared display text for `note-tabs`, keeping the preview label as `SHORT SEASON`.
- Wired `src/engine/game.ts` to reuse the same shared display text for the one-press filed notice, so the preview and recorded notice cannot drift into different phrasing.
- Tightened the guided field-season prompt timing in `src/engine/game.ts` so generic station or next-stop notices wait behind any active filed-route notice instead of overwriting it on the next frame.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|uses the gathered clue names when note tabs previews and files a ready evidence route|keeps Short Season as the title while note tabs files a thaw-window page stamp|turns the forest expedition slot into a single notebook-led chapter|shows the thaw-window route replay note when re-entering tundra during the active process window"`
- `npm run build`
