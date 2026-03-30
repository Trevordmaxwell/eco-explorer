import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import {
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
      progressLabel: 'Visit Root Hollow',
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

  it('counts damp-ground discoveries toward the moisture request', () => {
    const context = createForestContext(['forest-hidden-hollow'], 'root-hollow');
    recordDiscovery(context.save, forestBiome.entries['banana-slug'], 'forest');
    recordDiscovery(context.save, forestBiome.entries['sword-fern'], 'forest');

    const activeRequest = resolveActiveFieldRequest(context);
    expect(activeRequest).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: '2/2 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('forest-moisture-holders');
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
      progressLabel: 'Return To Dwarf Shrub',
    });
  });

  it('completes the treeline shelter request after two lee-side clues are logged', () => {
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
    recordDiscovery(context.save, biomeRegistry.treeline.entries['frost-heave-boulder'], 'treeline');
    recordDiscovery(context.save, biomeRegistry.treeline.entries['hoary-marmot'], 'treeline');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'treeline-stone-shelter',
      progressLabel: '2/2 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('treeline-stone-shelter');
  });

  it('unlocks the tundra short-season request after the treeline shelter task', () => {
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
    recordDiscovery(context.save, biomeRegistry.tundra.entries['purple-saxifrage'], 'tundra');
    recordDiscovery(context.save, biomeRegistry.tundra.entries.cottongrass, 'tundra');

    expect(resolveActiveFieldRequest(context)).toMatchObject({
      id: 'tundra-short-season',
      progressLabel: '2/2 signs',
    });
    expect(shouldCompleteActiveFieldRequest(context, 'inspect')).toBe('tundra-short-season');
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
      progressLabel: '0/3 signs',
    });
  });

  it('completes the edge-pattern request chain across scrub, forest, and treeline', () => {
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
      'forest-edge',
    );
    recordDiscovery(scrubContext.save, biomeRegistry['coastal-scrub'].entries['dune-lupine'], 'coastal-scrub');
    recordDiscovery(scrubContext.save, biomeRegistry['coastal-scrub'].entries['pacific-wax-myrtle'], 'coastal-scrub');
    recordDiscovery(scrubContext.save, biomeRegistry['coastal-scrub'].entries.salmonberry, 'coastal-scrub');

    expect(resolveActiveFieldRequest(scrubContext)).toMatchObject({
      id: 'scrub-edge-pattern',
      progressLabel: '3/3 signs',
    });
    expect(shouldCompleteActiveFieldRequest(scrubContext, 'inspect')).toBe('scrub-edge-pattern');

    const forestContext = createForestContext(
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
    recordDiscovery(forestContext.save, biomeRegistry.forest.entries.salmonberry, 'forest');
    recordDiscovery(forestContext.save, biomeRegistry.forest.entries['sword-fern'], 'forest');
    recordDiscovery(forestContext.save, biomeRegistry.forest.entries['redwood-sorrel'], 'forest');

    expect(resolveActiveFieldRequest(forestContext)).toMatchObject({
      id: 'forest-cool-edge',
      progressLabel: '3/3 signs',
    });
    expect(shouldCompleteActiveFieldRequest(forestContext, 'inspect')).toBe('forest-cool-edge');

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
      ],
      'lichen-fell',
    );
    recordDiscovery(treelineContext.save, biomeRegistry.treeline.entries['krummholz-spruce'], 'treeline');
    recordDiscovery(treelineContext.save, biomeRegistry.treeline.entries['dwarf-birch'], 'treeline');
    recordDiscovery(treelineContext.save, biomeRegistry.treeline.entries['mountain-avens'], 'treeline');

    expect(resolveActiveFieldRequest(treelineContext)).toMatchObject({
      id: 'treeline-low-fell',
      progressLabel: '3/3 signs',
    });
    expect(shouldCompleteActiveFieldRequest(treelineContext, 'inspect')).toBe('treeline-low-fell');
  });

  it('unlocks the expedition after the three season routes are logged', () => {
    const activeRequest = resolveActiveFieldRequest(
      createForestContext(['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'], 'trailhead'),
    );

    expect(activeRequest).toMatchObject({
      id: 'forest-expedition-lower-hollow',
      title: 'Lower Hollow',
      progressLabel: 'Visit Root Hollow',
    });
  });

  it('completes the trunk-climb expedition leg when the player reaches the high shelf', () => {
    const activeRequest = resolveActiveFieldRequest(
      createForestContext(
        [
          'coastal-edge-moisture',
          'tundra-survey-slice',
          'treeline-low-fell',
          'forest-expedition-lower-hollow',
        ],
        'root-hollow',
        { x: 408, y: 74 },
      ),
    );

    expect(activeRequest).toMatchObject({
      id: 'forest-expedition-trunk-climb',
      progressLabel: 'Reach High Shelf',
    });
    expect(
      shouldCompleteActiveFieldRequest(
        createForestContext(
          [
            'coastal-edge-moisture',
            'tundra-survey-slice',
            'treeline-low-fell',
            'forest-expedition-lower-hollow',
          ],
          'root-hollow',
          { x: 408, y: 74 },
        ),
        'zone',
      ),
    ).toBe('forest-expedition-trunk-climb');
  });

  it('moves into the upper-run expedition leg after the climb checkpoint', () => {
    const activeRequest = resolveActiveFieldRequest(
      createForestContext(
        [
          'coastal-edge-moisture',
          'tundra-survey-slice',
          'treeline-low-fell',
          'forest-expedition-lower-hollow',
          'forest-expedition-trunk-climb',
        ],
        'root-hollow',
        { x: 410, y: 74 },
      ),
    );

    expect(activeRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      title: 'Upper Run',
      progressLabel: 'Visit Log Run',
    });
  });
});
