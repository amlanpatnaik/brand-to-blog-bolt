'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Globe,
  Sparkles,
  Cpu,
  Zap,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  X,
  Plus,
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  FileText,
  BookOpen,
  List,
  Link2,
  Image,
  Code2,
  ArrowLeft,
  Calendar,
  Sun,
  Gift,
  Newspaper,
} from 'lucide-react';
import { extractBrand, generateIdeas, generateArticle, checkHealth } from '@/lib/api';
import type {
  WorkflowState,
  ExtractorOutput,
  ArchitectOutput,
  BlogIdea,
  GeneratedBlog,
  LLMMode,
  RecommendedProduct,
} from '@/lib/types';

// ===================== STAR FIELD =====================

const STAR_COUNT = 160;

function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => {
      const x = (((i * 7919 + 1234) % 10000) / 100).toFixed(2);
      const y = (((i * 6271 + 5678) % 10000) / 100).toFixed(2);
      const size = i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1;
      const delay = ((i * 0.37) % 4).toFixed(2);
      const duration = (2.5 + ((i * 0.41) % 3)).toFixed(2);
      const opacity = (0.15 + ((i * 0.031) % 0.6)).toFixed(2);
      return { x, y, size, delay, duration, opacity, id: i };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[#020617]" />
      {/* Nebula orbs */}
      <div
        className="nebula-orb animate-nebula-drift"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="nebula-orb"
        style={{
          width: 500,
          height: 500,
          bottom: '10%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)',
          animation: 'nebula-drift 24s ease-in-out infinite reverse',
          animationDelay: '-8s',
        }}
      />
      <div
        className="nebula-orb"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
          animation: 'nebula-drift 20s ease-in-out infinite',
          animationDelay: '-12s',
        }}
      />
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: 'white',
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ===================== LOADING OVERLAY =====================

const LOADING_MESSAGES = [
  'Scanning destination domain',
  'Extracting brand signals',
  'Mapping category language',
  'Designing ranking architecture',
  'Building article structure',
  'Finalizing optimization layers',
  'Calibrating semantic clusters',
  'Cross-referencing intent signals',
];

function LoadingOverlay({ phase }: { phase: string }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const phaseLabel =
    phase === 'extractor'
      ? 'Brand Extraction'
      : phase === 'architect'
      ? 'Content Architecture'
      : 'Article Generation';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/90 backdrop-blur-sm">
      {/* Subtle star field inside overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 2437 % 10000) / 100}%`,
              top: `${(i * 3571 % 10000) / 100}%`,
              width: '1px',
              height: '1px',
              opacity: 0.3,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.5) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
        {/* Orbital rings */}
        <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
          <div
            className="orbit-ring absolute"
            style={{ width: 96, height: 96 }}
          />
          <div
            className="orbit-ring-2 absolute"
            style={{ width: 72, height: 72 }}
          />
          <div
            className="orbit-ring absolute"
            style={{ width: 48, height: 48, animationDuration: '0.8s' }}
          />
          <Zap className="text-cyan-400 relative z-10" size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Your AIBuddy is Working On Your Request
          </h2>
          <p className="text-cyan-400 text-sm font-medium mb-1">{phaseLabel}</p>
        </div>

        {/* Rotating message */}
        <div className="h-8 flex items-center justify-center">
          <p
            key={msgIndex}
            className="text-slate-400 text-sm animate-fade-in"
          >
            {LOADING_MESSAGES[msgIndex]}...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-full bg-cyan-500"
              style={{
                width: 6,
                height: 6,
                animation: `pulse-glow 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.28}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== TOP NAV =====================

function TopNav({
  activeProvider,
  activeModel,
  onReset,
  currentPhase,
}: {
  activeProvider: string;
  activeModel: string;
  onReset: () => void;
  currentPhase: string;
}) {
  return (
    <header className="glass-nav sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Go home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none tracking-tight">
              AIBuddy
            </span>
            <p className="text-slate-500 text-xs leading-none mt-0.5">AI Content Pipeline</p>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {activeProvider && activeModel && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-xs font-medium">
                {activeProvider} · {activeModel}
              </span>
            </div>
          )}
          {currentPhase !== 'hero' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-medium"
            >
              <ArrowLeft size={13} />
              Start Over
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ===================== PHASE PROGRESS BAR =====================

function PhaseProgress({ currentPhase }: { currentPhase: string }) {
  const phases = [
    { key: 'hero', label: 'Setup' },
    { key: 'extractor', label: 'Extract' },
    { key: 'architect', label: 'Architect' },
    { key: 'writer', label: 'Write' },
  ];
  const currentIndex = phases.findIndex((p) => p.key === currentPhase);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {phases.map((p, idx) => {
        const isActive = p.key === currentPhase;
        const isComplete = idx < currentIndex;
        return (
          <div key={p.key} className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                    : isComplete
                    ? 'bg-cyan-700'
                    : 'bg-slate-700'
                }`}
              />
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  isActive ? 'text-cyan-400' : isComplete ? 'text-slate-500' : 'text-slate-600'
                }`}
              >
                {p.label}
              </span>
            </div>
            {idx < phases.length - 1 && (
              <div
                className={`w-4 sm:w-8 h-px transition-all duration-300 ${
                  idx < currentIndex ? 'bg-cyan-700' : 'bg-slate-800'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ===================== ERROR CARD =====================

function ErrorCard({
  message,
  onRetry,
  phase,
}: {
  message: string;
  onRetry: () => void;
  phase: string;
}) {
  return (
    <div className="glass-panel border border-red-500/20 bg-red-500/5 p-6 flex flex-col items-center gap-4 text-center animate-fade-in-up">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertCircle className="text-red-400" size={22} />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">Something went wrong</h3>
        <p className="text-slate-400 text-sm max-w-md">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-medium"
      >
        <RefreshCw size={14} />
        Retry {phase}
      </button>
    </div>
  );
}

// ===================== CHIP =====================

function Chip({
  label,
  variant = 'cyan',
  onRemove,
}: {
  label: string;
  variant?: 'cyan' | 'slate' | 'teal' | 'amber';
  onRemove?: () => void;
}) {
  const styles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    slate: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    teal: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity ml-0.5"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

// ===================== COPY BUTTON =====================

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
    >
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ===================== HERO PHASE =====================

function HeroPhase({
  onSubmit,
}: {
  onSubmit: (url: string, llmMode: LLMMode, apiKey: string) => void;
}) {
  const [url, setUrl] = useState('');
  const [llmMode, setLlmMode] = useState<LLMMode | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    default_ai_available: boolean;
  } | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const isValidUrl = useMemo(() => {
    if (!url.trim()) return false;
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      return u.hostname.length > 2;
    } catch {
      return false;
    }
  }, [url]);

  const isReadyToSubmit = useMemo(() => {
    if (!isValidUrl || !llmMode) return false;
    if (llmMode === 'gemini_user' || llmMode === 'openai_user') return apiKey.trim().length > 8;
    if (llmMode === 'app_default') return healthStatus?.default_ai_available === true;
    return false;
  }, [isValidUrl, llmMode, apiKey, healthStatus]);

  const handleCheckHealth = useCallback(async () => {
    setCheckingHealth(true);
    const result = await checkHealth();
    setHealthStatus(result);
    setCheckingHealth(false);
  }, []);

  const handleSelectMode = useCallback(
    (mode: LLMMode) => {
      setLlmMode(mode);
      setApiKey('');
      if (mode === 'app_default') {
        handleCheckHealth();
      }
    },
    [handleCheckHealth]
  );

  const handleSubmit = useCallback(() => {
    if (!isReadyToSubmit || !llmMode) return;
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    onSubmit(normalizedUrl, llmMode, apiKey);
  }, [isReadyToSubmit, llmMode, url, apiKey, onSubmit]);

  const providerCards = [
    {
      mode: 'gemini_user' as LLMMode,
      icon: <Sparkles size={18} />,
      title: 'Gemini Flash',
      desc: 'Use your Gemini API key',
      model: 'gemini-1.5-flash',
      keyPlaceholder: 'AIza...',
    },
    {
      mode: 'openai_user' as LLMMode,
      icon: <Cpu size={18} />,
      title: 'OpenAI GPT',
      desc: 'Use your OpenAI API key',
      model: 'gpt-4o-mini',
      keyPlaceholder: 'sk-...',
    },
    {
      mode: 'app_default' as LLMMode,
      icon: <Zap size={18} />,
      title: 'App Default',
      desc: "Use app's built-in AI",
      model: 'Built-in',
      keyPlaceholder: '',
    },
  ];

  const featurePills = ['Brand Extraction', 'Blog Architecture', 'SEO Writing'];

  return (
    <section className="relative z-10 min-h-[calc(100vh-56px)] flex items-center py-12 px-4">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <PhaseProgress currentPhase="hero" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            From URL to{' '}
            <span className="gradient-text">Ranking-Ready</span>
            <br />
            Content
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            AIBuddy analyzes your brand URL, architects a content strategy, and writes
            fully SEO-optimized blog articles — all in minutes.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {featurePills.map((pill, i) => (
              <div
                key={pill}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 animate-fade-in"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">{pill}</span>
              </div>
            ))}
          </div>

          {/* Phase steps */}
          <div className="space-y-3">
            {[
              { n: '01', label: 'Paste your brand URL' },
              { n: '02', label: 'Choose your AI provider' },
              { n: '03', label: 'Get ranking-ready content' },
            ].map((step, i) => (
              <div
                key={step.n}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 text-xs font-bold">{step.n}</span>
                </div>
                <span className="text-slate-400 text-sm">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Input panel */}
        <div
          className="glass-panel p-6 sm:p-8 animate-slide-in-right"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-white font-semibold text-lg mb-5">Analyze Your Brand</h2>

          {/* URL input */}
          <div className="mb-5">
            <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
              Brand URL
            </label>
            <div className="relative">
              <Globe
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && isReadyToSubmit && handleSubmit()}
                placeholder="https://yourcompany.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm"
              />
              {isValidUrl && (
                <Check
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400"
                  size={14}
                />
              )}
            </div>
          </div>

          {/* LLM Mode selector */}
          <div className="mb-5">
            <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
              AI Provider
            </label>
            <div className="grid grid-cols-3 gap-2">
              {providerCards.map((card) => {
                const isSelected = llmMode === card.mode;
                return (
                  <button
                    key={card.mode}
                    onClick={() => handleSelectMode(card.mode)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                        : 'bg-white/3 border-white/8 text-slate-400 hover:border-white/20 hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`transition-colors ${
                        isSelected ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {card.icon}
                    </div>
                    <span className="text-xs font-semibold leading-tight">{card.title}</span>
                    <span className="text-[10px] leading-tight opacity-70">{card.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* API key input */}
          {(llmMode === 'gemini_user' || llmMode === 'openai_user') && (
            <div className="mb-5 animate-fade-in">
              <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
                {llmMode === 'gemini_user' ? 'Gemini' : 'OpenAI'} API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={
                    providerCards.find((c) => c.mode === llmMode)?.keyPlaceholder || ''
                  }
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-slate-600 text-[11px] mt-1.5">
                Your key is used only for this session and never stored.
              </p>
            </div>
          )}

          {/* App default availability */}
          {llmMode === 'app_default' && (
            <div className="mb-5 animate-fade-in">
              {checkingHealth ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="orbit-ring w-4 h-4" />
                  <span className="text-slate-400 text-sm">Checking availability...</span>
                </div>
              ) : healthStatus ? (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl border ${
                    healthStatus.default_ai_available
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      healthStatus.default_ai_available ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      healthStatus.default_ai_available ? 'text-green-300' : 'text-red-300'
                    }`}
                  >
                    {healthStatus.default_ai_available
                      ? 'App AI is available and ready'
                      : 'App default AI is currently unavailable'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleCheckHealth}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-300 hover:bg-white/8 transition-all text-sm"
                >
                  <RefreshCw size={13} />
                  Check availability
                </button>
              )}
            </div>
          )}

          {/* Model badge */}
          {llmMode && (
            <div className="mb-5 flex items-center gap-2">
              <span className="text-slate-600 text-xs">Model:</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                {providerCards.find((c) => c.mode === llmMode)?.model}
              </span>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isReadyToSubmit}
            className="w-full py-3.5 rounded-xl font-semibold text-white transition-all text-sm animate-pulse-glow btn-cosmic"
          >
            Analyze Brand
          </button>
        </div>
      </div>
    </section>
  );
}

// ===================== EXTRACTOR PHASE =====================

function ExtractorPhase({
  result,
  onContinue,
  onRetry,
  error,
  userKeywords,
  onKeywordsChange,
  collectionUrls,
  onCollectionUrlsChange,
}: {
  result: ExtractorOutput | null;
  onContinue: (keywords: string[], collectionUrls: string[]) => void;
  onRetry: () => void;
  error: string | null;
  userKeywords: string[];
  onKeywordsChange: (kws: string[]) => void;
  collectionUrls: string[];
  onCollectionUrlsChange: (urls: string[]) => void;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [collectionInput, setCollectionInput] = useState(collectionUrls.join(', '));

  const handleAddKeyword = useCallback(() => {
    const kw = newKeyword.trim();
    if (kw && !userKeywords.includes(kw)) {
      onKeywordsChange([...userKeywords, kw]);
    }
    setNewKeyword('');
  }, [newKeyword, userKeywords, onKeywordsChange]);

  const handleRemoveKeyword = useCallback(
    (kw: string) => {
      onKeywordsChange(userKeywords.filter((k) => k !== kw));
    },
    [userKeywords, onKeywordsChange]
  );

  if (error) {
    return (
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <ErrorCard message={error} onRetry={onRetry} phase="Brand Extraction" />
      </section>
    );
  }

  if (!result) return null;

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      {/* Phase header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PhaseProgress currentPhase="extractor" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Brand Extraction Complete
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            We've analyzed <span className="text-cyan-400">{result.brand_name}</span> and extracted
            key brand signals.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 self-start">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-cyan-300 text-xs font-medium">
            {result.provider_used} · {result.model_used}
          </span>
        </div>
      </div>

      {/* Grid of info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Brand Identity */}
        <div className="glass-panel p-5 card-hover col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Brand Identity</h3>
          </div>
          <p className="text-white font-bold text-lg mb-1">{result.brand_name}</p>
          <p className="text-slate-400 text-xs mb-2 leading-relaxed">{result.value_proposition}</p>
          <div className="mt-2">
            <span className="text-slate-600 text-xs block mb-1">Brand Voice</span>
            <span className="text-slate-300 text-xs italic">{result.brand_voice}</span>
          </div>
        </div>

        {/* Company Overview */}
        <div className="glass-panel p-5 card-hover sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Company Overview</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{result.company_summary}</p>
        </div>

        {/* Offerings */}
        <div className="glass-panel p-5 card-hover">
          <div className="flex items-center gap-2 mb-3">
            <List size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Offerings</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(result.offerings ?? []).slice(0, 8).map((o) => (
              <Chip key={o} label={o} variant="slate" />
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="glass-panel p-5 card-hover">
          <div className="flex items-center gap-2 mb-3">
            <Users size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Target Audience</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(result.audience ?? []).slice(0, 6).map((a) => (
              <Chip key={a} label={a} variant="teal" />
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div className="glass-panel p-5 card-hover">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Differentiators</h3>
          </div>
          <ul className="space-y-1.5">
            {(result.differentiators ?? []).slice(0, 5).map((d) => (
              <li key={d} className="flex items-start gap-2 text-xs text-slate-300">
                <Check size={11} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div className="glass-panel p-5 card-hover sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Target size={15} className="text-cyan-400" />
            <h3 className="text-white text-sm font-semibold">Keyword Signals</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(result.keyword_suggestions ?? []).slice(0, 16).map((k) => (
              <Chip key={k} label={k} variant="cyan" />
            ))}
          </div>
        </div>

        {/* Trust signals */}
        {(result.trust_signals ?? []).length > 0 && (
          <div className="glass-panel p-5 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={15} className="text-teal-400" />
              <h3 className="text-white text-sm font-semibold">Trust Signals</h3>
            </div>
            <ul className="space-y-1.5">
              {(result.trust_signals ?? []).slice(0, 5).map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs text-slate-300">
                  <div className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Niche */}
        {result.niche && (
          <div className="glass-panel p-5 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-400" />
              <h3 className="text-white text-sm font-semibold">Niche</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{result.niche}</p>
          </div>
        )}

        {/* Blog Content Signals */}
        {(result.blog_section_summary || (result.blog_post_examples ?? []).length > 0) && (
          <div className="glass-panel p-5 card-hover sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={15} className="text-cyan-400" />
              <h3 className="text-white text-sm font-semibold">Blog Content Signals</h3>
            </div>
            {result.blog_section_summary && (
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{result.blog_section_summary}</p>
            )}
            {(result.blog_post_examples ?? []).length > 0 && (
              <ul className="space-y-1.5">
                {(result.blog_post_examples ?? []).slice(0, 5).map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Seasonal Context */}
      {result.seasonal_context && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-cyan-400" />
            Seasonal &amp; Timing Context
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current season */}
            <div className="glass-panel p-4 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <Sun size={13} className="text-amber-400" />
                <span className="text-slate-400 text-xs font-medium">Current Season</span>
              </div>
              <p className="text-white text-sm font-semibold">{result.seasonal_context.current_season}</p>
              <p className="text-slate-500 text-xs mt-1">{result.seasonal_context.current_date}</p>
            </div>

            {/* Upcoming events */}
            {(result.seasonal_context.upcoming_events ?? []).length > 0 && (
              <div className="glass-panel p-4 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={13} className="text-cyan-400" />
                  <span className="text-slate-400 text-xs font-medium">Upcoming Events</span>
                </div>
                <ul className="space-y-1">
                  {result.seasonal_context.upcoming_events.slice(0, 5).map((ev, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      {ev}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gifting occasions */}
            {(result.seasonal_context.gifting_occasions ?? []).length > 0 && (
              <div className="glass-panel p-4 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <Gift size={13} className="text-pink-400" />
                  <span className="text-slate-400 text-xs font-medium">Gifting Occasions</span>
                </div>
                <ul className="space-y-1">
                  {result.seasonal_context.gifting_occasions.slice(0, 5).map((g, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Seasonal activities */}
            {(result.seasonal_context.seasonal_activities ?? []).length > 0 && (
              <div className="glass-panel p-4 card-hover sm:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sun size={13} className="text-teal-400" />
                  <span className="text-slate-400 text-xs font-medium">Seasonal Activities</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.seasonal_context.seasonal_activities.slice(0, 10).map((act, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content opportunity */}
            {result.seasonal_context.content_opportunity_summary && (
              <div className="glass-panel p-4 card-hover sm:col-span-2 lg:col-span-3 border-l-2 border-cyan-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={13} className="text-cyan-400" />
                  <span className="text-slate-400 text-xs font-medium">Content Opportunity</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{result.seasonal_context.content_opportunity_summary}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO Opportunities */}
      {(result.seo_opportunities ?? []).length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" />
            SEO Opportunities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(result.seo_opportunities ?? []).slice(0, 6).map((opp, i) => (
              <div
                key={i}
                className="glass-panel p-4 border-l-2 border-cyan-500/40 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <p className="text-slate-300 text-sm">{opp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source Diagnostics accordion */}
      <div className="mb-6">
        <button
          onClick={() => setSourcesOpen((v) => !v)}
          className="w-full flex items-center justify-between p-4 glass-panel hover:bg-white/5 transition-all"
        >
          <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <FileText size={14} className="text-slate-500" />
            Source Diagnostics
          </span>
          {sourcesOpen ? (
            <ChevronDown size={15} className="text-slate-500" />
          ) : (
            <ChevronRight size={15} className="text-slate-500" />
          )}
        </button>
        {sourcesOpen && (
          <div className="glass-panel mt-1 p-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Page Title</span>
                <p className="text-slate-300">{result.source_signals.page_title || '—'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Meta Description</span>
                <p className="text-slate-300">{result.source_signals.meta_description || '—'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Word Count</span>
                <p className="text-slate-300">{result.source_signals.word_count || '—'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">JSON-LD Schema</span>
                <p className={result.source_signals.has_json_ld ? 'text-green-400' : 'text-red-400'}>
                  {result.source_signals.has_json_ld ? 'Present' : 'Not detected'}
                </p>
              </div>
              {result.source_signals.h1_tags.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1">H1 Tags</span>
                  <div className="space-y-0.5">
                    {result.source_signals.h1_tags.map((h) => (
                      <p key={h} className="text-slate-300">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {result.source_signals.h2_tags.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1">H2 Tags</span>
                  <div className="space-y-0.5">
                    {result.source_signals.h2_tags.slice(0, 5).map((h) => (
                      <p key={h} className="text-slate-300">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Keywords customization */}
      <div className="glass-panel p-6 mb-8">
        <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
          <Target size={16} className="text-cyan-400" />
          Customize Your Target Keywords
        </h3>
        <p className="text-slate-500 text-xs mb-4">
          Auto-generated keywords are preloaded. Add or remove as needed.
        </p>

        {/* Tag list */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
          {userKeywords.map((kw) => (
            <Chip
              key={kw}
              label={kw}
              variant="cyan"
              onRemove={() => handleRemoveKeyword(kw)}
            />
          ))}
          {userKeywords.length === 0 && (
            <p className="text-slate-600 text-xs self-center">No keywords added yet.</p>
          )}
        </div>

        {/* Add keyword input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
            placeholder="Add custom keyword..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
          />
          <button
            onClick={handleAddKeyword}
            disabled={!newKeyword.trim()}
            className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Collection URLs */}
      <div className="glass-panel p-6 mb-8">
        <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
          <Link2 size={16} className="text-cyan-400" />
          Product / Service Collection URLs
          <span className="ml-2 text-xs font-normal text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">Optional</span>
        </h3>
        <p className="text-slate-500 text-xs mb-4 leading-relaxed">
          Paste one or more collection or category page URLs (comma-separated). The AI will browse these pages, identify the most relevant products or services for each blog idea, and weave them naturally into the article.
        </p>
        <textarea
          value={collectionInput}
          onChange={(e) => {
            setCollectionInput(e.target.value);
            const parsed = e.target.value
              .split(',')
              .map((u) => u.trim())
              .filter((u) => u.length > 0);
            onCollectionUrlsChange(parsed);
          }}
          placeholder="https://yourstore.com/collections/candles, https://yourstore.com/collections/gifts"
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-all resize-none leading-relaxed"
        />
        {collectionUrls.length > 0 && (
          <p className="text-cyan-400 text-xs mt-2">
            {collectionUrls.length} URL{collectionUrls.length > 1 ? 's' : ''} will be scanned during blog ideation
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={() => onContinue(userKeywords, collectionUrls)}
          className="btn-cosmic px-8 py-4 rounded-xl font-semibold text-white text-base animate-pulse-glow"
        >
          Continue with Blog Idea Generation →
        </button>
      </div>
    </section>
  );
}

// ===================== ARCHITECT PHASE =====================

function BlogIdeaCard({
  idea,
  index,
  onSelect,
}: {
  idea: BlogIdea;
  index: number;
  onSelect: (idea: BlogIdea) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const intentColor =
    idea.search_intent === 'informational'
      ? 'cyan'
      : idea.search_intent === 'commercial'
      ? 'teal'
      : 'amber';

  return (
    <div
      className="glass-panel p-5 card-hover flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-cyan-400 text-[10px] font-bold">{index + 1}</span>
          </div>
          <h3 className="text-white font-semibold text-sm leading-snug">{idea.title}</h3>
        </div>
      </div>

      {/* Primary keyword */}
      <div>
        <Chip label={idea.primary_keyword} variant="cyan" />
      </div>

      {/* Secondary keywords */}
      {idea.secondary_keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {idea.secondary_keywords.slice(0, 3).map((k) => (
            <Chip key={k} label={k} variant="slate" />
          ))}
        </div>
      )}

      {/* Intent + funnel */}
      <div className="flex flex-wrap gap-2">
        <Chip label={idea.search_intent} variant={intentColor as 'cyan' | 'teal' | 'amber'} />
        <Chip label={idea.funnel_stage} variant="slate" />
      </div>

      {/* Why it can rank — expandable */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-xs"
      >
        {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        Why it can rank
      </button>
      {expanded && (
        <div className="bg-white/3 border border-white/8 rounded-lg p-3 text-xs text-slate-300 leading-relaxed animate-fade-in">
          {idea.why_it_can_rank}
        </div>
      )}

      {/* Audience + angle */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-600 block mb-0.5">Audience</span>
          <span className="text-slate-300">{idea.target_audience}</span>
        </div>
        <div>
          <span className="text-slate-600 block mb-0.5">Angle</span>
          <span className="text-slate-300">{idea.angle}</span>
        </div>
      </div>

      {/* Outline preview */}
      {idea.outline.length > 0 && (
        <div>
          <span className="text-slate-600 text-xs mb-1 block">Outline preview</span>
          <ul className="space-y-1">
            {idea.outline.slice(0, 3).map((item, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
            {idea.outline.length > 3 && (
              <li className="text-xs text-slate-600">+{idea.outline.length - 3} more sections</li>
            )}
          </ul>
        </div>
      )}

      {/* Recommended products */}
      {(idea.recommended_products ?? []).length > 0 && (
        <div className="border-t border-white/8 pt-3">
          <span className="text-slate-500 text-xs mb-2 flex items-center gap-1.5">
            <Gift size={11} className="text-pink-400" />
            Featured Products
          </span>
          <ul className="space-y-2">
            {(idea.recommended_products as RecommendedProduct[]).map((p, i) => (
              <li key={i} className="bg-white/3 border border-white/8 rounded-lg p-2.5 text-xs space-y-0.5">
                <p className="text-white font-medium">{p.name}</p>
                <p className="text-slate-400 leading-relaxed">{p.description}</p>
                <p className="text-cyan-400/70 italic">{p.placement_suggestion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onSelect(idea)}
        className="mt-auto btn-cosmic py-2.5 rounded-xl text-white text-xs font-semibold"
      >
        Generate This Article
      </button>
    </div>
  );
}

function ArchitectPhase({
  result,
  onSelectIdea,
  onRetry,
  error,
}: {
  result: ArchitectOutput | null;
  onSelectIdea: (idea: BlogIdea) => void;
  onRetry: () => void;
  error: string | null;
}) {
  if (error) {
    return (
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <ErrorCard message={error} onRetry={onRetry} phase="Content Architecture" />
      </section>
    );
  }

  if (!result) return null;

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      {/* Phase header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PhaseProgress currentPhase="architect" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Content Architecture Ready
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {result.blog_ideas.length} blog ideas crafted. Select one to generate the full article.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 self-start">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-cyan-300 text-xs font-medium">
            {result.provider_used} · {result.model_used}
          </span>
        </div>
      </div>

      {/* Strategy note */}
      {result.content_strategy_notes && (
        <div className="glass-panel-accent p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Content Strategy Notes</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.content_strategy_notes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected keywords */}
      {(result.selected_keywords ?? []).length > 0 && (
        <div className="mb-6">
          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
            Selected Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {(result.selected_keywords ?? []).map((k) => (
              <Chip key={k} label={k} variant="cyan" />
            ))}
          </div>
        </div>
      )}

      {/* Ideas grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(result.blog_ideas ?? []).map((idea, i) => (
          <BlogIdeaCard key={idea.id || i} idea={idea} index={i} onSelect={onSelectIdea} />
        ))}
      </div>
    </section>
  );
}

// ===================== WRITER PHASE =====================

type WriterTab = 'article' | 'seo' | 'assets' | 'json';

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="glass-panel overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-all"
          >
            <span className="text-white text-sm font-medium">{faq.question}</span>
            {openIdx === i ? (
              <ChevronDown size={15} className="text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight size={15} className="text-slate-400 flex-shrink-0" />
            )}
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4 text-slate-300 text-sm leading-relaxed animate-fade-in">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WriterPhase({
  result,
  onGenerateAnother,
  onRetry,
  error,
}: {
  result: GeneratedBlog | null;
  onGenerateAnother: () => void;
  onRetry: () => void;
  error: string | null;
}) {
  const [activeTab, setActiveTab] = useState<WriterTab>('article');

  const handleDownload = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.slug || 'article'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  if (error) {
    return (
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <ErrorCard message={error} onRetry={onRetry} phase="Article Generation" />
      </section>
    );
  }

  if (!result) return null;

  const tabs: { key: WriterTab; label: string; icon: React.ReactNode }[] = [
    { key: 'article', label: 'Article', icon: <FileText size={14} /> },
    { key: 'seo', label: 'SEO Details', icon: <Target size={14} /> },
    { key: 'assets', label: 'Assets', icon: <Image size={14} /> },
    { key: 'json', label: 'Raw JSON', icon: <Code2 size={14} /> },
  ];

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 py-12 animate-fade-in-up">
      {/* Phase header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <PhaseProgress currentPhase="writer" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{result.title}</h1>
            <p className="text-slate-400 text-sm">{result.meta_description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <CopyButton text={result.markdown} label="Copy MD" />
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs font-medium"
            >
              <Download size={13} />
              Download
            </button>
          </div>
        </div>

        {/* SEO badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Chip label={result.primary_keyword} variant="cyan" />
          {(result.secondary_keywords ?? []).slice(0, 4).map((k) => (
            <Chip key={k} label={k} variant="slate" />
          ))}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 text-xs">
              {result.provider_used} · {result.model_used}
            </span>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/8 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
              activeTab === tab.key
                ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {/* ARTICLE TAB */}
        {activeTab === 'article' && (
          <div className="space-y-6">
            {/* Hook */}
            {result.hook && (
              <blockquote className="glass-panel-accent p-5 border-l-4 border-cyan-500/50">
                <p className="text-cyan-300 text-base italic leading-relaxed">{result.hook}</p>
              </blockquote>
            )}

            {/* Intro */}
            {result.intro && (
              <div className="glass-panel p-6">
                <p className="text-slate-300 text-sm leading-relaxed">{result.intro}</p>
              </div>
            )}

            {/* Sections */}
            {(result.sections ?? []).map((section, i) => (
              <div key={i} className="glass-panel p-6">
                {section.level === 2 ? (
                  <h2 className="text-white text-xl font-bold mb-3">{section.heading}</h2>
                ) : (
                  <h3 className="text-white text-lg font-semibold mb-3">{section.heading}</h3>
                )}
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}

            {/* FAQ */}
            {(result.faq ?? []).length > 0 && (
              <div>
                <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-cyan-400" />
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={result.faq} />
              </div>
            )}

            {/* Conclusion */}
            {result.conclusion && (
              <div className="glass-panel p-6">
                <h2 className="text-white text-xl font-bold mb-3">Conclusion</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{result.conclusion}</p>
              </div>
            )}

            {/* CTA */}
            {result.cta && (
              <div className="glass-panel-accent p-6 text-center">
                <p className="text-white text-base font-semibold">{result.cta}</p>
              </div>
            )}
          </div>
        )}

        {/* SEO DETAILS TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-5">
            <div className="glass-panel p-5">
              <h3 className="text-white font-semibold mb-4">Meta Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 text-xs block mb-1">Meta Title</span>
                  <p className="text-slate-300 text-sm">{result.meta_title}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block mb-1">Meta Description</span>
                  <p className="text-slate-300 text-sm">{result.meta_description}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block mb-1">URL Slug</span>
                  <code className="text-cyan-400 text-xs bg-black/30 px-2 py-0.5 rounded">
                    /{result.slug}
                  </code>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block mb-1">Primary Keyword</span>
                  <Chip label={result.primary_keyword} variant="cyan" />
                </div>
                <div>
                  <span className="text-slate-500 text-xs block mb-1">Secondary Keywords</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(result.secondary_keywords ?? []).map((k) => (
                      <Chip key={k} label={k} variant="slate" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {(result.internal_link_suggestions ?? []).length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Link2 size={15} className="text-cyan-400" />
                  Internal Link Suggestions
                </h3>
                <ul className="space-y-2">
                  {(result.internal_link_suggestions ?? []).map((link, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(result.external_reference_suggestions ?? []).length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Link2 size={15} className="text-teal-400" />
                  External Reference Suggestions
                </h3>
                <ul className="space-y-2">
                  {(result.external_reference_suggestions ?? []).map((link, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(result.schema_suggestions ?? []).length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Code2 size={15} className="text-cyan-400" />
                  Schema Suggestions
                </h3>
                <ul className="space-y-2">
                  {(result.schema_suggestions ?? []).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={13} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="space-y-5">
            {(result.image_prompt_suggestions ?? []).length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Image size={15} className="text-cyan-400" />
                  Image Prompt Suggestions
                </h3>
                <div className="space-y-3">
                  {(result.image_prompt_suggestions ?? []).map((prompt, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/3 border border-white/8 group relative"
                    >
                      <p className="text-slate-300 text-sm pr-16">{prompt}</p>
                      <div className="absolute top-3 right-3">
                        <CopyButton text={prompt} label="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(result.schema_suggestions ?? []).length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code2 size={15} className="text-cyan-400" />
                  Schema Markup Recommendations
                </h3>
                <div className="space-y-2">
                  {(result.schema_suggestions ?? []).map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-lg bg-white/3 border border-white/8"
                    >
                      <Check size={13} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RAW JSON TAB */}
        {activeTab === 'json' && (
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Raw JSON Output</h3>
              <CopyButton text={JSON.stringify(result, null, 2)} label="Copy JSON" />
            </div>
            <pre className="code-block text-[11px]">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Generate Another */}
      <div className="flex justify-center mt-10">
        <button
          onClick={onGenerateAnother}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/20 transition-all text-sm font-medium"
        >
          <ArrowLeft size={15} />
          Generate Another Article
        </button>
      </div>
    </section>
  );
}

// ===================== INITIAL STATE =====================

function makeInitialState(): WorkflowState {
  return {
    llmMode: null,
    apiKey: '',
    activeProvider: '',
    activeModel: '',
    currentPhase: 'hero',
    phaseStatus: {
      extractor: 'idle',
      architect: 'idle',
      writer: 'idle',
    },
    errors: {
      extractor: null,
      architect: null,
      writer: null,
    },
    extractorResult: null,
    architectResult: null,
    selectedIdea: null,
    writerResult: null,
    userKeywords: [],
    collectionUrls: [],
  };
}

// ===================== MAIN PAGE =====================

export default function Home() {
  const [state, setState] = useState<WorkflowState>(makeInitialState);

  const isLoading = Object.values(state.phaseStatus).some((s) => s === 'running');
  const activeLoadingPhase = Object.entries(state.phaseStatus).find(
    ([, s]) => s === 'running'
  )?.[0] || '';

  const updateState = useCallback((patch: Partial<WorkflowState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleReset = useCallback(() => {
    setState(makeInitialState());
  }, []);

  // ---- HERO SUBMIT ----
  const handleHeroSubmit = useCallback(
    async (url: string, llmMode: LLMMode, apiKey: string) => {
      updateState({
        llmMode,
        apiKey,
        phaseStatus: { ...state.phaseStatus, extractor: 'running' },
        errors: { ...state.errors, extractor: null },
        currentPhase: 'extractor',
      });

      try {
        const res = await extractBrand(url, llmMode, apiKey || undefined);
        const result: ExtractorOutput = res.data ?? res;
        const kws: string[] = result.keyword_suggestions?.slice(0, 10) || [];
        updateState({
          extractorResult: result,
          activeProvider: result.provider_used || '',
          activeModel: result.model_used || '',
          phaseStatus: { extractor: 'success', architect: 'idle', writer: 'idle' },
          userKeywords: kws,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Brand extraction failed';
        updateState({
          phaseStatus: { extractor: 'error', architect: 'idle', writer: 'idle' },
          errors: { extractor: message, architect: null, writer: null },
        });
      }
    },
    [state.phaseStatus, state.errors, updateState]
  );

  const handleRetryExtractor = useCallback(() => {
    handleReset();
  }, [handleReset]);

  // ---- EXTRACTOR CONTINUE ----
  const handleExtractorContinue = useCallback(
    async (keywords: string[], collUrls: string[]) => {
      if (!state.extractorResult || !state.llmMode) return;

      updateState({
        phaseStatus: { ...state.phaseStatus, architect: 'running' },
        errors: { ...state.errors, architect: null },
        currentPhase: 'architect',
        userKeywords: keywords,
        collectionUrls: collUrls,
      });

      try {
        const res = await generateIdeas(
          state.extractorResult,
          keywords,
          state.llmMode,
          state.apiKey || undefined,
          collUrls
        );
        const result: ArchitectOutput = res.data ?? res;
        updateState({
          architectResult: result,
          phaseStatus: { ...state.phaseStatus, architect: 'success' },
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Idea generation failed';
        updateState({
          phaseStatus: { ...state.phaseStatus, architect: 'error' },
          errors: { ...state.errors, architect: message },
          currentPhase: 'extractor',
        });
      }
    },
    [state, updateState]
  );

  const handleRetryArchitect = useCallback(() => {
    updateState({ currentPhase: 'extractor', errors: { ...state.errors, architect: null } });
  }, [state.errors, updateState]);

  // ---- IDEA SELECTED ----
  const handleSelectIdea = useCallback(
    async (idea: BlogIdea) => {
      if (!state.extractorResult || !state.llmMode) return;

      updateState({
        selectedIdea: idea,
        phaseStatus: { ...state.phaseStatus, writer: 'running' },
        errors: { ...state.errors, writer: null },
        currentPhase: 'writer',
      });

      try {
        const res = await generateArticle(
          state.extractorResult,
          idea,
          state.llmMode,
          state.apiKey || undefined,
          state.collectionUrls
        );
        const result: GeneratedBlog = res.data ?? res;
        updateState({
          writerResult: result,
          phaseStatus: { ...state.phaseStatus, writer: 'success' },
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Article generation failed';
        updateState({
          phaseStatus: { ...state.phaseStatus, writer: 'error' },
          errors: { ...state.errors, writer: message },
          currentPhase: 'architect',
        });
      }
    },
    [state, updateState]
  );

  const handleRetryWriter = useCallback(() => {
    updateState({ currentPhase: 'architect', errors: { ...state.errors, writer: null } });
  }, [state.errors, updateState]);

  const handleGenerateAnother = useCallback(() => {
    updateState({
      currentPhase: 'architect',
      writerResult: null,
      selectedIdea: null,
      phaseStatus: { ...state.phaseStatus, writer: 'idle' },
      errors: { ...state.errors, writer: null },
    });
  }, [state, updateState]);

  return (
    <div className="relative min-h-screen bg-[#020617]">
      <StarField />

      <TopNav
        activeProvider={state.activeProvider}
        activeModel={state.activeModel}
        onReset={handleReset}
        currentPhase={state.currentPhase}
      />

      {isLoading && <LoadingOverlay phase={activeLoadingPhase} />}

      <main className="relative z-10">
        {/* HERO */}
        {state.currentPhase === 'hero' && (
          <HeroPhase onSubmit={handleHeroSubmit} />
        )}

        {/* EXTRACTOR */}
        {state.currentPhase === 'extractor' && (
          <ExtractorPhase
            result={state.extractorResult}
            onContinue={handleExtractorContinue}
            onRetry={handleRetryExtractor}
            error={state.errors.extractor || null}
            userKeywords={state.userKeywords}
            onKeywordsChange={(kws) => updateState({ userKeywords: kws })}
            collectionUrls={state.collectionUrls}
            onCollectionUrlsChange={(urls) => updateState({ collectionUrls: urls })}
          />
        )}

        {/* ARCHITECT */}
        {state.currentPhase === 'architect' && (
          <ArchitectPhase
            result={state.architectResult}
            onSelectIdea={handleSelectIdea}
            onRetry={handleRetryArchitect}
            error={state.errors.architect || null}
          />
        )}

        {/* WRITER */}
        {state.currentPhase === 'writer' && (
          <WriterPhase
            result={state.writerResult}
            onGenerateAnother={handleGenerateAnother}
            onRetry={handleRetryWriter}
            error={state.errors.writer || null}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}
            >
              <Zap size={11} className="text-white" />
            </div>
            <span className="text-slate-600 text-xs font-medium">AIBuddy</span>
          </div>
          <p className="text-slate-700 text-xs">AI Content Pipeline · Built for SEO teams</p>
        </div>
      </footer>
    </div>
  );
}
