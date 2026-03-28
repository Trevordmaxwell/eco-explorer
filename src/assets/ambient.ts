import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const ambientSprites: SpriteSource[] = [
  {
    id: 'ghost-crab',
    palette: {
      a: masterPalette.crabRed,
      b: masterPalette.shellCream,
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbcca.',
        'aabcccca',
        '..a..a..',
        '.a....a.',
      ],
      [
        '........',
        '..aaaa..',
        '.accbba.',
        'aaccccca',
        '.a....a.',
        '..a..a..',
      ],
    ],
  },
  {
    id: 'sanderling',
    palette: {
      a: masterPalette.birdCream,
      b: masterPalette.birdBrown,
      c: masterPalette.ink,
      d: masterPalette.sandDark,
    },
    frames: [
      [
        '....aa..',
        '...abca.',
        '..abbbaa',
        '..abb...',
        '...dd...',
        '..d..d..',
      ],
      [
        '....aa..',
        '...abca.',
        '..abbbba',
        '..abb...',
        '..d.d...',
        '...d.d..',
      ],
    ],
  },
  {
    id: 'driftwood-log',
    palette: {
      a: masterPalette.woodLight,
      b: masterPalette.woodDark,
      c: masterPalette.cloud,
    },
    frames: [[
      '..............',
      '..aaaabbaaa...',
      '.aabbbbbbbba..',
      '.abbcbbbcbba..',
      '..bbbbbbbb....',
      '...abbaaa.....',
    ]],
  },
];
