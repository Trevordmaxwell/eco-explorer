export type AmbientProfileId = 'shore' | 'scrub' | 'forest' | 'treeline' | 'tundra';
export type UiCueId = 'menu-move' | 'confirm' | 'journal-toggle' | 'inspect-reveal';

interface AmbientProfile {
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ: number;
  noiseGain: number;
  toneType: OscillatorType;
  toneFrequency: number;
  toneGain: number;
  swellRate: number;
  swellDepth: number;
}

interface CueProfile {
  frequency: number;
  duration: number;
  gain: number;
  type: OscillatorType;
}

interface AudioNodes {
  masterGain: GainNode;
  ambienceGain: GainNode;
  ambienceFilter: BiquadFilterNode;
  ambienceNoiseSource: AudioBufferSourceNode;
  ambienceTone: OscillatorNode;
  ambienceToneGain: GainNode;
  ambienceSwell: OscillatorNode;
  ambienceSwellGain: GainNode;
}

export interface AudioDebugState {
  supported: boolean;
  armed: boolean;
  enabled: boolean;
  ambientProfileId: AmbientProfileId | null;
}

export interface AudioEngine {
  arm: () => Promise<void>;
  setSoundEnabled: (enabled: boolean) => void;
  setAmbientProfile: (profileId: AmbientProfileId | null) => void;
  playUiCue: (cueId: UiCueId) => void;
  getDebugState: () => AudioDebugState;
  destroy: () => void;
}

const AMBIENT_PROFILES: Record<AmbientProfileId, AmbientProfile> = {
  shore: {
    filterType: 'lowpass',
    filterFrequency: 920,
    filterQ: 0.7,
    noiseGain: 0.022,
    toneType: 'sine',
    toneFrequency: 196,
    toneGain: 0.0045,
    swellRate: 0.16,
    swellDepth: 0.008,
  },
  scrub: {
    filterType: 'bandpass',
    filterFrequency: 760,
    filterQ: 0.9,
    noiseGain: 0.017,
    toneType: 'triangle',
    toneFrequency: 238,
    toneGain: 0.0038,
    swellRate: 0.14,
    swellDepth: 0.006,
  },
  forest: {
    filterType: 'bandpass',
    filterFrequency: 1180,
    filterQ: 1.1,
    noiseGain: 0.014,
    toneType: 'sine',
    toneFrequency: 262,
    toneGain: 0.003,
    swellRate: 0.11,
    swellDepth: 0.004,
  },
  treeline: {
    filterType: 'highpass',
    filterFrequency: 1700,
    filterQ: 0.8,
    noiseGain: 0.013,
    toneType: 'triangle',
    toneFrequency: 294,
    toneGain: 0.0028,
    swellRate: 0.12,
    swellDepth: 0.0035,
  },
  tundra: {
    filterType: 'highpass',
    filterFrequency: 2400,
    filterQ: 0.7,
    noiseGain: 0.011,
    toneType: 'sine',
    toneFrequency: 164,
    toneGain: 0.0024,
    swellRate: 0.1,
    swellDepth: 0.0028,
  },
};

const UI_CUE_PROFILES: Record<UiCueId, CueProfile> = {
  'menu-move': {
    frequency: 660,
    duration: 0.05,
    gain: 0.018,
    type: 'triangle',
  },
  confirm: {
    frequency: 520,
    duration: 0.08,
    gain: 0.024,
    type: 'sine',
  },
  'journal-toggle': {
    frequency: 392,
    duration: 0.07,
    gain: 0.02,
    type: 'triangle',
  },
  'inspect-reveal': {
    frequency: 330,
    duration: 0.09,
    gain: 0.022,
    type: 'sine',
  },
};

export function resolveAmbientProfileId(biomeId: string | null): AmbientProfileId | null {
  switch (biomeId) {
    case 'beach':
      return 'shore';
    case 'coastal-scrub':
      return 'scrub';
    case 'forest':
      return 'forest';
    case 'treeline':
      return 'treeline';
    case 'tundra':
      return 'tundra';
    default:
      return null;
  }
}

function createNoiseBuffer(audioContext: AudioContext): AudioBuffer {
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function createAudioNodes(audioContext: AudioContext): AudioNodes {
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioContext.destination);

  const ambienceGain = audioContext.createGain();
  ambienceGain.gain.value = 0.02;
  ambienceGain.connect(masterGain);

  const ambienceFilter = audioContext.createBiquadFilter();
  ambienceFilter.type = 'lowpass';
  ambienceFilter.frequency.value = 800;
  ambienceFilter.Q.value = 0.8;
  ambienceFilter.connect(ambienceGain);

  const ambienceNoiseSource = audioContext.createBufferSource();
  ambienceNoiseSource.buffer = createNoiseBuffer(audioContext);
  ambienceNoiseSource.loop = true;
  ambienceNoiseSource.connect(ambienceFilter);
  ambienceNoiseSource.start();

  const ambienceTone = audioContext.createOscillator();
  const ambienceToneGain = audioContext.createGain();
  ambienceTone.type = 'sine';
  ambienceTone.frequency.value = 220;
  ambienceToneGain.gain.value = 0;
  ambienceTone.connect(ambienceToneGain);
  ambienceToneGain.connect(ambienceGain);
  ambienceTone.start();

  const ambienceSwell = audioContext.createOscillator();
  const ambienceSwellGain = audioContext.createGain();
  ambienceSwell.type = 'sine';
  ambienceSwell.frequency.value = 0.12;
  ambienceSwellGain.gain.value = 0;
  ambienceSwell.connect(ambienceSwellGain);
  ambienceSwellGain.connect(ambienceGain.gain);
  ambienceSwell.start();

  return {
    masterGain,
    ambienceGain,
    ambienceFilter,
    ambienceNoiseSource,
    ambienceTone,
    ambienceToneGain,
    ambienceSwell,
    ambienceSwellGain,
  };
}

export function createAudioEngine(initialEnabled: boolean): AudioEngine {
  const AudioContextCtor =
    typeof window !== 'undefined'
      ? window.AudioContext ?? ((window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ?? null)
      : null;
  const supported = Boolean(AudioContextCtor);
  let audioContext: AudioContext | null = null;
  let nodes: AudioNodes | null = null;
  let armed = false;
  let enabled = initialEnabled;
  let ambientProfileId: AmbientProfileId | null = null;

  function ensureAudioGraph(): AudioNodes | null {
    if (!AudioContextCtor) {
      return null;
    }

    if (!audioContext) {
      audioContext = new AudioContextCtor();
    }

    if (!nodes) {
      nodes = createAudioNodes(audioContext);
    }

    return nodes;
  }

  function syncAmbientState(): void {
    if (!audioContext || !nodes) {
      return;
    }

    const now = audioContext.currentTime;
    nodes.masterGain.gain.cancelScheduledValues(now);
    nodes.masterGain.gain.setTargetAtTime(enabled && armed ? 0.8 : 0, now, 0.08);

    if (!ambientProfileId) {
      nodes.ambienceFilter.frequency.setTargetAtTime(600, now, 0.08);
      nodes.ambienceToneGain.gain.setTargetAtTime(0, now, 0.08);
      nodes.ambienceSwellGain.gain.setTargetAtTime(0, now, 0.08);
      return;
    }

    const profile = AMBIENT_PROFILES[ambientProfileId];
    nodes.ambienceFilter.type = profile.filterType;
    nodes.ambienceFilter.frequency.setTargetAtTime(profile.filterFrequency, now, 0.12);
    nodes.ambienceFilter.Q.setTargetAtTime(profile.filterQ, now, 0.12);
    nodes.ambienceGain.gain.setTargetAtTime(profile.noiseGain, now, 0.12);
    nodes.ambienceTone.type = profile.toneType;
    nodes.ambienceTone.frequency.setTargetAtTime(profile.toneFrequency, now, 0.12);
    nodes.ambienceToneGain.gain.setTargetAtTime(profile.toneGain, now, 0.12);
    nodes.ambienceSwell.frequency.setTargetAtTime(profile.swellRate, now, 0.12);
    nodes.ambienceSwellGain.gain.setTargetAtTime(profile.swellDepth, now, 0.12);
  }

  async function arm(): Promise<void> {
    armed = true;

    if (!supported) {
      return;
    }

    ensureAudioGraph();
    if (!audioContext) {
      return;
    }

    try {
      if (audioContext.state !== 'running') {
        await audioContext.resume();
      }
    } catch {
      // Some browsers keep autoplay restrictions even after a failed resume attempt.
    }

    syncAmbientState();
  }

  function setSoundEnabled(nextEnabled: boolean): void {
    enabled = nextEnabled;
    if (nodes) {
      syncAmbientState();
    }
  }

  function setAmbientProfile(nextProfileId: AmbientProfileId | null): void {
    ambientProfileId = nextProfileId;
    if (nodes) {
      syncAmbientState();
    }
  }

  function playUiCue(cueId: UiCueId): void {
    if (!enabled || !armed) {
      return;
    }

    ensureAudioGraph();
    if (!audioContext || !nodes) {
      return;
    }

    const cue = UI_CUE_PROFILES[cueId];
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime + 0.01;
    const endTime = startTime + cue.duration;

    oscillator.type = cue.type;
    oscillator.frequency.setValueAtTime(cue.frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(cue.frequency * 0.9, endTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(cue.gain, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);
    oscillator.connect(gain);
    gain.connect(nodes.masterGain);
    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
  }

  function getDebugState(): AudioDebugState {
    return {
      supported,
      armed,
      enabled,
      ambientProfileId,
    };
  }

  function destroy(): void {
    if (audioContext) {
      void audioContext.close();
    }
    audioContext = null;
    nodes = null;
  }

  return {
    arm,
    setSoundEnabled,
    setAmbientProfile,
    playUiCue,
    getDebugState,
    destroy,
  };
}
