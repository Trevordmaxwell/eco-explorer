# Travel Framing Independence Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Queue: ECO-20260428-scout-458
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Scope

Implement one behavior-preserving travel-framing helper extraction.

Move the small world-map travel label policy out of `src/engine/game.ts` into a dedicated helper such as `src/engine/travel-framing.ts`.

The helper should own these decisions:

- origin label when the world-map focus moves away from the current location
- destination summary label, including the current High Pass forest warmth override
- map-return post label, including the current High Pass forest override
- walking approach label from world-map location data

## Target Files

- `src/engine/travel-framing.ts`
- `src/engine/game.ts`
- a focused test file, preferably `src/test/travel-framing.test.ts`
- `docs/architecture.md` if naming the helper improves future onboarding

## Required Preservation

- Existing runtime behavior stays the same:
  - Forest map-return post can still read `HIGH PASS MAP` when the next field-season target is Treeline.
  - Forest world-map summary can still read `Last woods before High Pass.` in that same state.
  - Moving map focus away from current location still yields `FROM <CURRENT LOCATION>`.
  - Walking to Treeline still uses `HIGH PASS` as the approach label.
- No new navigation HUD, route semantics, content, corridor geometry, station layout, save schema, or Source to Shore beat changes.

## Suggested Verification

Run:

```bash
npm test -- --run src/test/travel-framing.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'travel|world map|High Pass'
npm run build
```

If the runtime-smoke filter catches too much unrelated work, run the focused travel-label tests around High Pass travel warmth, origin label, and corridor cue labels.

## Handoff

Promote `ECO-20260428-main-458`.
