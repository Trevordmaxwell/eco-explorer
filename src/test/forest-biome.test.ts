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

  it('adds a lowered root-hollow lane with a multi-platform cave climb route', () => {
    const save = createNewSaveState('forest-proof-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtFernHollow = instance.terrainSamples.find((sample) => sample.x === 272);
    const terrainAtRootHollow = instance.terrainSamples.find((sample) => sample.x === 352);
    const terrainAtLogRun = instance.terrainSamples.find((sample) => sample.x === 448);
    const rootPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('root-hollow'));
    const midLedge = rootPlatforms.find((platform) => platform.id === 'root-hollow-mid-ledge');
    const caveSill = rootPlatforms.find((platform) => platform.id === 'root-hollow-cave-sill');
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
      topExitY: climbable.topExitY,
    }));

    expect(terrainAtFernHollow).toBeDefined();
    expect(terrainAtRootHollow).toBeDefined();
    expect(terrainAtLogRun).toBeDefined();
    expect(instance.height).toBe(208);
    expect((terrainAtRootHollow?.y ?? 0) - (terrainAtFernHollow?.y ?? 0)).toBeGreaterThanOrEqual(24);
    expect((terrainAtRootHollow?.y ?? 0) - (terrainAtLogRun?.y ?? 0)).toBeGreaterThanOrEqual(20);
    expect(rootPlatforms.map((platform) => platform.id)).toEqual([
      'root-hollow-entry-log',
      'root-hollow-mid-ledge',
      'root-hollow-cave-sill',
      'root-hollow-high-ledge',
      'root-hollow-exit-log',
    ]);
    expect(depthFeatures).toEqual([
      { id: 'root-hollow-root-arch', style: 'root-chamber', y: 70, h: 110 },
      { id: 'root-hollow-stone-pocket', style: 'stone-pocket', y: 132, h: 38 },
    ]);
    expect(climbables).toEqual([
      { id: 'root-hollow-fir-trunk', x: 332, topExitY: 98 },
      { id: 'root-hollow-cave-trunk', x: 404, topExitY: 78 },
      { id: 'log-run-fir-trunk', x: 446, topExitY: 96 },
    ]);
    expect(midLedge?.y).toBeLessThan(rootPlatforms[0]?.y ?? 0);
    expect(caveSill?.y).toBeGreaterThan(midLedge?.y ?? 0);
    expect(highLedge?.y).toBeLessThan(midLedge?.y ?? 0);
  });

  it('spawns lower-route moisture life inside the new root-hollow zone', () => {
    const save = createNewSaveState('forest-root-hollow-life-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const rootHollowLife = instance.entities.filter(
      (entity) =>
        entity.x >= 280 &&
        entity.x <= 420 &&
        ['banana-slug', 'sword-fern', 'redwood-sorrel'].includes(entity.entryId),
    );

    expect(rootHollowLife.length).toBeGreaterThanOrEqual(3);
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

    expect(authoredNiches).toEqual([
      { entryId: 'licorice-fern', x: 324, y: 118, castsShadow: false },
      { entryId: 'tree-lungwort', x: 348, y: 130, castsShadow: false },
      { entryId: 'ensatina', x: 364, y: 146, castsShadow: true },
      { entryId: 'tree-lungwort', x: 384, y: 100, castsShadow: false },
      { entryId: 'licorice-fern', x: 410, y: 76, castsShadow: true },
      { entryId: 'licorice-fern', x: 438, y: 90, castsShadow: false },
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
