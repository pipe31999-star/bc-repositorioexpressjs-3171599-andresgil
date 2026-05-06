import type { Request, Response } from 'express';
import { CampaignService } from '../services/campaigns.service.js';
import type { CreateCampaignInput, UpdateCampaignInput } from '../types.js';

const campaignService = new CampaignService();

export class CampaignController {
  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await campaignService.getAllCampaigns(page, limit);
    res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const campaign = await campaignService.getCampaignById(id);

    if (!campaign) {
      res.status(404).json({ error: 'Not Found', message: `Campaign ${id} not found` });
      return;
    }

    res.status(200).json({ data: campaign });
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: CreateCampaignInput = req.body;
      const campaign = await campaignService.createCampaign(input);
      res.status(201).json({ data: campaign });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create campaign';
      res.status(400).json({ error: 'Bad Request', message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const input: UpdateCampaignInput = req.body;
    const campaign = await campaignService.updateCampaign(id, input);

    if (!campaign) {
      res.status(404).json({ error: 'Not Found', message: `Campaign ${id} not found` });
      return;
    }

    res.status(200).json({ data: campaign });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const deleted = await campaignService.deleteCampaign(id);

    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Campaign ${id} not found` });
      return;
    }

    res.status(204).send();
  }
}
