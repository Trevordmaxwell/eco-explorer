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
];
