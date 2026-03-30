import type { BiomeDefinition, EcosystemNote } from './types';

const DEFAULT_MINIMUM_DISCOVERIES = 2;

export interface ResolvedEcosystemNote {
  state: 'unlocked' | 'locked' | 'none';
  note: EcosystemNote | null;
  discoveredCount: number;
  requiredCount: number;
}

interface NoteProgress {
  note: EcosystemNote;
  discoveredCount: number;
  requiredCount: number;
}

function getRequiredCount(note: EcosystemNote): number {
  return Math.min(note.entryIds.length, Math.max(1, note.minimumDiscoveries ?? DEFAULT_MINIMUM_DISCOVERIES));
}

function pickBestLockedNote(matches: NoteProgress[]): NoteProgress | null {
  let best: NoteProgress | null = null;

  for (const match of matches) {
    if (
      !best ||
      match.discoveredCount > best.discoveredCount ||
      (match.discoveredCount === best.discoveredCount && match.requiredCount < best.requiredCount)
    ) {
      best = match;
    }
  }

  return best;
}

export function resolveEcosystemNoteForEntry(
  biome: BiomeDefinition,
  selectedEntryId: string | null,
  discoveredEntryIds: string[],
): ResolvedEcosystemNote {
  if (!selectedEntryId) {
    return {
      state: 'none',
      note: null,
      discoveredCount: 0,
      requiredCount: 0,
    };
  }

  const discoveredSet = new Set(discoveredEntryIds);
  const matchingNotes = biome.ecosystemNotes
    .filter((note) => note.entryIds.includes(selectedEntryId))
    .map<NoteProgress>((note) => ({
      note,
      discoveredCount: note.entryIds.filter((entryId) => discoveredSet.has(entryId)).length,
      requiredCount: getRequiredCount(note),
    }));

  const unlockedNote = matchingNotes.find((match) => match.discoveredCount >= match.requiredCount);
  if (unlockedNote) {
    return {
      state: 'unlocked',
      note: unlockedNote.note,
      discoveredCount: unlockedNote.discoveredCount,
      requiredCount: unlockedNote.requiredCount,
    };
  }

  const lockedNote = pickBestLockedNote(matchingNotes);
  if (lockedNote) {
    return {
      state: 'locked',
      note: null,
      discoveredCount: lockedNote.discoveredCount,
      requiredCount: lockedNote.requiredCount,
    };
  }

  return {
    state: 'none',
    note: null,
    discoveredCount: 0,
    requiredCount: 0,
  };
}
