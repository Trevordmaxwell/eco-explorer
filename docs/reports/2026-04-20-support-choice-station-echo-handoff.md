# Support Choice Station Echo Handoff

Queue: `ECO-20260420-scout-350`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
Role: `scout-agent`
Lane: `lane-1`

## Finding

Lane 1 does not need a new support model for packet `136`.

The core systems are already present:

- `normalizeSelectedOutingSupportId(...)` and `resolveSelectedOutingSupportId(...)` keep locked `place-tab` / `route-marker` saves falling back to `hand-lens`.
- `cycleSelectedOutingSupportId(...)` already moves through `hand-lens`, `note-tabs`, earned `place-tab`, and owned `route-marker`.
- `toggleOutingSupport()` persists the selection and shows the short lane-2-reviewed support notice.
- Field-station state already exposes the normalized `selectedOutingSupportId` through `render_game_to_text()`.

The narrow remaining lane-1 gap is the station echo. The visible `SEASON -> ROUTES` support row derives `HAND LENS`, `NOTE TABS`, `PLACE TAB`, and `ROUTE MARKER` from a private render helper in `src/engine/field-station-routes-page.ts`, so tests and debug output can assert the selected support id but not the exact station-facing label kids see.

## Baseline Check

`npm test -- --run src/test/save.test.ts src/test/field-station.test.ts` passes.

The focused support-row runtime slice currently fails five stale initial-map-focus expectations:

`npm test -- --run src/test/runtime-smoke.test.ts -t "route marker|outing support|locked route-marker|route board to tundra|coastal scrub and can hand"`

Those failures are not support-selection regressions. They expect the old world-map focus fallback to the current location, while the newer lane-1 guided focus rule now opens the map on the active outing target before route-marker support is selected.

## Main-350 Target

Keep the implementation systems-small and test-led.

Recommended work:

- Add one tiny shared station-label seam for outing support, so `HAND LENS`, `NOTE TABS`, `PLACE TAB`, and `ROUTE MARKER` are testable outside the private renderer helper.
- Reuse that seam for the visible routes-page support row and expose the exact station label in the field-station debug state alongside `selectedOutingSupportId`.
- Update the stale support-row runtime-smoke expectations so first map open follows the current guided active-target rule.
- Add assertions that the station/debug echo pairs normalized ids with labels, including locked `route-marker -> hand-lens` fallback and at least one route-marker activation path.

## Non-Goals

- No save schema change.
- No support cycle order change.
- No support notice-copy change.
- No route-marker map behavior change.
- No hand-lens retargeting, note-tabs, place-tab, route-controller, or route-definition behavior change.
- No new support UI, inventory row, tutorial panel, station page, layout widening, geometry, or authored science copy.

## Verification Target

- `npm test -- --run src/test/save.test.ts src/test/field-station.test.ts`
- Focused support-row runtime-smoke slice for route-marker / locked-support / route-board support cycling
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
