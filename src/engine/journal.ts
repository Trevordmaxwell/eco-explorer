import type {
  BiomeDefinition,
  InspectableCategory,
  InspectableEntry,
  JournalEntryState,
} from './types';

const categoryOrder: InspectableCategory[] = ['shell', 'plant', 'lichen', 'animal', 'landmark'];

export interface JournalCategoryProgress {
  category: InspectableCategory;
  discoveredCount: number;
  totalCount: number;
}

export interface JournalBiomeProgress {
  biomeId: string;
  name: string;
  discoveredCount: number;
  totalCount: number;
  categoryProgress: JournalCategoryProgress[];
}

export function getDiscoveredEntryIdsForBiome(
  biome: BiomeDefinition,
  discoveredEntries: Record<string, JournalEntryState>,
): string[] {
  const biomeEntryIds = new Set(Object.keys(biome.entries));

  return Object.values(discoveredEntries)
    .filter((entryState) => entryState.biomeIds.includes(biome.id) && biomeEntryIds.has(entryState.entryId))
    .map((entryState) => entryState.entryId);
}

export function sortInspectableEntries(entries: InspectableEntry[]): InspectableEntry[] {
  return [...entries].sort((left, right) => {
    const categoryDiff = categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }
    return left.commonName.localeCompare(right.commonName);
  });
}

export function getDiscoveredEntriesForBiome(
  biome: BiomeDefinition,
  entriesById: Record<string, InspectableEntry>,
  discoveredEntries: Record<string, JournalEntryState>,
): InspectableEntry[] {
  const entries = getDiscoveredEntryIdsForBiome(biome, discoveredEntries)
    .map((entryId) => entriesById[entryId])
    .filter(Boolean);

  return sortInspectableEntries(entries);
}

export function buildJournalBiomeProgress(
  biomes: Record<string, BiomeDefinition>,
  discoveredEntries: Record<string, JournalEntryState>,
): JournalBiomeProgress[] {
  return Object.values(biomes).map((biome) => {
    const biomeEntries = Object.values(biome.entries);
    const discoveredSet = new Set(getDiscoveredEntryIdsForBiome(biome, discoveredEntries));
    const categoryProgress = categoryOrder
      .map((category) => {
        const entries = biomeEntries.filter((entry) => entry.category === category);
        if (!entries.length) {
          return null;
        }

        return {
          category,
          discoveredCount: entries.filter((entry) => discoveredSet.has(entry.id)).length,
          totalCount: entries.length,
        };
      })
      .filter((progress): progress is JournalCategoryProgress => Boolean(progress));

    return {
      biomeId: biome.id,
      name: biome.name,
      discoveredCount: biomeEntries.filter((entry) => discoveredSet.has(entry.id)).length,
      totalCount: biomeEntries.length,
      categoryProgress,
    };
  });
}

export function getJournalEntrySightings(
  discoveredEntries: Record<string, JournalEntryState>,
  entryId: string | null,
  biomeOrder: string[],
): string[] {
  if (!entryId) {
    return [];
  }

  const entryState = discoveredEntries[entryId];
  if (!entryState) {
    return [];
  }

  const sightingSet = new Set(entryState.biomeIds);
  const orderedBiomeIds = biomeOrder.filter((biomeId) => sightingSet.has(biomeId));
  const extraBiomeIds = [...sightingSet].filter((biomeId) => !biomeOrder.includes(biomeId)).sort();

  return [...orderedBiomeIds, ...extraBiomeIds];
}
