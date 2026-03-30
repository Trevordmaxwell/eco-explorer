import { describe, expect, it } from 'vitest';

import {
  buildBiomeSurveyProgress,
  formatBiomeSurveyStateLabel,
  resolveBiomeSurveyState,
} from '../engine/progression';

describe('biome survey progression', () => {
  it('stays at none before the survey threshold', () => {
    expect(resolveBiomeSurveyState(0, 11)).toBe('none');
    expect(resolveBiomeSurveyState(3, 11)).toBe('none');
  });

  it('becomes surveyed at four finds without requiring a full clear', () => {
    expect(resolveBiomeSurveyState(4, 11)).toBe('surveyed');
    expect(resolveBiomeSurveyState(7, 11)).toBe('surveyed');
  });

  it('becomes complete only when the biome is fully discovered', () => {
    expect(resolveBiomeSurveyState(11, 11)).toBe('complete');
    expect(resolveBiomeSurveyState(4, 4)).toBe('complete');
  });

  it('builds labeled survey progress for multiple biomes', () => {
    expect(
      buildBiomeSurveyProgress([
        { biomeId: 'beach', discoveredCount: 4, totalCount: 11 },
        { biomeId: 'forest', discoveredCount: 9, totalCount: 9 },
      ]),
    ).toEqual([
      { biomeId: 'beach', discoveredCount: 4, totalCount: 11, state: 'surveyed' },
      { biomeId: 'forest', discoveredCount: 9, totalCount: 9, state: 'complete' },
    ]);

    expect(formatBiomeSurveyStateLabel('none')).toBeNull();
    expect(formatBiomeSurveyStateLabel('surveyed')).toBe('SURVEYED');
    expect(formatBiomeSurveyStateLabel('complete')).toBe('COMPLETE');
  });
});
