import fs from 'fs';
const file = 'cinnamon-desklet/desklet.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
    /this\.window = new St\.BoxLayout\(\{\s*vertical: true,\s*style: "background: rgba\(16, 185, 129, 0\.12\); border: 1\.5px solid rgba\(16, 185, 129, 0\.4\); border-radius: 8px; padding: 6px 12px;"\s*\}\);\s*let label = new St\.Label\(\{\s*text: "⌨ ViM Desklet Running",\s*style: "color: #10b981; font-weight: bold; font-size: 11px; font-family: monospace;"\s*\}\);\s*this\.window\.add_child\(label\);/s,
    `this.window = new St.BoxLayout({
            width: 1,
            height: 1,
            style: "opacity: 0;"
        });`
);
fs.writeFileSync(file, content);
