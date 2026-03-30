import type { JournalBiomeProgress } from './journal';

export type BiomeSurveyState = 'none' | 'surveyed' | 'complete';

export interface BiomeSurveyProgress {
  biomeId: string;
  discoveredCount: number;
  totalCount: number;
  state: BiomeSurveyState;
}

export const SURVEY_DISCOVERY_THRESHOLD = 4;

export function resolveBiomeSurveyState(
  discoveredCount: number,
  totalCount: number,
  threshold = SURVEY_DISCOVERY_THRESHOLD,
): BiomeSurveyState {
  if (totalCount <= 0 || discoveredCount <= 0) {
    return 'none';
  }

  if (discoveredCount >= totalCount) {
    return 'complete';
  }

  if (discoveredCount >= Math.min(threshold, totalCount)) {
    return 'surveyed';
  }

  return 'none';
}

export function buildBiomeSurveyProgress(
  biomeProgress: Array<Pick<JournalBiomeProgress, 'biomeId' | 'discoveredCount' | 'totalCount'>>,
): BiomeSurveyProgress[] {
  return biomeProgress.map((progress) => ({
    biomeId: progress.biomeId,
    discoveredCount: progress.discoveredCount,
    totalCount: progress.totalCount,
    state: resolveBiomeSurveyState(progress.discoveredCount, progress.totalCount),
  }));
}

export function getBiomeSurveyProgress(
  biomeProgress: Array<Pick<JournalBiomeProgress, 'biomeId' | 'discoveredCount' | 'totalCount'>>,
  biomeId: string,
): BiomeSurveyProgress | null {
  return buildBiomeSurveyProgress(biomeProgress).find((progress) => progress.biomeId === biomeId) ?? null;
}

export function formatBiomeSurveyStateLabel(state: BiomeSurveyState): string | null {
  switch (state) {
    case 'surveyed':
      return 'SURVEYED';
    case 'complete':
      return 'COMPLETE';
    default:
      return null;
  }
}
