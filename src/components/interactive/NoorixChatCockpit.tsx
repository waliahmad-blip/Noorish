import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, ArrowRight, Copy, Check, Globe, 
  Trash2, Terminal, Zap, Shield, Bot
} from 'lucide-react';
import { audioEngine } from '../../utils/audioSynth';
import { VisitorRecord } from '../../utils/visitorTelemetry';
import { 
  SOVEREIGN_DISPATCHES, 
  evaluateSovereignQuery, 
  DispatchMode 
} from '../../config/noorixSystemPrompt';
import { ThinkingOrb } from './ThinkingOrb';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'noorix';
  text: string;
  timestamp: string;
  mode?: DispatchMode;
  role?: string;
  title?: string;
  isLiveCloudInference?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'noorix',
    text: "Assalam o Alaikum. I am Noorix, executive assistant to Noorish Sabah, PAS (Director, Pakistan Sports Board, Punjab).\n\nI can brief you on her 13-year civil service trajectory, oversight of 119 sports complexes across Punjab, the 2026 Integrated National Sports Model, KMC ghost-payroll audits, the Hafizabad Child Protection Model, and multilateral distinctions with the IMF and MIT.\n\nHow may I assist you today?",
    timestamp: 'Just now',
    mode: 'STATECRAFT',
    role: 'Executive Assistant',
    title: 'Office of the Director, Pakistan Sports Board'
  }
];

export const PROMPT_SUGGESTIONS = [
  { label: '🏛️ 2026 Sports Model', query: 'Tell me about the 2026 Integrated National Sports Model and PSB facilities' },
  { label: '🌿 Hafizabad Child Model', query: 'Explain the landmark Hafizabad Child Protection Model' },
  { label: '📈 KMC Ghost-Payroll Reforms', query: 'How did Noorish Sabah eliminate ghost payrolls at KMC Karachi?' },
  { label: '🎓 IMF Distinctions & MIT DEDP', query: "What are Noorish Sabah's multilateral distinctions with the IMF and MIT?" },
  { label: '🔗 Official Channels', query: 'What are the verified official social accounts and contacts for Noorish Sabah?' }
];

interface NoorixChatCockpitProps {
  visitor?: VisitorRecord | null;
  compact?: boolean;
  className?: string;
}

export const NoorixChatCockpit: React.FC<NoorixChatCockpitProps> = ({
  visitor,
  compact = false,
  className = ''
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activeMode, setActiveMode] = useState<DispatchMode>('STATECRAFT');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleCopy = (id: string, text: string) => {
    audioEngine.playTactileClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleModeSwitch = (mode: DispatchMode) => {
    audioEngine.playTactileClick();
    setActiveMode(mode);
    const dispatch = SOVEREIGN_DISPATCHES[mode];
    const newMsg: ChatMessage = {
      id: `noorix-${Date.now()}`,
      sender: 'noorix',
      text: dispatch.response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: dispatch.mode,
      role: dispatch.role,
      title: dispatch.title,
      isLiveCloudInference: dispatch.isLiveCloudInference
    };
    setMessages((prev) => [...prev, newMsg]);
  };


  const executeQuery = async (queryText: string) => {
    if (!queryText.trim() || isProcessing) return;
    audioEngine.playTactileClick();
    const input = queryText.trim();

    if (input.toLowerCase() === '/clear' || input.toLowerCase() === '/reset') {
      setMessages(INITIAL_MESSAGES);
      setQueryInput('');
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQueryInput('');
    setIsProcessing(true);

    try {
      const dispatch = await evaluateSovereignQuery(input, visitor);
      setActiveMode(dispatch.mode);
      const noorixMsg: ChatMessage = {
        id: `noorix-${Date.now()}`,
        sender: 'noorix',
        text: dispatch.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: dispatch.mode,
        role: dispatch.role,
        title: dispatch.title,
        isLiveCloudInference: dispatch.isLiveCloudInference
      };
      setMessages((prev) => [...prev, noorixMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(queryInput);
  };

  const commandModes: { mode: DispatchMode; label: string; tag: string }[] = [
    { mode: 'STATECRAFT', label: '/statecraft', tag: 'Statecraft' },
    { mode: 'MACRO_FISCAL', label: '/macro-fiscal', tag: 'IMF ESRx' },
    { mode: 'MIT_DEDP', label: '/dedp-policy', tag: 'MIT DEDP' },
    { mode: 'AI_GOVERNANCE', label: '/ai-governance', tag: 'EU AI Act' },
    { mode: 'NOORIVA_COMMERCE', label: '/nooriva', tag: 'nooriva.ai' },
    { mode: 'ENCLAVE_SECURITY', label: '/official-record', tag: 'Verified' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Knowledge Modes Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {commandModes.map((item) => {
          const isActive = activeMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => handleModeSwitch(item.mode)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all flex items-center gap-1.5 shadow-sm ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-semibold ring-1 ring-cyan-500/40'
                  : 'bg-obsidian-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50'
              }`}
            >
              <Terminal className={`w-3 h-3 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Multi-Turn Chat Bubble Stream */}
      <div className={`rounded-2xl bg-obsidian-950/95 border border-cyan-500/30 p-4 sm:p-5 space-y-4 overflow-y-auto ${
        compact ? 'max-h-[380px]' : 'max-h-[480px]'
      }`}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 px-1">
                {isUser ? (
                  <>
                    <span>{msg.timestamp}</span>
                    <span className="text-cyan-400 font-bold">You</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                      <span>NOORIX</span>
                    </div>
                    {msg.role && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {msg.role}
                      </span>
                    )}
                    {msg.isLiveCloudInference && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-mint-500/10 text-mint-400 border border-mint-500/30 flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        Search Grounded
                      </span>
                    )}
                    <span className="text-slate-500">•</span>
                    <span>{msg.timestamp}</span>
                  </>
                )}
              </div>

              <div
                className={`rounded-2xl p-4 sm:p-5 max-w-[90%] sm:max-w-[85%] text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-950/70 to-obsidian-900 border border-cyan-500/40 text-slate-100 font-sans'
                    : 'bg-obsidian-900/90 border border-cyan-500/25 text-slate-200 font-sans relative group'
                }`}
              >
                {msg.title && (
                  <div className="text-xs font-mono uppercase text-violet-400 tracking-wider mb-2 font-semibold border-b border-slate-800 pb-1.5">
                    [{msg.title}]
                  </div>
                )}
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-[10px] text-slate-500 truncate">
                      Office of Noorish Sabah, PAS
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors p-1"
                      title="Copy brief"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-mint-400" />
                          <span className="text-mint-400 text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Animated Thinking State */}
        <ThinkingOrb isProcessing={isProcessing} />

        <div ref={chatEndRef} />
      </div>


      {/* Suggested Prompt Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Suggested Briefing Topics:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {PROMPT_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => executeQuery(item.query)}
              disabled={isProcessing}
              className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-slate-800 hover:border-cyan-400/60 text-slate-300 hover:text-white text-[11px] font-mono transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-2.5 h-2.5 text-cyan-400 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Input Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="Ask Noorix about sports governance, public reforms, or economic policy..."
          disabled={isProcessing}
          className="flex-1 bg-obsidian-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isProcessing || !queryInput.trim()}
          className="px-4 sm:px-5 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-obsidian-950 font-bold rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-cyan-500/30 shrink-0"
        >
          <span>{isProcessing ? 'Synthesizing...' : 'Inquire'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

