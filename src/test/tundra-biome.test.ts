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

  it('adds the new thaw-channel landmark as a local tundra carrier', () => {
    expect(tundraBiome.entries['tussock-thaw-channel'].id).toBe('tussock-thaw-channel');
    expect(tundraBiome.entries['tussock-thaw-channel'].category).toBe('landmark');
  });

  it('splits the Short Season route carriers across snow meadow and thaw skirt', () => {
    const snowMeadowEntryIds = new Set(
      tundraBiome.spawnTables
        .filter((table) => table.zoneId === 'snow-meadow')
        .flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );
    const thawSkirtEntryIds = new Set(
      tundraBiome.spawnTables
        .filter((table) => table.zoneId === 'thaw-skirt')
        .flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );

    expect(snowMeadowEntryIds.has('purple-saxifrage')).toBe(true);
    expect(snowMeadowEntryIds.has('cloudberry')).toBe(true);
    expect(snowMeadowEntryIds.has('cottongrass')).toBe(false);
    expect(thawSkirtEntryIds.has('cottongrass')).toBe(true);
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

  it('extends the thaw-skirt proof into a fuller inland relief and snow-edge family', () => {
    const save = createNewSaveState('tundra-proof-seed');
    const instance = generateBiomeInstance(tundraBiome, save, 1);

    const terrainAtSnowMeadow = instance.terrainSamples.find((sample) => sample.x === 288);
    const terrainAtThawSkirt = instance.terrainSamples.find((sample) => sample.x === 352);
    const terrainAtFrostRidge = instance.terrainSamples.find((sample) => sample.x === 432);
    const reliefPlatforms = instance.platforms.filter((platform) =>
      platform.id.startsWith('thaw-skirt') ||
      platform.id === 'frost-ridge-drift-rest' ||
      platform.id === 'meltwater-snow-lip',
    );

    expect(terrainAtSnowMeadow).toBeDefined();
    expect(terrainAtThawSkirt).toBeDefined();
    expect(terrainAtFrostRidge).toBeDefined();
    expect((terrainAtThawSkirt?.y ?? 0) - (terrainAtSnowMeadow?.y ?? 0)).toBeGreaterThanOrEqual(5);
    expect((terrainAtThawSkirt?.y ?? 0) - (terrainAtFrostRidge?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect(reliefPlatforms.map((platform) => platform.id)).toEqual([
      'thaw-skirt-entry-heave',
      'thaw-skirt-upper-shelf',
      'thaw-skirt-bank-shoulder',
      'thaw-skirt-exit-heave',
      'frost-ridge-drift-rest',
      'meltwater-snow-lip',
    ]);
    expect(reliefPlatforms[0]?.y).toBeGreaterThan(reliefPlatforms[1]?.y ?? 0);
    expect(reliefPlatforms[2]?.y).toBeGreaterThan(reliefPlatforms[1]?.y ?? 0);
    expect(reliefPlatforms[2]?.x).toBeGreaterThan(reliefPlatforms[1]?.x ?? 0);
    expect(reliefPlatforms[3]?.y).toBeLessThanOrEqual(reliefPlatforms[2]?.y ?? 0);
    expect(reliefPlatforms[4]?.x).toBeGreaterThan(reliefPlatforms[3]?.x ?? 0);
    expect(reliefPlatforms[4]?.y).toBeLessThanOrEqual(reliefPlatforms[3]?.y ?? 0);
    expect(reliefPlatforms[5]?.x).toBeGreaterThan(reliefPlatforms[4]?.x ?? 0);
    expect(reliefPlatforms[5]?.y).toBeGreaterThan(reliefPlatforms[4]?.y ?? 0);
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

  it('authors thaw-channel carriers in the thaw skirt and meltwater edge bands', () => {
    const authoredChannels = tundraBiome.terrainRules.authoredEntities?.filter(
      (entity) => entity.entryId === 'tussock-thaw-channel',
    );

    expect(authoredChannels).toEqual([
      {
        id: 'thaw-skirt-channel',
        entryId: 'tussock-thaw-channel',
        x: 362,
        y: 104,
        castsShadow: false,
      },
      {
        id: 'meltwater-channel',
        entryId: 'tussock-thaw-channel',
        x: 544,
        y: 112,
        castsShadow: false,
      },
    ]);
  });

  it('keeps the new thaw-channel landmark visible in both wet alpine bands', () => {
    const save = createNewSaveState('tundra-thaw-channel-seed');
    const instance = generateBiomeInstance(tundraBiome, save, 1);
    const channels = instance.entities.filter((entity) => entity.entryId === 'tussock-thaw-channel');

    expect(channels).toHaveLength(2);
    expect(channels.some((entity) => entity.x === 362 && entity.y === 104)).toBe(true);
    expect(channels.some((entity) => entity.x === 544 && entity.y === 112)).toBe(true);
  });
});
