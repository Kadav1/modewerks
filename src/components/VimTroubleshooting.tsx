import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  HelpCircle, 
  Terminal, 
  AlertTriangle, 
  Copy, 
  Check, 
  BookOpen, 
  RefreshCw,
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DiagnosticCommand {
  command: string;
  purpose: string;
  context: 'Health' | 'Packages' | 'Keymaps' | 'Crash Recovery';
  note?: string;
  caution?: boolean;
}

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'header';
}

const TROUBLESHOOTING_COMMANDS: DiagnosticCommand[] = [
  {
    command: ':checkhealth',
    purpose: 'Runs global diagnostics on LSP, parser modules, python support, and key ring mappings.',
    context: 'Health',
    note: 'Extremely detailed output. Best starting point for any plugin or parser failure.'
  },
  {
    command: ':messages',
    purpose: 'View the historic error and status messages logged in the active Neovim session.',
    context: 'Health',
    note: 'Useful when warning flashes and disappears too quickly.'
  },
  {
    command: ':version',
    purpose: 'Display running Neovim compile details, configurations, and features path list.',
    context: 'Health'
  },
  {
    command: ':Lazy sync',
    purpose: 'Synchronizes, installs, and updates all plugins managed in your lua configuration.',
    context: 'Packages',
    note: 'Run this if plugins fail to load or have missing features.'
  },
  {
    command: ':Mason',
    purpose: 'Opens the Mason server manager UI to search, download, and configure LSP servers, formatters, and linters.',
    context: 'Packages',
  },
  {
    command: ':verbose nmap <keys>',
    purpose: 'Trace which plugin, script, or configuration mapped the specified key sequence.',
    context: 'Keymaps',
    note: 'Indispensable for identifying key binding conflicts.'
  },
  {
    command: ':set ft?',
    purpose: 'Display the detected filetype of the current active buffer.',
    context: 'Keymaps',
    note: 'Vim uses filetype to load appropriate indent files and syntax plugins.'
  },
  {
    command: ':verbose set [option]?',
    purpose: 'Check the current value of an option and trace where it was set last.',
    context: 'Keymaps',
    note: 'E.g., :verbose set shiftwidth?'
  },
  {
    command: ':recover',
    purpose: 'Attempt to restore buffer contents from an existing background swap (.swp) file.',
    context: 'Crash Recovery',
    note: 'Execute this immediately after opening a file that crashed.',
    caution: true
  },
  {
    command: ':w!',
    purpose: 'Force-write current buffer to disk even if marked read-only (requires permissions).',
    context: 'Crash Recovery',
    caution: true
  },
  {
    command: ':q!',
    purpose: 'Discard all changes to current buffer and quit without saving.',
    context: 'Crash Recovery',
    caution: true
  },
  {
    command: ':AzwerksFormatStatus',
    purpose: 'Display status of active workspace formatters and format-on-save settings.',
    context: 'Packages',
    note: 'Shows active AZWERKS formatting integrations.'
  },
  {
    command: ':AzwerksThemeReload',
    purpose: 'Force reload and update the active AZWERKS Radium theme palette.',
    context: 'Health',
    note: 'Resolves visual glitches in colorscheme rendering.'
  },
  {
    command: ':AzwerksToggleBackground',
    purpose: 'Toggle transparent background opacity mode on the active workspace view.',
    context: 'Keymaps',
    note: 'Switches window between transparent and solid themes.'
  },
  {
    command: ':AzwerksHealthCheck',
    purpose: 'Validate structural integrity of configuration registers and run diagnostics.',
    context: 'Health',
    note: 'Core diagnostic suite for AZWERKS systems.'
  },
  {
    command: ':AzwerksDiagnosticToggle',
    purpose: 'Toggle display of compiler warnings, errors, and diagnostic lines.',
    context: 'Keymaps',
    note: 'Toggles inline virtual text warnings.'
  }
];

export default function VimTroubleshooting() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  
  // Right workspace tabs: terminal | wizard | docs
  const [activeRightTab, setActiveRightTab] = useState<'terminal' | 'wizard' | 'docs'>('terminal');

  // Terminal state
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: 'AZWERKS Radium Terminal Diagnostics v0.4.0', type: 'header' },
    { text: 'Type a command below or click "Run" on the left dashboard.', type: 'info' },
    { text: '', type: 'output' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Recovery wizard state
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardInput, setWizardInput] = useState('');
  const wizardEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal and wizard consoles
  useEffect(() => {
    if (terminalEndRef.current && typeof terminalEndRef.current.scrollIntoView === 'function') {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  useEffect(() => {
    if (wizardEndRef.current && typeof wizardEndRef.current.scrollIntoView === 'function') {
      wizardEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [wizardStep]);

  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
      .then(() => {
        setCopiedCmd(cmd);
        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }
        copyTimeoutRef.current = window.setTimeout(() => setCopiedCmd(null), 2000);
      })
      .catch((err) => console.error('Failed to copy troubleshooting command: ', err));
  };

  const handleRun = (cmd: string) => {
    setActiveRightTab('terminal');
    executeCommand(cmd);
  };

  const executeCommand = (cmd: string) => {
    // Add command to lines
    setTerminalLines(prev => [...prev, { text: `~ $ ${cmd}`, type: 'input' as const }].slice(-100));

    const normalizedCmd = cmd.trim();

    setTimeout(() => {
      let responseLines: TerminalLine[] = [];

      switch (normalizedCmd) {
        case ':checkhealth':
          responseLines = [
            { text: '======================================================================', type: 'header' },
            { text: 'health#nvim#check', type: 'info' },
            { text: '======================================================================', type: 'header' },
            { text: '## Configuration', type: 'info' },
            { text: '  - OK: no issues found', type: 'success' },
            { text: '', type: 'output' },
            { text: '## Performance', type: 'info' },
            { text: '  - OK: build is optimized (Release)', type: 'success' },
            { text: '', type: 'output' },
            { text: '## Clipboard', type: 'info' },
            { text: '  - OK: clipboard tool "xclip" found', type: 'success' },
            { text: '', type: 'output' },
            { text: '## Python 3 provider', type: 'info' },
            { text: '  - WARNING: python3 provider is not configured', type: 'error' },
            { text: '    - ADVICE: Run pip install pynvim to resolve.', type: 'info' },
            { text: '', type: 'output' },
            { text: '======================================================================', type: 'header' },
            { text: 'health#azwerks#check', type: 'info' },
            { text: '======================================================================', type: 'header' },
            { text: '  - OK: AZWERKS Radium theme palette loaded.', type: 'success' },
            { text: '  - OK: Formatting engine synced successfully.', type: 'success' },
            { text: '  - OK: Keyboard binding handler active.', type: 'success' }
          ];
          break;
        case ':messages':
          responseLines = [
            { text: '"draft_document.md" [w] 14L, 382B written', type: 'output' },
            { text: '[LSP] Client configured for javascript/typescript', type: 'info' },
            { text: '[LSP] Diagnostics: 0 errors, 1 warning', type: 'info' },
            { text: 'Error: Swp file already exists for draft_document.md!', type: 'error' }
          ];
          break;
        case ':version':
          responseLines = [
            { text: 'NVIM v0.10.0', type: 'success' },
            { text: 'Build type: Release', type: 'output' },
            { text: 'LuaJIT 2.1.1713484024', type: 'output' },
            { text: 'Compiled by azwerks@radium-core', type: 'info' }
          ];
          break;
        case ':Lazy sync':
          responseLines = [
            { text: 'lazy.nvim v11.14.0 - 24 plugins loaded', type: 'info' },
            { text: '● nvim-lspconfig  [OK] 12ms', type: 'success' },
            { text: '● telescope.nvim  [OK] 15ms', type: 'success' },
            { text: '● treesitter      [OK] 32ms', type: 'success' },
            { text: '● azwerks-theme   [OK] 8ms', type: 'success' },
            { text: 'Updating registry...', type: 'output' },
            { text: 'All plugins up to date.', type: 'success' }
          ];
          break;
        case ':Mason':
          responseLines = [
            { text: '┌────────────────────────────────────────┐', type: 'header' },
            { text: '│ Mason.nvim                             │', type: 'info' },
            { text: '├────────────────────────────────────────┤', type: 'header' },
            { text: '│ Installed (3)                          │', type: 'output' },
            { text: '│  ● typescript-language-server          │', type: 'success' },
            { text: '│  ● tailwindcss-language-server         │', type: 'success' },
            { text: '│  ● prettier                            │', type: 'success' },
            { text: '│                                        │', type: 'output' },
            { text: '│ Press i to install, u to update.       │', type: 'info' },
            { text: '└────────────────────────────────────────┘', type: 'header' }
          ];
          break;
        case ':recover':
          responseLines = [
            { text: '[System] Launching Swap File Recovery Walkthrough Wizard...', type: 'success' }
          ];
          setTimeout(() => {
            setActiveRightTab('wizard');
            setWizardStep(1);
            setWizardInput('');
          }, 400);
          break;
        case ':w!':
          responseLines = [
            { text: '"draft_document.md" [w] 14L, 382B written', type: 'success' }
          ];
          break;
        case ':q!':
          responseLines = [
            { text: '[System] Exited Vim editor session.', type: 'info' }
          ];
          break;
        case ':AzwerksFormatStatus':
          responseLines = [
            { text: 'AZWERKS Formatting Integrations:', type: 'info' },
            { text: '  - Prettier: Active', type: 'success' },
            { text: '  - ESLint: Active', type: 'success' },
            { text: '  - Format-on-Save: Enabled', type: 'success' }
          ];
          break;
        case ':AzwerksThemeReload':
          responseLines = [
            { text: 'Reloading AZWERKS theme...', type: 'info' },
            { text: 'Theme Radium loaded successfully.', type: 'success' }
          ];
          break;
        case ':AzwerksToggleBackground':
          responseLines = [
            { text: 'Transparent background toggled.', type: 'success' }
          ];
          break;
        case ':AzwerksHealthCheck':
          responseLines = [
            { text: 'AZWERKS System Diagnostics:', type: 'info' },
            { text: '  - Theme Palette: OK', type: 'success' },
            { text: '  - Configuration Registers: OK', type: 'success' },
            { text: '  - Workspace Compatibility: OK', type: 'success' }
          ];
          break;
        case ':AzwerksDiagnosticToggle':
          responseLines = [
            { text: 'Inline virtual text warnings toggled.', type: 'success' }
          ];
          break;
        case 'clear':
          setTerminalLines([]);
          return;
        case 'help':
          responseLines = [
            { text: 'Available commands:', type: 'info' },
            { text: '  :checkhealth, :messages, :version, :Lazy sync, :Mason', type: 'output' },
            { text: '  :AzwerksHealthCheck, :AzwerksFormatStatus, :recover', type: 'output' },
            { text: '  clear - clears screen console', type: 'output' }
          ];
          break;
        default:
          if (normalizedCmd.startsWith(':verbose nmap')) {
            responseLines = [
              { text: 'n  <leader>w   * :w<CR>', type: 'success' },
              { text: '      Last set from ~/.config/nvim/lua/config/keymaps.lua line 12', type: 'info' },
              { text: 'n  <leader>h   * :nohlsearch<CR>', type: 'success' },
              { text: '      Last set from ~/.config/nvim/lua/config/keymaps.lua line 15', type: 'info' }
            ];
          } else if (normalizedCmd.startsWith(':verbose set')) {
            const opt = normalizedCmd.replace(':verbose set', '').replace('?', '').trim();
            responseLines = [
              { text: `  ${opt || 'shiftwidth'}=4`, type: 'success' },
              { text: '      Last set from ~/.config/nvim/lua/config/options.lua line 8', type: 'info' }
            ];
          } else if (normalizedCmd.startsWith(':set ft?')) {
            responseLines = [
              { text: 'filetype=typescript', type: 'success' }
            ];
          } else {
            responseLines = [
              { text: `Shell: command not found: "${cmd}"`, type: 'error' },
              { text: 'Type "help" for a list of available diagnostic outputs.', type: 'info' }
            ];
          }
      }

      setTerminalLines(prev => [...prev, ...responseLines].slice(-100));
    }, 100);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;
    executeCommand(cmd);
    setTerminalInput('');
  };

  // Recovery Wizard interaction logic
  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = wizardInput.trim();
    if (!val) return;

    if (wizardStep === 1 && (val === 'nvim draft_document.md' || val.toLowerCase() === 'nvim')) {
      setWizardStep(2);
      setWizardInput('');
    } else if (wizardStep === 2 && (val.toUpperCase() === 'R' || val.toLowerCase() === 'r')) {
      setWizardStep(3);
      setWizardInput('');
    } else if (wizardStep === 3 && val === ':w') {
      setWizardStep(4);
      setWizardInput('');
    } else if (wizardStep === 4 && (val === ':q' || val === ':q!')) {
      setWizardStep(5);
      setWizardInput('');
    } else if (wizardStep === 5 && (val === 'rm .draft_document.md.swp' || val.startsWith('rm '))) {
      setWizardStep(6);
      setWizardInput('');
    } else {
      alert(`Invalid command sequence for Step ${wizardStep}. Type the correct command or click "Quick Fill" below.`);
    }
  };

  const handleQuickFill = () => {
    if (wizardStep === 1) {
      setWizardStep(2);
    } else if (wizardStep === 2) {
      setWizardStep(3);
    } else if (wizardStep === 3) {
      setWizardStep(4);
    } else if (wizardStep === 4) {
      setWizardStep(5);
    } else if (wizardStep === 5) {
      setWizardStep(6);
    }
    setWizardInput('');
  };

  const getWizardPrompt = (step: number) => {
    if (step === 1 || step === 5) return 'cinnamon-desklet:~ $ ';
    if (step === 2) return 'Choose Option: ';
    if (step === 3 || step === 4) return ':';
    return '';
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between border-b border-az-border-subtle pb-3">
        <div>
          <h1 className="text-sm font-bold font-mono text-az-text-heading uppercase tracking-wider flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-az-active" />
            Workspace Diagnostics &amp; Recovery Ledger
          </h1>
          <p className="text-[11px] text-az-text-muted mt-0.5 font-sans">
            Interactive command simulator and crash recovery guide for active workspace mappings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Side: Diagnostic Commands List */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="border border-az-border-subtle rounded-xl overflow-hidden bg-az-bg-alt shadow-xs">
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-az-bg-canvas border-b border-az-border-subtle text-[10px] font-mono font-bold tracking-wider text-az-text-faint">
              <span className="col-span-3">COMMAND</span>
              <span className="col-span-2">CONTEXT</span>
              <span className="col-span-5">DIAGNOSTIC PURPOSE</span>
              <span className="col-span-2 text-right">ACTIONS</span>
            </div>

            <div className="divide-y divide-az-border-subtle font-mono text-xs">
              {TROUBLESHOOTING_COMMANDS.map((item, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-12 gap-2 px-3 py-2.5 items-start hover:bg-az-bg-canvas transition-colors"
                >
                  <div className="col-span-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-az-bg-embedded border border-az-border-default text-az-active text-[10px] font-bold">
                      {item.command}
                    </span>
                    {item.caution && (
                      <span className="w-1.5 h-1.5 rounded-full bg-az-danger" title="Destructive action" />
                    )}
                  </div>

                  <div className="col-span-2">
                    <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-medium uppercase tracking-wide border ${
                      item.context === 'Health' 
                        ? 'bg-az-info/10 text-az-info border-az-info/15'
                        : item.context === 'Packages'
                        ? 'bg-az-success/10 text-az-success border-az-success/15'
                        : item.context === 'Keymaps'
                        ? 'bg-az-focus/10 text-az-focus border-az-focus/15'
                        : 'bg-az-warning/10 text-az-warning border-az-warning/15'
                    }`}>
                      {item.context.split(' ')[0]}
                    </span>
                  </div>

                  <div className="col-span-5 text-az-text-primary text-[11px] leading-relaxed">
                    <p>{item.purpose}</p>
                    {item.note && (
                      <p className="text-[10px] text-az-text-muted mt-0.5 italic">
                        * {item.note}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 flex justify-end gap-2 items-center">
                    <button
                      onClick={() => handleRun(item.command)}
                      className="p-1 rounded text-az-active hover:bg-az-active/10 transition-colors cursor-pointer"
                      title="Run in terminal simulator"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(item.command)}
                      className="p-1 rounded text-az-text-faint hover:text-az-text-heading hover:bg-az-bg-canvas cursor-pointer transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.command ? (
                        <Check className="w-3.5 h-3.5 text-az-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Interactive Diagnostics Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex border border-az-border-subtle rounded-xl overflow-hidden bg-az-bg-alt flex-col h-[480px]">
            {/* Header Tabs */}
            <div className="flex bg-az-bg-canvas border-b border-az-border-subtle text-[10px] font-mono font-bold tracking-wider text-az-text-faint shrink-0" role="tablist">
              <button
                role="tab"
                aria-selected={activeRightTab === 'terminal'}
                onClick={() => setActiveRightTab('terminal')}
                className={`flex-1 py-2 text-center border-r border-az-border-subtle flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRightTab === 'terminal' ? 'bg-az-bg-alt text-az-active border-b-2 border-b-az-active' : 'hover:bg-az-bg-soft'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL CONSOLE</span>
              </button>
              <button
                role="tab"
                aria-selected={activeRightTab === 'wizard'}
                onClick={() => setActiveRightTab('wizard')}
                className={`flex-1 py-2 text-center border-r border-az-border-subtle flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRightTab === 'wizard' ? 'bg-az-bg-alt text-az-active border-b-2 border-b-az-active' : 'hover:bg-az-bg-soft'
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>RECOVERY WIZARD</span>
              </button>
              <button
                role="tab"
                aria-selected={activeRightTab === 'docs'}
                onClick={() => setActiveRightTab('docs')}
                className={`flex-1 py-2 text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRightTab === 'docs' ? 'bg-az-bg-alt text-az-active border-b-2 border-b-az-active' : 'hover:bg-az-bg-soft'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>REFERENCE DOCS</span>
              </button>
            </div>

            {/* Content Views */}
            <div className="flex-1 overflow-auto p-4 bg-az-bg-embedded font-mono text-xs flex flex-col">
              
              {/* Tab 1: Terminal Console */}
              {activeRightTab === 'terminal' && (
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-none">
                    {terminalLines.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={`leading-relaxed whitespace-pre-wrap ${
                          line.type === 'input' 
                            ? 'text-az-text-primary font-bold' 
                            : line.type === 'error'
                            ? 'text-az-danger font-medium'
                            : line.type === 'success'
                            ? 'text-az-success'
                            : line.type === 'info'
                            ? 'text-az-info'
                            : line.type === 'header'
                            ? 'text-az-active font-semibold border-b border-az-border-subtle pb-1 mb-1'
                            : 'text-az-text-muted'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleTerminalSubmit} className="mt-3 pt-2.5 border-t border-az-border-subtle flex items-center gap-1.5 shrink-0">
                    <span className="text-az-active font-bold select-none">~ $</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-az-text-primary caret-az-active font-mono p-0 focus:ring-0 placeholder:text-az-text-faint/40"
                      placeholder="Type diagnostic command (e.g. :checkhealth)"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                  </form>
                </div>
              )}

              {/* Tab 2: Recovery Wizard */}
              {activeRightTab === 'wizard' && (
                <div className="flex-1 flex flex-col justify-between h-full">
                  
                  {/* Step Display Area */}
                  <div className="flex-grow space-y-3.5 pr-1 overflow-y-auto scrollbar-none">
                    
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between text-[10px] text-az-text-faint pb-1.5 border-b border-az-border-subtle">
                      <span>SWAP RECOVERY STEPS</span>
                      <span>STEP {wizardStep} OF 6</span>
                    </div>

                    {/* Step 1: Crash Incident */}
                    {wizardStep === 1 && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-az-danger/10 border border-az-danger/25 text-az-danger flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p className="font-sans leading-relaxed">
                            <strong>Crash Alert!</strong> A sudden outage terminated Neovim, leaving behind a stale swap buffer. Your edits are trapped in <code>.draft_document.md.swp</code>.
                          </p>
                        </div>
                        <p className="font-sans text-[11px] text-az-text-primary">
                          Open the file with Neovim to trigger recovery checks. Type the command below or press the fill button.
                        </p>
                        <div className="bg-az-bg-canvas p-2.5 rounded-lg border border-az-border-subtle font-mono text-az-active">
                          nvim draft_document.md
                        </div>
                      </div>
                    )}

                    {/* Step 2: Swap Alert Option */}
                    {wizardStep === 2 && (
                      <div className="space-y-3">
                        <div className="bg-az-bg-canvas p-3 rounded-lg border border-az-border-subtle text-[11px] leading-relaxed text-az-text-primary">
                          <p className="font-bold text-az-warning">E325: ATTENTION</p>
                          <p className="mt-1">Found a swap file by the name ".draft_document.md.swp"</p>
                          <p className="mt-2 text-az-text-muted">While opening file "draft_document.md"</p>
                          <p className="mt-2">Swap file already exists! Recovery is available.</p>
                          <p className="mt-2 font-bold text-az-active">[O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete, (Q)uit, (A)bort:</p>
                        </div>
                        <p className="font-sans text-[11px] text-az-text-primary">
                          Enter <strong>R</strong> to restore your edits from the swap file.
                        </p>
                      </div>
                    )}

                    {/* Step 3: Write Buffer */}
                    {wizardStep === 3 && (
                      <div className="space-y-3">
                        <div className="bg-az-bg-canvas p-3 rounded-lg border border-az-border-subtle text-[11px] leading-relaxed text-az-text-primary">
                          <p className="text-az-success font-bold">Using swap file ".draft_document.md.swp"</p>
                          <p>Original file "draft_document.md"</p>
                          <p className="mt-1.5 text-az-info">Recovery completed. Buffer loaded.</p>
                          <p className="mt-1 font-bold text-az-warning">"draft_document.md" [Modified] 14 lines</p>
                        </div>
                        <p className="font-sans text-[11px] text-az-text-primary">
                          Your buffer content is recovered but NOT yet written to disk! Type <strong>:w</strong> to write the file.
                        </p>
                        <div className="bg-az-bg-canvas p-2.5 rounded-lg border border-az-border-subtle font-mono text-az-active">
                          :w
                        </div>
                      </div>
                    )}

                    {/* Step 4: Quit Editor */}
                    {wizardStep === 4 && (
                      <div className="space-y-3">
                        <div className="bg-az-bg-canvas p-3 rounded-lg border border-az-border-subtle text-[11px] text-az-text-primary">
                          <p className="text-az-success font-bold">"draft_document.md" [w] 14L, 382B written</p>
                        </div>
                        <p className="font-sans text-[11px] text-az-text-primary">
                          Changes are safely saved! Exit Neovim now. Type <strong>:q</strong> to quit.
                        </p>
                        <div className="bg-az-bg-canvas p-2.5 rounded-lg border border-az-border-subtle font-mono text-az-active">
                          :q
                        </div>
                      </div>
                    )}

                    {/* Step 5: Clean Swap File */}
                    {wizardStep === 5 && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-az-warning/10 border border-az-warning/25 text-az-warning flex items-start gap-2.5 font-sans leading-relaxed">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p>
                            Neovim exited safely, but the stale <code>.draft_document.md.swp</code> swap file is still in directory storage. Opening the file again will trigger the same warning!
                          </p>
                        </div>
                        <p className="font-sans text-[11px] text-az-text-primary">
                          Delete the stale swap file. Type <strong>rm .draft_document.md.swp</strong> below.
                        </p>
                        <div className="bg-az-bg-canvas p-2.5 rounded-lg border border-az-border-subtle font-mono text-az-active">
                          rm .draft_document.md.swp
                        </div>
                      </div>
                    )}

                    {/* Step 6: Success Badge */}
                    {wizardStep === 6 && (
                      <div className="py-6 flex flex-col items-center justify-center text-center gap-4 animate-fade-in font-sans">
                        <div className="w-14 h-14 rounded-full bg-az-success/15 border-2 border-az-success flex items-center justify-center text-az-success relative">
                          <Sparkles className="w-7 h-7 animate-pulse" />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-mono font-bold text-sm text-az-text-heading uppercase tracking-wide">
                            Mastery Unlocked!
                          </h3>
                          <p className="text-[11px] text-az-text-muted max-w-xs leading-relaxed">
                            You've successfully resolved a crash alert, saved recovered buffers, and cleaned your workspace cache.
                          </p>
                        </div>
                        <button
                          onClick={() => setWizardStep(1)}
                          className="mt-2 px-4 py-1.5 rounded-lg bg-az-active hover:bg-az-focus transition-colors font-mono font-bold text-xs text-az-bg-canvas cursor-pointer"
                        >
                          Restart Walkthrough
                        </button>
                      </div>
                    )}

                    <div ref={wizardEndRef} />
                  </div>

                  {/* Input and Controls */}
                  {wizardStep < 6 && (
                    <div className="mt-3 pt-2.5 border-t border-az-border-subtle flex flex-col gap-2 shrink-0">
                      <form onSubmit={handleWizardSubmit} className="flex items-center gap-1.5">
                        <span className="text-az-active font-bold select-none">
                          {getWizardPrompt(wizardStep)}
                        </span>
                        <input
                          type="text"
                          value={wizardInput}
                          onChange={(e) => setWizardInput(e.target.value)}
                          className="flex-grow bg-transparent border-none outline-none text-az-text-primary caret-az-active font-mono p-0 focus:ring-0 placeholder:text-az-text-faint/45"
                          placeholder="Type response command..."
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                        />
                      </form>
                      
                      <button
                        onClick={handleQuickFill}
                        className="w-full text-center py-1.5 rounded bg-az-bg-canvas border border-az-border-subtle text-az-text-muted hover:text-az-text-heading hover:bg-az-bg-soft transition-all text-[10px] font-mono font-semibold cursor-pointer"
                      >
                        Quick Fill &amp; Run Step
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Reference Docs (Preserved Original Content) */}
              {activeRightTab === 'docs' && (
                <div className="flex-grow space-y-4 pr-1 overflow-y-auto scrollbar-none font-sans text-xs">
                  
                  {/* Swap Recovery Info */}
                  <div className="border border-az-border-subtle p-3 rounded-lg bg-az-bg-canvas flex flex-col gap-2">
                    <h2 className="text-[11px] font-bold font-mono text-az-text-heading uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-az-warning" />
                      Swap Files &amp; Crash Recovery
                    </h2>
                    
                    <div className="text-[11px] text-az-text-primary space-y-2 leading-relaxed">
                      <p>
                        When Neovim or terminal terminates abnormally, it leaves a recovery swap file (ending in <code className="px-1 rounded bg-az-bg-embedded font-mono text-[10px] text-az-active">.swp</code>) in your buffer storage directory.
                      </p>
                      
                      <div className="border-l border-az-border-default pl-3.5 italic py-0.5 text-az-text-muted">
                        "Vim uses swap files to record keystrokes between saves, serving as a reliable insurance ledger against system crashes."
                      </div>

                      <p className="font-semibold text-az-text-heading">Standard Recovery Procedure:</p>
                      
                      <ol className="list-decimal list-inside pl-1 space-y-1 text-az-text-primary">
                        <li>Open damaged file: <code className="px-1 rounded bg-az-bg-embedded font-mono text-[10px] text-az-active">nvim file.txt</code></li>
                        <li>Press <kbd className="px-1 bg-az-bg-embedded border border-az-border-default font-bold rounded text-[9.5px]">R</kbd> (Recover) when prompted.</li>
                        <li>Write recovered buffer: <code className="px-1 rounded bg-az-bg-embedded font-mono text-[10px] text-az-active">:w</code></li>
                        <li>Exit cleanly: <code className="px-1 rounded bg-az-bg-embedded font-mono text-[10px] text-az-active">:q</code></li>
                        <li>Delete the stale swap file.</li>
                      </ol>
                    </div>
                  </div>

                  {/* Purge Routine */}
                  <div className="border border-az-border-subtle p-3 rounded-lg bg-az-bg-canvas flex flex-col gap-2">
                    <h2 className="text-[11px] font-bold font-mono text-az-text-heading uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-az-info" />
                      Safe Swap Purge Routine
                    </h2>
                    
                    <p className="text-[11px] text-az-text-primary leading-relaxed">
                      To locate and purge stale swap files directly inside Neovim after a recovery run, copy and execute this safe ledger cleanup:
                    </p>

                    <div className="bg-az-bg-embedded border border-az-border-subtle p-2 rounded-lg flex items-center justify-between font-mono text-[10px] mt-1">
                      <code className="text-az-active truncate pr-2">
                        :let @x = globpath(&amp;directory, '.*.swp') | echo @x
                      </code>
                      <button
                        onClick={() => handleCopy(":let @x = globpath(&directory, '.*.swp') | echo @x")}
                        className="p-1 rounded text-az-text-faint hover:text-az-text-heading hover:bg-az-bg-canvas cursor-pointer shrink-0 transition-colors"
                      >
                        {copiedCmd === ":let @x = globpath(&directory, '.*.swp') | echo @x" ? (
                          <Check className="w-3.5 h-3.5 text-az-success" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
