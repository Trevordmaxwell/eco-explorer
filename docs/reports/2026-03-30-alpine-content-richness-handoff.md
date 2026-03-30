# 2026-03-30 Alpine Content Richness Handoff

## Scope

Scout handoff for `ECO-20260330-scout-55`: prepare the second lane-2 content-richness pack for `treeline` and `tundra`.

## Current Read

The alpine half already has a good backbone:

- `mountain-avens`, `crowberry`, and `arctic-willow` now support real treeline-to-tundra comparisons.
- `treeline` already teaches bent trees, wind-shaped shelter, and low fell bloom.
- `tundra` already teaches short-season bloom, low growth, and thaw timing.

What still feels lighter than the coast is the amount of living texture inside those alpine zones once the first comparison pair is unlocked. The safest next move is another compact authored pack that stays in content-owned files and deepens:

- evergreen berry mats across both alpine biomes
- heath-like ground cover on the treeline fell
- sedge-tussock structure in tundra meadow and thaw-edge ground

## Recommended Pack Shape

This is an inference from the official sources below: `lingonberry`, `white arctic mountain heather`, and `Bigelow's sedge` are the strongest fit for the live alpine branch because they are all directly supported in arctic-alpine or tundra descriptions, and together they deepen shrub-mat, heath, and tussock structure without colliding with the current expedition lane.

### 1. Add one shared alpine berry anchor

Best addition:

- `lingonberry` (`Vaccinium vitis-idaea`) as a shared entry between `treeline` and `tundra`

Why this is the right shared carrier:

- Denali lists it among abundant alpine species, and USFS FEIS supports it as a native northern shrub that occurs through tundra communities.
- It adds a second alpine berry signal that is distinct from both `crowberry` and `mountain-avens`.
- It is a clean later comparison candidate without needing a new system now.

Placement guidance:

- `treeline`: `dwarf-shrub` first, with a lighter touch in `lichen-fell`
- `tundra`: `snow-meadow` berry patches first, with a lighter touch on `frost-ridge`

### 2. Add one treeline heath-mat carrier

Best addition:

- `white-arctic-mountain-heather` (`Cassiope tetragona`) in `treeline`

Why this is the right treeline-side addition:

- Denali lists it among abundant alpine species, and Wrangell-St. Elias describes alpine areas characterized by heaths, principally `Cassiope tetragona`.
- It deepens the treeline fell visually without repeating another shrub or tree story.
- It gives the treeline half a calmer, more mat-like alpine identity that still reads separate from tundra sedge ground.

Placement guidance:

- favor `dwarf-shrub` and `lichen-fell`
- keep it low and patchy so the fell still reads open

### 3. Add one tundra ground-structure carrier

Best addition:

- `Bigelow's sedge` (`Carex bigelowii`) in `tundra`

Why this is the right tundra-side addition:

- Denali lists it among abundant alpine species, and NPS Arctic tundra guidance explicitly describes tussock-forming sedges like Bigelow's sedge mixed with low shrubs and protecting soil and permafrost.
- It deepens the live `snow-meadow` and `thaw-skirt` spaces with more than bloom timing alone.
- It gives `northern-collared-lemming` and `cottongrass` a stronger habitat-structure context.

Placement guidance:

- favor `snow-meadow` and `thaw-skirt`
- treat it as low tussock structure, not tall wetland grass

## Ecosystem Note Targets

### Treeline

Add one new note around heath and berry mats.

Best note target:

- `white-arctic-mountain-heather`
- `lingonberry`
- `bog-blueberry` or `mountain-avens`

Main lesson:

- low alpine heaths and berry mats can share sheltered ground just below the most exposed fell

### Tundra

Add one new note around tussock ground.

Best note target:

- `Bigelow's sedge`
- `cottongrass`
- `northern-collared-lemming`

Main lesson:

- sedge tussocks and wet meadow plants build raised, springy ground that protects soil and helps tiny tundra animals move through cover

## What `main-87` Should Do

The cleanest implementation bundle is:

1. add `lingonberry` as a shared alpine entry across `treeline` and `tundra`
2. add `white-arctic-mountain-heather` to `treeline`
3. add `Bigelow's sedge` to `tundra`
4. add one new ecosystem note in `treeline` and one in `tundra`
5. update the science ledger and alpine content tests
6. if `src/test/content-quality.test.ts` still hard-codes the old field-request count, refresh that assertion while verifying the pack so the lane's guardrail suite is green again

## What `main-87` Should Not Do

- do not reopen route-board or expedition logic
- do not add new field requests
- do not expand the comparison allowlist yet
- do not add new close-look payloads yet
- do not lean harder on `purple-saxifrage` as the main new anchor until its wording is backed by stronger direct bloom-timing sourcing

## Best Later Candidates For `main-88`

Source-backed later targets from this alpine pack:

- comparison: `lingonberry`, if the treeline and tundra notes both land cleanly
- comparison: `Bigelow's sedge`, only if a later tundra note and a second alpine-ground note give it real cross-habitat contrast

This pass should stay focused on making the alpine shrub-mat and tussock structure more real before opening more journal affordances.

## Sources

- [Denali abundant alpine species](https://www.nps.gov/dena/learn/nature/abundant-plant-species.htm)
- [Lingonberry at Western Arctic National Parklands](https://www.nps.gov/places/lingonberry-at-western-arctic-national-parklands.htm)
- [USFS FEIS on lingonberry](https://research.fs.usda.gov/feis/species-reviews/vacvit)
- [Fire in Ecosystems: Arctic Tundra](https://www.nps.gov/articles/000/fire-in-ecosystems-arctic-tundra.htm)
- [Plant Communities of Wrangell-St. Elias](https://www.nps.gov/wrst/learn/nature/plants-communities.htm)

## Queue Guidance

- `ECO-20260330-scout-55` can close with this handoff.
- `ECO-20260330-main-87` can move forward once this report is linked because `ECO-20260330-critic-63` already reviewed the coastal-first half of the lane cleanly.
