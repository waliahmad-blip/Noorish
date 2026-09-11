import React from 'react';
import { Sparkles, Globe, CheckCircle2 } from 'lucide-react';

export const FounderFacet: React.FC = () => {
  return (
    <div className="glass-quantum rounded-3xl p-6 sm:p-10 border border-rose-500/30 text-slate-100 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Facet IV • Sovereign Wellness Venture</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
            The Venture Architect
          </h2>
          <p className="text-sm text-slate-300 font-mono mt-1">
            Founder & CEO of NOORIVA • Halal Ingestible Cellular Beauty & Longevity
          </p>
        </div>
        <a
          href="https://nooriva.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:text-rose-100 text-xs font-mono transition-all flex items-center gap-2 hover:border-rose-400 shadow-lg"
        >
          <Globe className="w-4 h-4" />
          <span>nooriva.ai</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Ethos & Subordinated Venture Position */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
            PORTFOLIO VENTURE • SUBORDINATE ENTERPRISE
          </div>
          <h3 className="font-display text-xl font-bold text-slate-100">
            &ldquo;Governance by duty. Glow by design.&rdquo;
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            NOORIVA represents the entrepreneurial facet of Noorish Sabah&apos;s broader leadership portfolio. Born from the understanding that enduring institutional sovereignty requires cellular vitality, the enterprise engineers science-backed, halal-certified ingestible formulations designed to optimize cellular longevity, epidermal radiance, and stress resilience.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subordinated within her public statecraft and policy architecture, NOORIVA demonstrates cross-border execution capability across key international hubs.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-rose-300">
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-rose-500/30">Pakistan</span>
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-rose-500/30">United Arab Emirates</span>
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-rose-500/30">United Kingdom</span>
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-rose-500/30">North America</span>
          </div>
        </div>

        {/* Science Pillars */}
        <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-rose-500/20 space-y-4">
          <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
            Cellular Formulation Architecture
          </h4>
          
          <div className="space-y-3 text-xs text-slate-200">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Halal Marine Collagen Peptides:</span> Type I & III bio-active peptides engineered for dermis matrix renewal and joint resilience.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Liposomal Glutathione & Astaxanthin:</span> Master antioxidant defense neutralizing environmental free radicals and UV oxidative stress.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Phyto-Ceramide Barrier Infusions:</span> Restores internal moisture retention and epidermal integrity without synthetic fillers.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Zero Artificial Additives:</span> 100% compliant with strict Islamic dietary standards and European health safety regulations.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

