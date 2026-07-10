import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ProblemTemplate {
  id: string;
  label: string;
  desc: string;
  commands: string[];
}

export const PROBLEMS: ProblemTemplate[] = [
  {
    id: 'plugin',
    label: 'Plugin error',
    desc: 'Plugins fail to load, show lua runtime errors, or are completely missing.',
    commands: [':Lazy sync', ':Mason', ':checkhealth']
  },
  {
    id: 'format',
    label: 'Formatting broken',
    desc: 'Code formatting on save is inactive, or incorrect style rules are applied.',
    commands: [':AzwerksFormatStatus', ':set ft?']
  },
  {
    id: 'keymap',
    label: 'Keybinding conflict',
    desc: 'Pressing shortcut keys triggers unexpected actions or does nothing.',
    commands: [':verbose nmap <keys>', ':messages']
  },
  {
    id: 'save',
    label: 'File will not save',
    desc: 'Permission denied or swap files exist, preventing writing changes to disk.',
    commands: [':w!', ':recover', ':q!']
  },
  {
    id: 'theme',
    label: 'Theme looks wrong',
    desc: 'Syntax highlighting colors are distorted or background transparent behaves incorrectly.',
    commands: [':AzwerksThemeReload', ':AzwerksToggleBackground']
  },
  {
    id: 'lsp',
    label: 'LSP not working',
    desc: 'Auto-completion, diagnostics, and jump-to-definitions are unresponsive.',
    commands: [':checkhealth', ':AzwerksHealthCheck', ':Mason']
  }
];

interface RecoveryProblemPickerProps {
  activeProblem: string | null;
  onSelectProblem: (id: string | null) => void;
}

export default function RecoveryProblemPicker({
  activeProblem,
  onSelectProblem,
}: RecoveryProblemPickerProps) {
  return (
    <div className="bg-az-bg-alt border border-az-border-subtle p-4 rounded-xl flex flex-col gap-4 shadow-sm font-sans">
      <div className="flex items-center gap-2 border-b border-az-border-subtle pb-2.5">
        <AlertCircle className="w-4 h-4 text-az-warning" />
        <h3 className="text-xs font-mono font-bold tracking-wider text-az-text-heading">
          TRIAGE PROBLEMS: WHAT HAPPENED?
        </h3>
      </div>

      {/* Grid of problems */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PROBLEMS.map((prob) => {
          const isActive = prob.id === activeProblem;
          return (
            <button
              key={prob.id}
              onClick={() => onSelectProblem(isActive ? null : prob.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                isActive
                  ? 'bg-az-active/10 border-az-active text-az-active shadow-sm font-bold'
                  : 'bg-az-bg-canvas border-az-border-subtle text-az-text-muted hover:border-az-border-default hover:text-az-text-primary'
              }`}
            >
              {prob.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
