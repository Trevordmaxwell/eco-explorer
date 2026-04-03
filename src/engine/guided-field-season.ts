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
  | 'season-close-return'
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
  const beachBeatLogged = hasCompletedRequest(save, 'beach-shore-shelter');
  const forestSurveyState = getForestSurveyState(biomes, save);
  const forestSurveyLogged =
    hasCompletedRequest(save, 'forest-survey-slice') ||
    forestSurveyState === 'surveyed' ||
    forestSurveyState === 'complete';
  const expeditionLogged = hasCompletedRequest(save, 'forest-expedition-upper-run');
  const seasonThreadsLogged = hasCompletedRequest(save, 'forest-season-threads');
  const trailStrideOwned = hasFieldUpgrade(save, 'trail-stride');
  const coastalScrubVisited = (save.biomeVisits['coastal-scrub'] ?? 0) > 0;
  const coastalLineLogged = hasCompletedRequest(save, 'coastal-edge-moisture');

  if (seasonThreadsLogged && save.seasonCloseReturnPending) {
    return {
      stage: 'season-close-return',
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Season Threads logged. Return to the field station for a calm season close.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Season Threads logged. Field station next.',
      },
      nextBiomeId: null,
    };
  }

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
        text: coastalLineLogged
          ? 'Keep comparing nearby habitats and checking the station between longer routes.'
          : 'Shore Shelter, Hidden Hollow, and Open To Shelter now read like one coast-to-forest chapter.',
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
        text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
      },
      promptNotice: {
        title: 'NEXT STOP',
        text: 'Open To Shelter next. Follow open bloom to edge log.',
      },
      nextBiomeId: 'coastal-scrub',
    };
  }

  if (forestSurveyLogged) {
    return {
      stage: 'station-return',
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Field station next for Trail Stride.',
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
            text: 'Forest Survey is next. Stay with Forest Trail a little longer and log four clues before heading back.',
          }
        : {
            title: 'MOISTURE HOLDERS',
            text: 'Moisture Holders is next in Root Hollow. Compare one shelter, one ground, and one living clue before heading back.',
          },
      promptNotice: null,
      nextBiomeId: null,
    };
  }

  if (beachBeatLogged) {
    return {
      stage: 'starter',
      stationNote: {
        title: 'HIDDEN HOLLOW',
        text: 'Hidden Hollow is next in Forest Trail. Follow shelter inland and confirm the seep stone.',
      },
      promptNotice: {
        title: 'NOTEBOOK TASK',
        text: 'World map to Forest Trail. Hidden Hollow is next.',
      },
      nextBiomeId: 'forest',
    };
  }

  return {
    stage: 'starter',
    stationNote: {
      title: 'FIRST FIELD SEASON',
      text: 'Start with Shore Shelter on Sunny Beach, then carry shelter inland through Hidden Hollow before returning to the field station.',
    },
    promptNotice: {
      title: 'NOTEBOOK TASK',
      text: 'Shore Shelter first. Stay on Sunny Beach and log dune grass to wrack line.',
    },
    nextBiomeId: 'beach',
  };
}
