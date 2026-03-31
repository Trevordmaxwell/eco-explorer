# 2026-03-30 Second-Season District Invitation Handoff

## Scope

Complete `ECO-20260330-scout-80` and narrow `ECO-20260330-main-116` to one calm next-season invitation pass.

## Summary

The right seam for the next-season invitation is already live:

- the routes page files the season into `SEASON ARCHIVE`
- the logged `ROOT HOLLOW` card carries one tiny footer teaser
- the world map now has stronger regional language through `INLAND MAP`, `HIGH PASS`, and `HIGH COUNTRY`

That means `main-116` should not add another station surface or a new map cue. It should simply make the existing invitation more concrete and more spatially grounded.

## Findings

### 1. The current teaser is the right surface, but the copy is too long

The logged expedition footer on the expedition page is still the cleanest place for the outward pull:

- it is already the one explicit forward-facing seam
- it stays secondary to the main `ROOT HOLLOW` card
- it avoids reopening the routes page or nursery

But the current text, `Follow the inland approach beyond Forest Trail.`, is at the handheld text-budget edge and visually crowds the footer strip.

### 2. The new travel language already gives the next season a stronger place identity

`main-115` made the map and posts feel region-aware:

- `forest` now points to `INLAND MAP` / `INLAND APPROACH`
- `treeline` now points to `HIGH PASS MAP` / `HIGH PASS`
- `tundra` now points to `HIGH COUNTRY MAP` / `HIGH COUNTRY`

That vocabulary is now the best source for the next-season invitation. The station should echo it instead of inventing a second naming scheme.

### 3. The smallest useful implementation is a shorter region-led teaser

`main-116` should stay focused on the logged expedition teaser only.

Recommended implementation shape:

1. Keep the teaser on the logged `ROOT HOLLOW` expedition card.
2. Replace the current sentence with one shorter region-led invitation that echoes the map language.
3. Prefer deriving the wording from the already-authored `treeline` approach language, or at minimum keep the copy aligned with that region family.

Good target energy:

- `NEXT FIELD SEASON`
- `Take the High Pass next.`

That keeps the invitation concrete, short, and spatially believable without turning it into a planner.

## Keep Out Of Scope

Leave these out of `main-116`:

- new station panels or route cards
- another map HUD strip
- a second nursery clue
- broader route-marker or progression rewrites
- a larger district-selection or chapter-selection surface

The map side of this invitation is already carried by the live regional labels and approach cues. This pass only needs to make the station echo that language cleanly.

## Verification For `main-116`

- update focused expectations in `src/test/field-season-board.test.ts`
- update the season-close expedition expectation in `src/test/runtime-smoke.test.ts`
- capture one seeded field-station expedition browser state after season close to confirm the teaser fits cleanly at `256x160`

## Queue Guidance

- Close `ECO-20260330-scout-80`.
- Promote `ECO-20260330-main-116` to `READY`.
- Keep `ECO-20260330-critic-91` parked until the teaser pass lands.
