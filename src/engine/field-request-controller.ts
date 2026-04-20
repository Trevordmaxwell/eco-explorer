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
  selectedSupportId: OutingSupportId;
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
  supportRetargetsInspect: boolean;
  supportPrefersActiveClue: boolean;
}

export interface InspectTargetProjection<TCandidate extends InspectTargetCandidate> {
  inspectTargetSelection: InspectTargetSelection<TCandidate> | null;
  fieldRequestHint: FieldRequestHintState | null;
  nearestInspectableEntityId: string | null;
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
    selectedSupportId,
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
  if (
    inspectTargetSelection?.supportRetargetsInspect ||
    inspectTargetSelection?.supportPrefersActiveClue
  ) {
    return controller.fieldRequestHint
      ? { ...controller.fieldRequestHint, variant: 'support-biased' }
      : controller.activeFieldRequest
        ? {
            label: 'NOTEBOOK J',
            title: controller.activeFieldRequest.title,
            variant: 'support-biased',
          }
        : null;
  }

  if (!controller.fieldRequestHint || !controller.activeFieldRequest?.routeV2) {
    return controller.fieldRequestHint;
  }

  if (controller.selectedSupportId === 'note-tabs') {
    return {
      ...controller.fieldRequestHint,
      title: controller.activeFieldRequest.progressLabel,
      variant: 'support-biased',
    };
  }

  if (controller.selectedSupportId === 'place-tab') {
    return {
      ...controller.fieldRequestHint,
      title: 'Place Question',
      variant: 'support-biased',
    };
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
    supportRetargetsInspect: Boolean(
      nearest &&
      nearestInspectable &&
      nearest.entityId !== nearestInspectable.entityId
    ),
    supportPrefersActiveClue: Boolean(
      nearestPreferredNotebookFit &&
      nearestInspectable &&
      nearestPreferredNotebookFit.entityId === nearestInspectable.entityId
    ),
  };
}

export function resolveInspectTargetProjection<TCandidate extends InspectTargetCandidate>(
  controller: FieldRequestControllerState,
  entities: TCandidate[],
  playerCenter: { x: number; y: number },
  inspectRange: number,
  getObservedZoneId: (entity: TCandidate) => string | null,
): InspectTargetProjection<TCandidate> {
  const inspectTargetSelection = resolveInspectTargetSelection(
    controller,
    entities,
    playerCenter,
    inspectRange,
    getObservedZoneId,
  );

  return {
    inspectTargetSelection,
    fieldRequestHint: getFieldRequestHintState(controller, inspectTargetSelection),
    nearestInspectableEntityId: inspectTargetSelection.nearestInspectableEntityId,
  };
}

export function getOutingSupportNoticeText(selectedSupportId: OutingSupportId): string {
  switch (selectedSupportId) {
    case 'route-marker':
      return 'Marks next map stop.';
    case 'place-tab':
      return 'Keeps one place question.';
    case 'note-tabs':
      return 'Keeps route aim visible.';
    default:
      return 'Highlights notebook clues.';
  }
}
