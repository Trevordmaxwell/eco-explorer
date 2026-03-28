# Content Authoring

## Add a new inspectable

1. Open the biome definition in `src/content/biomes`.
2. Add an entry to `entries` with:
   - `id`
   - `commonName`
   - `category`
   - `shortFact`
   - `journalText`
   - `spriteId`
   - `collectible`
   - organism entries (`shell`, `plant`, `animal`) also need `scientificName`
   - landmark or habitat entries use `subtitle` instead, with optional `subtitleLabel`
3. Create the matching pixel sprite in the right asset module under `src/assets`.
4. Reference the new entry from a `spawnTable`.

## Add a new biome

1. Create a new biome module under `src/content/biomes`.
2. Define:
   - palette
   - zones
   - terrain rules
   - platform rules
   - spawn tables
   - educational entries
   - start position
3. Register it in the biome registry.
4. Reuse the existing generation pipeline if the biome fits the same seeded side-view model.

For scaffold-only biome work that should not go live yet, export the biome from `src/content/biomes/index.ts` without wiring it into the active runtime.

## Spawn table guidance

- Use `refreshPolicy: 'stable'` for plants, landmarks, and authored habitat anchors.
- Use `refreshPolicy: 'visit'` for pickups, ambient wildlife, and lightweight decorative motion.
- Keep `spacing` high enough that sprites do not overlap.
- Prefer several small tables over one overloaded table so biome intent stays readable.

## Add a world-map location

1. Open `src/content/world-map.ts`.
2. Add a `location` entry with:
   - `id`
   - `biomeId`
   - `label`
   - `summary`
   - `node`
   - `mapDoor`
   - `biomeDoor`
   - `spriteId`
3. Add or extend `connections` so the new location is reachable.
4. If the location points to a new biome, scaffold the biome first and keep the door anchors consistent with the biome's intended entry or exit side.

## Doorway transition guidance

- Treat the biome door and map door as separate anchors.
- Use the biome door for in-level placement and the map door for overworld placement.
- Keep doorway travel readable: exit biome, reveal map, walk route, enter destination door, reveal destination biome.
- Prefer authored transition beats over hard-cut teleports when moving between ecosystems.

## Fact writing guidance

- Keep `shortFact` to one clear sentence for ages 7-10.
- Use scientific names for organism entries.
- Use a plain-language `subtitle` for landmark or habitat entries instead of inventing Latin.
- Use `journalText` for the slightly longer explanation shown in the journal.
- Favor habitat, adaptation, and ecosystem facts over trivia with no environmental context.
