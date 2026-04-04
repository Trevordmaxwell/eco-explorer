# 2026-04-04 Coastal Scrub Identity Support Handoff

Prepared `ECO-20260404-scout-256` in lane 2.

## Current Read

- Coastal Scrub is no longer short on local support in general. The biome already has healthy ecosystem-note coverage across `back-dune`, `shrub-thicket`, `windbreak-swale`, `shore-pine-stand`, and `forest-edge`, plus local close-look support for `nootka-rose`, `kinnikinnick`, `nurse-log`, and `pacific-wax-myrtle`.
- The recent signature-support pass also already spent the obvious scrub-only notebook beats on `pacific-wax-myrtle` and `coyote-brush`, and the later memory pass already gave the new shelter pocket its `deer-mouse` echo.
- That means another local close-look card, another sketchbook line, or another new ecosystem-note id would mostly pile more copy into the same front-half notebook surfaces instead of opening a meaningfully new identity seam.
- The cleanest remaining identity gap is `dune-lupine`. It is now one of the strongest beach-to-scrub carrier species in the live Pacific branch, but it still has no same-pane comparison support because the coastal-scrub side can currently resolve to multiple valid notes.

## Why `dune-lupine` Is Ready Now

- Beach already gives it a stable note context through `Low Runner Band`.
- Coastal Scrub now has a mature enough note family that the intended identity contrast is clearer: `dune-lupine` should teach the move from open dune runner/bloom cover toward woody held-sand scrub, not just repeat the calmer-sand story from other front-half pairs.
- The earlier defer was real, but it no longer needs a general ecosystem-note reorder. This phase can solve the instability inside the comparison seam itself.

## Recommendation

Treat `main-256` as one comparison-first Coastal Scrub identity pack:

1. add `dune-lupine` to the same-pane comparison allowlist
2. add a tiny comparison-note preference seam so `dune-lupine` resolves to:
   - beach: `low-runner-band`
   - coastal scrub: `sturdier-cover`
3. only if the live card contrast still reads too generic after that, tighten the existing `sturdier-cover` summary very slightly toward lee-held sand and woody shelter without adding a new note id

## Why This Shape

- It spends the pass on a different surface and a different carrier than the recent `pacific-wax-myrtle` / `coyote-brush` wave, which matches the last review's warning not to keep stacking more scrub-body text into the same compact strips.
- It strengthens Coastal Scrub as a place where pioneer dune bloom gives way to woody, steadier cover, which is closer to the packet's `pioneer hold and sand capture` theme than another isolated detail card would be.
- It stays lane-2 safe: one notebook-facing comparison seam plus optional tiny note-summary polish, with no route-board, station, map, or `game.ts` work.
- It avoids destabilizing the broader notebook. The general ecosystem-note resolver can stay untouched for normal note unlocks while the comparison system gets one narrow preference map for an entry with multiple local note paths.

## Explicit Non-Targets

- no new ecosystem-note ids
- no extra Coastal Scrub close-look cards
- no additional sketchbook lines for `shore-pine-stand` or the left scrub body
- no pine-rest, forest-edge, route-board, map, or station follow-ons
- no broad comparison-allowlist sweep beyond `dune-lupine`

## Suggested File Targets

- `src/engine/journal-comparison.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/content/biomes/coastal-scrub.ts` only if the `sturdier-cover` summary needs the tiny contrast polish after live verification

## Suggested Verification

- `npm test -- --run src/test/journal-comparison.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "dune-lupine|comparison"`
- `npm run build`
- one seeded browser capture showing the live `dune-lupine` same-pane comparison

## Queue Outcome

- Close `ECO-20260404-scout-256`.
- Promote `ECO-20260404-main-256` to `READY`.
- Retarget `ECO-20260404-main-256` and `ECO-20260404-critic-256` to this handoff.
