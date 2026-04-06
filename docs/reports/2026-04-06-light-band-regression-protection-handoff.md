# 2026-04-06 Light-Band Regression Protection Handoff

Prepared `ECO-20260406-scout-296` in lane 3 against packet `122`, the lane brief, the scout role guide, the support-readable route-feel phase report, and the current Tundra / Coastal Scrub proof coverage.

## Recommendation

Use `main-296` on proof coverage only, not biome geometry.

The best cooldown move is a runtime-smoke protection pass that locks the two live support-biased proof shelves as readable, same-band, and recoverable:

- `Tundra Reach`
  - `snow-meadow-drift-rest -> thaw-skirt-entry-heave`
  - active `Thaw Window`
  - `hand-lens` preferring `woolly-lousewort`
- `Coastal Scrub`
  - active `Held Sand` back-dune shelf found through `findHeldSandShelfStartX()`
  - `hand-lens` preferring `beach-grass`

## Why This Wins

Lane 3 is supposed to cool down here while the support-readable cue lands in other lanes. The geometry is already doing its job:

- Tundra now has the shorter thaw catch.
- Coastal Scrub already has the working back-dune shelf comparison.

What is still a little under-protected is the exact thing this lane owns during a cue rollout: the player should still feel these spaces as calm, local proof bands rather than as brittle targeting tricks.

Right now the tests prove:

- the preferred support target can win
- non-`hand-lens` supports do not get that win

But they do not yet strongly lock the readability part:

- the target should still appear inside the intended local band
- a non-fit alternative should still be visibly nearby
- the player should still be sitting in a recoverable shelf window rather than only somewhere in the biome

That is the right lane-3 regression spend.

## Exact Suggested Pass

Keep this test-first and runtime-only.

### Tundra

Tighten the existing `hand-lens` `Thaw Window` runtime proof so it also asserts:

- the pre-inspect state is still inside the compact thaw-skirt shelf band
- `woolly-lousewort` is present nearby
- at least one non-fit thaw-skirt alternative is present nearby, such as `purple-saxifrage` or `cottongrass`
- no travel target or unrelated overlay is competing for the same small play space

### Coastal Scrub

Extend the existing `Held Sand` shelf proof so it also asserts:

- the found start still lands in `back-dune`
- `beach-grass` and at least one non-fit nearby alternative are both visible before inspect
- the player is still on a compact back-dune shelf window, not only somewhere in the zone
- the non-`hand-lens` comparison still stays in that same local band

## What To Avoid

- no new platform ids
- no `tundra.ts` or `coastal-scrub.ts` geometry edits unless a proof actually fails first
- no new cue art, HUD, notebook, or station copy
- no browser-only proof as the primary delivery

## Suggested File Targets

- `src/test/runtime-smoke.test.ts`
- optionally `src/test/tundra-biome.test.ts` or `src/test/coastal-scrub-biome.test.ts` only if one tiny authored-band bound check is needed after the runtime pass

## Suggested Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer woolly lousewort as the thaw-window bloom clue on the live thaw-skirt shelf|keeps non-hand-lens supports on the nearer thaw-skirt inspectable in the same thaw-window bloom setup|lets hand lens prefer beach grass as the Held Sand clue on the live back-dune shelf|keeps non-hand-lens supports on the nearer back-dune inspectable in the same Held Sand shelf setup"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260406-scout-296` as done.
- Promote `ECO-20260406-main-296` to `READY`.
- Keep `critic-296` blocked until that proof pass lands.
