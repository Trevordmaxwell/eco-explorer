# 2026-03-31 Microhabitat Comparison And Close-Look Handoff

Prepared for `ECO-20260331-scout-87` in lane 2.

## Scope Reviewed

- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/close-look.test.ts`
- `docs/reports/2026-03-30-comparison-close-look-candidates-handoff.md`
- `docs/reports/2026-03-31-microhabitat-content-pack-handoff.md`
- `docs/reports/2026-03-31-microhabitat-archive-payoff-review.md`

## Current Read

- The comparison surface is already live and should stay same-pane, note-backed, and narrow.
- The current comparison allowlist already covers the strongest coast and alpine pairs except one obvious holdout: `lingonberry`.
- `lingonberry` is still blocked for the right reason, not because the system is missing. `treeline` already has `Heath Berry Mats`, but `tundra` still lacks a local note that includes `lingonberry`.
- The recent forest microhabitat wave left two strong close-look candidates that fit the current vignette rules without reopening archive, route, or traversal work:
  - `old-mans-beard`
  - `woodpecker-cavity`

## Recommendation

Treat `main-125` as one compact two-part pass:

1. unlock one new comparison-ready alpine microhabitat entry
2. add two old-growth close-look additions

## 1. Use `lingonberry` As The Only New Comparison Entry

This is the cleanest next comparison because the shared entry already exists, the treeline side is already authored, and the missing piece is small.

### Add one tiny tundra berry note

Recommended new tundra note:

- id: `evergreen-berry-mats`
- title: `Evergreen Berry Mats`
- entryIds: `lingonberry`, `crowberry`
- minimumDiscoveries: `2`
- zoneId: `frost-ridge`

Suggested summary direction:

- low evergreen berry mats hug open tundra where wind passes over them

Suggested prompt direction:

- which berries stay low through cold wind?

Why this is the right addition:

- it makes `lingonberry` comparison-ready without loosening the standing note-backed rule
- it gives the tundra side a distinct berry-ground lesson instead of borrowing treeline heath language
- it stays compact enough to fit the current journal shell without forcing layout work

### Then add `lingonberry` to the comparison allowlist

Expected result:

- `treeline`: `Heath Berry Mats`
- `tundra`: `Evergreen Berry Mats`

That gives the comparison pane one clean new alpine contrast:

- treeline berry mats inside a heath mosaic
- tundra berry mats tucked low against open cold wind

## 2. Add Two Old-Growth Close-Look Entries

Recommended additions:

- `old-mans-beard`
- `woodpecker-cavity`

### Why `old-mans-beard`

- it is the strongest visual payoff from the new old-growth pack
- its hanging strands are legible at enlarged scale
- it directly reinforces the new `Hanging Bark Life` note

Suggested callout direction:

- hanging strands
- branch grip

Suggested sentence direction:

- pale strands hang where damp forest air reaches the high branches

### Why `woodpecker-cavity`

- it gives the old-growth side one non-plant close-look target tied to visible structure
- the carved opening and bark edge teach something real immediately at enlarged scale
- it complements `old-mans-beard` without making close-look mode feel like a second lichen gallery

Suggested callout direction:

- carved opening
- bark edge

Suggested sentence direction:

- a woodpecker cut this opening, and later other animals may shelter inside

## What To Hold For Later

- `western-hemlock-seedling`: useful teaching carrier, but the sprite is still too small to be a first-choice close-look reward
- `ensatina`: strong microhabitat life, but its teaching value is more about hidden damp shelter than visible structure
- `root-curtain` and `seep-stone`: both are better as note or place-memory carriers than close-look cards
- any second new comparison entry: this pass should add only `lingonberry`

## Recommended `main-125` Shape

Keep the implementation narrow:

1. add the tundra `Evergreen Berry Mats` note
2. add `lingonberry` to `src/engine/journal-comparison.ts`
3. add `old-mans-beard` and `woodpecker-cavity` to `src/engine/close-look.ts`
4. update focused tests only

Do not:

- reopen journal layout
- widen comparison support broadly
- add more than two close-look entries
- change station, route, or traversal runtime

## Suggested Verification

- `npm test -- --run src/test/journal-comparison.test.ts src/test/ecosystem-notes.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the `lingonberry` comparison card pair
- one seeded browser capture of an old-growth close-look card, preferably `old-mans-beard`

## Queue Guidance

- Close `ECO-20260331-scout-87`.
- Promote `ECO-20260331-main-125` to `READY`.
- Keep `ECO-20260331-critic-98` blocked until the implementation lands.
