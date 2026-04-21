# Route Loop Browser Proof Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-425`
Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
Lane: `lane-4`

## Scope

Packet `154` asks lane 4 to prove the route loop is browser-clean across active, ready-to-file, filed, and replay-facing surfaces. This should be a proof-first pass: capture real browser artifacts and console/page errors, then only change runtime code if the proof exposes a lane-4 route/support/replay blocker.

## Existing Seams

- `window.get_debug_save_snapshots()` already exposes useful seeded states, including `high-pass-active`, `high-pass-ready-to-file`, and `high-pass-filed`.
- `window.render_game_to_text()` can capture the compact in-game state after each seeded load without adding a committed test harness.
- Existing Vitest coverage already protects the High Pass route loop at the engine level; this pass should add browser-level confidence and not duplicate the route-state matrix.

## Main Contract

- Build or preview the app, then run a real browser proof at the handheld viewport baseline.
- Seed the browser from the debug save snapshots for `high-pass-active`, `high-pass-ready-to-file`, and `high-pass-filed`.
- Capture a PNG and JSON/text state for each seeded route state under `output/lane-4-main-425-browser/`.
- Capture console/page errors into `output/lane-4-main-425-browser/console-errors.json` even if the list is empty.
- Exercise or inspect enough of each seeded state to confirm active/replay labels, ready station filing state, and filed route suppression remain coherent.
- Add `docs/reports/2026-04-20-route-loop-browser-proof-implementation.md` summarizing commands, artifact paths, console result, and whether any lane-4 blocker was found.

## Non-Goals

- Do not add new route types, new support ids, station pages, inventory/loadout UI, content density, geometry, or save fields.
- Do not rewrite broad station/page chrome owned by lane 1 or spatial frames owned by lane 3.
- Do not commit browser output from `output/`; it is ignored proof material.
- Do not change runtime code unless the proof reveals an actual console/runtime failure in the lane-4 route/support/replay seam.

## Suggested Verification

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|snapshot"
npm test -- --run src/test/runtime-smoke.test.ts -t "files High Pass from the live talus-hold loop and settles the completed field arc"
npm run build
npm run validate:agents
git diff --check
```
