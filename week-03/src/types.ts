// Agent Types
export interface Agent {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  department: string;
  hireDate: string;
  createdAt: string;
}

export interface CreateAgentInput {
  fullName: string;
  email: string;
  phone: string;
  department: string;
}

export interface UpdateAgentInput {
  fullName?: string;
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'on-leave';
  department?: string;
}

// Call Types
export interface Call {
  id: number;
  agentId: number;
  clientId: number;
  campaignId: number;
  duration: number; // seconds
  startTime: string;
  endTime: string;
  status: 'completed' | 'missed' | 'failed';
  notes?: string;
  createdAt: string;
}

export interface CreateCallInput {
  agentId: number;
  clientId: number;
  campaignId: number;
  duration: number;
  startTime: string;
  endTime: string;
  status: 'completed' | 'missed' | 'failed';
  notes?: string;
}

export interface UpdateCallInput {
  status?: 'completed' | 'missed' | 'failed';
  notes?: string;
}

// Client Types
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  totalCalls: number;
  createdAt: string;
}

export interface CreateClientInput {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface UpdateClientInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'active' | 'inactive' | 'prospect';
}

// Campaign Types
export interface Campaign {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  targetCalls: number;
  completedCalls: number;
  createdAt: string;
}

export interface CreateCampaignInput {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  targetCalls: number;
}

export interface UpdateCampaignInput {
  name?: string;
  description?: string;
  status?: 'active' | 'completed' | 'paused';
  targetCalls?: number;
  completedCalls?: number;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
  message: string;
}
