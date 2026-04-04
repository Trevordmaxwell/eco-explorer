import { getActiveHabitatProcessMoments } from './habitat-process';
import { buildJournalBiomeProgress, getDiscoveredEntryIdsForBiome } from './journal';
import { getBiomeSurveyProgress, type BiomeSurveyState } from './progression';
import { recordCompletedFieldRequest, resolveSelectedOutingSupportId } from './save';
import { buildWorldState } from './world-state';
import type {
  BiomeDefinition,
  OutingSupportId,
  PhenologyPhase,
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
  worldStateFocus?: FieldRequestWorldStateFocus;
}

interface RouteV2NoteDefinition {
  readyTitle: string;
  readyText: string;
  filedText: string;
  clueBackedTail?: string;
  displayPrefix?: string;
}

interface RouteV2ProcessFocus {
  momentId: string;
  activeTitle?: string;
  activeSummary: string;
  activeSlotEntryIdsBySlotId?: Record<string, string[]>;
}

interface FieldRequestWorldStateFocus {
  phenologyPhase?: PhenologyPhase;
  activeTitle?: string;
  activeSummary: string;
}

interface EvidenceSlotDefinition {
  id: string;
  label: string;
  entryIds: string[];
}

interface TransectStageDefinition extends EvidenceSlotDefinition {
  zoneId: string;
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
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

interface AssembleEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'assemble-evidence';
  zoneId?: string;
  zoneIds?: string[];
  evidenceSlots: EvidenceSlotDefinition[];
  slotOrder?: string[];
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

interface TransectEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'transect-evidence';
  zoneIds?: string[];
  evidenceSlots: TransectStageDefinition[];
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

type EvidenceRouteV2FieldRequest = AssembleEvidenceFieldRequest | TransectEvidenceFieldRequest;
type RouteV2FieldRequestDefinition = LandmarkEvidenceFieldRequest | EvidenceRouteV2FieldRequest;

export type FieldRequestDefinition =
  | EnterZoneFieldRequest
  | InspectEntriesFieldRequest
  | SurveyBiomeFieldRequest
  | ReachAreaFieldRequest
  | RouteV2FieldRequestDefinition;

export interface FieldRequestEvent {
  trigger: FieldRequestTrigger;
  entryId?: string | null;
  observedZoneId?: string | null;
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

export interface FieldRequestContext {
  biomes: Record<string, BiomeDefinition>;
  save: SaveState;
  currentBiomeId: string;
  currentZoneId: string | null;
  currentPlayerX: number | null;
  currentPlayerY: number | null;
}

export const FIELD_REQUEST_DEFINITIONS: readonly FieldRequestDefinition[] = [
  {
    id: 'beach-shore-shelter',
    biomeId: 'beach',
    title: 'Shore Shelter',
    summary: 'On Sunny Beach, log dune-grass, then lee-cover, then wrack-line from dune edge to tide line.',
    type: 'transect-evidence',
    zoneIds: ['dune-edge', 'lee-pocket', 'tide-line'],
    evidenceSlots: [
      {
        id: 'dune-grass',
        label: 'Dune-grass clue',
        entryIds: ['beach-grass'],
        zoneId: 'dune-edge',
      },
      {
        id: 'lee-cover',
        label: 'Lee-cover clue',
        entryIds: ['driftwood-log'],
        zoneId: 'lee-pocket',
      },
      {
        id: 'wrack-line',
        label: 'Wrack-line clue',
        entryIds: ['bull-kelp-wrack'],
        zoneId: 'tide-line',
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Shore Shelter note.',
      filedText: 'Beach grass, driftwood, and bull kelp wrack mark how shelter grows from dune edge to tide line.',
      clueBackedTail: 'mark how shelter grows from dune edge to tide line.',
    },
    processFocus: {
      momentId: 'wrack-hold',
      activeTitle: 'Wrack Shelter',
      activeSummary: 'Fresh wrack makes the beach shelter line easier to follow today.',
      activeSlotEntryIdsBySlotId: {
        'wrack-line': ['beach-hopper'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-hidden-hollow',
    biomeId: 'forest',
    title: 'Hidden Hollow',
    summary: 'Follow the sheltering logs into Root Hollow and confirm the seep stone in the lower pocket.',
    unlockAfter: ['beach-shore-shelter'],
    type: 'landmark-evidence',
    zoneIds: ['root-hollow', 'seep-pocket'],
    landmarkEntryIds: ['seep-stone'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Hidden Hollow note.',
      filedText: 'Seep stone confirms the damp lower hollow under the roots.',
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
      filedText: 'Shelter, damp ground, and slug life show the hollow holding moisture.',
      clueBackedTail: 'show the hollow holding moisture.',
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
    title: 'Open To Shelter',
    summary: 'Trace coast-to-forest shelter from bloom to pine to edge log.',
    unlockAfter: ['forest-survey-slice'],
    type: 'transect-evidence',
    zoneIds: ['back-dune', 'shore-pine-stand', 'forest-edge'],
    evidenceSlots: [
      {
        id: 'open-bloom',
        label: 'Open-bloom clue',
        entryIds: ['sand-verbena'],
        zoneId: 'back-dune',
      },
      {
        id: 'pine-cover',
        label: 'Pine-cover clue',
        entryIds: ['shore-pine'],
        zoneId: 'shore-pine-stand',
      },
      {
        id: 'edge-log',
        label: 'Edge-log clue',
        entryIds: ['nurse-log'],
        zoneId: 'forest-edge',
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Open To Shelter note.',
      filedText: 'Sand verbena, shore pine, and nurse log show the coast settling into forest-edge shelter.',
      clueBackedTail: 'show the coast settling into forest-edge shelter.',
    },
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
    summary: 'In Treeline Pass, log bent-cover, then stone-break, then lee-life through the last shelter.',
    unlockAfter: ['coastal-edge-moisture'],
    type: 'assemble-evidence',
    zoneIds: ['krummholz-belt', 'dwarf-shrub'],
    evidenceSlots: [
      {
        id: 'bent-cover',
        label: 'Bent-cover clue',
        entryIds: ['krummholz-spruce'],
      },
      {
        id: 'stone-break',
        label: 'Stone-break clue',
        entryIds: ['frost-heave-boulder'],
      },
      {
        id: 'lee-life',
        label: 'Lee-life clue',
        entryIds: ['hoary-marmot'],
      },
    ],
    slotOrder: ['bent-cover', 'stone-break', 'lee-life'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Stone Shelter note.',
      filedText: 'Bent cover, stone break, and lee life mark the last sheltered treeline pocket.',
      clueBackedTail: 'mark the last sheltered treeline pocket.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'tundra-short-season',
    biomeId: 'tundra',
    title: 'Short Season',
    summary: 'In Tundra Reach, log first-bloom, then wet-tuft, then brief-fruit through the thaw window.',
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
    slotOrder: ['first-bloom', 'wet-tuft', 'brief-fruit'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Short Season note.',
      filedText: 'First bloom, wet tuft, and brief fruit trace the tundra\'s short thaw window.',
      clueBackedTail: 'trace the tundra\'s short thaw window.',
      displayPrefix: 'Thaw Window.',
    },
    processFocus: {
      momentId: 'thaw-fringe',
      activeTitle: 'Thaw Window',
      activeSummary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'tundra-survey-slice',
    biomeId: 'tundra',
    title: 'Tundra Survey',
    summary: 'Bring Tundra Reach up to surveyed by logging four clues across Snow Meadow and Frost Ridge.',
    unlockAfter: ['tundra-short-season'],
    worldStateFocus: {
      phenologyPhase: 'peak',
      activeTitle: 'Bright Survey',
      activeSummary: 'This is a good outing to finish the inland line while the short-season ground is clearest.',
    },
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
    type: 'transect-evidence',
    zoneIds: ['back-dune', 'windbreak-swale', 'forest-edge'],
    evidenceSlots: [
      {
        id: 'open-pioneer',
        label: 'Open pioneer clue',
        entryIds: ['dune-lupine'],
        zoneId: 'back-dune',
      },
      {
        id: 'holding-cover',
        label: 'Holding cover clue',
        entryIds: ['pacific-wax-myrtle'],
        zoneId: 'windbreak-swale',
      },
      {
        id: 'thicker-edge',
        label: 'Thicker-edge clue',
        entryIds: ['salmonberry'],
        zoneId: 'forest-edge',
      },
    ],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Scrub Pattern note.',
      filedText: 'Open dune, holding cover, and thicker edge now read as one clear transition.',
      clueBackedTail: 'now read as one clear transition.',
    },
    processFocus: {
      momentId: 'sand-capture',
      activeTitle: 'Held Sand',
      activeSummary: 'Trapped sand shows where the pioneer side is giving way to steadier scrub cover.',
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
      filedText: 'Edge carrier, cool floor, and wet shade now read as the cooler forest middle.',
      clueBackedTail: 'now read as the cooler forest middle.',
    },
    processFocus: {
      momentId: 'moisture-hold',
      activeTitle: 'Moist Edge',
      activeSummary:
        'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'treeline-low-fell',
    biomeId: 'treeline',
    title: 'Low Fell',
    summary: 'In Treeline Pass, log last-tree-shape, low-wood, fell-bloom, and low-rest into open fell.',
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
      {
        id: 'low-rest',
        label: 'Low-rest clue',
        entryIds: ['arctic-willow'],
      },
    ],
    slotOrder: ['last-tree-shape', 'low-wood', 'fell-bloom', 'low-rest'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Low Fell note.',
      filedText: 'Last tree shape, low wood, fell bloom, and low rest now trace the full drop from treeline shelter into open fell.',
      clueBackedTail: 'now trace the full drop from treeline shelter into open fell.',
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-expedition-upper-run',
    biomeId: 'forest',
    title: 'Root Hollow',
    summary: 'Log seep-mark, stone-pocket, root-held, and high-run clues in Root Hollow, then file the note.',
    unlockAfter: ['treeline-low-fell'],
    type: 'assemble-evidence',
    zoneIds: ['root-hollow', 'seep-pocket', 'stone-basin', 'filtered-return', 'log-run'],
    evidenceSlots: [
      {
        id: 'seep-mark',
        label: 'Seep-mark clue',
        entryIds: ['seep-stone'],
      },
      {
        id: 'stone-pocket',
        label: 'Stone-pocket clue',
        entryIds: ['banana-slug', 'ensatina'],
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
    slotOrder: ['seep-mark', 'stone-pocket', 'root-held', 'high-run'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Root Hollow note.',
      filedText: 'Seep stone, basin life, root hold, and high run now map the whole hollow return.',
      clueBackedTail: 'now map the whole hollow return.',
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

export function getFieldRequestDefinition(
  requestId: string,
): FieldRequestDefinition | null {
  return FIELD_REQUEST_DEFINITIONS.find((candidate) => candidate.id === requestId) ?? null;
}

function isRouteV2Definition(
  definition: FieldRequestDefinition,
): definition is RouteV2FieldRequestDefinition {
  return (
    definition.type === 'landmark-evidence'
    || definition.type === 'assemble-evidence'
    || definition.type === 'transect-evidence'
  );
}

function isEvidenceRouteV2Definition(
  definition: FieldRequestDefinition,
): definition is EvidenceRouteV2FieldRequest {
  return definition.type === 'assemble-evidence' || definition.type === 'transect-evidence';
}

function matchesBiomeAndOptionalZone(
  definition: RouteV2FieldRequestDefinition,
  context: FieldRequestContext,
): boolean {
  const zoneIds = getRouteV2ZoneIds(definition);
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
  definition: EvidenceRouteV2FieldRequest,
  save: SaveState,
): number {
  return definition.evidenceSlots.filter((slot) =>
    getRouteV2Progress(save, definition.id)?.evidenceSlots.some((filled) => filled.slotId === slot.id),
  ).length;
}

function getFilledEvidenceSlotIds(
  definition: EvidenceRouteV2FieldRequest,
  save: SaveState,
): Set<string> {
  return new Set(getRouteV2Progress(save, definition.id)?.evidenceSlots.map((slot) => slot.slotId) ?? []);
}

function getOrderedEvidenceSlotIds(
  definition: EvidenceRouteV2FieldRequest,
): string[] {
  if (definition.type === 'assemble-evidence' && definition.slotOrder?.length) {
    return definition.slotOrder;
  }

  return definition.evidenceSlots.map((slot) => slot.id);
}

function getNextEvidenceSlotId(
  definition: EvidenceRouteV2FieldRequest,
  save: SaveState,
): string | null {
  if (definition.type === 'assemble-evidence' && !definition.slotOrder?.length) {
    return null;
  }

  const orderedSlotIds = getOrderedEvidenceSlotIds(definition);
  const filledSlotIds = getFilledEvidenceSlotIds(definition, save);
  return orderedSlotIds.find((slotId) => !filledSlotIds.has(slotId)) ?? null;
}

function getNextEvidenceSlot(
  definition: EvidenceRouteV2FieldRequest,
  save: SaveState,
): EvidenceSlotDefinition | TransectStageDefinition | null {
  const nextSlotId = getNextEvidenceSlotId(definition, save);
  if (!nextSlotId) {
    return null;
  }

  return definition.evidenceSlots.find((slot) => slot.id === nextSlotId) ?? null;
}

function getRequiredEvidenceSlotZoneId(
  definition: EvidenceRouteV2FieldRequest,
  slotId: string,
): string | null {
  if (definition.type !== 'transect-evidence') {
    return null;
  }

  return definition.evidenceSlots.find((slot) => slot.id === slotId)?.zoneId ?? null;
}

function getActiveEvidenceSlotEntryIds(
  definition: EvidenceRouteV2FieldRequest,
  slotId: string,
  context: FieldRequestContext,
): Set<string> {
  const baseEntryIds = definition.evidenceSlots.find((slot) => slot.id === slotId)?.entryIds ?? [];
  const activeProcessEntryIds = getActiveRouteV2ProcessFocus(definition, context)
    ?.activeSlotEntryIdsBySlotId?.[slotId] ?? [];
  return new Set([...baseEntryIds, ...activeProcessEntryIds]);
}

function resolveObservedZoneId(
  context: FieldRequestContext,
  observedZoneId?: string | null,
): string | null {
  return observedZoneId ?? context.currentZoneId;
}

function getRouteV2ZoneIds(
  definition: RouteV2FieldRequestDefinition,
): string[] {
  if (definition.zoneIds?.length) {
    return definition.zoneIds;
  }

  if (definition.type === 'transect-evidence') {
    return Array.from(new Set(definition.evidenceSlots.map((slot) => slot.zoneId)));
  }

  return definition.zoneId ? [definition.zoneId] : [];
}

function buildRouteV2ReadySummary(
  definition: RouteV2FieldRequestDefinition,
): string {
  return definition.routeV2Note.readyText;
}

function findRouteV2EntryName(
  biomes: Record<string, BiomeDefinition>,
  biomeId: string,
  entryId: string,
): string | null {
  const localEntry = biomes[biomeId]?.entries[entryId];
  if (localEntry) {
    return localEntry.commonName;
  }

  for (const biome of Object.values(biomes)) {
    const entry = biome.entries[entryId];
    if (entry) {
      return entry.commonName;
    }
  }

  return null;
}

function formatRouteV2EntryList(entryNames: string[]): string {
  if (entryNames.length <= 1) {
    return entryNames[0] ?? '';
  }

  if (entryNames.length === 2) {
    return `${entryNames[0]} and ${entryNames[1]}`;
  }

  return `${entryNames.slice(0, -1).join(', ')}, and ${entryNames[entryNames.length - 1]}`;
}

function getResolvedRouteV2EntryIds(
  definition: RouteV2FieldRequestDefinition,
  progress: NonNullable<SaveState['routeV2Progress']>,
): string[] | null {
  if (definition.type === 'landmark-evidence') {
    return progress.landmarkEntryIds.length ? [progress.landmarkEntryIds[0]] : null;
  }

  const filledBySlotId = new Map(progress.evidenceSlots.map((slot) => [slot.slotId, slot.entryId]));
  const orderedSlotIds = getOrderedEvidenceSlotIds(definition);
  const orderedEntryIds = orderedSlotIds
    .map((slotId) => filledBySlotId.get(slotId) ?? null);
  if (orderedEntryIds.some((entryId) => !entryId)) {
    return null;
  }

  return orderedEntryIds as string[];
}

export function resolveRouteV2FiledNoteText(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  requestId: string,
): string | null {
  const definition = getFieldRequestDefinition(requestId);
  if (!definition || !isRouteV2Definition(definition)) {
    return null;
  }

  const fallbackText = definition.routeV2Note.filedText;
  const progress = getRouteV2Progress(save, requestId);
  if (!progress || progress.status !== 'ready-to-synthesize' || !definition.routeV2Note.clueBackedTail) {
    return fallbackText;
  }

  const resolvedEntryIds = getResolvedRouteV2EntryIds(definition, progress);
  if (!resolvedEntryIds?.length) {
    return fallbackText;
  }

  const resolvedEntryNames = resolvedEntryIds.map((entryId) =>
    findRouteV2EntryName(biomes, definition.biomeId, entryId),
  );
  if (resolvedEntryNames.some((entryName) => !entryName)) {
    return fallbackText;
  }

  return `${formatRouteV2EntryList(resolvedEntryNames as string[])} ${definition.routeV2Note.clueBackedTail}`;
}

export function resolveRouteV2FiledDisplayText(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  requestId: string,
): string | null {
  const definition = getFieldRequestDefinition(requestId);
  if (!definition || !isRouteV2Definition(definition)) {
    return null;
  }

  const baseText = resolveRouteV2FiledNoteText(biomes, save, requestId) ?? definition.routeV2Note.filedText;
  const prefix = definition.routeV2Note.displayPrefix?.trim();
  return prefix ? `${prefix} ${baseText}` : baseText;
}

function getActiveRouteV2ProcessFocus(
  definition: RouteV2FieldRequestDefinition,
  context: FieldRequestContext,
): RouteV2ProcessFocus | null {
  if (!definition.processFocus) {
    return null;
  }

  const biome = context.biomes[definition.biomeId];
  if (!biome) {
    return null;
  }

  const worldState = buildWorldState(context.save, definition.biomeId);
  const visitCount = context.save.biomeVisits[definition.biomeId] ?? 0;
  return getActiveHabitatProcessMoments(biome, visitCount, worldState).some(
    (moment) => moment.id === definition.processFocus?.momentId,
  )
    ? definition.processFocus
    : null;
}

function getActiveFieldRequestWorldStateFocus(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
): FieldRequestWorldStateFocus | null {
  if (!definition.worldStateFocus) {
    return null;
  }

  const worldState = buildWorldState(context.save, definition.biomeId);
  if (
    definition.worldStateFocus.phenologyPhase
    && worldState.phenologyPhase !== definition.worldStateFocus.phenologyPhase
  ) {
    return null;
  }

  return definition.worldStateFocus;
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

export function hasResolvedFieldRequest(save: SaveState, requestId: string): boolean {
  const definition = FIELD_REQUEST_DEFINITIONS.find((candidate) => candidate.id === requestId);
  if (!definition) {
    return false;
  }

  if (isEffectivelyCompleted(definition, save.completedFieldRequestIds)) {
    return true;
  }

  const activeRequestId = save.routeV2Progress?.requestId;
  return Boolean(
    activeRequestId
    && activeRequestId !== requestId
    && dependsOnRequest(activeRequestId, requestId),
  );
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
    case 'transect-evidence':
      return false;
    default:
      return false;
  }
}

function buildActiveRouteV2State(
  definition: FieldRequestDefinition,
  context: FieldRequestContext,
): ActiveFieldRequestRouteV2State | null {
  const progress = getRouteV2Progress(context.save, definition.id);
  if (!progress && !isRouteV2Definition(definition)) {
    return null;
  }

  return {
    status: progress?.status ?? 'gathering',
    selectedSupportId: resolveSelectedOutingSupportId(context.save),
    landmarkEntryIds: progress?.landmarkEntryIds ?? [],
    evidenceSlots: progress?.evidenceSlots ?? [],
    filedText: isRouteV2Definition(definition)
      ? resolveRouteV2FiledNoteText(context.biomes, context.save, definition.id) ?? definition.routeV2Note.filedText
      : undefined,
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
    case 'transect-evidence': {
      const nextSlot = getNextEvidenceSlot(definition, context.save);
      const nextZoneId = nextSlot?.id ? getRequiredEvidenceSlotZoneId(definition, nextSlot.id) : null;
      const nextZoneLabel = nextZoneId
        ? getZoneLabel(context.biomes, definition.biomeId, nextZoneId)
        : null;
      if (!inTargetBiome) {
        return `Go To ${biomeName}`;
      }

      if (nextZoneId && context.currentZoneId !== nextZoneId) {
        return `Return To ${nextZoneLabel}`;
      }

      return `${getFilledEvidenceSlotCount(definition, context.save)}/${definition.evidenceSlots.length} stages`;
    }
    default:
      return '';
  }
}

function getActiveFieldRequestDefinition(
  context: FieldRequestContext,
): FieldRequestDefinition | null {
  for (const definition of FIELD_REQUEST_DEFINITIONS) {
    if (hasResolvedFieldRequest(context.save, definition.id)) {
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
  observedZoneId?: string | null,
): string | null {
  const definition = getActiveFieldRequestDefinition(context);
  if (!definition || !isEvidenceRouteV2Definition(definition)) {
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
  const requiredZoneId = nextSlotId ? getRequiredEvidenceSlotZoneId(definition, nextSlotId) : null;
  const matchedObservedZoneId = resolveObservedZoneId(context, observedZoneId);
  if (
    requiredZoneId &&
    (context.currentZoneId !== requiredZoneId || matchedObservedZoneId !== requiredZoneId)
  ) {
    return null;
  }

  const matchingSlot = definition.evidenceSlots.find(
    (slot) =>
      getActiveEvidenceSlotEntryIds(definition, slot.id, context).has(entryId)
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

  const routeV2Ready = getRouteV2Progress(context.save, definition.id)?.status === 'ready-to-synthesize';
  const activeProcessFocus = isRouteV2Definition(definition)
    ? getActiveRouteV2ProcessFocus(definition, context)
    : null;
  const activeWorldStateFocus = getActiveFieldRequestWorldStateFocus(definition, context);

  return {
    id: definition.id,
    biomeId: definition.biomeId,
    biomeName: biome.name,
    title: routeV2Ready
      ? definition.title
      : activeProcessFocus?.activeTitle ?? activeWorldStateFocus?.activeTitle ?? definition.title,
    summary: routeV2Ready
      ? isRouteV2Definition(definition)
        ? buildRouteV2ReadySummary(definition)
        : 'Return to the field station and file this note.'
      : activeProcessFocus?.activeSummary ?? activeWorldStateFocus?.activeSummary ?? definition.summary,
    progressLabel: formatProgressLabel(definition, context),
    routeV2: buildActiveRouteV2State(definition, context),
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

    if (!isEvidenceRouteV2Definition(definition)) {
      return null;
    }

    const progress = getRouteV2Progress(context.save, definition.id);
    if (progress?.status === 'ready-to-synthesize') {
      return null;
    }

    const filledSlotIds = getFilledEvidenceSlotIds(definition, context.save);
    const nextSlotId = getNextEvidenceSlotId(definition, context.save);
    const requiredZoneId = nextSlotId ? getRequiredEvidenceSlotZoneId(definition, nextSlotId) : null;
    const matchedObservedZoneId = resolveObservedZoneId(context, event.observedZoneId);
    if (
      requiredZoneId &&
      (context.currentZoneId !== requiredZoneId || matchedObservedZoneId !== requiredZoneId)
    ) {
      return null;
    }

    const matchingSlot = definition.evidenceSlots.find(
      (slot) =>
        getActiveEvidenceSlotEntryIds(definition, slot.id, context).has(event.entryId as string)
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
  observedZoneId?: string | null,
): FieldRequestAdvanceResult | null {
  for (const definition of FIELD_REQUEST_DEFINITIONS) {
    if (hasResolvedFieldRequest(context.save, definition.id)) {
      continue;
    }

    if (!isUnlocked(definition, context.save.completedFieldRequestIds)) {
      continue;
    }

    return advanceFieldRequestDefinition(definition, context, { trigger, entryId, observedZoneId });
  }

  return null;
}

export function shouldCompleteActiveFieldRequest(
  context: FieldRequestContext,
  trigger: FieldRequestTrigger,
  entryId?: string | null,
  observedZoneId?: string | null,
): string | null {
  const result = advanceActiveFieldRequest(context, trigger, entryId, observedZoneId);
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
