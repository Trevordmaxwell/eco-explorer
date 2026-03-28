import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const collectibleSprites: SpriteSource[] = [
  {
    id: 'coquina-shell',
    palette: {
      a: masterPalette.shellCream,
      b: masterPalette.shellPink,
      c: masterPalette.ink,
    },
    frames: [[
      '..aa..',
      '.abb..',
      'abbbc.',
      '.abba.',
      '..aa..',
    ]],
  },
  {
    id: 'moon-snail-shell',
    palette: {
      a: masterPalette.shellCream,
      b: masterPalette.shellGold,
      c: masterPalette.shellPink,
    },
    frames: [[
      '..aa..',
      '.abca.',
      '.acba.',
      '..aa..',
      '...a..',
    ]],
  },
  {
    id: 'auger-shell',
    palette: {
      a: masterPalette.shellCream,
      b: masterPalette.shellPink,
      c: masterPalette.shellGold,
    },
    frames: [[
      '..a...',
      '.aba..',
      '.acba.',
      '..aba.',
      '...a..',
      '...a..',
    ]],
  },
];
