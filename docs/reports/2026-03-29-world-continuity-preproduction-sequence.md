# World Continuity Preproduction Sequence

Date: 2026-03-29
Status: Approved scout-sized planning assignment

## Purpose

The project now has enough separate future directions that it is worth giving scout one larger synthesis assignment instead of another small sidecar.

This assignment should answer one bigger question:

How should Eco Explorer evolve from "a set of connected biomes" into "one changing world" without losing readability, science accuracy, or the calm 8-bit tone?

## Why This Is The Right Bigger Scout Task

Several approved future directions now overlap:

- continuous adjacent corridor travel
- phenology and seasonal mood shifts
- sparse biome soundscapes
- living-world prompts and partner cues
- map-return posts and optional fast travel

Each of those has already been scoped in isolation.

What is missing now is one synthesis pass that shows how they should reinforce each other instead of colliding later.

## Scope

This is still planning-only work.

The scout should not implement code. It should produce a compact preproduction pack that helps future implementation land in the right order and with the right boundaries.

## Deliverables

The assignment should produce:

1. one main synthesis report
   - recommended path from current five-biome map into a more continuous, living world
   - what should happen first, what should wait, and what should never be combined in the same first pass
2. one five-transition matrix
   - `beach <-> coastal-scrub`
   - `coastal-scrub <-> forest`
   - `forest <-> treeline`
   - `treeline <-> tundra`
   - optional note on how map-return posts should sit relative to those links
3. one cue/opportunity matrix
   - corridor visual drift
   - day-part and weather interaction
   - phenology hooks
   - soundscape opportunities
   - field-partner or notebook opportunity windows

The result should feel more like a small preproduction packet than a brainstorm dump.

## Questions The Scout Should Answer

### Corridor Read

- Which adjacent transitions are the strongest or weakest visually at `192x144`?
- Which shared species or landforms should carry each transition instead of generic blending?

### Living-World Read

- Where should day-part, weather, and phenology be most visible in each transition?
- Which signals are strong enough to support partner or notebook cues, and which should stay silent?

### Audio And Atmosphere

- What should sound do in each transition band?
- Where should ambience shift gradually versus switch at thresholds?

### Sequence

- What is the safest later order after `main-50` and the first phenology pass?
- Which future chunks can be grouped into one coherent main-agent implementation packet, and which should stay separate?

## Guardrails

- Science accuracy remains a hard gate.
- Keep the first recommendations authored and readable, not simulation-heavy.
- Do not turn the plan into a universal season system, open-world rewrite, or constant event engine.
- Do not assume the map disappears.
- Keep `192x144` readability central.
- Prefer a few strong transition signals over many weak ones.
- Keep the companion and prompt layers quiet by default even in the bigger world-continuity plan.

## Queue Outcome

This should become one bigger scout assignment that can run in parallel while the main agent finishes the authored field-partner follow-up.

The point is to give future agents one cohesive world-feel plan instead of forcing them to stitch together corridor, phenology, sound, and partner docs by hand.
