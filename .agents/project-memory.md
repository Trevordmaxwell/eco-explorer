# Project Memory

This file stores durable decisions so they survive context loss.

Update this only when a decision or standing rule changes.

## Product Summary

Eco Explorer is a desktop-first retro-style educational exploration game for kids. The current live build includes beach, forest, and tundra ecosystems connected by a world map, with inspectable nature objects, collectible discoveries, and a persistent journal.

## Audience

- Primary audience: kids roughly ages 7-10
- Secondary audience: adults guiding or observing play

## Standing Product Decisions

- Science accuracy is a hard gate.
- Facts should be kid-friendly, short, and readable.
- The game should teach ecosystems through exploration and noticing, not quizzes or combat.
- The project should stay modular and data-driven so new biomes can be added without rewriting the core.
- Save state stays local for now.
- Landmark or habitat inspectables use subtitles instead of invented scientific names.

## Standing Process Decisions

- The critique agent should act like a practical coach, not a blocker.
- The work queue is the main handoff mechanism between agents.
- Structured packets in `.agents/packets/` can supplement queue items when work needs machine-friendly context, but the queue stays authoritative for owner, order, and status.
- Dated critique or handoff documents should live in `docs/reports/`.
- Durable agent instructions and role docs should live in `.agents/`.

## Current Design Direction

- Move away from a landing-page presentation toward a game-first handheld-screen feel.
- Remove or greatly reduce the large external page masthead and controls card.
- Keep onboarding, controls, and feedback inside the game UI where possible.
- If the internal aspect ratio changes, choose it deliberately after shell simplification rather than stretching the current view casually.
- Use the deliberate `192x144` in-game viewport as the baseline screen shape for current UI work unless a stronger gameplay reason appears.
- Expand to new ecosystems through a world-map travel layer with readable doorway transitions instead of hard-cut biome swaps.

## Current Known Risks

- `src/engine/game.ts` is becoming the concentration point for simulation, rendering, overlays, and hooks.
- The new biome, map, and transition scenes are live, but their orchestration still sits mostly inside `src/engine/game.ts`.
- The learning loop is strongest at isolated facts and still needs deeper ecosystem relationship teaching over time.

## Current Key References

- `.agents/critic-brief.md`
- `.agents/work-queue.md`
- `docs/reports/2026-03-27-initial-critique.md`
- `docs/reports/2026-03-27-post-travel-queue-pass.md`
- `docs/reports/2026-03-27-world-travel-scout.md`
- `docs/architecture.md`
- `docs/content-authoring.md`
- `docs/world-travel.md`

## Update Notes

When changing this file:

- keep statements durable
- avoid session-level chatter
- replace stale decisions instead of stacking contradictions
