# 2026-04-02 Low-Fell Chapter Implementation

Implementation report for `ECO-20260402-main-176`.

## Scope

Turn `treeline-low-fell` into a fuller chapter-grade `edge-pattern-line` close through the live Route v2, board, and save seams only.

## What Landed

- `src/engine/field-requests.ts` now treats `treeline-low-fell` as an ordered four-leg route:
  - `last-tree-shape`
  - `low-wood`
  - `fell-bloom`
  - `low-rest`
- The new final `low-rest` slot uses `arctic-willow`, so the route now closes on one last low open-fell rest instead of filing after the avens beat alone.
- The Low Fell filed note and clue-backed sentence now teach the fuller drop from treeline shelter into open fell, and the ordered slot list keeps the filed text stable even if saved evidence slot order is shuffled.
- `src/engine/field-season-board.ts` now teaches the stronger four-part drop in the active Low Fell beat detail, the treeline next-direction line, and the logged beat detail, while keeping the support strip and route shell unchanged.
- `src/engine/save.ts` now downgrades legacy three-slot `treeline-low-fell` `ready-to-synthesize` saves back to `gathering` if `low-rest` is missing, preserving the already observed clues without auto-filling the new final carrier.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/save.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "uses the four-leg Low Fell note when note tabs previews and files the edge-line close|shows the treeline place-tab question once the edge line reaches Low Fell|uses the gathered clue names when note tabs previews and files a ready evidence route|keeps Short Season as the title while note tabs files a thaw-window page stamp|turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`

## Handoff Note

`critic-149` should review whether the outing now feels more chapter-grade without getting harsher, and whether the legacy-save downgrade stays honest and unobtrusive in the compact station flow.
