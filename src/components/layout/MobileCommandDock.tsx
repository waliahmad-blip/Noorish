import React from "react";
import { Shield, TrendingUp, Cpu, Sparkles, Layers } from "lucide-react";
import { FacetId } from "../../types/protocol";
import { FACETS_CONFIG } from "../../data";
import { audioEngine } from "../../utils/audioSynth";

interface MobileCommandDockProps {
  activeFacet: FacetId;
  onSelectFacet: (facet: FacetId) => void;
}

export const MobileCommandDock: React.FC<MobileCommandDockProps> = ({ activeFacet, onSelectFacet }) => {
  const facetIcons: Record<FacetId, React.ComponentType<{ className?: string }>> = {
    "officer": Shield,
    "economist": TrendingUp,
    "ai-governor": Cpu,
    "founder": Sparkles,
    "convergence": Layers
  };

  // Each facet maps to the canonical anchor advertised in sitemap.xml, so the
  // dock emits real crawlable links instead of JavaScript-only buttons.
  const facetAnchors: Record<FacetId, string> = {
    "officer": "field-command",
    "economist": "noorix",
    "ai-governor": "ai-governance",
    "founder": "nooriva",
    "convergence": "dossier"
  };

  return (
    <div className="md:hidden fixed bottom-[calc(var(--dock-gutter)+env(safe-area-inset-bottom,0px))] left-3 right-3 z-50 pointer-events-auto">
      <div className="glass-quantum rounded-2xl p-1.5 border border-cyan-500/40 shadow-2xl flex items-center justify-around backdrop-blur-2xl">
        {FACETS_CONFIG.map((facet) => {
          const IconComponent = facetIcons[facet.id] || Layers;
          const isActive = activeFacet === facet.id;

          return (
            <a
              key={facet.id}
              href={`#${facetAnchors[facet.id]}`}
              aria-label={`Open ${facet.name} view`}
              onClick={(event) => {
                event.preventDefault();
                audioEngine.playFacetHarmonic(facet.frequencyHz);
                onSelectFacet(facet.id);
              }}
              className={"flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative " + (
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-inner border border-cyan-400/50"
                  : "text-slate-400 hover:text-white opacity-85"
              )}
            >
              <IconComponent className={"w-5 h-5 transition-transform " + (isActive ? "scale-110 text-cyan-400" : "")} />
              <span className="text-[10px] tracking-tight mt-1 font-mono">
                {facet.name.replace("The ", "")}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute -top-1 animate-pulse" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};
