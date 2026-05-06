import type { Campaign, CreateCampaignInput, UpdateCampaignInput, PaginatedResponse } from '../types.js';
import { CampaignRepository } from '../repositories/campaigns.repository.js';

export class CampaignService {
  private repository = new CampaignRepository();

  async getAllCampaigns(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Campaign>> {
    const allCampaigns = await this.repository.findAll();
    const start = (page - 1) * limit;
    const paginatedCampaigns = allCampaigns.slice(start, start + limit);

    return {
      data: paginatedCampaigns,
      total: allCampaigns.length,
      page,
      limit,
    };
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    return await this.repository.findById(id);
  }

  async createCampaign(input: CreateCampaignInput): Promise<Campaign> {
    if (!input.name || !input.description || !input.startDate || !input.endDate || !input.targetCalls) {
      throw new Error('Missing required fields');
    }

    return await this.repository.create(input);
  }

  async updateCampaign(id: number, input: UpdateCampaignInput): Promise<Campaign | null> {
    return await this.repository.update(id, input);
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
