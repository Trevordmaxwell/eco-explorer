export type Facing = 'left' | 'right';
export type OverlayMode = 'title' | 'playing' | 'journal' | 'menu' | 'field-station' | 'close-look';
export type InspectableCategory = 'shell' | 'plant' | 'lichen' | 'animal' | 'landmark';
export type OrganismCategory = Exclude<InspectableCategory, 'landmark'>;
export type RefreshPolicy = 'stable' | 'visit';
export type DayPart = 'dawn' | 'day' | 'dusk';
export type WeatherProfile = 'clear' | 'marine-haze' | 'mist-drip' | 'ridge-wind' | 'light-flurry';
export type PhenologyPhase = 'early' | 'peak' | 'late';
export type PhenologyAccentStyle = 'bloom' | 'berry' | 'seed' | 'cone' | 'tuft' | 'frost';
export type HabitatProcessStyle = 'sand-drift' | 'moisture-hold' | 'frost-rime' | 'thaw-fringe';
export type DepthFeatureStyle = 'root-chamber' | 'stone-pocket' | 'canopy-pocket' | 'trunk-interior';
export type VerticalCueStyle = 'recovery-light' | 'canopy-opening';
export type ObservationPromptFamily = 'shelter' | 'timing' | 'neighbors' | 'comparison';
export type SketchbookSlotId = 'top-left' | 'top-right' | 'lower-center';
export type FieldStationView = 'season' | 'nursery';
export type FieldStationSeasonPage = 'routes' | 'expedition';
export type NurseryResourceKind = 'litter' | 'seed-stock' | 'cuttings' | 'compost';
export type NurserySourceMode = 'seed' | 'cutting';
export type NurseryRewardKind = 'beauty' | 'route-support' | 'utility';
export type NurseryGrowthStage = 'stocked' | 'rooting' | 'growing' | 'mature';
export type NurseryExtraId = 'log-pile' | 'pollinator-patch';
export type OutingSupportId = 'hand-lens' | 'note-tabs' | 'place-tab' | 'route-marker';
export type RouteV2ProgressStatus = 'gathering' | 'ready-to-synthesize';

export interface RouteV2EvidenceSlotProgress {
  slotId: string;
  entryId: string;
}

export interface RouteV2FieldRequestProgressState {
  requestId: string;
  status: RouteV2ProgressStatus;
  landmarkEntryIds: string[];
  evidenceSlots: RouteV2EvidenceSlotProgress[];
}

export interface ObservationPrompt {
  id: string;
  family: ObservationPromptFamily;
  text: string;
  source: 'seed' | 'ecosystem-note';
  evidenceKey: string;
}

export interface SaveSettings {
  fullscreen: boolean;
  showInspectHints: boolean;
  soundEnabled: boolean;
}

export interface JournalEntryState {
  entryId: string;
  discoveredAt: string;
  biomeIds: string[];
}

export interface SketchbookPageState {
  slots: Partial<Record<SketchbookSlotId, string>>;
}

export interface SaveState {
  worldSeed: string;
  worldStateVersion: number;
  worldStep: number;
  biomeVisits: Record<string, number>;
  discoveredEntries: Record<string, JournalEntryState>;
  sketchbookPages: Record<string, SketchbookPageState>;
  completedFieldRequestIds: string[];
  routeV2Progress: RouteV2FieldRequestProgressState | null;
  selectedOutingSupportId: OutingSupportId;
  fieldCredits: number;
  claimedFieldCreditIds: string[];
  purchasedUpgradeIds: string[];
  nurseryResources: NurseryResourceLedger;
  nurseryProjects: NurseryProjectSlotsState;
  nurseryUnlockedExtraIds: NurseryExtraId[];
  nurseryClaimedRewardIds: string[];
  nurseryLastProcessedWorldStep: number;
  settings: SaveSettings;
  lastBiomeId: string;
}

export interface NurseryResourceLedger {
  litter: number;
  'seed-stock': number;
  cuttings: number;
  compost: number;
}

export interface NurseryProjectState {
  projectId: string;
  stage: NurseryGrowthStage;
}

export interface NurseryProjectSlotsState {
  teachingBed: NurseryProjectState | null;
}

export interface NurseryProjectDefinition {
  id: string;
  entryId: string;
  title: string;
  summary: string;
  memorySummary?: string;
  sourceEntryIds: string[];
  sourceModes: NurserySourceMode[];
  routeTags: string[];
  rewardKind: NurseryRewardKind;
  rewardId: string;
  rewardTitle: string;
  rewardSummary: string;
  growthStages: NurseryGrowthStage[];
  starterCost?: Partial<Record<NurseryResourceKind, number>>;
  unlockAfterRequestId?: string;
  unlockSummary?: string;
}

export interface EcosystemNote {
  id: string;
  title: string;
  entryIds: string[];
  summary: string;
  observationPrompt: string;
  minimumDiscoveries?: number;
  zoneId?: string;
}

interface InspectableEntryBase {
  id: string;
  commonName: string;
  category: InspectableCategory;
  shortFact: string;
  journalText: string;
  sketchbookNote?: string;
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
  authoredPlatforms?: Platform[];
  authoredClimbables?: Climbable[];
  authoredDepthFeatures?: DepthFeature[];
  authoredEntities?: AuthoredEntityPlacement[];
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

export interface PhenologyEntryAccent {
  entryId: string;
  style: PhenologyAccentStyle;
  primaryColor: string;
  secondaryColor?: string;
  spriteId?: string;
}

export interface PhenologySpawnEmphasis {
  tableId: string;
  minCountDelta?: number;
  maxCountDelta?: number;
  weightAdjustments?: Record<string, number>;
}

export interface PhenologyPhaseProfile {
  skyWashTop?: string;
  skyWashBottom?: string;
  groundWash?: string;
  parallaxColors?: string[];
  entryAccents?: PhenologyEntryAccent[];
  spawnEmphasis?: PhenologySpawnEmphasis[];
}

export interface BiomePhenologyProfile {
  phases: Partial<Record<PhenologyPhase, PhenologyPhaseProfile>>;
}

export interface HabitatProcessMoment {
  id: string;
  style: HabitatProcessStyle;
  entryIds: string[];
  zoneIds?: string[];
  minimumVisitCount?: number;
  weatherProfiles?: WeatherProfile[];
  phenologyPhases?: PhenologyPhase[];
  primaryColor: string;
  secondaryColor?: string;
}

export interface VerticalCue {
  id: string;
  style: VerticalCueStyle;
  x: number;
  y: number;
  zoneIds: string[];
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
  ecosystemNotes: EcosystemNote[];
  phenology?: BiomePhenologyProfile;
  processMoments?: HabitatProcessMoment[];
  verticalCues?: VerticalCue[];
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

export interface DepthFeature {
  id: string;
  style: DepthFeatureStyle;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Climbable {
  id: string;
  spriteId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  topExitY: number;
  canopySpriteId?: string;
}

export interface AuthoredEntityPlacement {
  id: string;
  entryId: string;
  x: number;
  y: number;
  refreshPolicy?: RefreshPolicy;
  castsShadow?: boolean;
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
  castsShadow?: boolean;
  removed: boolean;
}

export interface BiomeInstance {
  biomeId: string;
  visitCount: number;
  terrainSamples: TerrainSample[];
  platforms: Platform[];
  depthFeatures: DepthFeature[];
  climbables: Climbable[];
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
  closeLookAvailable: boolean;
  resourceNote?: string;
  x: number;
  y: number;
}

export interface CloseLookPayload {
  entryId: string;
  title: string;
  spriteId: string;
  sentence: string;
  callouts: string[];
  spriteScale: number;
}

export interface FieldGuideNearbyEntity {
  commonName: string;
  scientificName?: string;
  category: InspectableCategory;
  shortFact: string;
  journalText: string;
  distance: number;
  isDiscovered: boolean;
}

export interface FieldGuideBiomeEntry {
  commonName: string;
  scientificName?: string;
  category: InspectableCategory;
  shortFact: string;
  isDiscovered: boolean;
}

export interface FieldGuideContext {
  biomeId: string;
  biomeName: string;
  zoneName: string;
  zoneLabel: string;
  playerPosition: { x: number; y: number };
  nearbyEntities: FieldGuideNearbyEntity[];
  allBiomeEntries: FieldGuideBiomeEntry[];
  totalDiscoveries: number;
  biomeDiscoveries: number;
  biomeTotalEntries: number;
  visitCount: number;
  worldAge?: number;
  season?: string;
  timeOfDay?: DayPart;
  weather?: WeatherProfile;
  phenologyPhase?: PhenologyPhase;
  observationPrompt?: ObservationPrompt | null;
}

export interface GameApi {
  enterBiome: (biomeId: string) => void;
  inspectEntity: (entityId: string) => FactBubblePayload | null;
}
