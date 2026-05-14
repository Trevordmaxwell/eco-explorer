# Source To Shore Spatial Playthrough Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-3
Queue: `ECO-20260428-scout-455`
Packet: `.agents/packets/174-source-to-shore-spatial-playthrough-polish.json`

## Scout Read

The existing three Source to Shore spaces mostly hold as physical places. Forest Release and Coastal Catch are readable at the native handheld size and do not need geometry changes from this scout pass. Source Shelter has one real local issue at the right edge of its high-source memory pocket: the player can reach the ptarmigan carrier while also entering the `TO TUNDRA REACH` corridor prompt range.

This is not a reason to add a fourth beat, new traversal system, new cave/biome, or broader physics pass. It is a tiny Treeline placement/prompt-competition issue for the later main item, after the station-container gate clears.

## Browser Proof

Proof used the live Vite app at `http://127.0.0.1:5173/`, `window.get_debug_save_snapshots()`, and the filed Source to Shore debug save. Each scenario was walked from the biome start to the representative pocket, then captured from the live canvas at `256x160`.

Artifacts are ignored local proof under:

- `output/lane-3-scout-455-source-to-shore-spatial-proof/summary.json`
- `output/lane-3-scout-455-source-to-shore-spatial-proof/errors.json`

Representative clean frames:

- Source Shelter / High Source: `treeline`, `lichen-fell`, player `x=561`, `y=103`, camera `x=384`, nearby `reindeer-lichen`, `frost-heave-boulder`, and `rock-ptarmigan`, no nearby door or travel target.
  - Screenshot: `output/lane-3-scout-455-source-to-shore-spatial-proof/source-shelter-high-source-256x160.png`
  - State: `output/lane-3-scout-455-source-to-shore-spatial-proof/source-shelter-high-source-state.json`
- Forest Release: `forest`, `creek-bend`, player `x=609`, `y=116`, camera `x=519`, nearby `seep-moss-mat`, `root-curtain`, and `banana-slug`, no nearby door or travel target.
  - Screenshot: `output/lane-3-scout-455-source-to-shore-spatial-proof/forest-release-creek-bend-256x160.png`
  - State: `output/lane-3-scout-455-source-to-shore-spatial-proof/forest-release-creek-bend-state.json`
- Coastal Catch: `coastal-scrub`, `forest-edge`, player `x=563`, `y=103`, camera `x=384`, nearby `salmonberry`, `sword-fern`, and `song-sparrow`, no nearby door or travel target.
  - Screenshot: `output/lane-3-scout-455-source-to-shore-spatial-proof/coastal-catch-forest-edge-256x160.png`
  - State: `output/lane-3-scout-455-source-to-shore-spatial-proof/coastal-catch-forest-edge-state.json`

Issue proof:

- Source Shelter right edge: `treeline`, `lichen-fell`, player `x=581`, `y=99`, nearest `authored-source-memory-fell-ptarmigan-rock-ptarmigan`, but `nearbyDoor.inRange` is `true` and `nearbyTravelTarget.label` is `TO TUNDRA REACH`.
  - Clean screenshot: `output/lane-3-scout-455-source-to-shore-spatial-proof/source-shelter-door-compete-clean-256x160.png`
  - State: `output/lane-3-scout-455-source-to-shore-spatial-proof/source-shelter-door-compete-clean-state.json`

## Implementation Contract

Wait until `ECO-20260428-critic-450` approves the dedicated Source to Shore station container before promoting or implementing `ECO-20260428-main-455`.

Recommended scope for main:

- Touch `src/content/biomes/treeline.ts` only unless fresh proof shows the problem is not local.
- Keep the fix to a tiny Source Shelter high-source placement adjustment, likely nudging the `source-memory-stone-step`, `source-memory-stone-boulder`, and/or `source-memory-fell-ptarmigan` read left enough that the memory carrier can be inspected before the Tundra corridor prompt appears.
- Keep Forest Release and Coastal Catch unchanged; they already pass the proof and focused tests.
- Do not move route definitions, station surfaces, save state, player physics, corridor framework, world-map behavior, or route support behavior.
- Do not add another Source to Shore beat or any new cave, biome, traversal framework, or physics pass.

## Verification

Passed:

```bash
npm test -- --run src/test/treeline-biome.test.ts src/test/forest-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "source memory|keeps filed Source to Shore memory pockets readable"
```

Browser proof:

- All captured screenshots are `256x160` with `40960` opaque pixels.
- `output/lane-3-scout-455-source-to-shore-spatial-proof/errors.json` is an empty array.
- Screenshots were visually inspected at native resolution.
