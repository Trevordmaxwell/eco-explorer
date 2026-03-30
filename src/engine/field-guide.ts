import type {
  BiomeDefinition,
  BiomeInstance,
  DayPart,
  FieldGuideBiomeEntry,
  FieldGuideContext,
  FieldGuideNearbyEntity,
  InspectableCategory,
  InspectableEntry,
  PhenologyPhase,
  SaveState,
  WeatherProfile,
} from './types';

const DEFAULT_NEARBY_RADIUS = 60;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 10;
const BIOME_CATEGORY_ORDER: InspectableCategory[] = ['shell', 'plant', 'lichen', 'animal', 'landmark'];

function hasScientificName(entry: InspectableEntry): entry is InspectableEntry & { scientificName: string } {
  return entry.category !== 'landmark' && 'scientificName' in entry;
}

function getScientificName(entry: InspectableEntry): string | undefined {
  return hasScientificName(entry) ? entry.scientificName : undefined;
}

function formatHiddenCategoryLabel(category: InspectableCategory, count = 1): string {
  switch (category) {
    case 'shell':
      return count === 1 ? 'shell' : 'shells';
    case 'plant':
      return count === 1 ? 'plant' : 'plants';
    case 'lichen':
      return count === 1 ? 'lichen' : 'lichens';
    case 'animal':
      return count === 1 ? 'animal' : 'animals';
    case 'landmark':
      return count === 1 ? 'place feature' : 'place features';
  }
}

function buildNearbyEntitiesBlock(context: FieldGuideContext): string {
  if (!context.nearbyEntities.length) {
    return '- No organisms or features are close enough to describe right now.';
  }

  return context.nearbyEntities
    .map((entity) => {
      if (!entity.isDiscovered) {
        return `- A not-yet-identified ${formatHiddenCategoryLabel(entity.category)} is nearby.
  Distance: ${entity.distance}px away.
  Hint rule: describe it gently without naming or guessing its exact identity.`;
      }

      return `- ${entity.commonName} (${entity.scientificName ?? 'no scientific name'}) [${entity.category}]
  Fact: ${entity.shortFact}
  Detail: ${entity.journalText}
  Distance: ${entity.distance}px away, already discovered`;
    })
    .join('\n');
}

function buildBiomeDiscoveriesBlock(context: FieldGuideContext): string {
  const discoveredEntries = context.allBiomeEntries.filter((entry) => entry.isDiscovered);
  if (!discoveredEntries.length) {
    return '- No named discoveries in this biome yet.';
  }

  return discoveredEntries
    .map(
      (entry) => `- ${entry.commonName} (${entry.scientificName ?? '—'}) [${entry.category}] ✓`,
    )
    .join('\n');
}

function buildHiddenBiomeEntriesBlock(context: FieldGuideContext): string {
  const hiddenCounts = new Map<InspectableCategory, number>();

  for (const entry of context.allBiomeEntries) {
    if (entry.isDiscovered) {
      continue;
    }

    hiddenCounts.set(entry.category, (hiddenCounts.get(entry.category) ?? 0) + 1);
  }

  if (!hiddenCounts.size) {
    return '- No hidden biome finds remain right now.';
  }

  return BIOME_CATEGORY_ORDER
    .filter((category) => hiddenCounts.has(category))
    .map((category) => {
      const count = hiddenCounts.get(category) ?? 0;
      return `- ${count} ${formatHiddenCategoryLabel(category, count)} not yet discovered`;
    })
    .join('\n');
}

export function getBiomeZoneForPlayerX(biomeDefinition: BiomeDefinition, playerX: number) {
  const zones = biomeDefinition.terrainRules.zones;

  for (let index = 0; index < zones.length; index += 1) {
    const zone = zones[index];
    const isLastZone = index === zones.length - 1;

    if (playerX >= zone.start && (playerX < zone.end || (isLastZone && playerX <= zone.end))) {
      return zone;
    }
  }

  return zones[zones.length - 1] ?? null;
}

function toFieldGuideBiomeEntry(entry: InspectableEntry, isDiscovered: boolean): FieldGuideBiomeEntry {
  return {
    commonName: entry.commonName,
    scientificName: getScientificName(entry),
    category: entry.category,
    shortFact: entry.shortFact,
    isDiscovered,
  };
}

function toFieldGuideNearbyEntity(
  entry: InspectableEntry,
  entity: BiomeInstance['entities'][number],
  playerX: number,
  playerY: number,
  isDiscovered: boolean,
): FieldGuideNearbyEntity {
  const playerCenterX = playerX + PLAYER_WIDTH / 2;
  const playerCenterY = playerY + PLAYER_HEIGHT / 2;
  const entityCenterX = entity.x + entity.w / 2;
  const entityCenterY = entity.y + entity.h / 2;
  const distance = Math.round(Math.hypot(entityCenterX - playerCenterX, entityCenterY - playerCenterY));

  return {
    commonName: entry.commonName,
    scientificName: getScientificName(entry),
    category: entry.category,
    shortFact: entry.shortFact,
    journalText: entry.journalText,
    distance,
    isDiscovered,
  };
}

export function buildFieldGuideContext(
  biomeDefinition: BiomeDefinition,
  biomeInstance: BiomeInstance,
  save: SaveState,
  playerX: number,
  playerY: number,
  nearbyRadius = DEFAULT_NEARBY_RADIUS,
  worldState?: { worldAge: number; dayPart: DayPart; weather: WeatherProfile; phenologyPhase: PhenologyPhase },
  observationPrompt: FieldGuideContext['observationPrompt'] = null,
): FieldGuideContext {
  const zone = getBiomeZoneForPlayerX(biomeDefinition, playerX);
  const discoveredEntryIds = new Set(Object.keys(save.discoveredEntries));
  const biomeEntryIds = Object.keys(biomeDefinition.entries);

  const nearbyEntities = biomeInstance.entities
    .filter((entity) => !entity.removed)
    .map((entity) => {
      const entry = biomeDefinition.entries[entity.entryId];

      if (!entry) {
        return null;
      }

      return toFieldGuideNearbyEntity(
        entry,
        entity,
        playerX,
        playerY,
        discoveredEntryIds.has(entity.entryId),
      );
    })
    .filter((entity): entity is FieldGuideNearbyEntity => entity !== null)
    .filter((entity) => entity.distance <= nearbyRadius)
    .sort((left, right) => left.distance - right.distance || left.commonName.localeCompare(right.commonName));

  const allBiomeEntries = biomeEntryIds
    .map((entryId) => {
      const entry = biomeDefinition.entries[entryId];
      return toFieldGuideBiomeEntry(entry, discoveredEntryIds.has(entryId));
    })
    .sort((left, right) => left.commonName.localeCompare(right.commonName));

  const biomeDiscoveries = biomeEntryIds.filter((entryId) => discoveredEntryIds.has(entryId)).length;

  return {
    biomeId: biomeDefinition.id,
    biomeName: biomeDefinition.name,
    zoneName: zone?.id ?? 'unknown-zone',
    zoneLabel: zone?.label ?? 'Unknown Zone',
    playerPosition: { x: playerX, y: playerY },
    nearbyEntities,
    allBiomeEntries,
    totalDiscoveries: discoveredEntryIds.size,
    biomeDiscoveries,
    biomeTotalEntries: biomeEntryIds.length,
    visitCount: save.biomeVisits[biomeDefinition.id] ?? biomeInstance.visitCount,
    worldAge: worldState?.worldAge,
    timeOfDay: worldState?.dayPart,
    weather: worldState?.weather,
    phenologyPhase: worldState?.phenologyPhase,
    observationPrompt,
  };
}

export function buildFieldGuidePrompt(context: FieldGuideContext): string {
  const nearbyEntitiesBlock = buildNearbyEntitiesBlock(context);
  const discoveredBiomeEntriesBlock = buildBiomeDiscoveriesBlock(context);
  const hiddenBiomeEntriesBlock = buildHiddenBiomeEntriesBlock(context);
  const worldStateBlock = context.timeOfDay
    ? `CURRENT WORLD STATE:
- Day part: ${context.timeOfDay}
- Weather: ${context.weather ?? 'clear'}
- Phenology phase: ${context.phenologyPhase ?? 'early'}
- World age step: ${context.worldAge ?? 0}

`
    : '';
  const observationPromptBlock = context.observationPrompt
    ? `CURRENT NOTEBOOK LENS:
- Family: ${context.observationPrompt.family}
- Prompt seed: ${context.observationPrompt.text}

`
    : '';

  return `You are a friendly naturalist field guide in a pixel-art ecosystem exploration game.
The player is a curious explorer (age range: 7-adult) standing in the "${context.biomeName}" biome,
in the "${context.zoneLabel}" zone.

NEARBY ORGANISMS AND FEATURES (within the player's immediate surroundings):
${nearbyEntitiesBlock}

DISCOVERED LIFE AND FEATURES IN THIS BIOME:
${discoveredBiomeEntriesBlock}

STILL HIDDEN IN THIS BIOME:
${hiddenBiomeEntriesBlock}

${worldStateBlock}${observationPromptBlock}PLAYER PROGRESS:
- Discoveries in this biome: ${context.biomeDiscoveries}/${context.biomeTotalEntries}
- Total discoveries across all biomes: ${context.totalDiscoveries}
- Visits to this biome: ${context.visitCount}

INSTRUCTIONS:
Write a 3-4 paragraph field guide entry for what the player is seeing right now. Be warm,
curious, and scientifically accurate. Use only relationships that the current context supports. Include:
1. A vivid description of this specific spot — what does the landscape look like? What's
   the soil like, the light, the air? Ground it in the zone.
2. The ecological relationships you can support from the nearby discoveries and the player
   progress. Focus on grounded links such as shelter, movement, decomposition, weather
   exposure, or organism roles only when the prompt gives evidence for them. If a food web,
   pollination story, or other process is not clear from this context, say that uncertainty
   plainly instead of guessing.
3. One "look closer" prompt — something specific the player could investigate or notice
   on their next visit. Frame it as a question or observation that a naturalist would
   write in their notebook. If a notebook lens is provided above, use that exact lens
   instead of inventing a different one.
4. If the player has hidden finds nearby, hint at them only in broad spoiler-safe ways.
   Never invent or reveal an exact undiscovered name.
Keep language accessible for ages 7-10 but don't dumb down the science. Use real ecological
terms only when they truly fit this context, and explain them naturally in context.
Write in second person ("You're standing in..."). No bullet points — flowing prose like a
real field journal entry.
Do not use emoji. Keep it under 200 words.`;
}
