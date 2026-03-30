# Phenology Grounding Handoff

Date: 2026-03-28
Status: Ready for future implementation after day-part and weather land

## Method

- read queue item `ECO-20260328-scout-12` and packet `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/architecture.md`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/generation.ts`
  - `src/engine/field-guide.ts`
  - `src/engine/types.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/content/shared-entries.ts`
  - `src/assets/palette.ts`
  - `src/assets/ambient.ts`

## What The Live Content Already Supports

The current biome set already contains strong phenology hooks. The safest future pass should use those authored hooks instead of inventing a broad calendar system first.

- coast:
  - sand verbena and dune flowers can read differently from bloom to seed
  - wrack, fog, and wind can carry seasonal mood without changing movement
- forest:
  - western trillium, salal berries, and fir cones already imply spring-to-late-season change
- treeline:
  - mountain avens, moss campion, bog blueberry, and crowberry already support bloom, berry, and cool-turn moods
- tundra:
  - purple saxifrage, cloudberry, crowberry, cottongrass, and first-snow cues already fit the short-summer story

This means the first phenology pass should be about authored emphasis and visible state changes, not new taxonomy, new systems, or a giant content rewrite.

## Core Recommendation

Do not start with a global four-season calendar.

After `main-31` day-part and `main-32` weather, extend the shared deterministic world-state with one coarse phenology phase:

- `early`
- `peak`
- `late`

Then let each biome author how that phase looks locally.

This is the safest shape because it:

- fits the already-approved shared `world-state` plan
- keeps the system deterministic and smoke-testable
- lets coast, forest, treeline, and tundra feel different without requiring four full art passes per biome
- keeps the first implementation mood-first instead of simulation-first

## Recommended First Slice For `main-37`

### 1. Add one coarse phase to world-state

Recommended future field:

- `phenologyPhase: 'early' | 'peak' | 'late'`

Recommended driver:

- derive it from saved world age, visit progression, or another deterministic world-state counter
- do not use wall-clock time
- do not add a visible calendar, timer, or pressure loop

### 2. Author local biome profiles instead of one global season skin

Recommended future biome surface:

- optional `phenologyProfiles` authored per biome

Good first examples:

- beach and coastal scrub:
  - `early`: brighter dune bloom and cleaner coastal light
  - `peak`: fuller flowers and livelier shore color
  - `late`: more seed-head, wrack, haze, and cool-turn atmosphere
- forest:
  - `early`: trillium and fresh understory emphasis
  - `peak`: richer salal berry presence and fuller canopy mood
  - `late`: cooler floor tones and stronger cone-litter feel
- treeline and tundra:
  - `early`: snowmelt flower emphasis
  - `peak`: berry windows and clearer open-ground growth
  - `late`: first-frost or first-snow hints without turning the biome into winter-only art

Player-facing labels can stay local and friendly, such as `Bloom Time`, `Berry Time`, or `First Frost`, while the system underneath stays coarse and reusable.

### 3. Keep the first pass mostly visual

Most of the first phenology win should come from:

- palette or sky mood shifts in `src/engine/biome-scene-render.ts`
- a few alternate plant or ambient sprites where they pay off clearly
- tiny ground or ambience cues such as foggier coast mornings, denser berry color, or light snow dusting

The first pass should not depend on new movement rules, survival pressure, or heavy spawn logic.

### 4. Limit generation changes to a tiny authored set

`src/engine/generation.ts` should only do small, readable things in v1:

- bias a few berry or flower visit spawns
- enable a small number of authored visual variants
- keep core teachable entries present often enough that players do not lose the main learning loop

The goal is emphasis, not disappearance.

### 5. Feed future notebook systems without activating them now

Once `phenologyPhase` exists, pass it through future world-state and field-guide context so later notebook prompts or field-guide copy can react to it.

That does not mean `main-37` needs to add new prompt UI.

## File Seams For Future Implementation

Most likely file touches:

- future shared helper:
  - `src/engine/world-state.ts`
- runtime seams:
  - `src/engine/game.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/generation.ts`
  - `src/engine/field-guide.ts`
  - `src/engine/types.ts`
- authored data:
  - `src/content/biomes/*.ts`
  - optionally a small shared helper if profile shapes repeat
- assets:
  - small targeted sprite additions under `src/assets/`
- tests:
  - `src/test`

The cleanest data-model extension would let biome definitions author profile-local overrides without rewriting the base entries or spawn tables from scratch.

## Scope Limits

Avoid in the first phenology pass:

- a real-world month or date calendar
- a mandatory four-season matrix for every biome
- migration, hibernation, or complex animal life-cycle systems
- major changes to traversal, platforming, or visibility
- hiding core discoveries for whole phases
- making weather and phenology separate competing systems

If a change is not clearly visible, science-safe, and calm, it is too big for v1.

## Test Ideas

- deterministic unit tests for world-state phase derivation
- biome-definition validation that any future phenology profile references only real entry ids or sprite ids
- generation tests that confirm a biome changes emphasis without dropping its core discoverable identity
- render-facing tests or debug text checks that expose `phenologyPhase` for smoke coverage
- one browser-level capture pass once visuals land, because this feature is mostly about mood and readability

## Queue Outcome

- `ECO-20260328-scout-12` can close with this report.
- `main-37` should stay parked, but it should now be read as:
  - a coarse shared world-state extension after day-part and weather
  - biome-local authored phenology profiles
  - mood-first visible change before deeper notebook systems react to it
