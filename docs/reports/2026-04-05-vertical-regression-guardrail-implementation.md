# 2026-04-05 Vertical Regression Guardrail Implementation

Implemented `ECO-20260405-main-276` in lane 3 against packet `114`, the lane brief, the main-agent role guide, and the treeline regression handoff.

## What Changed

The guardrail stays inside the existing treeline loop and does not reopen geometry growth.

- Added a small authored-platform helper in `src/test/runtime-smoke.test.ts` that resolves:
  - `lee-pocket-fell-return`
  - `lee-pocket-lee-rest`
- Derived one `treelineShelteredReturnBand` from those authored platforms instead of relying on the previous generic right-hand `x/y` settle box.
- Updated the existing treeline loop smoke path so it now proves this sequence:
  1. the player reaches the crest-brow portion of the loop
  2. the player stabilizes inside the authored sheltered return family
  3. only after that does the route continue out into open `lichen-fell`

## Why This Helps

The previous smoke assertion could still pass if a future treeline edit flattened or partially skipped the intended `fell-return -> lee-rest` hand-back, as long as the player eventually settled somewhere in a broad right-side band.

The new guardrail is still tolerant of real motion, but it is tied to the authored recovery family itself:

- it derives horizontal limits from the actual return platforms
- it translates platform tops into the player-state coordinate space the smoke test reads
- it keeps the proof deterministic without depending on the currently broken stepped browser seam

## Scope Check

This pass intentionally did not:

- change `src/content/biomes/treeline.ts`
- add a new platform, cue, or landmark
- add a generalized traversal framework
- depend on fresh browser stepping

## Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`

The broader shared-tree build remains known to be unstable from unrelated nursery work in other lanes, so the core deliverable for this pass stays the deterministic treeline smoke proof.
