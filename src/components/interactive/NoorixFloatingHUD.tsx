import React, { useState, useEffect } from 'react';
import {
  X, Cpu, Sparkles, MessageSquare, ChevronDown,
  ShieldCheck, Maximize2, Minimize2
} from 'lucide-react';
import { audioEngine } from '../../utils/audioSynth';
import { NoorixChatCockpit } from './NoorixChatCockpit';
import { VisitorRecord } from '../../utils/visitorTelemetry';

interface NoorixFloatingHUDProps {
  visitor?: VisitorRecord | null;
}

export const NoorixFloatingHUD: React.FC<NoorixFloatingHUDProps> = ({ visitor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadPulse, setHasUnreadPulse] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Global event listener to open HUD from Header or other CTA buttons
    const handleOpenHUD = () => {
      audioEngine.playTactileClick();
      setIsOpen(true);
      setHasUnreadPulse(false);
    };

    window.addEventListener('open-noorix-hud', handleOpenHUD);

    // ESC key closes FullScreen first, then HUD
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-noorix-hud', handleOpenHUD);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullScreen]);

  const toggleOpen = () => {
    audioEngine.playTactileClick();
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasUnreadPulse(false);
    }
  };

  return (
    <>
      {/* Floating HUD Launcher Elevated Action Pill/Orb (16px above Mobile Command Dock) */}
      {!isOpen && (
        <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-6 z-40 transition-all duration-300">
          <button
            onClick={toggleOpen}
            aria-label="Ask NOORIX AI"
            className="group relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-obsidian-950/95 border border-cyan-400/80 hover:border-cyan-300 text-slate-100 shadow-[0_8px_32px_rgba(6,182,212,0.35)] backdrop-blur-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* Concentric Neural Pulsing Glow Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-mint-500/20 to-cyan-500/30 blur-sm animate-pulse pointer-events-none" />

            {/* Glowing Neural Dot */}
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
              <span className="w-2 h-2 rounded-full bg-mint-400 shadow-[0_0_8px_#34d399] relative" />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-lg overflow-hidden bg-obsidian-900 border border-purple-500/50 shadow-[0_0_10px_rgba(192,132,252,0.4)] flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logos/small/noorix.png"
                  alt="NOORIX"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(192,132,252,0.8)]"
                />
              </div>
              <span className="font-display font-bold text-xs tracking-wide text-white">Ask NOORIX</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                <span>LIVE</span>
              </span>
            </div>

            {hasUnreadPulse && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint-500" />
              </span>
            )}
          </button>
        </div>
      )}

      {/* Floating Executive Cockpit Drawer Modal */}
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex ${isFullScreen ? 'justify-center items-center' : 'justify-end'} bg-obsidian-950/75 backdrop-blur-md animate-in fade-in duration-200`}>
          <div
            className={`${
              isFullScreen
                ? 'w-full h-full max-w-7xl mx-auto rounded-none lg:rounded-2xl lg:my-6 lg:h-[94vh] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]'
                : 'w-full max-w-xl h-full border-l border-cyan-500/30'
            } bg-obsidian-950/98 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 font-mono relative overflow-hidden`}
          >
            {/* Top Holographic Laser Sweep */}
            <div className="sovereign-laser-sweep" />

            {/* Drawer Top Navigation Header */}
            <div className="bg-obsidian-900/90 px-5 py-4 border-b border-cyan-500/25 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-obsidian-950 border border-purple-500/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(192,132,252,0.3)] shrink-0">
                  <img
                    src="/logos/noorix.webp"
                    alt="NOORIX Crest"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm tracking-wide">
                      {isFullScreen ? 'NOORIX COMMAND BRIDGE • FULL ARSENAL' : 'NOORIX EXECUTIVE HUD'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Office of Noorish Sabah, PAS • 24/7 Policy Briefings & Institutional Archives
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Fullscreen Bridge Toggle */}
                <button
                  onClick={() => {
                    audioEngine.playTactileClick();
                    setIsFullScreen(prev => !prev);
                  }}
                  className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                  aria-label={isFullScreen ? "Exit Fullscreen Bridge" : "Enter Fullscreen Command Bridge"}
                  title={isFullScreen ? "Exit Fullscreen Bridge (ESC)" : "Fullscreen Command Bridge"}
                >
                  {isFullScreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-rose-400 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close HUD"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Body Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <NoorixChatCockpit visitor={visitor} compact={!isFullScreen} />
            </div>

            {/* Drawer Footer Notice */}
            <div className="px-5 py-2.5 bg-obsidian-900/80 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Departmental Registry & Google Search Grounded</span>
              </div>
              <span className="hidden sm:inline">
                {isFullScreen ? 'Press ESC to exit Fullscreen Bridge' : 'Press ESC to dismiss'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
