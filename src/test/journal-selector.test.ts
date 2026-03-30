import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome } from '../content/biomes';
import { buildJournalBiomeProgress } from '../engine/journal';
import {
  buildJournalBiomeSelectorLayout,
  buildJournalBiomeSelectorState,
  formatJournalBiomeLabel,
} from '../engine/journal-selector';
import { insetRect, makeRect } from '../engine/ui-layout';

const authoredBiomes = {
  beach: beachBiome,
  'coastal-scrub': coastalScrubBiome,
  forest: forestBiome,
  treeline: treelineBiome,
  tundra: tundraBiome,
};

describe('journal biome selector', () => {
  it('formats short habitat labels for the full five-biome chain', () => {
    expect(formatJournalBiomeLabel('beach')).toBe('Beach');
    expect(formatJournalBiomeLabel('coastal-scrub')).toBe('Coastal Scrub');
    expect(formatJournalBiomeLabel('forest')).toBe('Forest');
    expect(formatJournalBiomeLabel('treeline')).toBe('Treeline');
    expect(formatJournalBiomeLabel('tundra')).toBe('Tundra');
  });

  it('builds previous and next targets across the five-biome chain', () => {
    const progress = buildJournalBiomeProgress(authoredBiomes, {});
    const selector = buildJournalBiomeSelectorState(progress, 'coastal-scrub');

    expect(selector.selectedBiomeId).toBe('coastal-scrub');
    expect(selector.selectedLabel).toBe('Coastal Scrub');
    expect(selector.previousBiomeId).toBe('beach');
    expect(selector.nextBiomeId).toBe('forest');
    expect(selector.indicators).toHaveLength(5);
    expect(selector.indicators.filter((indicator) => indicator.selected)).toHaveLength(1);
  });

  it('fits the five-biome controls inside the current 256x160 journal safe area', () => {
    const panelRect = makeRect(8, 8, 256 - 16, 144);
    const contentRect = insetRect(panelRect, 6);
    const selectorRect = makeRect(contentRect.x, contentRect.y + 14, contentRect.w, 12);
    const layout = buildJournalBiomeSelectorLayout(selectorRect, 5);

    expect(layout.previousRect.x).toBeGreaterThanOrEqual(selectorRect.x);
    expect(layout.nextRect.x + layout.nextRect.w).toBeLessThanOrEqual(selectorRect.x + selectorRect.w);
    expect(layout.labelRect.x).toBeGreaterThan(layout.previousRect.x + layout.previousRect.w);
    expect(layout.labelRect.x + layout.labelRect.w).toBeLessThan(layout.nextRect.x);
    expect(layout.indicatorRects).toHaveLength(5);
    expect(layout.indicatorRects[0].x).toBeGreaterThanOrEqual(layout.labelRect.x + 4);
    expect(layout.indicatorRects[4].x + layout.indicatorRects[4].w).toBeLessThanOrEqual(
      layout.labelRect.x + layout.labelRect.w - 4,
    );

    for (let index = 1; index < layout.indicatorRects.length; index += 1) {
      const previous = layout.indicatorRects[index - 1];
      const current = layout.indicatorRects[index];
      expect(current.x).toBeGreaterThan(previous.x + previous.w);
    }
  });
});
