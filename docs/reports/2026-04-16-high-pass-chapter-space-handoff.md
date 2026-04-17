# 2026-04-16 High Pass Chapter Space Handoff

Prepared `ECO-20260416-scout-309` against packet `126`, the lane-3 brief, the sprint-3 queue translation, the live `High Pass` shell and science-pack reports, the current `treeline` and `forest` traversal families, and the latest treeline browser artifacts in `output/main-267-browser/`, `output/main-159-browser/`, and `output/main-305-browser/`.

## Current Read

The next live chapter is already physically and narratively anchored in `Treeline Pass`.

Three things are now true at the same time:

1. lane 1 already points the next chapter at `High Pass` through `Treeline Pass`
2. lane 2 just strengthened that same chapter through `Stone Shelter` and `Low Fell` carriers
3. lane 3 already spent its most recent high-country budget on the right-side open-fell family

That means `main-309` should not pivot back into forest geometry just because the forest family was the earlier expedition proof. The forest is still the best *structural lesson*, but not the best live biome target for the chapter that is opening now.

## Why Not The Treeline Right Side Again

The current `Treeline Pass` right half is no longer the weakest seam.

It already has:

1. `last-tree-shelter-rest`
2. the folded `lee-pocket` family
3. `lee-pocket-fell-return`
4. `lee-pocket-lee-rest`
5. the new `fell-island` stop before tundra travel

The fresh review in `docs/reports/2026-04-16-high-country-relief-continuation-review.md` also leaves a clear watch item there: do not stack another lift immediately to the right of the new island.

So the Sprint 3 gain should not be another open-fell extension.

## What Still Feels Thin

The opener still behaves more like a well-taught route band than a true chapter place.

`Stone Shelter` now has the right shell language and the right science carriers:

- `krummholz-spruce`
- `frost-heave-boulder`
- `hoary-marmot`

But the physical band still reads mostly as:

1. last-tree shelter
2. drop into lee pocket
3. climb the long shelf
4. continue toward the richer right-side loop

That is good route structure, but it does not yet have the same remembered-middle quality that the forest gained through the hinge bay and recovery-light family.

## Best Structural Borrow From Forest

Borrow the *shape lesson* from the forest, not the biome.

The successful forest passes did not become chapter-grade because they got much taller. They became chapter-grade because they gained one small middle place that made the outing feel authored instead of merely connected:

- cave side: `under-basin-rest`
- bridge side: `old-wood-hinge-rest`

`Stone Shelter` needs the same kind of remembered middle.

## Recommendation

Treat `main-309` as one compact `Stone Shelter` chapter pocket in `Treeline Pass`.

### Exact target

- biome: `Treeline Pass`
- route family: `Stone Shelter`
- zone focus: late `krummholz-belt` into early `dwarf-shrub`
- preferred band: `x 288-372`
- preferred height: `y 108-122`

This keeps the pass:

- after the current last-tree entry stones
- inside the live shelter pocket
- well before the already-solved crest, notch, lee-rest, and open-fell island chain

## Recommended Main Shape

Spend the pass on one shallow stone-break basin, not another tall branch.

### Preferred authored geometry

Keep the live family:

1. `last-tree-approach-stone`
2. `last-tree-shelter-rest`
3. `lee-pocket-entry-stone`
4. `lee-pocket-upper-shelf`
5. existing right-side crest/notch/rejoin chain

Add only one compact remembered middle inside the shelter band:

1. `stone-shelter-basin-rest`
   - around `x 316-344`
   - around `y 118-120`
   - width around `26-32px`
   - job: create one lower held place under the long shelf so `Stone Shelter` feels like a pocket, not just a route floor

Only if the ascent into the upper shelf still feels too plain, allow one tiny helper:

2. `stone-shelter-break-step`
   - around `x 348-368`
   - around `y 112-114`
   - width around `16-22px`
   - job: hand the basin back into the live upper shelf without becoming a second route

If the basin rest alone makes the family read, stop there.

## Optional Visual Support

If one render-only pocket helps the place read, prefer one shallow existing-style depth feature rather than another platform family.

Allowed optional support:

- one small `stone-pocket` depth feature behind the new basin band

Do not spend this item inventing a new alpine depth style or a second cue family.

## Best Carrier Support

Use the current chapter carriers, not a new content pack.

Strongest local anchors:

- `frost-heave-boulder`
- `hoary-marmot`

If deterministic support is needed, anchor at most one authored boulder and one authored marmot in the new basin band. Do not add new species, new note ids, or another close-look wave.

## Desired Read

The opener should become:

1. last trees
2. stone shelter lip
3. one held stone-break basin
4. upper lee shelf
5. richer right-side shelter fold
6. open-fell continuation

That makes `High Pass` feel like it begins in a real sheltered place instead of only in route copy.

## Why This Is Better Than Reopening Forest

Forest is already the game's best expedition-grade runtime family.

That is useful reference material, but it is not the live shell target anymore. Reopening `root-hollow` or `old-growth-pocket` here would make lane 3 stronger in general while leaving the actual `High Pass` chapter still physically thinner than its shell and science support.

Sprint 3 should spend its next lane-3 move where the chapter is actually pointing.

## Explicit Non-Targets

- do not reopen `lichen-fell` to the right of `fell-island-rest`
- do not move the tundra corridor door or travel logic
- do not add a new climbable, another vertical cue, or another text surface
- do not widen forest geometry, cave depth, or giant-tree structure
- do not spend this pass in `tundra`

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact Stone Shelter basin before the lee-pocket climb turns outward|turns the High Pass opener into a last-tree shelter, stone-break basin, then lee fold|keeps the treeline right-side loop and open-fell island unchanged"`
- `npm run build`
- shared client smoke
- one seeded browser proof centered on the new basin with the long lee shelf above and the richer right-side fold still later in the frame sequence

## Queue Outcome

- Close `ECO-20260416-scout-309`.
- Promote `ECO-20260416-main-309` to `READY`.
- Retarget `ECO-20260416-main-309` and `ECO-20260416-critic-309` to this handoff.
