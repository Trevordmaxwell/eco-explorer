import { createSeededRandom, lerp } from './random';
import type {
  BiomeDefinition,
  BiomeEntity,
  BiomeInstance,
  BiomeZone,
  Cloud,
  InspectableEntry,
  Platform,
  SaveState,
  SpawnTable,
  TerrainSample,
} from './types';

const CATEGORY_SIZES: Record<
  InspectableEntry['category'],
  { width: number; height: number }
> = {
  shell: { width: 6, height: 6 },
  plant: { width: 8, height: 12 },
  animal: { width: 8, height: 6 },
  landmark: { width: 14, height: 6 },
};

function validateInspectableEntry(entry: InspectableEntry): void {
  if (!entry.commonName.trim()) {
    throw new Error(`Inspectable entry "${entry.id}" needs a common name.`);
  }

  if (!entry.shortFact.trim() || !entry.journalText.trim()) {
    throw new Error(`Inspectable entry "${entry.id}" needs fact text.`);
  }

  if (!entry.spriteId.trim()) {
    throw new Error(`Inspectable entry "${entry.id}" needs a sprite id.`);
  }

  if (entry.category === 'landmark') {
    if (!entry.subtitle.trim()) {
      throw new Error(`Landmark entry "${entry.id}" needs a subtitle.`);
    }

    if (entry.subtitleLabel !== undefined && !entry.subtitleLabel.trim()) {
      throw new Error(`Landmark entry "${entry.id}" has an empty subtitleLabel.`);
    }

    return;
  }

  if (!entry.scientificName.trim()) {
    throw new Error(`Organism entry "${entry.id}" needs a scientific name.`);
  }
}

export function validateBiomeDefinition(definition: BiomeDefinition): void {
  const entryIds = new Set(Object.keys(definition.entries));

  for (const entry of Object.values(definition.entries)) {
    validateInspectableEntry(entry);
  }

  for (const table of definition.spawnTables) {
    if (table.minCount < 0 || table.maxCount < table.minCount) {
      throw new Error(`Invalid spawn counts for ${table.id}.`);
    }

    if (table.spacing < 1) {
      throw new Error(`Invalid spawn spacing for ${table.id}.`);
    }

    for (const entry of table.entries) {
      if (entry.weight <= 0) {
        throw new Error(`Spawn entry "${entry.entryId}" in ${table.id} needs a positive weight.`);
      }
      if (!entryIds.has(entry.entryId)) {
        throw new Error(`Spawn entry "${entry.entryId}" in ${table.id} is missing from biome entries.`);
      }
    }
  }
}

function getZone(definition: BiomeDefinition, x: number): BiomeZone {
  return (
    definition.terrainRules.zones.find((zone) => x >= zone.start && x <= zone.end) ??
    definition.terrainRules.zones[definition.terrainRules.zones.length - 1]
  );
}

function buildTerrainSamples(definition: BiomeDefinition, stableSeed: string): TerrainSample[] {
  const random = createSeededRandom(stableSeed);
  const { worldWidth, sampleStep, zones } = definition.terrainRules;
  const samples: TerrainSample[] = [];

  for (let x = 0; x <= worldWidth; x += sampleStep) {
    const zone = getZone(definition, x);
    const variance = random.nextRange(-zone.surfaceVariance, zone.surfaceVariance);
    const wave = Math.sin((x + random.nextRange(0, 48)) / 28) * (zone.surfaceVariance * 0.6);
    samples.push({
      x,
      y: zone.surfaceBaseY + variance + wave,
    });
  }

  for (let index = 1; index < samples.length - 1; index += 1) {
    samples[index].y = (samples[index - 1].y + samples[index].y + samples[index + 1].y) / 3;
  }

  if (zones.length > 0) {
    samples[0].y = zones[0].surfaceBaseY;
    samples[samples.length - 1].y = zones[zones.length - 1].surfaceBaseY;
  }

  return samples;
}

export function sampleTerrainY(samples: TerrainSample[], x: number): number {
  if (x <= samples[0].x) {
    return samples[0].y;
  }

  for (let index = 1; index < samples.length; index += 1) {
    const previous = samples[index - 1];
    const current = samples[index];

    if (x <= current.x) {
      const progress = (x - previous.x) / (current.x - previous.x);
      return lerp(previous.y, current.y, progress);
    }
  }

  return samples[samples.length - 1].y;
}

function createClouds(definition: BiomeDefinition, stableSeed: string): Cloud[] {
  const random = createSeededRandom(`${stableSeed}:clouds`);
  const count = random.nextInt(
    definition.ambientRules.cloudCount[0],
    definition.ambientRules.cloudCount[1],
  );

  return Array.from({ length: count }, (_, index) => ({
    x: random.nextRange(0, definition.terrainRules.worldWidth),
    y: random.nextRange(16, 44),
    w: random.nextRange(18, 32) + index * 2,
  }));
}

function createPlatforms(
  definition: BiomeDefinition,
  terrainSamples: TerrainSample[],
  stableSeed: string,
): Platform[] {
  const random = createSeededRandom(`${stableSeed}:platforms`);
  const platforms: Platform[] = [];

  for (const rule of definition.terrainRules.platformRules) {
    const zone = definition.terrainRules.zones.find((candidate) => candidate.id === rule.zoneId);
    if (!zone) {
      continue;
    }

    const count = random.nextInt(rule.minCount, rule.maxCount);

    for (let index = 0; index < count; index += 1) {
      const width = random.nextInt(rule.minWidth, rule.maxWidth);
      const x = random.nextRange(zone.start + 8, zone.end - width - 8);
      const y = sampleTerrainY(terrainSamples, x + width / 2) - random.nextRange(rule.liftMin, rule.liftMax);

      platforms.push({
        id: `${rule.id}-${index}`,
        spriteId: rule.spriteId,
        x,
        y,
        w: width,
        h: rule.height,
      });
    }
  }

  return platforms;
}

function createEntity(
  table: SpawnTable,
  entry: InspectableEntry,
  x: number,
  terrainSamples: TerrainSample[],
  index: number,
): BiomeEntity {
  const size = CATEGORY_SIZES[entry.category];
  const groundY = sampleTerrainY(terrainSamples, x);

  return {
    entityId: `${table.id}-${index}-${entry.id}-${Math.round(x)}`,
    entryId: entry.id,
    spriteId: entry.spriteId,
    x: Math.round(x),
    y: Math.round(groundY - size.height),
    w: size.width,
    h: size.height,
    category: entry.category,
    collectible: entry.collectible,
    refreshPolicy: table.refreshPolicy,
    removed: false,
  };
}

function spawnTableEntities(
  definition: BiomeDefinition,
  table: SpawnTable,
  terrainSamples: TerrainSample[],
  seed: string,
): BiomeEntity[] {
  const random = createSeededRandom(seed);
  const zone = definition.terrainRules.zones.find((candidate) => candidate.id === table.zoneId);
  if (!zone) {
    return [];
  }

  const count = random.nextInt(table.minCount, table.maxCount);
  const positions: number[] = [];
  const entities: BiomeEntity[] = [];
  let attempts = 0;

  while (entities.length < count && attempts < count * 32) {
    attempts += 1;
    const x = random.nextRange(zone.start + 6, zone.end - 6);

    if (positions.some((position) => Math.abs(position - x) < table.spacing)) {
      continue;
    }

    positions.push(x);

    const chosenEntryId = random.pickWeighted(
      table.entries.map((entry) => ({
        weight: entry.weight,
        value: entry.entryId,
      })),
    );

    const entry = definition.entries[chosenEntryId];
    entities.push(createEntity(table, entry, x, terrainSamples, entities.length));
  }

  return entities.sort((left, right) => left.x - right.x);
}

function createSparkles(definition: BiomeDefinition, refreshSeed: string) {
  const random = createSeededRandom(`${refreshSeed}:sparkles`);
  const count = random.nextInt(
    definition.ambientRules.sparkleCount[0],
    definition.ambientRules.sparkleCount[1],
  );

  return Array.from({ length: count }, () => ({
    x: random.nextRange(0, definition.terrainRules.worldWidth),
    y: random.nextRange(68, 120),
    phase: random.nextRange(0, Math.PI * 2),
  }));
}

export function generateBiomeInstance(
  definition: BiomeDefinition,
  save: SaveState,
  visitCount: number,
): BiomeInstance {
  validateBiomeDefinition(definition);

  const stableSeed = `${save.worldSeed}:${definition.id}:stable`;
  const refreshSeed = `${save.worldSeed}:${definition.id}:visit:${visitCount}`;
  const terrainSamples = buildTerrainSamples(definition, stableSeed);
  const platforms = createPlatforms(definition, terrainSamples, stableSeed);
  const clouds = createClouds(definition, stableSeed);
  const entities = definition.spawnTables.flatMap((table) =>
    spawnTableEntities(
      definition,
      table,
      terrainSamples,
      table.refreshPolicy === 'stable'
        ? `${stableSeed}:${table.id}`
        : `${refreshSeed}:${table.id}`,
    ),
  );

  return {
    biomeId: definition.id,
    visitCount,
    terrainSamples,
    platforms,
    entities,
    sparkles: createSparkles(definition, refreshSeed),
    clouds,
    width: definition.terrainRules.worldWidth,
    height: definition.terrainRules.worldHeight,
  };
}
