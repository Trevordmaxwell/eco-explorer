# 2026-04-03 High-Country Threshold Pocket Handoff

Prepared `ECO-20260403-scout-223` against packet `094`, the lane-3 brief, the scout role guide, the fresh `Coastal Scrub` pocket review, the live `treeline` and `tundra` biome implementations, the focused treeline/tundra traversal tests, and the current browser artifacts for the high-country branch.

## Current Read

The high-country branch is no longer missing traversal richness in general.

### Treeline already has a real remembered family

`Treeline Pass` now reads as a compact vertical loop:

1. lee-pocket floor
2. upper shelf
3. crest and rime rest
4. backside notch
5. lee rest
6. open fell rejoin

The live proof in `output/main-159-browser/lee-rest.png` already gives treeline a distinct shelter-folded identity. Another lane-3 pocket there would risk stacking a second strong beat into the same family instead of broadening the branch.

### Tundra's wet edge is no longer the right target

`Tundra Reach` also no longer needs another `meltwater-edge` pass. The route already has:

1. `frost-ridge-drift-rest`
2. `meltwater-snow-lip`
3. `meltwater-bank-rest`

The proof in `output/main-193-browser/meltwater-bank-rest.png` shows that the far-right wet edge now reads as one shallow remembered hold instead of a quick release.

### The remaining spatial gap is the exposed tundra threshold

The current weak spot is farther left.

`output/lane-2-main-189-browser/tundra-wind-bluff.png` still shows the opening `wind-bluff -> snow-meadow` half as broad, flat, and more like setup than place. That side now has the right content carriers:

- `frost-heave-hummock`
- `reindeer-lichen`
- `moss-campion`
- `white-tailed-ptarmigan`

But it still lacks one terrain event that makes the start of tundra feel like a real threshold.

## Recommendation

Use `main-223` on one compact tundra threshold pocket at the `wind-bluff -> snow-meadow` boundary.

Best question:

- where is the one slight lee-cut or snow-held dip where the open bluff finally gives way to the first calmer snow-ground pocket?

Why this is the strongest next move:

- it spends lane 3 where the high-country branch still feels least memorable by feel
- it complements lane 2's local `frost-heave-hummock` support instead of reopening treeline's already-rich lee loop
- it keeps the pass low, calm, and readable at the current handheld scale

## Recommended Shape For `main-223`

Stay inside:

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

Keep the live right-half relief family untouched:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`
5. `frost-ridge-drift-rest`
6. `meltwater-snow-lip`
7. `meltwater-bank-rest`

Spend the new pass only in the exposed threshold band:

- zone focus: late `wind-bluff` plus early `snow-meadow`
- preferred band: roughly `x 120-184`
- preferred height: roughly `y 100-109`

### Suggested authored geometry

Prefer one small low hold in the first snow-ground band, not another long relief staircase:

1. `snow-threshold-lee-rest`
   - around `x 146-170`
   - around `y 104-107`
   - width around `22-28px`
   - job: turn the entry into `open bluff -> lee hold -> snow release`

Only if approach clarity truly needs it, allow one short precursor:

2. `wind-bluff-heave-shoulder`
   - around `x 124-142`
   - around `y 101-104`
   - keep it short and slightly higher than the rest
   - use it as a subtle settle-in shoulder, not as a second branch

If the single low rest already makes the threshold readable, stop there.

## Best Carriers

Keep carriers local to the exposed tundra threshold:

- `frost-heave-hummock`
- `reindeer-lichen`
- `moss-campion`
- optional `white-tailed-ptarmigan` only if the current sparse snow-meadow life still reads naturally around the new hold

Best authored support shape:

- one low ground-process or lichen anchor near the new hold
- optionally one snow-edge bird or already-authored hummock alignment if needed for place feel
- no new species, climbables, cue markers, note ids, or route surfaces

## Explicit Non-Targets

- do not reopen treeline's `lee-pocket` family
- do not spend another pass in `meltwater-edge`
- do not rewrite `thaw-skirt` contouring
- do not touch `close-look`, `sketchbook`, `comparison`, or ecosystem-note surfaces
- do not add climbables, vertical cues, corridor changes, or world-map work

## Desired Read

The branch should become:

1. treeline folds into sheltered stone relief
2. tundra begins with one exposed-to-held threshold pocket
3. later tundra relief still steps onward into thaw and meltwater

That gives the high-country half two different remembered shapes instead of one strong treeline space and a flatter tundra opener.

## Suggested Verification

### `src/test/tundra-biome.test.ts`

- assert the new threshold piece lands inside the `wind-bluff -> snow-meadow` band
- assert it stays well before `thaw-skirt-entry-heave`
- assert it uses only the approved exposed-ground carriers

### `src/test/runtime-smoke.test.ts`

- start in `tundra`
- reach the new threshold pocket first
- confirm the player can still continue through the existing thaw-skirt and ridge family afterward
- confirm no travel-label or start-band clutter steals the read

### Browser guidance

Use these as the before-state baseline:

- `output/lane-2-main-189-browser/tundra-wind-bluff.png`
- `output/main-193-browser/meltwater-bank-rest.png`
- `output/main-159-browser/lee-rest.png`

Success should look like:

- tundra's opening half finally reads as one threshold place, not just a flatter prelude
- the new pocket feels exposed but recoverable
- the later thaw and meltwater family still reads as the downstream continuation, not a competing beat

## Queue Guidance

- Close `ECO-20260403-scout-223`.
- Promote `ECO-20260403-main-223` to `READY`.
- Retarget `ECO-20260403-main-223` and `ECO-20260403-critic-223` to this handoff.
