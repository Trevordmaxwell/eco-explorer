import { describe, expect, it } from 'vitest';
import { tundraBiome } from '../content/biomes/tundra';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('tundra biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(tundraBiome)).not.toThrow();
  });

  it('keeps the intended thaw-skirt zone between snow meadow and frost ridge', () => {
    expect(tundraBiome.terrainRules.zones.map((zone) => zone.id)).toEqual([
      'wind-bluff',
      'snow-meadow',
      'thaw-skirt',
      'frost-ridge',
      'meltwater-edge',
    ]);
  });

  it('provides complete fact data for every inspectable entry', () => {
    for (const entry of Object.values(tundraBiome.entries)) {
      expect(entry.commonName.length).toBeGreaterThan(0);
      expect(entry.shortFact.length).toBeGreaterThan(0);
      expect(entry.journalText.length).toBeGreaterThan(0);
      expect(entry.spriteId.length).toBeGreaterThan(0);

      if (entry.category !== 'landmark') {
        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });

  it('includes the new tundra flower and lemming discoveries in live spawn tables', () => {
    const spawnEntryIds = new Set(
      tundraBiome.spawnTables.flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );

    expect(spawnEntryIds.has('mountain-avens')).toBe(true);
    expect(spawnEntryIds.has('woolly-lousewort')).toBe(true);
    expect(spawnEntryIds.has('northern-collared-lemming')).toBe(true);
    expect(spawnEntryIds.has('bigelows-sedge')).toBe(true);
    expect(spawnEntryIds.has('lingonberry')).toBe(true);
  });
});

describe('tundra biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('tundra-seed');
    const firstVisit = generateBiomeInstance(tundraBiome, save, 1);
    const secondVisit = generateBiomeInstance(tundraBiome, save, 2);

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

  it('adds a lowered thaw-skirt lane with authored upper steps for the traversal proof', () => {
    const save = createNewSaveState('tundra-proof-seed');
    const instance = generateBiomeInstance(tundraBiome, save, 1);

    const terrainAtSnowMeadow = instance.terrainSamples.find((sample) => sample.x === 288);
    const terrainAtThawSkirt = instance.terrainSamples.find((sample) => sample.x === 352);
    const terrainAtFrostRidge = instance.terrainSamples.find((sample) => sample.x === 432);
    const thawPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('thaw-skirt'));

    expect(terrainAtSnowMeadow).toBeDefined();
    expect(terrainAtThawSkirt).toBeDefined();
    expect(terrainAtFrostRidge).toBeDefined();
    expect((terrainAtThawSkirt?.y ?? 0) - (terrainAtSnowMeadow?.y ?? 0)).toBeGreaterThanOrEqual(5);
    expect((terrainAtThawSkirt?.y ?? 0) - (terrainAtFrostRidge?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect(thawPlatforms.map((platform) => platform.id)).toEqual([
      'thaw-skirt-entry-heave',
      'thaw-skirt-upper-shelf',
      'thaw-skirt-exit-heave',
    ]);
    expect(thawPlatforms[0]?.y).toBeGreaterThan(thawPlatforms[1]?.y ?? 0);
    expect(thawPlatforms[2]?.y).toBeGreaterThan(thawPlatforms[1]?.y ?? 0);
  });

  it('spawns thaw-edge carriers through the new traversal band', () => {
    const save = createNewSaveState('tundra-thaw-skirt-seed');
    const instance = generateBiomeInstance(tundraBiome, save, 1);
    const thawBand = instance.entities.filter(
      (entity) =>
        entity.x >= 304 &&
        entity.x <= 408 &&
        ['purple-saxifrage', 'cottongrass', 'arctic-willow', 'woolly-lousewort', 'bigelows-sedge', 'northern-collared-lemming'].includes(
          entity.entryId,
        ),
    );

    expect(thawBand.length).toBeGreaterThanOrEqual(3);
    expect(thawBand.some((entity) => entity.entryId === 'woolly-lousewort')).toBe(true);
    expect(thawBand.some((entity) => entity.entryId === 'northern-collared-lemming')).toBe(true);
    expect(thawBand.some((entity) => entity.entryId === 'bigelows-sedge')).toBe(true);
  });
});
