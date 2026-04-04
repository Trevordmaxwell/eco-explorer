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

  it('adds a lowered windbreak swale with an optional bluff shoulder above the low route', () => {
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
});
