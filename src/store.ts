import { Agent, CreateAgentDto } from './types';

/**
 * Store en memoria para gestionar agentes del call center
 */
class AgentStore {
  private agents: Agent[] = [];
  private nextId: number = 1;

  // Datos iniciales de prueba
  constructor() {
    this.agents = [
      {
        id: this.nextId++,
        name: 'Juan Pérez',
        email: 'juan.perez@callcenter.com',
        phone: '+1-555-0101',
        status: 'active',
        department: 'Sales',
        hireDate: '2023-01-15',
      },
      {
        id: this.nextId++,
        name: 'María García',
        email: 'maria.garcia@callcenter.com',
        phone: '+1-555-0102',
        status: 'active',
        department: 'Support',
        hireDate: '2023-02-20',
      },
    ];
  }

  /**
   * Obtener todos los agentes
   */
  getAll(): Agent[] {
    return [...this.agents];
  }

  /**
   * Obtener un agente por ID
   */
  getById(id: number): Agent | undefined {
    return this.agents.find((agent) => agent.id === id);
  }

  /**
   * Crear un nuevo agente
   */
  create(data: CreateAgentDto): Agent {
    const newAgent: Agent = {
      ...data,
      id: this.nextId++,
    };
    this.agents.push(newAgent);
    return newAgent;
  }

  /**
   * Actualizar un agente existente
   */
  update(id: number, data: CreateAgentDto): Agent | undefined {
    const index = this.agents.findIndex((agent) => agent.id === id);
    if (index === -1) {
      return undefined;
    }

    const updatedAgent: Agent = {
      ...data,
      id,
    };
    this.agents[index] = updatedAgent;
    return updatedAgent;
  }

  /**
   * Eliminar un agente
   */
  remove(id: number): boolean {
    const index = this.agents.findIndex((agent) => agent.id === id);
    if (index === -1) {
      return false;
    }

    this.agents.splice(index, 1);
    return true;
  }
}

// Exportar una instancia única del store (patrón Singleton)
export const agentStore = new AgentStore();
