import { describe, expect, it } from 'vitest';

import { ecoWorldMap } from '../content/world-map';
import {
  resolveMapReturnLabel,
  resolveRegionalTravelWarmth,
  resolveWorldMapApproachLabel,
  resolveWorldMapOriginLabel,
  resolveWorldMapSummaryLabel,
} from '../engine/travel-framing';

describe('travel framing labels', () => {
  it('keeps origin labels quiet at home and readable when focus moves away', () => {
    expect(resolveWorldMapOriginLabel(ecoWorldMap, 'beach', 'beach')).toBeNull();
    expect(resolveWorldMapOriginLabel(ecoWorldMap, 'beach', 'forest')).toBe('FROM SUNNY BEACH');
  });

  it('keeps High Pass warmth on Forest Trail when Treeline is the next target', () => {
    const context = { nextFieldSeasonTargetBiomeId: 'treeline' };

    expect(resolveRegionalTravelWarmth('forest', context)).toEqual({
      mapReturnLabel: 'HIGH PASS MAP',
      summaryLabel: 'Last woods before High Pass.',
    });
    expect(resolveWorldMapSummaryLabel(ecoWorldMap, 'forest', context)).toBe(
      'Last woods before High Pass.',
    );
    expect(resolveMapReturnLabel(ecoWorldMap, 'forest', context)).toBe('HIGH PASS MAP');
  });

  it('falls back to authored map labels outside the High Pass warmth window', () => {
    const context = { nextFieldSeasonTargetBiomeId: null };

    expect(resolveRegionalTravelWarmth('forest', context)).toBeNull();
    expect(resolveWorldMapSummaryLabel(ecoWorldMap, 'forest', context)).toBe(
      'Middle woods between scrub and treeline.',
    );
    expect(resolveMapReturnLabel(ecoWorldMap, 'forest', context)).toBe('INLAND MAP');
  });

  it('uses authored approach labels for walking destinations', () => {
    expect(resolveWorldMapApproachLabel(ecoWorldMap, 'treeline')).toBe('HIGH PASS');
  });
});
