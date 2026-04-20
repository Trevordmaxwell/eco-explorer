# Treeline Tundra Threshold Prompt Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-375`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-2`

## Recommendation

Use the existing Treeline Pass prompt seed `treeline-lowest-wind` as the single adjacent-corridor prototype for lane 2.

Target file:

- `src/engine/observation-prompts.ts`

Target seed:

- `id`: `treeline-lowest-wind`
- `biomeId`: `treeline`
- `family`: `shelter`
- `zoneIds`: `['lichen-fell']`
- `weatherProfiles`: `['ridge-wind']`
- `requiredEntryIds`: `['moss-campion', 'arctic-willow', 'reindeer-lichen']`

Recommended exact prompt text:

```text
Where does shelter shrink into open ground?
```

## Why This Seam

The live continuity docs already mark `treeline <-> tundra` as a strong adjacent pair because low shrubs, open ground, colder stone, first snow traces, and shared alpine species make the threshold legible without extra UI. Project memory also says `forest <-> treeline` should stay carrier-first and mostly silent, while `treeline <-> tundra` is the safer seam for one small prompt-linked shelter cue once open-ground carriers are visible.

This prompt stays inside that rule. It teaches the gradient from sheltered low growth toward exposed open ground without naming a new transition biome, adding another route, or changing threshold ownership.

## Main-Agent Scope

Change only the authored prompt copy for `treeline-lowest-wind`.

Preserve:

- the seed id, biome id, family, zone, weather profile, and required entry ids
- observation-prompt resolver and scoring behavior
- all field-request, route, support, save, station, journal, world-map, corridor, and geometry behavior
- existing ecosystem-note metadata and all biome content rosters

Add focused coverage in `src/test/observation-prompts.test.ts` that resolves the seed from Treeline Pass `lichen-fell` with `moss-campion`, `arctic-willow`, and `reindeer-lichen`, then asserts the exact prompt text and evidence key.

## Do Not Include

- no edits to `src/engine/corridor.ts`
- no edits to `src/content/world-map.ts`
- no edits to `src/engine/game.ts`
- no new biome id, corridor state, map node, route objective, support behavior, or save shape
- no new species, ledger rows, close-look cards, sketchbook notes, or ecosystem-note family
- no broad rewrite of the other corridor prompts

## Verification

Expected checks after implementation:

```bash
npm test -- --run src/test/observation-prompts.test.ts src/test/content-quality.test.ts
npm run build
npm run validate:agents
git diff --check
```

If broader runtime tests are run, treat unrelated map-focus or route-state noise from other active lanes as coordination risk, not as license to widen this lane-2 prompt pass.
