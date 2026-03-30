# Soundscape Direction Handoff

Date: 2026-03-28
Status: Ready for future implementation after the current phase-two work

## Method

- read queue item `ECO-20260328-scout-16` and packet `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/architecture.md`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/save.ts`
  - `src/engine/types.ts`
  - `src/engine/generation.ts`
  - `src/assets/index.ts`
  - `src/assets/ambient.ts`
  - `src/assets/coastal-ambient.ts`
  - `src/assets/forest-ambient.ts`
  - `src/assets/treeline-ambient.ts`
  - `src/assets/tundra-ambient.ts`
  - `src/content/biomes/*.ts`

## Current Runtime Reality

The repo has no audio system yet.

That is a good thing for this handoff because it means `main-41` can start with one clean direction instead of inheriting half-finished sound code.

Useful current seams:

1. `src/engine/game.ts`
   - already owns scene transitions, overlay state, and player actions
   - this is the right place to trigger scene-profile changes and lightweight UI cues

2. `src/engine/overlay-render.ts`
   - already defines the menu and small stateful overlays
   - this is the natural future seam for one compact sound toggle if audio lands

3. `src/engine/save.ts` and `src/engine/types.ts`
   - already persist tiny UI preferences safely
   - this is the right place for one sound on/off setting later

4. biome content plus ambient sprite packs
   - the live biome set already has strong identity cues
   - these packs should inform sound mood, not force one sound per sprite

Important constraint:

The sound pass should support the current calm notebook-game feel. It should not make the game feel busy, cartoony, or arcade-loud.

## Core Recommendation

Start with a sparse Web Audio layer, not a full music system and not a large asset library.

Best first shape:

- one low-volume biome ambience bed
- a few tiny UI blips
- optional doorway or world-map cue if it stays subtle

This is the safest path because it:

- matches the repo’s lightweight no-dependency runtime
- avoids adding an asset production pipeline before the sound direction is proven
- fits the handheld-era style better than polished orchestral loops
- leaves room for day-part, weather, and phenology to modulate the same base layer later

## What `main-41` Should Actually Do

### 1. Add one simple audio engine

Recommended future module:

- `src/engine/audio.ts`

Best first implementation:

- use the browser Web Audio API
- generate soft loop beds and one-shot UI blips from simple noise, filtered tones, and envelopes
- unlock audio only after the first player key or pointer gesture

Do not start with:

- a dependency-heavy audio library
- streaming music
- large audio file packs

### 2. Add one ambience profile per biome family

The first pass should use broad habitat beds, not many layered emitters.

Recommended mood anchors:

- beach:
  - soft surf hush
  - occasional distant shorebird note
- coastal scrub:
  - light wind through grass or brush
  - sparse sparrow-like chirp
- forest:
  - canopy hush
  - rare wood tap or jay-like call
- treeline:
  - thin alpine wind
  - occasional open-ground bird cue
- tundra:
  - colder wind bed
  - very sparse bunting-like or open-ground chirp

These should be low, slow, and roomy.

They should not sound like every visible animal is constantly calling. The ambient sprite packs are a habitat identity reference, not a literal “every sprite gets a sound source” rule.

### 3. Add a tiny UI cue set

Best first UI sounds:

- menu move
- confirm or select
- journal open or close
- inspect reveal

Keep them:

- short
- soft
- pitch-distinct
- readable at low volume

One or two related timbres is enough.

### 4. Add only one settings control in v1

Recommended first setting:

- `Sound: ON/OFF`

Do not start with:

- volume sliders
- separate music and effects channels
- per-biome muting

The current settings surface is compact. One toggle fits; a mixer does not.

## Staged Future Path

### Stage A. `main-41` first pass

- audio engine
- biome ambience bed
- tiny UI blips
- one sound toggle

### Stage B. travel and transition reinforcement

If stage A works, add tiny cues for:

- doorway entry or exit
- world-map move confirm
- transition arrival

Still keep them subtle.

### Stage C. living-world layering

Only after day-part, weather, and phenology land:

- modulate the same ambience beds
- alter density or filter slightly by time or weather
- avoid multiplying independent loops unless the mix stays very spare

The sound system should extend world-state later. It should not require world-state before it becomes useful.

## Scope Limits

Avoid in v1:

- full background music per biome
- constant melody loops
- per-entity positional audio
- loud reward stingers
- a big synthesized “retro soundtrack” that overpowers exploration
- literal sound for silent organisms or landmarks

If the audio pulls attention away from noticing the world, it is too much.

## File Seams For Future Implementation

Most likely file touches:

- future module:
  - `src/engine/audio.ts`
- runtime seams:
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/save.ts`
  - `src/engine/types.ts`
- content and assets:
  - `src/content/biomes/*.ts`
  - `src/assets/*ambient.ts`
  - `src/assets/index.ts`
- tests:
  - `src/test`

The cleanest implementation will probably use a small pure profile selector that maps scene and biome to one ambience profile before touching the Web Audio layer.

## Test Ideas

- save migration coverage for the new sound setting
- pure tests for ambience-profile selection by biome and overlay state
- runtime smoke debug output for `soundEnabled` plus current ambience profile id
- browser-level checks that audio only arms after user interaction and does not crash in unsupported contexts

## Queue Outcome

- `ECO-20260328-scout-16` can close with this report.
- `main-41` should stay focused on:
  - one sparse audio engine
  - low-volume biome ambience beds
  - a tiny UI cue set
  - one sound toggle
  - no large music system in v1
