# Game Coordinator Controller Split Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Packet: `.agents/packets/172-game-coordinator-controller-split.json`

## Recommendation

Choose the field-station selection/navigation seam as the one narrow coordinator split.

`src/engine/game.ts` currently owns station surface selection, routes/support selection, nursery card selection, key consumption, filing/purchasing actions, notices, audio cues, and debug export. The cleanest small split is to extend the existing `src/engine/field-station-session.ts` module so it owns only the station session selection rules:

- which station surface is active: `season-routes`, `season-expedition`, or `nursery`
- how left/right cycles those surfaces
- how up/down moves between the support slot and visible upgrade rows on `SEASON -> ROUTES`
- how up/down cycles `bench`, `compost`, and `bed` on the nursery surface
- how selected upgrade/project ids normalize when the visible station inventory changes

Keep key consumption, audio, notices, route-note filing, upgrade purchasing, outing-support cycling, expedition activation, and nursery project actions in `game.ts`.

## Why This Target

- The file already has `field-station-session.ts` for station open state and arrival pulse, so this is a natural boundary instead of a new framework.
- The current local selection helpers in `game.ts` are small enough to move safely, but important enough to protect with direct tests.
- This lowers edit pressure around the station without touching route catalog behavior, Source to Shore state, save schema, rendering, or debug serialization.
- The debug-state exporter is a tempting later split, but it is much more coupled to camera, world-map, journal, station, field-request, and render-only state. It should not be the first architecture move in this wave.

## Implementation Contract

After `ECO-20260428-critic-452` clears the route-catalog gate, implement `ECO-20260428-main-453` as a behavior-preserving extraction:

- Move or re-export `FieldStationSelections` from `src/engine/field-station-state.ts` into `src/engine/field-station-session.ts`.
- Add `FieldStationSurface = 'season-routes' | 'season-expedition' | 'nursery'` in `field-station-session.ts`.
- Add pure selection helpers in `field-station-session.ts`, such as:
  - `getFieldStationSurface(selections)`
  - `setFieldStationSurface(save, selections, surface)`
  - `changeFieldStationSurface(save, selections, direction)`
  - `changeFieldStationRouteSelection(save, selections, direction)`
  - `changeNurseryCardSelection(selections, direction)`
  - `normalizeFieldStationSelections(save, selections)`
- In `game.ts`, keep the existing local `let` state if that is the smallest patch, but delegate selection calculations to the new helpers and apply the returned selection object.
- Do not move `fileReadyRouteV2FieldRequest(...)`, `purchaseFieldUpgrade(...)`, `toggleOutingSupport()`, `activateExpeditionCard()`, `activateNurseryCard()`, field notices, audio cues, or input polling in this pass.
- Do not rename station surfaces in player-facing copy or change renderer/layout behavior.

## Proof Plan

Add focused direct coverage:

- `src/test/field-station-session.test.ts`
  - left/right cycles `routes -> expedition -> nursery -> routes`
  - entering `routes` clears support focus and normalizes the selected visible upgrade
  - entering `nursery` clears support focus and normalizes the selected nursery project
  - route selection wraps between support and visible upgrades
  - nursery card selection wraps `bench -> compost -> bed`

Reuse runtime coverage:

```bash
npm test -- --run src/test/field-station-session.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'field station|outing support|season capstone|High Pass|Source to Shore'
npm test -- --run src/test/save-snapshots.test.ts -t 'station|High Pass|Source to Shore'
npm run build
```

Browser proof is not required if the implementation stays to station session selection and does not touch rendering. If a renderer or layout file changes anyway, capture one native `256x160` station routes/expedition/nursery proof.

## Gate

Do not promote `ECO-20260428-main-453` yet. The scout scope is ready, but the packet intentionally waits for route-flow consolidation and route-catalog extraction to receive clean critic review first.
