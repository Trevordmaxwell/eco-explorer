# 2026-03-30 Atlas And Sketchbook Archive Richness Handoff

Prepared for `ECO-20260330-main-100` in lane 2.

## Scope Reviewed

- `src/engine/sketchbook.ts`
- `src/engine/field-season-board.ts`
- `src/engine/overlay-render.ts`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/shared-entries.ts`
- `docs/reports/2026-03-30-old-growth-and-cave-support-pack-review.md`
- `docs/reports/2026-03-30-microhabitat-archive-richness-follow-on-phase.md`

## Read Of The Live Surfaces

- The visible `FIELD ATLAS` strip is intentionally tiny. At `256x160`, it only has room for a title and one compact count line without crowding the route board or support rows.
- The richer archive payoff already travels through existing text seams: `atlas.note`, `seasonWrap`, the `SEASON ARCHIVE` strip, and the expedition card summary and note.
- The sketchbook note strip is now a strong archive surface, but only a small set of entries currently carry authored `sketchbookNote` copy.
- The new `root-curtain` watch item from `critic-74` is best solved through remembered-place archive copy, not by making the cave content louder or denser right away.

## Recommendation

Treat `main-100` as one compact filed-memory pass with two parts.

### 1. Keep The Atlas Shell Exactly As It Is

Do not add a new station panel, route list, stats block, or a taller atlas strip.

Instead, make the existing filed copy feel more personal by tightening the text that already lands in:

- `resolveFieldAtlasState().note`
- `resolveFieldSeasonArchiveState()`
- the logged expedition summary or note if a small wording pass helps

The copy should read like a short field-memory line, not a reward banner.

Good direction:

- `Coast, ridge, and Root Hollow filed.`
- `Root Hollow filed from seep to high run.`

Avoid:

- score-like language
- long recap sentences
- adding a second archive surface

### 2. Use Sketchbook Notes For Route-Defining Memory Anchors

Add authored `sketchbookNote` lines to a tight allowlist of discoveries that already define the filed routes and expedition.

Recommended first set:

- `driftwood-log`
- `bull-kelp-wrack`
- `nurse-log`
- `shore-pine`
- `fallen-giant-log`
- `seep-stone`
- `root-curtain`
- `woodpecker-cavity`
- `krummholz-spruce`
- `frost-heave-boulder`

This keeps the pass content-first while making archived chapters feel more collectible and more specific when the player opens the sketchbook later.

## What To Leave For Later

Do not consume the parked microhabitat follow-on in packet `037`.

That later wave should still own:

- broader old-growth and cave-adjacent species density
- a second archive payoff for deeper microhabitats
- comparison-ready expansion around those newer spaces

`main-100` should only give the current archive surfaces stronger memory anchors, especially for `root-curtain`, without turning into a second microhabitat pack.

## Suggested Implementation Shape

1. Add `sketchbookNote` copy to the allowlisted landmark set above.
2. Tighten `field-season-board` archive strings so logged routes and the filed season read like remembered outings instead of generic completion text.
3. Keep overlay layout unchanged unless a copy budget test or browser pass proves one line no longer fits.

## Acceptance Focus For `main-100`

- Logged routes and `ROOT HOLLOW` feel more like remembered places than generic cleared tasks.
- The sketchbook gains stronger notebook payoff through authored route-defining notes.
- No new archive UI shell appears.
- The later microhabitat archive follow-on still has clear room to exist.

## Verification Guidance

At minimum:

- `npm test -- --run src/test/sketchbook.test.ts src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- one seeded browser pass covering:
  - a filed season station state
  - the expedition page after `ROOT HOLLOW` is logged
  - a forest sketchbook state showing one new landmark note
