import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import {
  resolveFieldAtlasState,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
  resolveFieldSeasonWrapState,
} from '../engine/field-season-board';
import { createNewSaveState, recordDiscovery } from '../engine/save';

describe('field season board', () => {
  it('starts with the forest hollow beat active and the coastal line queued behind it', () => {
    const save = createNewSaveState('field-season-board-starter-seed');

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeTitle: 'COASTAL SHELTER LINE',
      progressLabel: '0/3 logged',
      targetBiomeId: 'forest',
      complete: false,
      beats: [
        { id: 'forest-study', status: 'active', title: 'Forest Hollow' },
        { id: 'station-return', status: 'upcoming', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Coastal Shelter' },
      ],
    });
  });

  it('moves the board from forest logging to station return and then coastal comparison', () => {
    const save = createNewSaveState('field-season-board-station-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(save, forestBiome.entries[entryId], 'forest');
    }

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '1/3 logged',
      targetBiomeId: null,
      beats: [
        { id: 'forest-study', status: 'done', title: 'Forest Logged' },
        { id: 'station-return', status: 'active', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Coastal Shelter' },
      ],
    });

    save.purchasedUpgradeIds = ['trail-stride'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'coastal-scrub',
      beats: [
        { id: 'forest-study', status: 'done', title: 'Forest Logged' },
        { id: 'station-return', status: 'done', title: 'Trail Stride' },
        { id: 'coastal-comparison', status: 'active', title: 'Coastal Shelter' },
      ],
    });
  });

  it('does not skip ahead to station return only because forest discoveries already reached surveyed', () => {
    const save = createNewSaveState('field-season-board-no-skip-seed');
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(save, forestBiome.entries[entryId], 'forest');
    }

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '0/3 logged',
      beats: [
        { id: 'forest-study', status: 'active' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
  });

  it('activates the inland route once the coastal comparison is logged', () => {
    const save = createNewSaveState('field-season-board-finish-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
    ];
    save.purchasedUpgradeIds = ['trail-stride'];
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(save, forestBiome.entries[entryId], 'forest');
    }

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeTitle: 'TREELINE SHELTER LINE',
      branchLabel: 'Forest -> Treeline -> Tundra',
      progressLabel: '0/3 logged',
      targetBiomeId: 'treeline',
      complete: false,
      nextDirection: 'Next: travel to Treeline Pass and log two shelter clues.',
      beats: [
        { id: 'treeline-shelter', status: 'active', title: 'Treeline Shelter' },
        { id: 'tundra-short-season', status: 'upcoming', title: 'Short Season' },
        { id: 'tundra-survey', status: 'upcoming', title: 'Tundra Survey' },
      ],
    });
  });

  it('moves the inland route from treeline shelter to tundra timing and then survey finish', () => {
    const save = createNewSaveState('field-season-board-inland-progress-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '1/3 logged',
      targetBiomeId: 'tundra',
      beats: [
        { id: 'treeline-shelter', status: 'done', title: 'Treeline Shelter Logged' },
        { id: 'tundra-short-season', status: 'active', title: 'Short Season' },
        { id: 'tundra-survey', status: 'upcoming', title: 'Tundra Survey' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-short-season'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'tundra',
      beats: [
        { id: 'treeline-shelter', status: 'done' },
        { id: 'tundra-short-season', status: 'done', title: 'Short Season Logged' },
        { id: 'tundra-survey', status: 'active', title: 'Tundra Survey' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-survey-slice'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'edge-pattern-line',
      routeTitle: 'EDGE PATTERN LINE',
      branchLabel: 'Coastal Scrub -> Forest -> Treeline',
      progressLabel: '0/3 logged',
      targetBiomeId: 'coastal-scrub',
      complete: false,
      beats: [
        { id: 'scrub-edge-pattern', status: 'active', title: 'Scrub Pattern' },
        { id: 'forest-cool-edge', status: 'upcoming', title: 'Cool Edge' },
        { id: 'treeline-low-fell', status: 'upcoming', title: 'Low Fell' },
      ],
    });
  });

  it('moves the edge-pattern line from scrub to forest to treeline and then logs it', () => {
    const save = createNewSaveState('field-season-board-edge-pattern-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
    ];

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'edge-pattern-line',
      routeTitle: 'EDGE PATTERN LINE',
      progressLabel: '0/3 logged',
      targetBiomeId: 'coastal-scrub',
      beats: [
        { id: 'scrub-edge-pattern', status: 'active', title: 'Scrub Pattern' },
        { id: 'forest-cool-edge', status: 'upcoming', title: 'Cool Edge' },
        { id: 'treeline-low-fell', status: 'upcoming', title: 'Low Fell' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'scrub-edge-pattern'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '1/3 logged',
      targetBiomeId: 'forest',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done', title: 'Scrub Pattern Logged' },
        { id: 'forest-cool-edge', status: 'active', title: 'Cool Edge' },
        { id: 'treeline-low-fell', status: 'upcoming', title: 'Low Fell' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-cool-edge'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'treeline',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done', title: 'Cool Edge Logged' },
        { id: 'treeline-low-fell', status: 'active', title: 'Low Fell' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'treeline-low-fell'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeTitle: 'EDGE LINE LOGGED',
      progressLabel: 'ROUTE LOGGED',
      targetBiomeId: null,
      complete: true,
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done' },
        { id: 'treeline-low-fell', status: 'done', title: 'Edge Line Logged' },
      ],
    });
  });

  it('surfaces a dawn-hollow replay note on later forest-study revisits', () => {
    const save = createNewSaveState('field-season-board-dawn-replay-seed');
    save.worldStep = 3;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'coastal-shelter-line',
      summary: 'Early light makes the sheltered hollow easier to read before the forest brightens.',
      replayNote: {
        id: 'forest-dawn-hollow',
        title: 'Dawn Hollow',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'forest-study', status: 'active', title: 'Dawn Hollow' }),
      ]),
    );
  });

  it('surfaces a rime-shelter replay note on late treeline shelter revisits', () => {
    const save = createNewSaveState('field-season-board-rime-replay-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
    ];
    save.purchasedUpgradeIds = ['trail-stride'];
    save.worldStep = 6;
    save.biomeVisits.treeline = 2;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'treeline-shelter-line',
      summary: 'Wind-rimed ground makes the last sheltered treeline pockets easier to compare.',
      replayNote: {
        id: 'treeline-rime-shelter',
        title: 'Rime Shelter',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'treeline-shelter', status: 'active', title: 'Rime Shelter' }),
      ]),
    );
  });

  it('surfaces a moist-edge replay note on late forest edge revisits', () => {
    const save = createNewSaveState('field-season-board-moist-edge-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    save.worldStep = 6;
    save.biomeVisits.forest = 2;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'edge-pattern-line',
      summary: 'Cool wet holdovers make the forest middle edge easiest to compare again.',
      replayNote: {
        id: 'edge-moist-edge',
        title: 'Moist Edge',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'scrub-edge-pattern', status: 'done' }),
        expect.objectContaining({ id: 'forest-cool-edge', status: 'active', title: 'Moist Edge' }),
      ]),
    );
  });

  it('builds a tiny field atlas once routes start logging', () => {
    const save = createNewSaveState('field-season-board-atlas-seed');

    expect(resolveFieldAtlasState(save)).toBeNull();

    save.completedFieldRequestIds = ['coastal-edge-moisture'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged'],
      note: 'Next: keep following the inland line.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-survey-slice'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged', 'TREELINE SHELTER LINE logged'],
      note: 'Next: follow the edge pattern line.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'treeline-low-fell'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: open the Root Hollow expedition.',
    });
  });

  it('keeps the expedition slot locked until the season routes are logged', () => {
    const save = createNewSaveState('field-season-expedition-locked-seed');

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'locked',
      statusLabel: 'LOCKED',
      summary: 'A deeper forest outing opens after the season routes are logged.',
      startText: 'Forest Trail to Root Hollow',
      note: '3 more routes need logging first.',
    });
  });

  it('marks the expedition slot ready once the three season routes are logged', () => {
    const save = createNewSaveState('field-season-expedition-ready-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'ready',
      statusLabel: 'READY',
      summary: 'One deeper forest outing is staged through lower hollow, trunk climb, and upper run.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Start when you want a longer forest outing.',
    });
  });

  it('tracks expedition progress once the lower hollow leg is logged', () => {
    const save = createNewSaveState('field-season-expedition-active-lower-seed');
    save.completedFieldRequestIds = [
      'coastal-edge-moisture',
      'tundra-survey-slice',
      'treeline-low-fell',
      'forest-expedition-lower-hollow',
    ];

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: '1/3',
      summary: 'The lower hollow leg is logged. The climb now leads toward the high shelf above the cave lane.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: climb the forgiving trunks to the high shelf.',
    });
  });

  it('tracks expedition progress once the climb leg is logged', () => {
    const save = createNewSaveState('field-season-expedition-active-climb-seed');
    save.completedFieldRequestIds = [
      'coastal-edge-moisture',
      'tundra-survey-slice',
      'treeline-low-fell',
      'forest-expedition-lower-hollow',
      'forest-expedition-trunk-climb',
    ];

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: '2/3',
      summary: 'The hollow and climb legs are logged. One upper-run finish still leads back into the open forest.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: follow the high exit into Log Run.',
    });
  });

  it('uses a soft next-outing wrap when a route is just getting started', () => {
    const save = createNewSaveState('field-season-wrap-starter-seed');
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start with one clear notebook route in Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'NEXT OUTING',
      text: 'Start with Forest Trail.',
    });
  });

  it('uses the replay note as the active season-wrap cue when a replay window is live', () => {
    const save = createNewSaveState('field-season-wrap-replay-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    save.worldStep = 6;
    save.biomeVisits.forest = 2;
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Moist Edge is clear. Next: Forest Trail.',
    });
  });

  it('uses a route-logged stop cue once the active route is complete', () => {
    const save = createNewSaveState('field-season-wrap-logged-seed');
    save.completedFieldRequestIds = [
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
    ];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Open the Root Hollow expedition.',
    });
  });
});
