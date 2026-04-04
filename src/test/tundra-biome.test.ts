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
    expect(spawnEntryIds.has('moss-campion')).toBe(true);
    expect(spawnEntryIds.has('reindeer-lichen')).toBe(true);
    expect(spawnEntryIds.has('woolly-lousewort')).toBe(true);
    expect(spawnEntryIds.has('white-tailed-ptarmigan')).toBe(true);
    expect(spawnEntryIds.has('northern-collared-lemming')).toBe(true);
    expect(spawnEntryIds.has('bigelows-sedge')).toBe(true);
    expect(spawnEntryIds.has('lingonberry')).toBe(true);
  });

  it('adds the new tundra landmark pair as local tundra carriers', () => {
    expect(tundraBiome.entries['tussock-thaw-channel'].id).toBe('tussock-thaw-channel');
    expect(tundraBiome.entries['tussock-thaw-channel'].category).toBe('landmark');
    expect(tundraBiome.entries['frost-heave-hummock'].id).toBe('frost-heave-hummock');
    expect(tundraBiome.entries['frost-heave-hummock'].category).toBe('landmark');
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
    expect(snowMeadowEntryIds.has('white-tailed-ptarmigan')).toBe(true);
    expect(snowMeadowEntryIds.has('cottongrass')).toBe(false);
    expect(thawSkirtEntryIds.has('cottongrass')).toBe(true);
    expect(thawSkirtEntryIds.has('white-tailed-ptarmigan')).toBe(true);
  });

  it('keeps the new exposed-ground carriers on the intended dry bands', () => {
    const windBluffEntryIds = new Set(
      tundraBiome.spawnTables
        .filter((table) => table.zoneId === 'wind-bluff')
        .flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );
    const frostRidgeEntryIds = new Set(
      tundraBiome.spawnTables
        .filter((table) => table.zoneId === 'frost-ridge')
        .flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );

    expect(windBluffEntryIds.has('moss-campion')).toBe(true);
    expect(windBluffEntryIds.has('reindeer-lichen')).toBe(true);
    expect(frostRidgeEntryIds.has('moss-campion')).toBe(true);
    expect(frostRidgeEntryIds.has('reindeer-lichen')).toBe(true);
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
      platform.id === 'meltwater-snow-lip' ||
      platform.id === 'meltwater-bank-rest',
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
      'meltwater-bank-rest',
    ]);
    expect(reliefPlatforms[0]?.y).toBeGreaterThan(reliefPlatforms[1]?.y ?? 0);
    expect(reliefPlatforms[2]?.y).toBeGreaterThan(reliefPlatforms[1]?.y ?? 0);
    expect(reliefPlatforms[2]?.x).toBeGreaterThan(reliefPlatforms[1]?.x ?? 0);
    expect(reliefPlatforms[3]?.y).toBeLessThanOrEqual(reliefPlatforms[2]?.y ?? 0);
    expect(reliefPlatforms[4]?.x).toBeGreaterThan(reliefPlatforms[3]?.x ?? 0);
    expect(reliefPlatforms[4]?.y).toBeLessThanOrEqual(reliefPlatforms[3]?.y ?? 0);
    expect(reliefPlatforms[5]?.x).toBeGreaterThan(reliefPlatforms[4]?.x ?? 0);
    expect(reliefPlatforms[5]?.y).toBeGreaterThan(reliefPlatforms[4]?.y ?? 0);
    expect(reliefPlatforms[6]?.x).toBeGreaterThan(reliefPlatforms[5]?.x ?? 0);
    expect(reliefPlatforms[6]?.y).toBeGreaterThanOrEqual(reliefPlatforms[5]?.y ?? 0);
  });

  it('adds one compact snow-meadow drift hold before the thaw-skirt family', () => {
    const thresholdPlatforms = tundraBiome.terrainRules.authoredPlatforms?.filter((platform) =>
      [
        'wind-bluff-heave-shoulder',
        'snow-threshold-lee-rest',
        'snow-meadow-drift-shoulder',
        'snow-meadow-drift-rest',
      ].includes(platform.id),
    );
    const leeRest = thresholdPlatforms?.find((platform) => platform.id === 'snow-threshold-lee-rest');
    const driftShoulder = thresholdPlatforms?.find((platform) => platform.id === 'snow-meadow-drift-shoulder');
    const driftRest = thresholdPlatforms?.find((platform) => platform.id === 'snow-meadow-drift-rest');
    const thawEntry = tundraBiome.terrainRules.authoredPlatforms?.find((platform) => platform.id === 'thaw-skirt-entry-heave');

    expect(thresholdPlatforms).toEqual([
      {
        id: 'wind-bluff-heave-shoulder',
        spriteId: 'ice-platform',
        x: 128,
        y: 108,
        w: 16,
        h: 4,
      },
      {
        id: 'snow-threshold-lee-rest',
        spriteId: 'ice-platform',
        x: 150,
        y: 111,
        w: 28,
        h: 4,
      },
      {
        id: 'snow-meadow-drift-shoulder',
        spriteId: 'ice-platform',
        x: 224,
        y: 110,
        w: 18,
        h: 4,
      },
      {
        id: 'snow-meadow-drift-rest',
        spriteId: 'ice-platform',
        x: 252,
        y: 107,
        w: 30,
        h: 4,
      },
    ]);
    expect(leeRest?.x).toBeGreaterThanOrEqual(120);
    expect(leeRest?.x).toBeLessThanOrEqual(184);
    expect(leeRest?.y).toBeGreaterThanOrEqual(100);
    expect(leeRest?.y).toBeLessThanOrEqual(112);
    expect(driftShoulder?.x).toBeGreaterThan((leeRest?.x ?? 0) + (leeRest?.w ?? 0));
    expect(driftRest?.x).toBeGreaterThan((driftShoulder?.x ?? 0) + (driftShoulder?.w ?? 0));
    expect(driftRest?.y).toBeLessThan(driftShoulder?.y ?? 999);
    expect(driftRest?.x).toBeGreaterThanOrEqual(216);
    expect((driftRest?.x ?? 0) + (driftRest?.w ?? 0)).toBeLessThanOrEqual(286);
    expect((thawEntry?.x ?? 0) - ((driftRest?.x ?? 0) + (driftRest?.w ?? 0))).toBeGreaterThanOrEqual(24);
  });

  it('anchors one local snow-meadow carrier pair around the new drift hold', () => {
    const driftEntities = tundraBiome.terrainRules.authoredEntities?.filter((entity) =>
      ['snow-meadow-drift-sedge', 'snow-meadow-drift-ptarmigan'].includes(entity.id),
    );

    expect(driftEntities).toEqual([
      {
        id: 'snow-meadow-drift-sedge',
        entryId: 'bigelows-sedge',
        x: 258,
        y: 103,
      },
      {
        id: 'snow-meadow-drift-ptarmigan',
        entryId: 'white-tailed-ptarmigan',
        x: 274,
        y: 103,
      },
    ]);
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
      (entity) =>
        entity.entryId === 'tussock-thaw-channel' ||
        entity.id === 'meltwater-bank-willow' ||
        entity.id === 'meltwater-bank-cottongrass',
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
      {
        id: 'meltwater-bank-willow',
        entryId: 'arctic-willow',
        x: 582,
        y: 109,
      },
      {
        id: 'meltwater-bank-cottongrass',
        entryId: 'cottongrass',
        x: 592,
        y: 109,
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

  it('anchors a tiny wet-edge carrier cluster around the new meltwater rest', () => {
    const authoredWetEdge = tundraBiome.terrainRules.authoredEntities?.filter((entity) =>
      ['meltwater-channel', 'meltwater-bank-willow', 'meltwater-bank-cottongrass'].includes(entity.id),
    );
    const bankRest = tundraBiome.terrainRules.authoredPlatforms?.find((platform) => platform.id === 'meltwater-bank-rest');

    expect(bankRest).toEqual({
      id: 'meltwater-bank-rest',
      spriteId: 'ice-platform',
      x: 574,
      y: 112,
      w: 26,
      h: 4,
    });
    expect(authoredWetEdge).toEqual([
      {
        id: 'meltwater-channel',
        entryId: 'tussock-thaw-channel',
        x: 544,
        y: 112,
        castsShadow: false,
      },
      {
        id: 'meltwater-bank-willow',
        entryId: 'arctic-willow',
        x: 582,
        y: 109,
      },
      {
        id: 'meltwater-bank-cottongrass',
        entryId: 'cottongrass',
        x: 592,
        y: 109,
      },
    ]);
  });

  it('authors exposed tundra anchors on both the wind bluff and frost ridge', () => {
    const exposedAnchors = tundraBiome.terrainRules.authoredEntities?.filter((entity) =>
      [
        'wind-bluff-hummock',
        'wind-bluff-lichen',
        'wind-bluff-campion',
        'frost-ridge-hummock',
        'frost-ridge-campion',
      ].includes(entity.id),
    );

    expect(exposedAnchors).toEqual([
      {
        id: 'wind-bluff-hummock',
        entryId: 'frost-heave-hummock',
        x: 82,
        y: 102,
      },
      {
        id: 'wind-bluff-lichen',
        entryId: 'reindeer-lichen',
        x: 110,
        y: 101,
      },
      {
        id: 'wind-bluff-campion',
        entryId: 'moss-campion',
        x: 136,
        y: 102,
      },
      {
        id: 'frost-ridge-hummock',
        entryId: 'frost-heave-hummock',
        x: 468,
        y: 100,
      },
      {
        id: 'frost-ridge-campion',
        entryId: 'moss-campion',
        x: 492,
        y: 100,
      },
    ]);
  });

  it('anchors a tiny local carrier pair around the new threshold hold', () => {
    const thresholdAnchors = tundraBiome.terrainRules.authoredEntities?.filter((entity) =>
      ['snow-threshold-hummock', 'snow-threshold-lichen'].includes(entity.id),
    );

    expect(thresholdAnchors).toEqual([
      {
        id: 'snow-threshold-hummock',
        entryId: 'frost-heave-hummock',
        x: 156,
        y: 105,
      },
      {
        id: 'snow-threshold-lichen',
        entryId: 'reindeer-lichen',
        x: 172,
        y: 105,
      },
    ]);
  });
});
