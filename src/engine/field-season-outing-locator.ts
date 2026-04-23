import { hasResolvedFieldRequest } from './field-requests';
import {
  HIGH_PASS_CHAPTER_TARGET_BIOME_ID,
  resolveHighPassChapterState,
} from './high-pass-chapter-state';
import { resolveSourceToShoreState } from './source-to-shore-state';
import type { SaveState } from './types';

type ActiveOutingTargetBiomeId = 'beach' | 'forest' | 'coastal-scrub' | 'treeline' | 'tundra';

export interface ActiveOutingLocator {
  title: string;
  summary: string;
  progressLabel: string;
  targetBiomeId: ActiveOutingTargetBiomeId;
  worldMapLabel: string;
  routeBoardSummary: string;
  routeBoardNextDirection: string;
  atlasNote: string;
}

export const FOREST_EXPEDITION_CHAPTER_REQUEST_ID = 'forest-expedition-upper-run';
export const FOREST_EXPEDITION_EVIDENCE_TOTAL = 4;
export const NEXT_FIELD_SEASON_TARGET_BIOME_ID = HIGH_PASS_CHAPTER_TARGET_BIOME_ID;

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return hasResolvedFieldRequest(save, requestId);
}

function getExpeditionChapterProgress(save: SaveState) {
  return save.routeV2Progress?.requestId === FOREST_EXPEDITION_CHAPTER_REQUEST_ID
    ? save.routeV2Progress
    : null;
}

export function getExpeditionEvidenceCount(save: SaveState): number {
  return getExpeditionChapterProgress(save)?.evidenceSlots.length ?? 0;
}

export function isExpeditionNotebookReady(save: SaveState): boolean {
  return getExpeditionChapterProgress(save)?.status === 'ready-to-synthesize';
}

export function resolveSeasonOutingLocator(save: SaveState): ActiveOutingLocator | null {
  const sourceToShoreState = resolveSourceToShoreState(save);
  if (sourceToShoreState) {
    if (!sourceToShoreState.isActiveOuting) {
      return null;
    }

    return {
      title: sourceToShoreState.title,
      summary: sourceToShoreState.summary,
      progressLabel: sourceToShoreState.progressLabel,
      targetBiomeId: sourceToShoreState.targetBiomeId,
      worldMapLabel: sourceToShoreState.worldMapLabel,
      routeBoardSummary: sourceToShoreState.routeBoardSummary,
      routeBoardNextDirection: sourceToShoreState.routeBoardNextDirection,
      atlasNote: sourceToShoreState.liveAtlasNote,
    };
  }

  const highPassChapterState = resolveHighPassChapterState(save);
  if (highPassChapterState) {
    if (!highPassChapterState.isActiveOuting) {
      return null;
    }

    return {
      title: highPassChapterState.title,
      summary: highPassChapterState.summary,
      progressLabel: highPassChapterState.progressLabel,
      targetBiomeId: highPassChapterState.targetBiomeId,
      worldMapLabel: highPassChapterState.worldMapLabel,
      routeBoardSummary: highPassChapterState.routeBoardSummary,
      routeBoardNextDirection: highPassChapterState.routeBoardNextDirection,
      atlasNote: highPassChapterState.dormantAtlasNote,
    };
  }

  if (hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID)) {
    return {
      title: 'Season Threads',
      summary: 'Forest Trail has one last notebook pass tying coast, hollow, and canopy together.',
      progressLabel: 'NEXT',
      targetBiomeId: 'forest',
      worldMapLabel: 'Today: Season Threads',
      routeBoardSummary: 'Root Hollow reconnects the season. Tie the threads together back in Forest Trail.',
      routeBoardNextDirection: 'Next: return to Forest Trail and log Season Threads.',
      atlasNote: 'Next: tie coast and hollow in Forest Trail.',
    };
  }

  if (!hasCompletedRequest(save, 'treeline-low-fell')) {
    return null;
  }

  const expeditionEvidenceCount = getExpeditionEvidenceCount(save);
  const expeditionNotebookReady = isExpeditionNotebookReady(save);

  if (expeditionNotebookReady) {
    return {
      title: 'Root Hollow',
      summary: 'File the Root Hollow note back at the field station.',
      progressLabel: 'NOTE',
      targetBiomeId: 'forest',
      worldMapLabel: 'Today: Root Hollow',
      routeBoardSummary: 'Root Hollow is ready to file. Return to the field station and log the chapter.',
      routeBoardNextDirection: 'Next: return to the field station and file the Root Hollow note.',
      atlasNote: 'Next: file the Root Hollow note.',
    };
  }

  if (expeditionEvidenceCount >= 3) {
    return {
      title: 'Root Hollow',
      summary: 'Forest Trail still has one high-run clue left to finish in Root Hollow.',
      progressLabel: `${expeditionEvidenceCount}/${FOREST_EXPEDITION_EVIDENCE_TOTAL}`,
      targetBiomeId: 'forest',
      worldMapLabel: 'Today: Root Hollow',
      routeBoardSummary: 'Root Hollow is nearly filed. Carry the high run back into Log Run.',
      routeBoardNextDirection: 'Next: follow the high return into Log Run.',
      atlasNote: 'Next: follow the Root Hollow high return.',
    };
  }

  if (expeditionEvidenceCount >= 2) {
    return {
      title: 'Root Hollow',
      summary: 'Forest Trail still climbs from the stone pocket toward the root-held return.',
      progressLabel: `${expeditionEvidenceCount}/${FOREST_EXPEDITION_EVIDENCE_TOTAL}`,
      targetBiomeId: 'forest',
      worldMapLabel: 'Today: Root Hollow',
      routeBoardSummary: 'Root Hollow is underway. Climb from the stone pocket toward the root-held return.',
      routeBoardNextDirection: 'Next: climb through Root Hollow to the root-held return.',
      atlasNote: 'Next: climb toward the root-held return.',
    };
  }

  if (expeditionEvidenceCount >= 1) {
    return {
      title: 'Root Hollow',
      summary: 'Forest Trail still drops below the climb into the stone pocket.',
      progressLabel: `${expeditionEvidenceCount}/${FOREST_EXPEDITION_EVIDENCE_TOTAL}`,
      targetBiomeId: 'forest',
      worldMapLabel: 'Today: Root Hollow',
      routeBoardSummary: 'Root Hollow is underway. Drop below the climb and read the stone pocket.',
      routeBoardNextDirection: 'Next: drop into the stone pocket below the climb.',
      atlasNote: 'Next: drop into the stone pocket below.',
    };
  }

  return {
    title: 'Root Hollow',
    summary: 'Forest Trail opens Root Hollow below the old climb.',
    progressLabel: 'READY',
    targetBiomeId: 'forest',
    worldMapLabel: 'Today: Root Hollow',
    routeBoardSummary: 'Edge line logged. Next: open the Root Hollow expedition.',
    routeBoardNextDirection: 'Next: open the Root Hollow expedition from the field station.',
    atlasNote: 'Next: open Root Hollow below the forest.',
  };
}
