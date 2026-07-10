import { VimCommand, KeyboardKey, CommandCategory } from '../types';

export const COMMAND_CATEGORIES: CommandCategory[] = [
  { id: 'motion', name: 'Movement', icon: 'Move', color: 'bg-az-info/10 text-az-info border-az-info/20' },
  { id: 'edit', name: 'Editing & Insertion', icon: 'Edit3', color: 'bg-az-active/10 text-az-active border-az-active/20' },
  { id: 'visual', name: 'Visual Mode', icon: 'Eye', color: 'bg-az-active/20 text-az-active border-az-active/30 font-semibold' },
  { id: 'copy-paste', name: 'Cut, Copy & Paste', icon: 'Clipboard', color: 'bg-az-warning/10 text-az-warning border-az-warning/20' },
  { id: 'search', name: 'Search & Replace', icon: 'Search', color: 'bg-az-info/10 text-az-info border-az-info/20' },
  { id: 'files', name: 'Files, Windows & Tabs', icon: 'FolderOpen', color: 'bg-az-active/10 text-az-active border-az-active/20' },
  { id: 'advanced', name: 'Macros & Advanced', icon: 'Zap', color: 'bg-az-warning/15 text-az-warning border-az-warning/25' },
  { id: 'neovim', name: 'Neovim & LSP', icon: 'Sparkles', color: 'bg-az-success/10 text-az-success border-az-success/20' },
];

export const VIM_COMMANDS: VimCommand[] = [
  // --- Movement / Motions ---
  { id: 'm1', key: 'h', description: 'Move cursor left one character', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm2', key: 'j', description: 'Move cursor down one line', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm3', key: 'k', description: 'Move cursor up one line', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm4', key: 'l', description: 'Move cursor right one character', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm5', key: 'w', description: 'Move forward to start of next word', category: 'motion', mode: 'normal', isCommon: true, notes: 'Words consist of letters, digits, underscores' },
  { id: 'm6', key: 'W', description: 'Move forward to start of next WORD (space-delimited)', category: 'motion', mode: 'normal' },
  { id: 'm7', key: 'e', description: 'Move forward to end of current/next word', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm8', key: 'E', description: 'Move forward to end of current/next WORD (space-delimited)', category: 'motion', mode: 'normal' },
  { id: 'm9', key: 'b', description: 'Move backward to start of current/previous word', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm10', key: 'B', description: 'Move backward to start of current/previous WORD (space-delimited)', category: 'motion', mode: 'normal' },
  { id: 'm11', key: '0', description: 'Move cursor to the start of the current line', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm12', key: '^', description: 'Move cursor to first non-blank character of the current line', category: 'motion', mode: 'normal' },
  { id: 'm13', key: '$', description: 'Move cursor to the end of the current line', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm14', key: 'g_', description: 'Move cursor to last non-blank character of the line', category: 'motion', mode: 'normal' },
  { id: 'm15', key: 'gg', description: 'Move cursor to the first line of the document', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm16', key: 'G', description: 'Move cursor to the last line of the document', category: 'motion', mode: 'normal', isCommon: true, notes: 'Type [number]G to go to that specific line' },
  { id: 'm17', key: '%', description: 'Move cursor to matching brace/parenthesis/bracket', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm18', key: 'H', description: 'Move cursor to top of the screen ("Home")', category: 'motion', mode: 'normal' },
  { id: 'm19', key: 'M', description: 'Move cursor to middle of the screen ("Middle")', category: 'motion', mode: 'normal' },
  { id: 'm20', key: 'L', description: 'Move cursor to bottom of the screen ("Last")', category: 'motion', mode: 'normal' },
  { id: 'm21', key: 'f[char]', description: 'Find next occurrence of [char] on current line', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm22', key: 'F[char]', description: 'Find previous occurrence of [char] on current line', category: 'motion', mode: 'normal' },
  { id: 'm23', key: 't[char]', description: 'Move cursor till just before next occurrence of [char]', category: 'motion', mode: 'normal' },
  { id: 'm24', key: 'T[char]', description: 'Move cursor till just after previous occurrence of [char]', category: 'motion', mode: 'normal' },
  { id: 'm25', key: ';', description: 'Repeat last f, F, t, or T command', category: 'motion', mode: 'normal' },
  { id: 'm26', key: ',', description: 'Repeat last f, F, t, or T command in reverse direction', category: 'motion', mode: 'normal' },
  { id: 'm27', key: 'Ctrl+D', description: 'Scroll Down half a screen', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm28', key: 'Ctrl+U', description: 'Scroll Up half a screen', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm29', key: 'Ctrl+F', description: 'Scroll Down full screen', category: 'motion', mode: 'normal' },
  { id: 'm30', key: 'Ctrl+B', description: 'Scroll Up full screen', category: 'motion', mode: 'normal' },
  { id: 'm31', key: 'ge', description: 'Move backward to end of current/previous word', category: 'motion', mode: 'normal' },
  { id: 'm32', key: 'gE', description: 'Move backward to end of current/previous WORD', category: 'motion', mode: 'normal' },
  { id: 'm33', key: 'gj', description: 'Move cursor down one line on visual display lines (even if wrapped)', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm34', key: 'gk', description: 'Move cursor up one line on visual display lines (even if wrapped)', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm35', key: '}', description: 'Jump forward to next empty line (end of current paragraph)', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm36', key: '{', description: 'Jump backward to previous empty line (start of current paragraph)', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm37', key: 'gd', description: 'Go to Definition of symbol under cursor locally', category: 'motion', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: 'gd -> ctrl+o',
      steps: [
        'Move cursor to a variable or function reference inside your code.',
        'Type gd in normal mode to instantly jump cursor to the initial declaration/definition.',
        'Review or alter the declaration.',
        'Press Ctrl+o to pop back to your original line location in the jump list.'
      ],
      outcome: 'Inspect and understand function/variable definitions in huge files with instant jumpbacks.'
    }
  },
  { id: 'm38', key: 'Ctrl+O', description: 'Jump back to your older location in major jump histories', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm39', key: 'Ctrl+I', description: 'Jump forward to your newer location in major jump histories', category: 'motion', mode: 'normal' },
  { id: 'm40', key: '``', description: 'Jump back to exact position before your last major cursor search/movement', category: 'motion', mode: 'normal' },

  // --- Insertion / Editing ---
  { id: 'e1', key: 'i', description: 'Insert text BEFORE the cursor', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e2', key: 'I', description: 'Insert text at first non-blank character of current line', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e3', key: 'a', description: 'Append text AFTER the cursor', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e4', key: 'A', description: 'Append text at the END of current line', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e5', key: 'o', description: 'Open a new line BELOW current and start Insert mode', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e6', key: 'O', description: 'Open a new line ABOVE current and start Insert mode', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e7', key: 'r[char]', description: 'Replace current character with [char] (stays in normal mode)', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e8', key: 'R', description: 'Enter Replace mode (overwrite existing characters)', category: 'edit', mode: 'normal' },
  { id: 'e9', key: 's', description: 'Delete current character and enter Insert mode', category: 'edit', mode: 'normal' },
  { id: 'e10', key: 'S', description: 'Delete current line and enter Insert mode', category: 'edit', mode: 'normal' },
  { id: 'e11', key: 'cc', description: 'Change current line (deletes line and enters Insert)', category: 'edit', mode: 'normal' },
  { id: 'e12', key: 'cw', description: 'Change until the end of word', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e13', key: 'C', description: 'Change until end of line (deletes remaining line, begins insert)', category: 'edit', mode: 'normal' },
  { id: 'e14', key: 'Esc', description: 'Exit Insert/Visual/Command mode to Normal mode', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e15', key: 'u', description: 'Undo last change', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e16', key: 'Ctrl+r', description: 'Redo last undone change', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e17', key: '.', description: 'Repeat the last editing/insertion command', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e18', key: 'J', description: 'Join current line with the line below, removing line break', category: 'edit', mode: 'normal' },
  { id: 'e19', key: 'gi', description: 'Insert text at the last insertion point', category: 'edit', mode: 'normal' },
  { id: 'e20', key: 'gI', description: 'Insert text in the absolute first column (column 1)', category: 'edit', mode: 'normal' },
  { id: 'e21', key: 'xp', description: 'Transpose (swap) character under cursor with next character', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e22', key: 'ddp', description: 'Transpose (swap) current line with the line below', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e23', key: '~', description: 'Toggle case of character under cursor and move cursor right', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e24', key: 'g~[motion]', description: 'Toggle letter case across characters covered by motion', category: 'edit', mode: 'normal' },
  { id: 'e25', key: 'gu[motion]', description: 'Lowercase characters spanned by motion (e.g., guiw)', category: 'edit', mode: 'normal' },
  { id: 'e26', key: 'gU[motion]', description: 'Uppercase characters spanned by motion (e.g., gUiw)', category: 'edit', mode: 'normal' },
  { id: 'e27', key: 'oEsc', description: 'Insert an empty line below current line (staying in Normal mode)', category: 'edit', mode: 'normal' },

  // --- Visual Mode ---
  { id: 'v1', key: 'v', description: 'Start Visual selection character-by-character', category: 'visual', mode: 'normal', isCommon: true },
  { id: 'v2', key: 'V', description: 'Start Visual Line selection (select complete lines)', category: 'visual', mode: 'normal', isCommon: true },
  { 
    id: 'v3', 
    key: 'Ctrl+v', 
    description: 'Start Visual Block selection (rectangular columns)', 
    category: 'visual', 
    mode: 'normal', 
    isCommon: true,
    expertWorkflow: {
      sequence: 'Ctrl+v 5j I // Esc',
      steps: [
        'Place cursor at column 1 of the first target row.',
        'Press Ctrl+v to activate rectangular Visual Block mode.',
        'Type 5j to expand selection downwards across 5 consecutive rows.',
        'Press Shift+i (I) to enter block-insertion.',
        'Type your comment symbols "// " (and see it appear on the first line).',
        'Press Escape (Esc) to exit, writing changes to all 5 rows simultaneously.'
      ],
      outcome: 'Insert characters across a block column simultaneously (ideal for instant block-commenting).'
    }
  },
  { id: 'v4', key: 'o', description: 'Move cursor to other end of visual selection area', category: 'visual', mode: 'visual' },
  { id: 'v5', key: 'O', description: 'Move cursor only in visual block (between corners)', category: 'visual', mode: 'visual' },
  { id: 'v6', key: 'aw', description: 'Select "a word" including surrounding whitespace', category: 'visual', mode: 'visual', notes: 'Modifier' },
  { 
    id: 'v7', 
    key: 'iw', 
    description: 'Select "inner word" excluding surrounding whitespace', 
    category: 'visual', 
    mode: 'visual', 
    isCommon: true,
    expertWorkflow: {
      sequence: 'viw c helper_func Esc',
      steps: [
        'Place the cursor anywhere inside the target word token.',
        'Press v to enter visual selection mode.',
        'Type iw to instantly snap selected boundaries to the inner word (ignoring edge spaces).',
        'Type c to wipe the selection and launch Insert mode.',
        'Type your new variable name "helper_func" and press Escape to finish.'
      ],
      outcome: 'Wipe and replace a single focused word token with maximum speed.'
    }
  },
  { id: 'v8', key: 'ab', description: 'Select a block (surrounded by parenthesis)', category: 'visual', mode: 'visual' },
  { id: 'v9', key: 'ib', description: 'Select inner block (inside parenthesis)', category: 'visual', mode: 'visual' },
  { id: 'v10', key: 'aB', description: 'Select a Big block (surrounded by curly braces)', category: 'visual', mode: 'visual' },
  { id: 'v11', key: 'iB', description: 'Select inner Big block (inside curly braces)', category: 'visual', mode: 'visual' },
  { id: 'v12', key: 'at', description: 'Select an HTML/XML tag block', category: 'visual', mode: 'visual' },
  { 
    id: 'v13', 
    key: 'it', 
    description: 'Select inside tag content', 
    category: 'visual', 
    mode: 'visual',
    expertWorkflow: {
      sequence: 'cit <span>New content</span> Esc',
      steps: [
        'Move cursor inside target HTML/XML tag body (e.g. <div>content</div>).',
        'Type c to initiate a Change action.',
        'Type it to target the elements inside the active tag.',
        'Type the replacement tag markup "<span>New content</span>".',
        'Press Escape to apply. Inner content is updated while parent boundaries remain pristine.'
      ],
      outcome: 'Swiftly swap structural child nodes inside nested HTML/XML markup trees.'
    }
  },
  { id: 'v14', key: '>', description: 'Shift visual lines right (indent)', category: 'visual', mode: 'visual', isCommon: true },
  { id: 'v15', key: '<', description: 'Shift visual lines left (outdent)', category: 'visual', mode: 'visual', isCommon: true },
  { id: 'v16', key: 'y', description: 'Yank (copy) the current visual selection', category: 'visual', mode: 'visual', isCommon: true },
  { id: 'v17', key: 'd', description: 'Delete (cut) the current visual selection', category: 'visual', mode: 'visual', isCommon: true },
  { id: 'v18', key: 'U', description: 'Convert selected text to uppercase', category: 'visual', mode: 'visual' },
  { id: 'v19', key: 'u', description: 'Convert selected text to lowercase', category: 'visual', mode: 'visual' },
  { id: 'v20', key: 'gv', description: 'Re-select the previous visual selection area', category: 'visual', mode: 'normal', isCommon: true },
  { id: 'v21', key: 'ap', description: 'Select a paragraph (includes separating empty line)', category: 'visual', mode: 'visual' },
  { id: 'v22', key: 'ip', description: 'Select inner paragraph text (excluding boundaries)', category: 'visual', mode: 'visual' },
  { id: 'v23', key: 'a"', description: 'Select a double-quoted string (including quotes)', category: 'visual', mode: 'visual', isCommon: true,
    expertWorkflow: {
      sequence: 'da"',
      steps: [
        'Move cursor inside a double-quoted string (e.g. console.log("hello world")).',
        'Type da" in normal mode.',
        'The entire string and both of its enclosing quotes are wiped instantly.'
      ],
      outcome: 'Delete double-quoted strings and their quotation symbols with 3 keypresses.'
    }
  },
  { id: 'v24', key: 'i"', description: 'Select inner double-quoted string (excluding quotes)', category: 'visual', mode: 'visual', isCommon: true,
    expertWorkflow: {
      sequence: 'ci" new_string',
      steps: [
        'Hover cursor inside quotes (e.g. const file = "config.json";).',
        'Type ci" in normal mode.',
        'Wipes characters inside quotes but keeps quotation marks intact, instantly opening Insert mode.',
        'Type replacement string "new_string" and hit Escape.'
      ],
      outcome: 'Change or edit text inside quote segments while preserving quotes seamlessly.'
    }
  },
  { id: 'v25', key: 'a\'', description: "Select a single-quoted string (including quotes)", category: 'visual', mode: 'visual' },
  { id: 'v26', key: 'i\'', description: "Select inner single-quoted string (excluding quotes)", category: 'visual', mode: 'visual' },
  { id: 'v27', key: 'a`', description: 'Select a template literal string (including backticks)', category: 'visual', mode: 'visual' },
  { id: 'v28', key: 'i`', description: 'Select inner template literal string (excluding backticks)', category: 'visual', mode: 'visual' },

  // --- Copy, Cut & Paste ---
  { id: 'c1', key: 'x', description: 'Delete (cut) current character under cursor', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c2', key: 'X', description: 'Delete (cut) character before cursor', category: 'copy-paste', mode: 'normal' },
  { id: 'c3', key: 'dd', description: 'Delete (cut) current line completely', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c4', key: 'dw', description: 'Delete (cut) word from cursor to end of word', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c5', key: 'd$', description: 'Delete (cut) from cursor to end of current line', category: 'copy-paste', mode: 'normal' },
  { id: 'c6', key: 'D', description: 'Shortcut for d$ (delete remainder of line)', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c7', key: 'yy', description: 'Yank (copy) current line', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c8', key: 'yw', description: 'Yank (copy) from cursor to end of word', category: 'copy-paste', mode: 'normal' },
  { id: 'c9', key: 'y$', description: 'Yank (copy) from cursor to end of line', category: 'copy-paste', mode: 'normal' },
  { id: 'c10', key: 'p', description: 'Put (paste) clipboard content AFTER cursor (or below current line)', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c11', key: 'P', description: 'Put (paste) clipboard content BEFORE cursor (or above current line)', category: 'copy-paste', mode: 'normal', isCommon: true },
  { 
    id: 'c12', 
    key: '"[register]', 
    description: 'Prefix to specify register name (e.g., "ay to yank into register a)', 
    category: 'copy-paste', 
    mode: 'normal',
    expertWorkflow: {
      sequence: '"a3yy -> ctrl+w w -> "ap',
      steps: [
        'Move cursor to lines of concern.',
        'Type "a3yy to copy 3 lines specifically into the designated register "a".',
        'Switch focus to another horizontal/vertical split window (Ctrl+w w).',
        'Place cursor at insertion point.',
        'Type "ap to paste the clean block from register "a" without overwriting the default buffer.'
      ],
      outcome: 'Copy and retain multiple separate clipboard blocks simultaneously using named registers.'
    }
  },
  { id: 'c13', key: ':reg', description: 'List the contents of all active registers', category: 'copy-paste', mode: 'command-line', isCommon: true },
  { id: 'c14', key: '"0p', description: 'Paste content of last yanked line specifically (even if d has overwritten default register)', category: 'copy-paste', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: 'yiw -> dw -> "0p',
      steps: [
        'Place cursor on a word to copy, and type yiw.',
        'Move cursor to another word to replace, and type dw to delete/cut it (which overwrites the main clipboard).',
        'Type "0p to paste from the exclusive yank register (register 0).',
        'Observe that the originally yanked word is pasted, not the recently deleted word.'
      ],
      outcome: 'Perform swap/replace operations without deleting/overwriting your yanked clipboard data.'
    }
  },
  { id: 'c15', key: '"+y', description: 'Yank (copy) text directly to the global system OS clipboard', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c16', key: '"+p', description: 'Paste content from global system OS clipboard', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c17', key: 'gp', description: 'Paste clipboard content after cursor/line and reposition cursor directly at end of pasted text', category: 'copy-paste', mode: 'normal' },

  // --- Search & Replace ---
  { id: 's1', key: '/[pattern]', description: 'Search forward for [pattern]', category: 'search', mode: 'normal', isCommon: true },
  { id: 's2', key: '?[pattern]', description: 'Search backward for [pattern]', category: 'search', mode: 'normal' },
  { id: 's3', key: 'n', description: 'Repeat last search in same forward direction', category: 'search', mode: 'normal', isCommon: true },
  { id: 's4', key: 'N', description: 'Repeat last search in opposite backward direction', category: 'search', mode: 'normal', isCommon: true },
  { id: 's5', key: '*', description: 'Search forward for whole word currently under cursor', category: 'search', mode: 'normal', isCommon: true },
  { id: 's6', key: '#', description: 'Search backward for whole word currently under cursor', category: 'search', mode: 'normal' },
  { 
    id: 's7', 
    key: ':%s/old/new/g', 
    description: 'Replace all occurrences of "old" with "new" globally in file', 
    category: 'search', 
    mode: 'command-line', 
    isCommon: true,
    expertWorkflow: {
      sequence: ':%s/\\bcount\\b/total/g',
      steps: [
        'Type ":" to open Command console.',
        'Type "%s/" boundary indicator.',
        'Enter standard regex matching whole word boundaries: "\\bcount\\b".',
        'Type "/total/g" defining replacement word and indicating global replacement.',
        'Hit Enter to apply modifications instantly across all rows.'
      ],
      outcome: 'Perform highly precise variable name refactoring globally inside the active document.'
    }
  },
  { 
    id: 's8', 
    key: ':%s/old/new/gc', 
    description: 'Replace all occurrences of "old" with "new" with confirmations', 
    category: 'search', 
    mode: 'command-line',
    expertWorkflow: {
      sequence: ':%s/temp/cache/gc -> y/n',
      steps: [
        'Type ":" to activate Command line mode.',
        'Type "%s/temp/cache/gc" and click Enter.',
        'Vim highlights the first matching instance and displays a prompt at bottom.',
        'Press y to change execution on this match, or n to skip matches safely.'
      ],
      outcome: 'Perform controlled, audited refactoring of search patterns with targeted visual safety overrides.'
    }
  },
  { id: 's9', key: ':s/old/new/g', description: 'Replace occurrences of "old" with "new" ONLY on current line', category: 'search', mode: 'command-line' },
  { id: 's10', key: 'gn', description: 'Search forward for last search pattern and visually select the next match', category: 'search', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: '/total -> gn -> c -> count Esc',
      steps: [
        'Search for a pattern by typing "/total" and clicking Enter.',
        'Type gn in normal mode. Vim instantly moves to the next match and opens Visual selection on it.',
        'Type c to immediately wipe the match and enter Insert mode.',
        'Type "count" and exit with Escape.',
        'Type n to move to next match, or type "." to repeat the swap instantly.'
      ],
      outcome: 'A modern, highly efficient alternative to regex replace for selective keyword swapping.'
    }
  },
  { id: 's11', key: 'g*', description: 'Search forward for word under cursor (permits partial substring matches)', category: 'search', mode: 'normal' },
  { id: 's12', key: 'g#', description: 'Search backward for word under cursor (permits partial substring matches)', category: 'search', mode: 'normal' },
  { id: 's13', key: ':noh', description: 'Temporarily turn off active search highlighting until next search', category: 'search', mode: 'command-line', isCommon: true },
  { id: 's14', key: ':set hlsearch!', description: 'Toggle continuous search highlighting state', category: 'search', mode: 'command-line' },

  // --- Files & Windows / Command Mode ---
  { id: 'f1', key: ':w', description: 'Write (save) the current file', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f2', key: ':q', description: 'Quit current file and buffer (fails if unsaved)', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f3', key: ':wq', description: 'Write (save) and quit current file buffer', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f4', key: ':q!', description: 'Force quit, discarding all unsaved changes', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f5', key: ':x', description: 'Write and quit (saves only if changes exist)', category: 'files', mode: 'command-line' },
  { id: 'f6', key: ':e [file]', description: 'Edit (open) a file named [file]', category: 'files', mode: 'command-line' },
  { id: 'f7', key: ':sp [file]', description: 'Split viewport horizontally and open [file]', category: 'files', mode: 'command-line', isCommon: true },
  { 
    id: 'f8', 
    key: ':vsp [file]', 
    description: 'Split viewport vertically and open [file]', 
    category: 'files', 
    mode: 'command-line', 
    isCommon: true,
    expertWorkflow: {
      sequence: ':vsp src/components/CheatsheetList.tsx -> ctrl+w l',
      steps: [
        'Type ":" to configure command-line console mode.',
        'Type "vsp src/components/CheatsheetList.tsx" and press Enter.',
        'Observe your workspace viewport split vertically.',
        'Type Ctrl+w followed by directional h/j/k/l keys to jump mouse cursor focus across active vertical files.'
      ],
      outcome: 'Instant vertical comparative multi-buffer file alignment for high productivity editing.'
    }
  },
  { id: 'f9', key: 'Ctrl+w w', description: 'Cycle focus between active viewport windows', category: 'files', mode: 'normal', isCommon: true },
  { id: 'f10', key: 'Ctrl+w h/j/k/l', description: 'Navigate window focus in matching direction', category: 'files', mode: 'normal' },
  { id: 'f11', key: 'Ctrl+w c', description: 'Close current window viewport', category: 'files', mode: 'normal' },
  { id: 'f12', key: ':tabnew [file]', description: 'Open [file] in a new visual tab', category: 'files', mode: 'command-line' },
  { id: 'f13', key: 'gt', description: 'Go to the next tab page', category: 'files', mode: 'normal' },
  { id: 'f14', key: 'gT', description: 'Go to the previous tab page', category: 'files', mode: 'normal' },
  { id: 'f15', key: ':bn', description: 'Switch to the next buffer in buffer lists', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f16', key: ':bp', description: 'Switch to the previous buffer in buffer lists', category: 'files', mode: 'command-line' },
  { id: 'f17', key: ':bd', description: 'Delete/unload current buffer, closing the file', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f18', key: ':ls', description: 'List all open text buffers', category: 'files', mode: 'command-line' },
  { id: 'f19', key: 'Ctrl+w o', description: 'Close all other split viewports, keeping ONLY the active one ("only")', category: 'files', mode: 'normal', isCommon: true },
  { id: 'f20', key: 'Ctrl+w =', description: 'Equalize size of all active split viewport panes', category: 'files', mode: 'normal' },
  { id: 'f21', key: 'Ctrl+w H/J/K/L', description: 'Move the current split window to the far Left/Bottom/Top/Right edge', category: 'files', mode: 'normal' },
  { id: 'f22', key: 'Ctrl+w r', description: 'Rotate positions of all active split window tiles', category: 'files', mode: 'normal' },

  // --- Advanced / Registers ---
  { 
    id: 'a1', 
    key: 'q[register]', 
    description: 'Start recording keystroke macro into letters a-z', 
    category: 'advanced', 
    mode: 'normal', 
    isCommon: true,
    expertWorkflow: {
      sequence: 'qa I " Esc A " Esc j q',
      steps: [
        'Hover on a list node item.',
        'Type qa to designate register "a" as the target macro recording buffer.',
        'Press I (Shift+i) to jump to the start of the row and type a wrapper character like \'"\'.',
        'Press Escape to return to Normal mode. Press A to jump to end of line, appending \'"\'.',
        'Press Escape. Type j to drop down to the next row coordinate and align perfectly for recurring loops.',
        'Press q to successfully conclude the macro recording sequence.'
      ],
      outcome: 'Store complex, multi-modal procedural actions ready to automate layout loops.'
    }
  },
  { id: 'a2', key: 'q', description: 'Stop recording user macro keys', category: 'advanced', mode: 'normal', isCommon: true },
  { 
    id: 'a3', 
    key: '@[register]', 
    description: 'Execute recorded macro from [register]', 
    category: 'advanced', 
    mode: 'normal', 
    isCommon: true,
    expertWorkflow: {
      sequence: '40@a',
      steps: [
        'Double-check that a macro has been cleanly recorded in register "a" (such as adding key string wrappers).',
        'Position your editor caret at the first target line configuration.',
        'Type "40@a" sequentially in Normal mode.',
        'Vim repeats the macro exactly 40 times in rapid sequence across the next 40 rows matching cursor alignment.'
      ],
      outcome: 'Instantly execute large-scale, intricate layout formatting operations across datasets without manual editing repetition.'
    }
  },
  { id: 'a4', key: '@@', description: 'Repeat the last executed macro command', category: 'advanced', mode: 'normal' },
  { 
    id: 'a5', 
    key: ':[range]g/pattern/cmd', 
    description: 'Vim global command: execute cmd on lines containing pattern', 
    category: 'advanced', 
    mode: 'command-line',
    expertWorkflow: {
      sequence: ':g/console\\.log/d',
      steps: [
        'Type ":" to enter Command line mode.',
        'Type "g/" indicating match filters.',
        'Type "console\\.log/" to match line items containing debugger log traces.',
        'Type "d" and click Enter to invoke Delete line operations on matching entries.'
      ],
      outcome: 'Instantly purge all debug lines across an entire project file in single-command operations.'
    }
  },
  { id: 'a6', key: 'Ctrl+a', description: 'Increment number currently block-selected or under cursor', category: 'advanced', mode: 'normal', isCommon: true },
  { id: 'a7', key: 'Ctrl+x', description: 'Decrement number under cursor', category: 'advanced', mode: 'normal' },
  { id: 'a8', key: 'gf', description: 'Open the file path under the cursor in a new viewport/split', category: 'advanced', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: 'gf -> ctrl+o',
      steps: [
        'Move cursor onto an imported file path string like "src/utils.ts" in your code.',
        'Type gf in normal mode.',
        'Vim instantly locates and opens that file directly, replacing the current buffer.',
        'Type Ctrl+o to slide back to the previous file.'
      ],
      outcome: 'Traverse imported files and modules dynamically without browsing file explorer sidebars.'
    }
  },
  { id: 'a9', key: 'Ctrl+z', description: 'Suspend ViM session, returning temporarily to shell console', category: 'advanced', mode: 'normal' },
  { id: 'a10', key: ':![cmd]', description: 'Execute an external host OS shell command [cmd]', category: 'advanced', mode: 'command-line' },
  { id: 'a11', key: 'K', description: 'Look up manual reference pages (man page) or documentation for keyword under cursor', category: 'advanced', mode: 'normal' },
  { id: 'a12', key: ':w !sudo tee %', description: 'Save current active buffer with admin/sudo permissions', category: 'advanced', mode: 'command-line',
    expertWorkflow: {
      sequence: ':w !sudo tee %',
      steps: [
        'Attempt to save a protected system file and receive a write error.',
        'Type ":w !sudo tee %" in active command-line mode.',
        'Sudo prompts you for your password in terminal.',
        'Press "L" inside Vim to reload, saving modifications to the root file seamlessly.'
      ],
      outcome: 'Force-save files when you forgot to launch Vim with sudo privileges, avoiding lost edits.'
    }
  },

  // --- Neovim Exclusive & LSP ---
  { id: 'nv1', key: ':checkhealth', description: 'Run diagnostic checks on Neovim installation and plugins', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv2', key: ':terminal', description: 'Open a built-in terminal emulator within a Neovim buffer', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv3', key: 'Ctrl+\\ Ctrl+n', description: 'Exit terminal mode and return to Normal mode', category: 'neovim', mode: 'terminal', isCommon: true },
  { id: 'nv4', key: 'K', description: '(LSP) Show hover documentation for symbol under cursor', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv5', key: 'gD', description: '(LSP) Go to declaration of symbol under cursor', category: 'neovim', mode: 'normal' },
  { id: 'nv6', key: 'gr', description: '(LSP) Go to references of symbol under cursor', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv7', key: ']d', description: '(LSP) Jump to the next diagnostic error or warning', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv8', key: '[d', description: '(LSP) Jump to the previous diagnostic error or warning', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv9', key: ':Lazy', description: 'Open the Lazy.nvim plugin manager UI (if installed)', category: 'neovim', mode: 'command-line' },
  { id: 'nv10', key: ':Mason', description: 'Open the Mason LSP/Linter package manager (if installed)', category: 'neovim', mode: 'command-line' },
  { id: 'nv11', key: 'gra', description: '(LSP) Execute code action (e.g. auto-fix, refactor)', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv12', key: 'grn', description: '(LSP) Rename symbol under cursor project-wide', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv13', key: 'gri', description: '(LSP) Go to implementation of symbol under cursor', category: 'neovim', mode: 'normal', isCommon: true },
  { id: 'nv14', key: 'grt', description: '(LSP) Go to type definition of symbol under cursor', category: 'neovim', mode: 'normal' },
  { id: 'nv15', key: 'gO', description: '(LSP) View document symbols in quickfix list', category: 'neovim', mode: 'normal' },
  { id: 'nv16', key: 'Ctrl+s', description: '(LSP) Show signature help for function arguments', category: 'neovim', mode: 'insert' },
  { id: 'nv17', key: ':LspInfo', description: 'Display status of active Language Servers attached to buffer', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv18', key: ':LspRestart', description: 'Restart all active Language Servers', category: 'neovim', mode: 'command-line' },
  { id: 'nv19', key: ':Telescope find_files', description: '(Telescope) Search for files in current working directory', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv20', key: ':Telescope live_grep', description: '(Telescope) Search for string text live across all project files', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv21', key: ':Telescope buffers', description: '(Telescope) List and fuzzy-find open buffers', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv22', key: ':Telescope help_tags', description: '(Telescope) Fuzzy search through Neovim help documentation', category: 'neovim', mode: 'command-line' },
  { id: 'nv23', key: ':TSInstall [lang]', description: '(Treesitter) Download and compile Treesitter parser for language', category: 'neovim', mode: 'command-line' },
  { id: 'nv24', key: ':TSUpdate', description: '(Treesitter) Update all installed Treesitter parsers', category: 'neovim', mode: 'command-line' },
  { id: 'nv25', key: ':lua [code]', description: 'Execute raw Lua code in the Neovim runtime', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv26', key: ':source %', description: 'Source (reload) the current Lua/Vimscript file buffer into Neovim', category: 'neovim', mode: 'command-line', isCommon: true },

  // --- Expanded Movement / Motions ---
  { id: 'm41', key: 'g;', description: 'Jump to last modified location in the changelist', category: 'motion', mode: 'normal' },
  { id: 'm42', key: 'g,', description: 'Jump forward in the changelist (reverse of g;)', category: 'motion', mode: 'normal' },
  { id: 'm43', key: ']c', description: 'Jump to the start of the next diff/git change hunk', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm44', key: '[c', description: 'Jump to the start of the previous diff/git change hunk', category: 'motion', mode: 'normal' },
  { id: 'm45', key: ']m', description: 'Jump to the start of the next method or function definition', category: 'motion', mode: 'normal' },
  { id: 'm46', key: '[m', description: 'Jump to the start of the previous method or function definition', category: 'motion', mode: 'normal' },

  // --- Expanded Insertion / Editing ---
  { id: 'e28', key: 'Ctrl+T', description: 'Indent current line by shiftwidth (in Insert mode)', category: 'edit', mode: 'insert' },
  { id: 'e29', key: 'Ctrl+D', description: 'De-indent (outdent) current line by shiftwidth (in Insert mode)', category: 'edit', mode: 'insert' },
  { id: 'e30', key: 'gq[motion]', description: 'Format and wrap text spanned by motion to fit textwidth limits', category: 'edit', mode: 'normal' },

  // --- Expanded Advanced / Registers / Folding / Spelling ---
  { id: 'a13', key: 'za', description: 'Toggle code fold block under cursor', category: 'advanced', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: 'zM -> zo -> za',
      steps: [
        'Type zM to close all code folds in current buffer (hides function/class bodies).',
        'Navigate cursor to a collapsed fold signature you want to inspect.',
        'Type zo to open that specific fold and reveal its code content.',
        'Type za on that signature line to toggle/collapse it back when finished.'
      ],
      outcome: 'Navigate and manage file structure at a high level using nested folding actions.'
    }
  },
  { id: 'a14', key: 'zc', description: 'Close (collapse) code fold block under cursor', category: 'advanced', mode: 'normal' },
  { id: 'a15', key: 'zo', description: 'Open (expand) code fold block under cursor', category: 'advanced', mode: 'normal' },
  { id: 'a16', key: 'zM', description: 'Close all code folds in the current buffer', category: 'advanced', mode: 'normal' },
  { id: 'a17', key: 'zR', description: 'Open all code folds in the current buffer', category: 'advanced', mode: 'normal' },
  { id: 'a18', key: ']s', description: 'Jump cursor forward to the next misspelled word/typo', category: 'advanced', mode: 'normal', isCommon: true },
  { id: 'a19', key: '[s', description: 'Jump cursor backward to the previous misspelled word/typo', category: 'advanced', mode: 'normal' },
  { id: 'a20', key: 'z=', description: 'Show spelling correction list for word under cursor', category: 'advanced', mode: 'normal', isCommon: true,
    expertWorkflow: {
      sequence: ']s -> z=',
      steps: [
        'Type ]s to locate the next spelling error in comments or documentation.',
        'Type z= with cursor resting on the misspelled word.',
        'Choose the correct suggestion from the numbered list and type its index number.',
        'Press Enter to swap the typo with the chosen correct spelling.'
      ],
      outcome: 'Identify and fix document/code spelling errors with minimum navigation overhead.'
    }
  },
  { id: 'a21', key: 'zg', description: 'Add word under cursor to spelling dictionary (good word)', category: 'advanced', mode: 'normal' },
  { id: 'a22', key: 'ga', description: 'Show ASCII/Unicode character values under cursor', category: 'advanced', mode: 'normal' },

  // --- Expanded Neovim Exclusive & LSP ---
  { id: 'nv27', key: ':Telescope oldfiles', description: '(Telescope) List and fuzzy-search previously opened files', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv28', key: ':Telescope keymaps', description: '(Telescope) Fuzzy search through all registered keymaps', category: 'neovim', mode: 'command-line' },
  { id: 'nv29', key: ':Telescope diagnostics', description: '(Telescope) Fuzzy list workspace or document LSP diagnostics', category: 'neovim', mode: 'command-line', isCommon: true },

  // --- Extended Jumps, Tags & Window Scrolling ---
  { id: 'm47', key: 'Ctrl+]', description: 'Jump to definition of tag/symbol under cursor (via tags file)', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm48', key: 'Ctrl+T', description: 'Jump back up the tag stack (reverse of Ctrl+])', category: 'motion', mode: 'normal' },
  { id: 'm49', key: '[[', description: 'Jump backward to start of previous section/function', category: 'motion', mode: 'normal' },
  { id: 'm50', key: ']]', description: 'Jump forward to start of next section/function', category: 'motion', mode: 'normal' },
  { id: 'm51', key: '[]', description: 'Jump backward to end of previous section/function', category: 'motion', mode: 'normal' },
  { id: 'm52', key: '][', description: 'Jump forward to end of next section/function', category: 'motion', mode: 'normal' },
  { id: 'm53', key: 'zh / zl', description: 'Scroll viewport horizontally left / right by 1 character column', category: 'motion', mode: 'normal' },
  { id: 'm54', key: 'zH / zL', description: 'Scroll viewport horizontally left / right by half screen width', category: 'motion', mode: 'normal' },
  { id: 'm55', key: 'zs / ze', description: 'Scroll horizontally to place cursor at start / end of viewport line', category: 'motion', mode: 'normal' },
  { id: 'm56', key: 'zt', description: 'Redraw viewport screen with cursor line locked to the Top of the screen', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm57', key: 'zz', description: 'Redraw viewport screen with cursor line locked to the Center of the screen', category: 'motion', mode: 'normal', isCommon: true },
  { id: 'm58', key: 'zb', description: 'Redraw viewport screen with cursor line locked to the Bottom of the screen', category: 'motion', mode: 'normal', isCommon: true },

  // --- Extended Insert Mode Commands ---
  { id: 'e31', key: 'Ctrl+W', description: 'Delete word before cursor (in Insert mode)', category: 'edit', mode: 'insert' },
  { id: 'e32', key: 'Ctrl+U', description: 'Delete all characters before cursor on current line (in Insert mode)', category: 'edit', mode: 'insert' },
  { id: 'e33', key: 'Ctrl+N', description: 'Word completion: match word starting with characters before cursor forward', category: 'edit', mode: 'insert', isCommon: true },
  { id: 'e34', key: 'Ctrl+P', description: 'Word completion: match word starting with characters before cursor backward', category: 'edit', mode: 'insert', isCommon: true },
  { id: 'e35', key: 'Ctrl+X Ctrl+L', description: 'Line completion: complete current line matching other files', category: 'edit', mode: 'insert' },
  { id: 'e36', key: 'Ctrl+X Ctrl+F', description: 'File path completion: complete system file path strings', category: 'edit', mode: 'insert' },
  { id: 'e37', key: 'Ctrl+O [cmd]', description: 'Execute single Normal mode command [cmd], then auto-return to Insert mode', category: 'edit', mode: 'insert', isCommon: true },
  { id: 'e38', key: 'Ctrl+R [reg]', description: 'Insert contents of register [reg] directly at insertion point', category: 'edit', mode: 'insert' },
  { id: 'e39', key: 'gR', description: 'Enter Virtual Replace mode (acts like replace mode but keeps tab layouts aligned)', category: 'edit', mode: 'normal' },
  { id: 'e40', key: 'g Ctrl+A', description: 'Increment sequence numbers progressively down visual block columns', category: 'edit', mode: 'normal', isCommon: true },
  { id: 'e41', key: 'g Ctrl+X', description: 'Decrement sequence numbers progressively down visual block columns', category: 'edit', mode: 'normal' },

  // --- Extended Copy-Paste Alignment ---
  { id: 'c18', key: ']p', description: 'Paste clipboard contents below matching current indentation level', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c19', key: '[p', description: 'Paste clipboard contents above matching current indentation level', category: 'copy-paste', mode: 'normal' },

  // --- Extended Search Regex ---
  { id: 's15', key: ':v/pattern/cmd', description: 'Global command: run cmd only on lines that do NOT match pattern (same as :g!)', category: 'search', mode: 'command-line' },
  { id: 's16', key: '\\v', description: 'Force "Very Magic" mode in search regex (reduces backslash escaping for braces/brackets)', category: 'search', mode: 'normal', isCommon: true },
  { id: 's17', key: '\\zs', description: 'Specify start index of match highlighting inside search pattern', category: 'search', mode: 'normal' },
  { id: 's18', key: '\\ze', description: 'Specify end index of match highlighting inside search pattern', category: 'search', mode: 'normal' },

  // --- Extended Viewport & Batch Operations ---
  { id: 'f23', key: ':vnew', description: 'Split viewport vertically and open a blank file buffer', category: 'files', mode: 'command-line' },
  { id: 'f24', key: ':new', description: 'Split viewport horizontally and open a blank file buffer', category: 'files', mode: 'command-line' },
  { id: 'f25', key: ':windo [cmd]', description: 'Execute Ex command [cmd] in all split windows simultaneously', category: 'files', mode: 'command-line' },
  { id: 'f26', key: ':bufdo [cmd]', description: 'Execute Ex command [cmd] in all loaded buffers simultaneously', category: 'files', mode: 'command-line' },
  { id: 'f27', key: ':tabdo [cmd]', description: 'Execute Ex command [cmd] in all open tab pages simultaneously', category: 'files', mode: 'command-line' },
  { id: 'f28', key: ':argdo [cmd]', description: 'Execute Ex command [cmd] across all files inside argument list', category: 'files', mode: 'command-line' },
  { id: 'f29', key: ':wall', description: 'Write (save) all active modified buffers to disk', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f30', key: ':qall', description: 'Quit all windows and buffers, exiting editor session (fails if unsaved)', category: 'files', mode: 'command-line' },
  { id: 'f31', key: ':wqall', description: 'Write (save) all active buffers and close editor session', category: 'files', mode: 'command-line', isCommon: true },

  // --- Extended Undo Tree & Views ---
  { id: 'a23', key: 'q:', description: 'Open Ex command history log list in a fully editable Vim text buffer', category: 'advanced', mode: 'normal', isCommon: true },
  { id: 'a24', key: 'q/', description: 'Open search pattern history log list in a fully editable Vim text buffer', category: 'advanced', mode: 'normal' },
  { id: 'a25', key: 'g-', description: 'Walk backward in undo tree chronologically (time-travel edits to earlier time)', category: 'advanced', mode: 'normal' },
  { id: 'a26', key: 'g+', description: 'Walk forward in undo tree chronologically (time-travel edits to later time)', category: 'advanced', mode: 'normal' },
  { id: 'a27', key: ':earlier [time]', description: 'Revert changes to match file state a duration ago (e.g. :earlier 5m)', category: 'advanced', mode: 'command-line', isCommon: true },
  { id: 'a28', key: ':later [time]', description: 'Advance changes to match file state a duration later (e.g. :later 2m)', category: 'advanced', mode: 'command-line' },
  { id: 'a29', key: ':mksession [file]', description: 'Save entire layout session (windows, tabs, buffers, options) to [file]', category: 'advanced', mode: 'command-line' },
  { id: 'a30', key: ':mkview', description: 'Save current active buffer cursor coordinate and fold states to local view files', category: 'advanced', mode: 'command-line' },
  { id: 'a31', key: ':loadview', description: 'Load saved cursor coordinate and fold states for current buffer file', category: 'advanced', mode: 'command-line' },

  // --- Extended Neovim Diagnostics & Quickfix ---
  { id: 'nv30', key: ':Telescope command_history', description: '(Telescope) List and fuzzy-search previously executed commands', category: 'neovim', mode: 'command-line' },
  { id: 'nv31', key: ':Telescope marks', description: '(Telescope) Fuzzy list and jump to set global and local marks', category: 'neovim', mode: 'command-line' },
  { id: 'nv32', key: ':Telescope registers', description: '(Telescope) Fuzzy list, view, and paste register contents', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv33', key: ':copen', description: 'Open global Quickfix window displaying compile errors or search results', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv34', key: ':cclose', description: 'Close global Quickfix window', category: 'neovim', mode: 'command-line' },
  { id: 'nv35', key: ':cn', description: 'Jump to the next item inside active Quickfix list', category: 'neovim', mode: 'command-line', isCommon: true },
  { id: 'nv36', key: ':cp', description: 'Jump to the previous item inside active Quickfix list', category: 'neovim', mode: 'command-line' },
  { id: 'nv37', key: ':lopen', description: 'Open local Location list window displaying file-specific diagnostics', category: 'neovim', mode: 'command-line' },
  { id: 'nv38', key: ':lclose', description: 'Close local Location list window', category: 'neovim', mode: 'command-line' },
  { id: 'nv39', key: ':lnext', description: 'Jump to next item inside active Location list', category: 'neovim', mode: 'command-line' },
  { id: 'nv40', key: ':lprev', description: 'Jump to previous item inside active Location list', category: 'neovim', mode: 'command-line' },

  // --- AZWERKS Command Profile Database ---
  { id: 'az1', key: ':AzwerksHealth', description: 'Run system diagnostics, check dependencies, and verify workspace state', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command' },
  { id: 'az2', key: ':AzwerksFullHealth', description: 'Run exhaustive system checkhealth diagnostics for Neovim and all active plugins', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command' },
  { id: 'az3', key: ':AzwerksTutor', description: 'Launch the interactive AZWERKS Neovim keystroke tutorial and survival guide', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Tutor', commandType: 'Command' },
  { id: 'az4', key: ':AzwerksEditConfig', description: 'Open the primary AZWERKS init.lua configuration file for editing', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Command' },
  { id: 'az5', key: ':AzwerksEditKeymaps', description: 'Open the core keymaps.lua configuration file to edit custom mappings', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Command' },
  { id: 'az6', key: ':AzwerksEditPlugins', description: 'Open the plugins specification directory or active configuration files', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Command' },
  { id: 'az7', key: ':AzwerksReloadConfig', description: 'Hot-reload the active init.lua Neovim configuration and apply changes', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Command', caution: true },
  { id: 'az8', key: ':AzwerksKeymaps', description: 'Open a floating visual helper window displaying active keymap registers', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Keymaps', commandType: 'Command' },
  { id: 'az9', key: ':AzwerksPalette', description: 'Open the AZWERKS unified fuzzy-command launcher and action palette', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Command Palette', commandType: 'Command' },
  { id: 'az10', key: ':AzwerksCommands', description: 'Show AZWERKS command palette (alias of :AzwerksPalette)', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Command Palette', commandType: 'Command' },
  { id: 'az11', key: ':AzwerksTraining', description: 'Open the sandbox training workspace for safe command experimentation', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Training', commandType: 'Command' },
  { id: 'az12', key: ':AzwerksObsidian', description: 'Open the active AZWERKS Obsidian vault or launch the vault setup wizard', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Documentation', commandType: 'Command' },
  { id: 'az13', key: ':AzwerksScratch', description: 'Spawn a temporary scratch buffer for drafting text or testing code snips', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-maintenance', context: 'Scratch Buffer', commandType: 'Command' },
  { id: 'az14', key: ':AzwerksProject', description: 'Show the active project profile status, root directory, and type diagnostics', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project Profile', commandType: 'Command' },
  { id: 'az15', key: ':AzwerksTreesitterInstall', description: 'Install or reinstall standard AZWERKS Treesitter language syntax parsers', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Treesitter', commandType: 'Command', caution: true },
  { id: 'az16', key: ':AzwerksTreesitterUpdate', description: 'Check for and install updates for all active Treesitter language parsers', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Treesitter', commandType: 'Command', caution: true },
  { id: 'az17', key: ':AzwerksMarkdownRenderStatus', description: 'Inspect active Markdown rendering guard status and auto-rendering safety flags', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az18', key: ':AzwerksThemeReload', description: 'Force reload and update the active AZWERKS Radium theme palette colorscheme', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Command' },
  { id: 'az19', key: ':AzwerksThemeStatus', description: 'Inspect active colorscheme, background opacity, and visual theme parameters', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Command' },
  { id: 'az20', key: ':AzwerksVisualStatus', description: 'Verify active font rendering, symbols, theme palette alignment, and GUI layers', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Command' },
  { id: 'az21', key: ':AzwerksDashboard', description: 'Open the default AZWERKS startup dashboard interface shell and file log ledger', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Dashboard', commandType: 'Command' },
  { id: 'az22', key: ':AzwerksShellStatus', description: 'Inspect runtime parameters of statusline, winbar, and breadcrumb layout shells', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Interface Shell', commandType: 'Command' },
  { id: 'az23', key: ':AzwerksWinbarToggle', description: 'Toggle display of the AZWERKS winbar breadcrumb header shell on/off', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Interface Shell', commandType: 'Command' },
  { id: 'az24', key: ':AzwerksWorkspaceStatus', description: 'Show diagnostics for workspace directories, storage sizes, and buffer hygiene', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Command' },
  { id: 'az25', key: ':AzwerksTaskStatus', description: 'Show active Overseer task templates, shell safety modes, and runner status', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Command' },
  { id: 'az26', key: ':AzwerksTaskRun [key]', description: 'Open Overseer task runner panel to pick, customize, and execute shell scripts', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Command' },
  { id: 'az27', key: ':AzwerksTaskList', description: 'Open the Overseer execution list panel to monitor background tasks', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Command' },
  { id: 'az28', key: ':AzwerksTaskRefresh', description: 'Re-scan the workspace and refresh all active project task runner templates', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Command' },
  { id: 'az29', key: ':AzwerksBufferReadStatus', description: 'Inspect path size, filetype classification, and load safety of current buffer', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command' },
  { id: 'az30', key: ':AzwerksOilEntryStatus', description: 'Inspect size and permissions of filesystem entry currently under cursor in Oil', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-oil', context: 'File Navigation', commandType: 'Command' },
  { id: 'az31', key: ':AzwerksOilDiscard', description: 'Discard all accidental pending modifications to filesystem entries in Oil buffer', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-oil', context: 'File Navigation', commandType: 'Command' },
  { id: 'az32', key: ':AzwerksReadSafetyCheck', description: 'Manually trigger file size and read-safety audit on active Markdown buffer', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command' },
  { id: 'az33', key: ':AzwerksSafetyStatus', description: 'Show active runtime security policy, shell escaping guidelines, and path limits', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command' },
  { id: 'az34', key: ':AzwerksMarkdownWorkbench', description: 'Check current Obsidian workbench state, note index paths, and auto-templates', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az35', key: ':AzwerksCheckMarkdownState', description: 'Run structural validation audit on active markdown note structure', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az36', key: ':AzwerksNewNote [title]', description: 'Create a new Zettelkasten-formatted Markdown note inside active vault', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az37', key: ':AzwerksInsertFrontmatter [title]', description: 'Inject standardized YAML metadata block at the top of active note buffer', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az38', key: ':AzwerksInsertCallout [type]', description: 'Insert formatted Obsidian admonition block (Note, Warning, Tip) at cursor', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az39', key: ':AzwerksInsertObsidianLink [target]', description: 'Fuzzy-select note from active vault and insert wikilink at cursor point', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az40', key: ':AzwerksMarkdownTOC', description: 'Generate or update auto-indexed Table of Contents block at cursor location', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az41', key: ':AzwerksOpenIndex', description: 'Open or initialize standard 00_Index.md catalog note in active vault', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az42', key: ':AzwerksOpenInbox', description: 'Open or initialize standard 01_Inbox/Inbox.md collector note in active vault', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command' },
  { id: 'az43', key: ':AzwerksMoveToArchive', description: 'Safely move current note to 99_Archive directory, rewriting internal references', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Command', caution: true },
  { id: 'az44', key: ':AzwerksVaultStatus', description: 'Audit active Obsidian vault structure for broken links, duplicate titles, and orphans', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az45', key: ':AzwerksVaultMaintenance', description: 'Alias: show AZWERKS vault maintenance status', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az46', key: ':AzwerksVaultReport', description: 'Open the generated Markdown analysis report on active vault health status', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az47', key: ':AzwerksVaultCheckLinks', description: 'Find all broken or dead internal links and unresolved wikilinks in vault', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az48', key: ':AzwerksVaultCheckFrontmatter', description: 'Scan all notes in active vault and verify compliance of YAML frontmatter metadata', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az49', key: ':AzwerksVaultFindTodo', description: 'Locate and list all unchecked task markers and TODO markers across the vault', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az50', key: ':AzwerksVaultFindVerify', description: 'Scan the active vault and find all VERIFY / audit markers needing attention', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az51', key: ':AzwerksVaultFindEmpty', description: 'Scan active vault and identify empty or near-empty file entities', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az52', key: ':AzwerksVaultFindDuplicateTitles', description: 'Check active vault for multiple note entities sharing identical titles', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az53', key: ':AzwerksVaultFindOrphans', description: 'Locate note entities inside active vault that have zero inbound wiki links', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Command' },
  { id: 'az54', key: ':AzwerksTerm [cmd]', description: 'Launch integrated shell terminal inside split viewport executing command arguments', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-terminal', context: 'Terminal', commandType: 'Command', caution: true },
  { id: 'az55', key: ':AzwerksTest', description: 'Execute test suites matching detected project types (e.g. pytest, npm test)', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Command', caution: true },
  { id: 'az56', key: ':AzwerksArchiveStatus', description: 'Show zip/tar archiving tool dependencies, version, and output path configuration', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az57', key: ':AzwerksArchiveCreateFile [format]', description: 'Generate zip or tar.gz archive package containing only current buffer file entity', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az58', key: ':AzwerksArchiveCreateDir [format]', description: 'Generate archive package containing the parent folder directory of active buffer', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az59', key: ':AzwerksArchiveCreateProject [format]', description: 'Generate compressed archive package containing entire detected project workspace', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az60', key: ':AzwerksArchiveCreatePath [path] [format]', description: 'Generate compressed archive package from custom filesystem directory or path input', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az61', key: ':AzwerksArchiveVerify [path]', description: 'Verify checksum integrity and structural extraction safety of selected archive file', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az62', key: ':AzwerksArchiveOpenOutput', description: 'Open standard system file manager showing target directory of archive outputs', category: 'advanced', mode: 'command-line', source: 'azwerks', profile: 'azwerks-archive', context: 'Archive', commandType: 'Command' },
  { id: 'az63', key: ':AzwerksDetectProject', description: 'Trigger automatic workspace root detection and load matching project profile', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az64', key: ':AzwerksProjectProfile', description: 'Show the active project profile status (same as :AzwerksProject)', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az65', key: ':AzwerksProjectRoot', description: 'Print absolute path to the active detected project workspace root', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az66', key: ':AzwerksProjectRootExplain', description: 'Print visual breakdown of markers used to detect active project workspace boundary', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az67', key: ':AzwerksProjectCdRoot', description: 'Change current active editor working directory (CWD) to project root path', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az68', key: ':AzwerksProjectOpenRoot', description: 'Open standard Oil file explorer focused on active project workspace root', category: 'files', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az69', key: ':AzwerksProjectFiles', description: 'Launch Telescope search limited to file entities inside project root boundary', category: 'search', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az70', key: ':AzwerksProjectGrep', description: 'Launch Telescope live text grep limited to project root boundary files', category: 'search', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az71', key: ':AzwerksSetProjectProfile <profile> [root]', description: 'Manually force workspace to use specified project profile override config', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az72', key: ':AzwerksClearProjectProfile', description: 'Clear manual project profile overrides and restore automated detection', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Command' },
  { id: 'az73', key: ':AzwerksFormatStatus', description: 'Inspect active formatter/linter availability and current configuration status', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Formatting', commandType: 'Command' },
  { id: 'az74', key: ':FormatDisable', description: 'Disable autoformat-on-save globally or for buffer with !', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Formatting', commandType: 'Command' },
  { id: 'az75', key: ':FormatEnable', description: 'Re-enable autoformat-on-save globally and for buffer', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Formatting', commandType: 'Command' },
  { id: 'az76', key: ':AzwerksCloseSurface', description: 'Safely close the current active special/floating surface window', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Command' },
  { id: 'az77', key: ':AzwerksCloseBuffer', description: 'Safely close the current active buffer without wiping layout splits', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Command' },
  { id: 'az78', key: ':AzwerksCloseWindow', description: 'Safely close the current window split without accidental Neovim exit', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Command' },
  
  // --- AZWERKS Keymap Ledger ---
  { id: 'az79', key: '<leader>vc', description: 'Open the primary AZWERKS init.lua configuration file for editing', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Keymap' },
  { id: 'az80', key: '<leader>vh', description: 'Run system diagnostics, check dependencies, and verify workspace state', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Keymap' },
  { id: 'az81', key: '<leader>vH', description: 'Run exhaustive system checkhealth diagnostics for Neovim and plugins', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Keymap' },
  { id: 'az82', key: '<leader>vt', description: 'Launch the interactive AZWERKS Neovim keystroke tutorial and survival guide', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Tutor', commandType: 'Keymap' },
  { id: 'az83', key: '<leader>vk', description: 'Open a floating visual helper window displaying active keymap registers', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Keymaps', commandType: 'Keymap' },
  { id: 'az84', key: '<leader>vp', description: 'Open the AZWERKS unified fuzzy-command launcher and action palette', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Command Palette', commandType: 'Keymap' },
  { id: 'az85', key: '<leader>vT', description: 'Open the sandbox training workspace for safe command experimentation', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Training', commandType: 'Keymap' },
  { id: 'az86', key: '<leader>vo', description: 'Open the active AZWERKS Obsidian vault or launch the vault setup wizard', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Documentation', commandType: 'Keymap' },
  { id: 'az87', key: '<leader>vs', description: 'Spawn a temporary scratch buffer for drafting text or testing code snips', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-maintenance', context: 'Scratch Buffer', commandType: 'Keymap' },
  { id: 'az88', key: '<leader>vP', description: 'Show the active project profile status, root directory, and type diagnostics', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project Profile', commandType: 'Keymap' },
  { id: 'az89', key: '<leader>vK', description: 'Open the core keymaps.lua configuration file to edit custom mappings', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Keymap' },
  { id: 'az90', key: '<leader>vR', description: 'Hot-reload the active init.lua Neovim configuration and apply changes', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Configuration', commandType: 'Keymap', caution: true },
  { id: 'az91', key: '<leader>vL', description: 'Force reload and update the active AZWERKS Radium theme palette colorscheme', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Keymap' },
  { id: 'az92', key: '<leader>vS', description: 'Inspect active colorscheme, background opacity, and visual theme parameters', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Keymap' },
  { id: 'az93', key: '<leader>vV', description: 'Verify active font rendering, symbols, theme palette alignment, and GUI layers', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-theme', context: 'Appearance', commandType: 'Keymap' },
  { id: 'az94', key: '<leader>vD', description: 'Open the default AZWERKS startup dashboard interface shell and file log ledger', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Dashboard', commandType: 'Keymap' },
  { id: 'az95', key: '<leader>vI', description: 'Inspect runtime parameters of statusline, winbar, and breadcrumb layout shells', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Interface Shell', commandType: 'Keymap' },
  { id: 'az96', key: '<leader>vB', description: 'Toggle display of the AZWERKS winbar breadcrumb header shell on/off', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Interface Shell', commandType: 'Keymap' },
  { id: 'az97', key: '<leader>vW', description: 'Show diagnostics for workspace directories, storage sizes, and buffer hygiene', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Keymap' },
  { id: 'az98', key: '<leader>vX', description: 'Show active runtime security policy, shell escaping guidelines, and path limits', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Keymap' },
  { id: 'az99', key: '<leader>tr', description: 'Open Overseer task runner panel to pick, customize, and execute shell scripts', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Keymap' },
  { id: 'az100', key: '<leader>ts', description: 'Show active Overseer task templates, shell safety modes, and runner status', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Keymap' },
  { id: 'az101', key: '<leader>tl', description: 'Open the Overseer execution list panel to monitor background tasks', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Keymap' },
  { id: 'az102', key: '<leader>tR', description: 'Re-scan the workspace and refresh all active project task runner templates', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Keymap' },
  { id: 'az103', key: '<leader>tp', description: 'Toggle project/task execution overview status panel', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-tasks', context: 'Tasks', commandType: 'Keymap' },
  { id: 'az104', key: '<leader>pp', description: 'Show active project profile status, root directory, and type diagnostics', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az105', key: '<leader>pd', description: 'Trigger automatic workspace root detection and load matching project profile', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az106', key: '<leader>pr', description: 'Print absolute path to the active detected project workspace root', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az107', key: '<leader>pX', description: 'Print visual breakdown of markers used to detect active project workspace boundary', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az108', key: '<leader>pc', description: 'Change current active editor working directory (CWD) to project root path', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az109', key: '<leader>po', description: 'Open standard Oil file explorer focused on active project workspace root', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az110', key: '<leader>pf', description: 'Launch Telescope search limited to file entities inside project root boundary', category: 'search', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az111', key: '<leader>pg', description: 'Launch Telescope live text grep limited to project root boundary files', category: 'search', mode: 'normal', source: 'azwerks', profile: 'azwerks-project', context: 'Project', commandType: 'Keymap' },
  { id: 'az112', key: '<leader>mw', description: 'Check current Obsidian workbench state, note index paths, and auto-templates', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az113', key: '<leader>ms', description: 'Run structural validation audit on active markdown note structure', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az114', key: '<leader>mn', description: 'Create a new Zettelkasten-formatted Markdown note inside active vault', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az115', key: '<leader>mf', description: 'Inject standardized YAML metadata block at the top of active note buffer', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az116', key: '<leader>mc', description: 'Insert formatted Obsidian admonition block (Note, Warning, Tip) at cursor', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az117', key: '<leader>ml', description: 'Fuzzy-select note from active vault and insert wikilink at cursor point', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az118', key: '<leader>mt', description: 'Generate or update auto-indexed Table of Contents block at cursor location', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az119', key: '<leader>mi', description: 'Open or initialize standard 00_Index.md catalog note in active vault', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az120', key: '<leader>mI', description: 'Open or initialize standard 01_Inbox/Inbox.md collector note in active vault', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az121', key: '<leader>ma', description: 'Safely move current note to 99_Archive directory, rewriting internal references', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap', caution: true },
  { id: 'az122', key: '<leader>mv', description: 'Audit active Obsidian vault structure for broken links, duplicate titles, and orphans', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az123', key: '<leader>mR', description: 'Open the generated Markdown analysis report on active vault health status', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az124', key: '<leader>mK', description: 'Find all broken or dead internal links and unresolved wikilinks in vault', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az125', key: '<leader>mF', description: 'Scan all notes in active vault and verify compliance of YAML frontmatter metadata', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az126', key: '<leader>mT', description: 'Locate and list all unchecked task markers and TODO markers across the vault', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az127', key: '<leader>mV', description: 'Scan the active vault and find all VERIFY / audit markers needing attention', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az128', key: '<leader>mE', description: 'Scan active vault and identify empty or near-empty file entities', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az129', key: '<leader>mD', description: 'Check active vault for multiple note entities sharing identical titles', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az130', key: '<leader>mO', description: 'Locate note entities inside active vault that have zero inbound wiki links', category: 'advanced', mode: 'normal', source: 'azwerks', profile: 'azwerks-markdown', context: 'Vault', commandType: 'Keymap' },
  { id: 'az131', key: '<leader>w', description: 'Write (save) the current active file buffer to disk', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Files', commandType: 'Keymap' },
  { id: 'az132', key: '<leader>qq', description: 'Quit (close) the current active window split', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Files', commandType: 'Keymap' },
  { id: 'az133', key: '<leader>qa', description: 'Quit all active windows and buffers, exiting editor session', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Files', commandType: 'Keymap' },
  { id: 'az134', key: '<leader>bd', description: 'Safely close the current buffer without wiping layout splits', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Keymap' },
  { id: 'az135', key: '<leader>sx', description: 'Safely close the current window split without accidental editor exit', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Workspace', commandType: 'Keymap' },
  { id: 'az136', key: '<leader>sv', description: 'Split the current viewport vertically into two side-by-side windows', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az137', key: '<leader>sh', description: 'Split the current viewport horizontally into two stacked windows', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az138', key: '<leader>se', description: 'Equalize splits to distribute window viewport spacing evenly', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az139', key: '<leader>h', description: 'Clear active search matches highlighting from the viewport', category: 'search', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Search', commandType: 'Keymap' },
  { id: 'az140', key: '<leader>p', description: 'Paste clipboard contents over selection without clobbering unnamed register', category: 'copy-paste', mode: 'visual', source: 'azwerks', profile: 'azwerks-system', context: 'Clipboard', commandType: 'Keymap' },
  { id: 'az141', key: '<leader>qo', description: 'Open global Quickfix window displaying compile errors or search results', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Quickfix', commandType: 'Keymap' },
  { id: 'az142', key: '<leader>qc', description: 'Close global Quickfix window split', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Quickfix', commandType: 'Keymap' },
  { id: 'az143', key: '<leader>qn', description: 'Jump cursor forward to the next item inside active Quickfix list', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Quickfix', commandType: 'Keymap' },
  { id: 'az144', key: '<leader>qp', description: 'Jump cursor backward to the previous item inside active Quickfix list', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Quickfix', commandType: 'Keymap' },
  { id: 'az145', key: '<leader>lo', description: 'Open local Location list window displaying file-specific diagnostics', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Location List', commandType: 'Keymap' },
  { id: 'az146', key: '<leader>lc', description: 'Close local Location list window split', category: 'neovim', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Location List', commandType: 'Keymap' },
  { id: 'az147', key: 'Ctrl+H', description: 'Move cursor focus to the window split directly to the Left', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az148', key: 'Ctrl+J', description: 'Move cursor focus to the window split directly Below it', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az149', key: 'Ctrl+K', description: 'Move cursor focus to the window split directly Above it', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az150', key: 'Ctrl+L', description: 'Move cursor focus to the window split directly to the Right', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Windows', commandType: 'Keymap' },
  { id: 'az151', key: 'Shift+L', description: 'Cycle editor focus forward to the next loaded file buffer', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Buffers', commandType: 'Keymap' },
  { id: 'az152', key: 'Shift+H', description: 'Cycle editor focus backward to the previous loaded file buffer', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Buffers', commandType: 'Keymap' },
  { id: 'az153', key: 'Ctrl+D', description: 'Scroll viewport page Down by half screen centering cursor line', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Movement', commandType: 'Keymap' },
  { id: 'az154', key: 'Ctrl+U', description: 'Scroll viewport page Up by half screen centering cursor line', category: 'motion', mode: 'normal', source: 'azwerks', profile: 'azwerks-system', context: 'Movement', commandType: 'Keymap' },
  { id: 'az155', key: 'Esc Esc', description: 'Exit interactive terminal mode returning cursor to Normal mode', category: 'neovim', mode: 'terminal', source: 'azwerks', profile: 'azwerks-system', context: 'Terminal', commandType: 'Keymap' },
  { id: 'az156', key: '<leader>gu', description: 'Undo staging of Git hunk under cursor', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'gitsigns.nvim', commandType: 'Keymap' },
  { id: 'az157', key: 'ov', description: 'Open Oil file manager vertically splitting the workspace layout', category: 'files', mode: 'normal', source: 'azwerks', profile: 'azwerks-oil', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', isCommon: true, notes: 'Must be vertical split "ov" configuration mapping' },

  // --- Neovim Mini Surround Mappings ---
  { id: 'ms1', key: 'gsa', description: 'Add surrounding characters (quotes, braces, tags) around selection', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },
  { id: 'ms2', key: 'gsd', description: 'Delete surrounding characters around text object', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },
  { id: 'ms3', key: 'gsr', description: 'Replace surrounding characters with new pair', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },
  { id: 'ms4', key: 'gsf', description: 'Find surrounding characters to the right of cursor', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },
  { id: 'ms5', key: 'gsF', description: 'Find surrounding characters to the left of cursor', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },
  { id: 'ms6', key: 'gsh', description: 'Highlight matching surrounding character pair', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },

  // --- Neovim LSP Exclusive Mappings ---
  { id: 'lsp1', key: '<leader>lR', description: 'List references of symbol under cursor in Telescope', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp2', key: 'gI', description: 'Go to implementation of symbol under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp3', key: '<leader>lr', description: 'Rename all occurrences of symbol under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp4', key: '<leader>la', description: 'Select and execute LSP code actions at cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp5', key: '<leader>lf', description: 'Format current buffer using active LSP formatter', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp6', key: '<leader>cf', description: 'Format buffer or visual range selection manually', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'lsp7', key: '<leader>cl', description: 'Execute linter diagnostic audit on active buffer', category: 'neovim', mode: 'normal', source: 'neovim' },

  // --- Neovim Git Integration Mappings ---
  { id: 'git1', key: ']h', description: 'Jump forward to next Git hunk change', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git2', key: '[h', description: 'Jump backward to previous Git hunk change', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git3', key: '<leader>gs', description: 'Stage Git hunk under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git4', key: '<leader>gr', description: 'Reset Git hunk under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git5', key: '<leader>gS', description: 'Stage entire active buffer file changes', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git6', key: '<leader>gR', description: 'Reset entire active buffer file changes', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git7', key: '<leader>gp', description: 'Preview diff of Git hunk under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git8', key: '<leader>gb', description: 'Run git blame on the current line', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git9', key: '<leader>gd', description: 'View visual diff comparison of active buffer', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'git10', key: '<leader>gB', description: 'Run Git blame panel', category: 'neovim', mode: 'normal', source: 'neovim' },

  // --- Oil File Manager Mappings ---
  { id: 'oil1', key: '<leader>e', description: 'Open Oil file manager in current directory', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap' },
  { id: 'oil2', key: '<leader>E', description: 'Open Oil file manager in a floating window', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap' },
  { id: 'oil3', key: '-', description: 'Open parent directory in Oil file manager', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', isCommon: true },
  { id: 'oil4', key: ':Oil', description: 'Open Oil file manager in current directory', category: 'files', mode: 'command-line', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Command' },
  { id: 'oil5', key: ':Oil --float', description: 'Open Oil file manager in a floating window', category: 'files', mode: 'command-line', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Command' },
  { id: 'oil6', key: 'g?', description: 'Show Oil action help menu', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil7', key: 'l / <CR>', description: 'Open selected file/directory', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil9', key: 'ov / <C-v>', description: 'Open entry in vertical split', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil10', key: 'oh / <C-x>', description: 'Open entry in horizontal split', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil11', key: 'ot / <C-t>', description: 'Open entry in tab', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil12', key: 'op / <C-p>', description: 'Preview file under cursor', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil13', key: '<C-s>', description: 'Open selection in a vertical split and close Oil (alternative)', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil14', key: '<C-t>', description: 'Open selection in a new tab page and close Oil (alternative)', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil15', key: '<C-p>', description: 'Preview selection file in a floating window (alternative)', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil16', key: '<C-c>', description: 'Close Oil window and cancel pending edits', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil17', key: 'q', description: 'Close Oil window and cancel pending edits (alternative)', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil18', key: 'Q', description: 'Discard all pending filesystem edits in current Oil buffer', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil19', key: '<C-r>', description: 'Refresh directory list from disk', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil20', key: 'h / -', description: 'Parent directory', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil21', key: '_', description: 'Open current working directory in Oil', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil22', key: '`', description: 'Change Neovim current directory (cd) to Oil directory', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil23', key: '~', description: 'Change tab-local directory (tcd) to Oil directory', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil24', key: 'gs', description: 'Toggle sorting order of files and folders', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil25', key: 'gx', description: 'Open entry externally with system application', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil26', key: 'g.', description: 'Toggle hidden files and folders display', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil27', key: 'g\\', description: 'Toggle trash display and delete tracking', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil28', key: 'gy', description: 'Copy filename under cursor to registers', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil29', key: 'gY', description: 'Copy absolute path under cursor to registers', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil30', key: 'gr', description: 'Copy relative path under cursor to registers', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },
  { id: 'oil31', key: 'gD', description: 'Copy path of current Oil directory to registers', category: 'files', mode: 'normal', source: 'neovim', plugin: 'oil.nvim', context: 'File Navigation', commandType: 'Keymap', notes: 'Active inside Oil buffer' },

  // --- Telescope Search Mappings ---
  { id: 'tele1', key: '<leader>ff', description: 'Find files in current working directory with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim', isCommon: true },
  { id: 'tele2', key: '<leader>fr', description: 'List and search recent files (oldfiles) with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim', isCommon: true },
  { id: 'tele3', key: '<leader>fg', description: 'Live grep search text across project files with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim', isCommon: true },
  { id: 'tele4', key: '<leader>fb', description: 'List and fuzzy-find open buffers with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim', isCommon: true },
  { id: 'tele5', key: '<leader>fh', description: 'Search through Neovim help documentation tags with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },
  { id: 'tele6', key: '<leader>fk', description: 'Fuzzy search through all registered Neovim keymaps with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },
  { id: 'tele7', key: '<leader>fc', description: 'Search and execute Neovim user commands with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },
  { id: 'tele8', key: '<leader>fd', description: 'Search workspace and document diagnostics with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },
  { id: 'tele9', key: '<leader>fs', description: 'Search document symbols with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },
  { id: 'tele10', key: '<leader>fS', description: 'Search workspace symbols with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'telescope.nvim' },

  // --- Obsidian Optional Mappings ---
  { id: 'obs_opt1', key: '<leader>mN', description: 'Create a new Obsidian note', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim' },
  { id: 'obs_opt2', key: '<leader>mS', description: 'Search or grep Obsidian notes', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim' },
  { id: 'obs_opt3', key: '<leader>mQ', description: 'Quick switch to another Obsidian note', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim' },
  { id: 'obs_opt4', key: '<leader>mB', description: 'Show backlinks for the current Obsidian note', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim' },
  { id: 'obs_opt5', key: '<leader>mL', description: 'Show outgoing links from current note', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim' },

  // --- Overseer Task Mappings ---
  { id: 'over1', key: '<leader>or', description: 'Run an Overseer task', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over2', key: '<leader>ot', description: 'Toggle Overseer task list sidebar window', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over3', key: '<leader>oo', description: 'Open Overseer task list window', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over4', key: '<leader>oc', description: 'Close Overseer task list window', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over5', key: '<leader>ob', description: 'Build a new Overseer task template', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over6', key: '<leader>oq', description: 'Trigger quick action on current Overseer task', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },
  { id: 'over7', key: '<leader>oi', description: 'Show active Overseer task runner information', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'overseer.nvim' },

  // --- Trouble / Diagnostics Mappings ---
  { id: 'trb1', key: '<leader>dd', description: 'Show line diagnostics popup under cursor', category: 'neovim', mode: 'normal', source: 'neovim' },
  { id: 'trb2', key: '<leader>xx', description: 'Toggle Trouble workspace diagnostics panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb3', key: '<leader>xX', description: 'Toggle Trouble document buffer diagnostics panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb4', key: '<leader>xs', description: 'Toggle Trouble symbols outline panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb5', key: '<leader>xl', description: 'Toggle Trouble LSP definitions and references panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb6', key: '<leader>xq', description: 'Toggle Trouble Quickfix list panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb7', key: '<leader>xL', description: 'Toggle Trouble Location list panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },
  { id: 'trb8', key: '<leader>xr', description: 'Toggle Trouble LSP references panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'trouble.nvim' },

  // --- Git Mappings ---
  { id: 'git_opt1', key: '<leader>gg', description: 'Open Git status interactive panel (Neogit/Fugitive)', category: 'neovim', mode: 'normal', source: 'neovim' },

  // --- Todo Tracking Mappings ---
  { id: 'todo1', key: ']t', description: 'Jump forward to next TODO/FIXME comment marker', category: 'search', mode: 'normal', source: 'neovim', plugin: 'todo-comments.nvim', isCommon: true },
  { id: 'todo2', key: '[t', description: 'Jump backward to previous TODO/FIXME comment marker', category: 'search', mode: 'normal', source: 'neovim', plugin: 'todo-comments.nvim' },
  { id: 'todo3', key: '<leader>ft', description: 'Find and fuzzy search all TODO markers with Telescope', category: 'search', mode: 'normal', source: 'neovim', plugin: 'todo-comments.nvim', isCommon: true },
  { id: 'todo4', key: '<leader>tq', description: 'Send all project TODO comment markers to Quickfix list', category: 'search', mode: 'normal', source: 'neovim', plugin: 'todo-comments.nvim' },
  { id: 'todo5', key: '<leader>tx', description: 'List all project TODO markers in Trouble diagnostics panel', category: 'search', mode: 'normal', source: 'neovim', plugin: 'todo-comments.nvim' },

  // --- Grug Far / Replace Mappings ---
  { id: 'grug1', key: '<leader>rr', description: 'Search and replace text across the entire project with Grug Far', category: 'search', mode: 'normal', source: 'neovim', plugin: 'grug-far.nvim', isCommon: true },
  { id: 'grug2', key: '<leader>rw', description: 'Search and replace word under cursor across project with Grug Far', category: 'search', mode: 'normal', source: 'neovim', plugin: 'grug-far.nvim' },
  { id: 'grug3', key: '<leader>rf', description: 'Search and replace in the current file buffer with Grug Far', category: 'search', mode: 'normal', source: 'neovim', plugin: 'grug-far.nvim' },
  { id: 'grug4', key: '<leader>rv', description: 'Search and replace visual selection in current file with Grug Far', category: 'search', mode: 'visual', source: 'neovim', plugin: 'grug-far.nvim' },

  // --- Mini Surround Mappings ---
  { id: 'ms7', key: 'gsn', description: 'Update active Mini Surround search line count limit', category: 'edit', mode: 'normal', plugin: 'mini.surround', source: 'neovim' },

  // --- Aerial Outline Mappings ---
  { id: 'aer1', key: '<leader>ao', description: 'Toggle Aerial code structure outline sidebar', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'aerial.nvim', isCommon: true },
  { id: 'aer2', key: '<leader>aO', description: 'Open Aerial code structure outline sidebar', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'aerial.nvim' },
  { id: 'aer3', key: '<leader>ac', description: 'Close Aerial code structure outline sidebar', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'aerial.nvim' },
  { id: 'aer4', key: '<leader>an', description: 'Toggle Aerial outline navigation panel', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'aerial.nvim' },

  // --- New Motion / Movement Commands ---
  { id: 'm59', key: '(', description: 'Move backward one sentence', category: 'motion', mode: 'normal' },
  { id: 'm60', key: ')', description: 'Move forward one sentence', category: 'motion', mode: 'normal' },
  { id: 'm61', key: '[(', description: 'Jump backward to previous unmatched parenthesis', category: 'motion', mode: 'normal' },
  { id: 'm62', key: '])', description: 'Jump forward to next unmatched parenthesis', category: 'motion', mode: 'normal' },
  { id: 'm63', key: '[{', description: 'Jump backward to previous unmatched curly brace', category: 'motion', mode: 'normal' },
  { id: 'm64', key: ']}', description: 'Jump forward to next unmatched curly brace', category: 'motion', mode: 'normal' },
  { id: 'm65', key: 'Ctrl+E', description: 'Scroll viewport down one line, cursor stays on same line if possible', category: 'motion', mode: 'normal' },
  { id: 'm66', key: 'Ctrl+Y', description: 'Scroll viewport up one line, cursor stays on same line if possible', category: 'motion', mode: 'normal' },
  { id: 'm67', key: ':jumps', description: 'List all locations in the jump history list', category: 'motion', mode: 'command-line' },
  { id: 'm68', key: ':changes', description: 'List all locations in the change history list', category: 'motion', mode: 'command-line' },
  { id: 'm69', key: "'[char]", description: "Jump to start of the line containing mark [char] (e.g. 'a)", category: 'motion', mode: 'normal' },
  { id: 'm70', key: 'zj', description: 'Move cursor down to start of the next code fold block', category: 'motion', mode: 'normal' },
  { id: 'm71', key: 'zk', description: 'Move cursor up to start of the previous code fold block', category: 'motion', mode: 'normal' },

  // --- New Editing & Insertion Commands ---
  { id: 'e42', key: 'gJ', description: 'Join current line with the line below without inserting spaces', category: 'edit', mode: 'normal' },
  { id: 'e43', key: 'gw[motion]', description: 'Format and wrap text spanned by motion without moving cursor', category: 'edit', mode: 'normal' },
  { id: 'e44', key: ':left', description: 'Left-align lines in range', category: 'edit', mode: 'command-line' },
  { id: 'e45', key: ':right', description: 'Right-align lines in range to specified width', category: 'edit', mode: 'command-line' },
  { id: 'e46', key: ':center', description: 'Center-align lines in range to specified width', category: 'edit', mode: 'command-line' },
  { id: 'e47', key: 'Ctrl+A', description: 'Insert previously inserted text', category: 'edit', mode: 'insert' },
  { id: 'e48', key: 'Ctrl+Y', description: 'Copy character from line directly above cursor', category: 'edit', mode: 'insert' },
  { id: 'e49', key: 'Ctrl+E', description: 'Copy character from line directly below cursor', category: 'edit', mode: 'insert' },
  { id: 'e50', key: 'Ctrl+V [char]', description: 'Insert character literally or insert non-keyboard char by decimal/unicode value', category: 'edit', mode: 'insert' },
  { id: 'e51', key: 'Ctrl+K [c1][c2]', description: 'Insert special digraph symbol/accented character (e.g. Ctrl+K a: for ä)', category: 'edit', mode: 'insert' },

  // --- New Visual Mode Commands ---
  { id: 'v29', key: 'is', description: 'Select inner sentence (excluding whitespace)', category: 'visual', mode: 'visual' },
  { id: 'v30', key: 'as', description: 'Select a sentence (including surrounding whitespace)', category: 'visual', mode: 'visual' },
  { id: 'v31', key: 'i]', description: 'Select inner bracket block (inside square brackets)', category: 'visual', mode: 'visual' },
  { id: 'v32', key: 'a]', description: 'Select bracket block (surrounded by square brackets)', category: 'visual', mode: 'visual' },
  { id: 'v33', key: 'i>', description: 'Select inside angle brackets (inner block)', category: 'visual', mode: 'visual' },
  { id: 'v34', key: 'a>', description: 'Select angle brackets block (including brackets)', category: 'visual', mode: 'visual' },
  { id: 'v35', key: 'r[char]', description: 'Replace all characters in visual selection with [char]', category: 'visual', mode: 'visual' },

  // --- New Cut, Copy & Paste Commands ---
  { id: 'c21', key: '"_d[motion]', description: 'Delete text spanned by motion into black-hole register (does not overwrite clipboard)', category: 'copy-paste', mode: 'normal', isCommon: true },
  { id: 'c22', key: '"_c[motion]', description: 'Change text spanned by motion using black-hole register (preserves clipboard)', category: 'copy-paste', mode: 'normal' },
  { id: 'c23', key: ':put [reg]', description: 'Paste contents of register [reg] below current line', category: 'copy-paste', mode: 'command-line' },
  { id: 'c24', key: ':put! [reg]', description: 'Paste contents of register [reg] above current line', category: 'copy-paste', mode: 'command-line' },
  { id: 'c25', key: 'gP', description: 'Paste clipboard content before cursor and reposition cursor directly at end of pasted text', category: 'copy-paste', mode: 'normal' },

  // --- New Search & Replace Commands ---
  { id: 's19', key: '\\c', description: 'Force case-insensitive matching inside search pattern', category: 'search', mode: 'normal' },
  { id: 's20', key: '\\C', description: 'Force case-sensitive matching inside search pattern', category: 'search', mode: 'normal' },
  { id: 's21', key: ':%s/old/new/gI', description: 'Replace occurrences case-insensitively globally in file', category: 'search', mode: 'command-line' },
  { id: 's22', key: ':set ignorecase', description: 'Ignore case differences in search patterns', category: 'search', mode: 'command-line' },
  { id: 's23', key: ':set smartcase', description: 'Override ignorecase if pattern contains uppercase letters', category: 'search', mode: 'command-line' },
  { id: 's24', key: ':GrugFar', description: 'Open Grug Far interactive search & replace panel', category: 'search', mode: 'command-line', plugin: 'grug-far.nvim', source: 'neovim' },
  { id: 's25', key: ':GrugFarWithin', description: 'Open Grug Far search & replace scoped to selection or visual range', category: 'search', mode: 'command-line', plugin: 'grug-far.nvim', source: 'neovim' },
  { id: 's26', key: ':TodoTelescope', description: 'Search and fuzzy-find all TODO/FIXME comments in workspace', category: 'search', mode: 'command-line', plugin: 'todo-comments.nvim', source: 'neovim' },
  { id: 's27', key: ':TodoQuickFix', description: 'Populate the global quickfix list with all TODO comments', category: 'search', mode: 'command-line', plugin: 'todo-comments.nvim', source: 'neovim' },

  // --- New Files, Windows & Tabs Commands ---
  { id: 'f32', key: ':e!', description: 'Reload the current file buffer from disk, discarding unsaved changes', category: 'files', mode: 'command-line', isCommon: true },
  { id: 'f33', key: ':set ft?', description: 'Display the filetype of the current active buffer', category: 'files', mode: 'command-line' },
  { id: 'f34', key: ':setlocal filetype=markdown', description: 'Manually force buffer filetype classification to Markdown', category: 'files', mode: 'command-line' },
  { id: 'f35', key: ':b [num]', description: 'Switch active viewport buffer directly to buffer number [num]', category: 'files', mode: 'command-line' },
  { id: 'f36', key: ':bfirst', description: 'Switch buffer to the first buffer in the buffer list', category: 'files', mode: 'command-line' },
  { id: 'f37', key: ':blast', description: 'Switch buffer to the last buffer in the buffer list', category: 'files', mode: 'command-line' },
  { id: 'f38', key: ':bad [file]', description: 'Add [file] to buffer list without opening it immediately', category: 'files', mode: 'command-line' },
  { id: 'f39', key: 'Ctrl+w >', description: 'Increase the width of the current split window', category: 'files', mode: 'normal' },
  { id: 'f40', key: 'Ctrl+w <', description: 'Decrease the width of the current split window', category: 'files', mode: 'normal' },
  { id: 'f41', key: 'Ctrl+w +', description: 'Increase the height of the current split window', category: 'files', mode: 'normal' },
  { id: 'f42', key: 'Ctrl+w -', description: 'Decrease the height of the current split window', category: 'files', mode: 'normal' },
  { id: 'f43', key: 'Ctrl+w _', description: 'Maximize the height of the current split window', category: 'files', mode: 'normal' },
  { id: 'f44', key: 'Ctrl+w |', description: 'Maximize the width of the current split window', category: 'files', mode: 'normal' },
  { id: 'f45', key: ':tabclose', description: 'Close the current active tab page', category: 'files', mode: 'command-line' },
  { id: 'f46', key: ':tabonly', description: 'Close all other tab pages except the current active one', category: 'files', mode: 'command-line' },
  { id: 'f47', key: ':tabmove [N]', description: 'Move the current tab page to index position [N]', category: 'files', mode: 'command-line' },
  { id: 'f48', key: '[N]gt', description: 'Go directly to tab page number [N] (e.g. 3gt for tab 3)', category: 'files', mode: 'normal' },

  // --- New Macros & Advanced Commands ---
  { id: 'a32', key: 'q?', description: 'Open search history log list (backward search) in an editable buffer', category: 'advanced', mode: 'normal' },
  { id: 'a33', key: 'zf[motion]', description: 'Create a code fold block over range covered by motion', category: 'advanced', mode: 'normal' },
  { id: 'a34', key: 'zd', description: 'Delete the code fold block under the cursor', category: 'advanced', mode: 'normal' },
  { id: 'a35', key: 'zD', description: 'Delete all code folds under cursor recursively', category: 'advanced', mode: 'normal' },
  { id: 'a36', key: ':set spell', description: 'Enable spell check highlighting in current buffer', category: 'advanced', mode: 'command-line' },
  { id: 'a37', key: ':set nospell', description: 'Disable spell check highlighting in current buffer', category: 'advanced', mode: 'command-line' },
  { id: 'a38', key: 'zw', description: 'Mark word under cursor as misspelled in dictionary', category: 'advanced', mode: 'normal' },
  { id: 'a39', key: 'zug', description: 'Undo spelling dictionary classification of word under cursor (good word)', category: 'advanced', mode: 'normal' },
  { id: 'a40', key: 'zuw', description: 'Undo spelling dictionary classification of word under cursor (bad word)', category: 'advanced', mode: 'normal' },
  { id: 'a41', key: ':diffthis', description: 'Make current split window part of the active visual diff comparison', category: 'advanced', mode: 'command-line' },
  { id: 'a42', key: ':diffoff', description: 'Turn off visual diff comparison mode in the current split window', category: 'advanced', mode: 'command-line' },
  { id: 'a43', key: ':diffupdate', description: 'Force recalculation and update of current visual diff layout and highlights', category: 'advanced', mode: 'command-line' },
  { id: 'a44', key: ':normal [cmds]', description: 'Execute normal mode keystroke commands [cmds] on selected range', category: 'advanced', mode: 'command-line' },

  // --- New Neovim Exclusive & LSP Commands ---
  { id: 'nv41', key: ':checkhealth azwerks', description: 'Run AZWERKS system environment, dependencies and plugin health check', category: 'neovim', mode: 'command-line', source: 'azwerks', profile: 'azwerks-system', context: 'Diagnostics', commandType: 'Command', isCommon: true },
  { id: 'nv42', key: ':checkhealth vim.treesitter', description: 'Run diagnostic check on Treesitter syntax parser status', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Diagnostics', commandType: 'Command' },
  { id: 'nv43', key: ':Lazy sync', description: 'Download, update, and clean up plugins managed by Lazy.nvim', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Plugin Manager', commandType: 'Command' },
  { id: 'nv44', key: ':Trouble diagnostics toggle', description: 'Toggle display of workspace LSP diagnostics panel', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'trouble.nvim', context: 'Diagnostics', commandType: 'Command' },
  { id: 'nv45', key: ':Trouble qflist toggle', description: 'Toggle display of global Quickfix list panel', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'trouble.nvim', context: 'Diagnostics', commandType: 'Command' },
  { id: 'nv46', key: ':Trouble todo toggle', description: 'Toggle display of TODO/FIXME comments panel', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'trouble.nvim', context: 'Diagnostics', commandType: 'Command' },
  { id: 'nv47', key: ':AerialToggle', description: 'Toggle display of document code structure outline panel', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'aerial.nvim', context: 'Outline', commandType: 'Command' },
  { id: 'nv48', key: ':OverseerRun', description: 'Open default Overseer task selector template runner', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'overseer.nvim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv49', key: ':OverseerToggle', description: 'Toggle Overseer background task runner status sidebar panel', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'overseer.nvim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv50', key: ':ToggleTerm', description: 'Toggle display of built-in floating or split terminal window', category: 'neovim', mode: 'command-line', source: 'neovim', plugin: 'toggleterm.nvim', context: 'Terminal', commandType: 'Command' },
  { id: 'nv51', key: ':cnext', description: 'Jump to the next item inside active Quickfix list (alternative to :cn)', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Quickfix', commandType: 'Command' },
  { id: 'nv52', key: ':cprev', description: 'Jump to the previous item inside active Quickfix list (alternative to :cp)', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Quickfix', commandType: 'Command' },
  { id: 'nv53', key: ':set number!', description: 'Toggle absolute line number display column on/off', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Settings', commandType: 'Command' },
  { id: 'nv54', key: ':set relativenumber!', description: 'Toggle relative line number calculation display column on/off', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Settings', commandType: 'Command' },
  { id: 'nv55', key: ':set wrap!', description: 'Toggle display wrapping of long text lines to screen bounds', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Settings', commandType: 'Command' },
  { id: 'nv56', key: ':lua = [expr]', description: 'Evaluate Lua expression [expr] and inspect/print result (shorthand)', category: 'neovim', mode: 'command-line', source: 'neovim', context: 'Lua Execution', commandType: 'Command' },
  { id: 'nv57', key: 'grr', description: '(LSP) Go to references of symbol under cursor (standard Neovim 0.10+ mapping)', category: 'neovim', mode: 'normal', source: 'neovim', context: 'LSP', commandType: 'Keymap', isCommon: true },
  { id: 'nv58', key: '[D', description: '(LSP) Jump to the first diagnostic error/warning in the current buffer', category: 'neovim', mode: 'normal', source: 'neovim', context: 'LSP', commandType: 'Keymap' },
  { id: 'nv59', key: ']D', description: '(LSP) Jump to the last diagnostic error/warning in the current buffer', category: 'neovim', mode: 'normal', source: 'neovim', context: 'LSP', commandType: 'Keymap' },

  // --- Comment.nvim Commands ---
  { id: 'nv60', key: 'gcc', description: 'Toggle comment on the current line', category: 'neovim', mode: 'normal', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },
  { id: 'nv61', key: 'gbc', description: 'Toggle block comment on the current line', category: 'neovim', mode: 'normal', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },
  { id: 'nv62', key: 'gc[motion]', description: 'Toggle comment across text spanned by motion', category: 'neovim', mode: 'normal', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },
  { id: 'nv63', key: 'gb[motion]', description: 'Toggle block comment across text spanned by motion', category: 'neovim', mode: 'normal', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },
  { id: 'nv64', key: 'gc', description: 'Toggle comment on the visual selection', category: 'neovim', mode: 'visual', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },
  { id: 'nv65', key: 'gb', description: 'Toggle block comment on the visual selection', category: 'neovim', mode: 'visual', plugin: 'Comment.nvim', source: 'neovim', context: 'Comments', commandType: 'Keymap' },

  // --- obsidian.nvim Commands ---
  { id: 'nv66', key: ':ObsidianToday', description: "Open or create today's daily note", category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv67', key: ':ObsidianYesterday', description: "Open or create yesterday's daily note", category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv68', key: ':ObsidianTomorrow', description: "Open or create tomorrow's daily note", category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv69', key: ':ObsidianTemplate [name]', description: 'Insert an Obsidian template from template folder', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv70', key: ':ObsidianOpen', description: 'Open the current note in the Obsidian desktop application', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv71', key: ':ObsidianPasteImg', description: 'Paste image from clipboard into active note', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv72', key: ':ObsidianRename', description: 'Rename the current note and update all vault-wide wikilinks to it', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv73', key: ':ObsidianLink', description: 'Link selected visual text to an existing note', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv74', key: ':ObsidianLinkNew', description: 'Link selected visual text to a new note', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },
  { id: 'nv75', key: ':ObsidianCheck', description: 'Toggle the check state of a todo checkbox under cursor', category: 'neovim', mode: 'command-line', plugin: 'obsidian.nvim', source: 'neovim', context: 'Obsidian', commandType: 'Command' },

  // --- gitsigns.nvim text object & commands ---
  { id: 'v36', key: 'ih', description: 'Select Git hunk under cursor (Visual / Operator-pending text object)', category: 'visual', mode: 'visual', plugin: 'gitsigns.nvim', source: 'neovim' },
  { id: 'nv76', key: ':Gitsigns', description: 'Open Gitsigns interactive subcommands picker', category: 'neovim', mode: 'command-line', plugin: 'gitsigns.nvim', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv77', key: ':Gitsigns toggle_current_line_blame', description: 'Toggle displaying inline git blame ghost text on current line', category: 'neovim', mode: 'command-line', plugin: 'gitsigns.nvim', source: 'neovim', context: 'Git', commandType: 'Command' },

  // --- vim-fugitive Commands ---
  { id: 'nv78', key: ':Git / :G', description: 'Open the interactive Fugitive Git status window', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv79', key: ':Git blame', description: 'Open vertical Git blame gutter column for current buffer', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv80', key: ':Gdiffsplit', description: 'Open horizontal three-way diff comparison split', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv81', key: ':Gvdiffsplit', description: 'Open vertical three-way diff comparison split', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv82', key: ':Gread', description: 'Checkout and reload current file buffer from git index', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },
  { id: 'nv83', key: ':Gwrite', description: 'Stage current file buffer changes to the git index', category: 'neovim', mode: 'command-line', plugin: 'vim-fugitive', source: 'neovim', context: 'Git', commandType: 'Command' },

  // --- aerial.nvim Commands ---
  { id: 'nv84', key: ':AerialOpen', description: 'Open the document code structure outline panel', category: 'neovim', mode: 'command-line', plugin: 'aerial.nvim', source: 'neovim', context: 'Outline', commandType: 'Command' },
  { id: 'nv85', key: ':AerialClose', description: 'Close the document code structure outline panel', category: 'neovim', mode: 'command-line', plugin: 'aerial.nvim', source: 'neovim', context: 'Outline', commandType: 'Command' },
  { id: 'nv86', key: ':AerialInfo', description: 'Show diagnostic information for the Aerial outline plugin', category: 'neovim', mode: 'command-line', plugin: 'aerial.nvim', source: 'neovim', context: 'Outline', commandType: 'Command' },

  // --- grug-far.nvim Commands ---
  { id: 'nv87', key: ':GrugFarHelp', description: 'Open the help panel for Grug Far search and replace', category: 'neovim', mode: 'command-line', plugin: 'grug-far.nvim', source: 'neovim', context: 'Search/Replace', commandType: 'Command' },

  // --- overseer.nvim Commands ---
  { id: 'nv88', key: ':OverseerOpen', description: 'Open the Overseer task runner sidebar panel', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv89', key: ':OverseerClose', description: 'Close the Overseer task runner sidebar panel', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv90', key: ':OverseerBuild', description: 'Build a custom Overseer task runner template', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv91', key: ':OverseerInfo', description: 'Show diagnostic information for Overseer runner', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv92', key: ':OverseerQuickAction', description: 'Run a quick action on the selected Overseer task', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },
  { id: 'nv93', key: ':OverseerClearCache', description: 'Clear task runner cache', category: 'neovim', mode: 'command-line', plugin: 'overseer.nvim', source: 'neovim', context: 'Tasks', commandType: 'Command' },

  // --- conform.nvim Commands ---
  { id: 'nv94', key: ':ConformInfo', description: 'Show Conform active formatters and diagnostics status', category: 'neovim', mode: 'command-line', plugin: 'conform.nvim', source: 'neovim', context: 'Formatting', commandType: 'Command' },

  // --- todo-comments.nvim Commands ---
  { id: 'nv95', key: ':TodoTrouble', description: 'List all workspace TODO comments in the Trouble panel', category: 'neovim', mode: 'command-line', plugin: 'todo-comments.nvim', source: 'neovim', context: 'Diagnostics', commandType: 'Command' },
  { id: 'nv96', key: ':TodoLocList', description: 'Populate the buffer-local location list with active TODO comments', category: 'neovim', mode: 'command-line', plugin: 'todo-comments.nvim', source: 'neovim', context: 'Diagnostics', commandType: 'Command' },

  // --- which-key.nvim Commands ---
  { id: 'nv97', key: ':WhichKey', description: 'Manually trigger the Which-Key visual bindings guide', category: 'neovim', mode: 'command-line', plugin: 'which-key.nvim', source: 'neovim', context: 'Keymaps', commandType: 'Command' },

  // --- indent-blankline.nvim Commands ---
  { id: 'nv98', key: ':IBLToggle', description: 'Toggle display of visual indentation guides', category: 'neovim', mode: 'command-line', plugin: 'indent-blankline.nvim', source: 'neovim', context: 'UI', commandType: 'Command' },
  { id: 'nv99', key: ':IBLDisable', description: 'Disable display of visual indentation guides', category: 'neovim', mode: 'command-line', plugin: 'indent-blankline.nvim', source: 'neovim', context: 'UI', commandType: 'Command' },
  { id: 'nv100', key: ':IBLEnable', description: 'Enable display of visual indentation guides', category: 'neovim', mode: 'command-line', plugin: 'indent-blankline.nvim', source: 'neovim', context: 'UI', commandType: 'Command' },

  // --- AZWERKS Custom Visual Block Movements ---
  { id: 'az158', key: 'J', description: 'Move selected visual block down (auto-indented)', category: 'visual', mode: 'visual', source: 'azwerks', commandType: 'Keymap' },
  { id: 'az159', key: 'K', description: 'Move selected visual block up (auto-indented)', category: 'visual', mode: 'visual', source: 'azwerks', commandType: 'Keymap' },

  // --- AZWERKS Visual Mode Obsidian Mappings ---
  { id: 'az160', key: '<leader>mc', description: 'Wrap visual selection in Obsidian callout admonition box', category: 'advanced', mode: 'visual', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },
  { id: 'az161', key: '<leader>ml', description: 'Wrap visual selection in Obsidian wikilink', category: 'advanced', mode: 'visual', source: 'azwerks', profile: 'azwerks-markdown', context: 'Markdown', commandType: 'Keymap' },

  // --- Markdown Preview ---
  { id: 'az162', key: '<leader>mp', description: 'Toggle browser Markdown Preview window', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'markdown-preview.nvim', context: 'Markdown', commandType: 'Keymap' },

  // --- Obsidian Vault Optional Mappings ---
  { id: 'az163', key: '<leader>mC', description: 'Toggle the check state of a todo checklist item under cursor', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az164', key: '<leader>mG', description: 'Follow the Obsidian wikilink under the cursor', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az165', key: '<leader>md', description: "Open or create today's daily note", category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az166', key: '<leader>mY', description: "Open or create yesterday's daily note", category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az167', key: '<leader>mM', description: "Open or create tomorrow's daily note", category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az168', key: '<leader>mJ', description: 'Open interactive daily note picker/selector', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az169', key: '<leader>mg', description: 'Search the Obsidian vault by tags', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az170', key: '<leader>mz', description: 'Show floating document outline/Table of Contents popup', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'az171', key: '<leader>mP', description: 'Paste image from system clipboard into Obsidian note', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },
  { id: 'obs_opt6', key: '<leader>mO', description: 'Open current note in Obsidian Desktop app', category: 'advanced', mode: 'normal', source: 'neovim', plugin: 'obsidian.nvim', context: 'Obsidian', commandType: 'Keymap' },

  // --- Git Extra Mappings ---
  { id: 'git11', key: '<leader>gs', description: 'Stage selected hunk lines in visual selection', category: 'neovim', mode: 'visual', source: 'neovim', plugin: 'gitsigns.nvim', commandType: 'Keymap' },
  { id: 'git12', key: '<leader>gr', description: 'Reset selected hunk lines in visual selection', category: 'neovim', mode: 'visual', source: 'neovim', plugin: 'gitsigns.nvim', commandType: 'Keymap' },
  { id: 'git13', key: '<leader>gD', description: 'Open project-wide Diffview comparison workspace', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'diffview.nvim', commandType: 'Keymap' },
  { id: 'git14', key: '<leader>gH', description: 'Open Git history Diffview for the current active file', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'diffview.nvim', commandType: 'Keymap' },

  // --- ToggleTerm Terminal Mappings ---
  { id: 'term1', key: '<leader>tt', description: 'Toggle built-in floating terminal window', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'toggleterm.nvim', commandType: 'Keymap' },
  { id: 'term2', key: '<leader>th', description: 'Toggle horizontal terminal split window', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'toggleterm.nvim', commandType: 'Keymap' },
  { id: 'term3', key: '<leader>tv', description: 'Toggle vertical terminal split window', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'toggleterm.nvim', commandType: 'Keymap' },
  { id: 'term4', key: '<C-backtick>', description: 'Toggle terminal drawer', category: 'neovim', mode: 'normal', source: 'neovim', plugin: 'toggleterm.nvim', commandType: 'Keymap' },

  // --- Flash Navigation Mappings ---
  { id: 'flsh1', key: 's', description: 'Initiate search flash jump mode to any label on screen', category: 'motion', mode: 'normal', source: 'neovim', plugin: 'flash.nvim', commandType: 'Keymap' },
  { id: 'flsh2', key: 'S', description: 'Initiate Treesitter-based block flash selection', category: 'motion', mode: 'normal', source: 'neovim', plugin: 'flash.nvim', commandType: 'Keymap' },
  { id: 'flsh3', key: 'r', description: 'Trigger remote flash jump action (Operator-Pending mode)', category: 'motion', mode: 'normal', source: 'neovim', plugin: 'flash.nvim', commandType: 'Keymap' },
  { id: 'flsh4', key: 'R', description: 'Treesitter search flash selection (Visual / Operator-pending)', category: 'motion', mode: 'visual', source: 'neovim', plugin: 'flash.nvim', commandType: 'Keymap' },
  { id: 'flsh5', key: '<C-s>', description: 'Toggle Flash Search during active forward/backward search', category: 'motion', mode: 'command-line', source: 'neovim', plugin: 'flash.nvim', commandType: 'Keymap' },

  {

    id: 'az_c_1',

    key: ':AzwerksHealth',

    description: 'Runs custom AZWERKS configuration health checks. Inspects path validity, theme loading, and environment variables.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_2',

    key: ':AzwerksFullHealth',

    description: 'Runs the full Neovim `:checkhealth` command across all plugins and runtime configurations.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_3',

    key: ':AzwerksTutor [file]',

    description: 'Opens the Neovim tutor using the configuration\'s fallback loader to prevent blank buffers.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_4',

    key: ':AzwerksEditConfig',

    description: 'Opens the root Neovim starter configuration entry file (`init.lua`) in the current buffer.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_5',

    key: ':AzwerksEditKeymaps',

    description: 'Opens the core keymaps file (`lua/config/keymaps.lua`) in the current buffer.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_6',

    key: ':AzwerksEditPlugins',

    description: 'Opens the plugin specifications directory (`lua/plugins/`) where individual lazy.nvim specs are defined.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_7',

    key: ':AzwerksReloadConfig',

    description: 'Reloads the Neovim configuration. **Safety Gate:** Confirms with the user before executing local Lua config. If plugin specs have changed, prompts for a full restart.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_8',

    key: ':AzwerksKeymaps',

    description: 'Opens an interactive popup showing currently configured key mappings.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_9',

    key: ':AzwerksPalette',

    description: 'Opens the AZWERKS command reference/picker popup.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_10',

    key: ':AzwerksTraining',

    description: 'Opens the training workspace start page, if configured.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_11',

    key: ':AzwerksObsidian',

    description: 'Opens the configured Obsidian vault directory or provides setup instructions.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_12',

    key: ':AzwerksScratch',

    description: 'Opens a temporary scratch buffer using Markdown syntax for quick notes.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Core',

    commandType: 'Command'

  },

  {

    id: 'az_c_13',

    key: ':AzwerksProject',

    description: 'Opens a popup displaying the active project profile and its details.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_14',

    key: ':AzwerksProjectProfile',

    description: 'Shows a detailed profile status including root folder, configuration source, project markers, and suggested task list.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_15',

    key: ':AzwerksDetectProject',

    description: 'Re-runs the scored profile detection algorithm for the active buffer.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_16',

    key: ':AzwerksProjectRoot',

    description: 'Prints the current detected project root path in the messages history.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_17',

    key: ':AzwerksProjectRootExplain',

    description: 'Explains why a workspace root was selected, showing confidence scores, matched markers, and alternate candidates.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_18',

    key: ':AzwerksProjectCdRoot',

    description: 'Changes the current window-local directory (`:lcd`) to the detected project root.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_19',

    key: ':AzwerksProjectOpenRoot',

    description: 'Opens the detected project root in the Oil file manager (or netrw fallback).',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_20',

    key: ':AzwerksProjectFiles',

    description: 'Searches for files starting from the detected project root using Telescope.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_21',

    key: ':AzwerksProjectGrep',

    description: 'Runs a live grep search starting from the detected project root using Telescope.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_22',

    key: ':AzwerksSetProjectProfile <profile> [root]',

    description: 'Manually overrides the detected project profile. Auto-completes with available profiles.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_23',

    key: ':AzwerksClearProjectProfile',

    description: 'Clears the manual project profile override and returns to automatic scored detection.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-project',

    context: 'Project',

    commandType: 'Command'

  },

  {

    id: 'az_c_24',

    key: ':AzwerksDocNew [type] [title]',

    description: 'Creates a new document. If `type` or `title` is omitted, opens an interactive selector. Auto-completes types: `note`, `prompt`, `audit_report`, `report`, `spec`, `changelog`, `decision_record`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_25',

    key: ':AzwerksDocNewNote [title]',

    description: 'Creates a new general note document in the current folder or vault inbox.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_26',

    key: ':AzwerksDocNewPrompt [title]',

    description: 'Creates a new AI prompt specification document in the `prompts/` subdirectory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_27',

    key: ':AzwerksDocNewAuditReport [title]',

    description: 'Creates a new codebase/security audit report in the `audits/` subdirectory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_28',

    key: ':AzwerksDocNewImplementationReport [title]',

    description: 'Creates a new feature implementation report in the `reports/` subdirectory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_29',

    key: ':AzwerksDocNewSpec [title]',

    description: 'Creates a new technical specification document in the `specs/` subdirectory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_30',

    key: ':AzwerksDocNewChangelog [title]',

    description: 'Creates a new changelog document in the workspace root.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_31',

    key: ':AzwerksDocNewDecisionRecord [title]',

    description: 'Creates a new Architecture Decision Record (ADR) in the `adr/` subdirectory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_32',

    key: ':AzwerksDocState',

    description: 'Runs document-state inspection and opens a floating report auditing headings, status, and metadata correctness.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_33',

    key: ':AzwerksDocSetStatus [status]',

    description: 'Updates the status field in the YAML frontmatter. Auto-completes valid lifecycles: `draft`, `working`, `candidate`, `review`, `approved`, `canonical`, `archived`, `superseded`. Performs transition validation checks.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_34',

    key: ':AzwerksDocPicker',

    description: 'Opens the interactive Telescope document picker.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_35',

    key: ':AzwerksDocHeadings',

    description: 'Opens a Telescope pane to browse and jump to headings in the current Markdown file.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_36',

    key: ':AzwerksDocMarkers',

    description: 'Scans and lists all workflow markers (e.g. `TODO`, `FIXME`, `VERIFY`) inside the current document.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_37',

    key: ':AzwerksDocLinks',

    description: 'Extracts all outgoing links (relative paths, wikilinks, URLs) and allows following them.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_38',

    key: ':AzwerksDocBacklinks',

    description: 'Runs a project search to find all documents linking back to the current file and populates the Quickfix list.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_39',

    key: ':AzwerksDocRelated',

    description: 'Finds and lists related documents in the vault matching by status, tags, folder, or heuristics.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_40',

    key: ':AzwerksMarkdownWorkbench',

    description: 'Shows the workbench status, current working directory, and Obsidian environment variables.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_41',

    key: ':AzwerksCheckMarkdownState',

    description: 'Inspects the active Markdown buffer and shows frontmatter compliance, title heading, word counts, and task stats.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_42',

    key: ':AzwerksNewNote [title]',

    description: 'Creates a new Markdown file pre-filled with default note structure (frontmatter, purpose callout, and checklist).',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_43',

    key: ':AzwerksInsertFrontmatter [title]',

    description: 'Inserts standard YAML frontmatter at line 1 if it is missing in the current buffer.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_44',

    key: ':AzwerksInsertCallout [type]',

    description: 'Inserts an Obsidian callout block at the cursor. If a visual range is selected, wraps it in the callout. Type defaults to `note`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_45',

    key: ':AzwerksInsertObsidianLink [target]',

    description: 'Inserts an Obsidian wikilink `[[target]]` at the cursor. If range is selected, wraps the selection.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_46',

    key: ':AzwerksMarkdownTOC',

    description: 'Generates or updates a Markdown table of contents between designated AZWERKS comment markers.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_47',

    key: ':AzwerksOpenIndex',

    description: 'Opens or creates the `00_Index.md` file in the workspace root directory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_48',

    key: ':AzwerksOpenInbox',

    description: 'Opens or creates the inbox file `01_Inbox/Inbox.md`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_49',

    key: ':AzwerksMoveToArchive',

    description: 'Safely moves the active file to `99_Archive/`, automatically appending timestamps to avoid collisions.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_50',

    key: ':AzwerksVaultStatus',

    description: 'Checks the index state and file integrity of the vault directory.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_51',

    key: ':AzwerksVaultMaintenance',

    description: 'Alias for `:AzwerksVaultStatus`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_52',

    key: ':AzwerksVaultReport',

    description: 'Generates and opens a consolidated vault audit report.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_53',

    key: ':AzwerksVaultCheckLinks',

    description: 'Scans all files in the vault, checks link validity, and prints broken references.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_54',

    key: ':AzwerksVaultCheckFrontmatter',

    description: 'Validates that all Markdown documents contain correct YAML frontmatter syntax.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_55',

    key: ':AzwerksVaultFindTodo',

    description: 'Searches the vault for `TODO` or `FIXME` notes.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_56',

    key: ':AzwerksVaultFindVerify',

    description: 'Searches the vault for `VERIFY` checklists.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_57',

    key: ':AzwerksVaultFindEmpty',

    description: 'Finds empty files or documents containing only frontmatter.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_58',

    key: ':AzwerksVaultFindDuplicateTitles',

    description: 'Scans and lists notes sharing duplicate title values in their metadata.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_59',

    key: ':AzwerksVaultFindOrphans',

    description: 'Finds documents that have no incoming links from any other file in the vault.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_60',

    key: ':AzwerksVaultDashboard',

    description: 'Opens the high-level vault dashboard/index report.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_61',

    key: ':AzwerksVaultRecent [count]',

    description: 'Lists recently modified files in the quickfix list (defaults to `20`).',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_62',

    key: ':AzwerksVaultChanged [count]',

    description: 'Alias for `:AzwerksVaultRecent`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_63',

    key: ':AzwerksVaultByType [type]',

    description: 'Lists documents filtered by type metadata. Without arguments, displays a summary of document types.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_64',

    key: ':AzwerksVaultByStatus [status]',

    description: 'Lists documents filtered by status metadata. Without arguments, displays a summary of statuses.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_65',

    key: ':AzwerksVaultBrokenRefs',

    description: 'Populates the quickfix list with all broken link paths found in the vault.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-markdown',

    context: 'Vault',

    commandType: 'Command'

  },

  {

    id: 'az_c_66',

    key: ':AzwerksBufferReadStatus',

    description: 'Checks read-safety flags for the current file to verify if the content was fully read from disk.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_67',

    key: ':AzwerksOilEntryStatus',

    description: 'Assesses read safety of the directory entry under the cursor in an Oil buffer.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_68',

    key: ':AzwerksOilDiscard',

    description: 'Safely discards pending modifications inside an Oil file manager buffer.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_69',

    key: ':AzwerksReadSafetyCheck',

    description: 'Runs a validation check verifying if Neovim loaded the buffer content correctly.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_70',

    key: ':AzwerksSafetyStatus',

    description: 'Displays the shared AZWERKS runtime safety policy and confirmation state.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_71',

    key: ':AzwerksCloseSurface',

    description: 'Closes special surfaces (help, term, config, oil) safely without producing `[No Name]` buffers.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_72',

    key: ':AzwerksCloseBuffer',

    description: 'Safely deletes the active buffer. Prevents closing the last file buffer to avoid leaving `[No Name]`.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_73',

    key: ':AzwerksCloseWindow',

    description: 'Safely closes the active window split. Prevents closing the final file window to prevent Neovim exiting.',

    category: 'files',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Safety',

    commandType: 'Command'

  },

  {

    id: 'az_c_74',

    key: ':AzwerksTaskStatus',

    description: 'Opens a status window listing all profile-aware candidates and custom shell tasks.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_75',

    key: ':AzwerksTaskRun [task]',

    description: 'Opens the task selector. If a specific candidate key is passed, launches it immediately.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_76',

    key: ':AzwerksTaskList',

    description: 'Opens the overseer task execution list panel.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_77',

    key: ':AzwerksTaskRefresh',

    description: 'Re-scans project script directories and refreshes task candidate mappings.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_78',

    key: ':AzwerksTerm [cmd]',

    description: 'Opens a terminal buffer in a split. **Safety Gate:** Prompts for confirmation before running arbitrary shell scripts.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_79',

    key: ':AzwerksTest',

    description: 'Runs the test command inferred from the active project profile. **Safety Gate:** Prompts for confirmation before execution.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Tasks',

    commandType: 'Command'

  },

  {

    id: 'az_c_80',

    key: ':AzwerksArchiveStatus',

    description: 'Opens a status view checking utility availability (`zip`, `tar`, `shasum`) and target directories.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_81',

    key: ':AzwerksArchiveCreateFile [format]',

    description: 'Compresses the current buffer file. Format defaults to `zip`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_82',

    key: ':AzwerksArchiveCreateDir [format]',

    description: 'Compresses the current buffer\'s directory. Format defaults to `zip`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_83',

    key: ':AzwerksArchiveCreateProject [format]',

    description: 'Compresses the detected project root folder. Format defaults to `zip`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_84',

    key: ':AzwerksArchiveCreatePath <path> [format]',

    description: 'Compresses a user-provided path. **Safety Gate:** Broad roots (e.g. `$HOME`, `/`) require setting the environment variable `AZWERKS_ALLOW_BROAD_ARCHIVE=1`.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_85',

    key: ':AzwerksArchiveVerify [path]',

    description: 'Unpacks the archive file to verify file integrity and computes/verifies SHA256 checksums.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_86',

    key: ':AzwerksArchiveOpenOutput',

    description: 'Opens the archive output location in Oil or netrw.',

    category: 'advanced',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Backup',

    commandType: 'Command'

  },

  {

    id: 'az_c_87',

    key: ':AzwerksThemeReload',

    description: 'Reloads the vendored Radium theme and resets highlight values.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'UI',

    commandType: 'Command'

  },

  {

    id: 'az_c_88',

    key: ':AzwerksThemeStatus',

    description: 'Inspects the active colorscheme paths, highlights, and contrast values.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'UI',

    commandType: 'Command'

  },

  {

    id: 'az_c_89',

    key: ':AzwerksVisualStatus',

    description: 'Shows UI status, plugin integrations, window layouts, and formatting tools.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'UI',

    commandType: 'Command'

  },

  {

    id: 'az_c_90',

    key: ':AzwerksDashboard',

    description: 'Opens the native AZWERKS dashboard file picker and project index screen.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'UI',

    commandType: 'Command'

  },

  {

    id: 'az_c_91',

    key: ':AzwerksShellStatus',

    description: 'Inspects the interface shell status and active dropbar.nvim winbar bindings.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'UI',

    commandType: 'Command'

  },

  {

    id: 'az_c_92',

    key: ':FormatDisable None / !',

    description: 'Disables autoformat-on-save globally, or locally for the active buffer if appended with `!`.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  },

  {

    id: 'az_c_93',

    key: ':FormatEnable',

    description: 'Re-enables autoformat-on-save globally and locally.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  },

  {

    id: 'az_c_94',

    key: ':AzwerksFormatStatus',

    description: 'Displays what formatting tools (`stylua`, `black`, `prettier`) and linters are active for the file type.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  },

  {

    id: 'az_c_95',

    key: ':AzwerksConformFormatStatus',

    description: 'Shows detailed formatter state from the conform.nvim plugin.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  },

  {

    id: 'az_c_96',

    key: ':AzwerksTreesitterInstall',

    description: 'Installs language parsers needed for syntax highlighting. **Safety Gate:** Confirms prior to installation.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  },

  {

    id: 'az_c_97',

    key: ':AzwerksTreesitterUpdate',

    description: 'Updates all installed language parsers. **Safety Gate:** Confirms prior to updating.',

    category: 'neovim',

    mode: 'command-line',

    source: 'azwerks',

    profile: 'azwerks-system',

    context: 'Formatting',

    commandType: 'Command'

  }
];


export const KEYBOARD_MAPS: KeyboardKey[] = [
  // ROW 0: Number / Symbol Row
  {
    code: 'Backquote', label: '`',
    normal: { command: '`', action: 'Jump to bookmark', description: 'Jump to the exact row and column position of a mark (e.g., `a).' },
    shift: { command: '~', action: 'Toggle case of character', description: 'Switch letter under cursor from lower-to-uppercase or vice-versa.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit1', label: '1',
    normal: { command: '1', action: 'Count prefix "1"', description: 'Number prefix to repeat subsequent command 1 time.' },
    shift: { command: '!', action: 'Filter through external utility', description: 'Send lines of text through a shell power-utility or command-pipe.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit2', label: '2',
    normal: { command: '2', action: 'Count prefix "2"', description: 'Number prefix to repeat subsequent command 2 times.' },
    shift: { command: '@', action: 'Execute macro', description: 'Run recorded macro keystrokes saved in a specific register (e.g., @a).' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit3', label: '3',
    normal: { command: '3', action: 'Count prefix "3"', description: 'Number prefix to repeat subsequent command 3 times.' },
    shift: { command: '#', action: 'Search backward for word under cursor', description: 'Search backwards to find matching instances of the word under cursor.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit4', label: '4',
    normal: { command: '4', action: 'Count prefix "4"', description: 'Number prefix to repeat subsequent command 4 times.' },
    shift: { command: '$', action: 'Move to end of line', description: 'Position cursor at the exact end of the current active line.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit5', label: '5',
    normal: { command: '5', action: 'Count prefix "5"', description: 'Number prefix to repeat subsequent command 5 times.' },
    shift: { command: '%', action: 'Find matching bracket partner', description: 'Jump cursor between matching sets of parenthetical braces: (), {}, []' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit6', label: '6',
    normal: { command: '6', action: 'Count prefix "6"', description: 'Number prefix to repeat subsequent command 6 times.' },
    shift: { command: '^', action: 'Move to first non-blank character', description: 'Move cursor horizontally to the first letter or digit on the line.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit7', label: '7',
    normal: { command: '7', action: 'Count prefix "7"', description: 'Number prefix to repeat subsequent command 7 times.' },
    shift: { command: '&', action: 'Repeat last substitute command', description: 'Apply the previously run :s replacements to the current line.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit8', label: '8',
    normal: { command: '8', action: 'Count prefix "8"', description: 'Number prefix to repeat subsequent command 8 times.' },
    shift: { command: '*', action: 'Search forward for word under cursor', description: 'Instantly search forward for other instances of the word currently under cursor.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit9', label: '9',
    normal: { command: '9', action: 'Count prefix "9"', description: 'Number prefix to repeat subsequent command 9 times.' },
    shift: { command: '(', action: 'Move backward 1 sentence', description: 'Jump cursor to the start of the previous punctuation-delimited sentence.' },
    ctrl: null, row: 0
  },
  {
    code: 'Digit0', label: '0',
    normal: { command: '0', action: 'Move to start of line', description: 'Jump cursor immediately to column 1 of the current line.' },
    shift: { command: ')', action: 'Move forward 1 sentence', description: 'Jump cursor to the beginning of the next punctuation-delimited sentence.' },
    ctrl: null, row: 0
  },
  {
    code: 'Minus', label: '-',
    normal: { command: '-', action: 'Move up to first non-blank character', description: 'Move cursor up 1 line and place it on the first letter/digit.' },
    shift: { command: '_', action: 'Move down to first non-blank on line', description: 'Move down lines matching indentation bounds.' },
    ctrl: null, row: 0
  },
  {
    code: 'Equal', label: '=',
    normal: { command: '=', action: 'Auto-indent / Align format operator', description: 'Re-align indentation structure of lines based on surrounding code syntax blocks.' },
    shift: { command: '+', action: 'Move down to non-blank character', description: 'Align downward cursor focus to lines.' },
    ctrl: null, row: 0
  },
  {
    code: 'Backspace', label: 'Backspace', width: 'flex-1 min-w-[50px] max-w-[80px]',
    normal: { command: 'Backspace', action: 'Move cursor left', description: 'Step cursor left 1 slot in Normal mode, or delete character in Insert mode.' },
    shift: null, ctrl: null, row: 0
  },

  // ROW 1: QWERTY Row
  {
    code: 'Tab', label: 'Tab', width: 'w-[45px] sm:w-[60px]',
    normal: { command: 'Ctrl-I', action: 'Jump forward in location list', description: 'Navigate forward through previous jump record locations.' },
    shift: null, ctrl: null, row: 1
  },
  {
    code: 'KeyQ', label: 'Q',
    normal: { command: 'q', action: 'Record keystroke macro', description: 'Begin recording interactive keystroke macro into letters a-z (press q again to stop).' },
    shift: { command: 'Q', action: 'Enter Ex command-line mode', description: 'Enter the batch commander Ex console directly without visual window active.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyW', label: 'W',
    normal: { command: 'w', action: 'Move forward 1 word', description: 'Jump forward to start of next alphanumeric word.' },
    shift: { command: 'W', action: 'Move forward 1 WORD', description: 'Jump forward to next WORD, ignoring commas/brackets/periods.' },
    ctrl: { command: 'Ctrl-W', action: 'Window split operations prefix', description: 'Pre-trigger window manager mode. Combine with direction h,j,k,l or w.' },
    row: 1
  },
  {
    code: 'KeyE', label: 'E',
    normal: { command: 'e', action: 'Move to end of word', description: 'Step cursor forward to the final letter of the current or next word.' },
    shift: { command: 'E', action: 'Move to end of WORD', description: 'Step cursor forward to end of space-delimited WORD.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyR', label: 'R',
    normal: { command: 'r', action: 'Replace single character', description: 'Swap current letter under cursor with the very next key pressed.' },
    shift: { command: 'R', action: 'Enter Replace override mode', description: 'Initiate typing in Replace override mode to paint text over old characters.' },
    ctrl: { command: 'Ctrl-R', action: 'Redo undone changes', description: 'Restore edits you recently backed out of using the Undo (u) command.' },
    row: 1
  },
  {
    code: 'KeyT', label: 'T',
    normal: { command: 't', action: 'Jump right until character', description: 'Jump forward horizontally matching characters, landing just before target letter.' },
    shift: { command: 'T', action: 'Jump left until character', description: 'Jump backward horizontally, landing just after target letter.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyY', label: 'Y',
    normal: { command: 'y', action: 'Yank (copy) operator', description: 'Copy text into register pool. Press yy to duplicate current line.' },
    shift: { command: 'Y', action: 'Yank/Copy complete line', description: 'Alternate for yy. Grab visual copy of this entire active text row.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyU', label: 'U',
    normal: { command: 'u', action: 'Undo last change', description: 'Revert the most recent text editing action.' },
    shift: { command: 'U', action: 'Revert all line edits', description: 'Restore the entire active row back to its initial state before you focused it.' },
    ctrl: { command: 'Ctrl-U', action: 'Scroll view UP half-page', description: 'Smoothly roll visible viewport screen UP by half a frame.' },
    row: 1
  },
  {
    code: 'KeyI', label: 'I',
    normal: { command: 'i', action: 'Insert cursor before', description: 'Enter Insert mode to type characters immediately before current cursor spot.' },
    shift: { command: 'I', action: 'Insert cursor at first non-blank', description: 'Jump directly to the first active letters on this row and begin editing.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyO', label: 'O',
    normal: { command: 'o', action: 'Open new line below', description: 'Append a fresh blank row beneath the cursor and slide into Insert mode.' },
    shift: { command: 'O', action: 'Open new line above', description: 'Inject a fresh blank row above the cursor and slide into Insert mode.' },
    ctrl: null, row: 1
  },
  {
    code: 'KeyP', label: 'P',
    normal: { command: 'p', action: 'Paste content after cursor', description: 'Paste the contents of register/clipboard after cursor position.' },
    shift: { command: 'P', action: 'Paste content before cursor', description: 'Paste the contents of register/clipboard before cursor position.' },
    ctrl: null, row: 1
  },
  {
    code: 'BracketLeft', label: '[',
    normal: { command: '[', action: 'Previous section jump prefix', description: 'A utility gateway for section jump actions (e.g. [[ to navigate backwards).' },
    shift: { command: '{', action: 'Previous paragraph jump', description: 'Step cursor up to the nearest empty line preceding this paragraph.' },
    ctrl: null, row: 1
  },
  {
    code: 'BracketRight', label: ']',
    normal: { command: ']', action: 'Next section jump prefix', description: 'A utility gateway for forward folder/section movements.' },
    shift: { command: '}', action: 'Next paragraph jump', description: 'Step cursor down to the nearest empty line succeeding this paragraph.' },
    ctrl: null, row: 1
  },
  {
    code: 'Backslash', label: '\\',
    normal: { command: '\\', action: 'Leader key default alternative', description: 'Typically mapped or serving as secondary trigger lead key.' },
    shift: { command: '|', action: 'Jump to specific column', description: 'Specify numeric prefix and jump directly to that exact column.' },
    ctrl: null, row: 1
  },

  // ROW 2: Home Row
  {
    code: 'CapsLock', label: 'Caps Lock', width: 'w-[55px] sm:w-[75px]',
    normal: null, shift: null, ctrl: null, row: 2
  },
  {
    code: 'KeyA', label: 'A',
    normal: { command: 'a', action: 'Append text after cursor', description: 'Step cursor right 1 char and change system into active Insert typing.' },
    shift: { command: 'A', action: 'Append text at end of line', description: 'Instantly move cursor to end of the row and toggle to Insert typing.' },
    ctrl: { command: 'Ctrl-A', action: 'Increment number', description: 'Increase the value of the digit directly under or near your cursor.' },
    row: 2
  },
  {
    code: 'KeyS', label: 'S',
    normal: { command: 's', action: 'Substitute character', description: 'Delete the singular letter under cursor and immediately start typing.' },
    shift: { command: 'S', action: 'Substitute entire line', description: 'Wipe all characters from local cursor line and swap directly into Insert.' },
    ctrl: null, row: 2
  },
  {
    code: 'KeyD', label: 'D',
    normal: { command: 'd', action: 'Delete (cut) operator', description: 'Remove targeted parts of text. Combine with motion, or double-press dd to wipe current line.' },
    shift: { command: 'D', action: 'Delete to end of line', description: 'Wipe out remaining letters on this row from the cursor rightward (same as d$).' },
    ctrl: { command: 'Ctrl-D', action: 'Scroll view DOWN half-page', description: 'Smoothly roll visible viewport screen DOWN by half a frame.' },
    row: 2
  },
  {
    code: 'KeyF', label: 'F',
    normal: { command: 'f', action: 'Find character on line', description: 'Type f followed by letters to instantly skip cursor right to that character.' },
    shift: { command: 'F', action: 'Find character backward on line', description: 'Find a single letter to the left, repositioning cursor to its exact index.' },
    ctrl: { command: 'Ctrl-F', action: 'Scroll view DOWN full page', description: 'Roll the workspace dashboard forwards a complete frame.' },
    row: 2
  },
  {
    code: 'KeyG', label: 'G',
    normal: { command: 'g', action: 'Double-tap "gg" to top', description: 'Prefix command. Press "gg" to jump directly to start of document files.' },
    shift: { command: 'G', action: 'Jump to end of document', description: 'Instantly move cursor focus to the very last line of the current file.' },
    ctrl: null, row: 2
  },
  {
    code: 'KeyH', label: 'H',
    normal: { command: 'h', action: 'Move cursor Left', description: 'Slide cursor to the left by 1 letter (primary movement coordinate).' },
    shift: { command: 'H', action: 'Move cursor to Top of viewport', description: 'Jump cursor to the absolute top of currently visible window screen ("Home").' },
    ctrl: null, row: 2
  },
  {
    code: 'KeyJ', label: 'J',
    normal: { command: 'j', action: 'Move cursor Down', description: 'Slide cursor downward 1 row (primary movement coordinate).' },
    shift: { command: 'J', action: 'Join lines together', description: 'Pull the text line below up into current line, appending them end-to-start.' },
    ctrl: null, row: 2
  },
  {
    code: 'KeyK', label: 'K',
    normal: { command: 'k', action: 'Move cursor Up', description: 'Slide cursor upward 1 row (primary movement coordinate).' },
    shift: { command: 'K', action: 'Look up manual / Keyword doc', description: 'Run a help reference look-up on word under cursor (such as manual pages).' },
    ctrl: null, row: 2
  },
  {
    code: 'KeyL', label: 'L',
    normal: { command: 'l', action: 'Move cursor Right', description: 'Move cursor rightward by 1 character index (primary movement).' },
    shift: { command: 'L', action: 'Move cursor to Bottom of viewport', description: 'Jump cursor straight to the bottom row of currently viewed window ("Last").' },
    ctrl: null, row: 2
  },
  {
    code: 'Semicolon', label: ';',
    normal: { command: ';', action: 'Repeat horizontal character search', description: 'Re-execute the last horizontal search command (f, F, t, or T).' },
    shift: { command: ':', action: 'Enter Command line mode', description: 'Shift typing focus to command terminal console below to input operations.' },
    ctrl: null, row: 2
  },
  {
    code: 'Quote', label: "'",
    normal: { command: "'", action: 'Jump to bookmark (line)', description: "Move cursor to the start of the line containing matching bookmark (e.g., 'a)." },
    shift: { command: '"', action: 'Specify register identifier', description: 'Identify active clipboard cache register (e.g., type "a to reference register a).' },
    ctrl: null, row: 2
  },
  {
    code: 'Enter', label: 'Enter', width: 'flex-1 min-w-[55px] max-w-[95px]',
    normal: { command: 'Enter', action: 'Move down 1 line to first letter', description: 'Move cursor down 1 line and line up with the first non-space character.' },
    shift: null, ctrl: null, row: 2
  },

  // ROW 3: Bottom Row
  {
    code: 'ShiftLeft', label: 'Shift', width: 'w-[75px] sm:w-[95px]',
    normal: null, shift: null, ctrl: null, row: 3
  },
  {
    code: 'KeyZ', label: 'Z',
    normal: { command: 'z', action: 'Redraw viewport focus prefix', description: 'Prefix command (such as zz to snap cursor line directly to screen center).' },
    shift: { command: 'Z', action: 'Save/Quit file operator prefix', description: 'Enter key save combo. Type "ZZ" to quickly write changes and quit.' },
    ctrl: null, row: 3
  },
  {
    code: 'KeyX', label: 'X',
    normal: { command: 'x', action: 'Delete (cut) character under cursor', description: 'Erase current focused character (like using Delete key).' },
    shift: { command: 'X', action: 'Delete (cut) character before cursor', description: 'Erase left-adjacent character (like using traditional Backspace).' },
    ctrl: { command: 'Ctrl-X', action: 'Decrement number', description: 'Decrease the value of closest digit near cursor by 1 unit.' },
    row: 3
  },
  {
    code: 'KeyC', label: 'C',
    normal: { command: 'c', action: 'Change operator', description: 'Begin change. Press cc to completely replace entire active line.' },
    shift: { command: 'C', action: 'Change to end of line', description: 'Erase all characters right of cursor and slide into Insert mode.' },
    ctrl: null, row: 3
  },
  {
    code: 'KeyV', label: 'V',
    normal: { command: 'v', action: 'Visual mode character selector', description: 'Enter visual highlight selector mode to copy, edit, or adjust selected characters.' },
    shift: { command: 'V', action: 'Visual line selector', description: 'Enter visual highlight to grab full rows of text for mass actions.' },
    ctrl: { command: 'Ctrl-V', action: 'Visual block rectangular selector', description: 'Start rectangular visual selection (mass multi-column adjustments).' },
    row: 3
  },
  {
    code: 'KeyB', label: 'B',
    normal: { command: 'b', action: 'Move backward 1 word', description: 'Skip cursor backward to the first character of the previous word.' },
    shift: { command: 'B', action: 'Move backward 1 WORD', description: 'Skip cursor backward ignoring punctuation blocks (space-delimited WORD).' },
    ctrl: { command: 'Ctrl-B', action: 'Scroll view UP full page', description: 'Roll current view board back standard frame height.' },
    row: 3
  },
  {
    code: 'KeyN', label: 'N',
    normal: { command: 'n', action: 'Repeat last search (same)', description: 'Jump to the very next instance matching preceding / search pattern.' },
    shift: { command: 'N', action: 'Repeat last search (reverse)', description: 'Jump backward to locate matching preceding search pattern.' },
    ctrl: null, row: 3
  },
  {
    code: 'KeyM', label: 'M',
    normal: { command: 'm', action: 'Set bookmark (mark)', description: 'Press "ma" to attach mark indicator to letters a-z for precise bookmarks.' },
    shift: { command: 'M', action: 'Move to Middle row of window', description: 'Relocate cursor immediately to the vertical center of current viewport.' },
    ctrl: null, row: 3
  },
  {
    code: 'Comma', label: ',',
    normal: { command: ',', action: 'Repeat character search reversed', description: 'Re-run last f, F, t or T jump action in the opposite direction.' },
    shift: { command: '<', action: 'Shift indentation left (outdent)', description: 'Nudge targeted block or line leftwards (decrease tabs).' },
    ctrl: null, row: 3
  },
  {
    code: 'Period', label: '.',
    normal: { command: '.', action: 'Repeat last edit command', description: 'Incredibly powerful: re-execute whatever text edits you performed last.' },
    shift: { command: '>', action: 'Shift indentation right (indent)', description: 'Nudge targeted blocks or selected line to the right (add tabs).' },
    ctrl: null, row: 3
  },
  {
    code: 'Slash', label: '/',
    normal: { command: '/', action: 'Search forward pattern editor', description: 'Type / followed by search query and hit Enter to scan forward.' },
    shift: { command: '?', action: 'Search backward pattern editor', description: 'Type ? followed by target text to scan backwards from cursor.' },
    ctrl: null, row: 3
  },
  {
    code: 'ShiftRight', label: 'Shift', width: 'flex-1 min-w-[65px] max-w-[100px]',
    normal: null, shift: null, ctrl: null, row: 3
  },

  // ROW 4: Spacer and Modifier controls
  {
    code: 'ControlLeft', label: 'Ctrl', width: 'w-[55px] sm:w-[70px]',
    normal: null, shift: null, ctrl: null, row: 4
  },
  {
    code: 'Super', label: 'Super', width: 'w-[45px] sm:w-[55px]',
    normal: null, shift: null, ctrl: null, row: 4
  },
  {
    code: 'AltLeft', label: 'Alt', width: 'w-[45px] sm:w-[55px]',
    normal: null, shift: null, ctrl: null, row: 4
  },
  {
    code: 'Space', label: 'Space', width: 'flex-1 min-w-[140px] max-w-[280px]',
    normal: { command: 'Space', action: 'Move cursor right', description: 'Step cursor focus 1 spacing rightwards (similar to l movement).' },
    shift: null, ctrl: null, row: 4
  },
  {
    code: 'AltRight', label: 'Alt', width: 'w-[45px] sm:w-[55px]',
    normal: null, shift: null, ctrl: null, row: 4
  },
  {
    code: 'ControlRight', label: 'Ctrl', width: 'w-[55px] sm:w-[70px]',
    normal: null, shift: null, ctrl: null, row: 4
  }
];
