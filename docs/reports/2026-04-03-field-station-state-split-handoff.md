# 2026-04-03 Field Station State Split Handoff

Prepared `ECO-20260403-scout-226` against packet `096`.

## Recommendation

The first pre-chapter controller split should target the field-station state assembly seam in `src/engine/game.ts`, not the route-notice cluster.

Recommended implementation target for `ECO-20260403-main-226`:

- extract the `getFieldStationState()` composition work into a new helper such as `src/engine/field-station-state.ts`
- keep the side-effect boundary in `game.ts`

## Why This Seam First

This is the safest high-payoff split now:

- `getFieldStationState()` already acts like a coordinator, composing guided season state, route board, expedition, atlas, archive, subtitle, outing support, upgrade selection, and nursery view in one place.
- Most of that work is pure data assembly built from existing resolvers in `src/engine/field-season-board.ts` and `src/engine/nursery.ts`.
- Lane 1's near-term work will keep touching station and season pages, so reducing that concentration now lowers future change risk without redesigning gameplay.
- The route-notice cluster is still more cross-cutting: it touches guided prompts, active field-request completion, replay notices, world-map timing, and render timers. That is a better second-wave candidate after one calmer station-owned extraction lands.

## Scope For Main-226

Keep `main-226` narrow and behavior-preserving.

- Leave `syncNurseryState(save)` and the `persistSave(save)` side effect in `game.ts`.
- After that sync boundary, move the pure station-state composition into a helper module.
- The helper should accept the biome registry, save, and current UI selection snapshot.
- The helper should return the same station view payload currently consumed by rendering and `render_game_to_text()`.

Recommended moved responsibilities:

- guided season, route board, expedition, atlas, archive, and next-season continuity composition
- season-wrap derivation
- field-station subtitle derivation
- selected outing support, upgrade, and nursery project normalization for the returned state object

Recommended deferred responsibilities:

- `openFieldStation()` and `closeFieldStation()`
- `changeFieldStationSelection()`
- `getFieldStationSurface()` / `setFieldStationSurface()` / `changeFieldStationSurface()`
- `activateNurseryCard()`
- `activateExpeditionCard()`
- `toggleOutingSupport()`
- `updateFieldStationState()`
- the route/guided notice family around `showFieldNotice()` and `maybeShow*Notice()`

## Suggested Shape

One safe shape is:

- `src/engine/field-station-state.ts`
- export a small input type for the field-station UI selections
- export one resolver such as `resolveFieldStationState(...)`

That helper can reuse the existing season-board and nursery resolvers without changing their behavior.

## Verification For Main-226

Keep verification focused on unchanged station behavior:

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|opens the nursery tab and starts one teaching-bed project from the field station|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`

## Follow-On Note

If this first split lands cleanly, `scout-227` should reassess the remaining interactive field-station control cluster versus the route-notice cluster for the second extraction. My current lean is to keep the second split station-owned as well, but only after the pure state seam is out of `game.ts`.
