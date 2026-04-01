# 2026-03-31 Treeline Lee-Side Ascent Proof Handoff

Prepared `ECO-20260331-scout-97` against packet `046`, the lane-3 brief, the existing `treeline` geometry and tests, the earlier treeline shelter handoff/review, and fresh browser artifacts in `output/lane-3-scout-97-browser/`.

## Current Read

`Treeline Pass` already has a good first shelter question:

- the player drops into a lowered lee pocket in `dwarf-shrub`
- the current upper shelf signals that stone and bent cover can still break the wind
- `frost-heave-boulder`, `hoary-marmot`, and berry/heath life make the pocket feel worth reading

That means the biome no longer needs another generic shelter lane. What it still lacks is one compact vertical payoff that feels specific to treeline instead of like a flatter prelude to forest or tundra.

## Best Next Proof

Use the right half of the existing lee-pocket band as a `lee-side lift`.

Best question:

- where is the one slightly higher perch that still stays tucked out of the full ridge wind?

Why this is strongest:

- it grows directly out of the live `lee-pocket-upper-shelf` instead of starting a second unrelated route
- it keeps the proof in one camera band at the current `256x160` frame
- it teaches treeline-specific shelter by letting the player rise a little toward open fell without fully leaving the lee

## Current Geometry Constraint

The fresh browser read at `output/lane-3-scout-97-browser/lee-pocket-floor.png` is the key constraint:

- camera `x` is already about `254` by the time the player reaches the middle of the pocket
- the current upper shelf already fills a lot of the frame width
- the lower floor, upper shelf, and note chip all still coexist cleanly, but there is not much room for a taller or wider second climb family

That makes the next implementation step clearer:

- do not add a broad new upper branch
- do not shift the proof left into `krummholz-belt`
- do not push the new rest so high that it competes with the top chips

## Recommended Geometry Shape For `main-135`

Keep the live authored trio:

1. `lee-pocket-entry-stone`
2. `lee-pocket-upper-shelf`
3. `lee-pocket-exit-stone`

Add only one short rise above that shelf and one tiny rejoin:

1. `lee-pocket-crest-step`
   - place on the right half of the current upper shelf band
   - target range: around `x 418-434`
   - height: about `6-8px` above `lee-pocket-upper-shelf`
   - width: `20-24px`
2. `lee-pocket-rime-rest`
   - small tucked perch near the `dwarf-shrub -> lichen-fell` seam
   - target range: around `x 448-474`
   - height: about `12-16px` above the current upper shelf, not more
   - width: `28-36px`
3. `lee-pocket-fell-return`
   - tiny lower rejoin stone on the far right
   - target range: around `x 486-510`
   - height: close to the crest step or only slightly lower
   - width: `18-22px`

Desired route read:

1. drop into lee pocket
2. step onto existing upper shelf
3. rise once more into a calmer high perch
4. rejoin the fell side without a harsh drop or a blind retreat

## Best Content And Cue Support

Keep support minimal and local.

Use existing entries instead of a new content pack:

- keep `frost-heave-boulder` and `hoary-marmot` as the lower shelter proof
- let the new upper perch read through existing fell-life like `mountain-avens`, `moss-campion`, or `reindeer-lichen`

One tiny cue is appropriate if the climb read needs it:

- add one `verticalCue` on the same tiny authored seam the forest uses
- best style match is a subtle opening/light cue rather than a new signpost language
- place it near the high perch, not at the base

Do not add:

- a climbable trunk or ladder
- a new text surface
- a second note or prompt just for this pass

The live `Stone Shelter` note and `treeline-stone-shelter` prompt already cover the teaching seam well enough.

## Test Guidance

`main-135` should keep the proof narrow and verifiable:

- extend `src/test/treeline-biome.test.ts` so the authored lee-pocket platform list includes the new crest, rest, and return pieces in order
- add one targeted `runtime-smoke` proof that uses a temporary treeline start override, reaches the new high perch, and confirms the return remains catchable
- if a vertical cue is added, assert it appears in `visibleVerticalCueIds` only while the pocket/perch is on screen and still respects the existing hint-toggle behavior

## Browser Guidance

Use the new scout artifacts as the baseline:

- `output/lane-3-scout-97-browser/treeline-start.png`
- `output/lane-3-scout-97-browser/lee-pocket-floor.png`
- `output/lane-3-scout-97-browser/state.json`
- `output/lane-3-scout-97-browser/lee-pocket-floor-state.json`

Success should look like:

- the new perch reads in the same pocket family as the current shelf
- the player can understand the next step without a new HUD layer
- the upper rest still fits comfortably below the top chips in a live browser capture

## Queue Guidance

- Close `ECO-20260331-scout-97` as done.
- Promote `ECO-20260331-main-135` to `READY`.
- Keep `ECO-20260331-critic-108` blocked until the implementation lands.
