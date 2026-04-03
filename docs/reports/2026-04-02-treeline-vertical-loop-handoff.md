# 2026-04-02 Treeline Vertical Loop Handoff

Prepared `ECO-20260402-scout-104` against packet `050`, the lane-3 brief, the live treeline implementation in `src/content/biomes/treeline.ts`, the current treeline biome and runtime smoke coverage, the existing lee-side handoff/review chain, and fresh browser artifacts in `output/lane-3-scout-104-browser/`.

## Current Read

`Treeline Pass` now has a good first vertical question:

- the player drops into a lee pocket inside `dwarf-shrub`
- the current shelf, crest step, and high perch teach that even above the lowered floor, stone can still hold a calmer seam
- `moss-campion`, `hoary-marmot`, and the tiny `lee-pocket-rime-light` cue make the right half feel intentionally worth climbing

What it still lacks is a real loop read.

Right now the branch is strongest as:

1. enter pocket
2. climb up the shelf family
3. spill into `lichen-fell`

That is a good proof, but it still reads more like `ascent -> handoff` than a distinct treeline vertical family.

## Best Next Proof

Turn the right side of the current `lee-side lift` into a compact `backside notch loop`.

Best question:

- where is the tiny calmer hold just below the wind-exposed lip?

Why this is the strongest next move:

- it grows directly out of the live `lee-pocket-rime-rest` instead of starting a second climb family
- it keeps the whole beat inside the same one-camera band that already reads well at `256x160`
- it makes treeline feel different from forest by centering on wind-cut relief and folded shelter, not bark climbing or deeper chambers

## Current Geometry Constraint

The fresh browser read at `output/lane-3-scout-104-browser/lee-pocket.png` and `output/lane-3-scout-104-browser/fell-rejoin.png` makes the limit clear:

- the lower pocket, long shelf, crest, and current upper rest already use most of the live horizontal budget
- the top chips are still safe, but there is not much room for another taller or broader branch
- the current right edge resolves too quickly into `lichen-fell`, so the pocket feels like it empties outward instead of folding back into itself

That means the next step should:

- not add more raw height
- not push farther left into `krummholz-belt`
- not add a second cue language or extra text
- fold the existing right-side ascent inward instead of extending it outward

## Recommended Geometry Shape For `main-142`

Keep the full live lee-pocket family:

1. `lee-pocket-entry-stone`
2. `lee-pocket-upper-shelf`
3. `lee-pocket-crest-step`
4. `lee-pocket-rime-rest`
5. `lee-pocket-exit-stone`
6. `lee-pocket-fell-return`

Add only one tiny upper continuation and one lower tucked recovery hold:

1. `lee-pocket-rime-cap`
   - place just to the right of `lee-pocket-rime-rest`
   - target range: around `x 486-502`
   - height: same as the current rest or at most `2px` lower
   - width: `16-20px`
   - job: make the upper lip feel intentional instead of abruptly ending
2. `lee-pocket-back-notch`
   - place below that cap, between the current rest and current `lee-pocket-fell-return`
   - target range: around `x 468-488`
   - height: around `y 98-100`
   - width: `22-28px`
   - job: create one sheltered mid-height bowl where the player can recover before choosing left recovery or right rejoin

Only if the runtime needs one softer landing, prefer widening `lee-pocket-fell-return` slightly instead of adding a third new piece.

Desired route read:

1. floor pocket
2. upper shelf
3. crest and high rest
4. tiny upper lip
5. drop into one calmer backside notch
6. rejoin `lichen-fell` or hop back toward the existing upper path without a blind fall

## Best Content And Cue Support

Keep support minimal and local.

Use the content that already fits the current screen:

- `moss-campion`
- `reindeer-lichen`
- `white-arctic-mountain-heather`
- `arctic-willow`

Best support shape:

- if one extra authored anchor is needed, use a single fell-facing plant or lichen near the new notch
- keep the existing `lee-pocket-rime-light`
- do not add another note, prompt, climbable, or sign-like cue

## Test Guidance

`main-142` should prove the loop without widening the runtime:

- extend `src/test/treeline-biome.test.ts` so the authored platform list includes the new cap and notch in order
- add one focused `runtime-smoke` proof that uses the same temporary treeline start override and demonstrates:
  - the player can still reach the current upper rest band
  - the player can settle into the new backside notch
  - the player can rejoin `lichen-fell` cleanly without a blind drop
- keep the existing tiny cue assertions and hint-toggle behavior intact

## Browser Guidance

Use these as the before-state baseline:

- `output/lane-3-scout-97-browser/lee-pocket-floor.png`
- `output/main-135-browser/lee-pocket-lift.png`
- `output/lane-3-scout-104-browser/lee-pocket.png`
- `output/lane-3-scout-104-browser/fell-rejoin.png`

Success should look like:

- the new notch reads as the same family as the current perch, not a separate route
- the right side no longer feels like a quick spill into open fell
- the top still sits comfortably below the chip-safe area
- the player can understand the recovery choice without another HUD layer

## Queue Guidance

- Close `ECO-20260402-scout-104` as done.
- Promote `ECO-20260402-main-142` to `READY`.
- Keep `ECO-20260402-critic-115` blocked until the implementation lands.
