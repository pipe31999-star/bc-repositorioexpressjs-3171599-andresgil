import { CallRepository } from '../repositories/calls.repository.js';
export class CallService {
    constructor() {
        this.repository = new CallRepository();
    }
    async getAllCalls(page = 1, limit = 5) {
        const allCalls = await this.repository.findAll();
        const start = (page - 1) * limit;
        const paginatedCalls = allCalls.slice(start, start + limit);
        return {
            data: paginatedCalls,
            total: allCalls.length,
            page,
            limit,
        };
    }
    async getCallById(id) {
        return await this.repository.findById(id);
    }
    async createCall(input) {
        if (!input.agentId || !input.clientId || !input.campaignId) {
            throw new Error('Missing required fields');
        }
        return await this.repository.create(input);
    }
    async updateCall(id, input) {
        return await this.repository.update(id, input);
    }
    async deleteCall(id) {
        return await this.repository.delete(id);
    }
}
//# sourceMappingURL=calls.service.js.map