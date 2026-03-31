# 2026-03-30 Upper-Canopy Continuation Handoff

Prepared `ECO-20260330-scout-83` against packet `038`, the lane-3 brief, the finished packet `033` review, the current `forest` old-growth geometry, and the live canopy artifacts in `output/main-103-canopy-visual/`, `output/main-105-browser/`, and `output/main-106-browser/`.

## Recommendation

Treat `main-119` as one tiny trunk-interior / bark-window continuation, not another tall upward push.

The current old-growth route already has enough raw height:

- `main trunk -> upper snag -> canopy rung -> high perch`

What it still lacks is one small feeling of "there is a little more giant tree to discover up here." The safest way to add that is:

- keep the current top route as the only approach
- continue slightly inward and left from the high perch
- use one very short internal snag or bark climb plus one tiny upper shelf
- keep the return route obvious from the same camera frame

## Proposed Shape For `main-119`

### Geometry

- Keep the continuation inside the existing `old-growth-pocket` footprint and the overlap of the current `canopy-pocket` / `trunk-interior` depth features.
- Avoid another broad height spike. A small lift is fine, but the destination should still fit the current top-screen headroom without turning the camera into a new puzzle.
- Prefer one short new climbable plus one compact shelf over multiple new floating platforms.

Recommended implementation pattern:

- add one short inner-bark snag reachable from the current `old-growth-high-perch`
- add one small `crown-window` or `bark-window` shelf just left and slightly above that perch
- if visual support is needed, widen the existing `old-growth-canopy-pocket` and `old-growth-trunk-interior` a little to the left instead of inventing a new depth-feature style

### Route Feel

- The new beat should read as "one more hidden old-growth nook" rather than "the next tier of a tower."
- The player should be able to return using the same short snag / perch chain they used to arrive.
- No second crossover and no new lateral bridge language in this step.

### Cue / UI Budget

- Do not add another vertical cue or a denser cue spread.
- Reuse the existing trunk visibility, perch silhouette, and `old-growth-inner-rest-light` as the only support language.

### Content Budget

- Keep biology support tiny and bark-focused.
- If the new nook needs authored life, reuse current old-growth carriers such as `tree-lungwort`, `licorice-fern`, `woodpecker-cavity`, or `pileated-woodpecker`.
- Do not open a new journal-note or comparison-content wave here.

## Suggested Test Shape

### Forest biome test

- Extend the old-growth platform / climbable expectations with one new short climbable and one new upper shelf.
- If the depth-feature bounds change, assert only the small leftward / upward extension needed for the new nook.

### Runtime smoke

- Start from the existing old-growth climb route.
- Verify the player can reach the new upper nook from the current high route without a harsh precision sequence.
- Verify the player can return to the current perch / rung chain without blind drops.

### Browser proof

- Capture one seeded screenshot from the new nook.
- The frame should still show the main trunk or a clearly readable return shelf so the route feels recoverable.

## Guardrails For Main

- No new HUD or hint surface.
- No generalized canopy rewrite.
- No cave work in this step.
- No new difficulty language; the beat should feel curious, airy, and recoverable.

## Queue Guidance

- Close `ECO-20260330-scout-83`.
- Promote `ECO-20260330-main-119` to `READY`.
- Retarget `main-119` and `critic-94` to this handoff report as the immediate source of truth for the next canopy step.
