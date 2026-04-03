import { resolveNextSeasonApproachLine } from './field-season-board';
import { hasFieldUpgrade } from './field-station';
import { buildJournalBiomeProgress } from './journal';
import { getBiomeSurveyProgress, type BiomeSurveyState } from './progression';
import type { BiomeDefinition, SaveState } from './types';

export type GuidedFieldSeasonStage =
  | 'starter'
  | 'forest-study'
  | 'station-return'
  | 'season-capstone'
  | 'next-season-open'
  | 'next-habitat'
  | 'settled';

export interface GuidedFieldSeasonNote {
  title: string;
  text: string;
}

export interface GuidedFieldSeasonState {
  stage: GuidedFieldSeasonStage;
  stationNote: GuidedFieldSeasonNote;
  promptNotice: GuidedFieldSeasonNote | null;
  nextBiomeId: string | null;
}

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return save.completedFieldRequestIds.includes(requestId);
}

function getForestSurveyState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): BiomeSurveyState {
  return getBiomeSurveyProgress(
    buildJournalBiomeProgress(biomes, save.discoveredEntries),
    'forest',
  )?.state ?? 'none';
}

export function resolveGuidedFieldSeasonState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): GuidedFieldSeasonState {
  const forestSurveyState = getForestSurveyState(biomes, save);
  const forestSurveyLogged =
    hasCompletedRequest(save, 'forest-survey-slice') ||
    forestSurveyState === 'surveyed' ||
    forestSurveyState === 'complete';
  const expeditionLogged = hasCompletedRequest(save, 'forest-expedition-upper-run');
  const seasonThreadsLogged = hasCompletedRequest(save, 'forest-season-threads');
  const trailStrideOwned = hasFieldUpgrade(save, 'trail-stride');
  const coastalScrubVisited = (save.biomeVisits['coastal-scrub'] ?? 0) > 0;

  if (seasonThreadsLogged) {
    const nextSeasonApproachLine = resolveNextSeasonApproachLine(save);
    return {
      stage: 'next-season-open',
      stationNote: {
        title: 'NEXT FIELD SEASON',
        text: nextSeasonApproachLine
          ? `${nextSeasonApproachLine.replace(/\.$/, '')} when you are ready.`
          : 'High Pass opens next from Treeline Pass when you are ready.',
      },
      promptNotice: null,
      nextBiomeId: 'treeline',
    };
  }

  if (expeditionLogged) {
    return {
      stage: 'season-capstone',
      stationNote: {
        title: 'SEASON THREADS',
        text: 'Forest Trail has one last notebook pass. Tie together floor cover, edge growth, and canopy life.',
      },
      promptNotice: {
        title: 'SEASON THREADS',
        text: 'Back in Forest Trail, log the clues that tie this season together.',
      },
      nextBiomeId: 'forest',
    };
  }

  if (trailStrideOwned && coastalScrubVisited) {
    return {
      stage: 'settled',
      stationNote: {
        title: 'FIELD SEASON OPEN',
        text: 'Keep comparing nearby habitats and checking the station between longer routes.',
      },
      promptNotice: null,
      nextBiomeId: null,
    };
  }

  if (trailStrideOwned) {
    return {
      stage: 'next-habitat',
      stationNote: {
        title: 'NEXT STOP',
        text: 'Coastal Scrub is the clearest next comparison. Look for how shelter shifts from dunes to shrubs.',
      },
      promptNotice: {
        title: 'NEXT STOP',
        text: 'Coastal Scrub makes the best next comparison after the forest run.',
      },
      nextBiomeId: 'coastal-scrub',
    };
  }

  if (forestSurveyLogged) {
    return {
      stage: 'station-return',
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Forest Trail is logged. Use the menu for World map, then stop at the field station for Trail Stride.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Menu to World map, then Field station.',
      },
      nextBiomeId: null,
    };
  }

  if (hasCompletedRequest(save, 'forest-hidden-hollow')) {
    const moistureLogged = hasCompletedRequest(save, 'forest-moisture-holders');
    return {
      stage: 'forest-study',
      stationNote: moistureLogged
        ? {
            title: 'FOREST SURVEY',
            text: 'Stay with Forest Trail a little longer and log four clues before heading back.',
          }
        : {
            title: 'MOISTURE CLUES',
            text: 'Root Hollow has the next notebook beat. Compare two damp-ground neighbors before you head back.',
          },
      promptNotice: null,
      nextBiomeId: null,
    };
  }

  return {
    stage: 'starter',
    stationNote: {
      title: 'FIRST FIELD SEASON',
      text: 'Start with one clear notebook route in Forest Trail, then return to the field station after the run.',
    },
    promptNotice: {
      title: 'NOTEBOOK TASK',
      text: 'Menu to World map, then Forest Trail.',
    },
    nextBiomeId: 'forest',
  };
}
