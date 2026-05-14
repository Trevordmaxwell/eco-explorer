# Second-Season Route Design Proof

Date: 2026-04-28
Queue: `ECO-20260428-main-496`
Lane: `lane-4`
Owner: `main-agent`
Packet: `.agents/packets/189-lane-4-second-season-route-design.json`

## Verdict

Proof-closed without runtime changes.

Do not add a playable Route v2 request after filed `source-to-shore-dune-catch` in packet `189`. The current catalog/runtime can express another request, but the station route board, atlas, archive, and support expectations intentionally settle on the filed three-beat Source to Shore state after `Dune Catch`.

## Proof

- `src/engine/source-to-shore-state.ts` has one explicit `SOURCE_TO_SHORE_BEAT_FLOW` with exactly `Source Shelter`, `Forest Release`, and `Dune Catch`.
- `src/test/field-requests.test.ts` already walks every live Route v2 route through the deterministic route-state matrix; the `Dune Catch` case files `source-to-shore-dune-catch` and expects `expectedNextRequestId: null`.
- `src/test/field-season-board.test.ts` asserts filed `Dune Catch` resolves `Source to Shore` as complete, with `targetBiomeId: null`, `activeBeatId: null`, no launch card, and exactly three done beats.
- `src/test/save-snapshots.test.ts` boots the filed `source-to-shore-dune-catch-filed` debug snapshot and verifies `activeFieldRequest` is `null`, the station subtitle is filed Source to Shore closure, and the board keeps exactly the three done beats.
- `src/test/field-request-controller.test.ts` keeps support notices and route-marker behavior calm for ready/filed Source to Shore states, so support does not imply a hidden active outing once a note is ready or filed.

## Boundary

A plain catalog append after `source-to-shore-dune-catch` would not be station-independent. `src/engine/field-request-state.ts` turns an unlocked active request into map and journal outing state, while `src/engine/field-season-board.ts` continues selecting the dedicated Source to Shore board whenever Source to Shore resolves. That means a future post-Source-to-Shore playable chapter needs a deliberate station route-family boundary before the route can be player-facing.

Packet `189` therefore stays proof-only:

- no new route id
- no new evidence id or ordered slot
- no save schema change
- no support behavior change
- no filed-copy identity change
- no station shell or planner change
- no fourth Source to Shore beat

## Updates

- Added a durable `.agents/project-memory.md` note warning future route authors not to append a playable post-`Dune Catch` Route v2 request until a station route-family boundary is scoped.
- No runtime source or test source changed; no extra guard was needed because the existing focused suite already asserts the boundary.

## Verification

Passed:

```bash
npm run validate:agents
npm test -- --run src/test/field-request-catalog.test.ts src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts
```

Focused route/controller/station/snapshot suite result: 9 test files passed, 368 tests passed.

`npm run build` was not run because this item made no runtime source changes.
