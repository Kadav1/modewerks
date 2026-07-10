import React, { useState, useEffect } from 'react';
import DeskletLayout from './components/DeskletLayout';
import CheatsheetList from './components/CheatsheetList';
import VimKeyboard from './components/VimKeyboard';
import VimSandbox from './components/VimSandbox';
import VimrcConfigurator from './components/VimrcConfigurator';
import DailyVimTip from './components/DailyVimTip';
import VimTroubleshooting from './components/VimTroubleshooting';
import { VIM_COMMANDS } from './data/vimData';
import CompactDeskletView from './components/CompactDeskletView';

import { useMasteryProgress } from './hooks/useMasteryProgress';
import MasteryNotificationsOverlay from './components/MasteryNotificationsOverlay';

export default function App() {
  const [activeTab, setActiveTab ] = useState<'cheatsheet' | 'keyboard' | 'sandbox' | 'configurator' | 'troubleshooting'>('cheatsheet');
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkThemeState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('az_theme');
      return stored === null ? true : stored === 'dark';
    } catch {
      return true;
    }
  });
  const [deskletScale, setDeskletScale] = useState<number>(1.0);
  const [keyboardLayout, setKeyboardLayout] = useState<'ANSI' | 'ISO'>('ANSI');

  const { completedCommands, toasts, handleRecordCommand, dismissToast, resetProgress } = useMasteryProgress();

  const [selectedCommandId, setSelectedCommandId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('vim_selected_command_id') || 'm1';
    } catch {
      return 'm1';
    }
  });

  const handleSetSelectedCommandId = (id: string | null) => {
    setSelectedCommandId(id);
    try {
      if (id) localStorage.setItem('vim_selected_command_id', id);
    } catch {}
  };

  const [viewMode, setViewModeState] = useState<'compact' | 'workbench'>(() => {
    try {
      const stored = localStorage.getItem('vim_view_mode');
      if (stored === 'compact' || stored === 'workbench') return stored;
      const storedCompleted = localStorage.getItem('vim_sandbox_completed_commands');
      const completed = storedCompleted ? JSON.parse(storedCompleted) : [];
      return completed.length === 0 ? 'compact' : 'workbench';
    } catch {
      return 'compact';
    }
  });

  const setViewMode = (mode: 'compact' | 'workbench') => {
    try {
      localStorage.setItem('vim_view_mode', mode);
    } catch {}
    setViewModeState(mode);
  };

  const setIsDarkTheme = (dark: boolean) => {
    try { localStorage.setItem('az_theme', dark ? 'dark' : 'light'); } catch {}
    setIsDarkThemeState(dark);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const handleGlobalSearchShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setViewMode('workbench');
        setActiveTab('cheatsheet');
        setTimeout(() => {
          const inputEl = document.getElementById('cheatsheet-search-input') as HTMLInputElement | null;
          if (inputEl) {
            inputEl.focus();
            inputEl.select(); 
          }
        }, 60);
      }
    };
    window.addEventListener('keydown', handleGlobalSearchShortcut);
    return () => {
      window.removeEventListener('keydown', handleGlobalSearchShortcut);
    };
  }, []);

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

  const handleReset = () => {
    setIsLocked(true);
    setDeskletScale(1.0);
    setIsDarkTheme(true);
    setKeyboardLayout('ANSI');
    resetProgress();
    try {
      localStorage.removeItem('vim_view_mode');
      localStorage.removeItem('vim_selected_command_id');
    } catch {}
    setViewModeState('compact');
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
        viewMode={viewMode}
        setViewMode={setViewMode}
      >
        <div className="w-full flex-1 animate-fade-in flex flex-col">
          {viewMode === 'compact' ? (
            <CompactDeskletView
              completedCommands={completedCommands}
              onStartPractice={(taskIdx, cmd) => {
                if (cmd) {
                  const cmdObj = VIM_COMMANDS.find((c: any) => c.key === cmd);
                  if (cmdObj) handleSetSelectedCommandId(cmdObj.id);
                }
                setViewMode('workbench');
                setActiveTab('sandbox');
                try {
                  localStorage.setItem('vim_sandbox_target_task', taskIdx.toString());
                  window.dispatchEvent(new CustomEvent('vim_sandbox_set_task', { detail: taskIdx }));
                } catch {}
              }}
              onNavigateToTab={(tab) => {
                setViewMode('workbench');
                setActiveTab(tab);
              }}
              selectedCommandId={selectedCommandId}
              setSelectedCommandId={handleSetSelectedCommandId}
            />
          ) : (
            <>
              {activeTab === 'cheatsheet' && (
                <CheatsheetList 
                  selectedCommandId={selectedCommandId}
                  setSelectedCommandId={handleSetSelectedCommandId}
                />
              )}
              {activeTab === 'keyboard' && (
                <VimKeyboard 
                  layout={keyboardLayout} 
                  selectedCommandId={selectedCommandId}
                  setSelectedCommandId={handleSetSelectedCommandId}
                />
              )}
              {activeTab === 'sandbox' && (
                <VimSandbox 
                  onRecordCommand={handleRecordCommand} 
                  completedCommands={completedCommands}
                  selectedCommandId={selectedCommandId}
                />
              )}
              {activeTab === 'configurator' && <VimrcConfigurator />}
              {activeTab === 'troubleshooting' && <VimTroubleshooting />}
            </>
          )}
        </div>
      </DeskletLayout>

      {isTipOpen && (
        <DailyVimTip 
          isOpenManual={isTipManual} 
          onClose={handleCloseTip} 
        />
      )}

      <MasteryNotificationsOverlay toasts={toasts} dismissToast={dismissToast} />
    </>
  );
}
