#!/usr/bin/env bash
# ==============================================================================
# Linux Mint Cinnamon Desklet Distribution Packager
# ==============================================================================

set -euo pipefail

GREEN="\033[0;32m"
BOLD="\033[1m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
NC="\033[0m"

echo -e "${BLUE}${BOLD}================================================================${NC}"
echo -e "${GREEN}${BOLD}     Packaging modewerks Cinnamon Desklet       ${NC}"
echo -e "${BLUE}${BOLD}================================================================${NC}"

# Ensure we run from repository root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Check if zip is installed
if ! command -v zip &> /dev/null; then
    echo -e "${YELLOW}Error: 'zip' utility is not installed. Please install it first.${NC}" >&2
    exit 1
fi

# Cleanup staging directory on exit or error
cleanup() {
    if [ -d "$SCRIPT_DIR/tmp_staging" ]; then
        echo -e "${BLUE}Cleaning up staging directory...${NC}"
        rm -rf "$SCRIPT_DIR/tmp_staging"
    fi
}
trap cleanup EXIT

# 1. Build Vite distribution
echo -e "${BLUE}[1/3] Building Vite production bundle...${NC}"
npm run build

# 2. Establish temporary staging directory
UUID="modewerks@cinnamon.org"
STAGING_DIR="$SCRIPT_DIR/tmp_staging/$UUID"

echo -e "${BLUE}[2/3] Setting up distribution staging directory...${NC}"
rm -rf "$SCRIPT_DIR/tmp_staging"
mkdir -p "$STAGING_DIR"

# 3. Copy required production files
cp cinnamon-desklet/metadata.json "$STAGING_DIR/"
cp cinnamon-desklet/desklet.js "$STAGING_DIR/"
cp cinnamon-desklet/desklet_webview.py "$STAGING_DIR/"
cp -r dist "$STAGING_DIR/"

# Exclude dev server assets from desklet package
rm -f "$STAGING_DIR/dist/server.cjs"
rm -f "$STAGING_DIR/dist/server.cjs.map"

chmod +x "$STAGING_DIR/desklet_webview.py"

# 4. Generate the zip file
echo -e "${BLUE}[3/3] Archiving into clean zip file...${NC}"
rm -f "$UUID.zip"
cd "$SCRIPT_DIR/tmp_staging"
zip -r "$SCRIPT_DIR/$UUID.zip" "$UUID"
cd "$SCRIPT_DIR"

# Clean up staging
rm -rf "$SCRIPT_DIR/tmp_staging"

echo ""
echo -e "${GREEN}${BOLD}================================================================${NC}"
echo -e "${GREEN}${BOLD}Success! Package generated: $UUID.zip${NC}"
echo -e "This archive contains only compiled production assets and wrapper scripts."
echo -e "Stale files, devDependencies, and node_modules have been excluded."
echo -e "${GREEN}${BOLD}================================================================${NC}"
echo ""
