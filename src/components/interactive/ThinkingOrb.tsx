import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

interface ThinkingOrbProps {
  isProcessing: boolean;
  className?: string;
}

const THINKING_STAGES = [
  '[01/04] Authenticating Clearance & Interrogating Vertex Cloud Gemini 2.5 Flash...',
  '[02/04] Traversal: PSB Command, KMC Audits & Multilateral Record...',
  '[03/04] Synthesizing Policy Metrics & Institutional Precedents...',
  '[04/04] Formulating Attested Executive Brief...'
];

export const ThinkingOrb: React.FC<ThinkingOrbProps> = ({ isProcessing, className = '' }) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      setStageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % THINKING_STAGES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className={`relative overflow-hidden p-4 rounded-2xl bg-obsidian-950/95 border border-cyan-500/40 glass-quantum space-y-3 font-mono text-xs shadow-xl shadow-cyan-950/40 ${className}`}>
      {/* Top Holographic Laser Sweep */}
      <div className="sovereign-laser-sweep" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Kinetic Neural Orb + Cognitive Title */}
        <div className="flex items-center gap-3">
          {/* Dual Counter-Rotating Concentric Rings with Noorix Crest */}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-purple-400 border-b-transparent border-l-transparent animate-spin" />
            {/* Middle counter-rotating ring */}
            <div className="absolute inset-1 rounded-full border border-violet-400/70 border-t-transparent border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:1.4s]" />
            {/* Inner Crest */}
            <img 
              src="/logos/small/noorix.png" 
              alt="NOORIX" 
              className="w-4 h-4 object-contain filter drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-ping" />
              <span>NOORIX DIGITAL GUARDIAN • COGNITIVE SYNTHESIS</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate transition-all duration-300 pt-0.5 font-mono">
              {THINKING_STAGES[stageIndex]}
            </div>
          </div>
        </div>

        {/* SVG Sine-Wave Bezier Waveform & Equalizer from Noorix HUD */}
        <div className="flex items-center gap-3 shrink-0">
          <svg
            className="w-24 sm:w-28 h-6 shrink-0"
            viewBox="0 0 200 60"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.3" />
              </linearGradient>
              <path
                id="thinking-path"
                d="M10,30 Q50,5 90,30 T170,30"
                fill="none"
              />
            </defs>
            <use href="#thinking-path" stroke="url(#sineGlow)" strokeWidth="2.5" />
            {[0, 1, 2].map((i) => (
              <circle key={i} r="4" fill="#00f0ff">
                <animateMotion
                  dur="1.6s"
                  repeatCount="indefinite"
                  begin={`${i * 0.25}s`}
                  path="M10,30 Q50,5 90,30 T170,30"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.6s"
                  repeatCount="indefinite"
                  begin={`${i * 0.25}s`}
                />
              </circle>
            ))}
          </svg>

          {/* 4-Bar Dynamic Equalizer */}
          <div className="flex items-end gap-1 h-5 px-2 py-1 bg-obsidian-900/90 rounded border border-cyan-500/30">
            <span className="w-1 bg-cyan-400 rounded-full animate-pulse h-3 [animation-duration:400ms]" />
            <span className="w-1 bg-mint-400 rounded-full animate-pulse h-5 [animation-duration:650ms]" />
            <span className="w-1 bg-violet-400 rounded-full animate-pulse h-2 [animation-duration:500ms]" />
            <span className="w-1 bg-cyan-300 rounded-full animate-pulse h-4 [animation-duration:750ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};
