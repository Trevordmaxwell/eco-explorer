# Forest Canopy/Cave Loop Handoff

Date: 2026-04-28  
Queue item: `ECO-20260428-scout-476`  
Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`  
Lane: `lane-3`  
Role: `scout-agent`

## Summary

The Forest Trail vertical family is already dense and recoverable: the lower `root-hollow -> seep-pocket -> stone-basin -> filtered-return` cave family has a real recovery trunk, and the upper old-growth side already has crown-rest, bark-window, branch-nursery, and canopy-crook destinations.

Do not add another cave chamber, another canopy tier, a new climb spine, or route/station semantics. The only real follow-up worth scoping is proof-first: re-prove the current under-basin and upper-return nook at native `256x160`, then make at most one tiny Forest-local geometry or carrier adjustment if the fresh settled frame proves the current upper return reads as exit infrastructure rather than a recoverable nook.

## Existing Evidence

Reviewed current forest geometry and older proof artifacts:

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- `output/main-150-browser/upper-return.png`
- `output/main-194-browser/cave-mouth-waypoint.png`
- `output/main-215-browser/under-basin-rest.png`
- `output/main-215-browser/recovery-trunk.png`
- `output/main-214-browser/nursery-pocket.png`
- `output/main-214-browser/return-snag.png`

Findings:

- The canopy side is not the weak point. It already has `old-growth-crown-rest`, `old-growth-crown-window`, `old-growth-branch-nursery`, `canopy-inner-rest-crook`, and a catchable `old-growth-inner-bark-snag` return. Prior reviews explicitly warned against spending another upper-canopy shelf there.
- The lower cave side is also broadly solved. `root-hollow-under-basin-rest`, `filtered-return-mouth-sill`, `root-hollow-cave-trunk`, and `stone-basin-return-light` already make the cave recoverable.
- The real proof gap is the under-basin/cave-return settled read. The earlier `under-basin-rest` state caught the player with downward velocity, so the next pass should capture a calm settled frame before deciding whether any placement change is justified.

## Main Contract

Treat `ECO-20260428-main-476` as a proof-first Forest Trail upper-return nook pass.

Expected editable files only if a real issue appears:

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

Read-only engine context:

- `src/engine/game.ts`
- `src/engine/climb-navigation.ts`
- `src/engine/vertical-cues.ts`

Implementation ceiling:

- First capture fresh proof under `output/lane-3-main-476-forest-canopy-cave-loop-proof/`.
- If the existing `root-hollow-under-basin-rest`, `filtered-return-mouth-sill`, `root-hollow-return-nook`, `root-hollow-high-ledge`, and `root-hollow-cave-trunk` already read as a settled recoverable nook, close the main item as proof-only with no runtime geometry change.
- If the proof exposes a real readability gap, touch only `forest.ts` and focused tests. Prefer a tiny reposition or width tweak to an existing cave-mouth/upper-return platform or one existing-entry carrier placement in the `x=372-424`, `y=76-108` band.
- Do not add a new platform family, climbable, cave chamber, canopy shelf, route beat, field-station surface, route catalog rule, vertical HUD, traversal framework, or physics pass.

## Required Proof Path

Use:

- `output/lane-3-main-476-forest-canopy-cave-loop-proof/summary.json`
- `output/lane-3-main-476-forest-canopy-cave-loop-proof/errors.json`
- `output/lane-3-main-476-forest-canopy-cave-loop-proof/under-basin-settled-256x160.png`
- `output/lane-3-main-476-forest-canopy-cave-loop-proof/upper-return-window-256x160.png`
- `output/lane-3-main-476-forest-canopy-cave-loop-proof/branch-nursery-context-256x160.png` if the upper old-growth comparison helps prove the canopy side should stay untouched

The proof should show:

- under-basin rest after the player has settled, not while still falling
- upper-return window with the cave trunk, brighter return side, and nearby cave-mouth/rest ledges readable together
- no travel prompt competition
- empty browser error capture

Focused verification:

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "root-hollow|under-basin|cave-mouth|upper-return|branch-nursery|crown-rest"`
- `npm run build` if runtime or content files change
- fresh native `256x160` browser proof if any visual geometry or placement change lands

## Out Of Scope

- Station shell, route-board logic, route catalog semantics, Source to Shore route state, journal-only content packs, close-look/sketchbook additions, content-roster expansion, new biomes, new cave systems, new climbables, vertical HUDs, and physics/traversal rewrites.
