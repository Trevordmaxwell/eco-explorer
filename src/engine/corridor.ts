import {
  coastalForestCorridorPalette,
  corridorPalette,
  forestTreelineCorridorPalette,
  treelineTundraCorridorPalette,
} from '../assets/palette';
import {
  beachBiome,
  coastalScrubBiome,
  forestBiome,
  treelineBiome,
  tundraBiome,
} from '../content/biomes';
import { clamp, createSeededRandom, lerp } from './random';
import type {
  BiomeDefinition,
  BiomeEntity,
  BiomeInstance,
  Cloud,
  Facing,
  Platform,
  SaveState,
  Sparkle,
  TerrainSample,
} from './types';

export const BEACH_TO_SCRUB_CORRIDOR_ID = 'beach-coastal-corridor';
export const COASTAL_TO_FOREST_CORRIDOR_ID = 'coastal-forest-corridor';
export const FOREST_TO_TREELINE_CORRIDOR_ID = 'forest-treeline-corridor';
export const TREELINE_TO_TUNDRA_CORRIDOR_ID = 'treeline-tundra-corridor';

export type CorridorBiomeId = 'beach' | 'coastal-scrub' | 'forest' | 'treeline' | 'tundra';
export type CorridorSceneId =
  | typeof BEACH_TO_SCRUB_CORRIDOR_ID
  | typeof COASTAL_TO_FOREST_CORRIDOR_ID
  | typeof FOREST_TO_TREELINE_CORRIDOR_ID
  | typeof TREELINE_TO_TUNDRA_CORRIDOR_ID;

export interface CorridorVisualSpec {
  backdrop: 'coastal-dune' | 'ridge';
  leftSurfaceTile: string;
  leftFillTile: string;
  rightSurfaceTile: string;
  rightFillTile: string;
  blendStartX: number;
  blendEndX: number;
}

interface CorridorSpec {
  id: CorridorSceneId;
  name: string;
  leftBiomeId: CorridorBiomeId;
  rightBiomeId: CorridorBiomeId;
  leftZone: { id: string; label: string };
  rightZone: { id: string; label: string };
  palette: BiomeDefinition['palette'];
  parallaxLayers: BiomeDefinition['parallaxLayers'];
  visuals: CorridorVisualSpec;
  terrain: {
    startY: number;
    endY: number;
    centerLift: number;
    waveAmplitude: number;
    waveLength: number;
    variance: number;
    minY: number;
    maxY: number;
  };
  entries: BiomeDefinition['entries'];
  placements: Array<{ entryId: string; x: number; jitter: number }>;
  authoredPlatforms?: Platform[];
  entryPoints: Record<string, { x: number; y: number; facing: Facing }>;
  phenology?: BiomeDefinition['phenology'];
}

export interface CorridorScene {
  id: CorridorSceneId;
  definition: BiomeDefinition;
  instance: BiomeInstance;
  leftBiomeId: CorridorBiomeId;
  rightBiomeId: CorridorBiomeId;
  entryBiomeId: CorridorBiomeId;
  ownerBiomeId: CorridorBiomeId;
  thresholdX: number;
  entryPoints: Record<string, { x: number; y: number; facing: Facing }>;
  zoneMap: Record<string, { id: string; label: string }>;
}

const CORRIDOR_WIDTH = 256;
const CORRIDOR_HEIGHT = 144;
const SAMPLE_STEP = 16;
const EDGE_EXIT_PADDING = 8;
const CORRIDOR_THRESHOLD_X = 128;
const CORRIDOR_CONNECTED_BIOMES: CorridorBiomeId[] = [
  'beach',
  'coastal-scrub',
  'forest',
  'treeline',
  'tundra',
];

const CATEGORY_SIZES = {
  shell: { width: 6, height: 6 },
  plant: { width: 8, height: 12 },
  lichen: { width: 8, height: 12 },
  animal: { width: 8, height: 6 },
  landmark: { width: 14, height: 6 },
} as const;

const corridorSpecs: CorridorSpec[] = [
  {
    id: BEACH_TO_SCRUB_CORRIDOR_ID,
    name: 'Dune Corridor',
    leftBiomeId: 'beach',
    rightBiomeId: 'coastal-scrub',
    leftZone: { id: 'dune-edge', label: 'Dune Edge' },
    rightZone: { id: 'back-dune', label: 'Back Dune' },
    palette: corridorPalette,
    parallaxLayers: [
      { id: 'corridor-dunes', speed: 0.16, color: '#d9c08c', amplitude: 5, baseY: 82 },
      { id: 'corridor-scrub-band', speed: 0.3, color: '#80976e', amplitude: 6, baseY: 92 },
    ],
    visuals: {
      backdrop: 'coastal-dune',
      leftSurfaceTile: 'sand-top',
      leftFillTile: 'sand-fill',
      rightSurfaceTile: 'scrub-top',
      rightFillTile: 'scrub-fill',
      blendStartX: 88,
      blendEndX: 176,
    },
    terrain: {
      startY: 108,
      endY: 101,
      centerLift: -2.2,
      waveAmplitude: 1.6,
      waveLength: 30,
      variance: 1.1,
      minY: 98,
      maxY: 112,
    },
    entries: {
      'beach-grass': beachBiome.entries['beach-grass'],
      'sand-verbena': beachBiome.entries['sand-verbena'],
      'sea-rocket': beachBiome.entries['sea-rocket'],
      'dune-lupine': coastalScrubBiome.entries['dune-lupine'],
      'pacific-wax-myrtle': coastalScrubBiome.entries['pacific-wax-myrtle'],
      'coyote-brush': coastalScrubBiome.entries['coyote-brush'],
    } as BiomeDefinition['entries'],
    placements: [
      { entryId: 'beach-grass', x: 26, jitter: 4 },
      { entryId: 'sand-verbena', x: 50, jitter: 4 },
      { entryId: 'beach-grass', x: 74, jitter: 4 },
      { entryId: 'sea-rocket', x: 92, jitter: 4 },
      { entryId: 'sand-verbena', x: 114, jitter: 3 },
      { entryId: 'dune-lupine', x: 138, jitter: 4 },
      { entryId: 'beach-grass', x: 162, jitter: 4 },
      { entryId: 'dune-lupine', x: 186, jitter: 4 },
      { entryId: 'pacific-wax-myrtle', x: 210, jitter: 3 },
      { entryId: 'coyote-brush', x: 232, jitter: 2 },
    ],
    authoredPlatforms: [
      {
        id: 'back-dune-hold-lip',
        spriteId: 'drift-platform',
        x: 164,
        y: 101,
        w: 16,
        h: 4,
      },
      {
        id: 'back-dune-hold-rest',
        spriteId: 'drift-platform',
        x: 188,
        y: 97,
        w: 24,
        h: 4,
      },
    ],
    entryPoints: {
      beach: { x: 20, y: 94, facing: 'right' },
      'coastal-scrub': { x: 226, y: 92, facing: 'left' },
    },
    phenology: {
      phases: {
        early: {
          entryAccents: [
            {
              entryId: 'beach-grass',
              style: 'tuft',
              primaryColor: '#7d9d57',
              secondaryColor: '#c3d47d',
              spriteId: 'beach-grass-early',
            },
            {
              entryId: 'sand-verbena',
              style: 'tuft',
              primaryColor: '#91aa59',
              secondaryColor: '#e4d79b',
              spriteId: 'sand-verbena-early',
            },
            { entryId: 'dune-lupine', style: 'tuft', primaryColor: '#87a25a', secondaryColor: '#d7ddb1' },
          ],
        },
        peak: {
          entryAccents: [
            {
              entryId: 'beach-grass',
              style: 'tuft',
              primaryColor: '#8aaa57',
              secondaryColor: '#d7df8a',
              spriteId: 'beach-grass-peak',
            },
            {
              entryId: 'sand-verbena',
              style: 'bloom',
              primaryColor: '#f4cf62',
              secondaryColor: '#fff3ce',
              spriteId: 'sand-verbena-peak',
            },
            { entryId: 'dune-lupine', style: 'bloom', primaryColor: '#b9a5ef', secondaryColor: '#ece2ff' },
          ],
        },
        late: {
          entryAccents: [
            {
              entryId: 'beach-grass',
              style: 'seed',
              primaryColor: '#d0b36a',
              secondaryColor: '#f3e2a6',
              spriteId: 'beach-grass-late',
            },
            {
              entryId: 'sand-verbena',
              style: 'seed',
              primaryColor: '#cc9e60',
              secondaryColor: '#f1dab3',
              spriteId: 'sand-verbena-late',
            },
            { entryId: 'dune-lupine', style: 'seed', primaryColor: '#9a835a', secondaryColor: '#ddd0ad' },
          ],
        },
      },
    },
  },
  {
    id: COASTAL_TO_FOREST_CORRIDOR_ID,
    name: 'Sheltered Edge',
    leftBiomeId: 'coastal-scrub',
    rightBiomeId: 'forest',
    leftZone: { id: 'forest-edge', label: 'Forest Edge' },
    rightZone: { id: 'trailhead', label: 'Trailhead' },
    palette: coastalForestCorridorPalette,
    parallaxLayers: [
      { id: 'coastal-forest-ridge', speed: 0.15, color: '#9bad8a', amplitude: 5, baseY: 78 },
      { id: 'coastal-forest-band', speed: 0.31, color: '#5c7654', amplitude: 7, baseY: 90 },
    ],
    visuals: {
      backdrop: 'ridge',
      leftSurfaceTile: 'scrub-top',
      leftFillTile: 'scrub-fill',
      rightSurfaceTile: 'moss-top',
      rightFillTile: 'soil-fill',
      blendStartX: 84,
      blendEndX: 180,
    },
    terrain: {
      startY: 107,
      endY: 110,
      centerLift: -2.5,
      waveAmplitude: 1.4,
      waveLength: 28,
      variance: 1.2,
      minY: 100,
      maxY: 116,
    },
    entries: {
      'coyote-brush': coastalScrubBiome.entries['coyote-brush'],
      'pacific-wax-myrtle': coastalScrubBiome.entries['pacific-wax-myrtle'],
      'shore-pine': coastalScrubBiome.entries['shore-pine'],
      'sword-fern': coastalScrubBiome.entries['sword-fern'],
      'salmonberry': coastalScrubBiome.entries['salmonberry'],
      'nurse-log': coastalScrubBiome.entries['nurse-log'],
      'douglas-fir-sapling': forestBiome.entries['douglas-fir-sapling'],
      'redwood-sorrel': forestBiome.entries['redwood-sorrel'],
    } as BiomeDefinition['entries'],
    placements: [
      { entryId: 'coyote-brush', x: 28, jitter: 4 },
      { entryId: 'pacific-wax-myrtle', x: 54, jitter: 4 },
      { entryId: 'shore-pine', x: 82, jitter: 3 },
      { entryId: 'sword-fern', x: 104, jitter: 3 },
      { entryId: 'salmonberry', x: 118, jitter: 3 },
      { entryId: 'nurse-log', x: 124, jitter: 2 },
      { entryId: 'shore-pine', x: 146, jitter: 3 },
      { entryId: 'douglas-fir-sapling', x: 170, jitter: 4 },
      { entryId: 'redwood-sorrel', x: 198, jitter: 3 },
      { entryId: 'douglas-fir-sapling', x: 226, jitter: 2 },
    ],
    entryPoints: {
      'coastal-scrub': { x: 20, y: 94, facing: 'right' },
      forest: { x: 226, y: 94, facing: 'left' },
    },
  },
  {
    id: FOREST_TO_TREELINE_CORRIDOR_ID,
    name: 'Rising Pass',
    leftBiomeId: 'forest',
    rightBiomeId: 'treeline',
    leftZone: { id: 'log-run', label: 'Log Run' },
    rightZone: { id: 'thin-canopy', label: 'Thin Canopy' },
    palette: forestTreelineCorridorPalette,
    parallaxLayers: [
      { id: 'forest-treeline-ridge', speed: 0.14, color: '#a9b0a4', amplitude: 5, baseY: 76 },
      { id: 'forest-treeline-band', speed: 0.3, color: '#637166', amplitude: 8, baseY: 88 },
    ],
    visuals: {
      backdrop: 'ridge',
      leftSurfaceTile: 'moss-top',
      leftFillTile: 'soil-fill',
      rightSurfaceTile: 'treeline-top',
      rightFillTile: 'treeline-fill',
      blendStartX: 86,
      blendEndX: 182,
    },
    terrain: {
      startY: 110,
      endY: 106,
      centerLift: -3.5,
      waveAmplitude: 1.8,
      waveLength: 26,
      variance: 1.3,
      minY: 98,
      maxY: 114,
    },
    entries: {
      'douglas-fir-sapling': forestBiome.entries['douglas-fir-sapling'],
      'salal-berry': forestBiome.entries['salal-berry'],
      'sword-fern': forestBiome.entries['sword-fern'],
      'mountain-hemlock': treelineBiome.entries['mountain-hemlock'],
      'dwarf-birch': treelineBiome.entries['dwarf-birch'],
      'mountain-avens': treelineBiome.entries['mountain-avens'],
      'bog-blueberry': treelineBiome.entries['bog-blueberry'],
      'reindeer-lichen': treelineBiome.entries['reindeer-lichen'],
    } as BiomeDefinition['entries'],
    placements: [
      { entryId: 'douglas-fir-sapling', x: 26, jitter: 4 },
      { entryId: 'sword-fern', x: 50, jitter: 3 },
      { entryId: 'salal-berry', x: 74, jitter: 3 },
      { entryId: 'mountain-hemlock', x: 98, jitter: 4 },
      { entryId: 'sword-fern', x: 118, jitter: 3 },
      { entryId: 'dwarf-birch', x: 146, jitter: 3 },
      { entryId: 'mountain-hemlock', x: 172, jitter: 4 },
      { entryId: 'bog-blueberry', x: 192, jitter: 3 },
      { entryId: 'mountain-avens', x: 214, jitter: 2 },
      { entryId: 'reindeer-lichen', x: 234, jitter: 2 },
    ],
    entryPoints: {
      forest: { x: 20, y: 94, facing: 'right' },
      treeline: { x: 226, y: 94, facing: 'left' },
    },
  },
  {
    id: TREELINE_TO_TUNDRA_CORRIDOR_ID,
    name: 'Open Fell',
    leftBiomeId: 'treeline',
    rightBiomeId: 'tundra',
    leftZone: { id: 'lichen-fell', label: 'Lichen Fell' },
    rightZone: { id: 'wind-bluff', label: 'Wind Bluff' },
    palette: treelineTundraCorridorPalette,
    parallaxLayers: [
      { id: 'treeline-tundra-ridge', speed: 0.13, color: '#c7d1d8', amplitude: 4, baseY: 74 },
      { id: 'treeline-tundra-band', speed: 0.29, color: '#87979e', amplitude: 7, baseY: 88 },
    ],
    visuals: {
      backdrop: 'ridge',
      leftSurfaceTile: 'treeline-top',
      leftFillTile: 'treeline-fill',
      rightSurfaceTile: 'snow-top',
      rightFillTile: 'permafrost-fill',
      blendStartX: 88,
      blendEndX: 180,
    },
    terrain: {
      startY: 108,
      endY: 107,
      centerLift: -2.4,
      waveAmplitude: 1.5,
      waveLength: 30,
      variance: 1.0,
      minY: 100,
      maxY: 113,
    },
    entries: {
      'dwarf-birch': treelineBiome.entries['dwarf-birch'],
      'crowberry': treelineBiome.entries.crowberry,
      'reindeer-lichen': treelineBiome.entries['reindeer-lichen'],
      'mountain-avens': treelineBiome.entries['mountain-avens'],
      'arctic-willow': tundraBiome.entries['arctic-willow'],
      'purple-saxifrage': tundraBiome.entries['purple-saxifrage'],
      'woolly-lousewort': tundraBiome.entries['woolly-lousewort'],
      cottongrass: tundraBiome.entries.cottongrass,
    } as BiomeDefinition['entries'],
    placements: [
      { entryId: 'dwarf-birch', x: 28, jitter: 4 },
      { entryId: 'crowberry', x: 54, jitter: 3 },
      { entryId: 'arctic-willow', x: 82, jitter: 3 },
      { entryId: 'reindeer-lichen', x: 114, jitter: 2 },
      { entryId: 'mountain-avens', x: 148, jitter: 2 },
      { entryId: 'purple-saxifrage', x: 176, jitter: 3 },
      { entryId: 'crowberry', x: 198, jitter: 3 },
      { entryId: 'woolly-lousewort', x: 220, jitter: 2 },
      { entryId: 'cottongrass', x: 236, jitter: 2 },
    ],
    entryPoints: {
      treeline: { x: 20, y: 94, facing: 'right' },
      tundra: { x: 226, y: 94, facing: 'left' },
    },
  },
];

const corridorSpecsById = Object.fromEntries(
  corridorSpecs.map((spec) => [spec.id, spec]),
) as unknown as Record<CorridorSceneId, CorridorSpec>;

function buildTerrainSamples(seed: string, spec: CorridorSpec): TerrainSample[] {
  const random = createSeededRandom(`${seed}:terrain`);
  const samples: TerrainSample[] = [];

  for (let x = 0; x <= CORRIDOR_WIDTH; x += SAMPLE_STEP) {
    const progress = x / CORRIDOR_WIDTH;
    const baseY = lerp(spec.terrain.startY, spec.terrain.endY, progress);
    const centerLift = Math.sin(progress * Math.PI) * spec.terrain.centerLift;
    const wave = Math.sin((x + random.nextRange(0, 20)) / spec.terrain.waveLength) * spec.terrain.waveAmplitude;
    const variance = random.nextRange(-spec.terrain.variance, spec.terrain.variance);

    samples.push({
      x,
      y: clamp(baseY + centerLift + wave + variance, spec.terrain.minY, spec.terrain.maxY),
    });
  }

  for (let index = 1; index < samples.length - 1; index += 1) {
    samples[index].y = (samples[index - 1].y + samples[index].y + samples[index + 1].y) / 3;
  }

  samples[0].y = spec.terrain.startY;
  samples[samples.length - 1].y = spec.terrain.endY;
  return samples;
}

function sampleTerrainY(samples: TerrainSample[], x: number): number {
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

function createEntity(
  spec: CorridorSpec,
  entryId: string,
  x: number,
  terrainSamples: TerrainSample[],
  index: number,
): BiomeEntity {
  const entry = spec.entries[entryId];
  const size = CATEGORY_SIZES[entry.category];
  const groundY = sampleTerrainY(terrainSamples, x);

  return {
    entityId: `${spec.id}-${index}-${entry.id}-${Math.round(x)}`,
    entryId: entry.id,
    spriteId: entry.spriteId,
    x: Math.round(x),
    y: Math.round(groundY - size.height),
    w: size.width,
    h: size.height,
    category: entry.category,
    collectible: entry.collectible,
    refreshPolicy: 'stable',
    removed: false,
  };
}

function createEntities(spec: CorridorSpec, seed: string, terrainSamples: TerrainSample[]): BiomeEntity[] {
  const random = createSeededRandom(`${seed}:entities`);

  return spec.placements
    .map((placement, index) => {
      const x = clamp(
        placement.x + random.nextRange(-placement.jitter, placement.jitter),
        EDGE_EXIT_PADDING + 10,
        CORRIDOR_WIDTH - EDGE_EXIT_PADDING - 10,
      );
      return createEntity(spec, placement.entryId, x, terrainSamples, index);
    })
    .sort((left, right) => left.x - right.x);
}

function createClouds(seed: string): Cloud[] {
  const random = createSeededRandom(`${seed}:clouds`);
  return Array.from({ length: 2 }, (_, index) => ({
    x: 28 + index * 92 + random.nextRange(-8, 8),
    y: 22 + index * 8 + random.nextRange(-2, 2),
    w: 22 + random.nextRange(0, 8),
  }));
}

function createSparkles(seed: string): Sparkle[] {
  const random = createSeededRandom(`${seed}:sparkles`);
  return Array.from({ length: 9 }, () => ({
    x: random.nextRange(18, CORRIDOR_WIDTH - 18),
    y: random.nextRange(74, 112),
    phase: random.nextRange(0, Math.PI * 2),
  }));
}

function createDefinition(spec: CorridorSpec): BiomeDefinition {
  return {
    id: spec.id,
    name: spec.name,
    palette: spec.palette,
    tileSet: [spec.visuals.leftSurfaceTile, spec.visuals.leftFillTile, spec.visuals.rightSurfaceTile],
    parallaxLayers: spec.parallaxLayers,
    terrainRules: {
      worldWidth: CORRIDOR_WIDTH,
      worldHeight: CORRIDOR_HEIGHT,
      sampleStep: SAMPLE_STEP,
      zones: [
        { id: 'origin-anchor', label: 'Origin Anchor', start: 0, end: 48, surfaceBaseY: spec.terrain.startY, surfaceVariance: 2 },
        { id: 'early-blend', label: 'Early Blend', start: 48, end: 96, surfaceBaseY: lerp(spec.terrain.startY, spec.terrain.endY, 0.35), surfaceVariance: 2 },
        { id: 'center-blend', label: 'Center Blend', start: 96, end: 160, surfaceBaseY: lerp(spec.terrain.startY, spec.terrain.endY, 0.5), surfaceVariance: 2 },
        { id: 'late-blend', label: 'Late Blend', start: 160, end: 208, surfaceBaseY: lerp(spec.terrain.startY, spec.terrain.endY, 0.7), surfaceVariance: 2 },
        { id: 'destination-anchor', label: 'Destination Anchor', start: 208, end: 256, surfaceBaseY: spec.terrain.endY, surfaceVariance: 2 },
      ],
      platformRules: [],
      authoredPlatforms: spec.authoredPlatforms,
    },
    spawnTables: [],
    ambientRules: {
      cloudCount: [1, 2],
      sparkleCount: [8, 10],
    },
    entries: spec.entries,
    ecosystemNotes: [],
    phenology: spec.phenology,
    startPosition: { x: 20, y: 94 },
  };
}

function createInstance(spec: CorridorSpec, seed: string): BiomeInstance {
  const terrainSamples = buildTerrainSamples(seed, spec);

  return {
    biomeId: spec.id,
    visitCount: 0,
    terrainSamples,
    platforms: (spec.authoredPlatforms ?? []).map((platform) => ({ ...platform })),
    depthFeatures: [],
    climbables: [],
    entities: createEntities(spec, seed, terrainSamples),
    sparkles: createSparkles(seed),
    clouds: createClouds(seed),
    width: CORRIDOR_WIDTH,
    height: CORRIDOR_HEIGHT,
  };
}

function getCorridorSpecByBiomes(
  fromBiomeId: CorridorBiomeId,
  toBiomeId: CorridorBiomeId,
): CorridorSpec {
  const spec = corridorSpecs.find(
    (candidate) =>
      (candidate.leftBiomeId === fromBiomeId && candidate.rightBiomeId === toBiomeId) ||
      (candidate.leftBiomeId === toBiomeId && candidate.rightBiomeId === fromBiomeId),
  );

  if (!spec) {
    throw new Error(`No corridor exists between "${fromBiomeId}" and "${toBiomeId}".`);
  }

  return spec;
}

export function isCorridorConnectedBiomeId(biomeId: string): biomeId is CorridorBiomeId {
  return CORRIDOR_CONNECTED_BIOMES.includes(biomeId as CorridorBiomeId);
}

export function isCorridorBiomeId(biomeId: string): biomeId is CorridorSceneId {
  return biomeId in corridorSpecsById;
}

export function getCorridorVisuals(biomeId: string): CorridorVisualSpec | null {
  return isCorridorBiomeId(biomeId) ? corridorSpecsById[biomeId].visuals : null;
}

export function createCorridorScene(
  save: SaveState,
  fromBiomeId: CorridorBiomeId,
  toBiomeId: CorridorBiomeId,
): CorridorScene {
  const spec = getCorridorSpecByBiomes(fromBiomeId, toBiomeId);
  const stableSeed = `${save.worldSeed}:${spec.id}:stable`;

  return {
    id: spec.id,
    definition: createDefinition(spec),
    instance: createInstance(spec, stableSeed),
    leftBiomeId: spec.leftBiomeId,
    rightBiomeId: spec.rightBiomeId,
    entryBiomeId: fromBiomeId,
    ownerBiomeId: fromBiomeId,
    thresholdX: CORRIDOR_THRESHOLD_X,
    entryPoints: spec.entryPoints,
    zoneMap: {
      [spec.leftBiomeId]: spec.leftZone,
      [spec.rightBiomeId]: spec.rightZone,
    },
  };
}

export function createBeachToScrubCorridorScene(
  save: SaveState,
  entryBiomeId: 'beach' | 'coastal-scrub',
): CorridorScene {
  return createCorridorScene(
    save,
    entryBiomeId,
    entryBiomeId === 'beach' ? 'coastal-scrub' : 'beach',
  );
}

export function resolveCorridorOwnerBiomeId(
  corridor: CorridorScene,
  playerCenterX: number,
): CorridorBiomeId {
  return playerCenterX < corridor.thresholdX ? corridor.leftBiomeId : corridor.rightBiomeId;
}

export function getCorridorZoneForOwner(corridor: CorridorScene, ownerBiomeId: string) {
  if (ownerBiomeId === corridor.rightBiomeId) {
    return corridor.zoneMap[corridor.rightBiomeId];
  }

  return corridor.zoneMap[corridor.leftBiomeId];
}

export function getCorridorEntryPoint(corridor: CorridorScene, biomeId: CorridorBiomeId) {
  return corridor.entryPoints[biomeId];
}

export function getCorridorExitBiomeId(
  corridor: CorridorScene,
  playerCenterX: number,
): CorridorBiomeId | null {
  if (playerCenterX <= EDGE_EXIT_PADDING) {
    return corridor.leftBiomeId;
  }

  if (playerCenterX >= corridor.instance.width - EDGE_EXIT_PADDING) {
    return corridor.rightBiomeId;
  }

  return null;
}
