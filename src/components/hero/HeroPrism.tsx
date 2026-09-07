import React, { useState } from 'react';
import { LivingQuantumCanvas } from '../canvas/LivingQuantumCanvas';
import { FacetId } from '../../types/protocol';
import { IDENTITY_CORE, FACETS_CONFIG } from '../../data';
import { audioEngine } from '../../utils/audioSynth';
import { Compass, Award, BookOpen, ShieldCheck } from 'lucide-react';

interface HeroPrismProps {
  activeFacet: FacetId;
  onFacetChange: (facet: FacetId) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroPrism: React.FC<HeroPrismProps> = ({ activeFacet, onFacetChange, onNavigate }) => {
  const [bioMode, setBioMode] = useState<'concise' | 'detailed'>('concise');

  return (
    <section className="relative pt-8 pb-14 overflow-hidden bg-obsidian-950 text-slate-100">
      {/* Background Quantum Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        
        {/* Cadre Badge & Header */}
        <div className="text-center space-y-3 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full glass-quantum text-[10px] sm:text-xs font-mono text-cyan-400 border border-cyan-500/30 text-center leading-tight">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span>PAKISTAN ADMINISTRATIVE SERVICE • 40TH COMMON TRAINING PROGRAM</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            {IDENTITY_CORE.name}
          </h1>

          <div className="max-w-3xl mx-auto px-4 py-2 rounded-2xl glass-quantum border border-cyan-500/25 bg-cyan-950/20">
            <p className="text-sm sm:text-base md:text-lg font-serif italic text-cyan-100 tracking-wide leading-relaxed">
              &ldquo;{IDENTITY_CORE.motto}&rdquo;
            </p>
          </div>

          <p className="text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-wider">
            {IDENTITY_CORE.title}
          </p>
        </div>

        {/* 7,500-Particle Kinetic Living Quantum Particle Singularity Canvas */}
        <LivingQuantumCanvas activeFacet={activeFacet} onFacetChange={onFacetChange} />


        {/* Facet Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto my-3">
          {FACETS_CONFIG.map((facet) => {
            const isSelected = activeFacet === facet.id;
            return (
              <button
                key={facet.id}
                onClick={() => {
                  audioEngine.playFacetHarmonic(facet.frequencyHz);
                  onFacetChange(facet.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'glass-quantum text-white border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-obsidian-900/80 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: facet.accentHex }} />
                <span className="font-display font-semibold">{facet.name}</span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">{facet.frequencyHz}Hz</span>
              </button>
            );
          })}
        </div>

        {/* Executive Dossier HUD Card */}
        <div className="max-w-3xl mx-auto glass-quantum rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Executive Matrix Dossier</span>
            </div>
            <div className="flex items-center gap-1 bg-obsidian-900 p-1 rounded-lg border border-cyan-500/20 text-[11px] font-mono">
              <button
                onClick={() => { audioEngine.playTactileClick(); setBioMode('concise'); }}
                className={`px-2.5 py-1 rounded ${bioMode === 'concise' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Concise Bio
              </button>
              <button
                onClick={() => { audioEngine.playTactileClick(); setBioMode('detailed'); }}
                className={`px-2.5 py-1 rounded ${bioMode === 'detailed' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Comprehensive Bio
              </button>
            </div>
          </div>

          <p className="font-sans text-slate-200 text-sm sm:text-base leading-relaxed">
            {bioMode === 'concise' ? IDENTITY_CORE.shortBio : IDENTITY_CORE.longBio}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => { audioEngine.playTactileClick(); onNavigate('cartography'); }}
              className="px-3.5 py-2 rounded-xl bg-obsidian-900 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>13-Year Cartography</span>
            </button>
            <button
              onClick={() => { audioEngine.playTactileClick(); onNavigate('credentials'); }}
              className="px-3.5 py-2 rounded-xl bg-obsidian-900 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Multilateral Vault</span>
            </button>
            <button
              onClick={() => { audioEngine.playTactileClick(); onNavigate('noorix'); }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Noorix Knowledge Engine</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
