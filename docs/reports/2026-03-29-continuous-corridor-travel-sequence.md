# 2026-03-29 Continuous Corridor Travel Sequence

## Recommendation

Yes. This is a strong future direction for Eco Explorer.

The clean version is a hybrid:

- keep the world map as an optional fast-travel and orientation layer
- let adjacent ecosystems become walkable through authored blend corridors
- place map-return posts or doors at authored intervals instead of forcing the player onto the map at every biome edge

This preserves the current five-biome structure while making the world feel more continuous and alive.

## Why This Fits

- It reinforces the game's best idea: ecosystems are gradients, not disconnected levels.
- It gives ecotones a stronger job than just existing as separate stops on the map.
- It turns shared species, background shifts, and weather/day-part systems into visible world relationships instead of menu-level abstractions.
- It can feel magical without requiring a giant simulation if the first pass stays authored and local.

## Important Constraint

Do not replace the current map with one giant stitched super-level as the first pass.

That would put too much pressure on:

- seeded biome generation
- save and reload state
- journal biome identity
- world-state resolution
- `src/engine/game.ts` orchestration

Instead, treat this as adjacent corridor travel:

- each live biome keeps its own identity and generation rules
- each neighboring pair gets one authored transition band
- the player can cross that band without a hard travel cut
- the map remains available for quick skipping, orientation, and future long-hop travel

## First Proof Of Concept

Start with `beach -> coastal-scrub`.

That pair is the safest first corridor because:

- the Pacific coastal branch is already science-aligned
- they already share edge species like `beach-grass` and `yellow sand verbena`
- the visual transition can be legible through dune height, scrub density, and sky/parallax shifts without needing a drastic palette jump

The first corridor should prove:

1. the player can keep walking across a biome edge without being forced to the map
2. the background and terrain can drift gradually instead of swapping suddenly
3. inspectables and journal context still resolve cleanly once the player crosses the handoff threshold
4. the map still works as an optional return/skip layer

## Recommended Shape

### Corridor bands

Use a short authored blend zone near the exit edge of each adjacent biome pair.

That zone should combine:

- shared edge species
- a few mixed decor weights
- gradual tile blending
- subtle parallax or sky drift
- optional ambient shift such as denser wind grass or softer haze

### Biome handoff

Do not switch biome identity every few pixels.

Use one clear threshold:

- before threshold: the current biome owns journal context, prompts, and weather profile
- after threshold: the destination biome owns them

The blend band can start earlier than the identity handoff so the transition feels gradual while the game state stays understandable.

### Map access

Keep the map, but make it less mandatory.

Best first version:

- normal neighboring travel can happen on foot through the corridor
- authored map-return posts or doors appear at consistent intervals or anchor points
- long-hop travel across multiple biomes still uses the world map

That gives the player both a cozy walkable world and a practical navigation layer.

## Suggested Implementation Order

1. Scout the corridor model, edge-content matrix, and map-post cadence.
2. Build one playable `beach <-> coastal-scrub` proof.
3. Critique readability, science coherence, and map coexistence.
4. Generalize the corridor system to the full adjacent chain.
5. Add optional map-return posts once the chain feels good on foot.

## Guardrails

- Science accuracy is still a hard gate for shared species and transition content.
- Keep the first pass adjacent-only; do not attempt a fully stitched five-biome superworld.
- Keep the world map alive as optional fast travel and orientation.
- Make blend zones visible through art and spawn emphasis, not UI explanation.
- Use ecotone logic to teach exposure, shelter, moisture, elevation, and neighboring habitat change.
- Keep the handoff readable at `192x144`.
- Prototype the corridor system before spreading it across the full chain.
