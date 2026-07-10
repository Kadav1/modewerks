import React, { useState, useMemo, useEffect, useRef } from 'react';
import { COMMAND_CATEGORIES, VIM_COMMANDS } from '../data/vimData';
import { VimCommand, CommandCategory } from '../types';
import { 
  Search, 
  Copy, 
  Check, 
  Move, 
  Edit3, 
  Eye, 
  Clipboard, 
  FolderOpen, 
  Zap, 
  SlidersHorizontal, 
  BookOpen, 
  Sparkles,
  RefreshCw,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';
import { List } from 'react-window';
import LearningStartPanel from './LearningStartPanel';

// Help helper for Category icon lookup
const renderCategoryIcon = (iconName: string) => {
  const props = { className: "w-4 h-4" };
  switch (iconName) {
    case 'Move': return <Move {...props} />;
    case 'Edit3': return <Edit3 {...props} />;
    case 'Eye': return <Eye {...props} />;
    case 'Clipboard': return <Clipboard {...props} />;
    case 'Search': return <Search {...props} />;
    case 'FolderOpen': return <FolderOpen {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    default: return <BookOpen {...props} />;
  }
};

interface CommandRowProps {
  filteredCommands: VimCommand[];
  selectedCommandId: string | null;
  copiedId: string | null;
  isExpertMode: boolean;
  setSelectedCommandId: (id: string | null) => void;
  handleCopy: (cmd: VimCommand) => void;
}

interface RowComponentProps extends CommandRowProps {
  index: number;
  style: React.CSSProperties;
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
}

const areEqual = (prevProps: RowComponentProps, nextProps: RowComponentProps) => {
  const prevCmd = prevProps.filteredCommands[prevProps.index];
  const nextCmd = nextProps.filteredCommands[nextProps.index];

  // If commands are different (e.g. index shifting), re-render
  if (prevCmd !== nextCmd) return false;
  if (!prevCmd || !nextCmd) return true; // both null

  // If selection status of this row changed, re-render
  const prevWasSelected = prevCmd.id === prevProps.selectedCommandId;
  const nextIsSelected = nextCmd.id === nextProps.selectedCommandId;
  if (prevWasSelected !== nextIsSelected) return false;

  // If copied status of this row changed, re-render
  const prevWasCopied = prevCmd.id === prevProps.copiedId;
  const nextIsCopied = nextCmd.id === nextProps.copiedId;
  if (prevWasCopied !== nextIsCopied) return false;

  // If positioning/styling from react-window changed, re-render
  if (prevProps.style !== nextProps.style) return false;

  // If expert view toggled, re-render
  if (prevProps.isExpertMode !== nextProps.isExpertMode) return false;

  return true;
};

const CommandRowComponent = React.memo(({
  index,
  style,
  ariaAttributes,
  filteredCommands,
  selectedCommandId,
  copiedId,
  isExpertMode,
  setSelectedCommandId,
  handleCopy
}: RowComponentProps) => {
  const cmd = filteredCommands[index];
  if (!cmd) return null;
  const isSelected = cmd.id === selectedCommandId;

  return (
    <div
      style={style}
      key={cmd.id}
      {...ariaAttributes}
      onClick={() => setSelectedCommandId(cmd.id)}
      className={`no-drag grid grid-cols-12 gap-2 px-3 items-center text-[11px] cursor-pointer border-b border-az-border-subtle/40 ${
        isSelected 
          ? 'bg-az-active/10 text-az-text-heading font-semibold border-l-2 border-az-active' 
          : 'text-az-text-primary'
      }`}
    >
      {/* Keystroke key button styling */}
      <div className="col-span-3 flex items-center gap-1.5 flex-wrap">
        <span className="px-1.5 py-0.5 select-none rounded bg-az-bg-embedded border-b border-az-border-default font-mono font-bold text-az-text-primary dark:text-az-active shadow-sm truncate max-w-full text-[10.5px]">
          {cmd.key}
        </span>
        {cmd.isCommon && (
          <span className="w-1.5 h-1.5 rounded-full bg-az-active" title="Essential beginner command" />
        )}
        {isExpertMode && cmd.expertWorkflow && (
          <span className="text-[7.5px] font-sans px-1 py-0.2 select-none font-bold uppercase text-az-warning bg-az-warning/10 border border-az-warning/25 rounded tracking-wide leading-none" title="Expert Workflow Sequence Available">
            EXP
          </span>
        )}
      </div>

      {/* Description function */}
      <span className="col-span-6 text-az-text-muted truncate leading-normal animate-fade-in" title={cmd.description}>
        {cmd.description}
        {cmd.plugin && (
          <span className="ml-1.5 px-1 py-0.2 text-[8px] font-mono rounded bg-az-info/10 text-az-info border border-az-info/20">
            {cmd.plugin}
          </span>
        )}
        {cmd.caution && (
          <span className="ml-1.5 px-1 py-0.2 text-[8px] font-mono rounded bg-az-danger/10 text-az-danger border border-az-danger/20 font-bold">
            CAUTION
          </span>
        )}
      </span>

      {/* Mode tag */}
      <div className="col-span-2 text-center">
        <span className={`px-2 py-0.5 rounded text-[9.5px] font-medium tracking-wide uppercase ${
          cmd.mode === 'normal' 
            ? 'bg-az-info/10 text-az-info border border-az-info/15' 
            : cmd.mode === 'visual'
            ? 'bg-az-active/15 text-az-active border border-az-active/20'
            : 'bg-az-warning/10 text-az-warning border border-az-warning/15'
        }`}>
          {cmd.mode === 'command-line' ? 'cmd' : cmd.mode}
        </span>
      </div>

      {/* Direct Copy operator */}
      <div className="col-span-1 text-right flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(cmd);
          }}
          className="p-1 rounded text-az-text-muted hover:text-az-text-heading hover:bg-az-bg-soft cursor-pointer"
          title="Copy syntax"
        >
          {copiedId === cmd.id ? (
            <Check className="w-3.5 h-3.5 text-az-active" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-az-text-muted hover:text-az-text-heading" />
          )}
        </button>
      </div>

    </div>
  );
}, areEqual);

CommandRowComponent.displayName = 'CommandRowComponent';

const CommandRow = (props: RowComponentProps): React.ReactElement | null => {
  return <CommandRowComponent {...props} />;
};

CommandRow.displayName = 'CommandRow';

const getMnemonic = (key: string): string => {
  switch (key) {
    case 'h': return 'h sits on the left side of the hjkl movement cluster.';
    case 'j': return 'j points down (looks like a hook pointing down).';
    case 'k': return 'k stands for up (keep going up).';
    case 'l': return 'l sits on the right side of the hjkl movement cluster.';
    case 'i': return 'i stands for Insert (type text before cursor).';
    case 'a': return 'a stands for Append (type text after cursor).';
    case 'o': return 'o stands for Open (open a new line below).';
    case 'u': return 'u stands for Undo.';
    case 'r': return 'r stands for Replace.';
    case 'w': return 'w stands for Word (move forward to next word).';
    case 'b': return 'b stands for Backward (move back to previous word).';
    case 'x': return 'x stands for eXtinguish/delete character.';
    case 'y': return 'y stands for Yank (copy).';
    case 'p': return 'p stands for Put (paste).';
    case 'd': return 'd stands for Delete.';
    case 'c': return 'c stands for Change.';
    case '/': return '/ starts visual search forward.';
    case 'n': return 'n stands for Next match.';
    case ':w': return 'w stands for Write (save).';
    case ':q': return 'q stands for Quit.';
    default: return '';
  }
};

const getRelatedKeys = (category: string, currentKey: string): string => {
  switch (category) {
    case 'motion': return 'h, j, k, l, w, b, e, gg, G';
    case 'edit': return 'i, a, o, O, r, R, s, S, u, Esc';
    case 'copy-paste': return 'y, yy, p, P, d, dd, x';
    case 'search': return '/, ?, n, N, *, #';
    case 'files': return ':w, :q, :wq, :x';
    default: return 'None';
  }
};

interface CheatsheetListProps {
  selectedCommandId?: string | null;
  setSelectedCommandId?: (id: string | null) => void;
}

export default function CheatsheetList({
  selectedCommandId: propSelectedCommandId,
  setSelectedCommandId: propSetSelectedCommandId,
}: CheatsheetListProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showOnlyCommon, setShowOnlyCommon] = useState(false);
  const [activeModeFilter, setActiveModeFilter] = useState<string | null>(null);
  const [activeSourceFilter, setActiveSourceFilter] = useState<'standard' | 'neovim' | 'azwerks' | null>(null);
  const [activeProfileFilter, setActiveProfileFilter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Local state fallback if prop is not supplied
  const [localSelectedCommandId, localSetSelectedCommandId] = useState<string | null>('m1');
  const selectedCommandId = propSelectedCommandId !== undefined ? propSelectedCommandId : localSelectedCommandId;
  const setSelectedCommandId = propSetSelectedCommandId || localSetSelectedCommandId;

  const [isExpertMode, setIsExpertMode] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'copied'>('idle');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Completed commands list read from localStorage
  const completedCommands = useMemo(() => {
    try {
      const stored = localStorage.getItem('vim_sandbox_completed_commands');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const copyTimeoutRef = useRef<number | null>(null);
  const exportTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (exportTimeoutRef.current) clearTimeout(exportTimeoutRef.current);
    };
  }, []);

  // Direct clipboard copy helper
  const handleCopy = (cmd: VimCommand) => {
    navigator.clipboard.writeText(cmd.key)
      .then(() => {
        setCopiedId(cmd.id);
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = window.setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => console.error('Failed to copy command key: ', err));
  };

  // Dynamic profiles mapping
  const availableProfiles = useMemo(() => {
    const profiles = new Set<string>();
    VIM_COMMANDS.forEach((cmd) => {
      const cmdSource = cmd.source || 'standard';
      if (!activeSourceFilter || cmdSource === activeSourceFilter) {
        if (cmd.profile) {
          profiles.add(cmd.profile);
        }
      }
    });
    return Array.from(profiles).sort();
  }, [activeSourceFilter]);

  // Memoized query filtering for maximum performance
  const filteredCommands = useMemo(() => {
    return VIM_COMMANDS.filter((cmd) => {
      const cmdSource = cmd.source || 'standard';
      const cmdProfile = cmd.profile || 'core';

      const matchesSearch = 
        cmd.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cmd.notes && cmd.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cmd.plugin && cmd.plugin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cmd.context && cmd.context.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cmd.commandType && cmd.commandType.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory ? cmd.category === activeCategory : true;
      const matchesCommon = showOnlyCommon ? cmd.isCommon === true : true;
      const matchesMode = activeModeFilter ? cmd.mode === activeModeFilter : true;
      const matchesSource = activeSourceFilter ? cmdSource === activeSourceFilter : true;
      const matchesProfile = activeProfileFilter ? cmdProfile === activeProfileFilter : true;

      return matchesSearch && matchesCategory && matchesCommon && matchesMode && matchesSource && matchesProfile;
    });
  }, [searchQuery, activeCategory, showOnlyCommon, activeModeFilter, activeSourceFilter, activeProfileFilter]);

  const selectedCommand = useMemo(() => {
    return VIM_COMMANDS.find((cmd) => cmd.id === selectedCommandId) || filteredCommands[0] || VIM_COMMANDS[0];
  }, [selectedCommandId, filteredCommands]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setShowOnlyCommon(false);
    setActiveModeFilter(null);
    setActiveSourceFilter(null);
    setActiveProfileFilter(null);
  };

  const handleExportMarkdown = () => {
    if (filteredCommands.length === 0) return;
    let markdown = `| Key | Action / Function | Mode | Notes |\n| --- | --- | --- | --- |\n`;
    filteredCommands.forEach(cmd => {
      const modeStr = cmd.mode === 'command-line' ? 'cmd' : cmd.mode;
      const notesStr = cmd.notes ? cmd.notes.replace(/\|/g, '\\|') : '';
      const descStr = cmd.description.replace(/\|/g, '\\|');
      markdown += `| \`${cmd.key}\` | ${descStr} | *${modeStr}* | ${notesStr} |\n`;
    });
    navigator.clipboard.writeText(markdown)
      .then(() => {
        setExportStatus('copied');
        if (exportTimeoutRef.current) clearTimeout(exportTimeoutRef.current);
        exportTimeoutRef.current = window.setTimeout(() => setExportStatus('idle'), 2000);
      })
      .catch((err) => console.error('Failed to export cheatsheet markdown: ', err));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Learning roadmap recommender */}
      {completedCommands.length < 16 && (
        <details className="group border border-az-border-subtle rounded-xl overflow-hidden bg-az-bg-alt font-sans" open={completedCommands.length === 0}>
          <summary className="px-4 py-2 text-xs font-bold text-az-text-heading cursor-pointer list-none flex justify-between items-center hover:bg-az-bg-soft select-none">
            <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
              <Sparkles className="w-3.5 h-3.5 text-az-active fill-az-active/10" />
              <span>GUIDED LEARNING COMPANION PATH</span>
            </div>
            <span className="text-[10px] text-az-text-muted group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-3 border-t border-az-border-subtle bg-az-bg-canvas/30">
            <LearningStartPanel
              completedCommands={completedCommands}
              onStartPractice={(taskIdx: number, cmd?: string) => {
                if (cmd) {
                  const cmdObj = VIM_COMMANDS.find(c => c.key === cmd);
                  if (cmdObj) setSelectedCommandId(cmdObj.id);
                }
                // Redirect to sandbox tab
                const sandboxBtn = document.querySelector('[aria-label="Practice Buffer sandbox tab"]') as HTMLButtonElement | null;
                if (sandboxBtn) {
                  sandboxBtn.click();
                }
                try {
                  localStorage.setItem('vim_sandbox_target_task', taskIdx.toString());
                  window.dispatchEvent(new CustomEvent('vim_sandbox_set_task', { detail: taskIdx }));
                } catch {}
              }}
            />
          </div>
        </details>
      )}
      
      {/* Search Bar Inputs & Quick Level filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
        
        {/* Main query bar */}
        <div className="relative sm:col-span-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-az-text-muted" />
          <input
            id="cheatsheet-search-input"
            type="text"
            placeholder="Search keys, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-14 py-1.5 bg-az-bg-canvas border border-az-border-subtle rounded-lg text-xs placeholder-az-text-faint focus:outline-none focus:ring-1.5 focus:ring-az-active/40 font-medium transition-all text-az-text-primary"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none select-none">
            <kbd className="px-1 text-[9px] font-mono font-bold bg-az-bg-embedded text-az-text-muted border border-az-border-subtle rounded leading-none py-0.5">Ctrl</kbd>
            <span className="text-[9px] text-az-text-faint font-bold font-mono">+</span>
            <kbd className="px-1.5 text-[9px] font-mono font-bold bg-az-bg-embedded text-az-text-muted border border-az-border-subtle rounded leading-none py-0.5">K</kbd>
          </div>
        </div>

        {/* Common Commands checklist button */}
        <div className="sm:col-span-2 flex border border-az-border-subtle bg-az-bg-alt rounded-lg p-0.5 font-sans text-[10.5px]">
          <button
            onClick={() => setShowOnlyCommon(false)}
            className={`flex-1 py-0.5 px-1 rounded transition-all font-medium cursor-pointer ${!showOnlyCommon ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50' : 'text-az-text-muted hover:text-az-text-heading'}`}
          >
            All ({VIM_COMMANDS.length})
          </button>
          <button
            onClick={() => setShowOnlyCommon(true)}
            className={`flex-1 py-0.5 px-1 rounded transition-all font-medium flex items-center justify-center gap-1 cursor-pointer ${showOnlyCommon ? 'bg-az-active text-az-bg-canvas font-bold shadow-sm' : 'text-az-text-muted hover:text-az-text-heading'}`}
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Essential</span>
          </button>
        </div>

        {/* Mode filter buttons bar */}
        <div className="sm:col-span-3 flex border border-az-border-subtle bg-az-bg-alt rounded-lg p-0.5 font-mono text-[10px] text-az-text-muted">
          <button
            onClick={() => setActiveModeFilter(null)}
            className={`flex-1 py-0.5 rounded transition-all cursor-pointer ${!activeModeFilter ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50 font-bold' : 'hover:text-az-text-heading'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveModeFilter('normal')}
            className={`flex-1 py-0.5 rounded transition-all cursor-pointer ${activeModeFilter === 'normal' ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50 font-bold' : 'hover:text-az-text-heading'}`}
          >
            Norm
          </button>
          <button
            onClick={() => setActiveModeFilter('visual')}
            className={`flex-1 py-0.5 rounded transition-all cursor-pointer ${activeModeFilter === 'visual' ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50 font-bold' : 'hover:text-az-text-heading'}`}
          >
            Vis
          </button>
          <button
            onClick={() => setActiveModeFilter('insert')}
            className={`flex-1 py-0.5 rounded transition-all cursor-pointer ${activeModeFilter === 'insert' ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50 font-bold' : 'hover:text-az-text-heading'}`}
          >
            Ins
          </button>
          <button
            onClick={() => setActiveModeFilter('command-line')}
            className={`flex-1 py-0.5 rounded transition-all cursor-pointer ${activeModeFilter === 'command-line' ? 'bg-az-bg-workarea text-az-active shadow-sm border border-az-border-subtle/50 font-bold' : 'hover:text-az-text-heading'}`}
          >
            Cmd
          </button>
        </div>

        {/* Expert Toggle Switch */}
        <div className="sm:col-span-2 flex items-center justify-between border border-az-border-subtle bg-az-bg-alt rounded-lg px-2.5 py-0.5 text-[10.5px] font-sans">
          <span className="font-semibold text-az-text-muted flex items-center gap-1">
            <Zap className={`w-3.5 h-3.5 transition-colors ${isExpertMode ? 'text-az-warning fill-az-warning/20' : 'text-az-text-faint'}`} />
            Expert view
          </span>
          <button
            role="switch"
            aria-checked={isExpertMode}
            aria-label="Expert view"
            onClick={() => setIsExpertMode(!isExpertMode)}
            className={`relative inline-flex h-4 w-7.5 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isExpertMode ? 'bg-az-active' : 'bg-az-bg-embedded border border-az-border-subtle'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-az-bg-workarea shadow ring-0 transition duration-200 ease-in-out ${
                isExpertMode ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Advanced Filters Expand/Collapse Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`sm:col-span-1 py-1 px-2 rounded-lg border text-[10.5px] font-bold font-sans flex items-center justify-center gap-1 transition-all cursor-pointer ${
            showAdvancedFilters 
              ? 'bg-az-active/10 border-az-active text-az-active shadow-xs' 
              : 'bg-az-bg-alt border-az-border-subtle text-az-text-muted hover:text-az-text-heading'
          }`}
          title="Toggle advanced filters panel"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Advanced Collapsible Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-az-bg-alt border border-az-border-subtle p-3 rounded-xl flex flex-col gap-3.5 shadow-sm text-xs animate-fade-in font-sans">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold text-az-text-faint uppercase tracking-wider">Sources:</span>
              <div className="flex bg-az-bg-embedded p-0.5 rounded-md border border-az-border-subtle font-mono text-[10px]">
                <button
                  onClick={() => {
                    setActiveSourceFilter(null);
                    setActiveProfileFilter(null);
                  }}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${!activeSourceFilter ? 'bg-az-bg-workarea text-az-active shadow-xs font-semibold' : 'text-az-text-muted hover:text-az-text-heading'}`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setActiveSourceFilter('standard');
                    setActiveProfileFilter(null);
                  }}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeSourceFilter === 'standard' ? 'bg-az-bg-workarea text-az-active shadow-xs font-semibold' : 'text-az-text-muted hover:text-az-text-heading'}`}
                >
                  Vim Core
                </button>
                <button
                  onClick={() => {
                    setActiveSourceFilter('neovim');
                    setActiveProfileFilter(null);
                  }}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeSourceFilter === 'neovim' ? 'bg-az-bg-workarea text-az-active shadow-xs font-semibold' : 'text-az-text-muted hover:text-az-text-heading'}`}
                >
                  Neovim
                </button>
                <button
                  onClick={() => {
                    setActiveSourceFilter('azwerks');
                    setActiveProfileFilter(null);
                  }}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeSourceFilter === 'azwerks' ? 'bg-az-bg-workarea text-az-active shadow-xs font-semibold' : 'text-az-text-muted hover:text-az-text-heading'}`}
                >
                  AZWERKS
                </button>
              </div>
            </div>

            {availableProfiles.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-az-text-faint uppercase tracking-wider">Profiles:</span>
                <select
                  value={activeProfileFilter || ''}
                  onChange={(e) => setActiveProfileFilter(e.target.value || null)}
                  className="bg-az-bg-embedded px-2 py-0.5 rounded-md border border-az-border-subtle font-mono text-[10px] text-az-text-primary focus:outline-none focus:ring-1 focus:ring-az-active/30"
                >
                  <option value="">All Profiles</option>
                  {availableProfiles.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof.replace('azwerks-', '').replace('-', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[9px] font-bold text-az-text-faint uppercase tracking-wider block pl-0.5">Categories:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  !activeCategory
                    ? 'bg-az-active text-az-bg-canvas border-az-active font-bold shadow-sm'
                    : 'bg-az-bg-soft hover:bg-az-bg-raised text-az-text-muted border-az-border-subtle'
                }`}
              >
                All Categories
              </button>

              {COMMAND_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     className={`px-2.5 py-1 rounded-full text-[10.5px] whitespace-nowrap font-medium transition-all flex items-center gap-1 border cursor-pointer ${
                       isSelected
                         ? 'bg-az-active text-az-bg-canvas border-az-active font-bold shadow-sm'
                         : `${cat.color} hover:opacity-85 text-xs`
                     }`}
                  >
                    {renderCategoryIcon(cat.icon)}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Database Main Content Body - Divided into Left List & Right Preview inspect panel */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        
        {/* COMMANDS LIST TABLE */}
        <div className="col-span-7 xl:col-span-8 border border-az-border-subtle rounded-xl overflow-hidden flex flex-col h-[400px] bg-az-bg-canvas shadow-sm">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-az-bg-alt border-b border-az-border-subtle text-[10px] font-mono font-bold tracking-wider text-az-text-muted">
            <span className="col-span-3">KEYSTROKE</span>
            <span className="col-span-6">FUNCTION / ACTION</span>
            <span className="col-span-2 text-center">MODE</span>
            <span className="col-span-1 text-right">COPY</span>
          </div>

          {/* Table Rows (scrollable overflow) */}
          <div className="flex-1 overflow-hidden font-mono bg-az-bg-canvas">
            {filteredCommands.length > 0 ? (
              <List<CommandRowProps>
                rowCount={filteredCommands.length}
                rowHeight={36}
                rowProps={{ filteredCommands, selectedCommandId, copiedId, isExpertMode, setSelectedCommandId, handleCopy }}
                className="overflow-y-auto overscroll-contain scrollbar-thin"
                rowComponent={CommandRow}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-az-text-muted gap-2 font-sans">
                <SlidersHorizontal className="w-8 h-8 opacity-40 animate-pulse text-az-active" />
                <span className="text-xs font-semibold">No commands found matching query</span>
                <button 
                  onClick={resetAllFilters}
                  className="mt-1 text-[11px] font-bold text-az-active hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Table Footer info */}
          <div className="px-3 py-1.5 bg-az-bg-alt border-t border-az-border-subtle text-[10px] font-mono text-az-text-muted flex justify-between items-center">
            <span>Showing {filteredCommands.length} of {VIM_COMMANDS.length} commands</span>
            <button
              onClick={handleExportMarkdown}
              disabled={filteredCommands.length === 0}
              className="px-2 py-0.5 rounded bg-az-active/10 hover:bg-az-active/20 text-az-active border border-az-active/20 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 text-[10px]"
            >
              {exportStatus === 'copied' ? (
                <span>✓ Copied Table!</span>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" />
                  <span>Export Markdown</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* SIDE PREVIEW DETAILED COMPANION GUIDE */}
        <div className={`col-span-5 xl:col-span-4 border p-4 rounded-xl flex flex-col justify-between shadow-md transition-all duration-300 ${
          isExpertMode 
            ? 'bg-az-bg-canvas border-az-warning/35 text-az-text-primary shadow-az-warning/5' 
            : 'bg-az-bg-alt border-az-border-subtle text-az-text-primary'
        }`}>
          <div className="space-y-3.5">
            
            {/* Header block */}
            <div className={`border-b pb-2.5 ${isExpertMode ? 'border-az-warning/15' : 'border-az-border-subtle'}`}>
              <span className={`text-[9.5px] font-mono uppercase font-bold tracking-wider block ${isExpertMode ? 'text-az-warning font-bold tracking-widest' : 'text-az-text-faint'}`}>
                {isExpertMode ? '⚡ EXPERT WORKBENCH SEQUENCE' : 'COMMAND REGISTER'}
              </span>
              <h2 className="text-[13px] font-bold font-mono mt-1 flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded border text-xs leading-none ${
                  isExpertMode 
                    ? 'bg-az-warning/10 border-az-warning/30 text-az-warning font-bold' 
                    : 'bg-az-bg-embedded border-az-border-subtle text-az-active font-bold'
                }`}>
                  {selectedCommand.key}
                </span>
                <span className="truncate text-az-text-heading">
                  {isExpertMode ? 'Master Sequence' : 'Command Overview'}
                </span>
              </h2>
            </div>

            {/* Core Description cards */}
            <div className="space-y-3.5 font-sans text-xs">
              
              {isExpertMode ? (
                <>
                  {/* Sequence Visual Display */}
                  <div>
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-az-warning block mb-1">EXECUTION KEYSTRING</span>
                    <div className="bg-az-warning/10 border border-az-warning/15 text-az-warning px-3 py-1.5 rounded-lg flex items-center gap-1 font-mono text-[11px] flex-wrap">
                      {(selectedCommand.expertWorkflow?.sequence || selectedCommand.key).split(' ').map((char, index) => {
                        if (char === '->') return <span key={index} className="text-az-text-faint mx-1">→</span>;
                        return (
                          <span key={index} className="bg-az-warning/10 border border-az-warning/25 px-1.5 py-0.5 rounded text-[10px] text-az-warning font-semibold shadow-xs">
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Multi-step list tracker */}
                  <div>
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-az-warning block mb-2">WORKFLOW SEQUENCE STEPS</span>
                    <div className="relative border-l border-az-warning/20 pl-4 ml-2.5 space-y-3 font-sans">
                      {selectedCommand.expertWorkflow ? (
                        selectedCommand.expertWorkflow.steps.map((step, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute left-[-24px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-az-warning/10 border border-az-warning/25 text-[9px] font-mono font-bold text-az-warning shadow-md">
                              {idx + 1}
                            </span>
                            <p className="text-[11px] leading-relaxed text-az-text-muted">
                              {step}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="relative">
                          <span className="absolute left-[-24px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-az-bg-embedded border border-az-border-subtle text-[9px] font-mono font-bold text-az-text-muted">
                            1
                          </span>
                          <p className="text-[11px] leading-relaxed text-az-text-muted">
                            {selectedCommand.description}
                          </p>
                          <div className="mt-3 p-2.5 bg-az-bg-embedded border border-az-border-subtle rounded text-[10px] leading-relaxed text-az-text-muted italic">
                            💡 {(() => {
                              if (selectedCommand.category === 'motion') {
                                  return `Pro Tip: Combine with count prefixes! Typing "[number]${selectedCommand.key}" repeats this movement multiple times. Try typing "5${selectedCommand.key}" to skip sections.`;
                              }
                              if (selectedCommand.category === 'edit') {
                                return `Pro Tip: Chain this edit command with movement operators to define precise ranges. E.g., "d3${selectedCommand.key}" to execute cuts.`;
                              }
                              return `Pro Tip: Workflows can be recorded recursively. Use macro features to automate repetitive keyboard iterations.`;
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Target Outcome console box */}
                  <div className="mt-3 bg-az-bg-canvas border border-az-border-subtle rounded-lg p-2.5 font-mono text-[10.5px]">
                    <span className="text-az-warning/50 block text-[8px] tracking-wider uppercase mb-1">EXPECTED TERMINAL OUTCOME</span>
                    <p className="text-az-text-primary leading-relaxed text-[11px]">
                      {selectedCommand.expertWorkflow?.outcome || 'Executes atomic editor cursor layout update.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Standard Display */}
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint block">Command</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 rounded bg-az-bg-canvas border border-az-border-default font-mono font-extrabold text-az-active text-sm shadow-sm select-all">
                        {selectedCommand.key}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-az-bg-embedded text-az-text-muted border border-az-border-subtle font-semibold">
                        {selectedCommand.mode} Mode
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint block">Meaning</span>
                    <p className="text-az-text-heading font-semibold mt-1 bg-az-bg-workarea p-2 rounded-lg border border-az-border-subtle leading-relaxed text-[11.5px]">
                      {selectedCommand.description}
                    </p>
                  </div>

                  {getMnemonic(selectedCommand.key) && (
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint block">Mnemonic</span>
                      <p className="text-az-text-muted mt-1 leading-normal text-[11px] bg-az-bg-canvas/30 p-2 rounded border border-az-border-subtle/50">
                        {getMnemonic(selectedCommand.key)}
                      </p>
                    </div>
                  )}

                  {selectedCommand.notes && (
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint block">Usage Notes & Tips</span>
                      <p className="text-az-text-muted mt-0.5 italic leading-normal py-0.5 text-[11px]">
                        "{selectedCommand.notes}"
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint block">Related Keys</span>
                    <p className="text-az-text-muted mt-1 font-mono text-[10.5px]">
                      {getRelatedKeys(selectedCommand.category, selectedCommand.key)}
                    </p>
                  </div>

                  {/* Context Action Guide help */}
                  <div className="bg-az-active/10 border border-az-active/10 p-2.5 rounded-lg mt-2 text-[10.5px] text-az-active">
                    <span className="font-bold block text-az-active mb-0.5">💡 Vim Action Trigger</span>
                    To use <span className="font-mono bg-az-bg-embedded px-1 py-0.5 rounded text-[10px] font-semibold text-az-text-primary">{selectedCommand.key}</span>, ensure you are in <span className="capitalize font-semibold">{selectedCommand.mode} mode</span> and press keys.
                  </div>

                  {/* Try it now action button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const sandboxBtn = document.querySelector('[aria-label="Practice Buffer sandbox tab"]') as HTMLButtonElement | null;
                        if (sandboxBtn) {
                          sandboxBtn.click();
                        }
                        try {
                          localStorage.setItem('vim_sandbox_target_command', selectedCommand.key);
                          window.dispatchEvent(new CustomEvent('vim_sandbox_set_command', { detail: selectedCommand.key }));
                        } catch {}
                      }}
                      className="w-full py-2 rounded-lg bg-az-active text-az-bg-canvas hover:opacity-90 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-az-active/10"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Practice this command</span>
                    </button>
                  </div>
                </>
              )}

            </div>

          </div>

          <div className={`pt-3 border-t flex items-center justify-between text-[10px] font-mono mt-4 ${
            isExpertMode 
              ? 'border-az-warning/20 text-az-warning/85' 
              : 'border-az-border-subtle text-az-text-faint'
          }`}>
            <span>ID Code: #{selectedCommand.id}</span>
            <button
              onClick={() => handleCopy(selectedCommand)}
              className={`flex items-center gap-1 transition-colors font-bold ${
                isExpertMode 
                  ? 'hover:text-az-active text-az-warning cursor-pointer' 
                  : 'hover:text-az-active text-az-active font-bold cursor-pointer'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Direct</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
