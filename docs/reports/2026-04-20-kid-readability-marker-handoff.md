# Kid Readability Marker Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-396`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-3`

## Scout Finding

Packet 147's lane-3 slice should stay focused on world-space readability: contrast, silhouettes, and interaction markers on important clue frames. The best small implementation target is the existing inspect marker, not a new prompt system.

Two route/clue frames are enough for this pass:

- `root-curtain` in Forest Trail's `filtered-return`, because it is a route-critical vertical clue and becomes keyboard-nearest only in a narrow lower-climb band around player `y=115..123`.
- `shore-pine` in Coastal Scrub's `shore-pine-stand`, because it is a route-critical front-half clue with an ordinary ground approach and gives a useful contrast check on the sand/scrub palette.

Baseline browser artifacts:

- `output/lane-3-scout-396-readability/root-curtain-marker.png`
- `output/lane-3-scout-396-readability/root-curtain-marker-state.json`
- `output/lane-3-scout-396-readability/shore-pine-marker.png`
- `output/lane-3-scout-396-readability/shore-pine-marker-state.json`

The marker currently uses a tan/cream sprite in `src/engine/pixel-ui.ts`. It reads, but on dense forest and bright scrub backgrounds it is softer than ideal for kid input accessibility. A tiny contrast pass can help all inspectable targets without adding labels or changing route systems.

## Recommended Main Scope

Keep `ECO-20260420-main-396` small:

- Add a one-pixel dark outline or shadow to the existing `drawInteractMarker(...)` shape in `src/engine/pixel-ui.ts`.
- Preserve the marker's compact handheld footprint and do not add text, arrows, animations, or a second marker language.
- Add or extend focused runtime smoke coverage proving `root-curtain` becomes the keyboard-nearest inspectable in the lower Root Hollow climb band before inspection.
- Re-capture ignored browser proof for `root-curtain` and `shore-pine` marker frames after the contrast change.
- Add a dated implementation report.

## Non-Goals

- No route state, route copy, station UI, journal UI, save schema, content facts, field-request targeting, support behavior, world-map behavior, or biome geometry changes.
- Do not widen inspect range or reorder target priority unless the focused proof shows the marker contrast change is insufficient.
- Do not redesign vertical cues, climb hints, or the `NOTEBOOK J` chip in this packet slice.

## Verification

Baseline scout check passed:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot|shows climb hints"
```

Recommended main verification:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot|shows climb hints"
npm run build
npm run validate:agents
git diff --check
```
