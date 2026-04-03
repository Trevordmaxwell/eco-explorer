# 2026-04-03 Front-Half Sketchbook Note Handoff

Prepared for `ECO-20260402-scout-148` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `docs/reports/2026-04-03-coastal-scrub-close-look-review.md`
- `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/shared-entries.ts`
- `src/engine/sketchbook.ts`
- `src/test/sketchbook.test.ts`
- `docs/content-authoring.md`

## Read

- Beach and coastal-scrub still have the lightest sketchbook note coverage in the live chain, but they do not need a full sweep yet. The strongest gain is one compact local-memory pack that gives each biome a little more authored personality.
- Shared front-half carriers already have good sketchbook support in `src/content/shared-entries.ts`, so this pass should spend its budget on local beach and scrub identities instead of reopening shared dune plants.
- Beach is missing one memorable shell clue and one wave-edge bird memory line. Coastal-scrub is missing one shrub carrier and one low-cover bird line.
- This step should stay sketchbook-only. The front-half journal, notes, and close-look layers already moved recently, so `main-186` should not expand into another note, atlas, or comparison pass.

## Recommendation

Treat `main-186` as one exact four-entry sketchbook note pack:

1. `moon-snail-shell`
2. `sanderling`
3. `pacific-wax-myrtle`
4. `song-sparrow`

That gives beach one shell clue and one surf-edge bird memory, while scrub gains one dark evergreen shrub carrier and one tucked-low bird voice. The result fills both front-half pages without making either one feel crowded.

## Exact Entry Plan

### 1. `moon-snail-shell`

Why first:

- distinct rounded shell silhouette compared with the flatter `sand-dollar-test`
- teaches calmer sandy water without duplicating the general shell-clue layer too broadly
- makes the beach sketchbook feel less plant-heavy

Suggested note direction:

- rounded shell clue from calmer sandy water

### 2. `sanderling`

Why second:

- gives the beach page a more active wave-edge memory line
- reads differently from the quieter `western-snowy-plover`
- ties the sketchbook back to the live wet-sand chase behavior players notice

Suggested note direction:

- quick feet tracing the edge of retreating surf

### 3. `pacific-wax-myrtle`

Why third:

- it is the strongest missing scrub shrub carrier after `shore-pine` and `kinnikinnick`
- dark berries and evergreen mass make it a clearer memory anchor than `coyote-brush`
- helps the scrub page read more like sheltered transition habitat instead of only dune carryover

Suggested note direction:

- dark berries thickening the calmer scrub edge

### 4. `song-sparrow`

Why fourth:

- adds a small voiced animal memory to the scrub page without needing a new system
- fits the low-cover scrub tone better than the nighttime `deer-mouse`
- pairs naturally with thorny and brushy cover already taught by `nootka-rose` and the existing note layer

Suggested note direction:

- small voice tucked low in brushy cover

## Explicit Non-Candidates For First Pass

- `native-littleneck-shell`: useful shell clue, but too close to the broader shell-memory space once `moon-snail-shell` lands
- `razor-clam-shell`: stronger surf-zone specialist, but less notebook-distinct than `moon-snail-shell` for this tiny pass
- `sea-rocket`: already a watch-prone introduced species and not the best use of a memory-line slot right now
- `coyote-brush`: important scrub carrier, but visually and emotionally less distinct than `pacific-wax-myrtle`
- `deer-mouse`: cute, but a weaker first scrub memory than the more audible, player-noticeable `song-sparrow`
- `sword-fern`: stronger as a forest-edge teaching carrier than as a front-half scrub memory line

## Guardrails For `main-186`

- keep the pass to exactly four new `sketchbookNote` lines
- do not touch shared entries in `src/content/shared-entries.ts`
- keep every line notebook-like, one sentence, and well inside the existing sketchbook budget
- avoid repeating existing note language like `low bloom`, `steady ground`, or `wind-shaped pine`
- do not widen the pass into ecosystem notes, close-look cards, atlas copy, or field-partner cues

## Suggested File Targets

- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/sketchbook.test.ts`

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded sketchbook capture for beach with:
  - `moon-snail-shell`
  - `sanderling`
- one seeded sketchbook capture for coastal-scrub with:
  - `pacific-wax-myrtle`
  - `song-sparrow`

## Queue Outcome

- Close `ECO-20260402-scout-148`.
- Promote `ECO-20260402-main-186` to `READY`.
- Keep `ECO-20260402-critic-159` blocked until the note pack lands.
