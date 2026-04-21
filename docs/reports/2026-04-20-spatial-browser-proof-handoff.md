# Spatial Browser Proof Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-424`
Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
Lane: `lane-3`

## Scout Result

Implementation-ready.

Packet `154` asks lane 3 to prove representative spatial frames are browser-clean and visually intact. This should be a proof-first pass, not a geometry or rendering pass. The source-tracked `docs/alpha-screenshot-proof-manifest.md` already names the important frame families, while `window.get_debug_save_snapshots()` and `window.render_game_to_text()` provide enough browser hooks to seed states and capture compact JSON beside screenshots.

## Recommended Main Scope

Capture ignored browser proof under `output/lane-3-main-424-spatial-proof/`.

Required captures:

- `first-session-beach-field.png` / `.json`: seed `first-session`, press through title, capture the beach opener field view.
- `forest-moisture-holders-field.png` / `.json`: seed `forest-moisture-holders`, press through title, capture the forest field view and confirm no missing forest assets or console errors.
- `high-pass-active-treeline-field.png` / `.json`: seed `high-pass-active`, press through title, capture the live treeline/high-country field view.
- `tundra-thaw-window-field.png` / `.json`: seed `tundra-thaw-window`, press through title, capture the tundra field view.
- `console-errors.json`: capture console/page errors even when empty.

Preferred extra captures if the harness remains stable:

- `forest-cave-trunk.png` / `.json`: reuse the runtime-smoke Root Hollow movement path toward `root-hollow-cave-trunk`.
- `treeline-rime-brow.png` / `.json` or `treeline-talus-hold.png` / `.json`: reuse the runtime-smoke high-country movement bands.
- `tundra-thaw-bench.png` / `.json`: reuse the runtime-smoke tundra thaw-skirt movement path.

The main pass should visually inspect the screenshots and record whether the player/camera state, zone, nearby inspectables/climbables, and visible vertical cues match the intended place. If a proof exposes clipping, missing sprites, console errors, or a clear asset/rendering regression, document the blocker first and only make the smallest lane-3-owned fix if it is obviously local to rendering, assets, or spatial frame readability.

## Useful Existing References

- `docs/alpha-screenshot-proof-manifest.md` lists the current alpha spatial frame ids and pass criteria.
- `src/engine/debug-save-snapshots.ts` exposes the required snapshot ids.
- `docs/reports/2026-04-20-route-loop-browser-proof-implementation.md` shows the current pattern for seeded browser captures and empty console-error artifacts.
- `src/test/runtime-smoke.test.ts` has deterministic movement bands for Root Hollow, Rime Brow, Talus Hold, and tundra thaw-skirt if the main pass wants deeper optional proof frames.

## Non-Goals

- No route-state, support-choice, station, save-schema, journal, content-fact, or authored-copy changes.
- No new screenshot framework, committed screenshots, committed state dumps, or committed console logs.
- No new geometry or asset edits unless the browser proof exposes a concrete lane-3 blocker.
- No lane-4 route-loop assertions; lane 4 already completed its packet `154` browser proof.

## Baseline Checks

Passed during scout:

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "debug save snapshots|High Pass|tundra|treeline"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts src/test/tundra-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave|thaw|frost"
npm run build
```

## Suggested Main Verification

```bash
node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:4174 --screenshot-dir output/lane-3-main-424-spatial-proof/client-boot --actions-json '{"steps":[{"buttons":["enter"],"frames":8},{"buttons":[],"frames":12}]}' --iterations 1 --pause-ms 250
npm test -- --run src/test/save-snapshots.test.ts -t "debug save snapshots|High Pass|tundra|treeline"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts src/test/tundra-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave|thaw|frost"
npm run build
npm run validate:agents
git diff --check
```

Run a production preview or reuse the active preview as appropriate. If using a custom Playwright runner to seed `localStorage` from `window.get_debug_save_snapshots()`, keep it one-off or under ignored `output/`; do not add committed harness code unless the proof reveals a durable need.
