# 2026-04-02 Forest Recovery Or Memory Handoff

Prepared `ECO-20260402-scout-137` against packet `066`, the lane-3 brief, the fresh crossover review, the current `forest` geometry in `src/content/biomes/forest.ts`, the existing vertical-cue seam, and the live browser artifacts in `output/main-151-browser/` and `output/main-174-browser/`.

## Current Read

The forest vertical family now has the right structure:

1. `root-hollow -> stone-basin -> filtered-return` reads as one calm lower family
2. `high run -> old wood crossing -> hinge bay -> giant-tree pocket` now reads as one old-wood destination family

What still feels a little easy to forget is the *return language* around that new middle place.

Right now:

- the cave family already has `stone-basin-return-light`
- the high old-growth family already has `old-growth-inner-rest-light`
- but the new low hinge band between bridge and giant-tree pocket has no equally clear remembered return seam

That means the family now connects structurally, but the new middle place is still carried mostly by shape, not by a tiny reusable re-entry signal.

## Best Next Pass

Use `main-175` on one tiny reused recovery cue in the hinge-to-pocket band.

Best question:

- where should one small familiar return-light sit so the player remembers this old-wood middle as a way back into the giant-tree family, not just as one more shelf?

## Recommended Change For `main-175`

Keep the current geometry exactly as shipped:

1. `forest-layer-bridge-log`
2. `forest-layer-bridge-span`
3. `old-wood-hinge-rest`
4. `old-growth-trunk-foot-rest`
5. `old-growth-main-trunk`

Add only one tiny recovery seam:

1. `old-wood-hinge-light`
   - style: reuse existing `recovery-light`
   - target band: around `x 650-660`
   - target height: around `y 118-124`
   - zone: `old-growth-pocket`
   - job: make the new hinge shelf and lower old-growth handoff easier to notice on re-entry from either the bridge side or the trunk-foot bowl

Why this is the strongest next move:

- it spends the follow-on on recovery or memory instead of another structural patch
- it reuses an existing lane-3 cue language instead of inventing another one
- it keeps the forest family easier to re-enter without adding another shelf, another carrier cluster, or another note shell

## Guardrails For This Beat

- do not add another platform in the bridge-to-trunk band
- do not add another bark-shelf helper between `old-growth-trunk-foot-rest` and `old-growth-bark-shelf`
- do not add another plant or landmark cluster just to “justify” the cue
- do not widen the cave, old-growth pocket, or canopy route

## Test Guidance

`main-175` should stay focused:

- extend `src/test/forest-biome.test.ts` so the authored forest cue list includes `old-wood-hinge-light`
- add one focused `runtime-smoke` proof that reaches the old-growth pocket from the bridge side and confirms the new cue is visible in the hinge band when hints are on
- rely on the existing hidden-hints coverage instead of opening a second special-case toggle test unless the current shared cue-hidden assertion no longer covers the new id

Best proof question:

- does the old-wood hinge now feel like a remembered re-entry place instead of only a newly added shelf?

## Browser Guidance

Use these current references:

- `output/main-174-browser/hinge-bay.png`
- `output/main-174-browser/state.json`
- `output/main-151-browser/trunk-rejoin.png`

Success should look like:

- the new middle seam stays structurally unchanged
- one tiny return-light now gives the hinge band a familiar way-back read
- the old-growth family feels warmer to re-enter without becoming louder or denser

## Queue Guidance

- Close `ECO-20260402-scout-137` as done.
- Promote `ECO-20260402-main-175` to `READY`.
- Keep `ECO-20260402-critic-148` blocked until the implementation lands.
