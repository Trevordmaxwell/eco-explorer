import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const coastalAmbientSprites: SpriteSource[] = [
  {
    id: 'deer-mouse',
    palette: {
      a: '#9e7756',
      b: '#e9d7b3',
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '...aaa..',
        '..abbbca',
        '..abbbb.',
        '.a....a.',
        '..c..c..',
      ],
      [
        '........',
        '...aaa..',
        '..abbbca',
        '..abbbb.',
        '..a..a..',
        '.c....c.',
      ],
    ],
  },
  {
    id: 'song-sparrow',
    palette: {
      a: '#b48a62',
      b: '#5b4330',
      c: '#f1e5c5',
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
    id: 'nurse-log',
    palette: {
      a: '#8f6e4d',
      b: '#5d4632',
      c: masterPalette.scrubSageLight,
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
