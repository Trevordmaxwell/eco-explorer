import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const forestAmbientSprites: SpriteSource[] = [
  {
    id: 'root-curtain',
    palette: {
      a: masterPalette.barkDark,
      b: masterPalette.barkLight,
      c: masterPalette.mossDark,
      d: masterPalette.soilDark,
    },
    frames: [[
      '..a..a..a...',
      '..ab.ab.ab..',
      '..ab.ab.ab..',
      '..ab.ab.ab..',
      '..ab.ab.ab..',
      '...bcbcb....',
      '...b.b.b....',
      '...d.d.d....',
      '............',
      '............',
    ]],
  },
  {
    id: 'woodpecker-cavity',
    palette: {
      a: masterPalette.barkLight,
      b: masterPalette.barkDark,
      c: masterPalette.soilDark,
      d: masterPalette.ink,
    },
    frames: [[
      '............',
      '...abba.....',
      '..abccba....',
      '.abccddba...',
      '.abccddba...',
      '..abccba....',
      '...abba.....',
      '............',
    ]],
  },
  {
    id: 'seep-stone',
    palette: {
      a: masterPalette.alpineStoneLight,
      b: masterPalette.rockDark,
      c: masterPalette.mist,
      d: masterPalette.mossDark,
    },
    frames: [[
      '..............',
      '....aaac......',
      '..aaabbbaa....',
      '.abbbdbbbba...',
      '.abbbbdbbba...',
      '..abbbbbba....',
    ]],
  },
  {
    id: 'seep-moss-mat',
    palette: {
      a: masterPalette.mossDark,
      b: masterPalette.mossLight,
      c: masterPalette.lichenPale,
      d: masterPalette.alpineStoneLight,
    },
    frames: [[
      '..............',
      '....abcc......',
      '..aabbccaa....',
      '.abbccbbbaa...',
      '.abbbddbcca...',
      '..abbbccba....',
    ]],
  },
  {
    id: 'canopy-moss-bed',
    palette: {
      a: masterPalette.mossDark,
      b: masterPalette.mossLight,
      c: masterPalette.lichenPale,
      d: masterPalette.barkLight,
    },
    frames: [[
      '................',
      '.....aaabcc.....',
      '...aaabbbbcc....',
      '..abbbbbbbbcc...',
      '..abbbbabbbbcc..',
      '...abbbbbbbbdd..',
      '....aaabbbbddd..',
      '......ddddddd...',
    ]],
  },
  {
    id: 'banana-slug',
    palette: {
      a: masterPalette.slugGold,
      b: masterPalette.slugBrown,
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbbb..',
        'aabbbbc.',
        '.a..bb..',
        '..c.....',
      ],
      [
        '........',
        '..aaaa..',
        '.abbbb..',
        'aabbbbc.',
        '..bb..a.',
        '.....c..',
      ],
    ],
  },
  {
    id: 'ensatina',
    palette: {
      a: '#9f5e49',
      b: '#d9b59a',
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbbba.',
        '.abbccaa',
        '..b..c..',
        '.c....c.',
      ],
      [
        '........',
        '..aaaa..',
        '.abbbba.',
        '.abbccaa',
        '.c..b...',
        '...c...c',
      ],
    ],
  },
  {
    id: 'steller-jay',
    palette: {
      a: '#4f6fbc',
      b: '#2b3d69',
      c: masterPalette.cloud,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '...b.b..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '..d.b...',
        '...d...d',
      ],
    ],
  },
  {
    id: 'pileated-woodpecker',
    palette: {
      a: '#d14c3e',
      b: masterPalette.ink,
      c: masterPalette.cloud,
      d: masterPalette.barkLight,
    },
    frames: [
      [
        '....aa..',
        '...abbd.',
        '..abbbba',
        '..bbcc..',
        '...b.d..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abbd.',
        '..abbbba',
        '..bbcc..',
        '..d.b...',
        '...d...d',
      ],
    ],
  },
];
