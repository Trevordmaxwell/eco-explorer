# RC Playtest Readiness Plan

Date: 2026-05-15
Role: director

## Decision

Open packet `193` as a short RC/playtest-readiness sprint after packet `192` closed cleanly.

This sprint should not add a route, biome, station page, save field, content pack, traversal system, or planner. Its job is to make the current build safe to put in front of real players and observers.

## Why Now

The technical gates are green: agent validation, science check, full tests, build, and `alpha:rc` passed after the handheld readability and route-loop sprint. The next risk is not missing feature breadth. The next risk is whether a player can understand, remember, and enjoy the existing game without a developer narrating it.

## Active Work

Lane 1 owns the playable RC proof:

- define the exact internal playtest smoke contract
- run a current-build boot/input/save/screen-state pass
- capture native `256x160` screenshots or state proof where the player-facing risk is visual
- write findings in severity order
- avoid feature fixes unless a blocker is explicitly queued

Lane 2 owns the observer kit refresh:

- audit `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` against the current Source-to-Shore beta state
- convert older lane 3/lane 4 wording to the active two-lane model
- keep privacy language strict
- make the kit usable for external sessions without implying that external feedback has already happened

## Sprint Shape

Start two scouts in parallel:

- `ECO-20260515-scout-01`: lane 1 RC playtest smoke contract
- `ECO-20260515-scout-02`: lane 2 playtest kit refresh contract

Then run the two implementation tracks and close with one final readiness signoff.

## Pass Bar

Packet `193` can close only if:

- `npm run alpha:rc` still passes or the latest verified RC artifact is named in the report
- the internal player-facing smoke pass has concrete evidence and no untriaged blocker
- observer docs are current, privacy-safe, and aligned with the two-lane model
- any discovered issue is either fixed inside a scoped item or explicitly queued as the smallest blocker

## Recommended Effort

- Director: `xhigh`
- Lane 1: `high`; use `xhigh` only if a smoke pass finds a real blocker touching save, route, station, or overlay behavior
- Lane 2: `high`

## What To Avoid

- Do not start Source-to-Shore expansion work from this packet.
- Do not fabricate child playtest feedback.
- Do not collect identifying child data in the repo.
- Do not turn one internal smoke finding into a broad redesign.
- Do not open old parked packet `149`-`156` tails unless a real external feedback pattern asks for that scope.
