# Inspect-Target Helper Handoff

## Queue Ref

- `ECO-20260406-scout-292`
- prepares `ECO-20260406-main-292`

## Recommended Seam

The next safe lane-1 split is a small inspect-target helper that lives beside [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts), or expands that helper slightly, so [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) no longer owns the support-biased nearest-inspectable search and its tiny debug-facing projection.

## Exact Hotspot

The coordinator pressure is now concentrated in three connected pieces inside [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts):

- `getNearestInspectable()`
- the `nearestEntityId` selection inside the live biome render branch
- the `nearestInspectableEntityId` branch inside `render_game_to_text()`

These all depend on the same support-biased rules:

- nearest entity in range
- nearest notebook-fit entity in range
- nearest preferred active-route hand-lens entity in range
- current `fieldRequestController` state

That is one coherent seam already. It just still lives inline in the coordinator.

## Suggested Main Pass

Extract one pure or mostly-pure helper that takes:

- current biome entities
- player position
- inspect range
- zone lookup callback or zone ids
- the existing `fieldRequestController`

and returns one small result object such as:

- `nearestInspectable`
- `nearestInspectableEntityId`

The same helper result should feed both:

- the render-time `nearestEntityId` highlight
- the debug export `nearestInspectableEntityId`

This keeps the support-biased inspect-target rules and the tiny debug projection together instead of duplicating that same choice twice in `game.ts`.

## Why This Boundary

- It removes the newest route-feel wrapper cluster before it grows.
- It keeps the route-facing hand-lens preference logic aligned with the debug export that tests read.
- It avoids touching broader inspect, bubble, filing, or overlay behavior.
- It fits the packet guardrail: small, testable, route-focused.

## Non-Goals

- do not change `Thaw Window` or `Held Sand` behavior
- do not add a new support system or clue-planner layer
- do not move inspect bubble composition itself
- do not rewrite `render_game_to_text()` broadly

## Test Targets

The existing runtime-smoke coverage that already watches this seam should remain the main protection:

- hand-lens preferred target selection in `Thaw Window`
- non-hand-lens fallback target selection in the same setup
- the beach support-targeting runtime-smoke checks around `nearestInspectableEntityId`

If a new focused unit test helps, it should target the pure helper result rather than more coordinator state.
