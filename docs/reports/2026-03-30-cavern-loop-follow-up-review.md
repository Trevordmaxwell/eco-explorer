# 2026-03-30 Cavern Loop Follow-Up Review

Reviewed `ECO-20260330-main-120` against packet `038`, the lane-3 brief, the cavern-loop handoff, the updated `forest` cave geometry and smoke coverage, plus the seeded basin and upper-return browser artifacts.

## Result

No blocking findings.

The cave-side follow-up spends the last packet `038` geometry budget the right way. `stone-basin` still reads as the deepest chamber, the recovery-light cue stays tiny, and the new upper-return shelf makes the cave feel like a small recoverable chamber family instead of a one-way descent.

## What Holds Up

- The implementation follows the handoff tightly. It keeps the existing under-root footprint, keeps `stone-basin` as the lowest point, and reuses `root-hollow-cave-trunk` as the recovery spine instead of adding a second branch or another depth spike.
- The new `root-hollow-return-nook` is small enough to read as a loop cue, not a new destination. It gives the brighter recovery side one calmer top-side re-entry without widening under `log-run` or turning the route into a maze.
- The cue budget stayed disciplined. Repositioning `stone-basin-return-light` upward is enough to support the return read; there is no second marker language, no signage, and no HUD drift.
- The biology support stayed minimal and moisture-led. One high `tree-lungwort` anchor is enough to distinguish the nook without opening a new content wave.
- The seeded browser frames in `output/main-120-cave-loop/stone-basin-loop.png` and `output/main-120-cave-loop/upper-return-nook.png` show the deepest chamber, the trunk recovery spine, and the upper-return perch at the same handheld scale, which is the right proof for this step.

## Watch Item

- The new upper-return perch still reports inside `stone-basin` in the debug `zoneId` read because the current zone seam is x-banded rather than shelf-specific. That is acceptable for now because it is not player-facing, but future lane-3 work should only refine that if a later packet genuinely needs more precise cave debug language.

## Verification

- Reviewed:
  - `src/content/biomes/forest.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `output/main-120-cave-loop/stone-basin-loop.png`
  - `output/main-120-cave-loop/upper-return-nook.png`
- Re-ran focused verification:
  - `npm test -- --run src/test/forest-biome.test.ts`
  - `npm test -- --run src/test/runtime-smoke.test.ts -t "lets the player descend through the seep pocket into a deeper stone basin and recover through the brighter return|adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor"`
  - `npm run build`
- Browser proof:
  - final Playwright console check returned zero errors

## Queue Guidance

- Close `ECO-20260330-critic-95`.
- Treat packet `038` as closed.
- Lane 3 has no further active queue item after this review; the next vertical growth should arrive through a new scout/packet rather than extending this one ad hoc.
