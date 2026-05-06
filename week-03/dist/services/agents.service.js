import { AgentRepository } from '../repositories/agents.repository.js';
export class AgentService {
    constructor() {
        this.repository = new AgentRepository();
    }
    async getAllAgents(page = 1, limit = 5) {
        const allAgents = await this.repository.findAll();
        const start = (page - 1) * limit;
        const paginatedAgents = allAgents.slice(start, start + limit);
        return {
            data: paginatedAgents,
            total: allAgents.length,
            page,
            limit,
        };
    }
    async getAgentById(id) {
        return await this.repository.findById(id);
    }
    async createAgent(input) {
        // Validation
        if (!input.fullName || !input.email || !input.phone || !input.department) {
            throw new Error('Missing required fields');
        }
        return await this.repository.create(input);
    }
    async updateAgent(id, input) {
        const agent = await this.repository.update(id, input);
        return agent;
    }
    async deleteAgent(id) {
        return await this.repository.delete(id);
    }
}
//# sourceMappingURL=agents.service.js.map