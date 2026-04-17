import type { BiomeDefinition, SaveState } from './types';
import { syncFieldStationLedger, getSelectedFieldUpgradeId } from './field-station';
import { getSelectedNurseryProjectId, syncNurseryState } from './nursery';

export type FieldStationArrivalMode = 'default' | 'homecoming';

export interface FieldStationOpenState {
  selectedFieldStationUpgradeId: string | null;
  selectedNurseryProjectId: string | null;
  arrivalMode: FieldStationArrivalMode;
  persistNeeded: boolean;
}

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
