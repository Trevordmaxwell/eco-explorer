# Pre-Expansion Controller Protection Phase

## Summary

The project now has enough authored content that large coordinator files are the main structural risk. Before another major chapter wave, lane 1 should buy down that risk with more targeted splits out of the biggest files instead of waiting until the next expansion makes every change harder.

## Goals

- keep reducing concentration inside `game.ts`, `overlay-render.ts`, and `field-season-board.ts`
- extract pure derivation or composition seams before they turn into surgery
- preserve the current product behavior, save safety, and handheld shell

## Wave Shape

### Step 1

- prepare the next route-notice or feedback-state split handoff

### Step 2

- implement one focused extraction from the biggest coordinator seam

### Step 3

- review whether the split reduces risk without leaking behavior

### Step 4

- prepare one focused field-season-board composition split handoff

### Step 5

- implement the next board-state or board-copy composition extraction

### Step 6

- review whether the board split keeps the shell stable while shrinking the risk surface

## Guardrails

- do not redesign the product during the split
- do not widen station UI or route logic in the name of refactor
- prefer pure helpers and state composers over broad abstractions
