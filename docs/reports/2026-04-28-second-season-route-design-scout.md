# Second-Season Route Design Scout

Date: 2026-04-28
Queue: `ECO-20260428-scout-496`
Lane: `lane-4`
Owner: `scout-agent`
Packet: `.agents/packets/189-lane-4-second-season-route-design.json`

## Decision

Use a proof-only route-design step for `ECO-20260428-main-496`.

Do not append a playable route after filed `Dune Catch` in this packet. The current route runtime could surface a new catalog entry after `source-to-shore-dune-catch`, but the station board and atlas still resolve filed Source to Shore through the dedicated three-beat Source to Shore state. A new playable chapter after that point needs an explicit route-family/station boundary before it can be player-facing without map, journal, board, and archive drift.

## Findings

- `src/engine/field-request-catalog.ts` already carries the full current route chain through `treeline-high-pass` and the three Source to Shore requests.
- `src/engine/source-to-shore-state.ts` now owns an explicit three-beat flow: `Source Shelter`, `Forest Release`, and `Dune Catch`.
- `src/engine/field-season-board.ts` selects the dedicated Source to Shore board whenever Source to Shore is available, including the filed `Dune Catch` closure state.
- `src/engine/field-request-state.ts` would still turn any appended unlocked catalog route into map and journal active outing state, so a plain catalog append after `Dune Catch` would not be station-independent.
- Existing tests already cover most of this boundary, especially the full Route v2 matrix, Source to Shore board states, and filed Dune Catch snapshot state.

## Main Contract

`ECO-20260428-main-496` should write a route proof report, not a new playable route.

Expected output:

- `docs/reports/2026-04-28-second-season-route-design-proof.md` proving the current post-Source-to-Shore boundary.
- Optional focused test-only guards if the proof finds a missing assertion.

Files to inspect:

- `src/engine/field-request-catalog.ts`
- `src/engine/field-requests.ts`
- `src/engine/field-request-controller.ts`
- `src/engine/source-to-shore-state.ts`
- `src/engine/field-request-state.ts`
- `src/engine/field-season-board.ts`

Proof expectations:

- Filed `source-to-shore-dune-catch` leaves no active field request, active outing, journal outing, route-marker target, or replay label.
- Source to Shore remains exactly three beats unless a later packet explicitly changes the station, map, journal, atlas, and save proof contract.
- No route ids, evidence ids, ordered slots, support behavior, filed states, save schema, station shell, geometry, planner, route framework, or fourth Source to Shore beat change in packet `189`.

Suggested verification:

- `npm run validate:agents`
- `npm test -- --run src/test/field-request-catalog.test.ts`
- `npm test -- --run src/test/field-requests.test.ts -t "route-state matrix|Source to Shore"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice|Source to Shore support|route-marker"`
- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Dune Catch|Source to Shore"`
- `npm run build` only if runtime source changes land.

## Promotion

Promote `ECO-20260428-main-496` to `READY` with this proof-only contract.
