import { ecoWorldMap } from '../content/world-map';
import { hasResolvedFieldRequest } from './field-requests';
import type { SaveState } from './types';
import { getWorldMapLocationByBiomeId } from './world-map';

export const HIGH_PASS_CHAPTER_TARGET_BIOME_ID = 'treeline' as const;

const HIGH_PASS_CHAPTER_REQUEST_ID = 'forest-season-threads';
const HIGH_PASS_CHAPTER_FIELD_REQUEST_ID = 'treeline-high-pass';
const HIGH_PASS_CHAPTER_TITLE = 'High Pass';

export type HighPassChapterPhase = 'dormant' | 'active' | 'ready-to-file' | 'filed';

export interface HighPassChapterState {
  title: typeof HIGH_PASS_CHAPTER_TITLE;
  phase: HighPassChapterPhase;
  progressLabel: 'NEXT' | 'NOTE' | 'FILED';
  targetBiomeId: typeof HIGH_PASS_CHAPTER_TARGET_BIOME_ID;
  routeBoardTargetBiomeId: typeof HIGH_PASS_CHAPTER_TARGET_BIOME_ID | null;
  worldMapLabel: string;
  summary: string;
  routeBoardSummary: string;
  routeBoardNextDirection: string;
  dormantAtlasNote: string;
  liveAtlasNote: string;
  routesSubtitle: string;
  archiveText: string;
  expeditionTeaser: string;
  cardTitle: string;
  cardStatusLabel: 'NEXT' | 'NOTE READY' | 'FILED';
  cardSummary: string;
  cardDetailLabel: 'STARTS' | 'FILE' | 'FILED';
  cardStartText: string;
  cardNote: string;
  cardNoticeText: string | null;
  isActiveOuting: boolean;
  dormantUntilSeasonCloseClears: boolean;
}

function resolveRegionalBridgeLine(title: string, locationLabel: string): string {
  return `${locationLabel} carries the season toward ${title}.`;
}

export function resolveHighPassChapterState(save: SaveState): HighPassChapterState | null {
  if (!hasResolvedFieldRequest(save, HIGH_PASS_CHAPTER_REQUEST_ID)) {
    return null;
  }

  const location = getWorldMapLocationByBiomeId(ecoWorldMap, HIGH_PASS_CHAPTER_TARGET_BIOME_ID);
  const summary = resolveRegionalBridgeLine(HIGH_PASS_CHAPTER_TITLE, location.label);
  const phase = resolveHighPassChapterPhase(save);
  const baseState = {
    title: HIGH_PASS_CHAPTER_TITLE,
    phase,
    targetBiomeId: HIGH_PASS_CHAPTER_TARGET_BIOME_ID,
    summary,
    dormantAtlasNote: 'Next: take High Pass from stone lift to talus hold.',
    expeditionTeaser: `${location.label} waits beyond Root Hollow.`,
    cardTitle: HIGH_PASS_CHAPTER_TITLE.toUpperCase(),
    cardStartText: `${location.label} to ${HIGH_PASS_CHAPTER_TITLE}`,
    dormantUntilSeasonCloseClears: phase === 'dormant',
  } satisfies Pick<
    HighPassChapterState,
    | 'title'
    | 'phase'
    | 'targetBiomeId'
    | 'summary'
    | 'dormantAtlasNote'
    | 'expeditionTeaser'
    | 'cardTitle'
    | 'cardStartText'
    | 'dormantUntilSeasonCloseClears'
  >;

  if (phase === 'filed') {
    return {
      ...baseState,
      progressLabel: 'FILED',
      routeBoardTargetBiomeId: null,
      worldMapLabel: `${HIGH_PASS_CHAPTER_TITLE} filed`,
      routeBoardSummary: `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}.`,
      routeBoardNextDirection: `${HIGH_PASS_CHAPTER_TITLE} filed. This field arc is complete.`,
      liveAtlasNote: `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}.`,
      routesSubtitle: `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}.`,
      archiveText: `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}.`,
      cardStatusLabel: 'FILED',
      cardSummary: `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}.`,
      cardDetailLabel: 'FILED',
      cardStartText: location.label,
      cardNote: 'Current field arc filed. Revisit when you want a quiet pass.',
      cardNoticeText:
        `${HIGH_PASS_CHAPTER_TITLE} filed from ${location.label}. Current field arc filed. Revisit when you want a quiet pass.`,
      isActiveOuting: false,
    };
  }

  if (phase === 'ready-to-file') {
    return {
      ...baseState,
      progressLabel: 'NOTE',
      routeBoardTargetBiomeId: null,
      worldMapLabel: `File: ${HIGH_PASS_CHAPTER_TITLE}`,
      routeBoardSummary: `${HIGH_PASS_CHAPTER_TITLE} is ready to file at the field station.`,
      routeBoardNextDirection: `Next: return to the field station and file the ${HIGH_PASS_CHAPTER_TITLE} note.`,
      liveAtlasNote: `Next: file ${HIGH_PASS_CHAPTER_TITLE} at the field station.`,
      routesSubtitle: `${HIGH_PASS_CHAPTER_TITLE} note is ready to file.`,
      archiveText: `Root Hollow now leads to ${HIGH_PASS_CHAPTER_TITLE}.`,
      cardStatusLabel: 'NOTE READY',
      cardSummary: `${HIGH_PASS_CHAPTER_TITLE} is ready to file from ${location.label}.`,
      cardDetailLabel: 'FILE',
      cardStartText: `File ${HIGH_PASS_CHAPTER_TITLE} note`,
      cardNote: `File the ${HIGH_PASS_CHAPTER_TITLE} note at the field station.`,
      cardNoticeText:
        `${HIGH_PASS_CHAPTER_TITLE} is ready to file from ${location.label}. File the ${HIGH_PASS_CHAPTER_TITLE} note at the field station.`,
      isActiveOuting: true,
    };
  }

  return {
    ...baseState,
    progressLabel: 'NEXT',
    routeBoardTargetBiomeId: HIGH_PASS_CHAPTER_TARGET_BIOME_ID,
    worldMapLabel: `Today: ${HIGH_PASS_CHAPTER_TITLE}`,
    routeBoardSummary: `${HIGH_PASS_CHAPTER_TITLE} opens next from ${location.label} into the next field season.`,
    routeBoardNextDirection:
      `Next: travel to ${location.label} and read ${HIGH_PASS_CHAPTER_TITLE} through stone lift, lee watch, rime mark, and talus hold.`,
    liveAtlasNote: `Filed season: ${HIGH_PASS_CHAPTER_TITLE} from ${location.label}.`,
    routesSubtitle: `${HIGH_PASS_CHAPTER_TITLE} starts at ${location.label}.`,
    archiveText: `Root Hollow now leads to ${HIGH_PASS_CHAPTER_TITLE}.`,
    cardStatusLabel: 'NEXT',
    cardSummary: summary,
    cardDetailLabel: 'STARTS',
    cardNote: `Start from ${location.label} when you want the next field season.`,
    cardNoticeText: null,
    isActiveOuting: true,
  };
}

function resolveHighPassChapterPhase(save: SaveState): HighPassChapterPhase {
  if (hasResolvedFieldRequest(save, HIGH_PASS_CHAPTER_FIELD_REQUEST_ID)) {
    return 'filed';
  }

  if (save.seasonCloseReturnPending) {
    return 'dormant';
  }

  if (
    save.routeV2Progress?.requestId === HIGH_PASS_CHAPTER_FIELD_REQUEST_ID
    && save.routeV2Progress.status === 'ready-to-synthesize'
  ) {
    return 'ready-to-file';
  }

  return 'active';
}
