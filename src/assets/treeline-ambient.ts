import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const treelineAmbientSprites: SpriteSource[] = [
  {
    id: 'rock-ptarmigan',
    palette: {
      a: masterPalette.ptarmiganBrown,
      b: masterPalette.cloud,
      c: masterPalette.alpineStoneDark,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '...c.c..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '..d.c...',
        '...d...d',
      ],
    ],
  },
  {
    id: 'ermine',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.ptarmiganBrown,
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbbca.',
        'aabbbb..',
        '.a....a.',
        '..c..c..',
      ],
      [
        '........',
        '..aaaa..',
        '.abbbca.',
        'aabbbb..',
        '..a..a..',
        '.c....c.',
      ],
    ],
  },
  {
    id: 'krummholz-spruce',
    palette: {
      a: masterPalette.hemlockDark,
      b: masterPalette.hemlockLight,
      c: masterPalette.barkLight,
    },
    frames: [[
      '..............',
      '....aa........',
      '..aabbaa......',
      '.abbbbbaa.....',
      '..aacccaa.....',
      '.ccccc.cccc...',
    ]],
  },
  {
    id: 'frost-heave-boulder',
    palette: {
      a: masterPalette.alpineStoneLight,
      b: masterPalette.alpineStoneMid,
      c: masterPalette.alpineStoneDark,
    },
    frames: [[
      '..............',
      '....aaaa......',
      '..aabbbbaa....',
      '.aabccccbba...',
      '..bbccccbb....',
      '...bbbbbb.....',
    ]],
  },
  {
    id: 'hoary-marmot',
    palette: {
      a: '#9a8672',
      b: '#d5c3ad',
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbbca.',
        'aabbbb..',
        '.a....a.',
        '..c..c..',
      ],
      [
        '........',
        '..aaaa..',
        '.abbbca.',
        'aabbbb..',
        '..a..a..',
        '.c....c.',
      ],
    ],
  },
];
