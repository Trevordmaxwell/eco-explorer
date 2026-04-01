# 2026-03-31 Microhabitat Content Pack Handoff

Prepared for `ECO-20260330-scout-81` in lane 2.

## Scope Reviewed

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `docs/reports/2026-03-30-old-growth-and-cave-support-pack-handoff.md`
- `docs/reports/2026-03-31-lane-2-richness-wave-review.md`
- `docs/science-source-ledger.md`

## Current Read

- The under-root half is no longer the thin side. `root-hollow`, `seep-pocket`, `stone-basin`, and `filtered-return` already have three note beats plus five distinct carriers that read clearly at handheld scale: `seep-stone`, `root-curtain`, `ensatina`, `banana-slug`, and the off-ground `licorice-fern` / `tree-lungwort` pair.
- The old-growth half is still visually stronger than it is educationally dense. It now has the right structure and one good cavity-shelter landmark, but too much of the authored texture is still repeated `tree-lungwort` and `licorice-fern`.
- That means the best next pack is not another cave-fauna wave. It is one old-growth-first microhabitat pack that adds regeneration and hanging-canopy identity while leaving the cave side calm.

## Recommendation

Treat `main-117` as one narrow old-growth microhabitat pack.

### 1. Add one nurse-log regeneration carrier

Best entry:

- `western-hemlock-seedling`

Why this is the right addition:

- it gives the fallen giant and old-growth rise a stronger "forest starts again on old wood" teaching beat than another generic floor plant
- it stays inside the current Pacific conifer family instead of introducing a louder new taxonomy branch
- it gives the later comparison/archive wave one clearer regeneration anchor

Suggested placement:

- one authored placement on or just above the `fallen-giant-log` crossing
- one authored placement near the `old-growth-rise` floor or lower bark shelf

Teaching role:

- nurse logs hold moisture and nutrients that help seedlings start above the darker forest floor

Science support:

- NPS nurse-log guidance says fallen wood can hold water, nutrients, and shade for seedlings
- USFS western-hemlock silvics directly supports decaying logs and rotten wood as favorable seedbeds for `Tsuga heterophylla`

### 2. Add one hanging-canopy carrier

Best entry:

- `old-mans-beard`

Full name:

- Old-Man's-Beard Lichen (`Alectoria sarmentosa`)

Why this is the right addition:

- it gives the highest old-growth route one silhouette the player can remember immediately
- it stays firmly in the existing bark-and-epiphyte lane instead of opening a new animal or traversal branch
- it is a strong later close-look candidate without forcing that work into `main-117`

Suggested placement:

- one authored placement near `old-growth-crown-window`
- one authored placement near `old-growth-high-perch` or `old-growth-canopy-ledge`

Teaching role:

- giant conifer limbs can hold hanging lichens as a different bark-zone life layer from `tree-lungwort`

Science support:

- North Cascades directly identifies Old-Man's-Beard (`Alectoria sarmentosa`) as green stringy lichen hanging from tree branches
- Olympic explicitly frames Old Man's Beard and Witch's Hair as draping hanging lichens from high limbs

### 3. Add two compact old-growth note beats

Best note 1:

- `Old-Wood Nursery`

Best trio:

- `fallen-giant-log`
- `western-hemlock-seedling`
- `red-huckleberry`

Main lesson:

- old wood can act like a sponge and a seedbed, so new forest life can start above the darker ground

Best note 2:

- `Hanging Bark Layers`

Best trio:

- `old-mans-beard`
- `tree-lungwort`
- `woodpecker-cavity`

Main lesson:

- one giant tree can hold hanging lichens, bark-surface life, and inner shelter holes in different layers

## What `main-117` Should Avoid

- Do not add another cave-floor animal or another seep landmark. The under-root side is already the denser half.
- Do not consume the later packet `041` comparison and close-look wave. `old-mans-beard` can be a future close-look candidate, but `main-117` should stop at authored content and note support.
- Do not widen route, station, journal shell, or traversal runtime.
- Do not add more than two new entries in this pass.

## Suggested File Targets

- `src/content/biomes/forest.ts`
- `src/assets/forest-flora.ts`
- `docs/science-source-ledger.md`
- `src/test/forest-biome.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`

## Queue Guidance

- Close `ECO-20260330-scout-81`.
- Promote `ECO-20260330-main-117` to `READY`.
- Keep `ECO-20260330-scout-82` blocked behind the implementation and review steps.
