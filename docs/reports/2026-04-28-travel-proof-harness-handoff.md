# Travel Proof Harness Handoff

Date: 2026-04-28
Role: scout
Queue: `ECO-20260428-scout-488`
Packet: `.agents/packets/181-lane-1-travel-and-proof-hardening.json`

## Finding

The reusable debug snapshot harness already owns fake-runtime boot plus menu navigation helpers, but station proof still carries one small footgun: `openFieldStationFromMenu()` only works when the field-station action is available from the current scene. Most station snapshot checks first call `openWorldMapFromMenu()` and then call the station helper, so individual tests must remember that travel precondition. `main-487` hit that exact issue while adding filed Source to Shore station proof.

## Implementation Contract

Make one behavior-neutral test-harness improvement:

- Add an exported helper in `src/test/debug-snapshot-harness.ts`, for example `openFieldStationViaWorldMap(fakeWindow)`, that opens the world map through the existing helper and then opens the field station through the existing station helper.
- Keep the current lower-level helpers available; do not change runtime game code.
- Update `src/test/save-snapshots.test.ts` to use the new helper where tests are proving station state from a named snapshot and do not need to separately inspect the intermediate world-map state.
- Leave tests that assert world-map focus/origin/marker state as explicit two-step flows.

## Proof

Recommended focused checks:

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run build`
- `git diff --check -- src/test/debug-snapshot-harness.ts src/test/save-snapshots.test.ts docs/architecture.md`

## Boundaries

This is test-only proof hardening. Do not change travel labels, route semantics, station UI, save state, world-map behavior, content, geometry, browser proof artifacts, or `game.ts`.
