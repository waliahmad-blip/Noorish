import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { ACADEMIC_FOUNDATION } from '../../data';

export const AcademicFoundation: React.FC = () => {
  return (
    <section className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC FOUNDATION • EXECUTIVE EDUCATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Rigorous Intellectual Pedigree
          </h2>
          <p className="text-sm text-slate-400">
            A dual grounding in constitutional statecraft, institutional governance, and quantitative econometric analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_FOUNDATION.map((acad, idx) => (
            <div
              key={idx}
              className="glass-quantum rounded-2xl p-6 border border-cyan-500/20 shadow-xl space-y-4 flex flex-col justify-between hover:border-cyan-400/50 transition-all"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {acad.period}
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {acad.degree}
                </h3>
                <p className="text-xs font-mono text-cyan-300 font-medium">
                  {acad.institution}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {acad.field}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-mint-400">
                <CheckCircle2 className="w-4 h-4 text-mint-400 shrink-0" />
                <span>{acad.distinction}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

