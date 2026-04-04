# 2026-04-04 High-Country Threshold Destination Handoff

Prepared for `ECO-20260404-scout-259` in lane 3.

## Scope Reviewed

- `.agents/packets/106-signature-pocket-and-threshold-destination-phase.json`
- `docs/reports/2026-04-04-signature-pocket-and-threshold-destination-phase.md`
- `docs/reports/2026-04-04-coastal-scrub-signature-pocket-review.md`
- `docs/reports/2026-04-03-high-country-threshold-pocket-review.md`
- `docs/reports/2026-04-02-treeline-sheltered-descent-review.md`
- `docs/reports/2026-04-04-threshold-support-handoff.md`
- `src/content/biomes/tundra.ts`
- `src/content/biomes/treeline.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- browser proof images in `output/main-223-browser/` and `output/main-159-browser/`

## Current Read

- `Treeline Pass` already spends its right-half traversal budget on one strong remembered family. The live route reads `crest brow -> fell return -> lee rest -> open fell`, and the current browser proof already gives that biome the richer shelter-versus-exposure silhouette.
- `Tundra Reach` now has a good left opener. The `wind-bluff -> snow-threshold` pocket is memorable, but the review for `main-223` correctly calls that opener close to its comfortable density ceiling.
- The strongest untouched spatial budget is the long `snow-meadow` band between the current threshold hold and the already-authored `thaw-skirt` relief family. In live geometry that stretch runs from roughly `x 178` to `x 314` with no authored destination of its own.

## Recommendation

Treat `main-259` as one exact tundra pass:

1. stay in `Tundra Reach`
2. stay inside `snow-meadow`
3. add one compact mid-meadow drift hold between the opener and `thaw-skirt`

This is the cleanest way to give the high country one more memorable threshold place without spending more budget in treeline's already-rich lee-pocket family or overfilling the left tundra opener.

## 1. Use Tundra, Not Treeline

### Why tundra is the better lane-3 target now

- treeline already has the denser, more layered destination family
- tundra still has a broad emotional flat spot after the opener
- a new tundra rest can deepen second-act identity without reopening the already-solved `thaw-skirt`, `frost-ridge`, or `meltwater-edge` families

### Why not another treeline beat

- another treeline shelf or return notch would spend budget where the current live proof is already working
- it would blur the current treeline signature instead of giving tundra a comparable remembered place
- lane 2 is already using `krummholz-spruce` and `woolly-lousewort` for the lighter threshold-support pass, so lane 3 should keep its spatial push on the emptier tundra side

## 2. Exact Destination To Hand Off

### Shape

Add one small `snow-meadow` destination that reads like:

1. open threshold behind you
2. slight snow heave or shoulder
3. one held drift rest before thaw begins

The destination should feel like a calm lee in the middle of exposure, not like a second puzzle shelf.

### Target band

- zone: `snow-meadow`
- x band: `216-286`
- y band: `102-110`

That keeps the new beat clear of:

- the crowded left opener and its current threshold pocket
- the `thaw-skirt-entry-heave` at `x 314`

### Suggested platform shape

Keep it to one tiny family, not a new branch:

- one low approach shoulder around the left half of the target band
- one slightly higher or longer drift rest on the right half of the band

The whole family should stay low enough that the return path still reads as walkable and forgiving on first contact.

## 3. Best Carrier Set

Use local `snow-meadow` carriers only.

Strongest pair:

- `bigelows-sedge`
- `white-tailed-ptarmigan`

Why this pair:

- `bigelows-sedge` makes the ground feel slightly held and springy instead of bare
- `white-tailed-ptarmigan` gives the pocket one strong living silhouette without adding a new species or a denser landmark stack

Acceptable supporting nearby spawn context:

- `purple-saxifrage`
- `northern-collared-lemming`

## Explicit Non-Targets

- do not add another beat in the `wind-bluff` or `snow-threshold` opener band
- do not touch treeline geometry for this packet step
- do not reopen `thaw-skirt`, `frost-ridge`, or `meltwater-edge`
- do not add new climbables, vertical cues, map logic, route logic, or notebook surfaces
- do not turn the meadow into a second multi-step family

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact snow-meadow drift hold before the thaw-skirt family|adds one held tundra threshold pocket before the thaw-skirt relief family|turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family"`
- `npm run build`
- required shared client smoke
- one seeded browser proof that lands the player in the new mid-meadow hold with the opener behind and the thaw-skirt continuation still ahead

## Queue Outcome

- Close `ECO-20260404-scout-259`.
- Promote `ECO-20260404-main-259` to `READY`.
- Retarget `ECO-20260404-main-259` and `ECO-20260404-critic-259` to this handoff.
