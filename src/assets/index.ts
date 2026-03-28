import type { SpriteSource } from '../engine/sprites';
import { ambientSprites } from './ambient';
import { collectibleSprites } from './collectibles';
import { forestAmbientSprites } from './forest-ambient';
import { forestCollectibleSprites } from './forest-collectibles';
import { forestFloraSprites } from './forest-flora';
import { floraSprites } from './flora';
import { playerSprites } from './player';
import { tileSprites } from './tiles';
import { tundraAmbientSprites } from './tundra-ambient';
import { tundraCollectibleSprites } from './tundra-collectibles';
import { tundraFloraSprites } from './tundra-flora';
import { worldMapSprites } from './world-map';

export const spriteSources: SpriteSource[] = [
  ...playerSprites,
  ...tileSprites,
  ...floraSprites,
  ...forestFloraSprites,
  ...tundraFloraSprites,
  ...collectibleSprites,
  ...forestCollectibleSprites,
  ...tundraCollectibleSprites,
  ...ambientSprites,
  ...forestAmbientSprites,
  ...tundraAmbientSprites,
  ...worldMapSprites,
];
