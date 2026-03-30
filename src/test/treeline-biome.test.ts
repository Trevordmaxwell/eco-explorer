import { describe, expect, it } from 'vitest';

import { treelineBiome } from '../content/biomes/treeline';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('treeline biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(treelineBiome)).not.toThrow();
  });

  it('keeps the intended four-zone ecotone order', () => {
    expect(treelineBiome.terrainRules.zones.map((zone) => zone.id)).toEqual([
      'thin-canopy',
      'krummholz-belt',
      'dwarf-shrub',
      'lichen-fell',
    ]);
  });

  it('reuses tundra-facing shared species ids for continuity', () => {
    expect(treelineBiome.entries['arctic-willow'].id).toBe('arctic-willow');
    expect(treelineBiome.entries.crowberry.id).toBe('crowberry');
    expect(treelineBiome.entries['mountain-avens'].id).toBe('mountain-avens');
    expect(treelineBiome.entries.lingonberry.id).toBe('lingonberry');
  });

  it('keeps reindeer lichen in a dedicated lichen category', () => {
    expect(treelineBiome.entries['reindeer-lichen'].category).toBe('lichen');
  });

  it('adds a cushion plant and talus mammal to the live treeline mix', () => {
    expect(treelineBiome.entries['moss-campion'].id).toBe('moss-campion');
    expect(treelineBiome.entries['hoary-marmot'].id).toBe('hoary-marmot');
    expect(treelineBiome.entries['white-arctic-mountain-heather'].id).toBe('white-arctic-mountain-heather');
  });
});

describe('treeline biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('treeline-seed');
    const firstVisit = generateBiomeInstance(treelineBiome, save, 1);
    const secondVisit = generateBiomeInstance(treelineBiome, save, 2);

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

  it('keeps the gradient anchors visible in generated stable content', () => {
    const save = createNewSaveState('treeline-seed');
    const generated = generateBiomeInstance(treelineBiome, save, 1);
    const stableEntryIds = generated.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => entity.entryId);

    expect(stableEntryIds).toContain('mountain-hemlock');
    expect(stableEntryIds).toContain('krummholz-spruce');
    expect(stableEntryIds).toContain('reindeer-lichen');
    expect(stableEntryIds).toContain('frost-heave-boulder');
    expect(stableEntryIds).toContain('white-arctic-mountain-heather');
  });

  it('adds a lowered lee-side lane with authored upper stones for the treeline shelter proof', () => {
    const save = createNewSaveState('treeline-proof-seed');
    const instance = generateBiomeInstance(treelineBiome, save, 1);

    const terrainAtKrummholz = instance.terrainSamples.find((sample) => sample.x === 304);
    const terrainAtLeePocket = instance.terrainSamples.find((sample) => sample.x === 400);
    const terrainAtFell = instance.terrainSamples.find((sample) => sample.x === 544);
    const leePlatforms = instance.platforms.filter((platform) => platform.id.startsWith('lee-pocket'));

    expect(terrainAtKrummholz).toBeDefined();
    expect(terrainAtLeePocket).toBeDefined();
    expect(terrainAtFell).toBeDefined();
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtKrummholz?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtFell?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect(leePlatforms.map((platform) => platform.id)).toEqual([
      'lee-pocket-entry-stone',
      'lee-pocket-upper-shelf',
      'lee-pocket-exit-stone',
    ]);
    expect(leePlatforms[0]?.y).toBeGreaterThan(leePlatforms[1]?.y ?? 0);
    expect(leePlatforms[2]?.y).toBeGreaterThan(leePlatforms[1]?.y ?? 0);
  });

  it('spawns shelter carriers through the new lee-side traversal band', () => {
    const save = createNewSaveState('treeline-shelter-band-seed');
    const instance = generateBiomeInstance(treelineBiome, save, 1);
    const shelterBand = instance.entities.filter(
      (entity) =>
        entity.x >= 328 &&
        entity.x <= 504 &&
        ['frost-heave-boulder', 'bog-blueberry', 'crowberry', 'hoary-marmot', 'rock-ptarmigan'].includes(
          entity.entryId,
        ),
    );

    expect(shelterBand.length).toBeGreaterThanOrEqual(3);
    expect(shelterBand.some((entity) => entity.entryId === 'frost-heave-boulder')).toBe(true);
    expect(shelterBand.some((entity) => entity.entryId === 'hoary-marmot')).toBe(true);
  });

  it('adds heath and berry mats across the open alpine half', () => {
    const save = createNewSaveState('treeline-heath-berry-seed');
    const visits = [1, 2, 3, 4].map((visitCount) => generateBiomeInstance(treelineBiome, save, visitCount));

    const alpineEntities = visits.flatMap((instance) =>
      instance.entities.filter(
        (entity) =>
          entity.x >= 328 &&
          ['white-arctic-mountain-heather', 'lingonberry', 'bog-blueberry', 'crowberry'].includes(entity.entryId),
      ),
    );

    expect(alpineEntities.some((entity) => entity.entryId === 'white-arctic-mountain-heather')).toBe(true);
    expect(alpineEntities.some((entity) => entity.entryId === 'lingonberry')).toBe(true);
  });
});
