# Source to Shore Spatial Playthrough Implementation

Date: 2026-04-28  
Queue: `ECO-20260428-main-455`  
Packet: `.agents/packets/174-source-to-shore-spatial-playthrough-polish.json`

## Scope

Implemented the scout-approved tiny Treeline-only fix for the Source Shelter high-source prompt competition. Forest Release and Coastal Catch were re-proved but left unchanged.

## Changes

- In `src/content/biomes/treeline.ts`, moved the Source Shelter high-source memory platform `source-memory-stone-step` from x=566 to x=563.
- Moved the paired `source-memory-stone-boulder` carrier from x=570 to x=566.
- Moved the paired `source-memory-fell-ptarmigan` carrier from x=580 to x=574.
- Updated `src/test/treeline-biome.test.ts` expectations for those local coordinates.

No route state, station surface, save schema, support behavior, world-map behavior, player physics, corridor framework, traversal framework, cave system, new biome, or fourth Source to Shore beat changed.

## Browser Proof

Fresh native `256x160` proof is in `output/lane-3-main-455-source-to-shore-spatial-proof/`.

- `source-shelter-high-source-before-door-256x160.png`: Treeline `lichen-fell`, player x=577 y=90, source-memory entries nearby, no door or travel prompt.
- `source-shelter-prompt-edge-separated-256x160.png`: Treeline `lichen-fell`, player x=581 y=102, `TO TUNDRA REACH` prompt appears, but the nearest inspectable is no longer a source-memory carrier.
- `forest-release-creek-bend-256x160.png`: Forest `creek-bend`, player x=606 y=100, release entries nearby, no door or travel prompt.
- `coastal-catch-forest-edge-256x160.png`: Coastal Scrub `forest-edge`, player x=548 y=102, catch entries nearby, no door or travel prompt.
- `summary.json` records all four proof states with empty failures; `errors.json` is empty.
- `output/lane-3-main-455-webgame-smoke/shot-0.png` provides the web-game client smoke capture.

## Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/forest-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- `node $WEB_GAME_CLIENT --url http://127.0.0.1:5173/ --screenshot-dir output/lane-3-main-455-webgame-smoke --iterations 1 --pause-ms 100 --actions-json '{"steps":[{"buttons":["enter"],"frames":4},{"buttons":[],"frames":8}]}'`

## Handoff

`ECO-20260428-critic-455` is ready to review the Treeline-only nudge, the four browser proof frames, and the focused verification above. If clean, packet `174` can be marked spatially clear for the final full-arc signoff chain.
