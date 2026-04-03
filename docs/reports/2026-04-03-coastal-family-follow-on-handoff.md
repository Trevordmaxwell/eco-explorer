# 2026-04-03 Coastal Family Follow-On Handoff

Prepared `ECO-20260403-scout-165` against packet `085`, the lane-3 brief, the current beach and coastal-scrub implementations, the fresh beach and scrub proof artifacts, and the earlier coastal seam guidance in `docs/reports/2026-03-29-corridor-edge-content-matrix-handoff.md` plus `docs/reports/2026-03-30-coastal-corridor-beat-matrix-handoff.md`.

## Current Read

The coast is no longer missing interesting places.

Right now the player can already read:

1. a gentle `beach` dune crest
2. a tucked `beach` lee pocket
3. a far-right `beach` tidepool approach
4. a `coastal-scrub` low windbreak swale
5. one optional `coastal-scrub` bluff crest above it

The weak spot is the handoff into the scrub family itself.

`Beach` already has a clear exposed-to-sheltered rhythm, and the `beach <-> coastal-scrub` corridor already carries the right carrier continuity (`beach-grass` -> `sand-verbena` -> `dune-lupine` -> first `pacific-wax-myrtle`). What still feels a little abrupt is the live `coastal-scrub` play band between `shrub-thicket` and the first `windbreak-*` platforms: the bluff/swale family starts working only once the player is already in it, instead of feeling like the next step in the same coastward shelter story.

## Best Next Pass

Use `main-203` on one compact left-side gather into the current `coastal-scrub` windbreak family.

Do not spend this pass on:

- more beach geometry
- corridor runtime or corridor platform work
- a higher scrub crest
- a second bluff branch

The beach and corridor already have the right continuity. The thin link is the live scrub handoff.

## Recommended Change For `main-203`

Stay inside `src/content/biomes/coastal-scrub.ts` and the focused biome/runtime proofs.

Keep the existing authored windbreak family intact:

- `windbreak-bluff-lee-step`
- `windbreak-bluff-mid-step`
- `windbreak-bluff-crest`
- `windbreak-swale-entry-log`
- `windbreak-swale-upper-log`
- `windbreak-swale-exit-log`

Add one tiny pre-family gather on the left edge of that set so the biome reads more like:

1. back-dune opening
2. denser thicket gather
3. windbreak swale shelter
4. optional bluff crest

### Suggested platform shape

Preferred target band:

- roughly `x 202-236`
- roughly `y 101-109`

Suggested authored additions:

1. `windbreak-gather-log`
   - around `x 204-224`
   - around `y 108-110`
   - short sheltered first stop before the swale family
2. `windbreak-gather-lift`
   - around `x 226-242`
   - around `y 102-104`
   - tiny handoff that feeds directly into the current `windbreak-bluff-lee-step`

If the single lower gather log already makes the family read clearly, stop there instead of forcing both.

### Suggested carriers

Use only the current live scrub/beach-shared roster:

- `nootka-rose`
- `pacific-wax-myrtle`
- `beach-strawberry`
- `dune-lupine`

Best read:

- thornier or woodier cover low and left
- softer runner or bloom support where the swale starts settling
- no new species just to justify the geometry

## Why This Is Safer Than More Beach Or Corridor Work

- `Beach` already has the clearer front-half rhythm after `dune-crest-*` and `lee-pocket-*`; another pass there risks stacking rewards instead of clarifying the family.
- The corridor already carries the correct science-safe edge story from the earlier seam matrix work. Widening it into new authored platforms would reopen runtime surface area when the live biomes are the higher-value read.
- `Coastal Scrub` can absorb one tiny left-side gather without becoming a second forest climb, as long as the pass stops before new height or a second branch appears.

## Guardrails

- do not touch `beach` geometry again in this pass
- do not edit corridor ownership, corridor runtime, or world-map anchors
- do not add a climbable or a vertical cue
- do not raise the current bluff crest or add a second crest
- avoid relying on the random `thicket-root-step` placements for the core read; the new gather should be authored and deterministic
- keep the whole family inside the current one-camera-band readability budget

## Test Guidance

### `src/test/coastal-scrub-biome.test.ts`

- assert the new gather additions sit left of `windbreak-bluff-lee-step`
- assert the existing `windbreak-*` family order and heights stay intact
- assert any new authored carriers use the current scrub roster only

### `src/test/runtime-smoke.test.ts`

- start from the normal `coastal-scrub` entry
- reach the new gather state first
- continue into the current bluff crest
- recover back to the low swale route

Best proof question:

- does the scrub now feel like a continuation of the beach shelter story before the bluff starts, rather than a flat setup followed by a separate proof?

### Browser guidance

Capture one seeded browser frame that shows the left half of the new family clearly:

- the gather state visible
- the existing swale/bluff family still readable to the right
- no new visual clutter from the random thicket-step band

## Queue Guidance

- Close `ECO-20260403-scout-165`.
- Promote `ECO-20260403-main-203` to `READY`.
- Retarget `ECO-20260403-main-203` and `ECO-20260403-critic-176` to this handoff report.
