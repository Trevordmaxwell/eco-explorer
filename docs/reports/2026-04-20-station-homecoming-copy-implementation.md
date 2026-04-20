# Station Homecoming Copy Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-343`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Lane: `lane-2`

## What Landed

Added a copy-only station homecoming helper in `src/engine/field-station-homecoming-copy.ts`.

The helper exports:

- the compact label `WELCOME BACK`
- label and text budgets
- six filed-progress milestone lines
- `resolveFieldStationHomecomingCopy(...)`, which chooses the strongest applicable line from existing `completedFieldRequestIds`

The resolver is intentionally not wired into station rendering, station state, route controller behavior, route-board layout, save schema, geometry, or a new UI panel. Lane 1 can consume this helper later after the packet `134` station homecoming seam lands.

## Filed Milestones Covered

- `coastal-edge-moisture`
- `tundra-survey-slice`
- `treeline-low-fell`
- `forest-expedition-upper-run`
- `forest-season-threads`
- `treeline-high-pass`

## Verification

- `npm test -- --run src/test/field-station-homecoming-copy.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
