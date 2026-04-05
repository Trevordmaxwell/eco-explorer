# 2026-04-05 Nursery Legibility And Renderer Handoff

Prepared `ECO-20260405-scout-271` against packet `112`.

## Recommendation

Narrow `ECO-20260405-main-271` to the inline `NURSERY` page body inside `drawFieldStationOverlay(...)` and extract it into a sibling helper such as `src/engine/field-station-nursery-page.ts`.

The best seam is the whole nursery-only branch that currently starts after the `SEASON` early return and runs through:

- the fixed bench / compost / bed rect allocation
- the selected-project bench copy
- the compost strip and compost accent
- the active-project / mature / empty bed copy
- the route-support hint and home-place strip

That branch is already render-only, but its current fixed-height math is where the handheld break is coming from.

## Current Risk At 256x160

The overlap is structural, not just copy-length drift.

- `benchRect` and `compostRect` stay fixed while `bedRect` is capped to the remaining `40px`, so the teaching-bed card is carrying nearly every variable nursery state inside the smallest card.
- In active growth states, the route-support hint currently starts at `bedRect.y + bedRect.h - 28`, which places it above the bed title line instead of below the body copy.
- The memory line is also anchored off the footer strip, so it competes with the wrapped growth body and the home-place strip in the same narrow band.
- Mature states avoid the route clue, but they still stack the reward summary, memory summary, and footer strip tightly enough that prior handheld captures already show the lower lines colliding.

## Highest-Risk Layout Families

Treat these as the first states to protect in `main-271`:

1. Active-growth states with a route clue:
   `stocked`, `rooting`, and `growing` when `nursery.routeSupportHint` is present.
   This is the worst family because the title, two-line growth body, clue block, memory line, and footer strip all try to occupy the same bed card.

2. Mature payoff states:
   `mature` with a real `rewardSummary`, `memorySummary`, and the home-place footer strip.
   This is the state already proven to clip in earlier `256x160` nursery captures.

3. Ready-to-plant states:
   `selectedProject` with no active bed is less broken, but it still inherits the same fixed bed height and should be kept inside the new state-layout system so it does not become the next crowding point.

The empty locked state and the compost row are not the main risk. The bed card is.

## Preferred Main-271 Shape

- Keep `drawFieldStationOverlay(...)` responsible for the station shell, top tabs, subtitle, season/nursery switching, and the existing accent passes.
- Extract the nursery page body into one pure helper, mirroring the recent routes-page split.
- Inside that helper, replace the one fixed nursery stack with explicit layout families:
  - locked / no project
  - ready to plant
  - active growth
  - mature payoff
- Let the nursery helper own the bed-height rebalance and per-state sub-rects so support clue, memory line, and footer strip are never painted into the same band.
- Keep the first pass structural: preserve authored text where possible and solve the break with rect math plus state-aware composition, not font shrinking or silent truncation.

## Out Of Scope

- New station pages, tabs, or dashboard rows
- New nursery rewards or content authoring
- Rewriting the nursery copy budgets broadly; lane 2 already owns that copy wave
- Gameplay, save, timer, or input changes outside what a pure render split requires

## Verification Target For Main

- Add focused helper coverage for whatever pure nursery layout resolver or renderer seam lands
- Extend the existing runtime smoke to prove the risky nursery states, especially:
  - one active-growth state with a route clue
  - one mature state with the footer strip visible
- Run `npm run build`
- Run the shared web-game client smoke
- Capture handheld nursery proofs at `256x160` for at least the active-growth and mature states
