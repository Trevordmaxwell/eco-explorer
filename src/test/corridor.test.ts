import { describe, expect, it } from 'vitest';

import {
  COASTAL_TO_FOREST_CORRIDOR_ID,
  FOREST_TO_TREELINE_CORRIDOR_ID,
  TREELINE_TO_TUNDRA_CORRIDOR_ID,
  createBeachToScrubCorridorScene,
  createCorridorScene,
  getCorridorExitBiomeId,
  getCorridorZoneForOwner,
  resolveCorridorOwnerBiomeId,
} from '../engine/corridor';
import { createNewSaveState } from '../engine/save';

describe('beach to coastal-scrub corridor proof', () => {
  it('builds a deterministic seam with one ownership threshold and edge exits', () => {
    const save = createNewSaveState('corridor-proof-seed');
    const corridor = createBeachToScrubCorridorScene(save, 'beach');

    expect(corridor.instance.biomeId).toBe('beach-coastal-corridor');
    expect(corridor.instance.width).toBe(256);
    expect(corridor.thresholdX).toBe(128);
    expect(corridor.entryBiomeId).toBe('beach');
    expect(corridor.entryPoints.beach.facing).toBe('right');
    expect(corridor.entryPoints['coastal-scrub'].facing).toBe('left');
    expect(resolveCorridorOwnerBiomeId(corridor, 64)).toBe('beach');
    expect(resolveCorridorOwnerBiomeId(corridor, 180)).toBe('coastal-scrub');
    expect(getCorridorZoneForOwner(corridor, 'beach')).toEqual({
      id: 'dune-edge',
      label: 'Dune Edge',
    });
    expect(getCorridorZoneForOwner(corridor, 'coastal-scrub')).toEqual({
      id: 'back-dune',
      label: 'Back Dune',
    });
    expect(getCorridorExitBiomeId(corridor, 6)).toBe('beach');
    expect(getCorridorExitBiomeId(corridor, 250)).toBe('coastal-scrub');
  });

  it('keeps scrub shrubs on the scrub side while transition blooms stay near the threshold', () => {
    const save = createNewSaveState('corridor-entity-seed');
    const corridor = createBeachToScrubCorridorScene(save, 'coastal-scrub');

    const scrubOnlyIds = new Set(['pacific-wax-myrtle', 'coyote-brush']);
    const transitionIds = new Set(['dune-lupine']);
    const sharedIds = new Set(['beach-grass', 'sand-verbena', 'sea-rocket']);

    for (const entity of corridor.instance.entities) {
      if (scrubOnlyIds.has(entity.entryId)) {
        expect(entity.x).toBeGreaterThanOrEqual(corridor.thresholdX);
      }

      if (transitionIds.has(entity.entryId)) {
        expect(entity.x).toBeGreaterThanOrEqual(corridor.thresholdX);
        expect(entity.x).toBeLessThan(corridor.instance.width - 32);
      }

      if (sharedIds.has(entity.entryId) && entity.entryId !== 'sea-rocket') {
        expect(entity.x).toBeGreaterThan(8);
        expect(entity.x).toBeLessThan(corridor.instance.width - 8);
      }
    }
  });

  it('adds one held back-dune shelf on the scrub-owned half without widening the seam roster', () => {
    const save = createNewSaveState('corridor-held-shelf-seed');
    const corridor = createBeachToScrubCorridorScene(save, 'beach');
    const platformIds = corridor.instance.platforms.map((platform) => platform.id);
    const holdLip = corridor.instance.platforms.find((platform) => platform.id === 'back-dune-hold-lip');
    const holdRest = corridor.instance.platforms.find((platform) => platform.id === 'back-dune-hold-rest');
    const nearbyCarriers = corridor.instance.entities
      .filter(
        (entity) =>
          entity.x >= 152 &&
          entity.x <= 220 &&
          ['beach-grass', 'dune-lupine', 'pacific-wax-myrtle', 'coyote-brush'].includes(entity.entryId),
      )
      .map((entity) => entity.entryId);

    expect(platformIds).toEqual(['back-dune-hold-lip', 'back-dune-hold-rest']);
    expect(holdLip?.x).toBeGreaterThanOrEqual(corridor.thresholdX);
    expect(holdRest?.x).toBeGreaterThan(holdLip?.x ?? 0);
    expect((holdRest?.x ?? 0) + (holdRest?.w ?? 0)).toBeLessThan(224);
    expect(holdLip?.y).toBeGreaterThan(holdRest?.y ?? 0);
    expect(holdLip?.y).toBeGreaterThanOrEqual(99);
    expect(holdRest?.y).toBeLessThanOrEqual(98);
    expect(nearbyCarriers).toContain('beach-grass');
    expect(nearbyCarriers).toContain('dune-lupine');
    expect(nearbyCarriers).toContain('pacific-wax-myrtle');
    expect(nearbyCarriers).not.toContain('coyote-brush');
  });

  it('builds corridor scenes for every adjacent pair in the live chain', () => {
    const save = createNewSaveState('corridor-full-chain-seed');
    const cases = [
      {
        from: 'coastal-scrub' as const,
        to: 'forest' as const,
        id: COASTAL_TO_FOREST_CORRIDOR_ID,
        leftZone: 'forest-edge',
        rightZone: 'trailhead',
        destinationOnlyIds: ['redwood-sorrel'],
      },
      {
        from: 'forest' as const,
        to: 'treeline' as const,
        id: FOREST_TO_TREELINE_CORRIDOR_ID,
        leftZone: 'log-run',
        rightZone: 'thin-canopy',
        destinationOnlyIds: ['bog-blueberry', 'mountain-avens', 'reindeer-lichen'],
      },
      {
        from: 'treeline' as const,
        to: 'tundra' as const,
        id: TREELINE_TO_TUNDRA_CORRIDOR_ID,
        leftZone: 'lichen-fell',
        rightZone: 'wind-bluff',
        destinationOnlyIds: ['mountain-avens', 'purple-saxifrage', 'woolly-lousewort', 'cottongrass'],
      },
    ];

    for (const testCase of cases) {
      const corridor = createCorridorScene(save, testCase.from, testCase.to);

      expect(corridor.instance.biomeId).toBe(testCase.id);
      expect(corridor.entryBiomeId).toBe(testCase.from);
      expect(corridor.leftBiomeId).toBe(testCase.from);
      expect(corridor.rightBiomeId).toBe(testCase.to);
      expect(resolveCorridorOwnerBiomeId(corridor, 64)).toBe(testCase.from);
      expect(resolveCorridorOwnerBiomeId(corridor, 180)).toBe(testCase.to);
      expect(getCorridorZoneForOwner(corridor, testCase.from).id).toBe(testCase.leftZone);
      expect(getCorridorZoneForOwner(corridor, testCase.to).id).toBe(testCase.rightZone);
      expect(getCorridorExitBiomeId(corridor, 6)).toBe(testCase.from);
      expect(getCorridorExitBiomeId(corridor, 250)).toBe(testCase.to);

      for (const entity of corridor.instance.entities) {
        if (testCase.destinationOnlyIds.includes(entity.entryId)) {
          expect(entity.x).toBeGreaterThanOrEqual(corridor.thresholdX);
        }
      }
    }
  });

  it('adds route-aware inland carriers on the quieter alpine seam anchors', () => {
    const save = createNewSaveState('corridor-inland-route-carriers-seed');
    const forestTreeline = createCorridorScene(save, 'forest', 'treeline');
    const treelineTundra = createCorridorScene(save, 'treeline', 'tundra');

    const salalBerry = forestTreeline.instance.entities.find((entity) => entity.entryId === 'salal-berry');
    const firstTreelineBloom = forestTreeline.instance.entities.find((entity) => entity.entryId === 'mountain-avens');
    const tundraShelterBloom = treelineTundra.instance.entities.find((entity) => entity.entryId === 'mountain-avens');
    const tundraBriefThaw = treelineTundra.instance.entities.find((entity) => entity.entryId === 'woolly-lousewort');

    expect(salalBerry).toBeDefined();
    expect(firstTreelineBloom).toBeDefined();
    expect(tundraShelterBloom).toBeDefined();
    expect(tundraBriefThaw).toBeDefined();

    expect(salalBerry?.x).toBeLessThan(forestTreeline.thresholdX);
    expect(firstTreelineBloom?.x).toBeGreaterThanOrEqual(forestTreeline.thresholdX);
    expect(tundraShelterBloom?.x).toBeGreaterThanOrEqual(treelineTundra.thresholdX);
    expect(tundraBriefThaw?.x).toBeGreaterThanOrEqual(treelineTundra.thresholdX);
  });

  it('adds quieter coastal carriers without turning either seam into a mixed-roster wall', () => {
    const save = createNewSaveState('corridor-coastal-route-carriers-seed');
    const beachScrub = createBeachToScrubCorridorScene(save, 'beach');
    const scrubForest = createCorridorScene(save, 'coastal-scrub', 'forest');

    const lateBeachLupines = beachScrub.instance.entities.filter((entity) => entity.entryId === 'dune-lupine');
    const firstWaxMyrtle = beachScrub.instance.entities.find((entity) => entity.entryId === 'pacific-wax-myrtle');
    const salmonberry = scrubForest.instance.entities.find((entity) => entity.entryId === 'salmonberry');
    const nurseLog = scrubForest.instance.entities.find((entity) => entity.entryId === 'nurse-log');

    expect(lateBeachLupines).toHaveLength(2);
    expect(firstWaxMyrtle).toBeDefined();
    expect(salmonberry).toBeDefined();
    expect(nurseLog).toBeDefined();

    expect(lateBeachLupines.every((entity) => entity.x >= beachScrub.thresholdX)).toBe(true);
    expect(firstWaxMyrtle?.x).toBeGreaterThanOrEqual(beachScrub.thresholdX);
    expect(salmonberry?.x).toBeLessThan(scrubForest.thresholdX);
    expect(nurseLog?.x).toBeLessThan(scrubForest.thresholdX);
  });
});
