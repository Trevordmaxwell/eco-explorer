# 2026-04-16 High-Country Relief Continuation Handoff

Prepared `ECO-20260416-scout-305` against packet `125`, the lane-3 brief, the scout role guide, the current second-act treeline and tundra geometry in `src/content/biomes/treeline.ts` and `src/content/biomes/tundra.ts`, the recent high-country review chain, and the live browser/state artifacts in `output/main-267-browser/`, `output/main-259-browser/`, `output/main-193-browser/`, `output/main-159-browser/`, and `output/lane-3-scout-104-browser/`.

## Current Read

The second act is no longer missing traversal structure.

Right now the high-country chain already has:

1. a clear treeline threshold stop in `krummholz-belt`
2. a folded treeline `lee-pocket` family
3. a tundra threshold pocket at `wind-bluff -> snow-meadow`
4. a snow-meadow drift hold
5. a thaw-skirt shelf family
6. a frost-ridge drift rest
7. a meltwater-edge pocket

That means Sprint 2 should not reopen the already-solved threshold bands. The remaining gap is where the second act still flattens into “travel to the next biome” before it becomes one last memorable place.

The strongest remaining gap is **Treeline Pass after the sheltered lee family, not Tundra Reach**.

## Why Treeline, Not Tundra

### Tundra is already spending its relief budget well

Recent lane-3 passes already gave tundra a complete sequence of place beats:

- `wind-bluff -> snow-threshold`
- `snow-meadow-drift-rest`
- `thaw-skirt` approach and shelf family
- `frost-ridge-drift-rest`
- `meltwater-bank-rest`

The reviews for those passes also leave repeated density warnings on:

- the `snow-meadow` hold band
- the `snow-meadow -> thaw-skirt` handoff
- the far-right `meltwater-edge` pocket

There is still room for later cleanup there, but not for the next best unforgettable-place spend.

### Treeline still drops into travel before its open-fell side becomes a place

The live `main-159` artifacts make the gap concrete.

In `output/main-159-browser/lee-rest.png` and `output/main-159-browser/fell-rejoin.png`, the player gets:

1. last-tree shelter
2. lee-pocket climb
3. crest and sheltered return
4. then almost immediately `TO TUNDRA REACH`

The paired states show the exact issue:

- `output/main-159-browser/lee-rest-state.json`
- `output/main-159-browser/fell-rejoin-state.json`

By the time the player is settled in early `lichen-fell`, the tundra corridor door is already in range while the open-fell side is still mostly procedural stone and life carriers. The content there is good, but it reads more like a release strip than a destination.

That makes the early `lichen-fell` side the best remaining Sprint 2 lane-3 target.

## Recommendation

Treat `main-305` as one exact treeline pass:

1. stay in `Treeline Pass`
2. stay in early `lichen-fell`
3. add one compact open-fell `talus island` hold before the tundra door comes into play

This is the cleanest way to give the second act one more unforgettable place without reopening treeline’s denser threshold bands or tundra’s already-spent relief families.

## Exact Target Band

- biome: `Treeline Pass`
- zone: `lichen-fell`
- band: immediately after `lee-pocket-lee-rest`, before tundra travel is in range
- x range: `548-586`
- y range: `96-104`

That keeps the pass:

- clear of the already-solved `krummholz-belt` and `lee-pocket` height family
- well before the treeline corridor door at `x 608`
- inside the existing open-fell ecology where `talus-cushion-pocket`, `moss-campion`, `reindeer-lichen`, `mountain-avens`, `rock-ptarmigan`, and `frost-heave-boulder` already gather naturally

## Suggested Shape

Prefer one tiny open-fell family, not a new branch.

### If two pieces are needed

1. `fell-island-step`
   - around `x 550-566`
   - around `y 101-103`
   - width `14-18`
   - job: carry the player out of `lee-pocket-lee-rest` into open-fell ground without a dead strip

2. `fell-island-rest`
   - around `x 570-586`
   - around `y 97-100`
   - width `16-20`
   - job: create one last held talus stop before the tundra door takes over

### If one piece is enough

Stop at the rest. Do not spend the extra step unless the current gap still feels like release instead of place.

## Best Carrier Set

Use the existing `talus-islands` ecology instead of inventing a new content seam.

Strongest local support:

- `talus-cushion-pocket`
- `moss-campion`
- `mountain-avens`

Optional one stronger silhouette if the space needs it:

- `rock-ptarmigan`

Keep `frost-heave-boulder` as a nearby farther-right accent, not the center of the new hold.

## Desired Read

Treeline should become:

1. last trees
2. lee-pocket shelter climb
3. sheltered return
4. one low open-fell talus island
5. tundra handoff

That gives the second act one more benchmark place without making treeline taller or harsher.

## Explicit Non-Targets

- do not reopen `krummholz-belt`
- do not add more height to `lee-pocket-rime-rest`, `lee-pocket-rime-cap`, or `lee-pocket-crest-brow`
- do not move the tundra corridor door or travel logic
- do not spend this pass in `snow-meadow`, `thaw-skirt`, `frost-ridge`, or `meltwater-edge`
- do not add climbables, a new vertical cue, or another route branch
- do not grow notebook, route-board, station, or field-partner surfaces

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact open-fell talus hold before tundra travel comes into range|turns the treeline right side into a threshold, lee family, then one open-fell stop before tundra|keeps the treeline lee-pocket return recoverable before the tundra handoff"`
- `npm run build`
- required shared client smoke
- one seeded browser proof that shows the new open-fell hold centered in `lichen-fell` with the lee-rest behind and tundra travel still out of range

## Queue Outcome

- Close `ECO-20260416-scout-305`.
- Promote `ECO-20260416-main-305` to `READY`.
- Retarget `ECO-20260416-main-305` and `ECO-20260416-critic-305` to this handoff report.
