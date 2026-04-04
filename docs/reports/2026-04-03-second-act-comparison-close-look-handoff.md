# 2026-04-03 Second-Act Comparison And Close-Look Handoff

Prepared for `ECO-20260403-scout-212` in lane 2.

## Scope Reviewed

- `.agents/packets/089-second-act-support-phase.json`
- `docs/reports/2026-04-03-lane-2-second-act-support-phase.md`
- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/close-look.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`
- earlier lane-2 support reports for alpine parity and forest microhabitats

## Current Read

- The strongest second-act comparison gap is no longer `reindeer-lichen`. That entry already has a live close-look card and already helps treeline notes read as bark-and-fell life.
- The cleanest missing comparison anchor is `moss-campion`. It is now shared across `treeline` and `tundra`, but only the treeline side currently has a local note (`Fell Bloom Window`) that gives the comparison pane a stable teaching card.
- The strongest remaining vertical-family close-look gap is `tree-lungwort`. The forest vertical family already reuses it across `root-hollow`, `stone-basin`, `filtered-return`, and the old-growth side, so a close-look card would turn an already-repeated carrier into a clearer bark-life teaching moment instead of adding more placements.
- `seep-stone` and `seep-moss-mat` should stay out of this pass. They already have their own note and close-look roles, so reopening them here would duplicate support instead of filling a new gap.

## Recommendation

Treat `main-212` as one exact two-part support pass:

1. unlock `moss-campion` as the next high-country comparison entry
2. add `tree-lungwort` as the only new forest vertical close-look entry

That keeps the wave compact while still strengthening both the alpine branch and the vertical-family branch.

## 1. Use `moss-campion` As The Only New Comparison Entry

### Why `moss-campion`

- it is already shared across `treeline` and `tundra`
- the treeline side already has a clean local note
- the tundra side still lacks a note that explains why the same tight cushion reads differently on more exposed ground
- it gives the second act one brighter flower comparison without reopening berry, shrub, or map-facing work

### Add one small tundra note

Recommended new note:

- id: `wind-cut-cushions`
- title: `Wind-Cut Cushions`
- entryIds: `moss-campion`, `reindeer-lichen`, `frost-heave-hummock`
- minimumDiscoveries: `2`
- zoneId: `wind-bluff`

Suggested summary direction:

- tiny cushion flowers and pale lichens stay low where cold wind skims over the bluff

Suggested prompt direction:

- what here stays alive on the most exposed ground?

### Then add `moss-campion` to `src/engine/journal-comparison.ts`

Expected comparison result:

- `treeline`: `Fell Bloom Window`
- `tundra`: `Wind-Cut Cushions`

That creates one clean second-act contrast:

- treeline bloom in a small calm fell layer
- tundra cushion hold on more openly wind-worked ground

### Keep `reindeer-lichen` supportive only

Use `reindeer-lichen` only inside the new tundra note if needed.

Do not:

- add `reindeer-lichen` to the comparison allowlist in this pass
- rewrite its existing close-look card
- widen the alpine comparison lane beyond `moss-campion`

## 2. Use `tree-lungwort` As The Only New Close-Look Entry

### Why `tree-lungwort`

- it is already one of the strongest forest vertical carriers across bark, root, and seep transitions
- it is visually distinct enough at enlarged scale to fit the current vignette rules
- it turns a repeated forest carrier into one clearer second-act teaching anchor without adding more forest placements
- it complements existing `old-mans-beard`, `seep-moss-mat`, and `woodpecker-cavity` cards instead of duplicating them

Suggested callout direction:

- leafy lobes
- bark grip

Suggested sentence direction:

- this leafy lichen clings to cool, damp bark where humid forest air holds

## What `main-212` Should Avoid

- do not add more than one new comparison entry
- do not add more than one new close-look entry
- do not reopen `seep-stone`, `seep-moss-mat`, or `reindeer-lichen`
- do not widen station, route-board, world-map, journal-shell, or traversal runtime work
- do not turn this into a broader second-act species pack

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/close-look.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`

## Suggested Verification

- `npm test -- --run src/test/journal-comparison.test.ts src/test/close-look.test.ts src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the `moss-campion` comparison card pair
- one seeded browser capture of the new `tree-lungwort` close-look card

## Queue Guidance

- Close `ECO-20260403-scout-212`.
- Promote `ECO-20260403-main-212` to `READY`.
- Retarget `ECO-20260403-main-212` and `ECO-20260403-critic-212` to this handoff.
- Keep `ECO-20260403-scout-213` blocked until the implementation and review land.
