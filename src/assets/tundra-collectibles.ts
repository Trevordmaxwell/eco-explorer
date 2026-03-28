import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const tundraCollectibleSprites: SpriteSource[] = [
  {
    id: 'cloudberry',
    palette: {
      a: masterPalette.berryOrange,
      b: masterPalette.seedTan,
      c: masterPalette.tundraGreen,
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
  {
    id: 'crowberry',
    palette: {
      a: masterPalette.berryBlack,
      b: '#5d5878',
      c: masterPalette.tundraGreen,
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
