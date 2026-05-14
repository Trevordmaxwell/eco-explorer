# Director Playability Sprint Plan

Date: 2026-05-14
Role: director

## Git Baseline

- Current working branch is `main`.
- Removed the stale local side branches and side worktrees.
- Deleted the remaining remote snapshot branch so `origin` now exposes only `main`.
- Committed the validated beta expansion baseline as `c3ab4f0`.

## Review

I reviewed the agent operating chain, lane briefs, April 28 beta reports, README, architecture docs, content authoring docs, current queue, and the live app at native `256x160` scale through browser proof.

The four read-only lane auditors converged on the same process decision: do not open the next breadth wave until packet `182` closes. That packet should now include a stricter visual clarity gate, because the browser pass found several playability issues that tests alone do not catch.

## Browser Findings

- Title screen is generally game-first, but the bottom guidance line is cramped and partially hard to read at native scale.
- Fresh first-play works and the beach opener is charming, but the notebook task strip truncates the first objective text before the player sees all three intended carriers.
- Filed Source to Shore station state is visibly overcrowded: the welcome line, route subtitle, route title, archive note, and support area collide at native scale.
- Source Shelter active journal state is usable but the route prompt card clips its right-side label and sits close to the comfortable text ceiling.
- World map proof is visually clear and should be treated as the control frame for later route/station clarity checks.

## Director Decision

Keep `ECO-20260428-scout-489` as the next active queue item. Its checklist must treat native browser readability as a gate, not optional polish.

The next sprint is parked behind `ECO-20260428-critic-489`. If packet `182` confirms the current station overlap, lane 1 should promote and fix that before any lane opens new breadth.

## Lane Intelligence

- Lane 1: `xhigh` for the next sprint because it owns cross-surface station/title/journal readability and final signoff risk.
- Lane 2: `high` because it is content-richness work with science and copy-budget judgment, but no broad runtime design.
- Lane 3: `high` because it is proof-first spatial clarity work; use `xhigh` only if engine camera/climb behavior must change.
- Lane 4: `high` because it should buy down route-boundary and helper-extraction risk; use `xhigh` only if someone tries to implement a new playable route in the same sprint.

## Queue Shape

Packet `192` parks the next lane-parallel sprint:

- lane 1 repairs handheld readability and re-proves the critical surfaces.
- lane 2 adds compact archive/sketchbook/close-look payoff only after the signoff gate.
- lane 3 proves tundra and forest vertical readability before adding any cue.
- lane 4 defines the post-Source-to-Shore route-family boundary before route breadth.

## Verification

- `npm run validate:agents` passed before the baseline commit.
- `npm run test` passed: 92 test files, 1450 tests.
- `npm run build` passed.
- Browser proof captured title, first-play, filed Dune Catch play/map/station, and Source Shelter active play/journal states with no console errors.
