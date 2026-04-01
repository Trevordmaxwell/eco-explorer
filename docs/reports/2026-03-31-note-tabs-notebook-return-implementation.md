# 2026-03-31 Note Tabs And Notebook Return Implementation

Implementation report for `ECO-20260331-main-129`.

## What Changed

The lane-4 support slot now has a third calm option:

- `note-tabs` is live in the existing `SUPPORT` row
- support cycling is now:
  - without owned `route-marker`: `hand-lens -> note-tabs -> hand-lens`
  - with owned `route-marker`: `hand-lens -> note-tabs -> route-marker -> hand-lens`

The support split is now cleaner:

- `hand-lens` keeps clue-first inspect help and a clue-first `TODAY` strip
- `note-tabs` keeps the station strip notebook-first through route summary and filing-preview copy
- `route-marker` keeps the travel-first map and strip behavior

The notebook return payoff is also richer now:

- Route v2 filing copy is authored per route instead of resolving to a generic title toast
- `NOTEBOOK READY` now uses route-authored filing instructions by default
- when `note-tabs` is selected, the `NOTEBOOK READY` strip previews the filed note sentence itself
- post-file notices now surface the authored filed note result for Route v2 beats, including `ROOT HOLLOW`

## File Notes

- `src/engine/types.ts` adds `note-tabs` to the support union.
- `src/engine/save.ts` preserves and cycles the new support state without adding another persistence seam.
- `src/engine/field-requests.ts` now carries compact authored `filedText` lines for the live Route v2 beats and exports a definition lookup helper for the filing surfaces.
- `src/engine/field-season-board.ts` now resolves notebook-ready copy per route and gives `note-tabs` the notebook-first strip path.
- `src/engine/game.ts` now surfaces the authored filed note text in the recorded notice and adds the `note-tabs` support notice.
- `src/engine/overlay-render.ts` now labels the third support as `NOTE TABS`.

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|buys route marker after the movement pair and lets the support row activate it on the world map|switches the route board to treeline and can hand the outing guide to route marker|switches the route board to coastal scrub and can hand the outing guide to route marker|surfaces the season capstone, then opens the next field season through the expedition seam"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`

## Follow-On

`ECO-20260331-critic-102` can now review whether the new third support and richer filing copy still feel calm at station scale.
