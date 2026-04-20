# Treeline Tundra Corridor Route Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-377`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Lane: `lane-4`

## Summary

The existing `Low Fell` Route v2 outing now accepts `reindeer-lichen` as an optional `low-rest` clue alongside `arctic-willow`. This lets the treeline-to-tundra corridor's lichen cue count as route evidence while preserving the ordered `last-tree-shape -> low-wood -> fell-bloom -> low-rest` progression and the canonical `Low Fell` filing identity.

## Changes

- Updated only the `treeline-low-fell` `low-rest` evidence slot in `src/engine/field-requests.ts`.
- Added field-request coverage proving a `3/4 clues` `Low Fell` route can complete from `reindeer-lichen` while the route context is `treeline` / `lichen-fell` and the observed entity zone is `center-blend`.
- Added controller coverage proving `hand-lens` reads the corridor cue as `Notebook fit: low rest` and may retarget to it as an ordinary notebook-fit clue.
- Added paired `note-tabs` coverage proving non-hand-lens support stays on the physical nearest inspectable and shows the `3/4 clues` progress chip instead of retargeting.

## Preserved

- No new route, route type, station page, support type, planner layer, prompt seed, corridor state, corridor geometry, save schema, world-map node, or map-marker behavior.
- No edits to `src/engine/corridor.ts`, `src/engine/game.ts`, `src/engine/observation-prompts.ts`, biome geometry/content, station layout, High Pass behavior, Tundra route behavior, or lane-2 prompt copy.
- `Brief Bloom` remains the only Low Fell active world-state alternate in this area; `moss-campion` stays the active `fell-bloom` carrier, while `reindeer-lichen` is an ordinary `low-rest` fit.

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`
- `npm run build`
