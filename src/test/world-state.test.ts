import { describe, expect, it } from 'vitest';

import { resolvePhenologyPhase } from '../engine/phenology';
import { buildWorldState, resolveDayPart, resolveWeather } from '../engine/world-state';

describe('world state helpers', () => {
  it('cycles through the calm dawn/day/dusk sequence deterministically', () => {
    expect(resolveDayPart(0)).toBe('dawn');
    expect(resolveDayPart(1)).toBe('day');
    expect(resolveDayPart(2)).toBe('dusk');
    expect(resolveDayPart(3)).toBe('dawn');
  });

  it('normalizes invalid world ages when building world state', () => {
    expect(buildWorldState({ worldStep: -4 } as { worldStep: number }, 'beach')).toEqual({
      worldAge: 0,
      dayPart: 'dawn',
      weather: 'clear',
      phenologyPhase: 'early',
    });

    expect(buildWorldState({ worldStep: 5.8 } as { worldStep: number }, 'tundra')).toEqual({
      worldAge: 5,
      dayPart: 'dusk',
      weather: 'clear',
      phenologyPhase: 'peak',
    });
  });

  it('keeps clear weather as the baseline and resolves one calm family weather per live biome', () => {
    expect(resolveWeather(1, 'beach')).toBe('clear');
    expect(resolveWeather(2, 'beach')).toBe('marine-haze');
    expect(resolveWeather(2, 'coastal-scrub')).toBe('marine-haze');
    expect(resolveWeather(2, 'forest')).toBe('mist-drip');
    expect(resolveWeather(2, 'treeline')).toBe('ridge-wind');
    expect(resolveWeather(2, 'tundra')).toBe('light-flurry');
    expect(resolveWeather(2, 'unknown')).toBe('clear');
  });

  it('keeps one calm phenology phase for every three world steps', () => {
    expect(resolvePhenologyPhase(0)).toBe('early');
    expect(resolvePhenologyPhase(2)).toBe('early');
    expect(resolvePhenologyPhase(3)).toBe('peak');
    expect(resolvePhenologyPhase(5)).toBe('peak');
    expect(resolvePhenologyPhase(6)).toBe('late');
    expect(resolvePhenologyPhase(9)).toBe('early');
  });
});
