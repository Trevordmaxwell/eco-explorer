export type Facing = 'left' | 'right';
export type OverlayMode = 'title' | 'playing' | 'journal' | 'menu';
export type InspectableCategory = 'shell' | 'plant' | 'animal' | 'landmark';
export type OrganismCategory = Exclude<InspectableCategory, 'landmark'>;
export type RefreshPolicy = 'stable' | 'visit';

export interface SaveSettings {
  fullscreen: boolean;
  showInspectHints: boolean;
}

export interface JournalEntryState {
  entryId: string;
  discoveredAt: string;
  biomeId: string;
}

export interface SaveState {
  worldSeed: string;
  biomeVisits: Record<string, number>;
  discoveredEntries: Record<string, JournalEntryState>;
  settings: SaveSettings;
  lastBiomeId: string;
}

interface InspectableEntryBase {
  id: string;
  commonName: string;
  category: InspectableCategory;
  shortFact: string;
  journalText: string;
  spriteId: string;
  collectible: boolean;
}

export interface OrganismInspectableEntry extends InspectableEntryBase {
  category: OrganismCategory;
  scientificName: string;
}

export interface LandmarkInspectableEntry extends InspectableEntryBase {
  category: 'landmark';
  subtitle: string;
  subtitleLabel?: string;
}

export type InspectableEntry = OrganismInspectableEntry | LandmarkInspectableEntry;

export interface WeightedSpawnEntry {
  entryId: string;
  weight: number;
}

export interface SpawnTable {
  id: string;
  zoneId: string;
  refreshPolicy: RefreshPolicy;
  minCount: number;
  maxCount: number;
  spacing: number;
  entries: WeightedSpawnEntry[];
}

export interface BiomeZone {
  id: string;
  label: string;
  start: number;
  end: number;
  surfaceBaseY: number;
  surfaceVariance: number;
}

export interface PlatformRule {
  id: string;
  zoneId: string;
  minCount: number;
  maxCount: number;
  minWidth: number;
  maxWidth: number;
  height: number;
  liftMin: number;
  liftMax: number;
  spriteId: string;
}

export interface TerrainRules {
  worldWidth: number;
  worldHeight: number;
  sampleStep: number;
  zones: BiomeZone[];
  platformRules: PlatformRule[];
}

export interface ParallaxLayer {
  id: string;
  speed: number;
  color: string;
  amplitude: number;
  baseY: number;
}

export interface AmbientRules {
  cloudCount: [number, number];
  sparkleCount: [number, number];
}

export interface BiomeDefinition {
  id: string;
  name: string;
  palette: Record<string, string>;
  tileSet: string[];
  parallaxLayers: ParallaxLayer[];
  terrainRules: TerrainRules;
  spawnTables: SpawnTable[];
  ambientRules: AmbientRules;
  entries: Record<string, InspectableEntry>;
  startPosition: { x: number; y: number };
}

export interface TerrainSample {
  x: number;
  y: number;
}

export interface Platform {
  id: string;
  spriteId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Sparkle {
  x: number;
  y: number;
  phase: number;
}

export interface Cloud {
  x: number;
  y: number;
  w: number;
}

export interface BiomeEntity {
  entityId: string;
  entryId: string;
  spriteId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  category: InspectableCategory;
  collectible: boolean;
  refreshPolicy: RefreshPolicy;
  removed: boolean;
}

export interface BiomeInstance {
  biomeId: string;
  visitCount: number;
  terrainSamples: TerrainSample[];
  platforms: Platform[];
  entities: BiomeEntity[];
  sparkles: Sparkle[];
  clouds: Cloud[];
  width: number;
  height: number;
}

export interface FactBubblePayload {
  entryId: string;
  title: string;
  detailLabel: string;
  detailText: string;
  fact: string;
  journalText: string;
  category: InspectableCategory;
  collectible: boolean;
  isNewEntry: boolean;
  x: number;
  y: number;
}

export interface GameApi {
  enterBiome: (biomeId: string) => void;
  inspectEntity: (entityId: string) => FactBubblePayload | null;
}
