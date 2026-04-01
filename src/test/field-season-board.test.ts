import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import {
  resolveFieldAtlasState,
  resolveNextFieldSeasonTargetBiomeId,
  resolveFieldSeasonArchiveState,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
  resolveFieldStationSubtitle,
  resolveFieldSeasonWrapState,
  resolveNurseryCapstoneSupportHint,
} from '../engine/field-season-board';
import { createNewSaveState, normalizeSaveState, recordDiscovery } from '../engine/save';

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
      summary: 'Leave canopy cover. Follow shelter and thaw into the inland exposure chapter.',
      nextDirection:
        'Next: travel to Treeline Pass and match one stone break, one bent cover, and one lee-life clue.',
      beats: [
        {
          id: 'treeline-shelter',
          status: 'active',
          title: 'Treeline Shelter',
          detail: 'Match one stone break, one bent cover, and one lee-life clue where treeline still blocks the wind.',
        },
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
      summary: 'Treeline shelter logged. Follow the thaw edge into the shorter season.',
      nextDirection:
        'Next: travel to Tundra Reach and match one first bloom, one wet tuft, and one brief-fruit clue.',
      beats: [
        { id: 'treeline-shelter', status: 'done', title: 'Treeline Shelter Logged' },
        {
          id: 'tundra-short-season',
          status: 'active',
          title: 'Short Season',
          detail: 'Match one first bloom, one wet tuft, and one brief-fruit clue across the thaw edge.',
        },
        { id: 'tundra-survey', status: 'upcoming', title: 'Tundra Survey' },
      ],
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-short-season'];
    expect(resolveFieldSeasonBoardState(biomeRegistry, save)).toMatchObject({
      progressLabel: '2/3 logged',
      targetBiomeId: 'tundra',
      beats: [
        { id: 'treeline-shelter', status: 'done' },
        {
          id: 'tundra-short-season',
          status: 'done',
          title: 'Short Season Logged',
          detail: 'First bloom, wet tuft, and brief-fruit clues now read as one thaw-window timing pass.',
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
      summary: 'Cool edge logged. Follow the line into the inland exposure roles.',
      nextDirection:
        'Next: travel to Treeline Pass and match one last tree shape, one low wood, and one fell-bloom clue.',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done', title: 'Cool Edge Logged' },
        {
          id: 'treeline-low-fell',
          status: 'active',
          title: 'Low Fell',
          detail: 'Match one last tree shape, one low wood, and one fell-bloom clue from krummholz to lichen fell.',
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
          detail: 'Last tree shape, low wood, and fell bloom clues now finish the edge line as one exposure read.',
        },
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
      label: 'NOTEBOOK READY',
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
      label: 'NOTEBOOK READY',
      text: 'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    });
  });

  it('builds a tiny field atlas once routes start logging', () => {
    const save = createNewSaveState('field-season-board-atlas-seed');

    expect(resolveFieldAtlasState(save)).toBeNull();

    save.completedFieldRequestIds = ['coastal-edge-moisture'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged'],
      note: 'Next: follow the inland shelter line.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'tundra-survey-slice'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged', 'TREELINE SHELTER LINE logged'],
      note: 'Next: follow the low-fell edge line.',
    });

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'treeline-low-fell'];
    expect(resolveFieldAtlasState(save)).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: open Root Hollow below the forest.',
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
      note: 'Next: take the High Pass from Treeline Pass.',
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
        text: 'Another special outing can open here later.',
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
        text: 'Follow Root Hollow into High Pass.',
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
          text: 'Start with one clear notebook route in Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Find the lower hollow and confirm the seep stone.',
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
          text: 'Start with one clear notebook route in Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'route-marker',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Travel to Forest Trail and find Hidden Hollow.',
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
          text: 'Start with one clear notebook route in Forest Trail, then return to the field station after the run.',
        },
        resolveFieldAtlasState(save),
        null,
        'note-tabs',
      ),
    ).toEqual({
      label: 'TODAY',
      text: 'Beach start. Follow shelter inland.',
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
      text: 'Open Root Hollow below the forest.',
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
      text: 'Tie coast and hollow in Forest Trail.',
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

    expect(routeBoard).toMatchObject({
      complete: true,
      summary: 'High Pass opens next from Treeline Pass into the next field season.',
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
        summary: 'Treeline Pass opens the next field season.',
        detail: 'Match last tree, low wood, and fell bloom.',
      },
    });
    expect(
      resolveFieldSeasonWrapState(
        biomeRegistry,
        routeBoard,
        {
          title: 'RETURN TO STATION',
          text: 'The season threads are logged. Return to the field station for a calm season close.',
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
      }, 'High Pass continues from Treeline Pass.'),
    ).toBe('High Pass continues from Treeline Pass.');

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
