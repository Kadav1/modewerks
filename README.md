<div align="center">
  <h1>🟩 modewerks</h1>
  <p>modewerks is an offline Cinnamon desklet for Vim and Neovim command reference, mode-aware lookup, daily tips, sandbox practice, and configuration help.</p>

  <img src="https://img.shields.io/badge/Cinnamon-Desklet-teal?style=flat-square&logo=linuxmint" alt="Cinnamon Desklet" />
  <img src="https://img.shields.io/badge/Built_with-React-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Status-Offline_Ready-success?style=flat-square" alt="Offline Status" />
</div>

<br />

> [!NOTE]
> **Former working title**: vim cheatsheet desklet

## 📖 Overview

**modewerks** is an offline Cinnamon desklet for Vim and Neovim command reference, mode-aware lookup, daily tips, sandbox practice, and configuration help. Powered by WebKitGTK, it embeds an extensive, locally curated database of Vim and Neovim commands directly onto your desktop wallpaper.

Built for performance and utility, it serves as a local reference guide, sandbox, and command discovery tool—without relying on any external APIs or internet connectivity.

## ✨ Features

- **Comprehensive Command Database**: Catalog of **660+** core Vim commands, Neovim registers, and custom keymaps.
- **Neovim Plugin Integrations**: Command & keymap guides for popular plugins:
  - `Comment.nvim` (line/block commenting)
  - `obsidian.nvim` (daily notes, linking, checklist toggles)
  - `grug-far.nvim` (bulk find and replace)
  - `overseer.nvim` (task builder and monitor controls)
  - `conform.nvim` (formatting diagnostics)
  - `todo-comments.nvim` (workspace TODO lists)
  - `which-key.nvim` (visual key bindings guide)
  - `indent-blankline.nvim` (indentation guides)
- **Source & Profile Ledgers**: Filter commands dynamically by Source Register (Vim Core, Neovim, AZWERKS) and Profile Ledger (e.g., custom configuration profiles).
- **Diagnostics & Recovery Ledger**: Built-in interactive guides for workspace diagnostics (e.g., `:checkhealth`, keymap conflicts) and Vim/Neovim swap file crash recovery.
- **Markdown Table Export**: Generate and copy clean Markdown command lists directly to your system pasteboard with a single click.
- **Interactive Sandbox**: Practice your Vim motions and commands in a simulated editor sandbox before committing them to muscle memory.
- **Daily Vim Tip Generator**: Discover new workflows and command sequences every day through a tiered-difficulty local database.
- **Performant Rendering**: Engineered with `content-visibility` containment and list virtualization (`react-window`) to ensure smooth scrolling.
- **Dynamic Theming**: Light and Dark modes built with CSS variables to match your desktop workspace environment.

## 🚀 Installation (Linux Mint / Cinnamon)

The desklet comes with installation and packaging scripts to keep the production files lightweight.

### Prerequisites
- Node.js (v18 or higher recommended)
- Cinnamon Desktop Environment

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/modewerks.git
   cd modewerks
   ```

2. **Install JavaScript Dependencies:**
   ```bash
   npm install
   ```

3. **Build and Install Locally:**
   ```bash
   npm run build
   # Copy compiled assets directly to your Cinnamon desklets directory
   bash cinnamon-desklet/INSTALL.sh
   ```

4. **Package for Distribution (Clean ZIP):**
   To generate a distribution-ready `.zip` archive without `node_modules` or development clutter:
   ```bash
   npm run package
   ```
   This outputs a clean `modewerks@cinnamon.org.zip` file in the workspace root.

5. **Activate the Desklet:**
   - Right-click anywhere on your Linux Mint desktop wallpaper.
   - Select **"Add desklets"**.
   - Find **modewerks** in your installed list.
   - Click the **+** button to add it to your desktop.
   - Drag and drop it to your preferred location!

## ⚙️ Window Layers & Persistence Config

The desklet incorporates native window behavior controls and persistent state storage:
- **Dynamic Window Stacking Layers**: Toggle the desklet's stacking hierarchy between `Above` (floats above all other application viewports), `Normal` (standard window placement), and `Below` (stays pinned underneath other windows, functioning as active desktop wallpaper).
- **Persistent Geometry Settings**: Window coordinates (x, y), size dimensions (width, height), and the selected stacking layer are automatically saved to `~/.config/modewerks.ini` whenever repositioned or resized. The configuration file is read on startup to ensure layout consistency.

## 🛠️ Development

If you want to modify the desklet, add new commands, or tweak the UI, you can run the application in a standard web browser before deploying it to Cinnamon.

1. Start the Vite development server:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:3000`.

*Note: Whenever you make changes to the source code, you must re-run `npm run build && bash cinnamon-desklet/INSTALL.sh` to update the actual desklet running on your desktop.*

## 🏗️ Architecture

- **Frontend**: React 19, Motion (Framer Motion), Lucide React Icons.
- **Styling**: Vanilla CSS and Tailwind utility framework.
- **Build Tooling**: Vite & ESBuild.
- **Desklet Container**: Cinnamon Desklet API (WebKitGTK).
- **Data**: Stored completely locally in `src/data/vimData.ts`. No external API keys or internet connections are required.

## 🤝 Contributing

Contributions are welcome! If you have a Vim/Neovim workflow, macro, or tip, feel free to open a Pull Request modifying `src/data/vimData.ts` or `src/data/vimTips.ts`.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
