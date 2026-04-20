# Treeline Tundra Corridor Accounting Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-374`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-1`

## Recommendation

Use lane 1's packet `142` pass as a focused systems guard for the chosen adjacent pair: `treeline <-> tundra`.

Existing runtime smoke coverage already proves the beach/scrub corridor threshold accounting and that the full adjacent chain can walk from beach to tundra. The missing lane-1 proof is a named Treeline Pass to Tundra Reach accounting check that isolates the high-country seam lane 2 already prepared with the `treeline-lowest-wind` prompt.

## Proposed Main Scope

Add one focused `runtime-smoke` case for the `treeline-tundra-corridor`.

Suggested shape:

- seed a save with `lastBiomeId = 'treeline'`, `worldStep = 2`, and at least one existing treeline visit
- enter `treeline`
- walk to the corridor door targeting `tundra`
- press `E` to enter `treeline-tundra-corridor`
- capture `worldStep`, `lastBiomeId`, `biomeVisits.treeline`, and `biomeVisits.tundra`
- cross the threshold to the tundra-owned side and assert:
  - `sceneBiomeId === 'treeline-tundra-corridor'`
  - `corridor.ownerBiomeId === 'tundra'`
  - `corridor.zoneId === 'wind-bluff'`
  - world state remains the same `worldAge` but resolves as tundra-owned weather/phenology for that owner
  - `worldStep`, `lastBiomeId`, and both visit counts have not changed
- cross back to the treeline-owned side and assert:
  - `corridor.ownerBiomeId === 'treeline'`
  - `corridor.zoneId === 'lichen-fell'`
  - `worldStep`, `lastBiomeId`, and both visit counts still have not changed
- exit fully into `tundra` at the far edge and assert:
  - `sceneBiomeId === 'tundra'`
  - `corridor === null`
  - `lastBiomeId === 'tundra'`
  - `worldStep` advanced by exactly `1`
  - `biomeVisits.tundra` advanced by exactly `1`
  - `biomeVisits.treeline` did not advance during the corridor pacing

## Guardrails

This should be test-first and probably test-only. Do not add a new corridor framework, new map node, new route objective, new save field, new prompt, or new biome geometry in lane 1.

Preserve:

- `src/engine/corridor.ts` corridor definitions and threshold ownership unless the new test reveals an actual systems bug
- `src/content/world-map.ts` corridor-door positions and map nodes
- `src/engine/observation-prompts.ts` and lane-2 threshold prompt copy
- Route v2 definitions and support behavior
- station layout, season board copy, High Pass copy, and save schema
- the existing beach/scrub corridor tests and full-chain traversal test

## Verification Target

- `npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

Baseline check while scouting:

- `npm test -- --run src/test/runtime-smoke.test.ts -t "corridor threshold|corridor traversal|full adjacent corridor chain"` passed with 6 tests.
