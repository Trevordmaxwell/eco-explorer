import { tundraPalette } from '../../assets/palette';
import type { BiomeDefinition } from '../../engine/types';

const tundraEntries = {
  'arctic-willow': {
    id: 'arctic-willow',
    commonName: 'Arctic Willow',
    scientificName: 'Salix arctica',
    category: 'plant',
    shortFact: 'Arctic willow grows low to the ground so strong wind blows over it.',
    journalText:
      'Arctic willow is one of the tiniest woody plants in the far north. Staying close to the soil helps it keep warmer air around its stems and leaves.',
    spriteId: 'arctic-willow',
    collectible: false,
  },
  'purple-saxifrage': {
    id: 'purple-saxifrage',
    commonName: 'Purple Saxifrage',
    scientificName: 'Saxifraga oppositifolia',
    category: 'plant',
    shortFact: 'Purple saxifrage can bloom soon after snow starts to melt.',
    journalText:
      'Purple saxifrage is one of the first flowers to brighten Arctic ground. Its low mats help protect the plant from cold air and drying wind.',
    spriteId: 'purple-saxifrage',
    collectible: false,
  },
  cottongrass: {
    id: 'cottongrass',
    commonName: 'Cottongrass',
    scientificName: 'Eriophorum angustifolium',
    category: 'plant',
    shortFact: 'Its fluffy seed heads help wind carry new seeds across wet tundra.',
    journalText:
      'Cottongrass grows in soggy Arctic soil. The white tufts are not cotton at all. They are seed fibers that help spread the plant.',
    spriteId: 'cottongrass',
    collectible: false,
  },
  cloudberry: {
    id: 'cloudberry',
    commonName: 'Cloudberry',
    scientificName: 'Rubus chamaemorus',
    category: 'plant',
    shortFact: 'Cloudberries ripen quickly during the short Arctic summer.',
    journalText:
      'Cloudberry plants stay small and low, but their orange berries are full of energy. Birds, bears, and people all eat them when summer is at its brightest.',
    spriteId: 'cloudberry',
    collectible: true,
  },
  crowberry: {
    id: 'crowberry',
    commonName: 'Crowberry',
    scientificName: 'Empetrum nigrum',
    category: 'plant',
    shortFact: 'Crowberry keeps tiny evergreen leaves so it can start growing quickly after winter.',
    journalText:
      'Crowberry is a low Arctic shrub with dark berries. Its small leaves help the plant hold on to water when cold wind sweeps across the tundra.',
    spriteId: 'crowberry',
    collectible: true,
  },
  'arctic-hare': {
    id: 'arctic-hare',
    commonName: 'Arctic Hare',
    scientificName: 'Lepus arcticus',
    category: 'animal',
    shortFact: 'Wide feet help an Arctic hare run across snow and soft ground.',
    journalText:
      'Arctic hares have thick fur and powerful legs for cold places. Their pale coats help them blend into snowy ground during much of the year.',
    spriteId: 'arctic-hare',
    collectible: false,
  },
  'snow-bunting': {
    id: 'snow-bunting',
    commonName: 'Snow Bunting',
    scientificName: 'Plectrophenax nivalis',
    category: 'animal',
    shortFact: 'Snow buntings nest on the ground in rocky places where wind cannot reach as easily.',
    journalText:
      'Snow buntings are hardy birds that return north early in the season. They search the tundra for seeds and insects during the brief summer.',
    spriteId: 'snow-bunting',
    collectible: false,
  },
} satisfies BiomeDefinition['entries'];

export const tundraBiome: BiomeDefinition = {
  id: 'tundra',
  name: 'Tundra Reach',
  palette: tundraPalette,
  tileSet: ['snow-top', 'permafrost-fill', 'ice-platform'],
  parallaxLayers: [
    { id: 'far-ice', speed: 0.12, color: '#d7e9f4', amplitude: 4, baseY: 70 },
    { id: 'frost-ridge', speed: 0.28, color: '#9db9cb', amplitude: 7, baseY: 88 },
  ],
  terrainRules: {
    worldWidth: 640,
    worldHeight: 144,
    sampleStep: 16,
    zones: [
      { id: 'wind-bluff', label: 'Wind Bluff', start: 0, end: 150, surfaceBaseY: 108, surfaceVariance: 4 },
      { id: 'snow-meadow', label: 'Snow Meadow', start: 150, end: 340, surfaceBaseY: 112, surfaceVariance: 3 },
      { id: 'frost-ridge', label: 'Frost Ridge', start: 340, end: 520, surfaceBaseY: 109, surfaceVariance: 5 },
      { id: 'meltwater-edge', label: 'Meltwater Edge', start: 520, end: 640, surfaceBaseY: 114, surfaceVariance: 4 },
    ],
    platformRules: [
      {
        id: 'ice-shelf',
        zoneId: 'snow-meadow',
        minCount: 1,
        maxCount: 2,
        minWidth: 18,
        maxWidth: 28,
        height: 4,
        liftMin: 8,
        liftMax: 12,
        spriteId: 'ice-platform',
      },
      {
        id: 'ridge-ledge',
        zoneId: 'frost-ridge',
        minCount: 1,
        maxCount: 2,
        minWidth: 16,
        maxWidth: 24,
        height: 4,
        liftMin: 9,
        liftMax: 14,
        spriteId: 'ice-platform',
      },
    ],
  },
  spawnTables: [
    {
      id: 'stable-willow',
      zoneId: 'wind-bluff',
      refreshPolicy: 'stable',
      minCount: 2,
      maxCount: 3,
      spacing: 30,
      entries: [{ entryId: 'arctic-willow', weight: 1 }],
    },
    {
      id: 'stable-flowers',
      zoneId: 'snow-meadow',
      refreshPolicy: 'stable',
      minCount: 3,
      maxCount: 4,
      spacing: 22,
      entries: [
        { entryId: 'purple-saxifrage', weight: 4 },
        { entryId: 'cottongrass', weight: 3 },
      ],
    },
    {
      id: 'stable-grasses',
      zoneId: 'meltwater-edge',
      refreshPolicy: 'stable',
      minCount: 2,
      maxCount: 3,
      spacing: 26,
      entries: [
        { entryId: 'cottongrass', weight: 4 },
        { entryId: 'arctic-willow', weight: 2 },
      ],
    },
    {
      id: 'berry-patches',
      zoneId: 'snow-meadow',
      refreshPolicy: 'visit',
      minCount: 2,
      maxCount: 3,
      spacing: 20,
      entries: [
        { entryId: 'cloudberry', weight: 3 },
        { entryId: 'crowberry', weight: 2 },
      ],
    },
    {
      id: 'ridge-berries',
      zoneId: 'frost-ridge',
      refreshPolicy: 'visit',
      minCount: 2,
      maxCount: 3,
      spacing: 18,
      entries: [
        { entryId: 'crowberry', weight: 3 },
        { entryId: 'cloudberry', weight: 1 },
      ],
    },
    {
      id: 'tundra-life',
      zoneId: 'wind-bluff',
      refreshPolicy: 'visit',
      minCount: 1,
      maxCount: 2,
      spacing: 34,
      entries: [
        { entryId: 'arctic-hare', weight: 3 },
        { entryId: 'snow-bunting', weight: 2 },
      ],
    },
    {
      id: 'meltwater-life',
      zoneId: 'meltwater-edge',
      refreshPolicy: 'visit',
      minCount: 2,
      maxCount: 3,
      spacing: 28,
      entries: [
        { entryId: 'snow-bunting', weight: 3 },
        { entryId: 'arctic-hare', weight: 1 },
      ],
    },
  ],
  ambientRules: {
    cloudCount: [1, 3],
    sparkleCount: [10, 16],
  },
  entries: tundraEntries,
  startPosition: {
    x: 24,
    y: 82,
  },
};
