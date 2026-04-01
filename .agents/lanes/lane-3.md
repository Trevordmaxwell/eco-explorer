# Lane 3: Vertical Traversal And Sub-Ecosystems

## Purpose

Lane 3 is the vertical traversal lane.

It exists so one agent can push caves, giant trees, and climbable exploration depth without colliding with the station and route structure work in lane 1.

It owns:

- climbable runtime expansion
- taller tree and trunk traversal spaces
- deeper cave layering and chamber structure
- canopy, trunk, hollow, and cave-adjacent sub-ecosystems
- traversal readability for taller and deeper spaces

## Preferred Write Scope

- traversal and climb helpers in `src/engine/**`
- biome geometry and traversal slices in `src/content/**`
- render helpers tied to cave and tree depth
- focused runtime and biome tests for traversal and spatial readability

## Avoid When Possible

- field-station shell changes
- route-board logic
- nursery systems
- broad journal-only content work
- economy or reward-layer expansion unless explicitly queued

If lane 3 discovers a progression or station need, leave a handoff for lane 1 instead of absorbing it.

## Current Focus

Lane 3 should turn the current cave and climbable proofs into deeper, more magical vertical exploration:

- expedition-grade giant-tree spaces
- deeper cave pockets and recoverable chamber families
- readable canopy, trunk, hollow, and cavern sub-ecosystems
- cozy exploration, not danger
- quiet wayfinding supports instead of a bigger traversal HUD
- realistic-enough scale cheats when they improve wonder and play

## Success Condition

Lane 3 should make the world feel taller, deeper, and more surprising while staying readable, science-forward, and fun at the current screen scale.
