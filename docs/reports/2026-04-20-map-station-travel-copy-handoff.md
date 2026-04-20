# Map Station Travel Copy Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-379`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-2`

## Recommendation

Use packet `143` lane 2 for a two-line copy clarification that separates Treeline Pass as a place from `High Pass` as the next route title.

Current risk:

- `src/content/world-map.ts` describes Treeline Pass as `High pass between forest and tundra.`
- `src/engine/field-requests.ts` describes the `treeline-high-pass` route as logging clues `into High Pass.`

Both are technically understandable, but together they make map and route language feel a little circular after the filed High Pass arc. The fix should be tiny, not a tutorial.

Recommended exact copy:

```text
Wind-bent edge between forest and tundra.
Start in Treeline Pass; log stone-lift, lee-watch, rime-mark, and talus-hold.
```

## Main-Agent Scope

Update only:

- `src/content/world-map.ts`
  - `treeline.summary`
- `src/engine/field-requests.ts`
  - `treeline-high-pass.summary`
- focused exact-copy tests in `src/test/world-map.test.ts` and `src/test/field-requests.test.ts`

Preserve:

- `Treeline Pass` location label
- `HIGH PASS MAP` map-return label
- `HIGH PASS` approach label
- `High Pass` route title and route id
- High Pass filed / ready / active state behavior
- route marker behavior, support behavior, save behavior, station state, world-map focus, world-map walking, corridor geometry, and field-request progression

## Do Not Include

- no edits to `src/engine/world-map.ts`
- no edits to `src/engine/world-map-render.ts`
- no edits to `src/engine/game.ts`
- no edits to `src/engine/field-season-board.ts`
- no edits to `src/engine/high-pass-chapter-state.ts`
- no map-return-label or approach-label rewrite
- no new map tutorial paragraph, HUD, station panel, route objective, route marker behavior, save shape, or corridor behavior

## Verification

Expected checks after implementation:

```bash
npm test -- --run src/test/world-map.test.ts src/test/field-requests.test.ts src/test/content-quality.test.ts
npm run build
npm run validate:agents
git diff --check
```

If broad runtime smoke is run and finds unrelated route-marker or station-focus noise, leave it for lane 1 or lane 4 instead of widening this copy pass.
