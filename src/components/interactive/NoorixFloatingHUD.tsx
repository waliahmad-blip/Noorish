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
      {/* Floating HUD Launcher Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            onClick={toggleOpen}
            aria-label="Ask Noorix AI"
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-obsidian-950/90 border border-cyan-400 text-slate-100 shadow-2xl backdrop-blur-xl hover:border-cyan-300 hover:scale-105 transition-all duration-300"
          >
            {/* Glowing Neural Dot */}
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative" />
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-display font-bold text-xs tracking-wide text-white">Ask Noorix</span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Active
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
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4 text-cyan-400" />
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
