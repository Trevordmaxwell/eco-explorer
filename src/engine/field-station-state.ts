import {
  resolveFieldAtlasState,
  resolveNextSeasonContinuityCopy,
  resolveFieldSeasonArchiveState,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
  type FieldAtlasState,
  type FieldSeasonBoardState,
  type FieldSeasonExpeditionState,
  type FieldSeasonWrapState,
} from './field-season-board';
import {
  resolveFieldStationSubtitle,
  resolveFieldSeasonWrapState,
} from './field-season-wrap';
import {
  resolveFieldStationHomecomingCopy,
  type FieldStationHomecomingCopy,
} from './field-station-homecoming-copy';
import type { FieldStationArrivalMode, FieldStationSelections } from './field-station-session';
import {
  getFieldUpgradeStates,
  getRecentFieldCreditSources,
  getSelectedFieldUpgradeId,
  getJumpSpeed,
  getWalkSpeed,
  type FieldCreditSource,
  type FieldUpgradeState,
} from './field-station';
import { resolveGuidedFieldSeasonState, type GuidedFieldSeasonState } from './guided-field-season';
import {
  getSelectedNurseryProjectId,
  resolveNurseryStateView,
  type NurseryCardId,
  type NurseryStateView,
} from './nursery';
import {
  getOutingSupportStationLabel,
  type OutingSupportStationLabel,
} from './outing-support';
import { resolveSelectedOutingSupportId } from './save';
import type {
  BiomeDefinition,
  FieldStationSeasonPage,
  FieldStationView,
  OutingSupportId,
  SaveState,
} from './types';

export type { FieldStationSelections } from './field-station-session';

export interface FieldStationStateOptions {
  arrivalMode?: FieldStationArrivalMode;
}

export interface FieldStationHomecomingState extends FieldStationHomecomingCopy {
  homecomingMilestoneRequestId: FieldStationHomecomingCopy['requestId'];
}

export interface FieldStationStateView {
  view: FieldStationView;
  seasonPage: FieldStationSeasonPage;
  subtitle: string;
  credits: number;
  selectedOutingSupportId: OutingSupportId;
  selectedOutingSupportLabel: OutingSupportStationLabel;
  outingSupportSelected: boolean;
  recentSources: FieldCreditSource[];
  upgrades: FieldUpgradeState[];
  selectedUpgradeId: string | null;
  walkSpeed: number;
  jumpSpeed: number;
  seasonNote: GuidedFieldSeasonState['stationNote'];
  seasonWrap: FieldSeasonWrapState;
  atlas: FieldAtlasState | null;
  routeBoard: FieldSeasonBoardState;
  expedition: FieldSeasonExpeditionState;
  selectedNurseryCardId: NurseryCardId;
  nursery: NurseryStateView;
  homecoming: FieldStationHomecomingState | null;
}

export function resolveFieldStationHomecomingState(
  save: Pick<SaveState, 'completedFieldRequestIds'>,
  arrivalMode: FieldStationArrivalMode,
): FieldStationHomecomingState | null {
  if (arrivalMode !== 'homecoming') {
    return null;
  }

  const copy = resolveFieldStationHomecomingCopy(save);
  return copy
    ? {
        ...copy,
        homecomingMilestoneRequestId: copy.requestId,
      }
    : null;
}

export function resolveFieldStationState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  selections: FieldStationSelections,
  options: FieldStationStateOptions = {},
): FieldStationStateView {
  const guidedFieldSeason = resolveGuidedFieldSeasonState(biomes, save);
  const routeBoard = resolveFieldSeasonBoardState(biomes, save);
  const expedition = resolveFieldSeasonExpeditionState(save);
  const atlas = resolveFieldAtlasState(save);
  const archive = resolveFieldSeasonArchiveState(save);
  const nextSeasonContinuity = resolveNextSeasonContinuityCopy(save);
  const selectedOutingSupportId = resolveSelectedOutingSupportId(save);
  const seasonWrap = resolveFieldSeasonWrapState(
    biomes,
    routeBoard,
    guidedFieldSeason.stationNote,
    atlas,
    archive,
    selectedOutingSupportId,
  );
  const subtitle = resolveFieldStationSubtitle(
    selections.selectedFieldStationView,
    selections.selectedFieldStationSeasonPage,
    seasonWrap,
    nextSeasonContinuity?.routesSubtitle ?? null,
  );
  const selectedUpgradeId = getSelectedFieldUpgradeId(save, selections.selectedFieldStationUpgradeId);
  const selectedProjectId = getSelectedNurseryProjectId(save, selections.selectedNurseryProjectId);
  const homecoming = resolveFieldStationHomecomingState(save, options.arrivalMode ?? 'default');

  return {
    view: selections.selectedFieldStationView,
    seasonPage: selections.selectedFieldStationSeasonPage,
    subtitle,
    credits: save.fieldCredits,
    selectedOutingSupportId,
    selectedOutingSupportLabel: getOutingSupportStationLabel(selectedOutingSupportId),
    outingSupportSelected: selections.outingSupportSelected,
    recentSources: getRecentFieldCreditSources(biomes, save),
    upgrades: getFieldUpgradeStates(save),
    selectedUpgradeId,
    walkSpeed: getWalkSpeed(save),
    jumpSpeed: getJumpSpeed(save),
    seasonNote: guidedFieldSeason.stationNote,
    seasonWrap,
    atlas,
    routeBoard,
    expedition,
    selectedNurseryCardId: selections.selectedNurseryCardId,
    nursery: resolveNurseryStateView(
      save,
      routeBoard,
      selectedProjectId,
      selections.selectedNurseryCardId,
    ),
    homecoming,
  };
}
