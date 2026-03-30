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
    expect(coastalScrubBiome.entries['sand-verbena'].id).toBe('sand-verbena');
    expect(coastalScrubBiome.entries['sea-rocket'].id).toBe('sea-rocket');
    expect(coastalScrubBiome.entries['sword-fern'].id).toBe('sword-fern');
    expect(coastalScrubBiome.entries['nootka-rose'].id).toBe('nootka-rose');
  });

  it('adds the new scrub-density entries without breaking the ecotone mix', () => {
    expect(coastalScrubBiome.entries['coyote-brush'].id).toBe('coyote-brush');
    expect(coastalScrubBiome.entries['beach-strawberry'].id).toBe('beach-strawberry');
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
    expect(stableEntryIds).toContain('shore-pine');
    expect(stableEntryIds).toContain('sword-fern');
    expect(stableEntryIds).toContain('nurse-log');
    expect(stableEntryIds).toContain('nootka-rose');
  });

  it('adds a lowered windbreak swale with authored upper logs for the second traversal proof', () => {
    const save = createNewSaveState('coastal-scrub-proof-seed');
    const instance = generateBiomeInstance(coastalScrubBiome, save, 1);

    const terrainAtThicket = instance.terrainSamples.find((sample) => sample.x === 240);
    const terrainAtSwale = instance.terrainSamples.find((sample) => sample.x === 320);
    const terrainAtPines = instance.terrainSamples.find((sample) => sample.x === 464);
    const swalePlatforms = instance.platforms.filter((platform) =>
      platform.id.startsWith('windbreak-swale'),
    );

    expect(terrainAtThicket).toBeDefined();
    expect(terrainAtSwale).toBeDefined();
    expect(terrainAtPines).toBeDefined();
    expect((terrainAtSwale?.y ?? 0) - (terrainAtThicket?.y ?? 0)).toBeGreaterThanOrEqual(6);
    expect((terrainAtSwale?.y ?? 0) - (terrainAtPines?.y ?? 0)).toBeGreaterThanOrEqual(8);
    expect(swalePlatforms.map((platform) => platform.id)).toEqual([
      'windbreak-swale-entry-log',
      'windbreak-swale-upper-log',
      'windbreak-swale-exit-log',
    ]);
    expect(swalePlatforms[0]?.y).toBeGreaterThan(swalePlatforms[1]?.y ?? 0);
    expect(swalePlatforms[2]?.y).toBeGreaterThan(swalePlatforms[1]?.y ?? 0);
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
});
