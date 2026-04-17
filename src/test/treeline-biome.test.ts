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
    expect(treelineBiome.entries.bunchberry.id).toBe('bunchberry');
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
    expect(treelineBiome.entries['talus-cushion-pocket'].id).toBe('talus-cushion-pocket');
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
    expect(stableEntryIds).toContain('bunchberry');
    expect(stableEntryIds).toContain('krummholz-spruce');
    expect(stableEntryIds).toContain('reindeer-lichen');
    expect(stableEntryIds).toContain('frost-heave-boulder');
    expect(stableEntryIds).toContain('white-arctic-mountain-heather');
  });

  it('adds a tucked backside notch and upper cap for the treeline loop', () => {
    const save = createNewSaveState('treeline-proof-seed');
    const instance = generateBiomeInstance(treelineBiome, save, 1);

    const terrainAtKrummholz = instance.terrainSamples.find((sample) => sample.x === 304);
    const terrainAtLeePocket = instance.terrainSamples.find((sample) => sample.x === 400);
    const terrainAtFell = instance.terrainSamples.find((sample) => sample.x === 544);
    const leePlatforms = instance.platforms.filter((platform) => platform.id.startsWith('lee-pocket'));
    const crestBrow = leePlatforms.find((platform) => platform.id === 'lee-pocket-crest-brow');
    const fellReturn = leePlatforms.find((platform) => platform.id === 'lee-pocket-fell-return');
    const leeRest = leePlatforms.find((platform) => platform.id === 'lee-pocket-lee-rest');

    expect(terrainAtKrummholz).toBeDefined();
    expect(terrainAtLeePocket).toBeDefined();
    expect(terrainAtFell).toBeDefined();
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtKrummholz?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtFell?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect(leePlatforms.map((platform) => platform.id)).toEqual([
      'lee-pocket-entry-stone',
      'lee-pocket-upper-shelf',
      'lee-pocket-exit-stone',
      'lee-pocket-crest-step',
      'lee-pocket-rime-rest',
      'lee-pocket-back-notch',
      'lee-pocket-rime-cap',
      'lee-pocket-crest-brow',
      'lee-pocket-fell-return',
      'lee-pocket-lee-rest',
    ]);
    expect(leePlatforms[0]?.y).toBeGreaterThan(leePlatforms[1]?.y ?? 0);
    expect(leePlatforms[2]?.y).toBeGreaterThan(leePlatforms[1]?.y ?? 0);
    expect(leePlatforms[3]?.y).toBeLessThan(leePlatforms[1]?.y ?? 0);
    expect(leePlatforms[4]?.y).toBeLessThan(leePlatforms[3]?.y ?? 0);
    expect(leePlatforms[5]?.y).toBeGreaterThan(leePlatforms[4]?.y ?? 0);
    expect(leePlatforms[6]?.y).toBe(leePlatforms[4]?.y ?? 0);
    expect(leePlatforms[7]?.y).toBeLessThan(leePlatforms[6]?.y ?? 0);
    expect(leePlatforms[8]?.y).toBeLessThan(leePlatforms[5]?.y ?? 0);
    expect(leePlatforms[9]?.y).toBeGreaterThan(leePlatforms[8]?.y ?? 0);
    expect(crestBrow).toMatchObject({ x: 506, y: 80, w: 20, h: 4 });
    expect(fellReturn).toMatchObject({ x: 510, y: 96, w: 28, h: 4 });
    expect(leeRest).toMatchObject({ x: 538, y: 102, w: 20, h: 4 });
    expect((fellReturn?.x ?? 0) + (fellReturn?.w ?? 0)).toBe(leeRest?.x ?? 0);
    expect((fellReturn?.x ?? 999)).toBeLessThan((crestBrow?.x ?? 0) + (crestBrow?.w ?? 0));
  });

  it('adds one compact last-tree shelter before the lee-pocket family', () => {
    const thresholdPlatforms = treelineBiome.terrainRules.authoredPlatforms?.filter((platform) =>
      ['last-tree-approach-stone', 'last-tree-shelter-rest', 'lee-pocket-entry-stone', 'lee-pocket-upper-shelf'].includes(platform.id),
    );
    const approachStone = thresholdPlatforms?.find((platform) => platform.id === 'last-tree-approach-stone');
    const shelterRest = thresholdPlatforms?.find((platform) => platform.id === 'last-tree-shelter-rest');
    const leeEntry = thresholdPlatforms?.find((platform) => platform.id === 'lee-pocket-entry-stone');

    expect(thresholdPlatforms).toEqual([
      {
        id: 'last-tree-approach-stone',
        spriteId: 'granite-platform',
        x: 196,
        y: 110,
        w: 18,
        h: 4,
      },
      {
        id: 'last-tree-shelter-rest',
        spriteId: 'granite-platform',
        x: 224,
        y: 106,
        w: 26,
        h: 4,
      },
      {
        id: 'lee-pocket-entry-stone',
        spriteId: 'granite-platform',
        x: 258,
        y: 112,
        w: 24,
        h: 4,
      },
      {
        id: 'lee-pocket-upper-shelf',
        spriteId: 'granite-platform',
        x: 294,
        y: 110,
        w: 122,
        h: 4,
      },
    ]);
    expect(approachStone?.x).toBeGreaterThanOrEqual(186);
    expect(shelterRest?.x).toBeGreaterThan((approachStone?.x ?? 0) + (approachStone?.w ?? 0));
    expect(shelterRest?.y).toBeLessThan(approachStone?.y ?? 999);
    expect((shelterRest?.x ?? 0) + (shelterRest?.w ?? 0)).toBeLessThanOrEqual(250);
    expect(leeEntry?.x).toBeGreaterThan((shelterRest?.x ?? 0) + (shelterRest?.w ?? 0));
  });

  it('adds one compact Stone Shelter basin under the lee shelf', () => {
    const stoneShelterPlatforms = treelineBiome.terrainRules.authoredPlatforms?.filter((platform) =>
      ['lee-pocket-entry-stone', 'stone-shelter-basin-rest', 'stone-shelter-break-step', 'lee-pocket-upper-shelf'].includes(
        platform.id,
      ),
    );
    const leeEntry = stoneShelterPlatforms?.find((platform) => platform.id === 'lee-pocket-entry-stone');
    const basinRest = stoneShelterPlatforms?.find((platform) => platform.id === 'stone-shelter-basin-rest');
    const breakStep = stoneShelterPlatforms?.find((platform) => platform.id === 'stone-shelter-break-step');
    const upperShelf = stoneShelterPlatforms?.find((platform) => platform.id === 'lee-pocket-upper-shelf');

    expect(stoneShelterPlatforms).toEqual([
      {
        id: 'lee-pocket-entry-stone',
        spriteId: 'granite-platform',
        x: 258,
        y: 112,
        w: 24,
        h: 4,
      },
      {
        id: 'stone-shelter-basin-rest',
        spriteId: 'granite-platform',
        x: 320,
        y: 118,
        w: 28,
        h: 4,
      },
      {
        id: 'stone-shelter-break-step',
        spriteId: 'granite-platform',
        x: 352,
        y: 114,
        w: 18,
        h: 4,
      },
      {
        id: 'lee-pocket-upper-shelf',
        spriteId: 'granite-platform',
        x: 294,
        y: 110,
        w: 122,
        h: 4,
      },
    ]);
    expect((basinRest?.x ?? 0)).toBeGreaterThan((leeEntry?.x ?? 0) + (leeEntry?.w ?? 0));
    expect((basinRest?.x ?? 0) + (basinRest?.w ?? 0)).toBeLessThanOrEqual(breakStep?.x ?? 0);
    expect((breakStep?.y ?? 0)).toBeLessThan(basinRest?.y ?? 999);
    expect((breakStep?.y ?? 999)).toBeGreaterThan(upperShelf?.y ?? 0);
    expect((breakStep?.x ?? 0) + (breakStep?.w ?? 0)).toBeLessThanOrEqual((upperShelf?.x ?? 0) + (upperShelf?.w ?? 0));
  });

  it('adds one compact open-fell island before the tundra handoff', () => {
    const openFellPlatforms = treelineBiome.terrainRules.authoredPlatforms?.filter((platform) =>
      ['lee-pocket-lee-rest', 'fell-island-step', 'fell-island-rest'].includes(platform.id),
    );
    const leeRest = openFellPlatforms?.find((platform) => platform.id === 'lee-pocket-lee-rest');
    const fellStep = openFellPlatforms?.find((platform) => platform.id === 'fell-island-step');
    const fellRest = openFellPlatforms?.find((platform) => platform.id === 'fell-island-rest');

    expect(openFellPlatforms).toEqual([
      {
        id: 'lee-pocket-lee-rest',
        spriteId: 'granite-platform',
        x: 538,
        y: 102,
        w: 20,
        h: 4,
      },
      {
        id: 'fell-island-step',
        spriteId: 'granite-platform',
        x: 550,
        y: 104,
        w: 12,
        h: 4,
      },
      {
        id: 'fell-island-rest',
        spriteId: 'granite-platform',
        x: 566,
        y: 100,
        w: 16,
        h: 4,
      },
    ]);
    expect((leeRest?.x ?? 0) + (leeRest?.w ?? 0)).toBeGreaterThan(fellStep?.x ?? 999);
    expect((fellRest?.x ?? 0) - ((fellStep?.x ?? 0) + (fellStep?.w ?? 0))).toBeLessThanOrEqual(4);
    expect(fellRest?.y).toBeLessThan(fellStep?.y ?? 0);
    expect((fellRest?.x ?? 0) + (fellRest?.w ?? 0)).toBeLessThan(584);
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

  it('authors one tiny high-perch cue for the new lee-side lift', () => {
    expect(treelineBiome.verticalCues).toEqual([
      {
        id: 'lee-pocket-rime-light',
        style: 'canopy-opening',
        x: 458,
        y: 80,
        zoneIds: ['dwarf-shrub', 'lichen-fell'],
      },
    ]);
  });

  it('adds one last-tree carrier pair and keeps the open-fell talus carriers authored', () => {
    const authoredThresholdCarriers = treelineBiome.terrainRules.authoredEntities?.filter((entity) =>
      ['krummholz-bunchberry', 'last-tree-spruce'].includes(entity.id),
    );
    const authoredStoneShelterCarriers = treelineBiome.terrainRules.authoredEntities?.filter((entity) =>
      ['stone-shelter-boulder', 'stone-shelter-marmot'].includes(entity.id),
    );
    const authoredTalus = treelineBiome.terrainRules.authoredEntities?.filter(
      (entity) => ['talus-cushion-pocket', 'mountain-avens', 'moss-campion'].includes(entity.entryId),
    );

    expect(authoredThresholdCarriers).toEqual([
      {
        id: 'krummholz-bunchberry',
        entryId: 'bunchberry',
        x: 220,
        y: 102,
      },
      {
        id: 'last-tree-spruce',
        entryId: 'krummholz-spruce',
        x: 240,
        y: 102,
      },
    ]);
    expect(authoredStoneShelterCarriers).toEqual([
      {
        id: 'stone-shelter-boulder',
        entryId: 'frost-heave-boulder',
        x: 334,
        y: 114,
      },
      {
        id: 'stone-shelter-marmot',
        entryId: 'hoary-marmot',
        x: 356,
        y: 108,
      },
    ]);
    expect(authoredTalus).toEqual([
      {
        id: 'lee-pocket-rime-campion',
        entryId: 'moss-campion',
        x: 460,
        y: 84,
        castsShadow: false,
      },
      {
        id: 'lee-pocket-rime-talus',
        entryId: 'talus-cushion-pocket',
        x: 448,
        y: 90,
        castsShadow: false,
      },
      {
        id: 'fell-return-talus',
        entryId: 'talus-cushion-pocket',
        x: 500,
        y: 102,
        castsShadow: false,
      },
      {
        id: 'lee-pocket-crest-avens',
        entryId: 'mountain-avens',
        x: 514,
        y: 76,
        castsShadow: false,
      },
      {
        id: 'fell-island-avens',
        entryId: 'mountain-avens',
        x: 556,
        y: 100,
        castsShadow: false,
      },
      {
        id: 'fell-island-talus',
        entryId: 'talus-cushion-pocket',
        x: 572,
        y: 102,
        castsShadow: false,
      },
      {
        id: 'fell-island-campion',
        entryId: 'moss-campion',
        x: 578,
        y: 96,
        castsShadow: false,
      },
    ]);
  });

  it('keeps the new talus carrier visible through the lee-pocket and open-fell lane', () => {
    const save = createNewSaveState('treeline-talus-pocket-seed');
    const instance = generateBiomeInstance(treelineBiome, save, 1);
    const talusCarriers = instance.entities.filter((entity) => entity.entryId === 'talus-cushion-pocket');

    expect(talusCarriers).toHaveLength(3);
    expect(talusCarriers.some((entity) => entity.x === 448 && entity.y === 90)).toBe(true);
    expect(talusCarriers.some((entity) => entity.x === 500 && entity.y === 102)).toBe(true);
    expect(talusCarriers.some((entity) => entity.x === 572 && entity.y === 102)).toBe(true);
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

  it('keeps bunchberry in the first two treeline bands instead of the open fell', () => {
    const save = createNewSaveState('treeline-bunchberry-seed');
    const instance = generateBiomeInstance(treelineBiome, save, 1);
    const bunchberryEntities = instance.entities.filter((entity) => entity.entryId === 'bunchberry');

    expect(bunchberryEntities.length).toBeGreaterThanOrEqual(2);
    expect(bunchberryEntities.every((entity) => entity.x < 328)).toBe(true);
  });
});
