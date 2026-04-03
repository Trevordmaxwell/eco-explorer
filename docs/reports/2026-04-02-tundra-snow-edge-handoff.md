# 2026-04-02 Tundra Snow-Edge Handoff

Prepared `ECO-20260402-scout-129` against packet `062`, the lane-3 brief, the live tundra implementation in `src/content/biomes/tundra.ts`, the new relief review in `docs/reports/2026-04-02-tundra-relief-review.md`, and the earlier tundra browser/state baselines in `output/main-143-browser/`.

## Current Read

The tundra top end now has a clearer relief family:

1. upper shelf
2. bank shoulder
3. ridge tread
4. drift rest
5. open edge

That solves the old `shoulder -> flat strip` problem, but the far-right side still lacks a distinct snow-edge beat of its own.

The current code layout shows the gap:

- `frost-ridge-drift-rest` now holds the inland ridge around `x 500-522`.
- The next authored terrain marker is still the existing `meltwater-channel` landmark at `x 544 / y 112`.
- `meltwater-edge` already has the right ecology carriers (`cottongrass`, `arctic-willow`, `snow-bunting`), but no compact terrain event yet ties those carriers into the traversal shape.

The result is that the route now has a better ridge, but the final snow-edge still reads more like an open landing strip than a remembered place.

## Best Next Pass

Add one compact snow-edge lip at the start of `meltwater-edge`, just beyond the new drift rest and before the channel landmark.

Best question:

- where is the one low snow edge that says the ridge is thinning into wetter ground?

Why this is the strongest next move:

- it spends the next beat on place memory instead of another generic ridge contour
- it lets the existing `meltwater-channel` and wet-edge carriers read as a small family instead of isolated decorations
- it restores the visual proof seam the relief review asked to keep alive for future tundra growth

## Recommended Geometry For `main-167`

Keep the whole live family:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`
5. `frost-ridge-drift-rest`

Add only one new far-right piece:

1. `meltwater-snow-lip`
   - place at the front of `meltwater-edge`, after `frost-ridge-drift-rest`
   - target band: around `x 536-556`
   - target height: around `y 108-110`
   - width: `18-24px`
   - job: turn the final read into `drift rest -> snow lip -> meltwater channel -> open edge`

If spacing needs help, prefer a tiny nudge to `meltwater-channel` or the new lip instead of adding a second new platform.

## Best Support Carriers

Keep support local to the wet snow edge:

- `cottongrass`
- `arctic-willow`
- `snow-bunting`
- `tussock-thaw-channel`

Best support shape:

- if one authored anchor is needed, use a single `cottongrass` or `arctic-willow` near the new snow lip
- do not add a new note, cue, process moment, climbable, or HUD surface
- do not reuse more ridge-flower support for this beat; let the ecology shift with the terrain

## Test Guidance

`main-167` should prove the snow edge without widening the lane:

- extend `src/test/tundra-biome.test.ts` so the authored tundra family includes `meltwater-snow-lip` after `frost-ridge-drift-rest`
- add one focused `runtime-smoke` proof with the same temporary tundra start override and demonstrate:
  - upper shelf
  - bank shoulder
  - drift rest
  - new snow lip
  - clean meltwater-edge release past the channel landmark

## Browser Guidance

This pass should restore a live tundra browser proof.

Use these before-state references:

- `output/main-143-browser/ridge-rejoin.png`
- `output/main-143-browser/ridge-rejoin-state.json`
- `docs/reports/2026-04-02-tundra-relief-review.md`

Success should look like:

- the far-right side reads like a true snow-edge transition, not just open ground after the ridge
- the new lip stays low and forgiving
- the `meltwater-channel` and wet-edge carriers now feel grouped around one readable terrain beat

## Queue Guidance

- Close `ECO-20260402-scout-129` as done.
- Promote `ECO-20260402-main-167` to `READY`.
- Keep `ECO-20260402-critic-140` blocked until the implementation lands.
