import { describe, expect, it } from 'vitest';

import { createAudioEngine, resolveAmbientProfileId } from '../engine/audio';

describe('audio helpers', () => {
  it('maps live biomes onto compact ambience profiles', () => {
    expect(resolveAmbientProfileId('beach')).toBe('shore');
    expect(resolveAmbientProfileId('coastal-scrub')).toBe('scrub');
    expect(resolveAmbientProfileId('forest')).toBe('forest');
    expect(resolveAmbientProfileId('treeline')).toBe('treeline');
    expect(resolveAmbientProfileId('tundra')).toBe('tundra');
    expect(resolveAmbientProfileId('unknown')).toBeNull();
  });

  it('stays no-op safe when audio contexts are unavailable', async () => {
    const engine = createAudioEngine(false);

    await engine.arm();
    engine.setAmbientProfile('shore');
    engine.playUiCue('confirm');

    expect(engine.getDebugState()).toEqual({
      supported: false,
      armed: true,
      enabled: false,
      ambientProfileId: 'shore',
    });
  });
});
