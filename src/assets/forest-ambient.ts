import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const forestAmbientSprites: SpriteSource[] = [
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
