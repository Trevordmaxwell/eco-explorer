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

export interface InspectTargetCandidate {
  entityId: string;
  entryId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  removed: boolean;
}

export interface InspectTargetSelection<TCandidate extends InspectTargetCandidate> {
  nearestInspectable: TCandidate | null;
  nearestInspectableEntityId: string | null;
  supportBiasActive: boolean;
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

function formatActiveHandLensClue(notebookFit: string): string {
  return notebookFit.startsWith('Notebook fit: ')
    ? `LENS CLUE: ${notebookFit.slice('Notebook fit: '.length)}`
    : notebookFit;
}

export function getInspectBubbleResourceNote(
  controller: FieldRequestControllerState,
  entryId: string,
  observedZoneId: string | null,
  fallbackNote: string | null = null,
): string | null {
  const notebookFit = getHandLensNotebookFitForEntry(controller, entryId, observedZoneId);
  if (!notebookFit) {
    return fallbackNote;
  }

  return prefersHandLensActiveEntry(controller, entryId, observedZoneId)
    ? formatActiveHandLensClue(notebookFit)
    : notebookFit;
}

export function getFieldRequestHintState<TCandidate extends InspectTargetCandidate>(
  controller: FieldRequestControllerState,
  inspectTargetSelection: InspectTargetSelection<TCandidate> | null,
): FieldRequestHintState | null {
  if (inspectTargetSelection?.supportBiasActive) {
    return controller.fieldRequestHint
      ? { ...controller.fieldRequestHint, variant: 'support-biased' }
      : (
      controller.activeFieldRequest
        ? {
            label: 'NOTEBOOK J',
            title: controller.activeFieldRequest.title,
            variant: 'support-biased',
          }
        : null
    );
  }

  return controller.fieldRequestHint;
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

export function resolveInspectTargetSelection<TCandidate extends InspectTargetCandidate>(
  controller: FieldRequestControllerState,
  entities: TCandidate[],
  playerCenter: { x: number; y: number },
  inspectRange: number,
  getObservedZoneId: (entity: TCandidate) => string | null,
): InspectTargetSelection<TCandidate> {
  let nearest: TCandidate | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  let nearestNotebookFit: TCandidate | null = null;
  let nearestNotebookFitDistance = Number.POSITIVE_INFINITY;
  let nearestPreferredNotebookFit: TCandidate | null = null;
  let nearestPreferredNotebookFitDistance = Number.POSITIVE_INFINITY;

  for (const entity of entities) {
    if (entity.removed) {
      continue;
    }

    const distance = Math.hypot(
      playerCenter.x - (entity.x + entity.w / 2),
      playerCenter.y - (entity.y + entity.h / 2),
    );

    if (distance <= inspectRange && distance < nearestDistance) {
      nearest = entity;
      nearestDistance = distance;
    }

    if (!controller.handLensContext || distance > inspectRange) {
      continue;
    }

    const observedZoneId = getObservedZoneId(entity);
    const handLensNotebookFit = getHandLensNotebookFitForEntry(controller, entity.entryId, observedZoneId);
    if (!handLensNotebookFit) {
      continue;
    }

    if (
      prefersHandLensActiveEntry(controller, entity.entryId, observedZoneId)
      && distance < nearestPreferredNotebookFitDistance
    ) {
      nearestPreferredNotebookFit = entity;
      nearestPreferredNotebookFitDistance = distance;
      continue;
    }

    if (distance < nearestNotebookFitDistance) {
      nearestNotebookFit = entity;
      nearestNotebookFitDistance = distance;
    }
  }

  const nearestInspectable = nearestPreferredNotebookFit ?? nearestNotebookFit ?? nearest;
  return {
    nearestInspectable,
    nearestInspectableEntityId: nearestInspectable?.entityId ?? null,
    supportBiasActive: Boolean(
      nearestPreferredNotebookFit &&
      nearestInspectable &&
      nearestPreferredNotebookFit.entityId === nearestInspectable.entityId
    ),
  };
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
