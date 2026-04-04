import {
  resolveFieldAtlasState,
  resolveNextSeasonContinuityCopy,
  resolveFieldSeasonArchiveState,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
  resolveFieldStationSubtitle,
  resolveFieldSeasonWrapState,
  type FieldAtlasState,
  type FieldSeasonBoardState,
  type FieldSeasonExpeditionState,
  type FieldSeasonWrapState,
} from './field-season-board';
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
import { resolveSelectedOutingSupportId } from './save';
import type {
  BiomeDefinition,
  FieldStationSeasonPage,
  FieldStationView,
  OutingSupportId,
  SaveState,
} from './types';

export interface FieldStationSelections {
  selectedFieldStationView: FieldStationView;
  selectedFieldStationSeasonPage: FieldStationSeasonPage;
  outingSupportSelected: boolean;
  selectedFieldStationUpgradeId: string | null;
  selectedNurseryCardId: NurseryCardId;
  selectedNurseryProjectId: string | null;
}

export interface FieldStationStateView {
  view: FieldStationView;
  seasonPage: FieldStationSeasonPage;
  subtitle: string;
  credits: number;
  selectedOutingSupportId: OutingSupportId;
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
}

export function resolveFieldStationState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  selections: FieldStationSelections,
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

  return {
    view: selections.selectedFieldStationView,
    seasonPage: selections.selectedFieldStationSeasonPage,
    subtitle,
    credits: save.fieldCredits,
    selectedOutingSupportId,
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
    nursery: resolveNurseryStateView(save, routeBoard, selectedProjectId),
  };
}
