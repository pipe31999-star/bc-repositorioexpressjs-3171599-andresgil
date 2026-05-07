import type { Agent, CreateAgentInput, UpdateAgentInput, PaginatedResponse } from '../types.js';
export declare class AgentService {
    private repository;
    getAllAgents(page?: number, limit?: number): Promise<PaginatedResponse<Agent>>;
    getAgentById(id: number): Promise<Agent | null>;
    createAgent(input: CreateAgentInput): Promise<Agent>;
    updateAgent(id: number, input: UpdateAgentInput): Promise<Agent | null>;
    deleteAgent(id: number): Promise<boolean>;
}
//# sourceMappingURL=agents.service.d.ts.map