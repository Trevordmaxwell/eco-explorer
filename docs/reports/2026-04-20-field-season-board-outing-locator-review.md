# Field-Season Board Outing Locator Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-414`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-1`

## Review Result

No blocker found.

The extraction is behavior-preserving. The active outing locator family now lives in `src/engine/field-season-outing-locator.ts`, `field-season-board.ts` imports the shared Root Hollow expedition progress helpers from that module, and the board keeps a compatibility re-export for existing callers.

## Checks

- `resolveSeasonOutingLocator()` still uses `hasResolvedFieldRequest()` semantics through the moved helper, so effective route dependencies remain intact.
- Root Hollow ready/active/notebook-ready, Season Threads, High Pass active, High Pass ready-to-file, and filed High Pass suppression stay covered by the existing board and snapshot tests.
- `field-request-state.ts` now imports the active outing locator directly from the new module, reducing its dependency on the large board resolver.
- No route-board state, atlas/archive state, expedition card state, station subtitle behavior, route definitions, save schema, rendering, authored content, geometry, or journal layout changed for this item.

## Verification

```bash
npm test -- --run src/test/field-season-board.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
```

The main implementation also ran a web-game client smoke that booted Sunny Beach and produced `output/web-game/shot-0.png` plus `output/web-game/state-0.json` with no `errors-0.json`.

## Follow-Up

Packet `152` lane 1 is clear. Promote `ECO-20260420-scout-418` for packet `153`.
