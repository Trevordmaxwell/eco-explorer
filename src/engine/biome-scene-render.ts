import type { DoorAnchor } from '../content/world-map';
import { masterPalette } from '../assets/palette';
import { getCorridorVisuals, type CorridorVisualSpec } from './corridor';
import type { DoorTransitionSnapshot } from './door-transition';
import { sampleTerrainY } from './generation';
import { resolveHabitatProcessMomentForEntity } from './habitat-process';
import { getPhenologyAccentMap, getPhenologyPhaseProfile } from './phenology';
import { drawClimbHint, drawInteractMarker } from './pixel-ui';
import { drawSprite, type SpriteRegistry } from './sprites';
import type {
  BiomeDefinition,
  BiomeInstance,
  Climbable,
  DepthFeature,
  Facing,
  DayPart,
  HabitatProcessStyle,
  PhenologyEntryAccent,
  WeatherProfile,
} from './types';
import type { WorldState } from './world-state';

interface PlayerRenderState {
  x: number;
  y: number;
  facing: Facing;
  animationFrame: number;
  climbing: boolean;
}

interface BiomeSceneRenderOptions {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  sprites: SpriteRegistry;
  biomeDefinition: BiomeDefinition;
  biomeInstance: BiomeInstance;
  doors: Array<{ anchor: DoorAnchor; openAmount: number; highlighted: boolean }>;
  cameraX: number;
  cameraY: number;
  frameCount: number;
  nearestEntityId: string | null;
  player: PlayerRenderState;
  playerHeight: number;
  worldState: WorldState;
  transitionSnapshot?: DoorTransitionSnapshot | null;
}

interface DayPartSceneProfile {
  skyTop?: string;
  skyBottom?: string;
  cloud?: string;
  parallaxColors?: string[];
  fillTop?: string;
  fillBottom?: string;
  foam?: string;
  lineHighlight?: string;
  sunOuter?: string;
  sunInner?: string;
  sunY?: number;
}

type WeatherParticleMode = 'none' | 'mist-drip' | 'ridge-wind' | 'light-flurry';

interface WeatherSceneProfile {
  cloud?: string;
  cloudParallaxSpeed?: number;
  cloudFrameDrift?: number;
  skyWashTop?: string;
  skyWashBottom?: string;
  horizonWash?: string;
  particleMode: WeatherParticleMode;
  particleColor?: string;
}

const DAY_PART_SCENE_PROFILES: Record<string, Partial<Record<DayPart, DayPartSceneProfile>>> = {
  beach: {
    dawn: {
      skyTop: '#f6c8ac',
      skyBottom: '#ffe6ca',
      cloud: '#fff3e2',
      parallaxColors: ['#efd0a4', '#79bccd'],
      fillTop: '#5ba9bb',
      fillBottom: '#2e6d89',
      foam: '#f4fbff',
      sunOuter: '#ffd07b',
      sunInner: '#fff3c4',
      sunY: 16,
    },
    dusk: {
      skyTop: '#c79cc3',
      skyBottom: '#efc19f',
      cloud: '#f8ece0',
      parallaxColors: ['#ddb987', '#5b99ae'],
      fillTop: '#4d8ea1',
      fillBottom: '#27586d',
      foam: '#ebf7ff',
      sunOuter: '#f0aa6f',
      sunInner: '#ffd2a4',
      sunY: 20,
    },
  },
  'coastal-scrub': {
    dawn: {
      skyTop: '#cadbda',
      skyBottom: '#f3e5d1',
      cloud: '#f3f0e6',
      parallaxColors: ['#c9bb95', '#8a9c73'],
      fillTop: '#80a9a8',
      fillBottom: '#587f82',
      foam: '#eff6f0',
      lineHighlight: 'rgba(233, 240, 226, 0.42)',
    },
    dusk: {
      skyTop: '#b8a8bb',
      skyBottom: '#e7cfca',
      cloud: '#efe7de',
      parallaxColors: ['#b5a985', '#6f8060'],
      fillTop: '#648e92',
      fillBottom: '#446b70',
      foam: '#e7f0ea',
      lineHighlight: 'rgba(219, 225, 211, 0.38)',
    },
  },
  forest: {
    dawn: {
      skyTop: '#d5ddd1',
      skyBottom: '#f2e8d9',
      cloud: '#eef0e8',
      parallaxColors: ['#9eaf93', '#66845f'],
      fillTop: '#86a188',
      fillBottom: '#617d65',
      foam: '#e6efe2',
      lineHighlight: 'rgba(226, 235, 220, 0.42)',
    },
    dusk: {
      skyTop: '#c7bcaf',
      skyBottom: '#dfe2d2',
      cloud: '#ece9df',
      parallaxColors: ['#89967a', '#4f6a4f'],
      fillTop: '#748d76',
      fillBottom: '#55705b',
      foam: '#dce8dc',
      lineHighlight: 'rgba(214, 222, 208, 0.38)',
    },
  },
  treeline: {
    dawn: {
      skyTop: '#e1d2dc',
      skyBottom: '#f4edf2',
      cloud: '#f2f1ef',
      parallaxColors: ['#d7d7d0', '#98a19d'],
      fillTop: '#acb8bf',
      fillBottom: '#79848a',
      foam: '#eef3f5',
      lineHighlight: 'rgba(228, 235, 236, 0.42)',
    },
    dusk: {
      skyTop: '#c3bfd7',
      skyBottom: '#ebe6f2',
      cloud: '#efedf0',
      parallaxColors: ['#b3b8ba', '#707977'],
      fillTop: '#99a6ad',
      fillBottom: '#697278',
      foam: '#e7eef2',
      lineHighlight: 'rgba(218, 224, 227, 0.38)',
    },
  },
  tundra: {
    dawn: {
      skyTop: '#efd7d2',
      skyBottom: '#eef7ff',
      cloud: '#f7f7f3',
      parallaxColors: ['#deebf2', '#a5bfce'],
      fillTop: '#97c1d2',
      fillBottom: '#62859c',
      foam: '#eef7fb',
      lineHighlight: 'rgba(231, 241, 245, 0.42)',
    },
    dusk: {
      skyTop: '#c7cae1',
      skyBottom: '#eef1ff',
      cloud: '#f0f0f3',
      parallaxColors: ['#c8d8e2', '#8ea9bb'],
      fillTop: '#80a8bc',
      fillBottom: '#58798f',
      foam: '#e8f2f7',
      lineHighlight: 'rgba(220, 229, 236, 0.38)',
    },
  },
};

const WEATHER_SCENE_PROFILES: Record<WeatherProfile, WeatherSceneProfile> = {
  clear: {
    cloudParallaxSpeed: 0.15,
    cloudFrameDrift: 0,
    particleMode: 'none',
  },
  'marine-haze': {
    cloud: '#eef2eb',
    cloudParallaxSpeed: 0.12,
    cloudFrameDrift: 0.03,
    skyWashTop: 'rgba(233, 239, 235, 0.10)',
    skyWashBottom: 'rgba(245, 244, 236, 0.24)',
    horizonWash: 'rgba(240, 243, 239, 0.24)',
    particleMode: 'none',
  },
  'mist-drip': {
    cloud: '#eef2ea',
    cloudParallaxSpeed: 0.11,
    cloudFrameDrift: 0.02,
    skyWashTop: 'rgba(224, 236, 226, 0.16)',
    skyWashBottom: 'rgba(235, 242, 236, 0.12)',
    horizonWash: 'rgba(228, 236, 229, 0.18)',
    particleMode: 'mist-drip',
    particleColor: 'rgba(239, 244, 240, 0.80)',
  },
  'ridge-wind': {
    cloud: '#f2f4f6',
    cloudParallaxSpeed: 0.24,
    cloudFrameDrift: 0.12,
    skyWashTop: 'rgba(241, 246, 249, 0.08)',
    skyWashBottom: 'rgba(233, 240, 246, 0.10)',
    horizonWash: 'rgba(235, 241, 246, 0.12)',
    particleMode: 'ridge-wind',
    particleColor: 'rgba(244, 247, 251, 0.72)',
  },
  'light-flurry': {
    cloud: '#f8fafc',
    cloudParallaxSpeed: 0.16,
    cloudFrameDrift: 0.05,
    skyWashTop: 'rgba(244, 248, 251, 0.18)',
    skyWashBottom: 'rgba(236, 243, 248, 0.22)',
    horizonWash: 'rgba(244, 248, 250, 0.16)',
    particleMode: 'light-flurry',
    particleColor: 'rgba(250, 252, 255, 0.86)',
  },
};

function getDayPartSceneProfile(
  biomeDefinition: BiomeDefinition,
  dayPart: DayPart,
): Required<DayPartSceneProfile> {
  const defaults: Required<DayPartSceneProfile> = {
    skyTop: biomeDefinition.palette.skyTop,
    skyBottom: biomeDefinition.palette.skyBottom,
    cloud: biomeDefinition.palette.foam,
    parallaxColors: biomeDefinition.parallaxLayers.map((layer) => layer.color),
    fillTop: biomeDefinition.palette.seaTop,
    fillBottom: biomeDefinition.palette.seaBottom,
    foam: biomeDefinition.palette.foam,
    lineHighlight: 'rgba(220, 235, 216, 0.45)',
    sunOuter: '#ffd65c',
    sunInner: '#fff5b6',
    sunY: 12,
  };

  const overrides = DAY_PART_SCENE_PROFILES[biomeDefinition.id]?.[dayPart];
  return {
    ...defaults,
    ...overrides,
    parallaxColors: overrides?.parallaxColors ?? defaults.parallaxColors,
  };
}

function drawCloud(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  foamColor: string,
): void {
  context.fillStyle = foamColor;
  context.fillRect(x + 2, y, width - 4, 4);
  context.fillRect(x, y + 2, width, 4);
  context.fillRect(x + 6, y - 2, width - 12, 4);
}

function drawWeatherWash(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  profile: WeatherSceneProfile,
): void {
  if (profile.skyWashTop || profile.skyWashBottom) {
    const overlay = context.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, profile.skyWashTop ?? 'rgba(0, 0, 0, 0)');
    overlay.addColorStop(1, profile.skyWashBottom ?? 'rgba(0, 0, 0, 0)');
    context.fillStyle = overlay;
    context.fillRect(0, 0, width, height);
  }

  if (profile.horizonWash) {
    context.fillStyle = profile.horizonWash;
    context.fillRect(0, 42, width, 36);
  }
}

function drawPhenologyWash(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  profile: ReturnType<typeof getPhenologyPhaseProfile>,
): void {
  if (profile.skyWashTop || profile.skyWashBottom) {
    const overlay = context.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, profile.skyWashTop ?? 'rgba(0, 0, 0, 0)');
    overlay.addColorStop(1, profile.skyWashBottom ?? 'rgba(0, 0, 0, 0)');
    context.fillStyle = overlay;
    context.fillRect(0, 0, width, height);
  }

  if (profile.groundWash) {
    context.fillStyle = profile.groundWash;
    context.fillRect(0, 78, width, height - 78);
  }
}

function drawWeatherParticle(
  context: CanvasRenderingContext2D,
  profile: WeatherSceneProfile,
  screenX: number,
  y: number,
  frameCount: number,
  phase: number,
): void {
  if (!profile.particleColor || profile.particleMode === 'none') {
    return;
  }

  const pulse = Math.sin(frameCount / 12 + phase);
  context.fillStyle = profile.particleColor;

  switch (profile.particleMode) {
    case 'mist-drip':
      if (pulse > 0.08) {
        context.fillRect(screenX, y - 1, 1, 4);
      }
      if (pulse > 0.52) {
        context.fillRect(screenX - 1, y + 2, 3, 1);
      }
      break;
    case 'ridge-wind': {
      if (pulse < -0.25) {
        break;
      }
      const offset = Math.round(Math.sin(frameCount / 18 + phase) * 5);
      context.fillRect(screenX - 2 + offset, y, 5, 1);
      context.fillRect(screenX + offset, y + 1, 2, 1);
      break;
    }
    case 'light-flurry': {
      if (pulse < -0.18) {
        break;
      }
      const drift = ((frameCount + Math.floor(phase * 11)) % 7) - 3;
      const flakeX = screenX + Math.round(drift / 2);
      const flakeY = y + ((frameCount + Math.floor(phase * 7)) % 3) - 1;
      context.fillRect(flakeX, flakeY, 1, 1);
      if (pulse > 0.42) {
        context.fillRect(flakeX + 1, flakeY + 1, 1, 1);
      }
      break;
    }
  }
}

function drawPhenologyAccent(
  context: CanvasRenderingContext2D,
  accent: PhenologyEntryAccent,
  screenX: number,
  y: number,
  width: number,
  height: number,
): void {
  const centerX = Math.round(screenX + width / 2);
  const topY = Math.round(y + 1);
  const middleY = Math.round(y + Math.max(2, height / 2));
  const lowerY = Math.round(y + Math.max(4, height - 4));

  context.fillStyle = accent.primaryColor;

  switch (accent.style) {
    case 'bloom':
      context.fillRect(centerX, topY, 1, 1);
      context.fillRect(centerX - 2, topY + 1, 1, 1);
      context.fillRect(centerX + 2, topY + 1, 1, 1);
      context.fillStyle = accent.secondaryColor ?? accent.primaryColor;
      context.fillRect(centerX - 1, topY + 1, 1, 1);
      context.fillRect(centerX + 1, topY + 1, 1, 1);
      break;
    case 'berry':
      context.fillRect(centerX - 2, middleY, 1, 1);
      context.fillRect(centerX + 1, middleY + 1, 1, 1);
      if (accent.secondaryColor) {
        context.fillStyle = accent.secondaryColor;
        context.fillRect(centerX - 1, middleY, 1, 1);
      }
      break;
    case 'seed':
      context.fillRect(centerX - 2, topY, 1, 2);
      context.fillRect(centerX, topY - 1, 1, 2);
      context.fillRect(centerX + 2, topY, 1, 2);
      if (accent.secondaryColor) {
        context.fillStyle = accent.secondaryColor;
        context.fillRect(centerX - 1, topY + 1, 1, 1);
        context.fillRect(centerX + 1, topY + 1, 1, 1);
      }
      break;
    case 'cone':
      context.fillRect(centerX, middleY - 1, 1, 3);
      if (accent.secondaryColor) {
        context.fillStyle = accent.secondaryColor;
        context.fillRect(centerX - 1, middleY, 1, 1);
        context.fillRect(centerX + 1, middleY + 1, 1, 1);
      }
      break;
    case 'tuft':
      context.fillRect(centerX - 2, topY, 2, 1);
      context.fillRect(centerX + 1, topY, 2, 1);
      if (accent.secondaryColor) {
        context.fillStyle = accent.secondaryColor;
        context.fillRect(centerX - 1, topY + 1, 3, 1);
      }
      break;
    case 'frost':
      context.fillRect(screenX + 1, topY, Math.max(2, width - 2), 1);
      if (accent.secondaryColor) {
        context.fillStyle = accent.secondaryColor;
        context.fillRect(screenX, topY + 1, 1, 1);
        context.fillRect(screenX + width - 1, topY + 1, 1, 1);
        context.fillRect(centerX, lowerY, 1, 1);
      }
      break;
  }
}

function drawSandDriftProcessMoment(
  context: CanvasRenderingContext2D,
  screenX: number,
  y: number,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor?: string,
): void {
  const baseY = Math.round(y + height - 1);
  context.fillStyle = primaryColor;
  context.fillRect(screenX - 2, baseY, width + 4, 2);
  context.fillRect(screenX, baseY - 1, Math.max(3, width), 1);
  context.fillRect(screenX + 1, baseY - 2, Math.max(2, width - 2), 1);
  if (secondaryColor) {
    context.fillStyle = secondaryColor;
    context.fillRect(
      screenX + Math.max(1, Math.floor(width / 3)),
      baseY - 2,
      Math.max(2, Math.floor(width / 3)),
      1,
    );
  }
}

function drawMoistureHoldProcessMoment(
  context: CanvasRenderingContext2D,
  screenX: number,
  y: number,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor?: string,
): void {
  const baseY = Math.round(y + height - 1);
  context.fillStyle = primaryColor;
  context.fillRect(screenX - 1, baseY - 1, width + 2, 3);
  context.fillRect(screenX, baseY - 2, Math.max(3, width), 1);
  if (secondaryColor) {
    context.fillStyle = secondaryColor;
    context.fillRect(screenX + 1, baseY - 2, 2, 1);
    context.fillRect(screenX + Math.max(2, Math.floor(width / 2)), baseY - 3, 1, 1);
    context.fillRect(screenX + Math.max(2, width - 2), baseY - 2, 1, 1);
  }
}

function drawFrostRimeProcessMoment(
  context: CanvasRenderingContext2D,
  screenX: number,
  y: number,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor?: string,
): void {
  const topY = Math.round(y + 1);
  const baseY = Math.round(y + height - 1);
  context.fillStyle = primaryColor;
  context.fillRect(screenX, topY, Math.max(2, width), 1);
  context.fillRect(screenX - 1, topY + 1, 1, 1);
  context.fillRect(screenX + width, topY + 1, 1, 1);
  context.fillRect(screenX - 1, baseY, width + 2, 1);
  if (secondaryColor) {
    context.fillStyle = secondaryColor;
    context.fillRect(screenX + 1, topY + 1, Math.max(1, width - 2), 1);
    context.fillRect(screenX + Math.floor(width / 2), baseY - 1, 1, 1);
  }
}

function drawThawFringeProcessMoment(
  context: CanvasRenderingContext2D,
  screenX: number,
  y: number,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor?: string,
): void {
  const baseY = Math.round(y + height - 1);
  context.fillStyle = primaryColor;
  context.fillRect(screenX - 1, baseY - 1, width + 2, 2);
  context.fillRect(screenX, baseY - 2, Math.max(2, width - 1), 1);
  if (secondaryColor) {
    context.fillStyle = secondaryColor;
    context.fillRect(screenX, baseY - 1, 1, 1);
    context.fillRect(screenX + Math.max(2, Math.floor(width / 2)), baseY - 2, 1, 1);
    context.fillRect(screenX + width - 1, baseY - 1, 1, 1);
  }
}

function drawHabitatProcessMoment(
  context: CanvasRenderingContext2D,
  style: HabitatProcessStyle,
  screenX: number,
  y: number,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor?: string,
): void {
  switch (style) {
    case 'sand-drift':
      drawSandDriftProcessMoment(context, screenX, y, width, height, primaryColor, secondaryColor);
      break;
    case 'moisture-hold':
      drawMoistureHoldProcessMoment(context, screenX, y, width, height, primaryColor, secondaryColor);
      break;
    case 'frost-rime':
      drawFrostRimeProcessMoment(context, screenX, y, width, height, primaryColor, secondaryColor);
      break;
    case 'thaw-fringe':
      drawThawFringeProcessMoment(context, screenX, y, width, height, primaryColor, secondaryColor);
      break;
  }
}

function drawPlayerAt(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  cameraX: number,
  cameraY: number,
  playerHeight: number,
  topLeftX: number,
  topLeftY: number,
  facing: Facing,
  animationFrame: number,
): void {
  context.fillStyle = 'rgba(32, 25, 20, 0.18)';
  context.fillRect(topLeftX - cameraX + 2, topLeftY - cameraY + playerHeight, 7, 2);
  drawSprite(
    context,
    sprites,
    'player',
    topLeftX - cameraX,
    topLeftY - cameraY - 2,
    animationFrame,
    facing === 'left',
  );
}

function getCorridorTileIds(
  visuals: CorridorVisualSpec,
  worldX: number,
): { surfaceTile: string; fillTile: string } {
  if (worldX < visuals.blendStartX) {
    return {
      surfaceTile: visuals.leftSurfaceTile,
      fillTile: visuals.leftFillTile,
    };
  }

  if (worldX > visuals.blendEndX) {
    return {
      surfaceTile: visuals.rightSurfaceTile,
      fillTile: visuals.rightFillTile,
    };
  }

  const blendBandIndex = Math.floor((worldX - visuals.blendStartX) / 16);
  const midpoint = (visuals.blendStartX + visuals.blendEndX) / 2;
  const leaningRight = worldX >= midpoint;
  const useRightTile = leaningRight ? blendBandIndex % 3 !== 0 : blendBandIndex % 3 === 0;
  return useRightTile
    ? { surfaceTile: visuals.rightSurfaceTile, fillTile: visuals.rightFillTile }
    : { surfaceTile: visuals.leftSurfaceTile, fillTile: visuals.leftFillTile };
}

function drawCoastalCorridorBackdrop(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  frameCount: number,
  fillTop: string,
  fillBottom: string,
  lineHighlight: string,
): void {
  const horizon = context.createLinearGradient(0, 0, width, 0);
  horizon.addColorStop(0, 'rgba(240, 218, 170, 0.92)');
  horizon.addColorStop(0.48, 'rgba(220, 203, 153, 0.92)');
  horizon.addColorStop(1, 'rgba(134, 159, 112, 0.88)');
  context.fillStyle = horizon;
  context.fillRect(0, 80, width, height - 80);

  context.fillStyle = fillBottom;
  for (let x = 0; x < width; x += 12) {
    const duneLift = Math.round(Math.sin((x + frameCount) / 22) * 2);
    const heightLift = x > 140 ? 10 : x > 96 ? 7 : 4;
    context.fillRect(x, 74 - duneLift, 7, 12 + heightLift);
  }

  context.fillStyle = fillTop;
  for (let x = 0; x < width; x += 16) {
    const ridgeHeight = x > 150 ? 10 : x > 110 ? 7 : 4;
    const ridgeY = 88 - ridgeHeight + (((x + frameCount) % 18) < 9 ? 0 : 1);
    context.fillRect(x, ridgeY, 10, ridgeHeight);
  }

  context.fillStyle = lineHighlight;
  for (let x = 0; x < width; x += 14) {
    context.fillRect(x, 91 + (((x + frameCount) % 16) < 8 ? 0 : 1), 8, 1);
  }
}

function drawDepthFeature(
  context: CanvasRenderingContext2D,
  feature: DepthFeature,
  cameraX: number,
  cameraY: number,
  width: number,
  height: number,
): void {
  const screenX = feature.x - cameraX;
  const screenY = feature.y - cameraY;

  if (
    screenX > width + 24 ||
    screenX + feature.w < -24 ||
    screenY > height + 24 ||
    screenY + feature.h < -24
  ) {
    return;
  }

  switch (feature.style) {
    case 'root-chamber': {
      const backdrop = context.createLinearGradient(0, screenY, 0, screenY + feature.h);
      backdrop.addColorStop(0, 'rgba(30, 22, 16, 0.12)');
      backdrop.addColorStop(0.58, 'rgba(28, 20, 15, 0.30)');
      backdrop.addColorStop(1, 'rgba(16, 12, 10, 0.18)');
      context.fillStyle = backdrop;
      context.fillRect(screenX, screenY, feature.w, feature.h);

      const chamberInsetX = screenX + 10;
      const chamberInsetY = screenY + Math.round(feature.h * 0.28);
      const chamberWidth = Math.max(24, feature.w - 20);
      const chamberHeight = Math.max(18, feature.h - Math.round(feature.h * 0.42));
      const chamberBackdrop = context.createLinearGradient(0, chamberInsetY, 0, chamberInsetY + chamberHeight);
      chamberBackdrop.addColorStop(0, 'rgba(20, 15, 12, 0.20)');
      chamberBackdrop.addColorStop(0.65, 'rgba(14, 10, 9, 0.34)');
      chamberBackdrop.addColorStop(1, 'rgba(10, 8, 7, 0.18)');
      context.fillStyle = chamberBackdrop;
      context.fillRect(chamberInsetX, chamberInsetY, chamberWidth, chamberHeight);

      for (let worldX = feature.x; worldX < feature.x + feature.w; worldX += 4) {
        const progress = (worldX - feature.x) / feature.w;
        const roofY = feature.y + 8 + Math.round(Math.sin(progress * Math.PI) * Math.min(18, feature.h * 0.28));
        const roofScreenX = worldX - cameraX;
        const roofScreenY = roofY - cameraY;
        context.fillStyle = masterPalette.barkDark;
        context.fillRect(roofScreenX, roofScreenY, 4, 16);
        context.fillStyle = masterPalette.soilDark;
        context.fillRect(
          roofScreenX + (worldX % 8 === 0 ? 1 : 2),
          roofScreenY + 16,
          1,
          8 + Math.round(progress * 6),
        );
      }

      context.fillStyle = 'rgba(16, 12, 10, 0.24)';
      context.fillRect(chamberInsetX + 4, chamberInsetY + 10, chamberWidth - 8, Math.max(10, chamberHeight - 18));
      context.fillStyle = 'rgba(234, 240, 228, 0.10)';
      context.fillRect(chamberInsetX + 8, chamberInsetY + 10, Math.max(18, chamberWidth - 26), 1);
      break;
    }
    case 'stone-pocket': {
      const pocketBackdrop = context.createLinearGradient(0, screenY, 0, screenY + feature.h);
      pocketBackdrop.addColorStop(0, 'rgba(31, 33, 36, 0.14)');
      pocketBackdrop.addColorStop(1, 'rgba(16, 17, 20, 0.28)');
      context.fillStyle = pocketBackdrop;
      context.fillRect(screenX, screenY, feature.w, feature.h);
      context.fillStyle = 'rgba(101, 108, 114, 0.22)';
      context.fillRect(screenX, screenY, feature.w, 4);
      context.fillRect(screenX, screenY + feature.h - 6, feature.w, 6);
      context.fillStyle = 'rgba(210, 216, 222, 0.10)';
      for (let x = screenX + 4; x < screenX + feature.w - 4; x += 10) {
        context.fillRect(x, screenY + 4 + ((x - screenX) % 12 === 0 ? 1 : 0), 4, 1);
      }
      break;
    }
    case 'canopy-pocket':
      context.fillStyle = 'rgba(42, 70, 44, 0.18)';
      context.fillRect(screenX, screenY, feature.w, feature.h);
      context.fillStyle = 'rgba(98, 132, 94, 0.20)';
      for (let x = 0; x < feature.w; x += 12) {
        context.fillRect(screenX + x, screenY + ((x / 12) % 2 === 0 ? 4 : 7), 8, Math.max(10, feature.h - 10));
      }
      context.fillStyle = 'rgba(231, 242, 216, 0.10)';
      context.fillRect(screenX + 6, screenY + 8, Math.max(12, feature.w - 18), 2);
      break;
    case 'trunk-interior':
      context.fillStyle = 'rgba(44, 28, 18, 0.26)';
      context.fillRect(screenX, screenY, feature.w, feature.h);
      context.fillStyle = 'rgba(26, 18, 12, 0.22)';
      context.fillRect(screenX + 8, screenY + 6, Math.max(12, feature.w - 16), Math.max(14, feature.h - 10));
      context.fillStyle = masterPalette.barkDark;
      context.fillRect(screenX, screenY, 6, feature.h);
      context.fillRect(screenX + feature.w - 6, screenY, 6, feature.h);
      break;
  }
}

function drawClimbable(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  climbable: Climbable,
  cameraX: number,
  cameraY: number,
  width: number,
  height: number,
): void {
  const screenX = climbable.x - cameraX;
  const screenY = climbable.y - cameraY;

  if (
    screenX > width + 24 ||
    screenX + climbable.w < -24 ||
    screenY > height + 24 ||
    screenY + climbable.h < -24
  ) {
    return;
  }

  for (let x = 0; x < climbable.w; x += 8) {
    for (let y = climbable.y; y < climbable.y + climbable.h; y += 8) {
      drawSprite(context, sprites, climbable.spriteId, screenX + x, y - cameraY);
    }
  }

  if (climbable.canopySpriteId) {
    const canopyFrame = sprites[climbable.canopySpriteId]?.[0];
    const canopyWidth = canopyFrame?.width ?? 16;
    drawSprite(
      context,
      sprites,
      climbable.canopySpriteId,
      screenX + Math.round((climbable.w - canopyWidth) / 2),
      climbable.y - cameraY - 16,
    );
  }
}

function getClimbHintTarget(
  biomeInstance: BiomeInstance,
  player: PlayerRenderState,
): Climbable | null {
  if (player.climbing) {
    return null;
  }

  const centerX = player.x + 5;
  const playerTop = player.y;
  const playerBottom = player.y + 10;

  for (const climbable of biomeInstance.climbables) {
    if (centerX < climbable.x - 3 || centerX > climbable.x + climbable.w + 3) {
      continue;
    }

    if (playerBottom < climbable.y || playerTop > climbable.y + climbable.h) {
      continue;
    }

    return climbable;
  }

  return null;
}

export function drawBiomeScene({
  context,
  width,
  height,
  sprites,
  biomeDefinition,
  biomeInstance,
  doors,
  cameraX,
  cameraY,
  frameCount,
  nearestEntityId,
  player,
  playerHeight,
  worldState,
  transitionSnapshot = null,
}: BiomeSceneRenderOptions): void {
  const corridorVisuals = getCorridorVisuals(biomeDefinition.id);
  const dayPartProfile = getDayPartSceneProfile(biomeDefinition, worldState.dayPart);
  const weatherProfile = WEATHER_SCENE_PROFILES[worldState.weather];
  const phenologyProfile = getPhenologyPhaseProfile(biomeDefinition, worldState.phenologyPhase);
  const sceneParallaxColors = phenologyProfile.parallaxColors ?? dayPartProfile.parallaxColors;
  const phenologyAccentMap = getPhenologyAccentMap(biomeDefinition, worldState.phenologyPhase);
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, dayPartProfile.skyTop);
  gradient.addColorStop(1, dayPartProfile.skyBottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  drawWeatherWash(context, width, height, weatherProfile);
  drawPhenologyWash(context, width, height, phenologyProfile);

  for (const [index, layer] of biomeDefinition.parallaxLayers.entries()) {
    context.fillStyle = sceneParallaxColors[index] ?? layer.color;
    for (let screenX = 0; screenX < width; screenX += 2) {
      const worldX = screenX + cameraX * layer.speed;
      const wave = Math.sin(worldX / 26) * layer.amplitude;
      const y = layer.baseY + wave;
      context.fillRect(screenX, y, 2, height - y);
    }
  }

  biomeInstance.clouds.forEach((cloud) => {
    const screenX =
      cloud.x -
      cameraX * (weatherProfile.cloudParallaxSpeed ?? 0.15) -
      frameCount * (weatherProfile.cloudFrameDrift ?? 0);
    drawCloud(context, screenX, cloud.y, cloud.w, weatherProfile.cloud ?? dayPartProfile.cloud);
  });

  if (biomeDefinition.id === 'beach') {
    context.fillStyle = dayPartProfile.sunOuter;
    context.fillRect(width - 30, dayPartProfile.sunY, 10, 10);
    context.fillStyle = dayPartProfile.sunInner;
    context.fillRect(width - 28, dayPartProfile.sunY + 2, 6, 6);

    context.fillStyle = dayPartProfile.fillTop;
    context.fillRect(0, 92, width, 52);
    context.fillStyle = dayPartProfile.foam;
    for (let x = 0; x < width; x += 8) {
      context.fillRect(x, 94 + ((x + frameCount) % 16 === 0 ? 0 : 1), 6, 1);
    }
  } else if (corridorVisuals?.backdrop === 'coastal-dune') {
    drawCoastalCorridorBackdrop(
      context,
      width,
      height,
      frameCount,
      dayPartProfile.fillTop,
      dayPartProfile.fillBottom,
      dayPartProfile.lineHighlight,
    );
  } else {
    context.fillStyle = dayPartProfile.fillBottom;
    context.fillRect(0, 80, width, 64);
    context.fillStyle = dayPartProfile.fillTop;
    for (let x = 0; x < width; x += 14) {
      const spikeHeight = 18 + ((x + frameCount) % 21 < 10 ? 6 : 0);
      context.fillRect(x, 64 - (spikeHeight / 3), 6, spikeHeight);
    }
    context.fillStyle = dayPartProfile.lineHighlight;
    for (let x = 0; x < width; x += 18) {
      context.fillRect(x, 86 + ((x + frameCount) % 12 < 6 ? 0 : 1), 12, 1);
    }
  }

  for (const feature of biomeInstance.depthFeatures) {
    drawDepthFeature(context, feature, cameraX, cameraY, width, height);
  }

  for (let screenX = -8; screenX < width + 8; screenX += 8) {
    const worldX = screenX + cameraX;
    const surfaceY = Math.floor(sampleTerrainY(biomeInstance.terrainSamples, worldX + 4) / 8) * 8;
    const screenSurfaceY = surfaceY - cameraY;
    const { surfaceTile, fillTile } = corridorVisuals
      ? getCorridorTileIds(corridorVisuals, worldX + 4)
      : { surfaceTile: biomeDefinition.tileSet[0], fillTile: biomeDefinition.tileSet[1] };
    drawSprite(context, sprites, surfaceTile, screenX, screenSurfaceY);

    for (let fillY = screenSurfaceY + 8; fillY < height; fillY += 8) {
      drawSprite(context, sprites, fillTile, screenX, fillY);
    }
  }

  for (const sparkle of biomeInstance.sparkles) {
    const screenX = sparkle.x - cameraX;
    const screenY = sparkle.y - cameraY;
    if (screenX < 0 || screenX > width || screenY < -4 || screenY > height + 4) {
      continue;
    }

    if (weatherProfile.particleMode !== 'none') {
      drawWeatherParticle(context, weatherProfile, screenX, screenY, frameCount, sparkle.phase);
      continue;
    }

    const pulse = Math.sin(frameCount / 12 + sparkle.phase);
    if (pulse > 0.4) {
      context.fillStyle = dayPartProfile.foam;
      context.fillRect(screenX, screenY, 1, 3);
      context.fillRect(screenX - 1, screenY + 1, 3, 1);
    }
  }

  for (const climbable of biomeInstance.climbables) {
    drawClimbable(context, sprites, climbable, cameraX, cameraY, width, height);
  }

  for (const platform of biomeInstance.platforms) {
    const screenX = platform.x - cameraX;
    const screenY = platform.y - cameraY;
    for (let x = 0; x < platform.w; x += 8) {
      drawSprite(context, sprites, platform.spriteId, screenX + x, screenY);
    }
  }

  for (const door of doors) {
    const doorScreenX = door.anchor.x - cameraX;
    const doorScreenY = door.anchor.y - cameraY;
    if (doorScreenX < -16 || doorScreenX > width + 16 || doorScreenY < -20 || doorScreenY > height + 16) {
      continue;
    }

    drawSprite(context, sprites, door.anchor.spriteId, doorScreenX, doorScreenY);

    if (door.openAmount > 0.05) {
      const gapWidth = Math.max(1, Math.round(door.openAmount * 3));
      const gapX =
        door.anchor.facing === 'right'
          ? doorScreenX + 2
          : doorScreenX + 6 - gapWidth;
      context.fillStyle = 'rgba(28, 22, 18, 0.55)';
      context.fillRect(gapX, doorScreenY + 2, gapWidth, 7);
      context.fillStyle = biomeDefinition.palette.foam;
      context.fillRect(gapX, doorScreenY + 3, gapWidth, 4);
    }

    if (door.highlighted) {
      drawInteractMarker(context, doorScreenX + 4, doorScreenY - 12, 4, width - 4);
    }
  }

  for (const entity of biomeInstance.entities) {
    if (entity.removed) {
      continue;
    }

    const screenX = entity.x - cameraX;
    const screenY = entity.y - cameraY;
    if (screenX < -24 || screenX > width + 24 || screenY < -24 || screenY > height + 24) {
      continue;
    }

    if (entity.castsShadow !== false) {
      context.fillStyle = 'rgba(32, 25, 20, 0.15)';
      context.fillRect(screenX, screenY + entity.h - 1, entity.w, 2);
    }
    const processMoment = resolveHabitatProcessMomentForEntity(
      biomeDefinition,
      biomeInstance.visitCount,
      worldState,
      entity.entryId,
      entity.x,
    );
    if (processMoment) {
      drawHabitatProcessMoment(
        context,
        processMoment.style,
        screenX,
        screenY,
        entity.w,
        entity.h,
        processMoment.primaryColor,
        processMoment.secondaryColor,
      );
    }
    const animated = entity.category === 'animal';
    const frameIndex = animated ? Math.floor(frameCount / 20) % 2 : 0;
    const accent = phenologyAccentMap.get(entity.entryId);
    const spriteId = accent?.spriteId ?? entity.spriteId;
    drawSprite(context, sprites, spriteId, screenX, screenY, frameIndex);
    if (accent) {
      drawPhenologyAccent(context, accent, screenX, screenY, entity.w, entity.h);
    }

    if (nearestEntityId === entity.entityId) {
      drawInteractMarker(context, screenX + entity.w / 2, Math.round(screenY - 12), 4, width - 4);
    }
  }

  const climbHintTarget = getClimbHintTarget(biomeInstance, player);

  if (transitionSnapshot?.avatar?.space === 'biome') {
    drawPlayerAt(
      context,
      sprites,
      cameraX,
      cameraY,
      playerHeight,
      Math.round(transitionSnapshot.avatar.x - 5),
      Math.round(transitionSnapshot.avatar.y - playerHeight),
      transitionSnapshot.avatar.facing,
      1 + (Math.floor(frameCount / 10) % 2) * 2,
    );
    return;
  }

  drawPlayerAt(
    context,
    sprites,
    cameraX,
    cameraY,
    playerHeight,
    player.x,
    player.y,
    player.facing,
    player.animationFrame,
  );

  if (climbHintTarget) {
    drawClimbHint(
      context,
      player.x - cameraX + 5,
      Math.round(player.y - cameraY - 12),
      4,
      width - 4,
    );
  }
}
