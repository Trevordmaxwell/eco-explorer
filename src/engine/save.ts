import type {
  InspectableEntry,
  JournalEntryState,
  NurseryExtraId,
  NurseryProjectSlotsState,
  NurseryProjectState,
  NurseryResourceLedger,
  SaveSettings,
  SaveState,
} from './types';
import { createRandomSeed } from './random';
import { normalizeSketchbookPages } from './sketchbook';

const STORAGE_KEY = 'eco-explorer-save-v1';
const CURRENT_WORLD_STATE_VERSION = 2;
type PersistedJournalEntryState = Partial<JournalEntryState> & { biomeId?: string };
type PersistedSaveState = Partial<Omit<SaveState, 'settings' | 'discoveredEntries'>> & {
  discoveredEntries?: Record<string, PersistedJournalEntryState>;
  settings?: Partial<SaveSettings>;
};
const LEGACY_ENTRY_ID_MAP: Record<string, string> = {
  'coquina-shell': 'native-littleneck-shell',
  'auger-shell': 'razor-clam-shell',
  'ghost-crab': 'pacific-sand-crab',
  pickleweed: 'sand-verbena',
};

function normalizeEntryBiomeIds(entryState?: PersistedJournalEntryState): string[] {
  const biomeIds = [
    ...(entryState?.biomeIds ?? []),
    ...(entryState?.biomeId ? [entryState.biomeId] : []),
  ].filter((biomeId): biomeId is string => Boolean(biomeId));

  const uniqueBiomeIds = Array.from(new Set(biomeIds));
  return uniqueBiomeIds.length ? uniqueBiomeIds : ['beach'];
}

function mergeJournalEntryState(
  existing: JournalEntryState,
  incoming: JournalEntryState,
): JournalEntryState {
  return {
    entryId: existing.entryId,
    discoveredAt:
      existing.discoveredAt <= incoming.discoveredAt ? existing.discoveredAt : incoming.discoveredAt,
    biomeIds: Array.from(new Set([...existing.biomeIds, ...incoming.biomeIds])),
  };
}

function migrateDiscoveredEntries(
  discoveredEntries: PersistedSaveState['discoveredEntries'],
): SaveState['discoveredEntries'] {
  const migrated: SaveState['discoveredEntries'] = {};

  for (const [key, entryState] of Object.entries(discoveredEntries ?? {})) {
    const originalEntryId = entryState?.entryId ?? key;
    const nextEntryId = LEGACY_ENTRY_ID_MAP[originalEntryId] ?? originalEntryId;

    const nextEntryState: JournalEntryState = {
      entryId: nextEntryId,
      discoveredAt: entryState?.discoveredAt ?? new Date(0).toISOString(),
      biomeIds: normalizeEntryBiomeIds(entryState),
    };

    migrated[nextEntryId] = migrated[nextEntryId]
      ? mergeJournalEntryState(migrated[nextEntryId], nextEntryState)
      : nextEntryState;
  }

  return migrated;
}

function createEmptyNurseryResources(): NurseryResourceLedger {
  return {
    litter: 0,
    'seed-stock': 0,
    cuttings: 0,
    compost: 0,
  };
}

function normalizeNurseryResources(
  resources: PersistedSaveState['nurseryResources'],
): NurseryResourceLedger {
  const empty = createEmptyNurseryResources();
  if (!resources || typeof resources !== 'object') {
    return empty;
  }

  return {
    litter:
      typeof resources.litter === 'number' && Number.isFinite(resources.litter)
        ? Math.max(0, Math.floor(resources.litter))
        : 0,
    'seed-stock':
      typeof resources['seed-stock'] === 'number' && Number.isFinite(resources['seed-stock'])
        ? Math.max(0, Math.floor(resources['seed-stock']))
        : 0,
    cuttings:
      typeof resources.cuttings === 'number' && Number.isFinite(resources.cuttings)
        ? Math.max(0, Math.floor(resources.cuttings))
        : 0,
    compost:
      typeof resources.compost === 'number' && Number.isFinite(resources.compost)
        ? Math.max(0, Math.floor(resources.compost))
        : 0,
  };
}

function normalizeNurseryProjectState(value: unknown): NurseryProjectState | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<NurseryProjectState>;
  if (typeof candidate.projectId !== 'string' || typeof candidate.stage !== 'string') {
    return null;
  }

  if (!['stocked', 'rooting', 'growing', 'mature'].includes(candidate.stage)) {
    return null;
  }

  return {
    projectId: candidate.projectId,
    stage: candidate.stage,
  };
}

function normalizeNurseryProjects(
  projects: PersistedSaveState['nurseryProjects'],
): NurseryProjectSlotsState {
  if (!projects || typeof projects !== 'object') {
    return {
      teachingBed: null,
    };
  }

  return {
    teachingBed: normalizeNurseryProjectState(projects.teachingBed),
  };
}

function normalizeNurseryExtraIds(value: PersistedSaveState['nurseryUnlockedExtraIds']): NurseryExtraId[] {
  return Array.isArray(value)
    ? value.filter(
        (entry): entry is NurseryExtraId => entry === 'log-pile' || entry === 'pollinator-patch',
      )
    : [];
}

export function createDefaultSettings(overrides: Partial<SaveSettings> = {}): SaveSettings {
  return {
    fullscreen: overrides.fullscreen ?? false,
    showInspectHints: overrides.showInspectHints ?? true,
    soundEnabled: overrides.soundEnabled ?? true,
  };
}

export function createNewSaveState(seed = createRandomSeed()): SaveState {
  return {
    worldSeed: seed,
    worldStateVersion: CURRENT_WORLD_STATE_VERSION,
    worldStep: 1,
    biomeVisits: {},
    discoveredEntries: {},
    sketchbookPages: {},
    completedFieldRequestIds: [],
    fieldCredits: 0,
    claimedFieldCreditIds: [],
    purchasedUpgradeIds: [],
    nurseryResources: createEmptyNurseryResources(),
    nurseryProjects: {
      teachingBed: null,
    },
    nurseryUnlockedExtraIds: [],
    nurseryClaimedRewardIds: [],
    nurseryLastProcessedWorldStep: 1,
    settings: createDefaultSettings(),
    lastBiomeId: 'beach',
  };
}

function normalizeWorldStep(parsed: PersistedSaveState): Pick<SaveState, 'worldStateVersion' | 'worldStep'> {
  const parsedWorldStep =
    typeof parsed.worldStep === 'number' && Number.isFinite(parsed.worldStep)
      ? Math.max(0, Math.floor(parsed.worldStep))
      : null;

  if (parsed.worldStateVersion === CURRENT_WORLD_STATE_VERSION) {
    return {
      worldStateVersion: CURRENT_WORLD_STATE_VERSION,
      worldStep: parsedWorldStep ?? 1,
    };
  }

  return {
    worldStateVersion: CURRENT_WORLD_STATE_VERSION,
    worldStep: parsedWorldStep === null ? 1 : parsedWorldStep + 1,
  };
}

export function normalizeSaveState(
  parsed: PersistedSaveState,
): SaveState {
  const worldState = normalizeWorldStep(parsed);

  return {
    worldSeed: parsed.worldSeed ?? createRandomSeed(),
    worldStateVersion: worldState.worldStateVersion,
    worldStep: worldState.worldStep,
    biomeVisits: parsed.biomeVisits ?? {},
    discoveredEntries: migrateDiscoveredEntries(parsed.discoveredEntries),
    sketchbookPages: normalizeSketchbookPages(parsed.sketchbookPages),
    completedFieldRequestIds: Array.isArray(parsed.completedFieldRequestIds)
      ? parsed.completedFieldRequestIds.filter((value): value is string => typeof value === 'string')
      : [],
    fieldCredits:
      typeof parsed.fieldCredits === 'number' && Number.isFinite(parsed.fieldCredits)
        ? Math.max(0, Math.floor(parsed.fieldCredits))
        : 0,
    claimedFieldCreditIds: Array.isArray(parsed.claimedFieldCreditIds)
      ? parsed.claimedFieldCreditIds.filter((value): value is string => typeof value === 'string')
      : [],
    purchasedUpgradeIds: Array.isArray(parsed.purchasedUpgradeIds)
      ? parsed.purchasedUpgradeIds.filter((value): value is string => typeof value === 'string')
      : [],
    nurseryResources: normalizeNurseryResources(parsed.nurseryResources),
    nurseryProjects: normalizeNurseryProjects(parsed.nurseryProjects),
    nurseryUnlockedExtraIds: normalizeNurseryExtraIds(parsed.nurseryUnlockedExtraIds),
    nurseryClaimedRewardIds: Array.isArray(parsed.nurseryClaimedRewardIds)
      ? parsed.nurseryClaimedRewardIds.filter((value): value is string => typeof value === 'string')
      : [],
    nurseryLastProcessedWorldStep:
      typeof parsed.nurseryLastProcessedWorldStep === 'number' &&
      Number.isFinite(parsed.nurseryLastProcessedWorldStep)
        ? Math.max(0, Math.floor(parsed.nurseryLastProcessedWorldStep))
        : worldState.worldStep,
    settings: createDefaultSettings(parsed.settings),
    lastBiomeId: parsed.lastBiomeId ?? 'beach',
  };
}

export function loadOrCreateSave(): SaveState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createNewSaveState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = createNewSaveState();
    persistSave(fresh);
    return fresh;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedSaveState;
    const save = normalizeSaveState(parsed);
    persistSave(save);
    return save;
  } catch {
    const fresh = createNewSaveState();
    persistSave(fresh);
    return fresh;
  }
}

export function persistSave(save: SaveState): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

export function incrementBiomeVisit(save: SaveState, biomeId: string): number {
  if (save.lastBiomeId !== biomeId) {
    save.worldStep += 1;
  }
  const nextVisit = (save.biomeVisits[biomeId] ?? 0) + 1;
  save.biomeVisits[biomeId] = nextVisit;
  save.lastBiomeId = biomeId;
  return nextVisit;
}

export function resetSaveProgress(save: SaveState): void {
  const preservedSettings = { ...save.settings };
  const fresh = createNewSaveState();

  save.worldSeed = fresh.worldSeed;
  save.worldStep = fresh.worldStep;
  save.biomeVisits = fresh.biomeVisits;
  save.discoveredEntries = fresh.discoveredEntries;
  save.sketchbookPages = fresh.sketchbookPages;
  save.completedFieldRequestIds = fresh.completedFieldRequestIds;
  save.fieldCredits = fresh.fieldCredits;
  save.claimedFieldCreditIds = fresh.claimedFieldCreditIds;
  save.purchasedUpgradeIds = fresh.purchasedUpgradeIds;
  save.nurseryResources = fresh.nurseryResources;
  save.nurseryProjects = fresh.nurseryProjects;
  save.nurseryUnlockedExtraIds = fresh.nurseryUnlockedExtraIds;
  save.nurseryClaimedRewardIds = fresh.nurseryClaimedRewardIds;
  save.nurseryLastProcessedWorldStep = fresh.nurseryLastProcessedWorldStep;
  save.lastBiomeId = fresh.lastBiomeId;
  save.settings = preservedSettings;
}

export function recordDiscovery(
  save: SaveState,
  entry: InspectableEntry,
  biomeId: string,
): boolean {
  const existing = save.discoveredEntries[entry.id];
  if (existing) {
    if (!existing.biomeIds.includes(biomeId)) {
      existing.biomeIds = [...existing.biomeIds, biomeId];
    }
    return false;
  }

  save.discoveredEntries[entry.id] = {
    entryId: entry.id,
    discoveredAt: new Date().toISOString(),
    biomeIds: [biomeId],
  };

  return true;
}

export function getDiscoveredEntryIds(save: SaveState): string[] {
  return Object.keys(save.discoveredEntries);
}

export function recordCompletedFieldRequest(save: SaveState, requestId: string): boolean {
  if (save.completedFieldRequestIds.includes(requestId)) {
    return false;
  }

  save.completedFieldRequestIds = [...save.completedFieldRequestIds, requestId];
  return true;
}
