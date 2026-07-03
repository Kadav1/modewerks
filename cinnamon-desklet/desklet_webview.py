#!/usr/bin/env python3
"""
AZWERKS modewerks — WebView launcher
Provides: full-edge resize, window layer control (above/normal/below),
          geometry + layer persistence, drag-to-move.
"""
import sys
import os
import configparser

LOG_FILE = os.path.expanduser(
    "~/.local/share/cinnamon/desklets/modewerks@cinnamon.org/webview_error.log"
)
CONFIG_FILE = os.path.expanduser("~/.config/modewerks.ini")

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
def log(msg):
    try:
        os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
        # Limit size of logs to prevent unbounded growth
        for path in (LOG_FILE, "/tmp/modewerks_webview.log"):
            try:
                if os.path.exists(path) and os.path.getsize(path) > 1024 * 1024:
                    with open(path, "w") as f:
                        f.write("[Log Truncated due to size]\n")
            except Exception:
                pass
            with open(path, "a") as f:
                f.write(msg + "\n")
    except Exception:
        pass


# ---------------------------------------------------------------------------
# GTK / WebKit bootstrap
# ---------------------------------------------------------------------------
try:
    import gi
    gi.require_version('Gtk', '3.0')
    gi.require_version('Gdk', '3.0')
    from gi.repository import Gtk, Gdk, GLib
except Exception as e:
    log("Gtk 3.0 runtime loading failed: " + str(e))
    if len(sys.argv) > 1:
        import webbrowser; webbrowser.open(sys.argv[1])
    sys.exit(1)

webkit_loaded = False
WebKit2 = None
for _ver in ['4.1', '4.0', '5.0', '6.0']:
    try:
        gi.require_version('WebKit2', _ver)
        from gi.repository import WebKit2
        webkit_loaded = True
        log(f"Loaded WebKit2 {_ver}")
        break
    except (ValueError, ImportError, AttributeError) as e:
        log(f"WebKit2 {_ver} unavailable: {e}")

if not webkit_loaded:
    log("CRITICAL: No WebKit2 library found.")
    try:
        dialog = Gtk.MessageDialog(
            transient_for=None, flags=0,
            message_type=Gtk.MessageType.ERROR,
            buttons=Gtk.ButtonsType.OK,
            text="Vim Companion Desklet: WebKit2 Missing"
        )
        dialog.format_secondary_text(
            "Install WebKit2 then reload:\n\n"
            "  sudo apt install gir1.2-webkit2-4.1 python3-gi"
        )
        dialog.run(); dialog.destroy()
    except Exception as e:
        log("GTK dialog failed: " + str(e))
    if len(sys.argv) > 1:
        import webbrowser; webbrowser.open(sys.argv[1])
    sys.exit(1)


# ---------------------------------------------------------------------------
# Config helpers
# ---------------------------------------------------------------------------
DEFAULT_W, DEFAULT_H = 980, 680
RESIZE_BORDER = 12        # px — edge zone that triggers resize cursor

EDGE_CURSORS = {
    Gdk.WindowEdge.NORTH:      'n-resize',
    Gdk.WindowEdge.SOUTH:      's-resize',
    Gdk.WindowEdge.WEST:       'w-resize',
    Gdk.WindowEdge.EAST:       'e-resize',
    Gdk.WindowEdge.NORTH_WEST: 'nw-resize',
    Gdk.WindowEdge.NORTH_EAST: 'ne-resize',
    Gdk.WindowEdge.SOUTH_WEST: 'sw-resize',
    Gdk.WindowEdge.SOUTH_EAST: 'se-resize',
}


def load_config():
    cfg = configparser.ConfigParser()
    cfg.read(CONFIG_FILE)
    return cfg


def save_config(x, y, w, h, layer):
    cfg = configparser.ConfigParser()
    cfg['window'] = {
        'x':      str(x),
        'y':      str(y),
        'width':  str(w),
        'height': str(h),
        'layer':  layer,
    }
    try:
        os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
        with open(CONFIG_FILE, 'w') as f:
            cfg.write(f)
    except Exception as e:
        log("Config save failed: " + str(e))


# ---------------------------------------------------------------------------
# Main window
# ---------------------------------------------------------------------------
class VimDeskletWindow(Gtk.Window):
    def __init__(self, url):
        super().__init__(type=Gtk.WindowType.TOPLEVEL)
        self.set_title("Vim Companion Desklet")

        # ---- Load persisted geometry & layer --------------------------------
        cfg = load_config()
        win = cfg['window'] if 'window' in cfg else {}

        try:    saved_w = int(win.get('width',  DEFAULT_W))
        except Exception: saved_w = DEFAULT_W
        try:    saved_h = int(win.get('height', DEFAULT_H))
        except Exception: saved_h = DEFAULT_H
        try:    saved_x = int(win.get('x', -1))
        except Exception: saved_x = -1
        try:    saved_y = int(win.get('y', -1))
        except Exception: saved_y = -1

        # Default layer is 'below' (background) — user can change in the UI
        self._layer = win.get('layer', 'below')

        # ---- Window flags ---------------------------------------------------
        self.set_default_size(saved_w, saved_h)
        self.set_decorated(False)
        self.set_skip_taskbar_hint(True)
        self.set_skip_pager_hint(True)
        self.set_accept_focus(True)
        self.set_resizable(True)

        self._apply_layer(self._layer)

        # Compositor transparency
        screen = self.get_screen()
        visual = screen.get_rgba_visual()
        if visual and self.is_composited():
            self.set_visual(visual)

        # ---- Build widget tree ----------------------------------------------
        self.scrolled_window = Gtk.ScrolledWindow()
        self.add(self.scrolled_window)

        # WebView
        self.webview = WebKit2.WebView()
        settings = self.webview.get_settings()
        settings.set_enable_developer_extras("--debug" in sys.argv)
        settings.set_enable_javascript(True)
        settings.set_enable_write_console_messages_to_stdout(True)
        try:
            settings.set_allow_file_access_from_file_urls(True)
        except Exception as e:
            log("file-access setting failed: " + str(e))
        try:
            settings.set_allow_universal_access_from_file_urls(False)
        except Exception as e:
            log("universal-access setting failed: " + str(e))

        # Background colour matching Radium canvas
        style_provider = Gtk.CssProvider()
        style_provider.load_from_data(b"window { background-color: #202521; }")
        self.get_style_context().add_provider(
            style_provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
        )
        rgba = Gdk.RGBA(); rgba.parse("#202521")
        self.webview.set_background_color(rgba)

        self.scrolled_window.add(self.webview)
        self.webview.load_uri(url)

        # ---- State for drag / resize ----------------------------------------
        self.last_event  = None
        self._resize_edge = None          # current edge under cursor, or None
        self._geometry_save_timer = None  # debounce timer id

        # ---- Connect signals ------------------------------------------------
        # Pointer events on the WebView for edge detection
        self.webview.add_events(
            Gdk.EventMask.POINTER_MOTION_MASK  |
            Gdk.EventMask.BUTTON_PRESS_MASK    |
            Gdk.EventMask.BUTTON_RELEASE_MASK  |
            Gdk.EventMask.LEAVE_NOTIFY_MASK
        )
        self.webview.connect("motion-notify-event",  self._on_motion)
        self.webview.connect("button-press-event",   self._on_button_press)
        self.webview.connect("leave-notify-event",   self._on_leave)
        self.webview.connect("script-dialog",        self._on_script_dialog)

        # Save geometry after move / resize (debounced)
        self.connect("configure-event", self._on_configure)
        self.connect("destroy", Gtk.main_quit)

        # Restore keep-below after losing focus
        self.connect("focus-out-event", self._on_focus_out)

        self.show_all()

        # Restore position AFTER show_all so the window is realised
        if saved_x >= 0 and saved_y >= 0:
            self.move(saved_x, saved_y)

    # ---- Layer helpers ------------------------------------------------------
    def _apply_layer(self, layer: str):
        """Apply a window stacking layer."""
        if layer == 'above':
            self.set_keep_above(True)
            self.set_keep_below(False)
        elif layer == 'below':
            self.set_keep_above(False)
            self.set_keep_below(True)
        else:   # 'normal'
            self.set_keep_above(False)
            self.set_keep_below(False)
        self._layer = layer

    # ---- Edge detection helpers ---------------------------------------------
    def _edge_for_pos(self, x: float, y: float):
        """Return a Gdk.WindowEdge for cursor position, or None if interior."""
        w, h = self.get_size()
        b = RESIZE_BORDER
        left  = x < b
        right = x > w - b
        top   = y < b
        bot   = y > h - b

        if top   and left:  return Gdk.WindowEdge.NORTH_WEST
        if top   and right: return Gdk.WindowEdge.NORTH_EAST
        if bot   and left:  return Gdk.WindowEdge.SOUTH_WEST
        if bot   and right: return Gdk.WindowEdge.SOUTH_EAST
        if top:             return Gdk.WindowEdge.NORTH
        if bot:             return Gdk.WindowEdge.SOUTH
        if left:            return Gdk.WindowEdge.WEST
        if right:           return Gdk.WindowEdge.EAST
        return None

    def _set_cursor(self, cursor_name):
        gdk_win = self.get_window()
        if gdk_win is None:
            return
        if cursor_name:
            cursor = Gdk.Cursor.new_from_name(self.get_display(), cursor_name)
        else:
            cursor = None
        gdk_win.set_cursor(cursor)

    # ---- GTK signal handlers -----------------------------------------------
    def _on_motion(self, widget, event):
        edge = self._edge_for_pos(event.x, event.y)
        self._resize_edge = edge
        self._set_cursor(EDGE_CURSORS.get(edge, None))
        return False

    def _on_leave(self, widget, event):
        self._resize_edge = None
        self._set_cursor(None)
        return False

    def _on_button_press(self, widget, event):
        if event.button != 1:
            return False

        self.last_event = {
            'button': event.button,
            'x_root': int(event.x_root),
            'y_root': int(event.y_root),
            'time':   event.time,
        }

        # Intercept immediately if cursor is on an edge
        if self._resize_edge is not None:
            self.begin_resize_drag(
                self._resize_edge,
                self.last_event['button'],
                self.last_event['x_root'],
                self.last_event['y_root'],
                self.last_event['time'],
            )
            self.last_event    = None
            self._resize_edge  = None
            self._set_cursor(None)
            return True   # consume — don't pass to WebKit

        return False

    def _on_script_dialog(self, webview, dialog):
        """Bridge between React (prompt) and GTK window management."""
        if dialog.get_dialog_type() != WebKit2.ScriptDialogType.PROMPT:
            return False

        # Validate webview URI to prevent untrusted origins from calling desktop IPC
        uri = webview.get_uri()
        if not (uri and uri.startswith("file://") and "modewerks" in uri):
            log(f"Security Block: Blocked untrusted script dialog command from URI: {uri}")
            return False

        msg = dialog.get_message()

        # ---- Drag -----------------------------------------------------------
        if msg == "DRAG_START":
            if self.last_event:
                self.begin_move_drag(
                    self.last_event['button'],
                    self.last_event['x_root'],
                    self.last_event['y_root'],
                    self.last_event['time'],
                )
                self.last_event = None
            return True

        # ---- Edge resize from JS (SE corner handle) -------------------------
        if msg == "RESIZE_START":
            if self.last_event:
                self.begin_resize_drag(
                    Gdk.WindowEdge.SOUTH_EAST,
                    self.last_event['button'],
                    self.last_event['x_root'],
                    self.last_event['y_root'],
                    self.last_event['time'],
                )
                self.last_event = None
            return True

        # ---- Layer controls -------------------------------------------------
        if msg.startswith("SET_LAYER:"):
            layer = msg.split(":", 1)[1].strip()
            if layer in ('above', 'normal', 'below'):
                self._apply_layer(layer)
                self._schedule_geometry_save()
                log(f"Layer set to: {layer}")
            return True

        if msg == "GET_LAYER":
            dialog.prompt_set_text(self._layer)
            return True

        return False

    def _on_focus_out(self, widget, event):
        # Re-enforce layer after losing focus (some WMs reset it)
        self._apply_layer(self._layer)
        return False

    def _on_configure(self, widget, event):
        """Debounced geometry save — fires after move or resize."""
        self._schedule_geometry_save()
        return False

    # ---- Geometry persistence ----------------------------------------------
    def _schedule_geometry_save(self):
        """Cancel any pending save and schedule a new one 800 ms out."""
        if self._geometry_save_timer is not None:
            GLib.source_remove(self._geometry_save_timer)
        self._geometry_save_timer = GLib.timeout_add(800, self._do_save_geometry)

    def _do_save_geometry(self):
        self._geometry_save_timer = None
        x, y = self.get_position()
        w, h = self.get_size()
        save_config(x, y, w, h, self._layer)
        log(f"Geometry saved: {w}x{h} at ({x},{y}), layer={self._layer}")
        return False   # don't repeat


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    url = "file://" + os.path.abspath(
        os.path.join(os.path.dirname(__file__), "dist/index.html")
    )
    if len(sys.argv) > 1:
        url = sys.argv[1]

    try:
        log("Starting VimDeskletWindow — url: " + url)
        app = VimDeskletWindow(url)
        Gtk.main()
    except Exception as e:
        log("CRITICAL: " + str(e))
        import traceback; log(traceback.format_exc())
        try:
            import webbrowser; webbrowser.open(url)
        except Exception:
            pass
        sys.exit(1)
