import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import winston from 'winston';
import dotenv from 'dotenv';

import { VIM_TIPS } from './src/data/vimTips';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
  ],
});

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Vite requires inline scripts during dev
}));
app.use(compression());
app.use(cors());
app.use(express.json());

// Request logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again later.',
});

// Health Checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

// API Endpoint for fetching Daily Vim Tip
app.get('/api/vim-tip', limiter, async (req, res, next) => {
  try {
    const level = (req.query.level as string) || 'advanced'; // 'beginner', 'intermediate', or 'advanced'

    // Fallback to rand offline tip matching requested difficulty
    const levelFiltered = VIM_TIPS.filter(tip => tip.difficulty === level);
    const pool = levelFiltered.length > 0 ? levelFiltered : VIM_TIPS;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedTip = pool[randomIndex];
    logger.info(`[API] Serving tip for level "${level}": ${selectedTip.title}`);
    return res.json({ source: 'local', ...selectedTip });
  } catch (error) {
    next(error);
  }
});

// Centralized error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
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
    logger.info(`[SERVER] modewerks running on port ${PORT}`);
  });
}

start().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
