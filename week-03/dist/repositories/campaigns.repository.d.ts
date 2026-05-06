import type { Campaign, CreateCampaignInput, UpdateCampaignInput } from '../types.js';
export declare class CampaignRepository {
    findAll(): Promise<Campaign[]>;
    findById(id: number): Promise<Campaign | null>;
    create(input: CreateCampaignInput): Promise<Campaign>;
    update(id: number, input: UpdateCampaignInput): Promise<Campaign | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=campaigns.repository.d.ts.map