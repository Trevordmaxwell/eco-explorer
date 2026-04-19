# 2026-04-19 Earlier-Band Tundra Remembered-Place Review

Reviewed `ECO-20260419-main-317` against packet `128`, the focused runtime proof, the seeded browser capture, and the full Tundra biome test file.

## Findings

### Blocker: stale thaw-channel proof still fails the full Tundra test file

- `src/test/tundra-biome.test.ts` still expects the old earlier thaw-channel landmark position at `x 362, y 104`.
- `main-317` intentionally moved the authored `thaw-skirt-channel` landmark to `x 398, y 100` so it belongs to the new remembered bench instead of the old stretched shelf.
- The narrow `-t` slice used during implementation passed, but the full file does not:
  - `npm test -- --run src/test/tundra-biome.test.ts`

This is a real lane-3 blocker because the live geometry and the durable authored proof no longer agree.

## Clean Reads

- The seeded browser proof in `output/main-317-browser/thaw-bench.png` does show a calmer earlier-band place before the far-right wet pocket.
- `output/main-317-browser/errors.json` is empty.
- The runtime seam still releases into `frost-ridge`, and the far-right `meltwater-bank-rest` pocket remains untouched.

## Watch Item

- The seeded proof still resolves the habitat chip as `FROST RIDGE` while the player stands in the new bench band. That is not a blocker for this pass, but later tundra readability work should avoid spending more geometry here unless the thaw bench itself starts feeling mislabeled in live play.

## Decision

- Do not clear lane 3 yet.
- Land one tiny follow-up that updates the stale authored thaw-channel expectation and reruns the exact tundra proof file before closing the wave.
