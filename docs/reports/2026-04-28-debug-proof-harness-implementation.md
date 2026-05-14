# Debug Proof Harness Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-1
Queue: ECO-20260428-main-459
Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`

## Summary

Extracted the reusable debug-snapshot runtime helpers from `src/test/save-snapshots.test.ts` into `src/test/debug-snapshot-harness.ts`.

The new test-only harness now owns:

- booting a plain debug snapshot save into the fake runtime
- booting a named debug snapshot id
- opening the world map through the menu
- opening the field station through the menu
- opening the journal

`src/test/save-snapshots.test.ts` now imports those helpers instead of carrying local copies. A short architecture note points future agents to the helper.

## Preservation Notes

- Debug snapshot ids, titles, descriptions, save JSON, localStorage values, and paste commands are unchanged.
- Runtime gameplay code is unchanged.
- No route id, evidence id, station layout, world-map behavior, save schema, content, geometry, or Source to Shore beat changed.

## Verification

Passed:

```bash
npm test -- --run src/test/save-snapshots.test.ts
npm run build
```

Also checked:

```bash
git diff --check -- src/test/debug-snapshot-harness.ts src/test/save-snapshots.test.ts docs/architecture.md
```

## Handoff

Promote `ECO-20260428-critic-459` to review the test-only extraction and decide whether packet `176` can close.
