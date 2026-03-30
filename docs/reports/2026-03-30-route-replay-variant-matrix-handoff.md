# 2026-03-30 Route Replay Variant Matrix Handoff

## Scope

Scout handoff for `ECO-20260330-scout-48`: define the smallest route-aware replay variant pass that uses live world-state seams instead of a new replay system.

## Current Read

The project already has enough authored variation to make repeat outings feel richer:

- `dayPart`
- biome-family weather
- `early` / `peak` / `late` phenology
- revisit-gated habitat `processMoments`
- route-specific nursery support rewards

What is missing is route framing that points at those windows. The simplest live seam is the active route board plus one tiny in-field notice when the player re-enters the current route biome.

## Best First Pass

Keep the pass narrow and active-route-only.

For the current active route beat:

1. detect one authored replay window from existing world-state, process, or nursery-support data
2. swap the active beat into a short variant title plus one calm supporting line
3. optionally surface the same note once on biome entry through the existing field notice strip

That gives replay value without adding another UI shell, route log, or heavier season model.

## Variant Matrix

### Coastal Shelter Line

#### `forest-study`

Best windows:

- `dawn` in `forest`
- `moisture-hold` in late `mist-drip`

Recommended note direction:

- `Dawn Hollow`: the sheltered lower lane reads clearly before the forest brightens
- `Moist Hollow`: damp late-ground cover makes the hollow comparison easier to notice

#### `coastal-comparison`

Best windows:

- `marine-haze` in `coastal-scrub`
- `sand-capture` in late revisits

Recommended note direction:

- `Haze Shift`: haze softens the open dune side, so steadier shrub cover stands out
- `Held Sand`: late trapped sand shows where cover is starting to hold ground

### Treeline Shelter Line

#### `treeline-shelter`

Best windows:

- `dawn` in `treeline`
- `frost-rime` in late `ridge-wind`

Recommended note direction:

- `Early Lee`: soft early light helps bent shelter shapes read first
- `Rime Shelter`: wind-rimed ground makes the last protected pockets easier to compare

#### `tundra-short-season`

Best windows:

- `thaw-fringe` in peak revisits
- claimed `mountain-avens` nursery support reward

Recommended note direction:

- `Thaw Window`: peak thaw makes the short bright season feel most readable
- `Fell Bloom`: the avens clue points back to open, low ground holding brief color

#### `tundra-survey`

Best windows:

- `peak` tundra bloom or berry emphasis
- `late` ridge berries only if peak is unavailable

Recommended note direction:

- `Bright Survey`: finish the inland line while the short-season ground is at its clearest

### Edge Pattern Line

#### `scrub-edge-pattern`

Best windows:

- `sand-capture` in late revisits
- `marine-haze`
- claimed `dune-lupine` nursery support reward

Recommended note direction:

- `Held Sand`: trapped sand reveals where the pioneer side is giving way
- `Haze Edge`: haze makes the shrub line feel steadier than the dune face
- `Pioneer Clue`: dune lupine still marks the more open side of the transition

#### `forest-cool-edge`

Best windows:

- `moisture-hold` in forest
- claimed `salmonberry` nursery support reward
- `dawn` fallback

Recommended note direction:

- `Moist Edge`: cool wet holdovers make the middle edge easiest to read
- `Wet Edge`: salmonberry clue points at the denser, cooler side of the route
- `Cool Start`: early light keeps the edge contrast gentle and readable

#### `treeline-low-fell`

Best windows:

- `peak` treeline bloom
- `frost-rime` late fallback
- claimed `mountain-avens` nursery support reward

Recommended note direction:

- `Brief Bloom`: avens bloom makes the low open fell easier to spot
- `Low Rime`: late rime shows where tree-shaped shelter has dropped away

## Main-Agent Targets For `main-79`

The smallest good bundle is:

1. add one pure route-replay resolver near `field-season-board`
2. let it choose a single replay note for the active beat from the matrix above
3. use that note to replace the active beat title and supporting line
4. expose the note in debug state and, if it stays calm, show it once on entry to the current route biome

## Guardrails

- Only one replay note at a time.
- Prefer active-route beats over completed-route recap.
- Prefer process-moment or world-state windows before nursery reward fallback.
- Do not add a new save field, calendar, or rotating checklist.
- Keep titles short enough to survive the station board at `256x160`.

## Queue Guidance

- `ECO-20260330-scout-48` can close with this handoff.
- `ECO-20260330-main-79` should use a small pure resolver plus one visible active-route surfacing pass, not a larger replay system.
