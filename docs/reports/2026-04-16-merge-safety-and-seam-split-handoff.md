# Merge-Safety And Seam-Split Handoff

## Queue Ref

- `ECO-20260416-scout-299`
- prepares `ECO-20260416-main-299`

## Recommended Scope

Sprint 1 lane 1 should stay small and practical:

- add one short clean-machine checklist note to [README.md](/Users/trevormaxwell/Desktop/game/README.md) covering the expected local verification floor for a fresh machine or review drop
- extract the remaining inspect-hint projection seam out of [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) into [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts)

That gives lane 1 one merge-safety documentation win and one coordinator-safety runtime win without widening the shell.

## Exact Runtime Seam

The new pressure is not the large inspect-target resolver anymore. That already moved. The remaining coordinator seam is the small wrapper and projection cluster in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts):

- `getInspectTargetSelection()`
- `getFieldRequestHint(inspectTargetSelection = getInspectTargetSelection())`
- the render-time `inspectTargetSelection` read
- the debug-text `fieldRequestHint` plus `nearestInspectableEntityId` projection

This cluster now depends on controller-owned rules:

- `supportBiasActive`
- `nearestInspectableEntityId`
- `fieldRequestHint` variant shaping

That makes it a good next split before more route-feel or support-readable UI lands.

## Suggested Main Pass

Expand [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts) with one small helper that takes:

- the current `FieldRequestControllerState`
- biome entities
- player center
- inspect range
- the current zone lookup callback

and returns one compact projection object that can power both render and debug use, for example:

- `inspectTargetSelection`
- `fieldRequestHint`

The main pass should then let [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) consume that helper result directly instead of owning another wrapper layer around controller state.

## Clean-Machine Guardrail

Keep the docs pass practical instead of aspirational. The short note in [README.md](/Users/trevormaxwell/Desktop/game/README.md) should tell reviewers or fresh-machine collaborators the minimum expected local checks after `npm install`:

- `npm run build`
- `npm run test`
- `npm run validate:agents`

That fits the packet's merge-safety goal better than broader CI promises this repo does not automate yet.

## Why This Boundary

- It removes a still-growing lane-1 wrapper seam from the main coordinator.
- It keeps the support-biased hint variant and nearest-inspectable debug projection together.
- It gives the repo one useful portability rule without inventing a larger release checklist.
- It stays inside lane 1's owned functions and current Sprint 1 brief.

## Non-Goals

- do not add a new planner, quest, or support shell
- do not reopen `field-season-board.ts` just to satisfy the packet wording
- do not change live hand-lens targeting behavior
- do not broaden the docs pass into deployment or CI automation

## Test Targets

The implementation step should stay protected by existing lane-1 coverage plus one focused helper test if needed:

- [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts)
- the existing runtime-smoke slices that read `nearestInspectableEntityId` and support-biased hint behavior
- `npm run build`
