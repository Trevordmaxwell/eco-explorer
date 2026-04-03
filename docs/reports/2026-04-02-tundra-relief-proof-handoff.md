# 2026-04-02 Tundra Relief Proof Handoff

Prepared `ECO-20260402-scout-105` against packet `050`, the lane-3 brief, the live tundra implementation in `src/content/biomes/tundra.ts`, the current tundra biome coverage, and fresh browser artifacts in `output/lane-3-scout-105-browser/`.

## Current Read

`Tundra Reach` already has the start of a vertical idea:

- the player drops into a lower `thaw-skirt` lane
- one simple hop reaches the long `thaw-skirt-upper-shelf`
- that shelf carries cleanly into `frost-ridge`

That is a good first proof, but it still reads mostly as:

1. lower lane
2. jump to shelf
3. glide across
4. step down into ridge

The space works, but it still feels like a flat crossing more than a distinct tundra relief family.

## Best Next Proof

Turn the right side of the current `thaw-skirt` shelf into one shallow `snowbank shoulder` return.

Best question:

- where is the one slightly higher, drier hold before the wet thaw lane opens back into ridge?

Why this is the strongest next move:

- it grows directly out of the live `thaw-skirt` route instead of starting a second tundra branch
- it keeps tundra low and terrain-first, which differentiates it from treeline’s more folded stone shelter
- it makes the tundra beat feel like contour-following and thaw-edge relief, not like a colder copy of the treeline notch loop

## Current Geometry Constraint

The fresh browser read in `output/lane-3-scout-105-browser/` makes the limit clear:

- `lower-lane.png` shows a readable lowered thaw band with good local carriers already in place
- `upper-shelf.png` shows the current hop is calm and easy to read
- `ridge-rejoin.png` shows the right half resolving too linearly: shelf, then quick drop, then ridge

That means the next step should:

- not add more real height
- not turn tundra into another lip-and-notch silhouette
- not add a second cue language or extra text
- fold the current right-side shelf into one shallow relief step before the ridge exit

## Recommended Geometry Shape For `main-143`

Keep the full live thaw-skirt family:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-exit-heave`

Add only one new low return piece:

1. `thaw-skirt-bank-shoulder`
   - place on the right half of the current shelf family, just before the ridge rejoin
   - target range: around `x 420-438`
   - height: around `y 103-105`
   - width: `18-22px`
   - job: create one shallow step-down where the player can settle before the final ridge exit

Only if the runtime needs a softer landing, prefer widening or nudging `thaw-skirt-exit-heave` slightly right instead of adding a second new piece.

Desired route read:

1. lower thaw lane
2. hop onto the upper shelf
3. drop onto one shallow bank shoulder
4. rejoin `frost-ridge` without a harsh fall

## Best Content And Cue Support

Keep support minimal and local.

Use the content already shaping the thaw band:

- `tussock-thaw-channel`
- `bigelows-sedge`
- `cottongrass`
- `woolly-lousewort`

Best support shape:

- if one extra authored anchor is needed, use a single `bigelows-sedge` or `cottongrass` near the new shoulder
- do not add another note, prompt, cue, climbable, or HUD element

## Test Guidance

`main-143` should prove the relief without widening lane 3:

- extend `src/test/tundra-biome.test.ts` so the authored platform list includes the new shoulder in order
- add one focused `runtime-smoke` proof with a temporary tundra start override near the current thaw-skirt approach band and demonstrate:
  - the player can still reach the current upper shelf
  - the player can settle onto the new bank shoulder
  - the player can rejoin `frost-ridge` cleanly
- keep the current tundra process and content tests intact

## Browser Guidance

Use these as the before-state baseline:

- `output/lane-3-scout-105-browser/lower-lane.png`
- `output/lane-3-scout-105-browser/upper-shelf.png`
- `output/lane-3-scout-105-browser/ridge-rejoin.png`

Success should look like:

- one shallow terrain-relief family, not a second treeline-style pocket
- the right half no longer feels like a long flat shelf plus abrupt rejoin
- the whole beat stays low, calm, and readable at `256x160`

## Queue Guidance

- Close `ECO-20260402-scout-105` as done.
- Promote `ECO-20260402-main-143` to `READY`.
- Keep `ECO-20260402-critic-116` blocked until the implementation lands.
