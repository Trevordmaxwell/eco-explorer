# Support-Readable Route Feel Implementation

Implemented `ECO-20260406-main-298` for lane 4.

## What Shipped

- The existing top-right `NOTEBOOK J` hint chip now carries one tiny support-readable state while active route play is underway.
- The chip only flips into that state when `hand-lens` is currently selecting a live preferred route clue on the two proof routes:
  - `Thaw Window` / `woolly-lousewort`
  - `Held Sand` / `beach-grass`
- The route title stays in place and the change remains one small badge state inside the current chip instead of a new HUD row, planner seam, or extra route copy.

## Seam Shape

- `field-request-state.ts` now treats the normal chip state as `variant: "default"`.
- `field-request-controller.ts` now carries the paired hint-state helper alongside the existing inspect-target selection seam, so the same controller layer decides when the chip should read as support-biased.
- `overlay-render.ts` renders that state as one tiny badge on the existing chip instead of adding another text line.
- `game.ts` reuses the extracted inspect-target selection for both the scene highlight/debug path and the chip state, so the coordinator does not re-derive route-feel rules a second time.

## What Stayed Small

- No new support HUD.
- No new notebook card, board row, or strip copy.
- No proof routes beyond `Thaw Window` and `Held Sand`.
- The inspect bubble's earlier `LENS CLUE: <slot>` cue remains intact as the post-inspect companion seam.

## Verification

- `npx vitest run src/test/field-request-controller.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "woolly lousewort|Held Sand clue|thaw-window bloom|beach grass as the Held Sand clue|nearer thaw-skirt inspectable|nearer back-dune inspectable"`
- `npm run build`
