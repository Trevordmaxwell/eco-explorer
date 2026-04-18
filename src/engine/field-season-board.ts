import { ecoWorldMap } from '../content/world-map';
import {
  getFieldRequestDefinition,
  hasResolvedFieldRequest,
  resolveRouteV2FiledDisplayText,
} from './field-requests';
import { getActiveHabitatProcessMoments } from './habitat-process';
import {
  HIGH_PASS_CHAPTER_TARGET_BIOME_ID,
  resolveHighPassChapterState,
} from './high-pass-chapter-state';
import { hasFieldUpgrade } from './field-station';
import { getWorldMapLocationByBiomeId } from './world-map';
import { buildWorldState } from './world-state';
import type {
  BiomeDefinition,
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

export interface FieldSeasonBoardLaunchCard {
  title: string;
  progressLabel: string;
  summary: string;
  detail?: string;
}

export interface FieldSeasonBoardState {
  routeId: 'coastal-shelter-line' | 'treeline-shelter-line' | 'edge-pattern-line';
  routeTitle: string;
  branchLabel: string;
  summary: string;
  progressLabel: string;
  beats: FieldSeasonBoardBeat[];
  launchCard: FieldSeasonBoardLaunchCard | null;
  activeBeatId: FieldSeasonBoardBeat['id'] | null;
  nextDirection: string;
  targetBiomeId: 'beach' | 'forest' | 'coastal-scrub' | 'treeline' | 'tundra' | null;
  complete: boolean;
  notebookReady: {
    requestId: string;
    text: string;
    previewLabel: string | null;
    previewText: string | null;
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

export interface ActiveOutingLocator {
  title: string;
  summary: string;
  progressLabel: string;
  targetBiomeId: Exclude<FieldSeasonBoardState['targetBiomeId'], null>;
  worldMapLabel: string;
  routeBoardSummary: string;
  routeBoardNextDirection: string;
  atlasNote: string;
}

export interface NextSeasonContinuityCopy {
  routesSubtitle: string;
  archiveText: string;
  expeditionTeaser: string;
}

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return hasResolvedFieldRequest(save, requestId);
}

const FOREST_EXPEDITION_CHAPTER_REQUEST_ID = 'forest-expedition-upper-run';
const FOREST_EXPEDITION_EVIDENCE_TOTAL = 4;
const NEXT_FIELD_SEASON_TARGET_BIOME_ID = HIGH_PASS_CHAPTER_TARGET_BIOME_ID;

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

export function resolveNextFieldSeasonTargetBiomeId(
  save: SaveState,
): typeof NEXT_FIELD_SEASON_TARGET_BIOME_ID | null {
  return hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID)
    && hasCompletedRequest(save, 'forest-season-threads')
    ? NEXT_FIELD_SEASON_TARGET_BIOME_ID
    : null;
}

export function resolveSeasonOutingLocator(save: SaveState): ActiveOutingLocator | null {
  const highPassChapterState = resolveHighPassChapterState(save);
  if (highPassChapterState) {
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

export function resolveNextSeasonContinuityCopy(save: SaveState): NextSeasonContinuityCopy | null {
  const highPassChapterState = resolveHighPassChapterState(save);
  if (!highPassChapterState) {
    return null;
  }

  return {
    routesSubtitle: highPassChapterState.routesSubtitle,
    archiveText: highPassChapterState.archiveText,
    expeditionTeaser: highPassChapterState.expeditionTeaser,
  };
}

export function resolveNextSeasonApproachLine(save: SaveState): string | null {
  return resolveHighPassChapterState(save)?.routesSubtitle ?? null;
}

function resolveFiledSeasonLaunchCard(save: SaveState): FieldSeasonBoardLaunchCard | null {
  const highPassChapterState = resolveHighPassChapterState(save);
  if (!highPassChapterState) {
    return null;
  }

  return {
    title: highPassChapterState.cardTitle,
    progressLabel: highPassChapterState.progressLabel,
    summary: highPassChapterState.cardSummary,
  };
}

function getForestStudyBeat(save: SaveState, forestSurveyLogged: boolean): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'beach-shore-shelter')) {
    return {
      id: 'forest-study',
      title: 'Shore Shelter',
      detail: 'Log dune grass, then lee cover, then wrack line from Dune Edge to Tide Line.',
    };
  }

  if (!hasCompletedRequest(save, 'forest-hidden-hollow')) {
    return {
      id: 'forest-study',
      title: 'Hidden Hollow',
      detail: 'Follow shelter inland and confirm the seep stone in the lower hollow.',
    };
  }

  if (!hasCompletedRequest(save, 'forest-moisture-holders')) {
    return {
      id: 'forest-study',
      title: 'Moisture Holders',
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
      title: 'Open To Shelter',
      detail: 'Walk open bloom, shore pine, and edge log in order through the scrub-to-woods shelter change.',
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
      title: 'Stone Shelter',
      detail:
        'Start in Krummholz Belt with bent cover, then read stone break and lee life in the lee pocket.',
    };
  }

  return {
    id: 'treeline-shelter',
    title: 'Stone Shelter Logged',
    detail: 'Bent cover, stone break, and lee life now read as one last sheltered treeline pocket.',
  };
}

function getTundraShortSeasonBeat(save: SaveState): Omit<FieldSeasonBoardBeat, 'status'> {
  if (!hasCompletedRequest(save, 'tundra-short-season')) {
    return {
      id: 'tundra-short-season',
      title: 'Thaw Window',
      detail: 'Start in Snow Meadow with first bloom, drop to Thaw Skirt for wet tuft, then carry brief fruit back upslope.',
    };
  }

  return {
    id: 'tundra-short-season',
    title: 'Thaw Window Logged',
    detail: 'First bloom, wet tuft, and brief fruit now read as one short thaw-window run.',
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
      detail: 'Walk Back Dune, Windbreak Swale, and Forest Edge in order, filing one clue from each stage.',
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
      detail:
        'Log the last tree shape at Krummholz Belt, then low wood in Dwarf Shrub, then fell bloom and low rest in Lichen Fell.',
    };
  }

  return {
    id: 'treeline-low-fell',
    title: 'Edge Line Logged',
    detail: 'Last tree shape, low wood, fell bloom, and low rest now trace one full drop out of treeline shelter.',
  };
}

function getActiveBeatId(beats: FieldSeasonBoardBeat[]): FieldSeasonBoardBeat['id'] | null {
  return beats.find((beat) => beat.status === 'active' || beat.status === 'ready')?.id ?? null;
}

function getRouteBeatIdForRequest(
  requestId: string,
): FieldSeasonBoardBeat['id'] | null {
  switch (requestId) {
    case 'beach-shore-shelter':
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
  biomes: Record<string, BiomeDefinition>,
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

  const readyDefinition = getFieldRequestDefinition(save.routeV2Progress.requestId);
  const readyText =
    readyDefinition && 'routeV2Note' in readyDefinition
      ? readyDefinition.routeV2Note.readyText
      : 'Return to the field station and file this note before the next outing.';
  const previewText =
    readyDefinition && 'routeV2Note' in readyDefinition
      ? resolveRouteV2FiledDisplayText(biomes, save, save.routeV2Progress.requestId)
      : null;

  return {
    ...routeState,
    summary: readyText,
    nextDirection: `Next: ${lowercaseFirstLetter(readyText)}`,
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
      text: readyText,
      previewLabel: readyDefinition?.title.toUpperCase() ?? null,
      previewText,
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
        if (!hasCompletedRequest(save, 'beach-shore-shelter')) {
          if (activeProcessIds.has('wrack-hold')) {
            return {
              id: 'beach-wrack-shelter',
              title: 'Wrack Shelter',
              text: 'Fresh wrack makes the beach shelter line easier to follow today.',
            };
          }

          if (worldState.dayPart === 'dawn') {
            return {
              id: 'beach-early-shelter',
              title: 'Early Shelter',
              text: 'Early light makes the dune-to-wrack shelter line easier to read.',
            };
          }

          return null;
        }

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
            text: 'Marine haze softens the dune face, so the open-to-shelter line reads more clearly.',
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
            text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
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
            text: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
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
  const beachBeatDone = hasCompletedRequest(save, 'beach-shore-shelter');
  const hiddenHollowDone = hasCompletedRequest(save, 'forest-hidden-hollow');
  const moistureHoldersDone = hasCompletedRequest(save, 'forest-moisture-holders');
  const forestSurveyLogged = hasCompletedRequest(save, 'forest-survey-slice');
  const forestBeatDone = forestSurveyLogged;
  const stationBeatDone = hasFieldUpgrade(save, 'trail-stride');
  const shelterShiftLogged = hasCompletedRequest(save, 'coastal-shelter-shift');
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
  let summary = 'Shore Shelter starts at Sunny Beach.';
  let nextDirection =
    'Next: stay on Sunny Beach and start Shore Shelter with dune grass, then lee cover, then wrack line.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'beach';

  if (beachBeatDone && !hiddenHollowDone) {
    summary = 'Shore Shelter logged. Hidden Hollow carries shelter inland.';
    nextDirection = 'Next: travel inland to Forest Trail and find Hidden Hollow.';
    targetBiomeId = 'forest';
  } else if (hiddenHollowDone && !moistureHoldersDone) {
    summary = 'Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.';
    nextDirection =
      'Next: stay in Forest Trail and match the shelter, ground, and living clues for Moisture Holders.';
    targetBiomeId = 'forest';
  } else if (moistureHoldersDone && !forestBeatDone) {
    summary = 'Moisture Holders logged. Forest Survey closes the forest study in Forest Trail.';
    nextDirection = 'Next: stay in Forest Trail and finish Forest Survey before returning to the station.';
    targetBiomeId = 'forest';
  } else if (forestBeatDone && !stationBeatDone) {
    summary = 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Return to station.';
    nextDirection = 'Next: return to the field station for Trail Stride.';
    targetBiomeId = null;
  } else if (forestBeatDone && stationBeatDone && !shelterShiftLogged) {
    summary = 'Open To Shelter carries the coast-to-forest shelter line through Coastal Scrub.';
    nextDirection =
      'Next: travel to Coastal Scrub and start Open To Shelter with open bloom, then shore pine, then edge log.';
    targetBiomeId = 'coastal-scrub';
  } else if (forestBeatDone && stationBeatDone && shelterShiftLogged && !coastalBeatDone) {
    summary = 'Open To Shelter logged. Edge Moisture checks the cooler forest edge next.';
    nextDirection = 'Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.';
    targetBiomeId = 'coastal-scrub';
  }

  return {
    routeId: 'coastal-shelter-line',
    routeTitle: 'COASTAL SHELTER LINE',
    branchLabel: 'Beach -> Coastal Scrub -> Forest',
    summary,
    progressLabel: `${completedBeatCount}/3 logged`,
    beats,
    launchCard: null,
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
  let summary = 'Stone Shelter starts at Treeline Pass.';
  let nextDirection =
    'Next: travel to Treeline Pass and read Stone Shelter through bent cover, stone break, and lee life.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'treeline';

  if (treelineBeatDone && !tundraBeatDone) {
    summary = 'Stone Shelter logged. Thaw Window opens in Tundra Reach.';
    nextDirection =
      'Next: travel to Tundra Reach and follow Thaw Window from first bloom to brief fruit.';
    targetBiomeId = 'tundra';
  } else if (treelineBeatDone && tundraBeatDone && !surveyBeatDone) {
    summary = 'Thaw Window logged. Tundra Survey closes the inland chapter in Tundra Reach.';
    nextDirection =
      'Next: stay in Tundra Reach and finish Tundra Survey before the route turns back downslope.';
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
    launchCard: null,
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
  let summary = 'Walk the coast-to-forest transect from pioneer scrub into lower fell.';
  let nextDirection =
    'Next: travel to Coastal Scrub and walk Back Dune -> Windbreak Swale -> Forest Edge.';
  let targetBiomeId: FieldSeasonBoardState['targetBiomeId'] = 'coastal-scrub';
  let launchCard: FieldSeasonBoardLaunchCard | null = null;

  if (scrubBeatDone && !forestBeatDone) {
    summary = 'Scrub pattern logged. Read the cooler forest side of the transition next.';
    nextDirection =
      'Next: travel to Forest Trail and match one edge carrier, one cool floor, and one wet shade clue.';
    targetBiomeId = 'forest';
  } else if (scrubBeatDone && forestBeatDone && !treelineBeatDone) {
    summary = 'Cool edge logged. Follow the four-part drop out of treeline shelter into open fell.';
    nextDirection =
      'Next: travel to Treeline Pass and log the last tree shape, then low wood, then fell bloom, then low rest.';
    targetBiomeId = 'treeline';
  } else if (complete) {
    const locator = resolveSeasonOutingLocator(save);
    if (locator) {
      summary = locator.routeBoardSummary;
      nextDirection = locator.routeBoardNextDirection;
      targetBiomeId = locator.targetBiomeId;
      launchCard = resolveFiledSeasonLaunchCard(save);
    } else if (seasonThreadsLogged) {
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
  }

  return {
    routeId: 'edge-pattern-line',
    routeTitle: complete ? 'EDGE LINE LOGGED' : 'EDGE PATTERN LINE',
    branchLabel: 'Coastal Scrub -> Forest -> Treeline',
    summary,
    progressLabel: complete ? 'ROUTE LOGGED' : `${completedBeatCount}/3 logged`,
    beats,
    launchCard,
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
    return applyReplayNote(
      applyNotebookReadyState(biomes, resolveEdgePatternFieldSeasonBoardState(save), save),
      biomes,
      save,
    );
  }

  const coastalBeatDone = hasCompletedRequest(save, 'coastal-edge-moisture');
  return coastalBeatDone
    ? applyReplayNote(
        applyNotebookReadyState(biomes, resolveInlandFieldSeasonBoardState(save), save),
        biomes,
        save,
      )
    : applyReplayNote(
        applyNotebookReadyState(biomes, resolveCoastalFieldSeasonBoardState(save), save),
        biomes,
        save,
      );
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

  const activeOuting = resolveSeasonOutingLocator(save);
  const highPassChapterState = resolveHighPassChapterState(save);
  const expeditionEvidenceCount = getExpeditionEvidenceCount(save);
  const expeditionNotebookReady = isExpeditionNotebookReady(save);
  const expeditionLogged = hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID);

  let note: string;
  if (highPassChapterState && !highPassChapterState.dormantUntilSeasonCloseClears) {
    note = highPassChapterState.liveAtlasNote;
  } else if (highPassChapterState || expeditionLogged || expeditionNotebookReady || expeditionEvidenceCount > 0) {
    note = activeOuting?.atlasNote ?? 'Next: open Root Hollow below the forest.';
  } else if (hasCompletedRequest(save, 'treeline-low-fell')) {
    note = 'Coast, ridge, edge filed. Root Hollow next.';
  } else if (hasCompletedRequest(save, 'tundra-survey-slice')) {
    note = 'Coast and ridge filed. Low-fell edge next.';
  } else {
    note = 'Coast filed. Inland shelter next.';
  }

  return {
    title: 'FIELD ATLAS',
    loggedRoutes,
    note,
  };
}

export function resolveFieldSeasonArchiveState(save: SaveState): FieldSeasonArchiveState | null {
  if (!hasCompletedRequest(save, 'forest-season-threads')) {
    return null;
  }

  const continuityCopy = resolveNextSeasonContinuityCopy(save);

  return {
    label: 'SEASON ARCHIVE',
    text: hasCompletedRequest(save, FOREST_EXPEDITION_CHAPTER_REQUEST_ID)
      ? continuityCopy?.archiveText ?? 'Coast, ridge, and Root Hollow filed.'
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
  const continuityCopy = resolveNextSeasonContinuityCopy(save);
  const nextSeasonLocation = getWorldMapLocationByBiomeId(
    ecoWorldMap,
    resolveNextFieldSeasonTargetBiomeId(save) ?? NEXT_FIELD_SEASON_TARGET_BIOME_ID,
  );
  const nextSeasonApproach = formatApproachCue(nextSeasonLocation.approachLabel ?? null) ?? 'High Pass';
  return hasCompletedRequest(save, 'forest-season-threads')
    ? {
        label: 'NEXT FIELD SEASON',
        text: continuityCopy?.expeditionTeaser ?? `${nextSeasonApproach} waits beyond Root Hollow.`,
      }
    : {
        label: 'NEXT EXPEDITION',
        text: `${nextSeasonLocation.label} waits beyond Root Hollow.`,
      };
}

export function resolveFieldSeasonExpeditionState(save: SaveState): FieldSeasonExpeditionState {
  const loggedRouteCount = getLoggedRouteCount(save);
  const highPassChapterState = resolveHighPassChapterState(save);
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
      if (highPassChapterState) {
        return {
          id: 'root-hollow-expedition',
          title: highPassChapterState.cardTitle,
          status,
          statusLabel: highPassChapterState.cardStatusLabel,
          summary: highPassChapterState.cardSummary,
          startText: highPassChapterState.cardStartText,
          note: highPassChapterState.cardNote,
          teaser: null,
        };
      }
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

function capitalizeFirstLetter(text: string): string {
  return text.length ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
}

function lowercaseFirstLetter(text: string): string {
  return text.length ? `${text[0].toLowerCase()}${text.slice(1)}` : text;
}
