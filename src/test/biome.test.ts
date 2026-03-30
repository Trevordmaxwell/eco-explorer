import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState, recordDiscovery } from '../engine/save';

const authoredBiomes = [beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome];
const phaseTwoEntryIdsByBiome: Record<string, string[]> = {
  beach: ['western-snowy-plover', 'bull-kelp-wrack'],
  'coastal-scrub': ['coyote-brush', 'beach-strawberry'],
  forest: ['western-trillium', 'pileated-woodpecker'],
  treeline: ['moss-campion', 'hoary-marmot'],
  tundra: ['woolly-lousewort', 'northern-collared-lemming'],
};

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

  it('keeps the phase-two density discoveries live in each biome', () => {
    for (const biome of authoredBiomes) {
      const spawnEntryIds = new Set(
        biome.spawnTables.flatMap((table) => table.entries.map((entry) => entry.entryId)),
      );

      for (const entryId of phaseTwoEntryIdsByBiome[biome.id]) {
        expect(biome.entries[entryId]).toBeDefined();
        expect(spawnEntryIds.has(entryId)).toBe(true);
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
  it('records a discovery once and expands it with new biome sightings', () => {
    const save = createNewSaveState('journal-seed');
    const entry = beachBiome.entries['beach-grass'];

    const first = recordDiscovery(save, entry, 'beach');
    const second = recordDiscovery(save, entry, 'beach');
    const third = recordDiscovery(save, entry, 'coastal-scrub');

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(third).toBe(false);
    expect(save.discoveredEntries['beach-grass'].biomeIds).toEqual(['beach', 'coastal-scrub']);
    expect(Object.keys(save.discoveredEntries)).toEqual(['beach-grass']);
  });
});
