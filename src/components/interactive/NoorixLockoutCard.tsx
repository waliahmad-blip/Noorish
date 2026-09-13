import React from 'react';
import { Lock, Mail, Phone, RotateCcw } from 'lucide-react';

interface NoorixLockoutCardProps {
  onReset: () => void;
}

export const NoorixLockoutCard: React.FC<NoorixLockoutCardProps> = ({ onReset }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-obsidian-950/95 border border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.2)] font-mono space-y-3.5 animate-in fade-in duration-300">
      {/* Top Holographic Laser Sweep */}
      <div className="sovereign-laser-sweep" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Lock className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-amber-300 font-bold text-xs tracking-wider flex items-center gap-2">
              <span>SESSION ALLOCATION DEPLETED [5/5]</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
              Institutional Security Protocol Engaged • Public Session Bound
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-300 text-xs transition-colors"
          title="Reset visitor session"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
        You have concluded the maximum allocated executive intelligence queries (5/5) for this public session. To coordinate policy consultations, submit institutional briefs, or schedule an inquiry with the Office of <strong>Noorish Sabah, PAS</strong> (Director, Pakistan Sports Board, Punjab), please connect directly through gazetted secretarial channels.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <a
          href="mailto:dirlahrpsb@sports.gov.pk?subject=Official%20Inquiry%20via%20NOORIX%20Executive%20Terminal"
          className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Secretariat: dirlahrpsb@sports.gov.pk</span>
        </a>

        <a
          href="tel:04299230383"
          className="px-4 py-2.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Office Exchange: 042-99230383</span>
        </a>
      </div>

      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
        <span>Sovereign Ghost Key holders press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 text-[10px]">Ctrl+Shift+S</kbd> to unlock Ring-0 clearance.</span>
      </div>
    </div>
  );
};
