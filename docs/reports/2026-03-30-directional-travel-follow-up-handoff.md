# 2026-03-30 Directional Travel Follow-Up Handoff

## Scope

Complete `ECO-20260330-scout-72` and narrow `ECO-20260330-main-108` to one last compact travel-coherence pass.

## Summary

`main-107` fixed the biggest trust issues. Travel now points to the right places, same-biome cancel uses stable interior anchors, and the world-map footer teaches the coast-to-inland chain instead of only habitat flavor.

The remaining roughness is smaller and more specific:

- menu-open world map still enters as an immediate mode jump while post-open world map uses the authored biome-to-map travel framing
- once map focus moves away from the current location, the UI makes the destination clear but leaves the origin readable mostly through the avatar icon alone

That is a good fit for one last directional pass before lane 1 moves on. It does not justify pulling the broader regional approach packet forward.

## Findings

### 1. Menu-open map still bypasses the authored exit framing

The first pass made same-biome cancel consistent, but the entry path still differs.

- `startWorldMapExitTransition()` uses the authored post or preferred return anchor and plays the staged biome-to-map transition
- `openWorldMapDirect()` still jumps straight to `sceneMode = 'world-map'`

That means the player can still enter the same map in two very different ways:

- walking to the post feels spatial and authored
- using the menu feels like a mode switch

This is now the clearest remaining coherence gap in the travel loop.

### 2. Split origin and focus is under-explained on the world map

The current map footer is directionally better, but it only speaks for the focused destination.

Grounding from the live capture set:

- `output/lane-1-main-107-live/map-footer-state.json` shows `currentLocationId: "beach"` and `focusedLocationId: "forest"`
- the screenshot in `output/lane-1-main-107-live/map-footer.png` makes `FOREST TRAIL` very clear
- the current/origin biome is still readable, but mostly through the avatar standing on the beach door

That is probably enough once the player already trusts the map, but it is still the main point where a first-time player has to infer "I am leaving from here, but looking there."

## Recommended `main-108` Pass

Keep `main-108` to two linked changes:

1. When the player opens `World map` from the field menu in a corridor-enabled biome, route that action through the same preferred interior `mapReturnPost` transition framing instead of jumping directly into map mode.
2. Add one tiny current-origin reminder on the world map when focus moves away from the current location, using an existing HUD or footer seam instead of a new panel.

Good examples:

- `FROM SUNNY BEACH`
- `RETURN: COASTAL SCRUB`
- `LEAVING FOREST TRAIL`

The exact wording can stay short and test-backed. The important part is that the player can read both:

- where they are standing now
- where the current map focus would take them

## Keep Out Of Scope

Leave these for packet `036`:

- richer regional approach warmth
- calmer flavored map-return-post treatment
- next-district or second-season invitation copy
- any larger navigation HUD, planner, or route catalog

This follow-up should finish directional coherence, not start the next travel phase early.

## Verification For `main-108`

- add runtime coverage showing menu-open world map now uses the preferred biome-to-map transition framing when a `mapReturnPost` exists
- add runtime or render coverage for the tiny origin reminder when `currentLocationId !== focusedLocationId`
- capture one browser state showing the split-origin map case and confirm the origin reminder reads clearly without crowding the footer

## Queue Guidance

- Close `ECO-20260330-scout-72`.
- Promote `ECO-20260330-main-108` to `READY`.
- Keep `ECO-20260330-critic-83` blocked until the follow-up lands.
