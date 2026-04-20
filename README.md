# Eco Explorer

Eco Explorer is a pixel-art educational exploration game built with `Canvas + TypeScript`. The current game plays like a cozy handheld field adventure: you move through a connected chain of ecosystems, inspect organisms and landmarks, log discoveries in a journal, follow guided field routes, and return to a small field station between outings.

The project is intentionally modular and agent-friendly. Runtime systems, content packs, and coordination docs are all kept in separate places so new humans or agents can plug in without needing prior chat context.

## What Is Live Now

The current build includes:

- five playable biomes: `Sunny Beach`, `Coastal Scrub`, `Forest Trail`, `Treeline Pass`, and `Tundra Reach`
- world-map travel plus adjacent walkable corridor transitions between neighboring ecosystems
- inspect bubbles, a persistent journal, ecosystem notes, comparison pages, and biome survey progress
- a clipboard-friendly field guide prompt, notebook-style observation prompts, and a lightweight field partner
- living-world variation through deterministic `day-part`, `weather`, and `phenology`
- a field station with `SEASON -> ROUTES`, `SEASON -> EXPEDITION`, upgrades, and a compact `NURSERY` teaching-bed loop
- a completed current alpha arc through Root Hollow and filed `High Pass`, with station, map, journal, route-support, and notebook-return cues settling after filing
- sketchbook and close-look modes for deeper discovery surfaces
- deterministic save behavior in `localStorage`

The game uses a fixed internal resolution of `256x160` with nearest-neighbor scaling so the screen reads like a retro handheld while still giving text and overlays more room than the original `192x144` phase.

## Getting Started

```bash
npm install
npm run dev
```

Useful commands:

- `npm run dev`: start the Vite dev server
- `npm run build`: type-check and build the production bundle
- `npm run test`: run the Vitest suite
- `npm run science:check`: run the focused source-ledger/content-quality gate
- `npm run validate:agents`: validate queue and packet consistency for the agent system
- `npm run review:pack`: create a source review-drop archive under `output/review-drops/`
- `npm run review:verify -- <archive.tgz>`: verify a review-drop archive from a clean extract
- `npm run preview`: preview the built app locally

Fresh local verification after `npm install` should at minimum run:

- `npm run build`
- `npm run test`
- `npm run science:check`
- `npm run validate:agents`

Source review drops should use the dedicated clean-extract workflow instead of manual archiving:

```bash
npm run review:pack
npm run review:verify -- output/review-drops/<archive-name>.tgz
```

The review verifier extracts the archive into `.tmp/`, checks that generated or local-only folders are absent, runs `npm ci`, then runs agent validation, the science gate, the full Vitest suite, and the production build. See `docs/review-drop-checklist.md` for the full checklist.

## Controls

- `A / D` or `Left / Right`: move
- `Space`: jump
- `E`: inspect the nearest object or use the current focused interaction
- Mouse click: inspect a nearby clicked object
- `J`: open or close the journal
- `M`: open or close the menu
- `Esc`: close overlays, bubbles, or confirmations
- `F`: toggle fullscreen

Some station, season-page, nursery, and title interactions also use the arrow keys plus `Enter` or `Space`.

## Project Layout

- `src/main.ts`: bootstraps the canvas shell and starts the game runtime
- `src/engine`: runtime systems such as movement, save state, field station, journal, travel, living-world state, and rendering
- `src/content`: biome definitions, shared entries, world-map data, and authored science content
- `src/assets`: sprite and palette data kept separate from game logic
- `src/test`: deterministic unit and runtime-smoke coverage
- `docs/architecture.md`: technical system overview
- `docs/content-authoring.md`: how to add or edit biomes, entries, and authored content
- `docs/reports`: dated handoffs, reviews, and roadmap notes
- `.agents`: queue, packets, role guides, lane-runner docs, and durable project memory
- `scripts/validate-agent-packets.mjs`: queue / packet validation script

## Agent Workflow

This repo includes a persistent multi-agent operating system for humans and agents:

- `AGENTS.md`: project operating guide
- `.agents/project-memory.md`: durable product and process decisions
- `.agents/work-queue.md`: the shared task queue
- `.agents/lane-runner.md`: instructions for one agent wearing multiple hats inside a lane
- `.agents/lanes/`: lane-specific intent and focus docs
- `.agents/roles/`: role-specific behavior for `main-agent`, `critic-agent`, and `scout-agent`
- `.agents/packets/`: structured machine-readable handoff packets

If you edit queue or packet files, run:

```bash
npm run validate:agents
```

When you share an external source review drop, use `npm run review:pack` and verify the resulting archive with `npm run review:verify -- output/review-drops/<archive-name>.tgz` before handing it off.

## Current Product Direction

The current product direction is to harden the completed five-biome alpha arc for feedback without losing its science-forward, cozy tone. The active priorities are:

- keep the screen game-first and readable at handheld scale
- make the filed `High Pass` arc easy to play through, review, and regression-test
- deepen tactile payoff in the current five-biome world before adding new regions
- connect exploration, route progression, the field station, and the nursery into a stronger gameplay loop
- treat science accuracy as a hard gate
- preserve deterministic hooks, modular content authoring, and strong agent handoff surfaces

## Useful Docs

- [Architecture](/Users/trevormaxwell/Desktop/game/docs/architecture.md)
- [Content Authoring](/Users/trevormaxwell/Desktop/game/docs/content-authoring.md)
- [Agent Guide](/Users/trevormaxwell/Desktop/game/AGENTS.md)
- [Project Memory](/Users/trevormaxwell/Desktop/game/.agents/project-memory.md)
- [Work Queue](/Users/trevormaxwell/Desktop/game/.agents/work-queue.md)
- [Progress Log](/Users/trevormaxwell/Desktop/game/progress.md)
