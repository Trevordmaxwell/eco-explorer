# Lane 3 Visual Anchor Snapshots Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-332`
- Unblocks: `ECO-20260420-main-332`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Lane: `lane-3`

## Scout Finding

Packet 130 gave lane 3 a source-tracked screenshot manifest, but packet 131 needs one more layer before reviewers can use it as alpha-runway observability: each named visual anchor should say whether it is a protected baseline, whether it is expected to change in later packets, and what fresh snapshot files must be captured when it changes.

This should stay docs-only for lane 3. Lane 1 owns debug save helpers and localStorage snapshot tooling; lane 4 owns route-state assertions. Lane 3's useful contribution is a precise visual-anchor recapture contract that future browser proofs can follow.

## Recommended Implementation

Update `docs/alpha-screenshot-proof-manifest.md`.

Add a new section named `Anchor Change Policy` or similar. It should:

- list all 15 existing frame ids from the manifest
- assign each frame an anchor class:
  - `protected baseline`: should not change unless a queued lane item intentionally edits that place
  - `expected recapture`: likely to move during a named later packet and must be recaptured if touched
  - `state gap`: older reference has no adjacent state JSON, so fresh recapture should include state before it is used as a hard regression baseline
- name the later packet families allowed to change that frame, if any
- name the exact fresh snapshot set required when a frame changes: `<frame-id>.png`, `<frame-id>.json`, and `<frame-id>-errors.json` under `output/alpha-screenshot-proof/`
- keep generated screenshots and state dumps out of source control

## Suggested Frame Policy

Use these as the starting classifications:

| Frame id | Class | Allowed change / recapture trigger |
| --- | --- | --- |
| `beach-opening-shoulder` | expected recapture | Packet 138 front-half tactile identity or any later beach opener geometry pass. |
| `beach-lee-pocket` | expected recapture + state gap | Packet 138 front-half tactile identity; fresh state is needed before treating the old screenshot as a hard baseline. |
| `beach-tidepool-approach` | expected recapture + state gap | Packet 138 front-half tactile identity if far-right beach movement changes. |
| `beach-tidepool-return` | expected recapture + state gap | Packet 138 front-half tactile identity if far-right recovery changes. |
| `scrub-corridor-threshold` | expected recapture + state gap | Packet 142 adjacent-corridor prototype or packet 143 map/station travel clarity. |
| `forest-giant-tree-entry` | expected recapture + state gap | Packet 139 forest tactile identity or later vertical-expedition work. |
| `forest-log-run-trunk` | expected recapture + state gap | Packet 139 forest tactile identity or later vertical-expedition work. |
| `forest-cave-trunk` | expected recapture + state gap | Packet 139 forest tactile identity or later cave continuation work. |
| `forest-upper-return` | expected recapture + state gap | Packet 139 forest tactile identity or later cave/canopy return work. |
| `treeline-last-tree-shelter` | protected baseline | Packet 140 treeline shelter/exposure may recapture if it touches the threshold band. |
| `treeline-stone-shelter` | protected baseline | Packet 140 may recapture if Stone Shelter or High Pass opener geometry changes. |
| `treeline-rime-brow` | protected baseline | Packet 140 may recapture if Rime Brow or open-fell approach changes. |
| `treeline-talus-hold` | protected baseline | Packet 140 may recapture if final High Pass return/readiness framing changes. |
| `tundra-drift-hold` | protected baseline | Packet 141 tundra thaw-window payoff may recapture if snow-meadow relief changes. |
| `tundra-thaw-bench` | protected baseline | Packet 141 may recapture if thaw-skirt relief or bench recovery changes. |

## Non-Goals

- Do not add runtime code, telemetry, analytics, save helpers, route assertions, or browser automation in lane 3 for this scouted main step.
- Do not generate or commit screenshot files.
- Do not change biome geometry, traversal behavior, route state, station UI, save schema, or science copy.
- Do not duplicate lane 1's save snapshot documentation or lane 4's route-loop assertions.

## Acceptance For Main

- `docs/alpha-screenshot-proof-manifest.md` gains an anchor-change policy covering all 15 frame ids.
- Every frame has an allowed-change or recapture trigger.
- Frames without adjacent state JSON are clearly marked as state gaps.
- Fresh snapshot naming is explicit and remains under ignored `output/alpha-screenshot-proof/`.
- `npm run validate:agents` and `git diff --check` pass.

## Queue Handoff

Promote `ECO-20260420-main-332` to `READY` with this report as the source. Keep `ECO-20260420-critic-332` blocked until the manifest policy lands.
