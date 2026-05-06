import type { Request, Response } from 'express';
import { CallService } from '../services/calls.service.js';
import type { CreateCallInput, UpdateCallInput } from '../types.js';

const callService = new CallService();

export class CallController {
  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await callService.getAllCalls(page, limit);
    res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const call = await callService.getCallById(id);

    if (!call) {
      res.status(404).json({ error: 'Not Found', message: `Call ${id} not found` });
      return;
    }

    res.status(200).json({ data: call });
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: CreateCallInput = req.body;
      const call = await callService.createCall(input);
      res.status(201).json({ data: call });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create call';
      res.status(400).json({ error: 'Bad Request', message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const input: UpdateCallInput = req.body;
    const call = await callService.updateCall(id, input);

    if (!call) {
      res.status(404).json({ error: 'Not Found', message: `Call ${id} not found` });
      return;
    }

    res.status(200).json({ data: call });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const deleted = await callService.deleteCall(id);

    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Call ${id} not found` });
      return;
    }

    res.status(204).send();
  }
}
