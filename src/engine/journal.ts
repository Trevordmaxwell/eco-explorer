import type {
  BiomeDefinition,
  InspectableCategory,
  InspectableEntry,
} from './types';

const categoryOrder: InspectableCategory[] = ['shell', 'plant', 'animal', 'landmark'];

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
  discoveredEntryIds: string[],
): InspectableEntry[] {
  const biomeEntryIds = new Set(Object.keys(biome.entries));
  const entries = discoveredEntryIds
    .filter((entryId) => biomeEntryIds.has(entryId))
    .map((entryId) => entriesById[entryId])
    .filter(Boolean);

  return sortInspectableEntries(entries);
}

export function buildJournalBiomeProgress(
  biomes: Record<string, BiomeDefinition>,
  discoveredEntryIds: string[],
): JournalBiomeProgress[] {
  const discoveredSet = new Set(discoveredEntryIds);

  return Object.values(biomes).map((biome) => {
    const biomeEntries = Object.values(biome.entries);
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
