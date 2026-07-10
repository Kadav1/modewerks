# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**modewerks** (UUID `modewerks@cinnamon.org`) is an offline Cinnamon desklet for Vim/Neovim reference. The UI is a React 19 SPA rendered inside a WebKitGTK window that sits on the Linux Mint desktop wallpaper. Everything runs locally — there are no external APIs and no network dependency at runtime.

## Commands

```bash
npm run dev      # Dev/browser mode: express + Vite middleware on http://localhost:3000 (tsx server.ts)
npm run build    # vite build → dist/ AND esbuild-bundle server.ts → dist/server.cjs
npm run lint     # Type-check only (tsc --noEmit) — there is no ESLint
npm run test     # Run the full Vitest suite once
npm run package  # Build + produce clean modewerks@cinnamon.org.zip for distribution
```

- **Run one test file:** `npx vitest run src/utils/vimEngine.test.ts`
- **Watch a test:** `npx vitest src/utils/vimEngine.test.ts`
- **Install onto the live desktop:** `npm run build && bash cinnamon-desklet/INSTALL.sh` — copies the desklet wrapper + `dist/` into `~/.local/share/cinnamon/desklets/modewerks@cinnamon.org/`. Source edits are NOT live in the desklet until you rebuild and re-run INSTALL.sh.

## Architecture: three stacked layers

The desklet is not a normal web app. Understand the boundary between these layers before changing runtime/window behavior:

1. **React SPA** (`src/`) — built by Vite to `dist/`. Loaded by the desklet directly from disk as `file://.../dist/index.html`; `base: './'` in `vite.config.ts` makes asset paths relative so `file://` loading works. `src/data/vimData.ts` (the 660+ command catalog) is force-split into its own `vim-data` chunk via `manualChunks`.
2. **Python WebKitGTK launcher** (`cinnamon-desklet/desklet_webview.py`) — the actual window. Owns resize, drag, window stacking layer (above/normal/below), and geometry persistence to `~/.config/modewerks.ini`. Probes WebKit2 versions 4.1→6.0 and degrades to opening a browser tab if GTK/WebKit is missing.
3. **Cinnamon desklet shim** (`cinnamon-desklet/desklet.js`) — a near-invisible 1×1 St widget whose only job is to `spawn_async` the Python launcher and kill it on removal.

**React ↔ Python IPC** happens over WebKit script dialogs (`window.prompt(...)`): the React UI calls `prompt("DRAG_START")`, `"RESIZE_START"`, `"SET_LAYER:below"`, or `"GET_LAYER"`, and `_on_script_dialog` in the Python launcher handles them. This bridge is origin-gated — it only acts when the WebView URI is `file://` and contains `modewerks`. Any new native window feature must be wired on both sides of this prompt bridge.

**`server.ts` is only for dev/browser mode.** It serves the SPA via Vite middleware and exposes `GET /api/vim-tip`. In the packaged desklet (file:// origin) that endpoint is unreachable, so `DailyVimTip` must always keep a local fallback — never make a feature depend on the server being up.

## State & persistence

- **App/UI state** (theme, sandbox mastery progress, tip dismissal) lives in `localStorage`, read lazily inside `useState` initializers in `src/App.tsx`. Default theme is dark ("Radium").
- **Window state** (x/y/w/h + stacking layer) lives in `~/.config/modewerks.ini`, written debounced (800 ms) by the Python launcher.
- `handleReset` in `App.tsx` is the single reset path — extend it when you add persisted UI state.

## Styling

Tailwind CSS v4 configured entirely in `src/index.css` via `@theme` (no `tailwind.config.js`). Colors are the AZWERKS "Radium" palette exposed as `az-*` utility tokens (e.g. `bg-az-bg-workarea`, `text-az-active`) backed by CSS variables. Dark mode is a custom variant driven by a `.dark` class toggled on `<html>` (not the root div — self-targeting doesn't work). Use the `az-*` tokens rather than raw hex or default Tailwind colors.

## Conventions

- TypeScript is strict; `@/*` aliases `./src/*`. Domain types (`VimCommand`, `KeyboardKey`, `VimTip`, `VimMode`) live in `src/types.ts` — reuse them.
- Sandbox cursor/buffer math is isolated as pure functions in `src/utils/vimEngine.ts` specifically so it can be unit-tested; keep new editor logic there rather than inside `VimSandbox.tsx`.
- The five UI tabs (cheatsheet, keyboard, sandbox, configurator, troubleshooting) are switched in `App.tsx` and laid out by `DeskletLayout.tsx`.
- Adding commands or tips = edit `src/data/vimData.ts` / `src/data/vimTips.ts`; no code changes needed.
- Tests use Vitest + Testing Library (jsdom), setup in `src/test/setup.ts`.
