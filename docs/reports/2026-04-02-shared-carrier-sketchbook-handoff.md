# 2026-04-02 Shared-Carrier Sketchbook Handoff

Prepared for `ECO-20260402-scout-135` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-atlas-and-sketchbook-richness-phase.md`
- `docs/reports/2026-04-02-atlas-facing-richness-handoff.md`
- `docs/reports/2026-04-02-atlas-facing-richness-review.md`
- `docs/reports/2026-04-02-front-half-memory-payoff-handoff.md`
- `docs/reports/2026-04-02-comparison-memory-payoff-handoff.md`
- `docs/reports/2026-04-02-alpine-memory-payoff-handoff.md`
- `src/content/shared-entries.ts`
- `src/engine/sketchbook.ts`
- `src/test/sketchbook.test.ts`
- browser artifacts:
  - `output/lane-2-main-149-browser/beach-sketchbook.png`
  - `output/lane-2-main-157-browser/forest-sketchbook.png`
  - `output/lane-2-main-141-browser/tundra-sketchbook.png`

## Read

- The atlas-facing pass spent the structural budget correctly. The route shell now carries one tiny filed-memory prefix, so the next lane-2 gain should be more personal notebook recall, not another station wording tweak.
- The sketchbook remains the strongest follow-on seam because it is already the project's compact remembered-place surface and it has survived multiple lane-2 note passes without reopening route, map, or journal layout work.
- The best remaining gap is in three shared habitat carriers that now do real cross-biome work but still fall back to generic fact copy in the sketchbook:
  - `beach-grass`
  - `salmonberry`
  - `arctic-willow`
- That trio now does meaningful route and habitat work across the live game:
  - `beach-grass` anchors the beach shelter-line and early dune-building read
  - `salmonberry` is the strongest scrub-to-forest edge carrier and already echoes through notes, prompts, and nursery memory
  - `arctic-willow` now carries the calmer high-country close and snow-edge read, but the sketchbook still does not remember it as a place cue

## Recommendation

Treat `main-173` as one tiny shared-carrier sketchbook pass.

## Why This Is The Right Next Step

- It keeps packet `065` coherent: atlas handles the filed route seam, then sketchbook handles the warmer authored memory seam.
- It stays lane-2 and content-owned: one shared-entry file plus focused sketchbook coverage.
- It makes the remembered world feel more connected across the coast, middle edge, and high country without adding another archive page, route card, or comparison mode.

## Exact Target

Add authored `sketchbookNote` lines for:

1. `beach-grass`
2. `salmonberry`
3. `arctic-willow`

## Suggested Content Shape

### `beach-grass`

- note direction:
  - `Tough grass holding the first bright dune ridge.`

Teaching goal:

- remember the coast as a place where shelter starts getting built, not just as open sand with flowers

### `salmonberry`

- note direction:
  - `Bright berries thickening the cool edge into forest.`

Teaching goal:

- remember the scrub-to-forest transition as denser, wetter cover instead of a generic berry shrub

### `arctic-willow`

- note direction:
  - `Low willow resting where open fell softens to tundra.`

Teaching goal:

- remember the inland high-country finish as a calmer low-growth edge, not only rocks and wind

Keep all three lines to one sentence and inside the existing sketchbook-note budget.

## What `main-173` Should Avoid

- no atlas or field-station wording changes
- no new comparison allowlist work
- no close-look additions
- no journal layout changes
- no new species or habitat entries

## Suggested File Targets

- `src/content/shared-entries.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if one explicit shared-carrier guard adds value

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the beach sketchbook page with `beach-grass`
- one seeded browser capture of the forest or coastal-scrub sketchbook page with `salmonberry`
- one seeded browser capture of the tundra or treeline sketchbook page with `arctic-willow`

## Queue Guidance

- Close `ECO-20260402-scout-135`.
- Promote `ECO-20260402-main-173` to `READY`.
- Keep `ECO-20260402-critic-146` blocked until the shared-carrier sketchbook pass lands.
