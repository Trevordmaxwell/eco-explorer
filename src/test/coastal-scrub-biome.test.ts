import { describe, expect, it } from 'vitest';

import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('coastal scrub biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(coastalScrubBiome)).not.toThrow();
  });

  it('keeps the intended four-zone ecotone order', () => {
    expect(coastalScrubBiome.terrainRules.zones.map((zone) => zone.id)).toEqual([
      'back-dune',
      'shrub-thicket',
      'windbreak-swale',
      'shore-pine-stand',
      'forest-edge',
    ]);
  });

  it('reuses shared edge species ids for beach and forest continuity', () => {
    expect(coastalScrubBiome.entries['beach-grass'].id).toBe('beach-grass');
    expect(coastalScrubBiome.entries['beach-pea'].id).toBe('beach-pea');
    expect(coastalScrubBiome.entries['dune-lupine'].id).toBe('dune-lupine');
    expect(coastalScrubBiome.entries['beach-strawberry'].id).toBe('beach-strawberry');
    expect(coastalScrubBiome.entries['sand-verbena'].id).toBe('sand-verbena');
    expect(coastalScrubBiome.entries['sea-rocket'].id).toBe('sea-rocket');
    expect(coastalScrubBiome.entries['sword-fern'].id).toBe('sword-fern');
    expect(coastalScrubBiome.entries['nootka-rose'].id).toBe('nootka-rose');
  });

  it('adds the new scrub-density entries without breaking the ecotone mix', () => {
    expect(coastalScrubBiome.entries['coyote-brush'].id).toBe('coyote-brush');
    expect(coastalScrubBiome.entries.kinnikinnick.id).toBe('kinnikinnick');
  });
});

describe('coastal scrub biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('coastal-scrub-seed');
    const firstVisit = generateBiomeInstance(coastalScrubBiome, save, 1);
    const secondVisit = generateBiomeInstance(coastalScrubBiome, save, 2);

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
    const save = createNewSaveState('coastal-scrub-seed');
    const generated = generateBiomeInstance(coastalScrubBiome, save, 1);
    const stableEntryIds = generated.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => entity.entryId);

    expect(stableEntryIds).toContain('dune-lupine');
    expect(stableEntryIds).toContain('beach-pea');
    expect(stableEntryIds).toContain('shore-pine');
    expect(stableEntryIds).toContain('kinnikinnick');
    expect(stableEntryIds).toContain('sword-fern');
    expect(stableEntryIds).toContain('nurse-log');
    expect(stableEntryIds).toContain('nootka-rose');
  });

  it('adds a small back-dune shelter shelf before the scrub thickens', () => {
    const save = createNewSaveState('coastal-scrub-front-half-shelter-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const backDune = coastalScrubBiome.terrainRules.zones.find((zone) => zone.id === 'back-dune');
    const shrubThicket = coastalScrubBiome.terrainRules.zones.find((zone) => zone.id === 'shrub-thicket');
    const shelfPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('back-dune-shelter-'));
    const lip = shelfPlatforms.find((platform) => platform.id === 'back-dune-shelter-lip');
    const rest = shelfPlatforms.find((platform) => platform.id === 'back-dune-shelter-rest');
    const firstWindbreak = instance.platforms.find((platform) => platform.id === 'windbreak-gather-log');
    const shelterCarriers = instance.entities
      .filter((entity) => entity.entityId.includes('back-dune-shelter-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }))
      .sort((left, right) => left.x - right.x);

    expect(backDune).toBeDefined();
    expect(shrubThicket).toBeDefined();
    expect(lip).toBeDefined();
    expect(rest).toBeDefined();
    expect(firstWindbreak).toBeDefined();
    if (!backDune || !shrubThicket || !lip || !rest || !firstWindbreak) {
      throw new Error('expected Coastal Scrub opening shelter shelf anchors to exist');
    }

    expect(shelfPlatforms.map((platform) => platform.id)).toEqual([
      'back-dune-shelter-lip',
      'back-dune-shelter-rest',
    ]);
    expect(lip.x).toBeGreaterThanOrEqual(backDune.start + 70);
    expect(rest.x + rest.w).toBeLessThanOrEqual(backDune.end);
    expect(rest.x + rest.w).toBeLessThanOrEqual(shrubThicket.start);
    expect(rest.x + rest.w).toBeLessThan(firstWindbreak.x);
    expect(rest.x).toBeGreaterThan(lip.x + lip.w);
    expect(rest.x - (lip.x + lip.w)).toBeLessThanOrEqual(12);
    expect(lip.y).toBeGreaterThan(rest.y);
    expect(lip.y - rest.y).toBeLessThanOrEqual(6);
    expect(rest.y).toBeGreaterThanOrEqual(94);
    expect(rest.y).toBeLessThanOrEqual(100);
    expect(shelterCarriers).toEqual([
      { entryId: 'beach-grass', x: 88, y: 108 },
      { entryId: 'sand-verbena', x: 122, y: 104 },
    ]);
    expect(shelterCarriers.every((entity) => entity.x >= backDune.start && entity.x < backDune.end)).toBe(true);
  });

  it('adds a Dune Catch traversal line from sand-catching grass to cooler forest edge cover', () => {
    const save = createNewSaveState('coastal-scrub-dune-catch-line-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const routePlatforms = instance.platforms
      .filter((platform) => platform.id.startsWith('dune-catch-'))
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const routeEntities = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-dune-catch-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }));

    expect(routePlatforms).toEqual([
      { id: 'dune-catch-grass-shelf', x: 54, y: 100, w: 22 },
      { id: 'dune-catch-swale-hold-log', x: 310, y: 112, w: 34 },
      { id: 'dune-catch-cool-edge-shelf', x: 566, y: 103, w: 28 },
    ]);
    expect(routeEntities).toEqual([
      { entryId: 'beach-grass', x: 66, y: 108 },
      { entryId: 'dune-lupine', x: 140, y: 106 },
      { entryId: 'pacific-wax-myrtle', x: 320, y: 116 },
      { entryId: 'deer-mouse', x: 334, y: 124 },
      { entryId: 'coyote-brush', x: 386, y: 116 },
      { entryId: 'song-sparrow', x: 410, y: 106 },
      { entryId: 'salmonberry', x: 576, y: 110 },
      { entryId: 'sword-fern', x: 590, y: 112 },
    ]);
    expect(routeEntities.filter((entity) => entity.x < 150).map((entity) => entity.entryId)).toEqual([
      'beach-grass',
      'dune-lupine',
    ]);
    expect(routeEntities.filter((entity) => entity.x >= 252 && entity.x < 392).map((entity) => entity.entryId)).toEqual([
      'pacific-wax-myrtle',
      'deer-mouse',
      'coyote-brush',
    ]);
    expect(routeEntities.filter((entity) => entity.x >= 520).map((entity) => entity.entryId)).toEqual([
      'salmonberry',
      'sword-fern',
    ]);
  });

  it('adds a lowered windbreak swale with an optional bluff lookout above the low route', () => {
    const save = createNewSaveState('coastal-scrub-proof-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);

    const terrainAtThicket = instance.terrainSamples.find((sample) => sample.x === 240);
    const terrainAtSwale = instance.terrainSamples.find((sample) => sample.x === 320);
    const terrainAtPines = instance.terrainSamples.find((sample) => sample.x === 464);
    const windbreakPlatforms = instance.platforms.filter((platform) =>
      platform.id.startsWith('windbreak-'),
    );
    const gatherLog = windbreakPlatforms.find((platform) => platform.id === 'windbreak-gather-log');
    const gatherLift = windbreakPlatforms.find((platform) => platform.id === 'windbreak-gather-lift');
    const leeStep = windbreakPlatforms.find((platform) => platform.id === 'windbreak-bluff-lee-step');
    const midStep = windbreakPlatforms.find((platform) => platform.id === 'windbreak-bluff-mid-step');
    const crest = windbreakPlatforms.find((platform) => platform.id === 'windbreak-bluff-crest');
    const lookoutRest = windbreakPlatforms.find((platform) => platform.id === 'windbreak-bluff-lookout-rest');
    const entryLog = windbreakPlatforms.find((platform) => platform.id === 'windbreak-swale-entry-log');
    const upperLog = windbreakPlatforms.find((platform) => platform.id === 'windbreak-swale-upper-log');
    const pocketStep = windbreakPlatforms.find((platform) => platform.id === 'windbreak-pocket-lee-step');
    const pocketRest = windbreakPlatforms.find((platform) => platform.id === 'windbreak-pocket-rest-log');
    const exitLog = windbreakPlatforms.find((platform) => platform.id === 'windbreak-swale-exit-log');
    const gatherEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.includes('windbreak-gather-rose') || entity.entityId.includes('windbreak-gather-lupine'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }));
    const lookoutEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.includes('windbreak-bluff-lookout-myrtle') ||
          entity.entityId.includes('windbreak-bluff-lookout-sparrow'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }))
      .sort((left, right) => left.x - right.x);
    const pocketEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.includes('windbreak-pocket-runner') || entity.entityId.includes('windbreak-pocket-sparrow'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }))
      .sort((left, right) => left.x - right.x);

    expect(terrainAtThicket).toBeDefined();
    expect(terrainAtSwale).toBeDefined();
    expect(terrainAtPines).toBeDefined();
    expect((terrainAtSwale?.y ?? 0) - (terrainAtThicket?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect((terrainAtSwale?.y ?? 0) - (terrainAtPines?.y ?? 0)).toBeGreaterThanOrEqual(8);
    expect(windbreakPlatforms.map((platform) => platform.id)).toEqual([
      'windbreak-gather-log',
      'windbreak-gather-lift',
      'windbreak-bluff-lee-step',
      'windbreak-swale-entry-log',
      'windbreak-bluff-mid-step',
      'windbreak-swale-upper-log',
      'windbreak-bluff-crest',
      'windbreak-bluff-lookout-rest',
      'windbreak-pocket-lee-step',
      'windbreak-pocket-rest-log',
      'windbreak-swale-exit-log',
    ]);
    expect(gatherLog?.x).toBeLessThan(leeStep?.x ?? 0);
    expect(gatherLift?.x).toBeLessThan(leeStep?.x ?? 0);
    expect(gatherLog?.y).toBeGreaterThan(gatherLift?.y ?? 0);
    expect(gatherLift?.y).toBeGreaterThanOrEqual(leeStep?.y ?? 0);
    expect(leeStep?.y).toBeGreaterThan(midStep?.y ?? 0);
    expect(midStep?.y).toBeGreaterThan(crest?.y ?? 0);
    expect(entryLog?.y).toBeGreaterThan(upperLog?.y ?? 0);
    expect(exitLog?.y).toBeGreaterThan(upperLog?.y ?? 0);
    expect(crest?.y).toBeLessThan(upperLog?.y ?? 0);
    expect((crest?.x ?? 0) + (crest?.w ?? 0)).toBeGreaterThanOrEqual(upperLog?.x ?? 0);
    expect(lookoutRest?.x).toBeGreaterThanOrEqual((crest?.x ?? 0) + (crest?.w ?? 0));
    expect(lookoutRest?.x).toBeGreaterThanOrEqual(318);
    expect(lookoutRest?.x).toBeLessThanOrEqual(344);
    expect(lookoutRest?.y).toBeGreaterThan(crest?.y ?? 0);
    expect(lookoutRest?.y).toBeLessThan(upperLog?.y ?? 0);
    expect((lookoutRest?.x ?? 0) + (lookoutRest?.w ?? 0)).toBeLessThanOrEqual(pocketRest?.x ?? 999);
    expect(pocketStep?.x).toBeGreaterThanOrEqual((crest?.x ?? 0) + (crest?.w ?? 0));
    expect(pocketStep?.x).toBeGreaterThanOrEqual(320);
    expect(pocketStep?.x).toBeLessThanOrEqual(340);
    expect(pocketStep?.y).toBeGreaterThan(pocketRest?.y ?? 0);
    expect(pocketRest?.y).toBeGreaterThan(upperLog?.y ?? 0);
    expect(pocketRest?.x).toBeGreaterThan(pocketStep?.x ?? 0);
    expect(pocketRest?.x).toBeGreaterThanOrEqual(340);
    expect(pocketRest?.x).toBeLessThanOrEqual(356);
    expect((pocketRest?.x ?? 0) + (pocketRest?.w ?? 0)).toBeLessThan(exitLog?.x ?? 999);
    expect((pocketRest?.y ?? 0) + (pocketRest?.h ?? 0)).toBeLessThan(terrainAtSwale?.y ?? 999);
    expect(gatherEntities).toEqual([
      { entryId: 'nootka-rose', x: 214, y: 108 },
      { entryId: 'dune-lupine', x: 244, y: 108 },
    ]);
    expect(lookoutEntities).toEqual([
      { entryId: 'pacific-wax-myrtle', x: 336, y: 94 },
      { entryId: 'song-sparrow', x: 346, y: 88 },
    ]);
    expect(pocketEntities).toEqual([
      { entryId: 'beach-strawberry', x: 356, y: 120 },
      { entryId: 'song-sparrow', x: 366, y: 114 },
    ]);
  });

  it('spawns sheltered shrub cover through the new swale lane', () => {
    const save = createNewSaveState('coastal-scrub-swale-cover-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const swaleCover = instance.entities.filter(
      (entity) =>
        entity.x >= 252 &&
        entity.x <= 392 &&
        ['dune-lupine', 'pacific-wax-myrtle', 'coyote-brush', 'beach-strawberry', 'deer-mouse', 'song-sparrow'].includes(
          entity.entryId,
        ),
    );

    expect(swaleCover.length).toBeGreaterThanOrEqual(3);
    expect(swaleCover.some((entity) => entity.entryId === 'beach-strawberry')).toBe(true);
  });

  it('adds a quieter underlayer inside the shore-pine stand', () => {
    const save = createNewSaveState('coastal-scrub-shore-pine-underlayer-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const shorePineLayer = instance.entities.filter(
      (entity) =>
        entity.x >= 392 &&
        entity.x < 520 &&
        ['shore-pine', 'kinnikinnick', 'song-sparrow'].includes(entity.entryId),
    );

    expect(shorePineLayer.some((entity) => entity.entryId === 'shore-pine')).toBe(true);
    expect(shorePineLayer.some((entity) => entity.entryId === 'kinnikinnick')).toBe(true);
  });

  it('adds one low shore-pine rest seam after the swale release', () => {
    const save = createNewSaveState('coastal-scrub-shore-pine-rest-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const exitLog = instance.platforms.find((platform) => platform.id === 'windbreak-swale-exit-log');
    const restLog = instance.platforms.find((platform) => platform.id === 'shore-pine-rest-log');
    const restEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.includes('shore-pine-rest-mat') ||
          entity.entityId.includes('shore-pine-rest-sparrow'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }))
      .sort((left, right) => left.x - right.x);

    expect(exitLog).toBeDefined();
    expect(restLog).toBeDefined();
    if (!exitLog || !restLog) {
      throw new Error('expected windbreak-swale-exit-log and shore-pine-rest-log to exist');
    }

    expect(restLog.x).toBeGreaterThan(exitLog.x + exitLog.w);
    expect(restLog.x).toBeGreaterThanOrEqual(428);
    expect(restLog.x + restLog.w).toBeLessThanOrEqual(476);
    expect(restLog.y).toBeGreaterThanOrEqual(100);
    expect(restLog.y).toBeLessThanOrEqual(104);
    expect(restEntities).toEqual([
      { entryId: 'kinnikinnick', x: 448, y: 108 },
      { entryId: 'song-sparrow', x: 468, y: 102 },
    ]);
  });

  it('stages a forest-edge cover release after the shore-pine rest', () => {
    const save = createNewSaveState('coastal-scrub-forest-edge-release-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);
    const shoreRest = instance.platforms.find((platform) => platform.id === 'shore-pine-rest-log');
    const rootLip = instance.platforms.find((platform) => platform.id === 'forest-edge-root-lip');
    const berryRest = instance.platforms.find((platform) => platform.id === 'forest-edge-berry-rest');
    const forestEdgeLife = coastalScrubBiome.spawnTables.find((table) => table.id === 'forest-edge-life');
    const releaseEntities = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-forest-edge-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }))
      .sort((left, right) => left.x - right.x || left.y - right.y);

    expect(shoreRest).toBeDefined();
    expect(rootLip).toBeDefined();
    expect(berryRest).toBeDefined();
    if (!shoreRest || !rootLip || !berryRest) {
      throw new Error('expected shore-pine rest and forest-edge release platforms to exist');
    }

    expect(rootLip.x).toBeGreaterThan(shoreRest.x + shoreRest.w);
    expect(rootLip.x).toBeGreaterThanOrEqual(488);
    expect(rootLip.x + rootLip.w).toBeLessThanOrEqual(520);
    expect(berryRest.x).toBeGreaterThan(rootLip.x + rootLip.w);
    expect(berryRest.x).toBeGreaterThanOrEqual(520);
    expect(berryRest.x + berryRest.w).toBeLessThanOrEqual(566);
    expect(rootLip.y).toBeGreaterThan(berryRest.y);
    expect(rootLip.y - berryRest.y).toBeLessThanOrEqual(8);
    expect(berryRest.y).toBeGreaterThanOrEqual(98);
    expect(berryRest.y).toBeLessThanOrEqual(102);
    expect(releaseEntities).toEqual([
      { entryId: 'nootka-rose', x: 506, y: 108 },
      { entryId: 'deer-mouse', x: 516, y: 116 },
      { entryId: 'salmonberry', x: 532, y: 108 },
      { entryId: 'song-sparrow', x: 552, y: 98 },
      { entryId: 'sword-fern', x: 562, y: 108 },
      { entryId: 'nurse-log', x: 570, y: 112 },
    ]);
    expect(forestEdgeLife).toBeDefined();
    expect(forestEdgeLife?.zoneId).toBe('forest-edge');
    expect(forestEdgeLife?.refreshPolicy).toBe('visit');
    expect(forestEdgeLife?.entries.map((entry) => entry.entryId).sort()).toEqual([
      'deer-mouse',
      'song-sparrow',
    ]);
  });
});
