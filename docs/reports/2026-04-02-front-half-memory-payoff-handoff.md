# 2026-04-02 Front-Half Memory Payoff Handoff

Prepared for `ECO-20260402-scout-111` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-coastal-and-beach-richness-phase.md`
- `docs/reports/2026-04-02-front-half-richness-pack-handoff.md`
- `docs/reports/2026-04-02-front-half-richness-pack-review.md`
- `src/content/shared-entries.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/sketchbook.ts`
- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/test/sketchbook.test.ts`
- browser artifacts:
  - `output/lane-2-main-148-browser/beach-front-half.png`
  - `output/lane-2-main-148-browser/coastal-scrub-front-half.png`

## Read

- The front-half richness pack already spent its note budget well. `Low Runner Band` and `Pine Underlayer` now carry the new teaching work in the journal, so the next step should not be another ecosystem-note or fact-density pass.
- Comparison is the weaker payoff seam here. `beach-pea` now spans beach and scrub, but it does not yet have two distinct unlocked note-backed cards the way the current comparison allowlist expects, and `kinnikinnick` is intentionally single-biome.
- Close-look is also the weaker fit. These additions matter more as remembered habitat texture than as one-object specimen moments, and opening the allowlist would spend more visual-surface budget than this packet needs.
- The sketchbook seam is the strongest fit because it is already the project's compact memory surface, and both new front-half additions still lack authored `sketchbookNote` lines.

## Recommendation

Treat `main-149` as one tiny sketchbook-first front-half memory pass.

## Why Sketchbook Is The Right Payoff

- It makes the new beach and scrub discoveries feel remembered instead of just fuller.
- It stays fully lane-2 and content-owned: authored note lines plus one focused test pass.
- It gives each opening biome one fresh remembered-place hook without reopening journal layout, comparison rules, route flow, or station copy.

## Exact Target

Add authored `sketchbookNote` lines for:

1. `beach-pea`
2. `kinnikinnick`

## Suggested Content Shape

### `beach-pea`

- note direction:
  - `Low vine stitching bright dunes into steadier ground.`

Teaching goal:

- remember the beach and scrub transition as low living cover that starts holding exposed sand together

### `kinnikinnick`

- note direction:
  - `Evergreen mat tucked under wind-shaped shore pines.`

Teaching goal:

- remember `shore-pine-stand` as a quieter underlayer space, not just a trunk band between scrub and forest

Keep both lines to one sentence and inside the existing sketchbook-note budget.

## What `main-149` Should Avoid

- no comparison allowlist expansion in this pass
- no close-look additions
- no new species, note ids, or journal layout changes
- no route, station, corridor, or world-map work

## Suggested File Targets

- `src/content/shared-entries.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if one explicit front-half note guard adds value

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the beach sketchbook page with `beach-pea`
- one seeded browser capture of the coastal-scrub sketchbook page with `kinnikinnick`

## Queue Guidance

- Close `ECO-20260402-scout-111`.
- Promote `ECO-20260402-main-149` to `READY`.
- Keep `ECO-20260402-critic-122` blocked until the sketchbook-memory pass lands.
