import { buildJournalBiomeProgress, getDiscoveredEntryIdsForBiome } from './journal';
import { getBiomeSurveyProgress, type BiomeSurveyState } from './progression';
import type { BiomeDefinition, SaveState } from './types';

type FieldRequestTrigger = 'zone' | 'inspect' | 'enter-biome';

interface FieldRequestDefinitionBase {
  id: string;
  biomeId: string;
  title: string;
  summary: string;
  unlockAfter?: string[];
}

interface EnterZoneFieldRequest extends FieldRequestDefinitionBase {
  type: 'enter-zone';
  zoneId: string;
  completionTriggers: ['zone'];
}

interface InspectEntriesFieldRequest extends FieldRequestDefinitionBase {
  type: 'inspect-entry-set';
  zoneId?: string;
  entryIds: string[];
  minimumCount: number;
  completionTriggers: ['inspect'];
}

interface SurveyBiomeFieldRequest extends FieldRequestDefinitionBase {
  type: 'survey-biome';
  requiredState: BiomeSurveyState;
  completionTriggers: ['inspect', 'enter-biome'];
}

interface ReachAreaFieldRequest extends FieldRequestDefinitionBase {
  type: 'reach-area';
  zoneId: string;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  progressLabel?: string;
  completionTriggers: ['zone'];
}

type FieldRequestDefinition =
  | EnterZoneFieldRequest
  | InspectEntriesFieldRequest
  | SurveyBiomeFieldRequest
  | ReachAreaFieldRequest;

export interface ActiveFieldRequest {
  id: string;
  biomeId: string;
  biomeName: string;
  title: string;
  summary: string;
  progressLabel: string;
}

interface FieldRequestContext {
  biomes: Record<string, BiomeDefinition>;
  save: SaveState;
  currentBiomeId: string;
  currentZoneId: string | null;
  currentPlayerX: number | null;
  currentPlayerY: number | null;
}

export const FIELD_REQUEST_DEFINITIONS: readonly FieldRequestDefinition[] = [
  {
    id: 'forest-hidden-hollow',
    biomeId: 'forest',
    title: 'Hidden Hollow',
    summary: 'Travel to Forest Trail and find the sheltered lower lane under the fallen logs.',
    type: 'enter-zone',
    zoneId: 'root-hollow',
    completionTriggers: ['zone'],
  },
  {
    id: 'forest-moisture-holders',
    biomeId: 'forest',
    title: 'Moisture Holders',
    summary: 'In Root Hollow, compare two damp-ground neighbors that help the floor stay cool and wet.',
    unlockAfter: ['forest-hidden-hollow'],
    type: 'inspect-entry-set',
    zoneId: 'root-hollow',
    entryIds: ['banana-slug', 'sword-fern', 'redwood-sorrel'],
    minimumCount: 2,
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-survey-slice',
    biomeId: 'forest',
    title: 'Forest Survey',
    summary: 'Bring Forest Trail up to surveyed by logging four clues across Root Hollow and Log Run.',
    unlockAfter: ['forest-moisture-holders'],
    type: 'survey-biome',
    requiredState: 'surveyed',
    completionTriggers: ['inspect', 'enter-biome'],
  },
  {
    id: 'coastal-shelter-shift',
    biomeId: 'coastal-scrub',
    title: 'Shelter Shift',
    summary: 'In Coastal Scrub, inspect two clues that show where the dunes start feeling more sheltered.',
    unlockAfter: ['forest-survey-slice'],
    type: 'inspect-entry-set',
    zoneId: 'back-dune',
    entryIds: ['beach-grass', 'sand-verbena', 'dune-lupine'],
    minimumCount: 2,
    completionTriggers: ['inspect'],
  },
  {
    id: 'coastal-edge-moisture',
    biomeId: 'coastal-scrub',
    title: 'Edge Moisture',
    summary: 'At the forest edge, inspect two clues that cooler, wetter ground is starting to build.',
    unlockAfter: ['coastal-shelter-shift'],
    type: 'inspect-entry-set',
    zoneId: 'forest-edge',
    entryIds: ['sword-fern', 'nurse-log', 'salmonberry'],
    minimumCount: 2,
    completionTriggers: ['inspect'],
  },
  {
    id: 'treeline-stone-shelter',
    biomeId: 'treeline',
    title: 'Stone Shelter',
    summary: 'In Treeline Pass, inspect two clues that show where stone or bent wood still breaks the wind.',
    unlockAfter: ['coastal-edge-moisture'],
    type: 'inspect-entry-set',
    zoneId: 'dwarf-shrub',
    entryIds: ['frost-heave-boulder', 'krummholz-spruce', 'hoary-marmot'],
    minimumCount: 2,
    completionTriggers: ['inspect'],
  },
  {
    id: 'tundra-short-season',
    biomeId: 'tundra',
    title: 'Short Season',
    summary: 'In Tundra Reach, inspect two clues that look ready for a very short bright season.',
    unlockAfter: ['treeline-stone-shelter'],
    type: 'inspect-entry-set',
    zoneId: 'snow-meadow',
    entryIds: ['purple-saxifrage', 'cottongrass', 'cloudberry'],
    minimumCount: 2,
    completionTriggers: ['inspect'],
  },
  {
    id: 'tundra-survey-slice',
    biomeId: 'tundra',
    title: 'Tundra Survey',
    summary: 'Bring Tundra Reach up to surveyed by logging four clues across Snow Meadow and Frost Ridge.',
    unlockAfter: ['tundra-short-season'],
    type: 'survey-biome',
    requiredState: 'surveyed',
    completionTriggers: ['inspect', 'enter-biome'],
  },
  {
    id: 'scrub-edge-pattern',
    biomeId: 'coastal-scrub',
    title: 'Scrub Pattern',
    summary: 'In Coastal Scrub, inspect three clues showing dune pioneers giving way to steadier scrub cover.',
    unlockAfter: ['tundra-survey-slice'],
    type: 'inspect-entry-set',
    entryIds: ['dune-lupine', 'pacific-wax-myrtle', 'salmonberry'],
    minimumCount: 3,
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-cool-edge',
    biomeId: 'forest',
    title: 'Cool Edge',
    summary: 'In Forest Trail, inspect three clues showing where cool cover still holds at the inland edge.',
    unlockAfter: ['scrub-edge-pattern'],
    type: 'inspect-entry-set',
    entryIds: ['salmonberry', 'sword-fern', 'redwood-sorrel'],
    minimumCount: 3,
    completionTriggers: ['inspect'],
  },
  {
    id: 'treeline-low-fell',
    biomeId: 'treeline',
    title: 'Low Fell',
    summary: 'In Treeline Pass, inspect three clues showing where tree cover gives way to lower open ground.',
    unlockAfter: ['forest-cool-edge'],
    type: 'inspect-entry-set',
    entryIds: ['krummholz-spruce', 'dwarf-birch', 'mountain-avens'],
    minimumCount: 3,
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-expedition-lower-hollow',
    biomeId: 'forest',
    title: 'Lower Hollow',
    summary: 'Travel to Forest Trail and drop into Root Hollow to start the longer expedition chapter.',
    unlockAfter: ['treeline-low-fell'],
    type: 'enter-zone',
    zoneId: 'root-hollow',
    completionTriggers: ['zone'],
  },
  {
    id: 'forest-expedition-trunk-climb',
    biomeId: 'forest',
    title: 'Trunk Climb',
    summary: 'From Root Hollow, use the forgiving trunks to reach the high shelf above the cave lane.',
    unlockAfter: ['forest-expedition-lower-hollow'],
    type: 'reach-area',
    zoneId: 'root-hollow',
    minX: 398,
    maxX: 430,
    maxY: 86,
    progressLabel: 'Reach High Shelf',
    completionTriggers: ['zone'],
  },
  {
    id: 'forest-expedition-upper-run',
    biomeId: 'forest',
    title: 'Upper Run',
    summary: 'Follow the high exit into Log Run so the expedition reconnects with the open forest route.',
    unlockAfter: ['forest-expedition-trunk-climb'],
    type: 'enter-zone',
    zoneId: 'log-run',
    completionTriggers: ['zone'],
  },
] as const;

function isUnlocked(definition: FieldRequestDefinition, completedIds: string[]): boolean {
  return (definition.unlockAfter ?? []).every((requestId) => completedIds.includes(requestId));
}

function dependsOnRequest(
  definitionId: string,
  targetRequestId: string,
  visited = new Set<string>(),
): boolean {
  if (visited.has(definitionId)) {
    return false;
  }

  visited.add(definitionId);
  const definition = FIELD_REQUEST_DEFINITIONS.find((candidate) => candidate.id === definitionId);
  if (!definition) {
    return false;
  }

  return (definition.unlockAfter ?? []).some(
    (requestId) =>
      requestId === targetRequestId || dependsOnRequest(requestId, targetRequestId, visited),
  );
}

function isEffectivelyCompleted(definition: FieldRequestDefinition, completedIds: string[]): boolean {
  return completedIds.includes(definition.id)
    || completedIds.some((completedId) => dependsOnRequest(completedId, definition.id));
}

function getBiomeProgressData(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  biomeId: string,
): {
  discoveredEntryIds: string[];
  surveyState: BiomeSurveyState;
} {
  const biome = biomes[biomeId];
  if (!biome) {
    return {
      discoveredEntryIds: [],
      surveyState: 'none',
    };
  }

  const discoveredEntryIds = getDiscoveredEntryIdsForBiome(biome, save.discoveredEntries);
  const journalProgress = buildJournalBiomeProgress(biomes, save.discoveredEntries);
  const surveyState = getBiomeSurveyProgress(journalProgress, biomeId)?.state ?? 'none';

  return {
    discoveredEntryIds,
    surveyState,
  };
}

function getZoneLabel(
  biomes: Record<string, BiomeDefinition>,
  biomeId: string,
  zoneId: string,
): string {
  return (
    biomes[biomeId]?.terrainRules.zones.find((zone) => zone.id === zoneId)?.label ?? zoneId
  );
}

function surveyStateSatisfies(current: BiomeSurveyState, required: BiomeSurveyState): boolean {
  const rank: Record<BiomeSurveyState, number> = {
    none: 0,
    surveyed: 1,
    complete: 2,
  };

  return rank[current] >= rank[required];
}

function getInspectMatchCount(definition: InspectEntriesFieldRequest, discoveredEntryIds: string[]): number {
  return definition.entryIds.filter((entryId) => discoveredEntryIds.includes(entryId)).length;
}

function isDefinitionComplete(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
  trigger: FieldRequestTrigger,
): boolean {
  if (!(definition.completionTriggers as readonly FieldRequestTrigger[]).includes(trigger)) {
    return false;
  }

  const progressData = getBiomeProgressData(context.biomes, context.save, definition.biomeId);

  switch (definition.type) {
    case 'enter-zone':
      return context.currentBiomeId === definition.biomeId && context.currentZoneId === definition.zoneId;
    case 'inspect-entry-set':
      return (
        context.currentBiomeId === definition.biomeId &&
        (!definition.zoneId || context.currentZoneId === definition.zoneId) &&
        getInspectMatchCount(definition, progressData.discoveredEntryIds) >= definition.minimumCount
      );
    case 'survey-biome':
      return surveyStateSatisfies(progressData.surveyState, definition.requiredState);
    case 'reach-area': {
      const matchesBiomeAndZone =
        context.currentBiomeId === definition.biomeId && context.currentZoneId === definition.zoneId;
      if (!matchesBiomeAndZone || context.currentPlayerX === null || context.currentPlayerY === null) {
        return false;
      }

      return (
        (definition.minX === undefined || context.currentPlayerX >= definition.minX) &&
        (definition.maxX === undefined || context.currentPlayerX <= definition.maxX) &&
        (definition.minY === undefined || context.currentPlayerY >= definition.minY) &&
        (definition.maxY === undefined || context.currentPlayerY <= definition.maxY)
      );
    }
    default:
      return false;
  }
}

function formatProgressLabel(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
): string {
  const progressData = getBiomeProgressData(context.biomes, context.save, definition.biomeId);
  const biomeName = context.biomes[definition.biomeId]?.name ?? 'Target Biome';
  const inTargetBiome = context.currentBiomeId === definition.biomeId;

  switch (definition.type) {
    case 'enter-zone': {
      const zoneLabel = getZoneLabel(context.biomes, definition.biomeId, definition.zoneId);
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      return context.currentZoneId === definition.zoneId
        ? 'FOUND'
        : `Visit ${zoneLabel}`;
    }
    case 'inspect-entry-set': {
      const matched = getInspectMatchCount(definition, progressData.discoveredEntryIds);
      const zoneLabel = definition.zoneId
        ? getZoneLabel(context.biomes, definition.biomeId, definition.zoneId)
        : null;
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      if (definition.zoneId && context.currentZoneId !== definition.zoneId) {
        return `Return To ${zoneLabel}`;
      }

      return `${Math.min(matched, definition.minimumCount)}/${definition.minimumCount} signs`;
    }
    case 'survey-biome': {
      if (surveyStateSatisfies(progressData.surveyState, definition.requiredState)) {
        return 'SURVEYED';
      }

      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      return `${Math.min(progressData.discoveredEntryIds.length, 4)}/4 clues`;
    }
    case 'reach-area': {
      const zoneLabel = getZoneLabel(context.biomes, definition.biomeId, definition.zoneId);
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      if (context.currentZoneId !== definition.zoneId) {
        return `Return To ${zoneLabel}`;
      }

      return definition.progressLabel ?? 'Reach Marker';
    }
    default:
      return '';
  }
}

export function resolveActiveFieldRequest(
  context: FieldRequestContext,
): ActiveFieldRequest | null {
  for (const definition of FIELD_REQUEST_DEFINITIONS) {
    if (isEffectivelyCompleted(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    if (!isUnlocked(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    const biome = context.biomes[definition.biomeId];
    if (!biome) {
      continue;
    }

    return {
      id: definition.id,
      biomeId: definition.biomeId,
      biomeName: biome.name,
      title: definition.title,
      summary: definition.summary,
      progressLabel: formatProgressLabel(definition, context),
    };
  }

  return null;
}

export function shouldCompleteActiveFieldRequest(
  context: FieldRequestContext,
  trigger: FieldRequestTrigger,
): string | null {
  for (const definition of FIELD_REQUEST_DEFINITIONS) {
    if (isEffectivelyCompleted(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    if (!isUnlocked(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    return isDefinitionComplete(definition, context, trigger) ? definition.id : null;
  }

  return null;
}
