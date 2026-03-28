import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import { forestBiome } from '../content/biomes/forest';
import {
  buildJournalBiomeProgress,
  getDiscoveredEntriesForBiome,
} from '../engine/journal';

const biomes = {
  beach: beachBiome,
  forest: forestBiome,
};

describe('journal progress', () => {
  it('tracks discovered totals by biome and category without revealing names', () => {
    const progress = buildJournalBiomeProgress(biomes, [
      'coquina-shell',
      'sea-rocket',
      'salal-berry',
    ]);

    expect(progress).toEqual([
      {
        biomeId: 'beach',
        name: 'Sunny Beach',
        discoveredCount: 2,
        totalCount: Object.keys(beachBiome.entries).length,
        categoryProgress: [
          { category: 'shell', discoveredCount: 1, totalCount: 3 },
          { category: 'plant', discoveredCount: 1, totalCount: 3 },
          { category: 'animal', discoveredCount: 0, totalCount: 2 },
          { category: 'landmark', discoveredCount: 0, totalCount: 1 },
        ],
      },
      {
        biomeId: 'forest',
        name: 'Forest Trail',
        discoveredCount: 1,
        totalCount: Object.keys(forestBiome.entries).length,
        categoryProgress: [
          { category: 'plant', discoveredCount: 1, totalCount: 5 },
          { category: 'animal', discoveredCount: 0, totalCount: 2 },
        ],
      },
    ]);
  });

  it('filters discovered journal entries to the selected biome', () => {
    const entriesById = {
      ...beachBiome.entries,
      ...forestBiome.entries,
    };

    const beachEntries = getDiscoveredEntriesForBiome(beachBiome, entriesById, [
      'coquina-shell',
      'sea-rocket',
      'salal-berry',
    ]);

    expect(beachEntries.map((entry) => entry.id)).toEqual(['coquina-shell', 'sea-rocket']);
  });
});
