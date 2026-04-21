# Support Choice Physical Cue Proof Implementation

Created: 2026-04-20

Queue: `ECO-20260420-main-352`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
Role: `main-agent`
Lane: `lane-3`

## Summary

Added a test-only physical cue proof matrix to `src/test/runtime-smoke.test.ts` so the support-choice spatial story is explicit and regression-backed without adding new geometry.

The matrix names the live proof families that already make `hand-lens` retargeting read as physical place-reading rather than magic:

- front-half `Held Sand`: `beach-grass` beside non-fit back-dune plants
- forest `Moisture Holders`: `sword-fern` beside `western-trillium`
- high-country `High Pass`: `talus-cushion-pocket` beside open-fell non-fit plants
- tundra `Thaw Window`: `woolly-lousewort` beside other thaw-skirt inspectables

## Scope

Changed:

- `src/test/runtime-smoke.test.ts`

Not changed:

- world geometry
- station surfaces
- support selection state
- save schema
- route definitions or filed-note behavior
- authored science copy
- nursery behavior
- HUD, inventory, loadout, or notebook panels

## Why No Geometry Was Added

The focused runtime smoke slice already has paired hand-lens and non-hand-lens coverage for the physical carrier pattern across the required world areas. Adding new objects here would have increased visual noise without fixing a proven gap.

## Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "Held Sand|Moisture Holders|Brief Bloom|High Pass|Thaw Window"`
- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm run build`

Queue and packet validation should be run after recording this report in `.agents/work-queue.md` and packet `136`.
