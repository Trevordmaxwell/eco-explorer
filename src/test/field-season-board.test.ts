import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import {
  resolveFieldAtlasState,
  resolveNextFieldSeasonTargetBiomeId,
  resolveFieldSeasonArchiveState,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
  resolveSeasonOutingLocator,
  resolveFieldStationSubtitle,
  resolveFieldSeasonWrapState,
  resolveNurseryCapstoneSupportHint,
} from '../engine/field-season-board';
import { createNewSaveState, normalizeSaveState, recordDiscovery } from '../engine/save';

describe('field season board', () => {
  it('starts with the beach shore-shelter beat active and the coastal line queued behind it', () => {
    const save = createNewSaveState('field-season-board-starter-seed');

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeTitle: 'COASTAL SHELTER LINE',
      progressLabel: '0/3 logged',
      targetBiomeId: 'beach',
      summary: 'Shore Shelter starts at Sunny Beach.',
      nextDirection:
        'Next: stay on Sunny Beach and start Shore Shelter with dune grass, then lee cover, then wrack line.',
      complete: false,
      beats: [
        { id: 'forest-study', status: 'active', title: 'Shore Shelter' },
        { id: 'station-return', status: 'upcoming', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Open To Shelter' },
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
      summary: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Return to station.',
      nextDirection: 'Next: return to the field station for Trail Stride.',
      beats: [
        { id: 'forest-study', status: 'done', title: 'Forest Logged' },
        { id: 'station-return', status: 'active', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Open To Shelter' },
      ],
    });

    save.purchasedUpgradeIds = ['trail-stride'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'coastal-scrub',
      summary: 'Open To Shelter carries the coast-to-forest shelter line through Coastal Scrub.',
      nextDirection:
        'Next: travel to Coastal Scrub and start Open To Shelter with open bloom, then shore pine, then edge log.',
      beats: [
        { id: 'forest-study', status: 'done', title: 'Forest Logged' },
        { id: 'station-return', status: 'done', title: 'Trail Stride' },
        {
          id: 'coastal-comparison',
          status: 'active',
          title: 'Open To Shelter',
          detail: 'Walk open bloom, shore pine, and edge log in order through the scrub-to-woods shelter change.',
        },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'coastal-shelter-shift'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'coastal-scrub',
      summary: 'Open To Shelter logged. Edge Moisture checks the cooler forest edge next.',
      nextDirection: 'Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.',
      beats: [
        { id: 'forest-study', status: 'done', title: 'Forest Logged' },
        { id: 'station-return', status: 'done', title: 'Trail Stride' },
        {
          id: 'coastal-comparison',
          status: 'active',
          title: 'Edge Moisture',
          detail: 'At the forest edge, log the cooler, wetter ground shift.',
        },
      ],
    });
  });

  it('uses the filed route titles on the front-half board once the beach opener is complete', () => {
    const save = createNewSaveState('field-season-board-front-half-route-title-seed');
    save.completedFieldRequestIds = ['beach-shore-shelter'];

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      summary: 'Shore Shelter logged. Hidden Hollow carries shelter inland.',
      nextDirection: 'Next: travel inland to Forest Trail and find Hidden Hollow.',
      beats: [
        { id: 'forest-study', status: 'active', title: 'Hidden Hollow' },
        { id: 'station-return', status: 'upcoming', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Open To Shelter' },
      ],
    });

    save.completedFieldRequestIds = ['beach-shore-shelter', 'forest-hidden-hollow'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      summary: 'Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.',
      nextDirection:
        'Next: stay in Forest Trail and match the shelter, ground, and living clues for Moisture Holders.',
      beats: [
        { id: 'forest-study', status: 'active', title: 'Moisture Holders' },
        { id: 'station-return', status: 'upcoming', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Open To Shelter' },
      ],
    });

    save.completedFieldRequestIds = [
      'beach-shore-shelter',
      'forest-hidden-hollow',
      'forest-moisture-holders',
    ];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      summary: 'Moisture Holders logged. Forest Survey closes the forest study in Forest Trail.',
      nextDirection: 'Next: stay in Forest Trail and finish Forest Survey before returning to the station.',
      beats: [
        { id: 'forest-study', status: 'active', title: 'Forest Survey' },
        { id: 'station-return', status: 'upcoming', title: 'Station Return' },
        { id: 'coastal-comparison', status: 'upcoming', title: 'Open To Shelter' },
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
      summary: 'Stone Shelter starts at Treeline Pass.',
      nextDirection:
        'Next: travel to Treeline Pass and read Stone Shelter through bent cover, stone break, and lee life.',
      beats: [
        {
          id: 'treeline-shelter',
          status: 'active',
          title: 'Stone Shelter',
          detail:
            'Start in Krummholz Belt with bent cover, then read stone break and lee life in the lee pocket.',
        },
        { id: 'tundra-short-season', status: 'upcoming', title: 'Thaw Window' },
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
      summary: 'Stone Shelter logged. Thaw Window opens in Tundra Reach.',
      nextDirection:
        'Next: travel to Tundra Reach and follow Thaw Window from first bloom to brief fruit.',
      beats: [
        {
          id: 'treeline-shelter',
          status: 'done',
          title: 'Stone Shelter Logged',
          detail: 'Bent cover, stone break, and lee life now read as one last sheltered treeline pocket.',
        },
        {
          id: 'tundra-short-season',
          status: 'active',
          title: 'Thaw Window',
          detail:
            'Start in Snow Meadow with first bloom, drop to Thaw Skirt for wet tuft, then carry brief fruit back upslope.',
        },
        { id: 'tundra-survey', status: 'upcoming', title: 'Tundra Survey' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-short-season'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'tundra',
      summary: 'Thaw Window logged. Tundra Survey closes the inland chapter in Tundra Reach.',
      nextDirection:
        'Next: stay in Tundra Reach and finish Tundra Survey before the route turns back downslope.',
      beats: [
        { id: 'treeline-shelter', status: 'done' },
        {
          id: 'tundra-short-season',
          status: 'done',
          title: 'Thaw Window Logged',
          detail: 'First bloom, wet tuft, and brief fruit now read as one short thaw-window run.',
        },
        { id: 'tundra-survey', status: 'active', title: 'Tundra Survey' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-survey-slice'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'edge-pattern-line',
      routeTitle: 'EDGE PATTERN LINE',
      branchLabel: 'Coastal Scrub -> Forest -> Treeline',
      summary: 'Walk the coast-to-forest transect from pioneer scrub into lower fell.',
      progressLabel: '0/3 logged',
      nextDirection: 'Next: travel to Coastal Scrub and walk Back Dune -> Windbreak Swale -> Forest Edge.',
      targetBiomeId: 'coastal-scrub',
      complete: false,
      beats: [
        {
          id: 'scrub-edge-pattern',
          status: 'active',
          title: 'Scrub Pattern',
          detail: 'Walk Back Dune, Windbreak Swale, and Forest Edge in order, filing one clue from each stage.',
        },
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
        {
          id: 'scrub-edge-pattern',
          status: 'active',
          title: 'Scrub Pattern',
          detail: 'Walk Back Dune, Windbreak Swale, and Forest Edge in order, filing one clue from each stage.',
        },
        { id: 'forest-cool-edge', status: 'upcoming', title: 'Cool Edge' },
        { id: 'treeline-low-fell', status: 'upcoming', title: 'Low Fell' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'scrub-edge-pattern'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      summary: 'Scrub pattern logged. Read the cooler forest side of the transition next.',
      progressLabel: '1/3 logged',
      nextDirection:
        'Next: travel to Forest Trail and match one edge carrier, one cool floor, and one wet shade clue.',
      targetBiomeId: 'forest',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done', title: 'Scrub Pattern Logged' },
        {
          id: 'forest-cool-edge',
          status: 'active',
          title: 'Cool Edge',
          detail: 'Match one edge carrier, one cool floor, and one wet shade clue at Creek Bend.',
        },
        { id: 'treeline-low-fell', status: 'upcoming', title: 'Low Fell' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-cool-edge'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'treeline',
      summary: 'Cool edge logged. Follow the four-part drop out of treeline shelter into open fell.',
      nextDirection:
        'Next: travel to Treeline Pass and log the last tree shape, then low wood, then fell bloom, then low rest.',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done', title: 'Cool Edge Logged' },
        {
          id: 'treeline-low-fell',
          status: 'active',
          title: 'Low Fell',
          detail:
            'Log the last tree shape at Krummholz Belt, then low wood in Dwarf Shrub, then fell bloom and low rest in Lichen Fell.',
        },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'treeline-low-fell'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeTitle: 'EDGE LINE LOGGED',
      progressLabel: 'ROUTE LOGGED',
      targetBiomeId: 'forest',
      complete: true,
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done' },
        {
          id: 'treeline-low-fell',
          status: 'done',
          title: 'Edge Line Logged',
          detail: 'Last tree shape, low wood, fell bloom, and low rest now trace one full drop out of treeline shelter.',
        },
      ],
    });
  });

  it('surfaces an early-shelter replay note on later beach-start revisits', () => {
    const save = createNewSaveState('field-season-board-dawn-replay-seed');
    save.worldStep = 3;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'coastal-shelter-line',
      summary: 'Early light makes the dune-to-wrack shelter line easier to read.',
      replayNote: {
        id: 'beach-early-shelter',
        title: 'Early Shelter',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'forest-study', status: 'active', title: 'Early Shelter' }),
      ]),
    );
  });

  it('marks the active route beat notebook-ready until the note is filed at the station', () => {
    const save = createNewSaveState('field-season-board-notebook-ready-seed');
    save.routeV2Progress = {
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['fallen-log-marker'],
      evidenceSlots: [],
    };

    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    expect(routeBoard).toMatchObject({
      targetBiomeId: null,
      summary: 'Return to the field station and file the Hidden Hollow note.',
      nextDirection: 'Next: return to the field station and file the Hidden Hollow note.',
      notebookReady: {
        requestId: 'forest-hidden-hollow',
        text: 'Return to the field station and file the Hidden Hollow note.',
        previewLabel: 'HIDDEN HOLLOW',
      },
    });
    expect(routeBoard.beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'forest-study',
          status: 'ready',
        }),
      ]),
    );
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
      label: 'NOTEBOOK READY',
      text: 'Return to the field station and file the Hidden Hollow note.',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'HIDDEN HOLLOW',
      text: 'Seep stone confirms the damp lower hollow under the roots.',
    });
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

  it('surfaces a thaw-window replay note on peak tundra short-season revisits', () => {
    const save = createNewSaveState('field-season-board-thaw-window-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    save.worldStep = 4;
    save.biomeVisits.tundra = 2;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'treeline-shelter-line',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      replayNote: {
        id: 'tundra-thaw-window',
        title: 'Thaw Window',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'tundra-short-season', status: 'active', title: 'Thaw Window' }),
      ]),
    );
  });

  it('surfaces a wrack-shelter replay note on late beach opener revisits', () => {
    const save = createNewSaveState('field-season-board-wrack-shelter-seed');
    save.worldStep = 6;
    save.biomeVisits.beach = 2;

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'coastal-shelter-line',
      summary: 'Fresh wrack makes the beach shelter line easier to follow today.',
      replayNote: {
        id: 'beach-wrack-shelter',
        title: 'Wrack Shelter',
      },
    });
    expect(resolveFieldSeasonBoardState(biomeRegistry, save).beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'forest-study', status: 'active', title: 'Wrack Shelter' }),
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
      summary: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
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

  it('uses clue-backed note-tabs preview text when an evidence route is ready to file', () => {
    const save = createNewSaveState('field-season-board-clue-backed-preview-seed');
    save.completedFieldRequestIds = ['forest-hidden-hollow'];
    save.routeV2Progress = {
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'shelter', entryId: 'licorice-fern' },
        { slotId: 'ground', entryId: 'seep-stone' },
        { slotId: 'living', entryId: 'banana-slug' },
      ],
    };

    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    expect(routeBoard.notebookReady).toMatchObject({
      requestId: 'forest-moisture-holders',
      previewLabel: 'MOISTURE HOLDERS',
      previewText: 'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'MOISTURE HOLDERS',
      text: 'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    });
  });

  it('adds the thaw-window page stamp to the short-season note-tabs preview', () => {
    const save = createNewSaveState('field-season-board-thaw-window-preview-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    save.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'cottongrass' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    };

    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    expect(routeBoard.notebookReady).toMatchObject({
      requestId: 'tundra-short-season',
      previewLabel: 'SHORT SEASON',
      previewText:
        'Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'SHORT SEASON',
      text: 'Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    });
  });

  it('uses the four-leg low-fell note when note tabs previews a ready edge-line close', () => {
    const save = createNewSaveState('field-season-board-low-fell-preview-seed');
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
    ];
    save.routeV2Progress = {
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        { slotId: 'low-rest', entryId: 'arctic-willow' },
      ],
    };

    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    expect(routeBoard.notebookReady).toMatchObject({
      requestId: 'treeline-low-fell',
      previewLabel: 'LOW FELL',
      previewText:
        'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'LOW FELL',
      text: 'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
    });
  });

  it('builds a tiny field atlas once routes start logging', () => {
    const save = createNewSaveState('field-season-board-atlas-seed');

    expect(resolveFieldAtlasState(save)).toBeNull();

    save.completedFieldRequestIds = ['coastal-edge-moisture'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged'],
      note: 'Coast filed. Inland shelter next.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-survey-slice'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged', 'TREELINE SHELTER LINE logged'],
      note: 'Coast and ridge filed. Low-fell edge next.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'treeline-low-fell'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Coast, ridge, edge filed. Root Hollow next.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-expedition-upper-run'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: tie coast and hollow in Forest Trail.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-season-threads'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Filed season: High Pass from Treeline Pass.',
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
      teaser: null,
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
      summary: 'One deeper forest chapter is staged from seep mark through the stone pocket and root-held return to the high run.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Start when you want a longer forest outing.',
      teaser: null,
    });
  });

  it('tracks expedition progress from the chapter evidence count', () => {
    const save = createNewSaveState('field-season-expedition-active-seep-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'seep-mark', entryId: 'seep-stone' }],
    };

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: '1/4',
      summary: 'The seep mark is logged. Drop into the stone pocket below the climb.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: drop into the stone pocket below the climb.',
      teaser: null,
    });
  });

  it('tracks the new stone-pocket middle leg before the climb return', () => {
    const save = createNewSaveState('field-season-expedition-active-stone-pocket-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
      ],
    };

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: '2/4',
      summary: 'The seep mark and stone-pocket clue are logged. Climb toward the root-held return above the seep floor.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: climb through Root Hollow to the root-held return.',
      teaser: null,
    });
  });

  it('reads normalized legacy Root Hollow gathering saves through truthful station copy', () => {
    const save = normalizeSaveState({
      worldSeed: 'legacy-root-hollow-board-seed',
      completedFieldRequestIds: ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'],
      routeV2Progress: {
        requestId: 'forest-expedition-upper-run',
        status: 'gathering',
        landmarkEntryIds: [],
        evidenceSlots: [
          { slotId: 'seep-mark', entryId: 'seep-stone' },
          { slotId: 'root-held', entryId: 'root-curtain' },
        ],
      },
    } as unknown as Parameters<typeof normalizeSaveState>[0]);

    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      routeId: 'edge-pattern-line',
      complete: true,
      summary: 'Root Hollow is nearly filed. Carry the high run back into Log Run.',
      nextDirection: 'Next: follow the high return into Log Run.',
    });
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: follow the Root Hollow high return.',
    });
    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: '3/4',
      summary: 'The seep mark, stone-pocket clue, and root-held clue are logged. One high-run clue still leads back into the open forest.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: follow the high return into Log Run.',
      teaser: null,
    });
  });

  it('shows the expedition card as notebook-ready once the chapter clues are complete', () => {
    const save = createNewSaveState('field-season-expedition-note-ready-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    };

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'active',
      statusLabel: 'NOTE READY',
      summary: 'The chapter is ready to file from seep mark through the stone pocket and root-held return to the high run.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Next: file the Root Hollow note at the field station.',
      teaser: null,
    });
  });

  it('adds one tiny next-expedition teaser once the first expedition is fully logged', () => {
    const save = createNewSaveState('field-season-expedition-logged-seed');
    save.completedFieldRequestIds = [
      'coastal-edge-moisture',
      'tundra-survey-slice',
      'treeline-low-fell',
      'forest-expedition-upper-run',
    ];

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'logged',
      statusLabel: 'LOGGED',
      summary: 'The forest chapter is filed from seep mark through the stone pocket and root-held return to the high run.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Revisit for seep-mark, stone-pocket, root-held, and high-run clues.',
      teaser: {
        label: 'NEXT EXPEDITION',
        text: 'Treeline Pass waits beyond Root Hollow.',
      },
    });
  });

  it('turns the logged expedition footer into a next-season setup card once the season is filed', () => {
    const save = createNewSaveState('field-season-expedition-next-season-seed');
    save.completedFieldRequestIds = [
      'coastal-edge-moisture',
      'tundra-survey-slice',
      'treeline-low-fell',
      'forest-expedition-upper-run',
      'forest-season-threads',
    ];

    expect(resolveFieldSeasonExpeditionState(save)).toEqual({
      id: 'root-hollow-expedition',
      title: 'ROOT HOLLOW',
      status: 'logged',
      statusLabel: 'LOGGED',
      summary: 'The forest chapter is filed from seep mark through the stone pocket and root-held return to the high run.',
      startText: 'Forest Trail to Root Hollow',
      note: 'Revisit for seep-mark, stone-pocket, root-held, and high-run clues.',
      teaser: {
        label: 'NEXT FIELD SEASON',
        text: 'High Pass waits beyond Root Hollow.',
      },
    });
  });

  it('derives treeline as the next-field-season target once the season is filed', () => {
    const save = createNewSaveState('field-season-next-season-target-seed');
    expect(resolveNextFieldSeasonTargetBiomeId(save)).toBeNull();

    save.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    expect(resolveNextFieldSeasonTargetBiomeId(save)).toBe('treeline');
  });

  it('uses a clue-facing today wrap when hand lens is the active outing support', () => {
    const save = createNewSaveState('field-season-wrap-starter-seed');
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Log dune grass, then lee cover, then wrack line from Dune Edge to Tide Line.',
    });
  });

  it('keeps the today wrap travel-facing when route marker is the active outing support', () => {
    const save = createNewSaveState('field-season-wrap-starter-route-marker-seed');
    save.purchasedUpgradeIds = ['route-marker'];
    save.selectedOutingSupportId = 'route-marker';
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'route-marker',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Stay on Sunny Beach and start Shore Shelter with dune grass, then lee cover, then wrack line.',
    });
  });

  it('keeps the today wrap notebook-first when note tabs is the active outing support', () => {
    const save = createNewSaveState('field-season-wrap-starter-note-tabs-seed');
    save.selectedOutingSupportId = 'note-tabs';
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Shore Shelter starts at Sunny Beach.',
    });
  });

  it('uses a front-half stop-point wrap once the coastal line rolls into the inland opener', () => {
    const save = createNewSaveState('field-season-wrap-front-half-stop-point-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
    ];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'STONE SHELTER',
          text: 'Stone Shelter is next at Treeline Pass. Read bent cover, stone break, and lee life before the thaw edge.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. Coast line filed.',
    });
  });

  it('uses a note-tabs beach-close line once Shore Shelter is logged', () => {
    const save = createNewSaveState('field-season-wrap-note-tabs-shore-shelter-close-seed');
    save.selectedOutingSupportId = 'note-tabs';
    save.completedFieldRequestIds = ['beach-shore-shelter'];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'SHORE SHELTER LOGGED',
      text: 'Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.',
    });
  });

  it('uses a note-tabs chapter-close line once Open To Shelter is logged', () => {
    const save = createNewSaveState('field-season-wrap-note-tabs-open-to-shelter-close-seed');
    save.selectedOutingSupportId = 'note-tabs';
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
    ];
    save.purchasedUpgradeIds = ['trail-stride'];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'OPEN TO SHELTER LOGGED',
      text: 'Coastal Scrub closes the shelter chapter. Edge Moisture waits at the forest edge.',
    });
  });

  it('uses an inland note-tabs chapter-close without changing the live scrub-start wrap for other supports', () => {
    const save = createNewSaveState('field-season-wrap-note-tabs-inland-close-seed');
    save.selectedOutingSupportId = 'note-tabs';
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
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'INLAND LINE LOGGED',
      text: 'Tundra Survey closes the inland line. Scrub Pattern waits in Coastal Scrub.',
    });

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIELD SEASON OPEN',
          text: 'Keep comparing nearby habitats and checking the station between longer routes.',
        },
        resolveFieldAtlasState(save),
        null,
        'hand-lens',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Walk Back Dune, Windbreak Swale, and Forest Edge in order, filing one clue from each stage.',
    });
  });

  it('keeps the today wrap place-reading when place tab is selected on the edge line', () => {
    const save = createNewSaveState('field-season-wrap-place-tab-edge-seed');
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
        null,
        'place-tab',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Where does tree cover drop into low fell here?',
    });
  });

  it('shows the thaw-edge place question when place tab is selected on the high-country middle beat', () => {
    const save = createNewSaveState('field-season-wrap-place-tab-high-country-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
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
        null,
        'place-tab',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'What here marks the wet edge of thaw?',
    });
  });

  it('falls back to the active beat detail when place tab is selected outside the edge line', () => {
    const save = createNewSaveState('field-season-wrap-place-tab-fallback-seed');
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'FIRST FIELD SEASON',
          text: 'Start from the beach, follow shelter inland into Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'place-tab',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Log dune grass, then lee cover, then wrack line from Dune Edge to Tide Line.',
    });
  });

  it('uses the replay note text as the active season-wrap cue when hand lens is live', () => {
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
      text: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    });
  });

  it('keeps replay notes travel-facing when route marker is selected', () => {
    const save = createNewSaveState('field-season-wrap-replay-route-marker-seed');
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
    save.purchasedUpgradeIds = ['route-marker'];
    save.selectedOutingSupportId = 'route-marker';
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
        null,
        'route-marker',
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
      text: 'Good stopping point. Root Hollow waits below.',
    });
  });

  it('uses a note-tabs chapter-close line once the edge line is logged', () => {
    const save = createNewSaveState('field-season-wrap-note-tabs-edge-close-seed');
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
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'EDGE LINE LOGGED',
      text: 'Low Fell closes the edge line. Root Hollow waits below.',
    });
  });

  it('uses a calmer stop cue once Root Hollow is ready to file', () => {
    const save = createNewSaveState('field-season-wrap-expedition-note-ready-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    };
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
      text: 'Good stopping point. The note is ready.',
    });
  });

  it('keeps the generic stop cue for note-tabs once Root Hollow is ready to file', () => {
    const save = createNewSaveState('field-season-wrap-note-tabs-expedition-note-ready-seed');
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    save.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    };
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
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. The note is ready.',
    });
  });

  it('points the routes page at Forest Trail once the expedition reconnects the season', () => {
    const save = createNewSaveState('field-season-wrap-capstone-seed');
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
      'forest-expedition-upper-run',
    ];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);

    expect(routeBoard).toMatchObject({
      complete: true,
      summary: 'Root Hollow reconnects the season. Tie the threads together back in Forest Trail.',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'SEASON THREADS',
          text: 'Forest Trail has one last notebook pass. Tie together floor cover, edge growth, and canopy life.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. Season Threads waits in Forest Trail.',
    });
  });

  it('points the season wrap back to the station once the capstone is logged', () => {
    const save = createNewSaveState('field-season-wrap-close-seed');
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
      'forest-expedition-upper-run',
      'forest-season-threads',
    ];
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    const activeOuting = resolveSeasonOutingLocator(save);

    expect(routeBoard).toMatchObject({
      complete: true,
      summary: 'High Pass opens next from Treeline Pass into the next field season.',
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
        summary: 'Treeline Pass carries the season toward High Pass.',
      },
    });
    expect(activeOuting).toMatchObject({
      title: 'High Pass',
      summary: 'Treeline Pass carries the season toward High Pass.',
      progressLabel: 'NEXT',
      targetBiomeId: 'treeline',
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'RETURN TO STATION',
          text: 'Season Threads logged. Return to the field station for a calm season close.',
        },
        resolveFieldAtlasState(save),
        resolveFieldSeasonArchiveState(save),
      ),
    ).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'Root Hollow now leads to High Pass.',
    });
  });

  it('uses the filed-season subtitle only when the archive strip is active', () => {
    expect(
      resolveFieldStationSubtitle('season', 'routes', {
        label: 'SEASON ARCHIVE',
        text: 'Root Hollow now leads to High Pass.',
      }, 'High Pass starts at Treeline Pass.'),
    ).toBe('High Pass starts at Treeline Pass.');

    expect(
      resolveFieldStationSubtitle('season', 'expedition', {
        label: 'SEASON ARCHIVE',
        text: 'Root Hollow now leads to High Pass.',
      }),
    ).toBe('High Pass opens the next field season.');

    expect(
      resolveFieldStationSubtitle('season', 'routes', {
        label: 'ROUTE LOGGED',
        text: 'Open the Root Hollow expedition.',
      }),
    ).toBe('Route board and calm field support.');
  });

  it('derives one salmonberry-led nursery clue once the season moves beyond the route board', () => {
    const save = createNewSaveState('field-season-nursery-support-seed');
    save.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];

    expect(resolveNurseryCapstoneSupportHint(save)).toBe(
      'Salmonberry still marks the cooler forest return near Root Hollow.',
    );

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-expedition-upper-run'];
    expect(resolveNurseryCapstoneSupportHint(save)).toBe(
      'Salmonberry still marks the cooler forest return tying the season together.',
    );
  });
});
