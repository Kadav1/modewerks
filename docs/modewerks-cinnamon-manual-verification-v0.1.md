# modewerks cinnamon manual verification v0.1

## Environment
- OS:
- Cinnamon version:
- WebKitGTK package:
- Python version:
- Install method:
- Package filename:
- Date:

## Install checks
- [ ] Install packaged zip
- [ ] Add desklet to desktop
- [ ] Confirm exactly one WebView window opens
- [ ] Confirm no error dialog appears

## Runtime checks
- [ ] Layer mode: below
- [ ] Layer mode: normal
- [ ] Layer mode: above
- [ ] Drag window
- [ ] Resize window
- [ ] Reload UI state
- [ ] Clipboard actions work or fail gracefully

## Lifecycle checks
- [ ] Remove desklet
- [ ] Python WebView exits
- [ ] Re-add desklet
- [ ] No duplicate WebView appears
- [ ] Reload Cinnamon while desklet is open
- [ ] No orphaned process remains
- [ ] Kill only Python WebView process
- [ ] Desklet handles child exit sanely

## Lock/PID checks
- [ ] Start with no PID file
- [ ] Start with stale PID file for nonexistent process
- [ ] Start with PID file pointing to unrelated live process
- [ ] Unrelated live process is not killed
- [ ] Clean quit removes own PID lock file

## Path checks
- [ ] Install path contains spaces
- [ ] Install path contains @ symbol
- [ ] IPC still works with @ in folder name

## Package checks
- [ ] Zip contains only approved runtime files
- [ ] No server artifacts
- [ ] No node_modules
- [ ] No source files
- [ ] No sourcemaps

## Result
- Pass:
- Fail:
- Blockers:
- Notes:
