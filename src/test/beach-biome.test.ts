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
        ['driftwood-log', 'bull-kelp-wrack', 'pacific-sand-crab'].includes(entity.entryId),
    );

    expect(leePocketLife.some((entity) => entity.entryId === 'driftwood-log')).toBe(true);
    expect(
      leePocketLife.some((entity) => entity.entryId === 'bull-kelp-wrack') ||
        leePocketLife.some((entity) => entity.entryId === 'pacific-sand-crab'),
    ).toBe(true);
  });

  it('keeps silky beach pea in the upper beach rather than washing it into the tide line', () => {
    const save = createNewSaveState('beach-dry-sand-runner-seed');
    const instance = generateBiomeInstance(beachBiome, save, 1);
    const beachPeas = instance.entities.filter((entity) => entity.entryId === 'beach-pea');

    expect(beachPeas.length).toBeGreaterThanOrEqual(1);
    expect(beachPeas.some((entity) => entity.x >= 146 && entity.x < 288)).toBe(true);
    expect(beachPeas.every((entity) => entity.x < 288)).toBe(true);
  });
});
