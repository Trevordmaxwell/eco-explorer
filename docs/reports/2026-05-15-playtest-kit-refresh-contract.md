# Playtest Kit Refresh Contract

Date: 2026-05-15
Role: lane-2 scout
Queue: `ECO-20260515-scout-02`
Packet: `.agents/packets/193-rc-playtest-readiness.json`

## Decision

Promote `ECO-20260515-main-02` to `READY`.

The refresh is concrete and should stay docs-only. The current kit and rubric are still useful, but they predate the packet `193` two-lane model and stop their observed-session examples around the earlier alpha/High Pass state. The main pass should update observer language for the current post-packet-192 Source to Shore beta state without claiming that real external playtest feedback already exists.

## Required Updates

### `docs/alpha-playtest-kit.md`

- Retitle/intro: keep the file path, but describe the current RC/playtest-readiness build instead of a completed five-biome alpha arc.
- `Session Shape`: keep the `20-35` minute guidance, but refresh the slice table so it includes Source to Shore states after filed High Pass, including Source Shelter, Forest Release, Dune Catch, and filed Source to Shore closure.
- `Materials` and `Run The Alpha`: keep `npm run alpha:rc`, `npm install`, `npm run dev`, `npm ci`, `npm run build`, and `npm run preview`; rename older "alpha RC" wording to current verified RC/review drop wording.
- `Save Setup`: keep the console workflow, but refresh the example/default snapshot and snapshot list for the current debug helper ids, including the Source to Shore Dune Catch ids.
- `What To Watch`: collapse old `lane 1`/`lane 2`/`lane 3`/`lane 4` triage into the active two-lane model. Lane 1 should own run/install, save, station, map, routes, support, replay, and progression. Lane 2 should own science comprehension, journal/atlas payoff, place memory, spatial readability, traversal hesitation, close-look/sketchbook observations, and reading load.
- `Session Note Template`: update the title and lane labels to match RC observed sessions and two-lane triage.
- `Packet 160 Handoff`: rewrite as post-session feedback triage. Keep the repeated-evidence rule and no-fabricated-feedback guardrail; do not imply packet `160` is already active work.

### `docs/playtest-comprehension-rubric.md`

- Intro and pairing sentence: describe the current RC/playtest kit, not only the alpha arc.
- `Adult Setup`: update snapshot language away from "packet 131" and add Source to Shore observation anchors.
- `Recommended slice starts`: include current Source to Shore states and Dune Catch/filed closure expectations.
- `Adult Observer Checklist`: preserve the comprehension focus, but generalize filed-route wording so it covers Source to Shore closure instead of only filed High Pass.
- `Route And Support Checklist`: keep the row shape; ensure active/ready/filed/support/replay language can catch Source to Shore and High Pass confusion.
- `Spatial Checklist`, `Science Takeaways`, and `Memory And Emotion`: keep the current prompts, with only small wording tweaks if needed for current-build context.
- `Friction Notes`: collapse likely-lane examples into lane 1 and lane 2 only.
- `Follow-Up Summary`: collect both lane-1 and lane-2 follow-up candidates, while reminding observers that requests are not approved work.

### `docs/save-snapshot-states.md`

- Update the `Snapshot IDs` section only if needed while refreshing the kit links. The current runtime helper includes `source-to-shore-dune-catch-ready-to-file` and `source-to-shore-dune-catch-filed`; the doc should name those existing ids so observers do not have to inspect source.

## Leave Unchanged

- `docs/review-drop-checklist.md`: command source of truth is still current for packet `193`.
- The privacy rule forbidding identifying child data.
- The nudge ladder and warm observer tone.
- The crash/console checklist.
- The localStorage debug snapshot workflow.

## Non-Goals

- No runtime, content, station, route, map, save, overlay, progression, or UI behavior changes.
- No new playtest claims, child quotes, or implied external-session outcomes.
- No activation of old parked feedback packets unless real repeated external evidence exists later.

## Verification Expected

- `npm run validate:agents` after queue or packet edits.
- `git diff --check` after docs edits.
- No build is required unless runtime code changes.
