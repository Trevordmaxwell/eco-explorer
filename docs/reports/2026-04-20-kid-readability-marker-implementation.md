# Kid Readability Marker Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-396`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-3`

## Result

Implemented the scoped inspect-marker contrast pass. The existing marker keeps its compact `9x9` footprint and gains a dark in-footprint outline behind the tan/cream pixels, making the same marker read more clearly over both dense forest and bright sand/scrub backgrounds.

Runtime coverage now also proves the Root Hollow `root-curtain` clue can become the keyboard-nearest inspectable in the lower climb band before inspection. The test clears the previous inspect bubble first so the in-world target projection can be evaluated honestly.

## Changed Files

- `src/engine/pixel-ui.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-20-kid-readability-marker-implementation.md`

## Browser Proof

Ignored artifacts:

- `output/lane-3-main-396-readability/root-curtain-marker.png`
- `output/lane-3-main-396-readability/root-curtain-marker-state.json`
- `output/lane-3-main-396-readability/shore-pine-marker.png`
- `output/lane-3-main-396-readability/shore-pine-marker-state.json`

The state snapshots confirm the marker frames targeted:

- `root-curtain` in Forest Trail `filtered-return`, with the player climbing at the lower Root Hollow band.
- `shore-pine` in Coastal Scrub `shore-pine-stand`, with the player on the ground approach.

## Scope Notes

- No route state, route copy, station UI, journal UI, save schema, content facts, field-request targeting, support behavior, world-map behavior, inspect range, target priority, or biome geometry changed.
- No new marker text, arrows, animations, or second marker language were added.
- Vertical cues, climb hints, and the `NOTEBOOK J` chip were left unchanged.

## Verification

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot|shows climb hints"
npm run build
npm run validate:agents
git diff --check
```
