import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import {
  buildJournalBiomeProgress,
  getDiscoveredEntriesForBiome,
  getJournalEntrySightings,
} from '../engine/journal';

const biomes = {
  beach: beachBiome,
  forest: forestBiome,
};

describe('journal progress', () => {
  it('tracks discovered totals by biome and category without revealing names', () => {
    const progress = buildJournalBiomeProgress(biomes, {
      'native-littleneck-shell': {
        entryId: 'native-littleneck-shell',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['beach'],
      },
      'sand-verbena': {
        entryId: 'sand-verbena',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['beach'],
      },
      'salal-berry': {
        entryId: 'salal-berry',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['forest'],
      },
    });

    expect(progress).toEqual([
      {
        biomeId: 'beach',
        name: 'Sunny Beach',
        discoveredCount: 2,
        totalCount: Object.keys(beachBiome.entries).length,
        categoryProgress: [
          { category: 'shell', discoveredCount: 1, totalCount: 3 },
          { category: 'plant', discoveredCount: 1, totalCount: 3 },
          {
            category: 'animal',
            discoveredCount: 0,
            totalCount: Object.values(beachBiome.entries).filter((entry) => entry.category === 'animal').length,
          },
          { category: 'landmark', discoveredCount: 0, totalCount: 2 },
        ],
      },
      {
        biomeId: 'forest',
        name: 'Forest Trail',
        discoveredCount: 1,
        totalCount: Object.keys(forestBiome.entries).length,
        categoryProgress: [
          {
            category: 'plant',
            discoveredCount: 1,
            totalCount: Object.values(forestBiome.entries).filter((entry) => entry.category === 'plant').length,
          },
          {
            category: 'lichen',
            discoveredCount: 0,
            totalCount: Object.values(forestBiome.entries).filter((entry) => entry.category === 'lichen').length,
          },
          {
            category: 'animal',
            discoveredCount: 0,
            totalCount: Object.values(forestBiome.entries).filter((entry) => entry.category === 'animal').length,
          },
          {
            category: 'landmark',
            discoveredCount: 0,
            totalCount: Object.values(forestBiome.entries).filter((entry) => entry.category === 'landmark').length,
          },
        ],
      },
    ]);
  });

  it('filters discovered journal entries to the selected biome', () => {
    const entriesById = {
      ...beachBiome.entries,
      ...forestBiome.entries,
    };

    const beachEntries = getDiscoveredEntriesForBiome(beachBiome, entriesById, {
      'native-littleneck-shell': {
        entryId: 'native-littleneck-shell',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['beach'],
      },
      'sand-verbena': {
        entryId: 'sand-verbena',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['beach'],
      },
      'salal-berry': {
        entryId: 'salal-berry',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['forest'],
      },
    });

    expect(beachEntries.map((entry) => entry.id)).toEqual(['native-littleneck-shell', 'sand-verbena']);
  });

  it('keeps shared species local to the biome where they were actually seen', () => {
    const entriesById = {
      ...beachBiome.entries,
      ...coastalScrubBiome.entries,
    };
    const discoveredEntries = {
      'beach-grass': {
        entryId: 'beach-grass',
        discoveredAt: '2026-03-28T00:00:00.000Z',
        biomeIds: ['beach'],
      },
    };

    const progress = buildJournalBiomeProgress(
      { beach: beachBiome, 'coastal-scrub': coastalScrubBiome },
      discoveredEntries,
    );

    expect(progress).toEqual([
      {
        biomeId: 'beach',
        name: 'Sunny Beach',
        discoveredCount: 1,
        totalCount: Object.keys(beachBiome.entries).length,
        categoryProgress: [
          { category: 'shell', discoveredCount: 0, totalCount: 3 },
          { category: 'plant', discoveredCount: 1, totalCount: 3 },
          {
            category: 'animal',
            discoveredCount: 0,
            totalCount: Object.values(beachBiome.entries).filter((entry) => entry.category === 'animal').length,
          },
          { category: 'landmark', discoveredCount: 0, totalCount: 2 },
        ],
      },
      {
        biomeId: 'coastal-scrub',
        name: 'Coastal Scrub',
        discoveredCount: 0,
        totalCount: Object.keys(coastalScrubBiome.entries).length,
        categoryProgress: [
          {
            category: 'plant',
            discoveredCount: 0,
            totalCount: Object.values(coastalScrubBiome.entries).filter((entry) => entry.category === 'plant').length,
          },
          { category: 'animal', discoveredCount: 0, totalCount: 2 },
          { category: 'landmark', discoveredCount: 0, totalCount: 1 },
        ],
      },
    ]);

    const coastalEntries = getDiscoveredEntriesForBiome(
      coastalScrubBiome,
      entriesById,
      discoveredEntries,
    );
    expect(coastalEntries).toEqual([]);
  });

  it('keeps alpine shared species local until the tundra sighting actually happens', () => {
    const progress = buildJournalBiomeProgress(
      { treeline: treelineBiome, tundra: tundraBiome },
      {
        'arctic-willow': {
          entryId: 'arctic-willow',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
      },
    );

    expect(progress).toEqual([
      {
        biomeId: 'treeline',
        name: 'Treeline Pass',
        discoveredCount: 1,
        totalCount: Object.keys(treelineBiome.entries).length,
        categoryProgress: [
          {
            category: 'plant',
            discoveredCount: 1,
            totalCount: Object.values(treelineBiome.entries).filter((entry) => entry.category === 'plant').length,
          },
          { category: 'lichen', discoveredCount: 0, totalCount: 1 },
          { category: 'animal', discoveredCount: 0, totalCount: 3 },
          { category: 'landmark', discoveredCount: 0, totalCount: 2 },
        ],
      },
      {
        biomeId: 'tundra',
        name: 'Tundra Reach',
        discoveredCount: 0,
        totalCount: Object.keys(tundraBiome.entries).length,
        categoryProgress: [
          {
            category: 'plant',
            discoveredCount: 0,
            totalCount: Object.values(tundraBiome.entries).filter((entry) => entry.category === 'plant').length,
          },
          { category: 'animal', discoveredCount: 0, totalCount: 3 },
        ],
      },
    ]);
  });

  it('gives treeline its own lichen progress row', () => {
    const progress = buildJournalBiomeProgress(
      { treeline: treelineBiome },
      {
        'reindeer-lichen': {
          entryId: 'reindeer-lichen',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
      },
    );

    expect(progress).toEqual([
      {
        biomeId: 'treeline',
        name: 'Treeline Pass',
        discoveredCount: 1,
        totalCount: Object.keys(treelineBiome.entries).length,
        categoryProgress: [
          {
            category: 'plant',
            discoveredCount: 0,
            totalCount: Object.values(treelineBiome.entries).filter((entry) => entry.category === 'plant').length,
          },
          { category: 'lichen', discoveredCount: 1, totalCount: 1 },
          { category: 'animal', discoveredCount: 0, totalCount: 3 },
          { category: 'landmark', discoveredCount: 0, totalCount: 2 },
        ],
      },
    ]);
  });

  it('orders shared-species sightings to match the live biome chain', () => {
    const sightings = getJournalEntrySightings(
      {
        'beach-grass': {
          entryId: 'beach-grass',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['coastal-scrub', 'beach'],
        },
      },
      'beach-grass',
      ['beach', 'coastal-scrub', 'forest', 'treeline', 'tundra'],
    );

    expect(sightings).toEqual(['beach', 'coastal-scrub']);
  });
});
