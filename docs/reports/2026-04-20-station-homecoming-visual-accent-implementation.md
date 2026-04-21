# Station Homecoming Visual Accent Implementation

Created: 2026-04-20

Queue: `ECO-20260420-main-344`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `main-agent`
Lane: `lane-3`

## Summary

Implemented the lane-3 station homecoming visual accent as a tiny upper-frame memory cap in `src/engine/field-station-homecoming-shell.ts`.

The accent consumes lane 1's reviewed station-owned `fieldStation.homecoming` / `homecomingMilestoneRequestId` seam through the existing `buildFieldStationGrowthInput(...)` path. It does not add a separate route, station, save, or copy state.

## Runtime Shape

- `FieldStationBackdropAccentState` now exposes `hasHomecomingFrameAccent` next to `hasHomecomingMemory`.
- `drawFieldStationBackdropAccent(...)` draws two small upper brace-cap beads when the homecoming memory seam is present.
- The lower sill / planter resolver still ignores `homecomingMilestoneRequestId`, so homecoming does not create new sill growth.
- The existing side braces and archived High Pass lintel keep their current rules; the new cap does not add a second lintel or widen brace trunks.
- `render_game_to_text()` exposes the accent through the existing `fieldStation.backdropAccent` debug state.

## Proof

- Unit coverage now protects default, mid-progress, mature/route-progress, archived High Pass, homecoming-only, and archived-plus-homecoming states.
- The focused runtime smoke proves an earned `coastal-edge-moisture` station return exposes `hasHomecomingFrameAccent: true` while keeping right brace, center tie, and late-season lintel false in that representative state.
- The calm reopen clears `homecomingMilestoneRequestId`, `hasHomecomingMemory`, and `hasHomecomingFrameAccent`.
- Browser proof lives under `output/lane-3-main-344-browser/` with `station-homecoming-shell.png` exported from the raw canvas at `256x160` and `station-homecoming-state.json` confirming the debug state.

## Guardrails Kept

- No save schema, route definitions, route filing behavior, support notices, science copy, journal copy, station page, or panel changes.
- No lower-sill growth, side-gutter bulk, second full-width lintel, new text, or new station chrome.
- The pass stayed inside the existing homecoming shell helper and focused tests.

## Verification

- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "homecoming copy state"`
- `npm run build`
- `$WEB_GAME_CLIENT` smoke under `output/lane-3-main-344-client/`
- Seeded browser proof under `output/lane-3-main-344-browser/`
- `npm run validate:agents`
- `git diff --check`
