import type { WorldMapDefinition } from '../content/world-map';
import {
  resolveFieldRequestState,
  type FieldRequestHintState,
  type FieldRequestRuntimeSnapshot,
} from './field-request-state';
import {
  getHandLensNotebookFit,
  prefersHandLensActiveRouteEntry,
  type ActiveFieldRequest,
  type FieldRequestContext,
} from './field-requests';
import { resolveSelectedOutingSupportId } from './save';
import type { BiomeDefinition, OutingSupportId, SaveState } from './types';

export interface FieldRequestControllerState {
  context: FieldRequestContext;
  activeFieldRequest: ActiveFieldRequest | null;
  journalFieldRequest: ActiveFieldRequest | null;
  fieldRequestHint: FieldRequestHintState | null;
  routeMarkerLocationId: string | null;
  routeReplayLabel: string | null;
  handLensContext: FieldRequestContext | null;
}

export function resolveFieldRequestController(
  biomes: Record<string, BiomeDefinition>,
  worldMap: WorldMapDefinition,
  save: SaveState,
  snapshot: FieldRequestRuntimeSnapshot,
): FieldRequestControllerState {
  const fieldRequestState = resolveFieldRequestState(biomes, worldMap, save, snapshot);
  const selectedSupportId = resolveSelectedOutingSupportId(save);

  return {
    context: fieldRequestState.context,
    activeFieldRequest: fieldRequestState.activeFieldRequest,
    journalFieldRequest: fieldRequestState.journalFieldRequest,
    fieldRequestHint: fieldRequestState.fieldRequestHint,
    routeMarkerLocationId: fieldRequestState.routeMarkerLocationId,
    routeReplayLabel: fieldRequestState.routeReplayLabel,
    handLensContext: selectedSupportId === 'hand-lens' ? fieldRequestState.context : null,
  };
}

export function getHandLensNotebookFitForEntry(
  controller: FieldRequestControllerState,
  entryId: string,
  observedZoneId: string | null,
): string | null {
  if (!controller.handLensContext) {
    return null;
  }

  return getHandLensNotebookFit(controller.handLensContext, entryId, observedZoneId);
}

export function prefersHandLensActiveEntry(
  controller: FieldRequestControllerState,
  entryId: string,
  observedZoneId: string | null,
): boolean {
  if (!controller.handLensContext) {
    return false;
  }

  return prefersHandLensActiveRouteEntry(controller.handLensContext, entryId, observedZoneId);
}

export function getOutingSupportNoticeText(selectedSupportId: OutingSupportId): string {
  switch (selectedSupportId) {
    case 'route-marker':
      return 'Route Marker will guide this outing on the world map.';
    case 'place-tab':
      return 'Place Tab will keep one place-reading question on the season strip.';
    case 'note-tabs':
      return 'Note Tabs will keep the notebook aim on the season strip.';
    default:
      return 'Hand Lens will tag notebook-fit clues in inspect bubbles.';
  }
}
