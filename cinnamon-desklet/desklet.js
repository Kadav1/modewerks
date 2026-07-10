const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const GLib = imports.gi.GLib;

const CONSTANTS = {
    KILL_TIMEOUT_MS: 2000,
    SIGTERM: "-15",
    SIGKILL: "-9"
};

function ModewerksDesklet(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}

ModewerksDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);
        this.metadata = metadata;
        this.desklet_id = desklet_id;
        this.child_pid = null;

        this.setupUI();
        this.startWebViewProcess();
    },

    setupUI: function() {
        // Create a hidden, invisible anchor for the desklet since the actual UI is the GTK WebView
        this.window = new St.BoxLayout({
            width: 1, 
            height: 1, 
            style: "opacity: 0;"
        });
        
        this.setContent(this.window);
    },

    startWebViewProcess: function() {
        if (this.child_pid !== null) {
            global.log("modewerks: Duplicate launch prevented (already running PID: " + this.child_pid + ")");
            return;
        }

        try {
            // Get current directory path of desklet files
            let deskletPath = this.metadata.path;
            let scriptPath = deskletPath + "/desklet_webview.py";
            let indexPath = "file://" + deskletPath + "/dist/index.html";
            
            global.log("modewerks: Launch attempted. Script Path: " + scriptPath);
            
            let success = false;
            let pid = null;
            
            // Try spawning with standard python3 from PATH
            try {
                let res = GLib.spawn_async(
                    null,
                    ["python3", scriptPath, indexPath],
                    null,
                    GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD,
                    null
                );
                success = res[0];
                pid = res[1];
            } catch (e) {
                global.log("modewerks: Standard python3 spawn failed: " + e.toString() + ". Attempting fallback to /usr/bin/python3...");
            }
            
            // Fallback: Try spawning with explicit absolute path to /usr/bin/python3
            if (!success) {
                try {
                    let res = GLib.spawn_async(
                        null,
                        ["/usr/bin/python3", scriptPath, indexPath],
                        null,
                        GLib.SpawnFlags.DO_NOT_REAP_CHILD,
                        null
                    );
                    success = res[0];
                    pid = res[1];
                } catch (err) {
                    global.logError("modewerks: Fallback absolute python3 spawn failed: " + err.toString());
                }
            }
            
            if (success) {
                this.child_pid = pid;
                global.log("modewerks: Launch success. Launched isolated WebView (PID: " + pid + ")");
                GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, (pid, status) => {
                    GLib.spawn_close_pid(pid);
                    if (this.child_pid === pid) {
                        this.child_pid = null;
                    }
                    global.log("modewerks: Child exit. WebView process exited with status: " + status);
                });
            } else {
                global.logError("modewerks: Launch failure. Failed to launch Cinnamon modewerks child process");
            }
        } catch (e) {
            global.logError("modewerks: Exception starting modewerks launcher script: " + e.toString());
        }
    },

    on_desklet_removed: function() {
        // NOTE: Process groups via child_setup callback in GLib.spawn_async are unsafe/unstable in GJS
        // because running JS code between fork() and exec() interacts poorly with the JS engine's garbage collection.
        // Therefore, the safer PID-based fallback is used for child lifecycle tracking and signal delivery.

        // Terminate the background web view when desklet is taken off wallpaper
        if (this.child_pid) {
            let pidToKill = this.child_pid;
            global.log("modewerks: Child termination requested for PID: " + pidToKill);
            try {
                // Send SIGTERM first for clean shutdown
                GLib.spawn_async(
                    null,
                    ["kill", CONSTANTS.SIGTERM, pidToKill.toString()],
                    null,
                    GLib.SpawnFlags.SEARCH_PATH,
                    null
                );
            } catch (e) {
                global.logError("modewerks: Error sending SIGTERM: " + e.toString());
            }

            // Fallback to SIGKILL if process survives
            GLib.timeout_add(GLib.PRIORITY_DEFAULT, CONSTANTS.KILL_TIMEOUT_MS, () => {
                if (this.child_pid === pidToKill) {
                    global.log("modewerks: Child force-killed (PID: " + pidToKill + ")");
                    try {
                        GLib.spawn_async(
                            null,
                            ["kill", CONSTANTS.SIGKILL, pidToKill.toString()],
                            null,
                            GLib.SpawnFlags.SEARCH_PATH,
                            null
                        );
                    } catch (e) {
                        global.logError("modewerks: Error sending SIGKILL: " + e.toString());
                    }
                    this.child_pid = null;
                }
                return GLib.SOURCE_REMOVE; // Run once, do not repeat
            });
        }
    }
};

function main(metadata, desklet_id) {
    return new ModewerksDesklet(metadata, desklet_id);
}
