import type { Agent, CreateAgentInput, UpdateAgentInput } from '../types.js';
export declare class AgentRepository {
    findAll(): Promise<Agent[]>;
    findById(id: number): Promise<Agent | null>;
    create(input: CreateAgentInput): Promise<Agent>;
    update(id: number, input: UpdateAgentInput): Promise<Agent | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=agents.repository.d.ts.map