import { ecoWorldMap } from '../content/world-map';
import { getActiveHabitatProcessMoments } from './habitat-process';
import { hasFieldUpgrade } from './field-station';
import { getWorldMapLocationByBiomeId } from './world-map';
import { buildWorldState } from './world-state';
import type {
  BiomeDefinition,
  FieldStationSeasonPage,
  FieldStationView,
  OutingSupportId,
  SaveState,
} from './types';

export type FieldSeasonBoardBeatStatus = 'done' | 'active' | 'ready' | 'upcoming';

export interface FieldSeasonBoardBeat {
  id:
    | 'forest-study'
    | 'station-return'
    | 'coastal-comparison'
    | 'treeline-shelter'
    | 'tundra-short-season'
    | 'tundra-survey'
    | 'scrub-edge-pattern'
    | 'forest-cool-edge'
    | 'treeline-low-fell';
  title: string;
  detail: string;
  status: FieldSeasonBoardBeatStatus;
}

export interface FieldSeasonBoardState {
  routeId: 'coastal-shelter-line' | 'treeline-shelter-line' | 'edge-pattern-line';
  routeTitle: string;
  branchLabel: string;
  summary: string;
  progressLabel: string;
  beats: FieldSeasonBoardBeat[];
  activeBeatId: FieldSeasonBoardBeat['id'] | null;
  nextDirection: string;
  targetBiomeId: 'forest' | 'coastal-scrub' | 'treeline' | 'tundra' | null;
  complete: boolean;
  notebookReady: {
    requestId: string;
    text: string;
  } | null;
  replayNote: {
    id: string;
    title: string;
    text: string;
  } | null;
}

export interface FieldAtlasState {
  title: string;
  loggedRoutes: string[];
  note: string | null;
}

export interface FieldSeasonWrapState {
  label: string;
  text: string;
}

export interface FieldSeasonArchiveState {
  label: string;
  text: string;
}

export type FieldSeasonExpeditionStatus = 'locked' | 'ready' | 'active' | 'logged';

export interface FieldSeasonExpeditionTeaser {
  label: string;
  text: string;
}

export interface FieldSeasonExpeditionState {
  id: 'root-hollow-expedition';
  title: string;
  status: FieldSeasonExpeditionStatus;
  statusLabel: string;
  summary: string;
  startText: string;
  note: string;
  teaser: FieldSeasonExpeditionTeaser | null;
}

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return save.completedFieldRequestIds.includes(requestId);
}

const FOREST_EXPEDITION_CHAPTER_REQUEST_ID = 'forest-expedition-upper-run';
const FOREST_EXPEDITION_EVIDENCE_TOTAL = 4;

function getExpeditionChapterProgress(save: SaveState) {
  return save.routeV2Progress?.requestId === FOREST_EXPEDITION_CHAPTER_REQUEST_ID
    ? save.routeV2Progress
    : null;
}

function getExpeditionEvidenceCount(save: SaveState): number {
  return getExpeditionChapterProgress(save)?.evidenceSlots.length ?? 0;
}

function isExpeditionNotebookReady(save: SaveState): boolean {
  return getExpeditionChapterProgress(save)?.status === 'ready-to-synthesize';
}

function getForestStudyBeat(save: SaveState, forestSurveyLogged: boolean): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'forest-hidden-hollow')) {
    return {
      id: 'forest-study',
      title: 'Forest Hollow',
      detail: 'Find the lower hollow and confirm the seep stone.',
    };
  }

  if (!hasCompletedRequest(save, 'forest-moisture-holders')) {
    return {
      id: 'forest-study',
      title: 'Forest Hollow',
      detail: 'Match one shelter, one ground, and one living clue in Root Hollow.',
    };
  }

  if (!forestSurveyLogged) {
    return {
      id: 'forest-study',
      title: 'Forest Survey',
      detail: 'Bring Forest Trail up to surveyed before heading back.',
    };
  }

  return {
    id: 'forest-study',
    title: 'Forest Logged',
    detail: 'The hollow route, moisture clues, and forest survey are all logged.',
  };
}

function getStationReturnBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasFieldUpgrade(save, 'trail-stride')) {
    return {
      id: 'station-return',
      title: 'Station Return',
      detail: 'Open the field station and take Trail Stride for longer walks.',
    };
  }

  return {
    id: 'station-return',
    title: 'Trail Stride',
    detail: 'The station is set for a longer coastal comparison walk.',
  };
}

function getCoastalComparisonBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'coastal-shelter-shift')) {
    return {
      id: 'coastal-comparison',
      title: 'Coastal Shelter',
      detail: 'Compare how the beach-facing dunes start feeling more sheltered.',
    };
  }

  if (!hasCompletedRequest(save, 'coastal-edge-moisture')) {
    return {
      id: 'coastal-comparison',
      title: 'Edge Moisture',
      detail: 'At the forest edge, log the cooler, wetter ground shift.',
    };
  }

  return {
    id: 'coastal-comparison',
    title: 'Coastal Line Logged',
    detail: 'Beach, scrub, and forest now read like one connected season route.',
  };
}

function getBeatStatus(done: boolean, anyActiveAssigned: boolean): FieldSeasonBoardBeatStatus {
  if (done) {
    return 'done';
  }

  return anyActiveAssigned ? 'upcoming' : 'active';
}

function getTreelineShelterBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'treeline-stone-shelter')) {
    return {
      id: 'treeline-shelter',
      title: 'Treeline Shelter',
      detail: 'Match one stone break, one bent cover, and one lee-life clue where treeline still blocks the wind.',
    };
  }

  return {
    id: 'treeline-shelter',
    title: 'Treeline Shelter Logged',
    detail: 'Stone break, bent cover, and lee-life clues now read as one sheltered inland turn.',
  };
}

function getTundraShortSeasonBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'tundra-short-season')) {
    return {
      id: 'tundra-short-season',
      title: 'Short Season',
      detail: 'Match one first bloom, one wet tuft, and one brief-fruit clue across the thaw edge.',
    };
  }

  return {
    id: 'tundra-short-season',
    title: 'Short Season Logged',
    detail: 'First bloom, wet tuft, and brief-fruit clues now read as one thaw-window timing pass.',
  };
}

function getTundraSurveyBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'tundra-survey-slice')) {
    return {
      id: 'tundra-survey',
      title: 'Tundra Survey',
      detail: 'Bring Tundra Reach up to surveyed so the inland line ends as fieldwork, not only one stop.',
    };
  }

  return {
    id: 'tundra-survey',
    title: 'Inland Line Logged',
    detail: 'Treeline shelter and tundra short-season clues now hold together as one inland chapter.',
  };
}

function getScrubEdgePatternBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'scrub-edge-pattern')) {
    return {
      id: 'scrub-edge-pattern',
      title: 'Scrub Pattern',
      detail: 'Match one open pioneer, one holding cover, and one thicker-edge clue from dune to forest edge.',
    };
  }

  return {
    id: 'scrub-edge-pattern',
    title: 'Scrub Pattern Logged',
    detail: 'Open pioneer, holding cover, and thicker edge clues now read like one clear transition.',
  };
}

function getForestCoolEdgeBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'forest-cool-edge')) {
    return {
      id: 'forest-cool-edge',
      title: 'Cool Edge',
      detail: 'Match one edge carrier, one cool floor, and one wet shade clue at Creek Bend.',
    };
  }

  return {
    id: 'forest-cool-edge',
    title: 'Cool Edge Logged',
    detail: 'Edge carrier, cool floor, and wet shade clues now read as one cooler middle edge.',
  };
}

function getTreelineLowFellBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'treeline-low-fell')) {
    return {
      id: 'treeline-low-fell',
      title: 'Low Fell',
      detail: 'Match one last tree shape, one low wood, and one fell-bloom clue from krummholz to lichen fell.',
    };
  }

  return {
    id: 'treeline-low-fell',
    title: 'Edge Line Logged',
    detail: 'Last tree shape, low wood, and fell bloom clues now finish the edge line as one exposure read.',
  };
}

function getActiveBeatId(beats: FieldSeasonBoardBeat[]): FieldSeasonBoardBeat['id'] | null {
  return beats.find((beat) => beat.status === 'active' || beat.status === 'ready')?.id ?? null;
}

function getRouteBeatIdForRequest(
  requestId: string,
): FieldSeasonBoardBeat['id'] | null {
  switch (requestId) {
    case 'forest-hidden-hollow':
    case 'forest-moisture-holders':
    case 'forest-survey-slice':
      return 'forest-study';
    case 'coastal-shelter-shift':
    case 'coastal-edge-moisture':
      return 'coastal-comparison';
    case 'treeline-stone-shelter':
      return 'treeline-shelter';
    case 'tundra-short-season':
      return 'tundra-short-season';
    case 'tundra-survey-slice':
      return 'tundra-survey';
    case 'scrub-edge-pattern':
      return 'scrub-edge-pattern';
    case 'forest-cool-edge':
      return 'forest-cool-edge';
    case 'treeline-low-fell':
      return 'treeline-low-fell';
    default:
      return null;
  }
}

function applyNotebookReadyState(
  routeState: FieldSeasonBoardState,
  save: SaveState,
): FieldSeasonBoardState {
  if (save.routeV2Progress?.status !== 'ready-to-synthesize') {
    return {
      ...routeState,
      notebookReady: null,
    };
  }

  const readyBeatId = getRouteBeatIdForRequest(save.routeV2Progress.requestId);
  if (!readyBeatId) {
    return {
      ...routeState,
      notebookReady: null,
    };
  }

  return {
    ...routeState,
    summary: 'Return to the field station and file this note before the next outing.',
    nextDirection: 'Next: return to the field station and file the notebook note.',
    targetBiomeId: null,
    beats: routeState.beats.map((beat) =>
      beat.id === readyBeatId
        ? {
            ...beat,
            status: 'ready',
          }
        : beat,
    ),
    notebookReady: {
      requestId: save.routeV2Progress.requestId,
      text: 'File the notebook note before the next outing.',
    },
    replayNote: null,
  };
}

function hasClaimedNurseryReward(save: SaveState, rewardId: string): boolean {
  return save.nurseryClaimedRewardIds.includes(rewardId);
}

function getReplayNote(
  routeState: Pick<FieldSeasonBoardState, 'routeId' | 'activeBeatId' | 'targetBiomeId' | 'complete'>,
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldSeasonBoardState['replayNote'] {
  if (routeState.complete || !routeState.targetBiomeId || !routeState.activeBeatId) {
    return null;
  }

  const targetBiome = biomes[routeState.targetBiomeId];
  if (!targetBiome) {
    return null;
  }

  const worldState = buildWorldState(save, routeState.targetBiomeId);
  const visitCount = save.biomeVisits[routeState.targetBiomeId] ?? 0;
  const activeProcessIds = new Set(
    getActiveHabitatProcessMoments(targetBiome, visitCount, worldState).map((moment) => moment.id),
  );

  switch (routeState.routeId) {
    case 'coastal-shelter-line':
      if (routeState.activeBeatId === 'forest-study') {
        if (activeProcessIds.has('moisture-hold')) {
          return {
            id: 'forest-moist-hollow',
            title: 'Moist Hollow',
            text: 'Mist and damp ground make the cool hollow clues stand out again.',
          };
        }

        if (worldState.dayPart === 'dawn') {
          return {
            id: 'forest-dawn-hollow',
            title: 'Dawn Hollow',
            text: 'Early light makes the sheltered hollow easier to read before the forest brightens.',
          };
        }
      }

      if (routeState.activeBeatId === 'coastal-comparison') {
        if (activeProcessIds.has('sand-capture')) {
          return {
            id: 'scrub-held-sand',
            title: 'Held Sand',
            text: 'Late trapped sand shows where steadier cover is starting to hold ground.',
          };
        }

        if (worldState.weather === 'marine-haze') {
          return {
            id: 'scrub-haze-shift',
            title: 'Haze Shift',
            text: 'Marine haze softens the dune face, so the shelter shift reads more clearly.',
          };
        }
      }

      return null;
    case 'treeline-shelter-line':
      if (routeState.activeBeatId === 'treeline-shelter') {
        if (activeProcessIds.has('frost-rime')) {
          return {
            id: 'treeline-rime-shelter',
            title: 'Rime Shelter',
            text: 'Wind-rimed ground makes the last sheltered treeline pockets easier to compare.',
          };
        }

        if (worldState.dayPart === 'dawn') {
          return {
            id: 'treeline-early-lee',
            title: 'Early Lee',
            text: 'Soft early light helps bent shelter shapes read first along the treeline.',
          };
        }
      }

      if (routeState.activeBeatId === 'tundra-short-season') {
        if (activeProcessIds.has('thaw-fringe')) {
          return {
            id: 'tundra-thaw-window',
            title: 'Thaw Window',
            text: 'Peak thaw makes the short bright season feel easiest to read today.',
          };
        }

        if (hasClaimedNurseryReward(save, 'nursery:mountain-avens-support')) {
          return {
            id: 'tundra-fell-bloom',
            title: 'Fell Bloom',
            text: 'The avens clue points back to open low ground holding brief bright color.',
          };
        }
      }

      if (routeState.activeBeatId === 'tundra-survey' && worldState.phenologyPhase === 'peak') {
        return {
          id: 'tundra-bright-survey',
          title: 'Bright Survey',
          text: 'This is a good outing to finish the inland line while the short-season ground is clearest.',
        };
      }

      return null;
    case 'edge-pattern-line':
      if (routeState.activeBeatId === 'scrub-edge-pattern') {
        if (activeProcessIds.has('sand-capture')) {
          return {
            id: 'edge-held-sand',
            title: 'Held Sand',
            text: 'Trapped sand shows where the pioneer side is giving way to steadier scrub cover.',
          };
        }

        if (worldState.weather === 'marine-haze') {
          return {
            id: 'edge-haze-edge',
            title: 'Haze Edge',
            text: 'Haze makes the shrub line feel steadier than the open dune face today.',
          };
        }

        if (hasClaimedNurseryReward(save, 'nursery:dune-lupine-support')) {
          return {
            id: 'edge-pioneer-clue',
            title: 'Pioneer Clue',
            text: 'Dune lupine still marks the more open side of the transition.',
          };
        }
      }

      if (routeState.activeBeatId === 'forest-cool-edge') {
        if (activeProcessIds.has('moisture-hold')) {
          return {
            id: 'edge-moist-edge',
            title: 'Moist Edge',
            text: 'Cool wet holdovers make the forest middle edge easiest to compare again.',
          };
        }

        if (hasClaimedNurseryReward(save, 'nursery:salmonberry-support')) {
          return {
            id: 'edge-wet-edge',
            title: 'Wet Edge',
            text: 'The salmonberry clue points at the denser, cooler side of the transition.',
          };
        }

        if (worldState.dayPart === 'dawn') {
          return {
            id: 'edge-cool-start',
            title: 'Cool Start',
            text: 'Early light keeps the forest edge contrast gentle and readable.',
          };
        }
      }

      if (routeState.activeBeatId === 'treeline-low-fell') {
        if (worldState.phenologyPhase === 'peak') {
          return {
            id: 'edge-brief-bloom',
            title: 'Brief Bloom',
            text: 'Peak avens bloom makes the low open fell easiest to spot today.',
          };
        }

        if (activeProcessIds.has('frost-rime')) {
          return {
            id: 'edge-low-rime',
            title: 'Low Rime',
            text: 'Late rime shows where tree-shaped shelter has dropped away into lower fell.',
          };
        }

        if (hasClaimedNurseryReward(save, 'nursery:mountain-avens-support')) {
          return {
            id: 'edge-fell-bloom-clue',
            title: 'Fell Bloom',
            text: 'The avens clue points back to the lower open ground at the end of the edge line.',
          };
        }
      }

      return null;
    default:
      return null;
  }
}

function applyReplayNote(
  routeState: FieldSeasonBoardState,
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldSeasonBoardState {
  const replayNote = getReplayNote(routeState, biomes, save);
  if (!replayNote || !routeState.activeBeatId) {
    return {
      ...routeState,
      replayNote,
    };
  }

  return {
    ...routeState,
    summary: replayNote.text,
    beats: routeState.beats.map((beat) =>
      beat.id === routeState.activeBeatId
        ? {
            ...beat,
            title: replayNote.title,
            detail: replayNote.text,
          }
        : beat,
    ),
    replayNote,
  };
}

function resolveCoastalFieldSeasonBoardState(save: SaveState): FieldSeasonBoardState {
  const forestSurveyLogged = hasCompletedRequest(save, 'forest-survey-slice');
  const forestBeatDone = forestSurveyLogged;
  const stationBeatDone = hasFieldUpgrade(save, 'trail-stride');
  const coastalBeatDone = hasCompletedRequest(save, 'coastal-edge-moisture');

  let activeAssigned = false;
  const beats: FieldSeasonBoardBeat[] = [
    {
      ...getForestStudyBeat(save, forestSurveyLogged),
      status: getBeatStatus(forestBeatDone, activeAssigned),
    },
    {
      ...getStationReturnBeat(save),
      status: getBeatStatus(stationBeatDone, activeAssigned || !forestBeatDone),
    },
    {
      ...getCoastalComparisonBeat(save),
      status: getBeatStatus(coastalBeatDone, activeAssigned || !forestBeatDone || !stationBeatDone),
    },
  ].map((beat) => {
    if (beat.status === 'active') {
      activeAssigned = true;
    }
    return beat;
  });

  const completedBeatCount = [forestBeatDone, stationBeatDone, coastalBeatDone].filter(Boolean).length;
  let summary = 'Beach start. Follow shelter inland.';
  let nextDirection = 'Next: travel to Forest Trail and find Hidden Hollow.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'forest';

  if (forestBeatDone && !stationBeatDone) {
    summary = 'Forest logged. Back to station.';
    nextDirection = 'Next: return to the field station and pick up Trail Stride.';
    targetBiomeId = null;
  } else if (forestBeatDone && stationBeatDone && !coastalBeatDone) {
    summary = 'Trail Stride opens scrub comparison.';
    nextDirection = 'Next: log Shelter Shift, then Edge Moisture in Coastal Scrub.';
    targetBiomeId = 'coastal-scrub';
  }

  return {
    routeId: 'coastal-shelter-line',
    routeTitle: 'COASTAL SHELTER LINE',
    branchLabel: 'Beach -> Coastal Scrub -> Forest',
    summary,
    progressLabel: `${completedBeatCount}/3 logged`,
    beats,
    activeBeatId: getActiveBeatId(beats),
    nextDirection,
    targetBiomeId,
    complete: false,
    notebookReady: null,
    replayNote: null,
  };
}

function resolveInlandFieldSeasonBoardState(save: SaveState): FieldSeasonBoardState {
  const treelineBeatDone = hasCompletedRequest(save, 'treeline-stone-shelter');
  const tundraBeatDone = hasCompletedRequest(save, 'tundra-short-season');
  const surveyBeatDone = hasCompletedRequest(save, 'tundra-survey-slice');

  let activeAssigned = false;
  const beats: FieldSeasonBoardBeat[] = [
    {
      ...getTreelineShelterBeat(save),
      status: getBeatStatus(treelineBeatDone, activeAssigned),
    },
    {
      ...getTundraShortSeasonBeat(save),
      status: getBeatStatus(tundraBeatDone, activeAssigned || !treelineBeatDone),
    },
    {
      ...getTundraSurveyBeat(save),
      status: getBeatStatus(surveyBeatDone, activeAssigned || !treelineBeatDone || !tundraBeatDone),
    },
  ].map((beat) => {
    if (beat.status === 'active') {
      activeAssigned = true;
    }
    return beat;
  });

  const completedBeatCount = [treelineBeatDone, tundraBeatDone, surveyBeatDone].filter(Boolean).length;
  const complete = surveyBeatDone;
  let summary = 'Leave canopy cover. Follow shelter and thaw into the inland exposure chapter.';
  let nextDirection =
    'Next: travel to Treeline Pass and match one stone break, one bent cover, and one lee-life clue.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'treeline';

  if (treelineBeatDone && !tundraBeatDone) {
    summary = 'Treeline shelter logged. Follow the thaw edge into the shorter season.';
    nextDirection =
      'Next: travel to Tundra Reach and match one first bloom, one wet tuft, and one brief-fruit clue.';
    targetBiomeId = 'tundra';
  } else if (treelineBeatDone && tundraBeatDone && !surveyBeatDone) {
    summary = 'Short-season clues logged. Finish with a tundra survey.';
    nextDirection = 'Next: bring Tundra Reach up to surveyed to log the inland line.';
    targetBiomeId = 'tundra';
  } else if (complete) {
    summary = 'Inland line logged. Next: deepen the alpine branch.';
    nextDirection = 'Next: keep following shelter and short-season contrasts across the inland branch.';
    targetBiomeId = null;
  }

  return {
    routeId: 'treeline-shelter-line',
    routeTitle: complete ? 'INLAND LINE LOGGED' : 'TREELINE SHELTER LINE',
    branchLabel: 'Forest -> Treeline -> Tundra',
    summary,
    progressLabel: complete ? 'ROUTE LOGGED' : `${completedBeatCount}/3 logged`,
    beats,
    activeBeatId: getActiveBeatId(beats),
    nextDirection,
    targetBiomeId,
    complete,
    notebookReady: null,
    replayNote: null,
  };
}

function resolveEdgePatternFieldSeasonBoardState(save: SaveState): FieldSeasonBoardState {
  const scrubBeatDone = hasCompletedRequest(save, 'scrub-edge-pattern');
  const forestBeatDone = hasCompletedRequest(save, 'forest-cool-edge');
  const treelineBeatDone = hasCompletedRequest(save, 'treeline-low-fell');
  const expeditionEvidenceCount = getExpeditionEvidenceCount(save);
  const expeditionNotebookReady = isExpeditionNotebookReady(save);
  const expeditionStarted = expeditionNotebookReady || expeditionEvidenceCount > 0;
  const expeditionLogged = hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID);
  const seasonThreadsLogged = hasCompletedRequest(save, 'forest-season-threads');

  let activeAssigned = false;
  const beats: FieldSeasonBoardBeat[] = [
    {
      ...getScrubEdgePatternBeat(save),
      status: getBeatStatus(scrubBeatDone, activeAssigned),
    },
    {
      ...getForestCoolEdgeBeat(save),
      status: getBeatStatus(forestBeatDone, activeAssigned || !scrubBeatDone),
    },
    {
      ...getTreelineLowFellBeat(save),
      status: getBeatStatus(treelineBeatDone, activeAssigned || !scrubBeatDone || !forestBeatDone),
    },
  ].map((beat) => {
    if (beat.status === 'active') {
      activeAssigned = true;
    }
    return beat;
  });

  const completedBeatCount = [scrubBeatDone, forestBeatDone, treelineBeatDone].filter(Boolean).length;
  const complete = treelineBeatDone;
  let summary = 'Follow the coast-to-forest transition from pioneer scrub into lower fell.';
  let nextDirection =
    'Next: travel to Coastal Scrub and match one clue from each stage of the edge pattern.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'coastal-scrub';

  if (scrubBeatDone && !forestBeatDone) {
    summary = 'Scrub pattern logged. Read the cooler forest side of the transition next.';
    nextDirection =
      'Next: travel to Forest Trail and match one edge carrier, one cool floor, and one wet shade clue.';
    targetBiomeId = 'forest';
  } else if (scrubBeatDone && forestBeatDone && !treelineBeatDone) {
    summary = 'Cool edge logged. Follow the line into the inland exposure roles.';
    nextDirection =
      'Next: travel to Treeline Pass and match one last tree shape, one low wood, and one fell-bloom clue.';
    targetBiomeId = 'treeline';
  } else if (complete) {
    if (seasonThreadsLogged) {
      summary = 'Season threads logged. Return to the field station for a calm season close.';
      nextDirection = 'Next: return to the field station for season close.';
    } else if (expeditionLogged) {
      summary = 'Root Hollow reconnects the season. Tie the threads together back in Forest Trail.';
      nextDirection = 'Next: return to Forest Trail and log Season Threads.';
    } else if (expeditionNotebookReady) {
      summary = 'Root Hollow is ready to file. Return to the field station and log the chapter.';
      nextDirection = 'Next: return to the field station and file the Root Hollow note.';
    } else if (expeditionEvidenceCount >= 3) {
      summary = 'Root Hollow is nearly filed. Carry the high run back into Log Run.';
      nextDirection = 'Next: follow the high return into Log Run.';
    } else if (expeditionEvidenceCount >= 2) {
      summary = 'Root Hollow is underway. Climb from the stone pocket toward the root-held return.';
      nextDirection = 'Next: climb through Root Hollow to the root-held return.';
    } else if (expeditionStarted) {
      summary = 'Root Hollow is underway. Drop below the climb and read the stone pocket.';
      nextDirection = 'Next: drop into the stone pocket below the climb.';
    } else {
      summary = 'Edge line logged. Next: open the Root Hollow expedition.';
      nextDirection = 'Next: open the Root Hollow expedition from the field station.';
    }
    targetBiomeId = null;
  }

  return {
    routeId: 'edge-pattern-line',
    routeTitle: complete ? 'EDGE LINE LOGGED' : 'EDGE PATTERN LINE',
    branchLabel: 'Coastal Scrub -> Forest -> Treeline',
    summary,
    progressLabel: complete ? 'ROUTE LOGGED' : `${completedBeatCount}/3 logged`,
    beats,
    activeBeatId: getActiveBeatId(beats),
    nextDirection,
    targetBiomeId,
    complete,
    notebookReady: null,
    replayNote: null,
  };
}

export function resolveFieldSeasonBoardState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldSeasonBoardState {
  if (hasCompletedRequest(save, 'tundra-survey-slice')) {
    return applyReplayNote(applyNotebookReadyState(resolveEdgePatternFieldSeasonBoardState(save), save), biomes, save);
  }

  const coastalBeatDone = hasCompletedRequest(save, 'coastal-edge-moisture');
  return coastalBeatDone
    ? applyReplayNote(applyNotebookReadyState(resolveInlandFieldSeasonBoardState(save), save), biomes, save)
    : applyReplayNote(applyNotebookReadyState(resolveCoastalFieldSeasonBoardState(save), save), biomes, save);
}

export function resolveFieldAtlasState(save: SaveState): FieldAtlasState | null {
  const loggedRoutes: string[] = [];

  if (hasCompletedRequest(save, 'coastal-edge-moisture')) {
    loggedRoutes.push('COASTAL SHELTER LINE logged');
  }

  if (hasCompletedRequest(save, 'tundra-survey-slice')) {
    loggedRoutes.push('TREELINE SHELTER LINE logged');
  }

  if (hasCompletedRequest(save, 'treeline-low-fell')) {
    loggedRoutes.push('EDGE PATTERN LINE logged');
  }

  if (!loggedRoutes.length) {
    return null;
  }

  return {
    title: 'FIELD ATLAS',
    loggedRoutes,
    note:
      hasCompletedRequest(save, 'treeline-low-fell')
        ? hasCompletedRequest(save, 'forest-season-threads')
          ? 'Next: file the season at the station.'
          : hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID)
            ? 'Next: tie coast and hollow in Forest Trail.'
            : isExpeditionNotebookReady(save)
              ? 'Next: file the Root Hollow note.'
            : getExpeditionEvidenceCount(save) >= 3
              ? 'Next: follow the Root Hollow high return.'
              : getExpeditionEvidenceCount(save) >= 2
                ? 'Next: climb toward the root-held return.'
                : getExpeditionEvidenceCount(save) >= 1
                  ? 'Next: drop into the stone pocket below.'
                : 'Next: open Root Hollow below the forest.'
        : hasCompletedRequest(save, 'tundra-survey-slice')
          ? 'Next: follow the low-fell edge line.'
          : loggedRoutes.length > 1
            ? 'Next: follow the inland shelter line.'
            : 'Next: follow the inland shelter line.',
  };
}

export function resolveFieldSeasonArchiveState(save: SaveState): FieldSeasonArchiveState | null {
  if (!hasCompletedRequest(save, 'forest-season-threads')) {
    return null;
  }

  return {
    label: 'SEASON ARCHIVE',
    text: hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID)
      ? 'Coast, ridge, and Root Hollow filed.'
      : 'Coast and ridge routes filed.',
  };
}

function getLoggedRouteCount(save: SaveState): number {
  return resolveFieldAtlasState(save)?.loggedRoutes.length ?? 0;
}

export function resolveNurseryCapstoneSupportHint(save: SaveState): string | null {
  if (!hasClaimedNurseryReward(save, 'nursery:salmonberry-support') || getLoggedRouteCount(save) < 3) {
    return null;
  }

  if (hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID) || hasCompletedRequest(save, 'forest-season-threads')) {
    return 'Salmonberry still marks the cooler forest return tying the season together.';
  }

  return 'Salmonberry still marks the cooler forest return near Root Hollow.';
}

function formatApproachCue(label: string | null): string | null {
  return label
    ? label
        .toLowerCase()
        .split(' ')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ')
    : null;
}

function resolveNextSeasonSetupTeaser(save: SaveState): FieldSeasonExpeditionTeaser {
  const nextSeasonApproach =
    formatApproachCue(getWorldMapLocationByBiomeId(ecoWorldMap, 'treeline').approachLabel ?? null) ??
    'High Pass';
  return hasCompletedRequest(save, 'forest-season-threads')
    ? {
        label: 'NEXT FIELD SEASON',
        text: `Take the ${nextSeasonApproach} next.`,
      }
    : {
        label: 'NEXT EXPEDITION',
        text: 'Another special outing can open here later.',
      };
}

export function resolveFieldSeasonExpeditionState(save: SaveState): FieldSeasonExpeditionState {
  const loggedRouteCount = getLoggedRouteCount(save);
  const expeditionLogged = hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID);
  const expeditionEvidenceCount = getExpeditionEvidenceCount(save);
  const expeditionNotebookReady = isExpeditionNotebookReady(save);
  const expeditionActive = expeditionLogged || expeditionNotebookReady || expeditionEvidenceCount > 0;

  let status: FieldSeasonExpeditionStatus = 'locked';
  if (expeditionLogged) {
    status = 'logged';
  } else if (expeditionActive) {
    status = 'active';
  } else if (loggedRouteCount >= 3) {
    status = 'ready';
  }

  switch (status) {
    case 'logged':
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status,
        statusLabel: 'LOGGED',
        summary: 'The forest chapter is filed from seep mark through the stone pocket and root-held return to the high run.',
        startText: 'Forest Trail to Root Hollow',
        note: 'Revisit for seep-mark, stone-pocket, root-held, and high-run clues.',
        teaser: resolveNextSeasonSetupTeaser(save),
      };
    case 'active':
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status,
        statusLabel: expeditionNotebookReady ? 'NOTE READY' : `${expeditionEvidenceCount}/${FOREST_EXPEDITION_EVIDENCE_TOTAL}`,
        summary:
          expeditionNotebookReady
            ? 'The chapter is ready to file from seep mark through the stone pocket and root-held return to the high run.'
            : expeditionEvidenceCount >= 3
              ? 'The seep mark, stone-pocket clue, and root-held clue are logged. One high-run clue still leads back into the open forest.'
              : expeditionEvidenceCount >= 2
                ? 'The seep mark and stone-pocket clue are logged. Climb toward the root-held return above the seep floor.'
                : 'The seep mark is logged. Drop into the stone pocket below the climb.',
        startText: 'Forest Trail to Root Hollow',
        note:
          expeditionNotebookReady
            ? 'Next: file the Root Hollow note at the field station.'
            : expeditionEvidenceCount >= 3
              ? 'Next: follow the high return into Log Run.'
              : expeditionEvidenceCount >= 2
                ? 'Next: climb through Root Hollow to the root-held return.'
                : 'Next: drop into the stone pocket below the climb.',
        teaser: null,
      };
    case 'ready':
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status,
        statusLabel: 'READY',
        summary: 'One deeper forest chapter is staged from seep mark through the stone pocket and root-held return to the high run.',
        startText: 'Forest Trail to Root Hollow',
        note: 'Start when you want a longer forest outing.',
        teaser: null,
      };
    default: {
      const remainingRoutes = Math.max(3 - loggedRouteCount, 1);
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status: 'locked',
        statusLabel: 'LOCKED',
        summary: 'A deeper forest outing opens after the season routes are logged.',
        startText: 'Forest Trail to Root Hollow',
        note: `${remainingRoutes} more route${remainingRoutes === 1 ? ' needs' : 's need'} logging first.`,
        teaser: null,
      };
    }
  }
}

function getTargetBiomeName(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
): string | null {
  return routeBoard.targetBiomeId ? biomes[routeBoard.targetBiomeId]?.name ?? null : null;
}

function getLastLoggedBeatTitle(routeBoard: FieldSeasonBoardState): string | null {
  return [...routeBoard.beats].reverse().find((beat) => beat.status === 'done')?.title ?? null;
}

function stripNextPrefix(text: string): string {
  return text.replace(/^Next:\s*/, '');
}

function capitalizeFirstLetter(text: string): string {
  return text.length ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
}

function resolveSupportAwareTodayWrap(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  selectedOutingSupportId: OutingSupportId,
): FieldSeasonWrapState | null {
  if (!routeBoard.targetBiomeId) {
    return null;
  }

  const activeBeat = routeBoard.beats.find((beat) => beat.status === 'active' || beat.status === 'ready') ?? null;
  const targetBiomeName = biomes[routeBoard.targetBiomeId]?.name ?? null;

  if (selectedOutingSupportId === 'hand-lens') {
    const text = routeBoard.replayNote?.text ?? activeBeat?.detail ?? null;
    return text
      ? {
          label: 'TODAY',
          text,
        }
      : null;
  }

  const text = routeBoard.replayNote
    ? targetBiomeName
      ? `${routeBoard.replayNote.title} is clear. Next: ${targetBiomeName}.`
      : `${routeBoard.replayNote.title} is clear today.`
    : capitalizeFirstLetter(stripNextPrefix(routeBoard.nextDirection));
  return {
    label: 'TODAY',
    text,
  };
}

export function resolveFieldSeasonWrapState(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  seasonNote: { title: string; text: string },
  atlas: FieldAtlasState | null,
  archive: FieldSeasonArchiveState | null = null,
  selectedOutingSupportId: OutingSupportId = 'hand-lens',
): FieldSeasonWrapState {
  const targetBiomeName = getTargetBiomeName(biomes, routeBoard);
  const atlasWrapText = atlas?.note?.replace(/^Next:\s*/, '');

  if (routeBoard.notebookReady) {
    return {
      label: 'NOTEBOOK READY',
      text: routeBoard.notebookReady.text,
    };
  }

  if (routeBoard.complete) {
    if (archive) {
      return archive;
    }

    return {
      label: 'ROUTE LOGGED',
      text: atlasWrapText
        ? `${atlasWrapText[0]?.toUpperCase() ?? ''}${atlasWrapText.slice(1)}`
        : 'Good stopping point. Rest here or tend the nursery.',
    };
  }

  if (!routeBoard.targetBiomeId) {
    return {
      label: seasonNote.title,
      text: seasonNote.text,
    };
  }

  const supportAwareWrap = resolveSupportAwareTodayWrap(
    biomes,
    routeBoard,
    selectedOutingSupportId,
  );
  if (supportAwareWrap) {
    return supportAwareWrap;
  }

  const lastLoggedBeatTitle = getLastLoggedBeatTitle(routeBoard);
  if (lastLoggedBeatTitle) {
    return {
      label: 'TODAY',
      text: targetBiomeName ? `${lastLoggedBeatTitle}. Next: ${targetBiomeName}.` : lastLoggedBeatTitle,
    };
  }

  return {
    label: 'NEXT OUTING',
    text: targetBiomeName ? `Start with ${targetBiomeName}.` : seasonNote.text,
  };
}

export function resolveFieldStationSubtitle(
  view: FieldStationView,
  seasonPage: FieldStationSeasonPage,
  seasonWrap: FieldSeasonWrapState,
): string {
  if (view === 'nursery') {
    return 'Nursery beds and quiet station care.';
  }

  if (seasonPage === 'expedition') {
    return 'Deeper forest chapter beyond the routes.';
  }

  return seasonWrap.label === 'SEASON ARCHIVE'
    ? 'This season is filed. Another field season can open here later.'
    : 'Route board and calm field support.';
}
