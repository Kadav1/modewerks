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

# 2. Compile/build the static HTML application to bundle with desklet
echo -e "${BLUE}[1/4] Building Vite / React production distribution...${NC}"
if command -v npm &> /dev/null; then
    npm install
    npm run build
    echo -e "${GREEN}✔ Vite compilation completed successfully!${NC}"
else
    echo -e "${YELLOW}Warning: npm is missing. If you have any pre-compiled 'dist' folder, we will proceed with that.${NC}"
fi

if [ ! -d "dist" ]; then
    echo -e "${YELLOW}Error: 'dist' folder does not exist! Compile the app using 'npm run build' before installing.${NC}"
    exit 1
fi

# 3. Establish the destination directory in Cinnamon user paths
DESKLET_UUID="modewerks@cinnamon.org"
TARGET_DIR="$HOME/.local/share/cinnamon/desklets/$DESKLET_UUID"

echo -e "${BLUE}[2/4] Setting up Cinnamon desklet destination directory...${NC}"
mkdir -p "$TARGET_DIR"
echo -e "✔ Designated directory: $TARGET_DIR"

# 4. Copy required files to the target workspace
echo -e "${BLUE}[3/4] Packaging installer files into the Cinnamon workspace...${NC}"

cp "$SCRIPT_DIR/metadata.json" "$TARGET_DIR/"
cp "$SCRIPT_DIR/desklet.js" "$TARGET_DIR/"
cp "$SCRIPT_DIR/desklet_webview.py" "$TARGET_DIR/"
cp -r "$REPO_ROOT/dist" "$TARGET_DIR/"

# Ensure execute permission is granted on the Python launcher
chmod +x "$TARGET_DIR/desklet_webview.py"
echo -e "✔ Copy and package authorizations set up perfectly!"

# 5. Done! Ask the user to add it using Cinnamon Desklet App
echo ""
echo -e "${BLUE}[4/4] Installation Complete!${NC}"
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
