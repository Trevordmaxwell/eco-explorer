import type { BiomeSurveyState } from './progression';
import type { PhenologyPhase } from './types';

export type FieldRequestTrigger = 'zone' | 'inspect' | 'enter-biome';

export interface FieldRequestDefinitionBase {
  id: string;
  biomeId: string;
  title: string;
  summary: string;
  unlockAfter?: string[];
  worldStateFocus?: FieldRequestWorldStateFocus;
}

export interface RouteV2NoteDefinition {
  readyTitle: string;
  readyText: string;
  filedText: string;
  clueBackedTail?: string;
  displayPrefix?: string;
}

export interface RouteV2ProcessFocus {
  momentId: string;
  activeTitle?: string;
  activeSummary: string;
  activeSlotEntryIdsBySlotId?: Record<string, string[]>;
}

export interface FieldRequestWorldStateFocus {
  phenologyPhase?: PhenologyPhase;
  activeTitle?: string;
  activeSummary: string;
  activeSlotEntryIdsBySlotId?: Record<string, string[]>;
}

export interface EvidenceSlotDefinition {
  id: string;
  label: string;
  entryIds: string[];
}

export interface TransectStageDefinition extends EvidenceSlotDefinition {
  zoneId: string;
}

export interface EnterZoneFieldRequest extends FieldRequestDefinitionBase {
  type: 'enter-zone';
  zoneId: string;
  completionTriggers: ['zone'];
}

export interface InspectEntriesFieldRequest extends FieldRequestDefinitionBase {
  type: 'inspect-entry-set';
  zoneId?: string;
  entryIds: string[];
  minimumCount: number;
  completionTriggers: ['inspect'];
}

export interface SurveyBiomeFieldRequest extends FieldRequestDefinitionBase {
  type: 'survey-biome';
  requiredState: BiomeSurveyState;
  completionTriggers: ['inspect', 'enter-biome'];
}

export interface ReachAreaFieldRequest extends FieldRequestDefinitionBase {
  type: 'reach-area';
  zoneId: string;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  progressLabel?: string;
  completionTriggers: ['zone'];
}

export interface LandmarkEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'landmark-evidence';
  zoneId?: string;
  zoneIds?: string[];
  landmarkEntryIds: string[];
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

export interface AssembleEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'assemble-evidence';
  zoneId?: string;
  zoneIds?: string[];
  evidenceSlots: EvidenceSlotDefinition[];
  slotOrder?: string[];
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

export interface TransectEvidenceFieldRequest extends FieldRequestDefinitionBase {
  type: 'transect-evidence';
  zoneIds?: string[];
  evidenceSlots: TransectStageDefinition[];
  processFocus?: RouteV2ProcessFocus;
  routeV2Note: RouteV2NoteDefinition;
  completionTriggers: ['inspect'];
}

export type EvidenceRouteV2FieldRequest = AssembleEvidenceFieldRequest | TransectEvidenceFieldRequest;
export type RouteV2FieldRequestDefinition = LandmarkEvidenceFieldRequest | EvidenceRouteV2FieldRequest;

export type FieldRequestDefinition =
  | EnterZoneFieldRequest
  | InspectEntriesFieldRequest
  | SurveyBiomeFieldRequest
  | ReachAreaFieldRequest
  | RouteV2FieldRequestDefinition;

export const FIELD_REQUEST_DEFINITIONS: readonly FieldRequestDefinition[] = [
  {
    id: 'beach-shore-shelter',
    biomeId: 'beach',
    title: 'Shore Shelter',
    summary: 'On Sunny Beach, inspect dune grass, lee cover, and wrack line from Dune Edge to Tide Line.',
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
      readyText: 'Use M -> Field station, then Enter to file the Shore Shelter note.',
      filedText: 'Beach grass, driftwood, and bull kelp wrack mark shelter from dune edge to tide line.',
      clueBackedTail: 'mark shelter from dune edge to tide line.',
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
    processFocus: {
      momentId: 'moisture-hold',
      activeTitle: 'Moist Hollow',
      activeSummary: 'Mist and damp ground make the cool hollow clues stand out again.',
      activeSlotEntryIdsBySlotId: {
        shelter: ['tree-lungwort'],
        ground: ['seep-moss-mat'],
      },
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
      filedText: 'Sand verbena, shore pine, and nurse log mark open coast meeting forest-edge shelter.',
      clueBackedTail: 'mark open coast meeting forest-edge shelter.',
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
    summary: 'In Treeline Pass, log bent cover, stone break, and lee life through the last shelter.',
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
    summary: 'In Tundra Reach, log first bloom, wet tuft, and brief fruit through the thaw window.',
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
      activeSlotEntryIdsBySlotId: {
        'first-bloom': ['woolly-lousewort'],
        'wet-tuft': ['bigelows-sedge'],
      },
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
    summary: 'Walk Coastal Scrub from dune to forest edge and file open, cover, and thicker edge clues.',
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
      activeSlotEntryIdsBySlotId: {
        'open-pioneer': ['beach-grass'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-cool-edge',
    biomeId: 'forest',
    title: 'Cool Edge',
    summary: 'At Creek Bend, file edge carrier, cool floor, and wet shade clues along the cooler forest side.',
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
    summary: 'In Treeline Pass, log last tree shape, low wood, fell bloom, and low rest into open fell.',
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
        entryIds: ['arctic-willow', 'reindeer-lichen'],
      },
    ],
    slotOrder: ['last-tree-shape', 'low-wood', 'fell-bloom', 'low-rest'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Low Fell note.',
      filedText: 'Last tree shape, low wood, fell bloom, and low rest now trace the full drop from treeline shelter into open fell.',
      clueBackedTail: 'now trace the full drop from treeline shelter into open fell.',
    },
    worldStateFocus: {
      phenologyPhase: 'peak',
      activeTitle: 'Brief Bloom',
      activeSummary: 'Peak avens bloom makes the low open fell easiest to spot today.',
      activeSlotEntryIdsBySlotId: {
        'fell-bloom': ['moss-campion'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'forest-expedition-upper-run',
    biomeId: 'forest',
    title: 'Root Hollow',
    summary: 'Log seep mark, stone pocket, root hold, and high run clues in Root Hollow, then file the note.',
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
  {
    id: 'treeline-high-pass',
    biomeId: 'treeline',
    title: 'High Pass',
    summary: 'Start in Treeline Pass; log stone lift, lee watch, rime mark, and talus hold.',
    unlockAfter: ['forest-season-threads'],
    type: 'assemble-evidence',
    zoneIds: ['dwarf-shrub', 'lichen-fell'],
    evidenceSlots: [
      {
        id: 'stone-lift',
        label: 'Stone-lift clue',
        entryIds: ['frost-heave-boulder'],
      },
      {
        id: 'lee-watch',
        label: 'Lee-watch clue',
        entryIds: ['hoary-marmot'],
      },
      {
        id: 'rime-mark',
        label: 'Rime-mark clue',
        entryIds: ['moss-campion'],
      },
      {
        id: 'talus-hold',
        label: 'Talus-hold clue',
        entryIds: ['talus-cushion-pocket'],
      },
    ],
    slotOrder: ['stone-lift', 'lee-watch', 'rime-mark', 'talus-hold'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the High Pass note.',
      filedText:
        'Stone lift, lee watch, rime mark, and talus hold show how low ridge life uses shelter pockets on exposed High Pass.',
      clueBackedTail: 'show how low ridge life uses shelter pockets on exposed High Pass.',
    },
    processFocus: {
      momentId: 'frost-rime',
      activeTitle: 'Rimed Pass',
      activeSummary: 'Late ridge rime makes the cold-ground mark easier to follow through High Pass today.',
      activeSlotEntryIdsBySlotId: {
        'rime-mark': ['reindeer-lichen'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'source-to-shore-source-shelter',
    biomeId: 'treeline',
    title: 'Source Shelter',
    summary: 'In Treeline Pass, log rime source, lee watch, and talus hold to begin Source to Shore.',
    unlockAfter: ['treeline-high-pass'],
    type: 'assemble-evidence',
    zoneIds: ['dwarf-shrub', 'lichen-fell'],
    evidenceSlots: [
      {
        id: 'rime-source',
        label: 'Rime-source clue',
        entryIds: ['frost-heave-boulder', 'moss-campion'],
      },
      {
        id: 'lee-watch',
        label: 'Lee-watch clue',
        entryIds: ['hoary-marmot'],
      },
      {
        id: 'talus-hold',
        label: 'Talus-hold clue',
        entryIds: ['talus-cushion-pocket'],
      },
    ],
    slotOrder: ['rime-source', 'lee-watch', 'talus-hold'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Source Shelter note.',
      filedText:
        'Rime source, lee watch, and talus hold show water and shelter starting the Source to Shore thread.',
      clueBackedTail: 'show water and shelter starting the Source to Shore thread.',
    },
    processFocus: {
      momentId: 'frost-rime',
      activeTitle: 'Rime Source',
      activeSummary: 'Late ridge rime makes the high source and first shelter easier to compare today.',
      activeSlotEntryIdsBySlotId: {
        'rime-source': ['reindeer-lichen'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'source-to-shore-forest-release',
    biomeId: 'forest',
    title: 'Forest Release',
    summary: 'In Forest Trail, log seep hold, root filter, and cool release as Source to Shore moves downhill.',
    unlockAfter: ['source-to-shore-source-shelter'],
    type: 'assemble-evidence',
    zoneIds: ['seep-pocket', 'filtered-return', 'creek-bend'],
    evidenceSlots: [
      {
        id: 'seep-hold',
        label: 'Seep-hold clue',
        entryIds: ['seep-stone', 'seep-moss-mat'],
      },
      {
        id: 'root-filter',
        label: 'Root-filter clue',
        entryIds: ['root-curtain'],
      },
      {
        id: 'cool-release',
        label: 'Cool-release clue',
        entryIds: ['salmonberry', 'sword-fern'],
      },
    ],
    slotOrder: ['seep-hold', 'root-filter', 'cool-release'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Forest Release note.',
      filedText:
        'Seep hold, root filter, and cool release show Source to Shore moving downhill through forest shelter.',
      clueBackedTail: 'show Source to Shore moving downhill through forest shelter.',
    },
    processFocus: {
      momentId: 'moisture-hold',
      activeTitle: 'Cool Release',
      activeSummary: 'Mist and damp ground make seep, roots, and cool release easier to trace today.',
      activeSlotEntryIdsBySlotId: {
        'seep-hold': ['seep-moss-mat'],
        'cool-release': ['sword-fern'],
      },
    },
    completionTriggers: ['inspect'],
  },
  {
    id: 'source-to-shore-dune-catch',
    biomeId: 'coastal-scrub',
    title: 'Dune Catch',
    summary: 'In Coastal Scrub, log dune catch, swale hold, and cool edge as Source to Shore reaches coast.',
    unlockAfter: ['source-to-shore-forest-release'],
    type: 'assemble-evidence',
    zoneIds: ['back-dune', 'windbreak-swale', 'forest-edge'],
    evidenceSlots: [
      {
        id: 'dune-catch',
        label: 'Dune-catch clue',
        entryIds: ['beach-grass', 'dune-lupine'],
      },
      {
        id: 'swale-hold',
        label: 'Swale-hold clue',
        entryIds: ['pacific-wax-myrtle', 'coyote-brush'],
      },
      {
        id: 'cool-edge',
        label: 'Cool-edge clue',
        entryIds: ['salmonberry', 'sword-fern'],
      },
    ],
    slotOrder: ['dune-catch', 'swale-hold', 'cool-edge'],
    routeV2Note: {
      readyTitle: 'NOTEBOOK READY',
      readyText: 'Return to the field station and file the Dune Catch note.',
      filedText:
        'Dune catch, swale hold, and cool edge show Source to Shore reaching the coastal shelter line.',
      clueBackedTail: 'show Source to Shore reaching the coastal shelter line.',
    },
    processFocus: {
      momentId: 'sand-capture',
      activeTitle: 'Held Dune',
      activeSummary: 'Trapped sand makes dune grass, swale shrubs, and the cool edge easier to read today.',
      activeSlotEntryIdsBySlotId: {
        'dune-catch': ['beach-grass'],
        'swale-hold': ['pacific-wax-myrtle'],
      },
    },
    completionTriggers: ['inspect'],
  },
] as const;
