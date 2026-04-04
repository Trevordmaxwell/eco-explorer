# 2026-04-03 Coastal Scrub Signature Support Handoff

Prepared `ECO-20260403-scout-220` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-signature-pocket-support-phase.md`
- `.agents/packets/093-signature-pocket-support-phase.json`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/journal-comparison.ts`
- `src/engine/close-look.ts`
- `src/test/journal-comparison.test.ts`
- `src/test/close-look.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `docs/reports/2026-04-03-coastal-scrub-close-look-handoff.md`
- `docs/reports/2026-04-03-coastal-scrub-close-look-review.md`
- `docs/reports/2026-04-03-coastal-shore-pine-rest-review.md`

## Read

- Coastal Scrub no longer lacks content in general. It already has healthy notebook-note coverage across `back-dune`, `windbreak-swale`, `shore-pine-stand`, and `forest-edge`, plus live comparison support for `beach-pea`, `beach-strawberry`, `nootka-rose`, `salmonberry`, and `sword-fern`.
- The right-half `shore-pine-stand` is also no longer the best place to spend another strong authored beat. It already has `Pine Underlayer`, `kinnikinnick` close-look support, a sketchbook memory line, and the new lane-3 `shore-pine-rest` seam.
- The remaining identity gap sits farther left in the scrub body itself. `pacific-wax-myrtle` is one of the clearest scrub-only carriers, but it still has no close-look support. `coyote-brush` is the biome's main brush-mass carrier, but it still leaves no sketchbook memory trace at all.

## Recommendation

Treat `main-220` as one compact left-middle scrub signature pack, not another pine-rest or forest-edge pass.

Exact target:

1. Add one `pacific-wax-myrtle` close-look card.
2. Add one `coyote-brush` `sketchbookNote`.

## Why This Shape

- It strengthens the part of Coastal Scrub that still reads most like connective tissue: the woody scrub body between open dune and pine edge.
- It avoids reopening the already-busy `shore-pine-stand` band, which the latest lane-3 review explicitly said should not take another strong authored beat right away.
- It keeps the pass notebook-toned and lane-2 owned. One detail-first close-look card plus one memory-strip line is enough to make the scrub itself feel more remembered without adding more journal-note layers or widening the comparison lattice.

## Exact Candidate Plan

### 1. `pacific-wax-myrtle` close-look

Why first:

- coastal-scrub-only carrier with clearer detail payoff than `shore-pine` or `coyote-brush`
- dark berries and clustered leaves should read better in a vignette than a full shrub mass
- teaches that the scrub is becoming woody and steadier, not just fuller

Suggested payload shape:

- callouts: `waxy berries`, `leaf cluster`
- sentence direction: `Dark berries help mark where coastal scrub starts holding steadier cover.`
- sprite scale: `5`

Best teaching tie:

- complements `sturdier-cover`

### 2. `coyote-brush` sketchbook note

Why second:

- it is the biome's core scrub carrier and still has no memory-strip line
- a sketchbook note makes the left-middle scrub body feel remembered without spending another note id
- it balances the earlier `kinnikinnick` memory payoff so Coastal Scrub remembers more than the quieter pine floor

Suggested note direction:

- `Tough brush marking where open sand turns scrub.`

Best teaching tie:

- complements `thicket-cover` and `sturdier-cover`

## Explicit Non-Targets For This Pass

- `shore-pine`: still better as scene-scale structure than a new close-look follow-on here
- `kinnikinnick`: already has note, close-look, and sketchbook support
- `nurse-log`: already has close-look support and points more toward forest edge than scrub identity
- `nootka-rose`, `salmonberry`, `sword-fern`: already have healthy note-backed comparison support
- new ecosystem-note ids: current scrub note coverage is already strong enough
- comparison allowlist expansion: the shared-species lattice is not the missing seam here

## Suggested File Targets

- `src/content/biomes/coastal-scrub.ts`
- `src/engine/close-look.ts`
- `src/test/sketchbook.test.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts` only if one explicit guard adds value

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture for `pacific-wax-myrtle` close-look
- one seeded browser capture for a coastal-scrub sketchbook page carrying `coyote-brush`

## Queue Outcome

- Close `ECO-20260403-scout-220`.
- Promote `ECO-20260403-main-220` to `READY`.
- Keep `ECO-20260403-critic-220` blocked until the scoped scrub-signature pass lands.
