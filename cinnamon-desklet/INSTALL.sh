#!/usr/bin/env bash
# ==============================================================================
# Linux Mint Cinnamon Desklet Auto-Installer Script
# For: modewerks - offline vim and neovim reference desklet
# ==============================================================================
set -euo pipefail

# Custom color outputs
GREEN="\033[0;32m"
BOLD="\033[1m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
NC="\033[0m"

echo -e "${BLUE}${BOLD}================================================================${NC}"
echo -e "${GREEN}${BOLD}      modewerks Cinnamon Desklet Installer      ${NC}"
echo -e "${BLUE}${BOLD}================================================================${NC}"
echo ""

# Ensure we run from repository root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
REPO_ROOT="$SCRIPT_DIR/.."
cd "$REPO_ROOT" || exit 1

# 1. Check if running inside the right project workspace
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}Warning: package.json not found. Make sure to run this installer inside the repository!${NC}"
fi

# 2. Check required runtime dependencies
echo -e "${BLUE}[1/5] Checking runtime dependencies...${NC}"

# Check for python3
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Error: python3 is not installed. Please install python3 first.${NC}" >&2
    echo -e "Suggestion: run 'sudo apt install python3'" >&2
    exit 1
fi

# Run a python command to check the GI bindings
if ! PREFLIGHT_RESULT="$(python3 - <<'PY'
import sys
try:
    import gi
except ImportError:
    print('ERROR_GI')
    sys.exit(0)

try:
    gi.require_version('Gtk', '3.0')
    from gi.repository import Gtk
except (ValueError, ImportError):
    print('ERROR_GTK')
    sys.exit(0)

try:
    webkit_loaded = False
    for ver in ['4.1', '4.0', '5.0', '6.0']:
        try:
            gi.require_version('WebKit2', ver)
            from gi.repository import WebKit2
            webkit_loaded = True
            break
        except (ValueError, ImportError):
            continue
    if not webkit_loaded:
        print('ERROR_WEBKIT')
        sys.exit(0)
except Exception:
    print('ERROR_WEBKIT')
    sys.exit(0)

print('OK')
PY
)"; then
    echo -e "${YELLOW}Warning: Preflight python script check failed to execute.${NC}"
    PREFLIGHT_RESULT="FAILED_EXEC"
fi

if [ "$PREFLIGHT_RESULT" = "ERROR_GI" ]; then
    echo -e "${YELLOW}Error: python3-gi is missing.${NC}" >&2
    echo -e "Suggestion: install GI bindings with 'sudo apt install python3-gi'" >&2
    exit 1
elif [ "$PREFLIGHT_RESULT" = "ERROR_GTK" ]; then
    echo -e "${YELLOW}Error: GTK 3.0 GI bindings are missing.${NC}" >&2
    echo -e "Suggestion: install GTK 3 GI bindings with 'sudo apt install gir1.2-gtk-3.0'" >&2
    exit 1
elif [ "$PREFLIGHT_RESULT" = "ERROR_WEBKIT" ]; then
    echo -e "${YELLOW}Error: WebKit2 GI bindings are missing.${NC}" >&2
    echo -e "Suggestion: install WebKit2 GI bindings with 'sudo apt install gir1.2-webkit2-4.1' or 'gir1.2-webkit2-4.0'" >&2
    exit 1
elif [ "$PREFLIGHT_RESULT" != "OK" ]; then
    echo -e "${YELLOW}Warning: Could not verify GI bindings. Webview window might not launch correctly.${NC}"
    echo -e "Suggestion: Ensure python3-gi, gir1.2-gtk-3.0, and gir1.2-webkit2-4.1 are installed."
else
    echo -e "${GREEN}✔ Preflight check passed: Python3, PyGObject (GI), Gtk 3.0, and WebKit2 are available.${NC}"
fi

# 3. Compile/build the static HTML application to bundle with desklet
echo -e "${BLUE}[2/5] Building Vite / React production distribution...${NC}"
if command -v npm &> /dev/null; then
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    npm run build
    echo -e "${GREEN}✔ Vite compilation completed successfully!${NC}"
else
    echo -e "${YELLOW}Warning: npm is missing. If you have any pre-compiled 'dist' folder, we will proceed with that.${NC}"
fi

if [ ! -d "dist" ]; then
    echo -e "${YELLOW}Error: 'dist' folder does not exist! Compile the app using 'npm run build' before installing.${NC}"
    exit 1
fi

# 4. Establish the destination directory in Cinnamon user paths
DESKLET_UUID="modewerks@cinnamon.org"
TARGET_DIR="$HOME/.local/share/cinnamon/desklets/$DESKLET_UUID"

echo -e "${BLUE}[3/5] Setting up Cinnamon desklet destination directory...${NC}"
mkdir -p "$TARGET_DIR"
echo -e "✔ Designated directory: $TARGET_DIR"

# 5. Copy required files to the target workspace
echo -e "${BLUE}[4/5] Packaging installer files into the Cinnamon workspace...${NC}"

cp "$SCRIPT_DIR/metadata.json" "$TARGET_DIR/"
cp "$SCRIPT_DIR/desklet.js" "$TARGET_DIR/"
cp "$SCRIPT_DIR/desklet_webview.py" "$TARGET_DIR/"
cp -r "$REPO_ROOT/dist" "$TARGET_DIR/"

# Remove dev server artifacts from the installed folder to ensure hygiene
rm -f "$TARGET_DIR/dist/server.cjs" "$TARGET_DIR/dist/server.cjs.map"

# Ensure execute permission is granted on the Python launcher
chmod +x "$TARGET_DIR/desklet_webview.py"
echo -e "✔ Copy and package authorizations set up perfectly!"

# 6. Done! Ask the user to add it using Cinnamon Desklet App
echo ""
echo -e "${BLUE}[5/5] Installation Complete!${NC}"
echo -e "${GREEN}${BOLD}================================================================${NC}"
echo -e "${BOLD}To load your new interactive ViM Desklet on Linux Mint:${NC}"
echo -e "  1. Right-click on your Linux Mint desktop wallpaper."
echo -e "  2. Select ${BOLD}'Add desklets'${NC} from the Mint contextual menu."
echo -e "  3. Find ${BOLD}'modewerks'${NC} in your local list."
echo -e "  4. Click the ${BOLD}'+' (Add to desktop)${NC} button to place it."
echo -e "  5. Left-click & drag the widget anywhere on your desktop screen!"
echo -e "${GREEN}${BOLD}================================================================${NC}"
echo -e "${BLUE}Enjoy your beautiful modewerks desklet companion!${NC}"
echo ""
