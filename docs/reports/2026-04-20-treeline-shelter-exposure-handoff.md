# Treeline Shelter And Exposure Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-368`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-3`

## Recommendation

Make this pass proof-first.

Treeline already has a dense, readable lower shelter-to-exposure family: `last-tree-shelter-rest` leads into `stone-shelter-basin-rest`, rises through `lee-pocket-rime-rest` / `lee-pocket-rime-cap`, crests at `lee-pocket-crest-brow`, and returns through `lee-pocket-fell-return` / `lee-pocket-lee-rest` before the open-fell island. Earlier reviews also warn that the `x 220-290` threshold is near the comfortable handheld-density ceiling.

The safest main-agent chunk is to add one focused guard in `src/test/treeline-biome.test.ts` that pins that existing physical-memory chain as Treeline's below-High-Pass shelter/exposure read. Do not add another shelf, landmark pair, route cue, High Pass endcap, or notebook copy unless the implementation discovers a concrete failing proof.

## Main Scope

- Add one test-only guard in `src/test/treeline-biome.test.ts`.
- Name the chain as lower Treeline shelter/exposure, not High Pass.
- Pin the existing platform ids and authored carrier ids that make the chain readable.
- Keep runtime, geometry, renderer, route/support behavior, station UI, save schema, world-map behavior, science copy, journal/atlas copy, and High Pass copy unchanged.

## Suggested Assertions

- `last-tree-shelter-rest.x < stone-shelter-basin-rest.x < lee-pocket-rime-rest.x < lee-pocket-crest-brow.x`.
- `stone-shelter-basin-rest` sits below `lee-pocket-upper-shelf`, while `stone-shelter-break-step` bridges between basin and shelf.
- `lee-pocket-crest-brow` sits above `lee-pocket-rime-cap`.
- `lee-pocket-fell-return` and `lee-pocket-lee-rest` read as the sheltered return/recovery path after the brow.
- `fell-island-rest` remains before `x 584`, keeping the proof below the High Pass endcap band.
- Required carriers remain authored near the chain: `last-tree-spruce`, `stone-shelter-boulder`, `stone-shelter-marmot`, `lee-pocket-rime-talus`, `rime-brow-lichen`, `fell-return-talus`, and `lee-pocket-crest-avens`.

## Verification Baseline

- `PASS npm test -- --run src/test/treeline-biome.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "turns the treeline lee pocket|last-tree shelter|Stone Shelter basin|Rime Brow|Brief Bloom|Low Fell"`

## Browser Proof

No browser proof is required if the main pass stays test/report-only. If any geometry, placement, renderer, or visual-position change lands, capture a real `256x160` proof and state export before review.
