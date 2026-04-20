# Overlay Render Route Notice Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-413`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-4`

## Finding

Lane 1 already moved the notice-render family out of `overlay-render.ts` into `src/engine/field-notice-overlays.ts`. Lane 4 does not need another extraction here.

The remaining lane-4 value is a tiny runtime-smoke hardening around the live route filing/support path. Existing unit coverage protects priority policy, and the High Pass live talus-hold smoke already proves filed route notices beat station support toggles while the field-station overlay is open. What is still worth pinning down after the render extraction is the handoff back into a drawable playing state:

- file `High Pass`
- toggle station support
- close the field station back to the world map
- confirm the filed-route notice still survives in `render_game_to_text()` and was not replaced by the `OUTING SUPPORT` toast

That keeps route notices, support priority, and the extracted field-notice overlay family coupled without adding a new broad playthrough.

## Recommended Main Scope

- Extend the existing `files High Pass from the live talus-hold loop and settles the completed field arc` runtime-smoke test.
- After toggling support and closing the field station, assert the returned playing/world-map state still has the filed `HIGH PASS` notice with `variant: 'filed-route'`.
- Also assert raw `render_game_to_text()` includes the filed-route notice identity and does not include `OUTING SUPPORT`.
- Keep the change test-only unless the new assertions expose a real priority or render-state bug.

## Non-Goals

- No changes to `src/engine/field-notice-overlays.ts`, `src/engine/overlay-render.ts`, `src/engine/game.ts`, notice copy, notice dimensions, badge pixels, y positions, pulse timing, support behavior, route definitions, save schema, station layout/state, authored science/content, biome geometry, new framework, screenshot framework, or broad runtime-smoke scenario.

## Suggested Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass from the live talus-hold loop"`
- `npm test -- --run src/test/field-notices.test.ts -t "route-critical|station support|filed-route"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Baseline

- Passed: `npm test -- --run src/test/field-notices.test.ts src/test/runtime-smoke.test.ts -t "route-critical|High Pass from the live talus-hold loop|field-request notice timers|field-partner strip"`
