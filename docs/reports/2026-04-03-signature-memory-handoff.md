# 2026-04-03 Signature Memory Handoff

Prepared `ECO-20260403-scout-236` in lane 2.

## Current Read

The signature-pocket support wave already gave the obvious anchor entries notebook-facing support:

- `pacific-wax-myrtle` now has both a sketchbook line and a close-look card
- `coyote-brush` now has a sketchbook line
- `talus-cushion-pocket` now has both a sketchbook line and a close-look card
- `frost-heave-hummock` now has a sketchbook line

That means the next memory gain should not spend another pass on those same anchors, and it should not reopen ecosystem-note, comparison, atlas, station, or route surfaces.

The remaining sketchbook gap sits one layer beside those anchors:

- `deer-mouse` helps make the new `Coastal Scrub` shelter pocket feel actively used, but it still falls back to plain fact text in the sketchbook
- `reindeer-lichen` is one of the approved exposed-ground carriers around the new high-country threshold family, but the shared entry still has no authored sketchbook note in either `Treeline` or `Tundra`

## Recommendation

Keep `main-236` sketchbook-first and limit it to two note-strip additions:

1. add one local `sketchbookNote` for `deer-mouse` in `src/content/biomes/coastal-scrub.ts`
2. add one shared `sketchbookNote` for `reindeer-lichen` in `src/content/shared-entries.ts`

Suggested note lines:

- `deer-mouse`: `Quick runner using low scrub for cover.`
- `reindeer-lichen`: `Pale branches holding on across cold open ground.`

## Why This Shape

- It deepens the remembered feel of the new signature pockets without stacking more copy onto the already-supported anchor entries.
- `deer-mouse` strengthens the lived-in shelter read of the tucked `windbreak-swale` pocket instead of spending another line on woody scrub structure alone.
- `reindeer-lichen` is the best remaining high-country memory carrier because it is already part of the approved exposed-ground threshold family and can improve both `Treeline` and `Tundra` through one shared entry change.
- Both entries currently fall back to plain fact voice in the sketchbook, so this is a real memory gap rather than a speculative embellishment.

## Explicit Non-Targets

- do not add more notes for `pacific-wax-myrtle`, `coyote-brush`, `talus-cushion-pocket`, or `frost-heave-hummock`
- do not add new ecosystem-note ids
- do not widen comparison or close-look support again
- do not touch station, route-board, map, atlas shell, or `game.ts`
- do not turn this into a broad “fill every missing sketchbook note” sweep

## Scope For Main

- `src/content/shared-entries.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/sketchbook.test.ts`
- `src/test/content-quality.test.ts` only if a targeted regression is truly needed

## Suggested Test Shape

- one sketchbook test proving `deer-mouse` now carries its authored note on a `Coastal Scrub` page
- one sketchbook test proving the shared `reindeer-lichen` note appears on a `Treeline` page
- one sketchbook test proving the same shared `reindeer-lichen` note appears on a `Tundra` page

## Queue Outcome

- Close `ECO-20260403-scout-236`.
- Promote `ECO-20260403-main-236` to `READY`.
- Retarget `ECO-20260403-main-236` and `ECO-20260403-critic-236` to this handoff.
