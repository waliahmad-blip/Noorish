import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UNIQUENESS_ROWS } from '../../data';
import { audioEngine } from '../../utils/audioSynth';

export const UniquenessMatrix: React.FC = () => {
  const [activeDimensionIndex, setActiveDimensionIndex] = useState<number | null>(null);

  return (
    <section id="uniqueness" className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE UNIQUENESS THESIS • INSTITUTIONAL COMPARATIVE AUDIT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Comparative Institutional Cross-Check
          </h2>
          <p className="text-sm text-slate-400">
            A rigorous audit of executive civil service dimensions across public sector cadres.
          </p>
        </div>

        {/* Uniqueness Table */}
        <div className="overflow-x-auto rounded-2xl border border-cyan-500/30 glass-quantum shadow-2xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-obsidian-900 text-slate-300 font-mono text-[11px] uppercase tracking-wider border-b border-cyan-500/30">
                <th className="p-4 sm:p-5">Dimension</th>
                <th className="p-4 sm:p-5">Conventional PAS Cohort Baseline</th>
                <th className="p-4 sm:p-5 text-cyan-400">Noorish Sabah, PAS Record</th>
                <th className="p-4 sm:p-5">Verification Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {UNIQUENESS_ROWS.map((row, idx) => {
                const isSelected = activeDimensionIndex === idx;
                return (
                  <tr
                    key={idx}
                    onClick={() => {
                      audioEngine.playTactileClick();
                      setActiveDimensionIndex(isSelected ? null : idx);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-500/10' : 'hover:bg-obsidian-900/60'
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-display font-bold text-white">
                      {row.dimension}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400 text-xs leading-relaxed">
                      {row.womenInPAS}
                    </td>
                    <td className="p-4 sm:p-5 font-medium text-slate-200 text-xs leading-relaxed bg-cyan-950/20">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{row.noorishSabah}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[11px] text-mint-400 whitespace-nowrap">
                      {row.verifiedStatus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Authoritative Conclusion Banner */}
        <div className="p-5 rounded-2xl glass-quantum text-slate-100 border border-cyan-500/40 flex items-start sm:items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm font-sans italic text-slate-300">
            &ldquo;On public record, no verifiable peer matches this combination of constitutional authority, verified multilateral credentialing, sovereign commercial execution, and mass physical impact.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
};

