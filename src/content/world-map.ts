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

export interface WorldMapLocation {
  id: string;
  biomeId: string;
  label: string;
  summary: string;
  previewColor: string;
  node: MapPoint;
  mapDoor: DoorAnchor;
  biomeDoor: DoorAnchor;
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

export const ecoWorldMap: WorldMapDefinition = {
  id: 'eco-world',
  name: 'Eco World',
  width: 192,
  height: 144,
  startLocationId: 'beach',
  locations: [
    {
      id: 'beach',
      biomeId: 'beach',
      label: 'Sunny Beach',
      summary: 'Shells, dunes, and shore life.',
      previewColor: '#73a8b7',
      node: { x: 40, y: 97 },
      mapDoor: { x: 28, y: 86, facing: 'right', spriteId: 'map-beach-door' },
      biomeDoor: { x: 598, y: 92, facing: 'right', spriteId: 'travel-door' },
      spriteId: 'map-beach-door',
    },
    {
      id: 'forest',
      biomeId: 'forest',
      label: 'Forest Trail',
      summary: 'Ferns, cones, and canopy life.',
      previewColor: '#4b6e43',
      node: { x: 148, y: 61 },
      mapDoor: { x: 136, y: 49, facing: 'left', spriteId: 'map-forest-door' },
      biomeDoor: { x: 18, y: 90, facing: 'left', spriteId: 'travel-door' },
      spriteId: 'map-forest-door',
    },
    {
      id: 'tundra',
      biomeId: 'tundra',
      label: 'Tundra Reach',
      summary: 'Snow, berries, and Arctic life.',
      previewColor: '#8ebdd0',
      node: { x: 130, y: 24 },
      mapDoor: { x: 118, y: 12, facing: 'left', spriteId: 'map-tundra-door' },
      biomeDoor: { x: 18, y: 90, facing: 'left', spriteId: 'travel-door' },
      spriteId: 'map-tundra-door',
    },
  ],
  connections: [
    {
      id: 'coast-to-forest',
      from: 'beach',
      to: 'forest',
      waypoints: [
        { x: 64, y: 92 },
        { x: 92, y: 81 },
        { x: 120, y: 70 },
      ],
    },
    {
      id: 'forest-to-tundra',
      from: 'forest',
      to: 'tundra',
      waypoints: [
        { x: 144, y: 50 },
        { x: 138, y: 38 },
        { x: 134, y: 30 },
      ],
    },
  ],
};
