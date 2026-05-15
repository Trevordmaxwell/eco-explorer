# RC Playtest Smoke Pass

Date: 2026-05-15
Queue: `ECO-20260515-main-01`
Lane: `lane-1`
Packet: `.agents/packets/193-rc-playtest-readiness.json`

## Findings

### P1: Field station route frames are state-correct but visually overlapping at native size

Evidence:

- `output/lane-1-main-01-rc-playtest-smoke/station-return-routes.png`
- `output/lane-1-main-01-rc-playtest-smoke/source-to-shore-filed-station.png`

Repro:

1. Run `npm run dev -- --host 127.0.0.1`.
2. Load the `station-return` or `source-to-shore-dune-catch-filed` debug snapshot through `window.get_debug_save_snapshots()`.
3. Press `Enter`, open `M -> World map`, then open `M -> Field station`.
4. Capture the canvas at native `256x160`.

What the player sees:

- In `station-return-routes`, route/status text crowds the route board and support row.
- In `source-to-shore-filed-station`, the welcome/subtitle line and Source to Shore filed board text crowd the top and middle route panels.

Why it matters:

- These are observer-startable RC slices. The state is correct, but a child or observer may have trouble reading what the station wants them to notice next.

Likely owner:

- Lane 1, field-station route page layout/readability.

Smallest next step:

- Queue a lane-1 blocker fix that only adjusts field-station route page spacing/copy density for these two smoke frames, with before/after `256x160` proof. Do not add a station page, route, content, save field, or observer-doc scope.

## Passed Checks

- `npm run alpha:rc` passed.
- Review-drop archive: `output/review-drops/eco-explorer-review-drop-20260514-184243.tgz`.
- Fresh title boot is nonblank and the canvas backing size is `256x160`.
- Fresh first-play `NOTEBOOK TASK` notice appears after `Enter`; keyboard start input works.
- `source-to-shore-active-world-map` loads from the debug snapshot and opens the world map without console/page errors.
- Filed Source to Shore state remains semantically closed: `activeFieldRequest` is `null`, route id is `source-to-shore-beta`, progress label is `FILED`, `targetBiomeId` is `null`, beat count is `3`, `replayNote` is `null`, and route marker/replay labels are `null`.
- `browser-errors.json` is empty.

## Proof Artifacts

Proof directory:

- `output/lane-1-main-01-rc-playtest-smoke/`

Artifacts:

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

## Verification

Passed:

```sh
npm run alpha:rc
```

Source workspace result:

- agent validation passed
- science check passed
- full tests passed: 94 files, 1478 tests
- production build passed
- review drop created and clean-extract verified

Clean extract result:

- agent validation passed
- science check passed
- tests passed: 47 files, 739 tests
- production build passed

## Decision

Do not start observed external sessions yet. Queue the smallest station route readability blocker and keep `ECO-20260515-critic-01` parked until the fix has after-proof.
