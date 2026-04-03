# 2026-04-02 Tundra Relief Handoff

Prepared `ECO-20260402-scout-128` against packet `062`, the lane-3 brief, the live tundra implementation in `src/content/biomes/tundra.ts`, the earlier relief proof report in `docs/reports/2026-04-02-tundra-relief-proof-review.md`, and the live browser/state artifacts in `output/main-143-browser/`.

## Current Read

`Tundra Reach` now has one clear low-relief family through the thaw skirt:

1. entry heave
2. upper shelf
3. bank shoulder
4. ridge rejoin

That fixed the old `long shelf -> abrupt drop` problem, but the inland half still resolves too evenly after the first shoulder.

The current browser/state read makes the gap clear:

- `output/main-143-browser/bank-shoulder.png` gives the route one good mid-beat at `x 424 / y 94`.
- `output/main-143-browser/ridge-rejoin.png` and `output/main-143-browser/state.json` show the next visible carriers spread across roughly `x 454`, `468`, `490`, and `499`, but there is no second terrain event holding the inland side together.
- The result still feels like `shoulder -> broad open ridge strip` instead of a fuller inland relief family.

## Best Next Pass

Add one compact `frost-ridge` rest on the inland half before the branch opens into the meltwater side.

Best question:

- where is the one calmer, slightly sheltered hold after the ridge rejoin and before the tundra opens back out?

Why this is the strongest next move:

- it grows directly out of the live bank-shoulder proof instead of restarting the thaw-skirt puzzle from scratch
- it strengthens the inland top end without borrowing treeline's notch language
- it leaves the later `snow-edge` follow-on room to deepen place memory instead of spending that beat on basic contour

## Recommended Geometry For `main-166`

Keep the whole current thaw-skirt family:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`

Add only one new low inland piece:

1. `frost-ridge-drift-rest`
   - place after the current `thaw-skirt-exit-heave`, on the inland half of `frost-ridge`
   - target band: around `x 496-516`
   - target height: around `y 100-103`
   - width: `18-24px`
   - job: break the current open ridge strip into `bank shoulder -> ridge tread -> drift rest -> open edge`

If runtime spacing needs help, prefer a tiny nudge to the new rest or the nearest ridge flora carriers instead of adding a second new platform.

## Best Support Carriers

Keep support minimal and terrain-first.

Use content already teaching exposed ridge ground:

- `mountain-avens`
- `woolly-lousewort`
- `crowberry`

Best support shape:

- if one authored anchor is needed, use a single `mountain-avens` or `woolly-lousewort` near the new rest
- do not add a new note, process, cue, climbable, or HUD surface
- save stronger snow-edge signaling for `scout-129` / `main-167`

## Test Guidance

`main-166` should prove the inland relief without widening lane 3:

- extend `src/test/tundra-biome.test.ts` so the authored platform order includes `frost-ridge-drift-rest` after `thaw-skirt-exit-heave`
- add one focused `runtime-smoke` proof with a temporary tundra start override near the current thaw-skirt approach band and demonstrate:
  - the player still reaches the upper shelf
  - the player still settles onto the bank shoulder
  - the player can continue to the new inland drift rest
  - the route still opens cleanly into the far-right tundra without a harsh drop or stall

## Browser Guidance

Use these as the before-state baseline:

- `output/main-143-browser/bank-shoulder.png`
- `output/main-143-browser/ridge-rejoin.png`
- `output/main-143-browser/state.json`

Success should look like:

- one fuller inland relief family instead of one shoulder followed by a broad flat strip
- no treeline-style extra notch or helper lip silhouette
- the tundra top end still reading low, open, and calm at handheld scale

## Queue Guidance

- Close `ECO-20260402-scout-128` as done.
- Promote `ECO-20260402-main-166` to `READY`.
- Keep `ECO-20260402-critic-139` blocked until the implementation lands.
