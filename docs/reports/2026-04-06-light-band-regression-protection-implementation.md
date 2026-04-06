# 2026-04-06 Light-Band Regression Protection Implementation

Implemented `ECO-20260406-main-296` in lane 3 against packet `122`, the lane brief, the main-agent role guide, and the scout handoff for the light-band cooldown wave.

## Change

Kept the pass runtime-only and inside the existing proof tests in `src/test/runtime-smoke.test.ts`.

The updated `Thaw Window` and `Held Sand` smoke tests now protect the shelf readability we actually care about:

- the player stays inside the intended local proof band before inspect
- the preferred support-biased target is visible nearby
- at least one non-fit nearby alternative is also visible in the same band
- the comparison support still reads inside that same local shelf instead of drifting into a broader biome assertion

## Why This Shape

Lane 3 was supposed to cool down here. The geometry is already in good shape, so the right spend was to make the live proof shelves harder to accidentally flatten while other lanes add the new cue and controller split.

This keeps the protection on:

- `Thaw Window` as a compact thaw-skirt shelf choice
- `Held Sand` as a compact back-dune shelf choice

without reopening authored geometry, adding another landmark family, or spending browser-only verification.

## Files Touched

- `src/test/runtime-smoke.test.ts`

## Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer woolly lousewort as the thaw-window bloom clue on the live thaw-skirt shelf|keeps non-hand-lens supports on the nearer thaw-skirt inspectable in the same thaw-window bloom setup|lets hand lens prefer beach grass as the Held Sand clue on the live back-dune shelf|keeps non-hand-lens supports on the nearer back-dune inspectable in the same Held Sand shelf setup"`
- `npm run build`

## Queue Outcome

- Mark `ECO-20260406-main-296` done.
- Promote `ECO-20260406-critic-296` to `READY`.
