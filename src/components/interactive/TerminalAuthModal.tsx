import React, { useState } from 'react';
import { Key, X } from 'lucide-react';
import { authorizeSovereignPasskey } from '../../utils/visitorTelemetry';

interface TerminalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TerminalAuthModal: React.FC<TerminalAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authStatusMsg, setAuthStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authorizeSovereignPasskey(passkeyInput);
    if (success) {
      setAuthStatusMsg('Clearance Confirmed: Welcome Commander Wali & Noorish Sabah, PAS.');
      onSuccess();
      setTimeout(() => {
        onClose();
        setPasskeyInput('');
        setAuthStatusMsg('');
      }, 900);
    } else {
      setAuthStatusMsg('Access Denied: Invalid cryptographic key.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="glass-quantum rounded-2xl p-6 border border-cyan-400 max-w-md w-full space-y-4 font-mono shadow-2xl bg-obsidian-950">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Key className="w-4 h-4 text-amber-400" />
            <span>SOVEREIGN PRIME AUTHORIZATION GATE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Enter cryptographic clearance key to unlock Sovereign Prime command deck:
        </p>

        <form onSubmit={handleAuthSubmit} className="space-y-3">
          <input
            type="password"
            value={passkeyInput}
            onChange={(e) => setPasskeyInput(e.target.value)}
            placeholder="Enter Passkey..."
            className="w-full bg-obsidian-900 border border-cyan-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            autoFocus
          />

          {authStatusMsg && (
            <div className={`text-xs ${authStatusMsg.includes('Confirmed') ? 'text-mint-400' : 'text-rose-400'}`}>
              {authStatusMsg}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-obsidian-900 text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 text-obsidian-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Authorize Gate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
