# Lane 3 Visual Anchor Snapshots Review

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-critic-332`
- Reviewed: `ECO-20260420-main-332`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Lane: `lane-3`

## Finding

No blocker.

`docs/alpha-screenshot-proof-manifest.md` now includes an `Anchor Change Policy` that covers all 15 existing frame ids, assigns each one an anchor class, records whether the older reference has a state gap, and names an allowed-change or recapture trigger. The policy also restates the fresh ignored snapshot set under `output/alpha-screenshot-proof/` with `.png`, `.json`, and `-errors.json` outputs.

## Review Notes

- The `State gap` rows match the older manifest rows that already said `Fresh state required`.
- The protected baselines stay focused on current treeline and tundra proof frames, while expected recaptures are limited to the later packet families that may intentionally touch those spaces.
- The pass stayed docs-only and did not add runtime telemetry, save helpers, route assertions, browser automation, geometry, route state, station UI, save schema, science copy, or committed output.

## Watch Item

Treat every `State gap` frame as a soft reference until a fresh capture includes adjacent `render_game_to_text()` output. This is already captured in the policy; future screenshot reviews should avoid calling those older references hard regressions without the paired state file.

## Verification

- Re-read the manifest policy and implementation report.
- Confirmed the policy has 15 frame rows and the same eight state-gap frames named by the handoff.
- Rechecked `npm run validate:agents`.
- Rechecked `git diff --check`.
