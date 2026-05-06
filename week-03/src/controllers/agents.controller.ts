import type { Request, Response } from 'express';
import { AgentService } from '../services/agents.service.js';
import type { CreateAgentInput, UpdateAgentInput } from '../types.js';

const agentService = new AgentService();

export class AgentController {
  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await agentService.getAllAgents(page, limit);
    res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const agent = await agentService.getAgentById(id);

    if (!agent) {
      res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
      return;
    }

    res.status(200).json({ data: agent });
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: CreateAgentInput = req.body;
      const agent = await agentService.createAgent(input);
      res.status(201).json({ data: agent });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create agent';
      res.status(400).json({ error: 'Bad Request', message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const input: UpdateAgentInput = req.body;
    const agent = await agentService.updateAgent(id, input);

    if (!agent) {
      res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
      return;
    }

    res.status(200).json({ data: agent });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const deleted = await agentService.deleteAgent(id);

    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Agent ${id} not found` });
      return;
    }

    res.status(204).send();
  }
}
