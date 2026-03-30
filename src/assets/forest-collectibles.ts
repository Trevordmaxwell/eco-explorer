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
  {
    id: 'red-huckleberry',
    palette: {
      a: masterPalette.fernDark,
      b: masterPalette.fernLight,
      c: masterPalette.coral,
      d: masterPalette.shellCream,
      e: masterPalette.barkLight,
    },
    frames: [[
      '...cc...',
      '..cddc..',
      '.bcddcb.',
      '..abba..',
      '.abbba..',
      '.bbabb..',
      '..abbb..',
      '.abbba..',
      '...e....',
      '..eee...',
      '.eeeee..',
      '........',
    ]],
  },
];
