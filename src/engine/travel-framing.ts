import type { WorldMapDefinition } from '../content/world-map';
import { getWorldMapLocation } from './world-map';

export interface TravelFramingContext {
  nextFieldSeasonTargetBiomeId: string | null;
}

interface RegionalTravelWarmth {
  mapReturnLabel: string;
  summaryLabel: string;
}

export function resolveWorldMapOriginLabel(
  definition: WorldMapDefinition,
  currentLocationId: string,
  focusedLocationId: string,
): string | null {
  if (currentLocationId === focusedLocationId) {
    return null;
  }

  return `FROM ${getWorldMapLocation(definition, currentLocationId).label.toUpperCase()}`;
}

export function resolveRegionalTravelWarmth(
  locationId: string,
  context: TravelFramingContext,
): RegionalTravelWarmth | null {
  if (context.nextFieldSeasonTargetBiomeId !== 'treeline') {
    return null;
  }

  if (locationId !== 'forest') {
    return null;
  }

  return {
    mapReturnLabel: 'HIGH PASS MAP',
    summaryLabel: 'Last woods before High Pass.',
  };
}

export function resolveWorldMapSummaryLabel(
  definition: WorldMapDefinition,
  locationId: string,
  context: TravelFramingContext,
): string {
  return resolveRegionalTravelWarmth(locationId, context)?.summaryLabel
    ?? getWorldMapLocation(definition, locationId).summary;
}

export function resolveMapReturnLabel(
  definition: WorldMapDefinition,
  locationId: string,
  context: TravelFramingContext,
): string | null {
  return resolveRegionalTravelWarmth(locationId, context)?.mapReturnLabel
    ?? getWorldMapLocation(definition, locationId).mapReturnLabel
    ?? null;
}

export function resolveWorldMapApproachLabel(
  definition: WorldMapDefinition,
  locationId: string,
): string | null {
  return getWorldMapLocation(definition, locationId).approachLabel ?? null;
}
