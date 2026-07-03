import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Terminal, Lightbulb, ChevronRight, CheckCircle2, RotateCw, HelpCircle, ArrowRight } from 'lucide-react';
import { VIM_TIPS } from '../data/vimTips';
import { VimTip } from '../types';

interface DailyVimTipProps {
  onClose?: () => void;
  isOpenManual?: boolean;
}

export default function DailyVimTip({ onClose, isOpenManual = false }: DailyVimTipProps) {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(() => {
    return (localStorage.getItem('vim_tip_intensity') as 'beginner' | 'intermediate' | 'advanced') || 'advanced';
  });
  const [tip, setTip] = useState<VimTip | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Load state on startup
  useEffect(() => {
    // Check if dismissed before unless opened manually via context toggle
    const dontShow = localStorage.getItem('vim_tip_dont_show_startup') === 'true';
    const dismissedDate = localStorage.getItem('vim_tip_dismissed_today_date');
    const isDismissed = dontShow || dismissedDate === new Date().toDateString();
    if (!isDismissed || isOpenManual) {
      setIsVisible(true);
      fetchNewTip(level);
    }
  }, [isOpenManual]);

  const fetchNewTip = async (targetLevel: 'beginner' | 'intermediate' | 'advanced' = level) => {
    setLoading(true);
    setFetchError(null);
    setCompletedSteps({});

    // Check if we are running in an offline/file protocol environment
    const isFileProtocol = window.location.protocol === 'file:';

    if (isFileProtocol) {
      // Offline local resolution path
      const filtered = VIM_TIPS.filter(t => t.difficulty === targetLevel);
      const pool = filtered.length > 0 ? filtered : VIM_TIPS;
      const randomTip = pool[Math.floor(Math.random() * pool.length)];
      setTip(randomTip);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/vim-tip?level=${targetLevel}`);
      if (!response.ok) {
        throw new Error('API server returned error code ' + response.status);
      }
      const data = await response.json();
      if (
        data &&
        typeof data === 'object' &&
        typeof data.id === 'string' &&
        typeof data.title === 'string' &&
        typeof data.command === 'string' &&
        typeof data.category === 'string' &&
        typeof data.description === 'string' &&
        typeof data.scenario === 'string' &&
        Array.isArray(data.steps) &&
        (data.difficulty === 'beginner' || data.difficulty === 'intermediate' || data.difficulty === 'advanced')
      ) {
        setTip(data as VimTip);
      } else {
        throw new Error('API response does not conform to VimTip format');
      }
    } catch (err: any) {
      console.warn('[FRONTEND] Server fetch failed, falling back to local VIM_TIPS database:', err);
      // Fallback local resolution path
      const filtered = VIM_TIPS.filter(t => t.difficulty === targetLevel);
      const pool = filtered.length > 0 ? filtered : VIM_TIPS;
      const randomTip = pool[Math.floor(Math.random() * pool.length)];
      if (randomTip) {
        setTip(randomTip);
      } else {
        setFetchError(err.message || 'Could not retrieve today\'s tip.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (newLvl: 'beginner' | 'intermediate' | 'advanced') => {
    setLevel(newLvl);
    localStorage.setItem('vim_tip_intensity', newLvl);
    fetchNewTip(newLvl);
  };

  const dismissTip = () => {
    setIsVisible(false);
    localStorage.setItem('vim_tip_dismissed_today_date', new Date().toDateString());
    if (onClose) onClose();
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-az-bg-canvas/80 backdrop-blur-md">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="no-drag relative w-full max-w-2xl bg-az-bg-workarea border border-az-active/30 rounded-2xl shadow-2xl overflow-hidden text-az-text-primary font-sans"
        >
          {/* Header Block simulating a styled GTK+ terminal */}
          <div className="px-5 py-3.5 bg-az-bg-canvas border-b border-az-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-az-danger/80" />
                <span className="w-3 h-3 rounded-full bg-az-warning/80" />
                <span className="w-3 h-3 rounded-full bg-az-success/80" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-az-active flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                cinnamon-desklet:~ $ vim-tip-generator
              </span>
            </div>
            
            <button
              onClick={dismissTip}
              aria-label="Close daily tip"
              className="p-1 rounded-md hover:bg-az-bg-alt text-az-text-muted hover:text-az-text-primary transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title segment */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-az-border-subtle pb-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-az-active/10 border border-az-active/30 flex items-center justify-center text-az-active shrink-0 animate-pulse mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-az-active/15 text-az-active px-2 py-0.5 rounded font-bold border border-az-active/20">
                      Vim Tip of the Day
                    </span>
                  </div>
                  <h2 id="dialog-title" className="text-lg font-bold text-az-text-heading mt-1 flex items-center gap-1.5 font-mono">
                    {loading ? 'Retrieving tip...' : tip ? tip.title : 'Vim Command Collection'}
                  </h2>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => fetchNewTip(level)}
                  disabled={loading}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-mono font-bold rounded-lg border border-az-border-default bg-az-bg-alt hover:bg-az-bg-workarea text-az-text-muted disabled:opacity-50 transition-colors cursor-pointer"
                  title="Fetch a random curated Vim command sequence"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Next Tip</span>
                </button>
              </div>
            </div>

            {/* Level Selector Toggle Bar */}
            <div className="bg-az-bg-canvas border border-az-border-subtle rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider text-az-text-faint">STAGE INTENSITY:</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${
                  level === 'beginner'
                    ? 'bg-az-info/10 text-az-info border-az-info/20'
                    : level === 'intermediate'
                    ? 'bg-az-warning/10 text-az-warning border-az-warning/20'
                    : 'bg-az-active/10 text-az-active border-az-active/20'
                }`}>
                  {level} Level
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 w-full sm:w-auto bg-az-bg-embedded p-1 rounded-lg border border-az-border-subtle">
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleLevelChange(lvl)}
                    className={`px-3 py-1.5 rounded-md text-[10.5px] font-mono font-bold text-center transition-all cursor-pointer ${
                      level === lvl
                        ? 'bg-az-active/20 text-az-active border border-az-active/30'
                        : 'border border-transparent text-az-text-muted hover:text-az-text-heading hover:bg-az-bg-alt'
                    }`}
                  >
                    {lvl.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              /* Loading view */
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-az-active/10" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-az-active animate-spin" />
                  <Sparkles className="w-4 h-4 text-az-active animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-az-active">Loading tip database...</p>
                  <p className="text-[10px] text-az-text-muted">Reading local Vim tip registry</p>
                </div>
              </div>
            ) : fetchError ? (
              /* Fail State */
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-az-danger/15 text-az-danger border border-az-danger/20">
                  <span className="font-mono font-bold text-sm">!</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-az-text-primary font-mono italic">{fetchError}</p>
                  <p className="text-[10px] text-az-text-muted">Local cache is unavailable. Try restarting the desklet.</p>
                </div>
                <button
                  onClick={() => fetchNewTip(level)}
                  className="px-4 py-1.5 text-xs font-mono font-bold rounded bg-az-bg-alt border border-az-border-default text-az-text-heading hover:bg-az-bg-workarea transition cursor-pointer"
                >
                  Try Another Tip
                </button>
              </div>
            ) : tip ? (
              /* Actual Content Panel */
              <div className="space-y-5">
                {/* Active command block with click-to-copy */}
                <div 
                  className="p-4 bg-az-bg-canvas border border-az-active/10 rounded-xl relative overflow-hidden group cursor-pointer hover:border-az-active/25 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(tip.command)
                      .then(() => alert(`Copied "${tip.command}" to clipboard!`))
                      .catch((err) => console.error('Failed to copy command to clipboard: ', err));
                  }}
                  title="Click to copy command to clipboard"
                >
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[8.5px] font-mono text-az-text-faint group-hover:text-az-active transition-colors">
                    <span>Copy</span>
                    <kbd className="px-1 bg-az-bg-embedded border border-az-border-subtle rounded">Ctrl+C</kbd>
                  </div>
                  <span className="text-[9.5px] font-mono uppercase tracking-widest text-az-text-faint block mb-1">Command Bind Trigger</span>
                  <div className="font-mono text-lg font-bold text-az-active tracking-wide flex items-center gap-2">
                    <span className="text-az-active/60 font-medium select-none">$</span>
                    <span>{tip.command}</span>
                    <span className="w-1.5 h-4 bg-az-active animate-pulse" />
                  </div>
                  <span className="text-[10px] text-az-text-muted italic block mt-1.5 font-sans">
                    {tip.description}
                  </span>
                </div>

                {/* Scenario details */}
                <div className="bg-az-bg-alt p-4 rounded-xl border border-az-border-subtle space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-semibold text-az-active">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Real-world Case Studies</span>
                  </div>
                  <p className="text-xs text-az-text-primary font-sans leading-relaxed">
                    {tip.scenario}
                  </p>
                </div>

                {/* Step check-off */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-az-text-faint flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-az-active" />
                    <span>Tutorial Walkthrough (Practice steps)</span>
                  </span>
                  
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {tip.steps.map((step: string, idx: number) => (
                      <div 
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-start gap-2.5 text-xs font-mono select-none ${
                          completedSteps[idx]
                            ? 'bg-az-success/10 border-az-success/20 text-az-text-faint line-through'
                            : 'bg-az-bg-embedded border-az-border-subtle text-az-text-primary hover:border-az-border-default'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 transition-colors ${
                            completedSteps[idx] ? 'text-az-success fill-az-success/10' : 'text-az-text-faint'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <span className="text-az-active/70 mr-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-az-bg-canvas border-t border-az-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-az-text-muted">
            <div className="flex items-center gap-2">
              <input
                id="do-not-show-toggle"
                type="checkbox"
                defaultChecked={localStorage.getItem('vim_tip_dont_show_startup') === 'true'}
                onChange={(e) => {
                  if (e.target.checked) {
                    localStorage.setItem('vim_tip_dont_show_startup', 'true');
                  } else {
                    localStorage.removeItem('vim_tip_dont_show_startup');
                  }
                }}
                className="w-3.5 h-3.5 accent-[#ceda4a] rounded border-az-border-default bg-az-bg-embedded focus:ring-az-active focus:ring-offset-az-bg-canvas"
              />
              <label htmlFor="do-not-show-toggle" className="cursor-pointer font-sans text-az-text-muted hover:text-az-text-heading select-none">
                Don't show dialog automatically on desklet startup
              </label>
            </div>

            <button
              id="confirm-got-it"
              onClick={dismissTip}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-az-active hover:bg-az-focus transition-colors font-mono font-bold text-xs text-az-bg-canvas shadow-md text-center cursor-pointer"
            >
              Close & Practice [Esc]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
