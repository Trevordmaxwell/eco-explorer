# 2026-03-31 Forest Giant-Tree Destination Loop Handoff

Prepared `ECO-20260331-scout-96` against packet `046`, the lane-3 brief, the current `forest` old-growth geometry, the live crown-rest implementation, and the existing browser proofs in `output/scout-88-giant-tree/current-top-route.png` and `output/main-126-browser/crown-rest.png`.

## Current Read

The forest giant-tree side is now strong enough to feel special:

- `old-growth-main-trunk` cleanly starts the climb
- `old-growth-upper-snag` and `old-growth-canopy-rung` make the upper path legible
- `old-growth-crown-rest` finally gives the route a true sheltered arrival
- `old-growth-inner-bark-snag` still keeps the return recoverable

What it still lacks is a more deliberate post-arrival shape. Right now the route reads as:

1. climb up
2. reach crown rest
3. step off and catch the nearest return seam

That is fair, but it is still closer to “good endpoint with a safe descent” than “small destination loop inside the giant tree.”

## Recommendation

Treat `main-134` as one compact crown-to-interior loop pass, not another height spike.

The safest next shape is:

- keep the current ascent exactly as it is
- keep `old-growth-crown-rest` as the high arrival
- spend the new budget on one clearer, intentional down-route inside the same canopy/trunk silhouette
- let that down-route reconnect to the existing inner-bark rest and bark shelf family so the space feels like a looped destination rather than a dead-end perch

## Why This Specific Move

- The top-left frame is already near its vertical safe-area ceiling. Another upper shelf would cost readability faster than it would add wonder.
- The current geometry already has the right ingredients for a loop: `old-growth-crown-rest`, `old-growth-crown-window`, `old-growth-inner-bark-rest`, and `old-growth-inner-bark-snag`.
- What is missing is not more height. It is one more intentional landing so the player feels like they can arrive, look around, and fold back through the tree instead of simply reversing the last climb.

## Option Comparison

### Option 1. Build one compact crown-to-interior loop

What it is:

- keep `crown-rest` as the arrival
- make the crown-window / inner-bark side into a more deliberate return lane
- reconnect to the current inner-bark rest and descent path

Pros:

- improves destination feel without adding more screen-height pressure
- reuses the current recovery language
- keeps the route inside the giant-tree silhouette instead of drifting toward the treeline lip

Tradeoffs:

- needs careful shelf sizing so it reads as intentional, not like a slightly larger accidental landing

Assessment:

- best option

### Option 2. Add another top shelf or another outward lookout

What it is:

- extend the route farther across the top edge or farther right

Pros:

- immediately feels “bigger”

Tradeoffs:

- spends the little remaining headroom in the most crowded part of the screen
- risks making the destination read like a corridor continuation again
- blurs the distinction between giant-tree shelter and treeline travel

Assessment:

- reject

### Option 3. Add a larger trunk-interior descent all the way to the floor

What it is:

- open a much longer inside-the-tree return path

Pros:

- could feel dramatic

Tradeoffs:

- too large for this packet
- risks turning the current calm proof into a bigger traversal shell
- better saved for a later dedicated forest-expedition wave

Assessment:

- reject

## Proposed Shape For `main-134`

### Geometry

- Stay inside the existing old-growth band around `x ≈ 648-748` and `y ≈ 14-58`.
- Do not add new route height above `old-growth-crown-rest`.
- Prefer one compact new shelf or one meaningful enlargement/reposition of `old-growth-crown-window` so it becomes a real return landing rather than a tiny side perch.
- Reuse `old-growth-inner-bark-snag` as the main descent seam if possible.
- If a new climbable is absolutely needed, keep it short, local, and obviously part of the same crown/interior return, not a second ascent route.

### Route Feel

The ideal route language should become:

1. root log
2. main trunk ascent
3. upper snag / canopy rung
4. crown rest arrival
5. tucked crown-window or inner-crown landing
6. inner-bark rest
7. bark shelf or lower old-growth floor

That makes the giant tree feel more outing-like: the player arrives somewhere special, then folds back through the tree in a readable way.

### Recovery And Fairness

- The new loop should not require a blind leap.
- Missing the post-arrival step should still drop the player onto an existing upper platform or a current climb seam, not all the way to the forest floor.
- Keep `old-growth-inner-bark-snag` readable as the main return catch.
- Reuse the current tiny cue language only if one tiny support is needed; avoid adding another label, sign, or stronger marker family.

### Place Feel

- The arrival should remain the quiet highest shelter.
- The new interior landing should feel tucked inside bark and canopy, not like another outward ledge facing the corridor.
- If one biology anchor is needed to sell the spot, reuse the current old-growth carriers (`tree-lungwort`, `old-mans-beard`, `licorice-fern`) rather than opening a larger content pass.

## Suggested Acceptance For `main-134`

- the giant-tree route now has one clearer destination loop, not just an endpoint
- the loop stays inside the current canopy/trunk silhouette
- the return remains recoverable on the current handheld screen
- the pass stays inside one tiny shelf / landing and one tiny return-beat scale

## Test Suggestions

- extend `runtime-smoke` from the current crown-rest route to:
  - reach `old-growth-crown-rest`
  - continue into the new deliberate return landing
  - confirm the player can still recover through the inner-bark seam without a harsh drop
- update `forest-biome` only if the new shelf or return landing needs a structural guard
- re-run a seeded browser pass where both the arrival and the first return landing read in the same old-growth frame

## Queue Guidance

- Close `ECO-20260331-scout-96`.
- Promote `ECO-20260331-main-134` to `READY`.
- Update `ECO-20260331-main-134` and `ECO-20260331-critic-107` to use this handoff as the immediate source report.
