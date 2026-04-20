# First-Session Menu Focus Feedback Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-426`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-1`

## Summary

Restored the intended first-session menu-focus behavior for the fresh beach opener. When the guided starter target is already the current in-biome place, the menu no longer defaults to `world-map`; it defaults to `field-guide` instead, avoiding a false travel implication before `Shore Shelter`.

The later guided travel defaults remain intact: after `Shore Shelter`, the starter target becomes `forest` and the menu still selects `world-map`; station-return world-map menus still select `field-station`.

## Changes

- `src/engine/game.ts` now detects the non-corridor starter case where `GuidedFieldSeasonState.nextBiomeId` equals the current biome and chooses `field-guide` before falling through to the generic in-biome `world-map` default.
- `src/test/runtime-smoke.test.ts` now expects `field-guide` for the fresh beach starter menu, while keeping the post-`Shore Shelter` `world-map` and station-return `field-station` assertions.
- The sound-toggle and notebook-prompt field-guide smoke paths were adjusted for the new fresh-menu default.

## Verification

Passed:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"
npm test -- --run src/test/runtime-smoke.test.ts -t "arms sound after input"
npm test -- --run src/test/runtime-smoke.test.ts -t "shows notebook prompts in the journal and reuses them in the copied field-guide prompt"
npm run build
```

Attempted broader check:

```bash
npm test -- --run src/test/runtime-smoke.test.ts
```

The full runtime-smoke file still fails in the current dirty tree on broader map-focus / route-replay expectations and an unrelated High Pass rime-footing copy expectation. Those failures are outside this item and match the already noisy broad-smoke area noted by earlier lane-1 handoffs.

## Non-Goals Preserved

- No guided-season copy, route definitions, station layout, save schema, world-map focus ordering, field-guide export behavior, beach geometry, science content, or review-drop tooling changes.
- No new tutorial panel, HUD, or onboarding state.

## Handoff

Promote `ECO-20260420-critic-426` to review the fresh starter default, the later guided travel defaults, and the scoped verification caveat around the noisy broad runtime smoke file.
