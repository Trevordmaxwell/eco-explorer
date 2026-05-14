# Station Session Independence Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-1
Queue: ECO-20260428-main-457
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Summary

Implemented the primary-action intent helper scoped by `ECO-20260428-scout-457`.

- Added `resolveFieldStationPrimaryAction()` to `src/engine/field-station-session.ts`.
- Kept the helper pure: it only decides what the current station `Enter` press means.
- Kept all side effects in `src/engine/game.ts`: route filing, route-note display, support cycling, upgrade purchases, expedition card handling, nursery actions, notices, audio, persistence, and debug behavior.
- Added direct tests for route-page action priority, expedition filing scope, and nursery activation routing.
- Updated `docs/architecture.md` to name primary-action intent as part of the station-session seam.

## Preservation Notes

- `SEASON -> ROUTES` still prioritizes ready-to-file note filing before support toggles or upgrade purchases.
- `SEASON -> EXPEDITION` still files only ready forest-expedition notes before falling back to expedition card handling.
- `NURSERY` still activates the selected nursery card.
- No player-facing copy, route catalog, route id, evidence slot, save schema, support behavior, nursery economy, expedition flow, station layout, content, geometry, or debug snapshot shape changed.

## Verification

Passed:

```bash
npm test -- --run src/test/field-station-session.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'field station|outing support|season capstone|High Pass|Source to Shore'
npm test -- --run src/test/save-snapshots.test.ts -t 'station|High Pass|Source to Shore'
npm run build
```

## Handoff

Promote `ECO-20260428-critic-457` to review behavior preservation and seam ownership.
