export type VimMode = 'normal' | 'insert' | 'visual' | 'command-line' | 'command' | 'terminal';

export interface ExpertWorkflow {
  sequence: string;
  steps: string[];
  outcome: string;
}

export interface VimCommand {
  id: string;
  key: string;
  description: string;
  category: string;
  mode: VimMode;
  notes?: string;
  isCommon?: boolean;
  expertWorkflow?: ExpertWorkflow;
  source?: 'standard' | 'neovim' | 'azwerks';
  profile?: string;
  plugin?: string;
  caution?: boolean;
  context?: string;
  commandType?: string;
}

export interface KeyboardKey {
  code: string;
  label: string; // e.g., 'Q'
  normal: {
    command: string;      // e.g., 'q'
    action: string;       // e.g., 'Record macro (into register)'
    description: string;  // Detailed explanation
  } | null;
  shift: {
    command: string;      // e.g., 'Q'
    action: string;       // e.g., 'Enter Ex mode'
    description: string;
  } | null;
  ctrl: {
    command: string;      // e.g., 'Ctrl-R'
    action: string;       // e.g., 'Redo'
    description: string;
  } | null;
  row: number;
  width?: string;         // For spec keys (e.g. Tab, Shift, Space)
  spaced?: boolean;       // Extra spacer class
}

export interface CommandCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface VimTip {
  id: string;
  title: string;
  command: string;
  category: string;
  description: string;
  scenario: string;
  steps: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
