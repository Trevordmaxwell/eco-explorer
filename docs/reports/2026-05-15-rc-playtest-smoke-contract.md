# RC Playtest Smoke Contract

Date: 2026-05-15
Queue: `ECO-20260515-scout-01`
Lane: `lane-1`
Packet: `.agents/packets/193-rc-playtest-readiness.json`

## Decision

Promote `ECO-20260515-main-01` as a proof-only internal RC smoke pass for the committed post-packet-192 build.

Do not implement features, new routes, content breadth, station pages, save fields, traversal changes, or observer-doc copy in this lane item. The main pass should either clear the current build for observed sessions or open the smallest explicit blocker item.

## Required Commands

Run from `/Users/trevormaxwell/Desktop/game`:

```sh
git branch --show-current
git status --short
npm run alpha:rc
git diff --check
```

`npm run alpha:rc` is required because it wraps source validation, science check, full tests, production build, review-drop packaging, and clean-extract verification. The report must record the final archive path printed by the command.

## Proof Folder

Use:

- `output/lane-1-main-01-rc-playtest-smoke/`

Required files:

- `manifest.json`
- `browser-errors.json`
- `title-fresh-boot.png`
- `title-fresh-boot.state.json`
- `fresh-first-play-notice.png`
- `fresh-first-play-notice.state.json`
- `station-return-routes.png`
- `station-return-routes.state.json`
- `source-to-shore-active-world-map.png`
- `source-to-shore-active-world-map.state.json`
- `source-to-shore-filed-station.png`
- `source-to-shore-filed-station.state.json`

Prefer raw canvas captures from `canvas.toDataURL("image/png")` so the screenshots are exactly `256x160`. If the browser tool can only save an element screenshot, the paired state JSON must assert the canvas backing size is `256x160`.

## Browser Smoke Slices

Use the local Vite app and runtime debug save hook:

```sh
npm run dev -- --host 127.0.0.1
```

Capture these slices:

1. `title-fresh-boot`
   - Clear `localStorage` for `eco-explorer-save-v1`, reload, and capture the first title screen.
   - Assert the game canvas is nonblank, the title state is visible, and no browser errors are logged.

2. `fresh-first-play-notice`
   - From a fresh title, press `Enter` to start.
   - Assert keyboard input works, the beach opener appears, and the first notebook task notice is readable.

3. `station-return-routes`
   - Load the `station-return` debug snapshot through `window.get_debug_save_snapshots()`.
   - Navigate through the in-game menu/world-map flow into the field station.
   - Assert the route board, support row, and station shell are readable with no console/page errors.

4. `source-to-shore-active-world-map`
   - Load the `source-to-shore-active` debug snapshot.
   - Open the world map from the in-game menu.
   - Assert the active Source to Shore target/route marker state is coherent and the screen does not show stale filed closure copy.

5. `source-to-shore-filed-station`
   - Load the `source-to-shore-dune-catch-filed` debug snapshot.
   - Navigate into the field station.
   - Assert filed Source to Shore stays settled: `activeFieldRequest` is `null`, the route board is `FILED`, `targetBiomeId` is `null`, there are exactly three beats, and no route marker/replay pressure is visible.

## Pass / Fail Thresholds

P0 blocker:

- app cannot boot locally
- `npm run alpha:rc` fails
- production build or clean review-drop verification fails
- browser console/page error appears during smoke
- canvas is blank or keyboard input does not start play
- debug save hook or required snapshot ids are missing

P1 blocker:

- title, first task notice, field station route board, world map route target, or filed Source to Shore station state has player-blocking overlap or clipping at native `256x160`
- filed Source to Shore reopens as an active field request, route marker target, replay note, or hidden fourth beat
- save setup requires hand-editing JSON beyond the documented debug snapshot hook

P2/P3 findings:

- minor visual crowding that does not block play
- wording that is understandable but could be friendlier
- optional observer note for lane 2 documentation work

If any P0/P1 appears, the main item must record reproduction steps and open the smallest explicit blocker queue item instead of broad redesign. If no P0/P1 appears, promote `ECO-20260515-critic-01`.

## Report Output

The main pass should write:

- `docs/reports/2026-05-15-rc-playtest-smoke-pass.md`

The report should lead with severity-ordered findings, list the RC archive path, list proof artifacts, summarize console health, and state whether lane 1 recommends observed external sessions proceed.
