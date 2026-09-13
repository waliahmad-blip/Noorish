import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles } from 'lucide-react';

interface ThinkingOrbProps {
  isProcessing: boolean;
  className?: string;
}

const THINKING_STAGES = [
  '[01/03] Interrogating Administrative Archives & Real-Time Intelligence...',
  '[02/03] Synthesizing Policy & Institutional Metrics...',
  '[03/03] Preparing Executive Brief...'
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
    }, 1200);
    return () => clearInterval(interval);
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className={`p-4 rounded-2xl bg-obsidian-950/90 border border-cyan-500/40 glass-quantum space-y-3 font-mono text-xs ${className}`}>
      <div className="flex items-center gap-3">
        {/* Kinetic Neural Orb */}
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-mint-400 border-b-transparent border-l-transparent animate-spin" />
          {/* Middle counter-rotating ring */}
          <div className="absolute inset-1 rounded-full border border-violet-400/60 border-t-transparent border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          {/* Inner pulsating core */}
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          <div className="absolute w-2 h-2 rounded-full bg-white shadow-lg shadow-cyan-400" />
        </div>

        {/* Cognitive Progression Ticker & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NOORIX COGNITIVE ENGINE ACTIVE</span>
          </div>
          <div className="text-[11px] text-slate-300 truncate transition-all duration-300 pt-0.5">
            {THINKING_STAGES[stageIndex]}
          </div>
        </div>

        {/* 4-Bar Dynamic Audio-Visual Equalizer */}
        <div className="flex items-end gap-1 h-5 px-2 py-1 bg-obsidian-900/80 rounded border border-cyan-500/30 shrink-0">
          <span className="w-1 bg-cyan-400 rounded-full animate-pulse h-3 [animation-duration:400ms]" />
          <span className="w-1 bg-mint-400 rounded-full animate-pulse h-5 [animation-duration:650ms]" />
          <span className="w-1 bg-violet-400 rounded-full animate-pulse h-2 [animation-duration:500ms]" />
          <span className="w-1 bg-cyan-300 rounded-full animate-pulse h-4 [animation-duration:750ms]" />
        </div>
      </div>
    </div>
  );
};
