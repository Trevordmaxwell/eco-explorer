# Eco Explorer

Eco Explorer is a small desktop-first pixel-art web game where kids explore a beach, inspect shells and plants, and collect nature facts in a journal.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`

## Controls

- `A / D` or `Left / Right`: move
- `Space`: jump
- `E`: inspect the nearest object
- Mouse click: inspect a clicked nearby object
- `J`: open or close the journal
- `M`: open or close the field menu
- `Esc`: close bubbles, the journal, or the menu
- `F`: toggle fullscreen

## Project shape

- `src/engine`: core loop, save model, input, generation, sprite runtime
- `src/content`: biome definitions and educational fact content
- `src/assets`: pixel-art sprite definitions and palette modules
- `docs/architecture.md`: system overview
- `docs/content-authoring.md`: how to add new biomes and entries

## Current content

The live build now includes:

- `Sunny Beach`: shells, dunes, shore plants, and a beach-to-map travel door
- `Forest Trail`: forest-floor plants, cones, wildlife, and a return door to the map
- `Tundra Reach`: Arctic plants, berry finds, cold-weather animals, and a snowy map destination
- an overworld map that connects all three ecosystems with staged doorway travel
- a persistent journal with biome tabs, category progress, and cross-biome discovery pages
- a visible field menu with fullscreen, inspect-hint, and reset-save controls
