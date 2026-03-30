import type { JournalBiomeProgress } from './journal';
import { makeRect, type UiRect } from './ui-layout';

export interface JournalBiomeSelectorIndicator {
  biomeId: string;
  label: string;
  selected: boolean;
}

export interface JournalBiomeSelectorState {
  selectedBiomeId: string;
  selectedLabel: string;
  previousBiomeId: string;
  nextBiomeId: string;
  indicators: JournalBiomeSelectorIndicator[];
}

export interface JournalBiomeSelectorLayout {
  previousRect: UiRect;
  nextRect: UiRect;
  labelRect: UiRect;
  indicatorRects: UiRect[];
}

const explicitBiomeLabels: Record<string, string> = {
  beach: 'Beach',
  'coastal-scrub': 'Coastal Scrub',
  forest: 'Forest',
  treeline: 'Treeline',
  tundra: 'Tundra',
};

export function formatJournalBiomeLabel(biomeId: string): string {
  if (explicitBiomeLabels[biomeId]) {
    return explicitBiomeLabels[biomeId];
  }

  return biomeId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildJournalBiomeSelectorState(
  biomeProgress: JournalBiomeProgress[],
  selectedBiomeId: string,
): JournalBiomeSelectorState {
  const fallbackBiomeId = biomeProgress[0]?.biomeId ?? '';
  const currentIndex = biomeProgress.findIndex((biome) => biome.biomeId === selectedBiomeId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const safeSelectedBiomeId = biomeProgress[safeIndex]?.biomeId ?? fallbackBiomeId;

  return {
    selectedBiomeId: safeSelectedBiomeId,
    selectedLabel: formatJournalBiomeLabel(safeSelectedBiomeId),
    previousBiomeId:
      biomeProgress[(safeIndex - 1 + biomeProgress.length) % biomeProgress.length]?.biomeId ??
      safeSelectedBiomeId,
    nextBiomeId:
      biomeProgress[(safeIndex + 1) % biomeProgress.length]?.biomeId ?? safeSelectedBiomeId,
    indicators: biomeProgress.map((biome) => ({
      biomeId: biome.biomeId,
      label: formatJournalBiomeLabel(biome.biomeId),
      selected: biome.biomeId === safeSelectedBiomeId,
    })),
  };
}

export function buildJournalBiomeSelectorLayout(
  selectorRect: UiRect,
  biomeCount: number,
): JournalBiomeSelectorLayout {
  const buttonWidth = 14;
  const gap = 4;
  const labelRect = makeRect(
    selectorRect.x + buttonWidth + gap,
    selectorRect.y,
    selectorRect.w - buttonWidth * 2 - gap * 2,
    selectorRect.h,
  );
  const previousRect = makeRect(selectorRect.x, selectorRect.y, buttonWidth, selectorRect.h);
  const nextRect = makeRect(
    selectorRect.x + selectorRect.w - buttonWidth,
    selectorRect.y,
    buttonWidth,
    selectorRect.h,
  );

  const indicatorGap = biomeCount >= 5 ? 3 : 4;
  const maxIndicatorWidth = 10;
  const minIndicatorWidth = 6;
  const availableIndicatorWidth = Math.max(
    0,
    labelRect.w - 12 - indicatorGap * Math.max(0, biomeCount - 1),
  );
  const indicatorWidth =
    biomeCount > 0
      ? Math.max(minIndicatorWidth, Math.min(maxIndicatorWidth, Math.floor(availableIndicatorWidth / biomeCount)))
      : 0;
  const totalIndicatorWidth =
    biomeCount > 0 ? biomeCount * indicatorWidth + (biomeCount - 1) * indicatorGap : 0;
  const indicatorsStartX = labelRect.x + Math.max(6, Math.floor((labelRect.w - totalIndicatorWidth) / 2));
  const indicatorY = labelRect.y + labelRect.h - 3;

  return {
    previousRect,
    nextRect,
    labelRect,
    indicatorRects: Array.from({ length: biomeCount }, (_, index) =>
      makeRect(indicatorsStartX + index * (indicatorWidth + indicatorGap), indicatorY, indicatorWidth, 2),
    ),
  };
}
