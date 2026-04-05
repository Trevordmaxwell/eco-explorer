# Nursery Legibility And Renderer Phase

## Summary

The latest external review says the home loop is now the weakest surface in the game:

- the nursery or teaching-bed page is the first place where the handheld frame clearly breaks
- overlap undercuts the otherwise calm station shell
- the next best push is home-base legibility and payoff, not more geography

Lane 1 should own the structural part of that fix:

- guarantee zero overlap in nursery states at `256x160`
- hard-cap the nursery card layout by state
- extract a dedicated nursery-page renderer the same way the routes page was split out

## Goals

- make the nursery page read cleanly at the handheld target size
- split nursery rendering out of the large overlay coordinator
- protect the station shell from another copy-heavy pileup

## Wave Shape

### Step 1

- prepare a nursery legibility audit and renderer-split handoff

### Step 2

- implement a dedicated nursery-page renderer plus overlap-proof state layouts

### Step 3

- review whether stocked through mature nursery states now fit cleanly

### Step 4

- prepare one follow-on layout handoff for any remaining crowded state

### Step 5

- implement one compact nursery layout follow-on without widening the shell

### Step 6

- review whether the nursery page is now as readable as the routes page

## Guardrails

- do not add another station page or dashboard seam
- do not solve overlap by shrinking the font or truncating runtime text silently
- keep the nursery page compact, state-based, and shell-safe
