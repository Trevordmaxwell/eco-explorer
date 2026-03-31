# Directional Travel Coherence Phase

## Summary

One of the next lane-1 waves should fix directional coherence across travel. The current hybrid travel model is mechanically sound, but it can still feel spatially backward or disorienting when the player moves between biomes, corridors, map-return posts, and station cues.

This should be treated as a real systems polish phase, not a one-off bug fix.

## Why It Matters

Eco Explorer depends heavily on the fantasy of moving through one connected world. When travel direction feels muddled, the player loses:

- confidence about where they are
- trust in the ecosystem chain
- the feeling that adjacent habitats really connect

That makes this a high-leverage clarity pass even if the game is technically functioning.

## Scope

The goal is not a total travel rewrite. The goal is to make the current hybrid system feel spatially coherent:

- corridor entry and exit framing
- left/right and uphill/downhill logic
- map-return placement
- travel-facing station and map cues
- transition copy and destination naming
- tiny visual or positional cues where needed

## Recommended Order

1. Audit the current travel chain for directional incoherence.
2. Implement one main coherence pass across corridor doors, exits, returns, and travel-facing cues.
3. Review that pass for player-facing clarity.
4. Prepare one compact follow-up focused on the highest remaining disorientation points.
5. Implement that follow-up.
6. Review whether the world now reads as one connected gradient instead of a set of linked scenes.

## Guardrails

- Do not replace the hybrid map-plus-corridor model.
- Do not open a large new HUD or navigation UI.
- Prefer spatial framing, anchors, and gentle cues over explicit tutorial text.
- Preserve the cozy, exploratory tone; this should reduce confusion without feeling over-guided.
- Keep the work centered in lane 1 rather than spilling into a broad content lane.

## Intended Result

After this phase, adjacent biomes should feel directionally believable enough that:

- moving left or right feels meaningful
- returning from the map feels anchored
- corridor travel supports the ecosystem-gradient fantasy instead of undermining it
