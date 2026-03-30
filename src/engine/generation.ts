import { createSeededRandom, lerp } from './random';
import { applyPhenologyToSpawnTable, getPhenologyPhaseProfile } from './phenology';
import type {
  BiomeDefinition,
  BiomeEntity,
  BiomeInstance,
  BiomeZone,
  Climbable,
  Cloud,
  DepthFeature,
  EcosystemNote,
  HabitatProcessMoment,
  InspectableEntry,
  Platform,
  SaveState,
  SpawnTable,
  TerrainSample,
} from './types';
import { buildWorldState } from './world-state';

const CATEGORY_SIZES: Record<
  InspectableEntry['category'],
  { width: number; height: number }
> = {
  shell: { width: 6, height: 6 },
  plant: { width: 8, height: 12 },
  lichen: { width: 8, height: 12 },
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

function validateEcosystemNote(
  note: EcosystemNote,
  biomeId: string,
  entryIds: Set<string>,
  zoneIds: Set<string>,
): void {
  if (!note.id.trim()) {
    throw new Error(`Ecosystem note in biome "${biomeId}" needs an id.`);
  }

  if (!note.title.trim() || !note.summary.trim() || !note.observationPrompt.trim()) {
    throw new Error(`Ecosystem note "${note.id}" in biome "${biomeId}" needs text.`);
  }

  if (note.entryIds.length < 2) {
    throw new Error(`Ecosystem note "${note.id}" in biome "${biomeId}" needs at least two linked entries.`);
  }

  const uniqueEntryIds = new Set(note.entryIds);
  if (uniqueEntryIds.size !== note.entryIds.length) {
    throw new Error(`Ecosystem note "${note.id}" in biome "${biomeId}" has duplicate linked entries.`);
  }

  for (const entryId of note.entryIds) {
    if (!entryIds.has(entryId)) {
      throw new Error(`Ecosystem note "${note.id}" in biome "${biomeId}" references missing entry "${entryId}".`);
    }
  }

  if (note.zoneId && !zoneIds.has(note.zoneId)) {
    throw new Error(`Ecosystem note "${note.id}" in biome "${biomeId}" references missing zone "${note.zoneId}".`);
  }
}

function validatePhenologyProfile(definition: BiomeDefinition): void {
  if (!definition.phenology) {
    return;
  }

  const entryIds = new Set(Object.keys(definition.entries));
  const spawnTables = new Map(definition.spawnTables.map((table) => [table.id, table]));

  for (const [phase, profile] of Object.entries(definition.phenology.phases)) {
    for (const accent of profile?.entryAccents ?? []) {
      if (!entryIds.has(accent.entryId)) {
        throw new Error(`Phenology accent "${accent.entryId}" in biome "${definition.id}" (${phase}) is missing.`);
      }
    }

    for (const emphasis of profile?.spawnEmphasis ?? []) {
      const table = spawnTables.get(emphasis.tableId);
      if (!table) {
        throw new Error(
          `Phenology spawn emphasis "${emphasis.tableId}" in biome "${definition.id}" (${phase}) is missing.`,
        );
      }

      for (const entryId of Object.keys(emphasis.weightAdjustments ?? {})) {
        if (!table.entries.some((entry) => entry.entryId === entryId)) {
          throw new Error(
            `Phenology spawn emphasis "${emphasis.tableId}" in biome "${definition.id}" (${phase}) references missing "${entryId}".`,
          );
        }
      }

      const minCount = table.minCount + (emphasis.minCountDelta ?? 0);
      const maxCount = table.maxCount + (emphasis.maxCountDelta ?? 0);
      if (minCount < 0 || maxCount < minCount) {
        throw new Error(
          `Phenology spawn emphasis "${emphasis.tableId}" in biome "${definition.id}" (${phase}) has invalid counts.`,
        );
      }
    }
  }
}

function validateHabitatProcessMoment(
  moment: HabitatProcessMoment,
  biomeId: string,
  entryIds: Set<string>,
  zoneIds: Set<string>,
): void {
  if (!moment.id.trim()) {
    throw new Error(`Habitat process moment in biome "${biomeId}" needs an id.`);
  }

  if (moment.entryIds.length < 1) {
    throw new Error(`Habitat process moment "${moment.id}" in biome "${biomeId}" needs linked entries.`);
  }

  for (const entryId of moment.entryIds) {
    if (!entryIds.has(entryId)) {
      throw new Error(
        `Habitat process moment "${moment.id}" in biome "${biomeId}" references missing entry "${entryId}".`,
      );
    }
  }

  for (const zoneId of moment.zoneIds ?? []) {
    if (!zoneIds.has(zoneId)) {
      throw new Error(
        `Habitat process moment "${moment.id}" in biome "${biomeId}" references missing zone "${zoneId}".`,
      );
    }
  }
}

export function validateBiomeDefinition(definition: BiomeDefinition): void {
  const entryIds = new Set(Object.keys(definition.entries));
  const zoneIds = new Set(definition.terrainRules.zones.map((zone) => zone.id));

  for (const entry of Object.values(definition.entries)) {
    validateInspectableEntry(entry);
  }

  for (const note of definition.ecosystemNotes) {
    validateEcosystemNote(note, definition.id, entryIds, zoneIds);
  }

  validatePhenologyProfile(definition);

  for (const moment of definition.processMoments ?? []) {
    validateHabitatProcessMoment(moment, definition.id, entryIds, zoneIds);
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

  for (const platform of definition.terrainRules.authoredPlatforms ?? []) {
    if (platform.w <= 0 || platform.h <= 0) {
      throw new Error(`Authored platform "${platform.id}" in biome "${definition.id}" needs positive size.`);
    }

    if (platform.x < 0 || platform.x + platform.w > definition.terrainRules.worldWidth) {
      throw new Error(`Authored platform "${platform.id}" in biome "${definition.id}" is out of bounds.`);
    }

    if (platform.y < 0 || platform.y > definition.terrainRules.worldHeight) {
      throw new Error(`Authored platform "${platform.id}" in biome "${definition.id}" has an invalid y position.`);
    }
  }

  for (const climbable of definition.terrainRules.authoredClimbables ?? []) {
    if (climbable.w <= 0 || climbable.h <= 0) {
      throw new Error(`Authored climbable "${climbable.id}" in biome "${definition.id}" needs positive size.`);
    }

    if (climbable.x < 0 || climbable.x + climbable.w > definition.terrainRules.worldWidth) {
      throw new Error(`Authored climbable "${climbable.id}" in biome "${definition.id}" is out of bounds.`);
    }

    if (climbable.y < 0 || climbable.y + climbable.h > definition.terrainRules.worldHeight) {
      throw new Error(`Authored climbable "${climbable.id}" in biome "${definition.id}" has an invalid height.`);
    }

    if (climbable.topExitY < 0 || climbable.topExitY > definition.terrainRules.worldHeight) {
      throw new Error(`Authored climbable "${climbable.id}" in biome "${definition.id}" has an invalid top exit.`);
    }

    if (climbable.topExitY > climbable.y + climbable.h) {
      throw new Error(`Authored climbable "${climbable.id}" in biome "${definition.id}" exits below its trunk.`);
    }
  }

  for (const feature of definition.terrainRules.authoredDepthFeatures ?? []) {
    if (feature.w <= 0 || feature.h <= 0) {
      throw new Error(`Authored depth feature "${feature.id}" in biome "${definition.id}" needs positive size.`);
    }

    if (feature.x < 0 || feature.x + feature.w > definition.terrainRules.worldWidth) {
      throw new Error(`Authored depth feature "${feature.id}" in biome "${definition.id}" is out of bounds.`);
    }

    if (feature.y < 0 || feature.y + feature.h > definition.terrainRules.worldHeight) {
      throw new Error(`Authored depth feature "${feature.id}" in biome "${definition.id}" has an invalid height.`);
    }
  }

  for (const placement of definition.terrainRules.authoredEntities ?? []) {
    const entry = definition.entries[placement.entryId];
    if (!entry) {
      throw new Error(
        `Authored entity "${placement.id}" in biome "${definition.id}" references missing entry "${placement.entryId}".`,
      );
    }

    const size = CATEGORY_SIZES[entry.category];
    if (placement.x < 0 || placement.x + size.width > definition.terrainRules.worldWidth) {
      throw new Error(`Authored entity "${placement.id}" in biome "${definition.id}" is out of bounds.`);
    }

    if (placement.y < 0 || placement.y + size.height > definition.terrainRules.worldHeight) {
      throw new Error(`Authored entity "${placement.id}" in biome "${definition.id}" has an invalid y position.`);
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

  for (const platform of definition.terrainRules.authoredPlatforms ?? []) {
    platforms.push({ ...platform });
  }

  return platforms.sort((left, right) => left.x - right.x || left.y - right.y);
}

function createClimbables(definition: BiomeDefinition): Climbable[] {
  return [...(definition.terrainRules.authoredClimbables ?? [])]
    .map((climbable) => ({ ...climbable }))
    .sort((left, right) => left.x - right.x || left.y - right.y);
}

function createDepthFeatures(definition: BiomeDefinition): DepthFeature[] {
  return [...(definition.terrainRules.authoredDepthFeatures ?? [])]
    .map((feature) => ({ ...feature }))
    .sort((left, right) => left.y - right.y || left.x - right.x);
}

function createAuthoredEntities(definition: BiomeDefinition): BiomeEntity[] {
  return [...(definition.terrainRules.authoredEntities ?? [])]
    .map((placement) => {
      const entry = definition.entries[placement.entryId];
      const size = CATEGORY_SIZES[entry.category];

      return {
        entityId: `authored-${placement.id}-${entry.id}`,
        entryId: entry.id,
        spriteId: entry.spriteId,
        x: Math.round(placement.x),
        y: Math.round(placement.y),
        w: size.width,
        h: size.height,
        category: entry.category,
        collectible: entry.collectible,
        refreshPolicy: placement.refreshPolicy ?? 'stable',
        castsShadow: placement.castsShadow ?? true,
        removed: false,
      };
    })
    .sort((left, right) => left.x - right.x || left.y - right.y);
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
    castsShadow: true,
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
  const phenologyPhase = buildWorldState(save, definition.id).phenologyPhase;
  const terrainSamples = buildTerrainSamples(definition, stableSeed);
  const platforms = createPlatforms(definition, terrainSamples, stableSeed);
  const climbables = createClimbables(definition);
  const clouds = createClouds(definition, stableSeed);
  const phaseProfile = getPhenologyPhaseProfile(definition, phenologyPhase);
  const spawnedEntities = definition.spawnTables.flatMap((table) =>
    spawnTableEntities(
      definition,
      phaseProfile.spawnEmphasis?.length ? applyPhenologyToSpawnTable(table, definition, phenologyPhase) : table,
      terrainSamples,
      table.refreshPolicy === 'stable'
        ? `${stableSeed}:${table.id}`
        : `${refreshSeed}:${table.id}`,
    ),
  );
  const entities = [...spawnedEntities, ...createAuthoredEntities(definition)].sort(
    (left, right) => left.x - right.x || left.y - right.y,
  );

  return {
    biomeId: definition.id,
    visitCount,
    terrainSamples,
    platforms,
    depthFeatures: createDepthFeatures(definition),
    climbables,
    entities,
    sparkles: createSparkles(definition, refreshSeed),
    clouds,
    width: definition.terrainRules.worldWidth,
    height: definition.terrainRules.worldHeight,
  };
}
