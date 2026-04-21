# Treeline Tundra Corridor Physical Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-376`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-3`

## Recommendation

Give the chosen `treeline <-> tundra` adjacent corridor one small physical threshold beat, not a broader corridor rewrite. Lane 1 already proved threshold accounting, lane 2 already refreshed the shelter-to-open-ground prompt, and lane 4 already lets `Low Fell` use corridor `reindeer-lichen` as optional evidence. The missing lane-3 piece is a visible, recoverable platform read that makes the same seam feel playable in the world.

## Main Scope

- Edit only the `TREELINE_TO_TUNDRA_CORRIDOR_ID` spec in `src/engine/corridor.ts`.
- Add one tiny two-platform threshold shelf pair around the ownership threshold:
  - `open-fell-threshold-lip`: `granite-platform`, `x: 108`, `y: 102`, `w: 16`, `h: 4`
  - `open-fell-snow-rest`: `ice-platform`, `x: 136`, `y: 99`, `w: 24`, `h: 4`
- Keep the existing corridor roster and placement order unchanged. The current carrier set already does the science work: `reindeer-lichen` near the treeline side, `mountain-avens` near the threshold, and `purple-saxifrage` / `woolly-lousewort` toward the tundra side.
- Do not add another route, route objective, prompt, station surface, save field, map node, support behavior, corridor id, or chain-wide travel rewrite.

## Acceptance

- `src/test/corridor.test.ts` should assert the treeline-tundra corridor has exactly the new threshold shelf pair, with the first platform left of `thresholdX`, the second platform right of `thresholdX`, and the pair ending before `x 168`.
- The same corridor test should assert nearby visible carriers include `reindeer-lichen`, `mountain-avens`, and `purple-saxifrage`, while `cottongrass` remains outside the immediate threshold shelf read.
- Add or extend a focused `runtime-smoke` case proving the player can enter `treeline-tundra-corridor`, reach the threshold shelf/nearby carrier window, and still fully exit into `tundra` cleanly.
- Because geometry changes, capture a real `256x160` browser proof and state/error export under ignored `output/`, ideally `output/lane-3-main-376-browser/`.

## Preserve

- No `src/engine/game.ts`, `src/engine/field-requests.ts`, `src/engine/observation-prompts.ts`, `src/content/world-map.ts`, station, save schema, High Pass behavior, Tundra route behavior, lane-2 prompt copy, or lane-4 route logic changes.
- Do not move existing corridor entity placements unless the new proof cannot pass without it.
- Do not add a third platform, new climbable, vertical cue, new visual language, or extra corridor width.

## Baseline Verification

- `PASS npm test -- --run src/test/corridor.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"`
- `PASS npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`

## Main Verification

- `npm test -- --run src/test/corridor.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold|open-fell"`
- `npm run build`
- browser proof under `output/lane-3-main-376-browser/`
- `npm run validate:agents`
- `git diff --check`
