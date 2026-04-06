# Inspect-Target Helper Implementation

## Queue Ref

- `ECO-20260406-main-292`

## What Changed

Moved support-biased inspect-target selection into [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts) through one pure helper, `resolveInspectTargetSelection(...)`.

That helper now owns:

- nearest inspectable fallback in range
- nearest notebook-fit target in range
- nearest preferred active-route hand-lens target in range
- the tiny `nearestInspectableEntityId` projection the debug export reads

[game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) now reuses that same helper result for:

- the live inspect highlight
- `render_game_to_text()`'s `nearestInspectableEntityId`
- the local `getNearestInspectable()` wrapper

## Scope Kept Small

- no change to inspect bubble composition
- no change to route progress, filing, or overlays
- no new support system, HUD, or planner seam
- `Held Sand` and `Thaw Window` behavior stayed on the existing controller rules

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer beach grass as the Held Sand clue on the live back-dune shelf|keeps non-hand-lens supports on the nearer back-dune inspectable in the same Held Sand shelf setup|lets hand lens prefer woolly lousewort as the thaw-window bloom clue when a nearer thaw-skirt decoy is in range|keeps non-hand-lens supports on the nearer thaw-skirt inspectable in the same thaw-window bloom setup"`
- `npm run build`
