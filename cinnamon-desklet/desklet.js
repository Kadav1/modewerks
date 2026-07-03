const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const GLib = imports.gi.GLib;

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
        try {
            // Get current directory path of desklet files
            let deskletPath = this.metadata.path;
            let scriptPath = deskletPath + "/desklet_webview.py";
            let indexPath = "file://" + deskletPath + "/dist/index.html";
            
            global.log("Launching modewerks webview. Script Path: " + scriptPath);
            
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
                global.log("Standard python3 spawn failed: " + e.toString() + ". Attempting fallback to /usr/bin/python3...");
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
                    global.logError("Fallback absolute python3 spawn failed: " + err.toString());
                }
            }
            
            if (success) {
                this.child_pid = pid;
                GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, (pid, status) => {
                    GLib.spawn_close_pid(pid);
                    this.child_pid = null;
                    global.log("modewerks WebView process exited with status: " + status);
                });
                global.log("Successfully launched isolated modewerks WebView (PID: " + pid + ")");
            } else {
                global.logError("Failed to launch Cinnamon modewerks child process");
            }
        } catch (e) {
            global.logError("Exception starting modewerks launcher script: " + e.toString());
        }
    },

    on_desklet_removed: function() {
        // Terminate the background web view when desklet is taken off wallpaper
        if (this.child_pid) {
            try {
                GLib.spawn_async(
                    null,
                    ["kill", this.child_pid.toString()],
                    null,
                    GLib.SpawnFlags.SEARCH_PATH,
                    null
                );
                global.log("modewerks background web view cleanly stopped.");
            } catch (e) {
                global.logError("Error during target child termination: " + e.toString());
            }
        }
    }
};

function main(metadata, desklet_id) {
    return new ModewerksDesklet(metadata, desklet_id);
}
