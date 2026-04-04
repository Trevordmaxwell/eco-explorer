# 2026-04-03 Exposure-Threshold Support Handoff

Prepared `ECO-20260403-scout-221` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-signature-pocket-support-phase.md`
- `.agents/packets/093-signature-pocket-support-phase.json`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/shared-entries.ts`
- `src/engine/close-look.ts`
- `src/engine/journal-comparison.ts`
- `src/test/sketchbook.test.ts`
- `src/test/close-look.test.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `docs/science-source-ledger.md`
- `docs/reports/2026-04-03-second-act-comparison-close-look-review.md`
- `docs/reports/2026-04-03-second-act-memory-payoff-review.md`
- `docs/reports/2026-04-03-coastal-scrub-signature-support-review.md`

## Read

- Treeline and tundra no longer lack notebook support in general. They already have healthy local note coverage plus live comparison support for `crowberry`, `mountain-avens`, `lingonberry`, and `moss-campion`.
- The shared alpine carriers also already leave a memory trace. `arctic-willow`, `crowberry`, `moss-campion`, `cottongrass`, `talus-cushion-pocket`, and `tussock-thaw-channel` already show up through sketchbook or close-look seams.
- The remaining second-act gap is more local than shared: `talus-cushion-pocket` is a strong treeline threshold landmark but still has no detail-first close-look card, and `frost-heave-hummock` is a strong tundra harsh-ground landmark but still leaves no sketchbook memory strip at all.
- Another comparison expansion is the wrong next move. The comparison pane is already near its handheld-safe density ceiling, and widening it again would lean on shared alpine carriers instead of giving each biome a more local remembered shape.
- Another ecosystem-note id is also unnecessary here. Treeline and tundra already have a solid local note lattice for exposure, thaw, and wind-worked ground.

## Recommendation

Treat `main-221` as one exact local-landmark support pass:

1. add one `talus-cushion-pocket` close-look card for treeline
2. add one `frost-heave-hummock` `sketchbookNote` for tundra

That gives the high-country branch one treeline shelter detail and one tundra cold-ground memory trace without reopening the already-dense comparison or note seams.

## Why This Shape

- It sharpens the two local signals that most clearly separate the branch:
  - treeline still has tiny rock-sheltered holdouts
  - tundra still has ground visibly shaped by freeze-thaw
- It keeps the pass place-led instead of species-count-led. Both targets are local landmarks, not another shared alpine bridge.
- It stays inside the smallest notebook-facing surfaces: one close-look card and one sketchbook line.
- It respects the recent handheld watch items by avoiding another comparison card pair or another new note summary.

## Exact Candidate Plan

### 1. `talus-cushion-pocket` close-look

Why first:

- it is one of the clearest treeline-only threshold landmarks
- its whole teaching value is visual: stone shelter plus tiny life holding on
- it complements the live `Talus Islands` note without spending another note id

Suggested payload shape:

- callouts: `stone gap`, `cushion hold`
- sentence direction: `Between alpine stones, tiny cushions can hold on in calmer air.`
- sprite scale: `6`

Best teaching tie:

- complements `talus-islands`

### 2. `frost-heave-hummock` sketchbook note

Why second:

- it is the clearest tundra-only seasonal-harshness landmark still missing a memory strip
- the live tundra notes already use it well, but the biome has no compact remembered line for that lifted cold-ground shape
- a sketchbook note gives tundra one durable ground-process trace without opening a second close-look wave

Suggested note direction:

- `Raised hummock showing freeze-thaw at work.`

Best teaching tie:

- complements `wind-cut-cushions`

## Explicit Non-Targets For This Pass

- `arctic-willow`, `crowberry`, `lingonberry`, `mountain-avens`, `moss-campion`: already have healthy comparison or sketchbook support
- `reindeer-lichen`, `cottongrass`, `frost-heave-boulder`: already have close-look support
- new ecosystem-note ids
- comparison allowlist expansion
- route-board, station, world-map, corridor, or traversal edits

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/engine/close-look.ts`
- `src/test/sketchbook.test.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts`

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture for `talus-cushion-pocket` close-look
- one seeded browser capture for a tundra sketchbook page carrying `frost-heave-hummock`

## Queue Outcome

- Close `ECO-20260403-scout-221`.
- Promote `ECO-20260403-main-221` to `READY`.
- Retarget `ECO-20260403-main-221` and `ECO-20260403-critic-221` to this handoff.
