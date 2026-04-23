import { afterEach, describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import {
  buildDebugSaveSnapshot,
  buildDebugSaveSnapshots,
  DEBUG_SAVE_SNAPSHOT_IDS,
  serializeDebugSaveSnapshots,
  type DebugSaveSnapshotId,
} from '../engine/debug-save-snapshots';
import { createGame } from '../engine/game';
import { resolveFieldSeasonBoardState } from '../engine/field-season-board';
import { resolveGuidedFieldSeasonState } from '../engine/guided-field-season';
import { resolveHighPassChapterState } from '../engine/high-pass-chapter-state';
import { resolveSourceToShoreState } from '../engine/source-to-shore-state';
import { createNewSaveState, normalizeSaveState, SAVE_STORAGE_KEY } from '../engine/save';
import type { SaveState } from '../engine/types';
import { advanceUntil, type FakeWindow, installFakeDom, readState, restoreDom, tapKey } from './test-helpers';

afterEach(() => {
  restoreDom();
});

function bootSave(save: SaveState): FakeWindow {
  const { window: fakeWindow, document } = installFakeDom();
  const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
  createGame(canvas, save);

  tapKey(fakeWindow, 'Enter');

  return fakeWindow;
}

function bootSnapshot(id: DebugSaveSnapshotId): FakeWindow {
  return bootSave(buildDebugSaveSnapshot(id).save);
}

function selectMenuAction(fakeWindow: FakeWindow, actionId: string): any {
  let state = readState(fakeWindow);
  const availableActions = state.menu?.availableActions ?? [];

  for (let index = 0; state.menu?.selectedAction !== actionId && index <= availableActions.length; index += 1) {
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
  }

  expect(state.menu?.selectedAction).toBe(actionId);
  return state;
}

function openWorldMap(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'm');

  let state = readState(fakeWindow);
  expect(state.mode).toBe('menu');
  selectMenuAction(fakeWindow, 'world-map');

  tapKey(fakeWindow, 'Enter');
  state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
  expect(state.scene).toBe('world-map');

  return state;
}

function openFieldStationFromWorldMap(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'm');

  let state = readState(fakeWindow);
  expect(state.mode).toBe('menu');
  selectMenuAction(fakeWindow, 'field-station');

  tapKey(fakeWindow, 'Enter');
  state = readState(fakeWindow);
  expect(state.mode).toBe('field-station');

  return state;
}

function openJournal(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'j');

  const state = readState(fakeWindow);
  expect(state.mode).toBe('journal');

  return state;
}

function getEntryIdsByBiome(): Map<string, Set<string>> {
  return new Map(
    Object.entries(biomeRegistry).map(([biomeId, biome]) => [
      biomeId,
      new Set(Object.keys(biome.entries)),
    ]),
  );
}

function collectSaveBackedEntryIds(save: SaveState): string[] {
  const entryIds = new Set<string>();
  const addEntryId = (entryId: string | null | undefined): void => {
    if (entryId) {
      entryIds.add(entryId);
    }
  };

  for (const [entryId, entryState] of Object.entries(save.discoveredEntries)) {
    addEntryId(entryId);
    addEntryId(entryState.entryId);
  }

  for (const sketchbookPage of Object.values(save.sketchbookPages)) {
    for (const entryId of Object.values(sketchbookPage.slots)) {
      addEntryId(entryId);
    }
  }

  if (save.routeV2Progress) {
    for (const entryId of save.routeV2Progress.landmarkEntryIds) {
      addEntryId(entryId);
    }

    for (const slot of save.routeV2Progress.evidenceSlots) {
      addEntryId(slot.entryId);
    }
  }

  return [...entryIds].sort();
}

describe('debug save snapshots', () => {
  it('keeps every snapshot as plain save JSON that round-trips through normalization', () => {
    const snapshots = buildDebugSaveSnapshots();

    expect(snapshots.map((snapshot) => snapshot.id)).toEqual([...DEBUG_SAVE_SNAPSHOT_IDS]);

    for (const snapshot of snapshots) {
      expect(snapshot.localStorageKey).toBe(SAVE_STORAGE_KEY);
      expect(snapshot.localStorageValue).toBe(JSON.stringify(snapshot.save));
      expect(snapshot.pasteCommand).toContain('localStorage.setItem');
      expect(normalizeSaveState(JSON.parse(snapshot.localStorageValue))).toEqual(snapshot.save);
    }
  });

  it('keeps save-backed spatial entry ids tied to live biome content', () => {
    const entryIdsByBiome = getEntryIdsByBiome();
    const liveEntryIds = new Set(
      [...entryIdsByBiome.values()].flatMap((entryIds) => [...entryIds]),
    );

    for (const snapshot of buildDebugSaveSnapshots()) {
      for (const entryId of collectSaveBackedEntryIds(snapshot.save)) {
        expect(
          liveEntryIds.has(entryId),
          `${snapshot.id} references missing entry id ${entryId}`,
        ).toBe(true);
      }

      for (const entryState of Object.values(snapshot.save.discoveredEntries)) {
        for (const biomeId of entryState.biomeIds) {
          const biomeEntryIds = entryIdsByBiome.get(biomeId);
          expect(
            biomeEntryIds,
            `${snapshot.id} references unknown biome id ${biomeId}`,
          ).toBeDefined();
          expect(
            biomeEntryIds?.has(entryState.entryId),
            `${snapshot.id} records ${entryState.entryId} in ${biomeId}, but that biome no longer contains the entry`,
          ).toBe(true);
        }
      }
    }
  });

  it('resolves each named save to the expected guided-season or High Pass state', () => {
    const snapshots = Object.fromEntries(
      buildDebugSaveSnapshots().map((snapshot) => [snapshot.id, snapshot.save]),
    );

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['first-session'])).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'beach',
    });
    const firstSessionBoard = resolveFieldSeasonBoardState(biomeRegistry, snapshots['first-session']);
    expect(firstSessionBoard).toMatchObject({
      targetBiomeId: 'beach',
    });
    expect(firstSessionBoard.beats[0]).toMatchObject({
      id: 'forest-study',
      status: 'active',
      title: 'Shore Shelter',
    });

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['forest-moisture-holders'])).toMatchObject({
      stage: 'forest-study',
      nextBiomeId: null,
      stationNote: {
        title: 'MOISTURE HOLDERS',
        text: 'Moisture Holders is next in Root Hollow. Compare one shelter, one ground, and one living clue before heading back.',
      },
    });
    const forestMoistureBoard = resolveFieldSeasonBoardState(
      biomeRegistry,
      snapshots['forest-moisture-holders'],
    );
    expect(forestMoistureBoard).toMatchObject({
      routeId: 'coastal-shelter-line',
      routeTitle: 'COASTAL SHELTER LINE',
      targetBiomeId: 'forest',
      activeBeatId: 'forest-study',
      summary: 'Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.',
      nextDirection:
        'Next: stay in Forest Trail and match the shelter, ground, and living clues for Moisture Holders.',
    });
    expect(forestMoistureBoard.beats).toEqual([
      expect.objectContaining({ id: 'forest-study', status: 'active', title: 'Moisture Holders' }),
      expect.objectContaining({ id: 'station-return', status: 'upcoming' }),
      expect.objectContaining({ id: 'coastal-comparison', status: 'upcoming' }),
    ]);

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['station-return'])).toMatchObject({
      stage: 'station-return',
      nextBiomeId: null,
    });
    const stationReturnBoard = resolveFieldSeasonBoardState(biomeRegistry, snapshots['station-return']);
    expect(stationReturnBoard).toMatchObject({
      targetBiomeId: null,
    });
    expect(stationReturnBoard.beats[0]).toMatchObject({ id: 'forest-study', status: 'done' });
    expect(stationReturnBoard.beats[1]).toMatchObject({ id: 'station-return', status: 'active' });

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['front-half-open-to-shelter'])).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
      stationNote: {
        title: 'NEXT STOP',
        text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
      },
    });
    const frontHalfBoard = resolveFieldSeasonBoardState(
      biomeRegistry,
      snapshots['front-half-open-to-shelter'],
    );
    expect(frontHalfBoard).toMatchObject({
      routeId: 'coastal-shelter-line',
      routeTitle: 'COASTAL SHELTER LINE',
      targetBiomeId: 'coastal-scrub',
      activeBeatId: 'coastal-comparison',
      summary: 'Open To Shelter carries the coast-to-forest shelter line through Coastal Scrub.',
      nextDirection:
        'Next: travel to Coastal Scrub and start Open To Shelter with open bloom, then shore pine, then edge log.',
    });
    expect(frontHalfBoard.beats).toEqual([
      expect.objectContaining({ id: 'forest-study', status: 'done' }),
      expect.objectContaining({ id: 'station-return', status: 'done' }),
      expect.objectContaining({ id: 'coastal-comparison', status: 'active', title: 'Open To Shelter' }),
    ]);

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['treeline-stone-shelter'])).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'treeline',
      stationNote: {
        title: 'STONE SHELTER',
        text: 'Stone Shelter is next at Treeline Pass. Read bent cover, stone break, and lee life before the thaw edge.',
      },
    });
    const treelineBoard = resolveFieldSeasonBoardState(
      biomeRegistry,
      snapshots['treeline-stone-shelter'],
    );
    expect(treelineBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'treeline',
      activeBeatId: 'treeline-shelter',
      summary: 'Stone Shelter starts at Treeline Pass.',
      nextDirection:
        'Next: travel to Treeline Pass and read Stone Shelter through bent cover, stone break, and lee life.',
      launchCard: null,
    });
    expect(treelineBoard.beats).toEqual([
      expect.objectContaining({ id: 'treeline-shelter', status: 'active', title: 'Stone Shelter' }),
      expect.objectContaining({ id: 'tundra-short-season', status: 'upcoming', title: 'Thaw Window' }),
      expect.objectContaining({ id: 'tundra-survey', status: 'upcoming' }),
    ]);

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['tundra-thaw-window'])).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'tundra',
      stationNote: {
        title: 'THAW WINDOW',
        text: 'Thaw Window is next in Tundra Reach. Follow first bloom, wet tuft, and brief fruit through the brief thaw.',
      },
    });
    const tundraThawBoard = resolveFieldSeasonBoardState(
      biomeRegistry,
      snapshots['tundra-thaw-window'],
    );
    expect(tundraThawBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'tundra',
      activeBeatId: 'tundra-short-season',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      replayNote: {
        id: 'tundra-thaw-window',
        title: 'Thaw Window',
        text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      },
      launchCard: null,
    });
    expect(tundraThawBoard.beats).toEqual([
      expect.objectContaining({ id: 'treeline-shelter', status: 'done', title: 'Stone Shelter Logged' }),
      expect.objectContaining({ id: 'tundra-short-season', status: 'active', title: 'Thaw Window' }),
      expect.objectContaining({ id: 'tundra-survey', status: 'upcoming' }),
    ]);

    expect(resolveGuidedFieldSeasonState(biomeRegistry, snapshots['season-close-return'])).toMatchObject({
      stage: 'season-close-return',
      nextBiomeId: null,
    });
    expect(resolveHighPassChapterState(snapshots['season-close-return'])).toMatchObject({
      phase: 'dormant',
      dormantUntilSeasonCloseClears: true,
    });

    expect(resolveHighPassChapterState(snapshots['high-pass-active'])).toMatchObject({
      phase: 'active',
      isActiveOuting: true,
    });

    expect(resolveHighPassChapterState(snapshots['high-pass-ready-to-file'])).toMatchObject({
      phase: 'ready-to-file',
      progressLabel: 'NOTE',
      routeBoardTargetBiomeId: null,
    });
    expect(snapshots['high-pass-ready-to-file'].routeV2Progress).toMatchObject({
      requestId: 'treeline-high-pass',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'rime-mark', entryId: 'moss-campion' },
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
      ],
    });

    expect(resolveHighPassChapterState(snapshots['high-pass-filed'])).toMatchObject({
      phase: 'filed',
      progressLabel: 'FILED',
      isActiveOuting: false,
    });
    expect(snapshots['high-pass-filed'].routeV2Progress).toBeNull();
    expect(snapshots['high-pass-filed'].completedFieldRequestIds).toContain('treeline-high-pass');

    expect(resolveSourceToShoreState(snapshots['source-to-shore-active'])).toMatchObject({
      phase: 'active',
      progressLabel: 'BETA',
      isActiveOuting: true,
    });
    expect(resolveSourceToShoreState(snapshots['source-to-shore-ready-to-file'])).toMatchObject({
      phase: 'ready-to-file',
      progressLabel: 'NOTE',
    });
    expect(snapshots['source-to-shore-ready-to-file'].routeV2Progress).toMatchObject({
      requestId: 'source-to-shore-source-shelter',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'rime-source', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
      ],
    });
    expect(resolveSourceToShoreState(snapshots['source-to-shore-filed'])).toMatchObject({
      beat: 'forest-release',
      phase: 'active',
      progressLabel: 'BETA',
      isActiveOuting: true,
    });
    expect(resolveSourceToShoreState(snapshots['source-to-shore-forest-release-ready-to-file'])).toMatchObject({
      beat: 'forest-release',
      phase: 'ready-to-file',
      progressLabel: 'NOTE',
    });
    expect(snapshots['source-to-shore-forest-release-ready-to-file'].routeV2Progress).toMatchObject({
      requestId: 'source-to-shore-forest-release',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'seep-hold', entryId: 'seep-stone' },
        { slotId: 'root-filter', entryId: 'root-curtain' },
        { slotId: 'cool-release', entryId: 'salmonberry' },
      ],
    });
    expect(resolveSourceToShoreState(snapshots['source-to-shore-forest-release-filed'])).toMatchObject({
      beat: 'forest-release',
      phase: 'filed',
      progressLabel: 'FILED',
      isActiveOuting: false,
    });
  });

  it('exposes the snapshot payload through the runtime debug window hook', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;

    createGame(canvas, createNewSaveState('debug-snapshot-window-hook'));

    expect(fakeWindow.get_debug_save_snapshots).toBeDefined();
    expect(fakeWindow.get_debug_save_snapshots?.()).toBe(serializeDebugSaveSnapshots());

    const payload = JSON.parse(fakeWindow.get_debug_save_snapshots?.() ?? '{}');
    expect(payload.localStorageKey).toBe(SAVE_STORAGE_KEY);
    expect(payload.snapshots.map((snapshot: { id: string }) => snapshot.id)).toEqual([
      ...DEBUG_SAVE_SNAPSHOT_IDS,
    ]);
  });

  it('boots the first-session snapshot into starter runtime surfaces', () => {
    const fakeWindow = bootSnapshot('first-session');
    const state = readState(fakeWindow);

    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'beach',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'beach-shore-shelter',
      biomeId: 'beach',
      title: 'Shore Shelter',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'beach',
      beats: [
        { id: 'forest-study', status: 'active' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
  });

  it('boots the station-return snapshot through map-to-station defaults', () => {
    const fakeWindow = bootSnapshot('station-return');

    let state = openWorldMap(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'station-return',
      nextBiomeId: null,
    });
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'RETURN TO STATION',
      text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'RETURN TO STATION',
      text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
    });
    expect(state.fieldStation?.routeBoard?.beats).toEqual([
      expect.objectContaining({ id: 'forest-study', status: 'done' }),
      expect.objectContaining({ id: 'station-return', status: 'active' }),
      expect.objectContaining({ id: 'coastal-comparison', status: 'upcoming' }),
    ]);
  });

  it('boots the forest Moisture Holders snapshot through station, map, and journal state', () => {
    const fakeWindow = bootSnapshot('forest-moisture-holders');

    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'forest-study',
      nextBiomeId: null,
      stationNote: {
        title: 'MOISTURE HOLDERS',
        text: 'Moisture Holders is next in Root Hollow. Compare one shelter, one ground, and one living clue before heading back.',
      },
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
      biomeId: 'forest',
      title: 'Moisture Holders',
    });

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
      biomeId: 'forest',
      title: 'Moisture Holders',
    });

    tapKey(fakeWindow, 'Escape');
    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');
    expect(state.fieldStation?.selectedOutingSupportLabel).toBe('HAND LENS');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'coastal-shelter-line',
      routeTitle: 'COASTAL SHELTER LINE',
      targetBiomeId: 'forest',
      activeBeatId: 'forest-study',
      summary: 'Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.',
      nextDirection:
        'Next: stay in Forest Trail and match the shelter, ground, and living clues for Moisture Holders.',
      beats: [
        { id: 'forest-study', status: 'active', title: 'Moisture Holders' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
  });

  it('boots the front-half Open To Shelter snapshot through station and map handoff state', () => {
    const fakeWindow = bootSnapshot('front-half-open-to-shelter');

    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
      stationNote: {
        title: 'NEXT STOP',
        text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
      },
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      biomeId: 'coastal-scrub',
      title: 'Open To Shelter',
    });

    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('coastal-scrub');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'NEXT STOP',
      text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');
    expect(state.fieldStation?.selectedOutingSupportLabel).toBe('HAND LENS');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'coastal-shelter-line',
      routeTitle: 'COASTAL SHELTER LINE',
      targetBiomeId: 'coastal-scrub',
      activeBeatId: 'coastal-comparison',
      summary: 'Open To Shelter carries the coast-to-forest shelter line through Coastal Scrub.',
      nextDirection:
        'Next: travel to Coastal Scrub and start Open To Shelter with open bloom, then shore pine, then edge log.',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'done' },
        { id: 'coastal-comparison', status: 'active', title: 'Open To Shelter' },
      ],
    });
  });

  it('boots the Treeline Stone Shelter snapshot through station, map, and journal state', () => {
    const fakeWindow = bootSnapshot('treeline-stone-shelter');

    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'treeline',
      stationNote: {
        title: 'STONE SHELTER',
        text: 'Stone Shelter is next at Treeline Pass. Read bent cover, stone break, and lee life before the thaw edge.',
      },
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'treeline-stone-shelter',
      biomeId: 'treeline',
      title: 'Stone Shelter',
    });

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'treeline-stone-shelter',
      biomeId: 'treeline',
      title: 'Stone Shelter',
    });

    tapKey(fakeWindow, 'Escape');
    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Stone Shelter');

    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'STONE SHELTER',
      text: 'Stone Shelter is next at Treeline Pass. Read bent cover, stone break, and lee life before the thaw edge.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');
    expect(state.fieldStation?.selectedOutingSupportLabel).toBe('HAND LENS');
    expect(state.fieldStation?.subtitle).not.toContain('High Pass');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'treeline',
      activeBeatId: 'treeline-shelter',
      summary: 'Stone Shelter starts at Treeline Pass.',
      nextDirection:
        'Next: travel to Treeline Pass and read Stone Shelter through bent cover, stone break, and lee life.',
      launchCard: null,
      beats: [
        { id: 'treeline-shelter', status: 'active', title: 'Stone Shelter' },
        { id: 'tundra-short-season', status: 'upcoming', title: 'Thaw Window' },
        { id: 'tundra-survey', status: 'upcoming' },
      ],
    });
  });

  it('boots the Tundra Thaw Window snapshot through station, map, and journal state', () => {
    const fakeWindow = bootSnapshot('tundra-thaw-window');

    let state = readState(fakeWindow);
    expect(state.scene).toBe('biome');
    expect(state.biomeId).toBe('tundra');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'tundra',
      stationNote: {
        title: 'THAW WINDOW',
        text: 'Thaw Window is next in Tundra Reach. Follow first bloom, wet tuft, and brief fruit through the brief thaw.',
      },
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'tundra-short-season',
      biomeId: 'tundra',
      title: 'Thaw Window',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'tundra',
      activeBeatId: 'tundra-short-season',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      replayNote: {
        id: 'tundra-thaw-window',
        title: 'Thaw Window',
        text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      },
      launchCard: null,
    });

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'tundra-short-season',
      biomeId: 'tundra',
      title: 'Thaw Window',
    });

    tapKey(fakeWindow, 'Escape');
    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.currentLocationId).toBe('tundra');
    expect(state.worldMap?.focusedLocationId).toBe('tundra');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Thaw Window');

    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'THAW WINDOW',
      text: 'Thaw Window is next in Tundra Reach. Follow first bloom, wet tuft, and brief fruit through the brief thaw.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');
    expect(state.fieldStation?.selectedOutingSupportLabel).toBe('HAND LENS');
    expect(state.fieldStation?.subtitle).not.toContain('High Pass');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'tundra',
      activeBeatId: 'tundra-short-season',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      replayNote: {
        id: 'tundra-thaw-window',
        title: 'Thaw Window',
      },
      launchCard: null,
      beats: [
        { id: 'treeline-shelter', status: 'done', title: 'Stone Shelter Logged' },
        { id: 'tundra-short-season', status: 'active', title: 'Thaw Window' },
        { id: 'tundra-survey', status: 'upcoming' },
      ],
    });
  });

  it('boots the season-close snapshot into the High Pass routes shell', () => {
    const fakeWindow = bootSnapshot('season-close-return');

    openWorldMap(fakeWindow);
    let state = openFieldStationFromWorldMap(fakeWindow);

    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'next-season-open',
      nextBiomeId: 'treeline',
    });
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'NEXT FIELD SEASON',
    });
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.subtitle).toBe('High Pass starts at Treeline Pass.');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'Root Hollow now leads to High Pass.',
    });
    expect(state.fieldStation?.atlas?.note).toBe('Filed season: High Pass from Treeline Pass.');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
        summary: 'Treeline Pass carries the season toward High Pass.',
      },
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
  });

  it('boots the active High Pass snapshot into journal, map, and route-board targets', () => {
    const fakeWindow = bootSnapshot('high-pass-active');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
      },
    });

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      biomeId: 'treeline',
    });

    tapKey(fakeWindow, 'Escape');
    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.currentLocationId).toBe('treeline');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Rimed Pass');
  });

  it('boots the High Pass ready-to-file snapshot into station filing state', () => {
    const fakeWindow = bootSnapshot('high-pass-ready-to-file');
    const state = readState(fakeWindow);

    expect(state.activeFieldRequest).toMatchObject({
      id: 'treeline-high-pass',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
      },
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: null,
      nextDirection: 'Next: return to the field station and file the High Pass note.',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NOTE',
        summary: 'High Pass is ready to file from Treeline Pass.',
      },
    });
  });

  it('boots the filed High Pass snapshot into settled station and journal state', () => {
    const fakeWindow = bootSnapshot('high-pass-filed');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.subtitle).toBe('High Pass filed from Treeline Pass.');
    expect(state.fieldStation?.backdropAccent).toMatchObject({
      hasLeftBrace: true,
      hasRightBrace: true,
      hasCenterTie: true,
      hasLateSeasonLintel: true,
      hasHomecomingFrameAccent: false,
      homecomingMilestoneRequestId: null,
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'High Pass filed; Source to Shore starts above the shelter line.',
    });
    expect(state.fieldStation?.atlas?.note).toBe('Beta: start Source Shelter at Treeline Pass.');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      nextDirection: 'Next: travel to Treeline Pass and log rime source, lee watch, and talus hold.',
      complete: true,
      notebookReady: null,
      replayNote: null,
      launchCard: {
        title: 'SOURCE SHELTER',
        progressLabel: 'BETA',
        summary: 'Treeline Pass starts the Source to Shore beta thread.',
      },
    });

    state = openWorldMap(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Rime Source');

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
  });

  it('keeps filed High Pass settled when route-marker remains selected', () => {
    const snapshot = buildDebugSaveSnapshot('high-pass-filed');
    snapshot.save.selectedOutingSupportId = 'route-marker';
    const fakeWindow = bootSave(snapshot.save);

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('route-marker');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      nextDirection: 'Next: travel to Treeline Pass and log rime source, lee watch, and talus hold.',
      complete: true,
      notebookReady: null,
      replayNote: null,
      launchCard: {
        title: 'SOURCE SHELTER',
        progressLabel: 'BETA',
        summary: 'Treeline Pass starts the Source to Shore beta thread.',
      },
    });

    state = openWorldMap(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
    expect(state.worldMap?.routeMarkerLocationId).toBe('treeline');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Rime Source');

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });

    tapKey(fakeWindow, 'Escape');
    state = openFieldStationFromWorldMap(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      title: 'SOURCE SHELTER',
      statusLabel: 'BETA',
      detailLabel: 'STARTS',
      startText: 'Treeline Pass to first shelter',
      note: 'Read high rime, lee shelter, and talus hold.',
      noticeText: null,
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-source-shelter',
      title: 'Rime Source',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'EXPEDITION LOGGED',
      text: 'Treeline Pass starts the Source to Shore beta thread. Start: Treeline Pass to first shelter.',
    });
  });

  it('boots filed Source Shelter into the downstream Forest Release map focus', () => {
    const fakeWindow = bootSnapshot('source-to-shore-filed');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'source-to-shore-forest-release',
      title: 'Forest Release',
      progressLabel: 'Go To Forest Trail',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'forest',
      nextDirection: 'Next: travel to Forest Trail and log seep hold, root filter, and cool release.',
      launchCard: {
        title: 'FOREST RELEASE',
        progressLabel: 'BETA',
        summary: 'Forest Trail carries Source to Shore downstream.',
      },
    });

    state = openWorldMap(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Forest Release');

    state = openJournal(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'source-to-shore-forest-release',
      title: 'Forest Release',
    });
  });
});
