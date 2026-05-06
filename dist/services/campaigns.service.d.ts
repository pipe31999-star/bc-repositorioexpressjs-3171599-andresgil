import type { Campaign, CreateCampaignInput, UpdateCampaignInput, PaginatedResponse } from '../types.js';
export declare class CampaignService {
    private repository;
    getAllCampaigns(page?: number, limit?: number): Promise<PaginatedResponse<Campaign>>;
    getCampaignById(id: number): Promise<Campaign | null>;
    createCampaign(input: CreateCampaignInput): Promise<Campaign>;
    updateCampaign(id: number, input: UpdateCampaignInput): Promise<Campaign | null>;
    deleteCampaign(id: number): Promise<boolean>;
}
//# sourceMappingURL=campaigns.service.d.ts.map