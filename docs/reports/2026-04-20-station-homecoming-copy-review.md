# Station Homecoming Copy Review

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-critic-343`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Lane: `lane-2`

## Verdict

No blocker.

The lane-2 implementation stays inside the intended copy-only boundary. `src/engine/field-station-homecoming-copy.ts` exports a tiny homecoming line family and a resolver that reads only existing `completedFieldRequestIds`; it does not wire into station rendering, station state, route controller behavior, route-board layout, save schema, geometry, or a new UI panel.

## Review Notes

- The milestone ordering is strongest-first in the helper and is tested through chronological cumulative saves, so later filed beats supersede earlier homecoming lines.
- The fallback stays silent before the first filed-progress milestone, which keeps lane 1 free to decide when the station seam should surface this copy.
- The budget test guards the `WELCOME BACK` label, max text length, two-sentence ceiling, and obvious clue-list repetition from the route-note family.
- The copy is station-feeling rather than fact-bearing, so no science-source ledger change is needed.

## Verification Reviewed

- `npm test -- --run src/test/field-station-homecoming-copy.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Residual Risk

This helper is intentionally unused until lane 1 lands the station homecoming seam. The next implementation that consumes it should keep the display conditional on the earned homecoming state rather than turning it into an always-on station subtitle.
