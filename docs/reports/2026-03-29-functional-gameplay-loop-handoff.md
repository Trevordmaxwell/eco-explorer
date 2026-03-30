# 2026-03-29 Functional Gameplay Loop Handoff

## Method

- read queue item `ECO-20260329-scout-31` and packet `021`
- reviewed:
  - `docs/reports/2026-03-29-functional-gameplay-sequence.md`
  - `src/engine/game.ts`
  - `src/engine/journal.ts`
  - `src/engine/progression.ts`
  - `src/engine/save.ts`
  - `src/engine/world-state.ts`
  - `src/engine/observation-prompts.ts`
  - `src/content/biomes/forest.ts`

## Current State

The live build already has the right base pieces for a stronger loop:

- `save.ts` tracks discoveries, biome visits, `lastBiomeId`, and deterministic `worldStep`
- `journal.ts` already resolves per-biome discovery context and shared-species sightings
- `progression.ts` already exposes calm biome survey states instead of score-heavy ranks
- `world-state.ts` and `observation-prompts.ts` already give the game a small evidence-aware notebook language layer

What it does not have yet is a stronger short-term "why move over there?" loop.

That means the next gameplay pass should build on movement, discovery, survey state, and notebook context that already exist. It should not introduce a separate quest stack, a cash inventory, or a market surface first.

## Loop Shape Comparison

### Option 1. Geometry first, then notebook requests, then field-station upgrades

What it is:

- deepen one biome with a clearer upper route, lower route, and one short hidden detour
- once traversal is more interesting, add one calm notebook-style request layer tied to observed ecology
- only after that, convert completed surveys and requests into a tiny field-station credit loop with one gentle upgrade

Pros:

- improves the core act of play before adding more meta-systems
- fits the live journal, survey-state, world-state, and prompt seams cleanly
- keeps requests grounded in places and evidence instead of generic tasks
- lets upgrades feel earned through fieldwork rather than loot conversion

Tradeoffs:

- the "reward economy" arrives later than in a more arcade-like plan
- needs discipline so the request layer stays small and notebook-first

Assessment:

- best option

### Option 2. Request-first notebook board

What it is:

- add notebook requests immediately, before changing terrain shape much

Pros:

- creates direction quickly
- reuses the journal shell sooner

Tradeoffs:

- objectives would outrun the current traversal depth
- risks feeling like text pasted on top of the same movement loop
- pushes the game toward a quest-log feeling before the terrain itself is interesting enough

Assessment:

- reject as the first move

### Option 3. Station-first collection economy

What it is:

- add a station or market surface early and let players cash in findings for upgrades

Pros:

- creates a strong "gamey" loop fast
- makes upgrades visible early

Tradeoffs:

- puts extraction and selling ahead of observation
- pressures collectibles into currency instead of discovery flavor
- needs more new state, UI, and balancing than the current shell wants
- risks teaching the wrong relationship to living ecosystems in a kids' science game

Assessment:

- reject as the first move

## Recommendation

Keep the sequence exactly in this order:

1. exploration geometry
2. notebook-style field requests
3. a tiny field-station upgrade loop

This is the cleanest fit for the live code and product tone:

- `main-51` strengthens play itself
- `main-52` adds purpose using the journal and evidence systems already in place
- `main-53` adds a modest reward loop after the first two layers prove fun

## Best First Biome

Use `forest` for the first traversal proof.

Why it is safest:

- the live forest already has the strongest sheltered feeling through `trailhead`, `fern-hollow`, `log-run`, and `creek-bend`
- it already uses elevated log platforms, so more verticality will feel like an extension of the current biome rather than a genre shift
- a short root-hollow, log-underpass, or shallow creek-bank detour fits the ecology and mood better than a dramatic open cave
- beach and tundra are flatter and more exposed, so a first hidden-route proof there would need more thematic justification and readability work

Recommended first shape:

- one clearer upper ledge chain
- one forgiving lower route
- one short down-and-back detour that feels like shelter or cover, not a dungeon

## Why Field Station Framing Is Safer Than Selling Finds

The user instinct for upgrades is good, but the framing matters.

Selling living nature finds directly would create the wrong teaching model:

- it turns observation into extraction
- it suggests plants and animals are mainly valuable as trade goods
- it makes the collectible layer feel like loot instead of a field record

A field-station or survey-credit model is safer because it says:

- careful observation has value
- completed surveys and notebook requests are what earn support
- progress comes from documenting ecosystems well, not harvesting them for sale

It is also a better fit for the current code:

- survey state already exists
- request completion can be tracked as notebook work rather than inventory pricing
- a tiny credit total is simpler than a specimen economy with prices, stock, and sell rules

## Implementation Guidance

### `main-51`

- keep the first traversal proof inside `forest`
- favor a root-hollow or log-underpass detour over a rocky "cave level"
- make the reward for the lower route a better observation spot, hidden request clue, or compact collectible placement, not currency

### `main-52`

- keep requests in the notebook and journal flow, not in a separate quest-log screen
- start with one calm active request at a time
- key requests off current biome, discovered entries, survey state, and current world-state where useful
- prefer ecology prompts like shelter, route-finding, plant timing, or shared-species comparison over raw item counts

Examples that fit the live seams:

- find one sheltered lower route in forest
- compare two signs of moisture-holding life in `fern-hollow`
- notice which seeds seem ready to travel in dry `dusk` conditions

### `main-53`

- treat completed requests and surveyed biomes as the sources of field credit
- keep the first station surface tiny, like a ranger table or research cart
- make the first upgrade movement-smoothing, not power-fantasy

Best first upgrade candidate:

- a small walk-speed increase

Second candidate only if the first pass stays readable:

- a very small jump improvement

Do not:

- make shells, berries, or living finds directly sellable
- build a store catalog
- add a second full-screen management mode before the loop proves fun

## Queue Outcome

`ECO-20260329-scout-31` can close with this report.

Future items should now read more narrowly:

- `ECO-20260329-scout-32` should ground a forest-first traversal proof, not reopen biome selection
- `ECO-20260329-main-52` should stay notebook-first and reuse journal, survey, and world-state evidence instead of adding a separate quest-log model
- `ECO-20260329-scout-33` and `ECO-20260329-main-53` should treat requests and surveyed-biome progress as the basis for field credit, with collectibles staying discovery flavor instead of currency
