import type { Facing } from '../engine/types';

export interface MapPoint {
  x: number;
  y: number;
}

export interface DoorAnchor {
  x: number;
  y: number;
  facing: Facing;
  spriteId: string;
}

export interface CorridorDoor extends DoorAnchor {
  targetBiomeId: string;
}

export interface WorldMapLocation {
  id: string;
  biomeId: string;
  label: string;
  summary: string;
  mapReturnLabel?: string;
  approachLabel?: string;
  previewColor: string;
  node: MapPoint;
  mapDoor: DoorAnchor;
  biomeDoor: DoorAnchor;
  corridorDoors?: CorridorDoor[];
  mapReturnPost?: DoorAnchor;
  spriteId: string;
}

export interface WorldMapConnection {
  id: string;
  from: string;
  to: string;
  waypoints: MapPoint[];
}

export interface WorldMapDefinition {
  id: string;
  name: string;
  width: number;
  height: number;
  startLocationId: string;
  locations: WorldMapLocation[];
  connections: WorldMapConnection[];
}

const WORLD_MAP_WIDTH = 256;
const WORLD_MAP_HEIGHT = 160;
const WORLD_MAP_BASE_WIDTH = 192;
const WORLD_MAP_BASE_HEIGHT = 144;

function scaleMapX(value: number): number {
  return Math.round((value / WORLD_MAP_BASE_WIDTH) * WORLD_MAP_WIDTH);
}

function scaleMapY(value: number): number {
  return Math.round((value / WORLD_MAP_BASE_HEIGHT) * WORLD_MAP_HEIGHT);
}

function scaleMapPoint(x: number, y: number): MapPoint {
  return {
    x: scaleMapX(x),
    y: scaleMapY(y),
  };
}

function scaleMapDoor(
  x: number,
  y: number,
  facing: Facing,
  spriteId: string,
): DoorAnchor {
  return {
    x: scaleMapX(x),
    y: scaleMapY(y),
    facing,
    spriteId,
  };
}

export const ecoWorldMap: WorldMapDefinition = {
  id: 'eco-world',
  name: 'Eco World',
  width: WORLD_MAP_WIDTH,
  height: WORLD_MAP_HEIGHT,
  startLocationId: 'beach',
  locations: [
    {
      id: 'beach',
      biomeId: 'beach',
      label: 'Sunny Beach',
      summary: 'Ocean edge. Inland path leads to scrub.',
      mapReturnLabel: 'COAST MAP',
      approachLabel: 'COAST APPROACH',
      previewColor: '#73a8b7',
      node: scaleMapPoint(36, 100),
      mapDoor: scaleMapDoor(24, 88, 'right', 'map-beach-door'),
      biomeDoor: { x: 598, y: 92, facing: 'right', spriteId: 'travel-door' },
      corridorDoors: [
        {
          x: 132,
          y: 92,
          facing: 'right',
          spriteId: 'travel-door',
          targetBiomeId: 'coastal-scrub',
        },
      ],
      mapReturnPost: { x: 228, y: 94, facing: 'right', spriteId: 'map-post' },
      spriteId: 'map-beach-door',
    },
    {
      id: 'coastal-scrub',
      biomeId: 'coastal-scrub',
      label: 'Coastal Scrub',
      summary: 'Between beach dunes and forest shade.',
      mapReturnLabel: 'COAST MAP',
      approachLabel: 'COAST APPROACH',
      previewColor: '#6f8b66',
      node: scaleMapPoint(78, 86),
      mapDoor: scaleMapDoor(66, 74, 'left', 'map-coastal-scrub-door'),
      biomeDoor: { x: 18, y: 92, facing: 'left', spriteId: 'travel-door' },
      corridorDoors: [
        {
          x: 18,
          y: 92,
          facing: 'left',
          spriteId: 'travel-door',
          targetBiomeId: 'beach',
        },
        {
          x: 608,
          y: 92,
          facing: 'right',
          spriteId: 'travel-door',
          targetBiomeId: 'forest',
        },
      ],
      mapReturnPost: { x: 172, y: 94, facing: 'right', spriteId: 'map-post' },
      spriteId: 'map-coastal-scrub-door',
    },
    {
      id: 'forest',
      biomeId: 'forest',
      label: 'Forest Trail',
      summary: 'Middle woods between scrub and treeline.',
      mapReturnLabel: 'INLAND MAP',
      approachLabel: 'INLAND APPROACH',
      previewColor: '#4b6e43',
      node: scaleMapPoint(120, 64),
      mapDoor: scaleMapDoor(108, 52, 'left', 'map-forest-door'),
      biomeDoor: { x: 18, y: 90, facing: 'left', spriteId: 'travel-door' },
      corridorDoors: [
        {
          x: 18,
          y: 90,
          facing: 'left',
          spriteId: 'travel-door',
          targetBiomeId: 'coastal-scrub',
        },
        {
          x: 770,
          y: 90,
          facing: 'right',
          spriteId: 'travel-door',
          targetBiomeId: 'treeline',
        },
      ],
      mapReturnPost: { x: 236, y: 92, facing: 'right', spriteId: 'map-post' },
      spriteId: 'map-forest-door',
    },
    {
      id: 'treeline',
      biomeId: 'treeline',
      label: 'Treeline Pass',
      summary: 'High pass between forest and tundra.',
      mapReturnLabel: 'HIGH PASS MAP',
      approachLabel: 'HIGH PASS',
      previewColor: '#86928a',
      node: scaleMapPoint(149, 40),
      mapDoor: scaleMapDoor(137, 28, 'left', 'map-treeline-door'),
      biomeDoor: { x: 18, y: 90, facing: 'left', spriteId: 'travel-door' },
      corridorDoors: [
        {
          x: 18,
          y: 90,
          facing: 'left',
          spriteId: 'travel-door',
          targetBiomeId: 'forest',
        },
        {
          x: 608,
          y: 90,
          facing: 'right',
          spriteId: 'travel-door',
          targetBiomeId: 'tundra',
        },
      ],
      mapReturnPost: { x: 404, y: 92, facing: 'right', spriteId: 'map-post' },
      spriteId: 'map-treeline-door',
    },
    {
      id: 'tundra',
      biomeId: 'tundra',
      label: 'Tundra Reach',
      summary: 'Highest reach beyond treeline.',
      mapReturnLabel: 'HIGH COUNTRY MAP',
      approachLabel: 'HIGH COUNTRY',
      previewColor: '#8ebdd0',
      node: scaleMapPoint(166, 18),
      mapDoor: scaleMapDoor(154, 6, 'left', 'map-tundra-door'),
      biomeDoor: { x: 18, y: 90, facing: 'left', spriteId: 'travel-door' },
      corridorDoors: [
        {
          x: 18,
          y: 90,
          facing: 'left',
          spriteId: 'travel-door',
          targetBiomeId: 'treeline',
        },
      ],
      mapReturnPost: { x: 236, y: 92, facing: 'right', spriteId: 'map-post' },
      spriteId: 'map-tundra-door',
    },
  ],
  connections: [
    {
      id: 'beach-to-coastal-scrub',
      from: 'beach',
      to: 'coastal-scrub',
      waypoints: [
        scaleMapPoint(50, 96),
        scaleMapPoint(62, 92),
        scaleMapPoint(70, 88),
      ],
    },
    {
      id: 'coastal-scrub-to-forest',
      from: 'coastal-scrub',
      to: 'forest',
      waypoints: [
        scaleMapPoint(92, 80),
        scaleMapPoint(102, 74),
        scaleMapPoint(112, 69),
      ],
    },
    {
      id: 'forest-to-treeline',
      from: 'forest',
      to: 'treeline',
      waypoints: [
        scaleMapPoint(130, 58),
        scaleMapPoint(138, 51),
        scaleMapPoint(143, 46),
      ],
    },
    {
      id: 'treeline-to-tundra',
      from: 'treeline',
      to: 'tundra',
      waypoints: [
        scaleMapPoint(156, 32),
        scaleMapPoint(162, 25),
      ],
    },
  ],
};
