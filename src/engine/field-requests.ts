import { buildJournalBiomeProgress, getDiscoveredEntryIdsForBiome } from './journal';
import { getBiomeSurveyProgress, type BiomeSurveyState } from './progression';
import { recordCompletedFieldRequest, resolveSelectedOutingSupportId } from './save';
import type {
  BiomeDefinition,
  OutingSupportId,
  RouteV2EvidenceSlotProgress,
  RouteV2ProgressStatus,
  SaveState,
} from './types';

type FieldRequestTrigger = 'zone' | 'inspect' | 'enter-biome';

interface FieldRequestDefinitionBase {
  id: string;
  biomeId: string;
  title: string;
  summary: string;
  unlockAfter?: string[];
}

interface RouteV2NoteDefinition {
  readyTitle: string;
  readyText: string;
  filedText: string;
}

interface EvidenceSlotDefinition {
  id: string;
  label: string;
  entryIds: string[];
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

interface LandmarkEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'landmark-evidence';
  zoneId?: string;
  zoneIds?: string[];
  landmarkEntryIds: string[];
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

interface AssembleEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'assemble-evidence';
  zoneId?: string;
  zoneIds?: string[];
  evidenceSlots: EvidenceSlotDefinition[];
  slotOrder?: string[];
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

export type FieldRequestDefinition =
  | EnterZoneFieldRequest
  | InspectEntriesFieldRequest
  | SurveyBiomeFieldRequest
  | ReachAreaFieldRequest
  | LandmarkEvidenceFieldRequest
  | AssembleEvidenceFieldRequest;

export interface FieldRequestEvent {
  trigger: FieldRequestTrigger;
  entryId?: string | null;
}

export interface FieldRequestAdvanceResult {
  requestId: string;
  status: 'completed' | 'ready-to-synthesize';
  noticeTitle?: string;
  noticeText?: string;
}

interface ActiveFieldRequestRouteV2State {
  status: RouteV2ProgressStatus;
  selectedSupportId: OutingSupportId;
  landmarkEntryIds: string[];
  evidenceSlots: RouteV2EvidenceSlotProgress[];
  filedText?: string;
}

export interface ActiveFieldRequest {
  id: string;
  biomeId: string;
  biomeName: string;
  title: string;
  summary: string;
  progressLabel: string;
  routeV2: ActiveFieldRequestRouteV2State | null;
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
    summary: 'Follow the sheltering logs into Root Hollow and confirm the seep stone in the lower pocket.',
    type: 'landmark-evidence',
    zoneIds: ['root-hollow', 'seep-pocket'],
    landmarkEntryIds: ['seep-stone'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Hidden Hollow note.',
      filedText: 'The Hidden Hollow note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-moisture-holders',
    biomeId: 'forest',
    title: 'Moisture Holders',
    summary: 'In Root Hollow, gather shelter, ground, and living clues behind the hollow\'s cool, damp shelter.',
    unlockAfter: ['forest-hidden-hollow'],
    type: 'assemble-evidence',
    zoneIds: ['root-hollow', 'seep-pocket', 'filtered-return'],
    evidenceSlots: [
      {
        id: 'shelter',
        label: 'Shelter clue',
        entryIds: ['sword-fern', 'licorice-fern'],
      },
      {
        id: 'ground',
        label: 'Ground clue',
        entryIds: ['redwood-sorrel', 'seep-stone'],
      },
      {
        id: 'living',
        label: 'Living clue',
        entryIds: ['banana-slug', 'ensatina'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Moisture Holders note.',
      filedText: 'The Moisture Holders note is filed.',
    },
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
    summary: 'In Treeline Pass, file stone-break, bent-cover, and lee-life clues where shelter still holds.',
    unlockAfter: ['coastal-edge-moisture'],
    type: 'assemble-evidence',
    zoneIds: ['krummholz-belt', 'dwarf-shrub'],
    evidenceSlots: [
      {
        id: 'stone-break',
        label: 'Stone-break clue',
        entryIds: ['frost-heave-boulder'],
      },
      {
        id: 'bent-cover',
        label: 'Bent-cover clue',
        entryIds: ['krummholz-spruce'],
      },
      {
        id: 'lee-life',
        label: 'Lee-life clue',
        entryIds: ['hoary-marmot'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Stone Shelter note.',
      filedText: 'The Stone Shelter note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'tundra-short-season',
    biomeId: 'tundra',
    title: 'Short Season',
    summary: 'In Tundra Reach, file first-bloom, wet-tuft, and brief-fruit clues across the thaw edge.',
    unlockAfter: ['treeline-stone-shelter'],
    type: 'assemble-evidence',
    zoneIds: ['snow-meadow', 'thaw-skirt'],
    evidenceSlots: [
      {
        id: 'first-bloom',
        label: 'First-bloom clue',
        entryIds: ['purple-saxifrage'],
      },
      {
        id: 'wet-tuft',
        label: 'Wet-tuft clue',
        entryIds: ['cottongrass'],
      },
      {
        id: 'brief-fruit',
        label: 'Brief-fruit clue',
        entryIds: ['cloudberry'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Short Season note.',
      filedText: 'The Short Season note is filed.',
    },
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
    summary: 'Walk Coastal Scrub from dune to forest edge and file open, cover, and thicker-edge clues.',
    unlockAfter: ['tundra-survey-slice'],
    type: 'assemble-evidence',
    zoneIds: ['back-dune', 'windbreak-swale', 'forest-edge'],
    evidenceSlots: [
      {
        id: 'open-pioneer',
        label: 'Open pioneer clue',
        entryIds: ['dune-lupine'],
      },
      {
        id: 'holding-cover',
        label: 'Holding cover clue',
        entryIds: ['pacific-wax-myrtle'],
      },
      {
        id: 'thicker-edge',
        label: 'Thicker-edge clue',
        entryIds: ['salmonberry'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Scrub Pattern note.',
      filedText: 'The Scrub Pattern note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-cool-edge',
    biomeId: 'forest',
    title: 'Cool Edge',
    summary: 'At Creek Bend, file edge-carrier, cool-floor, and wet-shade clues along the cooler forest side.',
    unlockAfter: ['scrub-edge-pattern'],
    type: 'assemble-evidence',
    zoneId: 'creek-bend',
    evidenceSlots: [
      {
        id: 'edge-carrier',
        label: 'Edge carrier clue',
        entryIds: ['salmonberry'],
      },
      {
        id: 'cool-floor',
        label: 'Cool floor clue',
        entryIds: ['redwood-sorrel'],
      },
      {
        id: 'wet-shade',
        label: 'Wet shade clue',
        entryIds: ['sword-fern'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Cool Edge note.',
      filedText: 'The Cool Edge note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'treeline-low-fell',
    biomeId: 'treeline',
    title: 'Low Fell',
    summary: 'In Treeline Pass, file last-tree-shape, low-wood, and fell-bloom clues from krummholz into fell.',
    unlockAfter: ['forest-cool-edge'],
    type: 'assemble-evidence',
    zoneIds: ['krummholz-belt', 'dwarf-shrub', 'lichen-fell'],
    evidenceSlots: [
      {
        id: 'last-tree-shape',
        label: 'Last-tree-shape clue',
        entryIds: ['krummholz-spruce'],
      },
      {
        id: 'low-wood',
        label: 'Low-wood clue',
        entryIds: ['dwarf-birch'],
      },
      {
        id: 'fell-bloom',
        label: 'Fell-bloom clue',
        entryIds: ['mountain-avens'],
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Low Fell note.',
      filedText: 'The Low Fell note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-expedition-upper-run',
    biomeId: 'forest',
    title: 'Root Hollow',
    summary: 'In Root Hollow, log seep-mark, root-held, and high-run clues before filing the chapter.',
    unlockAfter: ['treeline-low-fell'],
    type: 'assemble-evidence',
    zoneIds: ['root-hollow', 'seep-pocket', 'filtered-return', 'log-run'],
    evidenceSlots: [
      {
        id: 'seep-mark',
        label: 'Seep-mark clue',
        entryIds: ['seep-stone'],
      },
      {
        id: 'root-held',
        label: 'Root-held clue',
        entryIds: ['root-curtain'],
      },
      {
        id: 'high-run',
        label: 'High-run clue',
        entryIds: ['fir-cone'],
      },
    ],
    slotOrder: ['seep-mark', 'root-held', 'high-run'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Root Hollow note.',
      filedText: 'The Root Hollow note is filed.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-season-threads',
    biomeId: 'forest',
    title: 'Season Threads',
    summary: 'In Forest Trail, inspect three clues linking floor cover, edge growth, and canopy life.',
    unlockAfter: ['forest-expedition-upper-run'],
    type: 'inspect-entry-set',
    entryIds: ['sword-fern', 'salmonberry', 'tree-lungwort'],
    minimumCount: 3,
    completionTriggers: ['inspect'],
  },
] as const;

function isRouteV2Definition(
  definition: FieldRequestDefinition,
): definition is LandmarkEvidenceFieldRequest | AssembleEvidenceFieldRequest {
  return definition.type === 'landmark-evidence' || definition.type === 'assemble-evidence';
}

function matchesBiomeAndOptionalZone(
  definition: LandmarkEvidenceFieldRequest | AssembleEvidenceFieldRequest,
  context: FieldRequestContext,
): boolean {
  const zoneIds = definition.zoneIds?.length
    ? definition.zoneIds
    : definition.zoneId
      ? [definition.zoneId]
      : [];
  return context.currentBiomeId === definition.biomeId
    && (!zoneIds.length || (context.currentZoneId !== null && zoneIds.includes(context.currentZoneId)));
}

function getRouteV2Progress(
  save: SaveState,
  requestId: string,
): SaveState['routeV2Progress'] {
  return save.routeV2Progress?.requestId === requestId ? save.routeV2Progress : null;
}

function ensureRouteV2Progress(
  save: SaveState,
  requestId: string,
): NonNullable<SaveState['routeV2Progress']> {
  const existing = getRouteV2Progress(save, requestId);
  if (existing) {
    return existing;
  }

  const nextProgress: NonNullable<SaveState['routeV2Progress']> = {
    requestId,
    status: 'gathering',
    landmarkEntryIds: [],
    evidenceSlots: [],
  };
  save.routeV2Progress = nextProgress;
  return nextProgress;
}

function getFilledEvidenceSlotCount(
  definition: AssembleEvidenceFieldRequest,
  save: SaveState,
): number {
  return definition.evidenceSlots.filter((slot) =>
    getRouteV2Progress(save, definition.id)?.evidenceSlots.some((filled) => filled.slotId === slot.id),
  ).length;
}

function getFilledEvidenceSlotIds(
  definition: AssembleEvidenceFieldRequest,
  save: SaveState,
): Set<string> {
  return new Set(getRouteV2Progress(save, definition.id)?.evidenceSlots.map((slot) => slot.slotId) ?? []);
}

function getNextEvidenceSlotId(
  definition: AssembleEvidenceFieldRequest,
  save: SaveState,
): string | null {
  if (!definition.slotOrder?.length) {
    return null;
  }

  const filledSlotIds = getFilledEvidenceSlotIds(definition, save);
  return definition.slotOrder.find((slotId) => !filledSlotIds.has(slotId)) ?? null;
}

function getRouteV2ZoneIds(
  definition: LandmarkEvidenceFieldRequest | AssembleEvidenceFieldRequest,
): string[] {
  if (definition.zoneIds?.length) {
    return definition.zoneIds;
  }

  return definition.zoneId ? [definition.zoneId] : [];
}

function buildRouteV2ReadySummary(
  definition: LandmarkEvidenceFieldRequest | AssembleEvidenceFieldRequest,
): string {
  return definition.routeV2Note.readyText;
}

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
    case 'landmark-evidence':
    case 'assemble-evidence':
      return false;
    default:
      return false;
  }
}

function buildActiveRouteV2State(
  definition: FieldRequestDefinition,
  save: SaveState,
): ActiveFieldRequestRouteV2State | null {
  const progress = getRouteV2Progress(save, definition.id);
  if (!progress && !isRouteV2Definition(definition)) {
    return null;
  }

  return {
    status: progress?.status ?? 'gathering',
    selectedSupportId: resolveSelectedOutingSupportId(save),
    landmarkEntryIds: progress?.landmarkEntryIds ?? [],
    evidenceSlots: progress?.evidenceSlots ?? [],
    filedText: isRouteV2Definition(definition) ? definition.routeV2Note.filedText : undefined,
  };
}

function formatProgressLabel(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
): string {
  const progressData = getBiomeProgressData(context.biomes, context.save, definition.biomeId);
  const biomeName = context.biomes[definition.biomeId]?.name ?? 'Target Biome';
  const inTargetBiome = context.currentBiomeId === definition.biomeId;
  const routeV2Progress = getRouteV2Progress(context.save, definition.id);

  if (routeV2Progress?.status === 'ready-to-synthesize') {
    return 'Ready To File';
  }

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
    case 'landmark-evidence': {
      const zoneIds = getRouteV2ZoneIds(definition);
      const zoneLabel = zoneIds[0]
        ? getZoneLabel(context.biomes, definition.biomeId, zoneIds[0])
        : null;
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      if (zoneIds.length && !context.currentZoneId?.length) {
        return `Return To ${zoneLabel}`;
      }

      if (zoneIds.length && !zoneIds.includes(context.currentZoneId ?? '')) {
        return `Return To ${zoneLabel}`;
      }

      const matched = routeV2Progress?.landmarkEntryIds.length ?? 0;
      return `${Math.min(matched, 1)}/1 clue`;
    }
    case 'assemble-evidence': {
      const zoneIds = getRouteV2ZoneIds(definition);
      const zoneLabel = zoneIds[0]
        ? getZoneLabel(context.biomes, definition.biomeId, zoneIds[0])
        : null;
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      if (zoneIds.length && !context.currentZoneId?.length) {
        return `Return To ${zoneLabel}`;
      }

      if (zoneIds.length && !zoneIds.includes(context.currentZoneId ?? '')) {
        return `Return To ${zoneLabel}`;
      }

      return `${getFilledEvidenceSlotCount(definition, context.save)}/${definition.evidenceSlots.length} clues`;
    }
    default:
      return '';
  }
}

function getActiveFieldRequestDefinition(
  context: FieldRequestContext,
): FieldRequestDefinition | null {
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

    return definition;
  }

  return null;
}

export function getHandLensNotebookFit(
  context: FieldRequestContext,
  entryId: string,
): string | null {
  const definition = getActiveFieldRequestDefinition(context);
  if (!definition || definition.type !== 'assemble-evidence') {
    return null;
  }

  if (
    !matchesBiomeAndOptionalZone(definition, context) ||
    getRouteV2Progress(context.save, definition.id)?.status === 'ready-to-synthesize'
  ) {
    return null;
  }

  const filledSlotIds = getFilledEvidenceSlotIds(definition, context.save);
  const nextSlotId = getNextEvidenceSlotId(definition, context.save);
  const matchingSlot = definition.evidenceSlots.find(
    (slot) =>
      slot.entryIds.includes(entryId)
      && !filledSlotIds.has(slot.id)
      && (!nextSlotId || slot.id === nextSlotId),
  );

  return matchingSlot ? `Notebook fit: ${matchingSlot.id.replace(/-/g, ' ')}` : null;
}

export function resolveActiveFieldRequest(
  context: FieldRequestContext,
): ActiveFieldRequest | null {
  const definition = getActiveFieldRequestDefinition(context);
  if (!definition) {
    return null;
  }

  const biome = context.biomes[definition.biomeId];
  if (!biome) {
    return null;
  }

  return {
    id: definition.id,
    biomeId: definition.biomeId,
    biomeName: biome.name,
    title: definition.title,
    summary:
      getRouteV2Progress(context.save, definition.id)?.status === 'ready-to-synthesize'
        ? isRouteV2Definition(definition)
          ? buildRouteV2ReadySummary(definition)
          : 'Return to the field station and file this note.'
        : definition.summary,
    progressLabel: formatProgressLabel(definition, context),
    routeV2: buildActiveRouteV2State(definition, context.save),
  };
}

export function advanceFieldRequestDefinition(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
  event: FieldRequestEvent,
): FieldRequestAdvanceResult | null {
  if (!(definition.completionTriggers as readonly FieldRequestTrigger[]).includes(event.trigger)) {
    return null;
  }

  if (isRouteV2Definition(definition)) {
    if (
      event.trigger !== 'inspect' ||
      !event.entryId ||
      !matchesBiomeAndOptionalZone(definition, context)
    ) {
      return null;
    }

    if (definition.type === 'landmark-evidence') {
      if (!definition.landmarkEntryIds.includes(event.entryId)) {
        return null;
      }

      const progress = ensureRouteV2Progress(context.save, definition.id);
      if (progress.status === 'ready-to-synthesize') {
        return null;
      }

      if (!progress.landmarkEntryIds.includes(event.entryId)) {
        progress.landmarkEntryIds = [...progress.landmarkEntryIds, event.entryId];
      }
      progress.status = 'ready-to-synthesize';
      return {
        requestId: definition.id,
        status: 'ready-to-synthesize',
        noticeTitle: definition.routeV2Note.readyTitle,
        noticeText: definition.routeV2Note.readyText,
      };
    }

    const progress = getRouteV2Progress(context.save, definition.id);
    if (progress?.status === 'ready-to-synthesize') {
      return null;
    }

    const filledSlotIds = getFilledEvidenceSlotIds(definition, context.save);
    const nextSlotId = getNextEvidenceSlotId(definition, context.save);
    const matchingSlot = definition.evidenceSlots.find(
      (slot) =>
        slot.entryIds.includes(event.entryId as string)
        && !filledSlotIds.has(slot.id)
        && (!nextSlotId || slot.id === nextSlotId),
    );
    if (!matchingSlot) {
      return null;
    }

    const ensuredProgress = ensureRouteV2Progress(context.save, definition.id);
    ensuredProgress.evidenceSlots = [
      ...ensuredProgress.evidenceSlots,
      {
        slotId: matchingSlot.id,
        entryId: event.entryId,
      },
    ];

    if (ensuredProgress.evidenceSlots.length < definition.evidenceSlots.length) {
      return null;
    }

    ensuredProgress.status = 'ready-to-synthesize';
    return {
      requestId: definition.id,
      status: 'ready-to-synthesize',
      noticeTitle: definition.routeV2Note.readyTitle,
      noticeText: definition.routeV2Note.readyText,
    };
  }

  return isDefinitionComplete(definition, context, event.trigger)
    ? {
        requestId: definition.id,
        status: 'completed',
      }
    : null;
}

export function advanceActiveFieldRequest(
  context: FieldRequestContext,
  trigger: FieldRequestTrigger,
  entryId?: string | null,
): FieldRequestAdvanceResult | null {
  for (const definition of FIELD_REQUEST_DEFINITIONS) {
    if (isEffectivelyCompleted(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    if (!isUnlocked(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    return advanceFieldRequestDefinition(definition, context, { trigger, entryId });
  }

  return null;
}

export function shouldCompleteActiveFieldRequest(
  context: FieldRequestContext,
  trigger: FieldRequestTrigger,
  entryId?: string | null,
): string | null {
  const result = advanceActiveFieldRequest(context, trigger, entryId);
  return result?.status === 'completed' ? result.requestId : null;
}

export function fileReadyRouteV2FieldRequest(save: SaveState): string | null {
  if (save.routeV2Progress?.status !== 'ready-to-synthesize') {
    return null;
  }

  const requestId = save.routeV2Progress.requestId;
  save.routeV2Progress = null;
  return recordCompletedFieldRequest(save, requestId) ? requestId : null;
}
