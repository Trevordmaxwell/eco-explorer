import type {
  MapPoint,
  WorldMapConnection,
  WorldMapDefinition,
  WorldMapLocation,
} from '../content/world-map';
import { clamp, lerp } from './random';
import type { Facing } from './types';

export type WorldMapDirection = 'left' | 'right' | 'up' | 'down';
export type WorldMapMode = 'idle' | 'walking';

export interface WorldMapRoute {
  connectionIds: string[];
  locationIds: string[];
  points: MapPoint[];
  totalDistance: number;
  traveledDistance: number;
  targetLocationId: string;
}

export interface WorldMapState {
  currentLocationId: string;
  focusedLocationId: string;
  avatarX: number;
  avatarY: number;
  facing: Facing;
  mode: WorldMapMode;
  activeRoute: WorldMapRoute | null;
}

export interface WorldMapStepResult {
  arrived: boolean;
  locationId: string | null;
}

function reverseFacing(facing: Facing): Facing {
  return facing === 'left' ? 'right' : 'left';
}

export function getWorldMapLocation(
  definition: WorldMapDefinition,
  locationId: string,
): WorldMapLocation {
  const location = definition.locations.find((candidate) => candidate.id === locationId);
  if (!location) {
    throw new Error(`Unknown world-map location "${locationId}".`);
  }
  return location;
}

export function getWorldMapLocationByBiomeId(
  definition: WorldMapDefinition,
  biomeId: string,
): WorldMapLocation {
  const location = definition.locations.find((candidate) => candidate.biomeId === biomeId);
  if (!location) {
    throw new Error(`No world-map location is linked to biome "${biomeId}".`);
  }
  return location;
}

function getConnection(
  definition: WorldMapDefinition,
  fromId: string,
  toId: string,
): { connection: WorldMapConnection; reversed: boolean } | null {
  for (const connection of definition.connections) {
    if (connection.from === fromId && connection.to === toId) {
      return { connection, reversed: false };
    }

    if (connection.from === toId && connection.to === fromId) {
      return { connection, reversed: true };
    }
  }

  return null;
}

function buildGraph(definition: WorldMapDefinition): Map<string, string[]> {
  const graph = new Map<string, string[]>();

  for (const location of definition.locations) {
    graph.set(location.id, []);
  }

  for (const connection of definition.connections) {
    graph.get(connection.from)?.push(connection.to);
    graph.get(connection.to)?.push(connection.from);
  }

  return graph;
}

function findLocationRoute(
  definition: WorldMapDefinition,
  fromId: string,
  toId: string,
): string[] | null {
  if (fromId === toId) {
    return [fromId];
  }

  const graph = buildGraph(definition);
  const queue: string[][] = [[fromId]];
  const visited = new Set<string>([fromId]);

  while (queue.length > 0) {
    const path = queue.shift();
    if (!path) {
      continue;
    }

    const current = path[path.length - 1];
    const neighbors = graph.get(current) ?? [];

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      const nextPath = [...path, neighbor];
      if (neighbor === toId) {
        return nextPath;
      }

      visited.add(neighbor);
      queue.push(nextPath);
    }
  }

  return null;
}

export function getWorldMapRouteLocationIds(
  definition: WorldMapDefinition,
  fromId: string,
  toId: string,
): string[] {
  const routeIds = findLocationRoute(definition, fromId, toId);
  if (!routeIds) {
    throw new Error(`No world-map route exists between "${fromId}" and "${toId}".`);
  }
  return routeIds;
}

export function buildRoutePoints(
  definition: WorldMapDefinition,
  locationIds: string[],
): { points: MapPoint[]; connectionIds: string[] } {
  if (locationIds.length === 0) {
    return { points: [], connectionIds: [] };
  }

  if (locationIds.length === 1) {
    const only = getWorldMapLocation(definition, locationIds[0]);
    return { points: [only.node], connectionIds: [] };
  }

  if (locationIds.every((locationId) => locationId === locationIds[0])) {
    const only = getWorldMapLocation(definition, locationIds[0]);
    return { points: [only.node], connectionIds: [] };
  }

  const points: MapPoint[] = [];
  const connectionIds: string[] = [];

  for (let index = 0; index < locationIds.length - 1; index += 1) {
    const fromId = locationIds[index];
    const toId = locationIds[index + 1];
    const resolved = getConnection(definition, fromId, toId);

    if (!resolved) {
      throw new Error(`No world-map connection exists between "${fromId}" and "${toId}".`);
    }

    const from = getWorldMapLocation(definition, fromId);
    const to = getWorldMapLocation(definition, toId);
    const middle = resolved.reversed
      ? [...resolved.connection.waypoints].reverse()
      : resolved.connection.waypoints;
    const segment = [from.node, ...middle, to.node];

    connectionIds.push(resolved.connection.id);

    if (points.length === 0) {
      points.push(...segment);
    } else {
      points.push(...segment.slice(1));
    }
  }

  return { points, connectionIds };
}

export function getPathDistance(points: MapPoint[]): number {
  let total = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    total += Math.hypot(current.x - previous.x, current.y - previous.y);
  }

  return total;
}

export function samplePathPosition(
  points: MapPoint[],
  distance: number,
): { x: number; y: number; facing: Facing } {
  if (!points.length) {
    return { x: 0, y: 0, facing: 'right' };
  }

  if (points.length === 1) {
    return { x: points[0].x, y: points[0].y, facing: 'right' };
  }

  const totalDistance = getPathDistance(points);
  const clampedDistance = clamp(distance, 0, totalDistance);
  let remaining = clampedDistance;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segmentDistance = Math.hypot(current.x - previous.x, current.y - previous.y);

    if (segmentDistance === 0) {
      continue;
    }

    if (remaining <= segmentDistance || index === points.length - 1) {
      const progress = segmentDistance === 0 ? 1 : remaining / segmentDistance;
      const dx = current.x - previous.x;
      const facing = dx >= 0 ? 'right' : 'left';

      return {
        x: lerp(previous.x, current.x, progress),
        y: lerp(previous.y, current.y, progress),
        facing,
      };
    }

    remaining -= segmentDistance;
  }

  const last = points[points.length - 1];
  const penultimate = points[points.length - 2];
  return {
    x: last.x,
    y: last.y,
    facing: last.x >= penultimate.x ? 'right' : 'left',
  };
}

export function createWorldMapState(
  definition: WorldMapDefinition,
  currentLocationId = definition.startLocationId,
  focusedLocationId = currentLocationId,
): WorldMapState {
  const current = getWorldMapLocation(definition, currentLocationId);
  const focused = getWorldMapLocation(definition, focusedLocationId);

  return {
    currentLocationId: current.id,
    focusedLocationId: focused.id,
    avatarX: current.node.x,
    avatarY: current.node.y,
    facing: reverseFacing(current.mapDoor.facing),
    mode: 'idle',
    activeRoute: null,
  };
}

export function moveWorldMapFocus(
  definition: WorldMapDefinition,
  state: WorldMapState,
  direction: WorldMapDirection,
): string {
  const current = getWorldMapLocation(definition, state.focusedLocationId);
  const candidates = definition.locations
    .filter((location) => location.id !== current.id)
    .map((location) => ({
      location,
      dx: location.node.x - current.node.x,
      dy: location.node.y - current.node.y,
    }))
    .filter(({ dx, dy }) => {
      switch (direction) {
        case 'left':
          return dx < 0;
        case 'right':
          return dx > 0;
        case 'up':
          return dy < 0;
        case 'down':
          return dy > 0;
      }
    })
    .sort((left, right) => {
      const leftPrimary =
        direction === 'left' || direction === 'right' ? Math.abs(left.dx) : Math.abs(left.dy);
      const rightPrimary =
        direction === 'left' || direction === 'right' ? Math.abs(right.dx) : Math.abs(right.dy);
      const leftSecondary =
        direction === 'left' || direction === 'right' ? Math.abs(left.dy) : Math.abs(left.dx);
      const rightSecondary =
        direction === 'left' || direction === 'right' ? Math.abs(right.dy) : Math.abs(right.dx);

      return leftPrimary + leftSecondary * 0.5 - (rightPrimary + rightSecondary * 0.5);
    });

  if (!candidates.length) {
    return state.focusedLocationId;
  }

  state.focusedLocationId = candidates[0].location.id;
  return state.focusedLocationId;
}

export function beginWorldMapWalk(
  definition: WorldMapDefinition,
  state: WorldMapState,
  targetLocationId = state.focusedLocationId,
): boolean {
  if (state.activeRoute || state.currentLocationId === targetLocationId) {
    return false;
  }

  let routeIds: string[];
  try {
    routeIds = getWorldMapRouteLocationIds(definition, state.currentLocationId, targetLocationId);
  } catch {
    return false;
  }

  const routeData = buildRoutePoints(definition, routeIds);

  state.activeRoute = {
    connectionIds: routeData.connectionIds,
    locationIds: routeIds,
    points: routeData.points,
    totalDistance: getPathDistance(routeData.points),
    traveledDistance: 0,
    targetLocationId,
  };
  state.mode = 'walking';

  return true;
}

export function stepWorldMapState(
  definition: WorldMapDefinition,
  state: WorldMapState,
  dt: number,
  walkSpeed = 34,
): WorldMapStepResult {
  if (!state.activeRoute) {
    return { arrived: false, locationId: null };
  }

  const route = state.activeRoute;
  route.traveledDistance = clamp(
    route.traveledDistance + walkSpeed * dt,
    0,
    route.totalDistance,
  );

  const sample = samplePathPosition(route.points, route.traveledDistance);
  state.avatarX = sample.x;
  state.avatarY = sample.y;
  state.facing = sample.facing;

  if (route.traveledDistance >= route.totalDistance) {
    const target = getWorldMapLocation(definition, route.targetLocationId);
    state.currentLocationId = target.id;
    state.focusedLocationId = target.id;
    state.avatarX = target.node.x;
    state.avatarY = target.node.y;
    state.facing = reverseFacing(target.mapDoor.facing);
    state.mode = 'idle';
    state.activeRoute = null;
    return { arrived: true, locationId: target.id };
  }

  return { arrived: false, locationId: null };
}
