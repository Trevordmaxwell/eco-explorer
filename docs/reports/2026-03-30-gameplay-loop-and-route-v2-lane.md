# Gameplay Loop And Route V2 Lane

## Summary

Lane 4 is a new parallel lane focused on gameplay-loop cohesion.

The goal is to make Eco Explorer feel more like a cozy naturalist adventure without adding combat, heavy inventory, a broader quest shell, or extra station density. The lane should turn outings into:

- one clear purpose
- one meaningful tiny choice
- one light observational or traversal challenge
- one satisfying notebook-style return payoff

## Why Now

The project already has strong systems:

- field requests
- route boards
- journal and notebook surfaces
- nursery support
- world-state replay seams
- authored traversal pockets

What it needs now is stronger cohesion. The current route layer still leans too hard on inspect counts and zone triggers. Lane 4 should turn those good systems into a cleaner outing loop instead of adding another unrelated feature.

## Recommended Order

1. Start with scout-only prep for the first Route v2 conversion pack, the tiny support slot, and the notebook synthesis return flow.
2. Wait until `ECO-20260330-critic-71` is clean before opening the first lane-4 main implementation step.
3. Build the Route v2 core runtime: in-progress request state, evidence-slot and landmark-backed requests, outing-support selection, and station-side synthesis.
4. Convert the first forest pilot pair.
5. Add one tiny support-choice layer and one route-aware “today” note.
6. Convert the middle-habitat transition routes.
7. Convert the inland stress-and-exposure line.
8. Rebuild `Root Hollow` as the first full outing chapter in this new model.

## Guardrails

- Do not add a larger quest log, route dashboard, or loadout screen.
- Do not widen station density beyond the current shell.
- Reuse the existing route-board and replay-note seams instead of adding parallel systems.
- Keep support choice tiny: `route-marker` and `hand-lens` first, with larger support ideas deferred.
- Let route completion happen after a tiny notebook synthesis step, not at first discovery.
- Keep the tone science-forward, cozy, and observation-led.

## Intended Result

After this lane lands its first chapter, the game should more clearly answer:

- what this outing is for
- what choice the player made
- what challenge they solved
- what changed when they got back

without drifting away from the project’s educational and cozy core.
