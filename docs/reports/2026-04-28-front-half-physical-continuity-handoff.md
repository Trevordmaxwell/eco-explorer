# Front-Half Physical Continuity Handoff

Date: 2026-04-28  
Queue item: `ECO-20260428-scout-475`  
Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`  
Lane: `lane-3`  
Role: `scout-agent`

## Summary

Native `256x160` route proof across Beach, Coastal Scrub, and Forest Trail found one real spatial-readability opportunity: Forest Trail's first trailhead screen after the Coastal Scrub corridor reads ecologically correct through stable/visit spawns, but it lacks a small authored physical anchor before the existing fern-hollow platforms begin at `x=174`.

Beach dune-edge and Coastal Scrub back-dune/forest-edge continuity already read cleanly. Do not reopen those spaces for this packet unless later proof contradicts the current captures.

## Browser Proof

Artifacts live under:

- `output/lane-3-scout-475-front-half-continuity-proof/summary.json`
- `output/lane-3-scout-475-front-half-continuity-proof/errors.json`
- `output/lane-3-scout-475-front-half-continuity-proof/beach-dune-shoulder-before-corridor-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/beach-dune-corridor-edge-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/coastal-back-dune-arrival-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/coastal-forest-edge-before-corridor-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/coastal-forest-corridor-edge-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/forest-trailhead-arrival-256x160.png`
- `output/lane-3-scout-475-front-half-continuity-proof/forest-trailhead-first-cover-256x160.png`

Proof notes:

- Beach at `x=95` and corridor edge `x=132` has visible dune-edge continuity through beach grass, beach pea, dune lupine, and sand verbena. The corridor prompt appears only at the intended edge.
- Coastal Scrub back-dune arrival at `x=32` has visible beach-strawberry, beach-grass, dune lupine, beach pea, and authored back-dune shelter carriers.
- Coastal Scrub forest-edge at `x=568` and corridor edge `x=608` has visible sword fern, salmonberry, nootka rose, nurse-log, deer mouse, and song sparrow continuity before `TO FOREST TRAIL`.
- Forest Trail arrival at `x=32` and first-cover proof at `x=104` has correct trailhead entries, but the physical route is mostly ground plus generated shrubs/birds until fern-hollow authored logs begin farther right.

## Main Contract

Implement only one tiny Forest Trail trailhead anchor in `src/content/biomes/forest.ts`.

Recommended local shape:

- Add one small `log-platform` in the `trailhead` zone around `x=104-128`, `y=104-108`, `w=20-26`, after the left corridor prompt but before `fern-hollow`.
- Add two or three authored carriers near that log using existing forest-edge/trailhead entries already present in the biome, such as `salmonberry`, `red-huckleberry`, `sword-fern`, `nootka-rose`, or `douglas-fir-sapling`.
- Add focused `src/test/forest-biome.test.ts` coverage that pins the platform/carrier ids and keeps the anchor in the `trailhead` band.

This should read as the first physical step from coastal forest-edge into the forest floor, not a new route beat or traversal system.

## Required Proof

If geometry or placement changes land, capture fresh native `256x160` browser proof:

- Beach dune shoulder/corridor edge remains unchanged and readable.
- Coastal Scrub back-dune arrival remains unchanged and readable.
- Coastal Scrub forest-edge/corridor edge remains unchanged and readable.
- Forest Trail first-cover frame around `x=104-128` shows the new trailhead anchor with no travel prompt in range.
- Forest Trail arrival near `x=32` still shows the intended `TO COASTAL SCRUB` corridor prompt.

Focused verification:

- `npm test -- --run src/test/forest-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/beach-biome.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- Browser/client smoke after visual changes.

## Out Of Scope

- Route-board logic, route catalog semantics, station shell, support choice, save schema, journal-only content packs, new route beat, new biome, cave framework, vertical HUD, broad physics/traversal rewrites.
- Beach dune-edge, Coastal Scrub back-dune, Coastal Scrub windbreak-swale `x=320-360`, or Coastal Scrub forest-edge changes unless fresh proof reveals a real regression.
