import { Agent } from '../types';

export class AgentsRepository {
    private agents: Agent[] = [
        {
            id: 1,
            fullName: 'ANDRES FELIPE GIL DIAZ',
            email: 'andres.gil@callcenter.com',
            status: 'online',
            campaignId: 101,
            joinedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            fullName: 'SANTIAGO RIVERA',
            email: 'santiago.rivera@callcenter.com',
            status: 'busy',
            campaignId: 102,
            joinedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            fullName: 'RONAL GUERRERO',
            email: 'ronal.guerrero@callcenter.com',
            status: 'online',
            campaignId: 103,
            joinedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    ];

    async findAll(): Promise<Agent[]> {
        // Defensive copy
        return [...this.agents];
    }

    async findById(id: number): Promise<Agent | undefined> {
        const agent = this.agents.find(a => a.id === id);
        return agent ? { ...agent } : undefined;
    }

    async create(agent: Omit<Agent, 'id' | 'createdAt' | 'joinedAt'>): Promise<Agent> {
        const newAgent: Agent = {
            ...agent,
            id: this.agents.length > 0 ? Math.max(...this.agents.map(a => a.id)) + 1 : 1,
            joinedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        this.agents.push(newAgent);
        return { ...newAgent };
    }

    async update(id: number, agentData: Partial<Omit<Agent, 'id' | 'createdAt'>>): Promise<Agent | undefined> {
        const index = this.agents.findIndex(a => a.id === id);
        if (index === -1) return undefined;

        this.agents[index] = {
            ...this.agents[index],
            ...agentData
        };
        return { ...this.agents[index] };
    }

    async delete(id: number): Promise<boolean> {
        const index = this.agents.findIndex(a => a.id === id);
        if (index === -1) return false;

        this.agents.splice(index, 1);
        return true;
    }
}

export const agentsRepository = new AgentsRepository();
