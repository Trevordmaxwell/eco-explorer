import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('beach biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(beachBiome)).not.toThrow();
  });

  it('adds the washed-shore sand dollar clue to beach shell rotations', () => {
    const shellTable = beachBiome.spawnTables.find((table) => table.id === 'shells');
    const tidepoolShellTable = beachBiome.spawnTables.find((table) => table.id === 'tidepool-shells');

    expect(shellTable?.entries.some((entry) => entry.entryId === 'sand-dollar-test')).toBe(true);
    expect(tidepoolShellTable?.entries.some((entry) => entry.entryId === 'sand-dollar-test')).toBe(true);
  });

  it('adds a dry-sand runner layer without crowding the tide line', () => {
    const dunePlants = beachBiome.spawnTables.find((table) => table.id === 'stable-plants');
    const drySandPlants = beachBiome.spawnTables.find((table) => table.id === 'stable-shore-plants');
    const drySandRunners = beachBiome.spawnTables.find((table) => table.id === 'stable-dry-sand-runners');

    expect(dunePlants?.entries.some((entry) => entry.entryId === 'beach-pea')).toBe(true);
    expect(drySandPlants?.entries.some((entry) => entry.entryId === 'beach-pea')).toBe(true);
    expect(drySandRunners?.entries).toEqual([{ entryId: 'beach-pea', weight: 1 }]);
  });

  it('adds parity carriers to the upper beach and lee pocket', () => {
    const drySandLupine = beachBiome.spawnTables.find((table) => table.id === 'stable-dry-sand-lupine');
    const leePocketRunners = beachBiome.spawnTables.find((table) => table.id === 'stable-lee-pocket-runners');

    expect(drySandLupine?.entries).toEqual([{ entryId: 'dune-lupine', weight: 1 }]);
    expect(leePocketRunners?.entries).toEqual([{ entryId: 'beach-strawberry', weight: 1 }]);
  });

  it('adds a front-half lee pocket between dry sand and the tide line', () => {
    expect(beachBiome.terrainRules.zones.map((zone) => zone.id)).toEqual([
      'dune-edge',
      'dry-sand',
      'lee-pocket',
      'tide-line',
      'tidepool',
    ]);
  });
});

describe('beach biome generation', () => {
  it('adds a shallow lee pocket with an authored driftwood shelter span', () => {
    const save = createNewSaveState('beach-lee-pocket-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);

    const terrainAtDrySand = instance.terrainSamples.find((sample) => sample.x === 272);
    const terrainAtLeePocket = instance.terrainSamples.find((sample) => sample.x === 352);
    const terrainAtTideLine = instance.terrainSamples.find((sample) => sample.x === 432);
    const leePlatforms = instance.platforms.filter((platform) => platform.id.startsWith('lee-pocket'));
    const upperSpan = leePlatforms.find((platform) => platform.id === 'lee-pocket-drift-span');

    expect(terrainAtDrySand).toBeDefined();
    expect(terrainAtLeePocket).toBeDefined();
    expect(terrainAtTideLine).toBeDefined();
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtDrySand?.y ?? 0)).toBeGreaterThanOrEqual(8);
    expect((terrainAtLeePocket?.y ?? 0) - (terrainAtTideLine?.y ?? 0)).toBeGreaterThanOrEqual(3);
    expect(leePlatforms.map((platform) => platform.id)).toEqual([
      'lee-pocket-entry-drift',
      'lee-pocket-drift-span',
      'lee-pocket-exit-drift',
    ]);
    expect(upperSpan?.y).toBeLessThan(leePlatforms[0]?.y ?? 0);
    expect(upperSpan?.y).toBeLessThan(leePlatforms[2]?.y ?? 0);
  });

  it('spawns wrack-side shelter carriers through the lee pocket', () => {
    const save = createNewSaveState('beach-lee-pocket-life-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const leePocketLife = instance.entities.filter(
      (entity) =>
        entity.x >= 296 &&
        entity.x <= 416 &&
        ['driftwood-log', 'bull-kelp-wrack', 'beach-hopper', 'pacific-sand-crab'].includes(entity.entryId),
    );

    expect(leePocketLife.some((entity) => entity.entryId === 'driftwood-log')).toBe(true);
    expect(
      leePocketLife.some((entity) => entity.entryId === 'bull-kelp-wrack') ||
        leePocketLife.some((entity) => entity.entryId === 'beach-hopper') ||
        leePocketLife.some((entity) => entity.entryId === 'pacific-sand-crab'),
    ).toBe(true);
  });

  it('anchors the new parity entries in authored front-half placements', () => {
    const save = createNewSaveState('beach-authored-parity-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const authoredEntityIds = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-'))
      .map((entity) => entity.entryId);

    expect(authoredEntityIds).toContain('dune-lupine');
    expect(authoredEntityIds).toContain('beach-strawberry');
    expect(authoredEntityIds).toContain('beach-hopper');
  });

  it('adds a dune crest and sheltered tidepool approach without disturbing the lee pocket', () => {
    const save = createNewSaveState('beach-spatial-extension-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);

    const beachPlatforms = instance.platforms.filter(
      (platform) =>
        platform.id.startsWith('dune-crest') ||
        platform.id.startsWith('lee-pocket') ||
        platform.id.startsWith('tidepool-approach') ||
        platform.id === 'tidepool-overlook',
    );
    const entryStep = beachPlatforms.find((platform) => platform.id === 'dune-crest-entry-step');
    const midStep = beachPlatforms.find((platform) => platform.id === 'dune-crest-mid-step');
    const crestView = beachPlatforms.find((platform) => platform.id === 'dune-crest-view');
    const leeSpan = beachPlatforms.find((platform) => platform.id === 'lee-pocket-drift-span');
    const approachDrift = beachPlatforms.find((platform) => platform.id === 'tidepool-approach-drift');
    const approachSill = beachPlatforms.find((platform) => platform.id === 'tidepool-approach-sill');
    const overlook = beachPlatforms.find((platform) => platform.id === 'tidepool-overlook');

    expect(beachPlatforms.map((platform) => platform.id)).toEqual([
      'dune-crest-entry-step',
      'dune-crest-mid-step',
      'dune-crest-view',
      'lee-pocket-entry-drift',
      'lee-pocket-drift-span',
      'lee-pocket-exit-drift',
      'tidepool-approach-drift',
      'tidepool-approach-sill',
      'tidepool-overlook',
    ]);
    expect(entryStep?.y).toBeGreaterThan(midStep?.y ?? 0);
    expect(midStep?.y).toBeGreaterThan(crestView?.y ?? 0);
    expect(crestView?.x).toBeLessThan(leeSpan?.x ?? 0);
    expect(approachDrift?.y).toBeGreaterThan(approachSill?.y ?? 0);
    expect(approachSill?.y).toBeGreaterThan(overlook?.y ?? 0);
  });

  it('anchors authored beach clues at the dune crest and tidepool approach', () => {
    const save = createNewSaveState('beach-spatial-authored-life-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const authoredEntities = instance.entities.filter((entity) => entity.entityId.startsWith('authored-'));
    const crestEntities = authoredEntities.filter((entity) => entity.x >= 248 && entity.x <= 284);
    const tidepoolApproachEntities = authoredEntities.filter((entity) => entity.x >= 480 && entity.x <= 556);

    expect(crestEntities.some((entity) => entity.entryId === 'sand-verbena')).toBe(true);
    expect(tidepoolApproachEntities.some((entity) => entity.entryId === 'bull-kelp-wrack')).toBe(true);
    expect(tidepoolApproachEntities.some((entity) => entity.entryId === 'pacific-sand-crab')).toBe(true);
    expect(tidepoolApproachEntities.some((entity) => entity.entryId === 'sand-dollar-test')).toBe(true);
  });

  it('keeps silky beach pea in the upper beach rather than washing it into the tide line', () => {
    const save = createNewSaveState('beach-dry-sand-runner-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const beachPeas = instance.entities.filter((entity) => entity.entryId === 'beach-pea');

    expect(beachPeas.length).toBeGreaterThanOrEqual(1);
    expect(beachPeas.some((entity) => entity.x >= 146 && entity.x < 288)).toBe(true);
    expect(beachPeas.every((entity) => entity.x < 288)).toBe(true);
  });

  it('keeps the new front-half plants on the sheltered side of the open dune', () => {
    const save = createNewSaveState('beach-front-half-parity-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const lupines = instance.entities.filter((entity) => entity.entryId === 'dune-lupine');
    const strawberries = instance.entities.filter((entity) => entity.entryId === 'beach-strawberry');

    expect(lupines.length).toBeGreaterThanOrEqual(1);
    expect(strawberries.length).toBeGreaterThanOrEqual(1);
    expect(lupines.some((entity) => entity.x >= 146 && entity.x < 288)).toBe(true);
    expect(lupines.some((entity) => entity.x >= 288 && entity.x < 400)).toBe(true);
    expect(strawberries.every((entity) => entity.x >= 288 && entity.x < 400)).toBe(true);
  });
});
