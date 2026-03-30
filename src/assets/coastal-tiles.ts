import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const coastalTileSprites: SpriteSource[] = [
  {
    id: 'scrub-top',
    palette: {
      a: '#d8c48f',
      b: masterPalette.sandMid,
      c: masterPalette.scrubSageLight,
      d: masterPalette.scrubSageDark,
    },
    frames: [[
      'aacaaaca',
      'abbababa',
      'aaacaaad',
      'abaaaaab',
      'baaabaca',
      'aaadabaa',
      'aaaddaaa',
      'dddddddd',
    ]],
  },
  {
    id: 'scrub-fill',
    palette: {
      a: '#b79b67',
      b: '#836c48',
      c: '#5e4f3c',
    },
    frames: [[
      'abababab',
      'baaacaba',
      'ababbbaa',
      'aabbabab',
      'abccbaba',
      'baaabbab',
      'ababaaba',
      'aabbabba',
    ]],
  },
  {
    id: 'drift-platform',
    palette: {
      a: '#b3946d',
      b: '#785c42',
      c: '#d8d8cc',
    },
    frames: [[
      'cccccccc',
      'aabbaaba',
      'ababbaba',
      'bbabbabb',
      'ababbaba',
      'bbabbabb',
      'ababbaba',
      'bbbbbbbb',
    ]],
  },
];
