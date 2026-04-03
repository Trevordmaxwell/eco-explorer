# 2026-04-02 Forest Crossover Handoff

Prepared `ECO-20260402-scout-136` against packet `066`, the lane-3 brief, the new tundra closeout review, the current `forest` geometry in `src/content/biomes/forest.ts`, the focused forest proofs, and the latest forest browser artifacts in `output/main-150-browser/` and `output/main-151-browser/`.

## Current Read

The forest vertical family is now strong in both directions:

1. `root-hollow -> stone-basin -> filtered-return` reads as one calm cave family
2. `high run -> old wood crossing -> giant tree -> trunk-foot nook` reads as one calm upper destination

What still reads slightly separate is the handoff between the crossing and the giant-tree pocket.

Right now:

- `forest-layer-bridge-log` and `forest-layer-bridge-span` clearly carry the player toward old growth
- `old-growth-trunk-foot-rest` clearly gives the giant-tree arrival its own sheltered base
- but the middle transition still resolves quickly from "crossing" into "arrival bowl"

That means the forest now feels like one outing in motion, but not yet like one authored destination family with a shared hinge place.

## Best Next Pass

Use `main-174` on one compact bridge-side hinge bay inside the existing `creek-bend -> old-growth-pocket` overlap.

Best question:

- where is the one tucked old-wood place that makes the crossing feel like it belongs to the giant-tree destination, not just to the travel between spaces?

Why this is the strongest next move:

- it spends the next beat on cohesion instead of more raw size
- it strengthens the exact middle seam the current family still lacks
- it leaves the later packet follow-on free to spend its budget on recovery-or-memory rather than using that step just to fix structure

## Recommended Geometry For `main-174`

Keep the live family:

1. `root-hollow-return-nook`
2. `log-run-high-run-log`
3. `creek-bend-high-run-log`
4. `forest-layer-bridge-log`
5. `forest-layer-bridge-span`
6. `old-growth-crossover-limb`
7. `old-growth-root-log`
8. `old-growth-trunk-foot-rest`

Add only one new crossover beat:

1. `old-wood-hinge-rest`
   - place under or just right of the current bridge span
   - target band: around `x 626-646`
   - target height: around `y 128-132`
   - width: `20-28px`
   - job: turn the middle read into `high run -> old-wood crossing -> hinge bay -> giant-tree pocket`

If a pocket shape helps the read, prefer one shallow under-bridge bay or small notch in the current old-growth approach wall instead of adding another bridge-height extension or a second trunk-foot stair.

## Guardrails For This Beat

- do not add another helper shelf between `old-growth-trunk-foot-rest` and `old-growth-bark-shelf`
- do not extend the bridge family farther left or right
- do not deepen `stone-basin` or add another canopy tier
- do not add another cue type, sign, or HUD layer

## Best Support Carriers

If one authored support placement is needed, reuse only one existing forest carrier:

- `tree-lungwort`
- `western-hemlock-seedling`
- `fallen-giant-log`

Best support shape:

- one small bridge-side or hinge-bay carrier near the new rest
- no new organism roster
- no extra note or prompt pass in this step

The middle should read more coherent mostly because of the place shape, not because the screen gets denser.

## Test Guidance

`main-174` should prove the crossover without widening the lane:

- extend `src/test/forest-biome.test.ts` so the authored crossover family includes the new hinge rest in the bridge / old-growth overlap band
- add one focused `runtime-smoke` proof that starts from the current upper forest carry and demonstrates:
  - cave-return high run into bridge
  - new hinge-bay settle or pass-through
  - clean handoff into `old-growth-main-trunk`

Best proof question:

- does the forest now have one readable middle place between "crossing" and "giant tree"?

## Browser Guidance

Use these current references:

- `output/main-150-browser/bridge-carry.png`
- `output/main-150-browser/giant-tree-entry.png`
- `output/main-151-browser/trunk-foot-nook.png`
- `docs/reports/2026-04-02-forest-support-sub-space-review.md`

Success should look like:

- the bridge no longer feels like a quick pass-through into the giant-tree bowl
- the new hinge place reads as part of the same old-wood / giant-tree destination
- the player still reaches the trunk calmly, without a harsher leap chain

## Queue Guidance

- Close `ECO-20260402-scout-136` as done.
- Promote `ECO-20260402-main-174` to `READY`.
- Keep `ECO-20260402-critic-147` blocked until the implementation lands.
