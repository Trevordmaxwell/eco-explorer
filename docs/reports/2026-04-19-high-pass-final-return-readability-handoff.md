# 2026-04-19 High Pass Final-Return Readability Handoff

Prepared `ECO-20260419-scout-322` for lane 3.

## Scout Read

The final High Pass/talus-hold moment is already spatially present. It should not become another pocket.

The current physical route reads as:

1. `Stone Shelter` around `stone-shelter-basin-rest` / `stone-shelter-break-step`
2. `Rime Brow` around `lee-pocket-rime-cap` / `lee-pocket-crest-brow`
3. open-fell finish around `fell-island-step` / `fell-island-rest`

The `talus-hold` route clue is carried by `talus-cushion-pocket` at `x 572, y 102`, on the existing `fell-island-rest` band. Focused runtime and biome checks still pass for that final clue.

## Risk

The final clue is close to the right-side Treeline -> Tundra exit, but the arrival/readiness state is not currently protected as a return-readability moment. The route can become `Ready To File` at the talus hold while the map-return post remains back at `x 404` and the Tundra door remains further right at `x 608`.

That is a readability risk, not a destination-density gap.

## Recommended Main Scope

Use a proof-first implementation:

- add or extend focused runtime coverage for the final High Pass talus-hold filing moment
- assert the player lands in the existing open-fell island band, not a new pocket
- assert the final inspect flips `treeline-high-pass` to `Ready To File`
- assert return/exit guidance is legible from that state through the existing notice, hint, or nearby travel surface

Only if that proof shows the physical release is too abrupt, make the smallest geometry tune:

- extend the existing `fell-island-rest` a few pixels to the right, capped around `w 22-24`
- do not add another authored platform unless a tiny return chip is strictly necessary
- do not add new carriers, new inspectables, or another route clue
- do not move corridor doors, map-return posts, or travel logic

## Non-Goals

- no new High Pass pocket
- no new climb family
- no right-side lift or alpine extension
- no corridor-door or world-map rewrite
- no new station, journal, or route shell

## Verification Targets

- focused `treeline-biome` proof for the existing final island, if geometry changes
- focused `runtime-smoke` proof for `talus-hold -> Ready To File -> return/exit guidance`
- `npm run build` for any runtime/code change

## Scout Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket as the High Pass talus-hold clue on the live open-fell pocket|keeps non-hand-lens supports on the nearer open-fell inspectable"`
- `npm test -- --run src/test/treeline-biome.test.ts -t "adds one compact Rime Brow overlook between Stone Shelter and the open-fell hold|keeps the new talus carrier visible through the lee-pocket and open-fell lane"`
