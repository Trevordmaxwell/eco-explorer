import { hasResolvedFieldRequest } from './field-requests';
import { getActiveHabitatProcessMoments } from './habitat-process';
import type { BiomeDefinition, SaveState } from './types';
import { buildWorldState } from './world-state';

export interface FieldSeasonRouteReplayNote {
  id: string;
  title: string;
  text: string;
}

interface FieldSeasonReplayBeat {
  id: string;
  title: string;
  detail: string;
}

export interface FieldSeasonReplayRouteState {
  routeId: 'coastal-shelter-line' | 'treeline-shelter-line' | 'edge-pattern-line' | 'source-to-shore-beta';
  summary: string;
  beats: FieldSeasonReplayBeat[];
  activeBeatId: string | null;
  targetBiomeId: string | null;
  complete: boolean;
  replayNote: FieldSeasonRouteReplayNote | null;
}

function hasCompletedRequest(save: SaveState, requestId: string): boolean {
  return hasResolvedFieldRequest(save, requestId);
}

function hasClaimedNurseryReward(save: SaveState, rewardId: string): boolean {
  return save.nurseryClaimedRewardIds.includes(rewardId);
}

export function resolveFieldSeasonReplayNote(
  routeState: Pick<FieldSeasonReplayRouteState, 'routeId' | 'activeBeatId' | 'targetBiomeId' | 'complete'>,
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldSeasonRouteReplayNote | null {
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
    case 'source-to-shore-beta':
      return null;
  }
}

export function applyFieldSeasonReplayNote<T extends FieldSeasonReplayRouteState>(
  routeState: T,
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): T {
  const replayNote = resolveFieldSeasonReplayNote(routeState, biomes, save);
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
