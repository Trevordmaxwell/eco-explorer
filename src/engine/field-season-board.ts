import { getActiveHabitatProcessMoments } from './habitat-process';
import { hasFieldUpgrade } from './field-station';
import { buildWorldState } from './world-state';
import type { BiomeDefinition, SaveState } from './types';

export type FieldSeasonBoardBeatStatus = 'done' | 'active' | 'upcoming';

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

export type FieldSeasonExpeditionStatus = 'locked' | 'ready' | 'active' | 'logged';

export interface FieldSeasonExpeditionState {
  id: 'root-hollow-expedition';
  title: string;
  status: FieldSeasonExpeditionStatus;
  statusLabel: string;
  summary: string;
  startText: string;
  note: string;
}

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return save.completedFieldRequestIds.includes(requestId);
}

function getForestStudyBeat(save: SaveState, forestSurveyLogged: boolean): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'forest-hidden-hollow')) {
    return {
      id: 'forest-study',
      title: 'Forest Hollow',
      detail: 'Find Hidden Hollow and start the sheltered forest notes.',
    };
  }

  if (!hasCompletedRequest(save, 'forest-moisture-holders')) {
    return {
      id: 'forest-study',
      title: 'Forest Hollow',
      detail: 'Compare two damp-ground neighbors in Root Hollow.',
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
      detail: 'In Treeline Pass, log two clues that show where shelter still holds.',
    };
  }

  return {
    id: 'treeline-shelter',
    title: 'Treeline Shelter Logged',
    detail: 'Stone, bent wood, and low shelter now read as one inland turn.',
  };
}

function getTundraShortSeasonBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'tundra-short-season')) {
    return {
      id: 'tundra-short-season',
      title: 'Short Season',
      detail: 'In Tundra Reach, log two clues that look ready for a very short bright season.',
    };
  }

  return {
    id: 'tundra-short-season',
    title: 'Short Season Logged',
    detail: 'The tundra line now reads through low growth, thaw, and fast summer timing.',
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
      detail: 'In Coastal Scrub, log three clues that show open dune pioneers giving way to steadier scrub cover.',
    };
  }

  return {
    id: 'scrub-edge-pattern',
    title: 'Scrub Pattern Logged',
    detail: 'Open dune pioneers and thicker scrub now read like one clear transition.',
  };
}

function getForestCoolEdgeBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'forest-cool-edge')) {
    return {
      id: 'forest-cool-edge',
      title: 'Cool Edge',
      detail: 'In Forest Trail, log three clues that show where cool wet cover still holds before the inland branch opens.',
    };
  }

  return {
    id: 'forest-cool-edge',
    title: 'Cool Edge Logged',
    detail: 'Forest cover now reads as a cooler middle edge between scrub and fell.',
  };
}

function getTreelineLowFellBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'treeline-low-fell')) {
    return {
      id: 'treeline-low-fell',
      title: 'Low Fell',
      detail: 'In Treeline Pass, log three clues that show where tree-shaped cover gives way to lower open ground.',
    };
  }

  return {
    id: 'treeline-low-fell',
    title: 'Edge Line Logged',
    detail: 'Scrub, forest, and treeline now hold together as one transition-pattern route.',
  };
}

function getActiveBeatId(beats: FieldSeasonBoardBeat[]): FieldSeasonBoardBeat['id'] | null {
  return beats.find((beat) => beat.status === 'active')?.id ?? null;
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
  let summary = 'Leave canopy cover. Follow shelter into shorter season.';
  let nextDirection = 'Next: travel to Treeline Pass and log two shelter clues.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'treeline';

  if (treelineBeatDone && !tundraBeatDone) {
    summary = 'Treeline shelter logged. Follow the shorter season north.';
    nextDirection = 'Next: travel to Tundra Reach and log two short-season clues.';
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
    replayNote: null,
  };
}

function resolveEdgePatternFieldSeasonBoardState(save: SaveState): FieldSeasonBoardState {
  const scrubBeatDone = hasCompletedRequest(save, 'scrub-edge-pattern');
  const forestBeatDone = hasCompletedRequest(save, 'forest-cool-edge');
  const treelineBeatDone = hasCompletedRequest(save, 'treeline-low-fell');

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
  let summary = 'Follow transition patterns from scrub shelter to low fell.';
  let nextDirection = 'Next: travel to Coastal Scrub and log three clues along the edge pattern.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'coastal-scrub';

  if (scrubBeatDone && !forestBeatDone) {
    summary = 'Scrub pattern logged. Follow the cool edge into forest.';
    nextDirection = 'Next: travel to Forest Trail and log three clues that show cool wet cover still holding.';
    targetBiomeId = 'forest';
  } else if (scrubBeatDone && forestBeatDone && !treelineBeatDone) {
    summary = 'Cool edge logged. Follow the line into low fell.';
    nextDirection = 'Next: travel to Treeline Pass and log three clues that show cover dropping lower.';
    targetBiomeId = 'treeline';
  } else if (complete) {
    summary = 'Edge line logged. Next: keep comparing the quiet middle links.';
    nextDirection = 'Next: keep following the clues where one habitat gives way to the next.';
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
    replayNote: null,
  };
}

export function resolveFieldSeasonBoardState(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldSeasonBoardState {
  if (hasCompletedRequest(save, 'tundra-survey-slice')) {
    return applyReplayNote(resolveEdgePatternFieldSeasonBoardState(save), biomes, save);
  }

  const coastalBeatDone = hasCompletedRequest(save, 'coastal-edge-moisture');
  return coastalBeatDone
    ? applyReplayNote(resolveInlandFieldSeasonBoardState(save), biomes, save)
    : applyReplayNote(resolveCoastalFieldSeasonBoardState(save), biomes, save);
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
        ? hasCompletedRequest(save, 'forest-expedition-upper-run')
          ? 'Next: keep comparing the quiet middle links.'
          : hasCompletedRequest(save, 'forest-expedition-trunk-climb')
            ? 'Next: follow the Root Hollow upper run.'
            : hasCompletedRequest(save, 'forest-expedition-lower-hollow')
              ? 'Next: keep climbing through Root Hollow.'
              : 'Next: open the Root Hollow expedition.'
        : hasCompletedRequest(save, 'tundra-survey-slice')
          ? 'Next: follow the edge pattern line.'
          : loggedRoutes.length > 1
            ? 'Next: follow the quiet inland links between routes.'
            : 'Next: keep following the inland line.',
  };
}

const FOREST_EXPEDITION_LEG_IDS = [
  'forest-expedition-lower-hollow',
  'forest-expedition-trunk-climb',
  'forest-expedition-upper-run',
] as const;

function getLoggedRouteCount(save: SaveState): number {
  return resolveFieldAtlasState(save)?.loggedRoutes.length ?? 0;
}

function getCompletedExpeditionLegCount(save: SaveState): number {
  return FOREST_EXPEDITION_LEG_IDS.filter((requestId) => hasCompletedRequest(save, requestId)).length;
}

export function resolveFieldSeasonExpeditionState(save: SaveState): FieldSeasonExpeditionState {
  const loggedRouteCount = getLoggedRouteCount(save);
  const expeditionLogged = hasCompletedRequest(save, 'forest-expedition-upper-run');
  const expeditionActive = expeditionLogged || FOREST_EXPEDITION_LEG_IDS.some((requestId) => hasCompletedRequest(save, requestId));
  const completedLegCount = getCompletedExpeditionLegCount(save);

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
        summary: 'The deeper forest chapter is logged as one calm outing through hollow, climb, and upper run.',
        startText: 'Forest Trail to Root Hollow',
        note: 'Revisit for moisture, shelter, and height clues.',
      };
    case 'active':
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status,
        statusLabel: `${completedLegCount}/3`,
        summary:
          completedLegCount >= 2
            ? 'The hollow and climb legs are logged. One upper-run finish still leads back into the open forest.'
            : 'The lower hollow leg is logged. The climb now leads toward the high shelf above the cave lane.',
        startText: 'Forest Trail to Root Hollow',
        note:
          completedLegCount >= 2
            ? 'Next: follow the high exit into Log Run.'
            : 'Next: climb the forgiving trunks to the high shelf.',
      };
    case 'ready':
      return {
        id: 'root-hollow-expedition',
        title: 'ROOT HOLLOW',
        status,
        statusLabel: 'READY',
        summary: 'One deeper forest outing is staged through lower hollow, trunk climb, and upper run.',
        startText: 'Forest Trail to Root Hollow',
        note: 'Start when you want a longer forest outing.',
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

export function resolveFieldSeasonWrapState(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  seasonNote: { title: string; text: string },
  atlas: FieldAtlasState | null,
): FieldSeasonWrapState {
  const targetBiomeName = getTargetBiomeName(biomes, routeBoard);
  const atlasWrapText = atlas?.note?.replace(/^Next:\s*/, '');

  if (routeBoard.complete) {
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

  if (routeBoard.replayNote) {
    return {
      label: 'TODAY',
      text: targetBiomeName
        ? `${routeBoard.replayNote.title} is clear. Next: ${targetBiomeName}.`
        : `${routeBoard.replayNote.title} is clear today.`,
    };
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
