import express from 'express';
import agentRoutes from './routes/agents.routes.js';
import callRoutes from './routes/calls.routes.js';
import clientRoutes from './routes/clients.routes.js';
import campaignRoutes from './routes/campaigns.routes.js';
const app = express();
// Middleware
app.use(express.json());
// Routes
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/calls', callRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/campaigns', campaignRoutes);
// Health check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ data: { status: 'OK', message: 'Call Center API is running' } });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: 'Endpoint not found' });
});
export default app;
//# sourceMappingURL=app.js.map