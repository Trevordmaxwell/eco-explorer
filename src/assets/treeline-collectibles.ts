import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const treelineCollectibleSprites: SpriteSource[] = [
  {
    id: 'bog-blueberry',
    palette: {
      a: masterPalette.berryBlue,
      b: '#8ea0f0',
      c: masterPalette.alpineMoss,
    },
    frames: [[
      '..aa..',
      '.abba.',
      '.abba.',
      '..aa..',
      '...c..',
      '..ccc.',
    ]],
  },
];
