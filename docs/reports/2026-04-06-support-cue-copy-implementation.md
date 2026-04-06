# 2026-04-06 Support Cue Copy Implementation

## Shipped

The first support-readable cue now rides the inspect bubble's existing accent line.

- Active hand-lens route winners now show `LENS CLUE: <slot>`.
- Ordinary hand-lens notebook fits still show the calmer `Notebook fit: <slot>` copy.
- Non-hand-lens supports still do not grow a new bubble cue.

## Implementation Scope

The change stays inside the existing inspect-facing seam.

- `src/engine/field-request-controller.ts` now owns the bubble-note formatter through `getInspectBubbleResourceNote(...)`.
- `src/engine/game.ts` now asks that helper for the bubble's `resourceNote` instead of formatting the hand-lens note inline.
- The debug-state export for `openBubble` now includes `resourceNote` so runtime smoke can prove the cue directly.

## Proof

The first cue is proven only on the two live route-differentiation shelves:

- `Thaw Window` shows `LENS CLUE: first bloom` for the active `woolly-lousewort` win.
- `Held Sand` shows `LENS CLUE: open pioneer` for the active `beach-grass` win.

Focused verification:

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "woolly lousewort|Held Sand clue|thaw-window bloom|beach grass as the Held Sand clue"`
- `npm run build`
