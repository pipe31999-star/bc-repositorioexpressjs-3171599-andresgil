/**
 * Interface para un Agente del Call Center
 */
export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-break';
  department: string;
  hireDate: string; // ISO 8601 format
}

/**
 * DTO para crear un nuevo Agente (sin id)
 */
export type CreateAgentDto = Omit<Agent, 'id'>;
