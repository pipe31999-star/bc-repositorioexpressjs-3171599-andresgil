import { agentsRepository } from '../repositories/agents.repository';
import { Agent, PaginatedResponse } from '../types';
import { AppError } from '../errors/AppError';

export class AgentsService {
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Agent>> {
        const allAgents = await agentsRepository.findAll();
        const start = (page - 1) * limit;
        const end = start + limit;
        
        const data = allAgents.slice(start, end);
        
        return {
            data,
            total: allAgents.length,
            page,
            limit
        };
    }

    async getById(id: number): Promise<Agent> {
        const agent = await agentsRepository.findById(id);
        if (!agent) {
            throw new AppError(`Agent with ID ${id} not found`, 404);
        }
        return agent;
    }

    async create(agentData: Omit<Agent, 'id' | 'createdAt' | 'joinedAt'>): Promise<Agent> {
        return await agentsRepository.create(agentData);
    }

    async update(id: number, agentData: Partial<Agent>): Promise<Agent> {
        const updatedAgent = await agentsRepository.update(id, agentData);
        if (!updatedAgent) {
            throw new AppError(`Agent with ID ${id} not found`, 404);
        }
        return updatedAgent;
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await agentsRepository.delete(id);
        if (!deleted) {
            throw new AppError(`Agent with ID ${id} not found`, 404);
        }
        return deleted;
    }
}

export const agentsService = new AgentsService();
