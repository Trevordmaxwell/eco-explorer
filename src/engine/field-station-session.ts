import type { BiomeDefinition, SaveState } from './types';
import {
  getFieldUpgradeStates,
  getSelectedFieldUpgradeId,
  syncFieldStationLedger,
} from './field-station';
import {
  getSelectedNurseryProjectId,
  syncNurseryState,
  type NurseryCardId,
} from './nursery';
import type { FieldStationSeasonPage, FieldStationView } from './types';

export type FieldStationArrivalMode = 'default' | 'homecoming';
export type FieldStationSurface = 'season-routes' | 'season-expedition' | 'nursery';

export interface FieldStationOpenState {
  selectedFieldStationUpgradeId: string | null;
  selectedNurseryProjectId: string | null;
  arrivalMode: FieldStationArrivalMode;
  persistNeeded: boolean;
}

export interface FieldStationSelections {
  selectedFieldStationView: FieldStationView;
  selectedFieldStationSeasonPage: FieldStationSeasonPage;
  outingSupportSelected: boolean;
  selectedFieldStationUpgradeId: string | null;
  selectedNurseryCardId: NurseryCardId;
  selectedNurseryProjectId: string | null;
}

export type FieldStationPrimaryAction =
  | { kind: 'file-route-note'; requestId: string }
  | { kind: 'toggle-outing-support' }
  | { kind: 'purchase-upgrade'; upgradeId: string }
  | { kind: 'file-expedition-note'; requestId: string }
  | { kind: 'activate-expedition-card' }
  | { kind: 'activate-nursery-card' };

export function resolveFieldStationOpenState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  currentSelectedFieldStationUpgradeId: string | null,
  currentSelectedNurseryProjectId: string | null,
): FieldStationOpenState {
  const acknowledgedSeasonCloseReturn =
    save.seasonCloseReturnPending
    && save.completedFieldRequestIds.includes('forest-season-threads');
  if (acknowledgedSeasonCloseReturn) {
    save.seasonCloseReturnPending = false;
  }

  const claimedSources = syncFieldStationLedger(biomes, save);
  const nurseryChanged = syncNurseryState(save);
  const persistNeeded = claimedSources.length > 0 || nurseryChanged || acknowledgedSeasonCloseReturn;

  return {
    selectedFieldStationUpgradeId: getSelectedFieldUpgradeId(save, currentSelectedFieldStationUpgradeId),
    selectedNurseryProjectId: getSelectedNurseryProjectId(save, currentSelectedNurseryProjectId),
    arrivalMode: persistNeeded ? 'homecoming' : 'default',
    persistNeeded,
  };
}

export function getFieldStationArrivalPulseValue(
  overlayMode: 'field-station' | 'other',
  arrivalPulseTimer: number,
  duration: number,
): number {
  if (overlayMode !== 'field-station' || arrivalPulseTimer <= 0) {
    return 0;
  }

  return Math.min(1, arrivalPulseTimer / duration);
}

export function getFieldStationSurface(selections: FieldStationSelections): FieldStationSurface {
  if (selections.selectedFieldStationView === 'nursery') {
    return 'nursery';
  }

  return selections.selectedFieldStationSeasonPage === 'expedition'
    ? 'season-expedition'
    : 'season-routes';
}

export function normalizeFieldStationSelections(
  save: SaveState,
  selections: FieldStationSelections,
): FieldStationSelections {
  return {
    ...selections,
    selectedFieldStationUpgradeId: getSelectedFieldUpgradeId(
      save,
      selections.selectedFieldStationUpgradeId,
    ),
    selectedNurseryProjectId: getSelectedNurseryProjectId(
      save,
      selections.selectedNurseryProjectId,
    ),
  };
}

export function resolveFieldStationPrimaryAction(
  save: Pick<SaveState, 'routeV2Progress'>,
  selections: FieldStationSelections,
): FieldStationPrimaryAction | null {
  if (selections.selectedFieldStationView !== 'season') {
    return { kind: 'activate-nursery-card' };
  }

  const readyRouteRequestId =
    save.routeV2Progress?.status === 'ready-to-synthesize'
      ? save.routeV2Progress.requestId
      : null;

  if (selections.selectedFieldStationSeasonPage === 'routes') {
    if (readyRouteRequestId) {
      return { kind: 'file-route-note', requestId: readyRouteRequestId };
    }

    if (selections.outingSupportSelected) {
      return { kind: 'toggle-outing-support' };
    }

    return selections.selectedFieldStationUpgradeId
      ? { kind: 'purchase-upgrade', upgradeId: selections.selectedFieldStationUpgradeId }
      : null;
  }

  if (readyRouteRequestId?.startsWith('forest-expedition-')) {
    return { kind: 'file-expedition-note', requestId: readyRouteRequestId };
  }

  return { kind: 'activate-expedition-card' };
}

export function setFieldStationSurface(
  save: SaveState,
  selections: FieldStationSelections,
  surface: FieldStationSurface,
): FieldStationSelections {
  if (surface === 'nursery') {
    return {
      ...selections,
      selectedFieldStationView: 'nursery',
      selectedFieldStationSeasonPage: 'routes',
      outingSupportSelected: false,
      selectedNurseryProjectId: getSelectedNurseryProjectId(
        save,
        selections.selectedNurseryProjectId,
      ),
    };
  }

  const nextSelections: FieldStationSelections = {
    ...selections,
    selectedFieldStationView: 'season',
    selectedFieldStationSeasonPage: surface === 'season-expedition' ? 'expedition' : 'routes',
  };

  if (nextSelections.selectedFieldStationSeasonPage === 'routes') {
    return {
      ...nextSelections,
      outingSupportSelected: false,
      selectedFieldStationUpgradeId: getSelectedFieldUpgradeId(
        save,
        selections.selectedFieldStationUpgradeId,
      ),
    };
  }

  return nextSelections;
}

export function changeFieldStationSurface(
  save: SaveState,
  selections: FieldStationSelections,
  direction: number,
): FieldStationSelections {
  const order: FieldStationSurface[] = ['season-routes', 'season-expedition', 'nursery'];
  const currentSurface = getFieldStationSurface(selections);
  const currentIndex = order.indexOf(currentSurface);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = (safeIndex + direction + order.length) % order.length;
  return setFieldStationSurface(save, selections, order[nextIndex]);
}

export function changeFieldStationRouteSelection(
  save: SaveState,
  selections: FieldStationSelections,
  direction: number,
): FieldStationSelections {
  const upgrades = getFieldUpgradeStates(save);
  if (!upgrades.length) {
    return {
      ...selections,
      selectedFieldStationUpgradeId: null,
      outingSupportSelected: true,
    };
  }

  const currentUpgradeId = getSelectedFieldUpgradeId(
    save,
    selections.selectedFieldStationUpgradeId,
  );
  const currentIndex = selections.outingSupportSelected
    ? 0
    : Math.max(1, upgrades.findIndex((upgrade) => upgrade.id === currentUpgradeId) + 1);
  const nextIndex = (currentIndex + direction + upgrades.length + 1) % (upgrades.length + 1);

  if (nextIndex === 0) {
    return {
      ...selections,
      outingSupportSelected: true,
    };
  }

  return {
    ...selections,
    outingSupportSelected: false,
    selectedFieldStationUpgradeId: upgrades[nextIndex - 1].id,
  };
}

export function changeNurseryCardSelection(
  selections: FieldStationSelections,
  direction: number,
): FieldStationSelections {
  const order: NurseryCardId[] = ['bench', 'compost', 'bed'];
  const currentIndex = order.indexOf(selections.selectedNurseryCardId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = (safeIndex + direction + order.length) % order.length;
  return {
    ...selections,
    selectedNurseryCardId: order[nextIndex],
  };
}
