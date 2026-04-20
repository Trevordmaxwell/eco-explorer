# Station Homecoming Lane 1 Review

Queue: `ECO-20260420-critic-342`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `critic-agent`
Lane: `lane-1`

## Verdict

No blocker.

The lane-1 implementation gives packet `134` the missing station-owned homecoming seam without changing save shape, route definitions, filing behavior, support notices, geometry, science copy, or lane-2 copy text.

## Review Notes

- `resolveFieldStationHomecomingState(...)` consumes lane 2's `resolveFieldStationHomecomingCopy(...)` only inside `src/engine/field-station-state.ts`, so rendering and future lanes can read station state instead of importing the copy helper directly.
- `fieldStation.homecoming` is gated by `arrivalMode === "homecoming"` and a completed filed-progress milestone; the focused runtime smoke proves the representative earned open exposes the state and the second calm open clears it.
- The visible change stays to one transient header-line in the existing station chrome. It does not create a new panel, page, card stack, or permanent subtitle.
- The lane-3 seam is present as `homecomingMilestoneRequestId` / `hasHomecomingMemory` on the existing backdrop accent state, and the pure overlay test confirms it does not draw braces, lintels, or other accents by itself.
- The durable project-memory note is useful and correctly tells future lanes to consume the station-owned seam instead of inventing parallel homecoming state.

## Watch Item

The current homecoming state intentionally follows the existing `arrivalMode` signal plus the strongest completed filed-progress milestone. If future work needs to distinguish "returned because a route was just filed" from "returned because nursery/ledger sync changed something," that should be a narrow follow-up on `resolveFieldStationOpenState(...)` rather than another copy or route-owned homecoming state.

## Verification Reviewed

- `npm test -- --run src/test/field-station.test.ts`
- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "homecoming copy state"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Handoff

`ECO-20260420-main-344`, `ECO-20260420-main-345`, and `ECO-20260420-scout-346` can unblock from this lane-1 gate. Lane 3 should use the non-drawing `homecomingMilestoneRequestId` / `hasHomecomingMemory` seam for visual accent work, and lane 4 should use `fieldStation.homecoming` for notice lifecycle proof instead of creating route-owned station state.
