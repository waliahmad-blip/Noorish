import React, { useState } from 'react';
import { LivingQuantumCanvas } from '../canvas/LivingQuantumCanvas';
import { FacetId } from '../../types/protocol';
import { IDENTITY_CORE, FACETS_CONFIG } from '../../data';
import { audioEngine } from '../../utils/audioSynth';
import { 
  Compass, 
  Award, 
  ShieldCheck, 
  Cpu, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface HeroPrismProps {
  activeFacet: FacetId;
  onFacetChange: (facet: FacetId) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroPrism: React.FC<HeroPrismProps> = ({ activeFacet, onFacetChange, onNavigate }) => {
  const [bioMode, setBioMode] = useState<'concise' | 'detailed'>('concise');

  const socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'in/noorishsabah',
      url: 'https://www.linkedin.com/in/noorishsabah/',
      icon: Linkedin,
      color: 'hover:border-blue-500/50 hover:text-blue-400',
    },
    {
      name: 'Facebook',
      handle: 'noorishsabah',
      url: 'https://www.facebook.com/noorishsabah',
      icon: Facebook,
      color: 'hover:border-indigo-500/50 hover:text-indigo-400',
    },
    {
      name: 'Instagram',
      handle: '@noorishsabah',
      url: 'https://www.instagram.com/noorishsabah/',
      icon: Instagram,
      color: 'hover:border-pink-500/50 hover:text-pink-400',
    },
  ];

  return (
    <section className="relative pt-6 pb-14 overflow-hidden bg-obsidian-950 text-slate-100">
      {/* Background Quantum Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">

        {/* 1. Sovereign Trust & Credential Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-quantum text-[11px] sm:text-xs font-mono text-cyan-400 border border-cyan-500/30 leading-tight">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span>PAKISTAN ADMINISTRATIVE SERVICE • 40TH COMMON</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-quantum text-[11px] sm:text-xs font-mono text-violet-300 border border-violet-500/30 leading-tight">
            <Sparkles className="w-3 h-3 text-violet-400 shrink-0" />
            <span>MIT DEDP FELLOW (2026 – ONWARDS)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-quantum text-[11px] sm:text-xs font-mono text-emerald-300 border border-emerald-500/30 leading-tight">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>DIRECTOR PAKISTAN SPORTS BOARD (PUNJAB)</span>
          </div>
        </div>

        {/* 2. Headline & Sovereign Motto */}
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
            {IDENTITY_CORE.name}
          </h1>

          <div className="max-w-3xl mx-auto px-5 py-2.5 rounded-2xl glass-quantum border border-cyan-500/25 bg-cyan-950/20">
            <p className="text-sm sm:text-base md:text-lg font-serif italic text-cyan-100 tracking-wide leading-relaxed">
              &ldquo;{IDENTITY_CORE.motto}&rdquo;
            </p>
          </div>

          <p className="text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-widest">
            {IDENTITY_CORE.title}
          </p>
        </div>

        {/* 3. Sovereign Split-Screen Command Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">

          {/* LEFT COLUMN: Verified Sovereign Likeness & Cadre Authority (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Executive Portrait Frame */}
            <div className="glass-quantum rounded-3xl p-3 border border-cyan-500/30 shadow-2xl relative group overflow-hidden bg-obsidian-900/60">
              {/* Corner Cyber-Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />

              <div className="relative overflow-hidden rounded-2xl aspect-square bg-obsidian-950">
                <picture className="w-full h-full block">
                  <source srcSet="/assets/noorish-sabah-executive.webp" type="image/webp" />
                  <img
                    src="/assets/noorish-sabah-executive.jpg"
                    alt="Noorish Sabah, PAS - Official Sovereign Executive Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    width={2048}
                    height={2048}
                    fetchPriority="high"
                    loading="eager"
                  />
                </picture>

                {/* Top Badge: Verified Canonical Likeness */}
                <div className="absolute top-3 left-3 bg-obsidian-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
                    Canonical Likeness Attested
                  </span>
                </div>

                {/* Bottom Badge: Official Resolution & Grounding */}
                <div className="absolute bottom-3 right-3 bg-obsidian-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  2048 × 2048 UHD • Sovereign Grounding
                </div>
              </div>

              {/* Portrait Caption & Cadre Seal */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">Noorish Sabah, PAS</span>
                </div>
                <span className="text-[11px] text-cyan-400 font-semibold">PAS 40th Common</span>
              </div>
            </div>

            {/* Quick Authority & Verified Socials Strip */}
            <div className="glass-quantum rounded-2xl p-4 border border-cyan-500/25 space-y-3 bg-obsidian-900/50">
              <div className="flex items-center justify-between text-xs font-mono border-b border-cyan-500/20 pb-2">
                <span className="text-slate-400">Institutional Cadre Line</span>
                <a
                  href="mailto:dirlahrpsb@sports.gov.pk"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>dirlahrpsb@sports.gov.pk</span>
                </a>
              </div>

              {/* 3 Sole Verified Social Channels */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Authorized Social Media:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Only
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl bg-obsidian-900/90 border border-slate-800 text-slate-300 transition-all flex flex-col items-center justify-center gap-1 text-center group ${social.color}`}
                      >
                        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span className="text-[10px] font-mono font-medium text-slate-200 group-hover:text-white">
                          {social.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Authenticity Ledger Quick Action */}
              <button
                onClick={() => {
                  audioEngine.playTactileClick();
                  onNavigate('authenticity');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Examine Authenticity Ledger</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Kinetic Singularity, Harmonic Facets & Dossier HUD (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">

            {/* 7,500-Particle Kinetic Living Quantum Particle Singularity Canvas */}
            <div className="rounded-3xl glass-quantum border border-cyan-500/25 overflow-hidden shadow-2xl relative bg-obsidian-950/80">
              <LivingQuantumCanvas activeFacet={activeFacet} onFacetChange={onFacetChange} />
            </div>

            {/* Facet Selectors with Solfeggio Harmonic Tones */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              {FACETS_CONFIG.map((facet) => {
                const isSelected = activeFacet === facet.id;
                return (
                  <button
                    key={facet.id}
                    onClick={() => {
                      audioEngine.playFacetHarmonic(facet.frequencyHz);
                      onFacetChange(facet.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'glass-quantum text-white border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.03] bg-cyan-950/40'
                        : 'bg-obsidian-900/80 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: facet.accentHex }} />
                    <span className="font-display font-semibold">{facet.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400/80 hidden sm:inline">{facet.frequencyHz}Hz</span>
                  </button>
                );
              })}
            </div>

            {/* Executive Dossier HUD Card (Target of #dossier) */}
            <div id="dossier" className="glass-quantum rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-4 scroll-mt-24 bg-obsidian-900/60">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Executive Matrix Dossier</span>
                </div>
                <div className="flex items-center gap-1 bg-obsidian-900 p-1 rounded-lg border border-cyan-500/20 text-[11px] font-mono">
                  <button
                    onClick={() => { audioEngine.playTactileClick(); setBioMode('concise'); }}
                    className={`px-2.5 py-1 rounded transition-colors ${bioMode === 'concise' ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    Concise Bio
                  </button>
                  <button
                    onClick={() => { audioEngine.playTactileClick(); setBioMode('detailed'); }}
                    className={`px-2.5 py-1 rounded transition-colors ${bioMode === 'detailed' ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    Comprehensive Bio
                  </button>
                </div>
              </div>

              <p className="font-sans text-slate-200 text-sm sm:text-base leading-relaxed">
                {bioMode === 'concise' ? IDENTITY_CORE.shortBio : IDENTITY_CORE.longBio}
              </p>

              {/* Quick Navigation Vectors */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => { audioEngine.playTactileClick(); onNavigate('cartography'); }}
                  className="px-3.5 py-2 rounded-xl bg-obsidian-900 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all hover:shadow-cyan-500/20 hover:shadow-md"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>13-Year Cartography</span>
                </button>
                <button
                  onClick={() => { audioEngine.playTactileClick(); onNavigate('credentials'); }}
                  className="px-3.5 py-2 rounded-xl bg-obsidian-900 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all hover:shadow-cyan-500/20 hover:shadow-md"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Credentials</span>
                </button>
                <button
                  onClick={() => { audioEngine.playTactileClick(); onNavigate('authenticity'); }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400 text-xs font-mono flex items-center gap-2 transition-all hover:shadow-emerald-500/20 hover:shadow-md"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authenticity Ledger</span>
                </button>
                <button
                  onClick={() => { audioEngine.playTactileClick(); onNavigate('noorix'); }}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all hover:shadow-cyan-500/20 hover:shadow-md"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Noorix Terminal</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
