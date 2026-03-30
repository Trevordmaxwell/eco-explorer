# 2026-03-29 Hybrid Corridor Travel Handoff

## Recommendation

Keep `beach <-> coastal-scrub` as the first continuous-travel proof, but implement it as a short dedicated corridor seam instead of wiring the current live biome exits directly together.

Recommended first shape:

- use a corridor strip around `256` world units wide
- reserve about `160` world units in the middle as the visible blend band
- leave a short anchor slice on each side so the player can still read a clear origin and destination habitat
- use one centered biome-ownership threshold inside the corridor so art can blend gradually while game state stays understandable

This stays compatible with the current `640`-wide seeded biome strips, the single-`lastBiomeId` save model, and the `192x144` viewport.

## Why This Pair Is Still Safest

- It is already the science-aligned Pacific coastal branch.
- The edge zones already line up well in scale: `beach` uses a `146`-unit `dune-edge`, and `coastal-scrub` uses a `150`-unit `back-dune`.
- The shared edge species are already authored: `beach-grass`, `sand-verbena`, and `sea-rocket`.
- The corridor can teach facilitation clearly through dune shelter, shrub density, and soil stabilization without a harsh palette jump.

## Important Orientation Risk

The current live biome strips do not face the corridor the same way:

- `beach` runs `dune-edge -> dry-sand -> tide-line -> tidepool` from left to right
- `coastal-scrub` runs `back-dune -> shrub-thicket -> shore-pine-stand -> forest-edge` from left to right

That means the current `beach` right edge is the ocean-facing side, not the inland edge that should connect to `coastal-scrub`.

So the first proof should not directly connect the live `beach` right-side door to `coastal-scrub`.

Safest recommendation:

- build the first proof as a corridor-specific seam scene
- compose the origin half from a mirrored `beach` dune-edge slice
- compose the destination half from the normal `coastal-scrub` back-dune slice

That keeps the live beach biome, current map route, and current save behavior stable while still proving the walkable-gradient idea.

## Corridor Shape

### Visual blend

The blend band should start as soon as the player enters the corridor, not only at the state handoff.

Inside that band:

- start with beach-weighted decor and terrain on the origin side
- drift toward shared dunes and mixed scrub in the middle
- end with denser shrub and inland texture cues on the destination side

Recommended first content mix:

- origin side emphasis: `beach-grass`, `sand-verbena`, flatter dune terrain, lighter haze
- middle emphasis: `beach-grass`, `sand-verbena`, `sea-rocket`, first `dune-lupine`, slightly rising terrain
- destination side emphasis: `dune-lupine`, more scrub density, darker ridge/parallax drift, less open sand

### Biome-ownership threshold

Use one centered threshold in the corridor and keep ownership stable until the player crosses it.

Before the threshold:

- origin biome owns journal context
- origin biome owns field-guide biome and zone context
- origin biome owns weather family, ecosystem-note context, and `lastBiomeId`

After the threshold:

- destination biome owns all of those systems

Do not create a separate saved `corridor` biome id in the first pass. The corridor should be a travel seam, not a new permanent habitat identity in save data.

## Map-Return Recommendation

Do not crowd the first proof with extra travel posts inside the corridor band.

For `main-46`:

- keep the world map alive, but let the proof focus on the corridor seam itself
- do not place a map-return post directly on the corridor threshold
- keep any map interaction outside the blend band

For `main-48` later:

- move toward one authored map-return post per corridor-enabled biome, not one post per edge
- place each post in a stable interior zone, roughly `96-128` world units away from the corridor threshold
- avoid placing posts inside shared-species blend bands, on narrow ledges, or where they compete with inspectables

That keeps map access practical without turning every habitat edge into a sign cluster.

## Compatibility Notes

- The corridor proof should derive from the existing world seed plus an adjacent-pair id such as `beach:coastal-scrub`, not from ad hoc random state.
- The first proof should sample authored edge windows from existing biome definitions rather than mutating both biome data sets into one merged strip.
- Journal progress, discoveries, prompts, and world-state effects should continue resolving from one biome at a time through the ownership threshold.
- The corridor should stay readable in one `192x144` screen without requiring HUD labels to explain which side currently owns state.

## Queue Outcome

`ECO-20260329-scout-25` can close.

`ECO-20260329-main-46` should be read more narrowly as:

- prototype a dedicated `beach <-> coastal-scrub` seam scene
- use about a `160`-unit visible blend band inside a `256`-unit proof corridor
- switch biome ownership once at the centered threshold
- avoid direct wiring from the current beach right-side exit

`ECO-20260329-main-48` should be read more narrowly as:

- add one calm map-return post per corridor-enabled biome
- place those posts in stable interior terrain, not inside the blend band itself
