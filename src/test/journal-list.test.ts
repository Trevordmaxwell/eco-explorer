import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import {
  buildJournalBiomeProgress,
  getDiscoveredEntriesForBiome,
} from '../engine/journal';
import { buildJournalListRows, buildJournalListWindow } from '../engine/journal-list';

const denseBeachDiscoveries = {
  'moon-snail-shell': {
    entryId: 'moon-snail-shell',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
  'native-littleneck-shell': {
    entryId: 'native-littleneck-shell',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
  'razor-clam-shell': {
    entryId: 'razor-clam-shell',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
  'beach-grass': {
    entryId: 'beach-grass',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
  'sand-verbena': {
    entryId: 'sand-verbena',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
  'sea-rocket': {
    entryId: 'sea-rocket',
    discoveredAt: '2026-03-28T00:00:00.000Z',
    biomeIds: ['beach'],
  },
};

describe('journal list windowing', () => {
  it('keeps the default dense beach list anchored at the top with room to scroll down', () => {
    const selectedBiomeProgress = buildJournalBiomeProgress({ beach: beachBiome }, denseBeachDiscoveries)[0];
    const discoveredEntries = getDiscoveredEntriesForBiome(
      beachBiome,
      beachBiome.entries,
      denseBeachDiscoveries,
    );
    const rows = buildJournalListRows(selectedBiomeProgress, discoveredEntries);
    const listWindow = buildJournalListWindow(rows, null, 42);

    expect(listWindow.visibleRows.map((row) => (row.type === 'entry' ? row.entryId : row.label))).toEqual([
      'SHELL 3/3',
      'moon-snail-shell',
      'native-littleneck-shell',
    ]);
    expect(listWindow.visibleEntryIds).toEqual([
      'moon-snail-shell',
      'native-littleneck-shell',
    ]);
    expect(listWindow.hasHiddenAbove).toBe(false);
    expect(listWindow.hasHiddenBelow).toBe(true);
  });

  it('slides the dense beach list window to keep later selections visible', () => {
    const selectedBiomeProgress = buildJournalBiomeProgress({ beach: beachBiome }, denseBeachDiscoveries)[0];
    const discoveredEntries = getDiscoveredEntriesForBiome(
      beachBiome,
      beachBiome.entries,
      denseBeachDiscoveries,
    );
    const rows = buildJournalListRows(selectedBiomeProgress, discoveredEntries);
    const listWindow = buildJournalListWindow(rows, 'beach-grass', 42);

    expect(listWindow.visibleRows.map((row) => (row.type === 'entry' ? row.entryId : row.label))).toEqual([
      'razor-clam-shell',
      'PLANT 3/3',
      'beach-grass',
    ]);
    expect(listWindow.visibleEntryIds).toContain('beach-grass');
    expect(listWindow.hasHiddenAbove).toBe(true);
    expect(listWindow.hasHiddenBelow).toBe(true);
  });
});
