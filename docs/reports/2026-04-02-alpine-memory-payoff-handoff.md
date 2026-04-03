# 2026-04-02 Alpine Memory Payoff Handoff

Prepared for `ECO-20260402-scout-103` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-alpine-microhabitat-richness-phase.md`
- `docs/reports/2026-04-02-alpine-microhabitat-pack-handoff.md`
- `docs/reports/2026-04-02-alpine-microhabitat-pack-review.md`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/shared-entries.ts`
- `src/engine/sketchbook.ts`
- `src/engine/close-look.ts`
- `src/engine/journal-comparison.ts`
- `src/test/sketchbook.test.ts`
- `src/test/close-look.test.ts`
- `src/test/journal-comparison.test.ts`
- browser artifacts:
  - `output/lane-2-main-140-browser/treeline-talus-pocket.png`
  - `output/lane-2-main-140-browser/tundra-thaw-channel.png`

## Read

- The alpine pack already spent its note budget well. `Talus Islands` and `Between Tussocks` now teach the new microhabitats inside the journal without opening another text block.
- The comparison seam is the wrong fit for the next step. The new landmark carriers are biome-local, while the existing alpine shared-species comparisons for `crowberry`, `mountain-avens`, and `lingonberry` are already doing the cross-habitat teaching job.
- Close-look is also the weaker fit here. `talus-cushion-pocket` and `tussock-thaw-channel` read more like small place cues than like one-object visual specimens, so stretching them into the close-look allowlist would spend more visual-surface budget than this phase needs.
- The sketchbook seam is the strongest fit because it is already a memory surface, it stays compact at `256x160`, and the new alpine landmarks do not yet have authored sketchbook-note payoff lines.

## Recommendation

Treat `main-141` as one tiny sketchbook-memory pass for the alpine branch.

## Why Sketchbook Is The Right Payoff

- It makes the alpine half feel remembered instead of just fuller, using the live archive-like surface built for exactly that feeling.
- It stays fully content-owned: one-line authored notes and tests, with no shell, route, map, or traversal drift.
- It gives each alpine biome one local landmark memory anchor while also adding one shared alpine bridge entry, so the pages feel linked instead of isolated.

## Exact Target

Add authored `sketchbookNote` lines for:

1. `talus-cushion-pocket`
2. `tussock-thaw-channel`
3. `crowberry`

## Suggested Content Shape

### `talus-cushion-pocket`

- note direction:
  - `Tiny shelter pocket holding on between alpine stones.`

Teaching goal:

- remember treeline as a place where broken rock can still shelter low life

### `tussock-thaw-channel`

- note direction:
  - `Wet low lane lingering between raised tundra tussocks.`

Teaching goal:

- remember tundra as patterned ground with brief wet channels, not only open snow and flowers

### `crowberry`

- note direction:
  - `Dark berry mat staying low across cold alpine ground.`

Teaching goal:

- give treeline and tundra one shared alpine memory bridge already backed by live comparison notes

Keep all three lines to one sentence and inside the existing sketchbook-note budget.

## What `main-141` Should Avoid

- no close-look allowlist expansion in this pass
- no new comparison ids or journal layout changes
- no additional alpine species or landmark entries
- no new station or atlas shell work

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/shared-entries.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if a new explicit alpine-note guard helps

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the treeline sketchbook page with `talus-cushion-pocket`
- one seeded browser capture of the tundra sketchbook page with `tussock-thaw-channel`

## Queue Guidance

- Close `ECO-20260402-scout-103`.
- Promote `ECO-20260402-main-141` to `READY`.
- Keep `ECO-20260402-critic-114` blocked until the sketchbook-memory pass lands.
