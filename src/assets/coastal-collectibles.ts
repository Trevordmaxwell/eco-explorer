import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const coastalCollectibleSprites: SpriteSource[] = [
  {
    id: 'salmonberry',
    palette: {
      a: masterPalette.scrubSageDark,
      b: masterPalette.scrubSageLight,
      c: masterPalette.berryCoral,
      d: '#f2b08d',
      e: '#7a5740',
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
  {
    id: 'beach-strawberry',
    palette: {
      a: masterPalette.scrubSageDark,
      b: masterPalette.scrubSageLight,
      c: masterPalette.coral,
      d: masterPalette.shellCream,
      e: '#7a5740',
    },
    frames: [[
      '...cc...',
      '..cddc..',
      '.bcddcb.',
      '..abba..',
      '.abbba..',
      '..aba...',
      '.ababa..',
      '..aba...',
      '...e....',
      '..eee...',
      '.eeeee..',
      '........',
    ]],
  },
];
