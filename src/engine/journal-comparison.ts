import { resolveEcosystemNoteForEntry } from './ecosystem-notes';
import { getDiscoveredEntryIdsForBiome } from './journal';
import type { BiomeDefinition, EcosystemNote, JournalEntryState } from './types';

const DEFAULT_MINIMUM_DISCOVERIES = 2;

const COMPARISON_ENTRY_IDS = new Set([
  'beach-grass',
  'beach-pea',
  'beach-strawberry',
  'dune-lupine',
  'sand-verbena',
  'nootka-rose',
  'salmonberry',
  'sword-fern',
  'bunchberry',
  'arctic-willow',
  'crowberry',
  'mountain-avens',
  'lingonberry',
  'moss-campion',
  'reindeer-lichen',
]);

const COMPARISON_NOTE_ID_PREFERENCES: Record<string, Partial<Record<string, string>>> = {
  'dune-lupine': {
    beach: 'low-runner-band',
    'coastal-scrub': 'sturdier-cover',
  },
};

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

function getRequiredDiscoveryCount(note: EcosystemNote): number {
  return Math.min(note.entryIds.length, Math.max(1, note.minimumDiscoveries ?? DEFAULT_MINIMUM_DISCOVERIES));
}

function resolveComparisonNote(
  biome: BiomeDefinition,
  entryId: string,
  localDiscoveredEntryIds: string[],
): EcosystemNote | null {
  const preferredNoteId = COMPARISON_NOTE_ID_PREFERENCES[entryId]?.[biome.id];
  if (!preferredNoteId) {
    const noteState = resolveEcosystemNoteForEntry(biome, entryId, localDiscoveredEntryIds);
    return noteState.state === 'unlocked' ? noteState.note : null;
  }

  const preferredNote = biome.ecosystemNotes.find(
    (note) => note.id === preferredNoteId && note.entryIds.includes(entryId),
  );
  if (!preferredNote) {
    const noteState = resolveEcosystemNoteForEntry(biome, entryId, localDiscoveredEntryIds);
    return noteState.state === 'unlocked' ? noteState.note : null;
  }

  const discoveredSet = new Set(localDiscoveredEntryIds);
  const discoveredCount = preferredNote.entryIds.filter((candidateId) => discoveredSet.has(candidateId)).length;
  if (discoveredCount < getRequiredDiscoveryCount(preferredNote)) {
    return null;
  }

  return preferredNote;
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
    const note = resolveComparisonNote(biome, entryId, localDiscoveredEntryIds);
    if (!note) {
      continue;
    }

    cards.push({
      biomeId,
      biomeName: biome.name,
      noteTitle: note.title,
      noteSummary: note.summary,
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
