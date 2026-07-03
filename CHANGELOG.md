# Changelog (modewerks)

> [!NOTE]
> Former working title: vim cheatsheet desklet

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-06-23

### Added
- **Expanded Command Database:** Added over 110 standard, custom, and plugin-specific commands/mappings to the cheatsheet database in `vimData.ts`:
  - **Standard Vim/Neovim Extensions:** Added sentence movements (`(`, `)`), unmatched block jumps (`[(`, `])`, `[{`, `]}`), viewport scrolling (`C-E`, `C-Y`), jump/change list history, spelling dictionary controls, split window resizing, tab moves, and multi-window Ex commands.
  - **Active Neovim Plugin Mappings:** Scanned active configuration files (`/home/blndsft/.config/nvim`) and integrated stubs/keymaps for `Comment.nvim` commenting, `obsidian.nvim` daily notes and link helpers, `gitsigns.nvim` visual text object (`ih`), `vim-fugitive` git diff tools, `aerial.nvim` structure outlines, `grug-far.nvim` help, `overseer.nvim` task controls, `conform.nvim` format info, `todo-comments.nvim` panel stubs, `which-key.nvim` guide, and `indent-blankline.nvim` guides.

## [0.3.4] - 2026-06-16

### Added
- **Full Neovim Oil Keymap Integration:** Checked the actual plugin configuration file `lua/plugins/oil.lua` and added all 31 keymaps and commands to `vimData.ts`, including help navigation (`g?`), split/tab shortcuts (`ov`, `oh`, `ot`, `op`), control commands (`<C-s>`, `<C-t>`, `<C-p>`, `<C-c>`, `<C-r>`), directory helpers (`h`, `-`, `_`, `` ` ``, `~`), and other buffer-local utilities.

## [0.3.3] - 2026-06-16

### Added
- **55 Neovim Plugin Keymaps:** Integrated a comprehensive collection of 55 missing plugin keymaps to align the desklet with Neovim's complete cheatsheet:
  - **Oil File Manager:** Mappings for file navigation, operations, splits, and previews (`-`, `<leader>e`, `<leader>E`, `Q`, `g.`, `gy`, `gY`, `oh`, `ot`, `op`).
  - **Telescope Search:** Full search utilities (`<leader>ff`, `<leader>fr`, `<leader>fg`, `<leader>fb`, `<leader>fh`, `<leader>fk`, `<leader>fc`, `<leader>fd`, `<leader>fs`, `<leader>fS`).
  - **Trouble & Diagnostics:** Diagnostics panels and outline toggles (`<leader>dd`, `<leader>xx`, `<leader>xX`, `<leader>xs`, `<leader>xl`, `<leader>xq`, `<leader>xL`, `<leader>xr`).
  - **Overseer Tasks:** Task template building, monitoring, and running (`<leader>or`, `<leader>ot`, `<leader>oo`, `<leader>oc`, `<leader>ob`, `<leader>oq`, `<leader>oi`).
  - **Grug Far Project Replace:** Bulk find and replace mappings (`<leader>rr`, `<leader>rw`, `<leader>rf`, `<leader>rv`).
  - **Todo Comments:** Marker navigation, search, and panel integration (`]t`, `[t`, `<leader>ft`, `<leader>tq`, `<leader>tx`).
  - **Aerial Outline & Mini Surround:** Navigation, structure outline sidebar toggles, and surround line count limit (`<leader>ao`, `<leader>aO`, `<leader>ac`, `<leader>an`, `gsn`).
  - **Obsidian Notes:** Optional Vault search, creation, and link utilities (`<leader>mN`, `<leader>mS`, `<leader>mQ`, `<leader>mB`, `<leader>mL`).
  - **Git Status:** Interactively open Git status panel (`<leader>gg`).

## [0.3.2] - 2026-06-16

### Fixed
- **WebKit Script Dialog Error:** Patched the python launcher signal handler for WebKit's `script-dialog` to call the correct `dialog.prompt_set_text(...)` API. This prevents a runtime python `AttributeError` on desklet startup, suppressing the default Gtk prompt dialog from showing "GET_LAYER" to the user.

## [0.3.1] - 2026-06-16

### Added
- **Complete Neovim AZWERKS Commands List:** Expanded the commands database in the companion desklet with 71 new and corrected `:Azwerks...` commands scanned directly from the user's active Neovim configuration.
- **Missing Tool Keymaps:** Added missing reference keymaps for LSP diagnostics (`gd`, `gD`, `<leader>lR`, etc.), Git integrations (`]h`, `[h`, `<leader>gs`, etc.), and Mini Surround (`gsa`, `gsd`, `gsr`, etc.).

### Changed
- **Branding-Aligned Theme Labels:** Revised settings panel labels from "Radium" and "Light" to "Radium Dark" and "Radium Light" to clearly align with brand standards.
- **Obsolete Commands Cleanup:** Removed obsolete commands like `:AzwerksToggleBackground` and `:AzwerksDiagnosticToggle` which do not exist in the Neovim configuration anymore, and corrected `:AzwerksHealthCheck` to `:AzwerksHealth`.

## [0.3.0] - 2026-06-13


### Added
- **Window Layer Control:** New three-button panel in Desklet Settings — Always Top (`set_keep_above`), Normal, and Background (`set_keep_below`, default). Layer choice is bridged from React to GTK via the existing `prompt()` script-dialog mechanism.
- **Full-Edge Window Resize:** The desklet window can now be resized by dragging any of the 8 edges or corners, not just the bottom-right handle. Edge detection runs via `motion-notify-event` on the WebView, changing the cursor to the appropriate resize arrow (e.g. `nw-resize`, `s-resize`) and calling `begin_resize_drag` on press.
- **Geometry + Layer Persistence:** Window position, size, and layer are automatically saved to `~/.config/az-vim-desklet.ini` after every move or resize (debounced 800 ms). On next launch, the window restores to its last position, size, and layer — no manual repositioning needed.
- **AZWERKS Radium Theming — Full Light Theme:** The `:root` (light mode) CSS variables are now fully canonical Radium v1.2 values (`sage-50` through `sage-800`, `radium-600` accent, `warning-600`, `danger-600`, `info-500`). Previously the light theme used Tailwind's generic slate/emerald/orange palette.
- **Dark Theme Persistence:** The dark/light theme choice now survives Cinnamon WebView restarts. Preference is stored in `localStorage` under key `az_theme` and defaults to `dark` (Radium) on first launch.

### Changed
- **Dark Class Applied to `<html>`:** Moved the `.dark` class from the inner root `<div>` to `document.documentElement` via a `useEffect`. This fixes Tailwind dark-variant utilities on the root element itself (self-targeting does not work with `@custom-variant dark (&:where(.dark, .dark *))`).
- **Version bump:** `0.2.0` → `0.3.0` across `metadata.json` (root and `cinnamon-desklet/`), titlebar display, and State Ledger boot message.
- **WebView background colour:** Updated from `#121214` to `#202521` (canonical `sage-900` / Radium background) to eliminate flash-of-wrong-colour on WebView load.

### Fixed
- **Off-palette colour residues eliminated:** All non-Radium Tailwind colour classes removed from components:
  - `VimrcConfigurator`: `text-cyan-600 dark:text-cyan-400` (`set` keyword) → `text-az-info`; `text-purple-400` (`nnoremap` keyword) → `text-az-focus`
  - `VimKeyboard`: `bg-purple-500/10 text-purple-400` (Expert difficulty badges) → `bg-az-info/10 text-az-info`
  - `VimTroubleshooting`: `bg-purple-500/10 border-purple-500/15` (Keymaps badge) → `bg-az-focus/10 border-az-focus/15`
- **`on_focus_out` layer enforcement:** GTK window manager resets stacking hints on focus change; the `focus-out-event` handler now re-applies `_apply_layer` to hold the user's chosen layer.

## [0.2.0] - 2026-06-12

### Added
- **Initial Public Release:** The ViM Interactive Cheatsheet Cinnamon Desklet is now publicly available.
- **Neovim & LSP Expansion:** Comprehensive command coverage for Neovim, including native LSP, Telescope pickers, and Treesitter bindings.
- **Offline Daily Tip Engine:** A 100% local, offline "Daily Vim Tip" generator featuring tiered difficulty categories (Beginner, Intermediate, Advanced).
- **Vimrc Configurator:** A visual GUI for seamlessly toggling preferences and generating `.vimrc` or `init.lua` settings directly from the desklet.
- **Interactive Sandbox:** An embedded sandbox to safely practice Vim motions and keyboard combinations.
- **Theming:** Full support for dynamic Light and Dark modes built with Tailwind CSS v4.
- **Licensing:** Added standard MIT License.

### Changed
- **Styling Optimization:** Upgraded the visual architecture to utilize modern Tailwind CSS v4 patterns, maximizing rendering performance within the WebKitGTK container.
- **Documentation:** Completely rewrote `README.md` to be GitHub-friendly, detailing the precise Vite + Cinnamon `INSTALL.sh` deployment pipeline.

### Removed
- **AI Dependencies Purged:** Completely stripped all `@google/genai` dependencies, `.env` handlers, and server-side Gemini AI references to guarantee a strictly offline, privacy-first experience.
- **Residual Artifacts:** Cleaned the repository of development-era video files and AI Studio configuration directories (`.aistudio`).

### Fixed
- **TypeScript Integrity:** Patched broken `VimMode` interfaces and resolved argument signature mismatches for the tip-fetching engine (`npm run lint` now returns zero errors).
- **CSS Linting:** Resolved all Tailwind arbitrary-value and conflicting-class IDE warnings.
