import type { Agent, CreateAgentInput, UpdateAgentInput, PaginatedResponse } from '../types.js';
import { AgentRepository } from '../repositories/agents.repository.js';

export class AgentService {
  private repository = new AgentRepository();

  async getAllAgents(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Agent>> {
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

  async getAgentById(id: number): Promise<Agent | null> {
    return await this.repository.findById(id);
  }

  async createAgent(input: CreateAgentInput): Promise<Agent> {
    // Validation
    if (!input.fullName || !input.email || !input.phone || !input.department) {
      throw new Error('Missing required fields');
    }

    return await this.repository.create(input);
  }

  async updateAgent(id: number, input: UpdateAgentInput): Promise<Agent | null> {
    const agent = await this.repository.update(id, input);
    return agent;
  }

  async deleteAgent(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
