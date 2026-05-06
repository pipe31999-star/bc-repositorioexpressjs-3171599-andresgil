import type { Agent, CreateAgentInput, UpdateAgentInput } from '../types.js';

// In-memory database
let agents: Agent[] = [
  {
    id: 1,
    fullName: 'Carlos Mendez',
    email: 'carlos@callcenter.com',
    phone: '+57 300 123 4567',
    status: 'active',
    department: 'Sales',
    hireDate: '2023-01-15',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 2,
    fullName: 'Maria Garcia',
    email: 'maria@callcenter.com',
    phone: '+57 301 234 5678',
    status: 'active',
    department: 'Support',
    hireDate: '2023-02-20',
    createdAt: '2023-02-20T10:00:00Z',
  },
  {
    id: 3,
    fullName: 'Juan Rodriguez',
    email: 'juan@callcenter.com',
    phone: '+57 302 345 6789',
    status: 'on-leave',
    department: 'Sales',
    hireDate: '2022-11-10',
    createdAt: '2022-11-10T10:00:00Z',
  },
  {
    id: 4,
    fullName: 'Sofia Lopez',
    email: 'sofia@callcenter.com',
    phone: '+57 303 456 7890',
    status: 'active',
    department: 'Quality',
    hireDate: '2023-03-01',
    createdAt: '2023-03-01T10:00:00Z',
  },
  {
    id: 5,
    fullName: 'Miguel Fernandez',
    email: 'miguel@callcenter.com',
    phone: '+57 304 567 8901',
    status: 'inactive',
    department: 'Support',
    hireDate: '2022-09-15',
    createdAt: '2022-09-15T10:00:00Z',
  },
];

let nextId = 6;

export class AgentRepository {
  // Get all agents
  async findAll(): Promise<Agent[]> {
    return [...agents];
  }

  // Get agent by ID
  async findById(id: number): Promise<Agent | null> {
    const agent = agents.find((a) => a.id === id);
    return agent ? { ...agent } : null;
  }

  // Create agent
  async create(input: CreateAgentInput): Promise<Agent> {
    const newAgent: Agent = {
      id: nextId++,
      ...input,
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    agents.push(newAgent);
    return { ...newAgent };
  }

  // Update agent
  async update(id: number, input: UpdateAgentInput): Promise<Agent | null> {
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) return null;

    agents[index] = { ...agents[index], ...input };
    return { ...agents[index] };
  }

  // Delete agent
  async delete(id: number): Promise<boolean> {
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) return false;

    agents.splice(index, 1);
    return true;
  }
}
