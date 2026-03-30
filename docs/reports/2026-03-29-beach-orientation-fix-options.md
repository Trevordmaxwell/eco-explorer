# 2026-03-29 Beach Orientation Fix Options

## Problem

The current live beach strip runs from inland dunes to shoreline as the player moves left to right, while `coastal-scrub` runs from back-dune toward forest edge in the same left-to-right direction.

So the live beach right edge is the wrong ecological side for a direct corridor into `coastal-scrub`.

## Options

### Option 1: Dedicated seam scene with mirrored beach edge

Build the first corridor proof as its own travel seam scene.

- origin half uses a mirrored beach `dune-edge` slice
- destination half uses the normal `coastal-scrub` `back-dune` slice
- live beach and live world-map doors remain unchanged

Pros:

- lowest risk to the current save model and journal identity
- does not force a live beach rewrite
- isolates corridor complexity to one proof seam
- easiest way to keep the map, existing doors, and current biomes stable

Cons:

- adds one travel-specific scene concept
- requires a little seam-specific content composition instead of pure biome reuse

### Option 2: Travel-only beach corridor variant biome

Create a second beach-flavored travel variant that is inland-facing and only used for corridor entry/exit.

- could reuse most beach data with alternate orientation and edge rules
- corridor enters from that variant instead of the live beach strip directly

Pros:

- keeps the corridor logic somewhat biome-shaped
- may make later corridor tooling feel more uniform

Cons:

- duplicates beach-facing data or asks for variant-specific overrides
- increases the risk of drift between live beach and corridor beach content
- pushes more biome identity complexity into save, testing, and docs than the first proof needs

### Option 3: Reorient the live beach biome itself

Rewrite the live beach so its right edge is inland-facing.

Pros:

- one less travel-specific seam concept if it worked

Cons:

- highest risk by far
- would disturb current travel doors, biome feel, and player expectations
- likely forces updates to art read, zone layout, tests, and browser baselines
- touches live runtime behavior that is already stable

## Recommendation

Choose Option 1.

The dedicated seam scene is the least risky path because it solves the orientation mismatch locally without destabilizing:

- the current beach level
- the world map
- the current save model
- current journal and discovery behavior
- the active living-world implementation lane

It also matches the broader corridor recommendation already in packet `019`: the first proof should be a narrow adjacent seam, not a rewrite of the whole route structure.

## Why Not Option 2

Option 2 is workable, but it adds variant-biome overhead before the project has even proven that the corridor is worth generalizing. It turns a travel proof into a content-maintenance problem too early.

## Why Not Option 3

Option 3 spends risk on the stable live game just to make the proof feel cleaner architecturally. That is the wrong trade for a first corridor experiment.

## Queue Outcome

`main-46` should explicitly prefer the dedicated seam scene approach.

If the first proof succeeds and the project later wants a more formal corridor content system, the team can revisit whether a reusable travel-variant pattern is worth introducing after critique.
