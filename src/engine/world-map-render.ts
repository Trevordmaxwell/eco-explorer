import type { WorldMapDefinition } from '../content/world-map';
import { worldMapPalette } from '../assets/palette';
import { formatBiomeSurveyStateLabel, type BiomeSurveyState } from './progression';
import { drawSprite, type SpriteRegistry } from './sprites';
import { buildRoutePoints, getWorldMapLocation, type WorldMapState } from './world-map';

const WORLD_MAP_ART_WIDTH = 192;
const WORLD_MAP_ART_HEIGHT = 144;

function scaleMapWidth(definition: WorldMapDefinition, value: number): number {
  return Math.round((value / WORLD_MAP_ART_WIDTH) * definition.width);
}

function scaleMapHeight(definition: WorldMapDefinition, value: number): number {
  return Math.round((value / WORLD_MAP_ART_HEIGHT) * definition.height);
}

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

function fitTextToWidth(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string {
  if (!text || context.measureText(text).width <= maxWidth) {
    return text;
  }

  const ellipsis = '...';
  let next = text;

  while (next.length > 0 && context.measureText(`${next}${ellipsis}`).width > maxWidth) {
    next = next.slice(0, -1);
  }

  return next.length > 0 ? `${next}${ellipsis}` : ellipsis;
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

function drawRouteMarker(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  frameCount: number,
): void {
  const pulse = frameCount % 24 < 12 ? 0 : 1;

  context.fillStyle = worldMapPalette.accent;
  context.fillRect(x + 5, y - 8 - pulse, 2, 8);
  context.fillRect(x + 7, y - 8 - pulse, 5, 2);
  context.fillRect(x + 7, y - 6 - pulse, 4, 2);
}

export function drawWorldMapScene(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  definition: WorldMapDefinition,
  state: WorldMapState,
  frameCount: number,
  focusedSurveyState: BiomeSurveyState = 'none',
  routeMarkerLocationId: string | null = null,
  routeReplayLabel: string | null = null,
  originLabel: string | null = null,
  focusedSummaryLabel: string | null = null,
): void {
  const gradient = context.createLinearGradient(0, 0, 0, definition.height);
  gradient.addColorStop(0, worldMapPalette.skyTop);
  gradient.addColorStop(1, worldMapPalette.skyBottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, definition.width, definition.height);

  context.fillStyle = worldMapPalette.ocean;
  context.fillRect(0, scaleMapHeight(definition, 74), scaleMapWidth(definition, 82), scaleMapHeight(definition, 70));
  context.fillStyle = worldMapPalette.oceanDark;
  context.fillRect(0, scaleMapHeight(definition, 88), scaleMapWidth(definition, 70), scaleMapHeight(definition, 56));
  context.fillStyle = worldMapPalette.beach;
  context.fillRect(
    scaleMapWidth(definition, 18),
    scaleMapHeight(definition, 78),
    scaleMapWidth(definition, 76),
    scaleMapHeight(definition, 44),
  );
  context.fillStyle = worldMapPalette.scrub;
  context.fillRect(
    scaleMapWidth(definition, 58),
    scaleMapHeight(definition, 64),
    scaleMapWidth(definition, 58),
    scaleMapHeight(definition, 34),
  );
  context.fillStyle = worldMapPalette.landLight;
  context.fillRect(
    scaleMapWidth(definition, 88),
    scaleMapHeight(definition, 48),
    scaleMapWidth(definition, 54),
    scaleMapHeight(definition, 40),
  );
  context.fillStyle = worldMapPalette.forest;
  context.fillRect(
    scaleMapWidth(definition, 102),
    scaleMapHeight(definition, 36),
    scaleMapWidth(definition, 52),
    scaleMapHeight(definition, 40),
  );
  context.fillStyle = worldMapPalette.ridge;
  context.fillRect(
    scaleMapWidth(definition, 132),
    scaleMapHeight(definition, 24),
    scaleMapWidth(definition, 34),
    scaleMapHeight(definition, 28),
  );
  context.fillStyle = worldMapPalette.snowcap;
  context.fillRect(
    scaleMapWidth(definition, 150),
    scaleMapHeight(definition, 10),
    scaleMapWidth(definition, 28),
    scaleMapHeight(definition, 22),
  );

  for (const connection of definition.connections) {
    const route = buildRoutePoints(definition, [connection.from, connection.to]);
    drawPath(context, route.points);
  }

  for (const location of definition.locations) {
    drawSprite(context, sprites, location.spriteId, location.mapDoor.x, location.mapDoor.y);

    if (location.id === routeMarkerLocationId) {
      drawRouteMarker(context, location.node.x, location.node.y, frameCount);
    }

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
  const focusedLabel = focused.label.toUpperCase();
  context.fillText(focusedLabel, 14, definition.height - 24);
  const surveyLabel = formatBiomeSurveyStateLabel(focusedSurveyState);
  const secondaryTopLabel = originLabel ?? surveyLabel;
  if (secondaryTopLabel) {
    context.font = 'bold 7px Verdana, Geneva, sans-serif';
    const availableWidth = Math.max(
      36,
      definition.width - 18 - context.measureText(focusedLabel).width - 28,
    );
    const fittedLabel = fitTextToWidth(context, secondaryTopLabel, availableWidth);
    context.fillStyle = originLabel ? worldMapPalette.text : worldMapPalette.accent;
    context.fillText(
      fittedLabel,
      definition.width - 14 - context.measureText(fittedLabel).width,
      definition.height - 24,
    );
  }
  context.font = 'bold 7px Verdana, Geneva, sans-serif';
  context.fillStyle = routeReplayLabel ? worldMapPalette.accent : worldMapPalette.text;
  context.fillText(routeReplayLabel ?? focusedSummaryLabel ?? focused.summary, 14, definition.height - 14);
}
