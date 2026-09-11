import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Crosshair, Activity } from "lucide-react";
import { SERVICE_POSTINGS } from "../../data";
import { audioEngine } from "../../utils/audioSynth";

export interface PakistanTacticalMapProps {
  selectedPostingId: string;
  onSelectPostingId: (id: string) => void;
}

const projectCoord = (lng: number, lat: number) => ({
  x: Math.round(((lng - 61) / 17) * 720 + 40),
  y: Math.round((1 - (lat - 24) / 13) * 440 + 40)
});

const HUBS: Record<string, { lng: number; lat: number }> = {
  "Lahore": { lng: 74.34, lat: 31.52 },
  "Karachi": { lng: 67.00, lat: 24.86 },
  "Hafizabad": { lng: 73.68, lat: 32.07 },
  "Gujranwala": { lng: 74.19, lat: 32.18 },
  "Murree & Rawalpindi": { lng: 73.39, lat: 33.90 }
};

export const PakistanTacticalMap: React.FC<PakistanTacticalMapProps> = ({
  selectedPostingId,
  onSelectPostingId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedPosting = SERVICE_POSTINGS.find(p => p.id === selectedPostingId) || SERVICE_POSTINGS[0];
  const chronological = [...SERVICE_POSTINGS].reverse();

  const getPostingCoords = (posting: typeof selectedPosting) => {
    const key = Object.keys(HUBS).find(k => posting.location.includes(k)) || "Lahore";
    return projectCoord(HUBS[key].lng, HUBS[key].lat);
  };

  const activePos = getPostingCoords(selectedPosting);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        onSelectPostingId((() => {
          const idx = chronological.findIndex(p => p.id === selectedPostingId);
          const next = chronological[(idx + 1) % chronological.length];
          audioEngine.playRadarPing(820 + ((idx + 1) % chronological.length) * 35);
          return next.id;
        })());
      }, 2600);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedPostingId, chronological, onSelectPostingId]);

  const trajectoryPathD = chronological
    .map(p => getPostingCoords(p))
    .reduce((acc, pt, idx) => (idx === 0 ? "M " + pt.x + " " + pt.y : acc + " L " + pt.x + " " + pt.y), "");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            PAKISTAN COMMAND GRID • SECTOR 40-PAS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioEngine.playTactileClick();
              setIsPlaying(!isPlaying);
            }}
            className={"px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all shadow-md " + (
              isPlaying
                ? "bg-amber-500 text-obsidian-950 font-bold"
                : "bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold"
            )}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? "PAUSE TRAJECTORY" : "SIMULATE CAREER PATH"}</span>
          </button>
          <button
            onClick={() => {
              audioEngine.playTactileClick();
              setIsPlaying(false);
              onSelectPostingId(SERVICE_POSTINGS[0].id);
            }}
            className="p-1.5 rounded-xl bg-obsidian-900 border border-cyan-500/30 text-slate-400 hover:text-white"
            title="Reset to Present Command"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-obsidian-950/90 rounded-2xl border border-cyan-500/25 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <svg viewBox="0 0 800 520" className="w-full h-full">
          <line x1="40" y1="130" x2="760" y2="130" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="40" y1="260" x2="760" y2="260" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="40" y1="390" x2="760" y2="390" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="260" y1="40" x2="260" y2="480" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="520" y1="40" x2="520" y2="480" stroke="#06b6d4" strokeOpacity="0.1" strokeDasharray="4 4" />

          {/* Pakistan Perimeter */}
          <path
            d="M 280 470 L 320 460 L 410 420 L 470 380 L 530 310 L 610 220 L 635 200 L 600 140 L 560 110 L 510 130 L 440 200 L 330 250 L 220 310 L 170 380 L 220 440 Z"
            fill="none"
            stroke="#06b6d4"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />

          {/* Trajectory */}
          <path
            d={trajectoryPathD}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeOpacity="0.85"
          />

          {/* Hubs */}
          {Object.entries(HUBS).map(([key, hub]) => {
            const pt = projectCoord(hub.lng, hub.lat);
            const isSelected = selectedPosting.location.includes(key);

            return (
              <g
                key={key}
                className="cursor-pointer"
                onClick={() => {
                  const match = SERVICE_POSTINGS.find(p => p.location.includes(key));
                  if (match) {
                    audioEngine.playRadarPing(850);
                    onSelectPostingId(match.id);
                  }
                }}
              >
                {isSelected && (
                  <>
                    <circle cx={pt.x} cy={pt.y} r="20" fill="none" stroke="#06b6d4" strokeOpacity="0.3" strokeWidth="1.5" className="animate-ping" />
                    <circle cx={pt.x} cy={pt.y} r="13" fill="#06b6d4" fillOpacity="0.2" stroke="#00f0ff" strokeWidth="1.5" />
                  </>
                )}

                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? "6" : "4"}
                  fill={isSelected ? "#00f0ff" : "#475569"}
                  stroke={isSelected ? "#ffffff" : "#06b6d4"}
                  strokeWidth={isSelected ? "2" : "1"}
                />

                <text
                  x={pt.x + 10}
                  y={pt.y + 4}
                  fill={isSelected ? "#00f0ff" : "#94a3b8"}
                  fontSize={isSelected ? "11" : "9"}
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "normal"}
                >
                  {key.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Reticle */}
          <g transform={"translate(" + activePos.x + ", " + activePos.y + ")"}>
            <line x1="-12" y1="0" x2="-6" y2="0" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="6" y1="0" x2="12" y2="0" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="0" y1="-12" x2="0" y2="-6" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="0" y2="12" stroke="#00f0ff" strokeWidth="1.5" />
          </g>
        </svg>

        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-obsidian-950/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-3 shadow-lg">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-mint-400 animate-pulse" /> TELEMETRY ACTIVE
          </span>
          <span className="hidden sm:inline">CADRE: PAS 40TH COMMON</span>
          <span>TENURE: 13 YEARS</span>
        </div>
      </div>
    </div>
  );
};
