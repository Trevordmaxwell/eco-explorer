# 2026-04-02 Forest-Treeline Comparison Richness Pack Handoff

Prepared for `ECO-20260402-scout-118` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-forest-and-treeline-comparison-richness-phase.md`
- `docs/reports/2026-03-29-world-continuity-preproduction-pack.md`
- `docs/reports/2026-03-30-inland-corridor-beats-review.md`
- `docs/reports/2026-03-30-edge-pattern-content-fuel-review.md`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/shared-entries.ts`
- `src/engine/journal-comparison.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/shared-entries.test.ts`
- `docs/science-source-ledger.md`

## Current Read

- The middle of the live biome chain still lacks a true forest-to-treeline journal comparison anchor. Coast and alpine comparisons are already note-backed; the middle is still relying mostly on route text, corridor carriers, and broader habitat contrast.
- The current forest-to-treeline seam is already authored the right way for travel. `salal-berry` on the forest side and `mountain-avens` on the treeline side are good side-specific carriers, so this pass should not reopen corridor runtime or try to flatten the seam into generic blended content.
- What the middle needs is one shared understory bridge that can live in late-forest floor patches and early-treeline thin-canopy ground without muddying the Pacific branch.

## Recommendation

Treat `main-156` as one compact shared-entry pack centered on `bunchberry`.

Use it to create the first real forest-to-treeline journal comparison pair, backed by one local note in each biome plus a few authored placements near the existing upper-forest and lower-treeline zones.

## Why `bunchberry` Is The Right Bridge

This is an inference from the official sources below.

- Olympic explicitly lists bunchberry as a montane-forest wildflower under the Pacific scientific name `Cornus unalaschkensis`.
- The Butter Creek Research Natural Area write-up places bunchberry among common herbs in subalpine communities that also include mountain hemlock.
- That makes bunchberry a better middle bridge than forcing `salal-berry`, `bog-blueberry`, or `mountain-hemlock` into both biomes. Those entries still teach stronger side-specific lessons.

## Exact Target

### 1. Add one shared middle-floor entry

Add `bunchberry` to `src/content/shared-entries.ts` and use it in both:

- `forest`
- `treeline`

Suggested content shape:

- common name: `Bunchberry`
- scientific name: `Cornus unalaschkensis`
- category: `plant`
- collectible: `false`

Suggested fact direction:

- bunchberry stays low on cool forest floors and can still hold on where mountain canopy starts breaking apart

Suggested journal direction:

- forest side: cool moist understory patch
- treeline side: low bright patch under the last broken canopy

Keep the kid-facing copy simple and put the taxonomy caution in the science ledger update.

### 2. Give `forest` one new upper-middle note

Best fit:

- title: `Forest Floor Carpet`
- entryIds: `bunchberry`, `redwood-sorrel`, `western-hemlock-seedling`

Why this note:

- it gives the forest side a floor-level lesson instead of another berry or old-wood repeat
- it makes the upper forest feel like the last full understory before cover thins farther inland

Suggested summary direction:

- cool shade, damp litter, and tiny starts still make a fuller forest floor here than the thinner cover ahead

Suggested zone:

- `creek-bend`

### 3. Give `treeline` one new lower-edge note

Best fit:

- title: `Broken Canopy Floor`
- entryIds: `bunchberry`, `mountain-hemlock`, `bog-blueberry`

Why this note:

- it turns the first treeline band into something more specific than “trees get smaller”
- it creates a direct paired contrast against the forest note without inventing a second shared entry

Suggested summary direction:

- some floor plants still hold on where the last mountain trees break the wind, but the ground is brighter and more open than the forest below

Suggested zone:

- `thin-canopy`

### 4. Make `bunchberry` comparison-ready immediately

Add `bunchberry` to the narrow allowlist in `src/engine/journal-comparison.ts`.

Expected comparison result once both notes unlock:

- `forest`: `Forest Floor Carpet`
- `treeline`: `Broken Canopy Floor`

That gives the middle of the biome chain its own same-entry comparison pair instead of borrowing only coast and alpine anchors.

## Placement Guidance

Keep the spawn and authored placement work narrow.

### `forest`

- favor later ground-facing zones such as `creek-bend`
- use only a light supporting presence near old-growth approach spaces so it still reads as floor cover, not canopy life

### `treeline`

- favor `thin-canopy` first
- allow a small supporting presence in `krummholz-belt`
- do not push it into `lichen-fell`

## What `main-156` Should Avoid

- no broad forest-to-treeline shared-species expansion
- no corridor, world-map, route-board, or station work
- no close-look additions in this pass
- no second new shared middle entry unless the first one proves clearly insufficient

## Suggested File Targets

- `src/content/shared-entries.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/engine/journal-comparison.ts`
- `src/test/shared-entries.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Suggested Verification

- `npm test -- --run src/test/shared-entries.test.ts src/test/ecosystem-notes.test.ts src/test/journal-comparison.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded journal comparison capture showing `bunchberry` in `forest` and `treeline`

## Sources

- [Olympic National Park montane forests](https://www.nps.gov/olym/learn/nature/montane-forests.htm)
- [USFS Butter Creek Research Natural Area](https://research.fs.usda.gov/pnw/rnas/locations/butter-creek)
- [USFS FEIS bunchberry review](https://research.fs.usda.gov/feis/species-reviews/corcan)

## Queue Guidance

- Close `ECO-20260402-scout-118`.
- Bump packet `057` and retarget `ECO-20260402-main-156` to this handoff.
- Promote `ECO-20260402-main-156` to `READY`.
- Keep `ECO-20260402-critic-129` blocked until the implementation lands.
