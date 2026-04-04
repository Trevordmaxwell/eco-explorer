# 2026-04-04 Stronger Home-Place Transformation Handoff

Prepared `ECO-20260404-scout-253` against packet `103`.

## Recommendation

Spend `main-253` on the existing field-station lower shell seam again, not on more nursery copy or a new station strip.

The live station already has the right transformation seam, but it still reads a little too tiny in the settled frame. The next gain should be a stronger grounds-level payoff that uses the same lower sill and planter line while letting season progress show up as a more obviously settled threshold on both `SEASON` and `NURSERY`.

## Best Main-Agent Slice For `main-253`

Keep the work focused in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) plus focused tests and handheld browser proof.

Recommended implementation shape:

1. Extend the existing field-station growth accent helper instead of inventing a second shell surface.
2. Keep nursery state driving the center planter fullness:
   - teaching-bed stage
   - unlocked `log-pile`
   - unlocked `pollinator-patch`
   - compost utility upgrade
3. Add one route-earned settlement read on the same lower seam using station-facing progress that already exists:
   - logged route count from the field atlas
   - season-close or next-season continuity state only if needed as a final capstone threshold
4. Use that progress to add small side-ground accents on the same sill line:
   - first logged route: one tucked side patch or paver group
   - second logged route: a mirrored partner accent
   - third logged route or filed-season cap: a slightly more connected threshold read across the same lower edge
5. Keep the rest of the station unchanged. No new subtitle, footer, or planner row.

## Visual Direction

Aim for “the station grounds are getting more settled,” not “there is another decorative badge.”

Good target family:

- a few low pavers, edging blocks, or planted tufts attached to the current sill line
- left and right accents that grow in as routes are filed
- the existing center planter remaining the nursery-driven focal point

This should feel like route learning is changing the home place itself, not only the nursery bed.

## Why This Seam

- It stays on the exact home-place seam the last two lane-1 reviews approved.
- It makes season progress visible even when the player opens on `SEASON -> ROUTES`, where more of the current loop lives.
- It avoids spending the mature teaching-bed card's remaining text budget.
- It gives the station a stronger settled frame without pushing lane 1 into a new page, map pulse, or copy-heavy recap.

## Keep Out Of Scope

- no new station page, recap strip, or footer row
- no new nursery text line
- no world-map motion or route-board copy rewrite
- no animation-heavy pass beyond the existing arrival settle

## Verification Target For `main-253`

- focused helper proof for an early station versus a more advanced filed-route station
- browser captures at `256x160` showing the stronger lower-shell read on:
  - `SEASON -> ROUTES`
  - `NURSERY`
- `npm run build`

## Queue Guidance

- Close `ECO-20260404-scout-253` as done.
- Promote `ECO-20260404-main-253` to `READY`.
