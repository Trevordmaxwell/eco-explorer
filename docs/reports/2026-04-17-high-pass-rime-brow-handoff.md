# 2026-04-17 High Pass Rime Brow Handoff

Prepared `ECO-20260418-scout-313` against packet `127`, the lane-3 brief, the scout role guide, the Sprint 4 phase note, the live `High Pass` route implementation and review, the current `Treeline Pass` geometry in `src/content/biomes/treeline.ts`, and the latest lane-3 browser artifacts in `output/main-309-browser/` and `output/main-305-browser/`.

## Current Read

`High Pass` now has one strong remembered middle and one good final stop, but it still lacks a distinct upper reveal.

Right now the live treeline chapter gives the player:

1. last-tree shelter
2. `Stone Shelter` basin
3. climb into the folded lee family
4. open-fell talus hold before tundra travel

That is a real chapter skeleton, but the climb still jumps from “good sheltered place” to “good last stop” without a clear second frame between them.

The missing beat is not another basin and not another far-right talus lift. It is the current `rime-mark` band.

## What Feels Thin

The route logic already knows about the middle reveal:

- `stone-lift`
- `lee-watch`
- `rime-mark`
- `talus-hold`

But the spatial memory is still stronger at the first and last beats than at the third one.

`Stone Shelter` is now a real place because it has:

- one held basin
- one local boulder anchor
- one local marmot anchor

The open-fell side also now has one low talus hold before tundra takes over.

The `rime-mark` band between them is still mostly a good traversal sequence:

- `lee-pocket-rime-rest`
- `lee-pocket-rime-cap`
- `lee-pocket-crest-brow`
- `lee-pocket-fell-return`

That sequence works, but it does not yet read like a chapter frame the way `Stone Shelter` does.

## Recommendation

Treat `main-313` as one compact `Rime Brow` overlook in `Treeline Pass`.

The goal is to turn the current crest band into a real exposure-release place, not to add another full route family.

## Exact Target

- biome: `Treeline Pass`
- route family: `High Pass`
- zone focus: late `dwarf-shrub` into the first exposed `lichen-fell`
- preferred band: `x 476-534`
- preferred height: `y 80-96`

This keeps the pass:

- well right of the saturated `Stone Shelter` basin band at `x 320-372`
- left of the open-fell island where the prior review warned against another added lift
- inside the current `rime-mark -> talus-hold` transition that the live route already teaches

## Recommended Main Shape

Spend the next lane-3 move on one held overlook, not another shelter basin and not another separate right-side stop.

### Best structural move

Turn the current `rime-cap -> crest-brow` handoff into one clearer overlook family.

Recommended shape:

1. broaden or retune the current upper rime band so it reads as one real `Rime Brow` pause
2. keep the reveal immediately tied to the existing fall back into `lee-pocket-fell-return`
3. only add one tiny helper below the overlook if the hand-back still needs rhythm after the reveal reads

### Preferred authored geometry budget

Keep the current family:

1. `lee-pocket-rime-rest`
2. `lee-pocket-rime-cap`
3. `lee-pocket-crest-brow`
4. `lee-pocket-fell-return`
5. `lee-pocket-lee-rest`
6. `fell-island-step`
7. `fell-island-rest`

Spend the pass on one of these two safe options:

### Option A: reshaped overlook

- widen `lee-pocket-rime-cap` into a true held overlook
- tighten `lee-pocket-crest-brow` into a short wind-cut lip
- leave the lower hand-back alone if it still reads cleanly

### Option B: one added overlook shelf

- keep the current cap and brow mostly intact
- add one compact `rime-brow-overlook` shelf in the `x 492-522`, `y 84-90` band
- only if needed, add one tiny helper under it that returns into `lee-pocket-fell-return`

If the reshaped current cap already makes the band read like a place, prefer that lighter move over adding a new platform id.

## Best Carrier Support

Use the current chapter carriers rather than opening another content wave.

Strongest local anchors:

- `moss-campion` for the live `rime-mark`
- `reindeer-lichen` for the active `Rimed Pass` replay variant
- `talus-cushion-pocket` as the later open-fell continuation clue

If one deterministic support anchor is needed, prefer one small cold-ground or lichen accent near the overlook rather than another `Stone Shelter`-style boulder / marmot pair.

## Desired Read

`High Pass` should become:

1. last trees
2. `Stone Shelter`
3. `Rime Brow`
4. talus hold
5. tundra handoff later

That gives the chapter a cleaner three-beat memory:

- sheltered middle
- exposed reveal
- low final hold

## Why This Is Better Than Other Options

### Not another basin

The `Stone Shelter` band now has the exact remembered-middle spend it needed, and the latest review already calls it near its density ceiling.

### Not another right-side lift

The open-fell island already does the correct job as the last stop before tundra. The prior review explicitly warned against stacking more authored lift immediately to its right.

### Not tundra yet

This chapter is still physically owned by `Treeline Pass`. The best next spatial gain is making the climb into exposure memorable before the biome handoff takes over.

## Explicit Non-Targets

- do not spend more authored geometry in `x 320-372`
- do not add another lift immediately to the right of `fell-island-rest`
- do not move the tundra corridor door or travel logic
- do not add a new climbable, cue family, or text surface
- do not reopen forest or giant-tree geometry

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact Rime Brow overlook between Stone Shelter and the open-fell hold|keeps the Stone Shelter basin band unchanged while strengthening the treeline crest reveal|adds one compact open-fell island before the tundra handoff"`
- `npm run build`
- required shared client smoke
- one seeded browser proof centered on the new `Rime Brow` band with `Stone Shelter` clearly earlier in the sequence and the open-fell island still later

## Queue Outcome

- Close `ECO-20260418-scout-313`.
- Promote `ECO-20260418-main-313` to `READY`.
- Retarget `ECO-20260418-main-313` and `ECO-20260418-critic-313` to this handoff.
