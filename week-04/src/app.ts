import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agents.routes';
import { morganMiddleware } from './config/logger';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(morganMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/v1/agents', agentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
