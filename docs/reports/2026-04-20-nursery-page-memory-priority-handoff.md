# Nursery Page Memory Priority Handoff

Queue: `ECO-20260420-scout-346`
Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
Role: `scout-agent`
Lane: `lane-1`

## Finding

Lane 1 does not need a new nursery surface for packet `135`.

The useful systems seam is already present:

- `resolveNurseryStateView(...)` exposes `activeProject`, `routeSupportHint`, `showRouteSupportHint`, `teachingBedFocusMode`, `utilityNote`, and `compostRate`.
- `shouldShowNurseryRouteSupportHint(...)` already suppresses the route-support strip while a mature teaching bed owns the home-loop beat.
- `resolveFieldStationNurseryPageLayout(...)` already keeps mature and active-growth teaching-bed states in the dense layout family without widening the station shell.
- lane 2 has already refreshed the `salmonberry-bed.memorySummary` to `Cool forest edge where salmonberry thickets hold shade.` and reviewed that copy as science-supported.

One concrete regression remains: the live nursery-page seam test still expects the old salmonberry mature footer. Running

`npm test -- --run src/test/field-station-nursery-page.test.ts`

currently fails in `uses the authored mature body and memory footer on the live nursery page seam` because `resolveMatureBedFooterCopy(...)` correctly returns the new lane-2 memory line while the test expects `Cool wet edge tucked under taller cover.`

## Main-346 Target

Keep the implementation test-first and small.

Recommended work:

- Update `src/test/field-station-nursery-page.test.ts` so the mature salmonberry footer expectation matches the reviewed lane-2 memory line.
- Add one focused assertion that a mature teaching bed hides the route-support strip even when the player is not actively focused on the bed card, so mature habitat memory cannot overlap or compete with repeated route hints.
- Do not change nursery rendering, layout dimensions, station pages, save schema, route-support copy, nursery project copy, route logic, or geometry unless the focused test reveals a real helper bug.

Recommended files:

- `src/test/field-station-nursery-page.test.ts`
- `docs/reports/2026-04-20-nursery-page-memory-priority-implementation.md`

## Acceptance For Main-346

- `src/test/field-station-nursery-page.test.ts` passes.
- The mature salmonberry live-page footer expectation uses `Cool forest edge where salmonberry thickets hold shade.`
- Coverage proves mature teaching-bed memory keeps priority over the route-support strip without widening the nursery page.
- Runtime code remains unchanged unless the focused test exposes an actual helper bug.
- No save/schema, route-support behavior, nursery shell layout, new station card, new page, geometry, or copy-bank changes.
- Add `docs/reports/2026-04-20-nursery-page-memory-priority-implementation.md`.
- Run `npm test -- --run src/test/field-station-nursery-page.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`.
