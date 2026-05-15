# RC Station Route Readability Fix

Date: 2026-05-15
Queue: `ECO-20260515-main-03`
Lane: `lane-1`
Packet: `.agents/packets/193-rc-playtest-readiness.json`

## Summary

Fixed the RC smoke P1 where field-station route frames were state-correct but visually crowded at native `256x160`.

The change stays inside `src/engine/field-station-routes-page.ts` and only adjusts the existing route page layout:

- gives the route board enough vertical room for the title, progress label, summary, and three beat rows
- tightens route beat row spacing so rows stay inside the board
- preserves route ids, save state, station pages, support behavior, route filing, traversal, and content

## After-Proof

Proof directory:

- `output/lane-1-main-03-station-route-readability-fix/`

Artifacts:

- `manifest.json`
- `browser-errors.json`
- `station-return-routes-after.png`
- `station-return-routes-after.state.json`
- `source-to-shore-filed-station-after.png`
- `source-to-shore-filed-station-after.state.json`

Result:

- Both after-proof PNGs are raw canvas captures with backing size `256x160`.
- `station-return-routes-after` opens the field station from the `station-return` debug snapshot and keeps `COASTAL SHELTER LINE`, the three route beats, `SUPPORT`, and the support row readable without collision.
- `source-to-shore-filed-station-after` opens the filed Source to Shore station state and keeps `SOURCE TO SHORE`, `FILED`, all three done beats, the atlas strip, and the support row readable without collision.
- The browser console/page-error collection pass returned `browserErrors: []`.

## Verification

Passed:

```sh
npm test -- --run src/test/runtime-smoke.test.ts src/test/field-season-board.test.ts -t "field station|Source to Shore station|filed Source to Shore station page|route board|Trail Stride"
npm run build
npm run validate:agents
git diff --check
```

Browser proof:

- staged `station-return` through `window.get_debug_save_snapshots()`
- staged `source-to-shore-dune-catch-filed` through `window.get_debug_save_snapshots()`
- opened each through the normal `Enter`, `M -> World map`, `M -> Field station` flow
- captured native canvas PNGs and paired `render_game_to_text()` state JSON

## Decision

The lane-1 RC smoke blocker is repaired. Promote `ECO-20260515-critic-01` so the critic can review the complete smoke evidence and after-proof before final readiness signoff.
