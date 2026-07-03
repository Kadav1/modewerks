import { VimTip } from '../types';

export const VIM_TIPS: VimTip[] = [
  // --- BEGINNER TIPS ---
  {
    id: 't1',
    title: 'Undo and Redo Changes',
    command: 'u (Undo) / Ctrl+r (Redo)',
    category: 'edit',
    description: 'Step backwards and forwards in editing time. Vim remembers individual character modifications safely.',
    scenario: 'Undoing an accidental deletion or repeating an undo when you corrected too much.',
    steps: [
      'Press Escape to exit Insert mode and enter Normal mode.',
      'Press u to undo the last action/edit you made.',
      'Press Ctrl+r to redo the changes you just undid.',
      'Type g+ or g- in normal mode for even more precise chronological undo history travel!'
    ],
    difficulty: 'beginner'
  },
  {
    id: 't2',
    title: 'Save and Quit Instantly',
    command: ':wq or ZZ',
    category: 'files',
    description: 'Write files back to disk and close current buffer instantly.',
    scenario: 'Saving work and exiting Vim to return to the bash terminal shell.',
    steps: [
      'Double-tap Escape to clear active modifiers.',
      'Option A: Type :wq and press Enter.',
      'Option B: Type ZZ in normal mode for a speedier, double-uppercase direct save-and-exit.'
    ],
    difficulty: 'beginner'
  },
  {
    id: 't3',
    title: 'Jump to First and Last Line',
    command: 'gg / G',
    category: 'motion',
    description: 'Instantly warp the cursor to either the extreme top or bottom boundary of your page.',
    scenario: 'Checking import headers or inspecting error stacks at the EOF file footer.',
    steps: [
      'Press Esc to return back to Normal view.',
      'Type gg to instantly teleport to Line 1.',
      'Type Shift+g (Capital G) to move to the very bottom line of the code base.'
    ],
    difficulty: 'beginner'
  },
  {
    id: 't4',
    title: 'Delete Word Under Cursor',
    command: 'dw / diw',
    category: 'edit',
    description: 'Delete the remainder of a word, or the entire word instantly without cursor alignment.',
    scenario: 'Erasing incorrect parameters or variable names quickly.',
    steps: [
      'Move cursor onto the target word.',
      'Type dw in Normal mode to erase from current symbol to start of next word.',
      'Type diw (Delete Inner Word) to disappear the entire word even if cursor is sitting in the middle!'
    ],
    difficulty: 'beginner'
  },

  // --- INTERMEDIATE TIPS ---
  {
    id: 't5',
    title: 'Change Inside Quotes or Brackets',
    command: 'ci"',
    category: 'edit',
    description: 'Delete everything inside the double quotes and drop back into Insert mode instantly.',
    scenario: 'Replacing a thick string literal value while preserving the quotation marks.',
    steps: [
      'Move cursor anywhere inside a double-quoted string (e.g. const api = "https://example.com/v1").',
      'Type ci" in normal mode.',
      'Watch everything inside the quotes vanish, leaving you in Insert mode between intact quotes.',
      'Type the alternative value or API address and exit with Escape.'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 't6',
    title: 'One-shot Normal Execution',
    command: 'Ctrl+o [command]',
    category: 'edit',
    description: 'Run any Normal mode command while remaining fully in Insert mode typing.',
    scenario: 'Quickly centering screen viewport or navigating without exiting typing flow.',
    steps: [
      'While actively typing in Insert mode, type Ctrl+o.',
      'Vim displays a one-time command status while maintaining insertion state.',
      'Type a Normal mode movement like zz to center, or w to hop a word.',
      'Vim shifts the screen or cursor and automatically drops you straight back into typing.'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 't7',
    title: 'Jump Back & Resume Insert',
    command: 'gi',
    category: 'motion',
    description: 'Instantly move cursor to your last typing position and re-engage insert state.',
    scenario: 'Having navigated away to consult code references and wishing to immediately resume writing.',
    steps: [
      'Press Esc and move away to browse structures on different line segments.',
      'When ready to resume, press gi in normal mode.',
      'Vim flies back to the previous edit point and enters Insert mode so you can type immediately.'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 't8',
    title: 'Clear Search Screen Highlight',
    command: ':noh',
    category: 'search',
    description: 'Temporarily turn off search highlighting until your next find operation.',
    scenario: 'Clearing screen clutter after finding a specific search pattern.',
    steps: [
      'After completing search-based edits, type :noh in command-line mode.',
      'Hit Enter: all glowing yellow search highlights turn off instantly.',
      'The highlight will automatically re-enable next time you search with / or ?.'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 't9',
    title: 'Repeated Command Dot Matrix',
    command: '.',
    category: 'edit',
    description: 'Re-run the exact last edit command at the new cursor location in one keystroke.',
    scenario: 'Inserting comments or replicating a complex edit across disjoint lines iteratively.',
    steps: [
      'Perform an edit, e.g., select/delete inside a word or insert prefix spaces.',
      'Position cursor at a new line.',
      'Simply type . (dot) to execute the exact same operation instantaneously.'
    ],
    difficulty: 'intermediate'
  },

  // --- ADVANCED TIPS ---
  {
    id: 't10',
    title: 'Visual Block Multi-line Append',
    command: 'Ctrl+v -> j/k -> e -> Shift+i -> typing -> Esc',
    category: 'visual',
    description: 'Insert characters, quotes, or characters on multiple lines simultaneously at the matching block columns.',
    scenario: 'Commenting out multiple lines or adding specific variable prefixes in bulk.',
    steps: [
      'Position cursor on the first column of your first line.',
      'Type Ctrl+v to activate industrial Visual Block mode.',
      'Use j or k to highlight the desired lines downwards.',
      'Type Shift+i (capital I) to open Insert mode before the highlight block column.',
      'Type your comment characters, e.g., "// " or draft code, and press Escape.',
      'Wait a split second: Vim instantly duplicates that text across all selected lines!'
    ],
    difficulty: 'advanced'
  },
  {
    id: 't11',
    title: 'Word Search & Multi-replacement swapping',
    command: '* -> cgn -> [typing] -> Esc -> .',
    category: 'search',
    description: 'Search for the word under the cursor and replace next occurrences selectively with one keystroke.',
    scenario: 'Refactoring variable names one-by-one inside a function safely without global regex risk.',
    steps: [
      'Move cursor onto any variable name you wish to swap.',
      'Type * to search for all matching occurrences forwards.',
      'Type cgn to erase the next occurrence and enter Insert mode instantly.',
      'Type your new variable label, then click your Escape key.',
      'Press n to skip an occurrence, or press . (dot) to dynamically swap the next one.'
    ],
    difficulty: 'advanced'
  },
  {
    id: 't12',
    title: 'Execute Inline Expression Calculator',
    command: 'Ctrl+r = [expression] Enter',
    category: 'advanced',
    description: 'Solve mathematical formulas directly inside your script and print the outcome.',
    scenario: 'Inserting calculated column layout sizes, pixel counts, or loop ranges on the fly.',
    steps: [
      'While in Insert mode, press Ctrl+r followed by the = symbol.',
      'A prompt opens at the bottom asking for an expression.',
      'Type your math problem (e.g., 1024 / 4) and hit Enter.',
      'Vim solves it instantly and inserts the raw result "256" directly right at your typing cursor!'
    ],
    difficulty: 'advanced'
  },
  {
    id: 't13',
    title: 'Inverse Delete Matching Lines',
    command: ':v/pattern/d',
    category: 'edit',
    description: 'Delete every line in the file that does NOT contain the matching pattern.',
    scenario: 'Filtering huge log archives to keep only entries containing severe warning levels.',
    steps: [
      'In normal mode, open command line with :.',
      'Type v/WARNING/d (replace WARNING with your specific keyword).',
      'Press Enter: Vim immediately sweeps and deletes all other lines, keeping only matches.'
    ],
    difficulty: 'advanced'
  },
  {
    id: 't14',
    title: 'Auto-Create Missing Parent Folders',
    command: ':call mkdir(expand(\'%:p:h\'), \'p\') | w',
    category: 'files',
    description: 'Create nested directory paths (like mkdir -p) directly inside Vim/Neovim when saving new files in folders that do not exist yet.',
    scenario: 'Saving a new file at a nested path (e.g. docs/notes/file.md) where parent directories do not exist, avoiding the E212 write error.',
    steps: [
      'Open the file buffer even if the folder does not exist: :e docs/notes/file.md',
      'Create the parent directories and write the file: :call mkdir(expand("%:p:h"), "p") | w',
      'To automate this, add a BufWritePre autocmd with protocol guards to your lua configuration.'
    ],
    difficulty: 'advanced'
  }
];
