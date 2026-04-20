# Treeline Route Transition State Review

Created: 2026-04-20
Queue item: `ECO-20260420-critic-366`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-1`

## Verdict

Clean. The lane-1 implementation satisfies the packet scope: it adds a debug-only `treeline-stone-shelter` snapshot, keeps the payload as plain current `SaveState`, and proves the ordinary Treeline `Stone Shelter` route seam without changing station behavior, route definitions, world-map focus logic, save schema, Treeline geometry, High Pass copy, or route-controller behavior.

## Review Notes

- `src/engine/debug-save-snapshots.ts` adds the snapshot id, prerequisite request list, save builder, and definition without adding UI, telemetry, persistence schema, or route-controller logic.
- `src/test/save-snapshots.test.ts` covers both resolver state and booted runtime state: guided season, active request, journal request, world-map focus, no route marker, selected `HAND LENS`, `TREELINE SHELTER LINE`, `launchCard: null`, and no station subtitle drift into `High Pass`.
- `docs/save-snapshot-states.md` documents the new reviewer-facing localStorage state in the existing snapshot list.
- Browser proof under `output/web-game/treeline-main-366-snapshot/` shows the same result visually: station, map footer, and journal all read as `Stone Shelter`.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline"`
- Source inspection of the snapshot builder, snapshot docs, packet result, and browser proof state

## Residual Note

The broader `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline|High Pass"` currently catches an unrelated dirty-tree mismatch in a later High Pass rime-footing journal test: `src/content/biomes/treeline.ts` now returns the shorter `Rime favors low life...` summary while `src/test/runtime-smoke.test.ts:8954` still expects the older longer summary. That is outside the lane-1 snapshot change and should be handled by the owning content/runtime expectation pass rather than blocking this review.

## Next Handoff

Lane 1 is clear for packet `140`. Promote `ECO-20260420-scout-370` for packet `141`.
