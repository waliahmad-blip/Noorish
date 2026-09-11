import React, { useState } from "react";
import { Compass, MapPin, Building, Calendar, CheckCircle2, Shield } from "lucide-react";
import { SERVICE_POSTINGS } from "../../data";
import { audioEngine } from "../../utils/audioSynth";
import { PakistanTacticalMap } from "./PakistanTacticalMap";

export const SpatialImpactMap: React.FC = () => {
  const [selectedPostingId, setSelectedPostingId] = useState<string>(SERVICE_POSTINGS[0].id);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const selectedPosting = SERVICE_POSTINGS.find(p => p.id === selectedPostingId) || SERVICE_POSTINGS[0];
  const cities = ["All", "Lahore", "Karachi", "Hafizabad", "Gujranwala", "Rawalpindi"];

  const filteredPostings = activeFilter === "All"
    ? SERVICE_POSTINGS
    : SERVICE_POSTINGS.filter(p => p.location.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="cartography" className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXECUTIVE CARTOGRAPHY • 13 YEARS OF FIELD STATECRAFT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Thirteen Years of Front-Line Governance
          </h2>
          <p className="text-sm text-slate-400">
            Interactive territorial command simulation spanning 11 executive postings across megacities, rural tehsils, and provincial headquarters.
          </p>
        </div>

        {/* Aggregated Sovereign Impact Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-2xl glass-quantum border border-cyan-500/20 text-center space-y-1">
            <div className="text-xl sm:text-2xl font-display font-bold text-cyan-400">119</div>
            <div className="text-[10px] font-mono text-slate-400">Sports Complexes</div>
          </div>
          <div className="p-3.5 rounded-2xl glass-quantum border border-cyan-500/20 text-center space-y-1">
            <div className="text-xl sm:text-2xl font-display font-bold text-mint-400">1,000,000+</div>
            <div className="text-[10px] font-mono text-slate-400">Metropolitan Trees</div>
          </div>
          <div className="p-3.5 rounded-2xl glass-quantum border border-cyan-500/20 text-center space-y-1">
            <div className="text-xl sm:text-2xl font-display font-bold text-cyan-300">7,000+</div>
            <div className="text-[10px] font-mono text-slate-400">Personnel Governed</div>
          </div>
          <div className="p-3.5 rounded-2xl glass-quantum border border-cyan-500/20 text-center space-y-1">
            <div className="text-xl sm:text-2xl font-display font-bold text-violet-400">72-Hour</div>
            <div className="text-[10px] font-mono text-slate-400">Child Protection Rule</div>
          </div>
          <div className="p-3.5 rounded-2xl glass-quantum border border-cyan-500/20 text-center space-y-1 col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl font-display font-bold text-rose-400">PKR 1.4B</div>
            <div className="text-[10px] font-mono text-slate-400">State Land Recovered</div>
          </div>
        </div>

        {/* Pakistan Vector HUD Map Component */}
        <div className="glass-quantum rounded-3xl p-4 sm:p-6 border border-cyan-500/30 shadow-2xl">
          <PakistanTacticalMap
            selectedPostingId={selectedPostingId}
            onSelectPostingId={(id) => setSelectedPostingId(id)}
          />
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => { audioEngine.playTactileClick(); setActiveFilter(city); }}
              className={"px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all " + (
                activeFilter === city
                  ? "bg-cyan-500 text-obsidian-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-obsidian-900 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Postings Grid: Master List on Left, Selected Detail on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredPostings.map((posting) => {
              const isSelected = posting.id === selectedPostingId;
              return (
                <div
                  key={posting.id}
                  onClick={() => {
                    audioEngine.playRadarPing(900);
                    setSelectedPostingId(posting.id);
                  }}
                  className={"p-4 rounded-2xl cursor-pointer border transition-all " + (
                    isSelected
                      ? "glass-quantum border-cyan-400 text-white shadow-lg shadow-cyan-500/15"
                      : "bg-obsidian-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40"
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{posting.period}</span>
                    <span className="text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{posting.location}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mt-1 flex items-center gap-2">
                    <span>{posting.role}</span>
                    {posting.isFirstWoman && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                        First Woman
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">{posting.department}</p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 glass-quantum rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 shadow-2xl">
            <div className="border-b border-cyan-500/20 pb-4 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  {selectedPosting.period}
                </span>
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />{selectedPosting.location}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 flex-wrap">
                <span>{selectedPosting.role}</span>
                {selectedPosting.isFirstWoman && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                    Historical Precedent
                  </span>
                )}
              </h3>
              <p className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />{selectedPosting.department}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedPosting.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 text-center space-y-1">
                  <div className="text-lg font-display font-bold text-cyan-400">{m.value}</div>
                  <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Executive Directives & Policy Milestones</span>
              </h5>
              <div className="space-y-2">
                {selectedPosting.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-mint-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
