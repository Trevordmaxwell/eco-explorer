# Station Session Independence Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Queue: ECO-20260428-scout-457
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Scope

Implement one behavior-preserving station/session helper: extract the field-station primary-action decision into `src/engine/field-station-session.ts`.

The helper should classify what the current `Enter` press means from save state plus station selections, without performing the action. `src/engine/game.ts` should keep all side effects: route filing, purchases, support cycling, nursery actions, expedition card handling, notices, audio, and persistence.

## Proposed Contract

Add a pure helper such as:

```ts
resolveFieldStationPrimaryAction(save, selections)
```

Suggested action ids:

- `file-route-note`
- `toggle-outing-support`
- `purchase-upgrade`
- `file-expedition-note`
- `activate-expedition-card`
- `activate-nursery-card`

The existing priority must stay the same:

- `SEASON -> ROUTES`: ready-to-file route first, then support toggle, then selected upgrade purchase.
- `SEASON -> EXPEDITION`: ready-to-file forest expedition first, otherwise expedition card copy/travel behavior.
- `NURSERY`: nursery card activation.

## Target Files

- `src/engine/field-station-session.ts`
- `src/engine/game.ts`
- `src/test/field-station-session.test.ts`
- `docs/architecture.md` if the new helper needs a one-line architecture note

## Out Of Scope

- No player-facing copy changes.
- No route catalog, route id, evidence slot, save schema, support behavior, nursery economy, expedition flow, station layout, or debug snapshot shape changes.
- No content, science-ledger, geometry, or travel-framing work.

## Verification

Run:

```bash
npm test -- --run src/test/field-station-session.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t 'field station|outing support|season capstone|High Pass|Source to Shore'
npm test -- --run src/test/save-snapshots.test.ts -t 'station|High Pass|Source to Shore'
npm run build
```

## Handoff

Promote `ECO-20260428-main-457`.
