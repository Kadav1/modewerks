import React, { useState, useEffect } from 'react';
import { getWindowLayer, setWindowLayer, startWindowDrag, startWindowResize, WindowLayer } from '../lib/deskletIpc';
import { 
  Settings, 
  RefreshCw, 
  Flame, 
  BookOpen, 
  Keyboard, 
  Sliders,
  Lightbulb,
  Pin,
  X,
  HeartPulse,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeskletLayoutProps {
  children: React.ReactNode;
  activeTab: 'cheatsheet' | 'keyboard' | 'sandbox' | 'configurator' | 'troubleshooting';
  setActiveTab: (tab: 'cheatsheet' | 'keyboard' | 'sandbox' | 'configurator' | 'troubleshooting') => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (dark: boolean) => void;
  deskletScale: number;
  setDeskletScale: (scale: number) => void;
  onReset: () => void;
  onOpenTip: () => void;
  keyboardLayout: 'ANSI' | 'ISO';
  setKeyboardLayout: (layout: 'ANSI' | 'ISO') => void;
  completedCommands: string[];
  viewMode: 'compact' | 'workbench';
  setViewMode: (mode: 'compact' | 'workbench') => void;
}

export default function DeskletLayout({
  children,
  activeTab,
  setActiveTab,
  isLocked,
  setIsLocked,
  isDarkTheme,
  setIsDarkTheme,
  deskletScale,
  setDeskletScale,
  onReset,
  onOpenTip,
  keyboardLayout,
  setKeyboardLayout,
  completedCommands,
  viewMode,
  setViewMode,
}: DeskletLayoutProps) {
  const totalCommands = 16;
  const completedCount = completedCommands.length;
  const proficiencyPercent = Math.round((completedCount / totalCommands) * 100);

  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [terminalNotifications, setTerminalNotifications] = useState<string[]>([
    'Cinnamon workspace environment initialized.',
    'modewerks v0.4.0 loaded successfully.'
  ]);

  const [windowLayer, setWindowLayerState] = useState<WindowLayer>('below');

  // Read current layer from Python on first open of settings
  const readLayerFromPython = () => {
    const layer = getWindowLayer();
    setWindowLayerState(layer);
  };

  const handleSetWindowLayer = (layer: WindowLayer) => {
    setWindowLayer(layer);
    setWindowLayerState(layer);
  };

  // Sync on mount
  useEffect(() => { readLayerFromPython(); }, []);

  const addNotification = (text: string) => {
    setTerminalNotifications((prev) => [
      ...prev.slice(-3),
      `[${new Date().toLocaleTimeString()}] ${text}`,
    ]);
  };

  const reloadDesklet = () => {
    addNotification('Reloading desklet system state...');
    onReset();
    setTimeout(() => {
      addNotification('Desklet database reloaded.');
    }, 450);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    addNotification(isLocked ? 'Desklet position unlocked.' : 'Desklet coordinate position locked.');
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (isLocked) return;
    if (e.button !== 0) return; // Only left click
    
    // Don't drag if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a') || target.closest('.no-drag')) {
      return;
    }

    // Use synchronous prompt to halt JS execution and immediately trigger the GTK native drag 
    // during the same event loop tick as the actual mousedown
    startWindowDrag();
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isLocked) return;
    if (e.button !== 0) return; // Only left click
    e.stopPropagation();
    startWindowResize();
  };

  return (
    <div 
      className={`relative min-h-screen w-full flex flex-col overflow-x-hidden select-none bg-az-bg-base text-az-text-primary ${isDarkTheme ? 'dark' : ''} font-sans`}
      onMouseDown={handleDragStart}
    >
      
      {/* Titlebar of the Desklet */}
      <div className="px-4 py-2.5 bg-az-bg-alt border-b border-az-border-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-az-active shadow-md shadow-az-active/40" />
            <div>
              <h1 className="text-xs font-semibold tracking-wide flex items-center gap-2 text-az-text-heading font-mono">
                modewerks
                <span className="text-[9.5px] font-mono bg-az-bg-embedded text-az-text-muted px-1.5 py-0.5 rounded font-medium">v0.4.0</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-az-border-subtle mx-1" />
          
          {/* Dynamic Vim Proficiency Tracker */}
          <div 
            onClick={() => { setActiveTab('sandbox'); addNotification('Switched to Practice Buffer sandbox.'); }}
            className="no-drag hidden sm:flex items-center gap-2 bg-az-bg-soft hover:bg-az-bg-raised transition-all px-2 py-0.5 rounded border border-az-border-subtle cursor-pointer" 
            title="Practice commands inside the sandbox buffer. Click to open!"
          >
            <Flame className="w-3 h-3 text-az-active animate-pulse shrink-0" />
            <span className="text-[9.5px] uppercase font-bold tracking-wider text-az-text-muted">Mastery:</span>
            <div className="w-16 bg-az-bg-canvas rounded-full h-1.5 overflow-hidden border border-az-border-subtle relative shrink-0">
              <div 
                className="bg-az-active h-full rounded-full transition-all duration-500" 
                style={{ width: `${proficiencyPercent}%` }}
              />
            </div>
            <span className="text-az-active font-extrabold font-mono text-[10px] shrink-0">{proficiencyPercent}%</span>
          </div>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle Switch */}
          <div className="no-drag flex items-center bg-az-bg-canvas border border-az-border-subtle p-0.5 rounded-lg text-[9px] font-mono leading-none mr-1.5">
            <button
              onClick={() => { setViewMode('compact'); addNotification('Switched to Compact Desklet mode.'); }}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-bold ${
                viewMode === 'compact' 
                  ? 'bg-az-active text-az-bg-canvas' 
                  : 'text-az-text-muted hover:text-az-text-heading'
              }`}
            >
              COMPACT
            </button>
            <button
              onClick={() => { setViewMode('workbench'); addNotification('Switched to Expert Workbench mode.'); }}
              className={`px-2 py-1 rounded transition-all cursor-pointer font-bold ${
                viewMode === 'workbench' 
                  ? 'bg-az-active text-az-bg-canvas' 
                  : 'text-az-text-muted hover:text-az-text-heading'
              }`}
            >
              WORKBENCH
            </button>
          </div>

          <button
            onClick={() => { onOpenTip(); addNotification('Opening Daily Vim Tip dialog...'); }}
            className="px-2 py-1 gap-1 inline-flex items-center rounded-md bg-az-warning/15 text-az-warning hover:bg-az-warning/25 text-[10px] font-mono font-bold transition-all border border-az-warning/20 cursor-pointer mr-1"
            title="Open Advanced Vim Command Tip"
          >
            <Lightbulb className="w-3.5 h-3.5 fill-az-warning/20" />
            <span className="hidden xs:inline">VIM TIP</span>
          </button>
          
          <button 
            onClick={reloadDesklet}
            className="p-1 rounded hover:bg-az-bg-soft text-az-text-muted hover:text-az-text-heading transition-colors cursor-pointer"
            title="Reset workspace state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={toggleLock}
            className={`p-1 rounded transition-colors cursor-pointer ${!isLocked ? 'bg-az-active/20 text-az-active' : 'hover:bg-az-bg-soft text-az-text-muted hover:text-az-text-heading'}`}
            title={isLocked ? "Unlock to move Desklet" : "Lock Desklet in place"}
          >
            <Pin className={`w-3.5 h-3.5 ${isLocked ? 'fill-az-active/20 text-az-active' : ''}`} />
          </button>
          <button
            onClick={() => setShowConfigMenu(!showConfigMenu)}
            className={`p-1 rounded transition-colors cursor-pointer ${showConfigMenu ? 'bg-az-active/20 text-az-active' : 'hover:bg-az-bg-soft text-az-text-muted hover:text-az-text-heading'}`}
            title="Desklet Options"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Custom Tab Ribbon for quick-switching */}
      {viewMode === 'workbench' && (
        <div className="flex items-center justify-between px-4 bg-az-bg-alt border-b border-az-border-subtle text-[11px] text-az-text-muted py-1 font-mono shrink-0">
          <div className="flex items-center gap-1 sm:gap-2" role="tablist">
            <button 
              role="tab"
              aria-selected={activeTab === 'cheatsheet'}
              aria-label="Command Lookup tab"
              onClick={() => { setActiveTab('cheatsheet'); addNotification('Menu Switch: command index'); }}
              className={`px-2.5 py-1 transition-all outline-none relative font-medium flex items-center gap-1.5 rounded cursor-pointer ${activeTab === 'cheatsheet' ? 'text-az-active bg-az-active/10 font-bold border border-az-active/15 shadow-sm' : 'hover:text-az-text-heading hover:bg-az-bg-soft'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="inline">Lookup</span>
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'keyboard'}
              aria-label="Keyboard Mode Map tab"
              onClick={() => { setActiveTab('keyboard'); addNotification('Menu Switch: mode map'); }}
              className={`px-2.5 py-1 transition-all outline-none relative font-medium flex items-center gap-1.5 rounded cursor-pointer ${activeTab === 'keyboard' ? 'text-az-active bg-az-active/10 font-bold border border-az-active/15 shadow-sm' : 'hover:text-az-text-heading hover:bg-az-bg-soft'}`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span className="inline">Keyboard</span>
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'sandbox'}
              aria-label="Practice Buffer sandbox tab"
              onClick={() => { setActiveTab('sandbox'); addNotification('Menu Switch: practice buffer'); }}
              className={`px-2.5 py-1 transition-all outline-none relative font-medium flex items-center gap-1.5 rounded cursor-pointer ${activeTab === 'sandbox' ? 'text-az-active bg-az-active/10 font-bold border border-az-active/15 shadow-sm' : 'hover:text-az-text-heading hover:bg-az-bg-soft'}`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="inline">Practice</span>
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'configurator'}
              aria-label="Vimrc Configuration builder tab"
              onClick={() => { setActiveTab('configurator'); addNotification('Menu Switch: configuration ledger'); }}
              className={`px-2.5 py-1 transition-all outline-none relative font-medium flex items-center gap-1.5 rounded cursor-pointer ${activeTab === 'configurator' ? 'text-az-active bg-az-active/10 font-bold border border-az-active/15 shadow-sm' : 'hover:text-az-text-heading hover:bg-az-bg-soft'}`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="inline">Config</span>
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'troubleshooting'}
              aria-label="Recovery & Troubleshooting tab"
              onClick={() => { setActiveTab('troubleshooting'); addNotification('Menu Switch: recovery procedures'); }}
              className={`px-2.5 py-1 transition-all outline-none relative font-medium flex items-center gap-1.5 rounded cursor-pointer ${activeTab === 'troubleshooting' ? 'text-az-active bg-az-active/10 font-bold border border-az-active/15 shadow-sm' : 'hover:text-az-text-heading hover:bg-az-bg-soft'}`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span className="inline">Recovery</span>
            </button>
          </div>
          <div className="hidden md:block text-[10px] text-az-text-faint font-sans">
            Use <span className="px-1.5 py-0.5 rounded bg-az-bg-embedded font-mono font-bold text-az-text-primary">Ctrl+K</span> to search
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-az-bg-canvas">
        {/* Config Menu Overlay */}
        <AnimatePresence>
          {showConfigMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-2 right-4 left-4 sm:left-auto sm:w-[400px] bg-az-bg-workarea border border-az-border-default p-5 rounded-xl shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-az-text-heading flex items-center gap-2">
                  <Settings className="w-4 h-4 text-az-active" /> Desklet Settings
                </h3>
                <button onClick={() => setShowConfigMenu(false)} className="text-az-text-muted hover:text-az-text-heading cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-az-text-faint mb-2">
                    Theme & Appearance
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setIsDarkTheme(true); addNotification('Theme: Radium Dark activated.'); }}
                      className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isDarkTheme
                          ? 'bg-az-active text-az-bg-canvas shadow-md font-bold'
                          : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border border-az-border-subtle'
                      }`}
                    >
                      Radium Dark
                    </button>
                    <button
                      onClick={() => { setIsDarkTheme(false); addNotification('Theme: Radium Light activated.'); }}
                      className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        !isDarkTheme
                          ? 'bg-az-active text-az-bg-canvas shadow-md font-bold'
                          : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border border-az-border-subtle'
                      }`}
                    >
                      Radium Light
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-az-text-faint mb-2">
                    Physical Keyboard Map
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setKeyboardLayout('ANSI'); addNotification('Keyboard mapping updated: ANSI standard layout.'); }}
                      className={`flex-1 text-center py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        keyboardLayout === 'ANSI'
                          ? 'bg-az-active text-az-bg-canvas shadow-md font-bold'
                          : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border border-az-border-subtle'
                      }`}
                    >
                      ANSI
                    </button>
                    <button
                      onClick={() => { setKeyboardLayout('ISO'); addNotification('Keyboard mapping updated: ISO international layout.'); }}
                      className={`flex-1 text-center py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        keyboardLayout === 'ISO'
                          ? 'bg-az-active text-az-bg-canvas shadow-md font-bold'
                          : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border border-az-border-subtle'
                      }`}
                    >
                      ISO
                    </button>
                  </div>
                </div>

                {/* Window Layer */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-az-text-faint mb-2">
                    Window Layer
                  </h4>
                  <div className="flex gap-2">
                    {([
                      { id: 'above',  label: 'Always Top',  Icon: ArrowUp },
                      { id: 'normal', label: 'Normal',      Icon: Minus   },
                      { id: 'below',  label: 'Background',  Icon: ArrowDown },
                    ] as { id: 'above'|'normal'|'below'; label: string; Icon: React.ElementType }[]).map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => {
                          handleSetWindowLayer(id);
                          addNotification(`Window layer: ${label}.`);
                        }}
                        className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          windowLayer === id
                            ? 'bg-az-active text-az-bg-canvas shadow-md'
                            : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border border-az-border-subtle'
                        }`}
                        title={label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] mb-1 font-mono uppercase tracking-wider text-az-text-faint">
                    <span>UI Scale Zoom</span>
                    <span className="text-az-active font-bold">{Math.round(deskletScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.85"
                    max="1.30"
                    step="0.05"
                    value={deskletScale}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setDeskletScale(val);
                    }}
                    className="w-full h-1.5 bg-az-bg-embedded rounded-lg appearance-none cursor-pointer accent-az-active"
                  />
                </div>

                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-az-text-faint mb-2">
                    State Ledger
                  </h4>
                  <div className="bg-az-bg-canvas p-2.5 rounded-lg border border-az-border-subtle font-mono text-[9px] sm:text-[10px] space-y-1 h-[80px] overflow-y-auto text-az-text-muted scrollbar-none">
                    {terminalNotifications.map((notif, index) => (
                      <div key={index} className="truncate">
                        <span className="text-az-active/80">&gt;</span> {notif}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Children Body View with Scale applied */}
        <div className="flex-1 overflow-auto relative">
          <div 
            style={{ transform: `scale(${deskletScale})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 min-h-full w-full max-w-[1400px] mx-auto p-3.5 sm:p-4 flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
      
      {/* Floating Resize Handle */}
      {!isLocked && (
        <div 
          className="no-drag absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-50 flex items-end justify-end p-1 select-none"
          onMouseDown={handleResizeStart}
          title="Drag to resize desklet window"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-az-text-muted hover:text-az-active opacity-60 hover:opacity-100 transition-opacity">
            <line x1="8" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="3" x2="3" y2="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
