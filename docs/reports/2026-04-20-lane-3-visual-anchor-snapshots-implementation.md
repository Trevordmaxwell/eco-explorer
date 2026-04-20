# Lane 3 Visual Anchor Snapshots Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-332`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Lane: `lane-3`

## Change

Added an `Anchor Change Policy` section to `docs/alpha-screenshot-proof-manifest.md`.

The policy gives all 15 lane-3 physical-memory frames an anchor class, an explicit state status, and a named allowed-change or recapture trigger. It also repeats the fresh snapshot contract for ignored output files:

- `output/alpha-screenshot-proof/<frame-id>.png`
- `output/alpha-screenshot-proof/<frame-id>.json`
- `output/alpha-screenshot-proof/<frame-id>-errors.json`

## Coverage

The policy marks older references without adjacent `render_game_to_text()` state as `State gap`:

- `beach-lee-pocket`
- `beach-tidepool-approach`
- `beach-tidepool-return`
- `scrub-corridor-threshold`
- `forest-giant-tree-entry`
- `forest-log-run-trunk`
- `forest-cave-trunk`
- `forest-upper-return`

The remaining current references are treated as protected or expected recapture baselines with existing state available.

## Scope Guardrails

This was a docs-only pass. It did not add runtime code, telemetry, save helpers, route assertions, browser automation, geometry changes, route state, station UI, save schema changes, science copy, or committed screenshot output.

## Verification

- `npm run validate:agents`
- `git diff --check`
