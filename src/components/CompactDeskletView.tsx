import React, { useState, useMemo } from 'react';
import { Search, Flame, Keyboard, Sliders, HeartPulse, Sparkles, BookOpen, Copy, Check, Play } from 'lucide-react';
import { VIM_COMMANDS } from '../data/vimData';
import { VimCommand } from '../types';
import LearningStartPanel from './LearningStartPanel';

interface CompactDeskletViewProps {
  completedCommands: string[];
  onStartPractice: (taskIndex: number, specificCommand?: string) => void;
  onNavigateToTab: (tab: 'cheatsheet' | 'keyboard' | 'sandbox' | 'configurator' | 'troubleshooting') => void;
  selectedCommandId: string | null;
  setSelectedCommandId: (id: string | null) => void;
}

export default function CompactDeskletView({
  completedCommands,
  onStartPractice,
  onNavigateToTab,
  selectedCommandId,
  setSelectedCommandId,
}: CompactDeskletViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return VIM_COMMANDS.filter((cmd) => {
      return (
        cmd.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cmd.notes && cmd.notes.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }).slice(0, 5); // Limit to top 5 results for low density
  }, [searchQuery]);

  // Use selected command or default to m1 (h)
  const selectedCommand = useMemo(() => {
    const found = VIM_COMMANDS.find((cmd) => cmd.id === selectedCommandId);
    return found || VIM_COMMANDS[0];
  }, [selectedCommandId]);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto py-2">
      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-az-text-muted" />
        <input
          type="text"
          placeholder="Search commands (e.g., 'dd', 'yank', ':w')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9.5 pr-4 py-2 bg-az-bg-alt border border-az-border-subtle rounded-xl text-xs placeholder-az-text-faint focus:outline-none focus:ring-1.5 focus:ring-az-active/40 font-medium transition-all text-az-text-primary"
        />
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-az-bg-workarea border border-az-border-default rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-az-border-subtle font-mono text-xs">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  onClick={() => {
                    setSelectedCommandId(cmd.id);
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-az-bg-soft cursor-pointer text-az-text-primary"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-az-bg-embedded border border-az-border-default text-az-active font-bold text-[10.5px]">
                      {cmd.key}
                    </span>
                    <span className="text-[11px] text-az-text-muted truncate max-w-[200px] sm:max-w-md">
                      {cmd.description}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-az-bg-embedded text-az-text-faint border border-az-border-subtle">
                    {cmd.mode}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-az-text-muted text-[11px] font-sans">
                No matching commands found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Learning roadmap recommender */}
      <LearningStartPanel
        completedCommands={completedCommands}
        onStartPractice={onStartPractice}
      />

      {/* Selected Command Card */}
      {selectedCommand && (
        <div className="bg-az-bg-alt border border-az-border-subtle p-4 rounded-xl flex flex-col gap-3.5 shadow-sm">
          <div className="border-b border-az-border-subtle pb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-az-text-faint font-bold">
                Selected Command Detail
              </span>
              {selectedCommand.isCommon && (
                <span className="text-[8.5px] font-sans font-bold px-1.5 py-0.2 rounded bg-az-active/10 text-az-active border border-az-active/20 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  <span>Essential</span>
                </span>
              )}
            </div>
            <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-az-bg-canvas text-az-text-muted border border-az-border-subtle">
              {selectedCommand.mode} Mode
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-az-bg-canvas border border-az-border-default font-mono font-extrabold text-az-active text-sm shadow-sm">
                  {selectedCommand.key}
                </span>
                <h4 className="text-xs font-bold text-az-text-heading font-sans">
                  {selectedCommand.description}
                </h4>
              </div>

              {selectedCommand.notes && (
                <p className="text-[11px] text-az-text-muted italic leading-relaxed font-sans pl-1">
                  💡 "{selectedCommand.notes}"
                </p>
              )}

              {selectedCommand.expertWorkflow && (
                <div className="bg-az-bg-canvas/40 border border-az-border-subtle/50 p-2.5 rounded-lg text-[10.5px] font-mono leading-relaxed space-y-1.5">
                  <span className="text-[8.5px] font-bold text-az-warning block tracking-wide uppercase">Workflow Sequence</span>
                  <div className="text-az-warning font-semibold">{selectedCommand.expertWorkflow.sequence}</div>
                  <div className="text-[10px] text-az-text-muted">{selectedCommand.expertWorkflow.steps[0]}</div>
                </div>
              )}
            </div>

            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => onStartPractice(0, selectedCommand.key)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-az-active/10 hover:bg-az-active/20 border border-az-active/30 text-az-active font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice Command</span>
              </button>
              <button
                onClick={() => handleCopy(selectedCommand.key)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-az-bg-canvas border border-az-border-default text-az-text-muted hover:text-az-text-heading font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-az-success" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      <div className="space-y-2">
        <h4 className="text-[9.5px] font-mono uppercase tracking-wider text-az-text-faint font-bold pl-1">
          Quick Actions into Workbench
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateToTab('sandbox')}
            className="flex flex-col items-center gap-2 p-3 bg-az-bg-alt border border-az-border-subtle rounded-xl hover:border-az-active/40 hover:bg-az-bg-soft transition-all text-center cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-az-warning/15 text-az-warning group-hover:bg-az-warning/25 transition-colors">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[11px] font-bold text-az-text-heading">Practice Sandbox</span>
            <span className="text-[9px] text-az-text-muted font-sans">Interactive editor buffer</span>
          </button>

          <button
            onClick={() => onNavigateToTab('keyboard')}
            className="flex flex-col items-center gap-2 p-3 bg-az-bg-alt border border-az-border-subtle rounded-xl hover:border-az-active/40 hover:bg-az-bg-soft transition-all text-center cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-az-info/15 text-az-info group-hover:bg-az-info/25 transition-colors">
              <Keyboard className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-az-text-heading">Keyboard Map</span>
            <span className="text-[9px] text-az-text-muted font-sans">Visual key layouts</span>
          </button>

          <button
            onClick={() => onNavigateToTab('configurator')}
            className="flex flex-col items-center gap-2 p-3 bg-az-bg-alt border border-az-border-subtle rounded-xl hover:border-az-active/40 hover:bg-az-bg-soft transition-all text-center cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-az-active/15 text-az-active group-hover:bg-az-active/25 transition-colors">
              <Sliders className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-az-text-heading">Vimrc Configurator</span>
            <span className="text-[9px] text-az-text-muted font-sans">Custom settings builder</span>
          </button>

          <button
            onClick={() => onNavigateToTab('troubleshooting')}
            className="flex flex-col items-center gap-2 p-3 bg-az-bg-alt border border-az-border-subtle rounded-xl hover:border-az-active/40 hover:bg-az-bg-soft transition-all text-center cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-az-success/15 text-az-success group-hover:bg-az-success/25 transition-colors">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-az-text-heading">Recovery Tools</span>
            <span className="text-[9px] text-az-text-muted font-sans">Diagnostics & recovery</span>
          </button>
        </div>
      </div>
    </div>
  );
}
