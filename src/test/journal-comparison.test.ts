import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome } from '../content/biomes';
import { resolveJournalComparison } from '../engine/journal-comparison';

const biomeRegistry = {
  beach: beachBiome,
  'coastal-scrub': coastalScrubBiome,
  forest: forestBiome,
  treeline: treelineBiome,
  tundra: tundraBiome,
};

describe('journal comparison resolution', () => {
  it('builds note-backed habitat cards for beach grass after both local notes are unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'beach-grass': {
          entryId: 'beach-grass',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'pacific-sand-crab': {
          entryId: 'pacific-sand-crab',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['beach'],
        },
        'dune-lupine': {
          entryId: 'dune-lupine',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
      },
      'beach-grass',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison).toEqual({
      entryId: 'beach-grass',
      cards: [
        {
          biomeId: 'beach',
          biomeName: 'Sunny Beach',
          noteTitle: 'Shore Shelter',
          noteSummary: 'Roots and driftwood make calm hiding spots for small beach animals.',
        },
        {
          biomeId: 'coastal-scrub',
          biomeName: 'Coastal Scrub',
          noteTitle: 'Shelter Builds Here',
          noteSummary: 'Dune plants slow wind and help harsh sand start holding more life.',
        },
      ],
    });

    expect(comparison?.cards[0]?.noteSummary).not.toBe(beachBiome.entries['beach-grass'].journalText);
  });

  it('stays hidden until each compared habitat has its own unlocked local note', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'beach-grass': {
          entryId: 'beach-grass',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'pacific-sand-crab': {
          entryId: 'pacific-sand-crab',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['beach'],
        },
      },
      'beach-grass',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison).toBeNull();
  });

  it('keeps the first pass narrow around the approved shared-species candidates', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'sea-rocket': {
          entryId: 'sea-rocket',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
      },
      'sea-rocket',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison).toBeNull();
  });

  it('supports a beach-to-scrub comparison for sand verbena once both notes are unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'sand-verbena': {
          entryId: 'sand-verbena',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'beach-grass': {
          entryId: 'beach-grass',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'dune-lupine': {
          entryId: 'dune-lupine',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
      },
      'sand-verbena',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Low Dune Bloom',
      'Shelter Builds Here',
    ]);
  });

  it('supports a beach-to-scrub comparison for beach pea once both runner notes are unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'beach-pea': {
          entryId: 'beach-pea',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'sand-verbena': {
          entryId: 'sand-verbena',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['beach'],
        },
        'dune-lupine': {
          entryId: 'dune-lupine',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
      },
      'beach-pea',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Low Runner Band',
      'Runner Hold',
    ]);
  });

  it('supports a beach-to-scrub comparison for beach strawberry once both pocket notes are unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'beach-strawberry': {
          entryId: 'beach-strawberry',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['beach', 'coastal-scrub'],
        },
        'driftwood-log': {
          entryId: 'driftwood-log',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['beach'],
        },
        'song-sparrow': {
          entryId: 'song-sparrow',
          discoveredAt: '2026-04-03T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
      },
      'beach-strawberry',
      ['beach', 'coastal-scrub'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Lee Pocket Hold',
      'Swale Shelter',
    ]);
  });

  it('supports a scrub-to-forest comparison for sword fern once both edge notes are unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'sword-fern': {
          entryId: 'sword-fern',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['coastal-scrub', 'forest'],
        },
        'nurse-log': {
          entryId: 'nurse-log',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
        'banana-slug': {
          entryId: 'banana-slug',
          discoveredAt: '2026-03-29T00:00:00.000Z',
          biomeIds: ['forest'],
        },
      },
      'sword-fern',
      ['coastal-scrub', 'forest'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Edge Moisture',
      'Forest Floor Cycle',
    ]);
  });

  it('supports nootka rose once thorny scrub and forest-edge thicket notes are both unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'nootka-rose': {
          entryId: 'nootka-rose',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['coastal-scrub', 'forest'],
        },
        'song-sparrow': {
          entryId: 'song-sparrow',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
        'red-huckleberry': {
          entryId: 'red-huckleberry',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['forest'],
        },
      },
      'nootka-rose',
      ['coastal-scrub', 'forest'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Thorny Cover',
      'Edge Berry Thicket',
    ]);
  });

  it('supports a coastal-to-forest comparison for salmonberry once both local notes unlock', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        salmonberry: {
          entryId: 'salmonberry',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['coastal-scrub', 'forest'],
        },
        'nurse-log': {
          entryId: 'nurse-log',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['coastal-scrub'],
        },
        'redwood-sorrel': {
          entryId: 'redwood-sorrel',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['forest'],
        },
      },
      'salmonberry',
      ['coastal-scrub', 'forest'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Edge Moisture',
      'Creekside Shelter',
    ]);
  });

  it('supports a forest-to-treeline comparison for bunchberry once both middle notes unlock', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        bunchberry: {
          entryId: 'bunchberry',
          discoveredAt: '2026-04-02T00:00:00.000Z',
          biomeIds: ['forest', 'treeline'],
        },
        'redwood-sorrel': {
          entryId: 'redwood-sorrel',
          discoveredAt: '2026-04-02T00:00:00.000Z',
          biomeIds: ['forest'],
        },
        'mountain-hemlock': {
          entryId: 'mountain-hemlock',
          discoveredAt: '2026-04-02T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
      },
      'bunchberry',
      ['forest', 'treeline'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Forest Floor Carpet',
      'Broken Canopy Floor',
    ]);
  });

  it('supports alpine comparison cards once the treeline and tundra notes are both unlocked', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'crowberry': {
          entryId: 'crowberry',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['treeline', 'tundra'],
        },
        'moss-campion': {
          entryId: 'moss-campion',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
        'purple-saxifrage': {
          entryId: 'purple-saxifrage',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeIds: ['tundra'],
        },
      },
      'crowberry',
      ['treeline', 'tundra'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual(['Low Ground Wins', 'Staying Low']);
  });

  it('supports mountain-avens as a second inland comparison anchor once both bloom notes unlock', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'mountain-avens': {
          entryId: 'mountain-avens',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['treeline', 'tundra'],
        },
        'moss-campion': {
          entryId: 'moss-campion',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
        'woolly-lousewort': {
          entryId: 'woolly-lousewort',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['tundra'],
        },
      },
      'mountain-avens',
      ['treeline', 'tundra'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual(['Fell Bloom Window', 'Brief Thaw Bloom']);
  });

  it('supports lingonberry once tundra gains its own local berry note support', () => {
    const comparison = resolveJournalComparison(
      biomeRegistry,
      {
        'lingonberry': {
          entryId: 'lingonberry',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['treeline', 'tundra'],
        },
        'bog-blueberry': {
          entryId: 'bog-blueberry',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['treeline'],
        },
        'bigelows-sedge': {
          entryId: 'crowberry',
          discoveredAt: '2026-03-30T00:00:00.000Z',
          biomeIds: ['tundra'],
        },
      },
      'lingonberry',
      ['treeline', 'tundra'],
    );

    expect(comparison?.cards.map((card) => card.noteTitle)).toEqual([
      'Heath Berry Mats',
      'Evergreen Berry Mats',
    ]);
  });
});
