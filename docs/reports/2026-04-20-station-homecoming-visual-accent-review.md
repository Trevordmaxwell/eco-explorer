# Station Homecoming Visual Accent Review

Created: 2026-04-20

Queue: `ECO-20260420-critic-344`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `critic-agent`
Lane: `lane-3`

## Verdict

No blocker.

The lane-3 implementation lands the station homecoming visual payoff in the intended upper-frame / brace-cap family and consumes lane 1's reviewed station-owned `fieldStation.homecoming` / `homecomingMilestoneRequestId` seam. It does not introduce parallel route, station, save, copy, support, journal, or science state.

## Confirmed

- `FieldStationBackdropAccentState.hasHomecomingFrameAccent` is derived from the existing `homecomingMilestoneRequestId` input and exposed through `render_game_to_text().fieldStation.backdropAccent`.
- The visible treatment is two tiny cap beads near the upper frame. It does not add lower-sill growth, side-gutter bulk, another full-width lintel, a panel, or text.
- `resolveFieldStationGrowthAccentState(...)` still ignores `homecomingMilestoneRequestId`, so the lower sill / planter family stays capped.
- The archived High Pass unit case keeps the existing late-season lintel and adds only the frame-cap memory state.
- The focused runtime smoke proves the earned `coastal-edge-moisture` station return exposes `hasHomecomingFrameAccent: true` while keeping right brace, center tie, and late-season lintel false in that representative state, and calm reopen clears the homecoming memory fields.
- The browser proof under `output/lane-3-main-344-browser/` exports the raw canvas at `256x160` and the paired state JSON confirms the cap state.

## Watch Item

The accent is intentionally very small. If playtesting says players miss the homecoming payoff, tune contrast or placement inside this same cap seam rather than adding more lower sill, side gutter, lintel, station copy, or a new panel.

## Verification Reviewed

- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "homecoming copy state"`
- `npm run build`
- `$WEB_GAME_CLIENT` smoke under `output/lane-3-main-344-client/`
- Seeded browser proof under `output/lane-3-main-344-browser/`
- `npm run validate:agents`
- `git diff --check`

## Handoff

`ECO-20260420-scout-348` can be promoted to `READY`. Packet `134` can be marked `DONE`.
