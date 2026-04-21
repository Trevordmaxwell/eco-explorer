# Field-Season Board Placement Proof Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-416`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-3`

## Scout Result

Implementation-ready.

Lane 1 already extracted the active outing locator family into `src/engine/field-season-outing-locator.ts` and reviewed the split as behavior-preserving. Lane 4 then added route-state alignment coverage. Lane 3 should not add geometry or edit station/page logic for this packet unless visual proof exposes a real board-placement regression.

## Main Scope

- Capture current browser screenshots under ignored `output/lane-3-main-416-board-placement-proof/`.
- Use the existing debug save snapshot hook, `window.get_debug_save_snapshots()`, to stage station board states rather than hand-authoring saves.
- Capture at least these station route-board states:
  - `season-close-return`: High Pass route shell opens from the season-close return beat
  - `high-pass-ready-to-file`: board filing state, including compact launch-card/notebook-ready placement
  - `high-pass-filed`: settled filed board state
- Save matching `render_game_to_text()` JSON beside each screenshot.
- Add `docs/reports/2026-04-20-field-season-board-placement-proof-implementation.md` summarizing whether the split caused any visual placement delta.

## Visual Delta Policy

- Expected result: no intentional visual deltas from the board split.
- Treat lane-1 and lane-4 review reports plus focused tests as the behavior contract.
- If screenshots show crowding, clipping, or board/chip overlap, document the regression instead of making opportunistic layout edits.

## Non-Goals

- No changes to `src/engine/field-season-board.ts`, `src/engine/field-season-outing-locator.ts`, route definitions, save schema, station pages, authored copy, rendering, biome geometry, or broad smoke coverage unless visual proof exposes a real defect.
- No new route, station card, world-map HUD, planner, route copy rewrite, or screenshot framework.

## Baseline Checks

Passed before handoff:

```bash
npm test -- --run src/test/field-season-board.test.ts -t "High Pass chapter helper|keeps High Pass filed|rime-shelter replay"
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
```

## Suggested Verification

```bash
npm test -- --run src/test/field-season-board.test.ts -t "High Pass chapter helper|keeps High Pass filed|rime-shelter replay"
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run validate:agents
git diff --check
```

Run `npm run build` only if the implementation changes runtime source.
