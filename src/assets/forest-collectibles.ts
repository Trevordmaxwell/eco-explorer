import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const forestCollectibleSprites: SpriteSource[] = [
  {
    id: 'fir-cone',
    palette: {
      a: masterPalette.seedTan,
      b: masterPalette.seedDark,
      c: masterPalette.ink,
    },
    frames: [[
      '..a...',
      '.abba.',
      '.abbba',
      '..bba.',
      '..aa..',
      '...c..',
    ]],
  },
];
