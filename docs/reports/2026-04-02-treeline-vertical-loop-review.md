# 2026-04-02 Treeline Vertical Loop Review

Reviewed `ECO-20260402-critic-115` against packet `050`, the lane-3 brief, the treeline loop implementation in `src/content/biomes/treeline.ts`, the focused `treeline-biome` and `runtime-smoke` coverage, the required shared client artifact in `output/main-142-client/`, the scout baselines in `output/lane-3-scout-104-browser/`, and the live post-implementation browser/state artifacts in `output/main-142-browser/`.

## Result

No blocking lane-3 issue found.

The new treeline `backside notch loop` lands the intended next step:

- the right side of the lee pocket now reads like one folded shelter family instead of a quick spill into `lichen-fell`
- the added lip and lower bowl stay inside the same calm one-camera band
- the route still feels like wind-cut relief and recovery, not a harsher second climb branch

## What Landed Well

- The new bowl reads as continuation, not expansion. In `output/main-142-browser/backside-notch.png`, the player settles into a lower pocket directly under the existing upper stones, so the geometry now communicates `lip -> notch -> rejoin` instead of `perch -> handoff`.
- The tiny cue language still holds. `lee-pocket-rime-light`, `moss-campion`, and the existing talus anchors are enough to make the new bowl legible without adding another sign, climbable, or hint seam.
- The runtime proof now checks the right behavior. The focused smoke path still proves upper rest access, now catches a settled lower-notch state, and then re-enters `lichen-fell` cleanly, so the test is guarding the actual loop read rather than only authored coordinates.

## Watch Item

Not a blocker, but it should stay attached to future treeline follow-ons:

- the deterministic smoke uses the temporary treeline-start override, while the real browser route from the normal biome start settles into the notch slightly later and lower. Future treeline additions should keep one real-start browser proof in the loop so lane 3 does not accidentally optimize only for the override path.

## Verification Rechecked

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact backside notch loop|authors one tiny high-perch cue for the new lee-side lift"`
- `npm run build`
- `npm run validate:agents`
- inspected `output/main-142-client/shot-0.png`
- compared `output/lane-3-scout-104-browser/lee-pocket.png` and `output/lane-3-scout-104-browser/fell-rejoin.png` against `output/main-142-browser/backside-notch.png`
- checked `output/main-142-browser/backside-notch-state.json` and `output/main-142-browser/errors.json`

## Queue Recommendation

- Close `ECO-20260402-critic-115` as done.
- Promote `ECO-20260402-scout-105` to `READY`.
