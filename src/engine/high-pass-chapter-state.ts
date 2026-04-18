import { ecoWorldMap } from '../content/world-map';
import { hasResolvedFieldRequest } from './field-requests';
import type { SaveState } from './types';
import { getWorldMapLocationByBiomeId } from './world-map';

export const HIGH_PASS_CHAPTER_TARGET_BIOME_ID = 'treeline' as const;

const HIGH_PASS_CHAPTER_REQUEST_ID = 'forest-season-threads';
const HIGH_PASS_CHAPTER_TITLE = 'High Pass';

export interface HighPassChapterState {
  title: typeof HIGH_PASS_CHAPTER_TITLE;
  progressLabel: 'NEXT';
  targetBiomeId: typeof HIGH_PASS_CHAPTER_TARGET_BIOME_ID;
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
  cardStatusLabel: 'NEXT';
  cardSummary: string;
  cardStartText: string;
  cardNote: string;
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

  return {
    title: HIGH_PASS_CHAPTER_TITLE,
    progressLabel: 'NEXT',
    targetBiomeId: HIGH_PASS_CHAPTER_TARGET_BIOME_ID,
    worldMapLabel: `Today: ${HIGH_PASS_CHAPTER_TITLE}`,
    summary,
    routeBoardSummary: `${HIGH_PASS_CHAPTER_TITLE} opens next from ${location.label} into the next field season.`,
    routeBoardNextDirection:
      `Next: travel to ${location.label} and read ${HIGH_PASS_CHAPTER_TITLE} through stone lift, lee watch, rime mark, and talus hold.`,
    dormantAtlasNote: 'Next: take High Pass from stone lift to talus hold.',
    liveAtlasNote: `Filed season: ${HIGH_PASS_CHAPTER_TITLE} from ${location.label}.`,
    routesSubtitle: `${HIGH_PASS_CHAPTER_TITLE} starts at ${location.label}.`,
    archiveText: `Root Hollow now leads to ${HIGH_PASS_CHAPTER_TITLE}.`,
    expeditionTeaser: `${location.label} waits beyond Root Hollow.`,
    cardTitle: HIGH_PASS_CHAPTER_TITLE.toUpperCase(),
    cardStatusLabel: 'NEXT',
    cardSummary: summary,
    cardStartText: `${location.label} to ${HIGH_PASS_CHAPTER_TITLE}`,
    cardNote: `Start from ${location.label} when you want the next field season.`,
    dormantUntilSeasonCloseClears: Boolean(save.seasonCloseReturnPending),
  };
}
