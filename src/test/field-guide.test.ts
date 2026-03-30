import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { treelineBiome } from '../content/biomes/treeline';
import { resolveObservationPrompt } from '../engine/observation-prompts';
import { buildFieldGuideContext, buildFieldGuidePrompt, getBiomeZoneForPlayerX } from '../engine/field-guide';
import { generateBiomeInstance } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('field guide context builder', () => {
  it('maps exact zone boundaries to the zone that starts there', () => {
    const secondZone = beachBiome.terrainRules.zones[1];

    expect(getBiomeZoneForPlayerX(beachBiome, secondZone.start)?.id).toBe(secondZone.id);
  });

  it('collects nearby entities and sorts them by distance', () => {
    const save = createNewSaveState('field-guide-seed');
    const biomeInstance = generateBiomeInstance(beachBiome, save, 1);
    const targetEntity = biomeInstance.entities[0];
    const targetEntry = beachBiome.entries[targetEntity.entryId];

    const context = buildFieldGuideContext(beachBiome, biomeInstance, save, targetEntity.x, targetEntity.y);

    expect(context.nearbyEntities.length).toBeGreaterThan(0);
    expect(context.nearbyEntities.some((entity) => entity.commonName === targetEntry.commonName)).toBe(true);

    const distances = context.nearbyEntities.map((entity) => entity.distance);
    expect(distances).toEqual([...distances].sort((left, right) => left - right));
  });

  it('reflects discovered entry IDs in biome progress and biome entry flags', () => {
    const save = createNewSaveState('field-guide-discovery-seed');
    save.discoveredEntries['beach-grass'] = {
      entryId: 'beach-grass',
      discoveredAt: '2026-03-28T00:00:00.000Z',
      biomeIds: ['beach'],
    };
    save.discoveredEntries['pacific-sand-crab'] = {
      entryId: 'pacific-sand-crab',
      discoveredAt: '2026-03-28T00:01:00.000Z',
      biomeIds: ['beach'],
    };

    const biomeInstance = generateBiomeInstance(beachBiome, save, 1);
    const context = buildFieldGuideContext(beachBiome, biomeInstance, save, 120, 80);
    const beachGrass = context.allBiomeEntries.find((entry) => entry.commonName === beachBiome.entries['beach-grass'].commonName);

    expect(context.totalDiscoveries).toBe(2);
    expect(context.biomeDiscoveries).toBeGreaterThanOrEqual(2);
    expect(beachGrass?.isDiscovered).toBe(true);
  });

  it('omits scientific names for landmark entries', () => {
    const save = createNewSaveState('field-guide-landmark-seed');
    const biomeInstance = generateBiomeInstance(beachBiome, save, 1);
    const context = buildFieldGuideContext(beachBiome, biomeInstance, save, 120, 80, 640);
    const driftwood = context.allBiomeEntries.find((entry) => entry.commonName === 'Driftwood');

    expect(driftwood?.scientificName).toBeUndefined();
  });
});

describe('field guide prompt builder', () => {
  it('includes the main structured sections and safer grounding guidance', () => {
    const save = createNewSaveState('field-guide-prompt-seed');
    const biomeInstance = generateBiomeInstance(beachBiome, save, 1);
    const observationPrompt = resolveObservationPrompt({
      biome: beachBiome,
      zoneId: 'dune-edge',
      nearbyDiscoveredEntryIds: ['beach-grass'],
      worldState: {
        worldAge: 2,
        dayPart: 'dawn',
        weather: 'marine-haze',
        phenologyPhase: 'early',
      },
    });
    const context = buildFieldGuideContext(beachBiome, biomeInstance, save, 120, 80, undefined, {
      worldAge: 2,
      dayPart: 'dawn',
      weather: 'marine-haze',
      phenologyPhase: 'early',
    }, observationPrompt);
    const prompt = buildFieldGuidePrompt(context);

    expect(prompt).toContain(`"${beachBiome.name}" biome`);
    expect(prompt).toContain('NEARBY ORGANISMS AND FEATURES');
    expect(prompt).toContain('DISCOVERED LIFE AND FEATURES IN THIS BIOME');
    expect(prompt).toContain('STILL HIDDEN IN THIS BIOME');
    expect(prompt).toContain('CURRENT WORLD STATE');
    expect(prompt).toContain('CURRENT NOTEBOOK LENS');
    expect(prompt).toContain('Prompt seed: Which plants still hold the sand in this soft coast wind?');
    expect(prompt).toContain('Day part: dawn');
    expect(prompt).toContain('Weather: marine-haze');
    expect(prompt).toContain('World age step: 2');
    expect(prompt).toContain('PLAYER PROGRESS');
    expect(prompt).toContain('If a food web,');
    expect(prompt).toContain('use that exact lens');
    expect(prompt).toContain('Do not use emoji.');
  });

  it('keeps undiscovered exact names out of the copied prompt', () => {
    const save = createNewSaveState('field-guide-hidden-name-seed');
    save.discoveredEntries['beach-grass'] = {
      entryId: 'beach-grass',
      discoveredAt: '2026-03-28T00:00:00.000Z',
      biomeIds: ['beach'],
    };

    const biomeInstance = generateBiomeInstance(beachBiome, save, 1);
    const context = buildFieldGuideContext(beachBiome, biomeInstance, save, 120, 80, 640);
    const prompt = buildFieldGuidePrompt(context);
    const sandCrab = beachBiome.entries['pacific-sand-crab'];

    expect(prompt).toContain(beachBiome.entries['beach-grass'].commonName);
    expect(prompt).not.toContain(sandCrab.commonName);
    if ('scientificName' in sandCrab) {
      expect(prompt).not.toContain(sandCrab.scientificName);
    }
    expect(prompt).toContain('not yet discovered');
  });

  it('uses lichen-safe category language for treeline entries', () => {
    const hiddenSave = createNewSaveState('field-guide-lichen-hidden-seed');
    const hiddenBiomeInstance = generateBiomeInstance(treelineBiome, hiddenSave, 1);
    const hiddenContext = buildFieldGuideContext(treelineBiome, hiddenBiomeInstance, hiddenSave, 320, 80, 640);
    const hiddenPrompt = buildFieldGuidePrompt(hiddenContext);

    expect(hiddenContext.allBiomeEntries.find((entry) => entry.commonName === 'Reindeer Lichen')?.category).toBe('lichen');
    expect(hiddenPrompt).toContain('1 lichen not yet discovered');
    expect(hiddenPrompt).toContain('organism roles');

    const discoveredSave = createNewSaveState('field-guide-lichen-discovered-seed');
    discoveredSave.discoveredEntries['reindeer-lichen'] = {
      entryId: 'reindeer-lichen',
      discoveredAt: '2026-03-28T00:02:00.000Z',
      biomeIds: ['treeline'],
    };
    const discoveredBiomeInstance = generateBiomeInstance(treelineBiome, discoveredSave, 1);
    const discoveredContext = buildFieldGuideContext(treelineBiome, discoveredBiomeInstance, discoveredSave, 320, 80, 640);
    const discoveredPrompt = buildFieldGuidePrompt(discoveredContext);

    expect(discoveredPrompt).toContain('Reindeer Lichen (Cladonia rangiferina) [lichen] ✓');
  });
});
