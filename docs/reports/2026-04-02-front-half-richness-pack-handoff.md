# 2026-04-02 Front-Half Richness Pack Handoff

## Scope

Scout handoff for `ECO-20260402-scout-110`: prepare `ECO-20260402-main-148` so the next lane-2 pass deepens `beach` and `coastal-scrub` without reopening traversal, corridor, or station work.

## Current Read

The first coastal-front richness wave already landed the strongest tide-line and thorny-thicket anchors:

- `sand-dollar-test` now gives the beach a washed-shore clue that is visually memorable.
- `nootka-rose` now gives `coastal-scrub` and early `forest` a real thorny-cover carrier.
- `red-huckleberry` already helped the coast-facing forest edge.

The lighter spots are now elsewhere.

This is an inference from the current biome content, spawn-table density, and note coverage in `src/content/biomes/beach.ts` and `src/content/biomes/coastal-scrub.ts`:

- `beach` is already busy at the `tide-line`, but its `dry-sand` side still leans mostly on the same shared dune pair.
- `coastal-scrub` is already rich in `shrub-thicket` and `windbreak-swale`, but `shore-pine-stand` still lacks both a distinctive understory anchor and its own ecosystem note.

So the best second front-half pack is not “more shells” or “more thicket density.” It is one upper-dune runner plus one shore-pine underlayer.

## Best Pack Shape

### 1. Add one new shared upper-dune runner

Best addition:

- `beach-pea` or `silky-beach-pea` — `Lathyrus littoralis`

Why this is the right front-half shared carrier:

- Point Reyes directly identifies beach pea as part of a native Pacific foredune habitat alongside American dunegrass.
- USFS coastal-scrub guidance lists silky beach peavine with Pacific dune and coyote-brush associates, so it can bridge `beach` and `coastal-scrub` cleanly.
- It adds a new silhouette and teaching role to the opening biomes without turning the coast into more shell clutter.

Placement guidance:

- `beach`: `dry-sand` first, light touch in `dune-edge`
- `coastal-scrub`: `back-dune` first, optional lighter touch in `windbreak-swale`

Teaching role:

- use it as a low runner with tendrils that helps exposed sand start holding steadier plant cover
- do not frame it as a dominant dune-builder that replaces `beach-grass`

### 2. Add one scrub-only shore-pine underlayer

Best addition:

- `kinnikinnick` — `Arctostaphylos uva-ursi`

Why this is the right scrub-side addition:

- Forest Service dune habitat guidance explicitly places mats of kinnikinnick in Pacific sand dunes with scattered lodgepole or shore pine.
- It gives `shore-pine-stand` a memorable low evergreen layer instead of leaving that zone as mostly trunks and one bird pass.
- It broadens front-half plant shape and color without turning the scrub into another tall berry-thicket.

Placement guidance:

- `coastal-scrub`: `shore-pine-stand` first, with only a light edge touch in `forest-edge`

Teaching role:

- use it as a low evergreen mat showing that the sand is holding longer-lived cover beneath the pines
- do not turn it into another forest shrub or a heavy berry lesson

## Ecosystem Note Targets

### Beach

Add one `dry-sand` note around low runners and early shelter.

Best note target:

- `beach-grass`
- `sand-verbena`
- `beach-pea`

Main lesson:

- the first protected dune band is still low to the ground, and different plant shapes share the job of hanging onto exposed sand

### Coastal Scrub

Add the first `shore-pine-stand` note.

Best note target:

- `shore-pine`
- `kinnikinnick`
- one existing local carrier such as `song-sparrow` or `beach-strawberry`

Main lesson:

- under the shore pines, low mats and quieter cover show sand that stays steadier than the open dune behind

## What `main-148` Should Do

1. Add `beach-pea` as a new shared coastal-front entry in `src/content/shared-entries.ts`.
2. Add `kinnikinnick` as a new `coastal-scrub` entry in `src/content/biomes/coastal-scrub.ts`.
3. Update `beach` spawn tables so the new richness lands mostly in `dry-sand`, not the already-busy `tide-line`.
4. Update `coastal-scrub` spawn tables so the new richness lands mostly in `shore-pine-stand`, not more `shrub-thicket` density.
5. Add one new compact ecosystem note in `beach` and one in `coastal-scrub`.
6. Update `docs/science-source-ledger.md` and focused `beach`, `coastal-scrub`, `ecosystem-notes`, and `content-quality` coverage.

## What `main-148` Should Not Do

- do not add more tide-line shell or wrack clutter
- do not add another tall scrub shrub just because the zone feels light
- do not reopen comparison allowlists, close-look payloads, or sketchbook payoffs yet
- do not widen the pass into `forest`, corridor, route, station, or world-map work

## Best Later Candidates For `main-149`

Later memory-payoff candidates from this pack:

- `beach-pea` as a compact front-half sketchbook or comparison candidate if both local notes land cleanly
- `kinnikinnick` as a compact sketchbook candidate if the shore-pine underlayer art reads clearly at handheld scale

This later step should stay inside an existing surface, but `main-148` should first make the content itself real.

## Science Grounding

- [Point Reyes sand dunes](https://www.nps.gov/pore/learn/nature/sanddunes.htm)
- [USFS coyote brush review](https://www.fs.usda.gov/database/feis/plants/shrub/bacpil/all.html)
- [OSU Point Reyes kinnikinnick profile](https://landscapeplants.oregonstate.edu/plants/arctostaphylos-uva-ursi-point-reyes)
- [USFS Pacific Northwest butterfly habitat review with kinnikinnick dune mats](https://andrewsforest.oregonstate.edu/pubs/pdf/pub4316.pdf)
