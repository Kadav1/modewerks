import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import { VIM_TIPS } from './src/data/vimTips';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoint for fetching Daily Vim Tip
app.get('/api/vim-tip', async (req, res) => {
  const level = (req.query.level as string) || 'advanced'; // 'beginner', 'intermediate', or 'advanced'

  // Fallback to rand offline tip matching requested difficulty
  const levelFiltered = VIM_TIPS.filter(tip => tip.difficulty === level);
  const pool = levelFiltered.length > 0 ? levelFiltered : VIM_TIPS;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const selectedTip = pool[randomIndex];
  console.log(`[API] Serving tip for level "${level}":`, selectedTip.title);
  return res.json({ source: 'local', ...selectedTip });
});

// Configure Vite middleware in development or direct static serving in production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[SERVER] modewerks running on port ${PORT}`);
  });
}

start();
