import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import { ecoWorldMap } from '../content/world-map';
import { resolveFieldRequestState } from '../engine/field-request-state';
import {
  advanceActiveFieldRequest,
  advanceFieldRequestDefinition,
  fileReadyRouteV2FieldRequest,
  getHandLensNotebookFit,
  resolveRouteV2FiledDisplayText,
  resolveRouteV2FiledNoteText,
  resolveActiveFieldRequest,
  shouldCompleteActiveFieldRequest,
} from '../engine/field-requests';
import { createNewSaveState, normalizeSaveState, recordDiscovery } from '../engine/save';
import type { SaveState } from '../engine/types';

type RouteV2Progress = NonNullable<SaveState['routeV2Progress']>;

const ROUTE_FILED_NOTE_MATRIX_MAX = 144;
const ROUTE_FILED_NOTE_MATRIX: Array<{
  requestId: string;
  progress: RouteV2Progress;
  anchor: string;
  displayPrefix?: string;
}> = [
  {
    requestId: 'beach-shore-shelter',
    progress: {
      requestId: 'beach-shore-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
        { slotId: 'wrack-line', entryId: 'bull-kelp-wrack' },
      ],
    },
    anchor: 'shelter from dune edge to tide line',
  },
  {
    requestId: 'forest-hidden-hollow',
    progress: {
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['seep-stone'],
      evidenceSlots: [],
    },
    anchor: 'damp lower hollow under the roots',
  },
  {
    requestId: 'forest-moisture-holders',
    progress: {
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'shelter', entryId: 'licorice-fern' },
        { slotId: 'ground', entryId: 'seep-stone' },
        { slotId: 'living', entryId: 'banana-slug' },
      ],
    },
    anchor: 'hollow holding moisture',
  },
  {
    requestId: 'coastal-shelter-shift',
    progress: {
      requestId: 'coastal-shelter-shift',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'open-bloom', entryId: 'sand-verbena' },
        { slotId: 'pine-cover', entryId: 'shore-pine' },
        { slotId: 'edge-log', entryId: 'nurse-log' },
      ],
    },
    anchor: 'open coast meeting forest-edge shelter',
  },
  {
    requestId: 'treeline-stone-shelter',
    progress: {
      requestId: 'treeline-stone-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'lee-life', entryId: 'hoary-marmot' },
        { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
        { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
      ],
    },
    anchor: 'sheltered treeline pocket',
  },
  {
    requestId: 'tundra-short-season',
    progress: {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    },
    anchor: "tundra's short thaw window",
    displayPrefix: 'Thaw Window.',
  },
  {
    requestId: 'scrub-edge-pattern',
    progress: {
      requestId: 'scrub-edge-pattern',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'open-pioneer', entryId: 'dune-lupine' },
        { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
        { slotId: 'thicker-edge', entryId: 'salmonberry' },
      ],
    },
    anchor: 'clear transition',
  },
  {
    requestId: 'forest-cool-edge',
    progress: {
      requestId: 'forest-cool-edge',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'edge-carrier', entryId: 'salmonberry' },
        { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
        { slotId: 'wet-shade', entryId: 'sword-fern' },
      ],
    },
    anchor: 'cooler forest middle',
  },
  {
    requestId: 'treeline-low-fell',
    progress: {
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'low-rest', entryId: 'arctic-willow' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
      ],
    },
    anchor: 'treeline shelter into open fell',
  },
  {
    requestId: 'forest-expedition-upper-run',
    progress: {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'high-run', entryId: 'fir-cone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'seep-mark', entryId: 'seep-stone' },
      ],
    },
    anchor: 'whole hollow return',
  },
  {
    requestId: 'treeline-high-pass',
    progress: {
      requestId: 'treeline-high-pass',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
        { slotId: 'rime-mark', entryId: 'moss-campion' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
      ],
    },
    anchor: 'shelter pockets on exposed high pass',
  },
];

function createForestContext(
  completedFieldRequestIds: string[] = [],
  currentZoneId: string | null = 'trailhead',
  position: { x: number | null; y: number | null } = { x: null, y: null },
) {
  const save = createNewSaveState('field-request-seed');
  save.completedFieldRequestIds = completedFieldRequestIds;

  return {
    biomes: biomeRegistry,
    save,
    currentBiomeId: 'forest',
    currentZoneId,
    currentPlayerX: position.x,
    currentPlayerY: position.y,
  };
}

function createBeachContext(
  completedFieldRequestIds: string[] = [],
  currentZoneId: string | null = 'dune-edge',
) {
  const save = createNewSaveState('field-request-beach-seed');
  save.completedFieldRequestIds = completedFieldRequestIds;

  return {
    biomes: biomeRegistry,
    save,
    currentBiomeId: 'beach',
    currentZoneId,
    currentPlayerX: null,
    currentPlayerY: null,
  };
}

function createCoastalContext(
  completedFieldRequestIds: string[] = [],
  currentZoneId: string | null = 'back-dune',
) {
  const save = createNewSaveState('field-request-coastal-seed');
  save.completedFieldRequestIds = completedFieldRequestIds;

  return {
    biomes: biomeRegistry,
    save,
    currentBiomeId: 'coastal-scrub',
    currentZoneId,
    currentPlayerX: null,
    currentPlayerY: null,
  };
}

function createTreelineContext(
  completedFieldRequestIds: string[] = [],
  currentZoneId: string | null = 'krummholz-belt',
) {
  const save = createNewSaveState('field-request-treeline-seed');
  save.completedFieldRequestIds = completedFieldRequestIds;

  return {
    biomes: biomeRegistry,
    save,
    currentBiomeId: 'treeline',
    currentZoneId,
    currentPlayerX: null,
    currentPlayerY: null,
  };
}

function createTundraContext(
  completedFieldRequestIds: string[] = [],
  currentZoneId: string | null = 'wind-bluff',
) {
  const save = createNewSaveState('field-request-tundra-seed');
  save.completedFieldRequestIds = completedFieldRequestIds;

  return {
    biomes: biomeRegistry,
    save,
    currentBiomeId: 'tundra',
    currentZoneId,
    currentPlayerX: null,
    currentPlayerY: null,
  };
}

type FieldRequestTestContext = ReturnType<typeof createForestContext>;

interface RouteMatrixStep {
  zoneId?: string;
  entryId: string;
  expectedSlots?: Array<{ slotId: string; entryId: string }>;
  expectedLandmarks?: string[];
}

interface RouteMatrixCase {
  name: string;
  requestId: string;
  createContext: () => FieldRequestTestContext;
  activeTitle: string;
  activeProgressLabel: string;
  steps: RouteMatrixStep[];
  readyText: string;
  expectedFiledTextIncludes?: string[];
  expectedNextRequestId: string | null;
  blockedProbe?: { zoneId: string; entryId: string };
}

interface RouteVariantMatrixCase {
  name: string;
  requestId: string;
  createContext: () => FieldRequestTestContext;
  activateWindow: (context: FieldRequestTestContext) => void;
  activeTitle: string;
  readyTitle: string;
  steps?: RouteMatrixStep[];
  readyEvidenceSlots: Array<{ slotId: string; entryId: string }>;
  expectedFiledTextIncludes: string[];
  expectedDisplayTextIncludes?: string[];
}

const EARLY_FOREST_COMPLETED = [
  'beach-shore-shelter',
  'forest-hidden-hollow',
  'forest-moisture-holders',
  'forest-survey-slice',
];

const COASTAL_TO_TREELINE_COMPLETED = [
  ...EARLY_FOREST_COMPLETED,
  'coastal-shelter-shift',
  'coastal-edge-moisture',
];

const INLAND_COMPLETED = [
  ...COASTAL_TO_TREELINE_COMPLETED,
  'treeline-stone-shelter',
  'tundra-short-season',
  'tundra-survey-slice',
];

const EDGE_LINE_COMPLETED = [
  ...INLAND_COMPLETED,
  'scrub-edge-pattern',
  'forest-cool-edge',
  'treeline-low-fell',
];

const HIGH_PASS_COMPLETED = [
  ...EDGE_LINE_COMPLETED,
  'forest-expedition-upper-run',
  'forest-season-threads',
];

function setRouteMatrixZone(context: FieldRequestTestContext, zoneId: string | undefined): void {
  if (zoneId) {
    context.currentZoneId = zoneId;
  }
}

function expectFiledTextIncludes(text: string | null | undefined, expectedParts: string[] | undefined): void {
  if (!expectedParts?.length) {
    return;
  }

  expect(text).toBeTruthy();
  for (const expectedPart of expectedParts) {
    expect(text).toContain(expectedPart);
  }
}

function createRouteMatrixCases(): RouteMatrixCase[] {
  return [
    {
      name: 'Shore Shelter',
      requestId: 'beach-shore-shelter',
      createContext: () => createBeachContext([], 'dune-edge'),
      activeTitle: 'Shore Shelter',
      activeProgressLabel: '0/3 stages',
      steps: [
        {
          zoneId: 'dune-edge',
          entryId: 'beach-grass',
          expectedSlots: [{ slotId: 'dune-grass', entryId: 'beach-grass' }],
        },
        {
          zoneId: 'lee-pocket',
          entryId: 'driftwood-log',
          expectedSlots: [
            { slotId: 'dune-grass', entryId: 'beach-grass' },
            { slotId: 'lee-cover', entryId: 'driftwood-log' },
          ],
        },
        {
          zoneId: 'tide-line',
          entryId: 'bull-kelp-wrack',
          expectedSlots: [
            { slotId: 'dune-grass', entryId: 'beach-grass' },
            { slotId: 'lee-cover', entryId: 'driftwood-log' },
            { slotId: 'wrack-line', entryId: 'bull-kelp-wrack' },
          ],
        },
      ],
      readyText: 'Use M -> Field station, then Enter to file the Shore Shelter note.',
      expectedFiledTextIncludes: ['American Dunegrass', 'Driftwood', 'Bull Kelp Wrack', 'mark shelter'],
      expectedNextRequestId: 'forest-hidden-hollow',
    },
    {
      name: 'Hidden Hollow',
      requestId: 'forest-hidden-hollow',
      createContext: () => createForestContext(['beach-shore-shelter'], 'seep-pocket'),
      activeTitle: 'Hidden Hollow',
      activeProgressLabel: '0/1 clue',
      steps: [
        {
          entryId: 'seep-stone',
          expectedLandmarks: ['seep-stone'],
        },
      ],
      readyText: 'Return to the field station and file the Hidden Hollow note.',
      expectedNextRequestId: 'forest-moisture-holders',
    },
    {
      name: 'Moisture Holders',
      requestId: 'forest-moisture-holders',
      createContext: () => createForestContext(['beach-shore-shelter', 'forest-hidden-hollow'], 'root-hollow'),
      activeTitle: 'Moisture Holders',
      activeProgressLabel: '0/3 clues',
      steps: [
        {
          entryId: 'sword-fern',
          expectedSlots: [{ slotId: 'shelter', entryId: 'sword-fern' }],
        },
        {
          entryId: 'redwood-sorrel',
          expectedSlots: [
            { slotId: 'shelter', entryId: 'sword-fern' },
            { slotId: 'ground', entryId: 'redwood-sorrel' },
          ],
        },
        {
          entryId: 'banana-slug',
          expectedSlots: [
            { slotId: 'shelter', entryId: 'sword-fern' },
            { slotId: 'ground', entryId: 'redwood-sorrel' },
            { slotId: 'living', entryId: 'banana-slug' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Moisture Holders note.',
      expectedFiledTextIncludes: ['Sword Fern', 'Redwood Sorrel', 'Banana Slug', 'hollow holding moisture'],
      expectedNextRequestId: 'forest-survey-slice',
    },
    {
      name: 'Open To Shelter',
      requestId: 'coastal-shelter-shift',
      createContext: () => createCoastalContext(EARLY_FOREST_COMPLETED, 'back-dune'),
      activeTitle: 'Open To Shelter',
      activeProgressLabel: '0/3 stages',
      steps: [
        {
          zoneId: 'back-dune',
          entryId: 'sand-verbena',
          expectedSlots: [{ slotId: 'open-bloom', entryId: 'sand-verbena' }],
        },
        {
          zoneId: 'shore-pine-stand',
          entryId: 'shore-pine',
          expectedSlots: [
            { slotId: 'open-bloom', entryId: 'sand-verbena' },
            { slotId: 'pine-cover', entryId: 'shore-pine' },
          ],
        },
        {
          zoneId: 'forest-edge',
          entryId: 'nurse-log',
          expectedSlots: [
            { slotId: 'open-bloom', entryId: 'sand-verbena' },
            { slotId: 'pine-cover', entryId: 'shore-pine' },
            { slotId: 'edge-log', entryId: 'nurse-log' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Open To Shelter note.',
      expectedFiledTextIncludes: ['Sand Verbena', 'Shore Pine', 'Nurse Log', 'open coast'],
      expectedNextRequestId: 'coastal-edge-moisture',
    },
    {
      name: 'Stone Shelter',
      requestId: 'treeline-stone-shelter',
      createContext: () => createTreelineContext(COASTAL_TO_TREELINE_COMPLETED, 'krummholz-belt'),
      activeTitle: 'Stone Shelter',
      activeProgressLabel: '0/3 clues',
      blockedProbe: { zoneId: 'dwarf-shrub', entryId: 'frost-heave-boulder' },
      steps: [
        {
          zoneId: 'krummholz-belt',
          entryId: 'krummholz-spruce',
          expectedSlots: [{ slotId: 'bent-cover', entryId: 'krummholz-spruce' }],
        },
        {
          zoneId: 'dwarf-shrub',
          entryId: 'frost-heave-boulder',
          expectedSlots: [
            { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
            { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
          ],
        },
        {
          zoneId: 'dwarf-shrub',
          entryId: 'hoary-marmot',
          expectedSlots: [
            { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
            { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-life', entryId: 'hoary-marmot' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Stone Shelter note.',
      expectedFiledTextIncludes: ['Krummholz Spruce', 'Frost-Heave Boulder', 'Hoary Marmot', 'treeline pocket'],
      expectedNextRequestId: 'tundra-short-season',
    },
    {
      name: 'Short Season',
      requestId: 'tundra-short-season',
      createContext: () => createTundraContext([...COASTAL_TO_TREELINE_COMPLETED, 'treeline-stone-shelter'], 'snow-meadow'),
      activeTitle: 'Short Season',
      activeProgressLabel: '0/3 clues',
      blockedProbe: { zoneId: 'snow-meadow', entryId: 'cloudberry' },
      steps: [
        {
          zoneId: 'snow-meadow',
          entryId: 'purple-saxifrage',
          expectedSlots: [{ slotId: 'first-bloom', entryId: 'purple-saxifrage' }],
        },
        {
          zoneId: 'thaw-skirt',
          entryId: 'cottongrass',
          expectedSlots: [
            { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
            { slotId: 'wet-tuft', entryId: 'cottongrass' },
          ],
        },
        {
          zoneId: 'snow-meadow',
          entryId: 'cloudberry',
          expectedSlots: [
            { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
            { slotId: 'wet-tuft', entryId: 'cottongrass' },
            { slotId: 'brief-fruit', entryId: 'cloudberry' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Short Season note.',
      expectedFiledTextIncludes: ['Purple Saxifrage', 'Cottongrass', 'Cloudberry', 'short thaw window'],
      expectedNextRequestId: 'tundra-survey-slice',
    },
    {
      name: 'Scrub Pattern',
      requestId: 'scrub-edge-pattern',
      createContext: () => createCoastalContext(INLAND_COMPLETED, 'back-dune'),
      activeTitle: 'Scrub Pattern',
      activeProgressLabel: '0/3 stages',
      steps: [
        {
          zoneId: 'back-dune',
          entryId: 'dune-lupine',
          expectedSlots: [{ slotId: 'open-pioneer', entryId: 'dune-lupine' }],
        },
        {
          zoneId: 'windbreak-swale',
          entryId: 'pacific-wax-myrtle',
          expectedSlots: [
            { slotId: 'open-pioneer', entryId: 'dune-lupine' },
            { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
          ],
        },
        {
          zoneId: 'forest-edge',
          entryId: 'salmonberry',
          expectedSlots: [
            { slotId: 'open-pioneer', entryId: 'dune-lupine' },
            { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
            { slotId: 'thicker-edge', entryId: 'salmonberry' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Scrub Pattern note.',
      expectedFiledTextIncludes: ['Seashore Lupine', 'Pacific Wax Myrtle', 'Salmonberry', 'clear transition'],
      expectedNextRequestId: 'forest-cool-edge',
    },
    {
      name: 'Cool Edge',
      requestId: 'forest-cool-edge',
      createContext: () => createForestContext([...INLAND_COMPLETED, 'scrub-edge-pattern'], 'creek-bend'),
      activeTitle: 'Cool Edge',
      activeProgressLabel: '0/3 clues',
      steps: [
        {
          entryId: 'salmonberry',
          expectedSlots: [{ slotId: 'edge-carrier', entryId: 'salmonberry' }],
        },
        {
          entryId: 'redwood-sorrel',
          expectedSlots: [
            { slotId: 'edge-carrier', entryId: 'salmonberry' },
            { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
          ],
        },
        {
          entryId: 'sword-fern',
          expectedSlots: [
            { slotId: 'edge-carrier', entryId: 'salmonberry' },
            { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
            { slotId: 'wet-shade', entryId: 'sword-fern' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Cool Edge note.',
      expectedFiledTextIncludes: ['Salmonberry', 'Redwood Sorrel', 'Sword Fern', 'cooler forest middle'],
      expectedNextRequestId: 'treeline-low-fell',
    },
    {
      name: 'Low Fell',
      requestId: 'treeline-low-fell',
      createContext: () => createTreelineContext([...INLAND_COMPLETED, 'scrub-edge-pattern', 'forest-cool-edge'], 'krummholz-belt'),
      activeTitle: 'Low Fell',
      activeProgressLabel: '0/4 clues',
      blockedProbe: { zoneId: 'lichen-fell', entryId: 'mountain-avens' },
      steps: [
        {
          zoneId: 'krummholz-belt',
          entryId: 'krummholz-spruce',
          expectedSlots: [{ slotId: 'last-tree-shape', entryId: 'krummholz-spruce' }],
        },
        {
          zoneId: 'dwarf-shrub',
          entryId: 'dwarf-birch',
          expectedSlots: [
            { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
            { slotId: 'low-wood', entryId: 'dwarf-birch' },
          ],
        },
        {
          zoneId: 'lichen-fell',
          entryId: 'mountain-avens',
          expectedSlots: [
            { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
            { slotId: 'low-wood', entryId: 'dwarf-birch' },
            { slotId: 'fell-bloom', entryId: 'mountain-avens' },
          ],
        },
        {
          zoneId: 'lichen-fell',
          entryId: 'arctic-willow',
          expectedSlots: [
            { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
            { slotId: 'low-wood', entryId: 'dwarf-birch' },
            { slotId: 'fell-bloom', entryId: 'mountain-avens' },
            { slotId: 'low-rest', entryId: 'arctic-willow' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Low Fell note.',
      expectedFiledTextIncludes: ['Krummholz Spruce', 'Dwarf Birch', 'Mountain Avens', 'Arctic Willow', 'open fell'],
      expectedNextRequestId: 'forest-expedition-upper-run',
    },
    {
      name: 'Root Hollow',
      requestId: 'forest-expedition-upper-run',
      createContext: () => createForestContext(EDGE_LINE_COMPLETED, 'seep-pocket'),
      activeTitle: 'Root Hollow',
      activeProgressLabel: '0/4 clues',
      blockedProbe: { zoneId: 'log-run', entryId: 'fir-cone' },
      steps: [
        {
          zoneId: 'seep-pocket',
          entryId: 'seep-stone',
          expectedSlots: [{ slotId: 'seep-mark', entryId: 'seep-stone' }],
        },
        {
          zoneId: 'stone-basin',
          entryId: 'banana-slug',
          expectedSlots: [
            { slotId: 'seep-mark', entryId: 'seep-stone' },
            { slotId: 'stone-pocket', entryId: 'banana-slug' },
          ],
        },
        {
          zoneId: 'filtered-return',
          entryId: 'root-curtain',
          expectedSlots: [
            { slotId: 'seep-mark', entryId: 'seep-stone' },
            { slotId: 'stone-pocket', entryId: 'banana-slug' },
            { slotId: 'root-held', entryId: 'root-curtain' },
          ],
        },
        {
          zoneId: 'log-run',
          entryId: 'fir-cone',
          expectedSlots: [
            { slotId: 'seep-mark', entryId: 'seep-stone' },
            { slotId: 'stone-pocket', entryId: 'banana-slug' },
            { slotId: 'root-held', entryId: 'root-curtain' },
            { slotId: 'high-run', entryId: 'fir-cone' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the Root Hollow note.',
      expectedFiledTextIncludes: ['Seep Stone', 'Banana Slug', 'Root Curtain', 'Douglas-fir Cone', 'hollow return'],
      expectedNextRequestId: 'forest-season-threads',
    },
    {
      name: 'High Pass',
      requestId: 'treeline-high-pass',
      createContext: () => createTreelineContext(HIGH_PASS_COMPLETED, 'dwarf-shrub'),
      activeTitle: 'High Pass',
      activeProgressLabel: '0/4 clues',
      blockedProbe: { zoneId: 'lichen-fell', entryId: 'talus-cushion-pocket' },
      steps: [
        {
          zoneId: 'dwarf-shrub',
          entryId: 'frost-heave-boulder',
          expectedSlots: [{ slotId: 'stone-lift', entryId: 'frost-heave-boulder' }],
        },
        {
          zoneId: 'dwarf-shrub',
          entryId: 'hoary-marmot',
          expectedSlots: [
            { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-watch', entryId: 'hoary-marmot' },
          ],
        },
        {
          zoneId: 'lichen-fell',
          entryId: 'moss-campion',
          expectedSlots: [
            { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-watch', entryId: 'hoary-marmot' },
            { slotId: 'rime-mark', entryId: 'moss-campion' },
          ],
        },
        {
          zoneId: 'lichen-fell',
          entryId: 'talus-cushion-pocket',
          expectedSlots: [
            { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-watch', entryId: 'hoary-marmot' },
            { slotId: 'rime-mark', entryId: 'moss-campion' },
            { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
          ],
        },
      ],
      readyText: 'Return to the field station and file the High Pass note.',
      expectedFiledTextIncludes: ['Frost-Heave Boulder', 'Hoary Marmot', 'Moss Campion', 'Talus Cushion Pocket', 'High Pass'],
      expectedNextRequestId: null,
    },
  ];
}

function createRouteVariantMatrixCases(): RouteVariantMatrixCase[] {
  return [
    {
      name: 'Wrack Shelter keeps Shore Shelter filing identity',
      requestId: 'beach-shore-shelter',
      createContext: () => createBeachContext([], 'dune-edge'),
      activateWindow: (context) => {
        context.save.worldStep = 6;
        context.save.biomeVisits.beach = 2;
      },
      activeTitle: 'Wrack Shelter',
      readyTitle: 'Shore Shelter',
      steps: [
        {
          zoneId: 'dune-edge',
          entryId: 'beach-grass',
          expectedSlots: [{ slotId: 'dune-grass', entryId: 'beach-grass' }],
        },
        {
          zoneId: 'lee-pocket',
          entryId: 'driftwood-log',
          expectedSlots: [
            { slotId: 'dune-grass', entryId: 'beach-grass' },
            { slotId: 'lee-cover', entryId: 'driftwood-log' },
          ],
        },
        {
          zoneId: 'tide-line',
          entryId: 'beach-hopper',
          expectedSlots: [
            { slotId: 'dune-grass', entryId: 'beach-grass' },
            { slotId: 'lee-cover', entryId: 'driftwood-log' },
            { slotId: 'wrack-line', entryId: 'beach-hopper' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
        { slotId: 'wrack-line', entryId: 'beach-hopper' },
      ],
      expectedFiledTextIncludes: ['American Dunegrass', 'Driftwood', 'Beach Hopper', 'mark shelter'],
    },
    {
      name: 'Moist Hollow keeps Moisture Holders filing identity',
      requestId: 'forest-moisture-holders',
      createContext: () => createForestContext(['beach-shore-shelter', 'forest-hidden-hollow'], 'filtered-return'),
      activateWindow: (context) => {
        context.save.worldStep = 6;
        context.save.biomeVisits.forest = 2;
      },
      activeTitle: 'Moist Hollow',
      readyTitle: 'Moisture Holders',
      steps: [
        {
          entryId: 'tree-lungwort',
          expectedSlots: [{ slotId: 'shelter', entryId: 'tree-lungwort' }],
        },
        {
          entryId: 'seep-moss-mat',
          expectedSlots: [
            { slotId: 'shelter', entryId: 'tree-lungwort' },
            { slotId: 'ground', entryId: 'seep-moss-mat' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'shelter', entryId: 'tree-lungwort' },
        { slotId: 'ground', entryId: 'seep-moss-mat' },
        { slotId: 'living', entryId: 'banana-slug' },
      ],
      expectedFiledTextIncludes: ['Tree Lungwort', 'Seep Moss Mat', 'Banana Slug', 'hollow holding moisture'],
    },
    {
      name: 'Held Sand keeps Scrub Pattern filing identity',
      requestId: 'scrub-edge-pattern',
      createContext: () => createCoastalContext(INLAND_COMPLETED, 'back-dune'),
      activateWindow: (context) => {
        context.save.worldStep = 6;
        context.save.biomeVisits['coastal-scrub'] = 2;
      },
      activeTitle: 'Held Sand',
      readyTitle: 'Scrub Pattern',
      steps: [
        {
          zoneId: 'back-dune',
          entryId: 'beach-grass',
          expectedSlots: [{ slotId: 'open-pioneer', entryId: 'beach-grass' }],
        },
        {
          zoneId: 'windbreak-swale',
          entryId: 'pacific-wax-myrtle',
          expectedSlots: [
            { slotId: 'open-pioneer', entryId: 'beach-grass' },
            { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
          ],
        },
        {
          zoneId: 'forest-edge',
          entryId: 'salmonberry',
          expectedSlots: [
            { slotId: 'open-pioneer', entryId: 'beach-grass' },
            { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
            { slotId: 'thicker-edge', entryId: 'salmonberry' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'open-pioneer', entryId: 'beach-grass' },
        { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
        { slotId: 'thicker-edge', entryId: 'salmonberry' },
      ],
      expectedFiledTextIncludes: ['American Dunegrass', 'Pacific Wax Myrtle', 'Salmonberry', 'clear transition'],
    },
    {
      name: 'Moist Edge keeps Cool Edge filing identity',
      requestId: 'forest-cool-edge',
      createContext: () => createForestContext([...INLAND_COMPLETED, 'scrub-edge-pattern'], 'creek-bend'),
      activateWindow: (context) => {
        context.save.worldStep = 6;
        context.save.biomeVisits.forest = 2;
      },
      activeTitle: 'Moist Edge',
      readyTitle: 'Cool Edge',
      readyEvidenceSlots: [
        { slotId: 'edge-carrier', entryId: 'salmonberry' },
        { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
        { slotId: 'wet-shade', entryId: 'sword-fern' },
      ],
      expectedFiledTextIncludes: ['Salmonberry', 'Redwood Sorrel', 'Sword Fern', 'cooler forest middle'],
    },
    {
      name: 'Thaw Window keeps Short Season filing identity',
      requestId: 'tundra-short-season',
      createContext: () => createTundraContext([...COASTAL_TO_TREELINE_COMPLETED, 'treeline-stone-shelter'], 'thaw-skirt'),
      activateWindow: (context) => {
        context.save.worldStep = 4;
        context.save.biomeVisits.tundra = 2;
      },
      activeTitle: 'Thaw Window',
      readyTitle: 'Short Season',
      steps: [
        {
          zoneId: 'thaw-skirt',
          entryId: 'woolly-lousewort',
          expectedSlots: [{ slotId: 'first-bloom', entryId: 'woolly-lousewort' }],
        },
        {
          zoneId: 'thaw-skirt',
          entryId: 'bigelows-sedge',
          expectedSlots: [
            { slotId: 'first-bloom', entryId: 'woolly-lousewort' },
            { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
          ],
        },
        {
          zoneId: 'snow-meadow',
          entryId: 'cloudberry',
          expectedSlots: [
            { slotId: 'first-bloom', entryId: 'woolly-lousewort' },
            { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
            { slotId: 'brief-fruit', entryId: 'cloudberry' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'first-bloom', entryId: 'woolly-lousewort' },
        { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
      expectedFiledTextIncludes: ['Woolly Lousewort', 'Bigelow\'s Sedge', 'Cloudberry', 'short thaw window'],
      expectedDisplayTextIncludes: ['Thaw Window.', 'Woolly Lousewort', 'Bigelow\'s Sedge'],
    },
    {
      name: 'Brief Bloom keeps Low Fell filing identity',
      requestId: 'treeline-low-fell',
      createContext: () => {
        const context = createTreelineContext([...INLAND_COMPLETED, 'scrub-edge-pattern', 'forest-cool-edge'], 'lichen-fell');
        context.save.routeV2Progress = {
          requestId: 'treeline-low-fell',
          status: 'gathering',
          landmarkEntryIds: [],
          evidenceSlots: [
            { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
            { slotId: 'low-wood', entryId: 'dwarf-birch' },
          ],
        };
        return context;
      },
      activateWindow: (context) => {
        context.save.worldStep = 4;
        context.save.biomeVisits.treeline = 2;
      },
      activeTitle: 'Brief Bloom',
      readyTitle: 'Low Fell',
      steps: [
        {
          zoneId: 'lichen-fell',
          entryId: 'moss-campion',
          expectedSlots: [
            { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
            { slotId: 'low-wood', entryId: 'dwarf-birch' },
            { slotId: 'fell-bloom', entryId: 'moss-campion' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
        { slotId: 'fell-bloom', entryId: 'moss-campion' },
        { slotId: 'low-rest', entryId: 'arctic-willow' },
      ],
      expectedFiledTextIncludes: ['Krummholz Spruce', 'Dwarf Birch', 'Moss Campion', 'Arctic Willow', 'open fell'],
    },
    {
      name: 'Rimed Pass keeps High Pass filing identity',
      requestId: 'treeline-high-pass',
      createContext: () => {
        const context = createTreelineContext(HIGH_PASS_COMPLETED, 'lichen-fell');
        context.save.routeV2Progress = {
          requestId: 'treeline-high-pass',
          status: 'gathering',
          landmarkEntryIds: [],
          evidenceSlots: [
            { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-watch', entryId: 'hoary-marmot' },
          ],
        };
        return context;
      },
      activateWindow: (context) => {
        context.save.worldStep = 6;
        context.save.biomeVisits.treeline = 2;
      },
      activeTitle: 'Rimed Pass',
      readyTitle: 'High Pass',
      steps: [
        {
          zoneId: 'lichen-fell',
          entryId: 'reindeer-lichen',
          expectedSlots: [
            { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
            { slotId: 'lee-watch', entryId: 'hoary-marmot' },
            { slotId: 'rime-mark', entryId: 'reindeer-lichen' },
          ],
        },
      ],
      readyEvidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'rime-mark', entryId: 'reindeer-lichen' },
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
      ],
      expectedFiledTextIncludes: ['Frost-Heave Boulder', 'Hoary Marmot', 'Reindeer Lichen', 'Talus Cushion Pocket', 'High Pass'],
    },
  ];
}

describe('field requests', () => {
  it('builds the notebook hint from the active field request only when the play overlay can show it', () => {
    const save = createNewSaveState('field-request-state-hint-seed');
    save.completedFieldRequestIds = ['beach-shore-shelter'];

    const visibleHintState = resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'trailhead',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
    });
    expect(visibleHintState.activeFieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      title: 'Hidden Hollow',
    });
    expect(visibleHintState.fieldRequestHint).toEqual({
      label: 'NOTEBOOK J',
      title: 'Hidden Hollow',
      variant: 'default',
    });

    const suppressedHintState = resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'trailhead',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: true,
    });
    expect(suppressedHintState.fieldRequestHint).toBeNull();
  });

  it('falls back to the season outing locator for journal and replay state during the calm season-close return beat', () => {
    const save = createNewSaveState('field-request-state-season-seed');
    save.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    save.seasonCloseReturnPending = true;

    const state = resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
      sceneMode: 'world-map',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'trailhead',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
      focusedWorldMapLocationId: 'treeline',
    });

    expect(state.activeFieldRequest).toBeNull();
    expect(state.activeOuting).toMatchObject({
      title: 'High Pass',
      targetBiomeId: 'treeline',
      worldMapLabel: 'Today: High Pass',
    });
    expect(state.journalFieldRequest).toMatchObject({
      id: 'route-locator:treeline',
      biomeId: 'treeline',
      title: 'High Pass',
      progressLabel: 'NEXT',
    });
    expect(state.routeReplayLabel).toBe('Today: High Pass');
  });

  it('turns High Pass into the active post-season request once the station-close beat clears', () => {
    const save = createNewSaveState('field-request-state-high-pass-seed');
    save.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];

    const state = resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
      sceneMode: 'world-map',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'trailhead',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
      focusedWorldMapLocationId: 'treeline',
    });

    expect(state.activeFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
      title: 'High Pass',
      progressLabel: 'Go To Treeline Pass',
    });
    expect(state.journalFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
      title: 'High Pass',
      progressLabel: 'Go To Treeline Pass',
    });
    expect(state.routeReplayLabel).toBe('Today: High Pass');
  });

  it('keeps route-marker and replay state aligned across active, ready-to-file, locator, and filed High Pass states', () => {
    const resolveHighPassMapState = (save: SaveState) =>
      resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
        sceneMode: 'world-map',
        overlayMode: 'playing',
        sceneBiomeId: 'forest',
        lastBiomeId: 'forest',
        sceneZoneId: 'trailhead',
        scenePlayerX: 24,
        scenePlayerY: 48,
        hasFieldRequestNotice: false,
        focusedWorldMapLocationId: 'treeline',
      });

    const activeSave = createNewSaveState('field-request-state-high-pass-active-route-marker-seed');
    activeSave.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    activeSave.purchasedUpgradeIds = ['route-marker'];
    activeSave.selectedOutingSupportId = 'route-marker';

    const activeState = resolveHighPassMapState(activeSave);
    expect(activeState.activeFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      progressLabel: 'Go To Treeline Pass',
    });
    expect(activeState.activeOuting).toMatchObject({
      title: 'High Pass',
      targetBiomeId: 'treeline',
      worldMapLabel: 'Today: High Pass',
    });
    expect(activeState.journalFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
    });
    expect(activeState.routeMarkerLocationId).toBe('treeline');
    expect(activeState.routeReplayLabel).toBe('Today: High Pass');

    const readySave = createNewSaveState('field-request-state-high-pass-ready-route-marker-seed');
    readySave.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    readySave.purchasedUpgradeIds = ['route-marker'];
    readySave.selectedOutingSupportId = 'route-marker';
    readySave.routeV2Progress = {
      requestId: 'treeline-high-pass',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'rime-mark', entryId: 'moss-campion' },
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
      ],
    };

    const readyState = resolveHighPassMapState(readySave);
    expect(readyState.activeFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
      },
    });
    expect(readyState.journalFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
      progressLabel: 'Ready To File',
    });
    expect(readyState.activeOuting).toBeNull();
    expect(readyState.routeMarkerLocationId).toBeNull();
    expect(readyState.routeReplayLabel).toBeNull();

    const locatorSave = createNewSaveState('field-request-state-high-pass-locator-seed');
    locatorSave.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    locatorSave.seasonCloseReturnPending = true;

    const locatorState = resolveHighPassMapState(locatorSave);
    expect(locatorState.activeFieldRequest).toBeNull();
    expect(locatorState.activeOuting).toMatchObject({
      title: 'High Pass',
      targetBiomeId: 'treeline',
      worldMapLabel: 'Today: High Pass',
    });
    expect(locatorState.journalFieldRequest).toMatchObject({
      id: 'route-locator:treeline',
      biomeId: 'treeline',
      title: 'High Pass',
    });
    expect(locatorState.routeMarkerLocationId).toBeNull();
    expect(locatorState.routeReplayLabel).toBe('Today: High Pass');

    const filedSave = createNewSaveState('field-request-state-high-pass-filed-route-marker-seed');
    filedSave.completedFieldRequestIds = [
      'forest-expedition-upper-run',
      'forest-season-threads',
      'treeline-high-pass',
    ];
    filedSave.purchasedUpgradeIds = ['route-marker'];
    filedSave.selectedOutingSupportId = 'route-marker';

    const filedState = resolveHighPassMapState(filedSave);
    expect(filedState.activeFieldRequest).toBeNull();
    expect(filedState.activeOuting).toBeNull();
    expect(filedState.journalFieldRequest).toBeNull();
    expect(filedState.routeMarkerLocationId).toBeNull();
    expect(filedState.routeReplayLabel).toBeNull();
  });

  it('stops synthesizing High Pass locator state once High Pass is filed', () => {
    const save = createNewSaveState('field-request-state-high-pass-filed-seed');
    save.completedFieldRequestIds = [
      'forest-expedition-upper-run',
      'forest-season-threads',
      'treeline-high-pass',
    ];
    save.purchasedUpgradeIds = ['route-marker'];
    save.selectedOutingSupportId = 'route-marker';

    const state = resolveFieldRequestState(biomeRegistry, ecoWorldMap, save, {
      sceneMode: 'world-map',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'trailhead',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
      focusedWorldMapLocationId: 'treeline',
    });

    expect(state.activeFieldRequest).toBeNull();
    expect(state.activeOuting).toBeNull();
    expect(state.journalFieldRequest).toBeNull();
    expect(state.fieldRequestHint).toBeNull();
    expect(state.routeMarkerLocationId).toBeNull();
    expect(state.routeReplayLabel).toBeNull();
  });

  it('starts with the beach shore-shelter request active', () => {
    const activeRequest = resolveActiveFieldRequest(createBeachContext());

    expect(activeRequest).toMatchObject({
      id: 'beach-shore-shelter',
      biomeId: 'beach',
      title: 'Shore Shelter',
      progressLabel: '0/3 stages',
    });
  });

  it('shows a travel-facing progress label before the player reaches the target biome', () => {
    const save = createNewSaveState('field-request-travel-seed');

    const activeRequest = resolveActiveFieldRequest({
      biomes: biomeRegistry,
      save,
      currentBiomeId: 'forest',
      currentZoneId: 'trailhead',
      currentPlayerX: null,
      currentPlayerY: null,
    });

    expect(activeRequest).toMatchObject({
      id: 'beach-shore-shelter',
      progressLabel: 'Go To Sunny Beach',
    });
  });

  it('walks every live Route v2 notebook route through a deterministic route-state matrix', () => {
    for (const routeCase of createRouteMatrixCases()) {
      const context = routeCase.createContext();
      context.save.selectedOutingSupportId = 'note-tabs';

      const activeRequest = resolveActiveFieldRequest(context);
      expect(activeRequest).toMatchObject({
        id: routeCase.requestId,
        title: routeCase.activeTitle,
        progressLabel: routeCase.activeProgressLabel,
        routeV2: {
          status: 'gathering',
          selectedSupportId: 'note-tabs',
        },
      });
      expect(activeRequest?.routeV2?.evidenceSlots).toEqual([]);

      if (routeCase.blockedProbe) {
        setRouteMatrixZone(context, routeCase.blockedProbe.zoneId);
        expect(advanceActiveFieldRequest(context, 'inspect', routeCase.blockedProbe.entryId)).toBeNull();
        expect(context.save.routeV2Progress).toBeNull();
      }

      for (const [stepIndex, step] of routeCase.steps.entries()) {
        const isFinalStep = stepIndex === routeCase.steps.length - 1;
        setRouteMatrixZone(context, step.zoneId);

        const result = advanceActiveFieldRequest(context, 'inspect', step.entryId);
        if (isFinalStep) {
          expect(result).toMatchObject({
            requestId: routeCase.requestId,
            status: 'ready-to-synthesize',
            noticeTitle: 'NOTEBOOK READY',
            noticeText: routeCase.readyText,
          });
        } else {
          expect(result).toBeNull();
        }

        const progressedRequest = resolveActiveFieldRequest(context);
        expect(progressedRequest).toMatchObject({
          id: routeCase.requestId,
          routeV2: {
            status: isFinalStep ? 'ready-to-synthesize' : 'gathering',
            selectedSupportId: 'note-tabs',
          },
        });
        if (step.expectedSlots) {
          expect(progressedRequest?.routeV2?.evidenceSlots).toEqual(step.expectedSlots);
        }
        if (step.expectedLandmarks) {
          expect(progressedRequest?.routeV2?.landmarkEntryIds).toEqual(step.expectedLandmarks);
        }
      }

      const readyRequest = resolveActiveFieldRequest(context);
      expect(readyRequest).toMatchObject({
        id: routeCase.requestId,
        title: routeCase.activeTitle,
        progressLabel: 'Ready To File',
        routeV2: {
          status: 'ready-to-synthesize',
          selectedSupportId: 'note-tabs',
        },
      });
      expectFiledTextIncludes(readyRequest?.routeV2?.filedText, routeCase.expectedFiledTextIncludes);

      expect(fileReadyRouteV2FieldRequest(context.save)).toBe(routeCase.requestId);
      expect(context.save.routeV2Progress).toBeNull();
      expect(context.save.completedFieldRequestIds).toContain(routeCase.requestId);

      const nextRequest = resolveActiveFieldRequest(context);
      if (routeCase.expectedNextRequestId) {
        expect(nextRequest).toMatchObject({ id: routeCase.expectedNextRequestId });
      } else {
        expect(nextRequest).toBeNull();
      }
    }
  });

  it('keeps process and world-state route variants live-only inside the route-state matrix', () => {
    for (const variantCase of createRouteVariantMatrixCases()) {
      const context = variantCase.createContext();
      context.save.selectedOutingSupportId = 'hand-lens';
      variantCase.activateWindow(context);

      expect(resolveActiveFieldRequest(context)).toMatchObject({
        id: variantCase.requestId,
        title: variantCase.activeTitle,
        routeV2: {
          status: 'gathering',
          selectedSupportId: 'hand-lens',
        },
      });

      for (const step of variantCase.steps ?? []) {
        setRouteMatrixZone(context, step.zoneId);
        const result = advanceActiveFieldRequest(context, 'inspect', step.entryId);
        const progressedRequest = resolveActiveFieldRequest(context);
        if (step.expectedSlots && step.expectedSlots.length === variantCase.readyEvidenceSlots.length) {
          expect(result).toMatchObject({
            requestId: variantCase.requestId,
            status: 'ready-to-synthesize',
          });
        } else {
          expect(result).toBeNull();
        }
        if (step.expectedSlots) {
          expect(progressedRequest?.routeV2?.evidenceSlots).toEqual(step.expectedSlots);
        }
      }

      context.save.routeV2Progress = {
        requestId: variantCase.requestId,
        status: 'ready-to-synthesize',
        landmarkEntryIds: [],
        evidenceSlots: variantCase.readyEvidenceSlots,
      };

      const readyRequest = resolveActiveFieldRequest(context);
      expect(readyRequest).toMatchObject({
        id: variantCase.requestId,
        title: variantCase.readyTitle,
        progressLabel: 'Ready To File',
        routeV2: {
          status: 'ready-to-synthesize',
          selectedSupportId: 'hand-lens',
        },
      });
      expectFiledTextIncludes(readyRequest?.routeV2?.filedText, variantCase.expectedFiledTextIncludes);
      expectFiledTextIncludes(
        resolveRouteV2FiledDisplayText(biomeRegistry, context.save, variantCase.requestId),
        variantCase.expectedDisplayTextIncludes,
      );
    }
  });

  it('turns Shore Shelter into an ordered beach transect that waits for filing', () => {
    const context = createBeachContext();

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'beach-shore-shelter',
      progressLabel: '0/3 stages',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'driftwood-log')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'driftwood-log')).toBeNull();
    expect(getHandLensNotebookFit(context, 'beach-grass')).toBe('Notebook fit: dune grass');
    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-grass')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'dune-grass', entryId: 'beach-grass' },
    ]);

    context.currentZoneId = 'lee-pocket';
    expect(getHandLensNotebookFit(context, 'bull-kelp-wrack')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'bull-kelp-wrack')).toBeNull();
    expect(getHandLensNotebookFit(context, 'driftwood-log')).toBe('Notebook fit: lee cover');
    expect(advanceActiveFieldRequest(context, 'inspect', 'driftwood-log')).toBeNull();

    context.currentZoneId = 'tide-line';
    expect(getHandLensNotebookFit(context, 'bull-kelp-wrack')).toBe('Notebook fit: wrack line');
    expect(advanceActiveFieldRequest(context, 'inspect', 'bull-kelp-wrack')).toMatchObject({
      requestId: 'beach-shore-shelter',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'beach-shore-shelter',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'dune-grass', entryId: 'beach-grass' },
          { slotId: 'lee-cover', entryId: 'driftwood-log' },
          { slotId: 'wrack-line', entryId: 'bull-kelp-wrack' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('beach-shore-shelter');
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Go To Forest Trail',
    });
  });

  it('unlocks the moisture request after the hollow request is complete', () => {
    const activeRequest = resolveActiveFieldRequest(createForestContext(['forest-hidden-hollow']));

    expect(activeRequest).toMatchObject({
      id: 'forest-moisture-holders',
      title: 'Moisture Holders',
      progressLabel: 'Return To Root Hollow',
    });
  });

  it('marks Hidden Hollow ready after the seep-stone confirmation and waits for filing', () => {
    const context = createForestContext(['beach-shore-shelter'], 'seep-pocket');

    const result = advanceActiveFieldRequest(context, 'inspect', 'seep-stone');
    expect(result).toMatchObject({
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        landmarkEntryIds: ['seep-stone'],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('forest-hidden-hollow');
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: '0/3 clues',
    });
  });

  it('turns Moisture Holders into a three-slot assemble beat that waits for filing', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'root-hollow');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(advanceActiveFieldRequest(context, 'inspect', 'sword-fern')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      {
        slotId: 'shelter',
        entryId: 'sword-fern',
      },
    ]);

    expect(advanceActiveFieldRequest(context, 'inspect', 'banana-slug')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      {
        slotId: 'shelter',
        entryId: 'sword-fern',
      },
      {
        slotId: 'living',
        entryId: 'banana-slug',
      },
    ]);

    const result = advanceActiveFieldRequest(context, 'inspect', 'redwood-sorrel');
    expect(result).toMatchObject({
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'shelter', entryId: 'sword-fern' },
          { slotId: 'living', entryId: 'banana-slug' },
          { slotId: 'ground', entryId: 'redwood-sorrel' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('forest-moisture-holders');
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-survey-slice',
    });
  });

  it('labels only missing assemble-evidence slots for the hand lens support', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'root-hollow');

    expect(getHandLensNotebookFit(context, 'sword-fern')).toBe('Notebook fit: shelter');
    expect(getHandLensNotebookFit(context, 'redwood-sorrel')).toBe('Notebook fit: ground');
    expect(getHandLensNotebookFit(context, 'banana-slug')).toBe('Notebook fit: living');

    expect(advanceActiveFieldRequest(context, 'inspect', 'sword-fern')).toBeNull();
    expect(getHandLensNotebookFit(context, 'sword-fern')).toBeNull();
    expect(getHandLensNotebookFit(context, 'banana-slug')).toBe('Notebook fit: living');

    expect(advanceActiveFieldRequest(context, 'inspect', 'banana-slug')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'redwood-sorrel')).toMatchObject({
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
    });
    expect(getHandLensNotebookFit(context, 'ensatina')).toBeNull();
  });

  it('keeps older in-progress beach transect saves coherent through first-missing-stage guidance', () => {
    const beachContext = createBeachContext([], 'lee-pocket');
    beachContext.save.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'lee-cover', entryId: 'driftwood-log' }],
    };

    expect(resolveActiveFieldRequest(beachContext)).toMatchObject({
      id: 'beach-shore-shelter',
      progressLabel: 'Return To Dune Edge',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'lee-cover', entryId: 'driftwood-log' }],
      },
    });
    expect(getHandLensNotebookFit(beachContext, 'beach-grass')).toBeNull();

    beachContext.currentZoneId = 'dune-edge';
    expect(getHandLensNotebookFit(beachContext, 'beach-grass')).toBe('Notebook fit: dune grass');
  });

  it('only lets beach-hopper fit the wrack-line stage during the active wrack-hold window', () => {
    const context = createBeachContext([], 'tide-line');
    context.save.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
      ],
    };

    expect(getHandLensNotebookFit(context, 'beach-hopper')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-hopper')).toBeNull();
    expect(getHandLensNotebookFit(context, 'bull-kelp-wrack')).toBe('Notebook fit: wrack line');

    context.save.worldStep = 6;
    context.save.biomeVisits.beach = 2;

    expect(getHandLensNotebookFit(context, 'beach-hopper')).toBe('Notebook fit: wrack line');
    expect(getHandLensNotebookFit(context, 'bull-kelp-wrack')).toBe('Notebook fit: wrack line');
  });

  it('does not let a lee-pocket beach-hopper satisfy wrack-line from the tide-line boundary', () => {
    const context = createBeachContext([], 'tide-line');
    context.save.worldStep = 6;
    context.save.biomeVisits.beach = 2;
    context.save.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
      ],
    };

    expect(getHandLensNotebookFit(context, 'beach-hopper', 'lee-pocket')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-hopper', 'lee-pocket')).toBeNull();
    expect(getHandLensNotebookFit(context, 'beach-hopper', 'tide-line')).toBe('Notebook fit: wrack line');
  });

  it('keeps Shore Shelter canonical when beach-hopper finishes the live wrack-hold outing', () => {
    const context = createBeachContext([], 'tide-line');
    context.save.worldStep = 6;
    context.save.biomeVisits.beach = 2;
    context.save.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
      ],
    };

    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-hopper')).toMatchObject({
      requestId: 'beach-shore-shelter',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'beach-shore-shelter',
      title: 'Shore Shelter',
      summary: 'Use M -> Field station, then Enter to file the Shore Shelter note.',
      routeV2: {
        filedText: 'American Dunegrass, Driftwood, and Beach Hopper mark shelter from dune edge to tide line.',
      },
    });
  });

  it('unlocks the forest survey request after the moisture request is complete', () => {
    const context = createForestContext(
      ['forest-hidden-hollow', 'forest-moisture-holders'],
      'log-run',
    );
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(context.save, forestBiome.entries[entryId], 'forest');
    }

    const activeRequest = resolveActiveFieldRequest(context);
    expect(activeRequest).toMatchObject({
      id: 'forest-survey-slice',
      progressLabel: 'SURVEYED',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'enter-biome')).toBe('forest-survey-slice');
  });

  it('moves into a coastal follow-on request after the forest survey slice', () => {
    const activeRequest = resolveActiveFieldRequest(
      createCoastalContext(
        ['forest-hidden-hollow', 'forest-moisture-holders', 'forest-survey-slice'],
        'shrub-thicket',
      ),
    );

    expect(activeRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: 'Return To Back Dune',
    });
  });

  it('turns the coastal shelter request into an ordered transect that waits for filing', () => {
    const context = createCoastalContext(
      ['forest-hidden-hollow', 'forest-moisture-holders', 'forest-survey-slice'],
      'back-dune',
    );

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'coastal-shelter-shift',
      title: 'Open To Shelter',
      summary: 'Trace coast-to-forest shelter from bloom to pine to edge log.',
      progressLabel: '0/3 stages',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'shore-pine')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'shore-pine')).toBeNull();
    expect(getHandLensNotebookFit(context, 'sand-verbena')).toBe('Notebook fit: open bloom');
    expect(advanceActiveFieldRequest(context, 'inspect', 'sand-verbena')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'open-bloom', entryId: 'sand-verbena' },
    ]);

    context.currentZoneId = 'shore-pine-stand';
    expect(getHandLensNotebookFit(context, 'nurse-log')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'nurse-log')).toBeNull();
    expect(getHandLensNotebookFit(context, 'shore-pine')).toBe('Notebook fit: pine cover');
    expect(advanceActiveFieldRequest(context, 'inspect', 'shore-pine')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'open-bloom', entryId: 'sand-verbena' },
      { slotId: 'pine-cover', entryId: 'shore-pine' },
    ]);

    context.currentZoneId = 'forest-edge';
    expect(getHandLensNotebookFit(context, 'nurse-log')).toBe('Notebook fit: edge log');
    expect(advanceActiveFieldRequest(context, 'inspect', 'nurse-log')).toMatchObject({
      requestId: 'coastal-shelter-shift',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'open-bloom', entryId: 'sand-verbena' },
          { slotId: 'pine-cover', entryId: 'shore-pine' },
          { slotId: 'edge-log', entryId: 'nurse-log' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('coastal-shelter-shift');
  });

  it('unlocks the forest-edge moisture request after the open-to-shelter transect is filed', () => {
    const context = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
      ],
      'forest-edge',
    );
    recordDiscovery(context.save, biomeRegistry['coastal-scrub'].entries['sword-fern'], 'coastal-scrub');
    recordDiscovery(context.save, biomeRegistry['coastal-scrub'].entries['nurse-log'], 'coastal-scrub');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'coastal-edge-moisture',
      progressLabel: '2/2 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('coastal-edge-moisture');
  });

  it('moves into a treeline shelter request after the coastal line is logged', () => {
    const activeRequest = resolveActiveFieldRequest(
      createTreelineContext(
        [
          'forest-hidden-hollow',
          'forest-moisture-holders',
          'forest-survey-slice',
          'coastal-shelter-shift',
          'coastal-edge-moisture',
        ],
        'krummholz-belt',
      ),
    );

    expect(activeRequest).toMatchObject({
      id: 'treeline-stone-shelter',
      title: 'Stone Shelter',
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });
  });

  it('turns Stone Shelter into a notebook-ready treeline evidence pass', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
      ],
      'krummholz-belt',
    );

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-stone-shelter',
      progressLabel: '0/3 clues',
      summary: 'In Treeline Pass, log bent cover, stone break, and lee life through the last shelter.',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'frost-heave-boulder')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'frost-heave-boulder')).toBeNull();
    expect(getHandLensNotebookFit(context, 'krummholz-spruce')).toBe('Notebook fit: bent cover');
    expect(advanceActiveFieldRequest(context, 'inspect', 'krummholz-spruce')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
    ]);

    context.currentZoneId = 'dwarf-shrub';
    expect(getHandLensNotebookFit(context, 'hoary-marmot')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'hoary-marmot')).toBeNull();
    expect(getHandLensNotebookFit(context, 'frost-heave-boulder')).toBe('Notebook fit: stone break');
    expect(advanceActiveFieldRequest(context, 'inspect', 'frost-heave-boulder')).toBeNull();

    expect(getHandLensNotebookFit(context, 'hoary-marmot')).toBe('Notebook fit: lee life');
    expect(advanceActiveFieldRequest(context, 'inspect', 'hoary-marmot')).toMatchObject({
      requestId: 'treeline-stone-shelter',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-stone-shelter',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
          { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
          { slotId: 'lee-life', entryId: 'hoary-marmot' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('treeline-stone-shelter');
    expect(resolveActiveFieldRequest({
      ...context,
      currentBiomeId: 'tundra',
      currentZoneId: 'snow-meadow',
    })).toMatchObject({
      id: 'tundra-short-season',
    });
  });

  it('turns Short Season into a thaw-edge notebook-ready evidence pass', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      progressLabel: '0/3 clues',
      summary: 'In Tundra Reach, log first bloom, wet tuft, and brief fruit through the thaw window.',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'purple-saxifrage')).toBe('Notebook fit: first bloom');
    expect(advanceActiveFieldRequest(context, 'inspect', 'purple-saxifrage')).toBeNull();
    expect(getHandLensNotebookFit(context, 'cloudberry')).toBeNull();

    context.currentZoneId = 'thaw-skirt';
    expect(getHandLensNotebookFit(context, 'cottongrass')).toBe('Notebook fit: wet tuft');
    expect(advanceActiveFieldRequest(context, 'inspect', 'cottongrass')).toBeNull();

    context.currentZoneId = 'snow-meadow';
    expect(getHandLensNotebookFit(context, 'cloudberry')).toBe('Notebook fit: brief fruit');
    expect(advanceActiveFieldRequest(context, 'inspect', 'cloudberry')).toMatchObject({
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
          { slotId: 'wet-tuft', entryId: 'cottongrass' },
          { slotId: 'brief-fruit', entryId: 'cloudberry' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('tundra-short-season');
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-survey-slice',
    });
  });

  it('keeps older in-progress short-season saves coherent through first-missing-slot guidance', () => {
    const tundraContext = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );
    tundraContext.save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'brief-fruit', entryId: 'cloudberry' }],
    };

    expect(resolveActiveFieldRequest(tundraContext)).toMatchObject({
      id: 'tundra-short-season',
      progressLabel: '1/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'brief-fruit', entryId: 'cloudberry' }],
      },
    });
    expect(getHandLensNotebookFit(tundraContext, 'cottongrass')).toBeNull();
    expect(getHandLensNotebookFit(tundraContext, 'purple-saxifrage')).toBe('Notebook fit: first bloom');
  });

  it('unlocks the tundra survey request after the short-season task', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
      ],
      'frost-ridge',
    );
    for (const entryId of ['purple-saxifrage', 'cottongrass', 'woolly-lousewort', 'cloudberry']) {
      recordDiscovery(context.save, biomeRegistry.tundra.entries[entryId], 'tundra');
    }

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-survey-slice',
      progressLabel: 'SURVEYED',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'enter-biome')).toBe('tundra-survey-slice');
  });

  it('turns tundra-survey-slice into Bright Survey during peak phenology', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
      ],
      'frost-ridge',
    );
    for (const entryId of ['purple-saxifrage', 'cottongrass', 'woolly-lousewort', 'cloudberry']) {
      recordDiscovery(context.save, biomeRegistry.tundra.entries[entryId], 'tundra');
    }
    context.save.worldStep = 4;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-survey-slice',
      title: 'Bright Survey',
      summary: 'This is a good outing to finish the inland line while the short-season ground is clearest.',
      progressLabel: 'SURVEYED',
    });
  });

  it('keeps tundra-survey-slice generic outside the peak Bright Survey window', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
      ],
      'frost-ridge',
    );
    for (const entryId of ['purple-saxifrage', 'cottongrass', 'woolly-lousewort', 'cloudberry']) {
      recordDiscovery(context.save, biomeRegistry.tundra.entries[entryId], 'tundra');
    }
    context.save.worldStep = 6;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-survey-slice',
      title: 'Tundra Survey',
      summary: 'Bring Tundra Reach up to surveyed by logging four clues across Snow Meadow and Frost Ridge.',
      progressLabel: 'SURVEYED',
    });
  });

  it('moves into the scrub-pattern request after the inland line is logged', () => {
    const activeRequest = resolveActiveFieldRequest(
      createCoastalContext(
        [
          'forest-hidden-hollow',
          'forest-moisture-holders',
          'forest-survey-slice',
          'coastal-shelter-shift',
          'coastal-edge-moisture',
          'treeline-stone-shelter',
          'tundra-short-season',
          'tundra-survey-slice',
        ],
        'windbreak-swale',
      ),
    );

    expect(activeRequest).toMatchObject({
      id: 'scrub-edge-pattern',
      title: 'Scrub Pattern',
      progressLabel: 'Return To Back Dune',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });
  });

  it('only exposes the next transect stage through the hand lens', () => {
    const scrubContext = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'back-dune',
    );

    expect(getHandLensNotebookFit(scrubContext, 'dune-lupine')).toBe('Notebook fit: open pioneer');
    expect(getHandLensNotebookFit(scrubContext, 'pacific-wax-myrtle')).toBeNull();
    expect(getHandLensNotebookFit(scrubContext, 'salmonberry')).toBeNull();

    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'dune-lupine')).toBeNull();

    scrubContext.currentZoneId = 'windbreak-swale';
    expect(getHandLensNotebookFit(scrubContext, 'pacific-wax-myrtle')).toBe(
      'Notebook fit: holding cover',
    );
    expect(getHandLensNotebookFit(scrubContext, 'salmonberry')).toBeNull();

    scrubContext.currentZoneId = 'forest-edge';
    expect(getHandLensNotebookFit(scrubContext, 'salmonberry')).toBeNull();
  });

  it('completes the edge-pattern request chain through notebook-ready scrub and forest beats', () => {
    const scrubContext = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'back-dune',
    );

    expect(resolveActiveFieldRequest(scrubContext)).toMatchObject({
      id: 'scrub-edge-pattern',
      progressLabel: '0/3 stages',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    scrubContext.currentZoneId = 'windbreak-swale';
    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'pacific-wax-myrtle')).toBeNull();
    scrubContext.currentZoneId = 'forest-edge';
    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'salmonberry')).toBeNull();

    scrubContext.currentZoneId = 'back-dune';
    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'dune-lupine')).toBeNull();
    scrubContext.currentZoneId = 'windbreak-swale';
    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'pacific-wax-myrtle')).toBeNull();
    scrubContext.currentZoneId = 'forest-edge';
    expect(advanceActiveFieldRequest(scrubContext, 'inspect', 'salmonberry')).toMatchObject({
      requestId: 'scrub-edge-pattern',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(scrubContext)).toMatchObject({
      id: 'scrub-edge-pattern',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'open-pioneer', entryId: 'dune-lupine' },
          { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
          { slotId: 'thicker-edge', entryId: 'salmonberry' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(scrubContext.save)).toBe('scrub-edge-pattern');

    const forestContext = {
      biomes: biomeRegistry,
      save: scrubContext.save,
      currentBiomeId: 'forest' as const,
      currentZoneId: 'creek-bend',
      currentPlayerX: null,
      currentPlayerY: null,
    };

    expect(resolveActiveFieldRequest(forestContext)).toMatchObject({
      id: 'forest-cool-edge',
      title: 'Cool Edge',
      summary: 'At Creek Bend, file edge carrier, cool floor, and wet shade clues along the cooler forest side.',
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });
    expect(advanceActiveFieldRequest(forestContext, 'inspect', 'salmonberry')).toBeNull();
    expect(advanceActiveFieldRequest(forestContext, 'inspect', 'redwood-sorrel')).toBeNull();
    expect(advanceActiveFieldRequest(forestContext, 'inspect', 'sword-fern')).toMatchObject({
      requestId: 'forest-cool-edge',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(forestContext)).toMatchObject({
      id: 'forest-cool-edge',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'edge-carrier', entryId: 'salmonberry' },
          { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
          { slotId: 'wet-shade', entryId: 'sword-fern' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(forestContext.save)).toBe('forest-cool-edge');

    const treelineContext = {
      biomes: biomeRegistry,
      save: forestContext.save,
      currentBiomeId: 'treeline' as const,
      currentZoneId: 'lichen-fell',
      currentPlayerX: null,
      currentPlayerY: null,
    };
    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: '0/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'mountain-avens')).toBeNull();
    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: '0/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    treelineContext.currentZoneId = 'krummholz-belt';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'krummholz-spruce')).toBeNull();
    treelineContext.currentZoneId = 'lichen-fell';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'mountain-avens')).toBeNull();
    treelineContext.currentZoneId = 'dwarf-shrub';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'dwarf-birch')).toBeNull();
    treelineContext.currentZoneId = 'lichen-fell';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'mountain-avens')).toBeNull();
    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: '3/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
          { slotId: 'low-wood', entryId: 'dwarf-birch' },
          { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        ],
      },
    });
    expect(getHandLensNotebookFit(treelineContext, 'arctic-willow')).toBe('Notebook fit: low rest');
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'arctic-willow')).toMatchObject({
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        filedText:
          'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
        evidenceSlots: [
          { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
          { slotId: 'low-wood', entryId: 'dwarf-birch' },
          { slotId: 'fell-bloom', entryId: 'mountain-avens' },
          { slotId: 'low-rest', entryId: 'arctic-willow' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(treelineContext.save)).toBe('treeline-low-fell');
  });

  it('lets reindeer-lichen complete the Low Fell low-rest slot from the corridor blend', () => {
    const context = createTreelineContext(
      [...INLAND_COMPLETED, 'scrub-edge-pattern', 'forest-cool-edge'],
      'lichen-fell',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-low-fell',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
      ],
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: '3/4 clues',
    });
    expect(getHandLensNotebookFit(context, 'reindeer-lichen', 'center-blend')).toBe(
      'Notebook fit: low rest',
    );
    expect(advanceActiveFieldRequest(context, 'inspect', 'reindeer-lichen', 'center-blend')).toMatchObject({
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        filedText:
          'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Reindeer Lichen now trace the full drop from treeline shelter into open fell.',
        evidenceSlots: [
          { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
          { slotId: 'low-wood', entryId: 'dwarf-birch' },
          { slotId: 'fell-bloom', entryId: 'mountain-avens' },
          { slotId: 'low-rest', entryId: 'reindeer-lichen' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('treeline-low-fell');
  });

  it('turns forest-cool-edge into a process-backed outing during the moisture-hold window', () => {
    const context = createForestContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
      ],
      'creek-bend',
    );
    context.save.worldStep = 6;
    context.save.biomeVisits.forest = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-cool-edge',
      title: 'Moist Edge',
      summary: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
      progressLabel: '0/3 clues',
    });
  });

  it('turns High Pass into a four-leg post-season route that waits for filing', () => {
    const treelineContext = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
        'treeline-low-fell',
        'forest-expedition-upper-run',
        'forest-season-threads',
      ],
      'dwarf-shrub',
    );

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-high-pass',
      summary: 'Start in Treeline Pass; log stone lift, lee watch, rime mark, and talus hold.',
      progressLabel: '0/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'talus-cushion-pocket')).toBeNull();
    expect(getHandLensNotebookFit(treelineContext, 'frost-heave-boulder')).toBe('Notebook fit: stone lift');
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'frost-heave-boulder')).toBeNull();

    expect(getHandLensNotebookFit(treelineContext, 'hoary-marmot')).toBe('Notebook fit: lee watch');
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'hoary-marmot')).toBeNull();

    treelineContext.currentZoneId = 'lichen-fell';
    expect(getHandLensNotebookFit(treelineContext, 'moss-campion')).toBe('Notebook fit: rime mark');
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'moss-campion')).toBeNull();
    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-high-pass',
      progressLabel: '3/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
          { slotId: 'lee-watch', entryId: 'hoary-marmot' },
          { slotId: 'rime-mark', entryId: 'moss-campion' },
        ],
      },
    });

    expect(getHandLensNotebookFit(treelineContext, 'talus-cushion-pocket')).toBe('Notebook fit: talus hold');
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'talus-cushion-pocket')).toMatchObject({
      requestId: 'treeline-high-pass',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-high-pass',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        filedText:
          'Frost-Heave Boulder, Hoary Marmot, Moss Campion, and Talus Cushion Pocket show how low ridge life uses shelter pockets on exposed High Pass.',
        evidenceSlots: [
          { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
          { slotId: 'lee-watch', entryId: 'hoary-marmot' },
          { slotId: 'rime-mark', entryId: 'moss-campion' },
          { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(treelineContext.save)).toBe('treeline-high-pass');
  });

  it('keeps High Pass dormant until the calm season-close return clears', () => {
    const context = createTreelineContext(
      ['forest-expedition-upper-run', 'forest-season-threads'],
      'dwarf-shrub',
    );
    context.save.seasonCloseReturnPending = true;

    expect(resolveActiveFieldRequest(context)).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'frost-heave-boulder')).toBeNull();
    expect(context.save.routeV2Progress).toBeNull();
  });

  it('only lets reindeer-lichen fit the High Pass rime-mark slot during the active Rimed Pass state', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
        'treeline-low-fell',
        'forest-expedition-upper-run',
        'forest-season-threads',
      ],
      'lichen-fell',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-high-pass',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
      ],
    };

    expect(getHandLensNotebookFit(context, 'reindeer-lichen')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'reindeer-lichen')).toBeNull();

    context.save.worldStep = 6;
    context.save.biomeVisits.treeline = 2;

    expect(getHandLensNotebookFit(context, 'reindeer-lichen')).toBe('Notebook fit: rime mark');
    expect(getHandLensNotebookFit(context, 'moss-campion')).toBe('Notebook fit: rime mark');
    expect(advanceActiveFieldRequest(context, 'inspect', 'reindeer-lichen')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-high-pass',
      title: 'Rimed Pass',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
          { slotId: 'lee-watch', entryId: 'hoary-marmot' },
          { slotId: 'rime-mark', entryId: 'reindeer-lichen' },
        ],
      },
    });
  });

  it('turns forest-moisture-holders into a process-backed outing during the moisture-hold window', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'root-hollow');
    context.save.worldStep = 6;
    context.save.biomeVisits.forest = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      title: 'Moist Hollow',
      summary: 'Mist and damp ground make the cool hollow clues stand out again.',
      progressLabel: '0/3 clues',
    });
  });

  it('only lets tree-lungwort and seep-moss-mat fit during the active Moist Hollow state', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'filtered-return');

    expect(getHandLensNotebookFit(context, 'tree-lungwort')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'tree-lungwort')).toBeNull();

    context.save.worldStep = 6;
    context.save.biomeVisits.forest = 2;

    expect(getHandLensNotebookFit(context, 'tree-lungwort')).toBe('Notebook fit: shelter');
    expect(advanceActiveFieldRequest(context, 'inspect', 'tree-lungwort')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      title: 'Moist Hollow',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'shelter', entryId: 'tree-lungwort' }],
      },
    });

    expect(getHandLensNotebookFit(context, 'seep-moss-mat')).toBe('Notebook fit: ground');
    expect(advanceActiveFieldRequest(context, 'inspect', 'seep-moss-mat')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-moisture-holders',
      title: 'Moist Hollow',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'shelter', entryId: 'tree-lungwort' },
          { slotId: 'ground', entryId: 'seep-moss-mat' },
        ],
      },
    });
  });

  it('turns beach-shore-shelter into a process-backed outing during the wrack-hold window', () => {
    const context = createBeachContext();
    context.save.worldStep = 6;
    context.save.biomeVisits.beach = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'beach-shore-shelter',
      title: 'Wrack Shelter',
      summary: 'Fresh wrack makes the beach shelter line easier to follow today.',
      progressLabel: '0/3 stages',
    });
  });

  it('turns scrub-edge-pattern into a process-backed outing during the sand-capture window', () => {
    const context = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'back-dune',
    );
    context.save.worldStep = 6;
    context.save.biomeVisits['coastal-scrub'] = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'scrub-edge-pattern',
      title: 'Held Sand',
      summary: 'Trapped sand shows where the pioneer side is giving way to steadier scrub cover.',
      progressLabel: '0/3 stages',
    });
  });

  it('only lets beach-grass fit the open-pioneer stage during the active Held Sand window', () => {
    const context = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'back-dune',
    );

    expect(getHandLensNotebookFit(context, 'beach-grass')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-grass')).toBeNull();
    expect(context.save.routeV2Progress).toBeNull();
    expect(getHandLensNotebookFit(context, 'dune-lupine')).toBe('Notebook fit: open pioneer');

    context.save.worldStep = 6;
    context.save.biomeVisits['coastal-scrub'] = 2;

    expect(getHandLensNotebookFit(context, 'beach-grass')).toBe('Notebook fit: open pioneer');
    expect(getHandLensNotebookFit(context, 'dune-lupine')).toBe('Notebook fit: open pioneer');
    expect(advanceActiveFieldRequest(context, 'inspect', 'beach-grass')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'open-pioneer', entryId: 'beach-grass' },
    ]);
  });

  it('turns tundra-short-season into a process-backed outing during the thaw-fringe window', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );
    context.save.worldStep = 4;
    context.save.biomeVisits.tundra = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      title: 'Thaw Window',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      progressLabel: '0/3 clues',
    });
  });

  it('turns treeline-low-fell into a phenology-backed outing during peak phase', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
      ],
      'lichen-fell',
    );
    context.save.worldStep = 4;
    context.save.biomeVisits.treeline = 2;

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Brief Bloom',
      summary: 'Peak avens bloom makes the low open fell easiest to spot today.',
      progressLabel: '0/4 clues',
    });
  });

  it('only lets moss-campion fit the fell-bloom slot during the active Brief Bloom state', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
      ],
      'lichen-fell',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-low-fell',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
      ],
    };

    expect(getHandLensNotebookFit(context, 'moss-campion')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'moss-campion')).toBeNull();

    context.save.worldStep = 4;
    context.save.biomeVisits.treeline = 2;

    expect(getHandLensNotebookFit(context, 'moss-campion')).toBe('Notebook fit: fell bloom');
    expect(getHandLensNotebookFit(context, 'mountain-avens')).toBe('Notebook fit: fell bloom');
    expect(advanceActiveFieldRequest(context, 'inspect', 'moss-campion')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Brief Bloom',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
          { slotId: 'low-wood', entryId: 'dwarf-birch' },
          { slotId: 'fell-bloom', entryId: 'moss-campion' },
        ],
      },
    });
  });

  it('only lets woolly-lousewort fit the first-bloom slot during the active thaw-window state', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'thaw-skirt',
    );

    expect(getHandLensNotebookFit(context, 'woolly-lousewort')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'woolly-lousewort')).toBeNull();

    context.save.worldStep = 4;
    context.save.biomeVisits.tundra = 2;

    expect(getHandLensNotebookFit(context, 'woolly-lousewort')).toBe('Notebook fit: first bloom');
    expect(getHandLensNotebookFit(context, 'purple-saxifrage')).toBe('Notebook fit: first bloom');
    expect(advanceActiveFieldRequest(context, 'inspect', 'woolly-lousewort')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      title: 'Thaw Window',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'first-bloom', entryId: 'woolly-lousewort' }],
      },
    });
  });

  it('only lets bigelows-sedge fit the wet-tuft slot during the active thaw-window state once first bloom is logged', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'thaw-skirt',
    );
    context.save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'first-bloom', entryId: 'purple-saxifrage' }],
    };

    expect(getHandLensNotebookFit(context, 'bigelows-sedge')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'bigelows-sedge')).toBeNull();

    context.save.worldStep = 4;
    context.save.biomeVisits.tundra = 2;

    expect(getHandLensNotebookFit(context, 'cottongrass')).toBe('Notebook fit: wet tuft');
    expect(getHandLensNotebookFit(context, 'bigelows-sedge')).toBe('Notebook fit: wet tuft');
    expect(advanceActiveFieldRequest(context, 'inspect', 'bigelows-sedge')).toBeNull();
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      title: 'Thaw Window',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [
          { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
          { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
        ],
      },
    });
  });

  it('builds clue-backed filed note text from gathered route evidence', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'root-hollow');
    context.save.routeV2Progress = {
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'shelter', entryId: 'licorice-fern' },
        { slotId: 'ground', entryId: 'seep-stone' },
        { slotId: 'living', entryId: 'banana-slug' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'forest-moisture-holders')).toBe(
      'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    );
    expect(resolveActiveFieldRequest(context)?.routeV2?.filedText).toBe(
      'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    );
  });

  it('keeps the full-arc filed-note synthesis matrix compact and relationship-led', () => {
    for (const routeCase of ROUTE_FILED_NOTE_MATRIX) {
      const save = createNewSaveState(`field-request-filed-note-${routeCase.requestId}`);
      save.routeV2Progress = routeCase.progress;

      const filedText = resolveRouteV2FiledNoteText(biomeRegistry, save, routeCase.requestId);
      const displayText = resolveRouteV2FiledDisplayText(biomeRegistry, save, routeCase.requestId);

      expect(filedText).not.toBeNull();
      expect(displayText).not.toBeNull();
      expect(filedText?.length).toBeLessThanOrEqual(ROUTE_FILED_NOTE_MATRIX_MAX);
      expect(displayText?.length).toBeLessThanOrEqual(ROUTE_FILED_NOTE_MATRIX_MAX);
      expect(filedText?.toLowerCase()).toContain(routeCase.anchor);

      if (routeCase.displayPrefix) {
        expect(filedText?.startsWith(routeCase.displayPrefix)).toBe(false);
        expect(displayText?.startsWith(routeCase.displayPrefix)).toBe(true);
        continue;
      }

      expect(displayText).toBe(filedText);
    }
  });

  it('orders clue-backed expedition filed note text by the route slot order', () => {
    const context = createForestContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
        'treeline-low-fell',
      ],
      'root-hollow',
    );
    context.save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'high-run', entryId: 'fir-cone' },
        { slotId: 'stone-pocket', entryId: 'ensatina' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'seep-mark', entryId: 'seep-stone' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'forest-expedition-upper-run')).toBe(
      'Seep Stone, Ensatina Salamander, Root Curtain, and Douglas-fir Cone now map the whole hollow return.',
    );
  });

  it('orders clue-backed treeline shelter filed note text by the route slot order', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
      ],
      'dwarf-shrub',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-stone-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'lee-life', entryId: 'hoary-marmot' },
        { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
        { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'treeline-stone-shelter')).toBe(
      'Krummholz Spruce, Frost-Heave Boulder, and Hoary Marmot mark the last sheltered treeline pocket.',
    );
  });

  it('orders clue-backed low-fell filed note text by the route slot order', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
      ],
      'lichen-fell',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'low-rest', entryId: 'arctic-willow' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'treeline-low-fell')).toBe(
      'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
    );
  });

  it('orders clue-backed High Pass filed note text by the route slot order', () => {
    const context = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
        'forest-cool-edge',
        'treeline-low-fell',
        'forest-expedition-upper-run',
        'forest-season-threads',
      ],
      'lichen-fell',
    );
    context.save.routeV2Progress = {
      requestId: 'treeline-high-pass',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
        { slotId: 'rime-mark', entryId: 'moss-campion' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'treeline-high-pass')).toBe(
      'Frost-Heave Boulder, Hoary Marmot, Moss Campion, and Talus Cushion Pocket show how low ridge life uses shelter pockets on exposed High Pass.',
    );
  });

  it('keeps clue-backed filed note text stable when forest-cool-edge was reframed as Moist Edge', () => {
    const context = createForestContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
        'scrub-edge-pattern',
      ],
      'creek-bend',
    );
    context.save.worldStep = 6;
    context.save.biomeVisits.forest = 2;
    context.save.routeV2Progress = {
      requestId: 'forest-cool-edge',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'edge-carrier', entryId: 'salmonberry' },
        { slotId: 'cool-floor', entryId: 'redwood-sorrel' },
        { slotId: 'wet-shade', entryId: 'sword-fern' },
      ],
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      title: 'Cool Edge',
      summary: 'Return to the field station and file the Cool Edge note.',
      routeV2: {
        filedText: 'Salmonberry, Redwood Sorrel, and Sword Fern now read as the cooler forest middle.',
      },
    });
    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'forest-cool-edge')).toBe(
      'Salmonberry, Redwood Sorrel, and Sword Fern now read as the cooler forest middle.',
    );
  });

  it('keeps clue-backed filed note text stable when beach-shore-shelter is reframed as Wrack Shelter', () => {
    const context = createBeachContext([], 'tide-line');
    context.save.worldStep = 6;
    context.save.biomeVisits.beach = 2;
    context.save.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
        { slotId: 'wrack-line', entryId: 'bull-kelp-wrack' },
      ],
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      title: 'Shore Shelter',
      summary: 'Use M -> Field station, then Enter to file the Shore Shelter note.',
      routeV2: {
        filedText:
          'American Dunegrass, Driftwood, and Bull Kelp Wrack mark shelter from dune edge to tide line.',
      },
    });
    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'beach-shore-shelter')).toBe(
      'American Dunegrass, Driftwood, and Bull Kelp Wrack mark shelter from dune edge to tide line.',
    );
  });

  it('keeps clue-backed filed note text stable when tundra-short-season is reframed as Thaw Window', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );
    context.save.worldStep = 4;
    context.save.biomeVisits.tundra = 2;
    context.save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'cottongrass' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      title: 'Short Season',
      summary: 'Return to the field station and file the Short Season note.',
      routeV2: {
        filedText: 'Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
      },
    });
    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'tundra-short-season')).toBe(
      'Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    );
  });

  it('keeps clue-backed filed note text stable when scrub-edge-pattern is reframed as Held Sand', () => {
    const context = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'forest-edge',
    );
    context.save.worldStep = 6;
    context.save.biomeVisits['coastal-scrub'] = 2;
    context.save.routeV2Progress = {
      requestId: 'scrub-edge-pattern',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'open-pioneer', entryId: 'beach-grass' },
        { slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' },
        { slotId: 'thicker-edge', entryId: 'salmonberry' },
      ],
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      title: 'Scrub Pattern',
      summary: 'Return to the field station and file the Scrub Pattern note.',
      routeV2: {
        filedText: 'American Dunegrass, Pacific Wax Myrtle, and Salmonberry now read as one clear transition.',
      },
    });
    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'scrub-edge-pattern')).toBe(
      'American Dunegrass, Pacific Wax Myrtle, and Salmonberry now read as one clear transition.',
    );
  });

  it('adds the thaw-window page stamp only on the filed display seam', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );
    context.save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'cottongrass' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'tundra-short-season')).toBe(
      'Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    );
    expect(resolveRouteV2FiledDisplayText(biomeRegistry, context.save, 'tundra-short-season')).toBe(
      'Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    );
  });

  it('keeps the thaw-window filed identity stable when wet-tuft uses bigelows-sedge', () => {
    const context = createTundraContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
      ],
      'snow-meadow',
    );
    context.save.worldStep = 4;
    context.save.biomeVisits.tundra = 2;
    context.save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'bigelows-sedge' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    };

    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'tundra-short-season')).toBe(
      'Purple Saxifrage, Bigelow\'s Sedge, and Cloudberry trace the tundra\'s short thaw window.',
    );
    expect(resolveRouteV2FiledDisplayText(biomeRegistry, context.save, 'tundra-short-season')).toBe(
      'Thaw Window. Purple Saxifrage, Bigelow\'s Sedge, and Cloudberry trace the tundra\'s short thaw window.',
    );
  });

  it('keeps older in-progress scrub transect saves coherent through first-missing-stage guidance', () => {
    const scrubContext = createCoastalContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
        'treeline-stone-shelter',
        'tundra-short-season',
        'tundra-survey-slice',
      ],
      'back-dune',
    );
    scrubContext.save.routeV2Progress = {
      requestId: 'scrub-edge-pattern',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' }],
    };

    expect(resolveActiveFieldRequest(scrubContext)).toMatchObject({
      id: 'scrub-edge-pattern',
      progressLabel: '1/3 stages',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'holding-cover', entryId: 'pacific-wax-myrtle' }],
      },
    });
    expect(getHandLensNotebookFit(scrubContext, 'dune-lupine')).toBe('Notebook fit: open pioneer');

    scrubContext.currentZoneId = 'windbreak-swale';
    expect(resolveActiveFieldRequest(scrubContext)).toMatchObject({
      id: 'scrub-edge-pattern',
      progressLabel: 'Return To Back Dune',
    });
  });

  it('keeps older in-progress treeline shelter saves coherent through first-missing-slot guidance', () => {
    const treelineContext = createTreelineContext(
      [
        'forest-hidden-hollow',
        'forest-moisture-holders',
        'forest-survey-slice',
        'coastal-shelter-shift',
        'coastal-edge-moisture',
      ],
      'dwarf-shrub',
    );
    treelineContext.save.routeV2Progress = {
      requestId: 'treeline-stone-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'stone-break', entryId: 'frost-heave-boulder' }],
    };

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-stone-shelter',
      progressLabel: '1/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [{ slotId: 'stone-break', entryId: 'frost-heave-boulder' }],
      },
    });
    expect(getHandLensNotebookFit(treelineContext, 'hoary-marmot')).toBeNull();

    treelineContext.currentZoneId = 'krummholz-belt';
    expect(getHandLensNotebookFit(treelineContext, 'krummholz-spruce')).toBe('Notebook fit: bent cover');
  });

  it('unlocks the expedition after the three season routes are logged', () => {
    const activeRequest = resolveActiveFieldRequest(
      createForestContext(['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'], 'trailhead'),
    );

    expect(activeRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      title: 'Root Hollow',
      progressLabel: 'Return To Root Hollow',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });
  });

  it('holds Root Hollow to seep-mark first before later chapter clues fit', () => {
    const context = createForestContext(
      ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'],
      'filtered-return',
    );

    expect(getHandLensNotebookFit(context, 'root-curtain')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'root-curtain')).toBeNull();
    expect(context.save.routeV2Progress).toBeNull();

    context.currentZoneId = 'log-run';
    expect(getHandLensNotebookFit(context, 'fir-cone')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'fir-cone')).toBeNull();
    expect(context.save.routeV2Progress).toBeNull();

    context.currentZoneId = 'stone-basin';
    expect(getHandLensNotebookFit(context, 'banana-slug')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'banana-slug')).toBeNull();
    expect(context.save.routeV2Progress).toBeNull();

    context.currentZoneId = 'seep-pocket';
    expect(getHandLensNotebookFit(context, 'seep-stone')).toBe('Notebook fit: seep mark');
    expect(advanceActiveFieldRequest(context, 'inspect', 'seep-stone')).toBeNull();
    expect(context.save.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [{ slotId: 'seep-mark', entryId: 'seep-stone' }],
    });

    context.currentZoneId = 'log-run';
    expect(getHandLensNotebookFit(context, 'fir-cone')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'fir-cone')).toBeNull();

    context.currentZoneId = 'filtered-return';
    expect(getHandLensNotebookFit(context, 'root-curtain')).toBeNull();
    expect(advanceActiveFieldRequest(context, 'inspect', 'root-curtain')).toBeNull();

    context.currentZoneId = 'stone-basin';
    expect(getHandLensNotebookFit(context, 'banana-slug')).toBe('Notebook fit: stone pocket');
    expect(advanceActiveFieldRequest(context, 'inspect', 'banana-slug')).toBeNull();

    context.currentZoneId = 'filtered-return';
    expect(getHandLensNotebookFit(context, 'root-curtain')).toBe('Notebook fit: root held');
  });

  it('turns Root Hollow into one notebook-ready expedition chapter', () => {
    const context = createForestContext(
      ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'],
      'seep-pocket',
    );

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-expedition-upper-run',
      title: 'Root Hollow',
      progressLabel: '0/4 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'seep-stone')).toBe('Notebook fit: seep mark');
    expect(advanceActiveFieldRequest(context, 'inspect', 'seep-stone')).toBeNull();

    context.currentZoneId = 'stone-basin';
    expect(getHandLensNotebookFit(context, 'banana-slug')).toBe('Notebook fit: stone pocket');
    expect(advanceActiveFieldRequest(context, 'inspect', 'banana-slug')).toBeNull();

    context.currentZoneId = 'filtered-return';
    expect(getHandLensNotebookFit(context, 'root-curtain')).toBe('Notebook fit: root held');
    expect(advanceActiveFieldRequest(context, 'inspect', 'root-curtain')).toBeNull();

    context.currentZoneId = 'log-run';
    expect(getHandLensNotebookFit(context, 'fir-cone')).toBe('Notebook fit: high run');
    expect(advanceActiveFieldRequest(context, 'inspect', 'fir-cone')).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-expedition-upper-run',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'seep-mark', entryId: 'seep-stone' },
          { slotId: 'stone-pocket', entryId: 'banana-slug' },
          { slotId: 'root-held', entryId: 'root-curtain' },
          { slotId: 'high-run', entryId: 'fir-cone' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('forest-expedition-upper-run');
  });

  it('keeps legacy notebook-ready Root Hollow saves fileable after normalization', () => {
    const save = normalizeSaveState({
      worldSeed: 'legacy-root-hollow-ready-request-seed',
      completedFieldRequestIds: ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'],
      routeV2Progress: {
        requestId: 'forest-expedition-upper-run',
        status: 'ready-to-synthesize',
        landmarkEntryIds: [],
        evidenceSlots: [
          { slotId: 'seep-mark', entryId: 'seep-stone' },
          { slotId: 'root-held', entryId: 'root-curtain' },
          { slotId: 'high-run', entryId: 'fir-cone' },
        ],
      },
    } as unknown as Parameters<typeof normalizeSaveState>[0]);
    const context = {
      biomes: biomeRegistry,
      save,
      currentBiomeId: 'forest',
      currentZoneId: 'log-run',
      currentPlayerX: null,
      currentPlayerY: null,
    };

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-expedition-upper-run',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'seep-mark', entryId: 'seep-stone' },
          { slotId: 'stone-pocket', entryId: 'banana-slug' },
          { slotId: 'root-held', entryId: 'root-curtain' },
          { slotId: 'high-run', entryId: 'fir-cone' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(save)).toBe('forest-expedition-upper-run');
    expect(save.completedFieldRequestIds).toContain('forest-expedition-upper-run');
  });

  it('moves into the season capstone after the expedition reconnects with Log Run', () => {
    const context = createForestContext(
      [
        'coastal-edge-moisture',
        'tundra-survey-slice',
        'treeline-low-fell',
        'forest-expedition-upper-run',
      ],
      'trailhead',
    );
    recordDiscovery(context.save, forestBiome.entries['sword-fern'], 'forest');
    recordDiscovery(context.save, forestBiome.entries['salmonberry'], 'forest');
    recordDiscovery(context.save, forestBiome.entries['tree-lungwort'], 'forest');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'forest-season-threads',
      title: 'Season Threads',
      progressLabel: '3/3 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('forest-season-threads');
  });

  it('tracks landmark-evidence requests until the notebook note is ready', () => {
    const context = createForestContext([], 'root-hollow');
    const definition = {
      id: 'forest-landmark-pilot',
      biomeId: 'forest',
      title: 'Landmark Pilot',
      summary: 'Log the landmark clue.',
      type: 'landmark-evidence',
      zoneId: 'root-hollow',
      landmarkEntryIds: ['fallen-log-marker'],
      routeV2Note: {
        readyTitle: 'NOTEBOOK READY',
        readyText: 'Return to the field station and file this notebook note.',
        filedText: 'The landmark note is filed.',
      },
      completionTriggers: ['inspect'],
    } as const satisfies Parameters<typeof advanceFieldRequestDefinition>[0];

    expect(
      advanceFieldRequestDefinition(definition, context, {
        trigger: 'inspect',
        entryId: 'banana-slug',
      }),
    ).toBeNull();

    const result = advanceFieldRequestDefinition(definition, context, {
      trigger: 'inspect',
      entryId: 'fallen-log-marker',
    });
    expect(result).toMatchObject({
      requestId: 'forest-landmark-pilot',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });
    expect(context.save.routeV2Progress).toEqual({
      requestId: 'forest-landmark-pilot',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['fallen-log-marker'],
      evidenceSlots: [],
    });
  });

  it('fills assemble-evidence slots before filing the completed notebook note', () => {
    const context = createForestContext([], 'root-hollow');
    const definition = {
      id: 'forest-assembly-pilot',
      biomeId: 'forest',
      title: 'Assembly Pilot',
      summary: 'Gather two different clue types.',
      type: 'assemble-evidence',
      zoneId: 'root-hollow',
      evidenceSlots: [
        {
          id: 'cover',
          label: 'Cover clue',
          entryIds: ['sword-fern', 'redwood-sorrel'],
        },
        {
          id: 'moisture',
          label: 'Moisture clue',
          entryIds: ['banana-slug'],
        },
      ],
      routeV2Note: {
        readyTitle: 'NOTEBOOK READY',
        readyText: 'Return to the field station and file this assembled note.',
        filedText: 'The assembled note is filed.',
      },
      completionTriggers: ['inspect'],
    } as const satisfies Parameters<typeof advanceFieldRequestDefinition>[0];

    expect(
      advanceFieldRequestDefinition(definition, context, {
        trigger: 'inspect',
        entryId: 'sword-fern',
      }),
    ).toBeNull();
    expect(context.save.routeV2Progress).toEqual({
      requestId: 'forest-assembly-pilot',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        {
          slotId: 'cover',
          entryId: 'sword-fern',
        },
      ],
    });

    const result = advanceFieldRequestDefinition(definition, context, {
      trigger: 'inspect',
      entryId: 'banana-slug',
    });
    expect(result).toMatchObject({
      requestId: 'forest-assembly-pilot',
      status: 'ready-to-synthesize',
    });
    expect(context.save.routeV2Progress).toEqual({
      requestId: 'forest-assembly-pilot',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        {
          slotId: 'cover',
          entryId: 'sword-fern',
        },
        {
          slotId: 'moisture',
          entryId: 'banana-slug',
        },
      ],
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('forest-assembly-pilot');
    expect(context.save.routeV2Progress).toBeNull();
    expect(context.save.completedFieldRequestIds).toEqual(['forest-assembly-pilot']);
  });
});
