import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
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

describe('field requests', () => {
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
      summary: 'In Coastal Scrub, read shelter from open bloom to shore pine to edge log.',
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
      summary: 'In Treeline Pass, log bent-cover, then stone-break, then lee-life through the last shelter.',
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
      summary: 'In Tundra Reach, log first-bloom, then wet-tuft, then brief-fruit through the thaw window.',
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
      summary: 'At Creek Bend, file edge-carrier, cool-floor, and wet-shade clues along the cooler forest side.',
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
      summary: 'Return to the field station and file the Shore Shelter note.',
      routeV2: {
        filedText:
          'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
      },
    });
    expect(resolveRouteV2FiledNoteText(biomeRegistry, context.save, 'beach-shore-shelter')).toBe(
      'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
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
