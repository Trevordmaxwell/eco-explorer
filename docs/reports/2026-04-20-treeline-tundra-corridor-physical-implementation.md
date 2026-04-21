# Treeline Tundra Corridor Physical Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-376`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-3`

## Result

Implemented the lane-3 physical corridor proof for the chosen `treeline <-> tundra` adjacent pair. The `Open Fell` corridor now has one tiny recoverable two-platform threshold shelf around the ownership boundary:

- `open-fell-threshold-lip`: `granite-platform`, `x: 108`, `y: 102`, `w: 16`, `h: 4`
- `open-fell-snow-rest`: `ice-platform`, `x: 136`, `y: 99`, `w: 24`, `h: 4`

The existing corridor roster and placement order stayed unchanged. `reindeer-lichen`, `mountain-avens`, and `purple-saxifrage` remain the immediate carrier read around the shelf, while `cottongrass` stays later in the corridor.

## Tests Added

- `src/test/corridor.test.ts` now asserts the treeline-tundra corridor has exactly the two new threshold platforms, with the lip left of `thresholdX`, the snow rest right of `thresholdX`, the pair ending before `x 168`, and the immediate carrier set excluding `cottongrass`.
- `src/test/runtime-smoke.test.ts` now proves the player can enter `treeline-tundra-corridor`, reach the `wind-bluff` threshold shelf window near the alpine carriers, avoid accidental travel targets, and still exit cleanly into `tundra`.

## Browser Proof

Captured ignored browser artifacts under `output/lane-3-main-376-browser/`.

- `client/shot-0.png` and `client/state-0.json`: required web-game client smoke on the production preview.
- `open-fell-threshold-256x160.png`: direct 256x160 canvas capture of the new Open Fell threshold shelf window.
- `state-open-fell-threshold.json`: confirms `sceneBiomeId: treeline-tundra-corridor`, `ownerBiomeId: tundra`, `zoneId: wind-bluff`, player `x: 133`, `y: 89`, and nearby carriers including `reindeer-lichen`, `mountain-avens`, and `purple-saxifrage`.
- `state-tundra-exit.json`: confirms clean exit into `tundra`.
- `errors.json`: empty.

## Verification

- `PASS npm test -- --run src/test/corridor.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "open-fell|treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"`
- `PASS npm run build`
- `PASS web-game client smoke under output/lane-3-main-376-browser/client/`
- `PASS direct Playwright threshold capture under output/lane-3-main-376-browser/`

## Preserve Check

No changes were made to `src/engine/game.ts`, `src/engine/field-requests.ts`, `src/engine/observation-prompts.ts`, `src/content/world-map.ts`, station surfaces, save schema, High Pass behavior, Tundra route behavior, lane-2 prompt copy, lane-4 route logic, corridor ids, corridor width, climbables, vertical cues, or new UI.
