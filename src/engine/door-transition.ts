import type { DoorAnchor, WorldMapDefinition } from '../content/world-map';
import { clamp, lerp } from './random';
import { buildRoutePoints, getPathDistance, getWorldMapLocationByBiomeId, samplePathPosition } from './world-map';
import type { Facing } from './types';

export type DoorTransitionPhaseId =
  | 'biome-exit'
  | 'fade-out'
  | 'map-emerge'
  | 'map-walk'
  | 'map-enter'
  | 'fade-in'
  | 'biome-emerge';

export interface DoorTransitionPhase {
  id: DoorTransitionPhaseId;
  duration: number;
  scene: 'biome' | 'world-map';
}

export interface DoorTransitionPlan {
  fromBiomeId: string;
  toBiomeId: string;
  fromLocationId: string;
  toLocationId: string;
  routePoints: Array<{ x: number; y: number }>;
  routeDistance: number;
  phases: DoorTransitionPhase[];
  totalDuration: number;
}

export interface DoorTransitionSnapshot {
  phaseId: DoorTransitionPhaseId;
  phaseProgress: number;
  scene: 'biome' | 'world-map';
  fadeAlpha: number;
  avatar: {
    x: number;
    y: number;
    facing: Facing;
    space: 'biome' | 'world-map';
  } | null;
  activeBiomeId: string | null;
  activeLocationId: string | null;
  sourceDoorOpen: number;
  destinationDoorOpen: number;
}

function reverseFacing(facing: Facing): Facing {
  return facing === 'left' ? 'right' : 'left';
}

function doorMouthX(door: DoorAnchor): number {
  return door.x + 4;
}

function doorActorY(door: DoorAnchor): number {
  return door.y - 2;
}

function sampleDoorTraversal(
  door: DoorAnchor,
  progress: number,
  mode: 'outside-to-inside' | 'inside-to-outside',
): { x: number; y: number; facing: Facing } {
  const direction = door.facing === 'right' ? 1 : -1;
  const outsideOffset = direction * -12;
  const insideOffset = direction * 2;

  const startOffset = mode === 'outside-to-inside' ? outsideOffset : insideOffset;
  const endOffset = mode === 'outside-to-inside' ? insideOffset : outsideOffset;
  const facing = mode === 'outside-to-inside' ? door.facing : reverseFacing(door.facing);

  return {
    x: lerp(doorMouthX(door) + startOffset, doorMouthX(door) + endOffset, progress),
    y: doorActorY(door),
    facing,
  };
}

export function createDoorTransitionPlan(
  definition: WorldMapDefinition,
  fromBiomeId: string,
  toBiomeId: string,
): DoorTransitionPlan {
  const fromLocation = getWorldMapLocationByBiomeId(definition, fromBiomeId);
  const toLocation = getWorldMapLocationByBiomeId(definition, toBiomeId);
  const routeData = buildRoutePoints(definition, [fromLocation.id, toLocation.id]);
  const routeDistance = getPathDistance(routeData.points);
  const mapWalkDuration = Math.max(0.7, routeDistance / 40);

  const phases: DoorTransitionPhase[] = [
    { id: 'biome-exit', duration: 0.5, scene: 'biome' },
    { id: 'fade-out', duration: 0.25, scene: 'biome' },
    { id: 'map-emerge', duration: 0.45, scene: 'world-map' },
    { id: 'map-walk', duration: mapWalkDuration, scene: 'world-map' },
    { id: 'map-enter', duration: 0.45, scene: 'world-map' },
    { id: 'fade-in', duration: 0.25, scene: 'biome' },
    { id: 'biome-emerge', duration: 0.55, scene: 'biome' },
  ];

  return {
    fromBiomeId,
    toBiomeId,
    fromLocationId: fromLocation.id,
    toLocationId: toLocation.id,
    routePoints: routeData.points,
    routeDistance,
    phases,
    totalDuration: phases.reduce((sum, phase) => sum + phase.duration, 0),
  };
}

export function sampleDoorTransition(
  definition: WorldMapDefinition,
  plan: DoorTransitionPlan,
  elapsed: number,
): DoorTransitionSnapshot {
  const clampedElapsed = clamp(elapsed, 0, plan.totalDuration);
  let elapsedBeforePhase = 0;
  let activePhase = plan.phases[plan.phases.length - 1];

  for (const phase of plan.phases) {
    if (clampedElapsed <= elapsedBeforePhase + phase.duration) {
      activePhase = phase;
      break;
    }
    elapsedBeforePhase += phase.duration;
  }

  const fromLocation = getWorldMapLocationByBiomeId(definition, plan.fromBiomeId);
  const toLocation = getWorldMapLocationByBiomeId(definition, plan.toBiomeId);
  const phaseElapsed = clamp(clampedElapsed - elapsedBeforePhase, 0, activePhase.duration);
  const phaseProgress =
    activePhase.duration <= 0 ? 1 : clamp(phaseElapsed / activePhase.duration, 0, 1);

  switch (activePhase.id) {
    case 'biome-exit': {
      const avatar = sampleDoorTraversal(fromLocation.biomeDoor, phaseProgress, 'outside-to-inside');
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'biome',
        fadeAlpha: 0,
        avatar: { ...avatar, space: 'biome' },
        activeBiomeId: plan.fromBiomeId,
        activeLocationId: null,
        sourceDoorOpen: 1 - phaseProgress * 0.6,
        destinationDoorOpen: 0,
      };
    }
    case 'fade-out':
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'biome',
        fadeAlpha: phaseProgress,
        avatar: null,
        activeBiomeId: plan.fromBiomeId,
        activeLocationId: null,
        sourceDoorOpen: 0.35,
        destinationDoorOpen: 0,
      };
    case 'map-emerge': {
      const avatar = sampleDoorTraversal(fromLocation.mapDoor, phaseProgress, 'inside-to-outside');
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'world-map',
        fadeAlpha: 1 - phaseProgress,
        avatar: { ...avatar, space: 'world-map' },
        activeBiomeId: null,
        activeLocationId: plan.fromLocationId,
        sourceDoorOpen: phaseProgress,
        destinationDoorOpen: 0,
      };
    }
    case 'map-walk': {
      const sample = samplePathPosition(plan.routePoints, plan.routeDistance * phaseProgress);
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'world-map',
        fadeAlpha: 0,
        avatar: { ...sample, space: 'world-map' },
        activeBiomeId: null,
        activeLocationId: null,
        sourceDoorOpen: 1,
        destinationDoorOpen: 0,
      };
    }
    case 'map-enter': {
      const avatar = sampleDoorTraversal(toLocation.mapDoor, phaseProgress, 'outside-to-inside');
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'world-map',
        fadeAlpha: 0,
        avatar: { ...avatar, space: 'world-map' },
        activeBiomeId: null,
        activeLocationId: plan.toLocationId,
        sourceDoorOpen: 1,
        destinationDoorOpen: 1 - phaseProgress * 0.7,
      };
    }
    case 'fade-in':
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'biome',
        fadeAlpha: 1 - phaseProgress,
        avatar: null,
        activeBiomeId: plan.toBiomeId,
        activeLocationId: null,
        sourceDoorOpen: 0,
        destinationDoorOpen: 0.35,
      };
    case 'biome-emerge':
    default: {
      const avatar = sampleDoorTraversal(toLocation.biomeDoor, phaseProgress, 'inside-to-outside');
      return {
        phaseId: activePhase.id,
        phaseProgress,
        scene: 'biome',
        fadeAlpha: 0,
        avatar: { ...avatar, space: 'biome' },
        activeBiomeId: plan.toBiomeId,
        activeLocationId: null,
        sourceDoorOpen: 0,
        destinationDoorOpen: phaseProgress,
      };
    }
  }
}
