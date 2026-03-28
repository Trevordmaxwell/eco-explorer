import type { InspectableEntry, SaveSettings, SaveState } from './types';
import { createRandomSeed } from './random';

const STORAGE_KEY = 'eco-explorer-save-v1';
type PersistedSaveState = Partial<Omit<SaveState, 'settings'>> & { settings?: Partial<SaveSettings> };

export function createDefaultSettings(overrides: Partial<SaveSettings> = {}): SaveSettings {
  return {
    fullscreen: overrides.fullscreen ?? false,
    showInspectHints: overrides.showInspectHints ?? true,
  };
}

export function createNewSaveState(seed = createRandomSeed()): SaveState {
  return {
    worldSeed: seed,
    biomeVisits: {},
    discoveredEntries: {},
    settings: createDefaultSettings(),
    lastBiomeId: 'beach',
  };
}

export function normalizeSaveState(
  parsed: PersistedSaveState,
): SaveState {
  return {
    worldSeed: parsed.worldSeed ?? createRandomSeed(),
    biomeVisits: parsed.biomeVisits ?? {},
    discoveredEntries: parsed.discoveredEntries ?? {},
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
  const nextVisit = (save.biomeVisits[biomeId] ?? 0) + 1;
  save.biomeVisits[biomeId] = nextVisit;
  save.lastBiomeId = biomeId;
  return nextVisit;
}

export function resetSaveProgress(save: SaveState): void {
  const preservedSettings = { ...save.settings };
  const fresh = createNewSaveState();

  save.worldSeed = fresh.worldSeed;
  save.biomeVisits = fresh.biomeVisits;
  save.discoveredEntries = fresh.discoveredEntries;
  save.lastBiomeId = fresh.lastBiomeId;
  save.settings = preservedSettings;
}

export function recordDiscovery(
  save: SaveState,
  entry: InspectableEntry,
  biomeId: string,
): boolean {
  if (save.discoveredEntries[entry.id]) {
    return false;
  }

  save.discoveredEntries[entry.id] = {
    entryId: entry.id,
    discoveredAt: new Date().toISOString(),
    biomeId,
  };

  return true;
}

export function getDiscoveredEntryIds(save: SaveState): string[] {
  return Object.keys(save.discoveredEntries);
}
