# ⌨ modewerks - Cinnamon Desklet Reference

This directory contains the necessary package configurations, desktop wrappers, and setup scripts to convert this beautiful React + Tailwind application into an **actual, direct native desklet** on your **Linux Mint Cinnamon Desktop Workspace**!

---

## 🎨 Design & Process Architecture

Because standard Cinnamon desklet UI engines (called `St` - Shell Toolkit) run inside the primary window compositor thread of your desktop environment, running heavy custom layouts, canvas widgets, or JS sandboxes directly in the main shell thread is a risky pattern. If anything stalls, your entire Linux desktop temporarily freezes!

To solve this, we use a **genius process-isolated architecture**:
1. **The Controller (`desklet.js`)**: A lightweight native Cinnamon Desklet widget that registers with the Cinnamon system and sets a static active badge. When the desklet is loaded or destroyed, it perfectly manages, spawns, or kills the isolated UI thread.
2. **The Sandboxed WebView (`desklet_webview.py`)**: A native background Python GObject helper that instantiates a fully borderless, sticky, keep-below, skipped-taskbar `WebKit2` window to render the React application off-thread. Because Linux Mint uses `PyGObject` and WebKit for its pre-installed Web App Manager, this configuration runs **completely out of the box** with maximum hardware acceleration and zero external package overhead!

---

## 📋 System Requirements & Dependencies

To render the rich HTML/JS environment, the desklet uses your system's built-in **WebKit2** libraries via Python. If you only see a small capsule stating `= modewerks Running` on your desktop but the main window doesn't open beneath, you are missing the GObject introspection binding libraries.

Run the following command in your terminal to install the necessary packages:

```bash
# Ubuntu / Linux Mint 21 & newer
sudo apt update
sudo apt install python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.1

# Legacy Linux Mint 20 & older
sudo apt update
sudo apt install python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.0
```

*Note: After installing the packages, restart the Cinnamon desklet (by right-clicking on the desktop widget or reloading via the Desklets manager) to apply changes.*

---

## 🚀 Easy Installation Guide (Step-by-Step)

### Step 1: Open Terminal in Mint the Root Workspace
Navigate to your project directory. To build and package the desklet to your Cinnamon environment automatically, run the quick bash installer:

```bash
chmod +x ./cinnamon-desklet/INSTALL.sh
./cinnamon-desklet/INSTALL.sh
```

*(This will automatically compile your React application with Vite, copy the necessary system files, and package the bundle inside Cinnamon's native desklets tree: `~/.local/share/cinnamon/desklets/modewerks@cinnamon.org`)*

---

## 🖱 How to Load on Linux Mint Screen
1. **Right-click** on your desktop wallpaper.
2. Select **"Add desklets"** from the native context menu.
3. Scroll or search for **"modewerks"** (look for the green terminal cursor icon).
4. Select it and click the **`+` (Add to desktop)** button at the bottom of the window.
5. Close the desklets manager, and **drag the desklet anywhere** on your wallpaper to place it perfectly!

---

## 🛠 Advanced Controls
- **Reposition Panel**: To reposition the widget, simply left-click anywhere on the desklet surface and drag it across your screen.
- **Stay Pinned**: The widget has a forced `keep_below` flag that acts exactly like a sticky wallpaper desklet, meaning it stays organized underneath open browser tabs or text editors, keeping your desk workspace clean!
