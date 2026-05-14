import { ecoWorldMap } from '../content/world-map';
import { biomeRegistry } from '../content/biomes';
import { hasResolvedFieldRequest } from './field-requests';
import { getActiveHabitatProcessMoments } from './habitat-process';
import type { SaveState } from './types';
import { buildWorldState } from './world-state';
import { getWorldMapLocationByBiomeId } from './world-map';

export type SourceToShoreTargetBiomeId = 'treeline' | 'forest' | 'coastal-scrub';

const HIGH_PASS_FILED_REQUEST_ID = 'treeline-high-pass';
export const SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID = 'source-to-shore-source-shelter' as const;
export const SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID = 'source-to-shore-forest-release' as const;
export const SOURCE_TO_SHORE_DUNE_CATCH_REQUEST_ID = 'source-to-shore-dune-catch' as const;
export const SOURCE_TO_SHORE_VERTICAL_SLICE_REQUEST_ID = SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID;

export type SourceToShoreRequestId =
  | typeof SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID
  | typeof SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID
  | typeof SOURCE_TO_SHORE_DUNE_CATCH_REQUEST_ID;
export type SourceToShoreBeat = 'source-shelter' | 'forest-release' | 'dune-catch';
export type SourceToShorePhase = 'active' | 'ready-to-file' | 'filed';
export type SourceToShoreBeatStatus = 'done' | 'active' | 'ready' | 'upcoming';

export interface SourceToShoreBeatFlowStep {
  beat: SourceToShoreBeat;
  requestId: SourceToShoreRequestId;
  targetBiomeId: SourceToShoreTargetBiomeId;
  canonicalTitle: 'Source Shelter' | 'Forest Release' | 'Dune Catch';
}

export const SOURCE_TO_SHORE_BEAT_FLOW: readonly SourceToShoreBeatFlowStep[] = [
  {
    beat: 'source-shelter',
    requestId: SOURCE_TO_SHORE_SOURCE_SHELTER_REQUEST_ID,
    targetBiomeId: 'treeline',
    canonicalTitle: 'Source Shelter',
  },
  {
    beat: 'forest-release',
    requestId: SOURCE_TO_SHORE_FOREST_RELEASE_REQUEST_ID,
    targetBiomeId: 'forest',
    canonicalTitle: 'Forest Release',
  },
  {
    beat: 'dune-catch',
    requestId: SOURCE_TO_SHORE_DUNE_CATCH_REQUEST_ID,
    targetBiomeId: 'coastal-scrub',
    canonicalTitle: 'Dune Catch',
  },
] as const;

export interface SourceToShoreRevisitMemory {
  biomeId: SourceToShoreTargetBiomeId;
  title: 'HIGH SOURCE' | 'FOREST RELEASE' | 'COASTAL CATCH';
  text: string;
}

export interface SourceToShoreFiledArcCopy {
  routeBoardSummary: string;
  routeBoardNextDirection: string;
  atlasNote: string;
  archiveText: string;
  filedExpeditionSubtitle: string;
  cardSummary: string;
  cardStartText: string;
  cardNote: string;
  noticeText: string;
}

export function resolveSourceToShoreFiledArcCopy(): SourceToShoreFiledArcCopy {
  return {
    routeBoardSummary: 'Source to Shore filed: high source, forest release, and coastal catch now connect.',
    routeBoardNextDirection:
      'Source to Shore is filed. Revisit the three linked places when you want a quiet pass.',
    atlasNote: 'Filed: high source -> forest release -> coastal catch.',
    archiveText: 'Source to Shore filed from high rime to forest shade to coastal catch.',
    filedExpeditionSubtitle: 'Source to Shore is filed for this field arc.',
    cardSummary: 'High rime, forest shade, and dune catch now read as one connected route.',
    cardStartText: 'Treeline Pass to Coastal Scrub',
    cardNote: 'Three Source to Shore notes filed.',
    noticeText: 'Source to Shore filed. High source, forest release, and coastal catch now connect.',
  };
}

export interface SourceToShoreState {
  beat: SourceToShoreBeat;
  requestId: SourceToShoreRequestId;
  title: 'Source Shelter' | 'Forest Release' | 'Dune Catch' | 'Rime Source' | 'Cool Release' | 'Held Dune';
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
  cardTitle:
    | 'SOURCE SHELTER'
    | 'FOREST RELEASE'
    | 'DUNE CATCH'
    | 'SOURCE TO SHORE'
    | 'RIME SOURCE'
    | 'COOL RELEASE'
    | 'HELD DUNE';
  cardStatusLabel: 'BETA' | 'NOTE READY' | 'FILED';
  cardSummary: string;
  cardDetailLabel: 'STARTS' | 'FILE' | 'FILED';
  cardStartText: string;
  cardNote: string;
  cardNoticeText: string | null;
  isActiveOuting: boolean;
}

export interface SourceToShoreBeatSurfaceState extends SourceToShoreBeatFlowStep {
  title: SourceToShoreState['title'];
  status: SourceToShoreBeatStatus;
}

export function resolveSourceToShoreState(save: SaveState): SourceToShoreState | null {
  if (!hasResolvedFieldRequest(save, HIGH_PASS_FILED_REQUEST_ID)) {
    return null;
  }

  const flowState = resolveSourceToShoreFlowState(save);
  return resolveSourceToShoreBeatState(flowState.beat, flowState.phase, save);
}

export function resolveSourceToShoreBeatSurfaceStates(
  sourceToShoreState: SourceToShoreState,
): SourceToShoreBeatSurfaceState[] {
  const activeIndex = getSourceToShoreBeatIndex(sourceToShoreState.beat);

  return SOURCE_TO_SHORE_BEAT_FLOW.map((flowStep, beatIndex) => ({
    ...flowStep,
    title:
      flowStep.beat === sourceToShoreState.beat && sourceToShoreState.phase !== 'filed'
        ? sourceToShoreState.title
        : flowStep.canonicalTitle,
    status: resolveSourceToShoreBeatStatus(sourceToShoreState, beatIndex, activeIndex),
  }));
}

function resolveSourceToShoreFlowState(save: SaveState): Pick<SourceToShoreBeatFlowStep, 'beat'> & {
  phase: SourceToShorePhase;
} {
  for (let index = SOURCE_TO_SHORE_BEAT_FLOW.length - 1; index >= 0; index -= 1) {
    const flowStep = SOURCE_TO_SHORE_BEAT_FLOW[index];

    if (hasResolvedFieldRequest(save, flowStep.requestId)) {
      const nextStep = SOURCE_TO_SHORE_BEAT_FLOW[index + 1];
      return nextStep ? { beat: nextStep.beat, phase: 'active' } : { beat: flowStep.beat, phase: 'filed' };
    }

    if (
      save.routeV2Progress?.requestId === flowStep.requestId
      && save.routeV2Progress.status === 'ready-to-synthesize'
    ) {
      return { beat: flowStep.beat, phase: 'ready-to-file' };
    }
  }

  return { beat: SOURCE_TO_SHORE_BEAT_FLOW[0].beat, phase: 'active' };
}

function getSourceToShoreBeatIndex(beat: SourceToShoreBeat): number {
  return SOURCE_TO_SHORE_BEAT_FLOW.findIndex((flowStep) => flowStep.beat === beat);
}

function resolveSourceToShoreBeatStatus(
  sourceToShoreState: SourceToShoreState,
  beatIndex: number,
  activeIndex: number,
): SourceToShoreBeatStatus {
  if (sourceToShoreState.phase === 'filed') {
    return 'done';
  }

  if (beatIndex < activeIndex) {
    return 'done';
  }

  if (beatIndex > activeIndex) {
    return 'upcoming';
  }

  return sourceToShoreState.phase === 'ready-to-file' ? 'ready' : 'active';
}

function assertActiveOrReadyPhase(
  phase: SourceToShorePhase,
  beat: SourceToShoreBeat,
): asserts phase is Exclude<SourceToShorePhase, 'filed'> {
  if (phase === 'filed') {
    throw new Error(`Source to Shore ${beat} cannot resolve a filed state before Dune Catch.`);
  }
}

function resolveSourceToShoreBeatState(
  beat: SourceToShoreBeat,
  phase: SourceToShorePhase,
  save: SaveState,
): SourceToShoreState {
  switch (beat) {
    case 'source-shelter':
      assertActiveOrReadyPhase(phase, beat);
      return resolveSourceShelterState(phase, save);
    case 'forest-release':
      assertActiveOrReadyPhase(phase, beat);
      return resolveForestReleaseState(phase, save);
    case 'dune-catch':
      return resolveDuneCatchState(phase, save);
  }
}

export function resolveSourceToShoreRevisitMemory(
  save: SaveState,
  biomeId: string,
): SourceToShoreRevisitMemory | null {
  const sourceToShoreState = resolveSourceToShoreState(save);
  if (sourceToShoreState?.phase !== 'filed') {
    return null;
  }

  switch (biomeId) {
    case 'treeline':
      return {
        biomeId,
        title: 'HIGH SOURCE',
        text: 'High rime, stone shelter, and talus hold mark where the route began.',
      };
    case 'forest':
      return {
        biomeId,
        title: 'FOREST RELEASE',
        text: 'Seep, root filter, and shade carry the route downhill through forest cover.',
      };
    case 'coastal-scrub':
      return {
        biomeId,
        title: 'COASTAL CATCH',
        text: 'Dune grass, swale shrubs, and cool edge catch the route at the shore.',
      };
    default:
      return null;
  }
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
      routeBoardNextDirection: 'Source to Shore now carries the thread toward Coastal Scrub.',
      liveAtlasNote: 'Forest Release filed from Forest Trail.',
      archiveText: 'Source Shelter and Forest Release now point coastward.',
      cardStatusLabel: 'FILED',
      cardSummary: 'Forest Release filed from Forest Trail.',
      cardDetailLabel: 'FILED',
      cardStartText: location.label,
      cardNote: 'Second Source to Shore note filed.',
      cardNoticeText:
        'Forest Release filed from Forest Trail. Source to Shore now carries the thread toward Coastal Scrub.',
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

function resolveDuneCatchState(phase: SourceToShorePhase, save: SaveState): SourceToShoreState {
  const location = getWorldMapLocationByBiomeId(ecoWorldMap, 'coastal-scrub');
  const heldDuneActive = phase === 'active' && hasActiveProcess(save, 'coastal-scrub', 'sand-capture');
  const activeSummary = heldDuneActive
    ? 'Trapped sand makes dune grass, swale shrubs, and the cool edge easier to read today.'
    : 'Carry Source to Shore to dune grass, swale shrub, and cool coastal edge.';
  const baseState = {
    beat: 'dune-catch',
    requestId: SOURCE_TO_SHORE_DUNE_CATCH_REQUEST_ID,
    title: heldDuneActive ? 'Held Dune' : 'Dune Catch',
    phase,
    targetBiomeId: 'coastal-scrub',
    summary: activeSummary,
    cardTitle: heldDuneActive ? 'HELD DUNE' : 'DUNE CATCH',
    cardStartText: `${location.label} to coast catch`,
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
    const filedArcCopy = resolveSourceToShoreFiledArcCopy();

    return {
      ...baseState,
      progressLabel: 'FILED',
      routeBoardTargetBiomeId: null,
      worldMapLabel: 'Dune Catch filed',
      routeBoardSummary: filedArcCopy.routeBoardSummary,
      routeBoardNextDirection: filedArcCopy.routeBoardNextDirection,
      liveAtlasNote: filedArcCopy.atlasNote,
      archiveText: filedArcCopy.archiveText,
      cardStatusLabel: 'FILED',
      cardTitle: 'SOURCE TO SHORE',
      cardSummary: filedArcCopy.cardSummary,
      cardDetailLabel: 'FILED',
      cardStartText: filedArcCopy.cardStartText,
      cardNote: filedArcCopy.cardNote,
      cardNoticeText: filedArcCopy.noticeText,
      isActiveOuting: false,
    };
  }

  if (phase === 'ready-to-file') {
    return {
      ...baseState,
      progressLabel: 'NOTE',
      routeBoardTargetBiomeId: null,
      worldMapLabel: 'File: Dune Catch',
      routeBoardSummary: 'Dune Catch is ready to file at the field station.',
      routeBoardNextDirection: 'Next: return to the field station and file the Dune Catch note.',
      liveAtlasNote: 'Next: file Dune Catch at the field station.',
      archiveText: 'Forest Release filed; Dune Catch is ready to file.',
      cardStatusLabel: 'NOTE READY',
      cardSummary: `${baseState.title} is ready to file from ${location.label}.`,
      cardDetailLabel: 'FILE',
      cardStartText: 'File Dune Catch note',
      cardNote: 'File the Dune Catch note at the field station.',
      cardNoticeText:
        `Dune Catch is ready to file from ${location.label}. File the Dune Catch note at the field station.`,
      isActiveOuting: true,
    };
  }

  return {
    ...baseState,
    progressLabel: 'BETA',
    routeBoardTargetBiomeId: 'coastal-scrub',
    worldMapLabel: heldDuneActive ? 'Today: Held Dune' : 'Today: Dune Catch',
    routeBoardSummary: heldDuneActive
      ? activeSummary
      : `Dune Catch carries Source to Shore into ${location.label}.`,
    routeBoardNextDirection:
      heldDuneActive
        ? 'Next: travel to Coastal Scrub and trace held sand, swale hold, and cool edge.'
        : 'Next: travel to Coastal Scrub and log dune catch, swale hold, and cool edge.',
    liveAtlasNote: heldDuneActive
      ? 'Held Dune: trace grass, shrubs, cool edge.'
      : 'Next: carry Source to Shore to Coastal Scrub.',
    archiveText: 'Forest Release filed; Dune Catch waits coastward.',
    cardStatusLabel: 'BETA',
    cardSummary: heldDuneActive
      ? 'Trapped sand sharpens the dune catch before the cool edge.'
      : `${location.label} carries Source to Shore into the coast catch.`,
    cardDetailLabel: 'STARTS',
    cardNote: heldDuneActive
      ? 'Read held sand, swale hold, and cool edge.'
      : 'Read dune catch, swale hold, and cool edge.',
    cardNoticeText: null,
    isActiveOuting: true,
  };
}
