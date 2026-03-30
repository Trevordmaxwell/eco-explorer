# Living-World Grounding Handoff

Date: 2026-03-28
Status: Ready for future implementation after phase two stabilizes

## Method

- read queue item `ECO-20260328-scout-04` and packet `014`
- reviewed:
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-post-28-roadmap.md`
  - `docs/ai-naturalist-design.md`
  - `docs/architecture.md`
  - `src/engine/game.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/generation.ts`
  - `src/engine/field-guide.ts`
  - `src/engine/types.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/world-map-render.ts`
  - `src/content/world-map.ts`
  - `src/assets/palette.ts`
  - `src/assets/ambient.ts`

## Current Runtime Seams

The approved living-world direction is now real product direction, but the safest implementation path is narrower than the feature names make it sound.

The current repo already has four useful seams:

1. `src/engine/biome-scene-render.ts`
   - already owns sky gradients, parallax, clouds, sparkles, beach sun, and ambient scene feel
   - this is the cleanest first surface for day-part and weather visuals

2. `src/engine/generation.ts`
   - already separates stable versus visit-based content
   - already uses biome `ambientRules`
   - this is the right place for only small deterministic ambient bias later, not a big simulation

3. `src/engine/field-guide.ts`
   - already has optional `worldAge`, `season`, and `timeOfDay` fields in `FieldGuideContext`
   - this is the obvious seam for naturalist prompts and later partner commentary

4. `src/engine/game.ts` plus `render_game_to_text()`
   - already orchestrates scene state and test hooks
   - this should expose future living-world state for smoke coverage instead of hiding it in renderer-only logic

## Core Recommendation

Do not build day-part, weather, prompts, and field partner as four separate systems.

Build one shared deterministic world-state helper first, then let each future slice extend that same surface.

Recommended future module:

- `src/engine/world-state.ts`

Recommended first responsibilities:

- derive current `dayPart`
- later derive `weather`
- expose simple world-state data to biome render, field-guide context, optional prompts, and debug output

This is the smallest clean path because it:

- keeps future living-world work from scattering logic across renderers
- protects deterministic testing
- gives the naturalist and field-partner layers real signals to react to

## Grounded Slice Sequence

### `main-31`: Day-Part

Recommended first scope:

- add one shared world-state helper with `morning`, `day`, and `evening`
- drive day-part from a calm deterministic rule such as a saved world step or visit-based world age, not wall-clock time
- apply palette or tint shifts in `src/engine/biome-scene-render.ts`
- add one or two tiny ambient differences only if they stay subtle
- expose `dayPart` through `render_game_to_text()` and field-guide context

Avoid in the first pass:

- real-time pressure
- sleep systems
- heavy spawn changes
- time bars or HUD clocks

Most likely file touches:

- `src/engine/world-state.ts`
- `src/engine/game.ts`
- `src/engine/biome-scene-render.ts`
- `src/engine/field-guide.ts`
- `src/test`

### `main-32`: Weather

Recommended first scope:

- extend the shared world-state helper with one weather state per biome family, not per biome entry
- keep weather visual and ambient first:
  - beach or scrub wind
  - forest mist or light rain
  - treeline or tundra flurries
- let weather affect ambience and maybe tiny prompt wording before it affects spawn content
- keep player movement unchanged

Avoid in the first pass:

- storm simulation
- visibility loss that hurts readability
- movement penalties
- large state combinatorics

Most likely file touches:

- `src/engine/world-state.ts`
- `src/engine/biome-scene-render.ts`
- `src/engine/generation.ts` only for tiny deterministic ambient bias if needed
- `src/engine/game.ts`
- `src/test`

### `main-33`: Naturalist Prompts

Recommended first scope:

- build on the existing clipboard-first field-guide data model
- add a tiny deterministic observation prompt helper fed by biome, zone, day-part, and weather
- keep the first prompt surface optional and quiet:
  - a short journal or field-guide companion line
  - or a small menu-linked hint surface
- keep it separate from direct API mode

Avoid in the first pass:

- a permanent chatter bar
- quiz framing
- exact to-do lists
- making the AI field guide a prerequisite

Most likely file touches:

- `src/engine/world-state.ts`
- `src/engine/field-guide.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test`

### `main-34`: Field Partner

Recommended first scope:

- make the partner a sparse layer built on the same prompt or context helper as `main-33`
- use it for occasional one-line supportive observations, not constant dialogue
- keep it observational and notebook-like instead of mascot-heavy
- keep the first version deterministic and local

Avoid in the first pass:

- constant speech bubbles
- replacing player noticing
- direct API dependency
- a second full dialogue system

Most likely file touches:

- `src/engine/world-state.ts`
- `src/engine/field-guide.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test`

## Shared Guardrails For All Four Slices

- keep living-world work derived and deterministic before it becomes reactive
- keep playfield readability above atmosphere
- prefer one small new signal per step over compound systems
- add debug exposure for new world-state so smoke coverage can lock behavior down
- do not reopen parked direct API work to make these features possible

## Queue Outcome

- `ECO-20260328-scout-04` can close with this report.
- `main-31` through `main-34` should stay parked, but they should now be read as one grounded future sequence built on a shared `world-state` seam instead of four disconnected feature ideas.
