# Eco Explorer Critic Brief

This file is the standing review brief for the critique agent working alongside the main coding agent.

Read `AGENTS.md`, `.agents/project-memory.md`, and `.agents/work-queue.md` before using this brief.

## Role

Act like a practical coach, not a blocker.

- Frame feedback so it helps the main coding agent keep momentum.
- Call out risks early, especially when they are easy to miss during implementation.
- Keep recommendations concrete and sequenced.
- Prefer "tighten this" and "watch for this" over broad redesign language unless the current direction is clearly fighting the product goals.

## Product North Star

Eco Explorer should feel like a cozy retro handheld exploration game for kids, not a landing page with a game embedded inside it.

The beach slice should teach through noticing, collecting, and revisiting. Facts should feel like small discoveries inside a playful world, not trivia cards pasted on top of it.

## Non-Negotiables

- Science accuracy is a hard gate.
- Reading load should stay friendly for ages 7-10.
- The playable surface should remain the visual priority.
- Content should stay data-driven and modular.
- Save state and deterministic hooks should stay stable as UI polish is added.

## Current Snapshot

- The project already has a strong vertical slice foundation: engine, content, assets, save model, generation, and tests are separated well enough to grow.
- The browser page shell still carries a large amount of title and control UI, while the canvas now also contains title, journal, hint, and fact UI.
- `src/engine/game.ts` is currently the concentration point for simulation, rendering, overlays, and hooks. This is workable for the slice, but it is the main place to watch for architecture drift.
- The content loop is charming, but still mostly "inspect object -> read fact." The longer-term learning target should be ecosystem relationships, not only labels.

## Active Watchlist

### 1. Page chrome vs. game UI

The shell in `src/main.ts` and `src/style.css` still presents the experience like a showcase page:

- large page title
- descriptive lede
- external controls card

That competes with the in-canvas title and journal UI in `src/engine/game.ts`.

Recommendation:

- Move toward a "device screen" presentation where the game owns most of the viewport.
- Keep onboarding, controls, and journal guidance inside the game UI or in a very small surrounding shell.
- Avoid duplicating the same title and instructions both outside and inside the canvas.

### 2. Aspect ratio changes must be deliberate

The current internal resolution is `160x144`, which is a valid retro handheld choice. If the team wants a more screen-like, fuller presentation, do not solve it by stretching the canvas with CSS alone.

Recommendation:

- First remove the oversized outer shell and let the game frame dominate the page.
- Then decide whether the internal viewport should remain `160x144` or move to a wider ratio.
- If widening is needed, prefer a deliberate retro-friendly target such as `192x144` or `256x160`.
- Avoid arbitrary ratios that break sprite spacing, jump feel, or UI safe areas.

### 3. Science schema drift

The current content model assumes every inspectable has a `scientificName`.

That works for shells, plants, and animals, but it becomes awkward for landmarks like driftwood. If an inspectable is not an organism or taxonomic item, do not invent Latin to fill the field.

Recommendation:

- Add a content distinction such as `entryType`, `taxonomyLabel`, or `displaySubtitle`.
- Treat scientific names as required for organisms, not for every inspectable by default.
- Verify every species fact before shipping.

### 4. Learning depth

The current slice teaches names and isolated facts well. The next layer should teach connections:

- where things live
- what helps them survive
- how tide zones differ
- how plants and animals change the beach

Recommendation:

- Prefer facts about habitat, adaptation, shelter, food, and role in the ecosystem.
- Let repeated visits slowly reveal patterns, not only reshuffled collectibles.

### 5. UI readability and safe areas

Canvas text is now doing real work: title overlay, inspect hints, fact bubbles, journal labels, and stats. This is a good direction, but it raises layout risk quickly.

Recommendation:

- Keep each overlay on a defined safe-area grid.
- Limit title-screen copy and fact-bubble copy aggressively.
- Make sure journal, hints, and fact bubbles cannot visually collide with the player task.
- If the text system grows further, consider extracting UI drawing helpers or overlay modules from `src/engine/game.ts`.

### 6. Test coverage gaps

Current tests cover determinism and discovery basics well. They do not yet guard the highest-risk content issues.

Recommendation:

- Add content checks for age-appropriate text length budgets.
- Add tests or review rules for organism-vs-landmark metadata.
- Add regression checks for overlay state and text output in `render_game_to_text()`.

## Default Review Questions

Use these questions when reviewing new work:

1. Does this make the game feel more like a playable world and less like a web page?
2. Is the reading load still light enough for a child to stay in motion?
3. Does the science claim hold up?
4. Does this addition deepen ecosystem understanding, or just add another collectible?
5. Is the change pushing too much new responsibility into `src/engine/game.ts`?
6. Can the result still be extended to future biomes without rewriting the core?

## Near-Term Guidance

For the next UI pass, steer the main coding agent toward:

- removing the large external masthead and controls card
- making the game frame dominate the viewport
- keeping the title/help/controls inside the in-game UI
- choosing an internal aspect ratio intentionally if the viewport changes
- preserving deterministic hooks and save behavior while refactoring presentation
