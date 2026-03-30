# Ecosystem Relationship Scout Pass

Date: 2026-03-28
Status: Ready for implementation

## What I Reviewed

- the live biome content in `src/content/biomes/beach.ts`
- the live biome content in `src/content/biomes/forest.ts`
- the live biome content in `src/content/biomes/tundra.ts`
- the current journal surface in `src/engine/journal.ts` and `src/engine/overlay-render.ts`
- the existing field-guide context builder in `src/engine/field-guide.ts`
- the queue direction in `docs/reports/2026-03-28-current-state-review.md`

## Recommendation

Implement a journal-first `ecosystem notes` layer backed by authored biome note data.

The smallest good next step is not a quiz, a checklist, or a new screen. It is a small authored system that connects already-discovered plants, animals, and landmarks into ecological roles and relationships.

In the first pass:

- each biome should get a short `ecosystemNotes` array in content
- each note should reference `2-3` existing `entryId`s
- each note should carry a short title, a one- or two-sentence summary, and one observation prompt
- notes should unlock only when the player has discovered enough linked entries
- the journal detail pane should show the first unlocked note that matches the selected discovered entry

This keeps the learning layer gentle and observational. The player is still exploring and noticing. The game is just helping them connect what they already found.

## Why This Slice

- It uses the current journal instead of adding new chrome.
- It reuses facts that are already in the repo instead of asking for a large new content wave.
- It is deterministic, testable, and easy to author per biome.
- It teaches relationships without turning the game into a quiz.
- It gives the field-guide system a future shared data source without making AI a dependency.

## Rejected For This First Pass

### Quiz or checklist framing

This would push the tone toward performance instead of curiosity.

### A full new overlay or companion system

That is too much UI and orchestration for the first relationship layer.

### Inspect-bubble expansion first

The fact bubble is already dense. The journal is the safer place to deepen meaning without crowding first-contact discovery.

### AI-dependent relationship teaching

`src/engine/field-guide.ts` is useful foundation, but the first in-game relationship layer should stay authored, local, and deterministic.

## Proposed Data Shape

Add a small authored note shape that lives beside biome entries:

```ts
interface EcosystemNote {
  id: string;
  title: string;
  entryIds: string[];
  summary: string;
  observationPrompt: string;
  minimumDiscoveries?: number;
  zoneId?: string;
}
```

Recommended first-pass rules:

- default `minimumDiscoveries` to `2`
- require the selected journal entry to be part of the note
- show at most one unlocked note in the journal detail pane
- if no note is unlocked yet, show nothing or a very small generic placeholder
- do not reveal undiscovered exact entry names in hints

## Suggested Runtime Shape

Keep the implementation small:

1. Extend `BiomeDefinition` with authored `ecosystemNotes`.
2. Add a pure helper such as `src/engine/ecosystem-notes.ts`.
3. Feed the selected journal entry plus discovered IDs into that helper.
4. Render one small `Ecosystem note` block in the existing journal detail panel.
5. Cover the helper with tests across beach, forest, and tundra.

This does not need world-map changes, inspect-bubble changes, or menu changes.

## Starter Notes

The first pass does not need to cover every entry. It only needs enough notes to make the system feel real across the live biomes.

### Sunny Beach

- `shore-shelter`
  - entryIds: `beach-grass`, `driftwood-log`, `ghost-crab`
  - summary: `On the upper beach, roots and stranded wood make the shore less harsh by holding sand and creating hiding places.`
  - observation prompt: `Where does the sand look calmer or safer near grass clumps or driftwood?`
- `wave-edge-survivors`
  - entryIds: `coquina-shell`, `sanderling`, `ghost-crab`
  - summary: `Life at the tide line reacts fast. Some animals burrow into wet sand, and others race the waves to feed.`
  - observation prompt: `What changes first when a wave slides in and then pulls away?`

### Forest Trail

- `forest-floor-recycling`
  - entryIds: `banana-slug`, `sword-fern`, `douglas-fir-sapling`
  - summary: `Old leaves and wood break down on the forest floor, returning nutrients that help young plants grow.`
  - observation prompt: `What signs show that the forest floor is always changing, even when it looks still?`
- `forest-seed-travel`
  - entryIds: `salal-berry`, `fir-cone`, `steller-jay`
  - summary: `Forest seeds travel in more than one way. Some move with wind from cones, and some move when animals carry or hide food.`
  - observation prompt: `Which seeds here seem built to fly, and which seem built to be eaten?`

### Tundra Reach

- `staying-low`
  - entryIds: `arctic-willow`, `purple-saxifrage`, `crowberry`
  - summary: `Many tundra plants stay low to the ground, where the air is calmer and a little warmer than the wind above them.`
  - observation prompt: `What shapes help these plants avoid the strongest wind?`
- `short-summer-rush`
  - entryIds: `cottongrass`, `cloudberry`, `snow-bunting`
  - summary: `Tundra life has to use the short summer quickly. Plants bloom and seed fast, and birds rush to feed while food is available.`
  - observation prompt: `What clues tell you this place has only a short growing season?`

## Guardrails For Implementation

- Use only science claims already supported by the current authored facts or similarly modest extensions.
- Keep the writing short, warm, and readable for ages `7-10`.
- Avoid exact-species spoilers for undiscovered entries.
- Do not add scores, streaks, badges, or completion-pressure language.
- Keep the first pass journal-first. Inspect-bubble or AI follow-ons can reuse the same note data later.

## Recommended Queue Shape

1. Main agent implements journal-first authored ecosystem notes with tests.
2. Critic agent reviews science accuracy, readability, and spoiler behavior.
3. Future work can decide whether the same note data should also feed inspect bubbles, field-guide prompts, or ecotone teaching.
