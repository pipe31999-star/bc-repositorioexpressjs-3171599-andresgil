import express, { Express, Request, Response } from 'express';
import agentRoutes from './routes/agents.routes.js';
import callRoutes from './routes/calls.routes.js';
import clientRoutes from './routes/clients.routes.js';
import campaignRoutes from './routes/campaigns.routes.js';

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/calls', callRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/campaigns', campaignRoutes);

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ data: { status: 'OK', message: 'Call Center API is running' } });
});

// API root / documentation summary
app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Call Center API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      agents: '/api/v1/agents',
      calls: '/api/v1/calls',
      clients: '/api/v1/clients',
      campaigns: '/api/v1/campaigns'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', message: 'Endpoint not found' });
});

export default app;
