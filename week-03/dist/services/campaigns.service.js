import { CampaignRepository } from '../repositories/campaigns.repository.js';
export class CampaignService {
    constructor() {
        this.repository = new CampaignRepository();
    }
    async getAllCampaigns(page = 1, limit = 5) {
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
    async getCampaignById(id) {
        return await this.repository.findById(id);
    }
    async createCampaign(input) {
        if (!input.name || !input.description || !input.startDate || !input.endDate || !input.targetCalls) {
            throw new Error('Missing required fields');
        }
        return await this.repository.create(input);
    }
    async updateCampaign(id, input) {
        return await this.repository.update(id, input);
    }
    async deleteCampaign(id) {
        return await this.repository.delete(id);
    }
}
//# sourceMappingURL=campaigns.service.js.map