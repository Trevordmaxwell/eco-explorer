# Travel Framing Independence Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-1
Queue: ECO-20260428-main-458
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Summary

Extracted world-map travel label policy into `src/engine/travel-framing.ts`.

The helper now owns:

- origin labels when world-map focus moves away from the current location
- the current High Pass regional warmth override for Forest Trail summary and map-return labels
- map-return post labels
- walking approach labels from map location data

`src/engine/game.ts` now delegates those label decisions while keeping save-derived context and rendering orchestration in the coordinator.

## Preservation Notes

- Forest map-return post still resolves to `HIGH PASS MAP` when Treeline is the next field-season target.
- Forest world-map summary still resolves to `Last woods before High Pass.` in that same state.
- World-map focus away from the current location still yields `FROM <CURRENT LOCATION>`.
- Walking to Treeline still uses `HIGH PASS` as the approach label.
- No route semantics, station layout, content, science-ledger, geometry, save schema, or Source to Shore beat changes landed.

## Verification

Passed:

```bash
npm test -- --run src/test/travel-framing.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'travel|world map|High Pass'
npm run build
```

## Handoff

Promote `ECO-20260428-critic-458` to review the extraction for compact in-world orientation and no navigation-HUD drift.
