import type { Client, CreateClientInput, UpdateClientInput, PaginatedResponse } from '../types.js';
export declare class ClientService {
    private repository;
    getAllClients(page?: number, limit?: number): Promise<PaginatedResponse<Client>>;
    getClientById(id: number): Promise<Client | null>;
    createClient(input: CreateClientInput): Promise<Client>;
    updateClient(id: number, input: UpdateClientInput): Promise<Client | null>;
    deleteClient(id: number): Promise<boolean>;
}
//# sourceMappingURL=clients.service.d.ts.map