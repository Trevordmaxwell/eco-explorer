# Lane 3 Full-Arc Spatial Proof Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-340`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Lane: `lane-3`

## Scout Finding

Packet `133` should not make lane 3 build the route-state matrix. Lane 4 owns route progression, support choice, filing, replay, and post-filed assertions. Lane 3's useful piece is to make the spatial proof surface line up with that matrix so reviewers can pair route-state checkpoints with named physical-memory frames.

The existing `docs/alpha-screenshot-proof-manifest.md` already covers the right physical spaces, but it needs one small bridge section for packet `133` and one correction to the state-status rows:

- The four forest vertical frames currently say `Fresh state required`, but `output/main-150-browser/` already has matching frame-specific state JSON for `giant-tree-entry`, `log-run-trunk`, `cave-trunk`, and `upper-return`.
- The route matrix needs a source-tracked list of spatial checkpoints that map fresh/session/late-game proof states to existing frame ids without requiring new geometry or committed screenshots.

## Main Target

Update `docs/alpha-screenshot-proof-manifest.md` only, plus an implementation report.

Recommended manifest changes:

- Add a `Full-Arc Smoke Matrix Spatial Checkpoints` section after `First-Session Objective Cue`.
- Map packet `133` route-matrix moments to existing frame ids and ignored capture targets:
  - first beach objective -> `first-session-beach-objective` / `beach-opening-shoulder`
  - beach route shelter shape -> `beach-lee-pocket`
  - forest expedition start/vertical read -> `forest-giant-tree-entry`
  - Root Hollow cave/trunk relation -> `forest-cave-trunk`
  - Root Hollow upper return -> `forest-upper-return`
  - High Pass middle -> `treeline-stone-shelter`
  - High Pass crest -> `treeline-rime-brow`
  - High Pass ready-to-file endpoint -> `treeline-talus-hold`
  - Tundra process support -> `tundra-drift-hold` and `tundra-thaw-bench`
- In the anchor policy and Forest Vertical Frames table, replace the four forest `State gap` / `Fresh state required` values with the existing `output/main-150-browser/<frame>.json` paths.
- Keep generated proof targets under `output/alpha-screenshot-proof/` and do not commit screenshots, state dumps, or browser-error JSON.

## Main Non-Goals

- No new places, platforms, inspectables, carriers, terrain, climbables, or biome geometry.
- No route behavior, route state, support behavior, station/menu behavior, save snapshots, save schema, science copy, journal copy, or player-facing UI.
- No new screenshot automation framework unless the main agent finds a tiny docs-only command note is safer than free-form prose.
- Do not duplicate lane 1's debug save snapshots or lane 4's route-state matrix assertions.

## Verification

Recommended for `main-340`:

- Check the existing frame and state paths referenced by the updated manifest.
- `npm run validate:agents`
- `git diff --check`

Runtime tests and `npm run build` are not required if the pass remains docs-only.
