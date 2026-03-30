import type { SpriteSource } from '../engine/sprites';
import { ambientSprites } from './ambient';
import { coastalAmbientSprites } from './coastal-ambient';
import { coastalCollectibleSprites } from './coastal-collectibles';
import { coastalFloraSprites } from './coastal-flora';
import { coastalTileSprites } from './coastal-tiles';
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
import { treelineAmbientSprites } from './treeline-ambient';
import { treelineCollectibleSprites } from './treeline-collectibles';
import { treelineFloraSprites } from './treeline-flora';
import { treelineTileSprites } from './treeline-tiles';
import { worldMapSprites } from './world-map';

export const spriteSources: SpriteSource[] = [
  ...playerSprites,
  ...tileSprites,
  ...coastalTileSprites,
  ...treelineTileSprites,
  ...floraSprites,
  ...coastalFloraSprites,
  ...forestFloraSprites,
  ...treelineFloraSprites,
  ...tundraFloraSprites,
  ...collectibleSprites,
  ...coastalCollectibleSprites,
  ...forestCollectibleSprites,
  ...treelineCollectibleSprites,
  ...tundraCollectibleSprites,
  ...ambientSprites,
  ...coastalAmbientSprites,
  ...forestAmbientSprites,
  ...treelineAmbientSprites,
  ...tundraAmbientSprites,
  ...worldMapSprites,
];
