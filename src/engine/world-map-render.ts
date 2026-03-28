import type { WorldMapDefinition } from '../content/world-map';
import { worldMapPalette } from '../assets/palette';
import { drawSprite, type SpriteRegistry } from './sprites';
import { buildRoutePoints, getWorldMapLocation, type WorldMapState } from './world-map';

function fillPixelPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  border: string,
): void {
  context.fillStyle = border;
  context.fillRect(x, y, w, h);
  context.fillStyle = fill;
  context.fillRect(x + 2, y + 2, w - 4, h - 4);
}

function drawPath(
  context: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
): void {
  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const distance = Math.max(1, Math.round(Math.hypot(end.x - start.x, end.y - start.y)));

    for (let step = 0; step <= distance; step += 1) {
      const progress = step / distance;
      const x = Math.round(start.x + (end.x - start.x) * progress);
      const y = Math.round(start.y + (end.y - start.y) * progress);
      context.fillStyle = step % 6 < 4 ? worldMapPalette.trail : worldMapPalette.trailDark;
      context.fillRect(x, y, 2, 2);
    }
  }
}

function drawFocusMarker(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  frameCount: number,
): void {
  const bob = Math.sin(frameCount / 10) * 2;
  const markerY = Math.round(y - 14 + bob);

  context.fillStyle = worldMapPalette.accent;
  context.fillRect(x, markerY, 2, 2);
  context.fillRect(x - 2, markerY + 2, 6, 2);
  context.fillRect(x - 4, markerY + 4, 10, 2);
}

export function drawWorldMapScene(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  definition: WorldMapDefinition,
  state: WorldMapState,
  frameCount: number,
): void {
  const gradient = context.createLinearGradient(0, 0, 0, definition.height);
  gradient.addColorStop(0, worldMapPalette.skyTop);
  gradient.addColorStop(1, worldMapPalette.skyBottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, definition.width, definition.height);

  context.fillStyle = worldMapPalette.ocean;
  context.fillRect(0, 84, 70, 60);
  context.fillStyle = worldMapPalette.oceanDark;
  context.fillRect(0, 92, 70, 52);
  context.fillStyle = worldMapPalette.landLight;
  context.fillRect(24, 52, 152, 78);
  context.fillStyle = worldMapPalette.landDark;
  context.fillRect(58, 28, 120, 62);
  context.fillStyle = worldMapPalette.forest;
  context.fillRect(84, 34, 82, 42);

  for (const connection of definition.connections) {
    const route = buildRoutePoints(definition, [connection.from, connection.to]);
    drawPath(context, route.points);
  }

  for (const location of definition.locations) {
    drawSprite(context, sprites, location.spriteId, location.mapDoor.x, location.mapDoor.y);

    if (location.id === state.focusedLocationId) {
      drawFocusMarker(context, location.node.x, location.node.y, frameCount);
    }
  }

  context.fillStyle = 'rgba(24, 18, 14, 0.18)';
  context.fillRect(Math.round(state.avatarX - 2), Math.round(state.avatarY + 2), 8, 2);

  const playerFrame = state.mode === 'walking' ? 1 + (Math.floor(frameCount / 8) % 2) * 2 : 0;
  drawSprite(
    context,
    sprites,
    'player',
    Math.round(state.avatarX - 3),
    Math.round(state.avatarY - 12),
    playerFrame,
    state.facing === 'left',
  );

  const focused = getWorldMapLocation(definition, state.focusedLocationId);
  fillPixelPanel(
    context,
    8,
    definition.height - 30,
    definition.width - 16,
    22,
    worldMapPalette.labelBg,
    worldMapPalette.labelBorder,
  );
  context.font = 'bold 8px Verdana, Geneva, sans-serif';
  context.fillStyle = worldMapPalette.text;
  context.fillText(focused.label.toUpperCase(), 14, definition.height - 24);
  context.font = 'bold 7px Verdana, Geneva, sans-serif';
  context.fillText(focused.summary, 14, definition.height - 14);
}
