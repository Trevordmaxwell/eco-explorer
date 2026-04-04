# 2026-04-04 Docs Truth And Home-Place Implementation

Implemented `ECO-20260404-main-252` against packet `103`.

## What Changed

Updated the public repo-facing docs so they describe the live game and current naming more precisely:

- [README.md](/Users/trevormaxwell/Desktop/game/README.md)
  - changed `field menu` to plain `menu`
  - tightened the field-station bullet to the live shell terms `SEASON -> ROUTES`, `SEASON -> EXPEDITION`, and `NURSERY`
  - narrowed the nursery wording to the real single teaching-bed loop instead of the broader `teaching garden` phrasing
- [docs/architecture.md](/Users/trevormaxwell/Desktop/game/docs/architecture.md)
  - added the newer [field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts) helper to the request stack
  - added the newer [field-station-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-state.ts) helper to the station stack
  - kept [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts) framed as the authored request-definition layer instead of the full composed request-state owner
  - updated the field-station section to the live `SEASON -> ROUTES`, `SEASON -> EXPEDITION`, and `NURSERY` shell naming
- [docs/content-authoring.md](/Users/trevormaxwell/Desktop/game/docs/content-authoring.md)
  - expanded the world-map location checklist to include the live `mapReturnLabel`, `approachLabel`, `previewColor`, optional `corridorDoors`, and optional `mapReturnPost` fields
  - added explicit `mapReturnPost` guidance for corridor-enabled biomes and interior map returns

## Why This Fits The Handoff

The pass stays on repo truth, not tone polish. It fixes the stale public labels and helper ownership drift that would otherwise mislead future contributors, while leaving runtime code, commands, and shell behavior unchanged.

## Verification

- manually rechecked the edited docs against [package.json](/Users/trevormaxwell/Desktop/game/package.json), [src/engine/field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts), [src/engine/field-station-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-state.ts), and [src/content/world-map.ts](/Users/trevormaxwell/Desktop/game/src/content/world-map.ts)
- `npm run validate:agents`
