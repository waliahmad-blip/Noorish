import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldCheck, Crown, Radio, Lock, BookOpen
} from 'lucide-react';
import { HER_DECLARATION, CONTENT_PILLARS } from '../../data';
import { audioEngine } from '../../utils/audioSynth';
import { 
  initializeVisitorTelemetry, 
  subscribeToVisitorTelemetry, 
  VisitorRecord,
  checkSovereignClearance,
  revokeSovereignClearance,
  getSovereignAuditLedger
} from '../../utils/visitorTelemetry';
import { fetchRecentTelemetryFromSupabase, RemoteTelemetryRecord } from '../../config/supabase';
import { NoorixChatCockpit } from './NoorixChatCockpit';
import { TerminalRadarDeck } from './TerminalRadarDeck';
import { TerminalAuthModal } from './TerminalAuthModal';

export const NoorixTerminal: React.FC = () => {
  const [visitor, setVisitor] = useState<VisitorRecord | null>(null);
  const [isSovereignPrime, setIsSovereignPrime] = useState(false);
  const [showLiveRadar, setShowLiveRadar] = useState(false);
  const [radarLogs, setRadarLogs] = useState<RemoteTelemetryRecord[]>([]);
  const [loadingRadar, setLoadingRadar] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check initial clearance
    const clearance = checkSovereignClearance();
    if (clearance.isAuthorized) {
      setIsSovereignPrime(true);
    }

    // 2. Initialize visitor telemetry
    initializeVisitorTelemetry().then(rec => setVisitor(rec));
    const unsubscribe = subscribeToVisitorTelemetry(rec => setVisitor(rec));

    // 3. Global Hotkey: Ctrl+Shift+S (or Cmd+Shift+S) to open Sovereign Authorization Gate
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setAuthModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleRadar = async () => {
    audioEngine.playTactileClick();
    if (!showLiveRadar) {
      setShowLiveRadar(true);
      setLoadingRadar(true);
      try {
        const records = await fetchRecentTelemetryFromSupabase(25);
        if (records.length > 0) {
          setRadarLogs(records);
        } else {
          const local = getSovereignAuditLedger();
          setRadarLogs(local.map(l => ({
            session_id: l.sessionId,
            timestamp: l.timestamp,
            raw_ip: l.rawIp,
            ip_hash: l.ipHash,
            fingerprint_hash: l.fingerprintHash,
            session_audit_token: l.sessionAuditToken,
            user_agent: l.userAgent,
            screen_resolution: l.screenResolution,
            timezone: l.timezone,
            platform: l.platform,
            language: l.language,
            referrer: l.referrer,
            hardware_concurrency: l.hardwareConcurrency,
            device_memory: l.deviceMemory,
            gpu_renderer: l.gpuRenderer,
            gpu_vendor: l.gpuVendor,
            audio_dac_hash: l.audioDacHash,
            bot_threat_score: l.botThreatScore,
            bot_threat_category: l.botThreatCategory,
            security_ring: l.securityRing,
            clearance_status: l.clearanceStatus,
            isp: l.isp,
            asn: l.asn,
            city: l.city,
            country: l.country
          })));
        }
      } finally {
        setLoadingRadar(false);
      }
    } else {
      setShowLiveRadar(false);
    }
  };
  return (
    <section id="noorix" className="py-16 bg-obsidian-950 text-slate-100 border-y border-cyan-500/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        
        {/* Header & Declaration */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/30">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXECUTIVE ADVISOR • AUTONOMOUS KNOWLEDGE ENGINE • OFFICE OF NOORISH SABAH, PAS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            NOORIX: The Executive Intelligence Terminal
          </h2>

          <div className="glass-quantum rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-3">
            <p className="font-sans text-base sm:text-lg italic text-slate-200 leading-relaxed">
              &ldquo;{HER_DECLARATION.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{HER_DECLARATION.author} • Verified Executive Authority</span>
            </div>
          </div>
        </div>

        {/* Sovereign Prime Recognition Crest */}
        {isSovereignPrime && (
          <div className="glass-quantum rounded-2xl p-4 sm:p-5 border border-cyan-400 bg-gradient-to-r from-cyan-950/40 via-obsidian-900 to-amber-950/20 text-xs font-mono space-y-3 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm tracking-wider flex items-center gap-2">
                    SOVEREIGN RECOGNITION CONFIRMED • CLEARANCE: RING-0 PRIME
                  </div>
                  <div className="text-slate-300 text-xs">
                    Principals: <strong className="text-amber-300">Commander Wali & Noorish Sabah, PAS</strong>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleRadar}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{showLiveRadar ? 'Close Radar' : 'Open Radar (Supabase)'}</span>
                </button>
                <button
                  onClick={() => {
                    revokeSovereignClearance();
                    setIsSovereignPrime(false);
                    setShowLiveRadar(false);
                  }}
                  title="Switch to public guest view"
                  className="px-2 py-1.5 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                >
                  Relinquish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Radar Deck (Unlocked for Sovereign Prime) */}
        <TerminalRadarDeck
          isOpen={showLiveRadar}
          onClose={() => setShowLiveRadar(false)}
          radarLogs={radarLogs}
          loadingRadar={loadingRadar}
        />

        {/* Cryptographically Attested Executive Terminal HUD */}
        <div className="glass-quantum rounded-2xl border border-cyan-500/40 overflow-hidden shadow-2xl relative hud-brackets">
          {/* Top Holographic Laser Sweep */}
          <div className="sovereign-laser-sweep" />

          <div className="bg-obsidian-900 px-5 py-3 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-obsidian-950 border border-purple-500/40 flex items-center justify-center p-0.5 shadow-sm">
                <img 
                  src="/logos/small/noorix.png" 
                  alt="NOORIX" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(192,132,252,0.8)]"
                />
              </div>
              <span className="text-white font-bold tracking-wider">NOORIX EXECUTIVE TERMINAL</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/40">
                ACTIVE KERNEL
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-mint-400" />
                <span className="text-slate-300">Principal: <strong className="text-white">Noorish Sabah, PAS</strong></span>
              </div>
            </div>
          </div>

          {/* Main Conversational Cockpit */}
          <div className="p-4 sm:p-6">
            <NoorixChatCockpit visitor={visitor} />
          </div>
        </div>


        {/* The 7 Content Pillars */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 text-xs font-mono text-violet-400 border border-violet-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>THE 7 CONTENT PILLARS • BI-WEEKLY PUBLICATION CADENCE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTENT_PILLARS.map((p) => (
              <div key={p.number} className="glass-quantum rounded-xl p-5 border border-cyan-500/20 space-y-2 hover:border-cyan-400/50 transition-all">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>PILLAR 0{p.number}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">{p.format}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.summary}</p>
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800">
                  {p.topics.slice(0, 2).map((t, tidx) => (
                    <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-900 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sovereign Prime Authorization Gate Modal (Ctrl+Shift+S) */}
        <TerminalAuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => setIsSovereignPrime(true)}
        />

      </div>
    </section>
  );
};

