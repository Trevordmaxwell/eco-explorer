# Debug Proof Harness Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Queue: ECO-20260428-scout-459
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Scope

Implement one behavior-neutral test harness improvement for debug-save proof work.

Current gap: `src/test/save-snapshots.test.ts` has useful local helpers for booting a debug snapshot, opening the world map, opening the field station, and opening the journal. Those helpers are exactly what lane agents keep needing for station/map/route proof, but they are local to one test file and not reusable.

## Recommended Implementation

Extract the reusable debug-snapshot runtime helpers into a test-only module, for example `src/test/debug-snapshot-harness.ts`.

The helper module should own functions like:

- `bootDebugSnapshot(id)`
- `bootDebugSnapshotSave(save)`
- `openWorldMapFromMenu(fakeWindow)`
- `openFieldStationFromMenu(fakeWindow)`
- `openJournal(fakeWindow)`
- any tiny menu-selection helper those functions need

Then update `src/test/save-snapshots.test.ts` to import and use the shared helpers instead of carrying local copies.

## Target Files

- `src/test/debug-snapshot-harness.ts`
- `src/test/save-snapshots.test.ts`
- `docs/architecture.md` only if a short testing-seams note helps future agents

## Guardrails

- Do not change runtime gameplay behavior.
- Do not change debug snapshot ids, titles, descriptions, save payloads, or paste commands unless the implementation discovers a direct bug.
- Do not change route ids, evidence ids, support behavior, station layout, world-map behavior, save schema, content, geometry, or Source to Shore beat structure.
- Keep this test-only. No new player-facing UI, no planner, no dashboard, no fourth Source to Shore beat.

## Suggested Verification

Run:

```bash
npm test -- --run src/test/save-snapshots.test.ts
npm run build
npm run validate:agents
```

If the implementation touches only test files and docs, the save-snapshot test is the critical check; build is a cheap guard that the extracted helper did not disturb TypeScript/project shape.

## Handoff

Promote `ECO-20260428-main-459` with the test-only helper extraction scope above.
