import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const collectibleSprites: SpriteSource[] = [
  {
    id: 'native-littleneck-shell',
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
    id: 'razor-clam-shell',
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
  {
    id: 'sand-dollar-test',
    palette: {
      a: masterPalette.shellCream,
      b: masterPalette.shellGold,
      c: masterPalette.sandMid,
    },
    frames: [[
      '..aaa..',
      '.ababa.',
      'abbbbba',
      '.abbba.',
      'abbbbba',
      '.ababa.',
      '..aca..',
    ]],
  },
];
