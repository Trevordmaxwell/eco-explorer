import type { DayPart, PhenologyPhase, SaveState, WeatherProfile } from './types';
import { resolvePhenologyPhase } from './phenology';

export interface WorldState {
  worldAge: number;
  dayPart: DayPart;
  weather: WeatherProfile;
  phenologyPhase: PhenologyPhase;
}

const DAY_PART_SEQUENCE: readonly DayPart[] = ['dawn', 'day', 'dusk'];
const SPECIAL_WEATHER_BY_BIOME: Record<string, Exclude<WeatherProfile, 'clear'>> = {
  beach: 'marine-haze',
  'coastal-scrub': 'marine-haze',
  forest: 'mist-drip',
  treeline: 'ridge-wind',
  tundra: 'light-flurry',
};

export function resolveDayPart(worldAge: number): DayPart {
  const safeWorldAge = Number.isFinite(worldAge) ? Math.max(0, Math.floor(worldAge)) : 0;
  return DAY_PART_SEQUENCE[safeWorldAge % DAY_PART_SEQUENCE.length];
}

export function resolveWeather(worldAge: number, biomeId: string): WeatherProfile {
  const safeWorldAge = Number.isFinite(worldAge) ? Math.max(0, Math.floor(worldAge)) : 0;
  if (safeWorldAge % 4 !== 2) {
    return 'clear';
  }

  return SPECIAL_WEATHER_BY_BIOME[biomeId] ?? 'clear';
}

export function buildWorldState(save: Pick<SaveState, 'worldStep'>, biomeId: string): WorldState {
  const worldAge = Math.max(0, Math.floor(save.worldStep ?? 0));
  return {
    worldAge,
    dayPart: resolveDayPart(worldAge),
    weather: resolveWeather(worldAge, biomeId),
    phenologyPhase: resolvePhenologyPhase(worldAge),
  };
}
