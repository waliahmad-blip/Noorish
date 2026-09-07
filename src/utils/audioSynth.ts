/**
 * Web Audio API Procedural Synthesizer for Concept 8 (Chrono-Prism)
 * Generates pure harmonic crystal chimes matching the solfeggio frequencies of each facet.
 */

class CrystalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Defaults to muted for polite browser autoplay policies

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initContext();
      this.playChime(528, 0.2); // Play welcoming golden harmonic chime
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playFacetHarmonic(frequency: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Fundamental Crystal Oscillator
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    
    // Overtone Crystal Oscillator (Fifth harmonic)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 1.5, now); // Fifth harmonic

    // Gentle glass-like envelope
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 1.3);
    osc2.stop(now + 0.9);
  }

  public playChime(frequency: number = 528, duration: number = 0.3) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public playTactileClick() {
    if (this.isMuted) return;
    this.playChime(1200, 0.04);
  }
}

export const audioEngine = new CrystalAudioEngine();
