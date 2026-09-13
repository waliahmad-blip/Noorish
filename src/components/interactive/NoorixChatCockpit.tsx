import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, ArrowRight, Copy, Check, Globe, 
  Terminal, Shield, Volume2, VolumeX, Mic, MicOff,
  RotateCcw, Lock, Mail, Phone
} from 'lucide-react';
import { audioEngine } from '../../utils/audioSynth';
import { VisitorRecord } from '../../utils/visitorTelemetry';
import { 
  SOVEREIGN_DISPATCHES, 
  evaluateSovereignQuery, 
  DispatchMode 
} from '../../config/noorixSystemPrompt';
import { ThinkingOrb } from './ThinkingOrb';
import { NoorixLockoutCard } from './NoorixLockoutCard';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'noorix';
  text: string;
  timestamp: string;
  mode?: DispatchMode;
  role?: string;
  title?: string;
  isLiveCloudInference?: boolean;
  hasVoiceBrief?: boolean;
}

const MAX_SESSION_QUERIES = 5;
const STORAGE_KEY_QUERY_COUNT = 'noorix_session_query_count';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'noorix',
    text: "Assalam o Alaikum. I am Noorix, executive assistant and digital guardian to Noorish Sabah, PAS (Director, Pakistan Sports Board, Punjab).\n\nI can brief you on her 13-year civil service trajectory, oversight of 119 sports complexes across Punjab, the 2026 Integrated National Sports Model, KMC ghost-payroll audits, the Hafizabad Child Protection Model, and multilateral distinctions with the IMF and MIT.\n\nHow may I assist you today?",
    timestamp: 'Just now',
    mode: 'STATECRAFT',
    role: 'Executive Assistant & Digital Guardian',
    title: 'Office of the Director, Pakistan Sports Board',
    hasVoiceBrief: true
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

  // 5-Query Quota Tracking
  const [queryCount, setQueryCount] = useState<number>(0);
  const [isPrivileged, setIsPrivileged] = useState<boolean>(false);

  // Audio & Speech Synthesis States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListeningSpeech, setIsListeningSpeech] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // References
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognizerRef = useRef<any>(null);

  // Initialize Quota & Sovereign Clearance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCount = parseInt(sessionStorage.getItem(STORAGE_KEY_QUERY_COUNT) || '0', 10);
      setQueryCount(isNaN(savedCount) ? 0 : savedCount);

      const clearance = sessionStorage.getItem('noorish_sovereign_clearance');
      if (clearance === 'SOVEREIGN_PRIME') {
        setIsPrivileged(true);
      }

      // Check browser speech recognition support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognizer = new SpeechRecognition();
        recognizer.continuous = false;
        recognizer.interimResults = false;
        recognizer.lang = 'en-US';

        recognizer.onresult = (event: any) => {
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript) {
            setQueryInput(prev => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListeningSpeech(false);
        };

        recognizer.onerror = () => {
          setIsListeningSpeech(false);
        };

        recognizer.onend = () => {
          setIsListeningSpeech(false);
        };

        speechRecognizerRef.current = recognizer;
      }
    }
  }, []);

  // Internal smooth container-level scroll (PREVENTS WINDOW DISPLACEMENT)
  const scrollToContainerBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only scroll internally when message count changes or thinking begins
    scrollToContainerBottom();
  }, [messages.length, isProcessing]);

  // Audio Voice Sample Toggle
  const toggleVoiceSample = () => {
    audioEngine.playTactileClick();
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/noorix_voice.mp3');
      audioRef.current.onended = () => setIsPlayingAudio(false);
      audioRef.current.onerror = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Microphone Speech Recognition Toggle
  const toggleSpeechRecognition = () => {
    audioEngine.playTactileClick();
    if (!speechRecognizerRef.current) return;

    if (isListeningSpeech) {
      speechRecognizerRef.current.stop();
      setIsListeningSpeech(false);
    } else {
      try {
        speechRecognizerRef.current.start();
        setIsListeningSpeech(true);
      } catch {
        setIsListeningSpeech(false);
      }
    }
  };

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

  const isQuotaExhausted = !isPrivileged && queryCount >= MAX_SESSION_QUERIES;
  const remainingQueries = Math.max(0, MAX_SESSION_QUERIES - queryCount);

  const resetVisitorQuota = () => {
    audioEngine.playTactileClick();
    sessionStorage.removeItem(STORAGE_KEY_QUERY_COUNT);
    setQueryCount(0);
    setMessages(INITIAL_MESSAGES);
  };

  const executeQuery = async (queryText: string) => {
    if (!queryText.trim() || isProcessing) return;

    const input = queryText.trim();

    if (input.toLowerCase() === '/clear' || input.toLowerCase() === '/reset') {
      resetVisitorQuota();
      setQueryInput('');
      return;
    }

    // Rate Limit Guard
    if (isQuotaExhausted) {
      audioEngine.playTactileClick();
      return;
    }

    audioEngine.playTactileClick();

    // Increment and record quota
    if (!isPrivileged) {
      const nextCount = queryCount + 1;
      setQueryCount(nextCount);
      sessionStorage.setItem(STORAGE_KEY_QUERY_COUNT, String(nextCount));
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
        role: dispatch.role || 'Executive Assistant & Digital Guardian',
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
      {/* Knowledge Modes Switcher Bar & Rate Quota Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <div className="flex flex-wrap items-center gap-1.5">
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

        {/* Dynamic Security Clearance & Rate Quota Indicator */}
        <div className="flex items-center gap-2">
          {isPrivileged ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-mono flex items-center gap-1.5 font-bold shadow-sm">
              <Shield className="w-3 h-3 text-amber-400" />
              SOVEREIGN PRIME • UNLIMITED
            </span>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-900 border border-slate-800 text-[10px] font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${
                remainingQueries > 2 ? 'bg-mint-400' : remainingQueries > 0 ? 'bg-amber-400 animate-pulse' : 'bg-rose-500'
              }`} />
              <span className="text-slate-400">Clearance Quota:</span>
              <span className={`font-bold ${
                remainingQueries > 2 ? 'text-mint-400' : remainingQueries > 0 ? 'text-amber-300' : 'text-rose-400'
              }`}>
                {remainingQueries}/{MAX_SESSION_QUERIES}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Turn Chat Bubble Stream (Container-Scoped Scrolling) */}
      <div 
        ref={messagesContainerRef}
        className={`rounded-2xl bg-obsidian-950/95 border border-cyan-500/30 p-4 sm:p-5 space-y-4 overflow-y-auto scroll-smooth ${
          compact ? 'max-h-[380px]' : 'max-h-[500px]'
        }`}
      >
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
                className={`rounded-2xl p-4 sm:p-5 max-w-[92%] sm:max-w-[85%] text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-950/70 to-obsidian-900 border border-cyan-500/40 text-slate-100 font-sans'
                    : 'bg-obsidian-900/95 border border-cyan-500/25 text-slate-200 font-sans relative group'
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
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 truncate">
                        Office of Noorish Sabah, PAS
                      </span>

                      {/* Authentic Voice Sample Audio Trigger */}
                      {msg.hasVoiceBrief && (
                        <button
                          onClick={toggleVoiceSample}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all ${
                            isPlayingAudio 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                              : 'bg-obsidian-900 border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:text-white'
                          }`}
                          title="Listen to authentic Noorix Voice Briefing"
                        >
                          {isPlayingAudio ? (
                            <>
                              <VolumeX className="w-3 h-3 text-cyan-300" />
                              <span>Pause Audio</span>
                              <span className="flex items-end gap-0.5 h-2.5 ml-1">
                                <span className="w-0.5 bg-cyan-400 h-2 animate-pulse" />
                                <span className="w-0.5 bg-mint-400 h-3 animate-pulse [animation-duration:500ms]" />
                                <span className="w-0.5 bg-violet-400 h-1.5 animate-pulse [animation-duration:350ms]" />
                              </span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-cyan-400" />
                              <span>Listen to Voice Brief</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

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

        {/* Animated Sine-Wave Thinking Indicator */}
        <ThinkingOrb isProcessing={isProcessing} />
      </div>


      {/* Suggested Prompt Chips (Hidden when quota exhausted) */}
      {!isQuotaExhausted && (
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
      )}

      {/* 5-Query Lockout Holographic Security Card vs Terminal Glass Input */}
      {isQuotaExhausted ? (
        <NoorixLockoutCard onReset={resetVisitorQuota} />
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={isListeningSpeech ? "Listening... Speak now..." : "Ask Noorix about sports governance, public reforms, or economic policy..."}
              disabled={isProcessing}
              className={`w-full bg-obsidian-950/80 backdrop-blur-xl border rounded-xl px-4 py-3.5 pr-11 text-xs font-mono text-white placeholder-slate-500 transition-all focus:outline-none ${
                isListeningSpeech 
                  ? 'border-rose-500 ring-2 ring-rose-500/30'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30'
              } disabled:opacity-50`}
            />

            {speechSupported && (
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                disabled={isProcessing}
                className={`absolute right-2.5 p-1.5 rounded-lg transition-all ${
                  isListeningSpeech
                    ? 'text-rose-400 bg-rose-500/20 animate-pulse ring-1 ring-rose-500'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
                title={isListeningSpeech ? "Stop voice dictation" : "Dictate query with voice"}
              >
                {isListeningSpeech ? (
                  <MicOff className="w-4 h-4 text-rose-400" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing || !queryInput.trim()}
            className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-mint-400 hover:from-cyan-400 hover:to-mint-300 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-obsidian-950 font-bold rounded-xl font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/30 shrink-0"
          >
            <span>{isProcessing ? 'Synthesizing...' : 'Inquire'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};

