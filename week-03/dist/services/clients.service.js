import { ClientRepository } from '../repositories/clients.repository.js';
export class ClientService {
    constructor() {
        this.repository = new ClientRepository();
    }
    async getAllClients(page = 1, limit = 5) {
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
    async getClientById(id) {
        return await this.repository.findById(id);
    }
    async createClient(input) {
        if (!input.name || !input.email || !input.phone || !input.company) {
            throw new Error('Missing required fields');
        }
        return await this.repository.create(input);
    }
    async updateClient(id, input) {
        return await this.repository.update(id, input);
    }
    async deleteClient(id) {
        return await this.repository.delete(id);
    }
}
//# sourceMappingURL=clients.service.js.map