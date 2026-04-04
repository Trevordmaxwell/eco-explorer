# 2026-04-03 Deeper Cave Pocket Handoff

Prepared `ECO-20260403-scout-215` against packet `090` version `2`, the lane-3 brief, the fresh forest vertical-destination review, the current `forest` cave geometry in `src/content/biomes/forest.ts`, the focused cave runtime coverage, and the existing browser artifacts in `output/main-120-cave-loop/`, `output/main-127-browser/`, and `output/main-214-browser/`.

## Current Read

The forest vertical family is now asymmetric in a productive way:

- the upper old-growth side has a true remembered place in `old-growth-branch-nursery`
- the cave side already has the right chamber structure and recovery language

Right now the cave family already does these jobs well:

- `root-hollow` is the sheltered lip
- `seep-pocket` is the first damp drop
- `stone-basin` is the deeper chamber
- `root-hollow-under-basin-pocket` is the hidden lower pocket
- `filtered-return` is the brighter way back out
- `root-hollow-cave-trunk` plus `stone-basin-return-light` keep recovery fair

That means the next cave gain should **not** be another depth spike, a wider right-side tunnel, or another return-light pass. The lower cave is already deep enough. What it still lacks is one place you can settle in and remember the way the new branch nursery now works above ground.

In the current proofs, the under-basin pocket is discovered on the way down, but it still reads more like a clever floor shape than a tiny lower room with its own calm resting spot.

## Recommendation

Treat `ECO-20260403-main-215` as one **under-basin rest** pass inside the existing `stone-basin` family.

Best shape:

- keep the current `stone-basin` floor and the existing `root-hollow-under-basin-pocket`
- keep `root-hollow-cave-trunk` as the only tall recovery spine
- keep `filtered-return` as the brighter exit side
- add one compact tucked rest or inner lip nested under the current basin sill, so the lower pocket becomes a real remembered place instead of only a deeper dip

This should feel like the cave-side answer to the nursery above:

- tiny
- cozy
- legible
- recoverable
- obviously part of the same forest vertical chapter

## Why This Location

- The strongest emotional gap is already visible in `output/main-127-browser/under-basin-pocket.png`: the player reaches the lower chamber, but the space still reads as “the floor got lower” more than “there is a tiny place under here.”
- The under-basin pocket already has the best support carriers for a remembered lower room: `tree-lungwort`, `seep-moss-mat`, `ensatina`, and `banana-slug`.
- The right side already has a clear authored job as recovery into `filtered-return`. Spending the next beat there risks weakening that fair-return read.
- The latest cave review explicitly warned not to deepen the floor again or add another chamber. A tucked inner rest protects the current “basin shelf above, hidden pocket below” read instead of diluting it.

## Option Comparison

### Option 1. Turn the current under-basin pocket into one tucked remembered rest

What it is:

- add one compact rest shelf, inner lip, or pocket perch inside the existing under-basin band
- keep the rest nested below `root-hollow-basin-sill` and left of the main recovery trunk
- reuse current damp-life carriers instead of opening a new content wave

Pros:

- answers the new branch nursery with a matching lower place
- keeps the cave readable at handheld scale
- preserves the current recovery language

Tradeoffs:

- needs careful placement so it reads as a real pocket and not just another small step

Assessment:

- best option

### Option 2. Deepen the under-basin floor again or add a second lower chamber

What it is:

- push the floor lower or stack another chamber beneath the current pocket

Pros:

- immediately feels bigger

Tradeoffs:

- repeats a solved cave beat instead of strengthening memory
- risks making the pocket harsher or visually mushier
- directly fights the latest cave-pocket watch item

Assessment:

- reject

### Option 3. Spend the next cave beat on the brighter recovery side

What it is:

- add a new nook or extra shelf on the `filtered-return` side

Pros:

- easy to recover from

Tradeoffs:

- blurs the clean “bright way out” role
- answers the wrong emotional gap
- risks revisiting the already-solved upper-return seam

Assessment:

- reject

## Proposed Shape For `main-215`

### Geometry

- Stay inside the current lower-cave band around `x ≈ 356-394` and `y ≈ 194-232`.
- Preserve:
  - `root-hollow-cave-sill`
  - `root-hollow-basin-sill`
  - `root-hollow-return-nook`
  - `filtered-return-mouth-sill`
  - `root-hollow-cave-trunk`
- Do not add a second climbable, a second upper-return nook, or a farther-right tunnel.
- Prefer one compact nested shelf or rest lip inside the existing under-basin pocket over any broader terrain rewrite.
- If a depth feature shifts at all, keep it minor and local to the current `root-hollow-under-basin-pocket` read.

### Route Feel

The ideal route language becomes:

1. sheltered lip
2. damp drop
3. basin shelf
4. tucked inner rest below the basin lip
5. recovery trunk
6. brighter return side

That gives the cave a matched remembered place without turning the route into a second cave chapter.

### Content Budget

- Reuse the current lower-cave carriers:
  - `tree-lungwort`
  - `seep-moss-mat`
  - `ensatina`
  - `banana-slug`
- The safest content move is one shifted or one added existing damp carrier near the new rest so it feels intentionally inhabited.
- Do not add a new species, note, close-look, cue type, or station/journal shell work here.

## Suggested Acceptance For `main-215`

- the existing under-basin pocket gains one distinct lower resting place
- the new rest reads as a remembered cave-side place, not just a lower floor
- recovery to `root-hollow-cave-trunk` and `filtered-return` stays clean
- the pass remains one compact geometry beat with minimal content support

## Test Guidance

- extend `src/test/forest-biome.test.ts` with one new under-basin platform or local geometry assertion
- extend focused `runtime-smoke` to:
  - reach the deeper pocket
  - settle in the new lower rest
  - recover back to `root-hollow-cave-trunk`
  - preserve the existing exit into `filtered-return`
- re-run one browser proof where the basin shelf above and the tucked lower rest below are both readable in the same handheld frame

## Browser Guidance

Use these references:

- `output/main-127-browser/under-basin-pocket.png`
- `output/main-127-browser/state.json`
- `output/main-214-browser/nursery-pocket-state.json`

Success should look like:

- the cave now has one lower remembered place to match the upper nursery
- the under-basin read is stronger without becoming darker, louder, or more punishing
- the player can settle there briefly and still see the recovery logic nearby

## Queue Guidance

- Close `ECO-20260403-scout-215`.
- Promote `ECO-20260403-main-215` to `READY`.
- Retarget `ECO-20260403-main-215` and `ECO-20260403-critic-215` to this handoff as their immediate source report.
