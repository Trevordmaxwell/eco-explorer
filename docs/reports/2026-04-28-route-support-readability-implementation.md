# Route Support Readability Implementation

Date: 2026-04-28
Owner: lane-4 main-agent
Queue item: `ECO-20260428-main-484`
Packet: `.agents/packets/179-lane-4-route-feel-runway.json`

## Summary

Implemented the scoped route-support readability pass by making the existing `OUTING SUPPORT` notice aware of the current active or ready-to-file route. The support row remains the same tiny one-slot choice; this pass only changes the short feedback notice shown when the player cycles support.

## Runtime Shape

- `src/engine/field-request-controller.ts` now lets `getOutingSupportNoticeText(...)` accept an `ActiveFieldRequest | null`.
- Active gathering routes can describe the immediate support effect:
  - `hand-lens`: highlights current route clues.
  - `note-tabs`: keeps the compact route progress visible.
  - `place-tab`: frames the current route question.
  - `route-marker`: names the target biome/location.
- Ready-to-file routes use the calm copy `Route note is ready.` for all support ids so the notice does not imply a marker, replay, or in-field hunt.
- `src/engine/game.ts` now passes the current controller active request into the notice helper after the selected support id changes.

## Guardrails Held

- No new support row, planner, loadout, station UI, save schema, route framework, route id, evidence id, ordered slot, geometry, catalog shape, or fourth Source to Shore beat.
- Existing hand-lens retargeting, note-tabs hint bias, place-tab station wrap behavior, route-marker world-map target resolution, and ready-to-file map-calm behavior remain unchanged.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice|Source to Shore support|place-tab|route-marker"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "support row|route marker"`
- `npm test -- --run src/test/field-request-controller.test.ts src/test/field-requests.test.ts`
- `npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts -t "Source to Shore|High Pass|route-marker|support|field station"`
- `npm run build`

## Handoff

Review should focus on whether the notice copy stays tiny and route-facing, whether ready-to-file states remain map-calm, and whether any unrelated station/support semantics changed. If clean, promote `ECO-20260428-scout-485`.
