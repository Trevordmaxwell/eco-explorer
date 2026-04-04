# Content Authoring

## Add a new inspectable

1. Open the biome definition in `src/content/biomes`.
2. Add an entry to `entries` with:
   - `id`
   - `commonName`
   - `category`
   - `shortFact`
   - `journalText`
   - optional `sketchbookNote`
   - `spriteId`
   - `collectible`
   - organism entries (`shell`, `plant`, `lichen`, `animal`) also need `scientificName`
   - landmark or habitat entries use `subtitle` instead, with optional `subtitleLabel`
3. Create the matching pixel sprite in the right asset module under `src/assets`.
4. Reference the new entry from a `spawnTable`.
5. If the entry should help teach a biome relationship, link it from one or more `ecosystemNotes`.

If the entry belongs on a ledge, trunk, cave shelf, or other authored route feature instead of the ground, place it with `terrainRules.authoredEntities` rather than forcing it into a generic spawn table.

## Add phenology to a live biome

Use the optional `phenology` block when a biome needs small authored `early` / `peak` / `late` variation without turning into a full season simulator.

Pattern:

```ts
phenology: {
  phases: {
    early: {
      skyWashTop: 'rgba(246, 248, 252, 0.14)',
      skyWashBottom: 'rgba(238, 243, 248, 0.08)',
      groundWash: 'rgba(226, 236, 243, 0.11)',
      parallaxColors: ['#e2edf3', '#a7bfd0'],
      entryAccents: [
        {
          entryId: 'purple-saxifrage',
          style: 'bloom',
          primaryColor: '#b183df',
          secondaryColor: '#e2c8f9',
        },
      ],
      spawnEmphasis: [{ tableId: 'berry-patches', minCountDelta: 1, maxCountDelta: 1 }],
    },
  },
},
```

Guidance:

- Keep the shared phase coarse: `early`, `peak`, `late`.
- Favor a few strong cues over touching every entry in the biome.
- Use `entryAccents` for stable plants or landmarks that should look a little different without moving.
- If a phase needs a visibly different pixel state instead of just a color accent, set `entryAccents[].spriteId` to a tiny variant sprite and keep the base `entryId` unchanged.
- Use `spawnEmphasis` only for small visit-based shifts such as berries, cones, wrack, or temporary wildlife density.
- Do not use phenology to relocate stable habitat anchors or hide core teachable species.
- If a coast branch still reads thin, prefer one tiny reinforcement inside the current species set over adding a new roster just for seasonality.

Current accent styles:

- `bloom`
- `berry`
- `seed`
- `cone`
- `tuft`
- `frost`

## Add a new biome

1. Create a new biome module under `src/content/biomes`.
2. Define:
   - palette
   - zones
   - terrain rules
   - platform rules
   - spawn tables
   - educational entries
   - `ecosystemNotes`
   - start position
3. Register it in the biome registry.
4. Reuse the existing generation pipeline if the biome fits the same seeded side-view model.

For scaffold-only biome work that should not go live yet, export the biome from `src/content/biomes/index.ts` without wiring it into the active runtime.

When a species appears in more than one related biome, keep the same `entryId` so journal and ecosystem-note unlocks can stay consistent.
If that species is intentionally shared across a parent biome and an ecotone, define the canonical entry once in `src/content/shared-entries.ts` and import it into both biome files instead of spreading entry objects from one biome into another.

## Spawn table guidance

- Use `refreshPolicy: 'stable'` for plants, landmarks, and authored habitat anchors.
- Use `refreshPolicy: 'visit'` for pickups, ambient wildlife, and lightweight decorative motion.
- Prefer `spawnEmphasis` on `visit` tables only. Stable tables should usually keep the same placement across phases.
- Keep `spacing` high enough that sprites do not overlap.
- Prefer several small tables over one overloaded table so biome intent stays readable.

## Authored niche placements

Use `terrainRules.authoredEntities` for inspectables that should live on a precise route feature such as a root shelf, trunk, rock sill, or elevated log.

Pattern:

```ts
terrainRules: {
  // ...
  authoredEntities: [
    {
      id: 'root-hollow-lungwort-sill',
      entryId: 'tree-lungwort',
      x: 348,
      y: 100,
      castsShadow: false,
    },
  ],
},
```

Guidance:

- `x` and `y` are authored top-left sprite positions, not ground anchors.
- Use authored placements when the habitat lesson depends on a specific surface or vertical route beat.
- Keep table-driven spawns for general ground cover, roaming life, and repeated biome texture.
- Set `castsShadow: false` for bark, wall, or rock-attached organisms that should not read like they are standing on the ground.
- Prefer a few strong authored placements over filling every platform edge with extra content.

## Add a world-map location

1. Open `src/content/world-map.ts`.
2. Add a `location` entry with:
   - `id`
   - `biomeId`
   - `label`
   - `summary`
   - `mapReturnLabel`
   - `approachLabel`
   - `previewColor`
   - `node`
   - `mapDoor`
   - `biomeDoor`
   - optional `corridorDoors`
   - optional `mapReturnPost`
   - `spriteId`
3. Add or extend `connections` so the new location is reachable.
4. If the location points to a new biome, scaffold the biome first and keep the door anchors consistent with the biome's intended entry or exit side.
5. If the biome supports corridor-first travel or interior map returns, add a `mapReturnPost` so same-biome map cancel can land back on an authored interior anchor instead of only the edge door.

## Doorway transition guidance

- Treat the biome door and map door as separate anchors.
- Treat corridor doors and map-return posts as separate authored anchors from the main biome door.
- Use the biome door for in-level placement and the map door for overworld placement.
- Use `mapReturnPost` when the map should reopen from an interior post instead of the biome edge.
- Keep doorway travel readable: exit biome, reveal map, walk route, enter destination door, reveal destination biome.
- Prefer authored transition beats over hard-cut teleports when moving between ecosystems.

## Fact writing guidance

- Keep `shortFact` to one clear sentence for ages 7-10.
- Use scientific names for organism entries.
- Use `category: 'lichen'` for lichen organisms instead of grouping them under plants.
- Use a plain-language `subtitle` for landmark or habitat entries instead of inventing Latin.
- Use `journalText` for the slightly longer explanation shown in the journal.
- Use optional `sketchbookNote` for one short notebook-style line in the sketchbook; keep it more evocative than `shortFact`, but still science-safe.
- Favor habitat, adaptation, and ecosystem facts over trivia with no environmental context.

## Science ledger upkeep

- When you add a new landmark, process-teaching carrier, or close-look entry, add or update its row in `docs/science-source-ledger.md`.
- If a new entry is meant to be a remembered route or process anchor, prefer adding a short `sketchbookNote` so the archive surfaces keep a compact payoff later.

## Ecosystem note template

Add relationship teaching at the biome level with `ecosystemNotes`:

```ts
ecosystemNotes: [
  {
    id: 'shore-shelter',
    title: 'Shelter on the Shore',
    entryIds: ['beach-grass', 'driftwood-log', 'pacific-sand-crab'],
    summary: 'Beach grass roots and driftwood make calmer hiding places on the upper shore for small animals.',
    observationPrompt: 'Where does the sand look safer near grass clumps or driftwood?',
    zoneId: 'dune-edge',
    minimumDiscoveries: 2,
  },
];
```

Guidance:

- Link `2-3` entries that already exist in the same biome.
- Prefer roles and processes such as shelter, dune stabilization, decomposition, seed spread, or wind adaptation.
- Keep notes observational and cozy. They should connect discoveries, not quiz the player.
- `zoneId` is optional, but if used it should match one of the biome's terrain zones.
- `minimumDiscoveries` is optional. If omitted, the runtime defaults to `2`.
- Locked-note behavior should not spoil undiscovered exact species names.

## Copy budgets

- `shortFact`: `<= 100` characters, one sentence
- `journalText`: aim for `<= 180` characters and `1-2` sentences
- `sketchbookNote`: aim for `<= 48` characters and one short line
- `ecosystemNotes[].title`: `<= 28` characters
- `ecosystemNotes[].summary`: `<= 110` characters
- `ecosystemNotes[].observationPrompt`: `<= 90` characters and usually phrased as a question

These are readability targets for the current `256x160` in-game UI.

## Quick examples

Good:

- `Beach grass roots help hold dunes in place when wind blows.`
- `Old leaves break down and return nutrients that help young forest plants grow.`

Avoid:

- `Beach grass is cool and interesting.`
- `Can you name three things that live here and earn a badge?`

## Validation

- Run `npm test` after content changes so biome, journal, and content-quality checks stay green.
- Run `npm run validate:agents` after packet or queue edits so the agent handoff files stay consistent.
