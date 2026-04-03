# 2026-04-02 Treeline Sheltered Descent Handoff

Prepared `ECO-20260402-scout-121` against packet `058`, the lane-3 brief, the fresh crest review, the live `treeline` geometry in `src/content/biomes/treeline.ts`, the focused treeline runtime proof, and the current crest browser artifacts in `output/main-158-browser/`.

## Current Read

`Treeline Pass` now has a real top edge.

The route reads much better on the way up:

- upper shelf
- crest step
- rime rest
- tucked notch fallback
- rime cap
- tiny crest brow

What still feels a little thin is the way back down after that payoff.

Right now the return reads mostly as:

1. reach the crest brow
2. drop onto `lee-pocket-fell-return`
3. rejoin the open fell almost immediately

That works and stays fair, but it does not yet feel like a distinct sheltered return seam. The browser read in `output/main-158-browser/crest-approach.png` makes the gap clear: the crest itself has identity, while the descent still resolves more like a quick release into the right-side fell.

## Best Next Move

Use `main-159` on one compact lower lee-side rest just beyond the current `lee-pocket-fell-return`.

Best question:

- where is the one calmer settling point after the crest before the route fully opens back into `lichen-fell`?

Why this is the strongest next move:

- it grows directly out of the live crest family instead of adding another upper lip
- it keeps the descent memorable without turning treeline into a harsher challenge space
- it reuses the current lee-side shelter language rather than inventing a new cue family
- it gives the return one place-feeling beat before the open fell rejoin

## Option Comparison

### 1. Add one low lee-rest after `lee-pocket-fell-return`

What it is:

- keep the current crest and fell-return pieces
- add one lower forward rest on the right side of the family
- let the player settle there before the final open-fell rejoin

Pros:

- spends the whole budget on the currently thinnest part of the route
- keeps the vertical gain modest
- makes the descent feel sheltered instead of abrupt
- stays inside the same camera band

Tradeoffs:

- needs careful overlap so it reads as a return beat, not as a redundant extra platform

Assessment:

- best option

### 2. Add another upper piece beyond the crest brow

What it is:

- keep pushing the player higher or farther right above the current crest

Pros:

- would make the top edge feel bigger

Tradeoffs:

- spends the next pass on more ascent instead of on the return
- risks violating the review watch item about raising the route again
- starts to look like a second treeline branch instead of one complete family

Assessment:

- reject

### 3. Rework the left-side notch again

What it is:

- add more recovery shape back on the tucked `lee-pocket-back-notch` side

Pros:

- easy to fit into the existing left-side space

Tradeoffs:

- the notch is already doing its job
- it strengthens fallback rather than finishing the return
- it would leave the right-side descent feeling thin

Assessment:

- reject

## Recommended Geometry Shape For `main-159`

Keep the full live family:

1. `lee-pocket-entry-stone`
2. `lee-pocket-upper-shelf`
3. `lee-pocket-exit-stone`
4. `lee-pocket-crest-step`
5. `lee-pocket-rime-rest`
6. `lee-pocket-back-notch`
7. `lee-pocket-rime-cap`
8. `lee-pocket-crest-brow`
9. `lee-pocket-fell-return`

Add only one new lower return piece:

1. `lee-pocket-lee-rest`
   - place just beyond `lee-pocket-fell-return`
   - target band: around `x 538-556`
   - height: around `y 100-102`
   - width: `18-22px`
   - job: create one sheltered settling step between the crest drop and the full `lichen-fell` rejoin

Only if the runtime needs a softer handoff, prefer a tiny width or x-position adjustment to `lee-pocket-fell-return` instead of adding a second new platform.

Desired route read:

1. upper shelf into crest
2. crest brow
3. drop to `lee-pocket-fell-return`
4. settle once on `lee-pocket-lee-rest`
5. open back into `lichen-fell`

## Content And Cue Support

Keep support minimal and local.

The current right-side read already has useful shelter-facing life around the descent:

- `talus-cushion-pocket`
- `mountain-avens`
- `moss-campion`
- `white-arctic-mountain-heather`
- `arctic-willow`

Best support shape:

- prefer reusing the existing right-side carriers rather than adding another note or cue
- if one extra authored anchor is needed, use one tiny `arctic-willow` or `talus-cushion-pocket` near the new lee-rest
- do not add a new text seam, HUD cue, or second vertical-light marker

## Test Guidance

`main-159` should prove the descent without widening lane 3:

- extend `src/test/treeline-biome.test.ts` so the authored platform order includes the new lee-rest in sequence
- update the treeline `runtime-smoke` proof with the same temporary start override and demonstrate:
  - the player can still reach the crest brow
  - the player can settle on the new lee-rest
  - the player can rejoin `lichen-fell` cleanly without a trap state
- keep the existing crest reward and notch assertions intact

## Browser Guidance

Use these as the before-state baseline:

- `output/main-158-browser/approach.png`
- `output/main-158-browser/crest-approach.png`
- `output/main-158-browser/crest-approach-state.json`

Success should look like:

- the crest still reads as the highest calm beat
- the return now has one distinct sheltered settling point
- the right half no longer feels like crest, then immediate open-fell release
- the whole treeline family stays readable at `256x160`

## Queue Guidance

- Close `ECO-20260402-scout-121`.
- Promote `ECO-20260402-main-159` to `READY`.
- Retarget `ECO-20260402-main-159` and `ECO-20260402-critic-132` to this handoff report as the immediate source of truth.
