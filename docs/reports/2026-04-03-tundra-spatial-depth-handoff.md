# 2026-04-03 Tundra Spatial Depth Handoff

Prepared `ECO-20260402-scout-155` against packet `079`, the lane-3 brief, the live tundra implementation in `src/content/biomes/tundra.ts`, the focused tundra traversal proofs in `src/test/tundra-biome.test.ts` and `src/test/runtime-smoke.test.ts`, and the latest tundra browser baselines in `output/main-167-browser/` and `output/main-143-browser/`.

## Current Read

`Tundra Reach` now has a readable low-relief family through the top end:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`
5. `frost-ridge-drift-rest`
6. `meltwater-snow-lip`
7. `tussock-thaw-channel`

That fixed the old corridor feeling through the ridge, but the far-right side still releases too quickly after the snow lip. The current meltwater browser/state proof shows the remaining gap clearly:

- `output/main-167-browser/snow-lip.png` gives the route one good transition beat at the front of `meltwater-edge`
- `output/main-167-browser/state.json` shows the player on the lip at `x: 538`, with the authored `tussock-thaw-channel` at `x: 544`, then a quick return to open ground and sparse carriers at `x: 549`, `570`, and `599`
- the result still reads as `drift rest -> snow lip -> channel marker -> open edge` instead of one small wet-edge pocket

## Best Next Pass

Spend `main-193` on one shallow meltwater-edge hold after the current snow lip so the tundra ends with a remembered wet pocket instead of another quick release.

Best question:

- where is the one low, slightly wetter hold after the snow lip where the meltwater carriers gather before the edge opens back out?

Why this is the strongest next move:

- it stays inside the current tundra relief family instead of reopening the thaw-skirt contour work
- it gives the `tussock-thaw-channel`, `cottongrass`, and `arctic-willow` a small terrain event to belong to
- it keeps tundra low and calm while finally making `meltwater-edge` feel like a place, not the end of the strip

## Recommended Geometry For `main-193`

Keep the whole live family:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`
5. `frost-ridge-drift-rest`
6. `meltwater-snow-lip`

Add only one new low far-right piece:

1. `meltwater-bank-rest`
   - place just after the current `tussock-thaw-channel`, before the open exit
   - target band: around `x 568-594`
   - target height: around `y 111-113`
   - width: `22-30px`
   - job: turn the end of the route into `drift rest -> snow lip -> thaw channel -> wet rest -> open edge`

If spacing needs help, prefer a tiny nudge to the new rest or the channel landmark rather than adding a second platform.

## Best Support Carriers

Keep support wet-edge and local:

- `cottongrass`
- `arctic-willow`
- `tussock-thaw-channel`
- optional `snow-bunting` only if the existing visit table still leaves the space feeling alive without more authored terrain

Best authored support shape:

- one authored `arctic-willow` near the new wet rest
- one authored `cottongrass` just beyond or on the rest
- do not add new ridge flowers, cues, notes, climbables, or HUD support

## Test Guidance

`main-193` should stay tightly scoped:

- extend `src/test/tundra-biome.test.ts` so the authored tundra family now includes `meltwater-bank-rest` after `meltwater-snow-lip`
- add one focused `runtime-smoke` proof using the current temporary tundra start override and demonstrate:
  - the player still reaches the upper shelf
  - the route still settles onto the bank shoulder and drift rest
  - the player can continue through the new `meltwater-bank-rest`
  - the route still releases cleanly into the far-right open edge without trapping the player

## Browser Guidance

Use these as the before-state baseline:

- `output/main-167-browser/snow-lip.png`
- `output/main-167-browser/state.json`
- `output/main-143-browser/bank-shoulder.png`

Success should look like:

- `meltwater-edge` reads like one shallow wet pocket instead of a quick open strip
- the `tussock-thaw-channel`, `cottongrass`, and `arctic-willow` now feel grouped around one readable terrain hold
- the far-right tundra stays low, open, and forgiving at the current `256x160` screen scale

## Queue Guidance

- Close `ECO-20260402-scout-155` as done.
- Promote `ECO-20260402-main-193` to `READY`.
- Keep `ECO-20260402-critic-166` blocked until the implementation lands.
