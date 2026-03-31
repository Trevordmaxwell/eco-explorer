# 2026-03-30 Old-Growth And Cave Support Pack Handoff

## Scope

Scout handoff for `ECO-20260330-scout-65`: prepare the first lane-2 support-content pack for the newer `forest` sub-ecosystem spaces without reopening lane-3 traversal scope.

## Current Read

The new forest family is structurally strong now:

- `root-hollow`, `seep-pocket`, and `filtered-return` already read as one calm under-root chapter
- `creek-bend`, `old-growth-pocket`, and `old-growth-rise` already read as one giant-tree chapter
- the bridge between them now gives the forest a believable family shape instead of two unrelated set pieces

What still feels lighter than the route geometry is the authored teaching density inside those spaces.

The cave side already has its strongest living carriers:

- `seep-stone`
- `banana-slug`
- `ensatina`
- `tree-lungwort`
- `licorice-fern`

The old-growth side already has its strongest bark-life carriers:

- `fallen-giant-log`
- `tree-lungwort`
- `licorice-fern`
- `pileated-woodpecker`
- `red-huckleberry`

So the best support pack is not another species wave. It is one compact microhabitat pass that makes the newest spaces feel more teachable and more notebook-worthy.

## Best Pack Shape

### 1. Cave support should deepen the upper shelter story, not add cave-specialist fauna

Best addition:

- `root-curtain` as a landmark-style inspectable in `filtered-return`

Why this is the right cave addition:

- it was already identified in the deeper-cave handoff as the safest non-taxonomic support cue
- it gives the cave family one new discovery without needing another animal or plant research lane
- it teaches that moisture and shelter can hang on roots and bark above the lowest pocket, not only on the floor

Placement guidance:

- place it near the brighter return side, not in the darkest seep floor
- pair it with one or two existing off-ground carriers such as `licorice-fern` and `tree-lungwort`

Teaching role:

- use it to connect the damp lower pocket to the root-held return shelf

### 2. Old-growth support should add one truly old-growth-specific discovery

Best addition:

- `woodpecker-cavity` as a landmark-style inspectable in `old-growth-pocket` or `old-growth-rise`

Why this is the right old-growth addition:

- it leans directly on the live `pileated-woodpecker` teaching role instead of opening another taxonomy branch
- it gives the giant-tree chapter one stronger shelter clue than “more bark life”
- it creates a clean notebook-side fix for the current early `old-wood-link` unlock watch item

Placement guidance:

- keep it on or beside the giant trunk near the first optional climb, where it reads as part of the old-growth structure even if the player never reaches the highest canopy shelf
- do not hide it as a second-secret object deep in the top pocket

Teaching role:

- one old tree can create lasting shelter in bark and wood, not only living surface habitat

### 3. Let notes do the synthesis work

The pack should land with two compact note moments:

- one cave note about moisture held above the ground
- one old-growth note about layered shelter on one giant tree

Best cave note target:

- `root-curtain`
- `licorice-fern`
- `tree-lungwort`
- optionally `ensatina` if the discovery set needs a ground-level contrast

Main lesson:

- roots, bark, and ledges can keep tiny damp shelters above the soil floor

Best old-growth note target:

- `woodpecker-cavity`
- `pileated-woodpecker`
- `tree-lungwort`
- one existing old-wood carrier such as `fallen-giant-log` or `licorice-fern`

Main lesson:

- one old tree can hold bark life, shelter holes, and dead-wood clues in separate layers

## Notebook Tightening

This is the right pass to tighten the current `old-wood-link` note.

The later review already flagged that the note can unlock a little early from bridge-side discoveries alone. The cleanest fix is to make that note require a truly old-growth-facing discovery instead of only bridge and cave-side support.

Best fix:

- add `woodpecker-cavity` to the note's authored discovery set and require it for unlock

Acceptable fallback:

- raise the threshold and rewrite the note so it clearly reads like a chapter-synthesis moment instead of an early bridge hint

## What `main-99` Should Do

1. Add `root-curtain` as one small cave-support landmark in `filtered-return`.
2. Add `woodpecker-cavity` as one small old-growth-support landmark on the giant-tree side.
3. Add one compact cave ecosystem note around lifted moisture shelter.
4. Add one compact old-growth ecosystem note around layered bark-and-cavity shelter.
5. Tighten `old-wood-link` so it does not unlock before the player reaches a real old-growth clue.
6. Update the science ledger and focused content tests.

## What `main-99` Should Not Do

- do not widen `forest` again
- do not reopen corridor, map, route, or station behavior
- do not turn this into a broad new forest-species wave
- do not add a new close-look, comparison, or archive system in this pass

## Likely File Targets

- `src/content/biomes/forest.ts`
- `src/assets/forest-flora.ts` only if the two landmark sprites need bespoke art
- `docs/science-source-ledger.md`
- `src/test/forest-biome.test.ts`
- `src/test/content-quality.test.ts`

## Queue Guidance

- `ECO-20260330-scout-65` can close with this handoff.
- `ECO-20260330-main-99` should move to `READY` as one compact microhabitat-and-note support pack, not a broader forest expansion.
