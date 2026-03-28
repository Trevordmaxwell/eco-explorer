import { describe, expect, it } from 'vitest';
import { forestBiome } from '../content/biomes/forest';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('forest biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(forestBiome)).not.toThrow();
  });

  it('provides complete fact data for every inspectable entry', () => {
    for (const entry of Object.values(forestBiome.entries)) {
      expect(entry.commonName.length).toBeGreaterThan(0);
      expect(entry.shortFact.length).toBeGreaterThan(0);
      expect(entry.journalText.length).toBeGreaterThan(0);
      expect(entry.spriteId.length).toBeGreaterThan(0);

      if (entry.category === 'landmark') {
        expect(entry.subtitle.length).toBeGreaterThan(0);
      } else {
        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('forest biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('forest-seed');
    const firstVisit = generateBiomeInstance(forestBiome, save, 1);
    const secondVisit = generateBiomeInstance(forestBiome, save, 2);

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
});
