# Game Coordinator Controller Split Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-1
Queue: ECO-20260428-main-453
Packet: `.agents/packets/172-game-coordinator-controller-split.json`

## Summary

Extracted the field-station session selection rules out of `src/engine/game.ts` and into the existing `src/engine/field-station-session.ts` seam.

- Added `FieldStationSelections` and `FieldStationSurface` to the station session module.
- Added pure helpers for station surface cycling, route/support row cycling, nursery-card cycling, and selection id normalization.
- Kept key polling, audio cues, filing, purchases, support toggles, expedition activation, nursery actions, notices, saves, and debug export behavior in `game.ts`.
- Re-exported `FieldStationSelections` from `field-station-state.ts` so existing station-state callers remain stable.

## Preservation Notes

- No player-facing copy, layout, renderer, route state, Source to Shore state, save schema, support mechanics, or debug snapshot format changed.
- The extraction preserves the existing routes -> expedition -> nursery surface order.
- Entering the routes surface still clears support focus and normalizes the visible upgrade.
- Entering the nursery surface still clears support focus and normalizes the selected nursery project.

## Verification

Passed:

```bash
npm test -- --run src/test/field-station-session.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'field station|outing support|season capstone|High Pass|Source to Shore'
npm test -- --run src/test/save-snapshots.test.ts -t 'station|High Pass|Source to Shore'
npm run build
```

## Handoff

`ECO-20260428-critic-453` should review that the split is narrow, improves station/session ownership, and does not move side effects or gameplay behavior out of the game coordinator.
