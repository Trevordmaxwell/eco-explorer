# Notebook Prompt Handoff

Date: 2026-03-28
Status: Ready for future implementation after world-state groundwork

## Method

- read queue item `ECO-20260328-scout-13` and packets `014` and `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/ai-naturalist-design.md`
  - `src/engine/field-guide.ts`
  - `src/engine/ecosystem-notes.ts`
  - `src/engine/journal.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/types.ts`
  - `src/content/biomes/*.ts`
  - `src/test/field-guide.test.ts`
  - `src/test/content-quality.test.ts`

## Current Seams Already Point The Right Way

The repo already has three useful pieces for notebook-style prompts:

1. `src/engine/field-guide.ts`
   - already assembles local context from biome, zone, nearby entities, discovery state, and later world-state fields
   - this is the cleanest place to derive future prompt evidence

2. `src/engine/ecosystem-notes.ts`
   - already resolves linked-entry relationship notes per selected journal entry
   - this is the best authored bridge between isolated facts and larger ecological noticing

3. `src/engine/overlay-render.ts`
   - the journal detail pane already has one compact companion-note surface
   - this means future prompts should stay same-pane and lightweight, not open a new dashboard or chatter bar

Because those seams already exist, `main-33` should become a small deterministic notebook-prompt layer rather than a new AI system.

## Core Recommendation

Treat `main-33` as a relationship-first notebook prompt pass, not generic naturalist chatter.

The first implementation should create one pure helper that turns:

- world-state
- zone
- nearby entities
- local discovery state
- optional resolved ecosystem note context

into one short observational prompt.

Recommended future helper shape:

- `src/engine/observation-prompts.ts`

Recommended output shape:

- one heading or family label
- one short prompt line
- optional evidence tags kept internal for tests or selection logic

The important constraint is one prompt at a time. The system should suggest a lens, not hand out a checklist.

## Prompt Families That Fit The Game

The best v1 families are the ones the current biomes and ecosystem notes already support.

### 1. Shelter And Exposure

Use when:

- the zone has clear wind, cover, wrack, driftwood, shrubs, krummholz, or low-growth survival cues

Good examples:

- `Where looks safest from wind here?`
- `What stays low where the air is harshest?`
- `Which object might offer cover to something smaller?`

### 2. Timing And Change

Use when:

- day-part, weather, or later phenology gives the world a different mood
- berries, blooms, cones, snowmelt, or seed timing are visible

Good examples:

- `What looks newly open, ripe, or drying out today?`
- `Which plants seem ready for a short growing window?`
- `What here might look different later in the season?`

### 3. Neighbors And Roles

Use when:

- the nearby entities or ecosystem note support a grounded relationship

Good examples:

- `Who might use this plant or place for shelter?`
- `What here could become food, cover, or new soil?`
- `Which living thing seems to shape this patch for another one?`

### 4. Comparison

Use only when:

- the player has enough real evidence, such as multi-biome sightings or a strong local/shared-species link

Good examples:

- `How does this same species sit differently here than elsewhere?`
- `What changes for this organism between sheltered and open ground?`

Comparison prompts are valuable, but they should stay conditional and evidence-backed in v1 so they do not jump ahead of what the player has actually seen.

## Recommended First Scope For `main-33`

### 1. Build one deterministic prompt selector

The selector should:

- read biome, zone, nearby entities, and future world-state signals
- optionally read the resolved ecosystem note for the selected journal entry
- choose one family based on current evidence
- return one short prompt line

Avoid:

- random generic flavor text
- freeform LLM generation inside the runtime
- multiple simultaneous prompts

### 2. Keep the first visible surface quiet

Best first placements:

- a small journal companion line when a selected entry and current conditions support it
- and or one appended observation seed inside the clipboard field-guide prompt

Do not start with:

- a permanent chatter strip
- a to-do list panel
- repeated popups during movement

### 3. Reuse ecosystem-note authorship instead of replacing it

Ecosystem notes already teach broad relationships.

The notebook prompt layer should:

- use note links and note themes as evidence
- react to current conditions
- stay shorter and more situational than the authored note summary

In practice:

- ecosystem notes explain a stable relationship
- notebook prompts ask what to notice about that relationship right now

### 4. Keep field-guide and partner work downstream

`main-33` should remain deterministic and local first.

That means:

- no direct API dependency
- no mascot dialogue voice
- no requirement to open the field guide every time

Then `main-34` can later reuse the same observation helper instead of inventing a separate companion script.

## File Seams For Future Implementation

Most likely file touches:

- future prompt helper:
  - `src/engine/observation-prompts.ts`
- world-state and context seams:
  - `src/engine/world-state.ts`
  - `src/engine/field-guide.ts`
  - `src/engine/ecosystem-notes.ts`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/types.ts`
- data and tests:
  - `src/content/biomes/*.ts`
  - `src/test`

If a new authored prompt-family hint is needed later, it should be compact and optional rather than turning every biome entry into a large prompt matrix.

## Scope Limits

Avoid in v1:

- quest wording
- checklists of three or more tasks
- reward or streak framing
- exact undiscovered spoilers
- unsupported ecological claims
- a second full journal surface
- direct API mode or live chat dependency

If a prompt cannot be clearly justified from current local evidence, it should not appear.

## Test Ideas

- pure helper tests for family selection based on biome, zone, local discoveries, and world-state
- spoiler-safety tests so undiscovered exact names never leak
- journal-surface tests that ensure the prompt stays one compact line or card instead of growing into a large new panel
- field-guide prompt tests that confirm any appended observation seed matches the same deterministic helper
- smoke coverage that exposes the chosen prompt family or text through debug state once the feature lands

## Queue Outcome

- `ECO-20260328-scout-13` can close with this report.
- `main-33` should now be read as:
  - a notebook-style observation prompt pass
  - built on field-guide and ecosystem-note context
  - surfaced quietly through existing journal and field-guide seams
  - still optional, deterministic, and non-quiz-like
