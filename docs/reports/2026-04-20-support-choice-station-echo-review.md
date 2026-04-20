# Support Choice Station Echo Review

Queue: `ECO-20260420-critic-350`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
Role: `critic-agent`
Lane: `lane-1`

## Verdict

No blocker.

The lane-1 implementation keeps the support-choice station echo small and systems-safe. The visible `SEASON -> ROUTES` support row and the `render_game_to_text()` field-station debug state now share the same exact label helper, while support persistence, cycling order, route-marker behavior, hand-lens targeting, station layout, route definitions, save schema, geometry, notice copy, and science copy stay unchanged.

## Review Notes

- `getOutingSupportStationLabel(...)` is a pure typed mapping for the four station-facing labels and replaces the private renderer-only helper.
- `resolveFieldStationState(...)` derives `selectedOutingSupportLabel` from the already-normalized `selectedOutingSupportId`, so locked saves cannot expose a stale `ROUTE MARKER` label.
- Runtime coverage proves locked `route-marker` saves show `hand-lens` / `HAND LENS`, purchased route-marker activation shows `route-marker` / `ROUTE MARKER`, and route-marker still points the world map at the active outing target.
- The stale initial world-map expectations were updated to the current guided active-target rule without changing the rule itself.
- The browser smoke confirms the debug payload exposes `fieldStation.selectedOutingSupportLabel` and produced no console-error artifact.

## Verification Reviewed

- `npm test -- --run src/test/save.test.ts src/test/field-station.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route marker|outing support|locked route-marker|route board to tundra|coastal scrub and can hand"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
- Packet JSON parse
- `web_game_playwright_client` smoke in `output/web-game/support-choice-station-echo-main-350/`

## Handoff

`ECO-20260420-scout-354` can move to `READY` for the next lane-1 packet.
