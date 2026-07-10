import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  HelpCircle, 
  CornerDownLeft, 
  Sparkles, 
  Undo,
  Info,
  Smartphone,
  Keyboard,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  wordForward,
  wordBackward,
  deleteChar,
  appendRowBelow
} from '../utils/vimEngine';
import { VimMode } from '../types';

const INITIAL_BUFFER = [
  "// === Linux Mint Cinnamon - Vim Sandbox ===",
  "// Mode: Press 'i' to start typing, 'Esc' to navigate",
  "let developer = {",
  "  name: 'Vim Apprentice',",
  "  editor: 'ViM',",
  "  speed: 'Accelerated',",
  "  learnedKeys: ['h', 'j', 'k', 'l', 'x']",
  "};",
  "",
  "function helloVim() {",
  "  console.log('Welcome to Mint Desklet sandbox!');",
  "  return 'Vim wizardry!';",
  "}"
];

const SANDBOX_COMMANDS = [
  { id: 'h', label: 'h', desc: 'Move Left' },
  { id: 'j', label: 'j', desc: 'Move Down' },
  { id: 'k', label: 'k', desc: 'Move Up' },
  { id: 'l', label: 'l', desc: 'Move Right' },
  { id: 'w', label: 'w', desc: 'Word Next' },
  { id: 'b', label: 'b', desc: 'Word Prev' },
  { id: 'x', label: 'x', desc: 'Delete Char' },
  { id: 'o', label: 'o', desc: 'Open Below' },
  { id: '~', label: '~', desc: 'Toggle Case' },
  { id: 'r', label: 'r', desc: 'Replace Char' },
  { id: 'i', label: 'i', desc: 'Insert Mode' },
  { id: 'a', label: 'a', desc: 'Append Mode' },
  { id: ':', label: ':', desc: 'Cmd Line' },
  { id: ':w', label: ':w', desc: 'Save File' },
  { id: ':q', label: ':q', desc: 'Quit Editor' },
  { id: ':wq', label: ':wq', desc: 'Write & Quit' }
];

const SANDBOX_TASKS = [
  {
    stage: 1,
    title: "Stage 1: Basic movements (h, j, k, l)",
    instruction: "Move cursor to helloVim function on line 9 (row 8). Use j and k to move down and up.",
    check: (row: number, col: number, buffer: string[]) => row === 8
  },
  {
    stage: 2,
    title: "Stage 2: Word-wise traversal (w, b)",
    instruction: "Move the cursor to the word 'developer' on line 3 (row 2). Use 'w' to move word-by-word.",
    check: (row: number, col: number, buffer: string[]) => row === 2 && col === 4
  },
  {
    stage: 3,
    title: "Stage 3: Editing text (x, r, i, a)",
    instruction: "We misspelled editor as 'ViM' on line 5 (row 4). Move cursor to 'M' of 'ViM' and delete it using 'x'.",
    check: (row: number, col: number, buffer: string[]) => {
      const line = buffer[4] || '';
      return !line.includes('ViM') && line.includes('Vi');
    }
  },
  {
    stage: 4,
    title: "Stage 4: Inserting lines (o)",
    instruction: "Open a new line below line 6 (row 5) by pressing 'o', then press Esc to return to Normal Mode.",
    check: (row: number, col: number, buffer: string[]) => buffer.length > INITIAL_BUFFER.length
  },
  {
    stage: 5,
    title: "Stage 5: Search & Next (/, n)",
    instruction: "Find the word 'wizardry' in the sandbox by using '/' search command or navigating directly to it (row 10, col 14).",
    check: (row: number, col: number, buffer: string[]) => row === 10 && col === 14
  },
  {
    stage: 6,
    title: "Stage 6: Save & Quit (:w, :q)",
    instruction: "Write the file by entering Command-line mode and typing ':w' followed by Enter.",
    check: (row: number, col: number, buffer: string[]) => false
  }
];

interface VimSandboxProps {
  onRecordCommand?: (cmd: string) => void;
  completedCommands?: string[];
  selectedCommandId?: string | null;
}

export default function VimSandbox({ 
  onRecordCommand, 
  completedCommands = [],
  selectedCommandId 
}: VimSandboxProps) {
  const [buffer, setBuffer] = useState<string[]>([...INITIAL_BUFFER]);
  const [cursorRow, setCursorRow] = useState<number>(2); // Start on first actual code line
  const [cursorCol, setCursorCol] = useState<number>(0);
  const [mode, setMode] = useState<VimMode>('normal');
  const [commandText, setCommandText] = useState<string>('');
  const [captureKeys, setCaptureKeys] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>('Sandbox initialized. Focus and practice h, j, k, l.');
  const [sandboxStatus, setSandboxStatus] = useState<{ type: 'info' | 'success' | 'warn'; msg: string }>({
    type: 'info',
    msg: 'Capture output enabled. Use h/j/k/l to move cursor.'
  });
  
  // Replace character flag helper
  const [replaceModeActive, setReplaceModeActive] = useState<boolean>(false);

  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);
  const activeTask = SANDBOX_TASKS[activeTaskIdx];
  const [taskSuccess, setTaskSuccess] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // State ref for event listener to prevent re-binding on every keystroke
  const stateRef = useRef({ cursorRow, cursorCol, mode, buffer, replaceModeActive, commandText });
  useEffect(() => {
    stateRef.current = { cursorRow, cursorCol, mode, buffer, replaceModeActive, commandText };
  }, [cursorRow, cursorCol, mode, buffer, replaceModeActive, commandText]);

  const notify = (actionName: string, detail: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setLastAction(`[Vim Mode: ${mode}] Keys: ${actionName}`);
    setSandboxStatus({ type, msg: detail });
  };

  // Restores baseline
  const resetSandbox = () => {
    setBuffer([...INITIAL_BUFFER]);
    setCursorRow(2);
    setCursorCol(0);
    setMode('normal');
    setCommandText('');
    setReplaceModeActive(false);
    notify('Reset', 'Restored editor sandbox to original state.', 'success');
  };

  // Movement helpers
  const handleMoveLeft = () => {
    setCursorCol((col) => moveLeft(col));
  };

  const handleMoveRight = () => {
    const { buffer, cursorRow, mode } = stateRef.current;
    setCursorCol((col) => moveRight(col, cursorRow, buffer, mode));
  };

  const handleMoveDown = () => {
    const { buffer, cursorRow, cursorCol, mode } = stateRef.current;
    const res = moveDown(cursorRow, cursorCol, buffer, mode);
    setCursorRow(res.row);
    setCursorCol(res.col);
  };

  const handleMoveUp = () => {
    const { buffer, cursorRow, cursorCol, mode } = stateRef.current;
    const res = moveUp(cursorRow, cursorCol, buffer, mode);
    setCursorRow(res.row);
    setCursorCol(res.col);
  };

  const handleWordForward = () => {
    const { buffer, cursorRow, cursorCol } = stateRef.current;
    const res = wordForward(cursorRow, cursorCol, buffer);
    setCursorRow(res.row);
    setCursorCol(res.col);
    notify('w', res.details);
  };

  const handleWordBackward = () => {
    const { buffer, cursorRow, cursorCol } = stateRef.current;
    const res = wordBackward(cursorRow, cursorCol, buffer);
    setCursorRow(res.row);
    setCursorCol(res.col);
    notify('b', 'Moved backward to start of previous word');
  };

  // Action helpers (delete, replace, add row)
  const handleDeleteChar = () => {
    const { buffer, cursorRow, cursorCol } = stateRef.current;
    const res = deleteChar(buffer, cursorRow, cursorCol);
    setBuffer(res.buffer);
    setCursorCol(res.col);
    notify('x', 'Deleted character matching cursor coordinates', 'warn');
  };

  const handleAppendRowBelow = () => {
    const { buffer, cursorRow } = stateRef.current;
    const res = appendRowBelow(buffer, cursorRow);
    setBuffer(res.buffer);
    setCursorRow(res.row);
    setCursorCol(res.col);
    setMode(res.mode);
    notify('o', 'Opened new line below. Started insert mode.', 'success');
  };

  const executeCommandLine = (cmd: string) => {
    const trimmed = cmd.trim();
    if (trimmed === ':w') {
      notify(':w', 'Saved sandbox buffer layout to memory cache.', 'success');
      onRecordCommand?.(':w');
      
      // Stage 6 task completion trigger
      if (activeTaskIdx === 5) {
        setTaskSuccess(true);
        notify(':w', 'Saved file! Stage 6 task completed successfully!', 'success');
        try {
          const stored = localStorage.getItem('vim_sandbox_completed_commands');
          const completed = stored ? JSON.parse(stored) : [];
          const nextCompleted = Array.from(new Set([...completed, ':w', ':q', ':wq']));
          localStorage.setItem('vim_sandbox_completed_commands', JSON.stringify(nextCompleted));
          window.dispatchEvent(new CustomEvent('vim_sandbox_progress_updated'));
        } catch {}
      }
    } else if (trimmed === ':q') {
      notify(':q', 'Vim terminal closing simulated. Resetting buffer...', 'warn');
      onRecordCommand?.(':q');
      resetSandbox();
    } else if (trimmed === ':wq' || trimmed === ':x') {
      notify(':wq', 'Changes persistent written. Reloading workbench details.', 'success');
      onRecordCommand?.(':wq');
      resetSandbox();
      
      // Stage 6 task completion trigger
      if (activeTaskIdx === 5) {
        setTaskSuccess(true);
        try {
          const stored = localStorage.getItem('vim_sandbox_completed_commands');
          const completed = stored ? JSON.parse(stored) : [];
          const nextCompleted = Array.from(new Set([...completed, ':w', ':q', ':wq']));
          localStorage.setItem('vim_sandbox_completed_commands', JSON.stringify(nextCompleted));
          window.dispatchEvent(new CustomEvent('vim_sandbox_progress_updated'));
        } catch {}
      }
    } else {
      notify(trimmed, `Command execution not supported: ${trimmed}. Try :w or :q`, 'warn');
    }
    setCommandText('');
    setMode('normal');
  };

  // Task checking effect
  useEffect(() => {
    const activeTask = SANDBOX_TASKS[activeTaskIdx];
    if (!activeTask) return;

    const isCompleted = activeTask.check(cursorRow, cursorCol, buffer);
    if (isCompleted && !taskSuccess) {
      setTaskSuccess(true);
      notify('Task Completed', `Great job! You achieved the goal for ${activeTask.title}!`, 'success');

      try {
        const stored = localStorage.getItem('vim_sandbox_completed_commands');
        const completed = stored ? JSON.parse(stored) : [];
        const taskCmds = [
          ['h', 'j', 'k', 'l'],
          ['w', 'b'],
          ['x', 'r', 'i', 'a'],
          ['o'],
          ['/'],
          [':w', ':q', ':wq']
        ][activeTaskIdx];

        const nextCompleted = Array.from(new Set([...completed, ...taskCmds]));
        localStorage.setItem('vim_sandbox_completed_commands', JSON.stringify(nextCompleted));
        window.dispatchEvent(new CustomEvent('vim_sandbox_progress_updated'));
      } catch {}
    } else if (!isCompleted && taskSuccess) {
      setTaskSuccess(false);
    }
  }, [cursorRow, cursorCol, buffer, activeTaskIdx, taskSuccess]);

  // Command load and external task load listeners
  useEffect(() => {
    const handleSetTask = (e: Event) => {
      const taskIdx = (e as CustomEvent).detail;
      if (typeof taskIdx === 'number' && taskIdx >= 0 && taskIdx < SANDBOX_TASKS.length) {
        setActiveTaskIdx(taskIdx);
        setTaskSuccess(false);
      }
    };
    
    const handleSetCommand = (e: Event) => {
      const targetCmd = (e as CustomEvent).detail;
      if (targetCmd) {
        let matchingIdx = -1;
        if (['h', 'j', 'k', 'l'].includes(targetCmd)) matchingIdx = 0;
        else if (['w', 'b', 'e'].includes(targetCmd)) matchingIdx = 1;
        else if (['x', 'r', 'i', 'a'].includes(targetCmd)) matchingIdx = 2;
        else if (['o', 'O'].includes(targetCmd)) matchingIdx = 3;
        else if (['/', '?', 'n', 'N'].includes(targetCmd)) matchingIdx = 4;
        else if ([':w', ':q', ':wq'].includes(targetCmd)) matchingIdx = 5;

        if (matchingIdx !== -1) {
          setActiveTaskIdx(matchingIdx);
          setTaskSuccess(false);
        }
        notify('Command Load', `Target command '${targetCmd}' loaded. Match with Task stage ${matchingIdx + 1}.`, 'info');
      }
    };

    window.addEventListener('vim_sandbox_set_task', handleSetTask);
    window.addEventListener('vim_sandbox_set_command', handleSetCommand);

    try {
      const storedTask = localStorage.getItem('vim_sandbox_target_task');
      if (storedTask) {
        setActiveTaskIdx(parseInt(storedTask, 10));
        setTaskSuccess(false);
        localStorage.removeItem('vim_sandbox_target_task');
      }
      
      const storedCmd = localStorage.getItem('vim_sandbox_target_command');
      if (storedCmd) {
        localStorage.removeItem('vim_sandbox_target_command');
        const event = new CustomEvent('vim_sandbox_set_command', { detail: storedCmd });
        window.dispatchEvent(event);
      }
    } catch {}

    return () => {
      window.removeEventListener('vim_sandbox_set_task', handleSetTask);
      window.removeEventListener('vim_sandbox_set_command', handleSetCommand);
    };
  }, []);

  // Keyboard capture effects
  useEffect(() => {
    if (!captureKeys) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default tab, backspace, slash actions while focused
      if (['Backspace', 'Tab', '/', '?'].includes(e.key)) {
        e.preventDefault();
      }

      const { cursorRow, cursorCol, mode, buffer, replaceModeActive, commandText } = stateRef.current;
      const rowText = buffer[cursorRow] || '';

      // ESC mode toggle
      if (e.key === 'Escape') {
        setMode('normal');
        setReplaceModeActive(false);
        setCommandText('');
        notify('Esc', 'Returned to Normal mode.');
        const maxCol = Math.max(0, rowText.length - 1);
        setCursorCol((c) => Math.min(c, maxCol));
        return;
      }

      // Replace character interceptor
      if (replaceModeActive && mode === 'normal') {
        if (e.key.length === 1) {
          const updated = [...buffer];
          updated[cursorRow] = rowText.slice(0, cursorCol) + e.key + rowText.slice(cursorCol + 1);
          setBuffer(updated);
          setReplaceModeActive(false);
          notify(`r${e.key}`, `Replaced character with ${e.key}`, 'success');
        }
        return;
      }

      // --- COMMAND MODE HANDLERS ---
      if (mode === 'command') {
        if (e.key === 'Enter') {
          executeCommandLine(commandText);
        } else if (e.key === 'Backspace') {
          if (commandText.length <= 1) {
            setMode('normal');
            setCommandText('');
          } else {
            setCommandText(commandText.slice(0, -1));
          }
        } else if (e.key.length === 1) {
          setCommandText((prev) => prev + e.key);
        }
        return;
      }

      // --- INSERT MODE HANDLERS ---
      if (mode === 'insert') {
        if (e.key === 'Backspace') {
          if (cursorCol > 0) {
            const updated = [...buffer];
            updated[cursorRow] = rowText.slice(0, cursorCol - 1) + rowText.slice(cursorCol);
            setBuffer(updated);
            setCursorCol(cursorCol - 1);
          } else if (cursorRow > 0) {
            // merge lines
            const updated = [...buffer];
            const prevLine = updated[cursorRow - 1];
            const combined = prevLine + rowText;
            updated[cursorRow - 1] = combined;
            updated.splice(cursorRow, 1);
            setBuffer(updated);
            setCursorRow(cursorRow - 1);
            setCursorCol(prevLine.length);
          }
        } else if (e.key === 'Enter') {
          const updated = [...buffer];
          const leftHalf = rowText.slice(0, cursorCol);
          const rightHalf = rowText.slice(cursorCol);
          updated[cursorRow] = leftHalf;
          updated.splice(cursorRow + 1, 0, rightHalf);
          setBuffer(updated);
          setCursorRow(cursorRow + 1);
          setCursorCol(0);
        } else if (e.key === 'Tab') {
          const updated = [...buffer];
          updated[cursorRow] = rowText.slice(0, cursorCol) + "  " + rowText.slice(cursorCol);
          setBuffer(updated);
          setCursorCol(cursorCol + 2);
        } else if (e.key.length === 1) {
          const updated = [...buffer];
          updated[cursorRow] = rowText.slice(0, cursorCol) + e.key + rowText.slice(cursorCol);
          setBuffer(updated);
          setCursorCol(cursorCol + 1);
        }
        return;
      }

      // --- NORMAL MODE HANDLERS ---
      if (mode === 'normal') {
        switch (e.key) {
          // cursor moves
          case 'h': handleMoveLeft(); onRecordCommand?.('h'); break;
          case 'l': handleMoveRight(); onRecordCommand?.('l'); break;
          case 'j': handleMoveDown(); onRecordCommand?.('j'); break;
          case 'k': handleMoveUp(); onRecordCommand?.('k'); break;
          
          // word navigation
          case 'w': handleWordForward(); onRecordCommand?.('w'); break;
          case 'b': handleWordBackward(); onRecordCommand?.('b'); break;

          // deletion
          case 'x': handleDeleteChar(); onRecordCommand?.('x'); break;

          // open down row
          case 'o': handleAppendRowBelow(); onRecordCommand?.('o'); break;

          // change case tilde
          case '~': {
            if (!rowText) break;
            const updated = [...buffer];
            const char = rowText[cursorCol];
            const toggled = char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
            updated[cursorRow] = rowText.slice(0, cursorCol) + toggled + rowText.slice(cursorCol + 1);
            setBuffer(updated);
            notify('~', 'Swapped character case under cursor', 'success');
            onRecordCommand?.('~');
            handleMoveRight();
            break;
          }

          // toggle replace single
          case 'r':
            setReplaceModeActive(true);
            notify('r', 'Replace pending. Type any keyboard character to swap.');
            onRecordCommand?.('r');
            break;

          // toggle insert modes
          case 'i':
            setMode('insert');
            notify('i', 'Swapped to Insert Mode. Type physical characters dynamically.', 'success');
            onRecordCommand?.('i');
            break;
          case 'a':
            setMode('insert');
            setCursorCol((c) => Math.min(rowText.length, c + 1));
            notify('a', 'Append Mode activated. Typing characters after cursor.', 'success');
            onRecordCommand?.('a');
            break;

          // trigger command console
          case ':':
            setMode('command');
            setCommandText(':');
            notify(':', 'Command-Line Console activated. Try :w or :q');
            onRecordCommand?.(':');
            break;

          default:
            // numerical counts or other warnings
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureKeys]);

  return (
    <div className="no-drag flex flex-col gap-5 w-full">
      
      {/* Sandbox instructions and capture checkbox header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-az-bg-alt border border-az-border-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-az-warning/10 text-az-warning">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-az-text-heading">Interactive Vim Terminal Sandbox</h2>
            <p className="text-[11px] text-az-text-muted">Interact with a real client-side text engine. Use buttons below or toggle physical capture.</p>
          </div>
        </div>

        {/* Capturing Toggle button indicator */}
        <div className="flex items-center gap-3">
          <button
            id={`phys-capture-toggle`}
            onClick={() => {
              setCaptureKeys(!captureKeys);
              notify('Keyboard Mode Toggle', captureKeys ? 'Keyboard hook disconnected.' : 'Keyboard hook captured! Try h, j, k, l keys.', captureKeys ? 'warn' : 'success');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              captureKeys 
                ? 'bg-az-active border-az-active text-az-bg-canvas shadow shadow-az-active/30' 
                : 'bg-az-bg-canvas border-az-border-default text-az-text-muted hover:bg-az-bg-alt'
            }`}
          >
            {captureKeys ? (
              <>
                <Keyboard className="w-4 h-4 animate-bounce" />
                <span>Intercepting Keys: ON</span>
              </>
            ) : (
              <>
                <Keyboard className="w-4 h-4" />
                <span>Capture Keys: OFF</span>
              </>
            )}
          </button>

          <button
            onClick={resetSandbox}
            className="p-2 rounded-lg bg-az-bg-alt hover:bg-az-bg-workarea text-az-text-muted border border-az-border-subtle transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Reset Terminal script buffer"
          >
            <Undo className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sandbox</span>
          </button>
        </div>
      </div>

      {/* Active Practice Task Box */}
      <div className="bg-az-bg-alt border border-az-border-subtle p-3.5 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-sans">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-az-active uppercase tracking-wider bg-az-active/10 px-1.5 py-0.5 rounded">
              Active Task
            </span>
            <span className="text-xs font-bold text-az-text-heading">
              {activeTask.title}
            </span>
          </div>
          <p className="text-xs text-az-text-muted">
            {activeTask.instruction}
          </p>
        </div>
        <div className="flex items-center gap-3 self-center sm:self-auto">
          {taskSuccess ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-az-success/10 border border-az-success/30 text-az-success font-bold text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>Goal Met!</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-az-bg-canvas border border-az-border-subtle text-az-text-muted text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-az-warning animate-pulse" />
              <span>In Progress...</span>
            </div>
          )}

          {/* Task picker buttons (Stage 1 to 6) */}
          <div className="flex items-center gap-1 bg-az-bg-canvas p-0.5 rounded-lg border border-az-border-subtle font-mono text-[10.5px]">
            {SANDBOX_TASKS.map((task, idx) => (
              <button
                key={task.stage}
                onClick={() => {
                  setActiveTaskIdx(idx);
                  setTaskSuccess(false);
                  notify('Task Switch', `Selected ${task.title}. Goal: check instruction.`, 'info');
                }}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold cursor-pointer transition-all ${
                  activeTaskIdx === idx 
                    ? 'bg-az-active text-az-bg-canvas' 
                    : 'text-az-text-muted hover:text-az-text-heading hover:bg-az-bg-soft'
                }`}
                title={task.title}
              >
                {task.stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Simulator Terminal on Left, Quick Help / Virtual Buttons on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* SIMULATOR SCREEN TERMINAL (Left) */}
        <div 
          ref={containerRef}
          className={`md:col-span-8 bg-az-bg-canvas text-az-text-primary p-5 rounded-2xl border shadow-2xl font-mono text-[11px] sm:text-xs min-h-[310px] relative flex flex-col justify-between transition-all duration-300 ${
            captureKeys 
              ? 'border-az-active ring-2 ring-az-active/30 shadow-[0_0_20px_rgba(206,218,74,0.15)]' 
              : 'border-az-border-subtle'
          }`}
        >
          {/* Terminal Window Chrome bar */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between border-b border-az-border-subtle pb-2 mb-3 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-az-danger" />
              <span className="w-2.5 h-2.5 rounded-full bg-az-warning" />
              <span className="w-2.5 h-2.5 rounded-full bg-az-success" />
              <span className="text-[10px] text-az-text-faint ml-2 font-mono">vim sandbox_engine.js</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-az-active/80">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active animate-ping inline-block" />
              <span>TERMINAL STREAM ACTIVE</span>
            </div>
          </div>

          <div className="h-5" /> {/* spacing */}

          {/* Lines rendering area */}
          <div className="flex-1 space-y-0.5 select-none overflow-y-auto max-h-[220px] py-1">
            {buffer.map((line, rIndex) => {
              const isCursorLine = rIndex === cursorRow;
              
              return (
                <div key={rIndex} className={`flex items-start ${isCursorLine ? 'bg-az-bg-alt' : ''}`}>
                  {/* Line Number rail */}
                  <span className="w-6 text-az-text-faint text-right pr-2 text-[10px] font-mono select-none">
                    {rIndex + 1}
                  </span>

                  {/* Character array layout to easily draw vertical cursor box */}
                  <span className="flex-1 whitespace-pre leading-5 relative tracking-wider">
                    {!isCursorLine ? (
                      line.length === 0 ? '\u00A0' : line
                    ) : line.length === 0 ? (
                      <span className={`inline-block w-2.5 h-4 align-middle ${
                        mode === 'insert' 
                          ? 'bg-az-active animate-pulse w-[2px]' 
                          : replaceModeActive 
                            ? 'bg-az-danger' 
                            : 'bg-az-warning'
                      }`} />
                    ) : (
                      line.split('').map((char, cIndex) => {
                        const isCursor = cIndex === cursorCol;
                        return (
                          <span 
                            key={cIndex}
                            className={`relative ${
                              isCursor 
                                ? mode === 'insert'
                                  ? 'text-az-bg-canvas bg-az-active font-extrabold animate-pulse'
                                  : replaceModeActive
                                    ? 'text-az-bg-canvas bg-az-danger font-extrabold'
                                    : 'text-az-bg-canvas bg-az-warning font-extrabold' 
                                : ''
                            }`}
                          >
                            {char}
                          </span>
                        );
                      })
                    )}
                    
                    {/* Insert mode append cursor at far right end */}
                    {isCursorLine && cursorCol >= line.length && mode === 'insert' && (
                      <span className="inline-block w-[2px] h-4 bg-az-active animate-pulse align-middle" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Vim Command Line bar and status bar combo */}
          <div className="mt-4 pt-2 border-t border-az-border-subtle">
            {/* Status Line */}
            <div className="bg-az-bg-alt px-3 py-1 text-[10px] text-az-text-faint rounded flex justify-between items-center select-none font-bold uppercase mb-2">
              <div className="flex items-center gap-1.5 font-mono">
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] ${
                  mode === 'insert' 
                    ? 'bg-az-success text-az-bg-canvas' 
                    : mode === 'command' 
                      ? 'bg-az-info text-az-bg-canvas' 
                      : 'bg-az-warning text-az-bg-canvas'
                }`}>
                  {mode === 'insert' ? '-- INSERT --' : mode === 'command' ? 'COMMAND' : replaceModeActive ? '-- REPLACE --' : '-- NORMAL --'}
                </span>
                <span className="text-az-text-faint">sandbox_engine.js</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Row {cursorRow + 1}, Col {cursorCol + 1}</span>
                <span>ASCII UTC</span>
              </div>
            </div>

            {/* CommandLine Input (rendered inline during command active) */}
            <div className="min-h-5 flex items-center font-mono">
              {mode === 'command' ? (
                <div className="flex items-center gap-0.5 text-az-info font-bold tracking-wide w-full">
                  <span>{commandText}</span>
                  <span className="w-1.5 h-4 bg-az-info animate-pulse" />
                </div>
              ) : (
                <div className="text-[10px] text-az-text-faint italic flex items-center gap-1.5">
                  <span>Log:</span>
                  <span className="text-az-text-muted font-bold">{lastAction}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* VIRTUAL MOTION BUTTONS (Right Panel) */}
        <div className={`md:col-span-4 bg-az-bg-alt border border-az-border-subtle p-4 rounded-xl flex flex-col justify-between shadow-sm transition-all duration-300 ${
          captureKeys 
            ? 'opacity-40 hover:opacity-60 pointer-events-none sm:pointer-events-auto filter blur-[0.2px]' 
            : 'opacity-100'
        }`}>
          <div className="space-y-4">
            
            {/* Title / Help details */}
            <div className="border-b border-az-border-subtle pb-3">
              <h3 className="text-[11px] font-mono tracking-widest uppercase text-az-text-faint">VIRTUAL SIMULATOR</h3>
              <p className="text-xs text-az-text-muted mt-1">If key capture is inactive, use these helper controls to test basic Vim instructions:</p>
            </div>

            {/* Virtual Directional keys block d-pad */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-az-text-faint">h / j / k / l movements</span>
              <div className="grid grid-cols-3 gap-1.5 w-[140px]">
                <div />
                <button
                  onClick={() => { handleMoveUp(); notify('k-press', 'Moved cursor strictly 1 slot upward'); onRecordCommand?.('k'); }}
                  className="p-2 bg-az-bg-canvas hover:bg-az-bg-alt border border-az-border-default rounded font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all text-center cursor-pointer text-az-text-heading"
                  title="Move Up"
                >
                  k ▲
                </button>
                <div />

                <button
                  onClick={() => { handleMoveLeft(); notify('h-press', 'Moved cursor strictly 1 slot leftward'); onRecordCommand?.('h'); }}
                  className="p-2 bg-az-bg-canvas hover:bg-az-bg-alt border border-az-border-default rounded font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all text-center cursor-pointer text-az-text-heading"
                  title="Move Left"
                >
                  h ◀
                </button>
                <button
                  onClick={() => { handleMoveDown(); notify('j-press', 'Moved cursor strictly 1 slot downward'); onRecordCommand?.('j'); }}
                  className="p-2 bg-az-bg-canvas hover:bg-az-bg-alt border border-az-border-default rounded font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all text-center cursor-pointer text-az-text-heading"
                  title="Move Down"
                >
                  j ▼
                </button>
                <button
                  onClick={() => { handleMoveRight(); notify('l-press', 'Moved cursor strictly 1 slot rightward'); onRecordCommand?.('l'); }}
                  className="p-2 bg-az-bg-canvas hover:bg-az-bg-alt border border-az-border-default rounded font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all text-center cursor-pointer text-az-text-heading"
                  title="Move Right"
                >
                  l ▶
                </button>
              </div>
            </div>

            <div className="border-t border-az-border-subtle my-3" />

            {/* Word jump keys */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { handleWordForward(); onRecordCommand?.('w'); }}
                className="py-2 bg-az-bg-canvas border border-az-border-default rounded font-bold hover:bg-az-bg-alt shadow-sm text-az-text-heading flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Word Next (w)</span>
              </button>
              <button
                onClick={() => { handleWordBackward(); onRecordCommand?.('b'); }}
                className="py-2 bg-az-bg-canvas border border-az-border-default rounded font-bold hover:bg-az-bg-alt shadow-sm text-az-text-heading flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Word Prev (b)</span>
              </button>
            </div>

            {/* Mode swappers */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <button
                onClick={() => { setMode('insert'); notify('i', 'Swapped into insert mode.'); onRecordCommand?.('i'); }}
                className={`py-2 rounded font-mono font-bold text-center border transition-all cursor-pointer ${
                  mode === 'insert' 
                    ? 'bg-az-success border-az-success text-az-bg-canvas' 
                    : 'bg-az-bg-canvas border-az-border-default text-az-text-heading hover:bg-az-bg-alt'
                }`}
              >
                INSERT (i)
              </button>
              <button
                onClick={() => { setMode('normal'); notify('Esc', 'Returned to Normal mode.'); }}
                className={`py-2 rounded font-mono font-bold text-center border transition-all cursor-pointer ${
                  mode === 'normal' 
                    ? 'bg-az-warning border-az-warning text-az-bg-canvas shadow-inner font-extrabold' 
                    : 'bg-az-bg-canvas border-az-border-default text-az-text-heading hover:bg-az-bg-alt'
                }`}
              >
                NORMAL (Esc)
              </button>
            </div>

            {/* Gamified Command Checklist */}
            <div className="border-t border-az-border-subtle pt-3 mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9.5px] font-mono tracking-wider uppercase text-az-text-faint font-bold">VIM COMMANDS CHECKLIST</span>
                <span className="text-[10px] font-mono font-bold text-az-active">{completedCommands.length}/16 MASTERED</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {SANDBOX_COMMANDS.map((cmd) => {
                  const isDone = completedCommands.includes(cmd.id);
                  return (
                    <div 
                      key={cmd.id} 
                      className={`py-1 rounded text-center border text-[10px] font-mono flex flex-col items-center justify-center transition-all ${
                        isDone 
                          ? 'bg-az-active/10 border-az-active/30 text-az-active font-extrabold shadow-sm'
                          : 'bg-az-bg-embedded border-az-border-subtle text-az-text-faint'
                      }`}
                      title={`${cmd.desc} (${cmd.id})`}
                    >
                      <span className="leading-none">{cmd.label}</span>
                      <span className={`text-[8px] mt-0.5 leading-none ${isDone ? 'text-az-active font-bold' : 'text-az-text-faint'}`}>
                        {isDone ? '✔' : '○'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Interactive sandbox status banner */}
          <div className={`mt-5 p-3 rounded-lg flex items-start gap-2 text-[10.5px] border ${
            sandboxStatus.type === 'success' 
              ? 'bg-az-success/10 text-az-success border-az-success/20'
              : sandboxStatus.type === 'warn'
                ? 'bg-az-warning/10 text-az-warning border-az-warning/20'
                : 'bg-az-info/10 text-az-info border-az-info/20'
          }`}>
            {sandboxStatus.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-az-success" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-az-warning" />
            )}
            <div>
              <p className="font-bold uppercase tracking-wider text-[9px] mb-0.5 font-sans">Status Feed</p>
              <p className="leading-relaxed font-sans">{sandboxStatus.msg}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
