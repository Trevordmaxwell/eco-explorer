import { describe, expect, it } from 'vitest';
import { forestBiome } from '../content/biomes/forest';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('forest biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(forestBiome)).not.toThrow();
  });

  it('provides complete fact data for every inspectable entry', () => {
    for (const entry of Object.values(forestBiome.entries)) {
      expect(entry.commonName.length).toBeGreaterThan(0);
      expect(entry.shortFact.length).toBeGreaterThan(0);
      expect(entry.journalText.length).toBeGreaterThan(0);
      expect(entry.spriteId.length).toBeGreaterThan(0);

      if (entry.category === 'landmark') {
        expect(entry.subtitle.length).toBeGreaterThan(0);
      } else {
        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });

  it('includes the new wildflower, shrub, amphibian, and woodpecker discoveries in live spawn tables', () => {
    const spawnEntryIds = new Set(
      forestBiome.spawnTables.flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );

    expect(spawnEntryIds.has('western-trillium')).toBe(true);
    expect(spawnEntryIds.has('pileated-woodpecker')).toBe(true);
    expect(spawnEntryIds.has('salmonberry')).toBe(true);
    expect(spawnEntryIds.has('ensatina')).toBe(true);
    expect(spawnEntryIds.has('nootka-rose')).toBe(true);
    expect(spawnEntryIds.has('red-huckleberry')).toBe(true);
  });
});

describe('forest biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('forest-seed');
    const firstVisit = generateBiomeInstance(forestBiome, save, 1);
    const secondVisit = generateBiomeInstance(forestBiome, save, 2);

    const stableFirst = firstVisit.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const stableSecond = secondVisit.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const visitFirst = firstVisit.entities
      .filter((entity) => entity.refreshPolicy === 'visit')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const visitSecond = secondVisit.entities
      .filter((entity) => entity.refreshPolicy === 'visit')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));

    expect(stableFirst).toEqual(stableSecond);
    expect(visitFirst).not.toEqual(visitSecond);
  });

  it('adds a deeper root-hollow family with an upper lip, seep pocket, stone basin, and filtered return', () => {
    const save = createNewSaveState('forest-proof-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtFernHollow = instance.terrainSamples.find((sample) => sample.x === 272);
    const terrainAtRootHollow = instance.terrainSamples.find((sample) => sample.x === 320);
    const terrainAtSeepPocket = instance.terrainSamples.find((sample) => sample.x === 368);
    const terrainAtStoneBasin = instance.terrainSamples.find((sample) => sample.x === 384);
    const terrainAtFilteredReturn = instance.terrainSamples.find((sample) => sample.x === 416);
    const terrainAtLogRun = instance.terrainSamples.find((sample) => sample.x === 448);
    const rootPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('root-hollow'));
    const midLedge = rootPlatforms.find((platform) => platform.id === 'root-hollow-mid-ledge');
    const caveSill = rootPlatforms.find((platform) => platform.id === 'root-hollow-cave-sill');
    const basinSill = rootPlatforms.find((platform) => platform.id === 'root-hollow-basin-sill');
    const highLedge = rootPlatforms.find((platform) => platform.id === 'root-hollow-high-ledge');
    const depthFeatures = instance.depthFeatures.map((feature) => ({
      id: feature.id,
      style: feature.style,
      y: feature.y,
      h: feature.h,
    }));
    const climbables = instance.climbables.map((climbable) => ({
      id: climbable.id,
      x: climbable.x,
      h: climbable.h,
      topExitY: climbable.topExitY,
    }));

    expect(terrainAtFernHollow).toBeDefined();
    expect(terrainAtRootHollow).toBeDefined();
    expect(terrainAtSeepPocket).toBeDefined();
    expect(terrainAtStoneBasin).toBeDefined();
    expect(terrainAtFilteredReturn).toBeDefined();
    expect(terrainAtLogRun).toBeDefined();
    expect(instance.height).toBe(336);
    expect((terrainAtRootHollow?.y ?? 0) - (terrainAtFernHollow?.y ?? 0)).toBeGreaterThanOrEqual(23);
    expect((terrainAtSeepPocket?.y ?? 0) - (terrainAtRootHollow?.y ?? 0)).toBeGreaterThanOrEqual(22);
    expect((terrainAtStoneBasin?.y ?? 0) - (terrainAtSeepPocket?.y ?? 0)).toBeGreaterThanOrEqual(18);
    expect((terrainAtStoneBasin?.y ?? 0) - (terrainAtFilteredReturn?.y ?? 0)).toBeGreaterThanOrEqual(26);
    expect((terrainAtFilteredReturn?.y ?? 0) - (terrainAtLogRun?.y ?? 0)).toBeGreaterThanOrEqual(28);
    expect(rootPlatforms.map((platform) => platform.id)).toEqual([
      'root-hollow-entry-log',
      'root-hollow-mid-ledge',
      'root-hollow-cave-sill',
      'root-hollow-return-nook',
      'root-hollow-basin-sill',
      'root-hollow-high-ledge',
      'root-hollow-exit-log',
    ]);
    expect(depthFeatures).toEqual(expect.arrayContaining([
      { id: 'root-hollow-root-arch', style: 'root-chamber', y: 64, h: 170 },
      { id: 'root-hollow-stone-basin', style: 'stone-pocket', y: 188, h: 56 },
      { id: 'root-hollow-filtered-pocket', style: 'root-chamber', y: 100, h: 104 },
    ]));
    expect(climbables).toEqual(expect.arrayContaining([
      { id: 'root-hollow-fir-trunk', x: 332, h: 108, topExitY: 98 },
      { id: 'root-hollow-cave-trunk', x: 404, h: 186, topExitY: 78 },
      { id: 'log-run-fir-trunk', x: 446, h: 74, topExitY: 96 },
    ]));
    expect(midLedge?.y).toBeLessThan(rootPlatforms[0]?.y ?? 0);
    expect(caveSill?.y).toBeGreaterThan(midLedge?.y ?? 0);
    expect(caveSill?.y).toBeLessThan(terrainAtSeepPocket?.y ?? 0);
    expect(basinSill?.y).toBeGreaterThan(caveSill?.y ?? 0);
    expect(basinSill?.y).toBeLessThan(terrainAtStoneBasin?.y ?? 0);
    expect(highLedge?.y).toBeLessThan(midLedge?.y ?? 0);
  });

  it('adds a far-right old-growth pocket with a taller two-stage climb route', () => {
    const save = createNewSaveState('forest-old-growth-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtCreekBend = instance.terrainSamples.find((sample) => sample.x === 608);
    const terrainAtOldGrowthPocket = instance.terrainSamples.find((sample) => sample.x === 688);
    const terrainAtOldGrowthRise = instance.terrainSamples.find((sample) => sample.x === 784);
    const oldGrowthPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('old-growth'));
    const oldGrowthDepthFeatures = instance.depthFeatures
      .filter((feature) => feature.id.startsWith('old-growth'))
      .map((feature) => ({
        id: feature.id,
        style: feature.style,
        y: feature.y,
        h: feature.h,
      }));
    const oldGrowthClimbables = instance.climbables
      .filter((climbable) => climbable.id.startsWith('old-growth'))
      .map((climbable) => ({
        id: climbable.id,
        x: climbable.x,
        w: climbable.w,
        topExitY: climbable.topExitY,
      }));

    expect(instance.width).toBe(800);
    expect(instance.height).toBe(336);
    expect(terrainAtCreekBend).toBeDefined();
    expect(terrainAtOldGrowthPocket).toBeDefined();
    expect(terrainAtOldGrowthRise).toBeDefined();
    expect((terrainAtOldGrowthPocket?.y ?? 0) - (terrainAtCreekBend?.y ?? 0)).toBeGreaterThanOrEqual(28);
    expect((terrainAtOldGrowthPocket?.y ?? 0) - (terrainAtOldGrowthRise?.y ?? 0)).toBeGreaterThanOrEqual(18);
    expect(oldGrowthPlatforms.map((platform) => platform.id)).toEqual([
      'old-growth-root-log',
      'old-growth-crossover-limb',
      'old-growth-crown-window',
      'old-growth-bark-shelf',
      'old-growth-high-perch',
      'old-growth-inner-bark-rest',
      'old-growth-canopy-ledge',
    ]);
    expect(oldGrowthDepthFeatures).toEqual([
      { id: 'old-growth-canopy-pocket', style: 'canopy-pocket', y: 14, h: 104 },
      { id: 'old-growth-trunk-interior', style: 'trunk-interior', y: 56, h: 134 },
    ]);
    expect(oldGrowthClimbables).toEqual([
      { id: 'old-growth-inner-bark-snag', x: 678, w: 8, topExitY: 18 },
      { id: 'old-growth-main-trunk', x: 686, w: 24, topExitY: 108 },
      { id: 'old-growth-canopy-rung', x: 708, w: 8, topExitY: 26 },
      { id: 'old-growth-upper-snag', x: 736, w: 8, topExitY: 48 },
    ]);
  });

  it('authors one tiny cave-return cue and one tiny canopy-rest cue for the new vertical spaces', () => {
    expect(forestBiome.verticalCues).toEqual([
      {
        id: 'stone-basin-return-light',
        style: 'recovery-light',
        x: 390,
        y: 92,
        zoneIds: ['seep-pocket', 'stone-basin', 'filtered-return'],
      },
      {
        id: 'old-growth-inner-rest-light',
        style: 'canopy-opening',
        x: 724,
        y: 46,
        zoneIds: ['old-growth-pocket'],
      },
    ]);
  });

  it('adds one optional old-wood bridge between creek-bend and the old-growth pocket', () => {
    const save = createNewSaveState('forest-bridge-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtCreekBend = instance.terrainSamples.find((sample) => sample.x === 592);
    const terrainAtBridgeDrop = instance.terrainSamples.find((sample) => sample.x === 624);
    const bridgePlatforms = instance.platforms
      .filter((platform) => platform.id.startsWith('forest-layer-bridge'))
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const bridgeEntities = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-forest-layer-bridge'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));
    const bridgeNote = forestBiome.ecosystemNotes.find((note) => note.id === 'old-wood-link');

    expect(terrainAtCreekBend).toBeDefined();
    expect(terrainAtBridgeDrop).toBeDefined();
    expect(bridgePlatforms).toEqual([
      { id: 'forest-layer-bridge-log', x: 580, y: 98, w: 36 },
      { id: 'forest-layer-bridge-span', x: 614, y: 106, w: 38 },
    ]);
    expect(bridgePlatforms[0]?.y).toBeLessThan((terrainAtCreekBend?.y ?? 0) - 8);
    expect(bridgePlatforms[1]?.y).toBeLessThan((terrainAtBridgeDrop?.y ?? 0) - 30);
    expect(bridgeEntities).toEqual([
      { entryId: 'fallen-giant-log', x: 606, y: 100, castsShadow: true },
      { entryId: 'tree-lungwort', x: 632, y: 104, castsShadow: false },
    ]);
    expect(bridgeNote).toMatchObject({
      title: 'Old Wood Link',
      minimumDiscoveries: 3,
      zoneId: 'creek-bend',
      entryIds: ['fallen-giant-log', 'seep-stone', 'woodpecker-cavity'],
    });
  });

  it('spawns moisture life and a landmark inside the deeper seep pocket', () => {
    const save = createNewSaveState('forest-root-hollow-life-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const rootHollowLife = instance.entities.filter(
      (entity) =>
        entity.x >= 344 &&
        entity.x <= 432 &&
        ['banana-slug', 'sword-fern', 'redwood-sorrel', 'seep-stone'].includes(entity.entryId),
    );

    expect(rootHollowLife.length).toBeGreaterThanOrEqual(3);
    expect(rootHollowLife.some((entity) => entity.entryId === 'seep-stone')).toBe(true);
  });

  it('authors niche species onto trunks, ledges, and the damp cave shelf', () => {
    const save = createNewSaveState('forest-niche-species-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const authoredNiches = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(authoredNiches).toEqual(expect.arrayContaining([
      { entryId: 'licorice-fern', x: 324, y: 118, castsShadow: false },
      { entryId: 'tree-lungwort', x: 350, y: 148, castsShadow: false },
      { entryId: 'seep-stone', x: 356, y: 172, castsShadow: true },
      { entryId: 'ensatina', x: 384, y: 210, castsShadow: true },
      { entryId: 'banana-slug', x: 396, y: 212, castsShadow: true },
      { entryId: 'tree-lungwort', x: 384, y: 100, castsShadow: false },
      { entryId: 'redwood-sorrel', x: 402, y: 150, castsShadow: true },
      { entryId: 'root-curtain', x: 414, y: 124, castsShadow: false },
      { entryId: 'tree-lungwort', x: 380, y: 88, castsShadow: false },
      { entryId: 'licorice-fern', x: 410, y: 76, castsShadow: true },
      { entryId: 'licorice-fern', x: 438, y: 90, castsShadow: false },
    ]));
  });

  it('authors old-growth bark-life carriers into the far-right pocket', () => {
    const save = createNewSaveState('forest-old-growth-niches-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const oldGrowthNiches = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-old-growth'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(oldGrowthNiches).toEqual([
      { entryId: 'redwood-sorrel', x: 640, y: 164, castsShadow: true },
      { entryId: 'red-huckleberry', x: 656, y: 152, castsShadow: true },
      { entryId: 'tree-lungwort', x: 666, y: 24, castsShadow: false },
      { entryId: 'licorice-fern', x: 694, y: 106, castsShadow: false },
      { entryId: 'licorice-fern', x: 700, y: 30, castsShadow: false },
      { entryId: 'woodpecker-cavity', x: 702, y: 132, castsShadow: false },
      { entryId: 'tree-lungwort', x: 724, y: 54, castsShadow: false },
      { entryId: 'tree-lungwort', x: 748, y: 74, castsShadow: false },
      { entryId: 'pileated-woodpecker', x: 764, y: 64, castsShadow: true },
    ]);
  });

  it('adds a richer berry and thorny edge to the first forest half', () => {
    const save = createNewSaveState('forest-edge-thicket-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const earlyForest = instance.entities.filter(
      (entity) =>
        entity.x <= 280 && ['nootka-rose', 'red-huckleberry', 'salmonberry'].includes(entity.entryId),
    );

    expect(earlyForest.some((entity) => entity.entryId === 'nootka-rose')).toBe(true);
    expect(earlyForest.some((entity) => entity.entryId === 'red-huckleberry')).toBe(true);
  });
});
