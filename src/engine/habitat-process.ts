import type { BiomeDefinition, HabitatProcessMoment } from './types';
import type { WorldState } from './world-state';

function matchesOptionalList<T extends string>(value: T, allowed?: readonly T[]): boolean {
  return !allowed?.length || allowed.includes(value);
}

function getZoneIdForX(definition: BiomeDefinition, x: number): string | null {
  return definition.terrainRules.zones.find((zone) => x >= zone.start && x <= zone.end)?.id ?? null;
}

export function getActiveHabitatProcessMoments(
  definition: BiomeDefinition,
  visitCount: number,
  worldState: WorldState,
): HabitatProcessMoment[] {
  return (definition.processMoments ?? []).filter((moment) => {
    const minimumVisitCount = moment.minimumVisitCount ?? 1;
    return (
      visitCount >= minimumVisitCount &&
      matchesOptionalList(worldState.weather, moment.weatherProfiles) &&
      matchesOptionalList(worldState.phenologyPhase, moment.phenologyPhases)
    );
  });
}

export function resolveHabitatProcessMomentForEntity(
  definition: BiomeDefinition,
  visitCount: number,
  worldState: WorldState,
  entryId: string,
  x: number,
): HabitatProcessMoment | null {
  const zoneId = getZoneIdForX(definition, x);

  return (
    getActiveHabitatProcessMoments(definition, visitCount, worldState).find((moment) => {
      if (!moment.entryIds.includes(entryId)) {
        return false;
      }

      return !moment.zoneIds?.length || (zoneId !== null && moment.zoneIds.includes(zoneId));
    }) ?? null
  );
}
