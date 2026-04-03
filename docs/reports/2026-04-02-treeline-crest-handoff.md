# Treeline Crest Handoff

## Summary

The next lane-3 treeline gain should stay inside the current lee-pocket family and spend its budget on one true crest brow, not another separate climb route.

The live loop already has a readable shape:

- `lee-pocket-entry-stone -> lee-pocket-upper-shelf -> lee-pocket-crest-step -> lee-pocket-rime-rest`
- a lower `lee-pocket-back-notch` recovery pocket
- a small `lee-pocket-rime-cap` and `lee-pocket-fell-return` out to the fell

What it still lacks is one brief moment that feels like the player actually reached a top edge before dropping back into the exit line. Right now the upper band reads more like a shelf pair than a crest.

## Evidence

I re-checked the current treeline geometry in `src/content/biomes/treeline.ts`, the lee-pocket tests in `src/test/treeline-biome.test.ts`, the runtime proof in `src/test/runtime-smoke.test.ts`, and the latest browser/state artifacts:

- `output/main-142-browser/backside-notch.png`
- `output/main-142-browser/backside-notch-state.json`
- `output/main-142-browser/approach-state.json`
- `output/lane-3-scout-104-browser/high-perch.png`
- `output/lane-3-scout-104-browser/high-perch-state.json`
- `output/lane-3-scout-104-browser/fell-rejoin.png`

Those captures show the current top band staying inside one calm camera slice, but the highest readable pause is still the same horizontal level as the rest/cap pair. The route feels folded and recoverable, yet the top does not quite read like a crest destination.

## Recommendation For `main-158`

Implement one tiny forward crest brow at the far end of the existing top band.

Recommended shape:

- keep the existing family intact
- add one authored platform just beyond or slightly above `lee-pocket-rime-cap`
- treat it as the single clearest high point of the treeline loop
- keep the gain modest enough that the full route still fits in the current browser camera band
- do not add another lower helper shelf, side branch, or second lift sequence

The simplest target is:

- `lee-pocket-crest-brow` as a short authored granite platform
- placed just right of `lee-pocket-rime-cap`
- only one small step higher than the current top band, if any
- still able to hand back into `lee-pocket-fell-return` without a harsher jump demand

## Content Guidance

If the crest still needs a stronger destination feel after the geometry change, use one tiny authored carrier on the new brow or immediately beside it, pulled from existing treeline content. Keep it to one small visual reward only, such as a low alpine plant or stone-pocket accent, not a new content cluster.

Reuse the current `lee-pocket-rime-light` cue language instead of adding another cue family.

## Guardrails

- Keep vertical gain modest.
- Preserve chip-safe headroom at `256x160`.
- Do not add a second climb family.
- Do not stack another mid-height helper shelf between the current upper-shelf band and the crest.
- Keep the backside notch as the recovery pocket rather than replacing it with a cleaner but flatter top lane.

## Verification Target For `main-158`

In addition to focused biome/runtime tests, keep one real-start browser proof for the treeline route instead of relying only on the start-position override smoke path. The prior treeline review already flagged that as the right guardrail for future height work.

## Suggested Acceptance Focus

- the treeline top reads as a real crest, not just a lifted shelf
- the current lee-pocket loop stays calm and recoverable
- the new crest remains readable in one compact browser frame
