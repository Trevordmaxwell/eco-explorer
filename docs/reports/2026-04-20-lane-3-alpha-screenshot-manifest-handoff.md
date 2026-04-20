# Lane 3 Alpha Screenshot Manifest Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-328`
- Unblocks: `ECO-20260420-main-328`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Lane: `lane-3`

## Scout Finding

The current alpha arc already has useful lane-3 browser proof screenshots, but they live under ignored `output/` folders and are scattered across individual implementation runs. That is correct for generated artifacts, but it means future reviewers do not yet have a source-tracked list of named comparison frames to recapture when spatial regressions are suspected.

The lane-3 preflight pass should therefore add a source-tracked screenshot-proof manifest, not new runtime geometry. The manifest should name the current alpha arc's key physical-memory frames, point at the best existing ignored proof paths when available, and define canonical fresh recapture paths under `output/alpha-screenshot-proof/`.

## Recommended Implementation

Create `docs/alpha-screenshot-proof-manifest.md`.

The manifest should include:

- a short purpose statement: this is a human review checklist for 256x160 spatial regressions, not a committed image bundle
- capture rules: screenshots remain generated under ignored `output/`, while the manifest and expectations stay source-tracked
- stable frame ids, grouped by biome or travel seam
- for each frame: biome/zone, what visual relationship must remain readable, existing proof path, fresh recapture path, state fields worth checking from `render_game_to_text()`, and linked tests/reports where useful
- a tiny pass/fail rubric for reviewers: readable pocket shape, player/camera state matches the named beat, no overlay covering the spatial read, no console errors, and state JSON agrees with the screenshot

## Frame Set

Use this compact representative set rather than trying to catalog every historical screenshot:

| Frame id | Purpose | Existing proof |
| --- | --- | --- |
| `beach-opening-shoulder` | First beach-side lee shoulder at the start, before the older crest sequence. | `output/main-268-browser/beach-opening-shoulder.png` |
| `beach-lee-pocket` | Driftwood/wrack pocket as a beach traversal rest. | `output/main-192-browser/lee-pocket.png` |
| `beach-tidepool-approach` | Tidepool ledge approach and low-platform readability. | `output/main-192-browser/tidepool-approach.png` |
| `beach-tidepool-return` | Return-side tidepool relationship stays recoverable. | `output/main-192-browser/tidepool-return.png` |
| `scrub-corridor-threshold` | Beach-to-scrub walking seam keeps direction and threshold readable. | `output/main-46-corridor-browser/corridor-threshold.png` |
| `forest-giant-tree-entry` | Giant-tree climb starts with scale and trunk target visible. | `output/main-150-browser/giant-tree-entry.png` |
| `forest-log-run-trunk` | Mid-climb log-run/trunk carry remains readable. | `output/main-150-browser/log-run-trunk.png` |
| `forest-cave-trunk` | Root-hollow cave/trunk relation still reads as connected sub-ecosystem space. | `output/main-150-browser/cave-trunk.png` |
| `forest-upper-return` | Upper route has a clear return/rest relationship instead of feeling like a dead end. | `output/main-150-browser/upper-return.png` |
| `treeline-last-tree-shelter` | Last-tree shelter stop before the lee-pocket continuation. | `output/main-267-browser/treeline-last-tree-shelter.png` |
| `treeline-stone-shelter` | Stone Shelter basin as the remembered High Pass middle. | `output/main-309-browser/stone-shelter-basin.png` |
| `treeline-rime-brow` | Rime Brow shelf reads as a spatial third beat, not only a route label. | `output/main-313-browser/rime-brow-overlook.png` |
| `treeline-talus-hold` | High Pass final return/readiness state at the open-fell talus hold. | `output/web-game/high-pass-closure-main-320/shot-2.png` as a starting reference; fresh capture preferred |
| `tundra-drift-hold` | Mid-snow-meadow drift hold adds one readable tundra rest. | `output/main-259-browser/tundra-drift-hold.png` |
| `tundra-thaw-bench` | Thaw-skirt bench and upper/lower relief stay readable. | `output/main-317-browser/thaw-bench.png` |

## State Fields To Capture

The manifest should ask reviewers to pair each screenshot with either the existing `state.json`/`state-*.json` next to the proof or a fresh `render_game_to_text()` dump. Useful fields:

- `scene`, `mode`, `biomeId`, `sceneBiomeId`, and `zoneId`
- `camera.x`, `camera.y`, `player.x`, `player.y`, and `player.facing`
- `visibleVerticalCueIds`, `nearbyClimbable`, `nearbyTravelTarget`, and `nearbyDoor`
- `nearbyInspectables` for the authored carrier cluster around the pocket
- `fieldRequestNotice`, `fieldRequestHint`, `openBubble`, `menu`, and `journal` to confirm overlays are not blocking the spatial proof

## Non-Goals

- Do not edit biome geometry, route state, station chrome, save schema, or science copy for this preflight step.
- Do not commit generated screenshots or fresh browser-output folders.
- Do not add a screenshot automation framework unless the implementation stays very small; a hand-authored manifest plus validation of referenced files is enough for packet 130.
- Do not make this an all-surface visual QA matrix. Lane 3 owns physical-memory frames only.

## Verification For Main

Recommended checks:

- `npm run validate:agents`
- a shell check that every existing proof path named in the manifest currently exists
- if the main pass adds no runtime code, no build is required; if it touches runtime or tests, also run the focused tests and `npm run build`

## Queue Handoff

Promote `ECO-20260420-main-328` to `READY` with `docs/alpha-screenshot-proof-manifest.md` as the expected source artifact and this report as its source. Keep `ECO-20260420-critic-328` blocked until the manifest lands.
