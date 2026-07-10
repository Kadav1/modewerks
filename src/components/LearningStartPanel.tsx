import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Play } from 'lucide-react';

interface LearningStartPanelProps {
  completedCommands: string[];
  onStartPractice: (taskIndex: number, cmd?: string) => void;
}

export default function LearningStartPanel({
  completedCommands,
  onStartPractice,
}: LearningStartPanelProps) {
  // Check completion states
  const hasMovement = ['h', 'j', 'k', 'l'].every(c => completedCommands.includes(c));
  const hasInsert = completedCommands.includes('i');
  const hasSaveQuit = [':w', ':q'].some(c => completedCommands.includes(c));
  const hasEditing = ['x', 'o'].every(c => completedCommands.includes(c));
  const hasSearch = completedCommands.includes('~') || completedCommands.includes('r'); // using ~ or r as proxy for more advanced sandbox tasks

  // Determine current step index (1-based)
  let currentStep = 1;
  let title = 'Movement Basics';
  let desc = 'Learn to navigate the screen using classical Vim keys instead of arrow keys.';
  let keys = ['h', 'j', 'k', 'l'];
  let actionText = 'Learn h j k l';
  let taskIndex = 0;

  if (!hasMovement) {
    currentStep = 1;
    title = 'Movement Basics';
    desc = 'Master navigation without leaving the home row. Use h (left), j (down), k (up), l (right).';
    keys = ['h', 'j', 'k', 'l'];
    actionText = 'Start Movement Practice';
    taskIndex = 0;
  } else if (!hasInsert) {
    currentStep = 2;
    title = 'Insert & Normal Mode';
    desc = 'Vim is modal. Press i to insert text, and Escape (Esc) to return to Normal mode to navigate.';
    keys = ['i', 'Esc'];
    actionText = 'Learn i / Esc';
    taskIndex = 1;
  } else if (!hasSaveQuit) {
    currentStep = 3;
    title = 'Save & Quit File';
    desc = 'Learn to write changes and safely exit. Use :w to write/save and :q to quit.';
    keys = [':w', ':q', ':wq'];
    actionText = 'Learn Save and Quit';
    taskIndex = 2;
  } else if (!hasEditing) {
    currentStep = 4;
    title = 'Editing Basics';
    desc = 'Delete characters with x, open lines with o, and modify text elements efficiently.';
    keys = ['x', 'o', 'r'];
    actionText = 'Practice Editing Basics';
    taskIndex = 3;
  } else if (!hasSearch) {
    currentStep = 5;
    title = 'Search & Case Toggle';
    desc = 'Search files using / and navigate results, or swap character cases using the tilde (~).';
    keys = ['~', 'r', ':'];
    actionText = 'Practice Advanced Toggles';
    taskIndex = 4;
  } else {
    currentStep = 6;
    title = 'Basics Mastered!';
    desc = 'You have completed all initial practice modules. Dive into the Expert Workbench modes!';
    keys = [];
    actionText = 'Explore Configuration Generator';
    taskIndex = 5;
  }

  const steps = [
    { id: 1, label: 'Movement', keys: ['h', 'j', 'k', 'l'], done: hasMovement },
    { id: 2, label: 'Insert Mode', keys: ['i', 'Esc'], done: hasInsert },
    { id: 3, label: 'Save & Quit', keys: [':w', ':q', ':wq'], done: hasSaveQuit },
    { id: 4, label: 'Editing Basics', keys: ['x', 'o'], done: hasEditing },
    { id: 5, label: 'Search & Replace', keys: ['~', 'r'], done: hasSearch },
  ];

  return (
    <div className="bg-az-bg-alt border border-az-border-subtle p-4 rounded-xl flex flex-col gap-4 shadow-sm font-sans">
      <div className="flex items-center justify-between border-b border-az-border-subtle pb-2.5">
        <h3 className="text-[11px] font-mono font-bold tracking-wider text-az-text-heading flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-az-active" />
          GUIDED LEARNING COMPANION
        </h3>
        <span className="text-[9.5px] font-mono bg-az-active/10 text-az-active px-2 py-0.5 rounded border border-az-active/20 font-bold">
          Stage {currentStep} of 6
        </span>
      </div>

      {/* Progress timeline */}
      <div className="grid grid-cols-5 gap-2 items-center text-[9.5px] font-mono py-1">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border font-bold ${
                s.done
                  ? 'bg-az-success/20 border-az-success text-az-success'
                  : currentStep === s.id
                  ? 'bg-az-active border-az-active text-az-bg-canvas animate-pulse'
                  : 'bg-az-bg-canvas border-az-border-subtle text-az-text-faint'
              }`}>
                {s.done ? '✓' : s.id}
              </span>
              <span className={`hidden md:inline font-sans truncate ${currentStep === s.id ? 'text-az-text-heading font-bold' : 'text-az-text-muted'}`}>
                {s.label}
              </span>
            </div>
            <div className={`h-1 rounded-full ${s.done ? 'bg-az-success' : currentStep === s.id ? 'bg-az-active' : 'bg-az-bg-canvas'}`} />
          </div>
        ))}
      </div>

      {/* Recommender card */}
      <div className="bg-az-bg-canvas/50 border border-az-border-subtle/60 p-3.5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 max-w-lg">
          <span className="text-[9px] font-mono uppercase tracking-wider text-az-active font-bold">Next Recommendation</span>
          <h4 className="text-[11.5px] font-bold text-az-text-heading flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-az-warning fill-az-warning/20 animate-pulse" />
            {title}
          </h4>
          <p className="text-[11px] text-az-text-muted leading-relaxed font-sans">
            {desc}
          </p>
          {keys.length > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[9.5px] font-mono text-az-text-faint uppercase mr-1">Target keys:</span>
              {keys.map((k) => (
                <kbd key={k} className="px-1.5 py-0.5 rounded bg-az-bg-embedded border border-az-border-subtle text-az-text-primary font-mono text-[9px] font-bold">
                  {k}
                </kbd>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onStartPractice(taskIndex)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-az-active text-az-bg-canvas hover:opacity-90 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-az-active/20 shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
