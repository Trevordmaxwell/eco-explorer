import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const treelineTileSprites: SpriteSource[] = [
  {
    id: 'treeline-top',
    palette: {
      a: masterPalette.alpineMoss,
      b: masterPalette.alpineStoneLight,
      c: masterPalette.alpineMossDark,
      d: masterPalette.alpineStoneMid,
    },
    frames: [[
      'aacaaaca',
      'abbdabda',
      'aaaacaaa',
      'abaaaaab',
      'baaadaba',
      'aaaabaaa',
      'aaaddaaa',
      'dddddddd',
    ]],
  },
  {
    id: 'treeline-fill',
    palette: {
      a: masterPalette.alpineStoneMid,
      b: masterPalette.alpineStoneDark,
      c: '#515855',
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
    id: 'granite-platform',
    palette: {
      a: masterPalette.alpineStoneLight,
      b: masterPalette.alpineStoneDark,
      c: '#eceee8',
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
