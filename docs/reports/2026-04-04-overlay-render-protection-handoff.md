# 2026-04-04 Overlay-Render Protection Handoff

Prepared `ECO-20260404-scout-264` against packet `108`.

## Recommendation

Narrow `ECO-20260404-main-264` to the field-station `SEASON -> ROUTES` page body inside `drawFieldStationOverlay(...)`.

The best seam is the inline block that currently starts after the expedition early-return and runs through:

- the season-wrap strip
- the main route board card
- the optional atlas strip
- the `SUPPORT` heading plus outing-support / upgrade rows

In the current file, that is the long routes-page block around `src/engine/overlay-render.ts:1608-1783`.

## Why This Seam

- It is already one coherent render branch with no timers, save writes, or hit-target mutation.
- Lane 1 keeps changing this exact surface for route flow, next-outing discoverability, stop points, archive behavior, and season pacing, so isolating it buys down future merge and regression risk faster than splitting the shorter expedition card or the already-protected notice family.
- The nursery side already has more local helper structure (`drawNurseryCardHeader`, `drawNurseryHomePlaceStrip`, `drawNurseryCompostAccent`), while the routes page is still one dense inline stretch.

## Preferred Shape

- Keep `drawFieldStationOverlay(...)` responsible for the shell, header, top tabs, season-page tab buttons, view switching, backdrop accents, sill accents, and the nursery / expedition branch choice.
- Extract the routes-page render into one pure helper with a narrow input bag. A good target shape is `drawFieldStationRoutesPage(...)`, either as a private helper in `overlay-render.ts` or as a small sibling render file if the split stays import-light.
- Pass only already-derived view state into that helper:
  - `context`
  - `palette`
  - `contentRect`
  - `seasonBodyTop`
  - `seasonWrap`
  - `routeBoard`
  - `atlas`
  - `upgrades`
  - `selectedUpgradeId`
  - `selectedOutingSupportId`
  - `outingSupportSelected`
- Keep the existing rect math and copy budgets unchanged on the first split. This pass should be structural protection, not another board redesign.

## Out Of Scope

- Any gameplay, timer, save, or input changes
- New station rows, subtitles, archive variants, or map echoes
- Reworking the expedition page at the same time
- Reopening the `field-notices.ts` family; that protection seam is already narrower and less urgent
- Expanding `render_game_to_text()` again unless a tiny helper-level regression seam becomes absolutely necessary

## Verification Target For Main

- Prefer existing focused station/runtime coverage plus `npm run build`
- Reuse the existing station browser/client proof flow only if the extraction risks visual drift; the goal is no user-facing change
