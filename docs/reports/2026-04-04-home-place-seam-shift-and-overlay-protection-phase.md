# Home-Place Seam Shift And Overlay Protection Phase

## Summary

The station sill now reads well, but the latest review and follow-up critique both point to the same constraint:

- the sill is the current visual-payoff ceiling for the home place
- the game still needs more visible return payoff
- `overlay-render.ts` remains one of the biggest coordinator files

Lane 1 should now move to a different compact station seam for visible payoff, then keep buying down overlay risk before another bigger content wave lands.

## Goals

- make the station or nursery feel more visibly changed without spending more of the sill seam
- keep the home place warm and compact
- reduce concentration inside `overlay-render.ts` through one focused extraction

## Wave Shape

### Step 1

- prepare a non-sill home-place payoff handoff

### Step 2

- implement one compact visual transformation pass on a different station seam

### Step 3

- review whether the new payoff feels earned without widening the shell

### Step 4

- prepare one overlay-render protection handoff

### Step 5

- extract one pure station or board render seam from `overlay-render.ts`

### Step 6

- review whether the render split reduces risk while keeping visuals stable

## Guardrails

- do not add another station page, row, or planner shell
- do not widen the lower sill family any further
- prefer pure render/composition helpers over broad abstraction
