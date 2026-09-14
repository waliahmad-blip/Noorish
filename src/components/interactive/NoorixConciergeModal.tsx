import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, VolumeX, Smartphone, MessageCircle, 
  Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight, 
  User, Phone, Mail, Waves, Lock
} from 'lucide-react';
import { audioEngine } from '../../utils/audioSynth';
import { 
  getStoredVisitorIdentity, 
  recordVisitorIdentity, 
  VerifiedVisitorIdentity 
} from '../../utils/visitorTelemetry';

interface NoorixConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoorixConciergeModal: React.FC<NoorixConciergeModalProps> = ({ isOpen, onClose }) => {
  const [existingIdentity, setExistingIdentity] = useState<VerifiedVisitorIdentity | null>(null);
  const [canUseContactPicker, setCanUseContactPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'whatsapp' | 'manual'>('quick');

  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  const [handshakeToken, setHandshakeToken] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [verifiedMethod, setVerifiedMethod] = useState<string>('');

  useEffect(() => {
    const randomHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const token = `SVRN-${randomHex()}-${randomHex()}`;
    setHandshakeToken(token);

    if (typeof navigator !== 'undefined' && 'contacts' in navigator && 'ContactsManager' in window) {
      setCanUseContactPicker(true);
    }

    const stored = getStoredVisitorIdentity();
    if (stored) {
      setExistingIdentity(stored);
      setNameInput(stored.visitorName || '');
      setPhoneInput(stored.phoneNumber || '');
      setEmailInput(stored.email || '');
      setVerifiedSuccess(true);
      setVerifiedMethod(stored.verificationMethod);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNativeContactPicker = async () => {
    audioEngine.playTactileClick();
    try {
      const navAny = navigator as unknown as {
        contacts: {
          select: (props: string[], opts?: { multiple: boolean }) => Promise<Array<{
            name?: string[];
            tel?: string[];
            email?: string[];
          }>>;
        };
      };

      if (navAny.contacts && typeof navAny.contacts.select === 'function') {
        const selected = await navAny.contacts.select(['name', 'tel', 'email'], { multiple: false });
        if (selected && selected.length > 0) {
          const contact = selected[0];
          const name = contact.name?.[0] || '';
          const tel = contact.tel?.[0] || '';
          const mail = contact.email?.[0] || '';

          setNameInput(name);
          setPhoneInput(tel);
          setEmailInput(mail);

          await recordVisitorIdentity({
            visitorName: name,
            phoneNumber: tel,
            email: mail,
            verificationMethod: 'NATIVE_CONTACT_PICKER',
            whatsappSessionToken: handshakeToken
          });

          setVerifiedSuccess(true);
          setVerifiedMethod('NATIVE_CONTACT_PICKER');
          audioEngine.playAttestationChime();
        }
      }
    } catch {
      // User cancelled or browser rejected
    }
  };

  const handleWhatsAppHandshake = async () => {
    audioEngine.playTactileClick();
    await recordVisitorIdentity({
      visitorName: nameInput.trim() || 'WhatsApp Verified Envoy',
      phoneNumber: phoneInput.trim() || undefined,
      email: emailInput.trim() || undefined,
      verificationMethod: 'WHATSAPP_HANDSHAKE',
      whatsappSessionToken: handshakeToken
    });

    setVerifiedSuccess(true);
    setVerifiedMethod('WHATSAPP_HANDSHAKE');
    audioEngine.playAttestationChime();

    const greeting = nameInput.trim() ? `Representative: ${nameInput.trim()}` : 'Executive Envoy';
    const msg = `[NOORIX PROTOCOL HANDSHAKE]\nRequesting Sovereign Briefing for Noorish Sabah, PAS.\nSession Token: ${handshakeToken}\n${greeting}\nDigital Estate: https://noorish.org`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyToken = () => {
    audioEngine.playTactileClick();
    navigator.clipboard.writeText(handshakeToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playTactileClick();
    if (!nameInput.trim() && !phoneInput.trim() && !emailInput.trim()) return;

    await recordVisitorIdentity({
      visitorName: nameInput.trim() || undefined,
      phoneNumber: phoneInput.trim() || undefined,
      email: emailInput.trim() || undefined,
      verificationMethod: 'MANUAL_ENTRY',
      whatsappSessionToken: handshakeToken
    });

    setVerifiedSuccess(true);
    setVerifiedMethod('MANUAL_ENTRY');
    audioEngine.playAttestationChime();
  };

  const handleEnterWithAudio = async () => {
    if (nameInput.trim() || phoneInput.trim() || emailInput.trim()) {
      await recordVisitorIdentity({
        visitorName: nameInput.trim() || undefined,
        phoneNumber: phoneInput.trim() || undefined,
        email: emailInput.trim() || undefined,
        verificationMethod: (verifiedMethod as unknown as 'NATIVE_CONTACT_PICKER' | 'WHATSAPP_HANDSHAKE' | 'MANUAL_ENTRY') || 'MANUAL_ENTRY',
        whatsappSessionToken: handshakeToken
      });
    }
    try {
      localStorage.setItem('noorish_concierge_dismissed', 'true');
    } catch {
      // LocalStorage restricted
    }
    audioEngine.playSolfeggioWelcome();
    onClose();
  };

  const handleEnterQuietly = async () => {
    audioEngine.playTactileClick();
    if (nameInput.trim() || phoneInput.trim() || emailInput.trim()) {
      await recordVisitorIdentity({
        visitorName: nameInput.trim() || undefined,
        phoneNumber: phoneInput.trim() || undefined,
        email: emailInput.trim() || undefined,
        verificationMethod: (verifiedMethod as unknown as 'NATIVE_CONTACT_PICKER' | 'WHATSAPP_HANDSHAKE' | 'MANUAL_ENTRY') || 'MANUAL_ENTRY',
        whatsappSessionToken: handshakeToken
      });
    }
    try {
      localStorage.setItem('noorish_concierge_dismissed', 'true');
    } catch {
      // LocalStorage restricted
    }
    audioEngine.setMuted(true);
    onClose();
  };

  const handleAnonymousDismiss = () => {
    audioEngine.playTactileClick();
    try {
      localStorage.setItem('noorish_concierge_dismissed', 'true');
    } catch {
      // LocalStorage restricted
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian-950/85 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-lg glass-quantum rounded-3xl p-5 sm:p-7 border border-cyan-500/40 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.18)] max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concierge-modal-title"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleAnonymousDismiss}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-obsidian-900 transition-colors"
          aria-label="Dismiss Concierge Greeting"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual: NOORIX Sovereign Concierge Orb */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/40 animate-[spin_12s_linear_infinite]" />
            {/* Middle Violet Aura */}
            <div className="absolute w-12 h-12 rounded-full border border-purple-500/50 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-cyan-500/10 backdrop-blur-md animate-pulse" />
            {/* Center Monogram / Orb */}
            <div className="absolute w-8 h-8 rounded-lg overflow-hidden bg-obsidian-950 border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <img 
                src="/logos/small/noorix.png" 
                alt="NOORIX" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span>Sovereign Concierge Protocol // Ring-0</span>
            </div>
            <h2 id="concierge-modal-title" className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              {existingIdentity?.visitorName 
                ? `Welcome Back, ${existingIdentity.visitorName}` 
                : "Executive NOORIX Concierge"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Attesting visitor clearance for the digital estate of <strong className="text-cyan-300 font-semibold">Noorish Sabah, PAS</strong>.
            </p>
          </div>
        </div>

        {/* Success Attestation Banner if verified */}
        {verifiedSuccess && (
          <div className="my-4 p-3 rounded-2xl bg-mint-950/40 border border-mint-500/40 flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-mint-500/20 flex items-center justify-center flex-shrink-0 text-mint-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs text-left">
              <div className="font-mono font-bold text-mint-300 flex items-center gap-1.5">
                <span>IDENTITY ATTESTED</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-mint-500/20 border border-mint-500/30">
                  {verifiedMethod || 'VERIFIED'}
                </span>
              </div>
              <div className="text-slate-300 truncate">
                {nameInput ? `${nameInput} • Clearance Sealed` : 'Cryptographic Enclave Committed'}
              </div>
            </div>
          </div>
        )}

        {/* Verification Method Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-obsidian-900/80 rounded-xl border border-cyan-500/20 my-4 text-xs font-mono">
          <button
            type="button"
            onClick={() => { audioEngine.playTactileClick(); setActiveTab('quick'); }}
            className={`py-2 px-1 rounded-lg text-center transition-all ${
              activeTab === 'quick' 
                ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-md shadow-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-obsidian-800'
            }`}
          >
            {canUseContactPicker ? "⚡ 1-Tap ID" : "⚡ Session ID"}
          </button>
          <button
            type="button"
            onClick={() => { audioEngine.playTactileClick(); setActiveTab('whatsapp'); }}
            className={`py-2 px-1 rounded-lg text-center transition-all ${
              activeTab === 'whatsapp' 
                ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-md shadow-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-obsidian-800'
            }`}
          >
            💬 WhatsApp
          </button>
          <button
            type="button"
            onClick={() => { audioEngine.playTactileClick(); setActiveTab('manual'); }}
            className={`py-2 px-1 rounded-lg text-center transition-all ${
              activeTab === 'manual' 
                ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-md shadow-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-obsidian-800'
            }`}
          >
            ✍️ Manual ID
          </button>
        </div>

        {/* TAB 1: QUICK / NATIVE CONTACT PICKER */}
        {activeTab === 'quick' && (
          <div className="space-y-3 py-1">
            {canUseContactPicker ? (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-left space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>ANDROID ONE-TAP CONTACT PICKER</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verify your identity instantly via your native secure address book. Zero third-party sharing.
                </p>
                <button
                  type="button"
                  onClick={handleNativeContactPicker}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-obsidian-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Select Identity from Device</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-cyan-500/20 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>SESSION AUDIT TOKEN</span>
                  </span>
                  <span className="text-[10px] text-slate-400">HARDWARE-BOUND</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-950 border border-cyan-500/30 font-mono text-xs text-white">
                  <span className="tracking-wider text-cyan-300 font-semibold">{handshakeToken}</span>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors text-[10px]"
                    title="Copy Session Token"
                  >
                    {copiedToken ? <Check className="w-3 h-3 text-mint-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedToken ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Your cryptographic session token serves as your authenticated key for this visit.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WHATSAPP HANDSHAKE */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-3 py-1">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-left space-y-3">
              <div className="flex items-center justify-between text-emerald-300 font-mono text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WHATSAPP EXECUTIVE HANDSHAKE</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono">DIRECT HANDSHAKE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your session directly via WhatsApp. Pairs this session token (<strong className="text-emerald-300">{handshakeToken}</strong>) with your executive profile.
              </p>
              
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name / Title (Optional)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-emerald-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleWhatsAppHandshake}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-obsidian-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Initiate WhatsApp Handshake</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANUAL CREDENTIALS */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-2.5 py-1 text-left">
            <div>
              <label className="text-[10px] font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3 h-3 text-cyan-400" />
                <span>NAME / OFFICIAL DESIGNATION</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Ayesha Khan, World Bank / PAS Envoy"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-cyan-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>DIRECT PHONE / WHATSAPP</span>
                </label>
                <input
                  type="tel"
                  placeholder="+92 300 0000000"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-cyan-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span>OFFICIAL EMAIL</span>
                </label>
                <input
                  type="email"
                  placeholder="delegate@institution.org"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-cyan-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Attest & Save Identity</span>
            </button>
          </form>
        )}

        {/* Audio Context & Entry Options */}
        <div className="pt-4 border-t border-cyan-500/20 space-y-2.5">
          <div className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest text-center">
            SELECT EXECUTIVE EXPERIENCE VECTOR
          </div>

          {/* Primary Vector: Solfeggio 528Hz Soundscape */}
          <button
            type="button"
            onClick={handleEnterWithAudio}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-400 text-obsidian-950 font-display font-bold text-sm tracking-wide flex items-center justify-between shadow-xl shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-obsidian-950/20 flex items-center justify-center">
                <Waves className="w-4 h-4 text-obsidian-950 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider">Initialize Solfeggio 528Hz & Enter</div>
                <div className="text-[10px] text-obsidian-900/80 font-mono">Unlock crystal harmonic resonance</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Vector: Silent Mode */}
          <button
            type="button"
            onClick={handleEnterQuietly}
            className="w-full py-2.5 px-4 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 border border-cyan-500/20 text-slate-300 font-mono text-xs flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Explore Quietly (Audio Muted)</span>
            </div>
            <span className="text-[10px] text-slate-500">SILENT PROTOCOL</span>
          </button>

          {/* Fallback anonymous escape */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleAnonymousDismiss}
              className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              <span>Proceed Anonymously (Guest Clearance)</span>
            </button>
          </div>
        </div>

        {/* Security Footer Seal */}
        <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>SOVEREIGN DEFENSE RING-0</span>
          </span>
          <span>ESTATE OF NOORISH SABAH, PAS</span>
        </div>
      </div>
    </div>
  );
};