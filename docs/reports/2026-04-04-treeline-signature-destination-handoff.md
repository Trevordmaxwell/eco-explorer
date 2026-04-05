# 2026-04-04 Treeline Signature Destination Handoff

Prepared for `ECO-20260404-scout-267` in lane 3.

## Scope Reviewed

- `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- `docs/reports/2026-04-04-treeline-signature-and-beach-landmark-phase.md`
- `docs/reports/2026-03-31-treeline-ascent-proof-review.md`
- `docs/reports/2026-04-04-threshold-support-handoff.md`
- `docs/reports/2026-04-04-threshold-support-implementation.md`
- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- treeline browser proof in `output/lane-3-scout-97-browser/` and `output/main-135-browser/`

## Current Read

`Treeline Pass` is no longer missing traversal shape.

Right now the biome already has one solid right-half family:

1. shelf approach
2. lee-pocket crest
3. rime rest
4. fell return
5. lee rest after the drop

That solved the old “thin pass into tundra” problem, but it still leaves the biome's strongest place-memory too far into the rock-and-fell half. The current signature mostly reads as a sheltered alpine pocket, not as the last tree-shaped shelter before open fell takes over.

The clearest untouched spatial budget is the right half of `krummholz-belt` before the current `lee-pocket-entry-stone`. In live geometry that band runs roughly from `x 186` to `x 250`, stays in the tree-breakdown zone, and is still mostly flat except for one authored `bunchberry` anchor.

## Recommendation

Treat `main-267` as one exact treeline pass:

1. stay in `Treeline Pass`
2. stay inside the right half of `krummholz-belt`
3. add one compact `last-tree shelter` stop just before the current lee-pocket family

This is the cleanest way to make treeline feel like its own threshold chapter instead of just a calmer pre-tundra rock shelf.

## 1. Use The Krummholz Belt, Not More Height On The Rime Side

### Why this band is the better target now

- it is where upright tree form is actually breaking down into wind-shaped shelter
- it gives treeline a benchmark place earlier in the route instead of stacking more drama into the already-rich lee-pocket proof
- it stays visually distinct from tundra's snow-rest and forest's cave or trunk spaces because the beat is about last tree cover, not rock depth or open exposure alone

### Why not extend the current lee-pocket family

- the live `lee-pocket-rime-rest` already works as the biome's higher alpine perch
- the 2026-03-31 review explicitly warned that future treeline follow-ons should avoid growing more height without live browser proof discipline
- another upper notch, cap, or brow would mostly make the existing family denser instead of making treeline's threshold identity clearer

## 2. Exact Destination To Hand Off

### Shape

Add one small `krummholz-belt` destination that reads like:

1. thin canopy behind you
2. bent last-tree shelter ahead
3. one calm stop before the route opens into the existing lee-pocket shelf

The destination should feel like the last woody lee before the terrain turns more openly alpine, not like a second vertical route.

### Target band

- zone: `krummholz-belt`
- x band: `186-250`
- y band: `102-110`

That keeps the new beat clear of:

- the left thin-canopy opener
- the already-authored `lee-pocket-entry-stone` at `x 258`
- the higher `rime-rest` and `fell-return` family that already owns the biome's upper silhouette

### Suggested platform shape

Keep it to one tiny family:

- one low approach stone or shoulder on the left half of the band
- one slightly higher or longer `last-tree rest` on the right half of the band

The full family should stay below the current rime perch and read as a calm stop, not as another climb tier.

## 3. Best Carrier Set

Use local treeline threshold carriers only.

Strongest pair:

- `krummholz-spruce`
- `bunchberry`

Why this pair:

- `krummholz-spruce` gives the stop one unmistakable bent-tree silhouette tied directly to the existing threshold teaching
- `bunchberry` makes the place still feel like the last sheltered forest-floor remnant instead of just more rock

Acceptable nearby supporting context:

- `dwarf-birch`
- `mountain-hemlock`

If the beat needs a second authored accent beyond `bunchberry`, prefer one low woody support like `dwarf-birch`, not another alpine rock landmark.

## Explicit Non-Targets

- do not add more height to `lee-pocket-rime-rest`, `lee-pocket-rime-cap`, or `lee-pocket-crest-brow`
- do not reopen the `lichen-fell` side of the family
- do not add new climbables, vertical cues, or another high perch
- do not spend this pass on notebook, comparison, close-look, route, or world-map work
- do not turn the `krummholz-belt` into a second multi-step branch

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact last-tree shelter before the lee-pocket family|keeps the treeline lee pocket as the higher half of the same route family|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`
- `npm run build`
- required shared client smoke
- one seeded browser proof that lands the player in the new `krummholz-belt` stop with thin canopy behind and the lee-pocket continuation still ahead

## Queue Outcome

- Close `ECO-20260404-scout-267`.
- Promote `ECO-20260404-main-267` to `READY`.
- Retarget `ECO-20260404-main-267` and `ECO-20260404-critic-267` to this handoff.
