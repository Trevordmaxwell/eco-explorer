import { describe, expect, it } from 'vitest';

import { beachBiome, forestBiome } from '../content/biomes';
import { buildCloseLookPayload, supportsCloseLook } from '../engine/close-look';

describe('close-look helpers', () => {
  it('only supports the small allowlisted entry set', () => {
    expect(supportsCloseLook('moon-snail-shell')).toBe(true);
    expect(supportsCloseLook('fir-cone')).toBe(true);
    expect(supportsCloseLook('reindeer-lichen')).toBe(true);
    expect(supportsCloseLook('purple-saxifrage')).toBe(true);
    expect(supportsCloseLook('beach-grass')).toBe(false);
    expect(supportsCloseLook(null)).toBe(false);
  });

  it('builds a compact payload for supported entries only', () => {
    const shellPayload = buildCloseLookPayload(beachBiome.entries['moon-snail-shell']);
    expect(shellPayload).toMatchObject({
      entryId: 'moon-snail-shell',
      title: "Lewis' Moon Snail Shell",
      spriteId: 'moon-snail-shell',
    });
    expect(shellPayload?.callouts).toHaveLength(2);

    const unsupportedPayload = buildCloseLookPayload(beachBiome.entries['beach-grass']);
    expect(unsupportedPayload).toBeNull();

    const conePayload = buildCloseLookPayload(forestBiome.entries['fir-cone']);
    expect(conePayload?.callouts).toContain('cone scales');
  });
});
