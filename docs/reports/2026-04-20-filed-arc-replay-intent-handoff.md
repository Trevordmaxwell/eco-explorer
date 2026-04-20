# Filed Arc Replay Intent Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-357`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-4`

## Scout Read

Packet `137` asks lane 4 to make replay hooks explicit and optional after `High Pass` is filed. The shipped behavior is already close: filed `High Pass` suppresses active field requests, active outing locator, route marker, world-map replay label, journal field request, and route-board replay notes. Lane 1 also added explicit filed-arc copy buckets, and lane 2 refreshed the station homecoming epilogue line.

The remaining lane-4 gap is proof clarity, not a new feature. Replay notes currently live only while a route is incomplete through `FieldSeasonBoardState.replayNote`; once `routeBoard.complete` is true for filed `High Pass`, that replay hook should stay null. Optional revisit intent should remain the existing expedition/card notice language, not a `Today:` map label, a journal task, a route marker, or a new route assignment.

## Recommended Main Chunk

Add a narrow regression pass that makes the filed-arc replay contract explicit in tests and handoff notes. Prefer test-only changes unless the implementation finds an existing state field whose name needs a tiny assertion helper.

Recommended files:

- `src/test/field-season-board.test.ts`
- `src/test/field-requests.test.ts`
- `src/test/save-snapshots.test.ts`
- `docs/reports/2026-04-20-filed-arc-replay-intent-implementation.md`

## Acceptance

- Filed `High Pass` route-board state explicitly asserts `complete: true`, `targetBiomeId: null`, `notebookReady: null`, and `replayNote: null`.
- Filed `High Pass` field-request state explicitly asserts no active field request, no active outing, no journal field request, no route marker location, and no world-map route replay label even when `route-marker` remains selected and the focused map location is Treeline.
- The filed expedition surface remains the only optional replay invitation: `Current field arc filed. Revisit when you want a quiet pass.` and the composed expedition notice stay available without creating a task.
- Tests preserve the contrast that pre-filed / active High Pass can still show `Today: High Pass`, while filed High Pass cannot.
- No player-facing copy drift, save schema, route definition, station page/UI, route filing behavior, support behavior, geometry, season-three promise, new route task, new replay UI, or authored science/copy change.

## Baseline Verification

- `npm test -- --run src/test/field-season-board.test.ts -t "replay|filed High Pass|High Pass filed"`
- `npm test -- --run src/test/field-requests.test.ts -t "season outing locator|High Pass locator|High Pass filed"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "filed High Pass"`

## Main Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "files High Pass|High Pass filed|filed High Pass"` only if runtime smoke expectations are touched
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
