import { AgentService } from '../services/agents.service.js';
const agentService = new AgentService();
export class AgentController {
    async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await agentService.getAllAgents(page, limit);
        res.status(200).json(result);
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        const agent = await agentService.getAgentById(id);
        if (!agent) {
            res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
            return;
        }
        res.status(200).json({ data: agent });
    }
    async create(req, res) {
        try {
            const input = req.body;
            const agent = await agentService.createAgent(input);
            res.status(201).json({ data: agent });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create agent';
            res.status(400).json({ error: 'Bad Request', message });
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const input = req.body;
        const agent = await agentService.updateAgent(id, input);
        if (!agent) {
            res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
            return;
        }
        res.status(200).json({ data: agent });
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        const deleted = await agentService.deleteAgent(id);
        if (!deleted) {
            res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
            return;
        }
        res.status(204).send();
    }
}
//# sourceMappingURL=agents.controller.js.map