import { resolveEcosystemNoteForEntry } from './ecosystem-notes';
import { getDiscoveredEntryIdsForBiome } from './journal';
import type { BiomeDefinition, JournalEntryState } from './types';

const COMPARISON_ENTRY_IDS = new Set([
  'beach-grass',
  'sand-verbena',
  'nootka-rose',
  'salmonberry',
  'sword-fern',
  'arctic-willow',
  'crowberry',
  'mountain-avens',
]);

export interface JournalComparisonCard {
  biomeId: string;
  biomeName: string;
  noteTitle: string;
  noteSummary: string;
}

export interface JournalComparison {
  entryId: string;
  cards: JournalComparisonCard[];
}

export function resolveJournalComparison(
  biomes: Record<string, BiomeDefinition>,
  discoveredEntries: Record<string, JournalEntryState>,
  entryId: string | null,
  sightingBiomeIds: string[],
): JournalComparison | null {
  if (!entryId || !COMPARISON_ENTRY_IDS.has(entryId) || sightingBiomeIds.length < 2) {
    return null;
  }

  const cards: JournalComparisonCard[] = [];

  for (const biomeId of sightingBiomeIds) {
    const biome = biomes[biomeId];
    if (!biome) {
      continue;
    }

    const localDiscoveredEntryIds = getDiscoveredEntryIdsForBiome(biome, discoveredEntries);
    const noteState = resolveEcosystemNoteForEntry(biome, entryId, localDiscoveredEntryIds);

    if (noteState.state !== 'unlocked' || !noteState.note) {
      continue;
    }

    cards.push({
      biomeId,
      biomeName: biome.name,
      noteTitle: noteState.note.title,
      noteSummary: noteState.note.summary,
    });
  }

  if (cards.length < 2) {
    return null;
  }

  return {
    entryId,
    cards,
  };
}
