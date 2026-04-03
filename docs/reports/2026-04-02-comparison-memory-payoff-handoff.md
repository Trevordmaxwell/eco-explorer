# 2026-04-02 Comparison Memory Payoff Handoff

Prepared for `ECO-20260402-scout-119` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-forest-and-treeline-comparison-richness-phase.md`
- `docs/reports/2026-04-02-forest-treeline-comparison-richness-pack-handoff.md`
- `docs/reports/2026-04-02-forest-treeline-comparison-richness-review.md`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/shared-entries.ts`
- `src/engine/sketchbook.ts`
- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts`
- browser artifacts:
  - `output/lane-2-main-156-browser/bunchberry-comparison.png`
  - `output/lane-2-main-156-browser/bunchberry-comparison-state.json`

## Read

- The comparison pass already spent the shared-entry budget well. `bunchberry` now carries the actual forest-to-treeline journal comparison, so the next gain should not be another shared species or a broader comparison allowlist wave.
- Close-look is the weaker fit here. The middle habitats need remembered place texture more than another specimen card, and the close-look surface is tighter than the sketchbook strip for this kind of quiet payoff.
- The sketchbook seam is the strongest follow-on because it is already the project’s compact memory surface, and the two best local anchors for the new comparison pair still lack authored `sketchbookNote` lines.

## Recommendation

Treat `main-157` as one tiny sketchbook-first middle-memory pass.

## Why Sketchbook Is The Right Payoff

- It reinforces the forest-to-treeline contrast through remembered place cues instead of repeating shared fact text.
- It stays fully lane-2 and content-owned: two authored note lines plus focused sketchbook and budget coverage.
- It complements the new `bunchberry` comparison instead of competing with it. The journal can keep the shared bridge, while the sketchbook remembers the local floor character on each side.

## Exact Target

Add authored `sketchbookNote` lines for:

1. `redwood-sorrel`
2. `dwarf-birch`

## Suggested Content Shape

### `redwood-sorrel`

- note direction:
  - `Cool clover leaves thickening the dim forest floor.`

Teaching goal:

- remember the forest side as a fuller, shaded floor with layered low plants under the last big trees

### `dwarf-birch`

- note direction:
  - `Low birch holding where bright wind reaches the last trees.`

Teaching goal:

- remember the treeline side as a brighter, wind-touched floor where shrubs start taking over from fuller forest cover

Keep both lines to one sentence and inside the existing sketchbook-note budget.

## What `main-157` Should Avoid

- no new shared species in this pass
- no comparison allowlist expansion
- no close-look additions
- no new ecosystem notes, journal layout work, route work, station work, or map work

## Suggested File Targets

- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if one explicit guard adds value

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the forest sketchbook page with `redwood-sorrel`
- one seeded browser capture of the treeline sketchbook page with `dwarf-birch`

## Queue Guidance

- Close `ECO-20260402-scout-119`.
- Promote `ECO-20260402-main-157` to `READY`.
- Keep `ECO-20260402-critic-130` blocked until the sketchbook-memory pass lands.
