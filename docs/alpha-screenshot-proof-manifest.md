# Alpha Screenshot Proof Manifest

Created: 2026-04-20

## Purpose

This manifest gives reviewers a stable set of named comparison frames for the current alpha arc's physical spaces. It is a source-tracked checklist, not an image bundle. Generated screenshots, state dumps, console logs, and fresh browser proofs should stay under ignored `output/` paths.

Use this when a spatial, traversal, or visual-place regression is suspected: recapture the named frame, pair it with `render_game_to_text()` state, and compare it against the existing reference path and the pass criteria below.

## Capture Rules

- Keep the game at the internal `256x160` handheld viewport.
- Save fresh captures under `output/alpha-screenshot-proof/`.
- Use the frame id as the filename stem, for example `output/alpha-screenshot-proof/beach-lee-pocket.png`.
- Pair every fresh `.png` with `output/alpha-screenshot-proof/<frame-id>.json` from `render_game_to_text()`.
- Keep console output or browser errors as `output/alpha-screenshot-proof/<frame-id>-errors.json` when available.
- Do not commit generated `output/` files; commit only source docs, source tests, or code changes.

## Pass Criteria

Each frame should pass all of these unless a row-specific note says otherwise:

- The named physical relationship is readable at `256x160` without zooming.
- The player and camera state match the named beat closely enough for a reviewer to understand the comparison.
- `scene`, `mode`, `biomeId`, `sceneBiomeId`, and `zoneId` agree with the intended place.
- Important authored carriers, platforms, climbables, or travel targets are visible or represented in nearby state.
- `menu`, `journal`, `openBubble`, and large overlays are closed.
- Small route notices or hint chips do not cover the spatial read.
- Console errors are empty or explicitly explained in the review note.

## State Fields

Record these state fields next to each fresh capture:

- `scene`, `mode`, `biomeId`, `sceneBiomeId`, `zoneId`, `habitatChipLabel`
- `camera.x`, `camera.y`
- `player.x`, `player.y`, `player.facing`, `player.climbing`, `player.activeClimbableId`
- `visibleVerticalCueIds`
- `nearbyClimbable`, `nearbyTravelTarget`, `nearbyDoor`
- `nearbyInspectables`
- `fieldRequestNotice`, `fieldRequestHint`, `openBubble`, `menu`, `journal`

## Anchor Change Policy

Use this policy before treating an old screenshot as a hard regression baseline.

- `protected baseline`: the frame should stay stable unless a queued lane item intentionally edits that place.
- `expected recapture`: the frame is likely to change during a named later packet; recapture it when that packet touches the place.
- `state gap`: the older reference does not have adjacent `render_game_to_text()` state, so a fresh state pair is required before strict visual comparison.

When a frame changes, capture the full ignored snapshot set under `output/alpha-screenshot-proof/`:

- `output/alpha-screenshot-proof/<frame-id>.png`
- `output/alpha-screenshot-proof/<frame-id>.json`
- `output/alpha-screenshot-proof/<frame-id>-errors.json`

Generated screenshot, state, and browser-error files stay out of source control.

| Frame id | Anchor class | State status | Allowed change / recapture trigger |
| --- | --- | --- | --- |
| `beach-opening-shoulder` | expected recapture | Existing state available | Packet `138` front-half tactile identity or any later beach opener geometry pass. |
| `beach-lee-pocket` | expected recapture | State gap | Packet `138` front-half tactile identity; fresh state is needed before treating the old screenshot as a hard baseline. |
| `beach-tidepool-approach` | expected recapture | State gap | Packet `138` front-half tactile identity if far-right beach movement changes. |
| `beach-tidepool-return` | expected recapture | State gap | Packet `138` front-half tactile identity if far-right recovery changes. |
| `scrub-corridor-threshold` | expected recapture | State gap | Packet `142` adjacent-corridor prototype or packet `143` map/station travel clarity. |
| `forest-giant-tree-entry` | expected recapture | `output/main-150-browser/giant-tree-entry.json` | Packet `139` forest tactile identity or later vertical-expedition work. |
| `forest-log-run-trunk` | expected recapture | `output/main-150-browser/log-run-trunk.json` | Packet `139` forest tactile identity or later vertical-expedition work. |
| `forest-cave-trunk` | expected recapture | `output/main-150-browser/cave-trunk.json` | Packet `139` forest tactile identity or later cave continuation work. |
| `forest-upper-return` | expected recapture | `output/main-150-browser/upper-return.json` | Packet `139` forest tactile identity or later cave/canopy return work. |
| `treeline-last-tree-shelter` | protected baseline | Existing state available | Packet `140` treeline shelter/exposure may recapture only if it touches the threshold band. |
| `treeline-stone-shelter` | protected baseline | Existing state available | Packet `140` may recapture only if Stone Shelter or High Pass opener geometry changes. |
| `treeline-rime-brow` | protected baseline | Existing state available | Packet `140` may recapture only if Rime Brow or the open-fell approach changes. |
| `treeline-talus-hold` | protected baseline | Existing state available | Packet `140` may recapture only if final High Pass return/readiness framing changes. |
| `tundra-drift-hold` | protected baseline | Existing state available | Packet `141` tundra thaw-window payoff may recapture only if snow-meadow relief changes. |
| `tundra-thaw-bench` | protected baseline | Existing state available | Packet `141` may recapture only if thaw-skirt relief or bench recovery changes. |

## First-Session Objective Cue

Packet `132` treats the first beach objective as a proof-first checkpoint, not a reason to add more geometry by default. Use this when reviewing whether a fresh player can see a physical cue for `Shore Shelter` before any tutorial panel or new route object is considered.

| Proof id | Related frame | Existing evidence | Fresh target set | Pass conditions |
| --- | --- | --- | --- | --- |
| `first-session-beach-objective` | `beach-opening-shoulder` | `output/main-268-browser/beach-opening-shoulder.png` plus `output/main-268-browser/state.json` | `output/alpha-screenshot-proof/first-session-beach-objective.png`, `output/alpha-screenshot-proof/first-session-beach-objective.json`, `output/alpha-screenshot-proof/first-session-beach-objective-errors.json` | Beach grass or authored dune-shoulder grass is visible or nearby, `beach-shore-shelter` is active in state, no large overlay covers the cue, and no nearby travel target competes with the first objective. |

If this proof fails, prefer one tiny authored reinforcement near the existing `dune-shoulder-grass` / `dune-shoulder-entry-lip` family. Do not add a new coastline branch, driftwood clue, route objective, tutorial panel, station/menu behavior, or save-state change from this checkpoint.

## Full-Arc Smoke Matrix Spatial Checkpoints

Packet `133` owns deterministic full-arc proof, but this manifest only names spatial checkpoints that reviewers can pair with route-state evidence from the owning lanes. The fresh targets below stay under ignored `output/alpha-screenshot-proof/` paths and should not be treated as permission to add route objectives, save snapshots, or new places.

| Matrix moment | Frame id or proof id | Existing evidence | Fresh target stems | Spatial pass focus |
| --- | --- | --- | --- | --- |
| First beach objective | `first-session-beach-objective` / `beach-opening-shoulder` | `output/main-268-browser/beach-opening-shoulder.png`, `output/main-268-browser/state.json` | `output/alpha-screenshot-proof/first-session-beach-objective.*`, `output/alpha-screenshot-proof/beach-opening-shoulder.*` | Beach grass or dune-shoulder cue remains visible or nearby before overlays compete with the first objective. |
| Beach shelter shape | `beach-lee-pocket` | `output/main-192-browser/lee-pocket.png` | `output/alpha-screenshot-proof/beach-lee-pocket.*` | Driftwood and wrack still read as one recoverable lee shelter pocket. |
| Forest expedition start | `forest-giant-tree-entry` | `output/main-150-browser/giant-tree-entry.png`, `output/main-150-browser/giant-tree-entry.json` | `output/alpha-screenshot-proof/forest-giant-tree-entry.*` | Trunk scale, climb direction, and entry relationship are readable before the vertical route begins. |
| Forest upper-route carry | `forest-log-run-trunk` | `output/main-150-browser/log-run-trunk.png`, `output/main-150-browser/log-run-trunk.json` | `output/alpha-screenshot-proof/forest-log-run-trunk.*` | Log-run movement still points back into the same giant-tree route instead of feeling detached. |
| Root Hollow cave/trunk relation | `forest-cave-trunk` | `output/main-150-browser/cave-trunk.png`, `output/main-150-browser/cave-trunk.json` | `output/alpha-screenshot-proof/forest-cave-trunk.*` | Cave, roots, seep, and trunk read as one connected sub-ecosystem. |
| Root Hollow upper return | `forest-upper-return` | `output/main-150-browser/upper-return.png`, `output/main-150-browser/upper-return.json` | `output/alpha-screenshot-proof/forest-upper-return.*` | The upper route keeps a clear rest and return relationship. |
| High Pass remembered middle | `treeline-stone-shelter` | `output/main-309-browser/stone-shelter-basin.png`, `output/main-309-browser/state.json` | `output/alpha-screenshot-proof/treeline-stone-shelter.*` | Stone Shelter remains the middle basin between approach and open fell. |
| High Pass crest | `treeline-rime-brow` | `output/main-313-browser/rime-brow-overlook.png`, `output/main-313-browser/state.json` | `output/alpha-screenshot-proof/treeline-rime-brow.*` | Rime Brow still reads as a crest beat between Stone Shelter and Talus Hold. |
| High Pass ready-to-file endpoint | `treeline-talus-hold` | `output/web-game/high-pass-closure-main-320/shot-2.png`, `output/web-game/high-pass-closure-main-320/state-2.json` | `output/alpha-screenshot-proof/treeline-talus-hold.*` | Return guidance does not hide the open-fell spatial read. |
| Tundra threshold rest | `tundra-drift-hold` | `output/main-259-browser/tundra-drift-hold.png`, `output/main-259-browser/state.json` | `output/alpha-screenshot-proof/tundra-drift-hold.*` | The drift hold remains a calm process threshold before thaw-skirt detail. |
| Tundra thaw bench | `tundra-thaw-bench` | `output/main-317-browser/thaw-bench.png`, `output/main-317-browser/state.json` | `output/alpha-screenshot-proof/tundra-thaw-bench.*` | The thaw bench, upper shelf, and recovery lane stay readable as one relief family. |

Do not use this table to add route assertions, support rules, save snapshots, screenshot automation, new terrain, new inspectables, or new player-facing prompts. It is a spatial cross-reference for review only.

## Beach And Coast Frames

| Frame id | Biome / zone | Must remain readable | Existing reference | Existing state | Fresh capture target | Related proof |
| --- | --- | --- | --- | --- | --- | --- |
| `beach-opening-shoulder` | `beach` / `dune-edge` | The first start-side lee shoulder reads before the older dune crest and does not crowd the opener band. | `output/main-268-browser/beach-opening-shoulder.png` | `output/main-268-browser/state.json` | `output/alpha-screenshot-proof/beach-opening-shoulder.png` | `docs/reports/2026-04-04-beach-opening-lee-space-implementation.md` |
| `beach-lee-pocket` | `beach` / `lee-pocket` | Driftwood and wrack form a broad recoverable shelter pocket instead of a random platform stack. | `output/main-192-browser/lee-pocket.png` | Fresh state required | `output/alpha-screenshot-proof/beach-lee-pocket.png` | `docs/reports/2026-04-03-beach-spatial-extension-implementation.md` |
| `beach-tidepool-approach` | `beach` / `tidepool` | The tidepool approach ledge and low-platform step read as a gentle far-right movement beat. | `output/main-192-browser/tidepool-approach.png` | Fresh state required | `output/alpha-screenshot-proof/beach-tidepool-approach.png` | `docs/reports/2026-04-03-beach-spatial-extension-implementation.md` |
| `beach-tidepool-return` | `beach` / `tidepool` | The return side of the tidepool beat remains recoverable and does not strand the player. | `output/main-192-browser/tidepool-return.png` | Fresh state required | `output/alpha-screenshot-proof/beach-tidepool-return.png` | `docs/reports/2026-04-03-beach-spatial-extension-implementation.md` |
| `scrub-corridor-threshold` | corridor / beach-to-scrub seam | The threshold reads as a walking handoff between coast and scrub, with direction clear and no extra biome id implied. | `output/main-46-corridor-browser/corridor-threshold.png` | Fresh state required | `output/alpha-screenshot-proof/scrub-corridor-threshold.png` | `docs/reports/2026-03-29-hybrid-corridor-travel-handoff.md` |

## Forest Vertical Frames

| Frame id | Biome / zone | Must remain readable | Existing reference | Existing state | Fresh capture target | Related proof |
| --- | --- | --- | --- | --- | --- | --- |
| `forest-giant-tree-entry` | `forest` / old-growth approach | The giant-tree route starts with trunk scale, climb direction, and the entry target readable. | `output/main-150-browser/giant-tree-entry.png` | `output/main-150-browser/giant-tree-entry.json` | `output/alpha-screenshot-proof/forest-giant-tree-entry.png` | `docs/reports/2026-04-02-forest-vertical-expedition-handoff.md` |
| `forest-log-run-trunk` | `forest` / `log-run` | The mid-climb carry from log-run toward the trunk remains a connected upper route. | `output/main-150-browser/log-run-trunk.png` | `output/main-150-browser/log-run-trunk.json` | `output/alpha-screenshot-proof/forest-log-run-trunk.png` | `docs/reports/2026-04-02-forest-vertical-expedition-handoff.md` |
| `forest-cave-trunk` | `forest` / `root-hollow` | The cave/trunk relationship reads as one connected sub-ecosystem, not two unrelated exits. | `output/main-150-browser/cave-trunk.png` | `output/main-150-browser/cave-trunk.json` | `output/alpha-screenshot-proof/forest-cave-trunk.png` | `docs/reports/2026-04-02-forest-vertical-expedition-handoff.md` |
| `forest-upper-return` | `forest` / upper return | The upper route has a clear rest and return relationship instead of feeling like a dead end. | `output/main-150-browser/upper-return.png` | `output/main-150-browser/upper-return.json` | `output/alpha-screenshot-proof/forest-upper-return.png` | `docs/reports/2026-04-03-forest-sub-canopy-waypoint-handoff.md` |

## Treeline And High Pass Frames

| Frame id | Biome / zone | Must remain readable | Existing reference | Existing state | Fresh capture target | Related proof |
| --- | --- | --- | --- | --- | --- | --- |
| `treeline-last-tree-shelter` | `treeline` / `krummholz-belt` | The last-tree shelter stop reads before the older lee-pocket continuation. | `output/main-267-browser/treeline-last-tree-shelter.png` | `output/main-267-browser/state.json` | `output/alpha-screenshot-proof/treeline-last-tree-shelter.png` | `docs/reports/2026-04-04-treeline-signature-destination-implementation.md` |
| `treeline-stone-shelter` | `treeline` / Stone Shelter | The Stone Shelter basin reads as High Pass's remembered middle, with basin, break step, and carriers in one local view. | `output/main-309-browser/stone-shelter-basin.png` | `output/main-309-browser/state.json` | `output/alpha-screenshot-proof/treeline-stone-shelter.png` | `docs/reports/2026-04-16-high-pass-chapter-space-implementation.md` |
| `treeline-rime-brow` | `treeline` / `lichen-fell` | The Rime Brow shelf reads as a spatial third beat between Stone Shelter and Talus Hold. | `output/main-313-browser/rime-brow-overlook.png` | `output/main-313-browser/state.json` | `output/alpha-screenshot-proof/treeline-rime-brow.png` | `docs/reports/2026-04-17-high-pass-rime-brow-review.md` |
| `treeline-talus-hold` | `treeline` / open fell | The final talus hold still supports ready-to-file return guidance without hiding the open-fell spatial read. | `output/web-game/high-pass-closure-main-320/shot-2.png` | `output/web-game/high-pass-closure-main-320/state-2.json` | `output/alpha-screenshot-proof/treeline-talus-hold.png` | `docs/reports/2026-04-19-high-pass-final-return-readability-review.md` |

## Tundra Relief Frames

| Frame id | Biome / zone | Must remain readable | Existing reference | Existing state | Fresh capture target | Related proof |
| --- | --- | --- | --- | --- | --- | --- |
| `tundra-drift-hold` | `tundra` / `snow-meadow` | The mid-meadow drift hold reads as one calm threshold rest between the opener and thaw-skirt family. | `output/main-259-browser/tundra-drift-hold.png` | `output/main-259-browser/state.json` | `output/alpha-screenshot-proof/tundra-drift-hold.png` | `docs/reports/2026-04-04-high-country-threshold-destination-implementation.md` |
| `tundra-thaw-bench` | `tundra` / `thaw-skirt` | The thaw bench, upper shelf, and lower recovery lane stay readable as one relief family. | `output/main-317-browser/thaw-bench.png` | `output/main-317-browser/state.json` | `output/alpha-screenshot-proof/tundra-thaw-bench.png` | `docs/reports/2026-04-19-earlier-band-tundra-remembered-place-implementation.md` |

## Quick Existing-Path Check

From the repo root, this should print `ok` for all current references:

```sh
for file in \
  output/main-268-browser/beach-opening-shoulder.png \
  output/main-192-browser/lee-pocket.png \
  output/main-192-browser/tidepool-approach.png \
  output/main-192-browser/tidepool-return.png \
  output/main-46-corridor-browser/corridor-threshold.png \
  output/main-150-browser/giant-tree-entry.png \
  output/main-150-browser/giant-tree-entry.json \
  output/main-150-browser/log-run-trunk.png \
  output/main-150-browser/log-run-trunk.json \
  output/main-150-browser/cave-trunk.png \
  output/main-150-browser/cave-trunk.json \
  output/main-150-browser/upper-return.png \
  output/main-150-browser/upper-return.json \
  output/main-267-browser/treeline-last-tree-shelter.png \
  output/main-309-browser/stone-shelter-basin.png \
  output/main-313-browser/rime-brow-overlook.png \
  output/web-game/high-pass-closure-main-320/shot-2.png \
  output/main-259-browser/tundra-drift-hold.png \
  output/main-317-browser/thaw-bench.png
do
  test -f "$file" && echo "ok $file" || echo "missing $file"
done
```

## Non-Goals

- This manifest does not replace runtime tests.
- This manifest does not require screenshot files to be committed.
- This manifest does not authorize geometry, route-state, station, save-schema, science-copy, or broader UI changes.
- This manifest is lane-3 scoped: it covers physical-memory frames, not full route-state playthroughs or copy-budget review.
