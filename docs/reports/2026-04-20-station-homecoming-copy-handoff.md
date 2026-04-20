# Station Homecoming Copy Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-343`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Lane: `lane-2`

## Scout Finding

Lane 2 can prepare the homecoming language now, but should not wire it into the field station yet. The existing live seams that could show it are station-owned (`field-season-wrap.ts`, `field-station-state.ts`, and the newer homecoming shell/session helpers), while packet `134` still needs lane 1 to land the station homecoming resolver.

The safest lane-2 main chunk is therefore a copy-only helper with tests. It should export a tiny filed-progress line family that lane 1 or lane 4 can consume later from the station seam, without adding a new panel, save field, route controller behavior, route-board layout, or renderer change.

## Recommended Main Target

Add a small resolver such as `resolveFieldStationHomecomingCopy(...)` in a dedicated copy helper, then test it directly.

Recommended files:

- `src/engine/field-station-homecoming-copy.ts`
- `src/test/field-station-homecoming-copy.test.ts`
- `docs/reports/2026-04-20-station-homecoming-copy-implementation.md`

## Copy Contract

Use one compact label, for example `WELCOME BACK`, and one single-sentence text line. These lines should acknowledge filed progress without repeating route notes or clue lists:

- `coastal-edge-moisture`: `Coast line filed. The station holds one shore-to-forest thread.`
- `tundra-survey-slice`: `Coast and ridge filed. The board reads like one longer path.`
- `treeline-low-fell`: `Edge line filed. Coast, ridge, and low fell now connect.`
- `forest-expedition-upper-run`: `Root Hollow filed. The season reaches from shore to upper run.`
- `forest-season-threads`: `Season Threads filed. The station can rest before High Pass.`
- `treeline-high-pass`: `High Pass filed. Treeline stone and talus close the field arc.`

Suggested budget:

- label max: `14` characters
- text max: `76` characters
- one sentence or two very short clauses max
- no more than one route title per line, except the final arc close if needed

## Acceptance For Main

- Adds a copy-only resolver/data bank for the filed-progress homecoming line family.
- Resolves the strongest applicable filed milestone from existing `completedFieldRequestIds`; no new save state.
- Tests default/no-progress fallback plus all six filed-progress milestones.
- Tests label/text budgets and avoids clue-list repetition.
- Does not wire the copy into station rendering, station state, route controller behavior, route-board layout, save schema, geometry, or new UI panels.

## Handoff Notes

Lane 1 should decide where and when this helper is consumed after the packet `134` homecoming resolver lands. Lane 4 should only touch notice priority or route-return handoff behavior if the copy competes with filing/support notices.

## Verification For Scout

- `npm run validate:agents`
- `git diff --check`
