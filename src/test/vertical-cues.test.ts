import { describe, expect, it } from 'vitest';
import { forestBiome } from '../content/biomes/forest';
import { resolveVisibleVerticalCues } from '../engine/vertical-cues';

describe('resolveVisibleVerticalCues', () => {
  it('shows only zone-matching cues inside the current viewport', () => {
    const caveCueIds = resolveVisibleVerticalCues(
      forestBiome,
      'stone-basin',
      { x: 300, y: 80, w: 256, h: 160 },
    ).map((cue) => cue.id);
    const canopyCueIds = resolveVisibleVerticalCues(
      forestBiome,
      'old-growth-pocket',
      { x: 600, y: 0, w: 256, h: 160 },
    ).map((cue) => cue.id);

    expect(caveCueIds).toEqual(['stone-basin-return-light']);
    expect(canopyCueIds).toEqual(['old-wood-hinge-light', 'old-growth-inner-rest-light']);
  });

  it('hides cues when the zone does not match or the cue is off-screen', () => {
    expect(
      resolveVisibleVerticalCues(
        forestBiome,
        'trailhead',
        { x: 0, y: 0, w: 256, h: 160 },
      ),
    ).toEqual([]);
    expect(
      resolveVisibleVerticalCues(
        forestBiome,
        'stone-basin',
        { x: 0, y: 0, w: 256, h: 160 },
      ),
    ).toEqual([]);
  });
});
