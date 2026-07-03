import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import DeskletLayout from './components/DeskletLayout';
import CheatsheetList from './components/CheatsheetList';
import VimKeyboard from './components/VimKeyboard';
import VimSandbox from './components/VimSandbox';
import VimrcConfigurator from './components/VimrcConfigurator';
import DailyVimTip from './components/DailyVimTip';
import VimTroubleshooting from './components/VimTroubleshooting';

interface MasteryNotification {
  id: string;
  levelName: string;
  badge: string;
  count: number;
  description: string;
}

export default function App() {
  const [activeTab, setActiveTab ] = useState<'cheatsheet' | 'keyboard' | 'sandbox' | 'configurator' | 'troubleshooting'>('cheatsheet');
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkThemeState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('az_theme');
      // Default to dark (Radium) if no preference has been saved yet
      return stored === null ? true : stored === 'dark';
    } catch {
      return true;
    }
  });
  const [deskletScale, setDeskletScale] = useState<number>(1.0);
  const [keyboardLayout, setKeyboardLayout] = useState<'ANSI' | 'ISO'>('ANSI');

  // Proficiency tracker state based on unique successfully executed sandbox commands
  const [completedCommands, setCompletedCommands] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vim_sandbox_completed_commands');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<MasteryNotification[]>([]);

  // Persist theme preference across WebView restarts
  const setIsDarkTheme = (dark: boolean) => {
    try { localStorage.setItem('az_theme', dark ? 'dark' : 'light'); } catch {}
    setIsDarkThemeState(dark);
  };

  // Apply .dark to <html> so Tailwind dark: variants work on ALL elements,
  // including the root div that carries the class (self-targeting doesn't work).
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleRecordCommand = (cmd: string) => {
    if (completedCommands.includes(cmd)) return;

    const updated = [...completedCommands, cmd];
    setCompletedCommands(updated);
    localStorage.setItem('vim_sandbox_completed_commands', JSON.stringify(updated));

    const newCount = updated.length;
    let levelName = '';
    let badge = '';
    let desc = '';

    if (newCount === 4) {
      levelName = 'Vim Apprentice';
      badge = '🎓';
      desc = "First milestone achieved! You've mastered basic movements and navigations.";
    } else if (newCount === 8) {
      levelName = 'Vim Scholar';
      badge = '📚';
      desc = "Double figures! Commands and structural edits are becoming intuitive.";
    } else if (newCount === 12) {
      levelName = 'Vim Specialist';
      badge = '⚡';
      desc = "Excellent dexterity! Splits, case changes, and commands list completed.";
    } else if (newCount === 16) {
      levelName = 'Vim Grandmaster';
      badge = '👑';
      desc = "Elite efficiency! 100% of all sandbox editor commands successfully mastered.";
    }

    if (levelName) {
      const id = Date.now().toString();
      const newToast = { id, levelName, badge, count: newCount, description: desc };
      setToasts((active) => [...active, newToast]);
      
      // Auto-dismiss after 6.5 seconds
      setTimeout(() => {
        setToasts((active) => active.filter((t) => t.id !== id));
      }, 6500);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((active) => active.filter((t) => t.id !== id));
  };

  // Register global Ctrl+K listener for searching values instantly
  useEffect(() => {
    const handleGlobalSearchShortcut = (e: KeyboardEvent) => {
      // Support both Ctrl+K and Cmd+K (for MacOS ergonomics)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        
        // Instantly swap view back to Cheatsheet if on another tab active
        setActiveTab('cheatsheet');

        // Let the state update / component render if just mounted, then target focus
        setTimeout(() => {
          const inputEl = document.getElementById('cheatsheet-search-input') as HTMLInputElement | null;
          if (inputEl) {
            inputEl.focus();
            inputEl.select(); // Highlight existing search input for super fast replacement queries
          }
        }, 60);
      }
    };

    window.addEventListener('keydown', handleGlobalSearchShortcut);
    return () => {
      window.removeEventListener('keydown', handleGlobalSearchShortcut);
    };
  }, []);

  // Tip of the Day visibility managers
  const [isTipOpen, setIsTipOpen] = useState<boolean>(() => {
    try {
      const dontShow = localStorage.getItem('vim_tip_dont_show_startup') === 'true';
      if (dontShow) return false;
      const dismissedDate = localStorage.getItem('vim_tip_dismissed_today_date');
      return dismissedDate !== new Date().toDateString();
    } catch {
      return true;
    }
  });
  const [isTipManual, setIsTipManual] = useState<boolean>(false);

  const handleOpenTipManual = () => {
    setIsTipManual(true);
    setIsTipOpen(true);
  };

  const handleCloseTip = () => {
    setIsTipOpen(false);
    setIsTipManual(false);
  };

  // Global reset callback for LM Cinnamon Desklet configuration
  const handleReset = () => {
    setIsLocked(true);
    setDeskletScale(1.0);
    setIsDarkTheme(true);
    setKeyboardLayout('ANSI');
    setCompletedCommands([]);
    localStorage.removeItem('vim_sandbox_completed_commands');
    setToasts([]);
  };

  return (
    <>
      <DeskletLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        deskletScale={deskletScale}
        setDeskletScale={setDeskletScale}
        onReset={handleReset}
        onOpenTip={handleOpenTipManual}
        keyboardLayout={keyboardLayout}
        setKeyboardLayout={setKeyboardLayout}
        completedCommands={completedCommands}
      >
        <div className="w-full flex-1 animate-fade-in">
          {activeTab === 'cheatsheet' && <CheatsheetList />}
          {activeTab === 'keyboard' && <VimKeyboard layout={keyboardLayout} />}
          {activeTab === 'sandbox' && (
            <VimSandbox 
              onRecordCommand={handleRecordCommand} 
              completedCommands={completedCommands} 
            />
          )}
          {activeTab === 'configurator' && <VimrcConfigurator />}
          {activeTab === 'troubleshooting' && <VimTroubleshooting />}
        </div>
      </DeskletLayout>

      {isTipOpen && (
        <DailyVimTip 
          isOpenManual={isTipManual} 
          onClose={handleCloseTip} 
        />
      )}

      {/* Cinnamon-style Desktop Mastery Notification Toasts Overlay */}
      <div className="fixed bottom-14 right-4 z-50 flex flex-col gap-3 max-w-sm w-[90%] xs:w-80 sm:w-96 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const percent = Math.round((toast.count / 16) * 100);
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
                layout
                className="bg-az-bg-workarea/95 rounded-xl border border-az-active/30 p-4 shadow-2xl pointer-events-auto flex flex-col gap-2.5 text-az-text-primary font-sans"
              >
                {/* Notification Header */}
                <div className="flex items-center justify-between border-b border-az-border-subtle pb-1.5 text-[10px] font-mono tracking-wider text-az-text-muted">
                  <div className="flex items-center gap-1.5 text-az-active font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-az-active animate-ping inline-block" />
                    <span>CINNAMON SYSTEM ALERT</span>
                  </div>
                  <button 
                    onClick={() => dismissToast(toast.id)}
                    className="hover:text-az-text-heading transition-colors p-0.5 rounded hover:bg-az-bg-soft"
                    title="Dismiss"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Notification Body */}
                <div className="flex items-start gap-3">
                  <div className="text-3xl p-1 bg-az-active/15 rounded-lg border border-az-active/20 shrink-0">
                    {toast.badge}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-az-text-heading tracking-wide">
                        Mastery Level Up!
                      </h4>
                      <span className="text-[10px] bg-az-active/20 text-az-active font-mono font-bold px-1.5 py-0.5 rounded border border-az-active/25">
                        {toast.levelName}
                      </span>
                    </div>
                    <p className="text-[11px] text-az-text-muted leading-relaxed">
                      {toast.description}
                    </p>
                  </div>
                </div>

                {/* Progress Tracker Slider bar inside toast */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-az-text-muted">
                    <span>Overall Proficiency</span>
                    <span className="text-az-active font-bold">{percent}% ({toast.count}/16)</span>
                  </div>
                  <div className="w-full bg-az-bg-canvas rounded-full h-1.5 overflow-hidden border border-az-border-subtle relative">
                    <div 
                      className="bg-az-active h-full rounded-full" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
