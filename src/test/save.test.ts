import { describe, expect, it } from 'vitest';
import {
  createDefaultSettings,
  createNewSaveState,
  normalizeSaveState,
  resetSaveProgress,
} from '../engine/save';

describe('save settings defaults', () => {
  it('starts with inspect hints enabled', () => {
    expect(createDefaultSettings()).toEqual({
      fullscreen: false,
      showInspectHints: true,
    });
  });

  it('migrates older saves by filling the new settings field safely', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      settings: {
        fullscreen: true,
      },
    });

    expect(migrated.worldSeed).toBe('legacy-seed');
    expect(migrated.settings).toEqual({
      fullscreen: true,
      showInspectHints: true,
    });
  });
});

describe('reset save progress', () => {
  it('clears discoveries and visits while preserving player settings', () => {
    const save = createNewSaveState('seed-before-reset');
    save.biomeVisits.beach = 3;
    save.discoveredEntries['coquina-shell'] = {
      entryId: 'coquina-shell',
      discoveredAt: '2026-03-27T19:00:00.000Z',
      biomeId: 'beach',
    };
    save.lastBiomeId = 'forest';
    save.settings.fullscreen = true;
    save.settings.showInspectHints = false;

    resetSaveProgress(save);

    expect(save.worldSeed).not.toBe('seed-before-reset');
    expect(save.biomeVisits).toEqual({});
    expect(save.discoveredEntries).toEqual({});
    expect(save.lastBiomeId).toBe('beach');
    expect(save.settings).toEqual({
      fullscreen: true,
      showInspectHints: false,
    });
  });
});
