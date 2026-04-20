# Nursery Route-Support Hint Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-349`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Lane: `lane-4`

## Scout Finding

Lane 4 should keep packet `135` focused on route-support hint selection, not nursery page layout or authored plant copy.

`resolveNurseryStateView(...)` already avoids the worst flattening for `edge-pattern-line` by selecting a nursery support reward from the active beat. The older route families still use the first claimed route-support project for the whole route, though:

- `coastal-shelter-line` can keep showing the `sand-verbena` hint even when the active beat has moved to `coastal-comparison`, where `dune-lupine` is the better support.
- `treeline-shelter-line` can show `mountain-avens` for the whole route if claimed, even though it fits `tundra-short-season` better than the initial `treeline-shelter` beat.
- Existing tests cover the `edge-pattern-line` happy path, but they do not guard the no-substitution rule across all live route families.

## Recommended Main Target

Add a tiny beat-specific nursery support resolver in `src/engine/nursery.ts` and focused tests in `src/test/nursery.test.ts`.

Recommended mapping:

- `coastal-shelter-line` / `forest-study` -> `nursery:sand-verbena-support`
- `coastal-shelter-line` / `coastal-comparison` -> `nursery:dune-lupine-support`
- `treeline-shelter-line` / `tundra-short-season` -> `nursery:mountain-avens-support`
- `edge-pattern-line` / `scrub-edge-pattern` -> `nursery:dune-lupine-support`
- `edge-pattern-line` / `forest-cool-edge` -> `nursery:salmonberry-support`
- `edge-pattern-line` / `treeline-low-fell` -> `nursery:mountain-avens-support`

If the active beat's mapped reward is not claimed, show no route-support hint rather than substituting a support from an earlier/later beat. Keep the existing capstone salmonberry hint only for the no-active-beat post-route window.

## Recommended Files

- `src/engine/nursery.ts`
- `src/test/nursery.test.ts`
- `src/test/field-station-nursery-page.test.ts` only if the route-support visibility helper needs a regression update
- `docs/reports/2026-04-20-nursery-route-support-hint-implementation.md`

## Acceptance For Main

- Centralize nursery route-support hint selection around route id plus active beat id instead of scanning the first claimed project for the whole route.
- Preserve the existing `edge-pattern-line` behavior and capstone salmonberry fallback.
- Add focused tests proving the coastal line switches from `sand-verbena` on `forest-study` to `dune-lupine` on `coastal-comparison`.
- Add focused tests proving `treeline-shelter-line` does not show `mountain-avens` during `treeline-shelter`, but does during `tundra-short-season` once claimed.
- Add at least one no-substitution case where another claimed support exists but the active beat's mapped support is missing.
- Do not change nursery layout, authored plant copy, station pages, save schema, route definitions, route filing behavior, world geometry, or science content.

## Verification For Main

- `npm test -- --run src/test/nursery.test.ts`
- `npm test -- --run src/test/field-station-nursery-page.test.ts` if nursery hint visibility or page priority assertions are touched
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Verification For Scout

- `npm test -- --run src/test/nursery.test.ts`
- `npm test -- --run src/test/field-station-nursery-page.test.ts`
