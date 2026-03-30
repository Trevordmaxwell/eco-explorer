import type { JournalBiomeProgress } from './journal';
import type { InspectableEntry } from './types';

export interface JournalListCategoryRow {
  type: 'category';
  category: InspectableEntry['category'];
  label: string;
  height: 8;
}

export interface JournalListEntryRow {
  type: 'entry';
  category: InspectableEntry['category'];
  entryId: string;
  label: string;
  height: 12;
}

export type JournalListRow = JournalListCategoryRow | JournalListEntryRow;

export interface JournalListWindow {
  visibleRows: JournalListRow[];
  visibleEntryIds: string[];
  hasHiddenAbove: boolean;
  hasHiddenBelow: boolean;
}

function formatCategoryProgressLabel(progress: JournalBiomeProgress['categoryProgress'][number]): string {
  const labelByCategory: Record<InspectableEntry['category'], string> = {
    shell: 'SHELL',
    plant: 'PLANT',
    lichen: 'LICHEN',
    animal: 'ANIMAL',
    landmark: 'PLACE',
  };

  return `${labelByCategory[progress.category]} ${progress.discoveredCount}/${progress.totalCount}`;
}

function sumHeights(rows: JournalListRow[], start: number, endExclusive: number): number {
  let total = 0;
  for (let index = start; index < endExclusive; index += 1) {
    total += rows[index]?.height ?? 0;
  }
  return total;
}

function getSelectedRowIndex(rows: JournalListRow[], selectedEntryId: string | null): number {
  if (selectedEntryId) {
    const selectedIndex = rows.findIndex((row) => row.type === 'entry' && row.entryId === selectedEntryId);
    if (selectedIndex >= 0) {
      return selectedIndex;
    }
  }

  return rows.findIndex((row) => row.type === 'entry');
}

export function buildJournalListRows(
  selectedBiomeProgress: JournalBiomeProgress,
  discoveredEntries: InspectableEntry[],
): JournalListRow[] {
  const rows: JournalListRow[] = [];

  for (const categoryProgress of selectedBiomeProgress.categoryProgress) {
    rows.push({
      type: 'category',
      category: categoryProgress.category,
      label: formatCategoryProgressLabel(categoryProgress),
      height: 8,
    });

    for (const entry of discoveredEntries.filter((candidate) => candidate.category === categoryProgress.category)) {
      rows.push({
        type: 'entry',
        category: entry.category,
        entryId: entry.id,
        label: entry.commonName,
        height: 12,
      });
    }
  }

  return rows;
}

export function buildJournalListWindow(
  rows: JournalListRow[],
  selectedEntryId: string | null,
  maxHeight: number,
): JournalListWindow {
  if (!rows.length || maxHeight <= 0) {
    return {
      visibleRows: [],
      visibleEntryIds: [],
      hasHiddenAbove: false,
      hasHiddenBelow: false,
    };
  }

  const selectedIndex = getSelectedRowIndex(rows, selectedEntryId);
  let startIndex = 0;

  if (selectedIndex >= 0) {
    while (sumHeights(rows, startIndex, selectedIndex + 1) > maxHeight && startIndex < selectedIndex) {
      startIndex += 1;
    }
  }

  let endIndex = startIndex;
  let totalHeight = 0;
  while (endIndex < rows.length && totalHeight + rows[endIndex].height <= maxHeight) {
    totalHeight += rows[endIndex].height;
    endIndex += 1;
  }

  const visibleRows = rows.slice(startIndex, endIndex);
  return {
    visibleRows,
    visibleEntryIds: visibleRows
      .filter((row): row is JournalListEntryRow => row.type === 'entry')
      .map((row) => row.entryId),
    hasHiddenAbove: startIndex > 0,
    hasHiddenBelow: endIndex < rows.length,
  };
}
