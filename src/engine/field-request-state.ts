import type { WorldMapDefinition } from '../content/world-map';
import { resolveFieldSeasonBoardState, resolveSeasonOutingLocator } from './field-season-board';
import { hasFieldUpgrade } from './field-station';
import {
  resolveActiveFieldRequest,
  type ActiveFieldRequest,
  type FieldRequestContext,
} from './field-requests';
import { resolveSelectedOutingSupportId } from './save';
import { getWorldMapLocationByBiomeId } from './world-map';
import type { BiomeDefinition, SaveState } from './types';

type FieldRequestSceneMode = 'biome' | 'world-map' | 'transition';
type FieldRequestOverlayMode =
  | 'playing'
  | 'menu'
  | 'journal'
  | 'field-station'
  | 'title'
  | 'close-look';

export interface FieldRequestRuntimeSnapshot {
  sceneMode: FieldRequestSceneMode;
  overlayMode: FieldRequestOverlayMode;
  sceneBiomeId: string;
  lastBiomeId: string;
  sceneZoneId: string | null;
  scenePlayerX: number;
  scenePlayerY: number;
  hasFieldRequestNotice: boolean;
  focusedWorldMapLocationId?: string | null;
}

export interface FieldRequestHintState {
  label: 'NOTEBOOK J';
  title: string;
  variant: 'default' | 'support-biased';
}

export interface ActiveOutingState {
  title: string;
  summary: string;
  progressLabel: string;
  targetBiomeId: string;
  worldMapLabel: string;
}

export interface FieldRequestStateView {
  context: FieldRequestContext;
  activeFieldRequest: ActiveFieldRequest | null;
  activeOuting: ActiveOutingState | null;
  journalFieldRequest: ActiveFieldRequest | null;
  fieldRequestHint: FieldRequestHintState | null;
  routeMarkerLocationId: string | null;
  routeReplayLabel: string | null;
}

export function createFieldRequestContext(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  snapshot: FieldRequestRuntimeSnapshot,
): FieldRequestContext {
  return {
    biomes,
    save,
    currentBiomeId: snapshot.sceneMode === 'biome' ? snapshot.sceneBiomeId : snapshot.lastBiomeId,
    currentZoneId: snapshot.sceneMode === 'biome' ? snapshot.sceneZoneId : null,
    currentPlayerX: snapshot.sceneMode === 'biome' ? snapshot.scenePlayerX : null,
    currentPlayerY: snapshot.sceneMode === 'biome' ? snapshot.scenePlayerY : null,
  };
}

function resolveActiveOuting(
  save: SaveState,
  activeFieldRequest: ActiveFieldRequest | null,
): ActiveOutingState | null {
  if (activeFieldRequest) {
    return {
      title: activeFieldRequest.title,
      summary: activeFieldRequest.summary,
      progressLabel: activeFieldRequest.progressLabel,
      targetBiomeId: activeFieldRequest.biomeId,
      worldMapLabel: `Today: ${activeFieldRequest.title}`,
    };
  }

  return resolveSeasonOutingLocator(save);
}

function resolveJournalFieldRequest(
  biomes: Record<string, BiomeDefinition>,
  activeFieldRequest: ActiveFieldRequest | null,
  activeOuting: ActiveOutingState | null,
): ActiveFieldRequest | null {
  if (activeFieldRequest) {
    return activeFieldRequest;
  }

  if (!activeOuting) {
    return null;
  }

  return {
    id: `route-locator:${activeOuting.targetBiomeId}`,
    biomeId: activeOuting.targetBiomeId,
    biomeName: biomes[activeOuting.targetBiomeId as keyof typeof biomes]?.name ?? activeOuting.targetBiomeId,
    title: activeOuting.title,
    summary: activeOuting.summary,
    progressLabel: activeOuting.progressLabel,
    routeV2: null,
  };
}

function resolveRouteMarkerLocationId(
  worldMap: WorldMapDefinition,
  save: SaveState,
  activeOuting: ActiveOutingState | null,
): string | null {
  if (!hasFieldUpgrade(save, 'route-marker')) {
    return null;
  }

  if (resolveSelectedOutingSupportId(save) !== 'route-marker') {
    return null;
  }

  if (!activeOuting) {
    return null;
  }

  return getWorldMapLocationByBiomeId(worldMap, activeOuting.targetBiomeId).id;
}

function resolveRouteReplayLabel(
  biomes: Record<string, BiomeDefinition>,
  worldMap: WorldMapDefinition,
  save: SaveState,
  activeOuting: ActiveOutingState | null,
  focusedWorldMapLocationId: string | null | undefined,
): string | null {
  if (!focusedWorldMapLocationId) {
    return null;
  }

  const routeBoard = resolveFieldSeasonBoardState(biomes, save);
  if (routeBoard.replayNote && routeBoard.targetBiomeId) {
    const replayLocationId = getWorldMapLocationByBiomeId(worldMap, routeBoard.targetBiomeId).id;
    if (replayLocationId === focusedWorldMapLocationId) {
      return `Today: ${routeBoard.replayNote.title}`;
    }
  }

  if (!activeOuting) {
    return null;
  }

  const outingLocationId = getWorldMapLocationByBiomeId(worldMap, activeOuting.targetBiomeId).id;
  return outingLocationId === focusedWorldMapLocationId ? activeOuting.worldMapLabel : null;
}

export function resolveFieldRequestState(
  biomes: Record<string, BiomeDefinition>,
  worldMap: WorldMapDefinition,
  save: SaveState,
  snapshot: FieldRequestRuntimeSnapshot,
): FieldRequestStateView {
  const context = createFieldRequestContext(biomes, save, snapshot);
  const activeFieldRequest = resolveActiveFieldRequest(context);
  const activeOuting = resolveActiveOuting(save, activeFieldRequest);

  return {
    context,
    activeFieldRequest,
    activeOuting,
    journalFieldRequest: resolveJournalFieldRequest(biomes, activeFieldRequest, activeOuting),
    fieldRequestHint:
      snapshot.overlayMode === 'playing'
      && snapshot.sceneMode === 'biome'
      && !snapshot.hasFieldRequestNotice
      && activeFieldRequest
        ? {
            label: 'NOTEBOOK J',
            title: activeFieldRequest.title,
            variant: 'default',
          }
        : null,
    routeMarkerLocationId: resolveRouteMarkerLocationId(worldMap, save, activeOuting),
    routeReplayLabel: resolveRouteReplayLabel(
      biomes,
      worldMap,
      save,
      activeOuting,
      snapshot.focusedWorldMapLocationId,
    ),
  };
}
