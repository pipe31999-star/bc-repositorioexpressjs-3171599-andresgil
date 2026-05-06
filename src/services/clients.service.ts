import type { Client, CreateClientInput, UpdateClientInput, PaginatedResponse } from '../types.js';
import { ClientRepository } from '../repositories/clients.repository.js';

export class ClientService {
  private repository = new ClientRepository();

  async getAllClients(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Client>> {
    const allClients = await this.repository.findAll();
    const start = (page - 1) * limit;
    const paginatedClients = allClients.slice(start, start + limit);

    return {
      data: paginatedClients,
      total: allClients.length,
      page,
      limit,
    };
  }

  async getClientById(id: number): Promise<Client | null> {
    return await this.repository.findById(id);
  }

  async createClient(input: CreateClientInput): Promise<Client> {
    if (!input.name || !input.email || !input.phone || !input.company) {
      throw new Error('Missing required fields');
    }

    return await this.repository.create(input);
  }

  async updateClient(id: number, input: UpdateClientInput): Promise<Client | null> {
    return await this.repository.update(id, input);
  }

  async deleteClient(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
