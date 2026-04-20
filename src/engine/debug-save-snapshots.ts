import { createNewSaveState, SAVE_STORAGE_KEY } from './save';
import type { JournalEntryState, SaveState } from './types';

export const DEBUG_SAVE_SNAPSHOT_IDS = [
  'first-session',
  'forest-moisture-holders',
  'station-return',
  'front-half-open-to-shelter',
  'treeline-stone-shelter',
  'tundra-thaw-window',
  'season-close-return',
  'high-pass-active',
  'high-pass-ready-to-file',
  'high-pass-filed',
] as const;

export type DebugSaveSnapshotId = (typeof DEBUG_SAVE_SNAPSHOT_IDS)[number];

export interface DebugSaveSnapshot {
  id: DebugSaveSnapshotId;
  title: string;
  description: string;
  save: SaveState;
  localStorageKey: typeof SAVE_STORAGE_KEY;
  localStorageValue: string;
  pasteCommand: string;
}

interface DebugSaveSnapshotDefinition {
  title: string;
  description: string;
  buildSave: () => SaveState;
}

const FOREST_STATION_RETURN_REQUEST_IDS = [
  'forest-hidden-hollow',
  'forest-moisture-holders',
  'forest-survey-slice',
] as const;

const HIGH_PASS_PREREQUISITE_REQUEST_IDS = [
  ...FOREST_STATION_RETURN_REQUEST_IDS,
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
] as const;

const TREELINE_STONE_SHELTER_REQUEST_IDS = [
  ...FOREST_STATION_RETURN_REQUEST_IDS,
  'coastal-shelter-shift',
  'coastal-edge-moisture',
] as const;

const TUNDRA_THAW_WINDOW_REQUEST_IDS = [
  ...TREELINE_STONE_SHELTER_REQUEST_IDS,
  'treeline-stone-shelter',
] as const;

const HIGH_PASS_READY_EVIDENCE_SLOTS = [
  { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
  { slotId: 'lee-watch', entryId: 'hoary-marmot' },
  { slotId: 'rime-mark', entryId: 'moss-campion' },
  { slotId: 'talus-hold', entryId: 'talus-cushion-pocket' },
] as const;

const FOREST_SURVEY_DISCOVERY_IDS = [
  'banana-slug',
  'sword-fern',
  'redwood-sorrel',
  'fir-cone',
] as const;

function createSnapshotBase(seed: string, lastBiomeId: string): SaveState {
  const save = createNewSaveState(seed);
  save.lastBiomeId = lastBiomeId;
  return save;
}

function createDiscovery(entryId: string, index: number): JournalEntryState {
  return {
    entryId,
    discoveredAt: `2026-04-20T12:${String(index).padStart(2, '0')}:00.000Z`,
    biomeIds: ['forest'],
  };
}

function addForestSurveyDiscoveries(save: SaveState): void {
  FOREST_SURVEY_DISCOVERY_IDS.forEach((entryId, index) => {
    save.discoveredEntries[entryId] = createDiscovery(entryId, index);
  });
}

function createStationReturnSave(): SaveState {
  const save = createSnapshotBase('debug-snapshot-station-return', 'forest');
  save.completedFieldRequestIds = [...FOREST_STATION_RETURN_REQUEST_IDS];
  save.biomeVisits.forest = 1;
  addForestSurveyDiscoveries(save);
  return save;
}

function createForestMoistureHoldersSave(): SaveState {
  const save = createSnapshotBase('debug-snapshot-forest-moisture-holders', 'forest');
  save.completedFieldRequestIds = ['beach-shore-shelter', 'forest-hidden-hollow'];
  save.biomeVisits = {
    beach: 1,
    forest: 1,
  };
  return save;
}

function createFrontHalfOpenToShelterSave(): SaveState {
  const save = createStationReturnSave();
  save.worldSeed = 'debug-snapshot-front-half-open-to-shelter';
  save.purchasedUpgradeIds = ['trail-stride'];
  return save;
}

function createTreelineStoneShelterSave(): SaveState {
  const save = createSnapshotBase('debug-snapshot-treeline-stone-shelter', 'forest');
  save.completedFieldRequestIds = [...TREELINE_STONE_SHELTER_REQUEST_IDS];
  save.purchasedUpgradeIds = ['trail-stride'];
  save.biomeVisits = {
    beach: 1,
    forest: 2,
    'coastal-scrub': 1,
  };
  addForestSurveyDiscoveries(save);
  return save;
}

function createTundraThawWindowSave(): SaveState {
  const save = createSnapshotBase('debug-snapshot-tundra-thaw-window', 'tundra');
  save.completedFieldRequestIds = [...TUNDRA_THAW_WINDOW_REQUEST_IDS];
  save.purchasedUpgradeIds = ['trail-stride'];
  save.biomeVisits = {
    beach: 1,
    forest: 2,
    'coastal-scrub': 1,
    treeline: 1,
    tundra: 2,
  };
  save.worldStep = 4;
  save.nurseryLastProcessedWorldStep = 4;
  addForestSurveyDiscoveries(save);
  return save;
}

function createSeasonCloseReturnSave(): SaveState {
  const save = createSnapshotBase('debug-snapshot-season-close-return', 'forest');
  save.completedFieldRequestIds = [...HIGH_PASS_PREREQUISITE_REQUEST_IDS];
  save.purchasedUpgradeIds = ['trail-stride', 'route-marker'];
  save.biomeVisits = {
    beach: 1,
    forest: 3,
    'coastal-scrub': 2,
    treeline: 2,
    tundra: 2,
  };
  save.worldStep = 6;
  save.nurseryLastProcessedWorldStep = 6;
  save.seasonCloseReturnPending = true;
  addForestSurveyDiscoveries(save);
  return save;
}

function createHighPassActiveSave(): SaveState {
  const save = createSeasonCloseReturnSave();
  save.worldSeed = 'debug-snapshot-high-pass-active';
  save.lastBiomeId = 'treeline';
  save.seasonCloseReturnPending = false;
  return save;
}

function createHighPassReadyToFileSave(): SaveState {
  const save = createHighPassActiveSave();
  save.worldSeed = 'debug-snapshot-high-pass-ready-to-file';
  save.routeV2Progress = {
    requestId: 'treeline-high-pass',
    status: 'ready-to-synthesize',
    landmarkEntryIds: [],
    evidenceSlots: [...HIGH_PASS_READY_EVIDENCE_SLOTS],
  };
  return save;
}

function createHighPassFiledSave(): SaveState {
  const save = createHighPassActiveSave();
  save.worldSeed = 'debug-snapshot-high-pass-filed';
  save.completedFieldRequestIds = [...HIGH_PASS_PREREQUISITE_REQUEST_IDS, 'treeline-high-pass'];
  save.routeV2Progress = null;
  return save;
}

const DEBUG_SAVE_SNAPSHOT_DEFINITIONS: Record<DebugSaveSnapshotId, DebugSaveSnapshotDefinition> = {
  'first-session': {
    title: 'First Session',
    description: 'Fresh beach start with starter field-season guidance intact.',
    buildSave: () => createSnapshotBase('debug-snapshot-first-session', 'beach'),
  },
  'forest-moisture-holders': {
    title: 'Forest Moisture Holders',
    description: 'Hidden Hollow filed; station, map, and journal should keep Root Hollow current.',
    buildSave: createForestMoistureHoldersSave,
  },
  'station-return': {
    title: 'Station Return',
    description: 'Forest survey logged; field station should point back to Trail Stride.',
    buildSave: createStationReturnSave,
  },
  'front-half-open-to-shelter': {
    title: 'Front-Half Open To Shelter',
    description: 'Trail Stride owned; station and map should point to Coastal Scrub.',
    buildSave: createFrontHalfOpenToShelterSave,
  },
  'treeline-stone-shelter': {
    title: 'Treeline Stone Shelter',
    description: 'Coastal line logged; station, map, and journal should point to Stone Shelter in Treeline Pass.',
    buildSave: createTreelineStoneShelterSave,
  },
  'tundra-thaw-window': {
    title: 'Tundra Thaw Window',
    description: 'Stone Shelter logged; peak thaw keeps Thaw Window active in Tundra Reach.',
    buildSave: createTundraThawWindowSave,
  },
  'season-close-return': {
    title: 'Season Close Return',
    description: 'Season Threads logged with the calm return-to-station close beat pending.',
    buildSave: createSeasonCloseReturnSave,
  },
  'high-pass-active': {
    title: 'High Pass Active',
    description: 'Season close acknowledged; High Pass is the active next field-season route.',
    buildSave: createHighPassActiveSave,
  },
  'high-pass-ready-to-file': {
    title: 'High Pass Ready To File',
    description: 'All High Pass evidence slots are filled and the route note is ready to file.',
    buildSave: createHighPassReadyToFileSave,
  },
  'high-pass-filed': {
    title: 'High Pass Filed',
    description: 'High Pass is completed and route progress is settled with no active route note.',
    buildSave: createHighPassFiledSave,
  },
};

export function buildDebugSaveSnapshot(id: DebugSaveSnapshotId): DebugSaveSnapshot {
  const definition = DEBUG_SAVE_SNAPSHOT_DEFINITIONS[id];
  const save = definition.buildSave();
  const localStorageValue = JSON.stringify(save);

  return {
    id,
    title: definition.title,
    description: definition.description,
    save,
    localStorageKey: SAVE_STORAGE_KEY,
    localStorageValue,
    pasteCommand:
      `localStorage.setItem(${JSON.stringify(SAVE_STORAGE_KEY)}, ${JSON.stringify(localStorageValue)}); location.reload();`,
  };
}

export function buildDebugSaveSnapshots(): DebugSaveSnapshot[] {
  return DEBUG_SAVE_SNAPSHOT_IDS.map((id) => buildDebugSaveSnapshot(id));
}

export function getDebugSaveSnapshot(id: string): DebugSaveSnapshot | null {
  if (!DEBUG_SAVE_SNAPSHOT_IDS.includes(id as DebugSaveSnapshotId)) {
    return null;
  }

  return buildDebugSaveSnapshot(id as DebugSaveSnapshotId);
}

export function serializeDebugSaveSnapshots(): string {
  return JSON.stringify({
    localStorageKey: SAVE_STORAGE_KEY,
    snapshots: buildDebugSaveSnapshots(),
  });
}
