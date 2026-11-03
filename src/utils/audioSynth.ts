/**
 * Resilient Ambient Sound Generator using Web Audio API
 * Plays gentle, soothing acoustic chime / harp arpeggios for invitation ambiance.
 * Never fails due to broken external MP3 URLs or network issues.
 */

class AmbientPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;

  // Notes frequencies in Hz (Pentatonic Major: C, D, E, G, A in octaves 4 & 5)
  private scale = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
  ];

  private sequence = [
    0, 2, 4, 3, 5, 4, 2, 1,
    0, 3, 5, 7, 6, 4, 2, 0,
    2, 4, 7, 5, 8, 7, 5, 3,
  ];
  private step = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 2.0) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm soft tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  public start() {
    if (this.isPlaying) return;
    try {
      this.initContext();
      this.isPlaying = true;
      this.scheduleNextNote();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;
    const noteIdx = this.sequence[this.step % this.sequence.length];
    const freq = this.scale[noteIdx];
    this.playTone(freq, 2.2);

    this.step++;
    // Subtle varied tempo around 550ms - 800ms
    const interval = this.step % 4 === 0 ? 800 : 500;
    this.timer = window.setTimeout(this.scheduleNextNote, interval);
  };

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientPlayer = new AmbientPlayer();
