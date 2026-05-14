# Post-Source-To-Shore Route Boundary

Date: 2026-05-14
Role: scout-agent
Lane: lane-1
Queue: `ECO-20260514-scout-04`
Packet: `.agents/packets/192-director-playability-sprint.json`

## Boundary Decision

Do not add a new playable Route v2 request after filed `source-to-shore-dune-catch` in this sprint.

Filed `Dune Catch` remains the terminal Source to Shore beat. The only allowed post-filed surfacing is quiet memory or archive payoff through existing seams:

- `resolveSourceToShoreFiledArcCopy()` for station board, atlas/archive, expedition subtitle, launch-card, and filed notice copy.
- `resolveSourceToShoreRevisitMemory()` for tiny biome-enter revisit notices in Treeline Pass, Forest Trail, and Coastal Scrub.
- Existing support rows and filed station state may remain visible, but they must not imply a new active outing.

## Current Guardrails

- Keep `SOURCE_TO_SHORE_BEAT_FLOW` at exactly three beats: `source-shelter`, `forest-release`, and `dune-catch`.
- Keep `source-to-shore-beta` complete after filed `Dune Catch`; no route-board target, route marker target, new evidence slot, fourth beat, or new route id.
- Do not write `routeV2Progress` for Source to Shore after filed `source-to-shore-dune-catch`.
- Do not add a station page, planner, inventory/loadout surface, save field, new content pack, world-map behavior, or geometry.

## Next Implementation Contract

Promote `ECO-20260514-main-06` as a behavior-preserving helper extraction only.

The current replay-note logic lives in `src/engine/field-season-board.ts` inside `getReplayNote()` and `applyReplayNote()`. That has started to mix route semantics into station-board assembly. Extract that logic into a small route-owned helper, for example `src/engine/field-season-replay-notes.ts`, while preserving the existing board state shape and all player-facing output.

Suggested shape:

- Move replay-note resolution and active-beat decoration into the new helper.
- Let `field-season-board.ts` continue to assemble route-board beats and then call the helper.
- Keep `field-request-state.ts` world-map replay labels and `game.ts` biome-enter replay notices behaviorally unchanged.
- Add or keep tests for existing replay windows and for filed Source to Shore staying complete with `replayNote: null`.

## Verification For Main

Minimum focused verification:

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "replay|Source to Shore|Dune Catch|route-marker|filed"`
- `npm run build`
- `npm run validate:agents` after queue or packet edits
- `git diff --check`

## Handoff

`ECO-20260514-main-06` may begin. It should not create route breadth; it should only extract replay-note logic and prove the existing route, support, station, map, and filed Source to Shore behavior stays identical.
