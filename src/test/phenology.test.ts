import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import { generateBiomeInstance } from '../engine/generation';
import { getPhenologyPhaseProfile } from '../engine/phenology';
import { createNewSaveState } from '../engine/save';

function createPhaseSave(worldStep: number) {
  const save = createNewSaveState('phenology-seed');
  save.worldStep = worldStep;
  return save;
}

describe('phenology profiles', () => {
  it('keeps the beach reinforcement inside the approved tiny anchor set', () => {
    const earlyBeach = getPhenologyPhaseProfile(beachBiome, 'early');
    const peakBeach = getPhenologyPhaseProfile(beachBiome, 'peak');
    const lateBeach = getPhenologyPhaseProfile(beachBiome, 'late');

    expect(earlyBeach.entryAccents?.map((accent) => accent.entryId)).toEqual(
      expect.arrayContaining(['beach-grass', 'sand-verbena']),
    );
    expect(peakBeach.entryAccents?.map((accent) => accent.entryId)).toEqual(
      expect.arrayContaining(['beach-grass', 'sand-verbena']),
    );
    expect(lateBeach.entryAccents?.map((accent) => accent.entryId)).toEqual(
      expect.arrayContaining(['sand-verbena', 'beach-grass', 'bull-kelp-wrack']),
    );
    expect(lateBeach.entryAccents?.map((accent) => accent.entryId)).not.toContain('sea-rocket');
    expect(lateBeach.spawnEmphasis?.map((emphasis) => emphasis.tableId)).toContain('wrack-line');
    expect(earlyBeach.entryAccents?.find((accent) => accent.entryId === 'sand-verbena')?.spriteId).toBe(
      'sand-verbena-early',
    );
    expect(peakBeach.entryAccents?.find((accent) => accent.entryId === 'sand-verbena')?.spriteId).toBe(
      'sand-verbena-peak',
    );
    expect(lateBeach.entryAccents?.find((accent) => accent.entryId === 'sand-verbena')?.spriteId).toBe(
      'sand-verbena-late',
    );
  });

  it('authors clear visible cues for the strongest forest, treeline, and tundra branches', () => {
    const forestLate = getPhenologyPhaseProfile(forestBiome, 'late');
    const treelinePeak = getPhenologyPhaseProfile(treelineBiome, 'peak');
    const tundraEarly = getPhenologyPhaseProfile(tundraBiome, 'early');

    expect(forestLate.entryAccents?.map((accent) => accent.entryId)).toContain('fir-cone');
    expect(forestLate.groundWash).toBeTruthy();

    expect(treelinePeak.entryAccents?.map((accent) => accent.entryId)).toEqual(
      expect.arrayContaining(['mountain-avens', 'moss-campion']),
    );
    expect(treelinePeak.parallaxColors?.length).toBe(2);

    expect(tundraEarly.entryAccents?.map((accent) => accent.entryId)).toContain('purple-saxifrage');
    expect(tundraEarly.skyWashTop).toBeTruthy();
  });

  it('adds small deterministic spawn emphasis without relocating stable habitat anchors', () => {
    const earlyBeach = generateBiomeInstance(beachBiome, createPhaseSave(1), 1);
    const lateBeach = generateBiomeInstance(beachBiome, createPhaseSave(7), 1);
    const earlyForest = generateBiomeInstance(forestBiome, createPhaseSave(1), 1);
    const lateForest = generateBiomeInstance(forestBiome, createPhaseSave(7), 1);
    const earlyTreeline = generateBiomeInstance(treelineBiome, createPhaseSave(1), 1);
    const lateTreeline = generateBiomeInstance(treelineBiome, createPhaseSave(7), 1);
    const earlyTundra = generateBiomeInstance(tundraBiome, createPhaseSave(1), 1);
    const lateTundra = generateBiomeInstance(tundraBiome, createPhaseSave(7), 1);

    expect(lateBeach.platforms).toEqual(earlyBeach.platforms);
    expect(lateBeach.terrainSamples).toEqual(earlyBeach.terrainSamples);
    expect(
      lateBeach.entities.filter((entity) => entity.entityId.startsWith('wrack-line-')).length,
    ).toBeGreaterThan(
      earlyBeach.entities.filter((entity) => entity.entityId.startsWith('wrack-line-')).length,
    );

    expect(lateForest.platforms).toEqual(earlyForest.platforms);
    expect(lateForest.terrainSamples).toEqual(earlyForest.terrainSamples);
    expect(
      lateForest.entities.filter((entity) => entity.entityId.startsWith('forest-cones-')).length,
    ).toBeGreaterThanOrEqual(
      earlyForest.entities.filter((entity) => entity.entityId.startsWith('forest-cones-')).length,
    );

    expect(
      lateTreeline.entities.filter((entity) => entity.entityId.startsWith('berry-patches-')).length,
    ).toBeGreaterThan(
      earlyTreeline.entities.filter((entity) => entity.entityId.startsWith('berry-patches-')).length,
    );

    expect(
      lateTundra.entities.filter((entity) => entity.entityId.startsWith('ridge-berries-')).length,
    ).toBeGreaterThan(
      earlyTundra.entities.filter((entity) => entity.entityId.startsWith('ridge-berries-')).length,
    );
  });
});
