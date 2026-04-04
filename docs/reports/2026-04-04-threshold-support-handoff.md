# 2026-04-04 Threshold Support Handoff

Prepared for `ECO-20260404-scout-257` in lane 2.

## Scope Reviewed

- `.agents/packets/105-coastal-scrub-identity-and-threshold-support-phase.json`
- `docs/reports/2026-04-04-coastal-scrub-identity-support-review.md`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/engine/close-look.ts`
- `src/engine/journal-comparison.ts`
- `src/test/close-look.test.ts`
- `src/test/sketchbook.test.ts`
- `src/test/journal-comparison.test.ts`
- earlier alpine support and memory reports in `docs/reports/`

## Current Read

- The alpine comparison seam is already carrying its share of the second-act teaching load. `crowberry`, `mountain-avens`, `lingonberry`, `moss-campion`, and `reindeer-lichen` now give `Treeline Pass` and `Tundra Reach` multiple note-backed same-pane contrasts.
- The first local support pass already spent the clearest landmark carriers: `talus-cushion-pocket` has both close-look and sketchbook support, and `frost-heave-hummock` already has a sketchbook memory line.
- The strongest remaining treeline threshold carrier is `krummholz-spruce`. It already anchors `tree-line-drops`, `wind-shapes-trees`, `stone-shelter`, and the live inland route beats, but it still has no notebook-facing visual zoom of its own.
- The strongest remaining tundra short-season carrier is `woolly-lousewort`. It already participates in `staying-low` and `brief-thaw-bloom`, but it still falls back to plain fact voice in the sketchbook and has no small memory payoff line.

## Recommendation

Treat `main-257` as one exact two-part support pack:

1. add `krummholz-spruce` as one local treeline close-look card
2. add one local `sketchbookNote` for `woolly-lousewort` in tundra

That keeps the pass compact, place-led, and threshold-focused without reopening the already-dense alpine comparison seam.

## 1. Use `krummholz-spruce` As The Treeline Threshold Close-Look

### Why `krummholz-spruce`

- it is the clearest visual marker of where tree form starts breaking down
- it already has strong note backing in `tree-line-drops` and `wind-shapes-trees`
- it is already route-relevant through `bent-cover` and `last-tree-shape`
- a close-look card teaches threshold vegetation change without adding another note id or comparison card

### Suggested close-look direction

Callouts:

- wind-bent branches
- needled tips

Sentence direction:

- `Cold wind keeps this spruce low and bent instead of tall.`

Teaching goal:

- make treeline feel like the last tree-shaped shelter before open fell takes over

## 2. Use `woolly-lousewort` As The Tundra Short-Season Memory Note

### Why `woolly-lousewort`

- it already belongs to both `staying-low` and `brief-thaw-bloom`
- it reinforces the brief-thaw, short-season read without spending another note slot
- it gives tundra a local notebook-memory carrier that is not already carrying close-look or shared-comparison weight
- it keeps the pass balanced: treeline gets the visual zoom, tundra gets the compact memory line

### Suggested sketchbook direction

Suggested note:

- `Fuzzy bloom catching one brief thaw on open tundra.`

Teaching goal:

- remember tundra as a place where even flowers look built for a very short window

## Why Not Another Comparison Or New Ecosystem Note

- the high-country comparison lattice is already strong enough and is near the handheld density ceiling
- `talus-cushion-pocket` and `frost-heave-hummock` are already the supported local anchors, so this pass should move sideways to new carriers instead of stacking more copy onto those same seams
- a new ecosystem note would spend more notebook budget than this wave needs

## Explicit Non-Targets

- do not add another alpine comparison entry
- do not add a new ecosystem-note id
- do not reopen `talus-cushion-pocket`, `frost-heave-hummock`, `reindeer-lichen`, or `moss-campion`
- do not touch station, route-board, world-map, atlas shell, or large `game.ts` seams

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if a targeted note-budget regression is useful

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the new `krummholz-spruce` close-look card
- one seeded browser capture of the tundra sketchbook page with `woolly-lousewort`

## Queue Outcome

- Close `ECO-20260404-scout-257`.
- Promote `ECO-20260404-main-257` to `READY`.
- Retarget `ECO-20260404-main-257` and `ECO-20260404-critic-257` to this handoff.
