# 2026-03-30 Root Hollow Support Guidance

## Scope

Scout handoff for `ECO-20260330-scout-53`: recommend the smallest expedition reward or support pattern that can deepen `ROOT HOLLOW` without opening a larger economy, nursery branch, or expedition dashboard.

## Current Live Seams

- The expedition page is intentionally one calm card with summary, start text, and one note. It does not have room for another reward row without turning into a planner.
- The nursery already supports tiny `route-support` rewards, but those rewards are keyed to route tags and surface in the nursery view, not on the expedition page.
- `Route Marker` already exists as an optional support utility and now goes quiet once the three main routes are logged.
- Notebook prompts and the field partner already support small authored cues inside biome play without needing a new progression shell.

## Best Support Pattern

Recommended support hook:

- reuse `Route Marker` as the expedition-start pointer once `ROOT HOLLOW` is `READY` or `ACTIVE`

Recommended content support around it:

- deepen the expedition through notebook-first authored cues in `root-hollow` and `log-run`, not through a new reward lane

Why this is the strongest fit:

- it is optional and off to the side because only players who already bought `Route Marker` see it
- it uses an existing world-map support seam instead of adding new station chrome
- it helps the player restart the expedition chapter cleanly from the map
- it keeps the real emotional weight on the expedition's own exploration and notebook content

## Why Not The Other Options

### 1. New nursery expedition reward

Do not use this for `main-85`.

Why not:

- the nursery reward model is route-tagged today, not expedition-aware
- the expedition page does not display nursery support hints
- adding expedition-specific nursery plumbing would make the support system larger than the chapter needs

### 2. New station upgrade or expedition utility row

Do not add another upgrade or another expedition-side station strip.

Why not:

- the station only just proved out a calm `ROUTES | EXPEDITION` page turn
- another reward row would push it toward dashboard density
- the critic review already flagged that the support hook should stay off to the side

### 3. Expedition-only inventory, loot, or survival aid

Skip entirely.

Why not:

- it changes genre pressure
- it asks the support hook to do the work the authored chapter should do
- it would create a bigger future maintenance lane than the current expedition needs

## Best Main-Agent Scope For `main-85`

The cleanest next pass is:

1. make `Route Marker` point to `Forest Trail` when the expedition is ready or mid-progress and the route board no longer has a stronger target
2. add one root-hollow notebook cue so the lower hollow and climb legs have authored noticing support, not only traversal structure
3. add one upper-run cue or prompt-tuning pass so the expedition exit lands with a clearer notebook echo

The notebook-side content should stay tiny:

- one seed in `root-hollow` around bark, logs, or stone holding moisture above the soil
- one `log-run` support adjustment that makes the upper re-entry read more reliably without turning into guided checklist text

## Guardrails

- keep the expedition page as one card
- do not add a new reward panel to `EXPEDITION`
- do not add new currencies, materials, or expedition inventory
- do not make the nursery required for expedition progress
- let notebook content and forest geometry carry the chapter, with the support hook acting only as a quiet pointer

## Queue Guidance

- `ECO-20260330-scout-53` can close with this report
- `ECO-20260330-main-85` should move to `READY`
- `ECO-20260330-critic-62` should stay blocked until the implementation lands
