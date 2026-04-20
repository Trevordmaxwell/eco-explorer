# First-Session Menu Focus Feedback Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-426`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-1`

## Finding

Packet `155` asks lane 1 to absorb high-confidence systems/usability feedback without architecture churn. The clearest lane-1 fix is a first-session menu-focus regression around the fresh beach opener.

The durable product rule now says starter-stage menu focus should only default to `world-map` when the guided next biome differs from the current biome, so fresh saves do not imply an inland hop before `Shore Shelter`. The current `getDefaultMenuActionId()` has the guided guard, but then immediately falls through to the generic in-biome `world-map` default. The runtime smoke test also still expects `world-map` on the fresh `nextBiomeId: "beach"` starter state, which protects the stale behavior.

## Main Scope

Recommended files:

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

Recommended implementation:

- In `getDefaultMenuActionId()`, preserve the guided `world-map` default for starter states only when `guidedFieldSeason.nextBiomeId !== getContextBiomeId()`.
- Prevent that same fresh/current-biome starter state from falling through into the generic in-biome `world-map` default.
- Keep later travel and support defaults unchanged: after `Shore Shelter`, the starter state with `nextBiomeId: "forest"` should still default to `world-map`; station-return and season-close-return world-map menus should still default to `field-station`.
- Refresh the first-session runtime smoke expectations so the fresh beach opener proves the menu does not select `world-map`, while the post-`Shore Shelter` and station-return assertions still prove the guided travel defaults.

## Non-Goals

- Do not change guided-season copy, route definitions, station layout, save shape, world-map focus ordering, field-guide export behavior, beach geometry, science content, or review-drop tooling.
- Do not add a tutorial panel, new HUD, or broader onboarding state.
- Do not touch lane-2/3/4 packet `155` feedback surfaces.

## Baseline Check

Current focused smoke passes while preserving the stale fresh-menu expectation:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "surfaces the first field-season guidance from starter note to next habitat pointer"
```

## Acceptance For Main

- Fresh-save starter guidance still reports `stage: "starter"` and `nextBiomeId: "beach"`.
- Opening the menu during that fresh beach opener no longer selects `world-map`.
- After `beach-shore-shelter` is completed, the same first-session flow still selects `world-map`, opens the map, focuses `Forest Trail`, and shows `FROM SUNNY BEACH`.
- Station-return from the world map still selects `field-station` and opens the station.
- Focused runtime smoke, `npm run build`, `npm run validate:agents`, and `git diff --check` pass.
