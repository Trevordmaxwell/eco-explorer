# 2026-04-04 Coastal Bluff Pocket Support Handoff

Prepared `ECO-20260404-scout-265` in lane 2.

## Scope Reviewed

- `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- `docs/reports/2026-04-04-coastal-pocket-support-and-high-country-process-phase.md`
- `docs/reports/2026-04-04-coastal-scrub-signature-pocket-traversal-handoff.md`
- `docs/reports/2026-04-04-coastal-scrub-signature-pocket-implementation.md`
- `docs/reports/2026-04-04-coastal-scrub-signature-pocket-review.md`
- `docs/reports/2026-04-04-coastal-scrub-identity-support-handoff.md`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/sketchbook.test.ts`
- `docs/science-source-ledger.md`

## Current Read

- The new bluff pocket already succeeded at the hard part: `Coastal Scrub` now has one recognizable upper-bluff nook through `windbreak-bluff-lookout-rest` plus the authored `pacific-wax-myrtle` and `song-sparrow` pair.
- The nearby notebook-facing surfaces are no longer missing support in general. `pacific-wax-myrtle` already has both a close-look card and a sketchbook line, `coyote-brush` already has its sketchbook memory line, `dune-lupine` already carries the newer beach-to-scrub comparison seam, and `deer-mouse` already gives the lower shelter pocket a local memory echo.
- The latest traversal review also matters here: the `x 320-360` bluff/swale band is already near its comfortable authored-density ceiling, so this follow-on should not add another local carrier pair, another note id, or another comparison card into the same compact family.

## Recommendation

Treat `main-265` as one exact bluff-pocket support seam:

1. add one `song-sparrow` close-look card

Do not pair it with a second notebook change in this pass.

## Why `song-sparrow` Is The Best Remaining Bluff Carrier

- It is already authored directly onto the new upper nook as `windbreak-bluff-lookout-sparrow`, so the card deepens the exact new place instead of reopening a broader scrub-body identity pass.
- It already has one compact sketchbook line, which means the remaining gap is visual zoom rather than more strip copy.
- It gives the lookout a lived-in perch read that is different from the already-spent woody-scrub support on `pacific-wax-myrtle` and `coyote-brush`.
- It stays more pocket-specific than `coyote-brush`, which does not currently anchor the bluff nook itself, and it avoids spending another pass on `pacific-wax-myrtle`, which already owns the scrub-structure close-look seam.

## Suggested Close-Look Shape

Suggested callouts:

- `streaked chest`
- `small beak`

Suggested sentence direction:

- `This sparrow stays close to scrub so it can sing and slip back into cover fast.`

Suggested sprite scale:

- `6`

Teaching goal:

- make the bluff pocket feel like a small lee-held perch above the swale, not just a geometry stop

## Why Not Another Note Or Comparison

- Coastal Scrub already has dense enough note and comparison support around this family that another notebook-facing layer would mostly revisit the same teaching space.
- The last clean review already treated the coastal comparison seam as near its handheld-safe ceiling, so the calmer next move is to change surface instead of stacking more text.
- A close-look card is the most visual-first support left for this pocket and does not require touching route-board, station, atlas, or map seams.

## Explicit Non-Targets

- no new ecosystem-note ids
- no second Coastal Scrub comparison entry
- no new sketchbook notes for `pacific-wax-myrtle`, `song-sparrow`, `coyote-brush`, or `deer-mouse`
- no new authored bluff carriers or geometry changes in `src/content/biomes/coastal-scrub.ts`
- no route-board, station, map, or larger notebook layout work

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts` only if one tiny targeted regression check is useful

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts`
- `npm run build`
- one seeded browser capture of the `song-sparrow` close-look card from a direct `coastal-scrub` start

## Queue Outcome

- Close `ECO-20260404-scout-265`.
- Promote `ECO-20260404-main-265` to `READY`.
- Retarget `ECO-20260404-main-265` and `ECO-20260404-critic-265` to this handoff.
