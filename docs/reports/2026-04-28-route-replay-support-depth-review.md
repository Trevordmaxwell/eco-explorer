# Route Replay And Support Depth Review

Date: 2026-04-28
Owner: lane-4 critic-agent
Queue item: `ECO-20260428-critic-497`
Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`

## Verdict

Clean. The implementation deepens `Held Dune` through the existing hand-lens/process-focus seam without creating a new replay, support, save, station, or route framework.

## Review Notes

- `source-to-shore-dune-catch.processFocus.activeSlotEntryIdsBySlotId` now lets hand lens prefer `beach-grass` for `dune-catch` and `pacific-wax-myrtle` for `swale-hold` during the active `sand-capture` window.
- The work correctly avoids a `cool-edge` active carrier because the authored `sand-capture` process is not a forest-edge process.
- Ready-to-file and filed identities remain canonical `Dune Catch`; filed Source to Shore still ends at exactly three done beats.
- Non-hand-lens supports retain normal nearest-inspect behavior, and ready-to-file support notices remain calm.
- No route ids, evidence ids, ordered slots, filed text, support ids, save schema, station shell, geometry, content pack, or fourth Source to Shore beat changed.

## Verification

- `npm test -- --run src/test/field-request-catalog.test.ts src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
- `npm run build`

Focused sweep result: 9 files, 370 tests passing.

## Handoff

Packet `190` can close. Promote `ECO-20260428-scout-498` for the notebook filing synthesis scope.
