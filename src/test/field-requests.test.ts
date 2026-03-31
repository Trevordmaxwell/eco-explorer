import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import {
  advanceActiveFieldRequest,
  advanceFieldRequestDefinition,
  fileReadyRouteV2FieldRequest,
  getHandLensNotebookFit,
  resolveActiveFieldRequest,
  shouldCompleteActiveFieldRequest,
} from '../engine/field-requests';
import { createNewSaveState, recordDiscovery } from '../engine/save';

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
  it('starts with the forest hidden-hollow request active', () => {
    const activeRequest = resolveActiveFieldRequest(createForestContext());

    expect(activeRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      biomeId: 'forest',
      title: 'Hidden Hollow',
      progressLabel: 'Return To Root Hollow',
    });
  });

  it('shows a travel-facing progress label before the player reaches the target biome', () => {
    const save = createNewSaveState('field-request-travel-seed');

    const activeRequest = resolveActiveFieldRequest({
      biomes: biomeRegistry,
      save,
      currentBiomeId: 'beach',
      currentZoneId: 'dry-sand',
      currentPlayerX: null,
      currentPlayerY: null,
    });

    expect(activeRequest).toMatchObject({
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
    const context = createForestContext([], 'seep-pocket');

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

  it('completes the back-dune shelter request after two local clues are logged', () => {
    const context = createCoastalContext(
      ['forest-hidden-hollow', 'forest-moisture-holders', 'forest-survey-slice'],
      'back-dune',
    );
    recordDiscovery(context.save, biomeRegistry['coastal-scrub'].entries['sand-verbena'], 'coastal-scrub');
    recordDiscovery(context.save, biomeRegistry['coastal-scrub'].entries['dune-lupine'], 'coastal-scrub');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: '2/2 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('coastal-shelter-shift');
  });

  it('unlocks the forest-edge moisture request after the back-dune task', () => {
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
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'frost-heave-boulder')).toBe('Notebook fit: stone break');
    expect(advanceActiveFieldRequest(context, 'inspect', 'frost-heave-boulder')).toBeNull();
    expect(resolveActiveFieldRequest(context)?.routeV2?.evidenceSlots).toEqual([
      { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
    ]);

    context.currentZoneId = 'dwarf-shrub';
    expect(getHandLensNotebookFit(context, 'krummholz-spruce')).toBe('Notebook fit: bent cover');
    expect(advanceActiveFieldRequest(context, 'inspect', 'krummholz-spruce')).toBeNull();

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
          { slotId: 'stone-break', entryId: 'frost-heave-boulder' },
          { slotId: 'bent-cover', entryId: 'krummholz-spruce' },
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
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'purple-saxifrage')).toBe('Notebook fit: first bloom');
    expect(advanceActiveFieldRequest(context, 'inspect', 'purple-saxifrage')).toBeNull();

    context.currentZoneId = 'thaw-skirt';
    expect(getHandLensNotebookFit(context, 'cottongrass')).toBe('Notebook fit: wet tuft');
    expect(advanceActiveFieldRequest(context, 'inspect', 'cottongrass')).toBeNull();

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
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });
  });

  it('formats transition notebook-fit copy without hyphenated slot text', () => {
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

    scrubContext.currentZoneId = 'windbreak-swale';
    expect(getHandLensNotebookFit(scrubContext, 'pacific-wax-myrtle')).toBe(
      'Notebook fit: holding cover',
    );

    scrubContext.currentZoneId = 'forest-edge';
    expect(getHandLensNotebookFit(scrubContext, 'salmonberry')).toBe('Notebook fit: thicker edge');
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
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

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
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    treelineContext.currentZoneId = 'krummholz-belt';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'krummholz-spruce')).toBeNull();
    treelineContext.currentZoneId = 'dwarf-shrub';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'dwarf-birch')).toBeNull();
    treelineContext.currentZoneId = 'lichen-fell';
    expect(advanceActiveFieldRequest(treelineContext, 'inspect', 'mountain-avens')).toMatchObject({
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      noticeTitle: 'NOTEBOOK READY',
    });

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
        evidenceSlots: [
          { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
          { slotId: 'low-wood', entryId: 'dwarf-birch' },
          { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        ],
      },
    });
    expect(fileReadyRouteV2FieldRequest(treelineContext.save)).toBe('treeline-low-fell');
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
      progressLabel: '0/3 clues',
      routeV2: {
        status: 'gathering',
        evidenceSlots: [],
      },
    });

    expect(getHandLensNotebookFit(context, 'seep-stone')).toBe('Notebook fit: seep mark');
    expect(advanceActiveFieldRequest(context, 'inspect', 'seep-stone')).toBeNull();

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
          { slotId: 'root-held', entryId: 'root-curtain' },
          { slotId: 'high-run', entryId: 'fir-cone' },
        ],
      },
    });

    expect(fileReadyRouteV2FieldRequest(context.save)).toBe('forest-expedition-upper-run');
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
