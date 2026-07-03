import React, { useState, useEffect, useMemo, useRef } from 'react';
import { KEYBOARD_MAPS } from '../data/vimData';
import { KeyboardKey } from '../types';
import { 
  Keyboard, 
  HelpCircle, 
  Info, 
  ChevronRight, 
  Zap, 
  CornerDownLeft, 
  ArrowUp, 
  Command, 
  Sliders,
  Flame,
  Brain,
  Search,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

// Heatmap priority definitions lookup map
const KEY_HEAT_MAP: Record<string, { f: 'high' | 'medium' | 'low'; c: 'beginner' | 'intermediate' | 'expert' }> = {
  // Movements (critical frequent, easy complexity)
  KeyH: { f: 'high', c: 'beginner' },
  KeyJ: { f: 'high', c: 'beginner' },
  KeyK: { f: 'high', c: 'beginner' },
  KeyL: { f: 'high', c: 'beginner' },
  
  // Insertion / Basic editing (highly frequent, easy complexity)
  KeyI: { f: 'high', c: 'beginner' },
  KeyA: { f: 'high', c: 'beginner' },
  KeyO: { f: 'high', c: 'beginner' },
  KeyU: { f: 'high', c: 'beginner' }, // Undo
  
  // Word motions (frequent, intermediate)
  KeyW: { f: 'medium', c: 'intermediate' },
  KeyB: { f: 'medium', c: 'intermediate' },
  KeyE: { f: 'medium', c: 'intermediate' },
  
  // Delete, change, yank, put (highly frequent, intermediate complexity)
  KeyD: { f: 'high', c: 'intermediate' },
  KeyC: { f: 'high', c: 'intermediate' },
  KeyY: { f: 'high', c: 'intermediate' },
  KeyP: { f: 'high', c: 'intermediate' },
  KeyX: { f: 'medium', c: 'beginner' }, // delete char
  KeyS: { f: 'medium', c: 'beginner' }, // substitute char
  KeyR: { f: 'medium', c: 'intermediate' }, // replace char
  
  // Search commands (medium frequent, intermediate)
  Slash: { f: 'medium', c: 'intermediate' }, // / search
  KeyN: { f: 'high', c: 'intermediate' }, // search next
  KeyF: { f: 'medium', c: 'intermediate' }, // find char on line
  KeyT: { f: 'medium', c: 'intermediate' }, // jump till char on line
  Semicolon: { f: 'medium', c: 'beginner' }, // repeat char search [;] or [:]
  
  // Visual modes (frequent, intermediate)
  KeyV: { f: 'high', c: 'intermediate' },
  
  // Line jump motions (medium, beginner/intermediate)
  Digit0: { f: 'medium', c: 'beginner' }, // jump to start
  Digit4: { f: 'medium', c: 'beginner' }, // $ shift-4
  Digit5: { f: 'medium', c: 'intermediate' }, // % match bracket
  Digit6: { f: 'medium', c: 'beginner' }, // ^ shift-6
  KeyG: { f: 'medium', c: 'intermediate' }, // gg / G
  
  // Advanced macros & bookmarks & block (low, expert)
  KeyQ: { f: 'low', c: 'expert' }, // macro record
  Digit2: { f: 'low', c: 'expert' }, // @ macro execute
  KeyM: { f: 'low', c: 'expert' }, // mark set
  Quote: { f: 'low', c: 'expert' }, // mark jump
  Backquote: { f: 'low', c: 'expert' }, // precise mark jump
  IntlBackslash: { f: 'low', c: 'intermediate' }, // extra ISO key
  
  // Helpers
  Backspace: { f: 'low', c: 'beginner' },
  Space: { f: 'medium', c: 'beginner' },
  Enter: { f: 'medium', c: 'beginner' },
  Period: { f: 'high', c: 'intermediate' }, // Repeat last edit [.]
  
  // Remaining alphabetical keys (Z) and others
  KeyZ: { f: 'low', c: 'intermediate' }, // zz, ZZ
  BracketLeft: { f: 'low', c: 'expert' },
  BracketRight: { f: 'low', c: 'expert' },
  Backslash: { f: 'low', c: 'expert' },
  Comma: { f: 'low', c: 'beginner' },
  Minus: { f: 'low', c: 'beginner' },
  Equal: { f: 'low', c: 'intermediate' },
  Digit1: { f: 'low', c: 'beginner' },
  Digit3: { f: 'low', c: 'intermediate' },
  Digit7: { f: 'low', c: 'intermediate' },
  Digit8: { f: 'low', c: 'intermediate' },
  Digit9: { f: 'low', c: 'intermediate' },
};

const isModifierOrSpace = (code: string) => {
  return [
    'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 
    'AltLeft', 'AltRight', 'Super', 'Space', 'Enter', 'Tab', 'Backspace'
  ].includes(code);
};

// Common combinations for combo practice builder
const COMBO_EXPLANATIONS: Record<string, string> = {
  'd w': 'Delete from cursor to the start of the next word (dw).',
  'd b': 'Delete backward from cursor to the start of the previous word (db).',
  'd e': 'Delete from cursor to the end of the current word (de).',
  'd $': 'Delete from cursor to the end of the current line (d$).',
  'd d': 'Delete (cut) the entire current line (dd).',
  'y y': 'Yank (copy) the entire current line (yy).',
  'y w': 'Yank (copy) from cursor to the start of the next word (yw).',
  'y b': 'Yank (copy) backward from cursor to the start of the previous word (yb).',
  'y e': 'Yank (copy) from cursor to the end of the current word (ye).',
  'c w': 'Change (delete and enter Insert mode) from cursor to the start of the next word (cw).',
  'c b': 'Change backward from cursor to the start of the previous word (cb).',
  'c e': 'Change from cursor to the end of the current word (ce).',
  'c c': 'Change (delete and enter Insert mode) the entire current line (cc).',
  'c i w': 'Change inside the current word (ciw) - deletes the word and starts Insert mode.',
  'd i w': 'Delete inside the current word (diw) without deleting spaces.',
  'y i w': 'Yank (copy) the current word (yiw).',
  'c a w': 'Change around the current word (caw) - deletes the word and surrounding spaces.',
  'd a w': 'Delete around the current word (daw) including spaces.',
  'y a w': 'Yank (copy) around the current word (yaw).',
  'g g': 'Jump directly to the first line of the document (gg).',
  'z z': 'Redraw the screen with the current line at the center of the viewport (zz).',
  'Z Z': 'Save the current file and quit (ZZ).',
  'Z Q': 'Quit without saving changes (ZQ).',
  'g t': 'Go to the next tab page (gt).',
  'g T': 'Go to the previous tab page (gT).',
};

interface VimKeyboardProps {
  layout?: 'ANSI' | 'ISO';
}

export default function VimKeyboard({ layout = 'ANSI' }: VimKeyboardProps) {
  const [activeMode, setActiveMode] = useState<'normal' | 'shift' | 'ctrl'>('normal');
  const [selectedKeyCode, setSelectedKeyCode] = useState<string>('KeyH');
  const [hoveredKey, setHoveredKey] = useState<KeyboardKey | null>(null);
  const [overlayMode, setOverlayMode] = useState<'category' | 'frequency' | 'complexity'>('category');

  // New interactivity states
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [listenPhysicalKeyboard, setListenPhysicalKeyboard] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comboSequence, setComboSequence] = useState<string[]>([]);

  // Categorize key functions for color highlights
  const getKeyCategory = (key: KeyboardKey): string => {
    const cmd = key[activeMode]?.command || '';
    if (!cmd) return 'other';

    const lowercaseCmd = cmd.toLowerCase();

    // Movement Category list
    if (['h', 'j', 'k', 'l', 'w', 'b', 'e', 'gg', '^', '$', '0', '%', 'f', 't', ';', ','].includes(lowercaseCmd) || 
        key.code.includes('Digit4') || key.code.includes('Bracket') || key.code.includes('Digit6')) {
      return 'motion';
    }
    // Edit Category list
    if (['i', 'a', 'o', 'r', 's', 'c', 'u', '.'].includes(lowercaseCmd)) {
      return 'edit';
    }
    // Copy Paste
    if (['y', 'p', 'd', 'x'].includes(lowercaseCmd)) {
      return 'copy-paste';
    }
    // Search
    if (['/', '?', 'n', '*', '#'].includes(lowercaseCmd)) {
      return 'search';
    }
    return 'advanced';
  };

  const getKeyColorStyle = (key: KeyboardKey, cat: string, hasCommand: boolean, isSelected: boolean, isPressed: boolean): string => {
    if (isModifierOrSpace(key.code)) {
      if (isSelected) {
        return 'bg-az-active/20 border-az-active border-b-az-active/70 border-r-az-active/60 text-az-active ring-1 ring-az-active/30 shadow-[0_0_10px_rgba(206,218,74,0.15)]';
      }
      return 'bg-az-bg-alt border-az-border-subtle border-b-az-border-default/70 border-r-az-border-subtle/50 text-az-text-muted hover:bg-az-bg-workarea';
    }

    const selectionRing = isSelected ? 'ring-2 ring-az-active/80 border-az-active text-az-text-heading font-extrabold shadow-[0_0_10px_rgba(206,218,74,0.2)] z-10 ' : '';

    if (overlayMode === 'category') {
      if (!hasCommand) {
        return 'bg-az-bg-canvas hover:bg-az-bg-alt text-az-text-faint border-az-border-subtle/70 border-b-az-border-subtle border-r-az-border-subtle/50';
      }
      
      const baseColor = (() => {
        switch (cat) {
          case 'motion':
            return 'bg-az-info/10 border-az-info/30 border-b-az-info/60 border-r-az-info/40 hover:bg-az-info/15 text-az-info';
          case 'edit':
            return 'bg-az-success/10 border-az-success/30 border-b-az-success/60 border-r-az-success/40 hover:bg-az-success/15 text-az-success';
          case 'copy-paste':
            return 'bg-az-warning/10 border-az-warning/30 border-b-az-warning/60 border-r-az-warning/40 hover:bg-az-warning/15 text-az-warning';
          case 'search':
            return 'bg-az-active/10 border-az-active/30 border-b-az-active/60 border-r-az-active/40 hover:bg-az-active/15 text-az-active';
          case 'advanced':
            return 'bg-pink-500/10 border-pink-500/30 border-b-pink-500/60 border-r-pink-500/40 hover:bg-pink-500/15 text-pink-400';
          default:
            return 'bg-az-bg-canvas border-az-border-subtle border-b-az-border-default/70 border-r-az-border-subtle/50 text-az-text-primary hover:bg-az-bg-alt';
        }
      })();
      return `${baseColor} ${selectionRing}`;
    }

    const heat = KEY_HEAT_MAP[key.code];

    if (overlayMode === 'frequency') {
      if (!hasCommand || !heat) {
        return 'bg-az-bg-canvas/50 border-az-border-subtle/40 text-az-text-faint opacity-30 cursor-not-allowed scale-[0.97] transition-all';
      }
      switch (heat.f) {
        case 'high':
          return `bg-az-danger/10 border-az-danger border-b-az-danger/70 border-r-az-danger/50 hover:bg-az-danger/20 text-az-danger shadow-[0_0_8px_rgba(200,56,56,0.15)] ${selectionRing}`;
        case 'medium':
          return `bg-az-warning/10 border-az-warning border-b-az-warning/70 border-r-az-warning/50 hover:bg-az-warning/20 text-az-warning shadow-[0_0_6px_rgba(200,120,40,0.1)] ${selectionRing}`;
        case 'low':
          return `bg-az-bg-alt border-az-border-subtle border-b-az-border-default hover:bg-az-bg-workarea text-az-text-muted opacity-60 ${selectionRing}`;
        default:
          return `bg-az-bg-alt border-az-border-subtle text-az-text-muted opacity-40 ${selectionRing}`;
      }
    }

    if (overlayMode === 'complexity') {
      if (!hasCommand || !heat) {
        return 'bg-az-bg-canvas/50 border-az-border-subtle/40 text-az-text-faint opacity-30 cursor-not-allowed scale-[0.97] transition-all';
      }
      switch (heat.c) {
        case 'beginner':
          return `bg-az-success/10 border-az-success border-b-az-success/70 border-r-az-success/50 hover:bg-az-success/20 text-az-success shadow-[0_0_6px_rgba(103,176,103,0.12)] ${selectionRing}`;
        case 'intermediate':
          return `bg-az-info/10 border-az-info border-b-az-info/70 border-r-az-info/50 hover:bg-az-info/20 text-az-info shadow-[0_0_6px_rgba(84,157,182,0.1)] ${selectionRing}`;
        case 'expert':
          return `bg-purple-500/10 border-purple-500 border-b-purple-500/70 border-r-purple-500/50 hover:bg-purple-500/20 text-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.12)] ${selectionRing}`;
        default:
          return `bg-az-bg-alt border-az-border-subtle text-az-text-muted opacity-40 ${selectionRing}`;
      }
    }

    return 'bg-az-bg-canvas border-az-border-subtle border-b-az-border-default/70 border-r-az-border-subtle/50 text-az-text-primary hover:bg-az-bg-alt';
  };

  const handleKeyClick = (key: KeyboardKey) => {
    if (key.normal || key.shift || key.ctrl) {
      setSelectedKeyCode(key.code);
      
      // Also trigger combo builder for clicked keys
      const activeCmd = key[activeMode]?.command;
      if (activeCmd && !isModifierOrSpace(key.code)) {
        handleAppendSequence(activeCmd);
      }
    }
  };

  // Append a command to the combo sequence
  const handleAppendSequence = (cmd: string) => {
    setComboSequence(prev => {
      const next = [...prev, cmd];
      if (next.length > 3) {
        return [cmd];
      }
      return next;
    });
  };

  // Auto-clear combo practice sequence after a timeout
  useEffect(() => {
    if (comboSequence.length === 0) return;
    const timer = setTimeout(() => {
      setComboSequence([]);
    }, 4000);
    return () => clearTimeout(timer);
  }, [comboSequence]);

  const IntlBackslashKey: KeyboardKey = {
    code: 'IntlBackslash', label: '<',
    normal: { command: '<', action: 'Outdent blocks left', description: 'Decrease target blocks indentation levels.' },
    shift: { command: '>', action: 'Indent blocks right', description: 'Increase target blocks indentation levels.' },
    ctrl: null, row: 3, width: 'w-10'
  };

  const activeKeys = useMemo(() => {
    const r0 = KEYBOARD_MAPS.filter(k => k.row === 0);
    let r1 = KEYBOARD_MAPS.filter(k => k.row === 1);
    let r2 = KEYBOARD_MAPS.filter(k => k.row === 2);
    let r3 = KEYBOARD_MAPS.filter(k => k.row === 3);
    const r4 = KEYBOARD_MAPS.filter(k => k.row === 4);

    if (layout === 'ISO') {
      // Move Backslash from row 1 to row 2
      const backslashKey = r1.find(k => k.code === 'Backslash');
      r1 = r1.filter(k => k.code !== 'Backslash');

      // Place Backslash before Enter in Row 2
      const enterIdx = r2.findIndex(k => k.code === 'Enter');
      if (backslashKey && enterIdx !== -1) {
        const isoBackslash = { ...backslashKey, row: 2, width: 'w-10' };
        r2 = [
          ...r2.slice(0, enterIdx),
          isoBackslash,
          { ...r2[enterIdx], width: 'w-[48px] sm:w-[60px]' }
        ];
      }

      // Shrink ShiftLeft and place IntlBackslash inline right next to it in Row 3
      const shiftLeftIdx = r3.findIndex(k => k.code === 'ShiftLeft');
      if (shiftLeftIdx !== -1) {
        r3 = [
          ...r3.slice(0, shiftLeftIdx),
          { ...r3[shiftLeftIdx], width: 'w-[45px] sm:w-[55px]' },
          IntlBackslashKey,
          ...r3.slice(shiftLeftIdx + 1)
        ];
      }
    }

    return [...r0, ...r1, ...r2, ...r3, ...r4];
  }, [layout]);

  // Refs to dynamic values to prevent event listener re-registration loop
  const activeKeysRef = useRef(activeKeys);
  const activeModeRef = useRef(activeMode);
  const handleAppendSequenceRef = useRef(handleAppendSequence);

  useEffect(() => {
    activeKeysRef.current = activeKeys;
    activeModeRef.current = activeMode;
    handleAppendSequenceRef.current = handleAppendSequence;
  });

  // Capturing physical keyboard interactions
  useEffect(() => {
    if (!listenPhysicalKeyboard) {
      setPressedKeys(new Set());
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bypass if typing in search input, textareas, sandbox inputs, etc.
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.getAttribute('contenteditable') === 'true'
      );
      if (isInput) return;

      // Prevent default page scroll actions for keyboard keypresses
      const preventDefaults = ['Space', 'Backspace', 'Slash', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (preventDefaults.includes(e.code)) {
        e.preventDefault();
      }

      setPressedKeys(prev => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });

      // Synchronize modifiers
      if (e.key === 'Shift' || e.code.startsWith('Shift')) {
        setActiveMode('shift');
      } else if (e.key === 'Control' || e.code.startsWith('Control')) {
        setActiveMode('ctrl');
      }

      // Find matching key and select it
      const keyObj = activeKeysRef.current.find(k => k.code === e.code);
      if (keyObj) {
        if (keyObj.normal || keyObj.shift || keyObj.ctrl || isModifierOrSpace(keyObj.code)) {
          setSelectedKeyCode(e.code);

          // Append to combo practice
          const activeCmd = keyObj[activeModeRef.current]?.command;
          if (activeCmd && !isModifierOrSpace(keyObj.code)) {
            handleAppendSequenceRef.current(activeCmd);
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });

      // Modifier release reversion
      if (e.key === 'Shift' || e.code.startsWith('Shift')) {
        if (e.ctrlKey) {
          setActiveMode('ctrl');
        } else {
          setActiveMode('normal');
        }
      } else if (e.key === 'Control' || e.code.startsWith('Control')) {
        if (e.shiftKey) {
          setActiveMode('shift');
        } else {
          setActiveMode('normal');
        }
      }
    };

    const handleBlur = () => {
      setPressedKeys(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [listenPhysicalKeyboard]);

  // Pre-calculate matching key codes whenever searchQuery changes for O(1) rendering checks
  const matchingKeyCodes = useMemo(() => {
    const matched = new Set<string>();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matched;

    activeKeys.forEach((key) => {
      if (key.label.toLowerCase().includes(query)) {
        matched.add(key.code);
        return;
      }
      if (key.normal) {
        if (key.normal.command.toLowerCase().includes(query) ||
            key.normal.action.toLowerCase().includes(query) ||
            key.normal.description.toLowerCase().includes(query)) {
          matched.add(key.code);
          return;
        }
      }
      if (key.shift) {
        if (key.shift.command.toLowerCase().includes(query) ||
            key.shift.action.toLowerCase().includes(query) ||
            key.shift.description.toLowerCase().includes(query)) {
          matched.add(key.code);
          return;
        }
      }
      if (key.ctrl) {
        if (key.ctrl.command.toLowerCase().includes(query) ||
            key.ctrl.action.toLowerCase().includes(query) ||
            key.ctrl.description.toLowerCase().includes(query)) {
          matched.add(key.code);
          return;
        }
      }
    });
    return matched;
  }, [searchQuery, activeKeys]);

  // Retrieve explanation for current combo practice sequence
  const getComboExplanation = () => {
    const seqStr = comboSequence.join(' ');
    if (COMBO_EXPLANATIONS[seqStr]) {
      return COMBO_EXPLANATIONS[seqStr];
    }
    
    // Check partial operators
    if (seqStr === 'd') return 'Operator [d]: waiting for motion (e.g. w, b, d, $)';
    if (seqStr === 'y') return 'Operator [y]: waiting for motion (e.g. w, y)';
    if (seqStr === 'c') return 'Operator [c]: waiting for motion (e.g. w, c)';
    if (seqStr === 'c i') return 'Text Object [ci]: waiting for target (e.g. w)';
    if (seqStr === 'd i') return 'Text Object [di]: waiting for target (e.g. w)';
    if (seqStr === 'y i') return 'Text Object [yi]: waiting for target (e.g. w)';
    if (seqStr === 'c a') return 'Text Object [ca]: waiting for target (e.g. w)';
    if (seqStr === 'd a') return 'Text Object [da]: waiting for target (e.g. w)';
    if (seqStr === 'y a') return 'Text Object [ya]: waiting for target (e.g. w)';
    if (seqStr === 'g') return 'Go prefix [g]: waiting for action (e.g. g, t, T)';
    if (seqStr === 'z') return 'Redraw prefix [z]: waiting for action (e.g. z)';
    if (seqStr === 'Z') return 'Quit prefix [Z]: waiting for action (e.g. Z, Q)';

    return 'Combo started. Press motions next...';
  };

  const selectedKey = activeKeys.find((k) => k.code === selectedKeyCode) || activeKeys.find((k) => k.code === 'KeyH') || activeKeys[0];
  const displayKeyVal = hoveredKey || selectedKey;

  const row0 = activeKeys.filter((k) => k.row === 0);
  const row1 = activeKeys.filter((k) => k.row === 1);
  const row2 = activeKeys.filter((k) => k.row === 2);
  const row3 = activeKeys.filter((k) => k.row === 3);
  const row4 = activeKeys.filter((k) => k.row === 4);

  // Shorten / format key labels with symbols for tight bounds fitting
  const renderKeyLabel = (key: KeyboardKey) => {
    switch (key.code) {
      case 'Backspace':
        return (
          <span className="text-[9.5px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>⌫</span>
            <span className="hidden sm:inline">Back</span>
          </span>
        );
      case 'Tab':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>⇥</span>
            <span className="hidden sm:inline">Tab</span>
          </span>
        );
      case 'CapsLock':
        return (
          <span className="text-[9px] md:text-[9.5px] flex items-center justify-center gap-0.5 tracking-tighter leading-none">
            <span>⇪</span>
            <span className="hidden sm:inline">Caps</span>
          </span>
        );
      case 'Enter':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>↵</span>
            <span className="hidden sm:inline">Enter</span>
          </span>
        );
      case 'ShiftLeft':
      case 'ShiftRight':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>⇧</span>
            <span className="hidden sm:inline">Shift</span>
          </span>
        );
      case 'ControlLeft':
      case 'ControlRight':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>⌃</span>
            <span className="hidden sm:inline">Ctrl</span>
          </span>
        );
      case 'AltLeft':
      case 'AltRight':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter">
            <span>⎇</span>
            <span className="hidden sm:inline">Alt</span>
          </span>
        );
      case 'Super':
        return (
          <span className="text-[10px] md:text-xs flex items-center justify-center gap-0.5 tracking-tighter" title="Super/Command">
            <span>⌘</span>
            <span className="hidden sm:inline">Cmd</span>
          </span>
        );
      case 'Space':
        return <span className="text-[9px] sm:text-[10px] text-az-text-faint/50 font-sans tracking-wide uppercase select-none">Space ␣</span>;
      default:
        return <span className="text-xs md:text-sm font-bold">{key.label}</span>;
    }
  };

  // Convert "Ctrl-X" notation into compact "^X" on keycaps
  const formatKeycapCommand = (cmd: string | undefined): string => {
    if (!cmd) return '\u00A0';
    if (cmd.startsWith('Ctrl-')) {
      return `^${cmd.substring(5)}`;
    }
    return cmd;
  };

  // Main single key renderer helper
  const renderKey = (key: KeyboardKey) => {
    const activeCmd = key[activeMode];
    const isSelected = key.code === selectedKeyCode;
    const isPressed = pressedKeys.has(key.code);
    const hasCommand = !!activeCmd;
    const cat = getKeyCategory(key);

    const isSearching = searchQuery.trim().length > 0;
    const isMatch = matchingKeyCodes.has(key.code);

    // Assemble dynamic 3D classes
    let btnClasses = "relative p-1 rounded-lg text-xs font-mono font-bold transition-all duration-150 ease-out select-none flex flex-col justify-between items-center cursor-pointer shadow h-12 transform ";
    
    if (key.width) {
      btnClasses += `${key.width} `;
    } else {
      btnClasses += "w-10 ";
    }

    if (isPressed) {
      btnClasses += "translate-y-[3.5px] translate-x-[0.5px] border-b-[1.5px] border-r-[1px] shadow-sm ";
    } else {
      btnClasses += "hover:-translate-y-[1px] hover:shadow-md active:translate-y-[2.5px] active:translate-x-[0.5px] active:border-b-[1.5px] active:border-r-[1px] border-b-4 border-r-[2.5px] ";
    }

    if (isSearching) {
      if (isMatch) {
        btnClasses += "bg-az-success/15 border-az-success text-az-success border-b-az-success/80 border-r-az-success/60 ring-2 ring-az-success/40 shadow-[0_0_12px_rgba(63,126,64,0.3)] animate-pulse-slow z-10 ";
      } else {
        btnClasses += "opacity-20 border-az-border-subtle/30 text-az-text-faint/30 scale-[0.95] cursor-not-allowed ";
      }
    } else {
      btnClasses += getKeyColorStyle(key, cat, hasCommand, isSelected, isPressed) + " ";
    }

    // Indicators
    let topLeftIndicator: React.ReactNode = '\u00A0';
    let topRightIndicator: React.ReactNode = null;

    if (key.row === 4) {
      topLeftIndicator = <span className="text-[8px] text-az-text-faint/60 font-sans">⌘</span>;
    } else if (key.shift?.command && key.shift.command !== key.label) {
      topLeftIndicator = (
        <span className={isSelected ? 'text-az-active font-semibold' : 'text-az-text-faint'}>
          {key.shift.command}
        </span>
      );
    }

    if (key.row >= 1 && key.row <= 3 && key.ctrl?.command) {
      topRightIndicator = <span className="text-[7.5px] text-az-warning font-extrabold leading-none">^</span>;
    }

    return (
      <button
        id={`key-${key.code}`}
        key={key.code}
        onClick={() => handleKeyClick(key)}
        onMouseEnter={() => hasCommand && setHoveredKey(key)}
        onMouseLeave={() => setHoveredKey(null)}
        disabled={!hasCommand && !isModifierOrSpace(key.code)}
        className={btnClasses}
      >
        <div className="flex justify-between w-full text-[8.5px] leading-none select-none">
          <span>{topLeftIndicator}</span>
          <span>{topRightIndicator}</span>
        </div>

        <div className="flex-1 flex items-center justify-center max-w-full truncate px-0.5 select-none my-0.5">
          {renderKeyLabel(key)}
        </div>

        <span className={`text-[7.5px] md:text-[8px] font-bold leading-none select-none truncate max-w-full ${
          isSelected 
            ? 'text-az-active font-extrabold' 
            : 'text-az-text-faint'
        }`}>
          {formatKeycapCommand(activeCmd?.command)}
        </span>
      </button>
    );
  };

  return (
    <div className="no-drag flex flex-col gap-5 w-full">
      
      {/* Keyboard Controls & Mode Toggle Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-az-bg-alt p-4 rounded-xl border border-az-border-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-az-active/10 text-az-active">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-az-text-heading">Interactive Keyboard Mapping</h2>
              <label className="flex items-center gap-1 cursor-pointer select-none text-[9.5px] font-mono px-2 py-0.5 rounded bg-az-bg-canvas border border-az-border-subtle text-az-text-muted hover:text-az-text-primary hover:border-az-border-strong transition-all">
                <input
                  type="checkbox"
                  checked={listenPhysicalKeyboard}
                  onChange={(e) => setListenPhysicalKeyboard(e.target.checked)}
                  className="rounded border-az-border-default text-az-active focus:ring-az-active/30 w-3 h-3 cursor-pointer"
                />
                <span>Live Capture</span>
              </label>
            </div>
            <p className="text-[11px] text-az-text-muted">Click any key to read what commands are mapped on Normal, Shift or Ctrl states</p>
          </div>
        </div>

        {/* Active Modifier state switcher */}
        <div className="relative flex items-center bg-az-bg-canvas p-1 rounded-lg border border-az-border-subtle font-mono text-xs w-full md:w-auto z-0 overflow-hidden">
          <button
            onClick={() => { setActiveMode('normal'); }}
            className={`relative flex-1 md:flex-none px-3.5 py-1.5 rounded-md font-bold transition-colors duration-300 z-10 cursor-pointer ${
              activeMode === 'normal'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {activeMode === 'normal' && (
              <motion.div
                layoutId="activeModifierBg"
                className="absolute inset-0 bg-az-active rounded-md -z-10 shadow"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Normal (abc)
          </button>
          
          <button
            onClick={() => { setActiveMode('shift'); }}
            className={`relative flex-1 md:flex-none px-3.5 py-1.5 rounded-md font-bold flex items-center justify-center gap-1 transition-colors duration-300 z-10 cursor-pointer ${
              activeMode === 'shift'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {activeMode === 'shift' && (
              <motion.div
                layoutId="activeModifierBg"
                className="absolute inset-0 bg-az-active rounded-md -z-10 shadow"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Shift (ABC)</span>
          </button>

          <button
            onClick={() => { setActiveMode('ctrl'); }}
            className={`relative flex-1 md:flex-none px-3.5 py-1.5 rounded-md font-bold flex items-center justify-center gap-1 transition-colors duration-300 z-10 cursor-pointer ${
              activeMode === 'ctrl'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {activeMode === 'ctrl' && (
              <motion.div
                layoutId="activeModifierBg"
                className="absolute inset-0 bg-az-active rounded-md -z-10 shadow"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Command className="w-3" />
            <span>Ctrl (+Key)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Learning Heatmap Select controller */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-az-bg-alt p-3 rounded-xl border border-az-border-subtle font-sans">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono font-bold text-az-active uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            Keymap learning overlay tools
          </span>
          <h3 className="text-[11.5px] font-bold text-az-text-heading">
            Keys Prioritizer
          </h3>
          <p className="text-[11px] text-az-text-muted leading-tight">
            {overlayMode === 'category' && 'Highlight map showing standard Vim category groupings (Motion vs Editing).'}
            {overlayMode === 'frequency' && 'Heatmap showing common muscle-memory keys by typing density in everyday workflows.'}
            {overlayMode === 'complexity' && 'Heatmap ranking keys by learning barrier (Beginner-friendly to power-user Macros).'}
          </p>
        </div>

        <div className="relative flex bg-az-bg-canvas border border-az-border-subtle p-0.5 rounded-lg text-[11px] font-semibold gap-0.5 self-end w-full sm:w-auto z-0 overflow-hidden">
          <button
            onClick={() => setOverlayMode('category')}
            className={`relative flex-1 sm:flex-none px-2.5 py-1 rounded transition-colors duration-350 font-bold z-10 cursor-pointer ${
              overlayMode === 'category'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {overlayMode === 'category' && (
              <motion.div
                layoutId="activeOverlayBg"
                className="absolute inset-0 bg-az-active rounded shadow-sm -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            🎨 Category Groups
          </button>
          
          <button
            onClick={() => setOverlayMode('frequency')}
            className={`relative flex-1 sm:flex-none px-2.5 py-1 rounded transition-colors duration-350 font-bold flex items-center justify-center gap-1 z-10 cursor-pointer ${
              overlayMode === 'frequency'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {overlayMode === 'frequency' && (
              <motion.div
                layoutId="activeOverlayBg"
                className="absolute inset-0 bg-az-danger rounded shadow-sm -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <Flame className="w-3 h-3" />
            <span>🔥 Frequency Heat</span>
          </button>

          <button
            onClick={() => setOverlayMode('complexity')}
            className={`relative flex-1 sm:flex-none px-2.5 py-1 rounded transition-colors duration-350 font-bold flex items-center justify-center gap-1 z-10 cursor-pointer ${
              overlayMode === 'complexity'
                ? 'text-az-bg-canvas'
                : 'text-az-text-muted hover:text-az-text-heading'
            }`}
          >
            {overlayMode === 'complexity' && (
              <motion.div
                layoutId="activeOverlayBg"
                className="absolute inset-0 bg-az-info rounded shadow-sm -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <Brain className="w-3.5 h-3.5" />
            <span>🧠 Complexity Map</span>
          </button>
        </div>
      </div>

      {/* Action Search and Combo Practice Builder bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-az-bg-alt p-3 rounded-xl border border-az-border-subtle font-sans">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-az-text-muted/70" />
            <input
              type="text"
              placeholder="Search actions (e.g. yank, delete, word)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-az-bg-canvas text-xs text-az-text-primary pl-9 pr-8 py-2 rounded-lg border border-az-border-subtle focus:outline-none focus:border-az-active focus:ring-1 focus:ring-az-active/50 font-sans transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-az-bg-soft text-az-text-muted hover:text-az-text-primary cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Combo builder output */}
        <div className="flex-1 flex items-center justify-end gap-3 text-xs">
          <div className="flex items-center flex-wrap gap-2 justify-end">
            <span className="text-[10px] font-mono font-bold text-az-text-muted uppercase tracking-wider">
              Combo Practice:
            </span>
            {comboSequence.length > 0 ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 animate-pulse-slow">
                  {comboSequence.map((key, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-az-text-faint font-mono text-[10px]">+</span>}
                      <kbd className="px-2 py-0.5 rounded bg-az-active/10 border border-az-active/30 text-az-active font-mono font-extrabold text-xs shadow-sm">
                        {key}
                      </kbd>
                    </React.Fragment>
                  ))}
                </div>
                <button
                  onClick={() => setComboSequence([])}
                  className="p-1 rounded hover:bg-az-bg-soft text-az-text-muted hover:text-az-danger cursor-pointer ml-1"
                  title="Clear combo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <span className="text-az-success font-semibold border-l border-az-border-subtle pl-3 text-[11px]">
                  {getComboExplanation()}
                </span>
              </div>
            ) : (
              <span className="text-az-text-faint italic text-[11px]">Type keys on keyboard to build a sequence</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout containing Keyboard grid and the Sidebar panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* PHYSICAL KEYBOARD SIMULATION BOARD */}
        <div className="lg:col-span-8 flex flex-col gap-1.5 bg-az-bg-canvas border border-az-border-subtle p-3.5 rounded-xl shadow-md w-full overflow-x-auto relative">
          
          {/* Dynamic Key Legends inside board layout */}
          <div className="absolute top-3.5 right-4 flex items-center gap-3.5 text-[9.5px] font-mono font-bold tracking-tight text-az-text-faint select-none">
            {overlayMode === 'category' && (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-info/20 border border-az-info/40" /> Motions</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-success/20 border border-az-success/40" /> Editing</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-warning/20 border border-az-warning/40" /> Cut/Copy</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-active/20 border border-az-active/40" /> Search</span>
              </>
            )}
            {overlayMode === 'frequency' && (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-danger/20 border border-az-danger/70" /> 🔥 High</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-warning/20 border border-az-warning/60" /> ⚡ Medium</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-bg-alt border border-az-border-subtle" /> 💤 Low</span>
              </>
            )}
            {overlayMode === 'complexity' && (
              <>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-success/20 border border-az-success/60" /> Easy</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-az-info/20 border border-az-info/60" /> Mid</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-purple-500/20 border border-purple-500/50" /> Hard</span>
              </>
            )}
          </div>

          <div className="h-6" /> {/* spacer under legends */}

          {/* ROW 0: Number Row */}
          <div id="row-0" className="flex gap-1 justify-between min-w-[620px]">
            {row0.map(renderKey)}
          </div>

          {/* ROW 1: QWERTY Row */}
          <div id="row-1" className="flex gap-1 justify-between min-w-[620px]">
            {row1.map(renderKey)}
          </div>

          {/* ROW 2: Home Row */}
          <div id="row-2" className="flex gap-1 justify-between min-w-[620px]">
            {row2.map(renderKey)}
          </div>

          {/* ROW 3: Bottom Row */}
          <div id="row-3" className="flex gap-1 justify-between min-w-[620px]">
            {row3.map(renderKey)}
          </div>

          {/* ROW 4: Spacers and Command keys */}
          <div id="row-4" className="flex gap-1 justify-between min-w-[620px]">
            {row4.map(renderKey)}
          </div>
        </div>

        {/* DETAILED SIDEBAR DETAIL PANEL */}
        <div className="lg:col-span-4 flex flex-col bg-az-bg-alt border border-az-border-subtle p-4 rounded-xl min-h-[352px] justify-between shadow-sm">
          <div>
            {/* Header with Key Signature */}
            <div className="flex items-center justify-between border-b border-az-border-subtle pb-2.5 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-az-bg-embedded border border-az-border-default flex items-center justify-center font-mono font-extrabold text-az-text-heading text-base shadow">
                  {displayKeyVal.label}
                </span>
                <div>
                  <h3 className="text-xs font-mono font-semibold tracking-wider text-az-text-faint">KEY DEFINITIONS</h3>
                  <div className="text-xs text-az-active font-bold font-mono">
                    {displayKeyVal.code}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {pressedKeys.has(displayKeyVal.code) && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-az-success/15 text-az-success font-bold animate-pulse">Pressed</span>
                )}
                {hoveredKey && !pressedKeys.has(displayKeyVal.code) && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-az-warning/15 text-az-warning font-semibold">Hover View</span>
                )}
              </div>
            </div>

            {/* Metadata Badges for Key Priority Insights */}
            {KEY_HEAT_MAP[displayKeyVal.code] && (
              <div className="flex items-center flex-wrap gap-1.5 mb-3.5 px-0.5">
                {/* Frequency Badge */}
                {(() => {
                  const heat = KEY_HEAT_MAP[displayKeyVal.code];
                  if (!heat) return null;
                  
                  if (heat.f === 'high') {
                    return (
                      <span className="text-[9.5px] font-semibold font-sans px-2 py-0.5 rounded-full bg-az-danger/10 text-az-danger border border-az-danger/25 flex items-center gap-1.5">
                        <Flame className="w-2.5 h-2.5 fill-current" />
                        <span>High Priority</span>
                      </span>
                    );
                  }
                  if (heat.f === 'medium') {
                    return (
                      <span className="text-[9.5px] font-semibold font-sans px-2 py-0.5 rounded-full bg-az-warning/10 text-az-warning border border-az-warning/25 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-az-warning" />
                        <span>Core Keystroke</span>
                      </span>
                    );
                  }
                  return (
                    <span className="text-[9.5px] font-medium font-sans px-2 py-0.5 rounded-full bg-az-bg-embedded text-az-text-muted border border-az-border-subtle flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-az-text-faint" />
                      <span>Occasional Use</span>
                    </span>
                  );
                })()}

                {/* Complexity Badge */}
                {(() => {
                  const heat = KEY_HEAT_MAP[displayKeyVal.code];
                  if (!heat) return null;
                  
                  if (heat.c === 'beginner') {
                    return (
                      <span className="text-[9.5px] font-semibold font-sans px-2 py-0.5 rounded-full bg-az-success/10 text-az-success border border-az-success/25 flex items-center gap-1">
                        <span>🟢 Beginner Friendly</span>
                      </span>
                    );
                  }
                  if (heat.c === 'intermediate') {
                    return (
                      <span className="text-[9.5px] font-semibold font-sans px-2 py-0.5 rounded-full bg-az-info/10 text-az-info border border-az-info/25 flex items-center gap-1">
                        <span>🔵 Intermediate</span>
                      </span>
                    );
                  }
                  return (
                    <span className="text-[9.5px] font-semibold font-sans px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/25 flex items-center gap-1">
                      <Brain className="w-2.5 h-2.5" />
                      <span>Expert Level</span>
                    </span>
                  );
                })()}
              </div>
            )}

            {/* Content rows for Modes */}
            <div className="space-y-3.5 overflow-y-auto max-h-[190px] pr-1.5 scrollbar-thin">
              
              {/* Normal Mode */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${activeMode === 'normal' ? 'bg-az-info/10 border-az-info/30 shadow-sm' : 'bg-transparent border-transparent opacity-65'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-az-text-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-az-info" />
                    <span>Normal:</span>
                    <span className="text-az-active">{displayKeyVal.normal?.command || '(none)'}</span>
                  </div>
                  {displayKeyVal.normal && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-az-info/15 text-az-info font-bold uppercase tracking-wider scale-90">
                      {displayKeyVal.normal.action}
                    </span>
                  )}
                </div>
                {displayKeyVal.normal ? (
                  <p className="text-[11px] text-az-text-muted mt-1.5 pl-3 leading-relaxed font-sans">
                    {displayKeyVal.normal.description}
                  </p>
                ) : (
                  <p className="text-[11px] text-az-text-faint italic mt-1.5 pl-3">No default normal mode binding mapped.</p>
                )}
              </div>

              {/* Shift Mode */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${activeMode === 'shift' ? 'bg-az-success/10 border-az-success/30 shadow-sm' : 'bg-transparent border-transparent opacity-65'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-az-text-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-az-success" />
                    <span>Shift:</span>
                    <span className="text-az-active">{displayKeyVal.shift?.command || '(none)'}</span>
                  </div>
                  {displayKeyVal.shift && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-az-success/15 text-az-success font-bold uppercase tracking-wider scale-90">
                      {displayKeyVal.shift.action}
                    </span>
                  )}
                </div>
                {displayKeyVal.shift ? (
                  <p className="text-[11px] text-az-text-muted mt-1.5 pl-3 leading-relaxed font-sans">
                    {displayKeyVal.shift.description}
                  </p>
                ) : (
                  <p className="text-[11px] text-az-text-faint italic mt-1.5 pl-3">No default Shift mode binding mapped.</p>
                )}
              </div>

              {/* Ctrl Mode */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${activeMode === 'ctrl' ? 'bg-az-warning/10 border-az-warning/30 shadow-sm' : 'bg-transparent border-transparent opacity-65'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-az-text-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-az-warning" />
                    <span>Control:</span>
                    <span className="text-az-active">{displayKeyVal.ctrl?.command || '(none)'}</span>
                  </div>
                  {displayKeyVal.ctrl && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-az-warning/15 text-az-warning font-bold uppercase tracking-wider scale-90">
                      {displayKeyVal.ctrl.action}
                    </span>
                  )}
                </div>
                {displayKeyVal.ctrl ? (
                  <p className="text-[11px] text-az-text-muted mt-1.5 pl-3 leading-relaxed font-sans">
                    {displayKeyVal.ctrl.description}
                  </p>
                ) : (
                  <p className="text-[11px] text-az-text-faint italic mt-1.5 pl-3">No default Control mode binding mapped.</p>
                )}
              </div>

            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[9.5px] text-az-text-faint border-t border-az-border-subtle pt-2.5 font-mono">
            <Info className="w-3.5 h-3.5" />
            <span>Hover active keys to inspect without clicking.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
