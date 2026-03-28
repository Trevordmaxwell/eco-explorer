import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import { forestBiome } from '../content/biomes/forest';
import { tundraBiome } from '../content/biomes/tundra';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState, recordDiscovery } from '../engine/save';

const authoredBiomes = [beachBiome, forestBiome, tundraBiome];

describe('authored biome definitions', () => {
  it('have valid spawn references and metadata', () => {
    for (const biome of authoredBiomes) {
      expect(() => validateBiomeDefinition(biome)).not.toThrow();
    }
  });

  it('requires scientific names only for organism entries', () => {
    for (const biome of authoredBiomes) {
      for (const entry of Object.values(biome.entries)) {
        expect(entry.commonName.length).toBeGreaterThan(0);
        expect(entry.shortFact.length).toBeGreaterThan(0);
        expect(entry.journalText.length).toBeGreaterThan(0);
        expect(entry.spriteId.length).toBeGreaterThan(0);

        if (entry.category === 'landmark') {
          expect('scientificName' in entry).toBe(false);
          expect(entry.subtitle.length).toBeGreaterThan(0);
          continue;
        }

        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('biome generation', () => {
  it('keeps terrain anchors stable for the same world seed', () => {
    const save = createNewSaveState('demo-seed');
    const a = generateBiomeInstance(beachBiome, save, 1);
    const b = generateBiomeInstance(beachBiome, save, 1);

    expect(a.terrainSamples).toEqual(b.terrainSamples);
    expect(a.platforms).toEqual(b.platforms);
  });

  it('refreshes visit-based entities while keeping stable entities unchanged', () => {
    const save = createNewSaveState('demo-seed');
    const firstVisit = generateBiomeInstance(beachBiome, save, 1);
    const secondVisit = generateBiomeInstance(beachBiome, save, 2);

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

describe('journal discovery', () => {
  it('records a discovery once and ignores repeats', () => {
    const save = createNewSaveState('journal-seed');
    const entry = beachBiome.entries['coquina-shell'];

    const first = recordDiscovery(save, entry, 'beach');
    const second = recordDiscovery(save, entry, 'beach');

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(Object.keys(save.discoveredEntries)).toEqual(['coquina-shell']);
  });
});
