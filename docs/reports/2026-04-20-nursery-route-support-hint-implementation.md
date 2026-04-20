# Nursery Route-Support Hint Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-349`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Lane: `lane-4`

## Implementation

Added a small route-support resolver in `src/engine/nursery.ts` so the nursery hint is selected from the current `routeId` plus `activeBeatId`, not by scanning the first claimed support project for the whole route.

Live mapping now stays beat-specific:

- `coastal-shelter-line` / `forest-study` -> `nursery:sand-verbena-support`
- `coastal-shelter-line` / `coastal-comparison` -> `nursery:dune-lupine-support`
- `treeline-shelter-line` / `tundra-short-season` -> `nursery:mountain-avens-support`
- `edge-pattern-line` / `scrub-edge-pattern` -> `nursery:dune-lupine-support`
- `edge-pattern-line` / `forest-cool-edge` -> `nursery:salmonberry-support`
- `edge-pattern-line` / `treeline-low-fell` -> `nursery:mountain-avens-support`

If the active beat's mapped reward is not claimed, the nursery now shows no route-support hint instead of substituting another route beat's support. The existing salmonberry capstone fallback still applies only when there is no active beat.

## Tests

Updated `src/test/nursery.test.ts` to cover:

- coastal support switching from sand verbena on `forest-study` to dune lupine on `coastal-comparison`
- no-substitution when only sand verbena is claimed but the active beat wants dune lupine
- the existing `edge-pattern-line` mapping, now including `scrub-edge-pattern`
- treeline no-early-avens behavior during `treeline-shelter`, with mountain avens appearing only on `tundra-short-season`
- existing selected-bed route strip suppression and salmonberry capstone behavior

No nursery layout, authored plant copy, station page, save schema, route definition, route filing, world geometry, or science content changes were made for this lane-4 pass.

## Verification

- `npm test -- --run src/test/nursery.test.ts`
- `npm test -- --run src/test/field-station-nursery-page.test.ts`
- `npm run build`
