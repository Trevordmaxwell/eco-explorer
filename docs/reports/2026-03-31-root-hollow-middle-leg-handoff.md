# 2026-03-31 Root Hollow Middle-Leg Handoff

Handoff for `ECO-20260331-main-03`.

## Scope

Deepen `ROOT HOLLOW` without widening the Route v2 runtime or the station shell.

## What Landed

- `forest-expedition-upper-run` now uses four ordered evidence slots:
  - `seep-mark`
  - `stone-pocket`
  - `root-held`
  - `high-run`
- The new middle leg reuses the authored `stone-basin` room and its live damp-life carriers (`banana-slug` or `ensatina`) instead of inventing a new collectible, panel, or traversal shell.
- Expedition-card, route-board, and atlas copy now describe the four-step chapter truthfully:
  - first the seep mark
  - then the stone pocket below the climb
  - then the root-held return
  - then the high run into `log-run`

## Review Focus

- Does the added `stone-pocket` beat make `ROOT HOLLOW` feel more like one authored outing instead of just seep -> climb -> file?
- Does the new copy stay compact enough for the pre-playthrough budget at the current handheld screen size?
- Does the middle leg avoid genre drift, clutter, or support-surface creep?

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`
