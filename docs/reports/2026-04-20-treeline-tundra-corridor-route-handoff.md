# Treeline Tundra Corridor Route Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-377`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Lane: `lane-4`

## Recommendation

Let the existing `treeline-low-fell` route recognize the treeline-to-tundra corridor cue as optional evidence by adding `reindeer-lichen` to the `low-rest` evidence slot. This connects the lane-2 threshold prompt carrier set to an already-live route without adding a new route, route type, corridor state, station surface, support, or filing framework.

## Why This Slice

- Packet `142` chose `treeline <-> tundra` as the adjacent pair.
- Lane 1 already proved the corridor ownership/accounting seam: treeline owner uses `lichen-fell`, tundra owner uses `wind-bluff`, and threshold pacing does not mutate save visits until a real exit.
- Lane 2 already refreshed the existing `treeline-lowest-wind` prompt to `Where does shelter shrink into open ground?` with the carrier set `moss-campion`, `arctic-willow`, and `reindeer-lichen`.
- The corridor already places `reindeer-lichen` on the treeline-side blend, while `treeline-low-fell` already owns the open-fell route language and has a `low-rest` slot that currently accepts `arctic-willow`.
- Adding `reindeer-lichen` as a second accepted `low-rest` clue gives the corridor a route-facing purpose without changing the physical corridor, route order, route count, or station loop.

## Main-Agent Scope

- Edit `src/engine/field-requests.ts` only for the route definition by changing the `treeline-low-fell` `low-rest` slot from `['arctic-willow']` to `['arctic-willow', 'reindeer-lichen']`.
- Add focused coverage in `src/test/field-requests.test.ts` that a `treeline-low-fell` route at `3/4 clues` can complete `low-rest` with `reindeer-lichen` while `currentBiomeId` is `treeline`, `currentZoneId` is `lichen-fell`, and the observed entity zone is a corridor blend zone such as `center-blend`.
- Add focused coverage in `src/test/field-request-controller.test.ts` that `hand-lens` can read the corridor `reindeer-lichen` as `Notebook fit: low rest` and may retarget to it as an ordinary notebook-fit clue, while `note-tabs` keeps the physical nearest inspectable and only shows the progress chip.
- If the field-request test checks filed text, expect the canonical route identity and tail to remain `LOW FELL` / `now trace the full drop from treeline shelter into open fell.`, with `Reindeer Lichen` simply replacing `Arctic Willow` in the clue-backed list when that optional carrier was used.

## Guardrails

- Do not add a new route, route type, field-station page, support type, planner layer, prompt seed, corridor state, corridor geometry, save schema, world-map node, or map-marker behavior.
- Do not edit `src/engine/corridor.ts`, `src/engine/game.ts`, `src/engine/observation-prompts.ts`, biome geometry/content, station layout, High Pass behavior, Tundra route behavior, or lane-2 prompt copy.
- Keep the active `Brief Bloom` `fell-bloom` behavior intact: `moss-campion` remains the active bloom alternate, and `reindeer-lichen` should not become an active `LENS CLUE` winner for Low Fell.

## Baseline Verification

- `PASS npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`
- `PASS npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`

## Required Main Verification

- `npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
