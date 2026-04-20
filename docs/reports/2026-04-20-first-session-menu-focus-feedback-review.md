# First-Session Menu Focus Feedback Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-426`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-1`

## Review Result

No blocker found.

The implementation is appropriately small for packet `155` lane 1. It restores the durable first-session rule: when the starter target is already the current beach opener, the menu no longer defaults to `world-map`. The later guided travel defaults remain intact because the explicit guided travel branch still runs before the new current-biome starter guard.

## Checks

- Fresh `stage: "starter"` / `nextBiomeId: "beach"` menu focus now resolves to `field-guide`, so `M` no longer implies an immediate travel/map step before `Shore Shelter`.
- Post-`Shore Shelter` starter guidance with `nextBiomeId: "forest"` still selects `world-map`.
- Station-return world-map menus still select `field-station`.
- The change stays inside `getDefaultMenuActionId()` and focused runtime-smoke expectations; it does not alter route definitions, guided copy, station layout, save schema, field-guide clipboard payloads, geometry, science content, or tooling.
- The implementation report correctly calls out the broader dirty-tree runtime-smoke failures instead of hiding them.

## Verification

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"
npm test -- --run src/test/runtime-smoke.test.ts -t "arms sound after input"
npm test -- --run src/test/runtime-smoke.test.ts -t "shows notebook prompts in the journal and reuses them in the copied field-guide prompt"
npm run build
```

## Known Noise

The full `npm test -- --run src/test/runtime-smoke.test.ts` file remains red in this dirty tree on broader map-focus / route-replay expectations and one unrelated High Pass rime-footing copy expectation. Those are outside this packet `155` lane-1 menu-focus fix and should not block this item.

## Follow-Up

Packet `155` lane 1 is clear. No new lane-1 follow-up is needed from this review.
