# Lane 4: Gameplay Loop And Route V2

## Purpose

Lane 4 is the gameplay-loop cohesion lane.

It exists so one agent can make outings feel more like a real cozy naturalist adventure without colliding with the station-shell work in lane 1, the content-density work in lane 2, or the vertical-exploration work in lane 3.

It owns:

- route semantics and Route v2 conversion work
- evidence-backed outing beats
- tiny pre-outing support choice
- station-side notebook synthesis and route completion
- soft replay windows tied to existing world-state

## Preferred Write Scope

- `src/engine/field-requests.ts`
- new Route v2 helpers in `src/engine/**`
- small route-facing additions inside existing field-station season surfaces
- save/runtime/tests tied to outing progress and notebook completion

## Avoid When Possible

- broad content-only packs that can live in lane 2
- giant-tree and cave traversal geometry that belongs in lane 3
- large station-shell restructures, season-page layout work, archive work, or travel-orientation work already owned by lane 1
- bigger inventory, loadout, or quest-log systems

If lane 4 discovers a content-only need, leave it for lane 2. If it discovers a bigger station or travel-structure need, leave it for lane 1.

## Current Focus

Lane 4 currently owns:

- Route v2 core runtime
- evidence-slot and landmark-backed requests
- the first forest pilot conversion
- one tiny outing-support choice
- one station-side notebook synthesis flow
- the first transition and inland Route v2 follow-ons
- the first expedition-as-chapter rebuild
- the pre-playthrough `ROOT HOLLOW` follow-up with one additional evidence-backed middle leg

## Success Condition

Lane 4 should make each outing feel like:

- one clear goal
- one small choice
- one light observational or traversal challenge
- one satisfying notebook-style return payoff

without changing the game into a quest RPG, combat game, or management sim.
