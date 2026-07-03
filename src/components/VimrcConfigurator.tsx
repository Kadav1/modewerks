import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  RefreshCw, 
  BookOpen, 
  Heart, 
  ChevronRight, 
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VimrcSettings {
  // General/Behavior
  syntaxOn: boolean;
  filetypeOn: boolean;
  number: boolean;
  relativenumber: boolean;
  mouse: string;
  clipboard: boolean;
  hidden: boolean;
  backspace: boolean;
  historyLimit: number;
  
  // Tabs & Indentation
  tabstop: number;
  shiftwidth: number;
  expandtab: boolean;
  autoindent: boolean;
  smartindent: boolean;
  
  // Search
  hlsearch: boolean;
  incsearch: boolean;
  ignorecase: boolean;
  smartcase: boolean;
  
  // UI & Look
  termguicolors: boolean;
  cursorline: boolean;
  showcmd: boolean;
  showmode: boolean;
  wildmenu: boolean;
  signcolumn: boolean;
  lazyredraw: boolean;
  splitright: boolean;
  splitbelow: boolean;
  
  // Handy Mappings
  mapLeader: string;
  mapEscJk: boolean;
  mapQuickSave: boolean;
  mapClearHighlight: boolean;
  mapWindowNav: boolean;
  mapRelativeToggle: boolean;

  // lazy.nvim Plugin Bootstrapper
  enableLazyNvim: boolean;
  installTelescope: boolean;
  installTreesitter: boolean;
  installLspZero: boolean;
  installNeoTree: boolean;
  installGitsigns: boolean;

  // New Advanced UI & Mappings
  cmdheight0: boolean;
  foldcolumn: boolean;
  cursorcolumn: boolean;
  spell: boolean;
  numbertoggle: boolean;
  virtualeditBlock: boolean;
  disableArrows: boolean;
  compileOnF5: boolean;
  wrapLines: boolean;
}

type BooleanKeys<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];

const PRESETS = {
  minimalist: {
    name: 'Minimalist Default',
    desc: 'Lightweight settings for a clutter-free classical experience',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: true,
      relativenumber: false,
      mouse: '',
      clipboard: false,
      hidden: false,
      backspace: true,
      historyLimit: 100,
      tabstop: 4,
      shiftwidth: 4,
      expandtab: true,
      autoindent: true,
      smartindent: false,
      hlsearch: true,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: false,
      cursorline: false,
      showcmd: true,
      showmode: true,
      wildmenu: true,
      signcolumn: false,
      lazyredraw: false,
      splitright: false,
      splitbelow: false,
      mapLeader: '\\',
      mapEscJk: false,
      mapQuickSave: false,
      mapClearHighlight: false,
      mapWindowNav: false,
      mapRelativeToggle: false,
      enableLazyNvim: false,
      installTelescope: false,
      installTreesitter: false,
      installLspZero: false,
      installNeoTree: false,
      installGitsigns: false,
      cmdheight0: false,
      foldcolumn: false,
      cursorcolumn: false,
      spell: false,
      numbertoggle: false,
      virtualeditBlock: false,
      disableArrows: false,
      compileOnF5: false,
      wrapLines: false
    }
  },
  modern: {
    name: 'Modern Hacker',
    desc: 'Hybrid numbers, search refinements, pane splits, and 24-bit color (Recommended)',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: true,
      relativenumber: true,
      mouse: 'a',
      clipboard: true,
      hidden: true,
      backspace: true,
      historyLimit: 500,
      tabstop: 4,
      shiftwidth: 4,
      expandtab: true,
      autoindent: true,
      smartindent: true,
      hlsearch: true,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: true,
      cursorline: true,
      showcmd: true,
      showmode: false,
      wildmenu: true,
      signcolumn: true,
      lazyredraw: true,
      splitright: true,
      splitbelow: true,
      mapLeader: ' ',
      mapEscJk: true,
      mapQuickSave: true,
      mapClearHighlight: true,
      mapWindowNav: true,
      mapRelativeToggle: true,
      enableLazyNvim: false,
      installTelescope: false,
      installTreesitter: false,
      installLspZero: false,
      installNeoTree: false,
      installGitsigns: false,
      cmdheight0: false,
      foldcolumn: false,
      cursorcolumn: false,
      spell: false,
      numbertoggle: false,
      virtualeditBlock: false,
      disableArrows: false,
      compileOnF5: false,
      wrapLines: false
    }
  },
  webdev: {
    name: 'Frontend Web Dev',
    desc: 'Modern layout tailored for web development with compact 2-space tab indentations and lazy.nvim bootstrap template (Recommended for Neovim)',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: true,
      relativenumber: true,
      mouse: 'a',
      clipboard: true,
      hidden: true,
      backspace: true,
      historyLimit: 1000,
      tabstop: 2,
      shiftwidth: 2,
      expandtab: true,
      autoindent: true,
      smartindent: true,
      hlsearch: true,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: true,
      cursorline: true,
      showcmd: true,
      showmode: false,
      wildmenu: true,
      signcolumn: true,
      lazyredraw: true,
      splitright: true,
      splitbelow: true,
      mapLeader: ' ',
      mapEscJk: true,
      mapQuickSave: true,
      mapClearHighlight: true,
      mapWindowNav: true,
      mapRelativeToggle: true,
      enableLazyNvim: true,
      installTelescope: true,
      installTreesitter: true,
      installLspZero: true,
      installNeoTree: true,
      installGitsigns: true,
      cmdheight0: true,
      foldcolumn: false,
      cursorcolumn: false,
      spell: false,
      numbertoggle: true,
      virtualeditBlock: true,
      disableArrows: false,
      compileOnF5: false,
      wrapLines: false
    }
  },
  competitive: {
    name: 'Competitive Programmer',
    desc: 'Optimized for quick compiler executions, visual matches, and shared clipboard configurations',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: true,
      relativenumber: false,
      mouse: 'a',
      clipboard: true,
      hidden: true,
      backspace: true,
      historyLimit: 500,
      tabstop: 4,
      shiftwidth: 4,
      expandtab: true,
      autoindent: true,
      smartindent: true,
      hlsearch: true,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: true,
      cursorline: false,
      showcmd: true,
      showmode: true,
      wildmenu: true,
      signcolumn: true,
      lazyredraw: true,
      splitright: true,
      splitbelow: true,
      mapLeader: ' ',
      mapEscJk: false,
      mapQuickSave: true,
      mapClearHighlight: true,
      mapWindowNav: true,
      mapRelativeToggle: false,
      enableLazyNvim: false,
      installTelescope: false,
      installTreesitter: false,
      installLspZero: false,
      installNeoTree: false,
      installGitsigns: false,
      cmdheight0: false,
      foldcolumn: false,
      cursorcolumn: false,
      spell: false,
      numbertoggle: false,
      virtualeditBlock: true,
      disableArrows: false,
      compileOnF5: true,
      wrapLines: false
    }
  },
  writer: {
    name: 'Prose & LaTeX Writer',
    desc: 'Designed for spelling corrections, margin layouts, word wrap, and soft tab settings',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: false,
      relativenumber: false,
      mouse: 'a',
      clipboard: false,
      hidden: true,
      backspace: true,
      historyLimit: 200,
      tabstop: 4,
      shiftwidth: 4,
      expandtab: true,
      autoindent: true,
      smartindent: false,
      hlsearch: false,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: true,
      cursorline: true,
      showcmd: false,
      showmode: true,
      wildmenu: true,
      signcolumn: false,
      lazyredraw: false,
      splitright: false,
      splitbelow: false,
      mapLeader: ',',
      mapEscJk: true,
      mapQuickSave: true,
      mapClearHighlight: false,
      mapWindowNav: false,
      mapRelativeToggle: false,
      enableLazyNvim: false,
      installTelescope: false,
      installTreesitter: false,
      installLspZero: false,
      installNeoTree: false,
      installGitsigns: false,
      cmdheight0: false,
      foldcolumn: true,
      cursorcolumn: false,
      spell: true,
      numbertoggle: false,
      virtualeditBlock: false,
      disableArrows: false,
      compileOnF5: false,
      wrapLines: true
    }
  },
  tutor: {
    name: 'Vim Motion Tutor',
    desc: 'Forces users to build muscle memory using h/j/k/l keys by disabling arrow keys completely',
    settings: {
      syntaxOn: true,
      filetypeOn: true,
      number: true,
      relativenumber: true,
      mouse: '',
      clipboard: false,
      hidden: false,
      backspace: true,
      historyLimit: 100,
      tabstop: 4,
      shiftwidth: 4,
      expandtab: true,
      autoindent: true,
      smartindent: false,
      hlsearch: true,
      incsearch: true,
      ignorecase: true,
      smartcase: true,
      termguicolors: true,
      cursorline: true,
      showcmd: true,
      showmode: true,
      wildmenu: true,
      signcolumn: true,
      lazyredraw: false,
      splitright: false,
      splitbelow: false,
      mapLeader: ' ',
      mapEscJk: true,
      mapQuickSave: false,
      mapClearHighlight: true,
      mapWindowNav: false,
      mapRelativeToggle: false,
      enableLazyNvim: false,
      installTelescope: false,
      installTreesitter: false,
      installLspZero: false,
      installNeoTree: false,
      installGitsigns: false,
      cmdheight0: false,
      foldcolumn: false,
      cursorcolumn: false,
      spell: false,
      numbertoggle: false,
      virtualeditBlock: false,
      disableArrows: true,
      compileOnF5: false,
      wrapLines: false
    }
  }
};

export default function VimrcConfigurator() {
  const [settings, setSettings] = useState<VimrcSettings>({ ...PRESETS.modern.settings });
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS | 'custom'>('modern');
  const [configFormat, setConfigFormat] = useState<'vimscript' | 'lua'>('vimscript');
  const [copied, setCopied] = useState(false);

  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    setSettings({ ...PRESETS[presetKey].settings });
    setActivePreset(presetKey);
    if (presetKey === 'webdev' || presetKey === 'tutor') {
      setConfigFormat('lua');
    } else {
      setConfigFormat('vimscript');
    }
  };

  const handleToggle = (key: BooleanKeys<VimrcSettings>) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setActivePreset('custom');
  };

  const handleChangeSelect = <K extends keyof VimrcSettings>(key: K, val: VimrcSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: val
    }));
    setActivePreset('custom');
  };

  // Build highlighted output configuration
  const formattedVimrc = useMemo(() => {
    const lines: { text: string; type: 'comment' | 'command' | 'blank' | 'heading' }[] = [];
    const isLua = configFormat === 'lua';
    const cChar = isLua ? '--' : '"';
    
    lines.push({ text: `${cChar} ====================================================================`, type: 'comment' });
    lines.push({ text: `${cChar}  Custom ${isLua ? 'init.lua' : '.vimrc'} generated on ${new Date().toISOString().split('T')[0]}`, type: 'comment' });
    lines.push({ text: `${cChar}  modewerks - Workspace Configurator`, type: 'comment' });
    lines.push({ text: `${cChar} ====================================================================`, type: 'comment' });
    lines.push({ text: '', type: 'blank' });

    if (isLua) {
      lines.push({ text: '-- --- General / Environment Settings ---', type: 'heading' });
      lines.push({ text: '-- syntax and filetype are enabled by default in Neovim', type: 'comment' });
      lines.push({ text: `vim.opt.number = ${settings.number ? 'true' : 'false'}           -- Display line numbers on screen margin`, type: 'command' });
      lines.push({ text: `vim.opt.relativenumber = ${settings.relativenumber ? 'true' : 'false'}    -- Relative line numbering`, type: 'command' });
      
      if (settings.mouse) {
        lines.push({ text: `vim.opt.mouse = "${settings.mouse}"            -- Mouse support enabled`, type: 'command' });
      }
      if (settings.clipboard) {
        lines.push({ text: 'vim.opt.clipboard = "unnamedplus" -- Share clipboard contents with global system OS', type: 'command' });
      }
      if (settings.hidden) {
        lines.push({ text: 'vim.opt.hidden = true              -- Switch open files (buffers) without saving first', type: 'command' });
      }
      if (settings.backspace) {
        lines.push({ text: 'vim.opt.backspace = "indent,eol,start" -- Configure backspace', type: 'command' });
      }
      if (settings.historyLimit !== 100) {
        lines.push({ text: `vim.opt.history = ${settings.historyLimit}          -- Set history limits`, type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      lines.push({ text: '-- --- Tabs, Layout & Indentation ---', type: 'heading' });
      lines.push({ text: `vim.opt.tabstop = ${settings.tabstop}              -- Width of typed tab`, type: 'command' });
      lines.push({ text: `vim.opt.shiftwidth = ${settings.shiftwidth}           -- Depth step of autoindentation`, type: 'command' });
      lines.push({ text: `vim.opt.expandtab = ${settings.expandtab ? 'true' : 'false'}           -- Convert tabs into spaces`, type: 'command' });
      if (settings.autoindent) {
        lines.push({ text: 'vim.opt.autoindent = true           -- Retain formatting indentation level', type: 'command' });
      }
      if (settings.smartindent) {
        lines.push({ text: 'vim.opt.smartindent = true          -- Trigger language-specific auto-indent', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      lines.push({ text: '-- --- High-Efficiency Searching ---', type: 'heading' });
      lines.push({ text: `vim.opt.hlsearch = ${settings.hlsearch ? 'true' : 'false'}            -- Keep matching patterns highlighted`, type: 'command' });
      if (settings.incsearch) {
        lines.push({ text: 'vim.opt.incsearch = true            -- Preview search target increments', type: 'command' });
      }
      if (settings.ignorecase) {
        lines.push({ text: 'vim.opt.ignorecase = true           -- Ignore search spelling case', type: 'command' });
      }
      if (settings.smartcase) {
        lines.push({ text: 'vim.opt.smartcase = true            -- Respect casing rules if caps typed', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      lines.push({ text: '-- --- Graphic User Interface & Windows ---', type: 'heading' });
      if (settings.termguicolors) {
        lines.push({ text: 'vim.opt.termguicolors = true        -- Enable true term RGB colors', type: 'command' });
      }
      if (settings.cursorline) {
        lines.push({ text: 'vim.opt.cursorline = true           -- Highlight screen row of cursor', type: 'command' });
      }
      if (!settings.showmode) {
        lines.push({ text: 'vim.opt.showmode = false            -- Defer text status mode displays', type: 'command' });
      }
      if (settings.signcolumn) {
        lines.push({ text: 'vim.opt.signcolumn = "yes"          -- Always display sign sidebar', type: 'command' });
      }
      if (settings.lazyredraw) {
        lines.push({ text: 'vim.opt.lazyredraw = true           -- Freeze redraws inside running macros', type: 'command' });
      }
      if (settings.splitright) {
        lines.push({ text: 'vim.opt.splitright = true           -- Open split windows to the right', type: 'command' });
      }
      if (settings.splitbelow) {
        lines.push({ text: 'vim.opt.splitbelow = true           -- Launch split windows underneath', type: 'command' });
      }
      
      // New Advanced UI options in Lua
      if (settings.cmdheight0) {
        lines.push({ text: 'vim.opt.cmdheight = 0             -- Hide command line footer when inactive', type: 'command' });
      }
      if (settings.foldcolumn) {
        lines.push({ text: 'vim.opt.foldcolumn = "1"            -- Enable visual fold column margin', type: 'command' });
      }
      if (settings.cursorcolumn) {
        lines.push({ text: 'vim.opt.cursorcolumn = true         -- Highlight vertical column of cursor', type: 'command' });
      }
      if (settings.spell) {
        lines.push({ text: 'vim.opt.spell = true                -- Enable spell checker engine highlights', type: 'command' });
      }
      if (settings.virtualeditBlock) {
        lines.push({ text: 'vim.opt.virtualedit = "block"       -- Allow cursor past end-of-line in Visual Block', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      // Custom Hybrid Number Toggle Autocommands
      if (settings.numbertoggle) {
        lines.push({ text: '-- --- Smart Hybrid Number Toggle ---', type: 'heading' });
        lines.push({ text: 'local nt_group = vim.api.nvim_create_augroup("NTToggle", {clear = true})', type: 'command' });
        lines.push({ text: 'vim.api.nvim_create_autocmd({"BufEnter", "FocusGained", "InsertLeave", "WinEnter"}, {', type: 'command' });
        lines.push({ text: '  group = nt_group,', type: 'command' });
        lines.push({ text: '  callback = function()', type: 'command' });
        lines.push({ text: '    if vim.opt.number:get() and vim.fn.mode() ~= "i" then vim.opt.relativenumber = true end', type: 'command' });
        lines.push({ text: '  end', type: 'command' });
        lines.push({ text: '})', type: 'command' });
        lines.push({ text: 'vim.api.nvim_create_autocmd({"BufLeave", "FocusLost", "InsertEnter", "WinLeave"}, {', type: 'command' });
        lines.push({ text: '  group = nt_group,', type: 'command' });
        lines.push({ text: '  callback = function()', type: 'command' });
        lines.push({ text: '    if vim.opt.number:get() then vim.opt.relativenumber = false end', type: 'command' });
        lines.push({ text: '  end', type: 'command' });
        lines.push({ text: '})', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // Prose Wrap Lines
      if (settings.wrapLines) {
        lines.push({ text: '-- --- Prose Wrap Configurations ---', type: 'heading' });
        lines.push({ text: 'vim.opt.wrap = true                 -- Enable soft word wrapping', type: 'command' });
        lines.push({ text: 'vim.opt.linebreak = true            -- Break lines at word boundaries', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      const triggers: string[] = [];
      if (settings.mapLeader) {
        triggers.push(`vim.g.mapleader = "${settings.mapLeader}"            -- Fast actions leader`);
      }
      if (settings.mapEscJk) {
        triggers.push('vim.keymap.set("i", "jk", "<Esc>")        -- Quick Escape mapped to [jk]');
      }
      if (settings.mapQuickSave) {
        triggers.push('vim.keymap.set("n", "<leader>w", ":w<CR>") -- Quick save buffer (Leader + w)');
      }
      if (settings.mapClearHighlight) {
        triggers.push('vim.keymap.set("n", "<leader>h", ":nohlsearch<CR>") -- Clear highlight (Leader + h)');
      }
      if (settings.mapWindowNav) {
        triggers.push('vim.keymap.set("n", "<C-h>", "<C-w>h")   -- Navigate to Left split');
        triggers.push('vim.keymap.set("n", "<C-j>", "<C-w>j")   -- Navigate to Lower split');
        triggers.push('vim.keymap.set("n", "<C-k>", "<C-w>k")   -- Navigate to Upper split');
        triggers.push('vim.keymap.set("n", "<C-l>", "<C-w>l")   -- Navigate to Right split');
      }
      if (settings.mapRelativeToggle) {
        triggers.push('vim.keymap.set("n", "<leader>n", ":setlocal relativenumber!<CR>") -- Toggle relative numbers');
      }

      if (triggers.length > 0) {
        lines.push({ text: '-- --- Handy Efficiency Keybindings ---', type: 'heading' });
        triggers.forEach(tr => {
          lines.push({ text: tr, type: 'command' });
        });
        lines.push({ text: '', type: 'blank' });
      }

      // Disable Arrow Keys (Tutor preset)
      if (settings.disableArrows) {
        lines.push({ text: '-- --- Muscle Memory: Disable Arrow Keys ---', type: 'heading' });
        lines.push({ text: 'vim.keymap.set({"n", "v"}, "<Up>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set({"n", "v"}, "<Down>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set({"n", "v"}, "<Left>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set({"n", "v"}, "<Right>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set("i", "<Up>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set("i", "<Down>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set("i", "<Left>", "<Nop>")', type: 'command' });
        lines.push({ text: 'vim.keymap.set("i", "<Right>", "<Nop>")', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // Compile and run C++/Python on F5 (Competitive Preset)
      if (settings.compileOnF5) {
        lines.push({ text: '-- --- Compile & Run Mappings (F5) ---', type: 'heading' });
        lines.push({ text: 'vim.api.nvim_create_autocmd("FileType", {', type: 'command' });
        lines.push({ text: '  pattern = "cpp",', type: 'command' });
        lines.push({ text: '  callback = function()', type: 'command' });
        lines.push({ text: '    vim.keymap.set("n", "<F5>", ":w<CR>:!g++ -std=c++17 -O2 % -o %:r && ./%:r<CR>", {buffer = true})', type: 'command' });
        lines.push({ text: '  end', type: 'command' });
        lines.push({ text: '})', type: 'command' });
        lines.push({ text: 'vim.api.nvim_create_autocmd("FileType", {', type: 'command' });
        lines.push({ text: '  pattern = "python",', type: 'command' });
        lines.push({ text: '  callback = function()', type: 'command' });
        lines.push({ text: '    vim.keymap.set("n", "<F5>", ":w<CR>:!python3 %<CR>", {buffer = true})', type: 'command' });
        lines.push({ text: '  end', type: 'command' });
        lines.push({ text: '})', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // lazy.nvim bootstrapping block
      if (settings.enableLazyNvim) {
        lines.push({ text: '-- --- Plugin Management (lazy.nvim bootstrapping) ---', type: 'heading' });
        lines.push({ text: 'local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"', type: 'command' });
        lines.push({ text: 'if not vim.loop.fs_stat(lazypath) then', type: 'command' });
        lines.push({ text: '  vim.fn.system({', type: 'command' });
        lines.push({ text: '    "git",', type: 'command' });
        lines.push({ text: '    "clone",', type: 'command' });
        lines.push({ text: '    "--filter=blob:none",', type: 'command' });
        lines.push({ text: '    "https://github.com/folke/lazy.nvim.git",', type: 'command' });
        lines.push({ text: '    "--branch=stable",', type: 'command' });
        lines.push({ text: '    lazypath,', type: 'command' });
        lines.push({ text: '  })', type: 'command' });
        lines.push({ text: 'end', type: 'command' });
        lines.push({ text: 'vim.opt.rtp:prepend(lazypath)', type: 'command' });
        lines.push({ text: '', type: 'blank' });

        lines.push({ text: 'require("lazy").setup({', type: 'command' });
        if (settings.installTelescope) {
          lines.push({ text: '  { "nvim-telescope/telescope.nvim", dependencies = { "nvim-lua/plenary.nvim" } },', type: 'command' });
        }
        if (settings.installTreesitter) {
          lines.push({ text: '  { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },', type: 'command' });
        }
        if (settings.installLspZero) {
          lines.push({ text: '  {', type: 'command' });
          lines.push({ text: '    "VonHeikemen/lsp-zero.nvim",', type: 'command' });
          lines.push({ text: '    branch = "v3.x",', type: 'command' });
          lines.push({ text: '    dependencies = {', type: 'command' });
          lines.push({ text: '      {"neovim/nvim-lspconfig"},', type: 'command' });
          lines.push({ text: '      {"williamboman/mason.nvim"},', type: 'command' });
          lines.push({ text: '      {"williamboman/mason-lspconfig.nvim"},', type: 'command' });
          lines.push({ text: '      {"hrsh7th/nvim-cmp"},', type: 'command' });
          lines.push({ text: '      {"hrsh7th/cmp-nvim-lsp"},', type: 'command' });
          lines.push({ text: '      {"L3MON4D3/LuaSnip"},', type: 'command' });
          lines.push({ text: '    }', type: 'command' });
          lines.push({ text: '  },', type: 'command' });
        }
        if (settings.installNeoTree) {
          lines.push({ text: '  { "nvim-neo-tree/neo-tree.nvim", dependencies = { "nvim-lua/plenary.nvim", "nvim-tree/nvim-web-devicons", "MunifTanjim/nui.nvim" } },', type: 'command' });
        }
        if (settings.installGitsigns) {
          lines.push({ text: '  { "lewis6991/gitsigns.nvim" },', type: 'command' });
        }
        lines.push({ text: '})', type: 'command' });
        lines.push({ text: '', type: 'blank' });

        if (settings.installLspZero) {
          lines.push({ text: '-- Configure LSP-Zero & Mason integrations', type: 'comment' });
          lines.push({ text: 'local lsp_zero = require("lsp-zero")', type: 'command' });
          lines.push({ text: 'lsp_zero.on_attach(function(client, bufnr)', type: 'command' });
          lines.push({ text: '  lsp_zero.default_keymaps({buffer = bufnr})', type: 'command' });
          lines.push({ text: 'end)', type: 'command' });
          lines.push({ text: '', type: 'blank' });
          lines.push({ text: 'require("mason").setup({})', type: 'command' });
          lines.push({ text: 'require("mason-lspconfig").setup({', type: 'command' });
          lines.push({ text: '  ensure_installed = {"ts_ls", "html", "cssls"},', type: 'command' });
          lines.push({ text: '  handlers = {', type: 'command' });
          lines.push({ text: '    lsp_zero.default_setup,', type: 'command' });
          lines.push({ text: '  },', type: 'command' });
          lines.push({ text: '})', type: 'command' });
        }
      }
    } else {
      // --- General Settings in Vimscript ---
      lines.push({ text: '" --- General / Environment Settings ---', type: 'heading' });
      if (settings.syntaxOn) {
        lines.push({ text: 'syntax on                       " Enable code syntax highlighting', type: 'command' });
      }
      if (settings.filetypeOn) {
        lines.push({ text: 'filetype plugin indent on       " Detect filetypes, load plugins & indention rules', type: 'command' });
      }
      if (settings.number) {
        lines.push({ text: 'set number                      " Display line numbers on screen margin', type: 'command' });
      }
      if (settings.relativenumber) {
        lines.push({ text: 'set relativenumber              " Relative line numbering (magnificent for macro jumps)', type: 'command' });
      }
      if (settings.mouse) {
        lines.push({ text: `set mouse=${settings.mouse}                    " Mouse support enabled in modes (${settings.mouse})`, type: 'command' });
      }
      if (settings.clipboard) {
        lines.push({ text: 'set clipboard=unnamedplus       " Share clipboard contents with global system OS', type: 'command' });
      }
      if (settings.hidden) {
        lines.push({ text: 'set hidden                      " Switch open files (buffers) without saving first', type: 'command' });
      }
      if (settings.backspace) {
        lines.push({ text: 'set backspace=indent,eol,start  " Configure backspace to skip normal block limits', type: 'command' });
      }
      if (settings.historyLimit !== 100) {
        lines.push({ text: `set history=${settings.historyLimit}                 " Set history limits to ${settings.historyLimit} cache points`, type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      // --- Tabs, Layout & Indentation ---
      lines.push({ text: '" --- Tabs, Layout & Indentation ---', type: 'heading' });
      lines.push({ text: `set tabstop=${settings.tabstop}                    " Displayed width of a tab character`, type: 'command' });
      lines.push({ text: `set shiftwidth=${settings.shiftwidth}                 " Depth width step of autoindentation alignments`, type: 'command' });
      if (settings.expandtab) {
        lines.push({ text: 'set expandtab                   " Automatically convert tabs into spaces on save', type: 'command' });
      } else {
        lines.push({ text: 'set noexpandtab                 " Maintain actual physical tabs', type: 'command' });
      }
      if (settings.autoindent) {
        lines.push({ text: 'set autoindent                  " Retain formatting indentation level on new lines', type: 'command' });
      }
      if (settings.smartindent) {
        lines.push({ text: 'set smartindent                 " Trigger language-specific context auto-indent level', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      // --- Searching ---
      lines.push({ text: '" --- High-Efficiency Searching ---', type: 'heading' });
      if (settings.hlsearch) {
        lines.push({ text: 'set hlsearch                    " Keep active matching patterns highlighted', type: 'command' });
      } else {
        lines.push({ text: 'set nohlsearch                  " Turn off persistent matched highlights', type: 'command' });
      }
      if (settings.incsearch) {
        lines.push({ text: 'set incsearch                   " Preview search target increments as typed', type: 'command' });
      }
      if (settings.ignorecase) {
        lines.push({ text: 'set ignorecase                  " Make search patterns ignore lowercase rules', type: 'command' });
      }
      if (settings.smartcase) {
        lines.push({ text: 'set smartcase                   " Respect casing rules whenever caps are entered', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      // --- UI & Windows ---
      lines.push({ text: '" --- Graphic User Interface & Windows ---', type: 'heading' });
      if (settings.termguicolors) {
        lines.push({ text: 'set termguicolors               " Enable true terminal guicolors RGB maps', type: 'command' });
      }
      if (settings.cursorline) {
        lines.push({ text: 'set cursorline                  " Highlight screen row representing current cursor', type: 'command' });
      }
      if (settings.showcmd) {
        lines.push({ text: 'set showcmd                     " Render partial status parameters in command footer', type: 'command' });
      }
      if (settings.showmode) {
        lines.push({ text: 'set showmode                    " Display text status mode indicators at bottom', type: 'command' });
      } else {
        lines.push({ text: 'set noshowmode                  " Defer text status mode displays (airline alternative)', type: 'command' });
      }
      if (settings.wildmenu) {
        lines.push({ text: 'set wildmenu                    " Enhance command-line complete interactive menus', type: 'command' });
      }
      if (settings.signcolumn) {
        lines.push({ text: 'set signcolumn=yes              " Always display sign sidebar (zero layout flashing)', type: 'command' });
      }
      if (settings.lazyredraw) {
        lines.push({ text: 'set lazyredraw                  " Freeze redrawing arrays inside running macro speedups', type: 'command' });
      }
      if (settings.splitright) {
        lines.push({ text: 'set splitright                  " Open fresh vertical window tiles directly to the right', type: 'command' });
      }
      if (settings.splitbelow) {
        lines.push({ text: 'set splitbelow                  " Launch horizontal split window pane blocks underneath', type: 'command' });
      }

      // New Advanced UI options in Vimscript
      if (settings.cmdheight0) {
        lines.push({ text: 'set cmdheight=0                 " Hide command footer when inactive', type: 'command' });
      }
      if (settings.foldcolumn) {
        lines.push({ text: 'set foldcolumn=1                " Enable visual fold margin column', type: 'command' });
      }
      if (settings.cursorcolumn) {
        lines.push({ text: 'set cursorcolumn                " Highlight vertical column representing cursor', type: 'command' });
      }
      if (settings.spell) {
        lines.push({ text: 'set spell                       " Enable spell check highlights', type: 'command' });
      }
      if (settings.virtualeditBlock) {
        lines.push({ text: 'set virtualedit=block           " Cursor past end-of-line in Visual Block mode', type: 'command' });
      }
      lines.push({ text: '', type: 'blank' });

      // Smart Hybrid Number toggle in Vimscript
      if (settings.numbertoggle) {
        lines.push({ text: '" --- Smart Hybrid Number Toggle ---', type: 'heading' });
        lines.push({ text: 'augroup numbertoggle', type: 'command' });
        lines.push({ text: '  autocmd!', type: 'command' });
        lines.push({ text: '  autocmd BufEnter,FocusGained,InsertLeave,WinEnter * if &nu && mode() != "i" | set rnu | endif', type: 'command' });
        lines.push({ text: '  autocmd BufLeave,FocusLost,InsertEnter,WinLeave   * if &nu | set nornu | endif', type: 'command' });
        lines.push({ text: 'augroup END', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // Prose Wrap Lines in Vimscript
      if (settings.wrapLines) {
        lines.push({ text: '" --- Prose Wrap Configurations ---', type: 'heading' });
        lines.push({ text: 'set wrap                        " Enable soft line wrapping', type: 'command' });
        lines.push({ text: 'set linebreak                   " Break lines at word boundaries', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // Custom Triggers block
      const triggers: string[] = [];
      if (settings.mapLeader) {
        if (settings.mapLeader === ' ') {
          triggers.push('let mapleader = " "             " Fast actions leader configured to [Spacebar]');
        } else {
          triggers.push(`let mapleader = "${settings.mapLeader}"             " Fast actions leader configured to [${settings.mapLeader}]`);
        }
      }
      if (settings.mapEscJk) {
        triggers.push('inoremap jk <Esc>               " Enter insert mode escaping quickly with [jk]');
      }
      if (settings.mapQuickSave) {
        triggers.push('nnoremap <leader>w :w<CR>       " Quick save workspace trigger (Leader + w)');
      }
      if (settings.mapClearHighlight) {
        triggers.push('nnoremap <leader>h :nohlsearch<CR> " Disable current active search highlights (Leader + h)');
      }
      if (settings.mapWindowNav) {
        triggers.push('nnoremap <C-h> <C-w>h           " Switch directly to Left pane window (Ctrl + h)');
        triggers.push('nnoremap <C-j> <C-w>j           " Switch directly to Lower pane window (Ctrl + j)');
        triggers.push('nnoremap <C-k> <C-w>k           " Switch directly to Upper pane window (Ctrl + k)');
        triggers.push('nnoremap <C-l> <C-w>l           " Switch directly to Right pane window (Ctrl + l)');
      }
      if (settings.mapRelativeToggle) {
        triggers.push('nnoremap <leader>n :set local relativenumber!<CR> " Toggle numbers relative on-the-fly (Leader + n)');
      }

      if (triggers.length > 0) {
        lines.push({ text: '" --- Handy Efficiency Keybindings ---', type: 'heading' });
        triggers.forEach(tr => {
          lines.push({ text: tr, type: 'command' });
        });
        lines.push({ text: '', type: 'blank' });
      }

      // Disable Arrow Keys (Tutor preset)
      if (settings.disableArrows) {
        lines.push({ text: '" --- Muscle Memory: Disable Arrow Keys ---', type: 'heading' });
        lines.push({ text: 'noremap <Up> <Nop>', type: 'command' });
        lines.push({ text: 'noremap <Down> <Nop>', type: 'command' });
        lines.push({ text: 'noremap <Left> <Nop>', type: 'command' });
        lines.push({ text: 'noremap <Right> <Nop>', type: 'command' });
        lines.push({ text: 'inoremap <Up> <Nop>', type: 'command' });
        lines.push({ text: 'inoremap <Down> <Nop>', type: 'command' });
        lines.push({ text: 'inoremap <Left> <Nop>', type: 'command' });
        lines.push({ text: 'inoremap <Right> <Nop>', type: 'command' });
        lines.push({ text: '', type: 'blank' });
      }

      // Compile C++/Python on F5 (Competitive Preset)
      if (settings.compileOnF5) {
        lines.push({ text: '" --- Compile & Run Mappings (F5) ---', type: 'heading' });
        lines.push('autocmd FileType cpp nnoremap <buffer> <F5> :w <bar> !g++ -std=c++17 -O2 % -o %:r && ./%:r<CR>'.split('\n').map(l => ({ text: l, type: 'command' as const }))[0]);
        lines.push('autocmd FileType python nnoremap <buffer> <F5> :w <bar> !python3 %<CR>'.split('\n').map(l => ({ text: l, type: 'command' as const }))[0]);
        lines.push({ text: '', type: 'blank' });
      }
    }

    return lines;
  }, [settings, configFormat]);

  const rawVimrcString = useMemo(() => {
    return formattedVimrc.map(l => l.text).join('\n');
  }, [formattedVimrc]);

  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawVimrcString)
      .then(() => {
        setCopied(true);
        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }
        copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy configuration to clipboard: ', err));
  };

  const downloadVimrc = () => {
    const element = document.createElement("a");
    const file = new Blob([rawVimrcString], {type: 'text/plain'});
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = configFormat === 'lua' ? "init.lua" : ".vimrc";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="no-drag w-full h-full flex flex-col gap-6" id="vimrc-configurator-tab">
      
      {/* Upper Descriptive Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-az-border-subtle pb-4 gap-4">
        <div>
          <h2 className="text-base font-bold font-mono tracking-tight text-az-text-heading flex items-center gap-2">
            <Sliders className="w-4 h-4 text-az-active" />
            Vim Configuration Generator
          </h2>
          <p className="text-xs text-az-text-muted mt-1 max-w-2xl font-sans leading-relaxed">
            Fine-tune your terminal environment. Select presets for coding, competitive programing, prose writing, or motion tutoring, and export as classic Vimscript <code className="px-1 py-0.5 rounded bg-az-bg-embedded font-mono text-az-active font-bold">.vimrc</code> or modern Neovim <code className="px-1 py-0.5 rounded bg-az-bg-embedded font-mono text-az-active font-bold">init.lua</code>.
          </p>
        </div>

        {/* Profile preset select buttons */}
        <div className="flex items-center gap-1 bg-az-bg-embedded p-1 rounded-lg border border-az-border-subtle w-fit shrink-0">
          <span className="text-[10px] font-mono font-bold text-az-text-faint px-2 uppercase tracking-wide hidden lg:inline">Presets:</span>
          {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((presetKey) => (
            <button
              key={presetKey}
              onClick={() => applyPreset(presetKey)}
              className={`relative px-2.5 py-1.5 rounded-md text-[10px] font-mono font-bold transition-colors cursor-pointer z-10 ${
                activePreset === presetKey 
                  ? 'text-az-text-heading' 
                  : 'text-az-text-muted hover:text-az-text-heading'
              }`}
              title={PRESETS[presetKey].name}
            >
              {activePreset === presetKey && (
                <motion.div
                  layoutId="activePresetBg"
                  className="absolute inset-0 bg-az-active/20 rounded-md -z-10 border border-az-active/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              {presetKey.toUpperCase()}
            </button>
          ))}
          {activePreset === 'custom' && (
            <span className="px-2.5 py-1 text-[10.5px] font-mono font-bold text-az-warning flex items-center gap-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-az-warning animate-pulse" /> Custom
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Controls Left, Live Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
        
        {/* Left Column (Options List) */}
        <div className="lg:col-span-7 space-y-5 h-full max-h-[640px] overflow-y-auto pr-1">
          
          {/* Preset details info block if standard selected */}
          {activePreset !== 'custom' && (
            <div className="bg-az-active/5 border border-az-active/15 p-3 rounded-lg flex items-start gap-2.5">
              <Info className="w-4 h-4 text-az-active mt-0.5 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-az-text-heading uppercase tracking-wide">
                  Active Preset: {PRESETS[activePreset as keyof typeof PRESETS].name}
                </span>
                <p className="text-az-text-muted mt-0.5 leading-relaxed font-sans">
                  {PRESETS[activePreset as keyof typeof PRESETS].desc}
                </p>
              </div>
            </div>
          )}

          {/* Section 1: Margin Display */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              MARGIN DISPLAY & LINE NUMBERS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => handleToggle('number')}
                className="flex items-start justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
              >
                <div className="flex-1 pr-3">
                  <span className="text-xs font-bold block text-az-text-heading">Absolute Line Numbers</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans font-sans">
                    Enable margin lines numbering (<code className="font-mono text-az-active">number</code>).
                  </span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.number}
                  aria-label="Absolute Line Numbers"
                  onClick={(e) => { e.stopPropagation(); handleToggle('number'); }}
                  className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer"
                >
                  {settings.number ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('relativenumber')}
                className="flex items-start justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
              >
                <div className="flex-1 pr-3">
                  <span className="text-xs font-bold text-az-text-heading flex items-center gap-1.5 font-sans">
                    Relative Numbers
                    <span className="px-1 rounded bg-az-danger/10 text-az-danger text-[8px] font-mono">Expert</span>
                  </span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">
                    Number rows relative to cursor (<code className="font-mono text-az-active">relativenumber</code>).
                  </span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.relativenumber}
                  aria-label="Relative Numbers"
                  onClick={(e) => { e.stopPropagation(); handleToggle('relativenumber'); }}
                  className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer"
                >
                  {settings.relativenumber ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('cursorline')}
                className="flex items-start justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
              >
                <div className="flex-1 pr-3">
                  <span className="text-xs font-bold block text-az-text-heading">Cursor Line Highlight</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">
                    Draws a subtle highlight on current row (<code className="font-mono text-az-active">cursorline</code>).
                  </span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.cursorline}
                  aria-label="Cursor Line Highlight"
                  onClick={(e) => { e.stopPropagation(); handleToggle('cursorline'); }}
                  className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer"
                >
                  {settings.cursorline ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('signcolumn')}
                className="flex items-start justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
              >
                <div className="flex-1 pr-3">
                  <span className="text-xs font-bold block text-az-text-heading">Lock Sign Column open</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">
                    Avoids layout shifts during diagnostics checks (<code className="font-mono text-az-active">signcolumn=yes</code>).
                  </span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.signcolumn}
                  aria-label="Lock Sign Column open"
                  onClick={(e) => { e.stopPropagation(); handleToggle('signcolumn'); }}
                  className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer"
                >
                  {settings.signcolumn ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Indentation */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              TABSTOPS & AUTOMATIC INDENTATION
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-sans">
                    <span className="font-bold text-az-text-heading">Tab Stop Size</span>
                    <span className="font-mono font-bold text-az-active bg-az-bg-embedded px-1.5 py-0.5 rounded text-[10px]">
                      {settings.tabstop} Spaces
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="2"
                    value={settings.tabstop}
                    onChange={(e) => handleChangeSelect('tabstop', parseInt(e.target.value))}
                    className="w-full h-1 bg-az-bg-embedded rounded-lg appearance-none cursor-pointer accent-[#ceda4a]"
                  />
                  <span className="text-[9px] text-az-text-muted block mt-1">Width of typed tab (<code className="font-mono">tabstop</code>)</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-sans">
                    <span className="font-bold text-az-text-heading">Shift Width Depth</span>
                    <span className="font-mono font-bold text-az-active bg-az-bg-embedded px-1.5 py-0.5 rounded text-[10px]">
                      {settings.shiftwidth} Spaces
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="2"
                    value={settings.shiftwidth}
                    onChange={(e) => handleChangeSelect('shiftwidth', parseInt(e.target.value))}
                    className="w-full h-1 bg-az-bg-embedded rounded-lg appearance-none cursor-pointer accent-[#ceda4a]"
                  />
                  <span className="text-[9px] text-az-text-muted block mt-1">Autoindent step depth (<code className="font-mono">shiftwidth</code>)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div 
                  onClick={() => handleToggle('expandtab')}
                  className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                    settings.expandtab 
                      ? 'border-az-active/40 bg-az-active/5 text-az-active font-bold' 
                      : 'border-az-border-subtle text-az-text-muted hover:bg-az-bg-canvas'
                  }`}
                >
                  <span className="text-xs block font-sans">Soft Tabs (Spaces)</span>
                  <span className="text-[8.5px] opacity-80 mt-0.5 block font-mono">expandtab</span>
                </div>

                <div 
                  onClick={() => handleToggle('autoindent')}
                  className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                    settings.autoindent 
                      ? 'border-az-active/40 bg-az-active/5 text-az-active font-bold' 
                      : 'border-az-border-subtle text-az-text-muted hover:bg-az-bg-canvas'
                  }`}
                >
                  <span className="text-xs block font-sans">Standard AutoIndent</span>
                  <span className="text-[8.5px] opacity-80 mt-0.5 block font-mono">autoindent</span>
                </div>

                <div 
                  onClick={() => handleToggle('smartindent')}
                  className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                    settings.smartindent 
                      ? 'border-az-active/40 bg-az-active/5 text-az-active font-bold' 
                      : 'border-az-border-subtle text-az-text-muted hover:bg-az-bg-canvas'
                  }`}
                >
                  <span className="text-xs block font-sans">Smart/Coding Indent</span>
                  <span className="text-[8.5px] opacity-80 mt-0.5 block font-mono">smartindent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Search */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              INTELLIGENT SEARCH BEHAVIORS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div 
                onClick={() => handleToggle('ignorecase')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-az-border-subtle bg-az-bg-embedded cursor-pointer hover:border-az-active/30 transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-az-text-heading">Ignore Search Case</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">Matches regardless of spelling case (<code className="font-mono text-az-active">ignorecase</code>).</span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.ignorecase}
                  aria-label="Ignore Search Case"
                  onClick={(e) => { e.stopPropagation(); handleToggle('ignorecase'); }}
                  className="text-az-text-muted group-hover:text-az-active transition-colors cursor-pointer"
                >
                  {settings.ignorecase ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('smartcase')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-az-border-subtle bg-az-bg-embedded cursor-pointer hover:border-az-active/30 transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-az-text-heading">Smart Case Override</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">Overrides ignorecase if capitals are explicitly typed (<code className="font-mono text-az-active">smartcase</code>).</span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.smartcase}
                  aria-label="Smart Case Override"
                  onClick={(e) => { e.stopPropagation(); handleToggle('smartcase'); }}
                  className="text-az-text-muted group-hover:text-az-active transition-colors cursor-pointer"
                >
                  {settings.smartcase ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('hlsearch')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-az-border-subtle bg-az-bg-embedded cursor-pointer hover:border-az-active/30 transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-az-text-heading">Continuous Highlight</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">Maintains highlights on all pattern occurrences (<code className="font-mono text-az-active">hlsearch</code>).</span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.hlsearch}
                  aria-label="Continuous Highlight"
                  onClick={(e) => { e.stopPropagation(); handleToggle('hlsearch'); }}
                  className="text-az-text-muted group-hover:text-az-active transition-colors cursor-pointer"
                >
                  {settings.hlsearch ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>

              <div 
                onClick={() => handleToggle('incsearch')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-az-border-subtle bg-az-bg-embedded cursor-pointer hover:border-az-active/30 transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-az-text-heading">Incremental Search</span>
                  <span className="text-[10px] text-az-text-muted mt-0.5 block font-sans">Searches ahead and highlights as letters are typed (<code className="font-mono text-az-active">incsearch</code>).</span>
                </div>
                <button 
                  role="switch"
                  aria-checked={settings.incsearch}
                  aria-label="Incremental Search"
                  onClick={(e) => { e.stopPropagation(); handleToggle('incsearch'); }}
                  className="text-az-text-muted group-hover:text-az-active transition-colors cursor-pointer"
                >
                  {settings.incsearch ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Mappings */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5 font-sans">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              INTELLIGENT INTEGRATIVE KEYBINDINGS
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-az-bg-embedded border border-az-border-subtle">
                <div className="text-xs">
                  <span className="font-bold text-az-text-heading block">Universal Leader Key</span>
                  <span className="text-[10px] text-az-text-muted block">Prefix key for launching fast command macros (<code className="font-mono text-az-active">mapleader</code>)</span>
                </div>
                <select
                  value={settings.mapLeader}
                  onChange={(e) => handleChangeSelect('mapLeader', e.target.value)}
                  className="bg-az-bg-workarea text-az-text-primary border border-az-border-subtle rounded px-2.5 py-1 text-xs font-mono font-bold outline-none cursor-pointer"
                >
                  <option value=" ">[Spacebar]</option>
                  <option value=",">Comma (,)</option>
                  <option value="\\">Backslash (\)</option>
                  <option value="">None / Default</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div 
                  onClick={() => handleToggle('mapQuickSave')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.mapQuickSave 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.mapQuickSave}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Quick Save Workspace</span>
                    <span className="font-mono text-[9px] text-az-active font-semibold block mt-1">
                      {configFormat === 'lua' ? 'vim.keymap.set("n", "<leader>w", ":w<CR>")' : 'nnoremap <leader>w :w<CR>'}
                    </span>
                    <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Save buffer instantly with <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded border border-az-border-subtle text-[9px]">Leader</kbd> + <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded border border-az-border-subtle font-mono text-[9px]">w</kbd>.</p>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('mapClearHighlight')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.mapClearHighlight 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.mapClearHighlight}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Clear Highlights Easily</span>
                    <span className="font-mono text-[9px] text-az-active font-semibold block mt-1">
                      {configFormat === 'lua' ? 'vim.keymap.set("n", "<leader>h", ":nohlsearch<CR>")' : 'nnoremap <leader>h :nohlsearch<CR>'}
                    </span>
                    <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Clear search highlights quickly using <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded border border-az-border-subtle text-[9px]">Leader</kbd> + <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded border border-az-border-subtle font-mono text-[9px]">h</kbd>.</p>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('mapEscJk')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.mapEscJk 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.mapEscJk}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Rapid Escape Trigger (<kbd className="font-mono">jk</kbd>)</span>
                    <span className="font-mono text-[9px] text-az-active font-semibold block mt-1">
                      {configFormat === 'lua' ? 'vim.keymap.set("i", "jk", "<Esc>")' : 'inoremap jk <Esc>'}
                    </span>
                    <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Escape Insert mode swiftly. Simply type <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded text-[9.5px] font-bold font-mono">jk</kbd> together.</p>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('mapWindowNav')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.mapWindowNav 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.mapWindowNav}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Seamless Pane Navigation</span>
                    <span className="font-mono text-[9px] text-az-active font-semibold block mt-1">
                      {configFormat === 'lua' ? 'vim.keymap.set("n", "<C-h>", "<C-w>h") ...' : 'nnoremap <C-h> <C-w>h ...'}
                    </span>
                    <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Navigate split panes using standard keys <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded text-[9px]">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded font-mono text-[9px]">h/j/k/l</kbd>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: lazy.nvim */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-az-border-subtle pb-1.5">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
                lazy.nvim plugin bootstrapper
              </h3>
              
              <button 
                role="switch"
                aria-checked={settings.enableLazyNvim}
                aria-label="lazy.nvim plugin bootstrapper"
                onClick={(e) => { e.stopPropagation(); handleToggle('enableLazyNvim'); }}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <span className="text-[10px] font-mono font-bold text-az-text-faint">BOOTSTRAP:</span>
                {settings.enableLazyNvim ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
              </button>
            </div>

            {settings.enableLazyNvim ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                <div 
                  onClick={() => handleToggle('installTelescope')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.installTelescope 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.installTelescope}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Telescope Finder</span>
                    <span className="text-[9.5px] text-az-text-muted mt-1 leading-relaxed block font-sans">
                      Fuzzy finder search file lists and patterns inside workspace.
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('installTreesitter')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.installTreesitter 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.installTreesitter}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Treesitter Parsers</span>
                    <span className="text-[9.5px] text-az-text-muted mt-1 leading-relaxed block font-sans">
                      Enhanced code AST syntax highlights for multiple major languages.
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('installLspZero')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.installLspZero 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.installLspZero}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">LSP Zero & Mason</span>
                    <span className="text-[9.5px] text-az-text-muted mt-1 leading-relaxed block font-sans">
                      Autocompletion registers, compiler diagnostics, and language servers.
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('installNeoTree')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.installNeoTree 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.installNeoTree}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Neo-Tree Explorer</span>
                    <span className="text-[9.5px] text-az-text-muted mt-1 leading-relaxed block font-sans">
                      Sidebar file system hierarchy and visual directory explorer.
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => handleToggle('installGitsigns')}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.installGitsigns 
                      ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                      : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={settings.installGitsigns}
                    onChange={() => {}}
                    className="mt-1 accent-[#ceda4a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold block text-az-text-heading">Gitsigns Gutter</span>
                    <span className="text-[9.5px] text-az-text-muted mt-1 leading-relaxed block font-sans">
                      Gutter diff indicators for active Git revisions.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs font-sans text-az-text-muted italic text-center py-4 bg-az-bg-embedded/30 border border-dashed border-az-border-subtle rounded-xl select-none">
                lazy.nvim plugin bootstrapper is disabled. Enable to inject package management templates into your init.lua.
              </p>
            )}
          </div>

          {/* Section 6: Advanced UI Tunings */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              ADVANCED UI TUNINGS
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => handleToggle('termguicolors')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">True RGB Color</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Enable 24-bit terminal colors (<code className="font-mono">termguicolors</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.termguicolors ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('clipboard')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">System Clipboard</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Share clipboard with OS (<code className="font-mono">clipboard=unnamedplus</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.clipboard ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('lazyredraw')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Lazy Redraw Speedup</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Freeze redrawing during macros (<code className="font-mono">lazyredraw</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.lazyredraw ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('hidden')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Unsaved Buffers Switch</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Change file buffers without saving (<code className="font-mono">hidden</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.hidden ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('cmdheight0')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Hide Command Line</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Hides bottom command row when inactive (<code className="font-mono">cmdheight=0</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.cmdheight0 ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('foldcolumn')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Code Fold Column</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Displays a folding margin column (<code className="font-mono">foldcolumn=1</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.foldcolumn ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('cursorcolumn')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Highlight Cursor Column</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Draws vertical guide column line (<code className="font-mono">cursorcolumn</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.cursorcolumn ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('spell')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Spell Checker</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Highlights dictionary misspelling errors (<code className="font-mono">spell</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.spell ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('numbertoggle')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Dynamic Hybrid Numbers</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Relative in Normal mode, absolute in Insert mode.</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.numbertoggle ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>

                <div 
                  onClick={() => handleToggle('virtualeditBlock')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-az-border-subtle bg-az-bg-embedded hover:border-az-active/30 transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <span className="text-xs font-bold block text-az-text-heading">Visual Block Virtual Edit</span>
                    <span className="text-[9px] text-az-text-muted mt-0.5 block font-sans">Cursor can move past line boundaries (<code className="font-mono">virtualedit=block</code>).</span>
                  </div>
                  <button className="shrink-0 mt-0.5 text-az-text-muted group-hover:text-az-text-heading cursor-pointer">
                    {settings.virtualeditBlock ? <ToggleRight className="w-7 h-7 text-az-active" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Preset Specific Extensions */}
          <div className="bg-az-bg-alt rounded-xl border border-az-border-subtle p-4 space-y-3.5 font-sans">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-az-text-heading border-b border-az-border-subtle pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-az-active" />
              SPECIALIZED WORKSPACE PLUG-AND-PLAY UTILITIES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div 
                onClick={() => handleToggle('disableArrows')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  settings.disableArrows 
                    ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                    : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={settings.disableArrows}
                  onChange={() => {}}
                  className="mt-1 accent-[#ceda4a] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold block text-az-text-heading">Disable Arrow Keys</span>
                  <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Map arrows to <code className="font-mono text-[9px]">&lt;Nop&gt;</code> to build pure muscle memory with `h/j/k/l` keys.</p>
                </div>
              </div>

              <div 
                onClick={() => handleToggle('compileOnF5')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  settings.compileOnF5 
                    ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                    : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={settings.compileOnF5}
                  onChange={() => {}}
                  className="mt-1 accent-[#ceda4a] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold block text-az-text-heading">Compile &amp; Run [F5]</span>
                  <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Adds auto-compilation and terminal execution mappings for C++ and Python on <kbd className="px-1 py-0.5 bg-az-bg-embedded rounded font-mono text-[9.5px]">F5</kbd>.</p>
                </div>
              </div>

              <div 
                onClick={() => handleToggle('wrapLines')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  settings.wrapLines 
                    ? 'border-az-active/30 bg-az-active/2 text-az-text-primary' 
                    : 'border-az-border-subtle text-az-text-muted opacity-75 hover:opacity-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={settings.wrapLines}
                  onChange={() => {}}
                  className="mt-1 accent-[#ceda4a] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold block text-az-text-heading">Enable Prose Line Wrap</span>
                  <p className="text-[10px] text-az-text-muted mt-1 leading-relaxed">Configures text wrapping and line breaking at word boundaries (<code className="font-mono">wrap</code> and <code className="font-mono">linebreak</code>).</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Preview Screen */}
        <div className="lg:col-span-5 flex flex-col h-full sticky top-0 bg-az-bg-alt rounded-xl p-4 border border-az-border-subtle max-h-[640px] shadow-sm gap-4">
          
          {/* Header block with buttons and format switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-az-border-subtle pb-3 gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-az-active rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-az-text-heading">Optimized File Preview</span>
            </div>

            {/* Format toggle */}
            <div className="flex bg-az-bg-embedded p-0.5 rounded border border-az-border-subtle text-[9px] font-mono select-none">
              <button
                onClick={() => setConfigFormat('vimscript')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  configFormat === 'vimscript' ? 'bg-az-active text-az-bg-canvas font-bold' : 'text-az-text-muted hover:text-az-text-heading'
                }`}
              >
                .vimrc
              </button>
              <button
                onClick={() => setConfigFormat('lua')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  configFormat === 'lua' ? 'bg-az-active text-az-bg-canvas font-bold' : 'text-az-text-muted hover:text-az-text-heading'
                }`}
              >
                init.lua
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className={`py-1.5 px-2.5 rounded-md text-[11px] font-bold font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                copied 
                  ? 'bg-az-active border-az-active text-az-bg-canvas shadow font-bold' 
                  : 'bg-az-bg-embedded border-az-border-subtle text-az-text-primary hover:bg-az-bg-canvas'
              }`}
              title="Copy config"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Config</span>
                </>
              )}
            </button>

            <button
              onClick={downloadVimrc}
              className="py-1.5 px-2.5 rounded-md text-[11px] font-bold font-mono border bg-az-active/10 border-az-active/35 hover:bg-az-active/20 text-az-active transition-all cursor-pointer flex items-center gap-1"
              title={`Download local file`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Preview window box mimicking high-end terminal editor */}
          <div className="bg-az-bg-embedded border border-az-border-subtle rounded-xl p-4 font-mono text-[10px] sm:text-[10.5px] leading-normal flex-1 overflow-y-auto h-[440px] text-az-text-primary shadow-inner select-text scrollbar-none">
            <div data-testid="vimrc-preview" className="space-y-0.5">
              {formattedVimrc.map((line, index) => {
                if (line.type === 'blank') {
                  return <div key={index} className="h-2 select-none" />;
                }
                
                const commentChar = configFormat === 'lua' ? '--' : '"';
                const commentIdx = line.text.indexOf(commentChar);
                const commandSegment = commentIdx !== -1 ? line.text.slice(0, commentIdx) : line.text;
                const commentSegment = commentIdx !== -1 ? line.text.slice(commentIdx) : '';

                if (line.type === 'comment' || line.type === 'heading') {
                  return (
                    <div key={index} className={`whitespace-pre truncate max-w-full italic text-az-text-faint ${line.type === 'heading' ? 'font-bold mt-2 text-az-text-heading' : ''}`}>
                      {line.text}
                    </div>
                  );
                }

                // Custom syntax highlight tokenizer display
                const cmdTokens = commandSegment.trim().split(' ');
                const isNnoremap = cmdTokens[0] === 'nnoremap' || cmdTokens[0] === 'inoremap' || cmdTokens[0] === 'noremap';
                const isSet = cmdTokens[0] === 'set';
                const isLet = cmdTokens[0] === 'let';
                const isLocal = cmdTokens[0] === 'local';
                const isAutocmd = cmdTokens[0] === 'autocmd' || cmdTokens[0] === 'augroup';

                return (
                  <div key={index} className="whitespace-pre truncate max-w-full">
                    <span>
                      {isSet && <span className="text-az-info font-bold">set </span>}
                      {isLet && <span className="text-az-warning font-bold">let </span>}
                      {isNnoremap && <span className="text-az-focus font-bold">{cmdTokens[0]} </span>}
                      {isLocal && <span className="text-az-warning font-bold">local </span>}
                      {isAutocmd && <span className="text-az-focus font-bold">{cmdTokens[0]} </span>}
                      
                      {cmdTokens.slice(isSet || isLet || isNnoremap || isLocal || isAutocmd ? 1 : 0).map((tok, ti) => {
                        if (tok.includes('=')) {
                          const eqParts = tok.split('=');
                          return (
                            <span key={ti}>
                              <span className="text-az-text-primary">{eqParts[0]}=</span>
                              <span className="text-az-warning font-semibold">{eqParts[1]} </span>
                            </span>
                          );
                        }
                        
                        if (tok.startsWith('vim.opt.') || tok.startsWith('vim.keymap.') || tok.startsWith('vim.g.') || tok.startsWith('vim.api.')) {
                          const dotParts = tok.split('.');
                          return (
                            <span key={ti}>
                              <span className="text-az-info font-bold">{dotParts[0]}.{dotParts[1]}.</span>
                              <span className="text-az-active font-semibold">{dotParts[2]} </span>
                            </span>
                          );
                        }

                        if (tok.startsWith('require(') || tok.startsWith('require')) {
                          return <span key={ti} className="text-az-info font-bold">{tok} </span>;
                        }
                        
                        if (isNnoremap || tok.includes('<') || tok === 'jk' || tok.includes(':') || tok.includes('"') || tok.includes("'")) {
                          return <span key={ti} className="text-az-active font-semibold">{tok} </span>;
                        }

                        if (tok === 'true' || tok === 'false') {
                          return <span key={ti} className="text-az-success font-semibold">{tok} </span>;
                        }

                        return <span key={ti} className="text-az-text-primary">{tok} </span>;
                      })}
                    </span>

                    {commentSegment && (
                      <span className="text-az-text-faint italic ml-1">
                        {commentSegment}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Info text block */}
          <div className="bg-az-bg-embedded border border-az-border-subtle p-3 rounded-lg text-[10.5px] text-az-text-muted leading-relaxed font-sans flex items-start gap-2 select-text">
            <Heart className="w-4 h-4 text-az-danger shrink-0 mt-0.5" />
            <p>
              <strong>Setup Instructions:</strong> Copy the text above, open <code className="font-mono text-[9px] bg-az-bg-workarea font-bold px-1 py-0.5 rounded text-az-active">{configFormat === 'lua' ? '~/.config/nvim/init.lua' : '~/.vimrc'}</code> in your terminal, paste the config, save, and exit. Your editor will adapt instantly!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
