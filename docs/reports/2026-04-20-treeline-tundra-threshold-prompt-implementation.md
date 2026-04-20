# Treeline Tundra Threshold Prompt Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-375`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-2`

## Changed

- Updated the existing `treeline-lowest-wind` observation prompt text to `Where does shelter shrink into open ground?`
- Added focused prompt-resolution coverage that proves the seed resolves from Treeline Pass `lichen-fell` during `ridge-wind` with `moss-campion`, `arctic-willow`, and `reindeer-lichen`.

## Preserved

- The prompt seed id, biome id, family, zone ids, weather profile, and required entry ids are unchanged.
- Observation-prompt resolver and scoring behavior are unchanged.
- Field requests, routes, support behavior, save behavior, station behavior, journal behavior, world-map behavior, corridor geometry, ecosystem-note metadata, and biome rosters are unchanged.
- No new biome, route objective, support behavior, species, ledger row, close-look card, sketchbook note, or corridor prompt family was added.

## Verification

```bash
npm test -- --run src/test/observation-prompts.test.ts src/test/content-quality.test.ts
npm run build
npm run validate:agents
git diff --check
```
