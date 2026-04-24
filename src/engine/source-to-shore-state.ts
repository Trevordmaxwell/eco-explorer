import { ecoWorldMap } from '../content/world-map';
import { biomeRegistry } from '../content/biomes';
import { hasResolvedFieldRequest } from './field-requests';
import { getActiveHabitatProcessMoments } from './habitat-process';
import type { SaveState } from './types';
import { buildWorldState } from './world-state';
import { getWorldMapLocationByBiomeId } from './world-map';

type SourceToShoreTargetBiomeId = 'treeline' | 'forest';

const HIGH_PASS_FILED_REQUEST_ID = 'treeline-high-pass';
export const SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID = 'source-to-shore-source-shelter' as const;
export const SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID = 'source-to-shore-forest-release' as const;
export const SOURCE_TO_SHORE_VERTICAL_SLICE_REQUEST_ID = SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID;

export type SourceToShoreBeat = 'source-shelter' | 'forest-release';
export type SourceToShorePhase = 'active' | 'ready-to-file' | 'filed';

export interface SourceToShoreState {
  beat: SourceToShoreBeat;
  requestId: typeof SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID | typeof SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID;
  title: 'Source Shelter' | 'Forest Release' | 'Rime Source' | 'Cool Release';
  phase: SourceToShorePhase;
  progressLabel: 'BETA' | 'NOTE' | 'FILED';
  targetBiomeId: SourceToShoreTargetBiomeId;
  routeBoardTargetBiomeId: SourceToShoreTargetBiomeId | null;
  worldMapLabel: string;
  summary: string;
  routeBoardSummary: string;
  routeBoardNextDirection: string;
  liveAtlasNote: string;
  archiveText: string;
  cardTitle: 'SOURCE SHELTER' | 'FOREST RELEASE' | 'RIME SOURCE' | 'COOL RELEASE';
  cardStatusLabel: 'BETA' | 'NOTE READY' | 'FILED';
  cardSummary: string;
  cardDetailLabel: 'STARTS' | 'FILE' | 'FILED';
  cardStartText: string;
  cardNote: string;
  cardNoticeText: string | null;
  isActiveOuting: boolean;
}

export function resolveSourceToShoreState(save: SaveState): SourceToShoreState | null {
  if (!hasResolvedFieldRequest(save, HIGH_PASS_FILED_REQUEST_ID)) {
    return null;
  }

  if (hasResolvedFieldRequest(save, SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID)) {
    return resolveForestReleaseState('filed', save);
  }

  if (
    save.routeV2Progress?.requestId === SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID
    && save.routeV2Progress.status === 'ready-to-synthesize'
  ) {
    return resolveForestReleaseState('ready-to-file', save);
  }

  if (hasResolvedFieldRequest(save, SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID)) {
    return resolveForestReleaseState('active', save);
  }

  if (
    save.routeV2Progress?.requestId === SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID
    && save.routeV2Progress.status === 'ready-to-synthesize'
  ) {
    return resolveSourceShelterState('ready-to-file', save);
  }

  return resolveSourceShelterState('active', save);
}

function hasActiveProcess(save: SaveState, biomeId: SourceToShoreTargetBiomeId, processId: string): boolean {
  const biome = biomeRegistry[biomeId];
  const visitCount = save.biomeVisits[biomeId] ?? 0;
  const worldState = buildWorldState(save, biomeId);
  return getActiveHabitatProcessMoments(biome, visitCount, worldState).some((moment) => moment.id === processId);
}

function resolveSourceShelterState(
  phase: Exclude<SourceToShorePhase, 'filed'>,
  save: SaveState,
): SourceToShoreState {
  const location = getWorldMapLocationByBiomeId(ecoWorldMap, 'treeline');
  const rimeSourceActive = phase === 'active' && hasActiveProcess(save, 'treeline', 'frost-rime');
  const activeSummary = rimeSourceActive
    ? 'Late ridge rime makes the high source and first shelter easier to compare today.'
    : 'Start Source to Shore by reading high rime, lee shelter, and talus hold.';
  const baseState = {
    beat: 'source-shelter',
    requestId: SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID,
    title: rimeSourceActive ? 'Rime Source' : 'Source Shelter',
    phase,
    targetBiomeId: 'treeline',
    summary: activeSummary,
    cardTitle: rimeSourceActive ? 'RIME SOURCE' : 'SOURCE SHELTER',
    cardStartText: `${location.label} to first shelter`,
  } satisfies Pick<
    SourceToShoreState,
    | 'beat'
    | 'requestId'
    | 'title'
    | 'phase'
    | 'targetBiomeId'
    | 'summary'
    | 'cardTitle'
    | 'cardStartText'
  >;

  if (phase === 'ready-to-file') {
    return {
      ...baseState,
      progressLabel: 'NOTE',
      routeBoardTargetBiomeId: null,
      worldMapLabel: 'File: Source Shelter',
      routeBoardSummary: 'Source Shelter is ready to file at the field station.',
      routeBoardNextDirection: 'Next: return to the field station and file the Source Shelter note.',
      liveAtlasNote: 'Next: file Source Shelter at the field station.',
      archiveText: 'High Pass filed; Source to Shore is ready for its first note.',
      cardStatusLabel: 'NOTE READY',
      cardSummary: `Source Shelter is ready to file from ${location.label}.`,
      cardDetailLabel: 'FILE',
      cardStartText: 'File Source Shelter note',
      cardNote: 'File the Source Shelter note at the field station.',
      cardNoticeText:
        `Source Shelter is ready to file from ${location.label}. File the Source Shelter note at the field station.`,
      isActiveOuting: true,
    };
  }

  return {
    ...baseState,
    progressLabel: 'BETA',
    routeBoardTargetBiomeId: 'treeline',
    worldMapLabel: rimeSourceActive ? 'Today: Rime Source' : 'Today: Source Shelter',
    routeBoardSummary: rimeSourceActive
      ? activeSummary
      : `Source Shelter starts Source to Shore from ${location.label}.`,
    routeBoardNextDirection: rimeSourceActive
      ? 'Next: travel to Treeline Pass and compare rime source, lee watch, and talus hold.'
      : 'Next: travel to Treeline Pass and log rime source, lee watch, and talus hold.',
    liveAtlasNote: rimeSourceActive
      ? 'Rime Source: compare high source and shelter.'
      : 'Beta: start Source Shelter at Treeline Pass.',
    archiveText: 'High Pass filed; Source to Shore starts above the shelter line.',
    cardStatusLabel: 'BETA',
    cardSummary: rimeSourceActive
      ? 'Late ridge rime sharpens the high source and first shelter.'
      : `${location.label} starts the Source to Shore beta thread.`,
    cardDetailLabel: 'STARTS',
    cardNote: 'Read high rime, lee shelter, and talus hold.',
    cardNoticeText: null,
    isActiveOuting: true,
  };
}

function resolveForestReleaseState(phase: SourceToShorePhase, save: SaveState): SourceToShoreState {
  const location = getWorldMapLocationByBiomeId(ecoWorldMap, 'forest');
  const coolReleaseActive = phase === 'active' && hasActiveProcess(save, 'forest', 'moisture-hold');
  const activeSummary = coolReleaseActive
    ? 'Mist and damp ground make seep, roots, and cool release easier to trace today.'
    : 'Carry Source to Shore into seep hold, root filter, and cool forest release.';
  const baseState = {
    beat: 'forest-release',
    requestId: SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID,
    title: coolReleaseActive ? 'Cool Release' : 'Forest Release',
    phase,
    targetBiomeId: 'forest',
    summary: activeSummary,
    cardTitle: coolReleaseActive ? 'COOL RELEASE' : 'FOREST RELEASE',
    cardStartText: `${location.label} to hollow release`,
  } satisfies Pick<
    SourceToShoreState,
    | 'beat'
    | 'requestId'
    | 'title'
    | 'phase'
    | 'targetBiomeId'
    | 'summary'
    | 'cardTitle'
    | 'cardStartText'
  >;

  if (phase === 'filed') {
    return {
      ...baseState,
      progressLabel: 'FILED',
      routeBoardTargetBiomeId: null,
      worldMapLabel: 'Forest Release filed',
      routeBoardSummary: 'Forest Release filed from Forest Trail.',
      routeBoardNextDirection: 'Source to Shore now links high source to forest shelter.',
      liveAtlasNote: 'Forest Release filed from Forest Trail.',
      archiveText: 'Source Shelter and Forest Release link high source to forest shelter.',
      cardStatusLabel: 'FILED',
      cardSummary: 'Forest Release filed from Forest Trail.',
      cardDetailLabel: 'FILED',
      cardStartText: location.label,
      cardNote: 'Second Source to Shore note filed.',
      cardNoticeText:
        'Forest Release filed from Forest Trail. Source to Shore now links high source to forest shelter.',
      isActiveOuting: false,
    };
  }

  if (phase === 'ready-to-file') {
    return {
      ...baseState,
      progressLabel: 'NOTE',
      routeBoardTargetBiomeId: null,
      worldMapLabel: 'File: Forest Release',
      routeBoardSummary: 'Forest Release is ready to file at the field station.',
      routeBoardNextDirection: 'Next: return to the field station and file the Forest Release note.',
      liveAtlasNote: 'Next: file Forest Release at the field station.',
      archiveText: 'Source Shelter filed; Forest Release is ready to file.',
      cardStatusLabel: 'NOTE READY',
      cardSummary: `${baseState.title} is ready to file from ${location.label}.`,
      cardDetailLabel: 'FILE',
      cardStartText: 'File Forest Release note',
      cardNote: 'File the Forest Release note at the field station.',
      cardNoticeText:
        `Forest Release is ready to file from ${location.label}. File the Forest Release note at the field station.`,
      isActiveOuting: true,
    };
  }

  return {
    ...baseState,
    progressLabel: 'BETA',
    routeBoardTargetBiomeId: 'forest',
    worldMapLabel: coolReleaseActive ? 'Today: Cool Release' : 'Today: Forest Release',
    routeBoardSummary: coolReleaseActive
      ? activeSummary
      : 'Forest Release carries Source to Shore into Forest Trail.',
    routeBoardNextDirection: coolReleaseActive
      ? 'Next: travel to Forest Trail and trace seep hold, root filter, and cool release.'
      : 'Next: travel to Forest Trail and log seep hold, root filter, and cool release.',
    liveAtlasNote: coolReleaseActive
      ? 'Cool Release: trace seep, roots, cool forest.'
      : 'Next: carry Source to Shore into Forest Trail.',
    archiveText: 'Source Shelter filed; Forest Release waits downstream.',
    cardStatusLabel: 'BETA',
    cardSummary: coolReleaseActive
      ? 'Mist highlights seep, root filter, and cool release.'
      : `${location.label} carries Source to Shore downstream.`,
    cardDetailLabel: 'STARTS',
    cardNote: 'Read seep hold, root filter, and cool release.',
    cardNoticeText: null,
    isActiveOuting: true,
  };
}
