# Close-Look Selected Visual Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-392`
Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
Lane: `lane-3`

## Scout Finding

Lane 2 selected exactly two visual memory carriers for this packet: `root-curtain` in Forest Trail and `shore-pine` in Coastal Scrub. Lane 4 has already proved those cards remain optional route context after the normal inspect claim.

Lane 3 should not add new close-look entries, sketchbook slots, route requirements, station surfaces, or geometry here. The remaining lane-3 value is a focused handheld visual proof: make sure the selected close-look art reads clearly inside the current `256x160` close-look card, and only adjust a selected carrier's sprite scale if the proof shows cropping or weak silhouette.

## Recommended Main Scope

Keep `ECO-20260420-main-392` proof-first:

- Capture ignored browser proof for the `root-curtain` close-look card at `256x160`.
- If time allows, capture the `shore-pine` close-look card too; otherwise root-curtain is the priority because lane 2 explicitly recommended it as the seeded proof target.
- Inspect screenshots manually and compare them with `render_game_to_text()` state for the selected close-look payload.
- If either selected card is cropped or unreadable, make the smallest seed-only adjustment in `src/engine/close-look.ts` for that selected carrier and update `src/test/close-look.test.ts`.
- If both cards read cleanly, keep the pass output/report-only and do not touch production code.

## Non-Goals

- No new close-look support entries, sketchbook slots, journal layout, route behavior, station pages, world-map cues, save fields, content facts, or biome geometry.
- No broad close-look overlay redesign; avoid changing shared close-look card layout unless the selected proof reveals a real blocker.
- No lane-2 selected-carrier copy edits unless the proof exposes a concrete visual/readability failure.

## Verification

Recommended main verification:

```bash
npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"
npm run build
npm run validate:agents
git diff --check
```

Baseline scout checks passed:

```bash
npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"
```
