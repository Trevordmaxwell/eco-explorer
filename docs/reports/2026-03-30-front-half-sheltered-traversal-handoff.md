# 2026-03-30 Front-Half Sheltered Traversal Handoff

## Scope

Scout handoff for `ECO-20260330-scout-46`: recommend one compact front-half sheltered traversal proof that broadens movement identity without turning the coast into a cave system.

## Current Read

The front half no longer needs "any traversal." `coastal-scrub` already has a real lowered swale proof with upper logs, sheltered cover, and route-aligned ecology.

The weaker branch is now `beach`.

`beach` still teaches strong habitat facts, but its movement identity is mostly:

- small dune steps
- flat dry sand
- tidepool ledges

That means the inland half owns most of the memorable route-shape changes, while the front half still plays more like one long open strip.

## Best Concept

### `Driftwood Lee Pocket`

Use the `dry-sand -> tide-line` seam for one shallow optional lowered route shaped by driftwood and kelp wrack.

Core idea:

- cut one gentle hollow into the seam where beach grade starts dropping toward the tide line
- place one low driftwood overhead span or staggered driftwood shelf above it so the lane feels tucked in and sheltered
- keep the upper sand line traversable so the pocket is optional, not required
- let the lower route read as a calm lee pocket for wrack, tiny shore life, and first shelter rather than a tunnel or cave

Why this is the strongest fit:

- it gives `beach` its own traversal signature instead of adding another proof to a biome that already has one
- it reuses existing authored habitat roles:
  - `driftwood-log`
  - `bull-kelp-wrack`
  - `pacific-sand-crab`
  - optional shorebird follow-through
- it stays science-safe because wrack and driftwood really do create calmer, richer microhabitats on open beaches
- it fits the current engine better than a true underpass because the runtime already handles lowered lanes and authored platforms cleanly

## Recommended Shape

Keep it tiny and readable at `256x160`.

Suggested implementation outline:

1. Add one shallow depression around the `dry-sand` / `tide-line` handoff, not a deep pit.
2. Add one authored driftwood platform or short two-piece overhead bridge that visually creates a lee pocket without introducing a ceiling-collision system.
3. Leave an obvious upper sand route above it so players can choose curiosity over obligation.
4. Seed the lower pocket with existing wrack or shelter carriers, not new species.

Good surface cues:

- `driftwood-log`
- `bull-kelp-wrack`
- `pacific-sand-crab`
- optional `sanderling` or `western-snowy-plover` pass-through if density still stays light

## Why Not Coastal Scrub Again

`coastal-scrub` already has:

- the lowered `windbreak-swale`
- upper authored logs
- sheltered shrub cover

Another front-half proof there would stack identity in the same place instead of rounding out the full coast.

## Guardrails

- Do not build a true cave or overhang engine.
- Do not require the lower lane for progress.
- Do not add new collectibles just to justify the route.
- Keep the shape broad and readable, not cramped or precision-platform.

## Main-Agent Slice For `main-77`

The cleanest implementation is:

- `beach` gets one optional `driftwood lee pocket` traversal proof near the `dry-sand -> tide-line` seam
- the proof uses existing driftwood and wrack habitat roles
- tests should lock down:
  - one lowered terrain pocket
  - one authored upper driftwood shelter shape
  - at least one existing shelter-linked carrier inside the pocket

## Queue Guidance

- `ECO-20260330-scout-46` can close with this handoff.
- `ECO-20260330-main-77` should now move forward on the beach-side `driftwood lee pocket` concept, not on another `coastal-scrub` lane.
