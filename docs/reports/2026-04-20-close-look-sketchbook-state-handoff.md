# Close-Look Sketchbook State Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-390`
Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
Lane: `lane-1`

## Scout Verdict

No lane-1 implementation is recommended for packet `146`.

Lane 2 already completed the selected close-look carrier work for `root-curtain` and `shore-pine`. The lane-1 contract only asks to harden close-look or sketchbook opening/closing state if existing tests reveal regression risk. The focused proofs are already green, and the current runtime state seams are explicit enough.

## Findings

- `openCloseLookFromBubble()` moves a supported inspect bubble into `close-look` mode, clears the bubble, and quiets the field partner.
- `closeCloseLook()` clears the close-look payload and returns to `playing`.
- `clearInspectSurface()` clears both inspect bubbles and close-look payloads when menus or reset paths need to wipe inspect state.
- `toggleJournalSketchbook()` gates the sketchbook behind surveyed biome state, closes comparison view, and resets the selected slot when closed.
- `startPlaying()`, `setSelectedJournalBiome()`, and reset paths close sketchbook state so it does not leak across journal exits, biome switches, or adventure reset.
- Existing runtime smoke already proves close-look open/close returns to play with no lingering bubble, and sketchbook open/place/clear/reload state persists cleanly.

## Recommendation

- Park `ECO-20260420-main-390` and `ECO-20260420-critic-390` rather than adding redundant runtime or test work.
- Promote `ECO-20260420-scout-394` for packet `147` so lane 1 can continue to the next actionable item.
- Keep packet `146` lane-1 clear of runtime, test, content, station, save, route, map, and geometry changes.

## Verification

```bash
npm test -- --run src/test/close-look.test.ts src/test/sketchbook.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "opens a close-look card|opens the surveyed-biome sketchbook"
```

Both focused proof sets passed.
