# Field-Season Board Outing Locator Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-414`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-1`

## Scout Result

Implementation-ready.

The safest lane-1 split for packet `152` is the active outing locator family. `resolveSeasonOutingLocator()` is already a pure exported resolver, it is used by `field-season-board.ts` and `field-request-state.ts`, and existing tests cover its important Root Hollow, Season Threads, High Pass active, High Pass ready-to-file, High Pass filed, atlas-note, and copy-budget states.

## Recommended Main Scope

- Create `src/engine/field-season-outing-locator.ts`.
- Move `ActiveOutingLocator` and `resolveSeasonOutingLocator()` into the new module.
- Move only the minimal private expedition-progress helpers needed by the locator into the new module, or create one tiny shared helper module if avoiding duplicate expedition constants keeps the board cleaner.
- Update `field-season-board.ts` and `field-request-state.ts` imports so behavior remains identical.
- Keep `resolveFieldSeasonBoardState()`, `resolveFieldAtlasState()`, `resolveFieldSeasonExpeditionState()`, `resolveFieldSeasonArchiveState()`, `resolveFieldStationSubtitle()`, route definitions, save schema, rendering, and authored copy unchanged.

## Why This Slice

- Packet `152` explicitly names “outing locator” as one acceptable board family.
- The locator is a stable seam shared by station routes, atlas notes, journal bottom-card fallback, route-marker location, and world-map replay label.
- Extracting it lowers `field-season-board.ts` responsibility without reworking the board state machine.
- Atlas/archive extraction would require more adjacent copy-state decisions; station subtitle already lives in `field-season-wrap.ts`, so it is less directly useful for this packet.

## Verification Baseline

```bash
npm test -- --run src/test/field-season-board.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
```

Both passed before implementation.

Recommended implementation verification:

```bash
npm test -- --run src/test/field-season-board.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
npm run validate:agents
git diff --check
```

## Non-Goals

- No new season page, station card, route, expedition, save migration, world-map HUD, planner, or copy rewrite.
- No changes to Root Hollow or High Pass progression behavior.
- No changes to field-station rendering, overlay rendering, biome geometry, science content, or journal layout.
